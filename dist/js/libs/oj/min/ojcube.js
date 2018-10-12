/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","promise","ojs/ojdatasource-common"],function(e,t){e.Cube=function(e,t){this.Init(),this._rows=e,this._layout=t,this.BuildCube()},e.Object.createSubclass(e.Cube,e.Object,"oj.Cube"),e.Cube.prototype.Init=function(){e.Cube.superclass.Init.call(this)},e.Cube.prototype.getAxes=function(){var e=this._getPinnedCube(),t=[];Array.prototype.push.apply(t,e?e.getAxes():this._axes);for(var a=2;a<this._axes.length;a++)t.push(this._axes[a]);return t},e.Cube.prototype.getValues=function(e){for(var t=this._getPinnedCube(),a=t._normalizeIndices(e),u=t._walkIndex(a,0,[],[]),r=u;Array.isArray(r)&&1===r.length;)if(r=r[0],!Array.isArray(r))return r;return u},e.Cube.prototype.setPage=function(e){e instanceof Array?this._pin=e:this._pin=[e]},e.Cube.prototype.pivot=function(t,a,u,r,i){var s=this._layout,n=this._findAxisInLayout(t);if(!n)return!1;var o=null;u<s.length?o=this._findAxisInLayout(u):(o={axis:u,levels:[]},s.push(o));var l=n.levels,h=o.levels,c=a<l.length?l[a]:null;return!!c&&(r>=h.length?(h.push(c),l.splice(a,1)):i===e.Cube.PivotType.SWAP?(l[a]=h[r],h[r]=c):(i===e.Cube.PivotType.AFTER&&(r+=1),h.splice(r,0,c),h===l&&r<a&&(a+=1),l.splice(a,1)),this.BuildCube(),!0)},e.Cube.prototype._findAxisInLayout=function(e){for(var t=0;t<this._layout.length;t++)if(this._layout[t].axis===e)return this._layout[t];return null},e.Cube.prototype.getLayout=function(){return this._layout},e.Cube.PivotType={BEFORE:"before",AFTER:"after",SWAP:"swap"},e.Cube.prototype._walkIndex=function(e,t,a,u){if(0===e.length){var r=a.slice(0);return this._getValue(r)}var i=e.slice(1),s=e[0].start,n=e[0].count;for(a[t]=s;a[t]<s+n;a[t]++)u.push(this._walkIndex(i,t+1,a,[]));return u},e.Cube.prototype._normalizeIndices=function(e){var t=[];if(!e)return t;for(var a=Math.min(e.length,this._axes.length),u=0;u<a;u++){var r=e[u],i=Object.prototype.hasOwnProperty;r instanceof Object&&(i.call(r,"start")||i.call(r,"count"))?i.call(r,"start")?i.call(r,"count")?t.push(this._generateIndex(r.start,r.count,u)):t.push(this._generateIndex(r.start,1,u)):t.push(this._generateIndex(0,r.count,u)):t.push(this._generateIndex(r,1,u))}return t},e.Cube.prototype._generateIndex=function(e,t,a){var u=this.getAxes()[a].getExtent();return(e>=u||e<0)&&(e=0),{start:e,index:e,count:t=Math.min(t,u-e)}},e.Cube.prototype._getValue=function(t){var a=this._createCubeKeys(t);if(a){var u=a.GetHashCodes();if(u.length>0){var r=this._data[u[0].key];if(r)return new e.CubeDataValue(r.value,t,r.aggType,r.rows,r.square)}}return new e.CubeDataValue(null,t,void 0,[])},e.Cube.prototype.GenerateAxes=function(){var e,t=this._getPageLayout();for(this._pin=[],e=0;e<t.length;e++)this._getAxis(t[e].axis,t[e].levels),this._pin.push({axis:t[e].axis,index:0});if(0===t.length){var a=this._getNonPageLayout();for(e=0;e<a.length;e++)this._getAxis(a[e].axis,a[e].levels)}},e.Cube.prototype._getPageLayout=function(){for(var e=[],t=0;t<this._layout.length;t++){this._layout[t].axis>1&&e.push(this._layout[t])}return e},e.Cube.prototype._getNonPageLayout=function(){for(var e=[],t=0;t<this._layout.length;t++){this._layout[t].axis<2&&e.push(this._layout[t])}return e},e.Cube.prototype.BuildCube=function(){if(this._axes=[],this._data=[],this._cubes=[],this.GenerateAxes(),null!==this._rows)for(var t=0;t<this._rows.length;t++){var a,u=new e.CubeKeys;for(a=2;a<this._axes.length;a++)u=this._axes[a].ProcessRow(this._rows[t],u);for(var r=u.GetHashCodes(),i=0;i<r.length;i++){var s=r[i].key,n=this._cubes[s];n||(n=this.GenerateCube(this._getNonPageLayout()),this._cubes[s]=n);var o=new e.CubeKeys,l=n._axes.length;for(a=0;a<l;a++)o=n._axes[a].ProcessRow(this._rows[t],o);var h=o.GetHashCodes(),c=h;if(void 0!==r[i].dataValue){c=[];for(var g=0;g<h.length;g++)c.push(r[i])}n._storeData(h,c,this._rows[t])}}},e.Cube.prototype._storeData=function(e,t,a){for(var u=0;u<e.length;u++)this._data[e[u].key]=this._aggregate(t[u],this._data[e[u].key],a)},e.Cube.prototype._getPinnedCube=function(){return this._cubes[this._getHashFromPin(this._pin)]},e.Cube.prototype._getHashFromPin=function(t){var a=new e.CubeKeys;if(t&&t.length>0){t.sort(function(e,t){return e.axis-t.axis});for(var u=this._axes,r=0;r<t.length;r++)a=u[t[r].axis].GetCubeKeys(t[r].index,a)}return a.GetHashCodes()[0].key},e.Cube._isValid=function(e){return!!e&&(void 0!==e.value&&null!==e.value)},e.Cube.prototype._createAggValue=function(e,t,a,u,r){a.push(u);for(var i={},s=Object.keys(r),n=0;n<s.length;n++){var o=s[n];i[o]=r[o]}return i.value=e,i.aggType=t,i.rows=a,i},e.Cube._isNumber=function(t){return!e.StringUtils.isString(t.value)&&!isNaN(t.value)},e.Cube.prototype._aggregate=function(t,a,u){var r=this.GetAggType(t.dataValue),i=r.aggregation,s=e.Cube._isValid(a),n=e.Cube._isValid(t),o=s&&e.Cube._isNumber(a),l=n&&e.Cube._isNumber(t);switch(i){case e.CubeAggType.SUM:return s&&n?o&&l?this._createAggValue(a.value+t.value,i,a.rows,u,{}):this._createAggValue(NaN,i,a.rows,u,{}):n&&!s?l?this._createAggValue(t.value,i,[],u,{}):this._createAggValue(NaN,i,[],u,{}):a;case e.CubeAggType.AVERAGE:return s&&n?o&&l?this._createAggValue((a.sum+t.value)/(a.rows.length+1),i,a.rows,u,{sum:a.sum+t.value}):this._createAggValue(NaN,i,a.rows,u,{sum:a.sum}):n&&!s?l?this._createAggValue(t.value,i,[],u,{sum:t.value}):this._createAggValue(NaN,i,[],u,{sum:NaN}):a;case e.CubeAggType.VARIANCE:case e.CubeAggType.STDDEV:if(s&&n){if(o&&l){var h=a.rows.length+1,c=a.value+(t.value-a.value)/h;return this._createAggValue(c,i,a.rows,u,{square:a.square+(t.value-a.value)*(t.value-c)})}return this._createAggValue(NaN,i,a.rows,u,{square:NaN})}return n&&!s?l?this._createAggValue(t.value,i,[],u,{square:0}):this._createAggValue(NaN,i,[],u,{square:NaN}):a;case e.CubeAggType.NONE:return this._createAggValue(null,i,s?a.rows:[],u,{});case e.CubeAggType.FIRST:return s?this._createAggValue(a.value,i,a.rows,u,{}):n?this._createAggValue(t.value,i,[],u,{}):a;case e.CubeAggType.MIN:return s&&n?o&&l?this._createAggValue(Math.min(a.value,t.value),i,a.rows,u,{}):this._createAggValue(NaN,i,a.rows,u,{}):n&&!s?l?this._createAggValue(t.value,i,[],u,{}):this._createAggValue(NaN,i,[],u,{}):a;case e.CubeAggType.MAX:return s&&n?o&&l?this._createAggValue(Math.max(a.value,t.value),i,a.rows,u,{}):this._createAggValue(NaN,i,a.rows,u,{}):n&&!s?l?this._createAggValue(t.value,i,[],u,{}):this._createAggValue(NaN,i,[],u,{}):a;case e.CubeAggType.COUNT:return s&&n?this._createAggValue(a.value+1,i,a.rows,u,{}):n&&!s?this._createAggValue(1,i,[],u,{}):a;case e.CubeAggType.CUSTOM:var g=r.callback.call(this,s?a.value:void 0,n?t.value:void 0);return this._createAggValue(g,i,s?a.rows:[],u,{});default:return}},e.Cube.prototype._getAxis=function(t,a){if(t>=this._axes.length){var u=new Array(t-this._axes.length+1);Array.prototype.push.apply(this._axes,u)}return this._axes[t]||(this._axes[t]=new e.CubeAxis(a,t,this)),this._axes[t]},e.Cube.prototype._createCubeKeys=function(t){for(var a=this.getAxes(),u=new e.CubeKeys,r=0;r<t.length;r++)u=a[r].GetCubeKeys(t[r],u);return u},e.Cube.prototype.ProcessLevel=function(t,a,u,r,i,s){e.Assert.failedInAbstractFunction()},e.Cube.prototype.GenerateCube=function(t){e.Assert.failedInAbstractFunction()},e.Cube.prototype.GenerateLevel=function(t,a){e.Assert.failedInAbstractFunction()},e.Cube.prototype.GetAggType=function(t){return e.Assert.failedInAbstractFunction(),{}},e.CubeAggType={SUM:"sum",AVERAGE:"avg",STDDEV:"stddev",VARIANCE:"variance",NONE:"none",FIRST:"first",MIN:"min",MAX:"max",COUNT:"count",CUSTOM:"custom"},e.CubeAxisValue=function(e,t,a,u){this.Init(),this._children=[],this._parent=u,this._cubeLevel=a,this._data={},this._data.value=e,this._data.label=t},e.Object.createSubclass(e.CubeAxisValue,e.Object,"oj.CubeAxisValue"),e.CubeAxisValue.prototype.Init=function(){e.CubeAxisValue.superclass.Init.call(this)},e.CubeAxisValue.prototype.getLevel=function(){return this._cubeLevel},e.CubeAxisValue.prototype.getDepth=function(){return 1},e.CubeAxisValue.prototype.getParents=function(){for(var e=[],t=this._parent;t&&t._parent;)e.unshift(t),t=t._parent;return e},e.CubeAxisValue.prototype.getChildren=function(){return this._children},e.CubeAxisValue.prototype.getExtent=function(){if(this._extent>-1)return this._extent;if(this._children&&0!==this._children.length){this._extent=0;for(var e=0;e<this.getChildren().length;e++)this._extent+=this.getChildren()[e].getExtent()}else this._extent=1;return this._extent},e.CubeAxisValue.prototype.getStart=function(){if(this._start>-1)return this._start;if(!this._parent)return 0;for(var e=this._parent.getStart(),t=this._parent._getPrevChild(this);t;)e+=t.getExtent(),t=this._parent._getPrevChild(t);return this._start=e,e},e.CubeAxisValue.prototype.getValue=function(){return this._data.value},e.CubeAxisValue.prototype.getLabel=function(){if(this._data.label)return this._data.label;var e=this.getValue();return e?e.toString():null},e.CubeAxisValue.prototype.GetChild=function(e){var t=this._getChildLevel();if(null===t)return null;if(t.isDataValue())return this._getDataValueChild(e);var a=e[t.attribute];if(a)for(var u=0;u<this._children.length;u++)if(this._children[u].getValue()===a)return this._children[u];return null},e.CubeAxisValue.prototype._getDataValueChild=function(e){for(var t=0;t<this._children.length;t++){var a=this._children[t].getValue();if(Object.prototype.hasOwnProperty.call(e,a)&&e[a]===a)return this._children[t]}return null},e.CubeAxisValue.prototype._getChildLevel=function(){return this._children&&this._children.length>0?this._children[0].getLevel():null},e.CubeAxisValue.prototype.GetChildAt=function(e){return this._findChild(e,0,this._children.length-1)},e.CubeAxisValue.prototype._findChild=function(e,t,a){if(t>a)return null;var u=Math.floor((t+a)/2),r=this._children[u],i=r.getStart();return i>e?this._findChild(e,t,u-1):i+(r.getExtent()-1)<e?this._findChild(e,u+1,a):r},e.CubeAxisValue.prototype.AddNode=function(t,a,u){for(var r=0;r<this._children.length;r++)if(this._children[r].getValue()===t)return this._children[r];var i=new e.CubeAxisValue(t,a,u,this);return this._children.push(i),i},e.CubeAxisValue.prototype.GetHashCode=function(){var e={};return e[this.getLevel().attribute]=this.getValue(),e},e.CubeAxisValue.prototype._getPrevChild=function(e){for(var t=0;t<this._children.length;t++)if(this._children[t]===e)return t>0?this._children[t-1]:null;return null},e.CubeAxis=function(t,a,u){this.Init(),this.axis=a,this._levels=[];for(var r=0;r<t.length;r++)this._levels.push(u.GenerateLevel(t[r],this));this._cube=u,this._values=new e.CubeAxisValue(null,null,null,null)},e.Object.createSubclass(e.CubeAxis,e.Object,"oj.CubeAxis"),e.CubeAxis.prototype.Init=function(){e.CubeAxis.superclass.Init.call(this)},e.CubeAxis.prototype.getLevels=function(){return this._levels},e.CubeAxis.prototype.getExtent=function(){return this._values.getExtent()},e.CubeAxis.prototype.getValues=function(e){for(var t=[],a=this._values;a;)(a=a.GetChildAt(e))&&t.push(a);return t},e.CubeAxis.prototype.getIndex=function(e){for(var t=e?JSON.parse(e):{},a=this._values,u=null;a;)u=a,a=a.GetChild(t);return u?u.getStart():-1},e.CubeAxis.prototype.axis=void 0,e.CubeAxis.prototype.GetCubeKeys=function(e,t){return this.GetPartialCubeKeys(e,this.getLevels().length-1,t)},e.CubeAxis.prototype.GetPartialCubeKeys=function(e,t,a){for(var u=this.getValues(e),r=this.getLevels()[t],i=0;i<u.length;i++){var s=u[i];if(s.getLevel().isDataValue()?a.AddDataValue(s.getValue()):a.UpdateKeys(s),s.getLevel()===r)break}return a},e.CubeAxis.prototype.ProcessRow=function(e,t){return this._cube.ProcessLevel(this,0,this._values,e,t,!0)},e.CubeCellSet=function(t,a){var u=a.row?a.row.start:0,r=a.row?a.row.count:0,i=a.column?a.column.start:0,s=a.column?a.column.count:0;e.Assert.assertNumber(u,null),e.Assert.assertNumber(r,null),e.Assert.assertNumber(i,null),e.Assert.assertNumber(s,null),this._cube=t,this._starts={row:u,column:i},this._values=this._cube.getValues([{start:i,count:s},{start:u,count:r}]);var n=Array.isArray(this._values);(s=n?this._values.length:1)>0&&(r=n?this._values[0].length:1),this._counts={row:r,column:s}},e.CubeCellSet.prototype.getData=function(e){var t=e.row,a=e.column,u=Array.isArray(this._values)?this._values[a-this._starts.column][t-this._starts.row]:this._values;return u?u.getValue():null},e.CubeCellSet.prototype.getMetadata=function(e){var t={keys:{}};return t.keys.row=this._getAxisMetadata(e,"row",2),t.keys.column=this._getAxisMetadata(e,"column",1),t},e.CubeCellSet.prototype._getAxisMetadata=function(t,a,u){var r=this._cube.getAxes();if(void 0!==t[a]&&r.length>=u){var i=new e.CubeKeys;return(i=r[e.CubeDataGridDataSource._convertAxes(a)].GetCubeKeys(t[a],i)).GetHashCodes()[0].key}return null},e.CubeCellSet.prototype.getStart=function(e){return this._starts[e]},e.CubeCellSet.prototype.getCount=function(e){return this._counts[e]},e.CubeCellSet.prototype.getExtent=function(e){return{row:{extent:1,more:{before:!1,after:!1}},column:{extent:1,more:{before:!1,after:!1}}}},e.CubeDataGridDataSource=function(t){e.CubeDataGridDataSource.superclass.constructor.call(this,t)},e.Object.createSubclass(e.CubeDataGridDataSource,e.DataGridDataSource,"oj.CubeDataGridDataSource"),e.CubeDataGridDataSource.prototype.setCube=function(e){this.data=e,this._fireRefresh()},e.CubeDataGridDataSource.prototype.setPage=function(e){this.data.setPage(e),this._fireRefresh()},e.CubeDataGridDataSource.prototype._fireRefresh=function(){var e={};e.source=this,e.operation="refresh",this.handleEvent("change",e)},e.CubeDataGridDataSource.prototype.getCount=function(e){var t=this._getAxis(e);return t?t.getExtent():0},e.CubeDataGridDataSource.prototype.getCountPrecision=function(e){return"exact"},e.CubeDataGridDataSource.prototype.fetchHeaders=function(t,a,u){var r=new e.CubeHeaderSet(this._getAxis(t.axis),this.data,t.start,t.count);a.success.call(u?u.success:void 0,r,t)},e.CubeDataGridDataSource.prototype.fetchCells=function(t,a,u){for(var r={},i=0;i<t.length;i++){var s,n=void 0===t[i].start?0:t[i].start;"row"===t[i].axis&&(s=void 0===t[i].count?this.data.getAxes()[1].getExtent():t[i].count,r.row={start:n,count:s}),"column"===t[i].axis&&(s=void 0===t[i].count?this.data.getAxes()[0].getExtent():t[i].count,r.column={start:n,count:s})}var o=new e.CubeCellSet(this.data,r);a.success.call(u?u.success:void 0,o,t)},e.CubeDataGridDataSource.prototype.keys=function(e){var t={};return t=this._getKey(e,"row",t),t=this._getKey(e,"column",t),Promise.resolve(t)},e.CubeDataGridDataSource.prototype._getKey=function(t,a,u){var r=this._getAxis(a),i=t[a],s=new e.CubeKeys;return s=r?r.GetCubeKeys(i,s):"",u[a]=s.GetHashCodes()[0].key,u},e.CubeDataGridDataSource.prototype.indexes=function(e){var t={};return t=this._getIndex(e,"row",t),t=this._getIndex(e,"column",t),Promise.resolve(t)},e.CubeDataGridDataSource.prototype._getIndex=function(e,t,a){return a[t]=this._getAxis(t).getIndex(e[t]),a},e.CubeDataGridDataSource.prototype.sort=function(t,a,u){e.Assert.failedInAbstractFunction()},e.CubeDataGridDataSource.prototype.move=function(t,a,u,r,i){e.Assert.failedInAbstractFunction()},e.CubeDataGridDataSource.prototype.moveOK=function(e,t,a){return"invalid"},e.CubeDataGridDataSource.prototype.getCapability=function(e){switch(e){case"sort":case"move":return"none";default:return null}},e.CubeDataGridDataSource._convertAxes=function(e){return"row"===e?1:0},e.CubeDataGridDataSource.prototype._getAxis=function(t){var a=e.CubeDataGridDataSource._convertAxes(t),u=this.data.getAxes();return u.length>a?u[a]:null},e.CubeDataValue=function(e,t,a,u,r){this.Init(),this._data={},this._data.value=e,this._data.indices=t,this._data.aggType=a,this._data.rows=u,this._data.square=r},e.Object.createSubclass(e.CubeDataValue,e.Object,"oj.CubeDataValue"),e.CubeDataValue.prototype.Init=function(){e.CubeDataValue.superclass.Init.call(this)},e.CubeDataValue.prototype.getValue=function(){switch(this._data.aggType){case e.CubeAggType.STDDEV:return Math.sqrt(this._getVariance());case e.CubeAggType.VARIANCE:return this._getVariance();default:return this._data.value}},e.CubeDataValue.prototype.getIndices=function(){return this._data.indices},e.CubeDataValue.prototype.getRows=function(){return this._data.rows},e.CubeDataValue.prototype.getAggregation=function(){return this._data.aggType},e.CubeDataValue.prototype._getVariance=function(){if(isNaN(this._data.square))return NaN;var e=this._data.rows.length;return e>1?this._data.square/(e-1):0},e.CubeHeaderSet=function(e,t,a,u){this._cube=t,this._axis=e,this._start=void 0===a?0:a,this._count=void 0===u?this._axis.getExtent():Math.min(u,this._axis.getExtent()-a),this._end=a+(u-1)},e.CubeHeaderSet.prototype.getData=function(e,t){var a=this._getValue(e,t);return a?a.getLabel():null},e.CubeHeaderSet.prototype.getMetadata=function(t,a){var u=new e.CubeKeys,r=(u=this._axis.GetPartialCubeKeys(t,a,u)).GetHashCodes();return r&&r.length>0?{key:r[0].key}:null},e.CubeHeaderSet.prototype.getLevelCount=function(){return this._axis.getLevels().length},e.CubeHeaderSet.prototype.getExtent=function(e,t){var a=this._getValue(e,t),u=a.getExtent(),r=a.getStart(),i=r+(u-1),s=e>r,n=e<r+(u-1);return r<this._start&&(u-=this._start-r),i>this._end&&(u-=i-this._end),{extent:u,more:{before:s,after:n}}},e.CubeHeaderSet.prototype.getDepth=function(e,t){return this._getValue(e,t).getDepth()},e.CubeHeaderSet.prototype.getCount=function(){return this._count},e.CubeHeaderSet.prototype.getStart=function(){return this._start},e.CubeHeaderSet.prototype.getLabel=function(){return null},e.CubeHeaderSet.prototype._getValue=function(e,t){void 0===t&&(t=0);var a=this._axis.getValues(e);return a&&a.length>t?a[t]:null},e.CubeKeys=function(){this._key=[],this._data=[]},e.CubeKeys.prototype.UpdateKeys=function(e){this._key.push(e)},e.CubeKeys.prototype.AddDataValue=function(e,t){this._data.push({name:e,value:t})},e.CubeKeys.prototype.GetHashCodes=function(){var e=[],a=this._buildKeyHash();if(0===this._data.length)e.push({key:JSON.stringify(a)});else for(var u=0;u<this._data.length;u++){var r=t.extend(!0,{},a);r[this._data[u].name]=this._data[u].name,e.push({key:JSON.stringify(r),dataValue:this._data[u].name,value:this._data[u].value})}return e},e.CubeKeys.prototype._buildKeyHash=function(){for(var e={},t=0;t<this._key.length;t++)for(var a=this._key[t].GetHashCode(),u=Object.keys(a),r=0;r<u.length;r++){var i=u[r];e[i]=a[i]}return e},e.CubeLevel=function(e,t,a){this.Init(),this.attribute=e,this._axisObj=t,this.axis=t.axis,this._dataValue=a},e.Object.createSubclass(e.CubeLevel,e.Object,"oj.CubeLevel"),e.CubeLevel.prototype.Init=function(){e.CubeLevel.superclass.Init.call(this)},e.CubeLevel.prototype.attribute=void 0,e.CubeLevel.prototype.axis=void 0,e.CubeLevel.prototype.getValue=function(e){var t=this._axisObj.getValues(e);if(t)for(var a=0;a<t.length;a++)if(t[a].getLevel()===this)return t[a];return null},e.CubeLevel.prototype.isDataValue=function(){return this._dataValue},e.CubeLevel.prototype._dataValue=!1,e.CubeLevel.prototype._axisObj=null,e.DataColumnCube=function(t,a,u){this.Init(),this._dataValues=u,this._valueAttr=u.valueAttr,this._labelAttr=u.labelAttr;var r=u.defaultAggregation;this._defaultAggregation=r?e.DataColumnCube._getDefaultAgg(r):{aggregation:e.CubeAggType.SUM},this._aggregation=u.aggregation,this._buildAggTypeLookup(),e.DataColumnCube.superclass.constructor.call(this,t,a)},e.Object.createSubclass(e.DataColumnCube,e.Cube,"oj.DataColumnCube"),e.DataColumnCube.prototype.Init=function(){e.DataColumnCube.superclass.Init.call(this)},e.DataColumnCube.prototype.BuildCube=function(){e.DataColumnCube.superclass.BuildCube.call(this)},e.DataColumnCube.prototype.GetAggType=function(e){return this._dataValueAggType[e]?this._dataValueAggType[e]:this._defaultAggregation},e.DataColumnCube.prototype.GenerateCube=function(t){return new e.DataColumnCube(null,t,this._dataValues)},e.DataColumnCube.prototype.GenerateLevel=function(t,a){return t.attribute===this._labelAttr?new e.CubeLevel(t.attribute,a,!0):new e.CubeLevel(t.attribute,a,!1)},e.DataColumnCube.prototype.ProcessLevel=function(e,t,a,u,r,i){if(t>=e.getLevels().length)return r;var s=e.getLevels()[t],n=u[s.attribute],o=a.AddNode(n,null,s);return s.isDataValue()?r.AddDataValue(n,u[this._valueAttr]):r.UpdateKeys(o),this.ProcessLevel(e,t+1,o,u,r,i)},e.DataColumnCube._getDefaultAgg=function(t){return e.StringUtils.isString(t)?{aggregation:t}:{aggregation:t.aggregation,callback:t.callback}},e.DataColumnCube.prototype._buildAggTypeLookup=function(){if(this._dataValueAggType=[],this._aggregation)for(var e=0;e<this._aggregation.length;e++){var t=this._aggregation[e],a=t.aggregation;this._dataValueAggType[t.value]=a?{aggregation:a,callback:t.callback}:this._defaultAggregation}},e.DataValueAttributeCube=function(t,a,u){this.Init(),this._dataValues=u,this._aggTypeLookup=this._buildAggTypeLookup(),e.DataValueAttributeCube.superclass.constructor.call(this,t,a)},e.Object.createSubclass(e.DataValueAttributeCube,e.Cube,"oj.DataValueAttributeCube"),e.DataValueAttributeCube.prototype._rows=null,e.DataValueAttributeCube.prototype.Init=function(){e.DataValueAttributeCube.superclass.Init.call(this)},e.DataValueAttributeCube.prototype.BuildCube=function(){e.DataValueAttributeCube.superclass.BuildCube.call(this)},e.DataValueAttributeCube.prototype.GetAggType=function(e){return this._dataValueAggType[e]},e.DataValueAttributeCube.prototype.GenerateLevel=function(t,a){return t.dataValue?new e.CubeLevel(null,a,!0):new e.CubeLevel(t.attribute,a,!1)},e.DataValueAttributeCube.prototype.GenerateCube=function(t){return new e.DataValueAttributeCube(null,t,this._dataValues)},e.DataValueAttributeCube.prototype.ProcessLevel=function(e,t,a,u,r,i){if(t>=e.getLevels().length)return r;var s=e.getLevels()[t];if(s.isDataValue())return this._processDataValue(e,a,u,t,r);var n=u[s.attribute],o=a.AddNode(n,null,s);return i&&r.UpdateKeys(o),this.ProcessLevel(e,t+1,o,u,r,i)},e.DataValueAttributeCube.prototype._processDataValue=function(e,t,a,u,r){for(var i=!0,s=0;s<this._dataValues.length;s++){var n=this._dataValues[s].attribute,o=this._dataValues[s].label;if(Object.prototype.hasOwnProperty.call(a,n)){var l=t.AddNode(n,o,e.getLevels()[u]);r.AddDataValue(n,a[n]),this.ProcessLevel(e,u+1,l,a,r,i),i=!1}}return r},e.DataValueAttributeCube.prototype._buildAggTypeLookup=function(){this._dataValueAggType=[];for(var t=0;t<this._dataValues.length;t++){var a=this._dataValues[t],u=a.aggregation;this._dataValueAggType[a.attribute]=u?{aggregation:a.aggregation,callback:a.callback}:{aggregation:e.CubeAggType.SUM,callback:a.callback}}};var a={};return a.Cube=e.Cube,a.CubeAggType=e.CubeAggType,a.CubeAxis=e.CubeAxis,a.CubeAxisValue=e.CubeAxisValue,a.CubeCellSet=e.CubeCellSet,a.CubeDataGridDataSource=e.CubeDataGridDataSource,a.CubeDataValue=e.CubeDataValue,a.CubeHeaderSet=e.CubeHeaderSet,a.CubeLevel=e.CubeLevel,a.DataColumnCube=e.DataColumnCube,a.DataValueAttributeCube=e.DataValueAttributeCube,a});