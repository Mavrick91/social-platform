import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async findAll(user: User): Promise<User[]> {
    return this.prisma.user.findMany({ where: { id: { not: user.id } } });
  }

  async findMockedUser(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        isMock: true,
      },
    });
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    const payload = {
      email: user.email,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const refreshTokenPayload = { id: user.id };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '1h',
      }),
      refreshToken: this.jwtService.sign(refreshTokenPayload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    };
  }

  async findUsersByUsername(user: User, username: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        username: {
          contains: username,
          mode: 'insensitive',
        },
        id: { not: user.id },
      },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            pictures: true,
            initiatedFollows: true,
            receivedFollows: true,
          },
        },
        initiatedFollows: {
          include: {
            targetUser: true,
          },
        },
        receivedFollows: {
          include: {
            initiator: true,
          },
        },
      },
    });

    return user;
  }

  async update(profileId: number, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id: profileId },
      data,
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    const existingUserByEmail = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUserByEmail) {
      throw new UnauthorizedException('Email already exists');
    }

    const existingUserByUsername = await this.prisma.user.findUnique({
      where: { username: data.username },
    });
    if (existingUserByUsername) {
      throw new UnauthorizedException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
    return user;
  }
}
