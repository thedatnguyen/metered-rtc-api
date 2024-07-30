import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import * as dotenv from 'dotenv';

describe('RoomService', () => {
  let service: RoomService;
  const roomsCreated = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomService],
    }).compile();

    service = module.get<RoomService>(RoomService);
    dotenv.config();
  });

  it('room service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create a private room', async () => {
    const room = (
      await service.createNewRoom({
        privacy: 'private',
      })
    ).data;
    console.log(`room: ${room.roomName}\nprivacy: ${room.privacy}`);
    expect(room.privacy).toBe('private');
    roomsCreated.push(room.roomName);
  });

  it('create a public room', async () => {
    const room = (
      await service.createNewRoom({
        privacy: 'public',
      })
    ).data;
    console.log(`create room: ${room.roomName}\nprivacy: ${room.privacy}`);
    expect(room.privacy).toBe('public');
    roomsCreated.push(room.roomName);
  });

  it('delete rooms created on test', async () => {
    const result = await Promise.all(
      roomsCreated.map((room) => service.deleteRoom(room)),
    );
    expect(
      result.map((r) => {
        console.log(`Delete room: ${r.data}`);
        return r.data;
      }),
    ).toEqual(roomsCreated);
  });

  it('get all rooms', async () => {
    const { data } = await service.getAllRooms();
    expect(data).toBeInstanceOf(Array);
    if (data.length > 0) {
      expect(data[0]).toHaveProperty('_id');
    }
  });
});
