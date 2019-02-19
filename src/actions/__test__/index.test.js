import { createTax } from '../index'
import { FETCH_TAX } from '../types';

describe('createTax', () => {
  describe('resident', () => {
    it('has a correct type', () => {
      const action = createTax({ resident: 'resident' });

      expect(action.type).toEqual(FETCH_TAX);
    });

    it('when income is 0, taxRefund should be 0', () => {
      const action = createTax({
        resident: 'resident',
        income: 0
      });

      expect(action.payload).toEqual({ 'taxRefund': 0 });
    });

    it('when income is 1000, taxRefund should be 0', () => {
      const action = createTax({
        resident: 'resident',
        income: 1000
      });

      expect(action.payload).toEqual({ 'taxRefund': 0 });
    });
  });

  describe('working holiday', () => {
    it('has a correct type', () => {
      const action = createTax({ resident: 'working_holiday' });

      expect(action.type).toEqual(FETCH_TAX);
    });

    it('when income is 0, taxRefund should be 0', () => {
      const action = createTax({ income: 0 });

      expect(action.payload).toEqual({ 'taxRefund': 0 });
    });

    it('when income is 1000, taxRefund should pay 150', () => {
      const action = createTax({ income: 1000 });

      expect(action.payload).toEqual({ 'taxRefund': -150 });
    });

    it('wrong income, taxRefund should be 0', () => {
      const action = createTax({ income: 'sdfafafsdfafda' });

      expect(action.payload).toEqual({ 'taxRefund': 0 });
    });
  });
});