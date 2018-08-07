# @hmcts/feature-toggle-client

[![Travis badge](https://api.travis-ci.org/hmcts/feature-toggle-client.svg?branch=master)](https://travis-ci.org/hmcts/feature-toggle-client)
[![Codecov badge](https://codecov.io/gh/hmcts/feature-toggle-client/graphs/badge.svg)](https://codecov.io/github/hmcts/feature-toggle-client)
[![NPM version badge](https://img.shields.io/npm/v/@hmcts/feature-toggle-client.svg)](https://www.npmjs.com/@hmcts/feature-toggle-client)
[![Node version badge](https://img.shields.io/node/v/@hmcts/feature-toggle-client.svg)](https://www.npmjs.com/@hmcts/feature-toggle-client)
[![Greenkeeper badge](https://badges.greenkeeper.io/hmcts/feature-toggle-client.svg)](https://greenkeeper.io/)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

This is a client library for interacting with the Feature Toggle API [Feature Toggle API](https://github.com/hmcts/feature-toggle-api).
   
# API available with clients

* FeatureToggleService provides a thin wrapper around creating FeatureToggleClientFactory
* FeatureToggleClientFactory is responsible for creating FeatureToggleClient
* FeatureToggleClient is responsible for interfacing with the Feature Toggle API

# To add library

```
$ yarn add @hmcts/feature-toggle-client
```

or

```
$ npm install @hmcts/feature-toggle-client
```

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/)
* [yarn](https://yarnpkg.com/)

### Running the application

Install dependencies by executing the following command:

 ```bash
$ yarn install
 ```

## Developing

### Code style

We use [TSLint](https://palantir.github.io/tslint/) with [StandardJS](http://standardjs.com/index.html) rules 

Running the linting:

`yarn lint`

### Running the tests

Mocha is used for writing tests.

Run them with:

```bash
$ yarn test
```

For test coverage:

```bash
$ yarn test:coverage
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details
