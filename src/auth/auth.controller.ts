import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from '../dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response , Request} from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(private usersService: UsersService,
                private jwtService: JwtService,
                private authService: AuthService){

    }

    @Post('register')
    async register(
        @Body() body: RegisterDto
    ){
        if(body.password !== body.password_confirm){
            throw new BadRequestException('passwords do not match!')
        }
        const hashed = await bcrypt.hash(body.password, 12);
        return  this.usersService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: hashed,
            role: {id:1}
        });
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({passthrough:true}) response: Response
    ){
        const user =  await this.usersService.findOne({email});

        if(!user){
            throw new NotFoundException('User not found')
            
        }

        if(!await bcrypt.compare(password, user.password)){
            throw new BadRequestException('Invalid credentials')
            
        }
        const jwt = await this.jwtService.signAsync({id: user.id});
        response.cookie('jwt', jwt, {httpOnly:true});
        return user;
    }

   
    @UseGuards(AuthGuard)
    @Get('user')
    async user(
        @Req() request: Request
    ){
       const id = await this.authService.userId(request)

        return this.usersService.findOne({id});
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(
        @Res({passthrough:true}) response: Response
    ){
        response.clearCookie('jwt');

        return {
            message: 'Success'
        }

    }
}
