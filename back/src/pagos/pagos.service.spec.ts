import { Test, TestingModule } from '@nestjs/testing';
import { PagosService } from './pagos.service';

describe('PagosService', () => {
  let service: PagosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagosService],
    }).compile();

    service = module.get<PagosService>(PagosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
