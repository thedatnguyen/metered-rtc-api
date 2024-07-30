import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.dto';

@Controller('room')
export class RoomController {
  constructor() {}
  private readonly service = new RoomService();

  @Post()
  async createNewRoom(@Body() room: Room) {
    room = new Room(room);
    return await this.service.createNewRoom(room);
  }

  @Put(':roomName')
  async updateRoom(@Body() room: Room, @Param('roomName') roomName: string) {
    const { data, error } = await this.service.updateRoom(roomName, room);
    if (data) return { success: true, ...data };
    return { success: false, error };
  }

  @Delete(':roomName')
  async deleteRoom(@Param('roomName') roomName: string) {
    const { data, error } = await this.service.deleteRoom(roomName);
    if (data) return { success: true, ...data };
    return { success: false, error };
  }
}
