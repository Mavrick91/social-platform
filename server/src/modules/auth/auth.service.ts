import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type UserPayload = {
  id: number;
  iat: number;
  exp: number;
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    const user = this.extractUserIdFromRefreshToken(refreshToken);

    if (!user) {
      throw new Error('Invalid refresh token');
    }

    const accessToken = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '1h',
      },
    );

    return { accessToken };
  }

  private extractUserIdFromRefreshToken(
    refreshToken: string,
  ): UserPayload | null {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      return payload;
    } catch (error) {
      console.error('Invalid refresh token', error);
      return null;
    }
  }
}
