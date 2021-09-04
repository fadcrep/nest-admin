import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity('users')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    last_name: string;

    @Column()
    first_name: string;

    @Column({unique:true})
    email: string;

    @Column()
    @Exclude()
    password: string;

    @ManyToOne(() => Role)
    @JoinColumn({name: 'role_id'})
    role:Role

}