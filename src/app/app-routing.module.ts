import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TreeComponentComponent } from './tree-component/tree-component.component';


const routes: Routes = [
  {path: '', component: TreeComponentComponent, //canActivate: [LoginGuard],

},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
