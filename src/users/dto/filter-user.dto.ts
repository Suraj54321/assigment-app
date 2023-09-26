import { IsInt,IsNotEmpty, IsNumber, IsString, Min, } from "class-validator";

export class FilterUserDto {
    @Min(1)
    @IsInt()
    @IsNotEmpty()
    page:number

    @Min(1)
    @IsInt()
    @IsNotEmpty()
    pageSize:number

    @IsString()
    sortOrder?:string

    @IsString()
    searchString?:number
}
