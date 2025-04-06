import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tenantId = authService.getTenantId();
  const token = authService.getToken();

  const headers: Record<string, string> = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (tenantId) {
    headers['x-tenant-id'] = tenantId;
  }

  const modifiedReq = req.clone({ setHeaders: headers });

  return next(modifiedReq);
};