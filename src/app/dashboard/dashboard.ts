import { Component, inject } from '@angular/core';
import { PolicyService } from '../services/policy';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  private policyService = inject(PolicyService);

  policies = this.policyService.getPolicies();

  totalPolicies = this.policies.length;

  activePolicies = this.policies.filter(
    policy => policy.status === 'Active'
  ).length;

  expiredPolicies = this.policies.filter(
    policy => policy.status === 'Expired'
  ).length;

  cancelledPolicies = this.policies.filter(
    policy => policy.status === 'Cancelled'
  ).length;

}