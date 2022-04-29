# `soundworks-template`

> Project template for developing [*soundworks*](https://github.com/collective-soundworks/soundworks/) applications.

_For a complete documentation of *soundworks*, please refer to [http://collective-soundworks.github.io](http://collective-soundworks.github.io)_

## Creating a new application

```sh
git clone https://github.com/collective-soundworks/soundworks-template.git my-application
cd my-application
rm -Rf .git
npm install
npm run dev
```

## Support

### Browsers

In version 3.1.0: the project aims at supporting all major evergreen browsers and iOS Safari >= 9.3.5

### Node

node >= 14

## Internal tools

### `@soundworks/template-build`

The [`@soundworks/template-build`](https://github.com/collective-soundworks/soundworks-template-build) package contains all the build scripts for the `soundworks-template`

### `@soundworks/template-helpers`

The [`@soundworks/template-helpers`](https://github.com/collective-soundworks/soundworks-template-helpers) package contains common helpers (views, etc.) shared by most applications.

## License

BSD-3-Clause
