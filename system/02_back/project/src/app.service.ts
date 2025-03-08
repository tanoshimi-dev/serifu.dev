import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(): string {
    return '🏠🌳🍴🌳🏢🌳🍰';
  }

  getHello(): string {
    return 'Hello World! Wow 💰　This is the backend of the serifu.dev system.';
  }
}
