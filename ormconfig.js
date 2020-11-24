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
  //entities: ['dist/entities/*.js'],
  //migrations: ['dist/migrations/*.js'],
  entities: [rootDir + '/entities/*.{js,ts}'],
  migrations: [rootDir + '/migrations/*.{js,ts}'],
  namingStrategy: new SnakeNamingStrategy(),
};
