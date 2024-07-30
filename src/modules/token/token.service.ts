import { Injectable } from '@nestjs/common';
import { Token } from './token.dto';
import axios, { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class TokenService {
  constructor() {}

  generateToken = async (token: Token) => {
    const result = {
      token: undefined,
      error: undefined,
    };

    const option = {
      method: 'POST',
      url: `https://${process.env.METERED_DOMAIN}/api/v1/rooms`,
      params: {
        secretKey: process.env.METERED_SECRET_KEY,
      },
      headers: {
        Accept: 'application/json',
      },
      data: token,
    };

    await axios
      .request(option)
      .then((apiRes: AxiosResponse) => {
        result.token = apiRes.data.token;
      })
      .catch((err: AxiosError) => {
        console.log(err.message);
        result.error = err.message;
      });
    return result;
  };

  validateToken = async (token: string) => {
    const result = {
      data: undefined,
      error: undefined,
    };

    const options = {
      method: 'POST',
      url: `https://${process.env.METERED_DOMAIN}/api/v1/token/validate`,
      params: {
        secretKey: process.env.METERED_SECRET_KEY,
      },
      headers: {
        Accept: 'application/json',
      },
      data: {
        token: token,
      },
    };

    await axios
      .request(options)
      .then((apiRes: AxiosResponse) => {
        result.data = apiRes.data;
      })
      .catch((err: AxiosError) => {
        console.log(err.message);
        result.error = err.message;
      });
    return result;
  };
}
