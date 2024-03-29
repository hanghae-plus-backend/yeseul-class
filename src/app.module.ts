import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClassReservationController } from './classReservation/controllers/classReservation.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassController } from './classReservation/controllers/class.controller';
import { ClassReservationService } from './classReservation/service/classReservation.service';
require('dotenv').config();

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
    TypeOrmModule.forRoot({
      type: "postgres", //process.env.ENGINE,
      host: '15.164.251.59',
      port: 5432,
      username: 'tasha',
      password: 'postgrespw',
      database: 'tashaClass',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    })
  ],
  controllers: [AppController, ClassController, ClassReservationController],
  providers: [AppService],
})
export class AppModule {}
