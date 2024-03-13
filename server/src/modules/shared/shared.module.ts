import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Global()
@Module({
  imports: [JwtModule.register({})],
  providers: [PrismaService],
  exports: [PrismaService, JwtModule],
})
export class SharedModule {}
