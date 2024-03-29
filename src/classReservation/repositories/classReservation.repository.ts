import { EntityRepository, Repository } from 'typeorm';
import { ClassReservation } from '../entities/classReservation.entity';
import { ClassReservationInterface } from './classReservation.repository.interface';

@EntityRepository(ClassReservation)
export class ClassReservationRepository extends Repository<ClassReservation> implements ClassReservationInterface {
  findAll(): Promise<ClassReservation[]> {
    return this.find();
  }

  findById(id: number): Promise<ClassReservation | undefined> {
    return this.findOne({ where: {id}});
  }

  createNew(classData: Partial<ClassReservation>): Promise<ClassReservation> {
    const newClass = classData
    return this.save(newClass);
  }
}