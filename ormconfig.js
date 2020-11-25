const SnakeNamingStrategy = require('typeorm-naming-strategies')
  .SnakeNamingStrategy;

const rootDir = process.env.TS_NODE ? 'src' : 'dist';
module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'traveltest',
  synchronize: true,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [rootDir + '/entities/*.{js,ts}'],
  migrations: [rootDir + '/migrations/*.{js,ts}'],
  cli: {
    entitiesDir: `${rootDir}/entities`,
    migrationsDir: `${rootDir}/migrations`,
  },
};
