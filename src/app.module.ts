import path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config'
import {UserModule } from './api/user/user.module';
import {ProductModule } from './api/product/product.module';

@Module({
  imports: [UserModule, ProductModule]
})
export class AppModule {}
