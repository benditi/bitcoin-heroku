import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { ContactEditPageComponent } from './pages/contact-edit-page/contact-edit-page.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { TransferFundComponent } from './cmps/transfer-fund/transfer-fund.component';
import { MoveListComponent } from './cmps/move-list/move-list.component';
import { OneMoveComponent } from './cmps/one-move/one-move.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ChartsModule } from 'ng2-charts';
import { PageNotFoundComponentComponent } from './pages/page-not-found-component/page-not-found-component.component';
import { MyContactsListComponent } from './cmps/my-contacts-list/my-contacts-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactPageComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactDetailsComponent,
    ContactFilterComponent,
    ContactEditPageComponent,
    AppHeaderComponent,
    LoginPageComponent,
    TransferFundComponent,
    MoveListComponent,
    OneMoveComponent,
    StatisticPageComponent,
    PageNotFoundComponentComponent,
    MyContactsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
