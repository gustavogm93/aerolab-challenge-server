import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Pagination, Product } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async getProducts(
    @Query('page') page = 1,
    @Query('limit') limit = 16,
  ): Promise<Pagination<Product>> {
    return this.productService.getProducts(page, limit);
  }

  @Post('/redeem')
  async redeem(@Body() productId: string): Promise<string> {
    return this.productService.redeem(productId);
  }
}
