import { Injectable, HttpService } from '@nestjs/common';
import Axios, { AxiosRequestConfig } from 'axios'
import { Pagination, Product } from './dto/product.dto';


@Injectable()
export class ProductService {

  aerolabMicroservice: HttpService

  constructor() {
    const aerolabMicroserviceUrl:string = "https://coding-challenge-api.aerolab.co"
    this.aerolabMicroservice = new HttpService(Axios.create({ baseURL: aerolabMicroserviceUrl }))
  }


  getToken(): AxiosRequestConfig {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDkyMjNmNTc2NmZiNTAwMjRhYTg3YWMiLCJpYXQiOjE2MjAxOTAxOTd9.mCs42TgkSGhkFf_8JURMh1CUc2QH6wu-CcBxAnan1JU';
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return config;
  }

  async getProducts(page:number, limit:number): Promise<Pagination<Product>> {

  const { data } = await this.aerolabMicroservice.get('products', this.getToken()).toPromise()

  return this.getPagination(data, limit,page)

}

async redeem(productId: string): Promise<string> {

const { data } = await this.aerolabMicroservice.post('redeem', productId, this.getToken()).toPromise()

return data

}

getPagination(array: Product[], limit: number, page:number):Pagination<Product> {

  const data = array.slice((page - 1) * limit, page * limit);

  const pagination: Pagination<Product>  = {
   data,
   pagination : {currentPage: page,   
   pages: Math.ceil(array.length / limit),
   limit: data.length,
   total: array.length
  }

}
return pagination
}

}
