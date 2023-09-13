import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '../auth.service';
import { map, tap } from 'rxjs';
import { Role } from '../model';

export function hasRole(allowedRoles: Role[]) {
  return () =>
    inject(AuthService).user$.pipe(
      map((user) => Boolean(user && allowedRoles.includes(user.role))),
      tap((hasRole) => hasRole === false && alert('Acceso Denegado'))
    );
}
