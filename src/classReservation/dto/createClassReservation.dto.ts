export class CreateClassReservationDto {
    readonly class_id: string;
    readonly user_id: number;
    readonly is_success: boolean;
    readonly detail: string;
}
