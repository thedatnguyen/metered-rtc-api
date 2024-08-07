import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as dotenv from 'dotenv';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Room } from 'src/modules/room/room.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let roomName: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    dotenv.config();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // get domain
  it('/auth/getDomain (GET)', () => {
    return request(app.getHttpServer())
      .get('/auth/getDomain')
      .expect(200)
      .expect({
        domain: `${process.env.METERED_DOMAIN}`,
      });
  });

  // get all rooms
  it('room (GET)', async () => {
    const options = {
      method: 'GET',
      url: `http://localhost:${process.env.LOCAL_PORT}/room/`,
      headers: {
        Accept: 'application/json',
      },
    };

    await axios.request(options).then((apiRes: AxiosResponse) => {
      expect(apiRes.data.count).toBeInstanceOf(Number);
      expect(apiRes.data.rooms).toBeInstanceOf(Object);
      expect(apiRes.status).toEqual(200);
    });
  });

  // delete all rooms
  it('room/delete/all (DELETE)', async () => {
    const options = {
      method: 'DELETE',
      url: `http://localhost:${process.env.LOCAL_PORT}/room/delete/all`,
      headers: {
        Accept: 'application/json',
      },
    };

    await axios.request(options).then((apiRes: AxiosResponse) => {
      // expect(apiRes.data).toBeInstanceOf(Array);
      expect(apiRes.status).toEqual(204);
    });
  });

  // create public rooms
  it('room (POST)', async () => {
    const options = {
      method: 'POST',
      url: `http://localhost:${process.env.LOCAL_PORT}/room`,
      headers: {
        Accept: 'application/json',
      },
      data: {
        privacy: 'public',
        foo: 'bar',
      },
    };

    await axios.request(options).catch((err: AxiosError) => {
      expect(err.response.status).toEqual(400);
    });

    options.data.foo = undefined;
    await axios.request(options).then((apiRes: AxiosResponse) => {
      expect(apiRes.status).toEqual(201);
      roomName = apiRes.data.roomName;
    });
  });

  // update room to private
  it('room/:roomName (PUT)', async () => {
    const options = {
      method: 'PUT',
      url: `http://localhost:${process.env.LOCAL_PORT}/room/${roomName}`,
      headers: {
        Accept: 'application/json',
      },
      data: {
        privacy: 'private',
      },
    };

    await axios.request(options).then((apiRes: AxiosResponse) => {
      const room: Room = apiRes.data;
      expect(apiRes.status).toEqual(200);
      expect(room.privacy).toEqual('private');
    });
  });

  // delete room
  it('room/:roomName (DELETE)', async () => {
    const options = {
      method: 'DELETE',
      url: `http://localhost:${process.env.LOCAL_PORT}/room/${roomName}`,
      headers: {
        Accept: 'application/json',
      },
    };

    await axios.request(options).then((apiRes: AxiosResponse) => {
      expect(apiRes.status).toEqual(204);
    });
  });
});
