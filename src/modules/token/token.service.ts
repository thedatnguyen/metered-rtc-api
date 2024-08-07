import { Injectable } from '@nestjs/common';
import { Token } from './token.dto';
import axios, { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class TokenService {
  constructor() {}

  generateToken = async (tokenData: Token) => {
    let token: string;
    const option = {
      method: 'POST',
      url: `https://${process.env.METERED_DOMAIN}/api/v1/token`,
      params: {
        secretKey: process.env.METERED_SECRET_KEY,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: tokenData,
    };

    await axios
      .request(option)
      .then((apiRes: AxiosResponse) => {
        token = apiRes.data.token;
      })
      .catch((err: AxiosError) => {
        throw err;
      });
    return token;
  };

  validateToken = async (token: string) => {
    let result: any;
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
        result = apiRes.data;
      })
      .catch((err: AxiosError) => {
        throw err;
      });
    return result;
  };
}
