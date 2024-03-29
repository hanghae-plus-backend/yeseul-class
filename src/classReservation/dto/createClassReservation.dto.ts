export class CreateClassReservationDto {
    readonly class_id: number;
    readonly user_id: number;
    readonly is_success: boolean;
    readonly detail: string;
}
