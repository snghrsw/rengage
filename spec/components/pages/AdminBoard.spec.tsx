import AdminBoard from './../../../src/components/pages/AdminBoard';
import * as renderer from 'react-test-renderer';

test('<AdminBoard />', () => {
  const componentJson = renderer.create(AdminBoard()).toJSON();
  expect(componentJson).toMatchSnapshot();
});
