const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

module.exports = {
  type: 'mysql',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: Number(process.env.DATABASE_POST || 3306),
  database: process.env.DATABASE_NAME || 'test',
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'test',
  logging: process.env.NODE_ENV !== 'production',
  synchronize: process.env.NODE_ENV !== 'production',
  namingStrategy: new SnakeNamingStrategy(),
  entities: [__dirname + '/dist/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
