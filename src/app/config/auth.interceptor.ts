import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, lastValueFrom } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {KickAuthService} from '../services/auth/kick-auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('/api/kick/')) {
    return next(req);
  }

  const authService: KickAuthService = inject(KickAuthService);

  return from(authService.getAccessToken()).pipe(
    switchMap(token => {
      if (token) {
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next(authReq);
      }
      return next(req);
    })
  );
};
