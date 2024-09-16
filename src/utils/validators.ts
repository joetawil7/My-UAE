import { PasswordValidState } from '@types';

const validateEmail = (email: string) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

const validatePassword = (password: string) => {
  const validState: PasswordValidState = {
    upper: false,
    lower: false,
    number: false,
    special: false,
    eight: false,
    valid: false,
  };
  const specialCharacters = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

  const upper = /[A-Z]/.test(password);
  const lower = /[a-z]/.test(password);
  const number = /\d/.test(password);
  const special = specialCharacters.test(password);
  const eight = password.length >= 8;

  validState.upper = upper;
  validState.lower = lower;
  validState.number = number;
  validState.special = special;
  validState.eight = eight;

  validState.valid =
    validState.upper &&
    validState.lower &&
    validState.number &&
    validState.special &&
    validState.eight;

  return validState;
};

export const validators = {
  validateEmail,
  validatePassword,
};
