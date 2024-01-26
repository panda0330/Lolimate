import { Module } from '@nestjs/common';
import { ResselerService } from './resseler.service';
import { ResselerController } from './resseler.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reseller, ResellerSchema } from './resseller.schema';
import { CoreModule } from 'src/core/core.module';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    SharedModule,
    CoreModule,
    UserModule,
    MongooseModule.forFeature([
      {
        name: Reseller.name,
        schema: ResellerSchema,
      },
    ]),
  ],
  controllers: [ResselerController],
  providers: [ResselerService],
  exports: [MongooseModule],
})
export class ResselerModule { }
