import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }
    const obj = plainToInstance(metadata.metatype, value);
    const errors = await validate(obj, {
      whitelist: true,
      forbidNoneWhitelisted: true,
    });
    if (errors.length) {
      console.error(errors);
      console.log(errors.length);
      console.log(errors[0]);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST, {
        cause: errors,
      });
    }
    return value;
  }
}
