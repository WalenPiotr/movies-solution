import { validate } from './oneRequired';
import { ValidationArguments } from 'class-validator';

describe('OneRequired', () => {
  describe('validate', () => {
    it('should return false when value and all related values equals undefined', () => {
      const value = undefined;
      const object = {
        p1: undefined,
        p2: undefined,
        p3: undefined,
      };
      const args: ValidationArguments = {
        targetName: 'target',
        property: 'p0',
        value,
        constraints: [['p1', 'p2']],
        object,
      };
      expect(validate(value, args)).toBe(false);
    });
    it('should return true when value is any and all related values equals undefined', () => {
      const value = 'any value';
      const object = {
        p1: undefined,
        p2: undefined,
        p3: undefined,
      };
      const args: ValidationArguments = {
        targetName: 'target',
        property: 'p0',
        value,
        constraints: [['p1', 'p2']],
        object,
      };
      expect(validate(value, args)).toBe(true);
    });
    it('should return true when value is undefined and one of related values not equals undefined', () => {
      const value = undefined;
      const object = {
        p1: undefined,
        p2: { key: 'value' },
        p3: undefined,
      };
      const args: ValidationArguments = {
        targetName: 'target',
        property: 'p0',
        value,
        constraints: [['p1', 'p2']],
        object,
      };
      expect(validate(value, args)).toBe(true);
    });
  });
});
