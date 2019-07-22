# Rescript PostCSS [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][Rescript PostCSS]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[Rescript PostCSS] is a [Rescripts] configuration that lets you use your own
[PostCSS] configuration in [Create React App] without ejecting.

## Installation

Add **Rescript PostCSS** to your project:

```sh
npm install rescript-use-postcss-config --save-dev
```

Next, add **Rescript PostCSS** to your **Rescript** configuration:

```js
// .rescriptsrc.js
module.exports = [
  ['use-postcss-config']
]
```

## Usage

Use your own **PostCSS** configuration:

```js
// .postcssrc.js
module.exports = {
  map: true,
  plugins: {
    'postcss-preset-env': { stage: 0 }
  }
}
```

[Rescript PostCSS]: https://github.com/jsxtools/rescript-use-postcss-config
[Rescripts]: https://github.com/harrysolovay/rescripts
[PostCSS]: https://github.com/postcss/postcss
[Create React App]: https://github.com/facebook/create-react-app

[cli-img]: https://img.shields.io/travis/jsxtools/rescript-use-postcss-config/master.svg
[cli-url]: https://travis-ci.org/jsxtools/rescript-use-postcss-config
[git-img]: https://img.shields.io/github/issues/jsxtools/rescript-use-postcss-config.svg
[git-url]: https://github.com/jsxtools/rescript-use-postcss-config/issues
[npm-img]: https://img.shields.io/npm/v/rescript-use-postcss-config.svg
[npm-url]: https://www.npmjs.com/package/rescript-use-postcss-config
