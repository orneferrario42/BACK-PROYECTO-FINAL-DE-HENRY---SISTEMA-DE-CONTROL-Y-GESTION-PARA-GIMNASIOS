import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorController } from './profesor.controller';
import { ProfesorService } from './profesor.service';

describe('ProfesorController', () => {
  let controller: ProfesorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfesorController],
      providers: [ProfesorService],
    }).compile();

    controller = module.get<ProfesorController>(ProfesorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
