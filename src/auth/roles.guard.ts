import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private readonly jwtService: JwtService,) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());   
    if (!roles) {
      return true;
    }
    const tokenHeader = context.switchToHttp().getRequest().headers.authorization;   
    const TokenArray = tokenHeader.split(" ");
    const decoded = this.jwtService.decode(TokenArray[1]);   
    return roles.includes(decoded['role']);;
    }
}