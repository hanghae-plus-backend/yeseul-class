import { EntityRepository, Repository } from 'typeorm';
import { Class } from '../entities/class.entity';

@EntityRepository(Class)
export class ClassRepository extends Repository<Class> {
  findAll(): Promise<Class[]> {
    return this.find();
  }
  findById(id: number): Promise<Class | undefined> {
    return this.findOne({ where: {id}});
  }
  createClass(classData: Partial<Class>): Promise<Class> {
    return this.save(classData)
  }
}