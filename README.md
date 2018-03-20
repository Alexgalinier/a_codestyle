# a_codestyle

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
This will find all `{.js, .json, .styl}` in your project root directory and subdirectories (execpt files in node_modules) to reformat them. 
