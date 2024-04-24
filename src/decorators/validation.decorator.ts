import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
/**
 * Decorator to validate password and email fields.
 *
 * To validate password the criteria are:
 - 10 characters at least.
 - It must contain at least one uppercase letter (A-Z).
 - It must contain at least one lowercase letter (a-z).
 - It must contain at least one digit (0-9).
 - It must contain at least one symbol like (!, @, #, etc)
 */
export function IsValid(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isValid',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const regex = {
            email:
              process.env.ENV === 'production'
                ? /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/
                : /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/,
            password: /^((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{10,}$/,
          };

          if (!regex[args.property].test(value)) return false;
          if (args.property === 'email') args.object[args.property] = value.toLowerCase();

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return args.property === 'password'
            ? 'password must have 10 characters of length and at least one of each (A-Z, a-z, 0-9, !-@-$-*)'
            : 'Email must be valid';
        },
      },
    });
  };
}
