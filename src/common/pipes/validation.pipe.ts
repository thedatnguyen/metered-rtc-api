import {
  // PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      return value;
    }
    const obj = plainToInstance(metadata.metatype, value);
    const errors: ValidationError[] = await validate(obj);
    if (errors.length) {
      console.log(errors[0]);
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST, {
        cause: errors,
      });
    }
    return value;
  }
}
