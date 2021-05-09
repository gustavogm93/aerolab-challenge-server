// eslint-disable-next-line prettier/prettier
import {
  Controller,
  Get
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  getUser(): Promise<string> {
    return this.userService.getUser();
  }

  @Get('/history')
  getHistory(): Promise<string> {
    return this.userService.getHistory();
  }

  @Get('/points')
  addPoints(): Promise<number> {
    return this.userService.updatePoints();
  }
}
