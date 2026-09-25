import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { PolicyService } from '../services/policy';
import { Policy as PolicyModel } from '../models/policy';

@Component({
  selector: 'app-add-policy',
  imports: [ReactiveFormsModule],
  templateUrl: './add-policy.html',
  styleUrl: './add-policy.css',
})
export class AddPolicy {

  private formBuilder = inject(FormBuilder);
  private policyService = inject(PolicyService);
  private router = inject(Router);

  isElectricVehicle = signal(false);

  policyForm = this.formBuilder.group({

    // -------------------------
    // Policy Information
    // -------------------------

    policyNumber: [
      '',
      Validators.required
    ],

    customerName: [
      '',
      Validators.required
    ],

    customerEmail: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    phoneNumber: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]
    ],

    startDate: [
      '',
      Validators.required
    ],

    endDate: [
      '',
      Validators.required
    ],

    status: [
      'Active',
      Validators.required
    ],

    premium: [
      0,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    // -------------------------
    // Vehicle Information
    // -------------------------

    vehicleMake: [
      '',
      Validators.required
    ],

    vehicleModel: [
      '',
      Validators.required
    ],

    vehicleYear: [
      2026,
      [
        Validators.required,
        Validators.min(1900)
      ]
    ],

    registrationNumber: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$'
        )
      ]
    ],

    vin: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^[A-HJ-NPR-Z0-9]{17}$'
        )
      ]
    ],

    fuelType: [
      'Petrol',
      Validators.required
    ],

    annualMileage: [
      0,
      [
        Validators.required,
        Validators.min(0)
      ]
    ],

    vehicleValue: [
      0,
      [
        Validators.required,
        Validators.min(1)
      ]
    ],

    // -------------------------
    // EV Information
    // -------------------------

    batteryCapacity: [
      0
    ],

    chargingType: [
      'AC'
    ],

    homeChargingAvailable: [
      false
    ],

    adasLevel: [
      0
    ],

    chargingRange: [
      0
    ],

    batteryWarranty: [
      0
    ],

    batteryHealth: [
      0
    ]

  }, {

    // Form-level validation
    validators: this.dateValidator

  });


  // ----------------------------------
  // Start Date / End Date Validation
  // ----------------------------------

  dateValidator(
    control: AbstractControl
  ): ValidationErrors | null {

    const startDate =
      control.get('startDate')?.value;

    const endDate =
      control.get('endDate')?.value;

    if (!startDate || !endDate) {
      return null;
    }

    if (endDate <= startDate) {

      return {
        invalidDateRange: true
      };

    }

    return null;

  }


  // ----------------------------------
  // Constructor
  // ----------------------------------

  constructor() {

    this.policyForm.controls.fuelType.valueChanges.subscribe(
      fuelType => {

        this.isElectricVehicle.set(
          fuelType === 'Electric'
        );

      }
    );

  }


  // ----------------------------------
  // Submit
  // ----------------------------------

  onSubmit(): void {

    // Check validation
    if (this.policyForm.invalid) {

      this.policyForm.markAllAsTouched();

      return;

    }


    const formValue =
      this.policyForm.value;


    // ----------------------------------
    // Check Duplicate Policy Number
    // ----------------------------------

    const policyNumber =
      formValue.policyNumber!;

    const existingPolicy =
      this.policyService.getPolicyByNumber(
        policyNumber
      );

    if (existingPolicy) {

      alert(
        'Policy number already exists. Please enter a different policy number.'
      );

      return;

    }


    // ----------------------------------
    // Automatic Status
    // ----------------------------------

    const today =
      new Date();

    const endDate =
      new Date(formValue.endDate!);


    let policyStatus = 'Active';


    if (endDate < today) {

      policyStatus = 'Expired';

    }


    // ----------------------------------
    // Create Policy Object
    // ----------------------------------

    const policy: PolicyModel = {

      // Policy Information

      policyNumber:
        policyNumber,

      customerName:
        formValue.customerName!,

      customerEmail:
        formValue.customerEmail!,

      phoneNumber:
        formValue.phoneNumber!,

      startDate:
        formValue.startDate!,

      endDate:
        formValue.endDate!,

      status:
        policyStatus,

      premium:
        formValue.premium!,


      // Vehicle Information

      vehicleMake:
        formValue.vehicleMake!,

      vehicleModel:
        formValue.vehicleModel!,

      vehicleYear:
        formValue.vehicleYear!,

      registrationNumber:
        formValue.registrationNumber!,

      vin:
        formValue.vin!,

      fuelType:
        formValue.fuelType as
          'Petrol' | 'Diesel' | 'Electric',

      annualMileage:
        formValue.annualMileage!,

      vehicleValue:
        formValue.vehicleValue!,


      // EV Information

      batteryCapacity:
        formValue.batteryCapacity!,

      chargingType:
        formValue.chargingType as
          'AC' | 'DC' | 'AC/DC',

      homeChargingAvailable:
        formValue.homeChargingAvailable!,

      adasLevel:
        formValue.adasLevel!,

      chargingRange:
        formValue.chargingRange!,

      batteryWarranty:
        formValue.batteryWarranty!,

      batteryHealth:
        formValue.batteryHealth!

    };


    // ----------------------------------
    // Add Policy
    // ----------------------------------

    this.policyService.addPolicy(
      policy
    );


    // ----------------------------------
    // Navigate to Policy List
    // ----------------------------------

    this.router.navigate([
      '/policies'
    ]);

  }

}