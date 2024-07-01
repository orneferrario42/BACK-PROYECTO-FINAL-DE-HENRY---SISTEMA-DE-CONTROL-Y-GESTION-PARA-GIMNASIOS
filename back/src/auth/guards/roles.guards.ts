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
export class RolesGuards implements CanActivate {
  constructor(private readonly reflector: Reflector) {} //reflector lee la meta data del controlador
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    //validar rol
    const hasRole = () =>
      requireRoles.some((role) => user?.roles?.includes(role));
    console.log(hasRole());

    const valid = user && user.role && hasRole();

    if (!valid)
      throw new ForbiddenException(
        'No tienes permisos para realizar esta accion',
      );
    return valid;
  }
}
