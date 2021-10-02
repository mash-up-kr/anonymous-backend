import { registerAs } from '@nestjs/config';

export type SlackConfig = {
  webhookUrl: string;
};

export default registerAs(
  'slack',
  (): SlackConfig => {
    return {
      webhookUrl: process.env.SLACK_WEBHOOK_URL || '',
    };
  },
);
