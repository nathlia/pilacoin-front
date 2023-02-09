import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreRoutingModule } from './core/core-routing.module';
import { CoreModule } from './core/core.module';
import { AuthGuardService } from './core/services/auth-guard.service';
import { ErrorhandlerService } from './core/services/errorhandler.service';
import { JwtinterceptorService } from './core/services/jwtinterceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeModule } from './modules/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    HomeModule,

    RouterModule,
    AppRoutingModule,
    CoreRoutingModule,
    NgbModule,
    // HomeRoutingModule,
    // BrowserAnimationsModule,
    
  ],
  providers: [
    AuthGuardService,    
    {provide: ErrorHandler, useClass: ErrorhandlerService},
    {provide: HTTP_INTERCEPTORS, useClass: JwtinterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
