import { render } from '@testing-library/react/pure';
import Flag from '../../../Components/Simple/Flag';

describe('Flag component', () => {
  test('className is generated in format: flag-{countryCode}', () => {
    const { container } = render(<Flag countryCode={'ab'} />);
    expect(container.getElementsByClassName('flag-ab').length).toBe(1);
  });

  test('className is in lowercase', () => {
    const { container } = render(<Flag countryCode={'Ab'} />);
    expect(container.getElementsByClassName('flag-ab').length).toBe(1);
  });
});
