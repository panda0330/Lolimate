import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateLevelDTO } from './dto/createLevel.dto';
import { AdminLoginDTO } from './dto/adminLogin.dto';
import { Response } from 'express';
import { AdminGuard } from 'src/core/guards/admin.guard';
import { AccreditResellerDTO } from './dto/accreditResellers.dto';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly logger: Logger,
  ) {}

  @Post('login')
  async login(@Body() adminLoginDTO: AdminLoginDTO, @Res() res: Response) {
    try {
      await this.adminService.login(adminLoginDTO);

      const jwt = await this.adminService.createJwt();

      res.cookie('Authorization', jwt);
      res.header('Authorization', `Bearer ${jwt}`);

      res.send();
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AdminGuard)
  @Post('createLevel')
  async createLevel(@Body() createLevelDTO: CreateLevelDTO) {
    try {
      return await this.adminService.createLevel(createLevelDTO);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AdminGuard)
  @Post('reseller')
  async accreditResellers(@Body() accreditResellerDTO: AccreditResellerDTO) {
    try {
      return await this.adminService.accreditResellers(accreditResellerDTO);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
