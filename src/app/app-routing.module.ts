import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditPageComponent } from './pages/contact-edit-page/contact-edit-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ContactResolverService } from './services/contact-resolver.service.resolver';
import { AuthGuard } from './guards/auth.guard.guard';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { PageNotFoundComponentComponent } from './pages/page-not-found-component/page-not-found-component.component';


const routes: Routes = [
  { path: 'contact/:_id', component: ContactDetailsComponent, resolve: { contact: ContactResolverService } },
  { path: 'contact', component: ContactPageComponent, canActivate: [AuthGuard] },
  { path: 'edit/:_id', component: ContactEditPageComponent, resolve: { contact: ContactResolverService } },
  { path: 'edit', component: ContactEditPageComponent, resolve: { contact: ContactResolverService } },
  { path: 'charts', component: StatisticPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '', component: HomePageComponent,  canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponentComponent }
];
//enableTracing: true
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
