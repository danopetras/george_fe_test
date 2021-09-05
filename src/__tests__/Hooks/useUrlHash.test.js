import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import useUrlHash from '../../Hooks/useUrlHash';

function TestComponent() {
  const [urlHash, setUrlHash] = useUrlHash();
  return (
    <>
      {urlHash}
      <button onClick={() => setUrlHash('new Value')}>Set hash</button>
    </>
  );
}

describe('useUrlHash hook', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    if (global.window.hasOwnProperty('location'))
    delete global.window.location;
  });

  test('eventListener is registered and unregistered on mount and unmount of the hook', () => {
    const addedEvents = [];
    const removedEvents = [];

    jest.spyOn(window, 'addEventListener').mockImplementation((event, handle, options) => {
      addedEvents.push(event);
    });
    jest.spyOn(window, 'removeEventListener').mockImplementation((event, handle, options) => {
      removedEvents.push(event);
    });

    const wrapper = render(<TestComponent />);
    expect(addedEvents).toContain('hashchange');
    expect(removedEvents).not.toContain('hashchange');

    wrapper.unmount();
    expect(removedEvents).toContain('hashchange');
  });

  test('hash is updated on url change', () => {
    let urlHashListener;
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        hash: '#test%20hash'
      },
      writable: true
    });

    jest.spyOn(window, 'addEventListener').mockImplementation((event, handle, options) => {
      if (event === 'hashchange') {
        urlHashListener = handle;
      }
    });

    render(<TestComponent />);
    /// event listener
    expect(typeof(urlHashListener)).toBe('function');
    expect(screen.getByText(/test hash/)).toBeInTheDocument();
    /// update hash and fire event listener
    global.window.location.hash = '#some%20new%20value'
    act(() => urlHashListener());
    expect(screen.getByText(/some new value/)).toBeInTheDocument();
  });

  test('hash can be set manualy', () => {
    let urlHashListener;
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        hash: '#test%20hash'
      },
      writable: true
    });

    jest.spyOn(window, 'addEventListener').mockImplementation((event, handle, options) => {
      if (event === 'hashchange') {
        urlHashListener = handle;
      }
    });

    render(<TestComponent />);
    /// event listener
    expect(typeof(urlHashListener)).toBe('function');
    expect(screen.getByText(/test hash/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Set hash/));

    act(() => urlHashListener());
    expect(window.location.hash).toBe('new%20Value');
    expect(screen.getByText(/new Value/)).toBeInTheDocument();
  });
});
