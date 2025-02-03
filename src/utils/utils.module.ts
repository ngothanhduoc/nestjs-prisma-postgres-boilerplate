import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UtilsService } from './utils.service';

@Module({
  imports: [HttpModule],
  providers: [UtilsService, ConfigService],
  exports: [UtilsService],
})
export class UtilsModule {}
