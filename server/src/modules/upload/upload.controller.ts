import {
  Controller,
  Delete,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { convertAndUploadImage } from 'src/image-upload.util';
import { FileUpload } from '../decorators/file-upload.decorator';
import { S3Service } from '../s3/s3.service';

@Controller('uploads')
export class UploadController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@FileUpload() file: Express.Multer.File) {
    const fileKey = `${Date.now()}.${file.originalname.split('.').pop()}`;
    const baseKey = `posts/post-${fileKey}`;

    try {
      const urls = await convertAndUploadImage(file.buffer, baseKey, [
        { name: 'original' },
        { name: 'thumbnail', width: 300, height: 300 },
        { name: 'medium', width: 512 },
        { name: 'small', width: 170 },
      ]);

      return { sizes: urls, fileName: fileKey };
    } catch (error) {
      console.error('Failed to upload file:', error);
      throw error;
    }
  }

  @Post('get-upload-url')
  async getUploadUrl() {
    const key = `${Date.now()}.jpg`;
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
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
