import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTestUser(): { name: string } {
    return { name: 'John' };
  }
}
