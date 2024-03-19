import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    const userId = this.extractUserIdFromRefreshToken(refreshToken);

    if (!userId) {
      throw new Error('Invalid refresh token');
    }

    const accessToken = this.jwtService.sign(
      { userId: userId },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '1h',
      },
    );

    return { accessToken };
  }

  private extractUserIdFromRefreshToken(refreshToken: string): string | null {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      return payload.id;
    } catch (error) {
      console.error('Invalid refresh token', error);
      return null;
    }
  }
}
