import { HttpException } from '@nestjs/common';

export function preventUnacceptProperties(className, obj) {
  const acceptable = Object.getOwnPropertyNames(className);
  console.log(acceptable);
  if (obj instanceof Object) {
    const error = Object.keys(obj).reduce(
      (err, key) => (acceptable.includes(key) ? err : [...err, key]),
      [],
    );
    if (error.length)
      throw new HttpException('Bad request', 400, {
        cause: `${error.join(', ')} are unacceptable properties`,
      });
  }
}
