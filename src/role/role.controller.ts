import { Param, Post } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { HasPermission } from '../permission/has-permission.decorator';
import { Role } from '../models/role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}


  @Get()
  @HasPermission('roles')
  async  all(){
    return this.roleService.all();
  }

  @Get(':id')
  @HasPermission('roles')
    async get(
        @Param('id') id: number
    ): Promise<Role>{
        return this.roleService.findOne({id}, ['permissions']);

    }

    @Post()
    @HasPermission('roles')
    async create(
      @Body('name') name: string,
      @Body('permissions') ids: number []
    ){
      /** 
       * 
       * [1,2]
       * 
       * 
       * [
       *  {id:1}, {id:2} ]
       * **/
      return this.roleService.create({
        name,
        permissions: ids.map(id => ({id}))
      });
    }

    @Put(':id')
    @HasPermission('roles')
    async update(
        @Param('id') id: number,
        @Body('name') name: string,
        @Body('permissions') ids: number []
    ){
         await this.roleService.update(id, {name});

         const role =  await this.roleService.findOne(id);

         return this.roleService.create({
           ...role,
           permissions: ids.map(id => ({id})) 
         })
    }  

    @Delete(':id')
    @HasPermission('roles')
    async delete(
        @Param('id') id: number,
       
    ){
         return this.roleService.delete(id);
    }
}
