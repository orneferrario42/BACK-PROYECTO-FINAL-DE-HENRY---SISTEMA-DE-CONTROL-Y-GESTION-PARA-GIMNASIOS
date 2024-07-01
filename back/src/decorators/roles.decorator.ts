import { SetMetadata } from '@nestjs/common';
import { Role } from '../enum/roles.enum';

//? Definimos el decorador Roles y le asignamos el metadato 'roles' con los roles especificados en el enum
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
