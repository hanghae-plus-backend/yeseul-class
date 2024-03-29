import { ClassReservation } from "../entities/classReservation.entity"

export interface ClassReservationInterface {//repository가 정의해야하는 메서드 정의
    findAll(): Promise<ClassReservation[]>
    findById(id:number): Promise <ClassReservation | undefined>
    findByClass(classId: number): Promise<ClassReservation[]> 
    findUserReservaion(classId:number, userId:number): Promise<ClassReservation | undefined>
    checkUserReservaion(classId:number, userId:number): Promise<ClassReservation | undefined>
    createNew(classData: Partial<ClassReservation>): Promise<ClassReservation>
}