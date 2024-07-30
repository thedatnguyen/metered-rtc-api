import { Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Room } from './room.dto';

@Injectable()
export class RoomService {
  constructor() {}

  getAllRooms = async () => {
    const result = {
      data: undefined,
      error: undefined,
    };

    const options = {
      method: 'GET',
      url: `https://${process.env.METERED_DOMAIN}/api/v1/rooms`,
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
        console.log(err.message);
        result.error = err.message;
      });
    return result;
  };

  createNewRoom = async (room: Room) => {
    let result: Room;
    const options = {
      method: 'POST',
      url: `https://${process.env.METERED_DOMAIN}/api/v1/room`,
      params: {
        secretKey: process.env.METERED_SECRET_KEY,
      },
      headers: {
        Accept: 'application/json',
      },
      data: room,
    };
    await axios
      .request(options)
      .then((apiRes: AxiosResponse) => {
        result = apiRes.data;
      })
      .catch((err: AxiosError) => {
        console.log(err.response.data['error']['details']);
        throw err;
      });
    return result;
  };

  updateRoom = async (roomName: string, room: Room) => {
    const result = {
      data: undefined,
      error: undefined,
    };

    const options = {
      method: 'PUT',
      url: `https://${process.env.METERED_DOMAIN}/api/v1/room/${roomName}`,
      params: {
        secretKey: process.env.METERED_SECRET_KEY,
      },
      headers: {
        Accept: 'application/json',
      },
      data: room,
    };

    await axios
      .request(options)
      .then((apiRes: AxiosResponse) => {
        result.data = apiRes.data;
      })
      .catch((err: AxiosError) => {
        result.error = err.message;
        console.log(result.error);
      });
    return result;
  };

  deleteRoom = async (roomName: string) => {
    const result = {
      data: undefined,
      error: undefined,
    };
    const options = {
      method: 'DELETE',
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
      .then(() => {
        result.data = roomName;
      })
      .catch((err: AxiosError) => {
        result.error = err.message;
        console.log(err.message);
      });
    return result;
  };
}
