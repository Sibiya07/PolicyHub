import { Given, When, Then } from '@cucumber/cucumber';
import {
  Builder,
  By,
  until,
  WebDriver
} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

let driver: WebDriver;

// Open PolicyHub
Given('I open the PolicyHub application', async function () {
  driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

  await driver.get('http://localhost:4200');
});

// Verify Dashboard
Then('I should see the PolicyHub dashboard', async function () {
  await driver.wait(
    until.elementLocated(By.css('app-dashboard')),
    10000
  );

  await driver.quit();
});

// Navigate to Add Policy
When('I navigate to the Add Policy page', async function () {
  await driver.wait(
    until.elementLocated(By.linkText('Add Policy')),
    10000
  );

  await driver.findElement(By.linkText('Add Policy')).click();

  await driver.wait(
    until.urlContains('/policies/add'),
    10000
  );
});

// Enter valid policy details
When('I enter valid policy details', async function () {

  await driver.findElement(By.css('[formControlName="policyNumber"]'))
    .sendKeys('POL2001');

  await driver.findElement(By.css('[formControlName="customerName"]'))
    .sendKeys('Test Customer');

  await driver.findElement(By.css('[formControlName="customerEmail"]'))
    .sendKeys('testcustomer@gmail.com');

  await driver.findElement(By.css('[formControlName="phoneNumber"]'))
    .sendKeys('9876543210');

  await driver.findElement(By.css('[formControlName="startDate"]'))
    .sendKeys('10/07/2026');

  await driver.findElement(By.css('[formControlName="endDate"]'))
    .sendKeys('10/07/2027');

  await driver.findElement(By.css('[formControlName="status"]'))
    .sendKeys('Active');

  await driver.findElement(By.css('[formControlName="premium"]'))
    .sendKeys('25000');

  await driver.findElement(By.css('[formControlName="vehicleMake"]'))
    .sendKeys('Tata');

  await driver.findElement(By.css('[formControlName="vehicleModel"]'))
    .sendKeys('Nexon');

  await driver.findElement(By.css('[formControlName="vehicleYear"]'))
    .sendKeys('2026');

  await driver.findElement(By.css('[formControlName="registrationNumber"]'))
    .sendKeys('TN01AB1234');

  await driver.findElement(By.css('[formControlName="vin"]'))
    .sendKeys('1HGCM82633A123456');

  await driver.findElement(By.css('[formControlName="fuelType"]'))
    .sendKeys('Petrol');

  await driver.findElement(By.css('[formControlName="annualMileage"]'))
    .sendKeys('12000');

  await driver.findElement(By.css('[formControlName="vehicleValue"]'))
    .sendKeys('1200000');
});

// Submit policy
When('I submit the policy', async function () {
  await driver.findElement(
    By.css('button[type="submit"]')
  ).click();
});

// Verify policy added
Then('the policy should be added successfully', async function () {
  await driver.wait(
    until.urlContains('/policies'),
    10000
  );

  await driver.quit();
});

// Submit without entering details
When(
  'I submit the policy without entering details',
  async function () {

    await driver.findElement(
      By.css('button[type="submit"]')
    ).click();
  }
);

// Verify validation messages
Then('I should see validation messages', async function () {

  await driver.wait(
    until.elementLocated(By.css('.error')),
    10000
  );

  const errors = await driver.findElements(
    By.css('.error')
  );

  if (errors.length === 0) {
    throw new Error(
      'Validation messages were not displayed'
    );
  }

  await driver.quit();
});

// Select Electric
When(
  'I select Electric as the fuel type',
  async function () {

    const fuelType = await driver.findElement(
      By.css('[formControlName="fuelType"]')
    );

    await fuelType.sendKeys('Electric');
  }
);

// Enter EV details
When(
  'I enter valid electric vehicle details',
  async function () {

    await driver.findElement(By.css('[formControlName="policyNumber"]'))
      .sendKeys('POL2002');

    await driver.findElement(By.css('[formControlName="customerName"]'))
      .sendKeys('EV Customer');

    await driver.findElement(By.css('[formControlName="customerEmail"]'))
      .sendKeys('evcustomer@gmail.com');

    await driver.findElement(By.css('[formControlName="phoneNumber"]'))
      .sendKeys('9876543211');

    await driver.findElement(By.css('[formControlName="startDate"]'))
      .sendKeys('10/07/2026');

    await driver.findElement(By.css('[formControlName="endDate"]'))
      .sendKeys('10/07/2027');

    await driver.findElement(By.css('[formControlName="status"]'))
      .sendKeys('Active');

    await driver.findElement(By.css('[formControlName="premium"]'))
      .sendKeys('30000');

    await driver.findElement(By.css('[formControlName="vehicleMake"]'))
      .sendKeys('Tesla');

    await driver.findElement(By.css('[formControlName="vehicleModel"]'))
      .sendKeys('Model 3');

    await driver.findElement(By.css('[formControlName="vehicleYear"]'))
      .sendKeys('2026');

    await driver.findElement(By.css('[formControlName="registrationNumber"]'))
      .sendKeys('TN01EV1234');

    await driver.findElement(By.css('[formControlName="vin"]'))
      .sendKeys('5YJ3E1EA7KF123456');

    await driver.findElement(By.css('[formControlName="fuelType"]'))
      .sendKeys('Electric');

    await driver.findElement(By.css('[formControlName="annualMileage"]'))
      .sendKeys('15000');

    await driver.findElement(By.css('[formControlName="vehicleValue"]'))
      .sendKeys('4500000');

    await driver.findElement(By.css('[formControlName="batteryCapacity"]'))
      .sendKeys('75');

    await driver.findElement(By.css('[formControlName="chargingType"]'))
      .sendKeys('AC');

    await driver.findElement(By.css('[formControlName="homeChargingAvailable"]'))
      .click();

    await driver.findElement(By.css('[formControlName="adasLevel"]'))
      .sendKeys('3');

    await driver.findElement(By.css('[formControlName="chargingRange"]'))
      .sendKeys('500');

    await driver.findElement(By.css('[formControlName="batteryWarranty"]'))
      .sendKeys('8');

    await driver.findElement(By.css('[formControlName="batteryHealth"]'))
      .sendKeys('95');
  }
);

// Verify EV policy
Then(
  'the electric vehicle policy should be added successfully',
  async function () {

    await driver.wait(
      until.urlContains('/policies'),
      10000
    );

    await driver.quit();
  }
);