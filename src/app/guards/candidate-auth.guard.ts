import { CanActivateFn } from '@angular/router';

export const candidateAuthGuard: CanActivateFn = (route, state) => {
  const candidate = localStorage.getItem('candidateToken');
  if (candidate) return true;
  window.alert('Please login to continue');
  window.location.href = '/login';
  return false;
};