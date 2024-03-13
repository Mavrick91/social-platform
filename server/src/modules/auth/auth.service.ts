import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string }> {
    const userId = this.extractUserIdFromRefreshToken(refreshToken);

    if (!userId) {
      throw new Error('Invalid refresh token');
    }

    const accessToken = this.jwtService.sign({
      userId: userId,
    });

    return { accessToken };
  }

  private extractUserIdFromRefreshToken(refreshToken: string): string | null {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      return payload.id;
    } catch (error) {
      console.error('Invalid refresh token', error);
      return null;
    }
  }
}
