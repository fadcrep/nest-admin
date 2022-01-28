import { Controller, Get, UseGuards } from '@nestjs/common';
import { Permission } from '../models/permission.entity';
import { PermissionService } from './permission.service';
import {HasPermission} from './has-permission.decorator';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async all(): Promise<Permission[]>{
    return this.permissionService.all();
  }

 


}
