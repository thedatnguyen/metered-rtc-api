import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as dotenv from 'dotenv';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    dotenv.config();
  });

  it('AuthService should be define', () => {
    expect(service).toBeDefined();
  });

  it('validate meeting', async () => {
    const result = await service.validateMeeting('uoird3objr');
    console.log(result);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('error');
  });
});
