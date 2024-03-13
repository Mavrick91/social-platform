import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Global()
@Module({
  imports: [
    JwtModule.register({}), // Potentially re-export JwtModule if needed elsewhere
  ],
  providers: [PrismaService],
  exports: [PrismaService, JwtModule], // Re-export JwtModule
})
export class SharedModule {}
