import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CarteiraComponent } from './components/carteira/carteira.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorhandlerService } from '../core/services/errorhandler.service';
import { JwtinterceptorService } from '../core/services/jwtinterceptor.service';


@NgModule({
  declarations: [
    DashboardComponent,
    CarteiraComponent,
    EventosComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    HomeRoutingModule,
    CoreModule
  ],
  exports: [
    DashboardComponent,
    CarteiraComponent,
    EventosComponent
  ],
  providers: [
    AuthGuardService,
    {provide: ErrorHandler, useClass: ErrorhandlerService},
    {provide: HTTP_INTERCEPTORS, useClass: JwtinterceptorService, multi: true}
  ]
})
export class HomeModule { }
