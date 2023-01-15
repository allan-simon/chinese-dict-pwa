(function() {
"use strict";
  
var xml =  new window.DOMParser().parseFromString(
  await (await fetch('data/cfdict.xml')).text()
);
console.log("done loading chinese data");
  
console.log(xml);
  
  
  
})();
