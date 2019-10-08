import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfinteScrollComponent } from './components/infinte-scroll/infinte-scroll.component';

const routes: Routes = [
  { path: 'virtual-scroll', component: InfinteScrollComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
