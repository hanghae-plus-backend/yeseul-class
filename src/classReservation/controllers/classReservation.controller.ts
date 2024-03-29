import { BadRequestException, Body, Controller, Get, Post, NotFoundException, Param, Patch, ValidationPipe } from "@nestjs/common";
import { NotFoundError } from "rxjs";
import { CreateClassReservationDto } from "../dto/createClassReservation.dto";


@Controller('class_reservation')
export class ClassReservationController{


    @Get(':class_id/user/:user_id') // 특강 신청 여부 조회 API : 히스토리로그를 참조해서 해당 유저가 수업에 예약했는지 확인하는 함수
    async checkUserClassReservation(@Param('class_id') classId: string, @Param('user_id') userId: string): Promise <number[]> { // async 일때는 promise를 리턴해야 한다
        const classReservationData = [1,2,3,4,5];
        return classReservationData
    }
    @Post(':class_id/user/:user_id/') // 특강 신청 API
    async createClassReservation(@Param('class_id') classId: string, @Param('user_id') userId: string, @Body() reservationData: CreateClassReservationDto): Promise <number[]> {
        const classReservationData = [1,2,3,4,5];
        return classReservationData
    }
}