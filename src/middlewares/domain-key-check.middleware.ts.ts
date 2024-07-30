import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DomainKeyCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    const domain = process.env.METERED_DOMAIN;
    const key = process.env.METERED_SECRET_KEY;
    if (!domain || !key) {
      return res.send('Please specify the METERED_DOMAIN and METERED_KEY.');
    }
    next();
  }
}
