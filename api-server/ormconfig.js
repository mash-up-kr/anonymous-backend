module.exports = {
  type: 'mysql',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: Number(process.env.DATABASE_POST || 3306),
  database: process.env.DATABASE_NAME || 'test',
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'test',
  synchronize: process.env.NODE_ENV !== 'production',
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + 'src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
