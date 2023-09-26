import { IsEmail,IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MaxLength(24)
    firstName:string

    @IsNotEmpty()
    @MaxLength(24)
    lastName:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsNumber()
    age:number

    @IsNotEmpty()
    @MinLength(10,{
        message: 'phone number should contain 10 digits',
    })
    @MaxLength(10,{
        message: 'phone number should not contain more then 10 digits',
    })
    phoneNumber:string

    @IsNotEmpty()
    @MaxLength(24)
    city:string

    @IsNotEmpty()
    @MaxLength(24)
    state:string

    @IsNotEmpty()
    @MaxLength(24)
    country:string
}
