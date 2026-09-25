export interface Policy {

  // Policy information
  policyNumber: string;
  customerName: string;
  customerEmail: string;
  phoneNumber: string;

  startDate: string;
  endDate: string;
  status: string;
  premium: number;

  // Vehicle information
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  registrationNumber: string;
  vin: string;
  fuelType: 'Petrol' | 'Diesel' | 'Electric';
  annualMileage: number;
  vehicleValue: number;

  // EV-specific information
  batteryCapacity?: number;
  chargingType?: 'AC' | 'DC' | 'AC/DC';
  homeChargingAvailable?: boolean;
  adasLevel?: number;
  chargingRange?: number;
  batteryWarranty?: number;
  batteryHealth?: number;
}