import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HttpAuth } from '../services/http-auth';


export const AuthGuard: CanActivateFn = (route, state) => {
  const httpAuth = inject(HttpAuth);
  const router = inject(Router);

  return httpAuth.checkAuthStatus().pipe(
    tap(isAuthenticated => {
      console.info('AuthGuard - isAuthenticated:', isAuthenticated);
      if (!isAuthenticated) {
        router.navigate(['/login']);
      }
    })
  );
};
