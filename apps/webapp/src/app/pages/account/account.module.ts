import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountPage } from './account.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPage,
    children: [
      { path: '', redirectTo: 'wallet', pathMatch: 'full' },
      {
        path: 'wallet',
        loadComponent: () => import('../../components/account/wallet/wallet.component').then(m => m.WalletComponent)
      },
      {
        path: 'send',
        loadComponent: () => import('../../components/account/send/send.component').then(m => m.SendComponent)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountPageRoutingModule { }