import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { PolicyService } from '../services/policy';
import { Policy as PolicyModel } from '../models/policy';

@Component({
  selector: 'app-policy-list',
  imports: [CurrencyPipe],
  templateUrl: './policy-list.html',
  styleUrl: './policy-list.css'
})
export class PolicyList {

  private policyService = inject(PolicyService);
  private router = inject(Router);

  policies: PolicyModel[] =
    this.policyService.getPolicies();

  searchText = signal('');

  get filteredPolicies(): PolicyModel[] {

    const search = this.searchText()
      .toLowerCase()
      .trim();

    if (!search) {
      return this.policies;
    }

    return this.policies.filter(policy =>
      policy.policyNumber.toLowerCase().includes(search) ||
      policy.customerName.toLowerCase().includes(search) ||
      policy.vehicleMake.toLowerCase().includes(search) ||
      policy.vehicleModel.toLowerCase().includes(search) ||
      policy.registrationNumber.toLowerCase().includes(search)
    );

  }

  viewPolicy(policyNumber: string): void {

    this.router.navigate([
      '/policies',
      policyNumber
    ]);

  }

}