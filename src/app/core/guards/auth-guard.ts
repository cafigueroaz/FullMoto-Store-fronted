import { inject } from '@angular/core/primitives/di';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { HttpAuth } from '../services/http-auth';


export const authGuard: CanActivateFn = (route, state) => {
  const httpAuth = inject(HttpAuth);
  const router = inject(Router);

  return httpAuth.checkAuthStatus().pipe(
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/home']);
      }
    })
  );
};
