import { Controller, Post, UploadedFile, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('accounting')
@UseGuards(JwtAuthGuard)
@ApiTags('Accounting')
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload financial document' })
  @ApiResponse({ 
    status: 201, 
    description: 'Document processed successfully' 
  })
  async uploadDocument(@UploadedFile() file: Express.Multer.File) {
    return this.accountingService.processDocument(file);
  }
}
