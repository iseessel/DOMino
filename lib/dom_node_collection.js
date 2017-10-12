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
