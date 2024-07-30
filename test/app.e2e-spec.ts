import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as dotenv from 'dotenv';
import axios, { AxiosError, AxiosResponse } from 'axios';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    dotenv.config();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let room;

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
        xyz: 'asasas',
      },
    };

    await axios
      .request(options)
      .then((apiRes: AxiosResponse) => {
        room = apiRes.data;
        console.log(room);
      })
      .catch((err: AxiosError) => {
        console.log(err.response.data);
      });
  });
});
