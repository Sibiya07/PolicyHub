import { Injectable } from '@angular/core';
import { Policy as PolicyModel } from '../models/policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  private policies: PolicyModel[] = [

    {
      policyNumber: 'POL1001',
      customerName: 'Rahul Kumar',
      customerEmail: 'rahul@gmail.com',
      phoneNumber: '9876543210',

      startDate: '2026-01-01',
      endDate: '2026-12-31',
      status: 'Active',
      premium: 32000,

      vehicleMake: 'Hyundai',
      vehicleModel: 'Creta',
      vehicleYear: 2025,
      registrationNumber: 'TN01AB1234',
      vin: 'HYU12345678901234',
      fuelType: 'Petrol',
      annualMileage: 15000,
      vehicleValue: 1500000
    },

    {
      policyNumber: 'POL1002',
      customerName: 'Priya Sharma',
      customerEmail: 'priya@gmail.com',
      phoneNumber: '9123456780',

      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: 'Expired',
      premium: 45000,

      vehicleMake: 'Tata',
      vehicleModel: 'Nexon EV',
      vehicleYear: 2024,
      registrationNumber: 'TN02CD5678',
      vin: 'TAT12345678901234',
      fuelType: 'Electric',
      annualMileage: 12000,
      vehicleValue: 1900000,

      batteryCapacity: 40.5,
      chargingType: 'AC/DC',
      homeChargingAvailable: true,
      adasLevel: 1,
      chargingRange: 465,
      batteryWarranty: 8,
      batteryHealth: 95
    }

  ];

  getPolicies(): PolicyModel[] {
    return this.policies;
  }

  getPolicyByNumber(
    policyNumber: string
  ): PolicyModel | undefined {

    return this.policies.find(
      policy => policy.policyNumber === policyNumber
    );

  }

  addPolicy(policy: PolicyModel): void {

    this.policies.push(policy);

  }

}