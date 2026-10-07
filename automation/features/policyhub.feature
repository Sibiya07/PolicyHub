Feature: PolicyHub Application

  Scenario: Open PolicyHub application
    Given I open the PolicyHub application
    Then I should see the PolicyHub dashboard

  Scenario: Add a new vehicle insurance policy
    Given I open the PolicyHub application
    When I navigate to the Add Policy page
    And I enter valid policy details
    And I submit the policy
    Then the policy should be added successfully

  Scenario: Validate required fields in Add Policy
    Given I open the PolicyHub application
    When I navigate to the Add Policy page
    And I submit the policy without entering details
    Then I should see validation messages

  Scenario: Add an electric vehicle policy
    Given I open the PolicyHub application
    When I navigate to the Add Policy page
    And I select Electric as the fuel type
    And I enter valid electric vehicle details
    And I submit the policy
    Then the electric vehicle policy should be added successfully