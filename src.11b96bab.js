parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"fx60":[function(require,module,exports) {

},{}],"Focm":[function(require,module,exports) {
"use strict";require("./scss/main.scss");const e={inputYear:document.querySelector(".selected-input.year"),inputHour:document.querySelector(".selected-input.hour"),button:document.querySelector(".selected-button"),timerTitle:document.querySelector(".timer-title"),timerValue:document.querySelectorAll(".timer-value")},t=(new Date).getTime();e.button.addEventListener("click",n=>{if(n.preventDefault(),!e.inputYear.value)return;const o=e.inputYear.value.split("/"),s=e.inputHour.value.split(":").map(e=>parseInt(e)),u=(new Date(o[0],parseInt(o[1])-1,parseInt(o[2]),...s).getTime()-t)/1e3,r=parseInt(u/60/60/24),a=parseInt((u-24*r*60*60)/60/60),l=parseInt((u-24*r*60*60-60*a*60)/60),c=parseInt(u-24*r*60*60-60*a*60-60*l);for(const t of e.timerValue)"days"===t.dataset.value?t.textContent=r:"hours"===t.dataset.value?t.textContent=a:"minutes"===t.dataset.value?t.textContent=l:"seconds"===t.dataset.value&&(t.textContent=c);console.log(`Days: ${r}`),console.log(`Hours: ${a}`),console.log(`Minutes: ${l}`),console.log(`Seconds: ${c}`)});
},{"./scss/main.scss":"fx60"}]},{},["Focm"], null)
//# sourceMappingURL=/goit-js-hw-11-timer/src.11b96bab.js.map