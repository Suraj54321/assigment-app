import { Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, Index, Unique } from "typeorm";

@Entity('users')
@Index(['email','phoneNumber','age','city','state','country'])
@Unique(['phoneNumber'])
export class users {
    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar'})
    firstName:string

    @Column({type:'varchar'})
    lastName:string

    @Column({type:'varchar'})
    email:string

    @Column()
    age:number

    @Column({type:'varchar'})
    phoneNumber:string
    
    @Column({type:'varchar'})
    city:string

    @Column({type:'varchar'})
    state:string

    @Column({type:'varchar'})
    country:string

    @Column({type:"timestamp",default:()=>"CURRENT_TIMESTAMP(6)"})
    createdAt:Date

    @Column({type:"timestamp",default:()=>"CURRENT_TIMESTAMP(6)"})
    updatedAt:Date

}
