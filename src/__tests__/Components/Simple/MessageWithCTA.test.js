import { render, screen, fireEvent } from '@testing-library/react/pure';
import MessageWithCTA from '../../../Components/Simple/MessageWithCTA';

describe('MessageWithCTA component', () => {
  let onCTAClicked;
  let buttonElement;
  let messageElement;

  beforeAll(() => {
    onCTAClicked = jest.fn();

    render(<MessageWithCTA text={'some text'} ctaLabel={'some label'} onCTAClicked={onCTAClicked} />);

    messageElement = screen.getByText(/some text/i);
    buttonElement = screen.getByText(/some label/i);
  });

  test('button with label is rendered', () => {
    expect(buttonElement).toBeInTheDocument();
  });

  test('message is rendered', () => {
    expect(messageElement).toBeInTheDocument();
  });

  test('callback is called on button click', () => {
    fireEvent.click(buttonElement);
    expect(onCTAClicked).toBeCalled();
  });
});
