import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDTO } from './dtos/userRegister.dto';
import { UserLoginDTO } from './dtos/userLogin';
import { Response } from 'express';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { UpdateUserDTO } from './dtos/update/userUpdate';
import { UserFollowDTO } from './dtos/userFollow.dto';
import { BuyDTO } from './dtos/userBuy.dto';
import { Request } from '@nestjs/common';
import { GitfDTO } from './dtos/userGift.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard)
  @Get(':id')
  public async getCurrentUser(
    @Param('id') userId: string,
    @Res() res: Response,
  ) {
    try {
      const user = await this.userService.findUser(userId);

      res.send(user);
    } catch (err) {
      console.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('register')
  async simpleRegister(
    @Body() user: UserRegisterDTO,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const savedUser = await this.userService.register(user);

      const jwt = await this.userService.createJwt(savedUser._id);

      res.header('Authorization', `Bearer ${jwt}`);

      res.send(savedUser);
    } catch (err) {
      console.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async simpleLogin(@Body() userDTO: UserLoginDTO, @Res() res: Response) {
    try {
      const { user } = await this.userService.login(userDTO);

      const jwt = await this.userService.createJwt(user._id.toString());

      res.cookie('Authorization', jwt);
      res.header('Authorization', `Bearer ${jwt}`);

      res.send(user);
    } catch (err) {
      console.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @Patch('update/:id')
  async updateProfile(
    @Body() userUpdateDTO: UpdateUserDTO,
    @Param('id') id: string,
  ) {
    try {
      return await this.userService.update(userUpdateDTO, id);
    } catch (err) {
      console.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @Post('follow')
  async follow(@Body() userFollowDTO: UserFollowDTO) {
    try {
      return await this.userService.follow(userFollowDTO);
    } catch (err) {
      console.error(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @Post('buy')
  async buyCoins(@Body() buyDto: BuyDTO, @Req() req: any) {
    try {
      const buyerId = req.body.userId;
      return await this.userService.buyCoins({ buyerId, ...buyDto });
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(AuthGuard)
  @Post('gift')
  async giftHost(@Body() giftDto: GitfDTO, @Req() req: any) {
    try {
      const senderId = req.body.userId;
      return await this.userService.sendGift({ senderId, ...giftDto });
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
  
}
