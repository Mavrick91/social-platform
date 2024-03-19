import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return (await this.prisma.user.findMany()) as User[];
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
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '60m' }),
    };
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
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
    return user as User;
  }
}
