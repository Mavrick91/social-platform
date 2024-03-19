import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { verify } from 'jsonwebtoken';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return true;
      } catch (err) {
        throw new Error('UNAUTHENTICATED');
      }
    } else {
      throw new Error('No token provided');
    }
  }
}
