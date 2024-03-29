import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../modules/components/dashboard/dashboard.component';
import { EventosComponent } from '../modules/components/eventos/eventos.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canLoad:[AuthGuardService], canActivate:[AuthGuardService]},
    { path: 'eventos', component: EventosComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
