import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const productController = app.get<ProductController>(ProductController);
      expect(productController.getProducts()).toBe('Hello World!');
    });
  });
});
