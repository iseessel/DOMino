const DOMNodeCollection = require('./dom_node_collection.js');
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
