import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { Token } from './token.dto';

@Controller('token')
export class TokenController {
  private readonly service = new TokenService();

  @Post('/generate')
  @HttpCode(200)
  async generateToken(@Body() tokenData: Token) {
    return await this.service.generateToken(tokenData);
  }

  @Post('/validate')
  @HttpCode(200)
  async validateToken(@Body() body) {
    const token: string = body['token'];
    const { data, error } = await this.service.validateToken(token);
    return data ? { success: true, ...data } : { success: false, error };
  }
}
