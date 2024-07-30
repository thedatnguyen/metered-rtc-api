import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly authService: AuthService = new AuthService();

  @Get('/validateMeeting')
  async validateMeeting(@Query('roomName') roomName: string) {
    const { data } = await this.authService.validateMeeting(roomName);
    return data ? { success: true } : { success: false };
  }

  @Get('/getDomain')
  getDomain() {
    return { domain: process.env.METERED_DOMAIN };
  }
}
