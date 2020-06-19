/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["ojs/ojcore","ojs/ojcontext","ojs/ojcomponentcore","ojs/ojlabel","ojs/ojlogger","ojs/ojthemeutils"],function(e,t,n,a,o,i){"use strict";var l={properties:{colspanWrap:{type:"string",enumValues:["nowrap","wrap"]},direction:{type:"string",enumValues:["column","row"]},labelEdge:{type:"string",enumValues:["inside","start","top"]},labelWidth:{type:"string",value:"33%"},labelWrapping:{type:"string",enumValues:["truncate","wrap"],value:"wrap"},maxColumns:{type:"number",value:1},readonly:{type:"boolean",value:!1},userAssistanceDensity:{type:"string",enumValues:["compact","efficient","reflow"],value:"efficient"}},methods:{setProperty:{},getProperty:{},setProperties:{},refresh:{},getNodeBySubId:{},getSubIdByNode:{}},extension:{}};Object.freeze(l);var s=0;function r(n){var a,l,r,d,c,u,f=this,m=n.element,p="-labelled-by",y="data-oj-formlayout-bonus-dom",h="["+y+"]",b=!0,v=!1;function g(){l&&(l(),l=null)}function j(){a&&(a(),a=null)}function x(e){return"inside"===m.labelEdge||"inside"===e.labelEdge||"none"===e.labelEdge}function C(e){var t=null;return x(e)?t:(e instanceof Element&&"labelHint"in e&&""!==e.labelHint&&(I(e),t=function(e){var t=e.labelledBy;if(t){var n=document.getElementById(t);n&&o.error("The oj-form-layout descendent component with id "+e.id+' has both label-hint and labelled-by. Remove labelled-by="'+t+'" since no matching element was found in the document, and a label will be created using the label-hint.')}var a=document.createElement("oj-label");a.setAttribute(y,""),a.setAttribute("data-oj-internal",""),a.setAttribute("data-oj-binding-provider","none"),a.setAttribute("data-oj-context","");var i=document.createElement("span");i.id=e.id+"|hint",i.textContent=e.labelHint,J(e)&&B(e,a);return a.appendChild(i),function(e,t){var n=e,a=t;n.id=a.id+p,n.setAttribute("for",a.id)}(a,e),a}(e),e.parentElement.insertBefore(t,e),function(e){e.addEventListener("labelHintChanged",L),e.addEventListener("helpHintsChanged",E),e.addEventListener("requiredChanged",w),e.addEventListener("userAssistanceDensityChanged",A)}(e)),t)}function L(e){var t=e.target,n=document.getElementById(t.id+"|hint");n&&(n.innerText=e.detail.value)}function E(e){var t=e.target,n=N(t),a=e.detail.value;n&&(O(t)&&(n.help=a))}function w(e){var t,n=e.target,a=N(n);a&&(t=!!e.detail.value&&O(n),a.showRequired=t)}function A(e){var t=e.target,n=e.detail.value,a=e.detail.previousValue;if("compact"===n||"compact"===a){var o=N(t);if(J(t))B(t,o);else{t.required&&(o.showRequired=!1);var i=t.helpHints;i&&(i.definition||i.source)&&(o.help={definition:null,source:null})}}}function O(e){var t="use"===i.parseJSONFromFontFamily("oj-form-control-option-defaults").useUserAssistanceOptionDefault?e.userAssistanceDensity:"displayOptions";return"compact"===t||"displayOptions"===t}function N(e){return"labelledBy"in e?document.getElementById(e.labelledBy):m.querySelector('oj-label[for="'+e.id+'"]')}function B(e,t){var n,a=t,o=e.helpHints;o&&(o.definition||o.source)&&(a.help=o),n=!!e.required&&O(e),a.showRequired=n}function S(e,t){for(var n,a=t.previousSibling;a&&1!==a.nodeType;)n=a,a=a.previousSibling;for(;n&&n!==t;)a=n.nextSibling,e.appendChild(n),n=a}function D(e){for(;e.nextSibling;){var t=e.nextSibling;if(1===t.nodeType)break;if(8===t.nodeType&&0===t.textContent.trim().indexOf("oj-bind-"))break;e.appendChild(t)}}function W(e,t){e&&D(e);var n=k("oj-flex");return t.parentElement.insertBefore(n,t),S(n,n),n}function M(e,t){var n=1;return"column"===m.direction?"100%":(e&&"colspan"in e&&e.colspan&&(n=Math.min(Math.floor(e.colspan),t)),Math.floor(1e5/m.maxColumns)/1e3*n+"%")}function R(){if(!u&&(u=c,"start"===m.labelEdge&&"row"===m.direction)){var e=m.labelWidth.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);switch(e[2]){case"vw":case"vmin":case"vmax":case"%":u=e[1]/m.maxColumns+e[2]}}return u}function F(e,t){var n=k("oj-flex-item");return n.style.flexGrow="0",n.style.flexShrink="1",n.style.flexBasis=t,n.style.maxWidth=t,n.style.width=t,e.appendChild(n),n}function T(e,t){var n=m.maxColumns,a=t%n,o=M();if("column"!==m.direction&&e&&a>0)for(var i=a;i<n;i++)F(e,o)}function H(e,t,n,a){var o,i=t?R():M(e,a);S(n,e),t||(o=F(n,"0px"));var l=k("oj-flex-item");if(n.appendChild(l),l.appendChild(e),t){l.style.flexGrow="0",l.style.flexShrink="0",l.style.flexBasis=i,l.style.maxWidth=i,l.style.width=i;var s=k("oj-flex-item");n.appendChild(s),"row"===m.direction&&"top"===m.labelEdge&&(s.appendChild(e),l.style.flex="0 1 0px",l.style.maxWidth="0px",l.style.width="0px",l.classList.add("oj-formlayout-label-comp-flex-item"),s.classList.add("oj-formlayout-label-comp-flex-item")),i=function(e,t){return"start"===m.labelEdge?"calc("+M(e,t)+" - "+R()+")":M(e,t)}(e,a),s.appendChild(t),s.style.flexGrow="1",s.style.flexShrink="1",s.style.flexBasis=i,s.style.maxWidth=i,s.style.width=i,"OJ-FORM-LAYOUT"===t.tagName&&s.classList.add("oj-formlayout-nested-formlayout")}else"labelHint"in e&&x(e)?("row"===m.direction&&(o.style.flex="0 1 0px",o.style.maxWidth="0px",o.style.width="0px",o.classList.add("oj-formlayout-label-comp-flex-item"),l.classList.add("oj-formlayout-label-comp-flex-item")),l.style.flex="1 1 0",l.style.maxWidth=i,l.style.width=i):(i=M(e,a),l.style.flexGrow="1",l.style.flexShrink="1",l.style.flexBasis=i,l.style.maxWidth=i,l.style.width=i,o.classList.add("oj-formlayout-no-label-flex-item"),l.classList.add("oj-formlayout-no-label-flex-item"),"OJ-LABEL-VALUE"===e.tagName?(o.classList.add("oj-formlayout-nested-labelvalue"),l.classList.add("oj-formlayout-nested-labelvalue"),e.setAttribute("data-oj-colspan",a),e.refresh()):"OJ-FORM-LAYOUT"===e.tagName&&l.classList.add("oj-formlayout-nested-formlayout"));D(n)}function k(e){var t=document.createElement("div");return t.setAttribute(y,""),t.setAttribute("data-oj-internal",""),t.classList.add(e),t}function U(e){for(var t=e,n=!0;t!==m;){if("OJ-FORM-LAYOUT"===t.tagName){n=!1;break}if(null==(t=t.parentElement)){n=!1;break}}return n}function q(e){for(;e.firstChild;){var t=e.firstChild;e.parentNode.insertBefore(t,e);t.refresh&&t.classList.contains("oj-complete")&&t.refresh()}e.parentNode.removeChild(e)}function I(e){var t=e;t.id||(t.id="oflId_"+s,s+=1)}function J(e){var t=i.parseJSONFromFontFamily("oj-form-control-option-defaults"),n="displayOptions";t&&(n="use"===t.useUserAssistanceOptionDefault?e.userAssistanceDensity:"displayOptions");return"compact"===n||"displayOptions"===n}function V(e){var t=i.parseJSONFromFontFamily("oj-form-layout-option-defaults")||{};e?(e.props.labelEdge||(m.labelEdge=t.labelEdge),e.props.colspanWrap||(m.colspanWrap=t.colspanWrap),e.props.direction||(m.direction=t.direction)):(m.labelEdge||(m.labelEdge=t.labelEdge),m.colspanWrap||(m.colspanWrap=t.colspanWrap),m.direction||(m.direction=t.direction))}V(n),f._rootElementMutationObserver=new MutationObserver(function(e){document.body.contains(m)?(!function(e){for(var t=e.length,n=0;n<t;n++){var a=e[n];if("childList"===a.type)for(var o=a.addedNodes.length,i=0;i<o;i++){var l=a.addedNodes[i];l.parentNode===m&&r.appendChild(l)}}}(e),function(e){for(var t=!0,n=e.length,a=["colspan","label-hint"],o=0;o<n;o++){var i=e[o];if("childList"===i.type&&((l=i.target)===m||l&&"DIV"===l.tagName&&l.hasAttribute(y))&&U(i.target)){t=!1;break}if("attributes"===i.type&&a.includes(i.attributeName)){t=!1;break}}var l;return t}(e)||(!function(e){for(var t=e.length,n=0;n<t;n++){var a=e[n];if("childList"===a.type)for(var o=a.removedNodes.length,i=0;i<o;i++){var l=a.removedNodes[i];1===l.nodeType&&(l.removeEventListener("labelHintChanged",L),l.removeEventListener("helpHintsChanged",E),l.removeEventListener("requiredChanged",w),l.removeEventListener("userAssistanceDensityChanged",A))}}}(e),m.refresh())):this.disconnect()}),this.createDOM=function(){m.classList.add("oj-form-layout"),m.classList.add("oj-formlayout-max-cols-"+m.maxColumns),(r=document.createElement("div")).classList.add("oj-form"),r.setAttribute("data-oj-context",""),r.setAttribute("data-oj-internal",""),r.setAttribute(y,""),m.readonly?r.classList.remove("oj-enabled"):r.classList.add("oj-enabled");for("efficient"===m.userAssistanceDensity?r.classList.add("oj-efficient"):r.classList.remove("oj-efficient");m.firstChild;)r.appendChild(m.firstChild);m.appendChild(r)},f.handlePropertyChanged=function(e,t){if("readonly"===e)return m.readonly?r.classList.remove("oj-enabled"):r.classList.add("oj-enabled"),!0;if("userAssistanceDensity"===e){return"efficient"===m.userAssistanceDensity?r.classList.add("oj-efficient"):r.classList.remove("oj-efficient"),!0}return!1},this.updateDOM=function(){function n(){!function(){if(!l){var e=t.getContext(m).getBusyContext(),n={description:"The oj-form-layout component with id = '"+m.id+"' is being rendered."};l=e.addBusyState(n)}}(),V(),d=[],u=null,c="start"===m.labelEdge?m.labelWidth:"100%",t.getContext(r).getBusyContext().whenReady().then(function(){var n=document.activeElement,i=!1;!function(){if(!a){var e=t.getContext(r).getBusyContext(),n={description:"The oj-form div for oj-form-layout component with id = '"+m.id+"' is being rendered."};a=e.addBusyState(n)}}(),f._rootElementMutationObserver.disconnect(),function(){var e=m.maxColumns,t="oj-formlayout-max-cols-"+m.maxColumns,n=m.className;-1!==n.indexOf("oj-formlayout-max-cols-")&&(m.className=n.replace(/oj-formlayout-max-cols-[\d+]/,t));if("start"===m.labelEdge){var a=parseInt(m.labelWidth,10);(isNaN(a)||a>0)&&r.classList.add("oj-form-cols-labels-inline"),r.classList.add("oj-formlayout-labels-inline"),r.classList.remove("oj-form-cols")}else r.classList.add("oj-form-cols"),r.classList.remove("oj-form-cols-labels-inline"),r.classList.remove("oj-formlayout-labels-inline");"truncate"===m.labelWrapping?r.classList.add("oj-formlayout-labels-nowrap"):r.classList.remove("oj-formlayout-labels-nowrap");"row"===m.direction?(e=1,r.classList.add("oj-formlayout-form-across")):(e=m.maxColumns,r.classList.remove("oj-formlayout-form-across"));r.style.columnCount=e,r.style.webkitColumnCount=e,r.style.MozColumnCount=e}(),b||function(){for(var e=r.querySelectorAll(h),t=e.length,n=0;n<t;++n){var a=e[n];U(a)&&("OJ-LABEL"===a.tagName?(a.for="",a.parentElement.removeChild(a)):q(a))}}(),function(){var e=r.firstElementChild,t=0,n="column"===m.direction;for(;e;){var a=e.tagName.toLowerCase();if(-1!==a.indexOf("-"))if("oj-label"===a){var o=e;if(!(e=e.nextElementSibling))throw I(m),I(o),j(),g(),new Error("oj-form-layout component with id='"+m.id+"' has an oj-label child element with id='"+o.id+"' but has no next sibling element that it is associated with.")}else"oj-label-value"===a?b||e.refresh():e.classList.contains("oj-complete")?C(e):((n||t%m.maxColumns==0)&&e.setAttribute("data-oj-needs-oj-flex-div",""),d.push(e));t+=1,e=e.nextElementSibling}}(),function(){var e,t=[],n=r.children.length,a="column"===m.direction,i=0,l=0;!function(e,t){for(var n=t,a=e.length-1;a>=0;a--)n[a]=e[a]}(r.children,t);var s,c=m.maxColumns,u=0,f=!1,p=!1;for(;i<n;){var y=t[i];if(s=1,(a||l%c==0)&&(e=W(e,y)),-1===d.indexOf(y)){var h=y.tagName.toLowerCase();if("oj-label"===h){var b=t[i+=1];H(y,b,e)}else if("labelHint"in y&&x(y))H(y,null,e);else{if("colspan"in y&&y.getAttribute("colspan"))if(a)f||(o.error('Colspan attribute is ignored unless direction is set to "row"'),f=!0);else{var v=c-u;s=Math.floor(y.colspan),"wrap"===m.colspanWrap&&v<s&&u>0?(T(e,l),l+=v,u=0,s=Math.min(s,c),e=W(e,y)):s=Math.min(s,v),!p&&c>1&&(p=!0)}H(y,null,e,s)}}u=(l+=s)%c,i+=1}p&&!a?r.classList.add("oj-form-control-full-width"):r.classList.remove("oj-form-control-full-width");T(e,l)}(),n&&(i=e.DomUtils.isAncestorOrSelf(m,n)),!b&&i&&setTimeout(function(){n.focus()},0),f._rootElementMutationObserver.observe(m,{childList:!0,subtree:!0,attributes:!0}),b&&(b=!1),j(),g()})}var i;v||(!(b||!m.hasAttribute("data-oj-context"))&&!(i=t.getContext(m).getBusyContext()).isReady()?(v=!0,i.whenReady().then(function(){v=!1,n()})):n())}}r.getDynamicDefaults=function(){var e=i.parseJSONFromFontFamily("oj-form-layout-option-defaults")||{};return{labelEdge:e.labelEdge,direction:e.direction}},l.extension._CONSTRUCTOR=r,l.extension._TRACK_CHILDREN="nearestCustomElement",e.CustomElementBridge.register("oj-form-layout",{metadata:e.CollectionUtils.mergeDeep(l,{properties:{readonly:{binding:{provide:[{name:"containerReadonly"},{name:"readonly"}],consume:{name:"containerReadonly"}}},userAssistanceDensity:{binding:{provide:[{name:"containerUserAssistanceDensity"},{name:"userAssistanceDensity",default:"efficient"}],consume:{name:"containerUserAssistanceDensity"}}}}})})});