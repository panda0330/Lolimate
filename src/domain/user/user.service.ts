import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Document, Model } from 'mongoose';
import { UserRegisterDTO } from './dtos/userRegister.dto';
import { UserLoginDTO } from './dtos/userLogin';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDTO } from './dtos/update/userUpdate';
import { UserFollowDTO } from './dtos/userFollow.dto';
import { BuyDTO } from 'src/shared/services/coins/dto/buy.dto';
import { CoinsBuyService } from 'src/shared/services/coins/buy.service';
import { CoinsTransferService } from 'src/shared/services/coins/transfer.service';
import { UserBuyCoinsStrategy } from './strategy/coins/buy.strategy';
import { TransferDTO } from 'src/shared/services/coins/dto/transfer.dto';
import { GiftTransferStrategy } from './strategy/coins/transfer.strategy';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private buyCoinsService: CoinsBuyService,
    private transferCoinsService: CoinsTransferService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async register(user: UserRegisterDTO): Promise<Document<any>> {
    const dbUser = await this.userModel
      .findOne({
        nickname: user.nickname,
      })
      .exec();

    if (dbUser) {
      throw new Error('User exists');
    }

    return new this.userModel(user).save();
  }

  public async login(user: UserLoginDTO) {
    const dbUser = await this.userModel
      .findOne({
        credentials: user.credential,
        typeOfLogin: user.typeOfLogin,
      })
      .exec();

    if (!dbUser) {
      return {
        exists: false,
        user: null,
      };
    }

    return {
      exists: true,
      user: dbUser,
    };
  }

  public async findUser(userId: string) {
    const dbUser = await this.userModel.findOne({
      _id: userId,
    });
    console.log(await this.userModel.find());

    if (!dbUser) {
      return null;
    }

    return dbUser;
  }

  public async update(user: UpdateUserDTO, id: string) {
    await this.findUser(user.userId);

    return await this.userModel.findByIdAndUpdate(id, user).exec();
  }

  public async follow({ targetId, userId }: UserFollowDTO) {
    const [_, user] = await Promise.all([
      this.findUser(targetId),
      this.findUser(userId),
    ]);

    // @ts-ignore
    if (user.followers.includes(targetId)) {
      throw new Error('the user follows');
    }

    return await this.userModel.findByIdAndUpdate(userId, {
      followers: [...user.followers, targetId],
    });
  }

  public async createJwt(userId: string) {
    return await this.jwtService.signAsync(
      {
        userId,
        expiresIn: '7d',
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
      },
    );
  }

  public async buyCoins(buyDto: BuyDTO) {
    this.buyCoinsService.setStrategy(
      new UserBuyCoinsStrategy(this.userModel));

    return await this.buyCoinsService.buy(buyDto);
  }

  public async sendGift(transferDto: TransferDTO) {
    this.transferCoinsService.setStrategy(
      new GiftTransferStrategy(this.userModel));

    return await this.transferCoinsService.transfer(transferDto);
  }
}
