(function() {
"use strict";

// we can't directly use 'fetch' because it does not offer
// the responseXML property
const makeXMLRequest = function (url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.responseXML);
            } else {
                reject({status: xhr.status, statusText: xhr.statusText});
            }
        };
        xhr.onerror = function () {
            reject({status: xhr.status, statusText: xhr.statusText});
        };
        xhr.send();
    });
}
   
  
var xml =  await makeXMLRequest('data/cfdict.xml');
console.log("done loading chinese data");
console.log(xml);
 
})();
