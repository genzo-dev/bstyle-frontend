import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const PUBLIC_ROUTES = ['/auth/registrar'];
  const token = localStorage.getItem('auth');

  const isPublicRoute = PUBLIC_ROUTES.some((route) => req.url.startsWith(route));

  if (!token || isPublicRoute) return next(req);

  const requestToHandle =
    !token || isPublicRoute
      ? req
      : req.clone({
          setHeaders: {
            Authorization: `Basic ${token}`,
          },
        });

  return next(requestToHandle).pipe(
    catchError((error) => {
      if (error.status === 401) {
        localStorage.removeItem('auth');
        inject(Router).navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
