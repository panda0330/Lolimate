import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ResselerService } from './resseler.service';
import { TransferDTO } from './dtos/transfer.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';

@Controller('reseller')
export class ResselerController {
  constructor(
    private readonly resselerService: ResselerService,
  ) { }

  @UseGuards(AuthGuard)
  @Post('transfer')
  public async transfer(@Body() transferDto: TransferDTO, @Req() req: any) {
    try {
      const senderId = req.body.userId;
      return await this.resselerService.transfer({senderId, ...transferDto});
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

}
