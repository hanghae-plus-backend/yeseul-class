import { EntityRepository, Repository } from 'typeorm';
import { ClassReservation } from '../entities/classReservation.entity';
import { ClassReservationInterface } from './classReservation.repository.interface';
import { CreateClassReservationDto } from '../dto/createClassReservation.dto';

@EntityRepository(ClassReservation)
export class ClassReservationRepository extends Repository<ClassReservation> implements ClassReservationInterface {
  findAll(): Promise<ClassReservation[]> {
    return this.find();
  }

  findById(id: number): Promise<ClassReservation | undefined> {
    return this.findOne({ where: {id}});
  }
  findByClass(classId: number): Promise<ClassReservation[]> {
    const reservations = this.find({
        where: { class_id: classId }, // classId에 해당하는 예약 목록을 가져옵니다.
      });
      return reservations;
  }
  findUserReservation(classId:number, userId:number): Promise<ClassReservation | undefined> {
    return this.findOne({ where: { class_id: classId , user_id: userId }, lock: { mode: 'pessimistic_write' }})
  }

  createNew(classData: Partial<ClassReservation>): Promise<ClassReservation> {
//   createNew(classData: CreateClassReservationDto): Promise<ClassReservation> {
    const newClass = classData
    return this.save(newClass);
  }
}