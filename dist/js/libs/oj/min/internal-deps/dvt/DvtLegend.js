/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(['./DvtToolkit'], function(dvt) {
  // Internal use only.  All APIs and functionality are subject to change at any time.

!function(e){e.Legend=function(){},e.Obj.createSubclass(e.Legend,e.BaseComponent),e.Legend.newInstance=function(t,n,i){var o=new e.Legend;return o.Init(t,n,i),o},e.Legend.getDefaults=function(e){return(new n).getDefaults(e)},e.Legend.prototype.Init=function(t,o,r){e.Legend.superclass.Init.call(this,t,o,r),this.setId("legend1000"+Math.floor(1e9*Math.random())),this.Defaults=new n,this.EventManager=new i(this),this.EventManager.addListeners(this),this._peers=[],this._navigablePeers=[],this._bounds=null,this._titles=[]},e.Legend.prototype.SetOptions=function(e){this.getOptionsCache().clearCache(),e?(this.Options=this.Defaults.calcOptions(e),this._transferVisibilityProperties(this.Options.sections)):this.Options||(this.Options=this.GetDefaults())},e.Legend.prototype.getPreferredSize=function(t,n,i){this.SetOptions(t),this.getOptions().isLayout=!0;var o=new e.Rectangle(0,0,n,i),r=s.render(this,o);return this.getOptions().isLayout=!1,new e.Dimension(r.w,r.h)},e.Legend.prototype.render=function(t,n,i){this.getCache().clearCache(),this.SetOptions(t),isNaN(n)||isNaN(i)||(this.Width=n,this.Height=i),this.getOptions().isLayout=!1;for(var r=this.getNumChildren(),a=0;a<r;a++){this.getChildAt(a).destroy()}this.removeChildren(),this._peers=[],this._navigablePeers=[],this._bounds=null,this._titles=[],e.Agent.isTouchDevice()||this.EventManager.setKeyboardHandler(new o(this.EventManager,this)),this.UpdateAriaAttributes();var l=new e.Rectangle(0,0,this.Width,this.Height);this._contentDimensions=s.render(this,l);var g=this.getOptions().highlightedCategories;return g&&g.length>0&&this.highlight(g),this.RenderComplete(),this._contentDimensions},e.Legend.prototype.highlight=function(t){this.getOptions().highlightedCategories=t&&t.length>0?t.slice():null,e.CategoryRolloverHandler.highlight(t,this.__getObjects(),!0)},e.Legend.prototype.processEvent=function(t,n){var i=t.type;if("categoryHighlight"==i&&"dim"==this.getOptions().hoverBehavior){var o=this.__getObjects();this!=n&&this.highlight(t.categories);for(var r=0;r<o.length;r++)if(e.Obj.compareValues(this.getCtx(),o[r].getId(),t.categories)){this.container.scrollIntoView(o[r].getDisplayables()[0]);break}}this!=n&&"adfShowPopup"!=i&&"adfHidePopup"!=i||this.dispatchEvent(t)},e.Legend.prototype.__registerObject=function(t){if(t.getDisplayables()[0]instanceof e.Button)this._navigablePeers.push(t);else{var n=this.getOptions().hideAndShowBehavior;(null!=t.getDatatip()||null!=t.getAction()||t.isDrillable()||"none"!=n&&"off"!=n)&&this._navigablePeers.push(t),this._peers.push(t)}},e.Legend.prototype.__getObjects=function(){return this._peers},e.Legend.prototype.__getKeyboardObjects=function(){return this._navigablePeers},e.Legend.prototype.__setBounds=function(e){this._bounds=e.clone()},e.Legend.prototype.__getBounds=function(){return this._bounds},e.Legend.prototype.__registerTitle=function(e){this._titles.push(e)},e.Legend.prototype.__getTitles=function(){return this._titles},e.Legend.prototype.getAutomation=function(){return new t(this)},e.Legend.prototype.getKeyboardFocus=function(){return null!=this.EventManager?this.EventManager.getFocus():null},e.Legend.prototype.setKeyboardFocus=function(t,n){if(null!=this.EventManager){for(var i=this.__getKeyboardObjects(),o=0;o<i.length;o++)if(e.Obj.compareValues(this.getCtx(),i[o].getId(),t.getId())){this.EventManager.setFocusObj(i[o]),n&&i[o].showKeyboardFocusEffect();break}var r=this.getKeyboardFocus();if(r){var s=r.getDisplayables()[0];s.setAriaProperty("label",r.getAriaLabel()),this.getCtx().setActiveElement(s)}}},e.Legend.prototype.getDimensions=function(t){var n=new e.Rectangle(0,0,this.Width,this.Height);return t&&t!==this?this.ConvertCoordSpaceRect(n,t):n},e.Legend.prototype.getContentDimensions=function(e){return e&&e!==this?this.ConvertCoordSpaceRect(this._contentDimensions,e):this._contentDimensions},e.Legend.prototype.GetComponentDescription=function(){return e.Bundle.getTranslatedString(e.Bundle.UTIL_PREFIX,"LEGEND")},e.Legend.prototype._transferVisibilityProperties=function(t){if(t&&!(t.length<=0))for(var n=this.getOptions().hiddenCategories,i=0;i<t.length;i++){var o=t[i];o.sections&&(n=this._transferVisibilityProperties(o.sections));var r=o.items;if(r&&!(r.length<=0))for(var a=0;a<r.length;a++){var l=r[a],g=s.getItemCategory(l,this);"hidden"==l.categoryVisibility&&e.ArrayUtils.getIndex(n,g)<0&&n.push(g),l.categoryVisibility=null}}},e.Legend.prototype.UpdateAriaAttributes=function(){if(this.IsParentRoot()){var t=this.getOptions(),n=t.hideAndShowBehavior;("off"!=n&&"none"!=n||"dim"==t.hoverBehavior)&&(this.getCtx().setAriaRole("application"),this.getCtx().setAriaLabel(e.Bundle.getTranslatedString(e.Bundle.UTIL_PREFIX,"COLON_SEP_LIST",[e.Bundle.getTranslatedString(e.Bundle.UTIL_PREFIX,"DATA_VISUALIZATION"),e.StringUtils.processAriaLabel(this.GetComponentDescription())])))}},e.Legend.prototype.isNavigable=function(){return this._navigablePeers.length>0},e.Legend.getItemCount=function(t){var n=t.getOptionsCache().getFromCache("itemsCount");if(null!=n)return n;n=0;for(var i=t.getOptions().sections,o=0;o<i.length;o++){var r=i[o];n+=e.Legend.getSectionItemsCount(r)}return t.getOptionsCache().putToCache("itemsCount",n),n},e.Legend.getSectionItemsCount=function(t){var n=0;if(t.items&&(n+=t.items.length),t.sections)for(var i=t.sections,o=0;o<i.length;o++)n+=e.Legend.getSectionItemsCount(i[o]);return n};var t=function(e){this._legend=e,this._options=this._legend.getOptions()};e.Obj.createSubclass(t,e.Automation),t.prototype.GetSubIdForDomElement=function(e){var t=this._legend.getEventManager().GetLogicalObject(e);if(t&&t instanceof r){var n=t.getData(),i=this._getIndicesFromItem(n,this._options);if(i)return"section"+i}return null},t.prototype._getIndicesFromItem=function(e,t){if(t.sections&&t.sections.length>0){for(var n=0;n<t.sections.length;n++){if(t.sections[n]==e)return"["+n+"]";var i=this._getIndicesFromItem(e,t.sections[n]);if(i)return"["+n+"]"+i}return null}if(t.items&&t.items.length>0){for(var o=0;o<t.items.length;o++)if(t.items[o]==e)return":item["+o+"]";return null}},t.prototype.getIndicesFromSeries=function(e,t){if(t.sections&&t.sections.length>0){for(var n=0;n<t.sections.length;n++){var i=this.getIndicesFromSeries(e,t.sections[n]);if(i)return"["+n+"]"+i}return null}if(t.items&&t.items.length>0){for(var o=0;o<t.items.length;o++)if(t.items[o].text==e.name)return":item["+o+"]";return null}},t.prototype.getLegendItem=function(e,t){var n=t.indexOf("["),i=t.indexOf("]");if(n>=0&&i>=0){var o=t.substring(n+1,i),r=t.indexOf(":"),s=(t=t.substring(i+1)).indexOf("["),a=t.indexOf("]");return s>=0&&a>=0?this.getLegendItem(e.sections[o],t):0==r?e.items[o]:e.sections[o]}},t.prototype.getDomElementForSubId=function(t){if(t==e.Automation.TOOLTIP_SUBID)return this.GetTooltipElement(this._legend);for(var n=this.getLegendItem(this._options,t),i=this._legend.__getObjects(),o=0;o<i.length;o++){if(n==i[o].getData())return i[o].getDisplayables()[0].getElem()}return null},t.prototype.getTitle=function(){return this._options.title},t.prototype.getItem=function(e){var t,n=e.shift(),i=this._options;if(!i.sections||0===i.sections.length)return null;for(;null!=n;)e.length>0?i=i.sections[n]:t=i.items[n],n=e.shift();return t?{text:t.text?t.text:null}:null},t.prototype.getSection=function(e){var t,n=e.shift(),i=this._options;if(!i.sections||0===i.sections.length)return null;for(;null!=n;)e.length>0?i=i.sections[n]:t=i.sections[n],n=e.shift();return{title:t.title?t.title:null,items:t.items?this._generateItemObjects(t.items):null,sections:t.sections?this._generateSectionObjects(t.sections):null}},t.prototype._generateItemObjects=function(e){for(var t=[],n=0;n<e.length;n++)t.push({text:e[n].text});return t},t.prototype._generateSectionObjects=function(e){for(var t=[],n=0;n<e.length;n++)t.push({title:e[n].title?e[n].title:null,items:e[n].items?this._generateItemObjects(e[n].items):null,sections:e[n].sections?this._generateSectionObjects(e[n].sections):null});return t};var n=function(){this.Init({skyros:n.VERSION_1,alta:n.SKIN_ALTA,next:n.SKIN_NEXT})};e.Obj.createSubclass(n,e.BaseComponentDefaults),n.SKIN_NEXT={skin:e.CSSStyle.SKIN_NEXT,titleStyle:new e.CSSStyle("color: #737373;"),_sectionTitleStyle:new e.CSSStyle("color: #737373;"),layout:{titleGapWidth:17,titleGapHeight:9,symbolGapWidth:7,symbolGapHeight:4,rowGap:4,columnGap:10,sectionGapHeight:16,sectionGapWidth:24}},n.SKIN_ALTA={skin:e.CSSStyle.SKIN_ALTA,textStyle:new e.CSSStyle(e.BaseComponentDefaults.FONT_FAMILY_ALTA),titleStyle:new e.CSSStyle(e.BaseComponentDefaults.FONT_FAMILY_ALTA_11+"color: #333333;"),_sectionTitleStyle:new e.CSSStyle(e.BaseComponentDefaults.FONT_FAMILY_ALTA_11+"color: #333333;")},n.VERSION_1={skin:e.CSSStyle.SKIN_SKYROS,orientation:"vertical",position:null,backgroundColor:null,borderColor:null,textStyle:new e.CSSStyle(e.BaseComponentDefaults.FONT_FAMILY_SKYROS+"font-size: 11px; color: #333333;"),titleStyle:new e.CSSStyle(e.BaseComponentDefaults.FONT_FAMILY_SKYROS+"font-size: 12px; color: #003d5b;"),titleHalign:"start",hiddenCategories:[],hideAndShowBehavior:"off",hoverBehavior:"none",hoverBehaviorDelay:200,scrolling:"asNeeded",halign:"start",valign:"top",drilling:"off",dnd:{drag:{series:{}},drop:{legend:{}}},_color:"#a6acb1",_markerShape:"square",_lineWidth:3,layout:{outerGapWidth:3,outerGapHeight:3,titleGapWidth:8,titleGapHeight:3,symbolGapWidth:5,symbolGapHeight:4,rowGap:0,columnGap:8,sectionGapHeight:6,sectionGapWidth:15},isLayout:!1},n.getGapSize=function(t,n){var i=Math.min(e.TextUtils.getTextStringHeight(t.getCtx(),t.getOptions().textStyle)/14,1);return Math.ceil(n*i)},n.prototype.getNoCloneObject=function(e){return{sections:{items:{_dataContext:!0}}}};var i=function(e){this.Init(e.getCtx(),e.processEvent,e),this._legend=e};e.Obj.createSubclass(i,e.EventManager),i.prototype.OnClick=function(e){i.superclass.OnClick.call(this,e);var t=this.GetLogicalObject(e.target);if(t){var n=this.processHideShowEvent(t),o=this.handleClick(t,e);(n||o)&&e.stopPropagation()}},i.prototype.OnMouseOver=function(t){i.superclass.OnMouseOver.call(this,t);var n=this.GetLogicalObject(t.target);if(n){var o=n instanceof e.SimpleObjPeer?n.getParams():null;if(o&&o.isCollapsible&&o.button)o.button.drawOverState();this.UpdateActiveElement(n)}},i.prototype.OnMouseOut=function(t){i.superclass.OnMouseOut.call(this,t);var n=this.GetLogicalObject(t.target);if(n){var o=n instanceof e.SimpleObjPeer?n.getParams():null;if(o&&o.isCollapsible&&o.button)o.button.drawUpState()}},i.prototype.HandleTouchClickInternal=function(e){var t=this.GetLogicalObject(e.target);if(t){var n=e.touchEvent,i=this.processHideShowEvent(t),o=this.handleClick(t,e);(i||o)&&n&&n.preventDefault()}},i.prototype.processHideShowEvent=function(t){var n=this._legend.getOptions().hideAndShowBehavior;if("none"==n||"off"==n)return!1;var i=t.getCategories?t.getCategories():null;if(!i||i.length<=0)return!1;var o=t.getCategories()[0],r=this._legend.getOptions().hiddenCategories||[];r=r.slice();for(var a=t.getDisplayables(),l=0;l<a.length;l++){var g=a[l];g instanceof e.SimpleMarker?g.setHollow(t.getColor()):g instanceof e.Rect&&t.updateAriaLabel()}var h,p=i[0];return s.isCategoryHidden(o,this._legend)?(r.splice(e.ArrayUtils.getIndex(r,o),1),h=e.EventFactory.newCategoryShowEvent(p,r)):(r.push(o),h=e.EventFactory.newCategoryHideEvent(p,r)),this._legend.getOptions().hiddenCategories=r,this.FireEvent(h,this._legend),!0},i.prototype.handleClick=function(t,n){if(t&&t.getAction&&t.getAction())return this.FireEvent(e.EventFactory.newActionEvent("action",t.getAction(),t.getId()),this._legend),!0;if(t instanceof r&&t.isDrillable()){var i=t.getId();return this.FireEvent(e.EventFactory.newChartDrillEvent(i,i,null),this._legend),!0}var o=t instanceof e.SimpleObjPeer?t.getParams():null;return!(!o||!o.isCollapsible)&&(this.toggleSectionCollapse(n,o.id),!0)},i.prototype.ProcessRolloverEvent=function(t,n,i){var o=this._legend.getOptions();if(!("none"==o.hoverBehavior||n.getDisplayables&&n.getDisplayables()[0]instanceof e.Button)){var r=n.getCategories?n.getCategories():[];o.highlightedCategories=i?r.slice():null;var s=e.EventFactory.newCategoryHighlightEvent(o.highlightedCategories,i),a=e.StyleUtils.getTimeMilliseconds(o.hoverBehaviorDelay);this.RolloverHandler.processEvent(s,this._legend.__getObjects(),a,!0)}},i.prototype.onCollapseButtonClick=function(e,t){var n=t.getId();this.toggleSectionCollapse(e,n)},i.prototype.toggleSectionCollapse=function(t,n){for(var i=this._legend.getOptions(),o=i.expanded,r=this._legend.getOptions(),s=null,a=0;a<n.length;a++)r=r.sections[n[a]];if(o?o.has(r.id)?(i.expanded=o.delete([r.id]),s=!1):(i.expanded=o.add([r.id]),s=!0):r.expanded="off"==r.expanded?"on":"off",t.type==e.MouseEvent.CLICK){var l=this.GetLogicalObject(this.GetCurrentTargetForEvent(t));l.getNextNavigable&&this.setFocusObj(l.getNextNavigable(t))}var g=this._legend.getKeyboardFocus(),h=!!g&&g.isShowingKeyboardFocusEffect();this._legend.render(),g&&this._legend.setKeyboardFocus(g,h),this.hideTooltip();var p=this._legend.getContentDimensions();if(this.FireEvent(new e.ResizeEvent(p.w,p.h,p.x,p.y),this._legend),null!=s){t=new e.EventFactory.newExpandCollapseEvent(s?"expand":"collapse",r.id,r,this._legend.getOptions()._widgetConstructor,i.expanded);this.FireEvent(t,this._legend)}},i.prototype.GetTouchResponse=function(){return this._legend.getOptions()._isScrollingLegend?e.EventManager.TOUCH_RESPONSE_TOUCH_HOLD:e.EventManager.TOUCH_RESPONSE_TOUCH_START},i.prototype.getComponent=function(){return this._legend},i.prototype.isDndSupported=function(){return!0},i.prototype.GetDragSourceType=function(e){var t=this.DragSource.getDragObject();return t instanceof r&&null!=t.getData()._dataContext?"series":null},i.prototype.GetDragDataContexts=function(){var e=this.DragSource.getDragObject();return e instanceof r?[e.getData()._dataContext]:[]},i.prototype.GetDropTargetType=function(e){var t=this._legend.stageToLocal(this.getCtx().pageToStageCoords(e.pageX,e.pageY)),n=this._legend.getOptions().dnd.drop,i=this._legend.__getBounds();return Object.keys(n.legend).length>0&&i.containsPoint(t.x,t.y)?"legend":null},i.prototype.GetDropEventPayload=function(e){return{}},i.prototype.ShowDropEffect=function(e){if("legend"==this.GetDropTargetType(e)){var t=this._legend.getOptions()._dropColor,n=this._legend.getCache().getFromCache("background");n&&(n.setSolidFill(t),n.setClassName("oj-active-drop"))}},i.prototype.ClearDropEffect=function(){var t=this._legend.getCache().getFromCache("background");if(t){var n=this._legend.getOptions().backgroundColor;n?t.setSolidFill(n):t.setInvisibleFill(),e.ToolkitUtils.removeClassName(t.getElem(),"oj-invalid-drop"),e.ToolkitUtils.removeClassName(t.getElem(),"oj-active-drop")}},i.prototype.ShowRejectedDropEffect=function(e){if("legend"==this.GetDropTargetType(e)){var t=this._legend.getCache().getFromCache("background");t&&t.setClassName("oj-invalid-drop")}};var o=function(e,t){this.Init(e,t)};e.Obj.createSubclass(o,e.KeyboardHandler),o.prototype.Init=function(e,t){o.superclass.Init.call(this,e),this._legend=t},o.prototype.processKeyDown=function(t){var n=t.keyCode,i=this._eventManager.getFocus(),r=i&&i.getDisplayables()[0]instanceof e.Button,s=null;if(null==i&&n==e.KeyboardEvent.TAB){var a=this._legend.__getKeyboardObjects();a.length>0&&(e.EventManager.consumeEvent(t),s=this.getDefaultNavigable(a))}else i&&(n==e.KeyboardEvent.TAB?(e.EventManager.consumeEvent(t),s=i):n==e.KeyboardEvent.ENTER||n==e.KeyboardEvent.SPACE?(n==e.KeyboardEvent.ENTER&&this._eventManager.handleClick(i,t),r?this._eventManager.onCollapseButtonClick(t,i.getDisplayables()[0]):this._eventManager.processHideShowEvent(i),e.EventManager.consumeEvent(t)):!r||n!=e.KeyboardEvent.LEFT_ARROW&&n!=e.KeyboardEvent.RIGHT_ARROW?s=o.superclass.processKeyDown.call(this,t):(this._eventManager.onCollapseButtonClick(t,i.getDisplayables()[0]),e.EventManager.consumeEvent(t)));return s&&this._legend.container.scrollIntoView(s.getDisplayables()[0]),s};var r=function(e,t,n,i,o,r){this.Init(e,t,n,i,o,r)};e.Obj.createSubclass(r,e.Obj),r.prototype.Init=function(t,n,i,o,r,a){if(this._legend=t,this._displayables=n,this._item=i,this._category=s.getItemCategory(this._item,this._legend),this._id=this._category?this._category:i.title,this._action=i.action,this._drillable=a,this._spb=i._spb,this._tooltip=o,this._datatip=r,this._isShowingKeyboardFocusEffect=!1,this._action||this._drillable)for(var l=0;l<this._displayables.length;l++)this._displayables[l].setCursor(e.SelectionEffectUtils.getSelectingCursor())},r.associate=function(e,t,n,i,o,s){if(!e||!n)return null;var a=new r(t,e,n,i,o,s);t.__registerObject(a);for(var l=0;l<e.length;l++)t.getEventManager().associate(e[l],a);return a},r.prototype.getData=function(){return this._item},r.prototype.getColor=function(){return this._item.color},r.prototype.getId=function(){return this._id},r.prototype.getDisplayables=function(){return this._displayables},r.prototype.getCategories=function(e){return null!=this._category?[this._category]:null},r.prototype.getAction=function(){return this._action},r.prototype.isDrillable=function(){return this._drillable},r.prototype.getShowPopupBehaviors=function(){return this._spb},r.prototype.getAriaLabel=function(){var t=[],n=this._legend.getOptions(),i=this._legend.getOptions().hideAndShowBehavior,o=s.isCategoryHidden(this._category,this._legend),r=this.getData();return this._displayables[0]instanceof e.Button?(t.push(e.Bundle.getTranslatedString(e.Bundle.UTIL_PREFIX,s.isSectionCollapsed(r,this._legend)?"STATE_COLLAPSED":"STATE_EXPANDED")),e.Displayable.generateAriaLabel(r.title,t)):("off"!=i&&"none"!=i&&t.push(e.Bundle.getTranslatedString(e.Bundle.UTIL_PREFIX,o?"STATE_HIDDEN":"STATE_VISIBLE")),this.isDrillable()&&t.push(e.Bundle.getTranslation(n,"stateDrillable",e.Bundle.UTIL_PREFIX,"STATE_DRILLABLE")),null!=r.shortDesc?e.Displayable.generateAriaLabel(r.shortDesc,t):t.length>0?e.Displayable.generateAriaLabel(r.text,t):null)},r.prototype.updateAriaLabel=function(){!e.Agent.deferAriaCreation()&&this._displayables[0]&&this._displayables[0].setAriaProperty("label",this.getAriaLabel())},r.prototype.getNextNavigable=function(t){if(t.type==e.MouseEvent.CLICK)return this;var n=this._legend.__getKeyboardObjects();return e.KeyboardHandler.getNextNavigable(this,t,n,!0)},r.prototype.getKeyboardBoundingBox=function(t){return this._displayables[0]?this._displayables[0].getDimensions(t):new e.Rectangle(0,0,0,0)},r.prototype.getTargetElem=function(){return this._displayables[0]?this._displayables[0].getElem():null},r.prototype.showKeyboardFocusEffect=function(){this._isShowingKeyboardFocusEffect=!0,this._displayables[0]&&(this._displayables[0]instanceof e.Button?this._displayables[0].drawOverState():this._displayables[0].setSolidStroke(e.Agent.getFocusColor()))},r.prototype.hideKeyboardFocusEffect=function(){this._isShowingKeyboardFocusEffect=!1,this._displayables[0]&&(this._displayables[0]instanceof e.Button?this._displayables[0].drawUpState():this._displayables[0].setStroke(null))},r.prototype.isShowingKeyboardFocusEffect=function(){return this._isShowingKeyboardFocusEffect},r.prototype.getTooltip=function(e){return this._tooltip},r.prototype.getDatatip=function(e){return this._datatip},r.prototype.getDatatipColor=function(e){return this._item.color},r.prototype.isDragAvailable=function(e){return!0},r.prototype.getDragTransferable=function(e,t){return[this.getId()]},r.prototype.getDragFeedback=function(e,t){return this.getDisplayables()};var s=new Object;e.Obj.createSubclass(s,e.Obj),s._DEFAULT_LINE_WIDTH_WITH_MARKER=2,s._LINE_MARKER_SIZE_FACTOR=.6,s._DEFAULT_SYMBOL_SIZE=10,s._BUTTON_SIZE=12,s._FOCUS_GAP=2,s.render=function(t,i){var o=t.getOptions(),r=t.getCtx(),a=e.Agent.isRightToLeft(r);t.__setBounds(i),o.isLayout||s._renderBackground(t,i);var l=new e.SimpleScrollableContainer(r,i.w,i.h),g=new e.Container(r);l.getScrollingPane().addChild(g),t.addChild(l),t.container=l;var h=n.getGapSize(t,o.layout.outerGapWidth),p=n.getGapSize(t,o.layout.outerGapHeight);if(i.x+=h,i.y+=p,i.w-=2*h,i.h-=2*p,i.w<=0||i.h<=0)return new e.Dimension(0,0);var c=s._renderContents(t,g,new e.Rectangle(i.x,i.y,i.w,i.h));if(0==c.w||0==c.h)return new e.Dimension(0,0);l.prepareContentPane(),c.h>i.h?(c.h=i.h,o._isScrollingLegend=!0):o._isScrollingLegend=!1;var u=0,d=0,y=null!=o.hAlign?o.hAlign:o.halign;"center"==y?u=i.x-c.x+(i.w-c.w)/2:"end"==y&&(u=a?i.x-c.x:i.x-c.x+i.w-c.w);var _=null!=o.vAlign?o.vAlign:o.valign;"middle"==_?d=i.y-c.y+(i.h-c.h)/2:"bottom"==_&&(d=i.y-c.y+i.h-c.h);var f=new e.Rectangle(c.x+u-h,c.y+d-p,c.w+2*h,c.h+2*p);if(o.isLayout)return f;(u||d)&&g.setTranslate(u,d);for(var v=t.__getTitles(),S=0;S<v.length;S++)e.LayoutUtils.align(c,v[S].halign,v[S].text,v[S].text.getDimensions().w);return f},s._renderContents=function(e,t,i){var o=e.getOptions();i=i.clone();var r=s._renderTitle(e,t,o.title,i,null,!0);if(r){var a=r.getDimensions(),l=n.getGapSize(e,o.layout.titleGapHeight);i.y+=a.h+l,i.h-=Math.floor(a.h+l)}var g=s._renderSections(e,t,o.sections,i,[]);return r?a.getUnion(g):g},s._renderBackground=function(t,n){var i=t.getOptions(),o=i.backgroundColor,r=i.borderColor,s=i.dnd?i.dnd.drop.legend:{},a=i.dnd?i.dnd.drag.series:{};if(o||r||Object.keys(s).length>0||Object.keys(a).length>0){var l=new e.Rect(t.getCtx(),n.x,n.y,n.w,n.h);o?l.setSolidFill(o):l.setInvisibleFill(),r&&(l.setSolidStroke(r),l.setPixelHinting(!0)),t.addChild(l),t.getCache().putToCache("background",l)}},s._renderTitle=function(t,n,i,o,r,s,a,l){var g=t.getOptions(),h=n.getCtx(),p=e.Agent.isRightToLeft(h);if(!i)return null;var c=new e.OutputText(h,i,o.x,o.y),u=g.titleStyle;if(r&&r.titleStyle?u=new e.CSSStyle(r.titleStyle):r&&g._sectionTitleStyle&&(u=g._sectionTitleStyle),c.setCSSStyle(u),e.TextUtils.fitText(c,o.w,1/0,n)){if(p&&c.setX(o.x+o.w-c.getDimensions().w),g.isLayout)n.removeChild(c);else{var d={id:a,button:l};if(d.isCollapsible=r&&("on"==r.collapsible||1==r.collapsible),t.getEventManager().associate(c,new e.SimpleObjPeer(c.getUntruncatedTextString(),null,null,d)),s){var y=r&&r.titleHalign?r.titleHalign:g.titleHalign;t.__registerTitle({text:c,halign:y})}}return c}return null},s._renderSections=function(t,i,o,r,a){if(!o||0==o.length)return new e.Rectangle(0,0,0,0);var l=t.getOptions();l.symbolWidth||l.symbolHeight?(l.symbolWidth?l.symbolHeight||(l.symbolHeight=l.symbolWidth):l.symbolWidth=l.symbolHeight,l.symbolWidth=parseInt(l.symbolWidth),l.symbolHeight=parseInt(l.symbolHeight)):(l.symbolWidth=s._DEFAULT_SYMBOL_SIZE,l.symbolHeight=s._DEFAULT_SYMBOL_SIZE);for(var g,h=n.getGapSize(t,l.layout.sectionGapHeight),p=n.getGapSize(t,l.layout.titleGapHeight),c=n.getGapSize(t,l.layout.sectionGapWidth),u=s._getRowHeight(t),d="vertical"!=l.orientation,y=null,_=r.clone(),f=0;f<o.length;f++){var v=a.concat([f]),S=s.isSectionCollapsed(o[f],t)?p:h;d?(g=s._renderHorizontalSection(t,i,o[f],_,u)).w>_.w?(_.w<r.w&&(r.y+=g.h+S,r.h-=g.h+S),g=g.w<=r.w?s._renderHorizontalSection(t,i,o[f],r,u):s._renderVerticalSection(t,i,o[f],r,u,v,!0),r.y+=g.h+S,r.h-=g.h+S,_=r.clone()):(_.w-=g.w+c,e.Agent.isRightToLeft(t.getCtx())||(_.x+=g.w+c)):(g=s._renderVerticalSection(t,i,o[f],r,u,v,!1),r.y+=g.h+S,r.h-=g.h+S),y=y?y.getUnion(g):g}return y},s._createButton=function(t,n,i,o,a,l,g,h,p,c,u){var d=s._createButtonImage(t,o,a+"Enabled",l,g),y=s._createButtonImage(t,o,a+"Over",l,g),_=s._createButtonImage(t,o,a+"Down",l,g),f=new e.Button(t,d,y,_,null,p,c,u),v=r.associate([f],n,i,h,null,!1);return f.setAriaRole("button"),v.updateAriaLabel(),f},s._createButtonImage=function(t,n,i,o,r){var a=e.Agent.isRightToLeft(t)?"RTL":"",l=n[i+a]?n[i+a]:n[i],g=new e.Image(t,l,o,r,s._BUTTON_SIZE,s._BUTTON_SIZE);return g.setInvisibleFill(),g},s._renderVerticalSection=function(t,i,o,r,a,l,g){if(o){var h,p=t.getOptions(),c=n.getGapSize(t,p.layout.symbolGapWidth),u=n.getGapSize(t,p.layout.rowGap),d=n.getGapSize(t,p.layout.columnGap),y=t.getCtx(),_=e.Agent.isRightToLeft(y),f=null!=o.sections&&o.sections.length>0,v=null!=o.items&&o.items.length>0,S=r.clone();"off"!=p.scrolling&&(S.h=1/0);var b,m="on"==o.collapsible||1==o.collapsible;if(m){var C=_?S.x+S.w-s._BUTTON_SIZE:S.x;if(!p.isLayout){var O=s.isSectionCollapsed(o,t),x=O?"closed":"open",T=e.Bundle.getTranslatedString(e.Bundle.UTIL_PREFIX,O?"EXPAND":"COLLAPSE",null),E=t.getEventManager();b=s._createButton(y,t,o,p._resources,x,C,S.y,T,l,E.onCollapseButtonClick,E),i.addChild(b)}h=new e.Rectangle(C,S.y,s._BUTTON_SIZE,s._BUTTON_SIZE);var w=n.getGapSize(t,p.layout.symbolGapWidth);_||(S.x+=s._BUTTON_SIZE+w),S.w-=s._BUTTON_SIZE+w}var L=s._renderTitle(t,i,o.title,S,o,!m&&l.length<=1,l,b),I=L?L.getDimensions():new e.Rectangle(_?S.x+S.w:S.x,S.y,0,0),A=h?I.getUnion(h):I;if(!v&&!f||s.isSectionCollapsed(o,t))return A;if(A.h>0){var D=n.getGapSize(t,p.layout.titleGapHeight);S.y+=A.h+D,S.h-=A.h+D}if(f){var F=s._renderSections(t,i,o.sections,S,l);A=A.getUnion(F)}if(!v)return A;var M=s._calcColumns(t,S,a,o.items,g),G=M.numCols,B=M.numRows,P=M.width,R=S.y;if(0==B||0==G)return A;var N=B*(a+u)-u,k=Math.min(G*(P+d)-d,S.w),H=new e.Rectangle(_?S.x+S.w-k:S.x,S.y,k,N);if(A=A.getUnion(H),p.isLayout)return A;for(var U=P-p.symbolWidth-c,j=0,K=1,W=o.items.length,z=0;z<W;z++){var V=o.items[z];if(s._createLegendItem(t,i,V,S,U,a,z),S.y+=a+u,++j===B&&K!==G&&(S.y=R,S.w-=P+d,_||(S.x+=P+d),j=0,K++),j===B)break}return A}},s._renderHorizontalSection=function(t,i,o,r,a){if(o){var l=t.getOptions(),g=l.symbolWidth,h=n.getGapSize(t,l.layout.symbolGapWidth),p=n.getGapSize(t,l.layout.columnGap),c=n.getGapSize(t,l.layout.titleGapWidth),u=null!=o.items&&o.items.length>0,d=e.Agent.isRightToLeft(t.getCtx()),y=r.clone(),_=s._renderTitle(t,i,o.title,r,o,!1),f=_?_.getDimensions():new e.Rectangle(d?r.x+r.w:r.x,r.y,0,0);if(!u)return f;f.w>0&&(y.w-=f.w+c,d||(y.x+=f.w+c));var v,S,b,m=[],C=r.w-y.w,O=o.items.length;for(b=0;b<O;b++)v=o.items[b],C+=(S=Math.ceil(e.TextUtils.getTextStringWidth(t.getCtx(),v.text,l.textStyle)))+g+h+p,m.push(S);O>0&&(C-=p);var x,T=new e.Rectangle(d?r.x+r.w-C:r.x,r.y,C,Math.max(a,f.h));if(l.isLayout||C>r.w)return i.removeChild(_),T;for(b=0;b<O;b++)v=o.items[b],s._createLegendItem(t,i,v,y,m[b],a,b),x=m[b]+g+h,y.w-=x+p,d||(y.x+=x+p);return T}},s._calcColumns=function(t,i,o,r,s){for(var a=t.getOptions(),l=[],g=0;g<r.length;g++)l.push(r[g].text);var h,p,c,u=e.TextUtils.getMaxTextStringWidth(t.getCtx(),l,a.textStyle),d=a.symbolWidth,y=n.getGapSize(t,a.layout.symbolGapWidth),_=n.getGapSize(t,a.layout.rowGap),f=n.getGapSize(t,a.layout.columnGap),v=Math.ceil(d+y+u);s?(c=Math.min(Math.max(Math.floor((i.w+f)/(v+f)),1),r.length),h=Math.min(Math.floor((i.h+_)/(o+_)),Math.ceil(r.length/c)),c=Math.ceil(r.length/h),h=Math.ceil(r.length/c)):i.h==1/0?(c=1,h=r.length):(h=Math.min(Math.floor((i.h+_)/(o+_)),r.length),c=Math.ceil(r.length/h),h=Math.ceil(r.length/c));var S=(i.w-f*(c-1))/c;return(p=Math.min(v,S))<d?{width:0,numCols:0,numRows:0}:{width:p,numCols:c,numRows:h}},s._getRowHeight=function(t){var i=t.getOptions(),o=e.TextUtils.getTextStringHeight(t.getCtx(),i.textStyle),r=i.symbolHeight+n.getGapSize(t,i.layout.symbolGapHeight);return Math.ceil(Math.max(o,r))},s._createLegendItem=function(t,i,o,a,l,g,h){var p,c=t.getOptions(),u=t.getCtx(),d=e.Agent.isRightToLeft(u),y=c.symbolWidth,_=n.getGapSize(t,c.layout.symbolGapWidth),f=d?a.x+a.w-y:a.x,v=d?a.x+a.w-y-_:a.x+y+_,S=s._createLegendSymbol(t,f,a.y,g,o,h),b=o.text;if(null!=b){var m=c.textStyle;(p=s._createLegendText(i,l,b,m))&&(p.setX(v),e.TextUtils.centerTextVertically(p,a.y+g/2),d&&p.alignRight())}i.addChild(S);var C=new e.Rect(u,d?v-l-s._FOCUS_GAP:f-s._FOCUS_GAP,a.y-s._FOCUS_GAP,y+_+l+2*s._FOCUS_GAP,g+2*s._FOCUS_GAP);C.setInvisibleFill();var O=c.hideAndShowBehavior;"none"!=O&&"off"!=O&&C.setCursor("pointer"),i.addChild(C);var x=[C,S];null!=p&&x.push(p);var T=r.associate(x,t,o,null!=p?p.getUntruncatedTextString():null,o.shortDesc,s._isItemDrillable(t,o));s.isCategoryHidden(s.getItemCategory(o,t),t)&&(S.setHollow(T.getColor()),S.setStyle().setClassName()),("none"!=O&&"off"!=O||null!=o.shortDesc)&&(C.setAriaRole("img"),T.updateAriaLabel())},s._isItemDrillable=function(e,t){return"on"==t.drilling||"off"!=t.drilling&&"on"==e.getOptions().drilling},s._createLegendText=function(t,n,i,o){var r=new e.OutputText(t.getCtx(),i);return r.setCSSStyle(o),r=e.TextUtils.fitText(r,n,1/0,t)?r:null},s._createLegendSymbol=function(t,n,i,o,r,a){var l=t.getOptions(),g=t.getCtx(),h=null!=r.type?r.type:r.symbolType;r.markerShape||(r.markerShape=l._markerShape),r.color||(r.color=l._color),r.lineWidth||(r.lineWidth="lineWithMarker"==h?s._DEFAULT_LINE_WIDTH_WITH_MARKER:l._lineWidth);var p,c=l.symbolWidth,u=l.symbolHeight,d=i+o/2,y=n+c/2;if("line"==h)p=s._createLine(g,n,i,c,o,r);else if("lineWithMarker"==h)p=s._createLine(g,n,i,c,o,r),s.isCategoryHidden(s.getItemCategory(r,t),t)||p.addChild(s._createMarker(t,y,d,c*s._LINE_MARKER_SIZE_FACTOR,u*s._LINE_MARKER_SIZE_FACTOR,r));else if("image"==h)p=s._createImage(t,n,i,c,u,o,r);else if("_verticalBoxPlot"==h)u=Math.max(4*Math.round(u/4),4),(p=new e.Container(g)).addChild(s._createMarker(t,y,d+u/4,c,u/2,s._getBoxPlotOptions(r,"q2"))),p.addChild(s._createMarker(t,y,d-u/4,c,u/2,s._getBoxPlotOptions(r,"q3")));else if("_horizontalBoxPlot"==h){var _=e.Agent.isRightToLeft(g),f=(c=Math.max(4*Math.round(c/4),4))/4*(_?1:-1);(p=new e.Container(g)).addChild(s._createMarker(t,y+f,d,c/2,u,s._getBoxPlotOptions(r,"q2"))),p.addChild(s._createMarker(t,y-f,d,c/2,u,s._getBoxPlotOptions(r,"q3")))}else p=s._createMarker(t,y,d,c,u,r);return p},s._createImage=function(t,n,i,o,r,s,a){var l=t.getCtx(),g=i+s/2,h=n+o/2;return new e.ImageMarker(l,h,g,o,r,null,a.source)},s._createMarker=function(t,n,i,o,r,s){var a,l=t.getCtx(),g=t.getOptions(),h=s.markerShape,p=s.markerColor?s.markerColor:s.color,c=s.markerStyle||s.markerSvgStyle?s.markerStyle||s.markerSvgStyle:s.style||s.svgStyle,u=s.markerClassName||s.markerSvgClassName?s.markerClassName||s.markerSvgClassName:s.className||s.svgClassName,d=s.pattern;if(d&&"none"!=d?((a=new e.SimpleMarker(l,h,g.skin,0,0,o,r,null,null,!0)).setFill(new e.PatternFill(d,p,"#FFFFFF")),a.setTranslate(n,i)):(a=new e.SimpleMarker(l,h,g.skin,n,i,o,r,null,null,!0)).setSolidFill(p),s.borderColor){var y=s._borderWidth?s._borderWidth:1;a.setSolidStroke(s.borderColor,null,y)}return"square"!=h&&"rectangle"!=h||a.setPixelHinting(!0),a.setClassName(u).setStyle(c),a},s._createLine=function(t,n,i,o,r,s){var a=i+r/2,l=new e.Line(t,n,a,n+o,a),g=new e.SolidStroke(s.color,1,s.lineWidth),h=s.lineStyle;return"dashed"==h?g.setType(e.Stroke.convertTypeString(h),"4,2,4"):"dotted"==h&&g.setType(e.Stroke.convertTypeString(h),"2"),l.setClassName(s.className||s.svgClassName).setStyle(s.style||s.svgStyle),l.setStroke(g),l.setPixelHinting(!0),l},s._getBoxPlotOptions=function(e,t){return{markerShape:"rectangle",color:e._boxPlot[t+"Color"],pattern:e._boxPlot["_"+t+"Pattern"],className:e._boxPlot[t+"ClassName"]||e._boxPlot[t+"svgClassName"],style:e._boxPlot[t+"Style"]||e._boxPlot[t+"svgStyle"]}},s.getItemCategory=function(e,t){var n=null,i=null!=t.getOptions().data;return e.categories&&e.categories.length>0?n=e.categories[0]:i||(n=e.id?e.id:e.text),n},s.isCategoryHidden=function(t,n){var i=n.getOptions().hiddenCategories;return!(!i||i.length<=0)&&-1!==e.ArrayUtils.getIndex(i,t)},s.isSectionCollapsed=function(e,t){var n=t.getOptions();return"off"==e.expanded||0==e.expanded||n.expanded&&0==n.expanded.has(e.id)},e.exportProperty(e,"Legend",e.Legend),e.exportProperty(e.Legend,"newInstance",e.Legend.newInstance),e.exportProperty(e.Legend.prototype,"destroy",e.Legend.prototype.destroy),e.exportProperty(e.Legend.prototype,"getAutomation",e.Legend.prototype.getAutomation),e.exportProperty(e.Legend.prototype,"getPreferredSize",e.Legend.prototype.getPreferredSize),e.exportProperty(e.Legend.prototype,"highlight",e.Legend.prototype.highlight),e.exportProperty(e.Legend.prototype,"render",e.Legend.prototype.render),e.exportProperty(t.prototype,"getDomElementForSubId",t.prototype.getDomElementForSubId),e.exportProperty(t.prototype,"getItem",t.prototype.getItem),e.exportProperty(t.prototype,"getSection",t.prototype.getSection),e.exportProperty(t.prototype,"getTitle",t.prototype.getTitle)}(dvt);
  return dvt;
});
