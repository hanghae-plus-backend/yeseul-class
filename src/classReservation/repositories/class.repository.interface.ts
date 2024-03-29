import { Class } from '../entities/class.entity';

export interface ClassInterface {
  findAll(): Promise<Class[]>;
  findById(id: number): Promise<Class | undefined>;
  createClass(classData: Partial<Class>): Promise<Class>;
}

