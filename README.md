# README

## Overview
DOMino is a lightweight DOM manipulation inspired by jQuery.
1. Clone Repo and include it in your project.
2. Include the file in your HTML.
 ```
 <head>
  ...
  <script type="text/javascript" src="./dist/dom_util.js"></script>
</head>
```

## Documentation

### $ino(argument)

This universal method has three uses:
1. When given a string it returns a `DOMNodeCollection`. eg. $ino('ul') will return a collection of all ul objects
2. When given an `HTMLElement` it returns a `DOMNodeCollection` of that element.
3. When given a function, it adds it to a queue of callbacks to be called on `DOMContentLoaded`.

### $ino.ajax(options)
Makes an asychronous Javascript and XML request.

Options and defaults include:
- success: `function(response){}`
- error: `function(response){}`
- url: current url
- method: "GET"
- data: {}
-contentType:`"application/x-www-form-urlencoded; charset=UTF-8"`

### DOMNodeCollection

#### html([string])
- When invoked with no arguments #html returns the first element's innerHTML.
- When invoked with a string, #html overwrites each element of the `DOMNodeCollection's` innerhtml.

#### empty()
- Empties each of the `DOMNodeCollection's` inner html.

#### append(element)
- Appends either a DOMNodeCollection or a string to each of element of the `DOMNodeCollection`.

#### attr(string[, value])
- If given just a string, returns an attribute on the HTML object.
- If given a string and a value, sets an attribute on the HTML object.

#### addClass(className)
- Adds className to each element of DOMNodeCollection

#### removeClass(className)
- Removes className of each element of DOMNodeCollection

#### children()
- Returns a new DOMNodeCollection consisting of each DOMNodeCollection's element's children.

#### parent()
- Returns a new DOMNodeCollection consisting of each DOMNodeCollection's element's parent.

#### find(search)
- Returns a new DOMNodeCollection of elements that match the selector.

#### remove()
- Removes each element of the DOMNodeCollection.

#### on(e, callback)
- Adds an event listener with a specified callback to each element in the DOMNodeCollection

#### off(e)
- Removes an event listener to each element in the DOMNodeCollection
