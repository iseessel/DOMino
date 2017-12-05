var functions = [];

window.$ino = function(selector){
  if (typeof selector === 'string'){
    var nodeList = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(nodeList));
  }else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }else if (selector instanceof Function) {
    functions.push(selector);
  }
};

window.$ino.extend = function(...objects){
  return Object.assign(objects[0], ...objects.slice(1));
};

window.$ino.ajax = function(options){
  const request = {success: function(){}, error: function(){},
   url: `${window.location.href}`, method: "GET", data: {},
   contentType: "application/x-www-form-urlencoded; charset=UTF-8"};

   window.$ino.extend(request, options);

   const xhr = new XMLHttpRequest();

   xhr.open(request.method, request.url);
   xhr.onload = function(){
     const javascriptResponse = JSON.parse(xhr.response);
     if (xhr.status === 200){
       request.success(javascriptResponse);
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
       htmlEl.innerHTML = "";
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
      myChildren = myChildren.concat(
        Array.from(node.children)
      );
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
      foundElements = foundElements.concat(
        Array.from(node.querySelectorAll(search)
      ));
    });

    return new DOMNodeCollection(foundElements);
  }

  remove() {
    this.htmlArr.forEach((node) => {
      node.remove();
    });
    this.htmlArr = [];
    return this;
  }

  on(e, callback) {
    this.htmlArr.forEach((node) => {
      node.addEventListener(e, callback);
      node.callbacks = {};
      node.callbacks[e] = callback;
    });
  }

  off(e) {
    this.htmlArr.forEach((node) => {
      node.removeEventListener(e, node.callbacks[e]);
      node.callbacks[e] = null;
    });
  }
