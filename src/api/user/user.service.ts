import { Injectable, HttpService } from '@nestjs/common'
import Axios, { AxiosRequestConfig } from 'axios'

@Injectable()
export class UserService {
  aerolabMicroservice: HttpService;

  constructor() {
    const aerolabMicroserviceUrl = 'https://coding-challenge-api.aerolab.co';
    this.aerolabMicroservice = new HttpService(
      Axios.create({ baseURL: aerolabMicroserviceUrl }),
    );
  }

  getToken(): AxiosRequestConfig {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDkyMjNmNTc2NmZiNTAwMjRhYTg3YWMiLCJpYXQiOjE2MjAxOTAxOTd9.mCs42TgkSGhkFf_8JURMh1CUc2QH6wu-CcBxAnan1JU';
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${token}` },
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

  async addPoints(): Promise<string> {
    const { data } = await this.aerolabMicroservice
      .post('user/points', { amount: 1000 }, this.getToken())
      .toPromise();

    return data;
  }
}
