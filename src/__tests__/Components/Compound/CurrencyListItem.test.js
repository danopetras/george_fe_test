import { render, screen, cleanup } from '@testing-library/react/pure';
import CurrencyListItem from '../../../Components/Compound/CurrencyListItem';

describe('CurrencyListItem component', () => {
  describe('SearchBox renders correct parts', () => {
    const currencyMock = {
      flagCode: 'ab',
      countryName: 'Country Name test value',
      exchangeRate: 12.2233,
      currencySymbol: '[].E.',
      currencyName: 'E money',
      code: 'EMN',
    };
    let container;

    beforeAll(() => {
      container = render(<CurrencyListItem currency={currencyMock} />).container;
    });

    afterAll(() => cleanup());

    test('Flag is rendered in the component', () => {
      expect(container.getElementsByClassName('flag-ab').length).toBe(1);
    });

    test('country name is rendered', () => {
      const countryNameElement = screen.getByText('Country Name test value');
      expect(countryNameElement).toBeInTheDocument();
    })

    test('exchangerate with currency symbol is rendered', () => {
      const exchangeRateElement = screen.getByText('12.2233');
      expect(exchangeRateElement).toBeInTheDocument();
      expect(exchangeRateElement.innerHTML).toContain('[].E.');
    });

    test('currency name with currency code is rendered', () => {
      const currencyNameElement = screen.getByText(/E money/);
      expect(currencyNameElement).toBeInTheDocument();
      expect(currencyNameElement.innerHTML).toContain('EMN');
    });
  });
});
