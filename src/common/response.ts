import { Injectable } from "@nestjs/common";


@Injectable()
export class ResponseUtilService{
    async responseFormat(status,message,data):Promise<object>{
        return {
            status,
            message,
            data
        }
    }
}