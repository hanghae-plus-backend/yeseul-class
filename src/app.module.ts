import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config'
import { ClassReservationController } from './classReservation/controllers/classReservation.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassController } from './classReservation/controllers/class.controller';
import { ClassReservationService } from './classReservation/service/classReservation.service';
require('dotenv').config();
import { ClassModule } from './classReservation/class.module'

@Module({
  // imports: [
  //   TypeOrmModule.forRoot({
  //     type: "postgres", //process.env.ENGINE,
  //     host: process.env.HOST,
  //     port: parseInt(process.env.PORT),
  //     username: process.env.USER,
  //     password: process.env.PW,
  //     database: process.env.DB,
  //     entities: ['dist/**/*.entity{.ts,.js}'],
  //     synchronize: true,
  //   })
  // ],
  imports: [        
    ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres", //process.env.ENGINE,
      host: '15.164.251.59',
      port: 5432,
      username: 'tasha',
      password: 'postgrespw',
      database: 'tashaClass',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ClassModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}




