import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { Token } from './token.dto';

@Controller('token')
export class TokenController {
  private readonly service = new TokenService();

  @Post('/generate')
  async generateToken(@Body() tokenData: Token) {
    const { token, error } = await this.service.generateToken(tokenData);
    return token ? { success: true, token } : { success: false, error };
  }

  @Post('/validate')
  async validateToken(@Body() body) {
    const token: string = body['token'];
    const { data, error } = await this.service.validateToken(token);
    return data ? { success: true, ...data } : { success: false, error };
  }
}
