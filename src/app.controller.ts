import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return {
      message: this.appService.getHello(),
      service: 'Songs Microservice',
      version: '1.0.0',
      endpoints: {
        songs: '/api/songs',
        health: '/api/health'
      }
    };
  }

  @Get('health')
  getHealth() {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'Songs Microservice',
      database: 'Connected'
    };
  }
}
