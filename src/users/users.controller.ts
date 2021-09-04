import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
import { User } from '../models/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { PaginatedResult } from 'src/common/paginated-result.interface';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { HasPermission } from '../permission/has-permission.decorator';

@Controller('users')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ){}
    @Get()
    @HasPermission('users')
    async all(
        @Query('page') page:number = 1
    ): Promise<PaginatedResult>{
        return  await this.userService.paginate(page, ['role']);
    }

    @Post()
    @HasPermission('users')
    async create(
        @Body() body: CreateUserDto
    ) : Promise<User>{
        const password  = await bcrypt.hash('1234', 12);

        const {role_id, ...data} = body;

        return this.userService.create({
            ...data,
            password,
            role: { id:role_id}
        })
    }

    @Get(':id')
    @HasPermission('users')
    async get(
        @Param('id') id: number
    ): Promise<User>{
        return this.userService.findOne({id}, ['role']);

    }


    @Put('info')
    @HasPermission('users')
    async updateInfo(
        @Req() request: Request,
        @Body() body: UpdateUserDto
    ){
         const id = await this.authService.userId(request)
         await this.userService.update(id, body);
         return this.userService.findOne(id);
    } 

    @Put('password')
    @HasPermission('users')
    async updatePassword(
        @Req() request: Request,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,

    ){
        if(password !== password_confirm){
            throw new BadRequestException('Passwords do no match')
        }

        const id = await this.authService.userId(request);
        const hashed = await bcrypt.hash(password, 12);
         await this.userService.update(id, {password:hashed});
         return this.userService.findOne(id);
    }


    @Put(':id')
    @HasPermission('users')
    async update(
        @Param('id') id: number,
        @Body() body: UpdateUserDto
    ){
        const {role_id, ...data} = body;

         await this.userService.update(id,{
             ...data,
             role: {id: role_id}
         });
         return this.userService.findOne(id);
    }  

    @Delete(':id')
    @HasPermission('users')
    async delete(
        @Param('id') id: number,
       
    ){
         return this.userService.delete(id);
    }
}
