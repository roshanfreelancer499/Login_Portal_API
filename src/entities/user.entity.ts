import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({name: 'users'})
export default class User {
    @PrimaryGeneratedColumn('uuid', {name: 'user_id'})
    userId!: string;

    @Column('varchar', {name: 'first_name', length: 20, nullable: false})
    firstName!: string;

    @Column('varchar', {name: 'last_name', length: 20, nullable: false})
    lastName!: string;

    @Column('varchar', {name: 'full_name', length: 50, nullable: false})
    fullName!: string;

    @Column('varchar', {name: 'email', length: 100, nullable: false, unique: true})
    email!: string;

    @Column('varchar', {name: 'password', nullable: false, select: false})
    password!: string;

    @Column('varchar', {name: 'phone_number', length: 10, nullable: false, unique: true})
    phoneNumber!: string;

    @Column('varchar', {name: 'address', nullable: true})
    address!: string;

    @Column('boolean', {name: 'is_active', default: true})
    isActive!: boolean;

    @CreateDateColumn({name: 'created_date', nullable: false})
    createdDate!: Date;

    @UpdateDateColumn({name: 'updated_date', nullable: false})
    updatedDate!: Date;
}