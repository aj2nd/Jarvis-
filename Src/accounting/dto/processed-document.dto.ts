import { ApiProperty } from '@nestjs/swagger';

export class ProcessedDocumentDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  processedAt: Date;
}
