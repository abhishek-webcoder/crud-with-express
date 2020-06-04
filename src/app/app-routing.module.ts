import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuardService } from './auth-guard.service';
import { NewsComponent } from './news/news.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'edit/:id/:edit', canActivate: [AuthGuardService], component: RegistrationComponent },
  { path: 'delete/:id/:delete', canActivate: [AuthGuardService], component: RegistrationComponent },
  { path: 'file', canActivate: [AuthGuardService], component: FileuploadComponent },
  {
    path: 'userlist',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./userlist/userlist.module').then(m => m.UserlistModule)
  },
  // {
  //   path: 'news',
  //   loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
  // },
  { path: 'news', component: NewsComponent },

  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
