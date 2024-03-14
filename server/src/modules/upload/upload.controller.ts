import {
  Controller,
  Delete,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { ConfigService } from '@nestjs/config';
import { FileUpload } from '../decorators/file-upload.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploads')
export class UploadController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@FileUpload() file: Express.Multer.File) {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    const fileKey = `${Date.now()}.${file.originalname.split('.').pop()}`;

    try {
      await this.s3Service.uploadFile(file.buffer, bucketName, fileKey);

      const fileUrl = `https://${bucketName}.s3.amazonaws.com/${fileKey}`;

      return { fileUrl, fileKey };
    } catch (error) {
      console.error('Failed to upload file:', error);
      throw error;
    }
  }

  @Post('get-upload-url')
  async getUploadUrl() {
    const key = `${Date.now()}.jpg`;
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    console.log('😀😀', { bucketName });
    const signedUrl = await this.s3Service.getSignedUrl(key, bucketName);
    return { signedUrl, key };
  }

  @Delete(':fileKey')
  async deleteFile(@Param('fileKey') fileKey: string) {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');

    try {
      await this.s3Service.deleteFile(bucketName, fileKey);
      return { message: 'File deleted successfully' };
    } catch (error) {
      console.error('Failed to delete file:', error);
      throw error;
    }
  }
}
