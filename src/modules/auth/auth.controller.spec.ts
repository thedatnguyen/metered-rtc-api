import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import axios from 'axios';
import * as dotenv from 'dotenv';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    dotenv.config();
  });

  it('AuthController be defined', () => {
    expect(controller).toBeDefined();
  });

  it('validate meeting', async () => {
    const result = await axios.get(
      `http://localhost:${process.env.LOCAL_PORT}/auth/validateMeeting?meetingId=1`,
    );
    expect(result.data).toEqual({ success: false });
  });

  it('get domain', async () => {
    const domain = (
      await axios.get(
        `http://localhost:${process.env.LOCAL_PORT}/auth/getDomain`,
      )
    ).data.domain;
    expect(domain).toEqual(process.env.METERED_DOMAIN);
  });
});
