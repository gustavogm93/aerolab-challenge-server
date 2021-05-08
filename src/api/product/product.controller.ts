import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Product } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("/")
  async getProducts(
  @Query('page') page:number = 1,
  @Query('limit') limit:number = 16,): Promise<Product[]> {
    return this.productService.getProducts(page,limit);
  }

  @Post("/redeem")
  async redeem(@Body() productId: string,
  ): Promise<string> {
    return this.productService.redeem(productId);
  }
}
 