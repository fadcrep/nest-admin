import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission.entity";

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany( ()=> Permission, {cascade:true})
    @JoinTable({
        name:'role_permissions',
        joinColumn:{name:'role_id', referencedColumnName: 'id'},
        inverseJoinColumn:{name:'permission_id', referencedColumnName: 'id'}
    })
    permissions: Permission[];
}