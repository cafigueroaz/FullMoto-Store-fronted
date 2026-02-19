import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpAuth } from '../services/http-auth';
import { firstValueFrom } from 'rxjs';

export const roleGuard: CanActivateFn = async(route, state) => {
  const httpAuth = inject(HttpAuth);
  const router = inject(Router);

  const allowedRoles = route.data['roles'];
  const user = await firstValueFrom(httpAuth.currentUser$);
  const role = user?.role;

  console.info(user);

  if(!user) {
    router.navigate(['/login']);
    return false;
  }

  if(! allowedRoles || allowedRoles.length == 0) {
    return true;

  }

  if( role && allowedRoles.includes(role))
  return true;

  router.navigate(['/dashboard']);
  return false;
};

