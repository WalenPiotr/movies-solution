import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function OneRequired(
  property: string[],
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'oneRequired',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate,
      },
    });
  };
}

export function validate(value: any, args: ValidationArguments): boolean {
  const [relatedPropertyNames] = args.constraints;
  const relatedValues = relatedPropertyNames.map(name => args.object[name]);
  return [value, ...relatedValues].reduce(
    (prev: boolean, curr: any) => prev || curr !== undefined,
    false,
  );
}
