define(["../persistenceUtils","../persistenceStoreManager","./logger"],function(a,b,c){"use strict";function d(){Object.defineProperty(this,"_endpointToOptionsMap",{value:{},writable:!0})}function e(a){var b=a.map(function(a){var b=Object.keys(a)[0],c=a[b];return c&&c.length?f(b,c):Promise.resolve()});return Promise.all(b)}function f(a,d){return c.log("Offline Persistence Toolkit DefaultCacheHandler: Updating store with shredded data"),b.openStore(a).then(function(a){return a.upsertAll(d)})}function g(a){for(var b=a.name,c=a.resourceIdentifier,d=a.keys,e=[],f=(new Date).toUTCString(),g=0;g<d.length;g++){var h={key:d[g],metadata:{lastUpdated:f,resourceIdentifier:c},value:a.data[g]};e.push(h)}var i={};return i[b]=e,i}function h(a){var c=a.name;return b.openStore(c).then(function(b){if(a.keys&&a.keys.length){if(1===a.keys.length)return b.findByKey(a.keys[0]);var c=a.keys.map(function(a){return{key:a}}),d={selector:{$or:c}};return b.find(d)}return Promise.resolve([])}).then(function(b){return Array.isArray(b)||(b=[b]),a.data=b,Promise.resolve(a)})}d.prototype.constructRequestResponseCacheData=function(b,d){var e=this,f={};return c.log("Offline Persistence Toolkit DefaultCacheHandler: constructRequestResponseCacheData()"),a.requestToJSON(b).then(function(c){f.requestData=c;var g=e._excludeBody(b);return a.responseToJSON(d,{excludeBody:g})}).then(function(a){return f.responseData=a,{key:e._constructCacheKey(b,d),metadata:e.constructMetadata(b),value:f}})},d.prototype.constructShreddedData=function(a,b){c.log("Offline Persistence Toolkit DefaultCacheHandler: constructShreddedData()");var d=this._getShredder(a);return d?d(b).then(function(a){var b=a.map(g);return Promise.resolve(b)}):Promise.resolve()},d.prototype.shredResponse=function(a,b){c.log("Offline Persistence Toolkit DefaultCacheHandler: shredResponse()");var d=this._getShredder(a);return d?d(b):Promise.resolve()},d.prototype.cacheShreddedData=function(a){return c.log("Offline Persistence Toolkit DefaultCacheHandler: cacheShreddedData()"),e(a.map(g))},d.prototype._constructCacheKey=function(a,b){var c=a.url+a.method;if(b){var d=b.headers;if(d){var e=d.get("vary");if(e)if("*"===e)c+=(new Date).getTime();else for(var f=a.headers,g=e.split(","),h=0;h<g.length;h++){var i=g[h],e=f?f.get(i):"undefined";c+=i+"="+e}}}return c},d.prototype.constructMetadata=function(a){var b=(new Date).getTime();return{url:a.url,method:a.method,created:b,lastupdated:b}},d.prototype.constructResponse=function(b){return c.log("Offline Persistence Toolkit DefaultCacheHandler: constructResponse()"),a.responseFromJSON(b).then(function(b){return a.isCachedResponse(b)||b.headers.set("x-oracle-jscpt-cache-expiration-date",""),Promise.resolve(b)})},d.prototype.constructSearchCriteria=function(a,b){c.log("Offline Persistence Toolkit DefaultCacheHandler: constructSearchCriteria()");var d=!1;b&&void 0!==b.ignoreSearch&&(d=b.ignoreSearch);var e=!1;b&&void 0!==b.ignoreMethod&&(e=b.ignoreMethod);var f,g,h=a.url.indexOf("?");return g=h>=0?a.url.substring(0,h):a.url,f=d?{"metadata.url":{$regex:"^"+i(g)+"(\\?|$)"}}:{"metadata.url":a.url},e||(f["metadata.method"]=a.method),{selector:f,sort:[{"metadata.created":"asc"}]}},d.prototype.registerEndpointOptions=function(a,b){if(!a)throw new Error({message:"a valid endpointKey must be provided."});if(this._endpointToOptionsMap[a])throw new Error({message:"endpointKey can only be registered once."});this._endpointToOptionsMap[a]=b},d.prototype.unregisterEndpointOptions=function(a){if(!a)throw new Error({message:"a valid endpointKey must be provided."});delete this._endpointToOptionsMap[a]},d.prototype._excludeBody=function(a){return null!==this._getShredder(a)},d.prototype._getShredder=function(a){var b=this._getJsonProcessor(a);return b?b.shredder:null},d.prototype._getUnshredder=function(a){var b=this._getJsonProcessor(a);return b?b.unshredder:null},d.prototype._getJsonProcessor=function(a){for(var b=Object.keys(this._endpointToOptionsMap),c=0;c<b.length;c++){var d=b[c];if(a.url===JSON.parse(d).url){var e=this._endpointToOptionsMap[d];return e&&e.jsonProcessor&&e.jsonProcessor.shredder&&e.jsonProcessor.unshredder?e.jsonProcessor:null}}return null},d.prototype.fillResponseBodyWithShreddedData=function(a,b,d){c.log("Offline Persistence Toolkit DefaultCacheHandler: fillResponseBodyWithShreddedData()"),null!=a.url&&a.url.length>0&&null==d.headers.get("x-oracle-jscpt-response-url")&&d.headers.set("x-oracle-jscpt-response-url",a.url);var e=this._getUnshredder(a),f=this._getShredder(a);if(!(e&&f&&d&&b&&b.length))return Promise.resolve(d);var g=b.map(function(a){return h(a)});return Promise.all(g).then(function(a){return e(a,d)})};var i=function(a){return String(a).replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")};return new d});