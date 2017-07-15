/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
/*
 Copyright 2013 jQuery Foundation and other contributors
 Released under the MIT license.
 http://jquery.org/license
*/
define(["ojs/ojcore","jquery","ojs/ojcomponentcore"],function(a,g){(function(){function c(b,c,d){a:{for(var e=t[b],f=0;f<e.length;++f){var g=e[f];if(0<=d.indexOf(g))for(;;c=c.parentNode){var h=a.Components.nd(c,g);if(h){d=h;break a}}}d=null}return d?d("option","chroming"):(a.wc.Kd("oj-"+b+"-option-defaults")||{}).chroming}function b(a,b){var c=a.name,d=a.form;c?(c=c.replace(/'/g,"\\'"),c=":radio[name\x3d'"+c+"']:oj-button",d=b?b.filter(c):d?g(d).find(c):g(c,a.ownerDocument).filter(function(){return!this.form})):
d=(b?b.filter(a):g(a)).filter(":oj-button");return d}function d(a,b){a.removeClass(m).addClass(p[b])}a.ab("oj.ojButton",g.oj.baseComponent,{defaultElement:"\x3cbutton\x3e",widgetEventPrefix:"oj",options:{chroming:"full",disabled:!1,display:"all",label:null,icons:{start:null,end:null},menu:null},Vg:function(a,b){this._super(a,b);this.$Ga();"disabled"in b||this.option("disabled",!!this.element.prop("disabled"),{_context:{kb:!0}});"label"in b||(this.hTa=!0,this.option("label","inputPush"===this.type?
this.Of.val():this.Of.html(),{_context:{kb:!0}}));!this.options.menu||b.icons&&void 0!==b.icons.end||this.option("icons.end","oj-component-icon oj-button-menu-dropdown-icon",{_context:{zd:!0,kb:!0}})},_ComponentCreate:function(){function b(){c.hc.removeClass(q);c.hc.removeClass("oj-hover");c.tn()}this._super();this.JJ=this.eventNamespace+"menu";this.aHa();this.a4=!!this.hc.attr("title");var c=this,k=this.XG,q=k?"":"oj-active";this.hc.addClass(h);d(this.hc,this.options.chroming);this.Of.bind("touchstart"+
this.eventNamespace,function(){c.Wg()||(c.hc.addClass(q),c.tn(),c.document.one("touchend",b))}).bind("touchend"+this.eventNamespace+" touchcancel"+this.eventNamespace,b).bind("mouseenter"+this.eventNamespace,function(){c.Wg()||a.Q.pS()||(this===e&&c.hc.addClass("oj-active"),c.hc.addClass("oj-hover").removeClass("oj-default oj-focus-only"))}).bind("mouseleave"+this.eventNamespace,function(){c.hc.removeClass("oj-hover");c.Wg()||(c.hc.removeClass(q),c.tn())});this.dca=function(a){c.Wg()&&(a.preventDefault(),
a.stopImmediatePropagation())};this.Of[0].addEventListener("click",this.dca,!0);this._focusable({element:this.hc,applyHighlight:!0,afterToggle:function(){c.tn()}});k&&(this.element.bind("change"+this.eventNamespace,function(a){c.QV(!0);var b=c.$Ca("buttonset"),d=b&&b.eda(b.rg);b&&void 0!==d&&b.option("checked",d,{_context:{zd:!0,originalEvent:a,kb:!0}})}),this.Of.bind("mousedown"+this.eventNamespace,function(){c.Wg()||(f=this,c.document.one("mouseup",function(){f=null}))}).bind("mouseup"+this.eventNamespace,
function(){c.Wg()||this!==f||c.element.focus()}));"checkbox"===this.type?(this.Of.bind("click"+this.eventNamespace,function(){if(c.Wg())return!1}),this.element.bind("keyup"+this.eventNamespace,function(a){a.keyCode===g.ui.keyCode.ENTER&&(c.Wg()||c.element.click())})):"radio"===this.type?(this.Of.bind("click"+this.eventNamespace,function(){if(c.Wg())return!1}),this.element.bind("keyup"+this.eventNamespace,function(a){a.keyCode!==g.ui.keyCode.ENTER||c.element[0].checked||c.Wg()||(c.element[0].checked=
!0,c.element.change(),c.element.click())})):(this.Of.bind("mousedown"+this.eventNamespace,function(b){if(c.Wg())return!1;1!==b.which||a.Q.pS()||(c.hc.addClass("oj-active").removeClass("oj-default oj-focus-only"),e=this,c.document.one("mouseup",function(){e=null}))}).bind("mouseup"+this.eventNamespace,function(){if(c.Wg())return!1;c.hc.removeClass("oj-active");c.tn()}).bind("keydown"+this.eventNamespace,function(a){if(c.Wg())return a.keyCode===g.ui.keyCode.TAB||a.keyCode===g.ui.keyCode.LEFT||a.keyCode===
g.ui.keyCode.RIGHT;var b=a.keyCode===g.ui.keyCode.SPACE,d="anchor"===c.type;d&&b&&a.preventDefault();(b&&!d||a.keyCode===g.ui.keyCode.ENTER)&&c.hc.addClass("oj-active").removeClass("oj-default oj-focus-only")}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){c.hc.removeClass("oj-active");c.tn()}),"anchor"===this.type&&(k=this.Of.attr("tabindex"),(null===k||isNaN(k))&&this.Of.attr("tabindex","0")));this.options.disabled&&this.D_(!1,!0);this.m2();this.OFa();this.qka(null);this.tn()},
mi:function(a,b,c){this.oi(b,c,{position:{of:"keyboard"===c?this.hc:b}})},$Ga:function(){if(this.element.is("input[type\x3dcheckbox]"))this.type="checkbox",this.XG=!0;else if(this.element.is("input[type\x3dradio]"))this.type="radio",this.XG=!0;else if(this.element.is("input[type\x3dbutton],input[type\x3dsubmit],input[type\x3dreset]"))this.type="inputPush";else if(this.element.is("button"))this.type="button";else if(this.element.is("a"))this.type="anchor";else throw Error("JET Button not supported on this element type");
if(this.XG){var a="label[for\x3d'"+this.element.attr("id")+"']";this.Of=this.element.siblings().filter(a)}else this.Of=this.element},aHa:function(){this.XG?(this.Of.addClass("oj-button-label"),this.element.addClass("oj-button-input oj-helper-hidden-accessible").add(this.Of).wrapAll("\x3cspan\x3e\x3c/span\x3e"),this.hc=this.element.parent(),this.hc.addClass("oj-button-jqui oj-button-toggle"),this.element[0].checked&&this.hc.addClass("oj-selected").removeClass("oj-default oj-focus-only")):this.ki()?
(this.hc=this.element.parent(),this.element.addClass("oj-button-button")):(this.hc=this.element,this.element.addClass("oj-button-jqui"))},widget:function(){return this.hc},_destroy:function(){this.Via(this.options.menu);this.Of[0].removeEventListener("click",this.dca,!0);this.element.removeClass("oj-helper-hidden-accessible").removeAttr("aria-labelledby").removeUniqueId();this.options.disabled&&this.D_(!0,!1);var b=this.XG;b||this.hc.removeClass(h+" oj-button-jqui "+k+" "+l+" "+m);this.Of.html(this.Of.find(".oj-button-text").html());
b?(this.Of.removeClass("oj-button-label"),a.Q.unwrap(this.element)):this.a4||this.hc.removeAttr("title");f===this.Of[0]&&(f=null)},xk:function(){this._super();this.tn()},fF:function(a){this._super(a);this.m2()},m2:function(){var a=this.Wg();this.hc.toggleClass("oj-disabled",a);this.hc.toggleClass("oj-enabled",!a);"anchor"!==this.type?(this.element.prop("disabled",a),this.hc.removeAttr("aria-disabled")):(this.element.attr("aria-disabled",a),this.ki()&&this.hc.removeAttr("aria-disabled"));a?(this.widget().removeClass("oj-active oj-default oj-focus-only oj-hover oj-focus oj-focus-highlight"),
e=null,this.rX(this.options.menu)):this.tn()},_setOption:function(a,b,c){var e=this.options[a];this._super(a,b,c);switch(a){case "chroming":d(this.hc,b);break;case "disabled":this.D_(e,b);this.m2();break;case "label":this.NMa();break;case "display":"inputPush"!==this.type&&this.yP();break;case "icons":this.KMa(!0);break;case "menu":this.qka(e)}},refresh:function(){this._super();this.E$&&!this.pN("buttonset").length&&this.fF(!1);d(this.hc,this.options.chroming)},QV:function(a){"radio"===this.type?
(a?b(this.element[0]):this.element).each(function(){var a=g(this).data("oj-ojButton");this.checked?a.hc.addClass("oj-selected").removeClass("oj-default oj-focus-only"):(a.hc.removeClass("oj-selected"),a.tn())}):"checkbox"===this.type&&(this.element[0].checked?this.hc.addClass("oj-selected").removeClass("oj-default oj-focus-only"):(this.hc.removeClass("oj-selected"),this.tn()))},OFa:function(){if("inputPush"===this.type)this.Xja();else{var a=this.MMa(),b=this.AP(!0),c=this.AP(!1);this.yP(a,b,c)}},
MMa:function(){var a=this.Of,b=g("\x3cspan class\x3d'oj-button-text'\x3e\x3c/span\x3e",this.document[0]);this.hTa?b.append(a.contents()):(a.empty(),b.text(this.options.label));"button"===this.type?(a=g("\x3cdiv\x3e\x3c/div\x3e").addClass("oj-button-label"),a.append(b),this.element.append(a)):a.append(b);"button"!==this.type&&"anchor"!==this.type||this.element[0].hasAttribute("aria-label")||this.element[0].hasAttribute("aria-labelledby")||(b.uniqueId(),this.element.attr("aria-labelledby",b.attr("id")));
return b},NMa:function(){if("inputPush"===this.type)this.Xja();else{var a=this.Of.find(".oj-button-text");a.text(this.options.label);this.yP(a)}},Xja:function(){this.options.label&&this.element.val(this.options.label)},KMa:function(){if("inputPush"!==this.type){var a=this.AP(!0),b=this.AP(!1);this.yP(void 0,a,b)}},AP:function(a){var b=this.Of;"button"===this.type&&(b=this.element.children("div.oj-button-label"));if(a){var c=".oj-button-icon.oj-start";a="oj-button-icon oj-start";var d=this.options.icons.start,
e="_lastStartIcon",f="prependTo"}else c=".oj-button-icon.oj-end",a="oj-button-icon oj-end",d=this.options.icons.end,e="_lastEndIcon",f="appendTo";c=b.find(c);d?(c.length?c.removeClass(this[e]):c=g("\x3cspan\x3e\x3c/span\x3e").addClass(a)[f](b),c.addClass(d)):c.remove();this[e]=d;return!!d},yP:function(a,b,c){void 0===a&&(a=this.Of.find(".oj-button-text"));void 0===b&&(b=!!this.options.icons.start);void 0===c&&(c=!!this.options.icons.end);var d=b&&c;c=b||c;var e="icons"===this.options.display;c&&e?
(a.addClass("oj-helper-hidden-accessible"),this.a4||(a=a.text(),this.hc.attr("title",g.trim(a)))):(a.removeClass("oj-helper-hidden-accessible"),this.a4||this.hc.removeAttr("title"));b=c?e?d?"oj-button-icons-only":"oj-button-icon-only":d?"oj-button-text-icons":b?"oj-button-text-icon-start":"oj-button-text-icon-end":"oj-button-text-only";this.hc.removeClass(l).addClass(b)},D_:function(a,b){if(!a!=!b&&"anchor"===this.type&&!this.pN("buttonset").length&&!this.pN("toolbar").length)if(b){var c=this.element.attr("tabindex");
this.Pha=this.ZHa(Number(c))?c:null;this.element.attr("tabindex",-1)}else null==this.Pha?this.element.removeAttr("tabindex"):this.element.attr("tabindex",this.Pha)},ZHa:function(a){return"number"===typeof a&&isFinite(a)&&Math.floor(a)===a},mMa:{buttonset:".oj-buttonset",toolbar:".oj-toolbar"},zza:{buttonset:"ojButtonset",toolbar:"ojToolbar"},pN:function(a){return this.hc.closest(this.mMa[a])},$Ca:function(b){var c=this.pN(b)[0];return(b=a.Components.nd(c,this.zza[b]))&&b("instance")},qka:function(a){if(this.options.menu&&
this.element.is("input"))throw Error("Menu Button functionality is not supported on input elements.");this.Via(a);if(this.options.menu){var b=this;this.element.attr("aria-haspopup",!0).on("keydown"+this.JJ,function(a){if(a.which===g.ui.keyCode.DOWN)b.zka(a,"firstItem"),a.preventDefault();else if(a.which===g.ui.keyCode.ESCAPE){var c=!b.hc.hasClass("oj-selected");b.rX(b.options.menu,a);return c}return!0}).on("click"+this.JJ,function(a){var c=b.Xda();c.TL||b.zka(a,"firstItem");c.TL=!1;a.preventDefault();
return!0})}},Via:function(a){this.element.removeAttr("aria-haspopup").off(this.JJ);this.rX(a);g(a).off(this.JJ);this.zha=!1},Xda:function(){var a=this.Yda(this.options.menu);if(!a)throw Error('JET Button: "menu" option specified, but does not reference a valid JET Menu.');if(!this.zha){var b=this;a.widget().on("ojclose"+this.JJ,function(a){b.WIa(a)});this.zha=!0}return a},Yda:function(b){return(b=a.Components.nd(g(b)[0],"ojMenu"))&&b("instance")},zka:function(a,b){if(!this.Wg()){var c=this.Xda(),
d=c.widget();c.open(a,{launcher:this.element,initialFocus:b});d.is(":visible")&&(this.Bha=!0,d.attr("aria-label")||d.attr("aria-labelledby")||(this.element.uniqueId(),this.Kja=!0,d.attr("aria-labelledby",this.element.attr("id"))),this.hc.addClass("oj-selected").removeClass("oj-default oj-focus-only"))}},rX:function(a,b){if(this.Bha){var c=this.Yda(a);c&&(c.RL(b,!0),c.tx(b))}},WIa:function(){this.Kja&&(g(this.options.menu).removeAttr("aria-labelledby"),this.Kja=!1);this.hc.removeClass("oj-selected");
this.tn();this.Bha=!1},tn:function(){var a,b;this.hc.is(".oj-hover, .oj-active, .oj-selected, .oj-disabled")?b=a=!1:(b=this.hc.is(".oj-focus"),a=!b);this.hc.toggleClass("oj-default",a);this.hc.toggleClass("oj-focus-only",b)}});a.ab("oj.ojButtonset",g.oj.baseComponent,{bha:"button, input[type\x3dbutton], input[type\x3dsubmit], input[type\x3dreset], input[type\x3dcheckbox], input[type\x3dradio], a",widgetEventPrefix:"oj",options:{checked:null,chroming:"full",focusManagement:"oneTabstop"},SH:function(a,
b){var c=g.type(a),d;if("null"===c||"array"===c)d=b.filter("input[type\x3dcheckbox]").length===b.length;if(d&&"null"===c)throw Error("Invalid 'checked' value set on JET Buttonset: "+a);if("string"===c||"null"===c)(c=((c=b[0].name)||1>=b.length)&&b.filter("input[type\x3dradio][name\x3d"+c+"]").length===b.length&&(null===a||b.filter("[value\x3d"+a+"]").length))&&b.each(function(){this.checked=this.value===a}),c=c||null===a;else if("array"===c){var e;(c=d&&a.concat().sort().every(function(a){var c=a!==
e&&b.filter("[value\x3d"+a+"]").length;e=a;return c}))&&b.each(function(){this.checked=-1<a.indexOf(this.value)})}else c=!1;if(!c)throw Error("Invalid 'checked' value set on JET Buttonset: "+a);},eda:function(a){var b=void 0,c=null,d=null;a.each(function(){if("input"!==this.tagName.toLowerCase())return b=void 0,!1;var a=this.type.toLowerCase(),e;if("radio"===a)a=!0,e=this.name.toLowerCase();else if("checkbox"===a)a=!1,e=null;else return b=void 0,!1;if(void 0!==b&&(a!==c||e!==d||c&&!d))return b=void 0,
!1;void 0===b?(b=a?this.checked?this.value:null:this.checked?[this.value]:[],c=a,d=e):this.checked&&(c?b=this.value:b.push(this.value))});return b},KE:function(a,b,c){return"checked"===a?b===c?!0:"array"===g.type(b)&&"array"===g.type(c)&&this.tza(b,c):this._superApply(arguments)},tza:function(a,b){return!a.some(function(a){return 0>b.indexOf(a)})&&!b.some(function(b){return 0>a.indexOf(b)})},Vg:function(a,b){this._super(a,b);this.rg=this.element.find(this.bha);if(!("checked"in b)){this.d4=!0;var c=
this.eda(this.rg);"array"===g.type(c)&&(this.options.checked=[]);void 0!==c&&this.option("checked",c,{_context:{kb:!0}})}},_ComponentCreate:function(){this._super();this.element.attr(a.Components.Wp,this.widgetName).addClass("oj-buttonset oj-component");this.jka(this.options.focusManagement);this.hb(!0)},mi:function(a,b,c){a=this.element.find(":oj-button[tabindex\x3d0]");this.oi(b,c,{launcher:a,position:{of:"keyboard"===c?a.ojButton("widget"):b}})},lv:function(a){a=!!a;this.rg.each(function(){g(this).data("oj-ojButton").fF(a)})},
jka:function(a){"oneTabstop"===a?this.element.attr("role","toolbar"):this.element.removeAttr("role")},_setOption:function(a,b,c){this._superApply(arguments);"disabled"===a?this.lv(b):"checked"===a?(this.SH(b,this.rg),this.rg.each(function(){g(this).data("oj-ojButton").QV(!1)})):"focusManagement"===a?this.jka(b):"chroming"===a&&(d(this.element,b),this.rg.ojButton("refresh"))},refresh:function(){this._super();this.hb(!1)},hb:function(a){var b=this;this.zm="rtl"===this.sd();d(this.element,this.options.chroming);
a?this.d4||this.SH(this.options.checked,this.rg):this.rg=this.element.find(this.bha);this.element.toggleClass("oj-buttonset-multi",1<this.rg.length);this.rg.filter(":oj-button").ojButton("refresh").each(function(){g(this).data("oj-ojButton").QV(!1)}).end().not(":oj-button").ojButton().end().map(function(){return g(this).ojButton("widget")[0]}).removeClass("oj-buttonset-first oj-buttonset-last").filter(":first").addClass("oj-buttonset-first").end().filter(":last").addClass("oj-buttonset-last").end().end();
this.lv(this.options.disabled);"oneTabstop"===this.options.focusManagement&&(this.rg.unbind("keydown"+this.eventNamespace).bind("keydown"+this.eventNamespace,function(a){b.Xx(a,g(this))}).unbind("click"+this.eventNamespace).bind("click"+this.eventNamespace,function(){g(this).data("oj-ojButton").Wg()||b.Oy(g(this))}).unbind("focus"+this.eventNamespace).bind("focus"+this.eventNamespace,function(){b.Oy(g(this))}),this.Dr=this.rg.filter(function(){return!g(this).data("oj-ojButton").Wg()}),this.c_(a))},
c_:function(a){var b=g(this.oy);this.oy=void 0;this.rg.attr("tabindex","-1");a=a||!b.is(this.Dr)?this.Dr.first():b;this.Oy(a)},E_:function(a){var c=this.Dr;return a.map(function(a,d){if("radio"!=d.type||d.checked||""==d.name)return d;var e=b(d,c).filter(":checked");return e.length?e[0]:d})},Oy:function(a){a=this.E_(a);var b=a[0],c=this.oy;b!==c&&(g(c).attr("tabindex","-1"),a.attr("tabindex","0"),this.oy=b)},Xx:function(a,b){switch(a.which){case g.ui.keyCode.UP:case g.ui.keyCode.DOWN:if("radio"!=b.attr("type"))break;
case g.ui.keyCode.LEFT:case g.ui.keyCode.RIGHT:a.preventDefault();var c=this.Dr,d=c.length;if(2>d)break;var e=c.index(b);c.eq((e+(a.which==g.ui.keyCode.DOWN||a.which==g.ui.keyCode.RIGHT^this.zm?1:-1)+d)%d).focus()}},_destroy:function(){this.element.removeClass("oj-buttonset oj-component "+m).removeAttr(a.Components.Wp).removeAttr("role");"oneTabstop"===this.options.focusManagement&&this.rg.attr("tabindex","0");this.rg.map(function(){return g(this).ojButton("widget")[0]}).removeClass("oj-buttonset-first oj-buttonset-last").end().ojButton("destroy")}});
var e,f,h="oj-button oj-component oj-enabled oj-default",k="oj-hover oj-active oj-selected",l="oj-button-icons-only oj-button-icon-only oj-button-text-icons oj-button-text-icon-start oj-button-text-icon-end oj-button-text-only",m="oj-button-full-chrome oj-button-half-chrome oj-button-outlined-chrome",p={full:"oj-button-full-chrome",half:"oj-button-half-chrome",outlined:"oj-button-outlined-chrome"},t={button:["ojButtonset","ojToolbar"],buttonset:["ojToolbar"]};a.Components.Bp({ojButton:{chroming:a.Components.hf(function(a){return c("button",
a.element,a.containers)})},ojButtonset:{chroming:a.Components.hf(function(a){return c("buttonset",a.element,a.containers)})}})})();(function(){a.U.qb("oj-button","baseComponent",{properties:{chroming:{type:"string",enumValues:["full","half","outlined"]},disabled:{type:"boolean"},display:{type:"string",enumValues:["all","icons"]},href:{type:"string"},icons:{type:"Object",properties:{end:{type:"string"},start:{type:"string"}}},label:{type:"string"}},extension:{nb:"ojButton",px:["href"]}});a.U.register("oj-button",
{metadata:a.U.getMetadata("oj-button"),innerDomFunction:function(a){return a.getAttribute("href")?"a":"button"}})})()});