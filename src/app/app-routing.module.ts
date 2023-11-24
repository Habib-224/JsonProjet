import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { DetailarticleComponent } from './detailarticle/detailarticle.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  { path: 'accueil/:id', component: AccueilComponent },
  {path: 'detail/:id', component: DetailarticleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
