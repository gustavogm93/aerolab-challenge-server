import { Injectable, HttpService } from '@nestjs/common';
import Axios, { AxiosRequestConfig } from 'axios';
import { ConfigService } from '@nestjs/config';
import { Pagination, Product } from './dto/product.dto';

@Injectable()
export class ProductService {
  aerolabMicroservice: HttpService;
  token: string;

  constructor(private readonly configService: ConfigService) {
    const aerolabMicroserviceUrl = this.configService.get('baseUrl');
    const token = this.configService.get('token');

    this.aerolabMicroservice = new HttpService(
      Axios.create({ baseURL: aerolabMicroserviceUrl }),
    );
    this.token = token;
  }

  getToken(): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${this.token}` },
    };

    return config;
  }

  async getProducts(page: number, limit: number): Promise<Pagination<Product>> {
    const { data } = await this.aerolabMicroservice

      .get('/products', this.getToken())
      .toPromise();
    return this.getPagination(data, limit, page);
  }

  async redeem(productId: string): Promise<string> {
    const { data } = await this.aerolabMicroservice
      .post('redeem', productId, this.getToken())
      .toPromise();

    return data;
  }

  getPagination(
    array: Product[],
    limit: number,
    page: number,
  ): Pagination<Product> {
    const data = array.slice((page - 1) * limit, page * limit);

    const pagination: Pagination<Product> = {
      data,
      pagination: {
        currentPage: page,
        pages: Math.ceil(array.length / limit),
        limit: data.length,
        total: array.length,
      },
    };
    return pagination;
  }
}
