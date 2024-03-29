// class.service.ts

import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassReservation } from '../entities/classReservation.entity';
import { DataSource } from 'typeorm';
import { Class } from '../entities/class.entity'
import { ClassReservationRepository } from '../repositories/classReservation.repository'
import { ClassRepository } from '../repositories/class.repository';
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
        private classRepository: ClassRepository,
        private dataSource: DataSource,
    ) {}
    
    async applyForClass(classId: number, userId: number): Promise<ClassReservation> {
        // 트랜잭션을 시작합니다.
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        // 특강에 대한 정보를 가져옵니다.
        // const selectedClass = await this.classRepository.findById(classId);
        // if (!selectedClass) {
        //     throw new NotFoundException('해당하는 클래스를 찾을 수 없습니다.');
        // }
        
        try {

        //예약 이미 했는지 확인
        const existingReservation = await this.classReservationRepository.findUserReservation(
            classId, userId) // 비관적 락 적용
        if (existingReservation) {
            // TODO: 실패 케이스에도 is_success:false 결과값 저장
            throw new HttpException('중복 예약은 불가능합니다', HttpStatus.BAD_REQUEST)
        }
        // 예약갯수 30개 이상이면 불가. 근데 여기까지 하고 이후에 따른거랑 겹쳐서 여러명이 될 수도 있잖아? 락을 걸어야 할듯?
        const currentlyReservedSeats = await this.classReservationRepository.findByClass(classId)
        if (currentlyReservedSeats.length>29) {
            // TODO: 실패 케이스에도 is_success:false 결과값 저장
            throw new HttpException('해당 클래스는 정원이 가득찼습니다. 감사합니다.',HttpStatus.BAD_REQUEST)
        }

        //모든 유효성 검사 비즈니스 로직을 통과하면
        const reservation = await this.classReservationRepository.createNew({
            class_id :classId,
            user_id : userId,
            is_success: true

        })
        // 트랜잭션을 커밋
        await queryRunner.commitTransaction();
        console.log('특강 신청 성공');
        console.log(reservation);
        return reservation
        } catch (error) {
        console.error('오류 발생: 트랜잭션 롤백, 다시 신청해주세요');
        await queryRunner.rollbackTransaction();
        throw error;
        } finally {
        // 쿼리 러너를 해제
        console.log('Query Runner successfully disconnected')
        await queryRunner.release();
        }
    }

    
  async checkUserReservation(classId: number, userId: number): Promise<ClassReservation | boolean> {
    // 여기에 특강 신청 여부를 조회하는 로직 구현
    try{
        const existingReservation = await this.classReservationRepository.checkUserReservation(classId, userId)  //비관적락 미적용
        if (existingReservation && existingReservation.is_success) {
            //존재
            return existingReservation
        } else {
            return false
        }
    } catch (error) {
        throw error;
    }
  }
}
