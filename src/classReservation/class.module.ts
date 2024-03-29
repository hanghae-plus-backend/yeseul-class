import{ Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { ClassReservation } from './entities/classReservation.entity';
import { ClassController } from './controllers/class.controller';
import { ClassReservationController } from './controllers/classReservation.controller';
import { ClassReservationService } from './service/classReservation.service';
import { ClassReservationRepository } from './repositories/classReservation.repository';

@Module({
    imports:[TypeOrmModule.forFeature([Class, ClassReservation])],
    controllers:[ClassController, ClassReservationController],
    providers:[ClassReservationService,ClassReservationRepository],
    exports:[ClassReservationService],
})
export class ClassModule {}