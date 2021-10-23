const {
  UpdateServiceCommand,
  ECSClient,
}  = require('@aws-sdk/client-ecs');
const { runECS } = require('./run-ecs');

/**
 * Update specified service with latest task definition
 * @example `node update-service.js --name=api`
 *
 * @param {ECSClient} client
 * @param {Record<string, string>} argv
 */
async function updateService(client, { name, cluster = 'production' }) {
  const { service } = await client.send(
    new UpdateServiceCommand({
      cluster,
      service: `${name}-service`,
      taskDefinition: `${name}-server`,
    })
  );

  console.log(JSON.stringify(service, null, 2));
}

// start
runECS(updateService);
