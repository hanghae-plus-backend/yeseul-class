import { BadRequestException, Body, Controller, Get, Post, NotFoundException, Param, Patch, ValidationPipe } from "@nestjs/common";
import { NotFoundError } from "rxjs";
import { CreateClassDto } from "../dto/createClass.dto";
import { Connection } from 'typeorm'; // TypeORM의 Connection 임포트

/* 데이터 삽입 용으로 만든 컨트롤러 입니다. 실제 과제용 X */

@Controller('class') 
export class ClassController{

    constructor(private readonly connection: Connection) {} // Connection 주입

    @Get('/') // 전체 특강 정보 조회
    async getClassInfo(): Promise<any> {
        const classInfoRepository = this.connection.getRepository('Class'); // 데이터베이스와 연결된 레포지토리 얻기
        return classInfoRepository.find(); // 모든 클래스 정보 반환
    }

    @Post('add/') // 특강 추가 API
    async createClass(@Body() classData: CreateClassDto): Promise<any> {
        const classInfoRepository = this.connection.getRepository('Class'); // 데이터베이스와 연결된 레포지토리 얻기
        return classInfoRepository.save(classData); // 클래스 정보 저장
    }

    @Get(':class_id/') // 해당 특강 정보 조회 =
    async getClassInfoById(@Param('class_id') classId: string): Promise <number[]> { // async 일때는 promise를 리턴해야 한다
        const classReservationData = [1,2,3,4,5];
        return classReservationData
    }
}