# a_codestyle

[![Build Status](https://travis-ci.org/Alexgalinier/a_codestyle.svg?branch=master)](https://travis-ci.org/Alexgalinier/a_codestyle)
[![codecov](https://codecov.io/gh/Alexgalinier/a_codestyle/branch/master/graph/badge.svg)](https://codecov.io/gh/Alexgalinier/a_codestyle)
[![Greenkeeper badge](https://badges.greenkeeper.io/Alexgalinier/a_codestyle.svg)](https://greenkeeper.io/)

Code formatter to keep the same code style and preferencies

## Installation

```
npm i a_codestyle -D
```

## Usage

In your package.json scripts
```
"pretty": "a_codestyle",
```
This will find all `{.js, .json, .styl}` files in your project root directory and subdirectories (except files in node_modules) to reformat them.
