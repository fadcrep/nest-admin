import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {

    constructor(private jwService: JwtService){

    }

    async userId( request:Request): Promise<number>{
        const cookie = request.cookies['jwt'];
        const data = await this.jwService.verifyAsync(cookie)

        return data['id'];
    }
}
