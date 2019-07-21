import { BrowserModule } from '@angular/platform-browser';
import { NgModule, EventEmitter } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {MatIconModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TotoComponent } from './components/toto/toto.component';

// var firebaseConfig = {
//   apiKey: "AIzaSyAD4NC14qXM4VkpDGujgP4pr3RxAGSc0xk",
//   authDomain: "sopracharts.firebaseapp.com",
//   databaseURL: "https://sopracharts.firebaseio.com",
//   projectId: "sopracharts",
//   storageBucket: "sopracharts.appspot.com",
//   messagingSenderId: "965190972008",
//   appId: "1:965190972008:web:fcabbb620ebb40a4"
// };


var firebaseConfig = {
  apiKey: "AIzaSyBbr_GzGPBBr-e2OrdfPoni5LLCztKm84I",
  authDomain: "soprasteriacharts.firebaseapp.com",
  databaseURL: "https://soprasteriacharts.firebaseio.com",
  projectId: "soprasteriacharts",
  storageBucket: "soprasteriacharts.appspot.com",
  messagingSenderId: "605169041891",
  appId: "1:605169041891:web:d2a671bc9acb1667"
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TotoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    MatIconModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    EventEmitter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
