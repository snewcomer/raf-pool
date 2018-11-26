# raf-pool
requestAnimationFrame pool to avoid busyness on the thread

![Download count all time](https://img.shields.io/npm/dt/raf-pool.svg)
[![npm version](https://badge.fury.io/js/raf-pool.svg)](http://badge.fury.io/js/raf-pool)

[![Dependency Status](https://david-dm.org/snewcomer/raf-pool.svg)](https://david-dm.org/snewcomer/raf-pool)
[![devDependency Status](https://david-dm.org/snewcomer/raf-pool/dev-status.svg)](https://david-dm.org/snewcomer/raf-pool#info=devDependencies)

Why use an administrator to manage all the elements on my page?
------------------------------------------------------------------------------
This library is used in [ember-in-viewport](https://github.com/DockYard/ember-in-viewport) and [ember-infinity](https://github.com/ember-infinity/ember-infinity).  This library is particularly important for re-using the IntersectionObserver API.

window.requestAnimationFrame schedules and performs an animation before the next repaint, thus taking the guesswork out of being in sync with the user's browser readiness.  It will perform the callback function 60 times per second, thus making the main thread quite busy.  If you have hundreds of images on the page, it can be very painful on memory when you have hundreds of recurring handles on `requestAnimationFrame`.  This small library can dramatically reduce memory usage as it uses a single requestAnimationFrame.

Good:
<img src="https://user-images.githubusercontent.com/222011/39496842-4cdf44e4-4d6e-11e8-9197-1dfd501af7e7.png" />

<img src="https://user-images.githubusercontent.com/222011/39496843-4cf62600-4d6e-11e8-8f86-c47ecb7ae32c.png" />


Installation
------------------------------------------------------------------------------

```
npm install raf-pool --save
```

Usage
------------------------------------------------------------------------------
## API

1. elementId: DOM Node to observe
2. callbackFn
    - callback function to perform logic in your own application
    - Note, your callback function should `add` back the method to the raf-pool service.

```js
import RafPool from 'raf-pool';

const rafPool = new RafPool();

// add an element to static administrator
rafPool.add(element.id, callback);

// Use in cleanup lifecycle hooks (if applicable) from the element being observed
rafPool.remove(element.id);

// Use in cleanup lifecycle hooks of your application as a whole
// This will remove the in memory data store holding onto all of the observers
rafPool.reset();
