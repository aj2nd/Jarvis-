import { Test } from '@nestjs/testing';
import { AccountingService } from './accounting.service';

describe('AccountingService', () => {
  let service: AccountingService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AccountingService],
    }).compile();

    service = module.get<AccountingService>(AccountingService);
  });

  it('should process document correctly', async () => {
    const mockFile = { buffer: Buffer.from('test') } as Express.Multer.File;
    const result = await service.processDocument(mockFile);
    expect(result).toHaveProperty('amount');
  });
});
