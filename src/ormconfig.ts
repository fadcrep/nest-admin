import { ConnectionOptions } from 'typeorm';

// You can load you .env file here synchronously using dotenv package (not installed here),
// import * as dotenv from 'dotenv';
// import * as fs from 'fs';
// const environment = process.env.NODE_ENV || 'development';
// const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
// You can also make a singleton service that load and expose the .env file content.
// ...


// Check typeORM documentation for more information.
const config: ConnectionOptions = {
   
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'nest_admin_user',
  password: 'magical_password_nest_admin',
  database: 'nestadmin',
  entities: ['dist/**/*.entity.js'],
  ssl: false,
//   extra: {
//     ssl: {
//       rejectUnauthorized: false
//     }
//   },

  // We are using migrations, synchronize should be set to false.
  synchronize: true,

  // Run migrations automaticallSy,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: true,
  logger: 'file',

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [__dirname + '/migrations/*/{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
  },
};

export = config;
