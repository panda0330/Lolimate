import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ResselerModule } from './resseler/resseler.module';

@Module({
  imports: [UserModule, AdminModule, ResselerModule],
  exports: [UserModule],
})
export class DomainModule {}
