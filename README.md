# Fingerblast.js

Available demo here : http://stephanebachelier.github.io/fingerblast.js

## Notice

This small library is extracted from [ratchet](https://github.com/twbs/ratchet).
I'm not the author, just made this repository to be able to install it from bower, without digging into ratchet repository.

Authors are:
 - brian.carstensen@gmail.com in https://github.com/brian-c/phantom-limb
 - adapted / rewritten by :
   * [XhmikosR](https://github.com/XhmikosR)
   * [fat](https://github.com/fat)


## Description

This library has no dependency. Two build are provided:
 * non umd version you can use by injecting a script.
 * umd version which can be used globally, with AMD (RequireJS) or with commonJS.

Minified versions are provided for both version.

 * non umd version: 7.9k, 4.2k minified
 * umd version: 8.4k, 4.3k minified

## Usage


## Build

There is a build task which lint, build the global and umd versions, and minify the build version in .min.js.

The default grunt task will run the build task, so you only need to:

```
$ npm install
$ grunt
```

Four files will be available in `dist` folder :
 * fingerblast.js
 * fingerblast.min.js
 * fingerblast.umd.js
 * fingerblast.umd.min.js

## Demos

There are two demos.
 * `index.html` which load FingerBlast with a `<script>`
 * `index.rjs.html` which use RequireJS to load FingerBlast

### dependencies

Install demos dependencies which are `Ratchet` which is used for UI and `RequireJS`.

If you have not already build the library
```
$ npm install
$ grunt demos # will call the build task
```

Then,
```
$ cd demos
$ bower install
```

open a brower (needed for RequireJS demo)


### tests
To test the RequireJS, you will need a server. Simply use the awesome `serve` package made by @visionmedia.

```
$ npm install serve
$ serve . -p 3000
```
It will open a server on port 3000, with _demos_ as root directory. For this command to works, I assume `serve` command to be launched in _demos_ directory. If you are in main directory simple use `demos` instead of `.`, which give: `serve demos -p 3000`.

Then go to you browser and test the following url:

 * `http://localhost:3000/index.html` or `http://localhost:3000`
 * `http://localhost:3000/index.rjs.html`

If `serve` fails and complains with a message like `Error: listen EADDRINUSE`, you should just change the port to a value not being used.

If you can swipe the images in the desktop, then everything is working. If you test these pages with a mobile, FingerBlast is useless as your browser already supports touch events.

## License

Original work by brian.carstensen@gmail.com was licensed with Apache v2. I think it should be the same even if adapted.
