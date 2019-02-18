import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HairstyleComponent } from './pages/hairstyle/hairstyle.component';
import { BlogComponent } from './pages/blog/blog.component';

const routes: Routes = [
  {path : 'home', component:HomeComponent},
  {path : 'about', component:AboutComponent},
  {path : 'contact', component:ContactComponent},
  {path : 'hairstyle', component:HairstyleComponent},
  {path : 'blog', component:BlogComponent},
  {path : '**', pathMatch:'full', redirectTo: 'home'}
  //si escriben cualquier ruta que sea distinta redirecciono al path home
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
