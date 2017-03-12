import Waiting from './../../../src/components/pages/Waiting';
import * as renderer from 'react-test-renderer';

test('<Waiting />', () => {
  const componentJson = renderer.create(Waiting({ locationHref: 'http://test.com' }));
  expect(componentJson.toJSON()).toMatchSnapshot();
});
