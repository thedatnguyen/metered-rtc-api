import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
  Get,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.dto';

@Controller('room')
export class RoomController {
  constructor() {}
  private readonly service = new RoomService();

  @Get()
  async getAllRooms() {
    return await this.service.getAllRooms();
  }
  @Post()
  async createNewRoom(@Body() room: Room) {
    room = new Room(room);
    return await this.service.createNewRoom(room);
  }

  @Put(':roomName')
  async updateRoom(@Body() room: Room, @Param('roomName') roomName: string) {
    return await this.service.updateRoom(roomName, room);
  }

  @Delete(':roomName')
  @HttpCode(204)
  async deleteRoom(@Param('roomName') roomName: string) {
    await this.service.deleteRoom(roomName);
    return { roomName };
  }

  @Delete('/delete/all')
  @HttpCode(204)
  async deleteAllRooms() {
    return await this.service.deleteAllRooms();
  }
}
