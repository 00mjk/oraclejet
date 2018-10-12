/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['./DvtToolkit'], function(dvt) {
  // Internal use only.  All APIs and functionality are subject to change at any time.

!function(t){t.PictoChart=function(t,e,i){this.Init(t,e,i)},t.Obj.createSubclass(t.PictoChart,t.BaseComponent),t.PictoChart.newInstance=function(e,i,o){return new t.PictoChart(e,i,o)},t.PictoChart.prototype.Init=function(e,n,r){t.PictoChart.superclass.Init.call(this,e,n,r),this.EventManager=new i(this),this.EventManager.addListeners(this),t.Agent.isTouchDevice()||this.EventManager.setKeyboardHandler(new s(this.EventManager)),this.Defaults=new o,this._items=[],(t.Agent.isBrowserChrome()||t.Agent.isBrowserSafari())&&this.getCtx().removeSizingSvg()},t.PictoChart.prototype._getPreferredSize=function(e,i){if(!e||!i){var o=l.getInfo(this,e,i);this._info=o,e||(e=o.items?o.colCount*o.colWidth:0),i||(i=o.items?o.rowCount*o.rowHeight:0)}return new t.Dimension(e,i)},t.PictoChart.prototype.render=function(e,i,o){this._oldContainer=this._container;var n=this._markers,r=this.Width?this.Width:0,s=this.Height?this.Height:0;this.EventManager.hideTooltip(),this._items=[],this._markers=[],this._info=null,this._emptyText&&(this._container.removeChild(this._emptyText),this._emptyText=null),this.StopAnimation(),this.SetOptions(e);var a=this.getCtx();if(i||o)this.Width=i,this.Height=o;else{a.getSvgDocument().style.display="block";var h=this._getPreferredSize();t.ToolkitUtils.setSvgSize(a,h.w,h.h);var c=t.ToolkitUtils.getOuterDivSize(a);h.w==c.w&&h.h!=c.h?(this.Height=c.h,h=this._getPreferredSize(null,this.Height),t.ToolkitUtils.setSvgSize(a,h.w,this.Height),this.Width=t.ToolkitUtils.getOuterDivSize(a).w):h.w!=c.w&&h.h==c.h?(this.Width=c.w,h=this._getPreferredSize(this.Width,null),t.ToolkitUtils.setSvgSize(a,this.Width,h.h),this.Height=t.ToolkitUtils.getOuterDivSize(a).h):(this.Width=c.w,this.Height=c.h),this.Width==h.w&&this.Height==h.h||(this._info=null)}if(this._container=new t.Container(a),this.addChild(this._container),l.render(this,this._container,new t.Rectangle(0,0,this.Width,this.Height),this._info),this._oldContainer){if("none"!=this.Options.animationOnDataChange&&e){var p=new t.DataAnimationHandler(a,null);p.constructAnimation(n,this._markers),this.Animation=p.getAnimation()}}else this.Animation=this._getAnimationOnDisplay();this.Animation?(t.ToolkitUtils.setSvgSize(a,Math.max(r,this.Width),Math.max(s,this.Height)),this.EventManager.removeListeners(this),this._emptyText&&this._container.removeChild(this._emptyText),this.Animation.setOnEnd(this._onRenderEnd,this),this.Animation.play()):this._onRenderEnd()},t.PictoChart.prototype.SetOptions=function(e){e?this.Options=this.Defaults.calcOptions(e):this.Options||(this.Options=this.GetDefaults()),t.Agent.isEnvironmentBrowser()||(this.Options.animationOnDisplay="none",this.Options.animationOnDataChange="none");var i=this.Options.selectionMode;this._selectionHandler="single"==i?new t.SelectionHandler(this.getCtx(),t.SelectionHandler.TYPE_SINGLE):"multiple"==i?new t.SelectionHandler(this.getCtx(),t.SelectionHandler.TYPE_MULTIPLE):null,this.EventManager.setSelectionHandler(this._selectionHandler)},t.PictoChart.prototype._onRenderEnd=function(){var e;this._oldContainer&&(this.removeChild(this._oldContainer),this._oldContainer.destroy(),this._oldContainer=null),this.Animation&&(this.EventManager.addListeners(this),this._emptyText&&this._container.addChild(this._emptyText)),t.ToolkitUtils.setSvgSize(this.getCtx(),this.Width,this.Height);for(var i=0;i<this._items.length&&"none"==(e=this._items[i]).getShape();i++);this.EventManager.setFocusObj(e),this._selectionHandler&&this._selectionHandler.processInitialSelections(this.Options.selection,this._items),t.CategoryRolloverHandler.highlight(this.Options.highlightedCategories,this._items,"any"==this.Options.highlightMatch),this.UpdateAriaAttributes(),this.AnimationStopped||this.RenderComplete(),this.Animation=null,this.AnimationStopped=!1},t.PictoChart.prototype.registerItems=function(t){this._items=t},t.PictoChart.prototype.getItems=function(){return this._items},t.PictoChart.prototype.registerMarker=function(t){this._markers.push(t)},t.PictoChart.prototype.registerEmptyText=function(t){this._emptyText=t},t.PictoChart.prototype.getTotalCount=function(){for(var t=0,e=0;e<this._items.length;e++)t+=this._items[e].getCount();return t},t.PictoChart.prototype.getAnimationDuration=function(){return t.StyleUtils.getTimeMilliseconds(this.Options.animationDuration)/1e3},t.PictoChart.prototype._getAnimationOnDisplay=function(){var e=this.Options.animationOnDisplay,i=this.getAnimationDuration(),o=this.getCtx(),n=new t.Rectangle(0,0,this.Width,this.Height);if(t.BlackBoxAnimationHandler.isSupported(e))return t.BlackBoxAnimationHandler.getInAnimation(o,e,this._container,n,i);var r=[];if("popIn"==e)for(var s=0;s<this._markers.length;s++){var a=this._markers[s];r.push(new t.AnimPopIn(o,a,!0,i))}else if("none"!=e){for(s=0;s<this._markers.length;s++){a=this._markers[s];var h,c,p=new t.CustomAnimation(o,a,i);l.isVertical(this)?(h=l.isOriginRight(this)?this.Width:0,c=a.getCx(),a.setCx(h),p.getAnimator().addProp(t.Animator.TYPE_NUMBER,a,a.getCx,a.setCx,c)):(h=l.isOriginBottom(this)?this.Height:0,c=a.getCy(),a.setCy(h),p.getAnimator().addProp(t.Animator.TYPE_NUMBER,a,a.getCy,a.setCy,c)),r.push(p)}r.push(t.BlackBoxAnimationHandler.getInAnimation(o,t.BlackBoxAnimationHandler.ALPHA_FADE,this._container,n,i))}return r.length>0?new t.ParallelPlayable(o,r):null},t.PictoChart.prototype.highlight=function(e){var i=this.getOptions();i.highlightedCategories=t.JsonUtils.clone(e),t.CategoryRolloverHandler.highlight(e,this.getItems(),"any"==i.highlightMatch)},t.PictoChart.prototype.select=function(e){this.getOptions().selection=t.JsonUtils.clone(e),this._selectionHandler&&this._selectionHandler.processInitialSelections(e,this.getItems())},t.PictoChart.prototype.GetComponentDescription=function(){return t.Bundle.getTranslation(this.getOptions(),"componentName",t.Bundle.UTIL_PREFIX,"PICTOCHART")},t.PictoChart.prototype.getAutomation=function(){return this._automation||(this._automation=new e(this)),this._automation};var e=function(t){this._picto=t};t.Obj.createSubclass(e,t.Automation),e.prototype.GetSubIdForDomElement=function(t){var e=this._picto.getEventManager().GetLogicalObject(t);return e&&e instanceof r?"item["+this._picto.getItems().indexOf(e)+"]":null},e.prototype.getDomElementForSubId=function(e){if(e==t.Automation.TOOLTIP_SUBID)return this.GetTooltipElement(this._picto);var i=e.indexOf("[");if(i>0&&"item"===e.substring(0,i)){var o=parseInt(e.substring(i+1,e.length-1)),n=this._picto.getItems()[o];return n?n.getElem():null}return null},e.prototype.getItem=function(t){var e=this._picto.getItems()[t];if(e){var i={};return i.color=e.getDatatipColor(),i.tooltip=e.getDatatip(),i.id=e.getId(),i.name=e.getName(),i.count=e.getCount(),i.selected=e.isSelected(),i}return null},e.prototype.getItemCount=function(){return this._picto.getItems().length};var i=function(t){this.Init(t.getCtx(),t.dispatchEvent,t),this._picto=t};t.Obj.createSubclass(i,t.EventManager),i.prototype.ProcessRolloverEvent=function(e,i,o){var n=this._picto.getOptions();if("none"!=n.hoverBehavior){var r=i.getCategories?i.getCategories():[];n.highlightedCategories=o?r.slice():null;var s=t.EventFactory.newCategoryHighlightEvent(n.highlightedCategories,o),a=t.StyleUtils.getTimeMilliseconds(n.hoverBehaviorDelay);this.RolloverHandler.processEvent(s,this._picto.getItems(),a,"any"==n.highlightMatch)}},i.prototype.OnClickInternal=function(t){var e=this.GetLogicalObject(t.target);e&&(this.processActionEvent(e),e.isSelectable&&e.isSelectable()||this.processDrillEvent(e))},i.prototype.OnDblClickInternal=function(t){var e=this.GetLogicalObject(t.target);e&&e.isSelectable&&e.isSelectable()&&this.processDrillEvent(e)},i.prototype.HandleTouchHoverEndInternal=function(t){var e=this.GetLogicalObject(t.target);e&&(this.processActionEvent(e),e.isSelectable&&e.isSelectable()||this.processDrillEvent(e))},i.prototype.HandleTouchClickInternal=function(t){var e=this.GetLogicalObject(t.target);e&&(this.processActionEvent(e),e.isSelectable&&e.isSelectable()||this.processDrillEvent(e))},i.prototype.HandleTouchDblClickInternal=function(t){var e=this.GetLogicalObject(t.target);e&&e.isSelectable&&e.isSelectable()&&(t.preventDefault(),t.stopPropagation(),this.processDrillEvent(e))},i.prototype.processDrillEvent=function(e){e instanceof r&&e.isDrillable()&&this.FireEvent(t.EventFactory.newDrillEvent(e.getId()))},i.prototype.processActionEvent=function(e){e&&e.getAction&&e.getAction()&&this.FireEvent(t.EventFactory.newActionEvent("action",e.getAction(),e.getId()))};var o=function(){this.Init({alta:o.VERSION_1})};t.Obj.createSubclass(o,t.BaseComponentDefaults),o.VERSION_1={animationOnDisplay:"none",animationOnDataChange:"none",animationDuration:750,drilling:"off",hiddenCategories:[],highlightedCategories:[],highlightMatch:"all",hoverBehavior:"none",hoverBehaviorDelay:200,layout:"horizontal",layoutOrigin:"topStart",selection:[],selectionMode:"none",_defaultColor:"#a6acb1",_noneShapeColor:"rgba(255,255,255,0)",_defaultSize:32,_defaultShape:"rectangle",_gapRatio:.25,_textStyle:new t.CSSStyle(t.BaseComponentDefaults.FONT_FAMILY_ALTA_13+"color: #252525;"),_statusMessageStyle:new t.CSSStyle(t.BaseComponentDefaults.FONT_FAMILY_ALTA_13+"color: #252525;"),_tooltipStyle:new t.CSSStyle("border-collapse: separate; border-spacing: 1px"),_tooltipLabelStyle:new t.CSSStyle("color: #666666; padding: 0px 2px"),_tooltipValueStyle:new t.CSSStyle("color: #333333; padding: 0px 2px")},o.prototype.getAnimationDuration=function(t){return t.animationDuration};var n=function(t,e,i,o,r,s,a,l,h,c){n.superclass.Init.call(this,t.getCtx(),e,i,o,r,null,s,a,l,h,c),this._picto=t};t.Obj.createSubclass(n,t.ImageMarker),n.prototype.animateUpdate=function(e,i){var o=new t.CustomAnimation(this.getCtx(),this,.75*this._picto.getAnimationDuration()),n=o.getAnimator(),r=this._getAnimationParams();this._setAnimationParams(i._getAnimationParams()),n.addProp(t.Animator.TYPE_NUMBER_ARRAY,this,this._getAnimationParams,this._setAnimationParams,r),i.setAlpha(0),e.add(o,1)},n.prototype.animateDelete=function(e){e.add(new t.AnimFadeOut(this.getCtx(),this,.5*this._picto.getAnimationDuration()),0)},n.prototype.animateInsert=function(e){this.setAlpha(0),e.add(new t.AnimFadeIn(this.getCtx(),this,.5*this._picto.getAnimationDuration()),2)},n.prototype._getAnimationParams=function(){return[this.getCx(),this.getCy(),this.getWidth(),this.getHeight()]},n.prototype._setAnimationParams=function(t){this.setCx(t[0]),this.setCy(t[1]),this.setWidth(t[2]),this.setHeight(t[3])};var r=function(t,e){this.Init(t,e)};t.Obj.createSubclass(r,t.Container),r._counter=0,r.prototype.Init=function(e,i){r.superclass.Init.call(this,e.getCtx(),null,i.id),this._picto=e,this._item=i,this._id=null!=i.id?i.id:null!=i.name?i.name:"_defaultId"+r._counter,r._counter++,this._isNoneShape="none"==i.shape,this._isSelected=!1,this._isShowingKeyboardFocusEffect=!1,this._keyboardTooltipLocation=new t.Point(0,0),(this.isSelectable()||this.isDrillable())&&this.setCursor(t.SelectionEffectUtils.getSelectingCursor()),e.getEventManager().associate(this,this)},r.prototype.getColSpan=function(){var t=this._item.columnSpan;return null!=t&&t>=0?Math.round(t):1},r.prototype.getRowSpan=function(){var t=this._item.rowSpan;return null!=t&&t>=0?Math.round(t):1},r.prototype.getCount=function(){var t=this._item.count;return null!=t?Math.max(t,0):1},r.prototype.getShape=function(){return this._item.shape||this._picto.getOptions()._defaultShape},r.prototype.getColor=function(){return this._isNoneShape?this._picto.getOptions()._noneShapeColor:this._item.color||this._picto.getOptions()._defaultColor},r.prototype.getBorderColor=function(){return this._item.borderColor},r.prototype.getBorderWidth=function(){return this._item.borderWidth},r.prototype.getClassName=function(){return this._item.className||this._item.svgClassName},r.prototype.getStyle=function(){return this._item.style||this._item.svgStyle},r.prototype.getSource=function(){return this._item.source},r.prototype.getSourceSelected=function(){return this._item.sourceSelected},r.prototype.getSourceHover=function(){return this._item.sourceHover},r.prototype.getSourceHoverSelected=function(){return this._item.sourceHoverSelected},r.prototype.getName=function(){return this._item.name},r.prototype.getId=function(){return this._id},r.prototype.getAction=function(){return this._item.action},r.prototype.getShortDesc=function(){return this._item.shortDesc},r.prototype.isDrillable=function(){if(this._isNoneShape)return!1;var t=this._item.drilling;return t&&"inherit"!=t?"on"==t:"on"==this._picto.getOptions().drilling},r.prototype.isDoubleClickable=function(){return this.isSelectable()&&this.isDrillable()&&!this._isNoneShape},r.prototype.updateAriaAttributes=function(){this.setAriaRole("img"),this._updateAriaLabel()},r.prototype.getDatatip=function(e){if(this._isNoneShape)return"";var i=this._picto.getOptions(),o=this._picto.getOptions().tooltip,n=o?o.renderer:null;if(n){var r=this._picto.getCtx().getTooltipManager(),s={id:this.getId(),name:this.getName(),count:this.getCount(),color:this.getColor()};return r.getCustomTooltip(n,s)}if(null!=this.getShortDesc())return this.getShortDesc();var a="",l=this.getName();l&&(a=t.HtmlTooltipManager.createStartTag("td",i._tooltipLabelStyle)+l+"</td>");var h=t.Agent.isRightToLeft(this._picto.getCtx());return i._tooltipLabelStyle.setStyle(t.CSSStyle.TEXT_ALIGN,h?"left":"right"),i._tooltipValueStyle.setStyle(t.CSSStyle.TEXT_ALIGN,h?"right":"left"),t.HtmlTooltipManager.createStartTag("table",i._tooltipStyle)+"<tr>"+a+t.HtmlTooltipManager.createStartTag("td",i._tooltipValueStyle)+this._getCountString()+"</td></tr></table>"},r.prototype.getDatatipColor=function(){return this.getColor()},r.prototype._getCountString=function(){return t.Bundle.getTranslation(this._picto.getOptions(),"labelCountWithTotal",t.Bundle.UTIL_PREFIX,"COUNT_WITH_TOTAL",[this.getCount(),this._picto.getTotalCount()])},r.prototype.isSelectable=function(){return"none"!=this._picto.getOptions().selectionMode&&!this._isNoneShape},r.prototype.isSelected=function(){return this._isSelected},r.prototype.setSelected=function(t){this._isSelected=t,this._updateAriaLabel();for(var e=0;e<this.getNumChildren();e++){var i=this.getChildAt(e);(i instanceof a||i instanceof n)&&i.setSelected(t)}},r.prototype.showHoverEffect=function(){for(var t=0;t<this.getNumChildren();t++){var e=this.getChildAt(t);(e instanceof a||e instanceof n)&&e.showHoverEffect()}},r.prototype.hideHoverEffect=function(){for(var t=0;t<this.getNumChildren();t++){var e=this.getChildAt(t);(e instanceof a||e instanceof n)&&e.hideHoverEffect()}},r.prototype.getDisplayables=function(){return[this]},r.prototype.getAriaLabel=function(){var e,i=[],o=this._picto.getOptions();this.isSelectable()&&i.push(t.Bundle.getTranslation(o,this.isSelected()?"stateSelected":"stateUnselected",t.Bundle.UTIL_PREFIX,this.isSelected()?"STATE_SELECTED":"STATE_UNSELECTED")),this.isDrillable()&&i.push(t.Bundle.getTranslation(o,"stateDrillable",t.Bundle.UTIL_PREFIX,"STATE_DRILLABLE"));var n=this.getName();return e=null!=this.getShortDesc()?this.getShortDesc():null==n?this._getCountString():t.Bundle.getTranslatedString(t.Bundle.UTIL_PREFIX,"COLON_SEP_LIST",[n,this._getCountString()]),t.Displayable.generateAriaLabel(e,i)},r.prototype._updateAriaLabel=function(){t.Agent.deferAriaCreation()||this.setAriaProperty("label",this.getAriaLabel())},r.prototype.getCategories=function(t){return this._item._itemData?this._item.categories:this._item.categories||[this.getId()]},r.prototype.getNextNavigable=function(e){var i=this._picto.getEventManager().getKeyboardHandler();return e.type==t.MouseEvent.CLICK||i.isMultiSelectEvent(e)?this:i.isNavigationEvent(e)?s.getNextNavigable(this._picto,this,e):null},r.prototype.getKeyboardBoundingBox=function(t){return this.getDimensions(t)},r.prototype.getTargetElem=function(){return this.getElem()},r.prototype.showKeyboardFocusEffect=function(){this._isNoneShape||(this._isShowingKeyboardFocusEffect=!0,this.showHoverEffect())},r.prototype.hideKeyboardFocusEffect=function(){this._isNoneShape||(this._isShowingKeyboardFocusEffect=!1,this.hideHoverEffect())},r.prototype.isShowingKeyboardFocusEffect=function(){return this._isShowingKeyboardFocusEffect},r.prototype.setKeyboardTooltipLocation=function(t){this._keyboardTooltipLocation=t},r.prototype.getKeyboardTooltipLocation=function(){return this._keyboardTooltipLocation};var s=function(t){this.Init(t)};t.Obj.createSubclass(s,t.KeyboardHandler),s.prototype.isSelectionEvent=function(t){return this.isNavigationEvent(t)&&!t.ctrlKey},s.prototype.isMultiSelectEvent=function(e){return e.keyCode==t.KeyboardEvent.SPACE&&e.ctrlKey},s.getNextNavigable=function(e,i,o,n){var r=e.getItems();if(n||(n=i),"none"==i.getShape()&&i!=n){var a=t.ArrayUtils.getIndex(r,i);if(0==a||a==r.length-1)return n}var h=l.isOriginRight(e),c=l.isOriginBottom(e),p=l.isVertical(e),g=i,u=o.keyCode==t.KeyboardEvent.LEFT_ARROW&&h||o.keyCode==t.KeyboardEvent.RIGHT_ARROW&&!h||o.keyCode==t.KeyboardEvent.UP_ARROW&&c||o.keyCode==t.KeyboardEvent.DOWN_ARROW&&!c,d=o.keyCode==t.KeyboardEvent.LEFT_ARROW&&p||o.keyCode==t.KeyboardEvent.RIGHT_ARROW&&p||o.keyCode==t.KeyboardEvent.UP_ARROW&&!p||o.keyCode==t.KeyboardEvent.DOWN_ARROW&&!p,m=t.ArrayUtils.getIndex(r,i)+(u?1:-1);return d?g=t.KeyboardHandler.getNextNavigable(i,o,r):m<r.length&&m>=0&&(g=r[m]),"none"==g.getShape()&&(g=g!=i?s.getNextNavigable(e,g,o,n):n),g},s.prototype.processKeyDown=function(e){var i=this._eventManager.getFocus();return i&&e.keyCode==t.KeyboardEvent.ENTER?(this._eventManager.processDrillEvent(i),t.EventManager.consumeEvent(e),i):s.superclass.processKeyDown.call(this,e)};var a=function(e,i,o,n,r,s,l){a.superclass.Init.call(this,e.getCtx(),"none"==i?null:i,t.CSSStyle.SKIN_ALTA,o,n,r,s,null,!0,!0,l),this._picto=e};t.Obj.createSubclass(a,t.SimpleMarker),a.prototype.animateUpdate=function(e,i){var o=new t.CustomAnimation(this.getCtx(),this,.75*this._picto.getAnimationDuration()),n=o.getAnimator(),r=this.getFill(),s=i.getFill().clone();s.equals(r)||(this.setFill(s),n.addProp(t.Animator.TYPE_FILL,this,this.getFill,this.setFill,r));var a=this._getAnimationParams();this._setAnimationParams(i._getAnimationParams()),n.addProp(t.Animator.TYPE_NUMBER_ARRAY,this,this._getAnimationParams,this._setAnimationParams,a),i.setAlpha(0),e.add(o,1)},a.prototype.animateDelete=function(e){e.add(new t.AnimFadeOut(this.getCtx(),this,.5*this._picto.getAnimationDuration()),0)},a.prototype.animateInsert=function(e){this.setAlpha(0),e.add(new t.AnimFadeIn(this.getCtx(),this,.5*this._picto.getAnimationDuration()),2)},a.prototype._getAnimationParams=function(){return[this.getCx(),this.getCy(),this.getWidth(),this.getHeight()]},a.prototype._setAnimationParams=function(t){this.setCx(t[0]),this.setCy(t[1]),this.setWidth(t[2]),this.setHeight(t[3])};var l={};t.Obj.createSubclass(l,t.Obj),l.render=function(e,i,o,r){var s=e.getCtx(),h=new t.Rect(s,o.x,o.y,o.w,o.h);if(h.setInvisibleFill(),i.addChild(h),r||(r=l.getInfo(e,o.w,o.h)),r.items){e.registerItems(r.items);for(var c=e.getOptions()._gapRatio*r.minSpan,p=l.isVertical(e),g=l.isOriginBottom(e),u=l.isOriginRight(e),d=new t.Map2D,m=0,_=0,y=0,f=0;f<r.items.length;f++){var C=r.items[f],v=C.getColSpan(),S=C.getRowSpan();if(!(v<=0||S<=0)){for(var A,E=v*r.colWidth,b=S*r.rowHeight,O=C.getCount(),T=0,I=!0;O>0&&(v==m&&S==_||(y=0),0==y&&(A=l._findNextAvailableCell(d,v,S,r.colCount,r.rowCount,p)),null!=A);){var P,D,w,x,H,M,R=A.col*r.colWidth+E/2,L=A.row*r.rowHeight+b/2,N=o.x+(u?o.w-R:R),B=o.y+(g?o.h-L:L),k=Math.min(1-y,O);if(p?(P=N-E/2,D=g?B+b*(.5-k-y):B+b*(y-.5),w=E,x=b*k):(P=u?N+E*(.5-k-y):N+E*(y-.5),D=B-b/2,w=E*k,x=b),1==k?(H=C.getId()+"_"+T,T++):H=Math.random(),C.getSource())M=new n(e,N,B,E,b,C.getSource(),C.getSourceSelected(),C.getSourceHover(),C.getSourceHoverSelected(),H+"_I");else{var F=new t.Rect(s,P,D,w,x);F.setInvisibleFill(),C.addChild(F),(M=new a(e,C.getShape(),N,B,E-r.colWidth*c,b-r.rowHeight*c,H+"_S")).setSolidFill(C.getColor()),M.setSolidStroke(C.getBorderColor(),null,C.getBorderWidth()),M.setDataColor(C.getColor()),M.setClassName(C.getClassName()),M.setStyle(C.getStyle())}if(k<1){var W=new t.ClipPath;W.addRect(P,D,w,x),M.setClipPath(W)}I&&(C.setKeyboardTooltipLocation(new t.Point(N,B)),I=!1),C.addChild(M),e.registerMarker(M),O-=k,y=(y+k)%1}i.addChild(C),C.updateAriaAttributes(),m=v,_=S}}}else l.renderEmptyText(e,i,o)},l.getInfo=function(e,i,o){var n=e.getOptions(),s=n.items;if(!s)return{};for(var a=t.ArrayUtils.createBooleanMap(n.hiddenCategories),h=[],c=0,p=1,g=1,u=1/0,d=0;d<s.length;d++)if(null!=s[d]){var m=new r(e,s[d]);if(!a||!t.ArrayUtils.hasAnyMapItem(a,m.getCategories())){var _=m.getColSpan(),y=m.getRowSpan();_<=0||y<=0||(_>p&&(p=_),y>g&&(g=y),_<u&&(u=_),y<u&&(u=y),c+=_*y*m.getCount(),h.push(m))}}if(0==c)return{};var f=n.columnWidth,C=n.rowHeight;i&&o||(f||(f=C||n._defaultSize),C||(C=f));var v=l.isVertical(e),S=n.columnCount,A=n.rowCount;return S||A||(i&&o?v?A=l._ceil(Math.sqrt(c*o/i),g):S=l._ceil(Math.sqrt(c*i/o),p):i?S=Math.max(Math.floor(i/f),1):o?A=Math.max(Math.floor(o/C),1):v?A=l._ceil(Math.sqrt(c),g):S=l._ceil(Math.sqrt(c),p)),S?A||(A=l._ceil(c/S,g)):S=l._ceil(c/A,p),i&&o&&(f||(f=C||Math.min(i/S,o/A)),C||(C=f)),S<=0||A<=0||f<=0||C<=0?{}:{items:h,colCount:S,rowCount:A,colWidth:f,rowHeight:C,minSpan:u}},l._ceil=function(t,e){return Math.ceil(t/e)*e},l._findNextAvailableCell=function(t,e,i,o,n,r){if(r){var s=l._findNextAvailableCell(t,i,e,n,o,!1);return s?{col:s.row,row:s.col}:null}for(var a=0;a<n-i+1;a++)for(var h=0;h<o-e+1;h++)if(l._areCellsAvailable(t,h,a,e,i))return l._occupyCells(t,h,a,e,i),{col:h,row:a};return null},l._areCellsAvailable=function(t,e,i,o,n){for(var r=0;r<n;r++)for(var s=0;s<o;s++)if(t.get(e+s,i+r))return!1;return!0},l._occupyCells=function(t,e,i,o,n){for(var r=0;r<n;r++)for(var s=0;s<o;s++)t.put(e+s,i+r,!0)},l.renderEmptyText=function(e,i,o){var n=e.getOptions(),r=t.Bundle.getTranslation(n,"labelNoData",t.Bundle.UTIL_PREFIX,"NO_DATA"),s=t.TextUtils.renderEmptyText(i,r,o.clone(),e.getEventManager(),n._statusMessageStyle);e.registerEmptyText(s)},l.isVertical=function(t){return"vertical"==t.getOptions().layout},l.isOriginBottom=function(t){var e=t.getOptions().layoutOrigin;return"bottomStart"==e||"bottomEnd"==e},l.isOriginRight=function(e){var i=e.getOptions().layoutOrigin,o="topEnd"==i||"bottomEnd"==i;return t.Agent.isRightToLeft(e.getCtx())?!o:o},t.exportProperty(t,"PictoChart",t.PictoChart),t.exportProperty(t.PictoChart,"newInstance",t.PictoChart.newInstance),t.exportProperty(t.PictoChart.prototype,"destroy",t.PictoChart.prototype.destroy),t.exportProperty(t.PictoChart.prototype,"getAutomation",t.PictoChart.prototype.getAutomation),t.exportProperty(t.PictoChart.prototype,"highlight",t.PictoChart.prototype.highlight),t.exportProperty(t.PictoChart.prototype,"render",t.PictoChart.prototype.render),t.exportProperty(t.PictoChart.prototype,"select",t.PictoChart.prototype.select),t.exportProperty(e.prototype,"getDomElementForSubId",e.prototype.getDomElementForSubId),t.exportProperty(e.prototype,"getItem",e.prototype.getItem),t.exportProperty(e.prototype,"getItemCount",e.prototype.getItemCount)}(dvt);
  return dvt;
});
