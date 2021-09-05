import { render, screen, fireEvent } from "@testing-library/react"
import SearchPageSectionSwitcher from "../../../Containers/Sections/SearchPageSectionSwitcher"

describe('Search page section switcher component', () => {
  let onDispatchRequestsMock;
  let onClearSearchTermMock;

  beforeAll(() => {
    onDispatchRequestsMock = jest.fn();
    onClearSearchTermMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('loading component is shown while isLoading is set to true', () => {
    render(<SearchPageSectionSwitcher
      isLoading={true}
      hasError={false}
      currencies={[]}
      onDispatchRequests={onDispatchRequestsMock}
      searchValue={'a'}
      onClearSearchTerm={onClearSearchTermMock} />
    );

    expect(screen.queryByText(/Loading\.\.\./)).toBeInTheDocument();
    expect(screen.queryByText(/One or more requests failed to load/)).not.toBeInTheDocument();
    expect(screen.queryByText(/There are no results../)).not.toBeInTheDocument();
    expect(screen.queryByText(/Reset search/)).not.toBeInTheDocument();
  });

  test('error message is shown while hasError is set to true', () => {
    render(<SearchPageSectionSwitcher
      isLoading={false}
      hasError={true}
      currencies={[]}
      onDispatchRequests={onDispatchRequestsMock}
      searchValue={'a'}
      onClearSearchTerm={onClearSearchTermMock} />
    );

    expect(screen.queryByText(/Loading\.\.\./)).not.toBeInTheDocument();
    expect(screen.queryByText(/One or more requests failed to load/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Try again/));
    expect(onDispatchRequestsMock).toBeCalled();
    expect(screen.queryByText(/There are no results../)).not.toBeInTheDocument();
    expect(screen.queryByText(/Reset search/)).not.toBeInTheDocument();
  });

  test('empty list with no search term doesnt show the button to reset search', () => {
    render(<SearchPageSectionSwitcher
      isLoading={false}
      hasError={false}
      currencies={[]}
      onDispatchRequests={onDispatchRequestsMock}
      searchValue={''}
      onClearSearchTerm={onClearSearchTermMock} />
    );

    expect(screen.queryByText(/Loading\.\.\./)).not.toBeInTheDocument();
    expect(screen.queryByText(/One or more requests failed to load/)).not.toBeInTheDocument();
    expect(screen.queryByText(/There are no results../)).toBeInTheDocument();
    expect(screen.queryByText(/Reset search/)).not.toBeInTheDocument();
  });

  test('empty list but with search term renders button to reset search', () => {
    render(<SearchPageSectionSwitcher
      isLoading={false}
      hasError={false}
      currencies={[]}
      onDispatchRequests={onDispatchRequestsMock}
      searchValue={'a'}
      onClearSearchTerm={onClearSearchTermMock} />
    );

    expect(screen.queryByText(/Loading\.\.\./)).not.toBeInTheDocument();
    expect(screen.queryByText(/One or more requests failed to load/)).not.toBeInTheDocument();
    expect(screen.queryByText(/There are no results../)).toBeInTheDocument();
    expect(screen.queryByText(/Reset search/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Reset search/));
    expect(onClearSearchTermMock).toBeCalled();
  });

  test('currencies are rendered on page', () => {
    render(<SearchPageSectionSwitcher
      isLoading={false}
      hasError={false}
      currencies={[
        {
          flagCode: 'en',
          countryName: 'test country',
          exchangeRate: 12.222,
          currencySymbol: 'E',
          currencyName: 'Euro',
          code: 'EUR',
        }
      ]}
      onDispatchRequests={onDispatchRequestsMock}
      searchValue={'a'}
      onClearSearchTerm={onClearSearchTermMock} />
    );

    expect(screen.queryByText(/Loading\.\.\./)).not.toBeInTheDocument();
    expect(screen.queryByText(/One or more requests failed to load/)).not.toBeInTheDocument();
    expect(screen.queryByText(/There are no results../)).not.toBeInTheDocument();
    expect(screen.queryByText(/Reset search/)).not.toBeInTheDocument();
    expect(screen.queryByText(/test country/)).toBeInTheDocument();
  });
});
