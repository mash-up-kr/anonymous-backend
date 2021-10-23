const {
  ECSClient,
  RegisterTaskDefinitionCommand,
  DescribeTaskDefinitionCommand,
} = require('@aws-sdk/client-ecs');
const {
  ECRClient,
  DescribeImagesCommand,
} = require('@aws-sdk/client-ecr')
const { runECS } = require('./run-ecs');

/**
 * Update task definition with revision.
 * @example `node update-task-definition.js --name=api --revision=$(git rev-parse --short HEAD)`
 *
 * @param {ECSClient} client
 * @param {Record<string, string>} argv
 */
async function updateTaskDefinition(client, { name, revision }) {
  const taskDefinitionName = `${name}-server`;
  const { taskDefinition: original } = await client.send(
    new DescribeTaskDefinitionCommand({ taskDefinition: taskDefinitionName })
  );

  // There is a single container definition for every task definitions now.
  // If there are multiple container definitions required, It should be changed.
  const originalContainerDefinition = original.containerDefinitions[0];
  const imageArn = originalContainerDefinition.image.replace(/:.*$/, `:${revision}`);
  const updatedContainerDefinition = {
    ...originalContainerDefinition,
    image: imageArn,
  }

  await ensureImage(imageArn);

  const { taskDefinition: updated } = await client.send(
    new RegisterTaskDefinitionCommand({
      ...original,
      containerDefinitions: [
        updatedContainerDefinition,
      ]
    })
  )
  
  console.log(JSON.stringify(updated, null, 2));
  console.log(`Task definition '${taskDefinitionName}' Updated with revision ${revision} 😎`)
}

// start
runECS(updateTaskDefinition);


/**
 * Ensure target image exist. If there is no image then exit with code 1.
 *
 * @param {string} imageArn
 */
async function ensureImage(imageArn) {
  console.log(imageArn);
  const [repositoryArn, imageTag] = imageArn.split(':');
  const [, repositoryName] = repositoryArn.split('/');

  try {
    const client = new ECRClient({ region: process.env.AWS_REGION });
    await client.send(
      new DescribeImagesCommand({
        repositoryName,
        imageIds: [{ imageTag }]
      })
    );
  } catch (e) {
    if(e.name == 'ImageNotFoundException') {
      console.error(`Image for revision '${imageTag}' is not found.`);
    } else {
      console.error(e.message);
    }
    process.exit(1);
  }
}




