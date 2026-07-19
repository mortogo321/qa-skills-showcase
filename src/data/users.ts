export interface SauceUser {
  username: string;
  password: string;
}

export const PASSWORD = 'secret_sauce';

export const users = {
  standard: { username: 'standard_user', password: PASSWORD } as SauceUser,
  lockedOut: { username: 'locked_out_user', password: PASSWORD } as SauceUser,
  problem: { username: 'problem_user', password: PASSWORD } as SauceUser,
};

export const checkoutInfo = {
  firstName: 'Jane',
  lastName: 'Doe',
  postalCode: '10110',
};

export const errors = {
  lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
  badCredentials: 'Epic sadface: Username and password do not match any user in this service',
  usernameRequired: 'Epic sadface: Username is required',
  firstNameRequired: 'Error: First Name is required',
};
