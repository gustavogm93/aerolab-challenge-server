import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class UserService {
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

  async getUser(): Promise<string> {
    const { data } = await this.aerolabMicroservice
      .get('user/me', this.getToken())
      .toPromise();

    return data;
  }

  async getHistory(): Promise<string> {
    const { data } = await this.aerolabMicroservice
      .get('user/history', this.getToken())
      .toPromise();

    return data;
  }

  async updatePoints(): Promise<number> {
    const amount = 1000;
    await this.aerolabMicroservice
      .post('user/points', { amount: amount }, this.getToken())
      .toPromise();

    return amount;
  }
}
