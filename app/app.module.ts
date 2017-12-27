import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import{Routes,RouterModule} from '@angular/router';

import { AppComponent } from './app.component';

import { SearchComponent } from './search.component';
import {AdminComponent} from './admin.component';

import { AppService } from './app.service';

const routes:Routes=[{path:'',redirectTo:'/search',pathMatch:'full'},
{path:'search',component:SearchComponent},{path:'admin',component:AdminComponent}]

@NgModule({
  imports:      [ BrowserModule, HttpClientModule, ReactiveFormsModule,                 FormsModule,RouterModule.forRoot(routes) ],
  declarations: [ AppComponent, SearchComponent,
                  AdminComponent ],
  providers: [
    AppService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
