/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojtranslation","knockout","ojs/ojcomposite","ojs/ojlogger","ojs/ojcomponentcore"],function(e,t,n,r,i,o){i.register("oj-file-picker",{view:"<input type='file' style='display:none'       data-bind=\"attr:{multiple: $properties.selectionMode == 'multiple',                         accept: acceptStr}\"></input><div class='oj-filepicker-clickable'>  <oj-bind-slot name='trigger'>    <div tabindex='0'         class='oj-filepicker-dropzone'>      <p class='oj-filepicker-text' data-bind='text: defDropzoneText'></p>    </div>  </oj-bind-slot></div>",viewModel:function(i){var a,s,l=i.element,c=i.properties,d=!1;function u(e){var n=a[0],r=t(l).find(".oj-filepicker-clickable")[0];switch(function(e){e&&(e.removeEventListener("dragenter",j,!1),e.removeEventListener("dragover",k,!1),e.removeEventListener("dragleave",y,!1),e.removeEventListener("dragend",y,!1),e.removeEventListener("drop",E,!1))}(n),function(e){e&&(e.removeEventListener("click",p,!1),e.removeEventListener("keypress",p,!1))}(r),e){case"click":g(r);break;case"drop":h(n),r&&r.addEventListener("keypress",p,!1);break;case"auto":case"clickAndDrop":default:g(r),h(n)}}function p(e){return("click"===e.type||"keypress"===e.type&&13===e.keyCode)&&(d=!0,e.preventDefault(),s.value=null,s.click(),!0)}function f(e){e.preventDefault(),e.stopPropagation();var t=e.target.files;t.length>0&&L(t,e),d=!1}function v(t){var n,r=c.accept;if(!r||0===r.length||!t)return!0;for(var i=0;i<r.length;i++){if(!(n=e.StringUtils.trim(r[i])))return!0;if(n.startsWith(".",0)){if(!t.name||t.name&&t.name.endsWith(n))return!0}else{if(!t.type)return!1;if("image/*"===n){if(t.type.startsWith("image/",0))return!0}else if("video/*"===n){if(t.type.startsWith("video/",0))return!0}else if("audio/*"===n){if(t.type.startsWith("audio/",0))return!0}else if(t.type===n)return!0}}return!1}function g(e){e&&(e.addEventListener("click",p,!1),e.addEventListener("keypress",p,!1))}function h(e){e&&(e.addEventListener("dragenter",j,!1),e.addEventListener("dragover",k,!1),e.addEventListener("dragleave",y,!1),e.addEventListener("dragend",y,!1),e.addEventListener("drop",E,!1))}function m(e){var t="single"!==l.selectionMode||1===e.length;return t?function(e){if(e)for(var t=0;t<e.length;t++)if(!v(e[t]))return!1;return!0}(e):t}function j(e){e.preventDefault(),e.stopPropagation()}function k(e){e.preventDefault(),e.stopPropagation();var t=e.dataTransfer,n=!t.items||m(t.items);return n?(t.dropEffect="copy",a.addClass("oj-valid-drop")):t.dropEffect="none",n}function y(e){e.preventDefault(),e.stopPropagation(),a.removeClass("oj-valid-drop")}function E(e){var t=e.dataTransfer.files;m(t)?L(t,e):o.warn("oj-file-picker: Files "+function(e){var t="";if(e)for(var n=0;n<e.length;n++)t+=e[n].name+" ";return t}(t)+" are not acceptable."),y(e)}function L(e,t){var n=function(e){for(var t={length:{value:e.length},item:{value:function(e){return this[e]}}},n=0;n<e.length;n++)t[n]={value:e[n],enumerable:!0};return Object.create(FileList.prototype,t)}(e),r=new CustomEvent("ojSelect",{detail:{files:n,originalEvent:t}});l.dispatchEvent(r)}this.acceptStr=r.pureComputed(function(){var e=c.accept;return e&&e.length?e.join(","):null},this),l.addEventListener("selectOnChanged",function(e){u(e.detail.value)}),this.defDropzoneText=n.getTranslatedString("oj-ojFilePicker.dropzoneText"),this.bindingsApplied=function(){var n=t(l);n.addClass("oj-filepicker"),a=n.find(".oj-filepicker-dropzone"),u(c.selectOn);var r=n.find("input");r.length&&(s=r[0]).addEventListener("change",f,!1),a.length&&(a[0].addEventListener("focus",function(){d||(e.DomUtils.recentPointer()?a.removeClass("oj-focus-highlight"):a.addClass("oj-focus-highlight"))}),a[0].addEventListener("focusout",function(){d||a.removeClass("oj-focus-highlight")}))}},metadata:{properties:{accept:{type:"Array<string>"},selectOn:{type:"string",enumValues:["auto","click","clickAndDrop","drop"],value:"auto"},selectionMode:{type:"string",enumValues:["multiple","single"],value:"multiple"}},methods:{setProperty:{},getProperty:{},setProperties:{},getNodeBySubId:{},getSubIdByNode:{}},events:{ojSelect:{}},extension:{}}})});