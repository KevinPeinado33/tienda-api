import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'pg';

import config from '../config';

@Global()
@Module({
  imports: [ 
    TypeOrmModule.forRootAsync({
        inject: [ config.KEY ] ,
        useFactory: ( configService: ConfigType<typeof config> ) => {

          const { user, host, dbName, password, port } = configService.postgres;

          return {
            type: 'postgres',
            host,
            port,
            username: user,
            password,
            database: dbName,
            synchronize: false, // en true esto lo hace automatico
            autoLoadEntities: true
          };

        },
    })
  ],
  providers: [
    {
      provide: 'PG',
      useFactory: ( configService: ConfigType<typeof config> ) => {

        const { user, host, dbName, password, port } = configService.postgres;

        const client = new Client({
          user,
          host,
          database: dbName,
          password,
          port,
        });
        
        client.connect();

        return client;
        
      },
      inject: [config.KEY]
    },
  ],
  exports: ['PG', TypeOrmModule],
})
export class DatabaseModule { }
