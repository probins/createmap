!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.SystemRegisterLoader=t()}(this,function(){"use strict";function e(e){if("file://"!==e.substr(0,7))throw new RangeError(e+" is not a valid file url");return S?e.substr(8).replace(/\//g,"/"):e.substr(7)}function t(e,t){_||(t=t.replace(S?/file:\/\/\//g:/file:\/\//g,""));var r,n=(e.message||e)+"\n\t"+t;return r=j&&e.fileName?new Error(n,e.fileName,e.lineNumber):new Error(n),L?r.stack=n:r.stack=e.originalErr?e.originalErr.stack:e.stack,r.originalErr=e.originalErr||e,r}function r(e){return P?Symbol():"@@"+e}function n(e){if(e.values)return e.values();if("undefined"==typeof Symbol||!Symbol.iterator)throw new Error("Cannot return values iterator unless Symbol.iterator is defined");var t={};return t[Symbol.iterator]=function(){var t=Object.keys(e),r=0;return{next:function(){return r<t.length?{value:e[t[r++]],done:!1}:{value:void 0,done:!0}}}},t}function o(e){this.key=e||E,this.registry=new i,this.execute=!0}function i(){this._registry={}}function s(e,t){var r=this;Object.keys(e).forEach(function(t){Object.defineProperty(r,t,{configurable:!1,enumerable:!0,get:function(){return e[t]},set:function(){throw new TypeError("Module exports cannot be changed externally.")}})}),t&&(r._evaluate=t)}function a(e,t,r){if("object"!=typeof e)throw new TypeError("Expected descriptors object");var n={};Object.keys(e).forEach(function(t){var r=e[t];if(!("value"in r))throw new TypeError('Error reading descriptor for "'+t+'" - module polyfill only supports value descriptors currently');n[t]=r.value});var o=new s(n,r);return t&&t(n,o),o}function c(e,t){function r(){throw new RangeError('Unable to resolve "'+e+'" to '+t)}var n=e.indexOf(":");if(n!==-1)return L&&":"===e[1]&&"\\"===e[2]&&e[0].match(/[a-z]/i)&&"file:"===t.substr(0,5)?"file:///"+e.replace(/\\/g,"/"):e;var o=t&&t.substr(0,t.indexOf(":")+1);if("/"===e[0]&&"/"===e[1])return o||r(),o+e;if("."===e[0]&&("/"===e[1]||"."===e[1]&&("/"===e[2]||2===e.length)||1===e.length)||"/"===e[0]){var i,s=!o||"/"!==t[o.length];if(s?(void 0===t&&r(),i=t):"/"===t[o.length+1]?"file:"!==o?(i=t.substr(o.length+2),i=i.substr(i.indexOf("/")+1)):i=t.substr(8):i=t.substr(o.length+1),"/"===e[0]){if(!s)return t.substr(0,t.length-i.length-1)+e;r()}for(var a=i.substr(0,i.lastIndexOf("/")+1)+e,c=[],u=void 0,d=0;d<a.length;d++)if(void 0===u)if("."!==a[d])u=d;else{if("."!==a[d+1]||"/"!==a[d+2]&&d!==a.length-2){if("/"!==a[d+1]&&d!==a.length-1){u=d;continue}d+=1}else c.pop(),d+=2;s&&0===c.length&&r(),d===a.length&&c.push("")}else"/"===a[d]&&(c.push(a.substr(u,d-u+1)),u=void 0);return void 0!==u&&c.push(a.substr(u,a.length-u)),t.substr(0,t.length-i.length)+c.join("")}}function u(e){o.apply(this,arguments),this._registerCache={},this._registeredLastAnon=void 0,this._registerRegistry={},this.trace=!1,this.loads={}}function d(e,t){return e._registerRegistry[t]||(e._registerRegistry[t]={key:t,metadata:void 0,instantiatePromise:void 0,module:void 0,esLinkRecord:void 0,importerSetters:void 0})}function f(e,r){var n=e._registerRegistry[r];if(!n)throw new TypeError("Internal error, load record not created");return n.instantiatePromise||(n.instantiatePromise=Promise.resolve(e.instantiate(r,n.metadata)).then(function(t){return void 0!==t?(e.registry.set(r,t),e._registerRegistry[r]=void 0,t):(h.call(e,n),e.trace||(n.metadata=void 0),n)}).catch(function(r){throw r=t(r,"Instantiating "+n.key),e._registerRegistry[n.key]===n&&(e._registerRegistry[n.key]=void 0),r}))}function l(e,r,n){if(r.module)return Promise.resolve();var o=r.esLinkRecord;if(!o.dependencies.length)return Promise.resolve();n.push(r);for(var i=Array(o.dependencies.length),a=0;a<o.dependencies.length;a++)(function(a){i[a]=e[N](o.dependencies[a],r.key).catch(function(e){throw t(e,"Resolving "+o.dependencies[a]+" to "+r.key)}).then(function(t){var r=e.registry.get(t);return r?(o.dependencyInstantiations[a]=r,o.setters[a]&&o.setters[a](r),Promise.resolve()):(e.trace&&(o.depMap=o.depMap||{},o.depMap[o.dependencies[a]]=t),f(e,t).then(function(t){return o.dependencyInstantiations[a]=t,t instanceof s?(o.setters[a]&&o.setters[a](t),Promise.resolve()):(t.importerSetters.push(o.setters[a]),o.setters[a]&&o.setters[a](t.esLinkRecord.moduleObj),n.indexOf(t)!==-1?Promise.resolve():t.esLinkRecord?l(e,t,n):void 0)}))})})(a);return Promise.all(i).catch(function(e){throw e=t(e,"Loading "+r.key),o.error=e,e})}function p(e,t){e._registerRegistry[t.key]===t&&(e._registerRegistry[t.key]=void 0);var r=t.esLinkRecord;r&&r.dependencyInstantiations.forEach(function(t,n){if(t&&!(t instanceof s)&&t.esLinkRecord&&t.esLinkRecord.error){var o=t.importerSetters.indexOf(r.setters[n]);t.importerSetters.splice(o,1),e._registerRegistry[t.key]===t&&p(e,t)}})}function y(e,t,r,n,o){return{dependencies:e,error:void 0,dependencyInstantiations:Array(e.length),setters:t,module:r,moduleObj:n,execute:o}}function h(e){if(!e.esLinkRecord){var t=e.key,r=this._registerCache[t];if(!r)throw new TypeError("Module instantiation did not call an anonymous or correctly named System.register");this._registerCache[t]=void 0;var n,o,i=[],s={},a=!1,c=r[1].call(x,function(e,t){if(!a){if("object"==typeof e)for(var r in e)s[r]=e[r];else s[e]=t;if(i.length){a=!0;for(var n=0;n<i.length;n++)i[n](s);a=!1}return t}},new g(this,t));"function"!=typeof c?(n=c.setters,o=c.execute):(n=[],o=c),e.importerSetters=i,e.esLinkRecord=y(r[0],n,void 0,s,o)}}function g(e,t){this.loader=e,this.key=this.id=t}function v(e,r,n){var o=r.esLinkRecord;if(o){n.push(r);for(var i,a,c=0;c<o.dependencies.length;c++)if(a=o.dependencyInstantiations[c],a instanceof s?i=w(a):n.indexOf(a)===-1&&(i=v(e,a,n)),i)return t(i,"Evaluating "+r.key);if(i=m(o))return e.registry.delete(r.key),e._registerRegistry[r.key]===r&&(e._registerRegistry[r.key]=void 0),t(i,"Evaluating "+r.key);r.module=new s(o.moduleObj),e.registry.set(r.key,r.module),e.trace||(r.esLinkRecord=void 0)}}function m(e){try{e.execute.call({})}catch(e){return e}}function w(e){try{a.evaluate(e)}catch(e){return e}}function b(e,t,r){if(!(t instanceof s)){if(r.push(t),!t.esLinkRecord||t.esLinkRecord.dependencies.length&&!t.esLinkRecord.depMap)throw new Error("Tracing error, ensure loader.trace is set before loading begins");e.loads[t.key]={key:t.key,dependencies:t.esLinkRecord.dependencies,depMap:t.esLinkRecord.depMap||{},metadata:t.metadata},t.esLinkRecord.dependencies.forEach(function(t){r.indexOf(t)===-1&&b(e,t,r)})}}function k(e){e=c(e||(L?process.cwd():"."),E)||e,u.call(this,e);var t=this;if(x.System=x.System||{},"function"==typeof x.System.register)var r=x.System.register;x.System.register=function(){t.register.apply(t,arguments),r&&r.apply(this,arguments)}}function R(e,t,r){function n(){t(),i()}function o(t){i(),r(new Error("Fetching "+e))}function i(){s.removeEventListener("load",n,!1),s.removeEventListener("error",o,!1),document.head.removeChild(s)}var s=document.createElement("script");s.type="text/javascript",s.charset="utf-8",s.async=!0,s.addEventListener("load",n,!1),s.addEventListener("error",o,!1),s.src=e,document.head.appendChild(s)}var E,_="undefined"!=typeof window&&"undefined"!=typeof document,L="undefined"!=typeof process&&process.versions&&process.versions.node,S="undefined"!=typeof process&&"string"==typeof process.platform&&process.platform.match(/^win/),x="undefined"!=typeof self?self:global;if("undefined"!=typeof document&&document.getElementsByTagName){if(E=document.baseURI,!E){var O=document.getElementsByTagName("base");E=O[0]&&O[0].href||window.location.href}}else"undefined"!=typeof location&&(E=location.href);if(E)E=E.split("#")[0].split("?")[0],E=E.substr(0,E.lastIndexOf("/")+1);else{if("undefined"==typeof process||!process.cwd)throw new TypeError("No environment baseURI");E="file://"+(S?"/":"")+process.cwd()+"/",S&&(E=E.replace(/\\/g,"/"))}var j="_"==new Error(0,"_").fileName,P="undefined"!=typeof Symbol;o.prototype.constructor=o,o.prototype.import=function(e,t){if("string"!=typeof e)throw new TypeError("Loader import method must be passed a module key string");var r=this.execute;return this.load(e,t).then(function(e){return r&&a.evaluate(e),e})};var T=o.resolve=r("resolve"),M=o.instantiate=r("instantiate");o.prototype.resolve=function(e,r){return this[T](e,r).catch(function(n){throw t(n,"Resolving "+e+(r?" to "+r:""))})},o.prototype.load=function(e,r){var n,o=this;return Promise.resolve(this[T](e,r||this.key)).then(function(e){var t=o.registry.get(e);return t?Promise.resolve(t):o[M](e).then(function(e){if(e){if(!(e instanceof s))throw new TypeError("Instantiate did not resolve a Module Namespace")}else e=o.registry.get(n);return e})}).catch(function(o){throw t(o,"Loading "+e+(n?" as "+n:"")+(r?" from "+r:""))})};var C="undefined"!=typeof Symbol&&Symbol.iterator;i.prototype.constructor=function(){throw new TypeError("Custom registries cannot be created.")},C&&(i.prototype[Symbol.iterator]=function(){return this.entries()[Symbol.iterator]()},i.prototype.entries=function(){var e=this._registry;return n(Object.keys(e).map(function(t){return[t,e[t]]}))}),i.prototype.keys=function(){return n(Object.keys(this._registry))},i.prototype.values=function(){var e=this._registry;return n(Object.keys(e).map(function(t){return e[t]}))},i.prototype.get=function(e){return this._registry[e]},i.prototype.set=function(e,t){if(!(t instanceof s))throw new Error("Registry must be set with an instance of Module Namespace");return this._registry[e]=t,this},i.prototype.has=function(e){return!!this._registry[e]},i.prototype.delete=function(e){return!!this._registry[e]&&(this._registry[e]=void 0,!0)},"undefined"!=typeof Symbol&&Symbol.toStringTag&&(s.prototype[Symbol.toStringTag]="Module"),a.prototype=null,a.evaluate=function(e){if(!(e instanceof s))throw new TypeError("Module.evaluate must be called on a Module Namespace");e._evaluate&&(e._evaluate(),e._evaluate=void 0)};var I=new s({});u.prototype=Object.create(o.prototype),u.prototype.constructor=u,u.prototype.normalize=function(e,t,r){return e},u.prototype.instantiate=function(e,t){},u.prototype.createMetadata=function(){return{}};var N=o.resolve;u.prototype[N]=function(e,t){var r=this,n=c(e,t);if(n&&(r.registry.has(n)||r._registerRegistry[n]))return Promise.resolve(n);var o=this.createMetadata();return Promise.resolve(r.normalize(n||e,t,o)).then(function(e){return r.registry.has(e)||(d(r,e).metadata=o),e})},u.prototype[o.instantiate]=function(e){var t=this;return f(this,e).then(function(e){return e instanceof s?Promise.resolve(e):l(t,e,[]).then(function(){if(t.execute)var r=v(t,e,[]);return r?Promise.reject(r):(t.trace&&b(t,e,[]),e.module||I)}).catch(function(r){throw p(t,e),r})})},u.prototype.register=function(e,t,r){void 0===r?this._registeredLastAnon=[e,t]:this._registerCache[e]=[t,r]},u.prototype.processRegisterContext=function(e){this._registeredLastAnon&&(this._registerCache[e]=this._registeredLastAnon,this._registeredLastAnon=void 0)},g.prototype.constructor=function(){throw new TypeError("Cannot subclass the contextual loader only Reflect.Loader.")},g.prototype.import=function(e){return this.loader.import(e,this.key)},g.prototype.resolve=function(e){return this.loader[o.resolve](e,this.key)},g.prototype.load=function(e){return this.loader.load(e,this.key)},k.prototype=Object.create(u.prototype),k.prototype.normalize=function(e,t,r){if(e.indexOf(":")===-1)throw new RangeError('System.register loader does not resolve plain module names, resolving "'+e+'" to '+t);return e};var A;return k.prototype.instantiate=function(t,r){var n=this;return new Promise(function(r,o){if(L)Promise.resolve(A||(A="undefined"!=typeof require?require("fs"):loader.import("fs").then(function(e){return e.default}))).then(function(i){i.readFile(e(t),function(e,i){return e?o(e):((0,eval)(i.toString()),n.processRegisterContext(t),void r())})});else{if(!_)throw new Error("No fetch system defined for this environment.");R(t,function(){n.processRegisterContext(t),r()},o)}})},k});