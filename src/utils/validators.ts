export const isValidCNPJ = (value: any): boolean => {
  if (typeof value !== 'string') return false;

  // Convert the number to a string and remove non-digit characters
  const cnpj = value.replace(/\D/g, '');

  if (cnpj.length !== 14) return false;

  // Basic CNPJ validation
  if (
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  ) {
    return false;
  }

  let length = cnpj.length - 2;
  let numbers = cnpj.substring(0, length);
  const digitos = cnpj.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i), 10) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result.toString() !== digitos.charAt(0)) {
    return false;
  }

  length = length + 1;
  numbers = cnpj.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i), 10) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  return result.toString() === digitos.charAt(1);
};

export const isValidCPF = (value: any): boolean => {
  if (typeof value !== 'string') return false;

  // Remove not number value
  const cleanedCPF = value.replace(/\D/g, '');

  if (cleanedCPF.length !== 11) return false;

  // Verify if all numbers are equal (Invalid CPF)
  if (/^(\d)\1+$/.test(cleanedCPF)) return false;

  // Calculate the first digit (v1)
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanedCPF.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;

  // Calculate the second digit (v2)
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanedCPF.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;

  // Validadte if verifier digits are equal to v1 and v2 cpf digits
  return digit1 === parseInt(cleanedCPF.charAt(9)) && digit2 === parseInt(cleanedCPF.charAt(10));
};

export const isValidPhoneNumber = (value: string): boolean => {
  // Convert the number to a string and remove non-digit characters
  value = value.replace(/\D/g, '');

  // regex to validade brazilian format phone number (DDD + number)
  const mobilePhoneRegex = /^([1-9]{2}9[0-9]{4}[0-9]{4})$/;

  return mobilePhoneRegex.test(value);
};
