import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterManagerComponent } from './register-manager/register-manager.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterFormComponent,
  },
  {
    path: 'registerManager',
    component: RegisterManagerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
