const {
  ECSClient,
}  = require('@aws-sdk/client-ecs');
const yargs = require('yargs/yargs')
const helper = require('yargs/helpers')

module.exports = {
  runECS: fn => fn(
    new ECSClient({ region: process.env.AWS_REGION }),
    yargs(helper.hideBin(process.argv)).argv,
  ),
}
