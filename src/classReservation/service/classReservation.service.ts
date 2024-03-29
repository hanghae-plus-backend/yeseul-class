// class.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassReservation } from '../entities/classReservation.entity';
import { Class } from '../entities/class.entity'
import { ClassReservationRepository } from '../repositories/classReservation.repository'

      // 특강에 대한 조건1:  한 유저는 하나의 클래스를 1번만 신청할 수 있다.
      // 특강에 대한 조건2: transaction이 중요하고 30명이 안찼는지 확실히 확인이 된 이후에 신청할 수 있다.
      // 특강에 대한 조건3: 성공했으면, is_success결과를 True로 반환하고
      // 특강에 대한 조건4: 유저의 이유로 실패하면 is_success의 결과를 ㅠ로 반환하고 그 그 detail도 적음
      // 특강에 대한 조건5: 그냥 트랜젝션 실패면 rollBackTransaction
      
@Injectable()
export class ClassReservationService {
  constructor(
    @InjectRepository(ClassReservationRepository)
    private classReservationRepository: ClassReservationRepository,
  ) {}

  async applyForClass(classId: number, userId: number): Promise<void> {
    // 트랜잭션을 시작합니다.
    const queryRunner = this.classReservationRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 특강에 대한 정보를 가져옵니다.
      const selectedClass = await this.classReservationRepository.findById(classId);
      console.log('특강 신청 성공')
      console.log(selectedClass)



      // 여기에 비즈니스 로직을 구현하세요.

      // 트랜잭션을 커밋합니다.
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log('error: Initiate RollBack ')
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // 쿼리 러너를 해제
      await queryRunner.release();
    }
    
  }

  async checkIfUserApplied(classId: number, userId: number): Promise<boolean> {
    // 여기에 특강 신청 여부를 조회하는 로직 구현
    return false;
  }
}
