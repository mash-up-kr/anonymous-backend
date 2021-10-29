import { Handler, EventBridgeEvent } from 'aws-lambda';
import { IncomingWebhook } from '@slack/webhook';

enum ServiceStatus {
  PROVISIONING = 'PROVISIONING',
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  DEPROVISIONING = 'DEPROVISIONING',
  STOPPED = 'STOPPED',
}

type Container = {
  containerArn: string; // "arn:aws:ecs:ap-northeast-2:{accountId}:container/production/{hash}/{hash}"
  lastStatus: string; // "PENDING"
  name: string; // "image-server"
  image: string; // "******.dkr.ecr.ap-northeast-2.amazonaws.com/image-server:{accountId}"
  taskArn: string; // "arn:aws:ecs:ap-northeast-2:{accountId}:task/production/************************"
  cpu: string; // "0"
};

type ECSStateChangeEvent = {
  availabilityZone: string;
  clusterArn: string; // "arn:aws:ecs:ap-northeast-2:{accountId}:cluster/{cluster.name}"
  containers: Container[];
  group: string; // "service:image-service"
  desiredStatus: ServiceStatus; // "RUNNING"
  lastStatus: ServiceStatus; // "PROVISIONING"
  taskArn: string; // "arn:aws:ecs:ap-northeast-2:{accountId}:task/production/{hash}
  taskDefinitionArn: string; // "arn:aws:ecs:ap-northeast-2:{accountId}:task-definition/image-server:{digits}"
  createdAt: string;
  updatedAt: string;
};

enum Color {
  Yellow = '#f2c744',
  Green = '#33ff8f',
}

export const handler: Handler<EventBridgeEvent<'ECS Task State Change', ECSStateChangeEvent>, void> = async event => {
  const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL_DEPLOY!);

  const message = buildDeployMessage(event.detail);
  await webhook.send({
    attachments: [message],
  });

  return;
};

function buildDeployMessage({ desiredStatus, lastStatus, group, taskDefinitionArn }: ECSStateChangeEvent) {
  const color = desiredStatus === lastStatus ? Color.Green : Color.Yellow;
  const hash = taskDefinitionArn.split(':').slice(-1)[0];
  return section(
    color,
    `
*${desiredStatus === ServiceStatus.RUNNING ? 'NEW' : 'OLD'}* \`${group}\` - current: *${lastStatus}*
    `.trim(),
    `https://github.com/mash-up-kr/anonymous-backend/commit/${hash}`
  );
}

function section(color: Color, text: string, link: string) {
  return {
    color,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text,
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'github',
            emoji: true,
          },
          url: link,
        },
      },
    ],
  };
}
