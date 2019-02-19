import reducersTax from '../reducersTax';
import { FETCH_TAX } from '../../actions/types';

it('handle action type of FETCH_TAX', () => {
  const data = {
    taxRefund: 10
  };

  const action = {
    type: FETCH_TAX,
    payload: data
  };

  const newState = reducersTax([], action);

  expect(newState).toEqual(data);
});

it('handle action with unknown type', () => {
  const newState = reducersTax([], { type: 'sjfa;lsdf' });

  expect(newState).toEqual([]);
});