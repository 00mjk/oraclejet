/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["jquery","knockout"],function(e,t){var n={getRenderer:function(n,r){var a=function(a){var o=a._parentElement||a.parentElement,l=t.contextFor(a.componentElement);if(l){var c=l.createChildContext(a.data,null,function(e){e.$context=a});t.renderTemplate(n,c,{afterRender:function(t){e(t)._ojDetectCleanData()}},o,r?"replaceNode":"replaceChildren")}return null};return function(t){if(t.componentElement.classList&&t.componentElement.classList.contains("oj-dvtbase")){var r=document.createElement("div");r.style.display="none",r._dvtcontext=t._dvtcontext,t.componentElement.appendChild(r),Object.defineProperty(t,"_parentElement",{value:r,enumerable:!1}),Object.defineProperty(t,"_templateCleanup",{value:function(){e(r).remove()},enumerable:!1}),Object.defineProperty(t,"_templateName",{value:n,enumerable:!1}),a(t);var o=r.children[0];return o?("http://www.w3.org/2000/svg"===o.namespaceURI&&(r.removeChild(o),e(r).remove()),{insert:o}):{preventDefault:!0}}return a(t)}}};return n});