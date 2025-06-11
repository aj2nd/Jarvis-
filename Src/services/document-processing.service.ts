import { Injectable, Logger } from '@nestjs/common';
import { OCRService } from './ocr.service';
import { MLClassificationService } from './ml-classification.service';

@Injectable()
export class DocumentProcessingService {
  private readonly logger = new Logger(DocumentProcessingService.name);

  constructor(
    private readonly ocrService: OCRService,
    private readonly mlService: MLClassificationService
  ) {}

  async processDocument(fileBuffer: Buffer): Promise<ProcessedDocument> {
    try {
      const text = await this.ocrService.extractText(fileBuffer);
      const category = await this.mlService.classifyDocument(text);
      const amount = await this.mlService.extractAmount(text);
      
      return {
        text,
        category,
        amount,
        processedAt: new Date()
      };
    } catch (error) {
      this.logger.error(`Processing failed: ${error.message}`);
      throw error;
    }
  }
}
