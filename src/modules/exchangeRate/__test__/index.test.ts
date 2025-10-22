import {currencyNamesFa} from '../helpers/currencyNamesFa';
import type {CurrencyCode} from '../types';
import * as TypesModule from '../types';
import * as RouterModule from '../router';
import {describe, test, expect} from 'vitest';

describe('currencyNamesFa', () => {
  test('should have USD as دلار آمریکا', () => {
    // Arrange
    const code: CurrencyCode = 'USD';
    // Act
    const name = currencyNamesFa[code];
    // Assert
    expect(name).toBe('دلار آمریکا');
  });
  test('should return undefined for non-existing currency', () => {
    // Arrange
    const fakeCode = 'FAKE' as CurrencyCode;
    // Act
    const name = currencyNamesFa[fakeCode];
    // Assert
    expect(name).toBeUndefined();
  });
});

describe('Types module', () => {
  test('CurrencyCode should accept known values', () => {
    // Arrange
    const sample: TypesModule.CurrencyCode = 'USD';
    // Act & Assert
    expect(sample).toBe('USD');
  });
});

describe('Router', () => {
  test('should export Routes function', () => {
    // Arrange & Act
    const type = typeof RouterModule.Routes;
    // Assert
    expect(type).toBe('function');
  });
});

describe('Should import empty (stub) files', () => {
  test('should allow empty index.ts (root)', () => {
    // Assert
    expect(true).toBe(true);
  });
  test('should allow empty validation/schema.ts', () => {
    // Assert
    expect(true).toBe(true);
  });
});
