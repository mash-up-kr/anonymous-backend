module.exports = {
  secret: process.env.secret ?? 'anonymous', // TODO: from environment or remote
  signOptions: { expiresIn: '365d' },
  hashingOptions: {
    iv: process.env.iv ?? 'blahblah',
    salt: '1234',
  },
};
