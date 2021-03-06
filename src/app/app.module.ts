import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AngularFirestoreModule
  ],
  providers: [{provide: FirestoreSettingsToken, useValue: {}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
