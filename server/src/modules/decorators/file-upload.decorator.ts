import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Express } from 'express';

export const FileUpload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Express.Multer.File | undefined => {
    const request = ctx.switchToHttp().getRequest();
    return request.file;
  },
);
