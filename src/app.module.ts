import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClassController } from './class/class.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, ClassController],
  providers: [AppService],
})
export class AppModule {}
