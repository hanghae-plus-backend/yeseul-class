import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Patch, ValidationPipe } from "@nestjs/common";
import { NotFoundError } from "rxjs";


@Controller('class')
export class ClassController{
    @Get(':id') // 유저 id로 등록한 수업들 리턴하는 함수
    async getClassByID(@Param('id') id): Promise <number[]> { // async 일때는 promise를 리턴해야 한다
        return Promise.resolve([1,2,3,4,5])
    }
    
}