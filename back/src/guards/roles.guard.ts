import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    const user = request.user;
    console.log(user);
    // const hasRole = () =>
    //   requiredRoles.some((role) => user?.role?.includes(role));
    const rolero = user.role;
    const valid = user && user.role && requiredRoles.includes(rolero);
    console.log(valid);
    if (!valid) {
      throw new ForbiddenException('No autorizado');
    }
    return valid;
  }
}
