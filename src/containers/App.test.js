import App from './App';
import NavigationBar from './NavigationBar';
import FridgeContainer from './Fridge';
import { shallowComponent } from '../test/helpers';

describe('App', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallowComponent(App);
  });

  it('`App` renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('`FridgeContainer` renders without crashing', () => {
    expect(wrapper.dive(FridgeContainer).length).toEqual(1);
  });

  it('`NavigationBar` renders without crashing', () => {
    expect(wrapper.dive(NavigationBar).length).toEqual(1);
  });
});
