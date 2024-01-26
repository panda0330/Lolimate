import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLevelDTO } from './dto/createLevel.dto';
import { Model } from 'mongoose';
import { Level } from '../../shared/schemas/level.schema';
import { AdminLoginDTO } from './dto/adminLogin.dto';
import { Admin } from './entities/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccreditResellerDTO } from './dto/accreditResellers.dto';
import { User } from '../user/user.schema';
import { Reseller } from '../resseler/resseller.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Level.name) private readonly levelModel: Model<Level>,
    @InjectModel(Admin.name) private readonly loginModel: Model<Admin>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Reseller.name) private readonly resellerModel: Model<Reseller>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createLevel(createLevelDTO: CreateLevelDTO) {
    const dbLevel = await this.levelModel
      .findOne({
        levelNumber: createLevelDTO.levelNumber,
      })
      .exec();

    if (dbLevel) throw new Error('level Exists');

    return new this.levelModel(createLevelDTO).save();
  }

  async login({ login, password }: AdminLoginDTO) {
    const dbAdmin = await this.loginModel
      .findOne({
        login,
        password,
      })
      .exec();

    if (!dbAdmin) throw new UnauthorizedException();
  }

  public async createJwt() {
    return await this.jwtService.signAsync(
      {
        role: this.configService.get<string>('ADMIN_SECRET_LOGIN'),
        expiresIn: '7d',
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
      },
    );
  }

  public async accreditResellers({ userId, whatsapp }: AccreditResellerDTO) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not exists');
    }

    const reseller = await this.resellerModel.create({
      userId,
      whatsapp,
    });
    await this.userModel.findByIdAndUpdate(userId, {
      isReseller: true,
    });

    return {
      user,
      reseller,
    };
  }
}
