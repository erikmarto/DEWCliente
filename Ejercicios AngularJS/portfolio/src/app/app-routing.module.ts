import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { AboutComponent } from './pages/about/about.component';
import { PortfolioItemComponent } from './pages/portfolio-item/portfolio-item.component';

const routes: Routes = [
  {path : 'home', component: PortfolioComponent},
  {path : 'about', component: AboutComponent},
  {path : 'item', component: PortfolioItemComponent},
  {path : '**', pathMatch:'full', redirectTo:'home'}
  //si escribes cualquier ruta que sea distinta redirecciona al path home
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
