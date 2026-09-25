import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PolicyService } from '../services/policy';
import { Policy as PolicyModel } from '../models/policy';

@Component({
  selector: 'app-policy-details',
  imports: [CurrencyPipe],
  templateUrl: './policy-details.html',
  styleUrl: './policy-details.css'
})
export class PolicyDetails {

  private route = inject(ActivatedRoute);
  private policyService = inject(PolicyService);

  policy?: PolicyModel;

  constructor() {

    const policyNumber =
      this.route.snapshot.paramMap.get('policyNumber');

    if (policyNumber) {
      this.policy =
        this.policyService.getPolicyByNumber(policyNumber);
    }

  }

}