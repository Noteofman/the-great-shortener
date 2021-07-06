const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const URL_REGEX = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

export const commonEmailValidation = (email: string): string | null => {
  let error = null;

  if (!email) error = 'The email field is required.';
  else if (email.length > 100) error = 'Email cannot be more than 100 characters.';
  else if (!EMAIL_REGEX.test(email)) error = 'Please enter a valid email address.';

  return error;
};

export const commonPasswordValidation = (password: string): string | null => {
  let error = null;

  if (!password) error = 'The email field is required.';
  else if (password.length < 5) error = 'Password cannot be less than 5 characters.';
  else if (password.length > 100) error = 'Password cannot be more than 100 characters.';

  return error;
};

export const commonUrlValidation = (url: string): string | null => {
  let error = null;

  if (!url) error = 'The url field is required.';
  else if (!URL_REGEX.test(url)) error = 'Please enter a valid url, e.g https://google.com';

  return error;
};
