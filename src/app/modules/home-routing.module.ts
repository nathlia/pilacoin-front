import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../core/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'dashboard',
    canLoad:[AuthGuardService],
    canActivate:[AuthGuardService],
    loadChildren: () =>
      import('./components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'carteira',
    canLoad:[AuthGuardService],
    canActivate:[AuthGuardService],
    loadChildren: () =>
      import('./components/carteira/carteira.module').then(
        (m) => m.CarteiraModule
      ),
  },
  {
    path: 'eventos',
    canLoad:[AuthGuardService],
    canActivate:[AuthGuardService],
    loadChildren: () =>
      import('./components/eventos/eventos.module').then(
        (m) => m.EventosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
