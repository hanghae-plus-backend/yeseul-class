import { EntityRepository, Repository } from 'typeorm';
import { Class } from '../entities/class.entity';

@EntityRepository(Class)
export class ClassRepository extends Repository<Class> {
  // 여기에 추가적인 메서드들을 구현할 수 있습니다.
}