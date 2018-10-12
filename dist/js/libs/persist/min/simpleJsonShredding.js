define(["./persistenceUtils","./impl/logger"],function(a,b){"use strict";function c(a){if(!a||1!==a.length)throw new Error({message:"shredded data is not in the correct format."});var b=a[0].data;return b&&1===b.length&&"single"===a[0].resourceType?b[0]:b}return{getShredder:function(a,c){return function(d){b.log("Offline Persistence Toolkit simpleJsonShredding: Shredding Response");var e=d.clone(),f=e.headers.get("Etag");return e.text().then(function(d){var e=[],g=[],h="collection";if(d&&d.length>0)try{var i=JSON.parse(d);Array.isArray(i)?(e=i.map(function(a){return a[c]}),g=i):(e[0]=i[c],g[0]=i,h="single")}catch(a){b.log("Offline Persistence Toolkit simpleRestJsonShredding: Error during shredding: "+a)}return[{name:a,resourceIdentifier:f,keys:e,data:g,resourceType:h}]})}},getUnshredder:function(){return function(d,e){return b.log("Offline Persistence Toolkit simpleJsonShredding: Unshredding Response"),Promise.resolve().then(function(){var b=c(d);return a.setResponsePayload(e,b)}).then(function(a){return a.headers.set("x-oracle-jscpt-cache-expiration-date",""),Promise.resolve(a)})}}}});