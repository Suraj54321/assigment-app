import { Injectable } from '@nestjs/common';
import { CreateUserDto,UpdateUserDto,FilterUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import {ResponseUtilService} from '../common/response'
import {ResponseStatus,ResponseMessage} from '../constant'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(users)
    private usersRepository:Repository<users>,
    private readonly responseUtilService:ResponseUtilService
  ){

  }
  async create(createUserDto: CreateUserDto) {
    try{
      let requestData=createUserDto;
      let checkUserExists=await this.usersRepository.findOne({
        where:{
          phoneNumber:requestData.phoneNumber
        },
        select:{
          id:true
        }
      })
      if(checkUserExists){
        return this.responseUtilService.responseFormat(ResponseStatus[0].BAD_REQUEST,ResponseMessage[0].USER_RECORD_FOUND,{})
      }
      let finalObject={
        ...createUserDto
      }
      let userData=await this.usersRepository.save(finalObject)
      if(userData){
        return this.responseUtilService.responseFormat(ResponseStatus[0].SUCCESS,ResponseMessage[0].CREATE,userData)
      }else{
        return this.responseUtilService.responseFormat(ResponseStatus[0].BAD_REQUEST,ResponseMessage[0].SOMETHING_WENT_WRONG,{})
      }
    }catch(error){
      console.log("error =>>",error)
      return this.responseUtilService.responseFormat(ResponseStatus[0].INTERNAL_SERVER,ResponseMessage[0].INTERNAL_SERVER,{})
    }
  }

  async findAll(filterUserDto:FilterUserDto) {
    try{
      let {page,pageSize,sortOrder,searchString} =filterUserDto
      let where={}
      if(searchString && searchString != -1){
        where=[
          {firstName: ILike('%' + searchString + '%')},
          {lastName: ILike('%' + searchString + '%')},
          {age:  searchString},
          {phoneNumber: ILike('%' + searchString + '%')},
          {city: ILike('%' + searchString + '%')},
          {state: ILike('%' + searchString + '%')},
          {country: ILike('%' + searchString + '%')},
      ]
      }
      
      let [users,count]= await this.usersRepository.findAndCount(
        {
          where:where,
          take:+pageSize || 10,
          skip:(page -1) * pageSize,
          order:{
            createdAt: sortOrder.toUpperCase() == "DESC" ? "desc" : "asc"
          }
        }
      )

     return this.responseUtilService.responseFormat(ResponseStatus[0].SUCCESS,ResponseMessage[0].FIND,{users,count})
    }catch(error){
      console.log("error =>>",error)
      return this.responseUtilService.responseFormat(ResponseStatus[0].INTERNAL_SERVER,ResponseMessage[0].INTERNAL_SERVER,{})
    }
  }

  async findOne(id: number) {
    try{
      let userData= await this.usersRepository.findOne({
        where:{
          id:id
        }
      })
      if(userData){
        return this.responseUtilService.responseFormat(ResponseStatus[0].SUCCESS,ResponseMessage[0].FINDBYID,userData)
      }else{
        return this.responseUtilService.responseFormat(ResponseStatus[0].BAD_REQUEST,ResponseMessage[0].USER_RECORD_NOT_FOUND,{})
      }
    }catch(error){
      console.log("error =>>",error)
      return this.responseUtilService.responseFormat(ResponseStatus[0].INTERNAL_SERVER,ResponseMessage[0].INTERNAL_SERVER,{})
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try{
      let findUserExists=await this.usersRepository.findOne({
        where:{
          id:id
        },
        select:{
          id:true
        }
      })
      if(findUserExists){
        await this.usersRepository.update(findUserExists.id,updateUserDto)
        return this.responseUtilService.responseFormat(ResponseStatus[0].SUCCESS,ResponseMessage[0].UPDATE,{})
      }else{
        return this.responseUtilService.responseFormat(ResponseStatus[0].BAD_REQUEST,ResponseMessage[0].USER_RECORD_NOT_FOUND,{})
      }
    }catch(error){
      console.log("error =>>",error)
      return this.responseUtilService.responseFormat(ResponseStatus[0].INTERNAL_SERVER,ResponseMessage[0].INTERNAL_SERVER,{})
    }
  }

  async remove(id: number) {
    try{
      let response=await this.usersRepository.delete(id)
      if(response.affected){
        return this.responseUtilService.responseFormat(ResponseStatus[0].SUCCESS,ResponseMessage[0].DELETE,{})
      }else{
        return this.responseUtilService.responseFormat(ResponseStatus[0].BAD_REQUEST,ResponseMessage[0].USER_RECORD_NOT_FOUND,{})
      }
    }catch(error){
      return this.responseUtilService.responseFormat(ResponseStatus[0].INTERNAL_SERVER,ResponseMessage[0].INTERNAL_SERVER,{})
    }
  }
}
