import { createParamDecorator, HttpException } from '@nestjs/common';

export const PreventUnacceptableProperty = createParamDecorator(
  (className, obj: unknown) => {
    const acceptable = Object.getOwnPropertyNames(className);
    if (obj instanceof Object) {
      const error = Object.keys(obj).reduce(
        (err, key) => (acceptable.includes(key) ? err : [...err, key]),
        [],
      );
      if (error.length)
        // throw new Error(`Unacceptable properties: ${error.join(', ')}`);
        throw new HttpException(null, 400, {
          cause: `Unacceptable properties: ${error.join(', ')}`,
        });
    }
  },
);
