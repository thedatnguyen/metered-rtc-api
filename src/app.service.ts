import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkServerAlive(): string {
    return 'Hello World!';
  }
}
