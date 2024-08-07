import { Injectable } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Room } from './room.dto';

@Injectable()
export class RoomService {
  constructor() {}

  getAllRooms = async () => {
    let rooms: Room[];
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
        rooms = apiRes.data;
      })
      .catch((err: AxiosError) => {
        console.log(err.response.data);
        throw err;
      });
    return {
      count: rooms.length,
      rooms: rooms.reduce((r, room: Room) => {
        r[room.roomName] = room;
        return r;
      }, {}),
    };
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
        throw err;
      });
    return result;
  };

  updateRoom = async (roomName: string, room: Room) => {
    let result: Room;

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
        result = apiRes.data;
      })
      .catch((err: AxiosError) => {
        throw err;
      });
    return result;
  };

  deleteRoom = async (roomName: string) => {
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
    await axios.request(options).catch((err: AxiosError) => {
      throw err;
    });
    return roomName;
  };

  deleteAllRooms = async () => {
    try {
      const rooms = (await this.getAllRooms()).rooms;
      const roomNames = Object.keys(rooms);
      console.log(roomNames);
      await Promise.all(roomNames.map((roomName) => this.deleteRoom(roomName)));
      return roomNames;
    } catch (error) {
      console.log(error);
    }
  };
}
