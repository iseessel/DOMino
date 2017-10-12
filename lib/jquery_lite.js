/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);
var functions = [];

window.$l = function(selector){
  if (typeof selector === 'string'){
    var nodeList = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(nodeList));
  } else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else if (selector instanceof Function) {
    functions.push(selector);
  }
};

window.$l.extend = function(...objects){
  return Object.assign(objects[0], ...objects.slice(1));
};

window.$l.ajax = function(options){
  const request = {success: function(){}, error: function(){},
   url: `${window.location.href}`, method: "GET", data: {},
   contentType: "application/x-www-form-urlencoded; charset=UTF-8"};

   window.$l.extend(request, options);

   const xhr = new XMLHttpRequest();

   xhr.open(request.method, request.url);
   xhr.onload = function(){
     const javascriptResponse =  JSON.parse(xhr.response);
     if (xhr.status === 200){
       request.success(javascriptResponse); // will xhr.status work? Will success function throw error when its invoked.
     } else {
       request.error(javascriptResponse);
     }
   };

   xhr.send(request.data);
};

document.addEventListener("DOMContentLoaded", function() {
  functions.forEach((func) => {
    func();
  });
});

window.DOMNodeCollection = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlArr) {
    this.htmlArr = htmlArr;
  }

  html(string){
    if(string === undefined){
      return this.htmlArr[0].innerHTML;
    }else{
      this.htmlArr.forEach( (htmlEl) => {
        htmlEl.innerHTML = string;
      });
    return this;
    }
  }

  empty(){
    this.htmlArr.forEach((htmlEl) => {
       htmlEl.innerHTML = ""; //all content means innerhtml?
    });
  }

  append(element)  {
    this.htmlArr.forEach((node) => {
      if (element instanceof DOMNodeCollection) {
        element.htmlArr.forEach((htmlObj) => {
          node.appendChild(htmlObj);
        });
      } else {
        node.innerHTML += element;
      }
    });
  }

  attr(string, value) {
    if (value === undefined) {
      return this.htmlArr[0].getAttribute(string);
    } else {
      this.htmlArr.forEach((node) => {
        node.setAttribute(string, value);
      });
      return this;
    }
  }

  addClass(className) {
    this.htmlArr.forEach((node) => {
      node.className += ` ${className}`;
    });

    return this;
  }

  removeClass(className){
    this.htmlArr.forEach((node)=>{
      node.classList.remove(className);
    });

    return this;
  }

  children(){
    let myChildren = [];

    this.htmlArr.forEach((node) => {
      myChildren = myChildren.concat(Array.from(node.children));
    });

    return new DOMNodeCollection(myChildren);
  }

  parent(){
    let myParents = [];

    this.htmlArr.forEach((node) => {
      if (!myParents.includes(node.parentNode)){
        myParents.push(node.parentNode);
      }
    });

    return new DOMNodeCollection(myParents);
  }

  find(search){
    let foundElements = [];

    this.htmlArr.forEach((node)=>{
      foundElements = foundElements.concat(Array.from(node.querySelectorAll(search)));
    });

    return new DOMNodeCollection(foundElements);
  }

  remove(search) {
    this.htmlArr.forEach((node) => {
      node.remove();
    });
    this.htmlArr = [];
    return this;
  }

  on(e, callback) {
    this.htmlArr.forEach((node) => {
      node.addEventListener(e, callback);
      // debugger
      node.callbacks = {};
      node.callbacks[e] = callback;
      // if (node.callbacks){
      //   node.callbacks.push(callback);
      // }else {
      //   node.callbacks = [callback];
      // }
    });
  }

  off(e) {
    this.htmlArr.forEach((node) => {
      node.removeEventListener(e, node.callbacks[e]);
      node.callbacks[e] = null;
    });
  }

  
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);