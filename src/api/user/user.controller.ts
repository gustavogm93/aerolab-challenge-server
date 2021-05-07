import { Controller, Get } from '@nestjs/common';
import { UserService } from './User.service';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get('/me')
  getUser(): Promise<string> {
    return this.UserService.getUser();
  }

  @Get('/history')
  getHistory(): Promise<string> {
    return this.UserService.addPoints();
  }

  @Get('/points')
  addPoints(): Promise<string> {
    return this.UserService.addPoints();
  }


}
 