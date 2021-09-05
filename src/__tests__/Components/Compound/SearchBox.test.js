import { render, screen, fireEvent, cleanup } from '@testing-library/react/pure';
import SearchBox from '../../../Components/Compound/SearchBox';

describe('SearchBox component', () => {
  describe('SearchBox rendering disabled state', () => {
    let labelElement;
    let inputElement;

    beforeAll(() => {
      render(<SearchBox label={'Search label'} value={'search value'} onValueChange={() => {}} disabled={true} />);

      labelElement = screen.getByText(/Search label/i);
      inputElement = screen.getByDisplayValue(/search value/i);
    });

    afterAll(() => cleanup());

    test('label is rendered', () => {
      expect(labelElement).toBeInTheDocument();
    });

    test('input field value is set and rendered', () => {
      expect(inputElement).toBeInTheDocument();
    });

    test('input field is disabled', () => {
      expect(inputElement).toBeDisabled();
    });
  });

  describe('SearchBox rendering in enabled state', () => {
    let inputElement;
    let onValueChange = jest.fn();

    beforeAll(() => {
      render(<SearchBox label={'Search label'} value={'search value'} onValueChange={onValueChange} disabled={false} />);

      inputElement = screen.getByDisplayValue(/search value/i);
    });

    afterAll(() => cleanup());

    test('input field is enabled', () => {
      expect(inputElement).toBeEnabled();
    });

    test('event is fired on input field with new value', () => {
      fireEvent.change(inputElement, {target: {value: 'new value'}});
      expect(onValueChange).toBeCalled();
      expect(onValueChange).toHaveBeenCalledWith('new value');
    });
  });
});
