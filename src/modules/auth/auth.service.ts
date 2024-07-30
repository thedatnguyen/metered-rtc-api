import { Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class AuthService {
  constructor() {}

  validateMeeting = async (roomName: string) => {
    const result = {
      data: undefined,
      error: undefined,
    };

    const options = {
      method: 'GET',
      url: `https://${process.env.METERED_DOMAIN}/api/v1/room/${roomName}`,
      params: {
        secretKey: process.env.METERED_SECRET_KEY,
      },
      headers: {
        Accept: 'application/json',
      },
    };

    await axios
      .request(options)
      .then((apiRes: AxiosResponse) => {
        result.data = apiRes.data;
      })
      .catch((err: AxiosError) => {
        result.error = err.message;
        console.log(err);
      });
    return result;
  };
}
