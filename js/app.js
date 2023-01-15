(async function() {
"use strict";

const results = document.querySelector('[data-js-results]');
const searchForm = document.querySelector('[data-js-search]');
searchForm.onsubmit = function() {
    var searchValue = this.search.value;
    if (searchValue === '') {
        return false;
    }
    const xpath = "//word[simp[contains(., '" + searchValue + "')]]";
    var allResults = xml.evaluate(xpath, xml, null, XPathResult.ANY_TYPE, null );

    var oneResult = null;
    var dl = document.createElement('dl');
    while (oneResult = allResults.iterateNext()) {
        var simp = oneResult.querySelector('simp');
        var py = oneResult.querySelector('py');
        var trans = oneResult.querySelector('trans');
        console.log(oneResult);

        var dt = document.createElement('dt');
        dt.textContent = simp.textContent + ' ' + py.textContent ;
        // put first string that begin with this search
        if (simp.textContent.startsWith(searchValue)) {;
            for (var i = 0; i < trans.children.length; i++) {
                var dd = document.createElement('dd');
                dd.textContent = trans.children[i].textContent ;
                dl.prepend(dd);
            }
            dl.prepend(dt);
        } else {
            dl.append(dt);
            for (var i = 0; i < trans.children.length; i++) {
                var dd = document.createElement('dd');
                dd.textContent = trans.children[i].textContent ;
                dl.appendChild(dd);
            }
        }

    }
    results.replaceChildren(dl);

    return false;
}

// we can't directly use 'fetch' because it does not offer
// the responseXML property
const makeXMLRequest = async function (url) {
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
        xhr.onerror = function () {reject({}); };
        xhr.send();
    });
}


var xml =  await makeXMLRequest('data/cfdict.xml');
console.log("done loading chinese data");
console.log(xml);

document.querySelector('[data-js-loader]').style.display = 'none';

})();
