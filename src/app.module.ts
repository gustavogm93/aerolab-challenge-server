import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { ProductModule } from './api/product/product.module';
import { config } from './config/config';

@Module({
  imports: [
    UserModule,
    ProductModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
  ],
})
export class AppModule {}
