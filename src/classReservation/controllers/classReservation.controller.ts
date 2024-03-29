import { BadRequestException, Body, Controller, Get, Post, NotFoundException, Param, Patch, ValidationPipe } from "@nestjs/common";
import { NotFoundError } from "rxjs";
import { CreateClassReservationDto } from "../dto/createClassReservation.dto";
import { ClassReservation } from "../entities/classReservation.entity"
import { ClassReservationService } from "../service/classReservation.service";
import { ApplyClassDto } from "../dto/applyClass.dto";

@Controller('class_apply')
export class ClassReservationController{
    constructor(private readonly reservationService: ClassReservationService){}


    @Get(':class_id/user/:user_id') // 특강 신청 여부 조회 API : 히스토리로그를 참조해서 해당 유저가 수업에 예약했는지 확인하는 함수
    async checkUserClassReservation(@Param('class_id') classId: number, @Param('user_id') userId: number): Promise <number[]> { // async 일때는 promise를 리턴해야 한다
        const userReservationResult = await this.reservationService.checkUserReservation(classId, userId)
        return userReservationResult
    }

    @Post(':class_id/') // 특강 신청 API
    async ApplyClass(@Param('class_id') classId: number,  @Body()applyData:ApplyClassDto): Promise<ClassReservation> {
        const { userId } = applyData
        console.log(classId, userId)
        let applyResult = await this.reservationService.applyForClass(classId, userId)
        return applyResult
    }
}