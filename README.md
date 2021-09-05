# Currency search page

entry file: index.js<br>

## Structure

### Containers

> Bigges chunks of the app. mainly "pages" that can be plugged into the router<br>
> Containers are allowed to react to the reduz store and dispatch actions<br>

#### Sections
> Sections are parts/blocks of the Container<br>
> Sections are allowed to reach to the redux store and dispatch actions on their own

### Components

#### Simple
> Simplest/atomic components, that can be reused where ever<br>
> Simple components are not allowed to reach to the redux, nor do anything on their own

#### LayoutComponents
> Simple components, usualy just a wrappers around its children<br>
> Solving only the layout structure of the page<br>
> Layout components are not allowed to reach to the redux, nor do anything on their own

#### Compound
> Components that are allowed to know bussiness logic and structure of data objects of the app. but are not allowed to reach to the redux, nor do anything on their own


## Hooks

There are two custom hooks

### useFilteredCurrencies
> handles filtering of the currencies

### useUrlHash
> takes care of URL hash, updates it, and updating state based on url change<br>
> it is Single source of througth for mapping state <=> URL

## Redux
redux has only two slices:
### currenciesSlice
> uses API: config.currenciesConfig.API

### countriesSlice
> uses API: config.countriesConfig.API

