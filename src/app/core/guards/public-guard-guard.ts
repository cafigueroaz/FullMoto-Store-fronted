import { CanActivateFn } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpAuth } from '../services/http-auth';

export const publicGuardGuard: CanActivateFn = (route, state) => {
  const httpAuth = inject(HttpAuth);
  const router = inject(Router);

  return httpAuth.checkAuthStatus().pipe(
    tap(isAuthenticated => {

      if (isAuthenticated) {
        router.navigate(['/dashboard']);
      }
    }),
    map( isAuthenticated => !isAuthenticated)
  );

};
