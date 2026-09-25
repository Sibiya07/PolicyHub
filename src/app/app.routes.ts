import { Routes } from '@angular/router';

import { Dashboard } from './dashboard/dashboard';
import { PolicyList } from './policy-list/policy-list';
import { PolicyDetails } from './policy-details/policy-details';
import { AddPolicy } from './add-policy/add-policy';

export const routes: Routes = [

  // Dashboard
  {
    path: '',
    component: Dashboard
  },

  // View all policies
  {
    path: 'policies',
    component: PolicyList
  },

  // Add new policy
  {
    path: 'policies/add',
    component: AddPolicy
  },

  // View one policy
  {
    path: 'policies/:policyNumber',
    component: PolicyDetails
  }

];