import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClassReservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    class_id: string;

    @Column()
    user_id: number;

    @Column({ default: false })
    is_success: boolean;

    @Column({ nullable: true })
    detail: string;
}
