import { Body, Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get('/me')
  getUser(): Promise<string> {
    return this.UserService.getUser();
  }

  @Get('/history')
  getHistory(): Promise<string> {
    return this.UserService.getHistory();
  }

  @Get('/points')
  addPoints(): Promise<Number> {
    return this.UserService.updatePoints();
  }


}
 