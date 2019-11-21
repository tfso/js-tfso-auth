var TfsoAuth = (function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /**
     * auth0-js v9.10.2
     * Author: Auth0
     * Date: 2019-04-15
     * License: MIT
     */

    var commonjsGlobal="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function createCommonjsModule(fn,module){return fn(module={exports:{}},module.exports),module.exports}var urlJoin=createCommonjsModule(function(module){var context,definition;context=commonjsGlobal,definition=function(){return function(){return function(strArray){var resultArray=[];if(strArray[0].match(/^[^\/:]+:\/*$/)&&strArray.length>1){var first=strArray.shift();strArray[0]=first+strArray[0];}strArray[0].match(/^file:\/\/\//)?strArray[0]=strArray[0].replace(/^([^\/:]+):\/*/,"$1:///"):strArray[0]=strArray[0].replace(/^([^\/:]+):\/*/,"$1://");for(var i=0;i<strArray.length;i++){var component=strArray[i];if("string"!=typeof component)throw new TypeError("Url must be a string. Received "+component);""!==component&&(i>0&&(component=component.replace(/^[\/]+/,"")),component=i<strArray.length-1?component.replace(/[\/]+$/,""):component.replace(/[\/]+$/,"/"),resultArray.push(component));}var str=resultArray.join("/"),parts=(str=str.replace(/\/(\?|&|#[^!])/g,"$1")).split("?");return str=parts.shift()+(parts.length>0?"?":"")+parts.join("&")}("object"==typeof arguments[0]?arguments[0]:[].slice.call(arguments))}},module.exports?module.exports=definition():context.urljoin=definition();}),utils=createCommonjsModule(function(module,exports){var has=Object.prototype.hasOwnProperty,hexTable=function(){for(var array=[],i=0;i<256;++i)array.push("%"+((i<16?"0":"")+i.toString(16)).toUpperCase());return array}();exports.arrayToObject=function(source,options){for(var obj=options&&options.plainObjects?Object.create(null):{},i=0;i<source.length;++i)void 0!==source[i]&&(obj[i]=source[i]);return obj},exports.merge=function(target,source,options){if(!source)return target;if("object"!=typeof source){if(Array.isArray(target))target.push(source);else{if("object"!=typeof target)return [target,source];(options.plainObjects||options.allowPrototypes||!has.call(Object.prototype,source))&&(target[source]=!0);}return target}if("object"!=typeof target)return [target].concat(source);var mergeTarget=target;return Array.isArray(target)&&!Array.isArray(source)&&(mergeTarget=exports.arrayToObject(target,options)),Array.isArray(target)&&Array.isArray(source)?(source.forEach(function(item,i){has.call(target,i)?target[i]&&"object"==typeof target[i]?target[i]=exports.merge(target[i],item,options):target.push(item):target[i]=item;}),target):Object.keys(source).reduce(function(acc,key){var value=source[key];return Object.prototype.hasOwnProperty.call(acc,key)?acc[key]=exports.merge(acc[key],value,options):acc[key]=value,acc},mergeTarget)},exports.decode=function(str){try{return decodeURIComponent(str.replace(/\+/g," "))}catch(e){return str}},exports.encode=function(str){if(0===str.length)return str;for(var string="string"==typeof str?str:String(str),out="",i=0;i<string.length;++i){var c=string.charCodeAt(i);45===c||46===c||95===c||126===c||c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122?out+=string.charAt(i):c<128?out+=hexTable[c]:c<2048?out+=hexTable[192|c>>6]+hexTable[128|63&c]:c<55296||c>=57344?out+=hexTable[224|c>>12]+hexTable[128|c>>6&63]+hexTable[128|63&c]:(i+=1,c=65536+((1023&c)<<10|1023&string.charCodeAt(i)),out+=hexTable[240|c>>18]+hexTable[128|c>>12&63]+hexTable[128|c>>6&63]+hexTable[128|63&c]);}return out},exports.compact=function(obj,references){if("object"!=typeof obj||null===obj)return obj;var refs=references||[],lookup=refs.indexOf(obj);if(-1!==lookup)return refs[lookup];if(refs.push(obj),Array.isArray(obj)){for(var compacted=[],i=0;i<obj.length;++i)obj[i]&&"object"==typeof obj[i]?compacted.push(exports.compact(obj[i],refs)):void 0!==obj[i]&&compacted.push(obj[i]);return compacted}return Object.keys(obj).forEach(function(key){obj[key]=exports.compact(obj[key],refs);}),obj},exports.isRegExp=function(obj){return "[object RegExp]"===Object.prototype.toString.call(obj)},exports.isBuffer=function(obj){return null!=obj&&!!(obj.constructor&&obj.constructor.isBuffer&&obj.constructor.isBuffer(obj))};}),utils_1=utils.arrayToObject,utils_2=utils.merge,utils_3=utils.decode,utils_4=utils.encode,utils_5=utils.compact,utils_6=utils.isRegExp,utils_7=utils.isBuffer,replace=String.prototype.replace,percentTwenties=/%20/g,formats={default:"RFC3986",formatters:{RFC1738:function(value){return replace.call(value,percentTwenties,"+")},RFC3986:function(value){return value}},RFC1738:"RFC1738",RFC3986:"RFC3986"},arrayPrefixGenerators={brackets:function(prefix){return prefix+"[]"},indices:function(prefix,key){return prefix+"["+key+"]"},repeat:function(prefix){return prefix}},toISO=Date.prototype.toISOString,defaults={delimiter:"&",encode:!0,encoder:utils.encode,encodeValuesOnly:!1,serializeDate:function(date){return toISO.call(date)},skipNulls:!1,strictNullHandling:!1},stringify=function stringify(object,prefix,generateArrayPrefix,strictNullHandling,skipNulls,encoder,filter,sort,allowDots,serializeDate,formatter,encodeValuesOnly){var obj=object;if("function"==typeof filter)obj=filter(prefix,obj);else if(obj instanceof Date)obj=serializeDate(obj);else if(null===obj){if(strictNullHandling)return encoder&&!encodeValuesOnly?encoder(prefix):prefix;obj="";}if("string"==typeof obj||"number"==typeof obj||"boolean"==typeof obj||utils.isBuffer(obj))return encoder?[formatter(encodeValuesOnly?prefix:encoder(prefix))+"="+formatter(encoder(obj))]:[formatter(prefix)+"="+formatter(String(obj))];var objKeys,values=[];if(void 0===obj)return values;if(Array.isArray(filter))objKeys=filter;else{var keys=Object.keys(obj);objKeys=sort?keys.sort(sort):keys;}for(var i=0;i<objKeys.length;++i){var key=objKeys[i];skipNulls&&null===obj[key]||(values=Array.isArray(obj)?values.concat(stringify(obj[key],generateArrayPrefix(prefix,key),generateArrayPrefix,strictNullHandling,skipNulls,encoder,filter,sort,allowDots,serializeDate,formatter,encodeValuesOnly)):values.concat(stringify(obj[key],prefix+(allowDots?"."+key:"["+key+"]"),generateArrayPrefix,strictNullHandling,skipNulls,encoder,filter,sort,allowDots,serializeDate,formatter,encodeValuesOnly)));}return values},stringify_1=function(object,opts){var obj=object,options=opts||{};if(null!==options.encoder&&void 0!==options.encoder&&"function"!=typeof options.encoder)throw new TypeError("Encoder has to be a function.");var delimiter=void 0===options.delimiter?defaults.delimiter:options.delimiter,strictNullHandling="boolean"==typeof options.strictNullHandling?options.strictNullHandling:defaults.strictNullHandling,skipNulls="boolean"==typeof options.skipNulls?options.skipNulls:defaults.skipNulls,encode="boolean"==typeof options.encode?options.encode:defaults.encode,encoder="function"==typeof options.encoder?options.encoder:defaults.encoder,sort="function"==typeof options.sort?options.sort:null,allowDots=void 0!==options.allowDots&&options.allowDots,serializeDate="function"==typeof options.serializeDate?options.serializeDate:defaults.serializeDate,encodeValuesOnly="boolean"==typeof options.encodeValuesOnly?options.encodeValuesOnly:defaults.encodeValuesOnly;if(void 0===options.format)options.format=formats.default;else if(!Object.prototype.hasOwnProperty.call(formats.formatters,options.format))throw new TypeError("Unknown format option provided.");var objKeys,filter,formatter=formats.formatters[options.format];"function"==typeof options.filter?obj=(filter=options.filter)("",obj):Array.isArray(options.filter)&&(objKeys=filter=options.filter);var arrayFormat,keys=[];if("object"!=typeof obj||null===obj)return "";arrayFormat=options.arrayFormat in arrayPrefixGenerators?options.arrayFormat:"indices"in options?options.indices?"indices":"repeat":"indices";var generateArrayPrefix=arrayPrefixGenerators[arrayFormat];objKeys||(objKeys=Object.keys(obj)),sort&&objKeys.sort(sort);for(var i=0;i<objKeys.length;++i){var key=objKeys[i];skipNulls&&null===obj[key]||(keys=keys.concat(stringify(obj[key],key,generateArrayPrefix,strictNullHandling,skipNulls,encode?encoder:null,filter,sort,allowDots,serializeDate,formatter,encodeValuesOnly)));}return keys.join(delimiter)},has=Object.prototype.hasOwnProperty,defaults$1={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:utils.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},parseValues=function(str,options){for(var obj={},parts=str.split(options.delimiter,options.parameterLimit===1/0?void 0:options.parameterLimit),i=0;i<parts.length;++i){var key,val,part=parts[i],pos=-1===part.indexOf("]=")?part.indexOf("="):part.indexOf("]=")+1;-1===pos?(key=options.decoder(part),val=options.strictNullHandling?null:""):(key=options.decoder(part.slice(0,pos)),val=options.decoder(part.slice(pos+1))),has.call(obj,key)?obj[key]=[].concat(obj[key]).concat(val):obj[key]=val;}return obj},parseObject=function(chain,val,options){if(!chain.length)return val;var obj,root=chain.shift();if("[]"===root)obj=(obj=[]).concat(parseObject(chain,val,options));else{obj=options.plainObjects?Object.create(null):{};var cleanRoot="["===root.charAt(0)&&"]"===root.charAt(root.length-1)?root.slice(1,-1):root,index=parseInt(cleanRoot,10);!isNaN(index)&&root!==cleanRoot&&String(index)===cleanRoot&&index>=0&&options.parseArrays&&index<=options.arrayLimit?(obj=[])[index]=parseObject(chain,val,options):obj[cleanRoot]=parseObject(chain,val,options);}return obj},parseKeys=function(givenKey,val,options){if(givenKey){var key=options.allowDots?givenKey.replace(/\.([^.[]+)/g,"[$1]"):givenKey,child=/(\[[^[\]]*])/g,segment=/(\[[^[\]]*])/.exec(key),parent=segment?key.slice(0,segment.index):key,keys=[];if(parent){if(!options.plainObjects&&has.call(Object.prototype,parent)&&!options.allowPrototypes)return;keys.push(parent);}for(var i=0;null!==(segment=child.exec(key))&&i<options.depth;){if(i+=1,!options.plainObjects&&has.call(Object.prototype,segment[1].slice(1,-1))&&!options.allowPrototypes)return;keys.push(segment[1]);}return segment&&keys.push("["+key.slice(segment.index)+"]"),parseObject(keys,val,options)}},parse=function(str,opts){var options=opts||{};if(null!==options.decoder&&void 0!==options.decoder&&"function"!=typeof options.decoder)throw new TypeError("Decoder has to be a function.");if(options.delimiter="string"==typeof options.delimiter||utils.isRegExp(options.delimiter)?options.delimiter:defaults$1.delimiter,options.depth="number"==typeof options.depth?options.depth:defaults$1.depth,options.arrayLimit="number"==typeof options.arrayLimit?options.arrayLimit:defaults$1.arrayLimit,options.parseArrays=!1!==options.parseArrays,options.decoder="function"==typeof options.decoder?options.decoder:defaults$1.decoder,options.allowDots="boolean"==typeof options.allowDots?options.allowDots:defaults$1.allowDots,options.plainObjects="boolean"==typeof options.plainObjects?options.plainObjects:defaults$1.plainObjects,options.allowPrototypes="boolean"==typeof options.allowPrototypes?options.allowPrototypes:defaults$1.allowPrototypes,options.parameterLimit="number"==typeof options.parameterLimit?options.parameterLimit:defaults$1.parameterLimit,options.strictNullHandling="boolean"==typeof options.strictNullHandling?options.strictNullHandling:defaults$1.strictNullHandling,""===str||null==str)return options.plainObjects?Object.create(null):{};for(var tempObj="string"==typeof str?parseValues(str,options):str,obj=options.plainObjects?Object.create(null):{},keys=Object.keys(tempObj),i=0;i<keys.length;++i){var key=keys[i],newObj=parseKeys(key,tempObj[key],options);obj=utils.merge(obj,newObj,options);}return utils.compact(obj)},lib={formats:formats,parse:parse,stringify:stringify_1},componentEmitter=createCommonjsModule(function(module){function Emitter(obj){if(obj)return function(obj){for(var key in Emitter.prototype)obj[key]=Emitter.prototype[key];return obj}(obj)}module.exports=Emitter,Emitter.prototype.on=Emitter.prototype.addEventListener=function(event,fn){return this._callbacks=this._callbacks||{},(this._callbacks["$"+event]=this._callbacks["$"+event]||[]).push(fn),this},Emitter.prototype.once=function(event,fn){function on(){this.off(event,on),fn.apply(this,arguments);}return on.fn=fn,this.on(event,on),this},Emitter.prototype.off=Emitter.prototype.removeListener=Emitter.prototype.removeAllListeners=Emitter.prototype.removeEventListener=function(event,fn){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var cb,callbacks=this._callbacks["$"+event];if(!callbacks)return this;if(1==arguments.length)return delete this._callbacks["$"+event],this;for(var i=0;i<callbacks.length;i++)if((cb=callbacks[i])===fn||cb.fn===fn){callbacks.splice(i,1);break}return this},Emitter.prototype.emit=function(event){this._callbacks=this._callbacks||{};var args=[].slice.call(arguments,1),callbacks=this._callbacks["$"+event];if(callbacks)for(var i=0,len=(callbacks=callbacks.slice(0)).length;i<len;++i)callbacks[i].apply(this,args);return this},Emitter.prototype.listeners=function(event){return this._callbacks=this._callbacks||{},this._callbacks["$"+event]||[]},Emitter.prototype.hasListeners=function(event){return !!this.listeners(event).length};});function isObject(obj){return null!==obj&&"object"==typeof obj}var isObject_1=isObject,requestBase=RequestBase;function RequestBase(obj){if(obj)return mixin(obj)}function mixin(obj){for(var key in RequestBase.prototype)obj[key]=RequestBase.prototype[key];return obj}RequestBase.prototype.clearTimeout=function(){return clearTimeout(this._timer),clearTimeout(this._responseTimeoutTimer),delete this._timer,delete this._responseTimeoutTimer,this},RequestBase.prototype.parse=function(fn){return this._parser=fn,this},RequestBase.prototype.responseType=function(val){return this._responseType=val,this},RequestBase.prototype.serialize=function(fn){return this._serializer=fn,this},RequestBase.prototype.timeout=function(options){if(!options||"object"!=typeof options)return this._timeout=options,this._responseTimeout=0,this;for(var option in options)switch(option){case"deadline":this._timeout=options.deadline;break;case"response":this._responseTimeout=options.response;break;default:console.warn("Unknown timeout option",option);}return this},RequestBase.prototype.retry=function(count,fn){return 0!==arguments.length&&!0!==count||(count=1),count<=0&&(count=0),this._maxRetries=count,this._retries=0,this._retryCallback=fn,this};var ERROR_CODES=["ECONNRESET","ETIMEDOUT","EADDRINFO","ESOCKETTIMEDOUT"];RequestBase.prototype._shouldRetry=function(err,res){if(!this._maxRetries||this._retries++>=this._maxRetries)return !1;if(this._retryCallback)try{var override=this._retryCallback(err,res);if(!0===override)return !0;if(!1===override)return !1}catch(e){console.error(e);}if(res&&res.status&&res.status>=500&&501!=res.status)return !0;if(err){if(err.code&&~ERROR_CODES.indexOf(err.code))return !0;if(err.timeout&&"ECONNABORTED"==err.code)return !0;if(err.crossDomain)return !0}return !1},RequestBase.prototype._retry=function(){return this.clearTimeout(),this.req&&(this.req=null,this.req=this.request()),this._aborted=!1,this.timedout=!1,this._end()},RequestBase.prototype.then=function(resolve,reject){if(!this._fullfilledPromise){var self=this;this._endCalled&&console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises"),this._fullfilledPromise=new Promise(function(innerResolve,innerReject){self.end(function(err,res){err?innerReject(err):innerResolve(res);});});}return this._fullfilledPromise.then(resolve,reject)},RequestBase.prototype.catch=function(cb){return this.then(void 0,cb)},RequestBase.prototype.use=function(fn){return fn(this),this},RequestBase.prototype.ok=function(cb){if("function"!=typeof cb)throw Error("Callback required");return this._okCallback=cb,this},RequestBase.prototype._isResponseOK=function(res){return !!res&&(this._okCallback?this._okCallback(res):res.status>=200&&res.status<300)},RequestBase.prototype.get=function(field){return this._header[field.toLowerCase()]},RequestBase.prototype.getHeader=RequestBase.prototype.get,RequestBase.prototype.set=function(field,val){if(isObject_1(field)){for(var key in field)this.set(key,field[key]);return this}return this._header[field.toLowerCase()]=val,this.header[field]=val,this},RequestBase.prototype.unset=function(field){return delete this._header[field.toLowerCase()],delete this.header[field],this},RequestBase.prototype.field=function(name,val){if(null==name)throw new Error(".field(name, val) name can not be empty");if(this._data&&console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()"),isObject_1(name)){for(var key in name)this.field(key,name[key]);return this}if(Array.isArray(val)){for(var i in val)this.field(name,val[i]);return this}if(null==val)throw new Error(".field(name, val) val can not be empty");return "boolean"==typeof val&&(val=""+val),this._getFormData().append(name,val),this},RequestBase.prototype.abort=function(){return this._aborted?this:(this._aborted=!0,this.xhr&&this.xhr.abort(),this.req&&this.req.abort(),this.clearTimeout(),this.emit("abort"),this)},RequestBase.prototype._auth=function(user,pass,options,base64Encoder){switch(options.type){case"basic":this.set("Authorization","Basic "+base64Encoder(user+":"+pass));break;case"auto":this.username=user,this.password=pass;break;case"bearer":this.set("Authorization","Bearer "+user);}return this},RequestBase.prototype.withCredentials=function(on){return null==on&&(on=!0),this._withCredentials=on,this},RequestBase.prototype.redirects=function(n){return this._maxRedirects=n,this},RequestBase.prototype.maxResponseSize=function(n){if("number"!=typeof n)throw TypeError("Invalid argument");return this._maxResponseSize=n,this},RequestBase.prototype.toJSON=function(){return {method:this.method,url:this.url,data:this._data,headers:this._header}},RequestBase.prototype.send=function(data){var isObj=isObject_1(data),type=this._header["content-type"];if(this._formData&&console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()"),isObj&&!this._data)Array.isArray(data)?this._data=[]:this._isHost(data)||(this._data={});else if(data&&this._data&&this._isHost(this._data))throw Error("Can't merge these send calls");if(isObj&&isObject_1(this._data))for(var key in data)this._data[key]=data[key];else"string"==typeof data?(type||this.type("form"),type=this._header["content-type"],this._data="application/x-www-form-urlencoded"==type?this._data?this._data+"&"+data:data:(this._data||"")+data):this._data=data;return !isObj||this._isHost(data)?this:(type||this.type("json"),this)},RequestBase.prototype.sortQuery=function(sort){return this._sort=void 0===sort||sort,this},RequestBase.prototype._finalizeQueryString=function(){var query=this._query.join("&");if(query&&(this.url+=(this.url.indexOf("?")>=0?"&":"?")+query),this._query.length=0,this._sort){var index=this.url.indexOf("?");if(index>=0){var queryArr=this.url.substring(index+1).split("&");"function"==typeof this._sort?queryArr.sort(this._sort):queryArr.sort(),this.url=this.url.substring(0,index)+"?"+queryArr.join("&");}}},RequestBase.prototype._appendQueryString=function(){console.trace("Unsupported");},RequestBase.prototype._timeoutError=function(reason,timeout,errno){if(!this._aborted){var err=new Error(reason+timeout+"ms exceeded");err.timeout=timeout,err.code="ECONNABORTED",err.errno=errno,this.timedout=!0,this.abort(),this.callback(err);}},RequestBase.prototype._setTimeouts=function(){var self=this;this._timeout&&!this._timer&&(this._timer=setTimeout(function(){self._timeoutError("Timeout of ",self._timeout,"ETIME");},this._timeout)),this._responseTimeout&&!this._responseTimeoutTimer&&(this._responseTimeoutTimer=setTimeout(function(){self._timeoutError("Response timeout of ",self._responseTimeout,"ETIMEDOUT");},this._responseTimeout));};var type=function(str){return str.split(/ *; */).shift()},params=function(str){return str.split(/ *; */).reduce(function(obj,str){var parts=str.split(/ *= */),key=parts.shift(),val=parts.shift();return key&&val&&(obj[key]=val),obj},{})},parseLinks=function(str){return str.split(/ *, */).reduce(function(obj,str){var parts=str.split(/ *; */),url=parts[0].slice(1,-1);return obj[parts[1].split(/ *= */)[1].slice(1,-1)]=url,obj},{})},cleanHeader=function(header,changesOrigin){return delete header["content-type"],delete header["content-length"],delete header["transfer-encoding"],delete header.host,changesOrigin&&(delete header.authorization,delete header.cookie),header},utils$1={type:type,params:params,parseLinks:parseLinks,cleanHeader:cleanHeader},responseBase=ResponseBase;function ResponseBase(obj){if(obj)return mixin$1(obj)}function mixin$1(obj){for(var key in ResponseBase.prototype)obj[key]=ResponseBase.prototype[key];return obj}function Agent(){this._defaults=[];}ResponseBase.prototype.get=function(field){return this.header[field.toLowerCase()]},ResponseBase.prototype._setHeaderProperties=function(header){var ct=header["content-type"]||"";this.type=utils$1.type(ct);var params=utils$1.params(ct);for(var key in params)this[key]=params[key];this.links={};try{header.link&&(this.links=utils$1.parseLinks(header.link));}catch(err){}},ResponseBase.prototype._setStatusProperties=function(status){var type=status/100|0;this.status=this.statusCode=status,this.statusType=type,this.info=1==type,this.ok=2==type,this.redirect=3==type,this.clientError=4==type,this.serverError=5==type,this.error=(4==type||5==type)&&this.toError(),this.accepted=202==status,this.noContent=204==status,this.badRequest=400==status,this.unauthorized=401==status,this.notAcceptable=406==status,this.forbidden=403==status,this.notFound=404==status;},["use","on","once","set","query","type","accept","auth","withCredentials","sortQuery","retry","ok","redirects","timeout","buffer","serialize","parse","ca","key","pfx","cert"].forEach(function(fn){Agent.prototype[fn]=function(){return this._defaults.push({fn:fn,arguments:arguments}),this};}),Agent.prototype._setDefaults=function(req){this._defaults.forEach(function(def){req[def.fn].apply(req,def.arguments);});};for(var agentBase=Agent,client=createCommonjsModule(function(module,exports){var root;function noop(){}"undefined"!=typeof window?root=window:"undefined"!=typeof self?root=self:(console.warn("Using browser-only version of superagent in non-browser environment"),root=commonjsGlobal);var request=exports=module.exports=function(method,url){return "function"==typeof url?new exports.Request("GET",method).end(url):1==arguments.length?new exports.Request("GET",method):new exports.Request(method,url)};exports.Request=Request,request.getXHR=function(){if(!(!root.XMLHttpRequest||root.location&&"file:"==root.location.protocol&&root.ActiveXObject))return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}throw Error("Browser-only version of superagent could not find XHR")};var trim="".trim?function(s){return s.trim()}:function(s){return s.replace(/(^\s*|\s*$)/g,"")};function serialize(obj){if(!isObject_1(obj))return obj;var pairs=[];for(var key in obj)pushEncodedKeyValuePair(pairs,key,obj[key]);return pairs.join("&")}function pushEncodedKeyValuePair(pairs,key,val){if(null!=val)if(Array.isArray(val))val.forEach(function(v){pushEncodedKeyValuePair(pairs,key,v);});else if(isObject_1(val))for(var subkey in val)pushEncodedKeyValuePair(pairs,key+"["+subkey+"]",val[subkey]);else pairs.push(encodeURIComponent(key)+"="+encodeURIComponent(val));else null===val&&pairs.push(encodeURIComponent(key));}function parseString(str){for(var pair,pos,obj={},pairs=str.split("&"),i=0,len=pairs.length;i<len;++i)-1==(pos=(pair=pairs[i]).indexOf("="))?obj[decodeURIComponent(pair)]="":obj[decodeURIComponent(pair.slice(0,pos))]=decodeURIComponent(pair.slice(pos+1));return obj}function isJSON(mime){return /[\/+]json($|[^-\w])/.test(mime)}function Response(req){this.req=req,this.xhr=this.req.xhr,this.text="HEAD"!=this.req.method&&(""===this.xhr.responseType||"text"===this.xhr.responseType)||void 0===this.xhr.responseType?this.xhr.responseText:null,this.statusText=this.req.xhr.statusText;var status=this.xhr.status;1223===status&&(status=204),this._setStatusProperties(status),this.header=this.headers=function(str){for(var index,line,field,val,lines=str.split(/\r?\n/),fields={},i=0,len=lines.length;i<len;++i)-1!==(index=(line=lines[i]).indexOf(":"))&&(field=line.slice(0,index).toLowerCase(),val=trim(line.slice(index+1)),fields[field]=val);return fields}(this.xhr.getAllResponseHeaders()),this.header["content-type"]=this.xhr.getResponseHeader("content-type"),this._setHeaderProperties(this.header),null===this.text&&req._responseType?this.body=this.xhr.response:this.body="HEAD"!=this.req.method?this._parseBody(this.text?this.text:this.xhr.response):null;}function Request(method,url){var self=this;this._query=this._query||[],this.method=method,this.url=url,this.header={},this._header={},this.on("end",function(){var new_err,err=null,res=null;try{res=new Response(self);}catch(e){return (err=new Error("Parser is unable to parse the response")).parse=!0,err.original=e,self.xhr?(err.rawResponse=void 0===self.xhr.responseType?self.xhr.responseText:self.xhr.response,err.status=self.xhr.status?self.xhr.status:null,err.statusCode=err.status):(err.rawResponse=null,err.status=null),self.callback(err)}self.emit("response",res);try{self._isResponseOK(res)||(new_err=new Error(res.statusText||"Unsuccessful HTTP response"));}catch(custom_err){new_err=custom_err;}new_err?(new_err.original=err,new_err.response=res,new_err.status=res.status,self.callback(new_err,res)):self.callback(null,res);});}function del(url,data,fn){var req=request("DELETE",url);return "function"==typeof data&&(fn=data,data=null),data&&req.send(data),fn&&req.end(fn),req}request.serializeObject=serialize,request.parseString=parseString,request.types={html:"text/html",json:"application/json",xml:"text/xml",urlencoded:"application/x-www-form-urlencoded",form:"application/x-www-form-urlencoded","form-data":"application/x-www-form-urlencoded"},request.serialize={"application/x-www-form-urlencoded":serialize,"application/json":JSON.stringify},request.parse={"application/x-www-form-urlencoded":parseString,"application/json":JSON.parse},responseBase(Response.prototype),Response.prototype._parseBody=function(str){var parse=request.parse[this.type];return this.req._parser?this.req._parser(this,str):(!parse&&isJSON(this.type)&&(parse=request.parse["application/json"]),parse&&str&&(str.length||str instanceof Object)?parse(str):null)},Response.prototype.toError=function(){var req=this.req,method=req.method,url=req.url,msg="cannot "+method+" "+url+" ("+this.status+")",err=new Error(msg);return err.status=this.status,err.method=method,err.url=url,err},request.Response=Response,componentEmitter(Request.prototype),requestBase(Request.prototype),Request.prototype.type=function(type){return this.set("Content-Type",request.types[type]||type),this},Request.prototype.accept=function(type){return this.set("Accept",request.types[type]||type),this},Request.prototype.auth=function(user,pass,options){1===arguments.length&&(pass=""),"object"==typeof pass&&null!==pass&&(options=pass,pass=""),options||(options={type:"function"==typeof btoa?"basic":"auto"});return this._auth(user,pass,options,function(string){if("function"==typeof btoa)return btoa(string);throw new Error("Cannot use basic auth, btoa is not a function")})},Request.prototype.query=function(val){return "string"!=typeof val&&(val=serialize(val)),val&&this._query.push(val),this},Request.prototype.attach=function(field,file,options){if(file){if(this._data)throw Error("superagent can't mix .send() and .attach()");this._getFormData().append(field,file,options||file.name);}return this},Request.prototype._getFormData=function(){return this._formData||(this._formData=new root.FormData),this._formData},Request.prototype.callback=function(err,res){if(this._shouldRetry(err,res))return this._retry();var fn=this._callback;this.clearTimeout(),err&&(this._maxRetries&&(err.retries=this._retries-1),this.emit("error",err)),fn(err,res);},Request.prototype.crossDomainError=function(){var err=new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");err.crossDomain=!0,err.status=this.status,err.method=this.method,err.url=this.url,this.callback(err);},Request.prototype.buffer=Request.prototype.ca=Request.prototype.agent=function(){return console.warn("This is not supported in browser version of superagent"),this},Request.prototype.pipe=Request.prototype.write=function(){throw Error("Streaming is not supported in browser version of superagent")},Request.prototype._isHost=function(obj){return obj&&"object"==typeof obj&&!Array.isArray(obj)&&"[object Object]"!==Object.prototype.toString.call(obj)},Request.prototype.end=function(fn){return this._endCalled&&console.warn("Warning: .end() was called twice. This is not supported in superagent"),this._endCalled=!0,this._callback=fn||noop,this._finalizeQueryString(),this._end()},Request.prototype._end=function(){var self=this,xhr=this.xhr=request.getXHR(),data=this._formData||this._data;this._setTimeouts(),xhr.onreadystatechange=function(){var readyState=xhr.readyState;if(readyState>=2&&self._responseTimeoutTimer&&clearTimeout(self._responseTimeoutTimer),4==readyState){var status;try{status=xhr.status;}catch(e){status=0;}if(!status){if(self.timedout||self._aborted)return;return self.crossDomainError()}self.emit("end");}};var handleProgress=function(direction,e){e.total>0&&(e.percent=e.loaded/e.total*100),e.direction=direction,self.emit("progress",e);};if(this.hasListeners("progress"))try{xhr.onprogress=handleProgress.bind(null,"download"),xhr.upload&&(xhr.upload.onprogress=handleProgress.bind(null,"upload"));}catch(e){}try{this.username&&this.password?xhr.open(this.method,this.url,!0,this.username,this.password):xhr.open(this.method,this.url,!0);}catch(err){return this.callback(err)}if(this._withCredentials&&(xhr.withCredentials=!0),!this._formData&&"GET"!=this.method&&"HEAD"!=this.method&&"string"!=typeof data&&!this._isHost(data)){var contentType=this._header["content-type"],serialize=this._serializer||request.serialize[contentType?contentType.split(";")[0]:""];!serialize&&isJSON(contentType)&&(serialize=request.serialize["application/json"]),serialize&&(data=serialize(data));}for(var field in this.header)null!=this.header[field]&&this.header.hasOwnProperty(field)&&xhr.setRequestHeader(field,this.header[field]);return this._responseType&&(xhr.responseType=this._responseType),this.emit("request",this),xhr.send(void 0!==data?data:null),this},request.agent=function(){return new agentBase},["GET","POST","OPTIONS","PATCH","PUT","DELETE"].forEach(function(method){agentBase.prototype[method.toLowerCase()]=function(url,fn){var req=new request.Request(method,url);return this._setDefaults(req),fn&&req.end(fn),req};}),agentBase.prototype.del=agentBase.prototype.delete,request.get=function(url,data,fn){var req=request("GET",url);return "function"==typeof data&&(fn=data,data=null),data&&req.query(data),fn&&req.end(fn),req},request.head=function(url,data,fn){var req=request("HEAD",url);return "function"==typeof data&&(fn=data,data=null),data&&req.query(data),fn&&req.end(fn),req},request.options=function(url,data,fn){var req=request("OPTIONS",url);return "function"==typeof data&&(fn=data,data=null),data&&req.send(data),fn&&req.end(fn),req},request.del=del,request.delete=del,request.patch=function(url,data,fn){var req=request("PATCH",url);return "function"==typeof data&&(fn=data,data=null),data&&req.send(data),fn&&req.end(fn),req},request.post=function(url,data,fn){var req=request("POST",url);return "function"==typeof data&&(fn=data,data=null),data&&req.send(data),fn&&req.end(fn),req},request.put=function(url,data,fn){var req=request("PUT",url);return "function"==typeof data&&(fn=data,data=null),data&&req.send(data),fn&&req.end(fn),req};}),client_1=client.Request,byteLength_1=byteLength,toByteArray_1=toByteArray,fromByteArray_1=fromByteArray,lookup=[],revLookup=[],Arr="undefined"!=typeof Uint8Array?Uint8Array:Array,code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=0,len=code.length;i<len;++i)lookup[i]=code[i],revLookup[code.charCodeAt(i)]=i;function placeHoldersCount(b64){var len=b64.length;if(len%4>0)throw new Error("Invalid string. Length must be a multiple of 4");return "="===b64[len-2]?2:"="===b64[len-1]?1:0}function byteLength(b64){return 3*b64.length/4-placeHoldersCount(b64)}function toByteArray(b64){var i,j,l,tmp,placeHolders,arr,len=b64.length;placeHolders=placeHoldersCount(b64),arr=new Arr(3*len/4-placeHolders),l=placeHolders>0?len-4:len;var L=0;for(i=0,j=0;i<l;i+=4,j+=3)tmp=revLookup[b64.charCodeAt(i)]<<18|revLookup[b64.charCodeAt(i+1)]<<12|revLookup[b64.charCodeAt(i+2)]<<6|revLookup[b64.charCodeAt(i+3)],arr[L++]=tmp>>16&255,arr[L++]=tmp>>8&255,arr[L++]=255&tmp;return 2===placeHolders?(tmp=revLookup[b64.charCodeAt(i)]<<2|revLookup[b64.charCodeAt(i+1)]>>4,arr[L++]=255&tmp):1===placeHolders&&(tmp=revLookup[b64.charCodeAt(i)]<<10|revLookup[b64.charCodeAt(i+1)]<<4|revLookup[b64.charCodeAt(i+2)]>>2,arr[L++]=tmp>>8&255,arr[L++]=255&tmp),arr}function tripletToBase64(num){return lookup[num>>18&63]+lookup[num>>12&63]+lookup[num>>6&63]+lookup[63&num]}function encodeChunk(uint8,start,end){for(var tmp,output=[],i=start;i<end;i+=3)tmp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2],output.push(tripletToBase64(tmp));return output.join("")}function fromByteArray(uint8){for(var tmp,len=uint8.length,extraBytes=len%3,output="",parts=[],i=0,len2=len-extraBytes;i<len2;i+=16383)parts.push(encodeChunk(uint8,i,i+16383>len2?len2:i+16383));return 1===extraBytes?(tmp=uint8[len-1],output+=lookup[tmp>>2],output+=lookup[tmp<<4&63],output+="=="):2===extraBytes&&(tmp=(uint8[len-2]<<8)+uint8[len-1],output+=lookup[tmp>>10],output+=lookup[tmp>>4&63],output+=lookup[tmp<<2&63],output+="="),parts.push(output),parts.join("")}revLookup["-".charCodeAt(0)]=62,revLookup["_".charCodeAt(0)]=63;var base64Js={byteLength:byteLength_1,toByteArray:toByteArray_1,fromByteArray:fromByteArray_1};function padding(str){var mod=str.length%4;return 0===mod?str:str+new Array(1+(4-mod)).join("=")}function stringToByteArray(str){for(var arr=new Array(str.length),a=0;a<str.length;a++)arr[a]=str.charCodeAt(a);return arr}function byteArrayToString(array){for(var result="",i=0;i<array.length;i++)result+=String.fromCharCode(array[i]);return result}function encode(str){return base64Js.fromByteArray(stringToByteArray(str)).replace(/\+/g,"-").replace(/\//g,"_")}function decode(str){return str=padding(str).replace(/-/g,"+").replace(/_/g,"/"),byteArrayToString(base64Js.toByteArray(str))}var base64Url={encode:encode,decode:decode},version={raw:"9.10.2"},toString=Object.prototype.toString;function attribute(o,attr,type,text){if(type="array"===type?"object":type,o&&typeof o[attr]!==type)throw new Error(text)}function variable(o,type,text){if(typeof o!==type)throw new Error(text)}function value(o,values,text){if(-1===values.indexOf(o))throw new Error(text)}function check(o,config,attributes){if(config.optional&&!o||variable(o,config.type,config.message),"object"===config.type&&attributes)for(var keys=Object.keys(attributes),index=0;index<keys.length;index++){var a=keys[index];attributes[a].optional&&!o[a]||attributes[a].condition&&!attributes[a].condition(o)||(attribute(o,a,attributes[a].type,attributes[a].message),attributes[a].values&&value(o[a],attributes[a].values,attributes[a].value_message));}}function isArray(array){return this.supportsIsArray()?Array.isArray(array):"[object Array]"===toString.call(array)}function supportsIsArray(){return null!=Array.isArray}var assert={check:check,attribute:attribute,variable:variable,value:value,isArray:isArray,supportsIsArray:supportsIsArray};function get(){return Object.assign?Object.assign:objectAssignPolyfill}function objectAssignPolyfill(target){if(null==target)throw new TypeError("Cannot convert first argument to object");for(var to=Object(target),i=1;i<arguments.length;i++){var nextSource=arguments[i];if(null!=nextSource)for(var keysArray=Object.keys(Object(nextSource)),nextIndex=0,len=keysArray.length;nextIndex<len;nextIndex++){var nextKey=keysArray[nextIndex],desc=Object.getOwnPropertyDescriptor(nextSource,nextKey);void 0!==desc&&desc.enumerable&&(to[nextKey]=nextSource[nextKey]);}}return to}var objectAssign={get:get,objectAssignPolyfill:objectAssignPolyfill};function pick(object,keys){return keys.reduce(function(prev,key){return object[key]&&(prev[key]=object[key]),prev},{})}function getKeysNotIn(obj,allowedKeys){var notAllowed=[];for(var key in obj)-1===allowedKeys.indexOf(key)&&notAllowed.push(key);return notAllowed}function objectValues(obj){var values=[];for(var key in obj)values.push(obj[key]);return values}function extend(){var params=objectValues(arguments);return params.unshift({}),objectAssign.get().apply(void 0,params)}function merge(object,keys){return {base:keys?pick(object,keys):object,with:function(object2,keys2){return object2=keys2?pick(object2,keys2):object2,extend(this.base,object2)}}}function blacklist(object,blacklistedKeys){return Object.keys(object).reduce(function(p,key){return -1===blacklistedKeys.indexOf(key)&&(p[key]=object[key]),p},{})}function camelToSnake(str){for(var code,newKey="",index=0,wasPrevNumber=!0,wasPrevUppercase=!0;index<str.length;)code=str.charCodeAt(index),!wasPrevUppercase&&code>=65&&code<=90||!wasPrevNumber&&code>=48&&code<=57?(newKey+="_",newKey+=str[index].toLowerCase()):newKey+=str[index].toLowerCase(),wasPrevNumber=code>=48&&code<=57,wasPrevUppercase=code>=65&&code<=90,index++;return newKey}function snakeToCamel(str){var parts=str.split("_");return parts.reduce(function(p,c){return p+c.charAt(0).toUpperCase()+c.slice(1)},parts.shift())}function toSnakeCase(object,exceptions){return "object"!=typeof object||assert.isArray(object)||null===object?object:(exceptions=exceptions||[],Object.keys(object).reduce(function(p,key){return p[-1===exceptions.indexOf(key)?camelToSnake(key):key]=toSnakeCase(object[key]),p},{}))}function toCamelCase(object,exceptions,options){return "object"!=typeof object||assert.isArray(object)||null===object?object:(exceptions=exceptions||[],options=options||{},Object.keys(object).reduce(function(p,key){var newKey=-1===exceptions.indexOf(key)?snakeToCamel(key):key;return p[newKey]=toCamelCase(object[newKey]||object[key],[],options),options.keepOriginal&&(p[key]=toCamelCase(object[key],[],options)),p},{}))}function getLocationFromUrl(href){var match=href.match(/^(https?:|file:)\/\/(([^:\/?#]*)(?::([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);return match&&{href:href,protocol:match[1],host:match[2],hostname:match[3],port:match[4],pathname:match[5],search:match[6],hash:match[7]}}function getOriginFromUrl(url){if(url){var parsed=getLocationFromUrl(url),origin=parsed.protocol+"//"+parsed.hostname;return parsed.port&&(origin+=":"+parsed.port),origin}}function trim(options,key){var trimmed=extend(options);return options[key]&&(trimmed[key]=options[key].trim()),trimmed}function trimMultiple(options,keys){return keys.reduce(trim,options)}function trimUserDetails(options){return trimMultiple(options,["username","email","phoneNumber"])}var objectHelper={toSnakeCase:toSnakeCase,toCamelCase:toCamelCase,blacklist:blacklist,merge:merge,pick:pick,getKeysNotIn:getKeysNotIn,extend:extend,getOriginFromUrl:getOriginFromUrl,getLocationFromUrl:getLocationFromUrl,trimUserDetails:trimUserDetails};function RequestWrapper(req){this.request=req,this.method=req.method,this.url=req.url,this.body=req._data,this.headers=req._header;}function RequestObj(req){this.request=req;}function RequestBuilder(options){this._sendTelemetry=!1!==options._sendTelemetry||options._sendTelemetry,this._telemetryInfo=options._telemetryInfo||null,this._timesToRetryFailedRequests=options._timesToRetryFailedRequests,this.headers=options.headers||{},this._universalLoginPage=options.universalLoginPage;}function redirect(url){getWindow().location=url;}function getDocument(){return getWindow().document}function getWindow(){return window}function getOrigin(){var location=getWindow().location,origin=location.origin;return origin||(origin=objectHelper.getOriginFromUrl(location.href)),origin}RequestWrapper.prototype.abort=function(){this.request.abort();},RequestWrapper.prototype.getMethod=function(){return this.method},RequestWrapper.prototype.getBody=function(){return this.body},RequestWrapper.prototype.getUrl=function(){return this.url},RequestWrapper.prototype.getHeaders=function(){return this.headers},RequestObj.prototype.set=function(key,value){return this.request=this.request.set(key,value),this},RequestObj.prototype.send=function(body){return this.request=this.request.send(objectHelper.trimUserDetails(body)),this},RequestObj.prototype.withCredentials=function(){return this.request=this.request.withCredentials(),this},RequestObj.prototype.end=function(cb){return this.request=this.request.end(cb),new RequestWrapper(this.request)},RequestBuilder.prototype.setCommonConfiguration=function(ongoingRequest,options){if(options=options||{},this._timesToRetryFailedRequests>0&&(ongoingRequest=ongoingRequest.retry(this._timesToRetryFailedRequests)),options.noHeaders)return ongoingRequest;var headers=this.headers;ongoingRequest=ongoingRequest.set("Content-Type","application/json");for(var keys=Object.keys(this.headers),a=0;a<keys.length;a++)ongoingRequest=ongoingRequest.set(keys[a],headers[keys[a]]);return this._sendTelemetry&&(ongoingRequest=ongoingRequest.set("Auth0-Client",this.getTelemetryData())),ongoingRequest},RequestBuilder.prototype.getTelemetryData=function(){var telemetryName=this._universalLoginPage?"auth0.js-ulp":"auth0.js",clientInfo=this._telemetryInfo||{name:telemetryName,version:version.raw},jsonClientInfo=JSON.stringify(clientInfo);return base64Url.encode(jsonClientInfo)},RequestBuilder.prototype.get=function(url,options){return new RequestObj(this.setCommonConfiguration(client.get(url),options))},RequestBuilder.prototype.post=function(url,options){return new RequestObj(this.setCommonConfiguration(client.post(url),options))},RequestBuilder.prototype.patch=function(url,options){return new RequestObj(this.setCommonConfiguration(client.patch(url),options))};var windowHandler={redirect:redirect,getDocument:getDocument,getWindow:getWindow,getOrigin:getOrigin};function DummyStorage(){}DummyStorage.prototype.getItem=function(){return null},DummyStorage.prototype.removeItem=function(){},DummyStorage.prototype.setItem=function(){};var js_cookie=createCommonjsModule(function(module,exports){!function(factory){if(module.exports=factory(),!!0);}(function(){function extend(){for(var i=0,result={};i<arguments.length;i++){var attributes=arguments[i];for(var key in attributes)result[key]=attributes[key];}return result}return function init(converter){function api(key,value,attributes){var result;if("undefined"!=typeof document){if(arguments.length>1){if("number"==typeof(attributes=extend({path:"/"},api.defaults,attributes)).expires){var expires=new Date;expires.setMilliseconds(expires.getMilliseconds()+864e5*attributes.expires),attributes.expires=expires;}attributes.expires=attributes.expires?attributes.expires.toUTCString():"";try{result=JSON.stringify(value),/^[\{\[]/.test(result)&&(value=result);}catch(e){}value=converter.write?converter.write(value,key):encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),key=(key=(key=encodeURIComponent(String(key))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var stringifiedAttributes="";for(var attributeName in attributes)attributes[attributeName]&&(stringifiedAttributes+="; "+attributeName,!0!==attributes[attributeName]&&(stringifiedAttributes+="="+attributes[attributeName]));return document.cookie=key+"="+value+stringifiedAttributes}key||(result={});for(var cookies=document.cookie?document.cookie.split("; "):[],rdecode=/(%[0-9A-Z]{2})+/g,i=0;i<cookies.length;i++){var parts=cookies[i].split("="),cookie=parts.slice(1).join("=");this.json||'"'!==cookie.charAt(0)||(cookie=cookie.slice(1,-1));try{var name=parts[0].replace(rdecode,decodeURIComponent);if(cookie=converter.read?converter.read(cookie,name):converter(cookie,name)||cookie.replace(rdecode,decodeURIComponent),this.json)try{cookie=JSON.parse(cookie);}catch(e){}if(key===name){result=cookie;break}key||(result[name]=cookie);}catch(e){}}return result}}return api.set=api,api.get=function(key){return api.call(api,key)},api.getJSON=function(){return api.apply({json:!0},[].slice.call(arguments))},api.defaults={},api.remove=function(key,attributes){api(key,"",extend(attributes,{expires:-1}));},api.withConverter=init,api}(function(){})});});function CookieStorage(){}function Warn(options){this.disableWarnings=options.disableWarnings;}function StorageHandler(options){if(this.warn=new Warn({}),this.storage=new CookieStorage,!0===options.__tryLocalStorageFirst)try{var localStorage=windowHandler.getWindow().localStorage;localStorage&&(this.storage=localStorage);}catch(e){this.warn.warning(e),this.warn.warning("Can't use localStorage. Using CookieStorage instead.");}}function Storage(options){this.handler=new StorageHandler(options);}function SSODataStorage(options){this.storage=new Storage(options);}function buildResponse(error,description){return {error:error,errorDescription:description}}function invalidToken(description){return buildResponse("invalid_token",description)}CookieStorage.prototype.getItem=function(key){return js_cookie.get(key)},CookieStorage.prototype.removeItem=function(key){js_cookie.remove(key);},CookieStorage.prototype.setItem=function(key,value,options){var params=objectHelper.extend({expires:1},options);js_cookie.set(key,value,params);},Warn.prototype.warning=function(message){this.disableWarnings||console.warn(message);},StorageHandler.prototype.failover=function(){this.storage instanceof DummyStorage?this.warn.warning("DummyStorage: ignore failover"):this.storage instanceof CookieStorage?(this.warn.warning("CookieStorage: failing over DummyStorage"),this.storage=new DummyStorage):(this.warn.warning("LocalStorage: failing over CookieStorage"),this.storage=new CookieStorage);},StorageHandler.prototype.getItem=function(key){try{return this.storage.getItem(key)}catch(e){return this.warn.warning(e),this.failover(),this.getItem(key)}},StorageHandler.prototype.removeItem=function(key){try{return this.storage.removeItem(key)}catch(e){return this.warn.warning(e),this.failover(),this.removeItem(key)}},StorageHandler.prototype.setItem=function(key,value,options){try{return this.storage.setItem(key,value,options)}catch(e){return this.warn.warning(e),this.failover(),this.setItem(key,value,options)}},Storage.prototype.getItem=function(key){var value=this.handler.getItem(key);try{return JSON.parse(value)}catch(_){return value}},Storage.prototype.removeItem=function(key){return this.handler.removeItem(key)},Storage.prototype.setItem=function(key,value,options){var json=JSON.stringify(value);return this.handler.setItem(key,json,options)},SSODataStorage.prototype.set=function(connection,sub){var ssodata={lastUsedConnection:connection,lastUsedSub:sub};this.storage.setItem("auth0.ssodata",JSON.stringify(ssodata));},SSODataStorage.prototype.get=function(){var ssodata=this.storage.getItem("auth0.ssodata");if(ssodata)return JSON.parse(ssodata)};var error={buildResponse:buildResponse,invalidToken:invalidToken};function wrapCallback(cb,options){return (options=options||{}).ignoreCasing=!!options.ignoreCasing&&options.ignoreCasing,function(err,data){var errObj;return err||data?(!err&&data.err&&(err=data.err,data=null),!err&&data.error&&(err=data,data=null),err?(errObj={original:err},err.response&&err.response.statusCode&&(errObj.statusCode=err.response.statusCode),err.response&&err.response.statusText&&(errObj.statusText=err.response.statusText),err.response&&err.response.body&&(err=err.response.body),err.err&&(err=err.err),errObj.code=err.code||err.error||err.error_code||err.status||null,errObj.description=err.errorDescription||err.error_description||err.description||err.error||err.details||err.err||null,options.forceLegacyError&&(errObj.error=errObj.code,errObj.error_description=errObj.description),err.name&&(errObj.name=err.name),err.policy&&(errObj.policy=err.policy),cb(errObj)):!data.type||"text/html"!==data.type&&"text/plain"!==data.type?options.ignoreCasing?cb(null,data.body||data):cb(null,objectHelper.toCamelCase(data.body||data,[],{keepOriginal:options.keepOriginalCasing})):cb(null,data.text)):cb(error.buildResponse("generic_error","Something went wrong"))}}var tokenParams=["realm","audience","client_id","client_secret","redirect_uri","scope","code","grant_type","username","password","refresh_token","assertion","client_assertion","client_assertion_type","code_verifier"],authorizeParams=["connection","connection_scope","auth0Client","owp","device","realm","protocol","_csrf","_intstate","login_ticket","client_id","response_type","response_mode","redirect_uri","audience","scope","state","nonce","display","prompt","max_age","ui_locales","claims_locales","id_token_hint","login_hint","acr_values","claims","registration","request","request_uri","code_challenge","code_challenge_method","access_type","display"];function oauthAuthorizeParams(warn,params){var notAllowed=objectHelper.getKeysNotIn(params,authorizeParams);return notAllowed.length>0&&warn.warning("Following parameters are not allowed on the `/authorize` endpoint: ["+notAllowed.join(",")+"]"),params}function oauthTokenParams(warn,params){return objectHelper.pick(params,tokenParams)}var parametersWhitelist={oauthTokenParams:oauthTokenParams,oauthAuthorizeParams:oauthAuthorizeParams},core=createCommonjsModule(function(module,exports){var CryptoJS;module.exports=(CryptoJS=CryptoJS||function(Math,undefined){var create=Object.create||function(){function F(){}return function(obj){var subtype;return F.prototype=obj,subtype=new F,F.prototype=null,subtype}}(),C={},C_lib=C.lib={},Base=C_lib.Base={extend:function(overrides){var subtype=create(this);return overrides&&subtype.mixIn(overrides),subtype.hasOwnProperty("init")&&this.init!==subtype.init||(subtype.init=function(){subtype.$super.init.apply(this,arguments);}),subtype.init.prototype=subtype,subtype.$super=this,subtype},create:function(){var instance=this.extend();return instance.init.apply(instance,arguments),instance},init:function(){},mixIn:function(properties){for(var propertyName in properties)properties.hasOwnProperty(propertyName)&&(this[propertyName]=properties[propertyName]);properties.hasOwnProperty("toString")&&(this.toString=properties.toString);},clone:function(){return this.init.prototype.extend(this)}},WordArray=C_lib.WordArray=Base.extend({init:function(words,sigBytes){words=this.words=words||[],this.sigBytes=null!=sigBytes?sigBytes:4*words.length;},toString:function(encoder){return (encoder||Hex).stringify(this)},concat:function(wordArray){var thisWords=this.words,thatWords=wordArray.words,thisSigBytes=this.sigBytes,thatSigBytes=wordArray.sigBytes;if(this.clamp(),thisSigBytes%4)for(var i=0;i<thatSigBytes;i++){var thatByte=thatWords[i>>>2]>>>24-i%4*8&255;thisWords[thisSigBytes+i>>>2]|=thatByte<<24-(thisSigBytes+i)%4*8;}else for(var i=0;i<thatSigBytes;i+=4)thisWords[thisSigBytes+i>>>2]=thatWords[i>>>2];return this.sigBytes+=thatSigBytes,this},clamp:function(){var words=this.words,sigBytes=this.sigBytes;words[sigBytes>>>2]&=4294967295<<32-sigBytes%4*8,words.length=Math.ceil(sigBytes/4);},clone:function(){var clone=Base.clone.call(this);return clone.words=this.words.slice(0),clone},random:function(nBytes){for(var rcache,words=[],r=function(m_w){var m_w=m_w,m_z=987654321,mask=4294967295;return function(){var result=((m_z=36969*(65535&m_z)+(m_z>>16)&mask)<<16)+(m_w=18e3*(65535&m_w)+(m_w>>16)&mask)&mask;return result/=4294967296,(result+=.5)*(Math.random()>.5?1:-1)}},i=0;i<nBytes;i+=4){var _r=r(4294967296*(rcache||Math.random()));rcache=987654071*_r(),words.push(4294967296*_r()|0);}return new WordArray.init(words,nBytes)}}),C_enc=C.enc={},Hex=C_enc.Hex={stringify:function(wordArray){for(var words=wordArray.words,sigBytes=wordArray.sigBytes,hexChars=[],i=0;i<sigBytes;i++){var bite=words[i>>>2]>>>24-i%4*8&255;hexChars.push((bite>>>4).toString(16)),hexChars.push((15&bite).toString(16));}return hexChars.join("")},parse:function(hexStr){for(var hexStrLength=hexStr.length,words=[],i=0;i<hexStrLength;i+=2)words[i>>>3]|=parseInt(hexStr.substr(i,2),16)<<24-i%8*4;return new WordArray.init(words,hexStrLength/2)}},Latin1=C_enc.Latin1={stringify:function(wordArray){for(var words=wordArray.words,sigBytes=wordArray.sigBytes,latin1Chars=[],i=0;i<sigBytes;i++){var bite=words[i>>>2]>>>24-i%4*8&255;latin1Chars.push(String.fromCharCode(bite));}return latin1Chars.join("")},parse:function(latin1Str){for(var latin1StrLength=latin1Str.length,words=[],i=0;i<latin1StrLength;i++)words[i>>>2]|=(255&latin1Str.charCodeAt(i))<<24-i%4*8;return new WordArray.init(words,latin1StrLength)}},Utf8=C_enc.Utf8={stringify:function(wordArray){try{return decodeURIComponent(escape(Latin1.stringify(wordArray)))}catch(e){throw new Error("Malformed UTF-8 data")}},parse:function(utf8Str){return Latin1.parse(unescape(encodeURIComponent(utf8Str)))}},BufferedBlockAlgorithm=C_lib.BufferedBlockAlgorithm=Base.extend({reset:function(){this._data=new WordArray.init,this._nDataBytes=0;},_append:function(data){"string"==typeof data&&(data=Utf8.parse(data)),this._data.concat(data),this._nDataBytes+=data.sigBytes;},_process:function(doFlush){var data=this._data,dataWords=data.words,dataSigBytes=data.sigBytes,blockSize=this.blockSize,blockSizeBytes=4*blockSize,nBlocksReady=dataSigBytes/blockSizeBytes,nWordsReady=(nBlocksReady=doFlush?Math.ceil(nBlocksReady):Math.max((0|nBlocksReady)-this._minBufferSize,0))*blockSize,nBytesReady=Math.min(4*nWordsReady,dataSigBytes);if(nWordsReady){for(var offset=0;offset<nWordsReady;offset+=blockSize)this._doProcessBlock(dataWords,offset);var processedWords=dataWords.splice(0,nWordsReady);data.sigBytes-=nBytesReady;}return new WordArray.init(processedWords,nBytesReady)},clone:function(){var clone=Base.clone.call(this);return clone._data=this._data.clone(),clone},_minBufferSize:0}),C_algo=(C_lib.Hasher=BufferedBlockAlgorithm.extend({cfg:Base.extend(),init:function(cfg){this.cfg=this.cfg.extend(cfg),this.reset();},reset:function(){BufferedBlockAlgorithm.reset.call(this),this._doReset();},update:function(messageUpdate){return this._append(messageUpdate),this._process(),this},finalize:function(messageUpdate){messageUpdate&&this._append(messageUpdate);var hash=this._doFinalize();return hash},blockSize:16,_createHelper:function(hasher){return function(message,cfg){return new hasher.init(cfg).finalize(message)}},_createHmacHelper:function(hasher){return function(message,key){return new C_algo.HMAC.init(hasher,key).finalize(message)}}}),C.algo={});return C}(Math),CryptoJS);}),sha256=createCommonjsModule(function(module,exports){var CryptoJS;module.exports=(CryptoJS=core,function(Math){var C=CryptoJS,C_lib=C.lib,WordArray=C_lib.WordArray,Hasher=C_lib.Hasher,C_algo=C.algo,H=[],K=[];!function(){function isPrime(n){for(var sqrtN=Math.sqrt(n),factor=2;factor<=sqrtN;factor++)if(!(n%factor))return !1;return !0}function getFractionalBits(n){return 4294967296*(n-(0|n))|0}for(var n=2,nPrime=0;nPrime<64;)isPrime(n)&&(nPrime<8&&(H[nPrime]=getFractionalBits(Math.pow(n,.5))),K[nPrime]=getFractionalBits(Math.pow(n,1/3)),nPrime++),n++;}();var W=[],SHA256=C_algo.SHA256=Hasher.extend({_doReset:function(){this._hash=new WordArray.init(H.slice(0));},_doProcessBlock:function(M,offset){for(var H=this._hash.words,a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7],i=0;i<64;i++){if(i<16)W[i]=0|M[offset+i];else{var gamma0x=W[i-15],gamma0=(gamma0x<<25|gamma0x>>>7)^(gamma0x<<14|gamma0x>>>18)^gamma0x>>>3,gamma1x=W[i-2],gamma1=(gamma1x<<15|gamma1x>>>17)^(gamma1x<<13|gamma1x>>>19)^gamma1x>>>10;W[i]=gamma0+W[i-7]+gamma1+W[i-16];}var maj=a&b^a&c^b&c,sigma0=(a<<30|a>>>2)^(a<<19|a>>>13)^(a<<10|a>>>22),t1=h+((e<<26|e>>>6)^(e<<21|e>>>11)^(e<<7|e>>>25))+(e&f^~e&g)+K[i]+W[i];h=g,g=f,f=e,e=d+t1|0,d=c,c=b,b=a,a=t1+(sigma0+maj)|0;}H[0]=H[0]+a|0,H[1]=H[1]+b|0,H[2]=H[2]+c|0,H[3]=H[3]+d|0,H[4]=H[4]+e|0,H[5]=H[5]+f|0,H[6]=H[6]+g|0,H[7]=H[7]+h|0;},_doFinalize:function(){var data=this._data,dataWords=data.words,nBitsTotal=8*this._nDataBytes,nBitsLeft=8*data.sigBytes;return dataWords[nBitsLeft>>>5]|=128<<24-nBitsLeft%32,dataWords[14+(nBitsLeft+64>>>9<<4)]=Math.floor(nBitsTotal/4294967296),dataWords[15+(nBitsLeft+64>>>9<<4)]=nBitsTotal,data.sigBytes=4*dataWords.length,this._process(),this._hash},clone:function(){var clone=Hasher.clone.call(this);return clone._hash=this._hash.clone(),clone}});C.SHA256=Hasher._createHelper(SHA256),C.HmacSHA256=Hasher._createHmacHelper(SHA256);}(Math),CryptoJS.SHA256);}),encBase64=createCommonjsModule(function(module,exports){var CryptoJS,C,WordArray;module.exports=(WordArray=(C=CryptoJS=core).lib.WordArray,C.enc.Base64={stringify:function(wordArray){var words=wordArray.words,sigBytes=wordArray.sigBytes,map=this._map;wordArray.clamp();for(var base64Chars=[],i=0;i<sigBytes;i+=3)for(var triplet=(words[i>>>2]>>>24-i%4*8&255)<<16|(words[i+1>>>2]>>>24-(i+1)%4*8&255)<<8|words[i+2>>>2]>>>24-(i+2)%4*8&255,j=0;j<4&&i+.75*j<sigBytes;j++)base64Chars.push(map.charAt(triplet>>>6*(3-j)&63));var paddingChar=map.charAt(64);if(paddingChar)for(;base64Chars.length%4;)base64Chars.push(paddingChar);return base64Chars.join("")},parse:function(base64Str){var base64StrLength=base64Str.length,map=this._map,reverseMap=this._reverseMap;if(!reverseMap){reverseMap=this._reverseMap=[];for(var j=0;j<map.length;j++)reverseMap[map.charCodeAt(j)]=j;}var paddingChar=map.charAt(64);if(paddingChar){var paddingIndex=base64Str.indexOf(paddingChar);-1!==paddingIndex&&(base64StrLength=paddingIndex);}return function(base64Str,base64StrLength,reverseMap){for(var words=[],nBytes=0,i=0;i<base64StrLength;i++)if(i%4){var bits1=reverseMap[base64Str.charCodeAt(i-1)]<<i%4*2,bits2=reverseMap[base64Str.charCodeAt(i)]>>>6-i%4*2;words[nBytes>>>2]|=(bits1|bits2)<<24-nBytes%4*8,nBytes++;}return WordArray.create(words,nBytes)}(base64Str,base64StrLength,reverseMap)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},CryptoJS.enc.Base64);}),encHex=createCommonjsModule(function(module,exports){module.exports=core.enc.Hex;}),jsbn=createCommonjsModule(function(module,exports){(function(){var dbits;function BigInteger(a,b,c){null!=a&&("number"==typeof a?this.fromNumber(a,b,c):null==b&&"string"!=typeof a?this.fromString(a,256):this.fromString(a,b));}function nbi(){return new BigInteger(null)}var inBrowser="undefined"!=typeof navigator;inBrowser&&"Microsoft Internet Explorer"==navigator.appName?(BigInteger.prototype.am=function(i,x,w,j,c,n){for(var xl=32767&x,xh=x>>15;--n>=0;){var l=32767&this[i],h=this[i++]>>15,m=xh*l+h*xl;c=((l=xl*l+((32767&m)<<15)+w[j]+(1073741823&c))>>>30)+(m>>>15)+xh*h+(c>>>30),w[j++]=1073741823&l;}return c},dbits=30):inBrowser&&"Netscape"!=navigator.appName?(BigInteger.prototype.am=function(i,x,w,j,c,n){for(;--n>=0;){var v=x*this[i++]+w[j]+c;c=Math.floor(v/67108864),w[j++]=67108863&v;}return c},dbits=26):(BigInteger.prototype.am=function(i,x,w,j,c,n){for(var xl=16383&x,xh=x>>14;--n>=0;){var l=16383&this[i],h=this[i++]>>14,m=xh*l+h*xl;c=((l=xl*l+((16383&m)<<14)+w[j]+c)>>28)+(m>>14)+xh*h,w[j++]=268435455&l;}return c},dbits=28),BigInteger.prototype.DB=dbits,BigInteger.prototype.DM=(1<<dbits)-1,BigInteger.prototype.DV=1<<dbits;BigInteger.prototype.FV=Math.pow(2,52),BigInteger.prototype.F1=52-dbits,BigInteger.prototype.F2=2*dbits-52;var rr,vv,BI_RM="0123456789abcdefghijklmnopqrstuvwxyz",BI_RC=new Array;for(rr="0".charCodeAt(0),vv=0;vv<=9;++vv)BI_RC[rr++]=vv;for(rr="a".charCodeAt(0),vv=10;vv<36;++vv)BI_RC[rr++]=vv;for(rr="A".charCodeAt(0),vv=10;vv<36;++vv)BI_RC[rr++]=vv;function int2char(n){return BI_RM.charAt(n)}function intAt(s,i){var c=BI_RC[s.charCodeAt(i)];return null==c?-1:c}function nbv(i){var r=nbi();return r.fromInt(i),r}function nbits(x){var t,r=1;return 0!=(t=x>>>16)&&(x=t,r+=16),0!=(t=x>>8)&&(x=t,r+=8),0!=(t=x>>4)&&(x=t,r+=4),0!=(t=x>>2)&&(x=t,r+=2),0!=(t=x>>1)&&(x=t,r+=1),r}function Classic(m){this.m=m;}function Montgomery(m){this.m=m,this.mp=m.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<m.DB-15)-1,this.mt2=2*m.t;}function op_and(x,y){return x&y}function op_or(x,y){return x|y}function op_xor(x,y){return x^y}function op_andnot(x,y){return x&~y}function lbit(x){if(0==x)return -1;var r=0;return 0==(65535&x)&&(x>>=16,r+=16),0==(255&x)&&(x>>=8,r+=8),0==(15&x)&&(x>>=4,r+=4),0==(3&x)&&(x>>=2,r+=2),0==(1&x)&&++r,r}function cbit(x){for(var r=0;0!=x;)x&=x-1,++r;return r}function NullExp(){}function nNop(x){return x}function Barrett(m){this.r2=nbi(),this.q3=nbi(),BigInteger.ONE.dlShiftTo(2*m.t,this.r2),this.mu=this.r2.divide(m),this.m=m;}Classic.prototype.convert=function(x){return x.s<0||x.compareTo(this.m)>=0?x.mod(this.m):x},Classic.prototype.revert=function(x){return x},Classic.prototype.reduce=function(x){x.divRemTo(this.m,null,x);},Classic.prototype.mulTo=function(x,y,r){x.multiplyTo(y,r),this.reduce(r);},Classic.prototype.sqrTo=function(x,r){x.squareTo(r),this.reduce(r);},Montgomery.prototype.convert=function(x){var r=nbi();return x.abs().dlShiftTo(this.m.t,r),r.divRemTo(this.m,null,r),x.s<0&&r.compareTo(BigInteger.ZERO)>0&&this.m.subTo(r,r),r},Montgomery.prototype.revert=function(x){var r=nbi();return x.copyTo(r),this.reduce(r),r},Montgomery.prototype.reduce=function(x){for(;x.t<=this.mt2;)x[x.t++]=0;for(var i=0;i<this.m.t;++i){var j=32767&x[i],u0=j*this.mpl+((j*this.mph+(x[i]>>15)*this.mpl&this.um)<<15)&x.DM;for(x[j=i+this.m.t]+=this.m.am(0,u0,x,i,0,this.m.t);x[j]>=x.DV;)x[j]-=x.DV,x[++j]++;}x.clamp(),x.drShiftTo(this.m.t,x),x.compareTo(this.m)>=0&&x.subTo(this.m,x);},Montgomery.prototype.mulTo=function(x,y,r){x.multiplyTo(y,r),this.reduce(r);},Montgomery.prototype.sqrTo=function(x,r){x.squareTo(r),this.reduce(r);},BigInteger.prototype.copyTo=function(r){for(var i=this.t-1;i>=0;--i)r[i]=this[i];r.t=this.t,r.s=this.s;},BigInteger.prototype.fromInt=function(x){this.t=1,this.s=x<0?-1:0,x>0?this[0]=x:x<-1?this[0]=x+this.DV:this.t=0;},BigInteger.prototype.fromString=function(s,b){var k;if(16==b)k=4;else if(8==b)k=3;else if(256==b)k=8;else if(2==b)k=1;else if(32==b)k=5;else{if(4!=b)return void this.fromRadix(s,b);k=2;}this.t=0,this.s=0;for(var i=s.length,mi=!1,sh=0;--i>=0;){var x=8==k?255&s[i]:intAt(s,i);x<0?"-"==s.charAt(i)&&(mi=!0):(mi=!1,0==sh?this[this.t++]=x:sh+k>this.DB?(this[this.t-1]|=(x&(1<<this.DB-sh)-1)<<sh,this[this.t++]=x>>this.DB-sh):this[this.t-1]|=x<<sh,(sh+=k)>=this.DB&&(sh-=this.DB));}8==k&&0!=(128&s[0])&&(this.s=-1,sh>0&&(this[this.t-1]|=(1<<this.DB-sh)-1<<sh)),this.clamp(),mi&&BigInteger.ZERO.subTo(this,this);},BigInteger.prototype.clamp=function(){for(var c=this.s&this.DM;this.t>0&&this[this.t-1]==c;)--this.t;},BigInteger.prototype.dlShiftTo=function(n,r){var i;for(i=this.t-1;i>=0;--i)r[i+n]=this[i];for(i=n-1;i>=0;--i)r[i]=0;r.t=this.t+n,r.s=this.s;},BigInteger.prototype.drShiftTo=function(n,r){for(var i=n;i<this.t;++i)r[i-n]=this[i];r.t=Math.max(this.t-n,0),r.s=this.s;},BigInteger.prototype.lShiftTo=function(n,r){var i,bs=n%this.DB,cbs=this.DB-bs,bm=(1<<cbs)-1,ds=Math.floor(n/this.DB),c=this.s<<bs&this.DM;for(i=this.t-1;i>=0;--i)r[i+ds+1]=this[i]>>cbs|c,c=(this[i]&bm)<<bs;for(i=ds-1;i>=0;--i)r[i]=0;r[ds]=c,r.t=this.t+ds+1,r.s=this.s,r.clamp();},BigInteger.prototype.rShiftTo=function(n,r){r.s=this.s;var ds=Math.floor(n/this.DB);if(ds>=this.t)r.t=0;else{var bs=n%this.DB,cbs=this.DB-bs,bm=(1<<bs)-1;r[0]=this[ds]>>bs;for(var i=ds+1;i<this.t;++i)r[i-ds-1]|=(this[i]&bm)<<cbs,r[i-ds]=this[i]>>bs;bs>0&&(r[this.t-ds-1]|=(this.s&bm)<<cbs),r.t=this.t-ds,r.clamp();}},BigInteger.prototype.subTo=function(a,r){for(var i=0,c=0,m=Math.min(a.t,this.t);i<m;)c+=this[i]-a[i],r[i++]=c&this.DM,c>>=this.DB;if(a.t<this.t){for(c-=a.s;i<this.t;)c+=this[i],r[i++]=c&this.DM,c>>=this.DB;c+=this.s;}else{for(c+=this.s;i<a.t;)c-=a[i],r[i++]=c&this.DM,c>>=this.DB;c-=a.s;}r.s=c<0?-1:0,c<-1?r[i++]=this.DV+c:c>0&&(r[i++]=c),r.t=i,r.clamp();},BigInteger.prototype.multiplyTo=function(a,r){var x=this.abs(),y=a.abs(),i=x.t;for(r.t=i+y.t;--i>=0;)r[i]=0;for(i=0;i<y.t;++i)r[i+x.t]=x.am(0,y[i],r,i,0,x.t);r.s=0,r.clamp(),this.s!=a.s&&BigInteger.ZERO.subTo(r,r);},BigInteger.prototype.squareTo=function(r){for(var x=this.abs(),i=r.t=2*x.t;--i>=0;)r[i]=0;for(i=0;i<x.t-1;++i){var c=x.am(i,x[i],r,2*i,0,1);(r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1))>=x.DV&&(r[i+x.t]-=x.DV,r[i+x.t+1]=1);}r.t>0&&(r[r.t-1]+=x.am(i,x[i],r,2*i,0,1)),r.s=0,r.clamp();},BigInteger.prototype.divRemTo=function(m,q,r){var pm=m.abs();if(!(pm.t<=0)){var pt=this.abs();if(pt.t<pm.t)return null!=q&&q.fromInt(0),void(null!=r&&this.copyTo(r));null==r&&(r=nbi());var y=nbi(),ts=this.s,ms=m.s,nsh=this.DB-nbits(pm[pm.t-1]);nsh>0?(pm.lShiftTo(nsh,y),pt.lShiftTo(nsh,r)):(pm.copyTo(y),pt.copyTo(r));var ys=y.t,y0=y[ys-1];if(0!=y0){var yt=y0*(1<<this.F1)+(ys>1?y[ys-2]>>this.F2:0),d1=this.FV/yt,d2=(1<<this.F1)/yt,e=1<<this.F2,i=r.t,j=i-ys,t=null==q?nbi():q;for(y.dlShiftTo(j,t),r.compareTo(t)>=0&&(r[r.t++]=1,r.subTo(t,r)),BigInteger.ONE.dlShiftTo(ys,t),t.subTo(y,y);y.t<ys;)y[y.t++]=0;for(;--j>=0;){var qd=r[--i]==y0?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);if((r[i]+=y.am(0,qd,r,j,0,ys))<qd)for(y.dlShiftTo(j,t),r.subTo(t,r);r[i]<--qd;)r.subTo(t,r);}null!=q&&(r.drShiftTo(ys,q),ts!=ms&&BigInteger.ZERO.subTo(q,q)),r.t=ys,r.clamp(),nsh>0&&r.rShiftTo(nsh,r),ts<0&&BigInteger.ZERO.subTo(r,r);}}},BigInteger.prototype.invDigit=function(){if(this.t<1)return 0;var x=this[0];if(0==(1&x))return 0;var y=3&x;return (y=(y=(y=(y=y*(2-(15&x)*y)&15)*(2-(255&x)*y)&255)*(2-((65535&x)*y&65535))&65535)*(2-x*y%this.DV)%this.DV)>0?this.DV-y:-y},BigInteger.prototype.isEven=function(){return 0==(this.t>0?1&this[0]:this.s)},BigInteger.prototype.exp=function(e,z){if(e>4294967295||e<1)return BigInteger.ONE;var r=nbi(),r2=nbi(),g=z.convert(this),i=nbits(e)-1;for(g.copyTo(r);--i>=0;)if(z.sqrTo(r,r2),(e&1<<i)>0)z.mulTo(r2,g,r);else{var t=r;r=r2,r2=t;}return z.revert(r)},BigInteger.prototype.toString=function(b){if(this.s<0)return "-"+this.negate().toString(b);var k;if(16==b)k=4;else if(8==b)k=3;else if(2==b)k=1;else if(32==b)k=5;else{if(4!=b)return this.toRadix(b);k=2;}var d,km=(1<<k)-1,m=!1,r="",i=this.t,p=this.DB-i*this.DB%k;if(i-- >0)for(p<this.DB&&(d=this[i]>>p)>0&&(m=!0,r=int2char(d));i>=0;)p<k?(d=(this[i]&(1<<p)-1)<<k-p,d|=this[--i]>>(p+=this.DB-k)):(d=this[i]>>(p-=k)&km,p<=0&&(p+=this.DB,--i)),d>0&&(m=!0),m&&(r+=int2char(d));return m?r:"0"},BigInteger.prototype.negate=function(){var r=nbi();return BigInteger.ZERO.subTo(this,r),r},BigInteger.prototype.abs=function(){return this.s<0?this.negate():this},BigInteger.prototype.compareTo=function(a){var r=this.s-a.s;if(0!=r)return r;var i=this.t;if(0!=(r=i-a.t))return this.s<0?-r:r;for(;--i>=0;)if(0!=(r=this[i]-a[i]))return r;return 0},BigInteger.prototype.bitLength=function(){return this.t<=0?0:this.DB*(this.t-1)+nbits(this[this.t-1]^this.s&this.DM)},BigInteger.prototype.mod=function(a){var r=nbi();return this.abs().divRemTo(a,null,r),this.s<0&&r.compareTo(BigInteger.ZERO)>0&&a.subTo(r,r),r},BigInteger.prototype.modPowInt=function(e,m){var z;return z=e<256||m.isEven()?new Classic(m):new Montgomery(m),this.exp(e,z)},BigInteger.ZERO=nbv(0),BigInteger.ONE=nbv(1),NullExp.prototype.convert=nNop,NullExp.prototype.revert=nNop,NullExp.prototype.mulTo=function(x,y,r){x.multiplyTo(y,r);},NullExp.prototype.sqrTo=function(x,r){x.squareTo(r);},Barrett.prototype.convert=function(x){if(x.s<0||x.t>2*this.m.t)return x.mod(this.m);if(x.compareTo(this.m)<0)return x;var r=nbi();return x.copyTo(r),this.reduce(r),r},Barrett.prototype.revert=function(x){return x},Barrett.prototype.reduce=function(x){for(x.drShiftTo(this.m.t-1,this.r2),x.t>this.m.t+1&&(x.t=this.m.t+1,x.clamp()),this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3),this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);x.compareTo(this.r2)<0;)x.dAddOffset(1,this.m.t+1);for(x.subTo(this.r2,x);x.compareTo(this.m)>=0;)x.subTo(this.m,x);},Barrett.prototype.mulTo=function(x,y,r){x.multiplyTo(y,r),this.reduce(r);},Barrett.prototype.sqrTo=function(x,r){x.squareTo(r),this.reduce(r);};var rng_state,rng_pool,rng_pptr,lowprimes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997],lplim=(1<<26)/lowprimes[lowprimes.length-1];function rng_seed_time(){var x;x=(new Date).getTime(),rng_pool[rng_pptr++]^=255&x,rng_pool[rng_pptr++]^=x>>8&255,rng_pool[rng_pptr++]^=x>>16&255,rng_pool[rng_pptr++]^=x>>24&255,rng_pptr>=rng_psize&&(rng_pptr-=rng_psize);}if(BigInteger.prototype.chunkSize=function(r){return Math.floor(Math.LN2*this.DB/Math.log(r))},BigInteger.prototype.toRadix=function(b){if(null==b&&(b=10),0==this.signum()||b<2||b>36)return "0";var cs=this.chunkSize(b),a=Math.pow(b,cs),d=nbv(a),y=nbi(),z=nbi(),r="";for(this.divRemTo(d,y,z);y.signum()>0;)r=(a+z.intValue()).toString(b).substr(1)+r,y.divRemTo(d,y,z);return z.intValue().toString(b)+r},BigInteger.prototype.fromRadix=function(s,b){this.fromInt(0),null==b&&(b=10);for(var cs=this.chunkSize(b),d=Math.pow(b,cs),mi=!1,j=0,w=0,i=0;i<s.length;++i){var x=intAt(s,i);x<0?"-"==s.charAt(i)&&0==this.signum()&&(mi=!0):(w=b*w+x,++j>=cs&&(this.dMultiply(d),this.dAddOffset(w,0),j=0,w=0));}j>0&&(this.dMultiply(Math.pow(b,j)),this.dAddOffset(w,0)),mi&&BigInteger.ZERO.subTo(this,this);},BigInteger.prototype.fromNumber=function(a,b,c){if("number"==typeof b)if(a<2)this.fromInt(1);else for(this.fromNumber(a,c),this.testBit(a-1)||this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this),this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(b);)this.dAddOffset(2,0),this.bitLength()>a&&this.subTo(BigInteger.ONE.shiftLeft(a-1),this);else{var x=new Array,t=7&a;x.length=1+(a>>3),b.nextBytes(x),t>0?x[0]&=(1<<t)-1:x[0]=0,this.fromString(x,256);}},BigInteger.prototype.bitwiseTo=function(a,op,r){var i,f,m=Math.min(a.t,this.t);for(i=0;i<m;++i)r[i]=op(this[i],a[i]);if(a.t<this.t){for(f=a.s&this.DM,i=m;i<this.t;++i)r[i]=op(this[i],f);r.t=this.t;}else{for(f=this.s&this.DM,i=m;i<a.t;++i)r[i]=op(f,a[i]);r.t=a.t;}r.s=op(this.s,a.s),r.clamp();},BigInteger.prototype.changeBit=function(n,op){var r=BigInteger.ONE.shiftLeft(n);return this.bitwiseTo(r,op,r),r},BigInteger.prototype.addTo=function(a,r){for(var i=0,c=0,m=Math.min(a.t,this.t);i<m;)c+=this[i]+a[i],r[i++]=c&this.DM,c>>=this.DB;if(a.t<this.t){for(c+=a.s;i<this.t;)c+=this[i],r[i++]=c&this.DM,c>>=this.DB;c+=this.s;}else{for(c+=this.s;i<a.t;)c+=a[i],r[i++]=c&this.DM,c>>=this.DB;c+=a.s;}r.s=c<0?-1:0,c>0?r[i++]=c:c<-1&&(r[i++]=this.DV+c),r.t=i,r.clamp();},BigInteger.prototype.dMultiply=function(n){this[this.t]=this.am(0,n-1,this,0,0,this.t),++this.t,this.clamp();},BigInteger.prototype.dAddOffset=function(n,w){if(0!=n){for(;this.t<=w;)this[this.t++]=0;for(this[w]+=n;this[w]>=this.DV;)this[w]-=this.DV,++w>=this.t&&(this[this.t++]=0),++this[w];}},BigInteger.prototype.multiplyLowerTo=function(a,n,r){var j,i=Math.min(this.t+a.t,n);for(r.s=0,r.t=i;i>0;)r[--i]=0;for(j=r.t-this.t;i<j;++i)r[i+this.t]=this.am(0,a[i],r,i,0,this.t);for(j=Math.min(a.t,n);i<j;++i)this.am(0,a[i],r,i,0,n-i);r.clamp();},BigInteger.prototype.multiplyUpperTo=function(a,n,r){--n;var i=r.t=this.t+a.t-n;for(r.s=0;--i>=0;)r[i]=0;for(i=Math.max(n-this.t,0);i<a.t;++i)r[this.t+i-n]=this.am(n-i,a[i],r,0,0,this.t+i-n);r.clamp(),r.drShiftTo(1,r);},BigInteger.prototype.modInt=function(n){if(n<=0)return 0;var d=this.DV%n,r=this.s<0?n-1:0;if(this.t>0)if(0==d)r=this[0]%n;else for(var i=this.t-1;i>=0;--i)r=(d*r+this[i])%n;return r},BigInteger.prototype.millerRabin=function(t){var n1=this.subtract(BigInteger.ONE),k=n1.getLowestSetBit();if(k<=0)return !1;var r=n1.shiftRight(k);(t=t+1>>1)>lowprimes.length&&(t=lowprimes.length);for(var a=nbi(),i=0;i<t;++i){a.fromInt(lowprimes[Math.floor(Math.random()*lowprimes.length)]);var y=a.modPow(r,this);if(0!=y.compareTo(BigInteger.ONE)&&0!=y.compareTo(n1)){for(var j=1;j++<k&&0!=y.compareTo(n1);)if(0==(y=y.modPowInt(2,this)).compareTo(BigInteger.ONE))return !1;if(0!=y.compareTo(n1))return !1}}return !0},BigInteger.prototype.clone=function(){var r=nbi();return this.copyTo(r),r},BigInteger.prototype.intValue=function(){if(this.s<0){if(1==this.t)return this[0]-this.DV;if(0==this.t)return -1}else{if(1==this.t)return this[0];if(0==this.t)return 0}return (this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]},BigInteger.prototype.byteValue=function(){return 0==this.t?this.s:this[0]<<24>>24},BigInteger.prototype.shortValue=function(){return 0==this.t?this.s:this[0]<<16>>16},BigInteger.prototype.signum=function(){return this.s<0?-1:this.t<=0||1==this.t&&this[0]<=0?0:1},BigInteger.prototype.toByteArray=function(){var i=this.t,r=new Array;r[0]=this.s;var d,p=this.DB-i*this.DB%8,k=0;if(i-- >0)for(p<this.DB&&(d=this[i]>>p)!=(this.s&this.DM)>>p&&(r[k++]=d|this.s<<this.DB-p);i>=0;)p<8?(d=(this[i]&(1<<p)-1)<<8-p,d|=this[--i]>>(p+=this.DB-8)):(d=this[i]>>(p-=8)&255,p<=0&&(p+=this.DB,--i)),0!=(128&d)&&(d|=-256),0==k&&(128&this.s)!=(128&d)&&++k,(k>0||d!=this.s)&&(r[k++]=d);return r},BigInteger.prototype.equals=function(a){return 0==this.compareTo(a)},BigInteger.prototype.min=function(a){return this.compareTo(a)<0?this:a},BigInteger.prototype.max=function(a){return this.compareTo(a)>0?this:a},BigInteger.prototype.and=function(a){var r=nbi();return this.bitwiseTo(a,op_and,r),r},BigInteger.prototype.or=function(a){var r=nbi();return this.bitwiseTo(a,op_or,r),r},BigInteger.prototype.xor=function(a){var r=nbi();return this.bitwiseTo(a,op_xor,r),r},BigInteger.prototype.andNot=function(a){var r=nbi();return this.bitwiseTo(a,op_andnot,r),r},BigInteger.prototype.not=function(){for(var r=nbi(),i=0;i<this.t;++i)r[i]=this.DM&~this[i];return r.t=this.t,r.s=~this.s,r},BigInteger.prototype.shiftLeft=function(n){var r=nbi();return n<0?this.rShiftTo(-n,r):this.lShiftTo(n,r),r},BigInteger.prototype.shiftRight=function(n){var r=nbi();return n<0?this.lShiftTo(-n,r):this.rShiftTo(n,r),r},BigInteger.prototype.getLowestSetBit=function(){for(var i=0;i<this.t;++i)if(0!=this[i])return i*this.DB+lbit(this[i]);return this.s<0?this.t*this.DB:-1},BigInteger.prototype.bitCount=function(){for(var r=0,x=this.s&this.DM,i=0;i<this.t;++i)r+=cbit(this[i]^x);return r},BigInteger.prototype.testBit=function(n){var j=Math.floor(n/this.DB);return j>=this.t?0!=this.s:0!=(this[j]&1<<n%this.DB)},BigInteger.prototype.setBit=function(n){return this.changeBit(n,op_or)},BigInteger.prototype.clearBit=function(n){return this.changeBit(n,op_andnot)},BigInteger.prototype.flipBit=function(n){return this.changeBit(n,op_xor)},BigInteger.prototype.add=function(a){var r=nbi();return this.addTo(a,r),r},BigInteger.prototype.subtract=function(a){var r=nbi();return this.subTo(a,r),r},BigInteger.prototype.multiply=function(a){var r=nbi();return this.multiplyTo(a,r),r},BigInteger.prototype.divide=function(a){var r=nbi();return this.divRemTo(a,r,null),r},BigInteger.prototype.remainder=function(a){var r=nbi();return this.divRemTo(a,null,r),r},BigInteger.prototype.divideAndRemainder=function(a){var q=nbi(),r=nbi();return this.divRemTo(a,q,r),new Array(q,r)},BigInteger.prototype.modPow=function(e,m){var k,z,i=e.bitLength(),r=nbv(1);if(i<=0)return r;k=i<18?1:i<48?3:i<144?4:i<768?5:6,z=i<8?new Classic(m):m.isEven()?new Barrett(m):new Montgomery(m);var g=new Array,n=3,k1=k-1,km=(1<<k)-1;if(g[1]=z.convert(this),k>1){var g2=nbi();for(z.sqrTo(g[1],g2);n<=km;)g[n]=nbi(),z.mulTo(g2,g[n-2],g[n]),n+=2;}var w,t,j=e.t-1,is1=!0,r2=nbi();for(i=nbits(e[j])-1;j>=0;){for(i>=k1?w=e[j]>>i-k1&km:(w=(e[j]&(1<<i+1)-1)<<k1-i,j>0&&(w|=e[j-1]>>this.DB+i-k1)),n=k;0==(1&w);)w>>=1,--n;if((i-=n)<0&&(i+=this.DB,--j),is1)g[w].copyTo(r),is1=!1;else{for(;n>1;)z.sqrTo(r,r2),z.sqrTo(r2,r),n-=2;n>0?z.sqrTo(r,r2):(t=r,r=r2,r2=t),z.mulTo(r2,g[w],r);}for(;j>=0&&0==(e[j]&1<<i);)z.sqrTo(r,r2),t=r,r=r2,r2=t,--i<0&&(i=this.DB-1,--j);}return z.revert(r)},BigInteger.prototype.modInverse=function(m){var ac=m.isEven();if(this.isEven()&&ac||0==m.signum())return BigInteger.ZERO;for(var u=m.clone(),v=this.clone(),a=nbv(1),b=nbv(0),c=nbv(0),d=nbv(1);0!=u.signum();){for(;u.isEven();)u.rShiftTo(1,u),ac?(a.isEven()&&b.isEven()||(a.addTo(this,a),b.subTo(m,b)),a.rShiftTo(1,a)):b.isEven()||b.subTo(m,b),b.rShiftTo(1,b);for(;v.isEven();)v.rShiftTo(1,v),ac?(c.isEven()&&d.isEven()||(c.addTo(this,c),d.subTo(m,d)),c.rShiftTo(1,c)):d.isEven()||d.subTo(m,d),d.rShiftTo(1,d);u.compareTo(v)>=0?(u.subTo(v,u),ac&&a.subTo(c,a),b.subTo(d,b)):(v.subTo(u,v),ac&&c.subTo(a,c),d.subTo(b,d));}return 0!=v.compareTo(BigInteger.ONE)?BigInteger.ZERO:d.compareTo(m)>=0?d.subtract(m):d.signum()<0?(d.addTo(m,d),d.signum()<0?d.add(m):d):d},BigInteger.prototype.pow=function(e){return this.exp(e,new NullExp)},BigInteger.prototype.gcd=function(a){var x=this.s<0?this.negate():this.clone(),y=a.s<0?a.negate():a.clone();if(x.compareTo(y)<0){var t=x;x=y,y=t;}var i=x.getLowestSetBit(),g=y.getLowestSetBit();if(g<0)return x;for(i<g&&(g=i),g>0&&(x.rShiftTo(g,x),y.rShiftTo(g,y));x.signum()>0;)(i=x.getLowestSetBit())>0&&x.rShiftTo(i,x),(i=y.getLowestSetBit())>0&&y.rShiftTo(i,y),x.compareTo(y)>=0?(x.subTo(y,x),x.rShiftTo(1,x)):(y.subTo(x,y),y.rShiftTo(1,y));return g>0&&y.lShiftTo(g,y),y},BigInteger.prototype.isProbablePrime=function(t){var i,x=this.abs();if(1==x.t&&x[0]<=lowprimes[lowprimes.length-1]){for(i=0;i<lowprimes.length;++i)if(x[0]==lowprimes[i])return !0;return !1}if(x.isEven())return !1;for(i=1;i<lowprimes.length;){for(var m=lowprimes[i],j=i+1;j<lowprimes.length&&m<lplim;)m*=lowprimes[j++];for(m=x.modInt(m);i<j;)if(m%lowprimes[i++]==0)return !1}return x.millerRabin(t)},BigInteger.prototype.square=function(){var r=nbi();return this.squareTo(r),r},BigInteger.prototype.Barrett=Barrett,null==rng_pool){var t;if(rng_pool=new Array,rng_pptr=0,"undefined"!=typeof window&&window.crypto)if(window.crypto.getRandomValues){var ua=new Uint8Array(32);for(window.crypto.getRandomValues(ua),t=0;t<32;++t)rng_pool[rng_pptr++]=ua[t];}else if("Netscape"==navigator.appName&&navigator.appVersion<"5"){var z=window.crypto.random(32);for(t=0;t<z.length;++t)rng_pool[rng_pptr++]=255&z.charCodeAt(t);}for(;rng_pptr<rng_psize;)t=Math.floor(65536*Math.random()),rng_pool[rng_pptr++]=t>>>8,rng_pool[rng_pptr++]=255&t;rng_pptr=0,rng_seed_time();}function rng_get_byte(){if(null==rng_state){for(rng_seed_time(),(rng_state=new Arcfour).init(rng_pool),rng_pptr=0;rng_pptr<rng_pool.length;++rng_pptr)rng_pool[rng_pptr]=0;rng_pptr=0;}return rng_state.next()}function SecureRandom(){}function Arcfour(){this.i=0,this.j=0,this.S=new Array;}SecureRandom.prototype.nextBytes=function(ba){var i;for(i=0;i<ba.length;++i)ba[i]=rng_get_byte();},Arcfour.prototype.init=function(key){var i,j,t;for(i=0;i<256;++i)this.S[i]=i;for(j=0,i=0;i<256;++i)j=j+this.S[i]+key[i%key.length]&255,t=this.S[i],this.S[i]=this.S[j],this.S[j]=t;this.i=0,this.j=0;},Arcfour.prototype.next=function(){var t;return this.i=this.i+1&255,this.j=this.j+this.S[this.i]&255,t=this.S[this.i],this.S[this.i]=this.S[this.j],this.S[this.j]=t,this.S[t+this.S[this.i]&255]};var rng_psize=256;BigInteger.SecureRandom=SecureRandom,BigInteger.BigInteger=BigInteger,module.exports=BigInteger;}).call(commonjsGlobal);}),BigInteger=jsbn.BigInteger,DigestInfoHead={sha1:"3021300906052b0e03021a05000414",sha224:"302d300d06096086480165030402040500041c",sha256:"3031300d060960864801650304020105000420",sha384:"3041300d060960864801650304020205000430",sha512:"3051300d060960864801650304020305000440",md2:"3020300c06082a864886f70d020205000410",md5:"3020300c06082a864886f70d020505000410",ripemd160:"3021300906052b2403020105000414"},DigestAlgs={sha256:sha256};function RSAVerifier(modulus,exp){if(this.n=null,this.e=0,!(null!=modulus&&null!=exp&&modulus.length>0&&exp.length>0))throw new Error("Invalid key data");this.n=new BigInteger(modulus,16),this.e=parseInt(exp,16);}function getAlgorithmFromDigest(hDigestInfo){for(var algName in DigestInfoHead){var head=DigestInfoHead[algName],len=head.length;if(hDigestInfo.substring(0,len)===head)return {alg:algName,hash:hDigestInfo.substring(len)}}return []}RSAVerifier.prototype.verify=function(msg,encsig){encsig=encsig.replace(/[^0-9a-f]|[\s\n]]/gi,"");var sig=new BigInteger(encsig,16);if(sig.bitLength()>this.n.bitLength())throw new Error("Signature does not match with the key modulus.");var digestInfo=getAlgorithmFromDigest(sig.modPowInt(this.e,this.n).toString(16).replace(/^1f+00/,""));if(0===digestInfo.length)return !1;if(!DigestAlgs.hasOwnProperty(digestInfo.alg))throw new Error("Hashing algorithm is not supported.");var msgHash=DigestAlgs[digestInfo.alg](msg).toString();return digestInfo.hash===msgHash};var rsaVerifier=RSAVerifier;function padding$1(str){var mod=str.length%4;return 0===mod?str:str+new Array(1+(4-mod)).join("=")}function byteArrayToString$1(array){for(var result="",i=0;i<array.length;i++)result+=String.fromCharCode(array[i]);return result}function stringToByteArray$1(str){for(var arr=new Array(str.length),a=0;a<str.length;a++)arr[a]=str.charCodeAt(a);return arr}function byteArrayToHex(raw){for(var HEX="",i=0;i<raw.length;i++){var _hex=raw[i].toString(16);HEX+=2===_hex.length?_hex:"0"+_hex;}return HEX}function encodeString(str){return base64Js.fromByteArray(stringToByteArray$1(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,function(match,p1){return String.fromCharCode("0x"+p1)}))).replace(/\+/g,"-").replace(/\//g,"_")}function decodeToString(str){return str=padding$1(str).replace(/\-/g,"+").replace(/_/g,"/"),decodeURIComponent(byteArrayToString$1(base64Js.toByteArray(str)).split("").map(function(c){return "%"+("00"+c.charCodeAt(0).toString(16)).slice(-2)}).join(""))}function decodeToHEX(str){return byteArrayToHex(base64Js.toByteArray(padding$1(str)))}function base64ToBase64Url(base64String){var SAFE_URL_ENCODING_MAPPING={"+":"-","/":"_","=":""};return base64String.replace(/[+\/=]/g,function(m){return SAFE_URL_ENCODING_MAPPING[m]})}var base64_1={encodeString:encodeString,decodeToString:decodeToString,byteArrayToString:byteArrayToString$1,stringToByteArray:stringToByteArray$1,padding:padding$1,byteArrayToHex:byteArrayToHex,decodeToHEX:decodeToHEX,base64ToBase64Url:base64ToBase64Url},urlJoin$1=createCommonjsModule(function(module){var context,definition;context=commonjsGlobal,definition=function(){return function(){var input=arguments;"object"==typeof arguments[0]&&(input=arguments[0],arguments[1]);var joined=[].slice.call(input,0).join("/");return joined.replace(/:\//g,"://").replace(/([^:\s])\/+/g,"$1/").replace(/\/(\?|&|#[^!])/g,"$1").replace(/(\?.+)\?/g,"$1&")}},module.exports?module.exports=definition():context.urljoin=definition();});function process(jwks){return {modulus:base64_1.decodeToHEX(jwks.n),exp:base64_1.decodeToHEX(jwks.e)}}function getJWKS(options,cb){var url=options.jwksURI||urlJoin$1(options.iss,".well-known","jwks.json");return client.get(url).end(function(err,data){var a,key,matchingKey=null;if(err)return cb(err);for(a=0;a<data.body.keys.length&&null===matchingKey;a++)(key=data.body.keys[a]).kid===options.kid&&(matchingKey=key);return cb(null,process(matchingKey))})}var jwks={process:process,getJWKS:getJWKS};function ConfigurationError(message){this.name="ConfigurationError",this.message=message||"";}function TokenValidationError(message){this.name="TokenValidationError",this.message=message||"";}ConfigurationError.prototype=Error.prototype,TokenValidationError.prototype=Error.prototype;var error$1={ConfigurationError:ConfigurationError,TokenValidationError:TokenValidationError};function DummyCache(){}DummyCache.prototype.get=function(){return null},DummyCache.prototype.has=function(){return !1},DummyCache.prototype.set=function(){};var dummyCache=DummyCache,supportedAlgs=["RS256"];function IdTokenVerifier(parameters){var options=parameters||{};if(this.jwksCache=options.jwksCache||new dummyCache,this.expectedAlg=options.expectedAlg||"RS256",this.issuer=options.issuer,this.audience=options.audience,this.leeway=options.leeway||0,this.__disableExpirationCheck=options.__disableExpirationCheck||!1,this.jwksURI=options.jwksURI,this.leeway<0||this.leeway>60)throw new error$1.ConfigurationError("The leeway should be positive and lower than a minute.");if(-1===supportedAlgs.indexOf(this.expectedAlg))throw new error$1.ConfigurationError("Algorithm "+this.expectedAlg+" is not supported. (Expected algs: ["+supportedAlgs.join(",")+"])")}IdTokenVerifier.prototype.verify=function(token,nonce,cb){var jwt=this.decode(token);if(jwt instanceof Error)return cb(jwt,!1);var headAndPayload=jwt.encoded.header+"."+jwt.encoded.payload,signature=base64_1.decodeToHEX(jwt.encoded.signature),alg=jwt.header.alg,kid=jwt.header.kid,aud=jwt.payload.aud,iss=jwt.payload.iss,exp=jwt.payload.exp,nbf=jwt.payload.nbf,tnonce=jwt.payload.nonce||null;if(this.issuer!==iss)return cb(new error$1.TokenValidationError("Issuer "+iss+" is not valid."),!1);if(this.audience!==aud)return cb(new error$1.TokenValidationError("Audience "+aud+" is not valid."),!1);if(this.expectedAlg!==alg)return cb(new error$1.TokenValidationError("Algorithm "+alg+" is not supported. (Expected algs: ["+supportedAlgs.join(",")+"])"),!1);if(tnonce!==nonce)return cb(new error$1.TokenValidationError("Nonce does not match."),!1);var expirationError=this.verifyExpAndNbf(exp,nbf);return expirationError?cb(expirationError,!1):this.getRsaVerifier(iss,kid,function(err,rsaVerifier$$1){return err?cb(err):rsaVerifier$$1.verify(headAndPayload,signature)?cb(null,jwt.payload):cb(new error$1.TokenValidationError("Invalid signature."))})},IdTokenVerifier.prototype.verifyExpAndNbf=function(exp,nbf){var now=new Date,expDate=new Date(0),nbfDate=new Date(0);return this.__disableExpirationCheck?null:(expDate.setUTCSeconds(exp+this.leeway),now>expDate?new error$1.TokenValidationError("Expired token."):void 0===nbf?null:(nbfDate.setUTCSeconds(nbf-this.leeway),now<nbfDate?new error$1.TokenValidationError("The token is not valid until later in the future. Please check your computed clock."):null))},IdTokenVerifier.prototype.verifyExpAndIat=function(exp,iat){var now=new Date,expDate=new Date(0),iatDate=new Date(0);return this.__disableExpirationCheck?null:(expDate.setUTCSeconds(exp+this.leeway),now>expDate?new error$1.TokenValidationError("Expired token."):(iatDate.setUTCSeconds(iat-this.leeway),now<iatDate?new error$1.TokenValidationError("The token was issued in the future. Please check your computed clock."):null))},IdTokenVerifier.prototype.getRsaVerifier=function(iss,kid,cb){var _this=this,cachekey=iss+kid;if(this.jwksCache.has(cachekey)){var keyInfo=this.jwksCache.get(cachekey);cb(null,new rsaVerifier(keyInfo.modulus,keyInfo.exp));}else jwks.getJWKS({jwksURI:this.jwksURI,iss:iss,kid:kid},function(err,keyInfo){return err?cb(err):(_this.jwksCache.set(cachekey,keyInfo),cb(null,new rsaVerifier(keyInfo.modulus,keyInfo.exp)))});},IdTokenVerifier.prototype.decode=function(token){var header,payload,parts=token.split(".");if(3!==parts.length)return new error$1.TokenValidationError("Cannot decode a malformed JWT");try{header=JSON.parse(base64_1.decodeToString(parts[0])),payload=JSON.parse(base64_1.decodeToString(parts[1]));}catch(e){return new error$1.TokenValidationError("Token header or payload is not valid JSON")}return {header:header,payload:payload,encoded:{header:parts[0],payload:parts[1],signature:parts[2]}}},IdTokenVerifier.prototype.validateAccessToken=function(accessToken,alg,atHash,cb){if(this.expectedAlg!==alg)return cb(new error$1.TokenValidationError("Algorithm "+alg+" is not supported. (Expected alg: "+this.expectedAlg+")"));var sha256AccessToken=sha256(accessToken),hashToHex=encHex.stringify(sha256AccessToken),hashToHexFirstHalf=hashToHex.substring(0,hashToHex.length/2),hashFirstHalfWordArray=encHex.parse(hashToHexFirstHalf),hashFirstHalfBase64=encBase64.stringify(hashFirstHalfWordArray);return cb(base64_1.base64ToBase64Url(hashFirstHalfBase64)!==atHash?new error$1.TokenValidationError("Invalid access_token"):null)};var src=IdTokenVerifier;function PluginHandler(webAuth,plugins){this.plugins=plugins;for(var a=0;a<this.plugins.length;a++){if(this.plugins[a].version!==version.raw){var pluginName="";throw this.plugins[a].constructor&&this.plugins[a].constructor.name&&(pluginName=this.plugins[a].constructor.name),new Error("Plugin "+pluginName+" version ("+this.plugins[a].version+") is not compatible with the SDK version ("+version.raw+")")}this.plugins[a].setWebAuth(webAuth);}}function randomString(length){var bytes=new Uint8Array(length),result=[],charset="0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~",cryptoObj=windowHandler.getWindow().crypto||windowHandler.getWindow().msCrypto;if(!cryptoObj)return null;for(var random=cryptoObj.getRandomValues(bytes),a=0;a<random.length;a++)result.push(charset[random[a]%charset.length]);return result.join("")}PluginHandler.prototype.get=function(extensibilityPoint){for(var a=0;a<this.plugins.length;a++)if(this.plugins[a].supports(extensibilityPoint))return this.plugins[a].init();return null};var random={randomString:randomString},MINUTES_15=1/96,MINUTES_30=1/48,DEFAULT_NAMESPACE="com.auth0.auth.";function TransactionManager(options){var transaction=options.transaction||{};this.namespace=transaction.namespace||DEFAULT_NAMESPACE,this.keyLength=transaction.keyLength||32,this.storage=new Storage(options),this.options=options;}function IframeHandler(options){if(this.url=options.url,this.callback=options.callback,this.timeout=options.timeout||6e4,this.timeoutCallback=options.timeoutCallback||null,this.eventListenerType=options.eventListenerType||"message",this.iframe=null,this.timeoutHandle=null,this._destroyTimeout=null,this.transientMessageEventListener=null,this.proxyEventListener=null,this.eventValidator=options.eventValidator||{isValid:function(){return !0}},"function"!=typeof this.callback)throw new Error("options.callback must be a function")}function runWebMessageFlow(authorizeUrl,options,callback){new IframeHandler({url:authorizeUrl,eventListenerType:"message",callback:function(eventData){callback(null,eventData);},timeout:options.timeout,eventValidator:{isValid:function(eventData){return "authorization_response"===eventData.event.data.type&&options.state===eventData.event.data.response.state}},timeoutCallback:function(){callback({error:"timeout",error_description:"Timeout during executing web_message communication",state:options.state});}}).init();}function WebMessageHandler(webAuth){this.webAuth=webAuth,this.warn=new Warn(webAuth.baseOptions);}function CrossOriginAuthentication(webAuth,options){this.webAuth=webAuth,this.baseOptions=options,this.request=new RequestBuilder(options),this.webMessageHandler=new WebMessageHandler(webAuth),this.storage=new Storage(options);}function getFragment(name){var parts=("&"+windowHandler.getWindow().location.hash.substring(1)).split("&"+name+"=");if(2===parts.length)return parts.pop().split("&").shift()}function createKey(origin,coId){return ["co/verifier",encodeURIComponent(origin),encodeURIComponent(coId)].join("/")}function tryGetVerifier(storage,key){try{var verifier=storage.getItem(key);return storage.removeItem(key),verifier||""}catch(e){return ""}}function Redirect(auth0,options){this.webAuth=auth0,this.baseOptions=options,this.crossOriginAuthentication=new CrossOriginAuthentication(auth0,this.baseOptions),this.warn=new Warn({disableWarnings:!!options._disableDeprecationWarnings});}TransactionManager.prototype.process=function(options){if(!options.responseType)throw new Error("responseType is required");var lastUsedConnection=options.realm||options.connection,responseTypeIncludesIdToken=-1!==options.responseType.indexOf("id_token"),transaction=this.generateTransaction(options.appState,options.state,options.nonce,lastUsedConnection,responseTypeIncludesIdToken);return options.state||(options.state=transaction.state),responseTypeIncludesIdToken&&!options.nonce&&(options.nonce=transaction.nonce),options},TransactionManager.prototype.generateTransaction=function(appState,state,nonce,lastUsedConnection,generateNonce){return state=state||random.randomString(this.keyLength),nonce=nonce||(generateNonce?random.randomString(this.keyLength):null),windowHandler.getWindow().location.host===this.options.domain||this.storage.setItem(this.namespace+state,{nonce:nonce,appState:appState,state:state,lastUsedConnection:lastUsedConnection},{expires:MINUTES_30}),{state:state,nonce:nonce}},TransactionManager.prototype.getStoredTransaction=function(state){var transactionData;return transactionData=this.storage.getItem(this.namespace+state),this.clearTransaction(state),transactionData},TransactionManager.prototype.clearTransaction=function(state){this.storage.removeItem(this.namespace+state);},IframeHandler.prototype.init=function(){var _this=this,_window=windowHandler.getWindow();switch(this.iframe=_window.document.createElement("iframe"),this.iframe.style.display="none",this.proxyEventListener=function(e){_this.eventListener(e);},this.eventListenerType){case"message":this.eventSourceObject=_window;break;case"load":this.eventSourceObject=this.iframe;break;default:throw new Error("Unsupported event listener type: "+this.eventListenerType)}this.eventSourceObject.addEventListener(this.eventListenerType,this.proxyEventListener,!1),_window.document.body.appendChild(this.iframe),this.iframe.src=this.url,this.timeoutHandle=setTimeout(function(){_this.timeoutHandler();},this.timeout);},IframeHandler.prototype.eventListener=function(event){var eventData={event:event,sourceObject:this.eventSourceObject};this.eventValidator.isValid(eventData)&&(this.destroy(),this.callback(eventData));},IframeHandler.prototype.timeoutHandler=function(){this.destroy(),this.timeoutCallback&&this.timeoutCallback();},IframeHandler.prototype.destroy=function(){var _this=this;clearTimeout(this.timeoutHandle),this._destroyTimeout=setTimeout(function(){_this.eventSourceObject.removeEventListener(_this.eventListenerType,_this.proxyEventListener,!1),_this.iframe.parentNode&&_this.iframe.parentNode.removeChild(_this.iframe);},0);},WebMessageHandler.prototype.run=function(options,cb){var _this=this;options.responseMode="web_message",options.prompt="none";var currentOrigin=windowHandler.getOrigin(),redirectUriOrigin=objectHelper.getOriginFromUrl(options.redirectUri);if(redirectUriOrigin&&currentOrigin!==redirectUriOrigin)return cb({error:"origin_mismatch",error_description:"The redirectUri's origin ("+redirectUriOrigin+") should match the window's origin ("+currentOrigin+")."});runWebMessageFlow(this.webAuth.client.buildAuthorizeUrl(options),options,function(err,eventData){var error=err;if(!err&&eventData.event.data.response.error&&(error=eventData.event.data.response),!error){var parsedHash=eventData.event.data.response;return _this.webAuth.validateAuthenticationResponse(options,parsedHash,cb)}return "consent_required"===error.error&&"localhost"===windowHandler.getWindow().location.hostname&&_this.warn.warning("Consent Required. Consent can't be skipped on localhost. Read more here: https://auth0.com/docs/api-auth/user-consent#skipping-consent-for-first-party-clients"),_this.webAuth.transactionManager.clearTransaction(error.state),cb(objectHelper.pick(error,["error","error_description"]))});},CrossOriginAuthentication.prototype.login=function(options,cb){var _this=this,url=urlJoin(this.baseOptions.rootUrl,"/co/authenticate");options.username=options.username||options.email,delete options.email;var authenticateBody={client_id:options.clientID||this.baseOptions.clientID,username:options.username};options.password&&(authenticateBody.password=options.password),options.otp&&(authenticateBody.otp=options.otp);var realm=options.realm||this.baseOptions.realm;if(realm){var credentialType=options.credentialType||this.baseOptions.credentialType||"http://auth0.com/oauth/grant-type/password-realm";authenticateBody.realm=realm,authenticateBody.credential_type=credentialType;}else authenticateBody.credential_type="password";this.request.post(url).withCredentials().send(authenticateBody).end(function(err,data){if(err){var errorObject=err.response&&err.response.body||{error:"request_error",error_description:JSON.stringify(err)};return wrapCallback(cb,{forceLegacyError:!0})(errorObject)}var popupMode=!0===options.popup;options=objectHelper.blacklist(options,["password","credentialType","otp","popup"]);var authorizeOptions=objectHelper.merge(options).with({loginTicket:data.body.login_ticket}),key=createKey(_this.baseOptions.rootUrl,data.body.co_id);_this.storage.setItem(key,data.body.co_verifier,{expires:MINUTES_15}),popupMode?_this.webMessageHandler.run(authorizeOptions,wrapCallback(cb,{forceLegacyError:!0})):_this.webAuth.authorize(authorizeOptions);});},CrossOriginAuthentication.prototype.callback=function(){var targetOrigin=decodeURIComponent(getFragment("origin")),theWindow=windowHandler.getWindow(),_this=this;theWindow.addEventListener("message",function(evt){if("co_verifier_request"===evt.data.type){var key=createKey(evt.origin,evt.data.request.id),verifier=tryGetVerifier(_this.storage,key);evt.source.postMessage({type:"co_verifier_response",response:{verifier:verifier}},evt.origin);}}),theWindow.parent.postMessage({type:"ready"},targetOrigin);},Redirect.prototype.loginWithCredentials=function(options,cb){options.realm=options.realm||options.connection,delete options.connection,this.crossOriginAuthentication.login(options,cb);},Redirect.prototype.signupAndLogin=function(options,cb){var _this=this;return this.webAuth.client.dbConnection.signup(options,function(err){return err?cb(err):(options.realm=options.realm||options.connection,delete options.connection,_this.webAuth.login(options,cb))})};var winchan=createCommonjsModule(function(module){var WinChan=function(){var RELAY_FRAME_NAME="__winchan_relay_frame",CLOSE_CMD="die";function addListener(w,event,cb){w.attachEvent?w.attachEvent("on"+event,cb):w.addEventListener&&w.addEventListener(event,cb,!1);}function removeListener(w,event,cb){w.detachEvent?w.detachEvent("on"+event,cb):w.removeEventListener&&w.removeEventListener(event,cb,!1);}function extractOrigin(url){/^https?:\/\//.test(url)||(url=window.location.href);var m=/^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(url);return m?m[1]:url}var isIE=function(){if("undefined"==typeof navigator)return !1;var rv=-1,ua=navigator.userAgent;"Microsoft Internet Explorer"===navigator.appName?null!=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})").exec(ua)&&(rv=parseFloat(RegExp.$1)):ua.indexOf("Trident")>-1&&null!==new RegExp("rv:([0-9]{2,2}[.0-9]{0,})").exec(ua)&&(rv=parseFloat(RegExp.$1));return rv>=8}();return "undefined"!=typeof window&&window.JSON&&window.JSON.stringify&&window.JSON.parse&&window.postMessage?{open:function(opts,cb){if(!cb)throw"missing required callback argument";var err,iframe;opts.url||(err="missing required 'url' parameter"),opts.relay_url||(err="missing required 'relay_url' parameter"),err&&setTimeout(function(){cb(err);},0),opts.window_name||(opts.window_name=null),opts.window_features&&!function(){try{var userAgent=navigator.userAgent;return -1!=userAgent.indexOf("Fennec/")||-1!=userAgent.indexOf("Firefox/")&&-1!=userAgent.indexOf("Android")}catch(e){}return !1}()||(opts.window_features=void 0);var messageTarget,origin=opts.origin||extractOrigin(opts.url);if(origin!==extractOrigin(opts.relay_url))return setTimeout(function(){cb("invalid arguments: origin of url and relay_url must match");},0);isIE&&((iframe=document.createElement("iframe")).setAttribute("src",opts.relay_url),iframe.style.display="none",iframe.setAttribute("name",RELAY_FRAME_NAME),document.body.appendChild(iframe),messageTarget=iframe.contentWindow);var w=opts.popup||window.open(opts.url,opts.window_name,opts.window_features);opts.popup&&(w.location.href=opts.url),messageTarget||(messageTarget=w);var closeInterval=setInterval(function(){w&&w.closed&&(cleanup(),cb&&(cb("User closed the popup window"),cb=null));},500),req=JSON.stringify({a:"request",d:opts.params});function cleanup(){if(iframe&&document.body.removeChild(iframe),iframe=void 0,closeInterval&&(closeInterval=clearInterval(closeInterval)),removeListener(window,"message",onMessage),removeListener(window,"unload",cleanup),w)try{w.close();}catch(securityViolation){messageTarget.postMessage(CLOSE_CMD,origin);}w=messageTarget=void 0;}function onMessage(e){if(e.origin===origin){try{var d=JSON.parse(e.data);}catch(err){if(cb)return cb(err);throw err}"ready"===d.a?messageTarget.postMessage(req,origin):"error"===d.a?(cleanup(),cb&&(cb(d.d),cb=null)):"response"===d.a&&(cleanup(),cb&&(cb(null,d.d),cb=null));}}return addListener(window,"unload",cleanup),addListener(window,"message",onMessage),{close:cleanup,focus:function(){if(w)try{w.focus();}catch(e){}}}},onOpen:function(cb){var o="*",msgTarget=isIE?function(){window.location;for(var frames=window.opener.frames,i=frames.length-1;i>=0;i--)try{if(frames[i].location.protocol===window.location.protocol&&frames[i].location.host===window.location.host&&frames[i].name===RELAY_FRAME_NAME)return frames[i]}catch(e){}}():window.opener;if(!msgTarget)throw"can't find relay frame";function doPost(msg){msg=JSON.stringify(msg),isIE?msgTarget.doPost(msg,o):msgTarget.postMessage(msg,o);}function onDie(e){if(e.data===CLOSE_CMD)try{window.close();}catch(o_O){}}addListener(isIE?msgTarget:window,"message",function onMessage(e){var d;try{d=JSON.parse(e.data);}catch(err){}d&&"request"===d.a&&(removeListener(window,"message",onMessage),o=e.origin,cb&&setTimeout(function(){cb(o,d.d,function(r){cb=void 0,doPost({a:"response",d:r});});},0));}),addListener(isIE?msgTarget:window,"message",onDie);try{doPost({a:"ready"});}catch(e){addListener(msgTarget,"load",function(e){doPost({a:"ready"});});}var onUnload=function(){try{removeListener(isIE?msgTarget:window,"message",onDie);}catch(ohWell){}cb&&doPost({a:"error",d:"client closed window"}),cb=void 0;try{window.close();}catch(e){}};return addListener(window,"unload",onUnload),{detach:function(){removeListener(window,"unload",onUnload);}}}}:{open:function(url,winopts,arg,cb){setTimeout(function(){cb("unsupported browser");},0);},onOpen:function(cb){setTimeout(function(){cb("unsupported browser");},0);}}}();module.exports&&(module.exports=WinChan);});function extractOrigin(url){/^https?:\/\//.test(url)||(url=window.location.href);var m=/^(https?:\/\/[-_a-zA-Z.0-9:]+)/.exec(url);return m?m[1]:url}var urlHelper={extractOrigin:extractOrigin};function PopupHandler(){this._current_popup=null;}function Popup(webAuth,options){this.baseOptions=options,this.baseOptions.popupOrigin=options.popupOrigin,this.client=webAuth.client,this.webAuth=webAuth,this.transactionManager=new TransactionManager(this.baseOptions),this.crossOriginAuthentication=new CrossOriginAuthentication(webAuth,this.baseOptions),this.warn=new Warn({disableWarnings:!!options._disableDeprecationWarnings});}function SilentAuthenticationHandler(options){this.authenticationUrl=options.authenticationUrl,this.timeout=options.timeout||6e4,this.handler=null,this.postMessageDataType=options.postMessageDataType||!1,this.postMessageOrigin=options.postMessageOrigin||windowHandler.getWindow().location.origin||windowHandler.getWindow().location.protocol+"//"+windowHandler.getWindow().location.hostname+(windowHandler.getWindow().location.port?":"+windowHandler.getWindow().location.port:"");}function UsernamePassword(options){this.baseOptions=options,this.request=new RequestBuilder(options),this.transactionManager=new TransactionManager(this.baseOptions);}function HostedPages(client,options){this.baseOptions=options,this.client=client,this.baseOptions.universalLoginPage=!0,this.request=new RequestBuilder(this.baseOptions),this.warn=new Warn({disableWarnings:!!options._disableDeprecationWarnings});}function WebAuth(options){assert.check(options,{type:"object",message:"options parameter is not valid"},{domain:{type:"string",message:"domain option is required"},clientID:{type:"string",message:"clientID option is required"},responseType:{optional:!0,type:"string",message:"responseType is not valid"},responseMode:{optional:!0,type:"string",message:"responseMode is not valid"},redirectUri:{optional:!0,type:"string",message:"redirectUri is not valid"},scope:{optional:!0,type:"string",message:"scope is not valid"},audience:{optional:!0,type:"string",message:"audience is not valid"},popupOrigin:{optional:!0,type:"string",message:"popupOrigin is not valid"},leeway:{optional:!0,type:"number",message:"leeway is not valid"},plugins:{optional:!0,type:"array",message:"plugins is not valid"},_disableDeprecationWarnings:{optional:!0,type:"boolean",message:"_disableDeprecationWarnings option is not valid"},_sendTelemetry:{optional:!0,type:"boolean",message:"_sendTelemetry option is not valid"},_telemetryInfo:{optional:!0,type:"object",message:"_telemetryInfo option is not valid"},_timesToRetryFailedRequests:{optional:!0,type:"number",message:"_timesToRetryFailedRequests option is not valid"}}),options.overrides&&assert.check(options.overrides,{type:"object",message:"overrides option is not valid"},{__tenant:{optional:!0,type:"string",message:"__tenant option is required"},__token_issuer:{optional:!0,type:"string",message:"__token_issuer option is required"},__jwks_uri:{optional:!0,type:"string",message:"__jwks_uri is required"}}),this.baseOptions=options,this.baseOptions.plugins=new PluginHandler(this,this.baseOptions.plugins||[]),this.baseOptions._sendTelemetry=!1!==this.baseOptions._sendTelemetry||this.baseOptions._sendTelemetry,this.baseOptions._timesToRetryFailedRequests=options._timesToRetryFailedRequests?parseInt(options._timesToRetryFailedRequests,0):0,this.baseOptions.tenant=this.baseOptions.overrides&&this.baseOptions.overrides.__tenant||this.baseOptions.domain.split(".")[0],this.baseOptions.token_issuer=this.baseOptions.overrides&&this.baseOptions.overrides.__token_issuer||"https://"+this.baseOptions.domain+"/",this.baseOptions.jwksURI=this.baseOptions.overrides&&this.baseOptions.overrides.__jwks_uri,this.transactionManager=new TransactionManager(this.baseOptions),this.client=new Authentication(this.baseOptions),this.redirect=new Redirect(this,this.baseOptions),this.popup=new Popup(this,this.baseOptions),this.crossOriginAuthentication=new CrossOriginAuthentication(this,this.baseOptions),this.webMessageHandler=new WebMessageHandler(this),this._universalLogin=new HostedPages(this,this.baseOptions),this.ssodataStorage=new SSODataStorage(this.baseOptions);}function buildParseHashResponse(qsParams,appState,token){return {accessToken:qsParams.access_token||null,idToken:qsParams.id_token||null,idTokenPayload:token||null,appState:appState||null,refreshToken:qsParams.refresh_token||null,state:qsParams.state||null,expiresIn:qsParams.expires_in?parseInt(qsParams.expires_in,10):null,tokenType:qsParams.token_type||null,scope:qsParams.scope||null}}function PasswordlessAuthentication(request,options){this.baseOptions=options,this.request=request;}function DBConnection(request,options){this.baseOptions=options,this.request=request;}function Authentication(auth0,options){2===arguments.length?this.auth0=auth0:options=auth0,assert.check(options,{type:"object",message:"options parameter is not valid"},{domain:{type:"string",message:"domain option is required"},clientID:{type:"string",message:"clientID option is required"},responseType:{optional:!0,type:"string",message:"responseType is not valid"},responseMode:{optional:!0,type:"string",message:"responseMode is not valid"},redirectUri:{optional:!0,type:"string",message:"redirectUri is not valid"},scope:{optional:!0,type:"string",message:"scope is not valid"},audience:{optional:!0,type:"string",message:"audience is not valid"},_disableDeprecationWarnings:{optional:!0,type:"boolean",message:"_disableDeprecationWarnings option is not valid"},_sendTelemetry:{optional:!0,type:"boolean",message:"_sendTelemetry option is not valid"},_telemetryInfo:{optional:!0,type:"object",message:"_telemetryInfo option is not valid"}}),this.baseOptions=options,this.baseOptions._sendTelemetry=!1!==this.baseOptions._sendTelemetry||this.baseOptions._sendTelemetry,this.baseOptions.rootUrl="https://"+this.baseOptions.domain,this.request=new RequestBuilder(this.baseOptions),this.passwordless=new PasswordlessAuthentication(this.request,this.baseOptions),this.dbConnection=new DBConnection(this.request,this.baseOptions),this.warn=new Warn({disableWarnings:!!options._disableDeprecationWarnings}),this.ssodataStorage=new SSODataStorage(this.baseOptions);}function Management(options){assert.check(options,{type:"object",message:"options parameter is not valid"},{domain:{type:"string",message:"domain option is required"},token:{type:"string",message:"token option is required"},_sendTelemetry:{optional:!0,type:"boolean",message:"_sendTelemetry option is not valid"},_telemetryInfo:{optional:!0,type:"object",message:"_telemetryInfo option is not valid"}}),this.baseOptions=options,this.baseOptions.headers={Authorization:"Bearer "+this.baseOptions.token},this.request=new RequestBuilder(this.baseOptions),this.baseOptions.rootUrl=urlJoin("https://"+this.baseOptions.domain,"api","v2");}PopupHandler.prototype.calculatePosition=function(options){var width=options.width||500,height=options.height||600,_window=windowHandler.getWindow(),screenX=void 0!==_window.screenX?_window.screenX:_window.screenLeft,screenY=void 0!==_window.screenY?_window.screenY:_window.screenTop;return {width:width,height:height,left:screenX+((void 0!==_window.outerWidth?_window.outerWidth:_window.document.body.clientWidth)-width)/2,top:screenY+((void 0!==_window.outerHeight?_window.outerHeight:_window.document.body.clientHeight)-height)/2}},PopupHandler.prototype.preload=function(options){var _this=this,_window=windowHandler.getWindow(),popupPosition=this.calculatePosition(options.popupOptions||{}),popupOptions=objectHelper.merge(popupPosition).with(options.popupOptions),url=options.url||"about:blank",windowFeatures=lib.stringify(popupOptions,{encode:!1,delimiter:","});return this._current_popup&&!this._current_popup.closed?this._current_popup:(this._current_popup=_window.open(url,"auth0_signup_popup",windowFeatures),this._current_popup.kill=function(){this.close(),_this._current_popup=null;},this._current_popup)},PopupHandler.prototype.load=function(url,relayUrl,options,cb){var _this=this,popupPosition=this.calculatePosition(options.popupOptions||{}),popupOptions=objectHelper.merge(popupPosition).with(options.popupOptions),winchanOptions=objectHelper.merge({url:url,relay_url:relayUrl,window_features:lib.stringify(popupOptions,{delimiter:",",encode:!1}),popup:this._current_popup}).with(options),popup=winchan.open(winchanOptions,function(err,data){return _this._current_popup=null,cb(err,data)});return popup.focus(),popup},Popup.prototype.buildPopupHandler=function(){var pluginHandler=this.baseOptions.plugins.get("popup.getPopupHandler");return pluginHandler?pluginHandler.getPopupHandler():new PopupHandler},Popup.prototype.preload=function(options){options=options||{};var popup=this.buildPopupHandler();return popup.preload(options),popup},Popup.prototype.getPopupHandler=function(options,preload){return options.popupHandler?options.popupHandler:preload?this.preload(options):this.buildPopupHandler()},Popup.prototype.callback=function(options){var _this=this,theWindow=windowHandler.getWindow(),originUrl=(options=options||{}).popupOrigin||this.baseOptions.popupOrigin||windowHandler.getOrigin();theWindow.opener?winchan.onOpen(function(popupOrigin,r,cb){if(popupOrigin!==originUrl)return cb({error:"origin_mismatch",error_description:"The popup's origin ("+popupOrigin+") should match the `popupOrigin` parameter ("+originUrl+")."});_this.webAuth.parseHash(options||{},function(err,data){return cb(err||data)});}):theWindow.doPost=function(msg){theWindow.parent&&theWindow.parent.postMessage(msg,originUrl);};},Popup.prototype.authorize=function(options,cb){var url,relayUrl,popOpts={},pluginHandler=this.baseOptions.plugins.get("popup.authorize"),params=objectHelper.merge(this.baseOptions,["clientID","scope","domain","audience","tenant","responseType","redirectUri","_csrf","state","_intstate","nonce"]).with(objectHelper.blacklist(options,["popupHandler"]));return assert.check(params,{type:"object",message:"options parameter is not valid"},{responseType:{type:"string",message:"responseType option is required"}}),relayUrl=urlJoin(this.baseOptions.rootUrl,"relay.html"),options.owp?params.owp=!0:(popOpts.origin=urlHelper.extractOrigin(params.redirectUri),relayUrl=params.redirectUri),options.popupOptions&&(popOpts.popupOptions=objectHelper.pick(options.popupOptions,["width","height"])),pluginHandler&&(params=pluginHandler.processParams(params)),(params=this.transactionManager.process(params)).scope=params.scope||"openid profile email",delete params.domain,url=this.client.buildAuthorizeUrl(params),this.getPopupHandler(options).load(url,relayUrl,popOpts,wrapCallback(cb,{keepOriginalCasing:!0}))},Popup.prototype.loginWithCredentials=function(options,cb){options.realm=options.realm||options.connection,options.popup=!0,options=objectHelper.merge(this.baseOptions,["redirectUri","responseType","state","nonce"]).with(objectHelper.blacklist(options,["popupHandler","connection"])),options=this.transactionManager.process(options),this.crossOriginAuthentication.login(options,cb);},Popup.prototype.passwordlessVerify=function(options,cb){var _this=this;return this.client.passwordless.verify(objectHelper.blacklist(options,["popupHandler"]),function(err){if(err)return cb(err);options.username=options.phoneNumber||options.email,options.password=options.verificationCode,delete options.email,delete options.phoneNumber,delete options.verificationCode,delete options.type,_this.client.loginWithResourceOwner(options,cb);})},Popup.prototype.signupAndLogin=function(options,cb){var _this=this,popupHandler=this.getPopupHandler(options,!0);return options.popupHandler=popupHandler,this.client.dbConnection.signup(objectHelper.blacklist(options,["popupHandler"]),function(err){if(err)return popupHandler._current_popup&&popupHandler._current_popup.kill(),cb(err);_this.loginWithCredentials(options,cb);})},SilentAuthenticationHandler.create=function(options){return new SilentAuthenticationHandler(options)},SilentAuthenticationHandler.prototype.login=function(usePostMessage,callback){this.handler=new IframeHandler({auth0:this.auth0,url:this.authenticationUrl,eventListenerType:usePostMessage?"message":"load",callback:this.getCallbackHandler(callback,usePostMessage),timeout:this.timeout,eventValidator:this.getEventValidator(),timeoutCallback:function(){callback(null,"#error=timeout&error_description=Timeout+during+authentication+renew.");},usePostMessage:usePostMessage||!1}),this.handler.init();},SilentAuthenticationHandler.prototype.getEventValidator=function(){var _this=this;return {isValid:function(eventData){switch(eventData.event.type){case"message":return eventData.event.origin===_this.postMessageOrigin&&eventData.event.source===_this.handler.iframe.contentWindow&&(!1===_this.postMessageDataType||eventData.event.data.type&&eventData.event.data.type===_this.postMessageDataType);case"load":if("about:"===eventData.sourceObject.contentWindow.location.protocol)return !1;default:return !0}}}},SilentAuthenticationHandler.prototype.getCallbackHandler=function(callback,usePostMessage){return function(eventData){var callbackValue;callbackValue=usePostMessage?"object"==typeof eventData.event.data&&eventData.event.data.hash?eventData.event.data.hash:eventData.event.data:eventData.sourceObject.contentWindow.location.hash,callback(null,callbackValue);}},UsernamePassword.prototype.login=function(options,cb){var url,body;return url=urlJoin(this.baseOptions.rootUrl,"usernamepassword","login"),options.username=options.username||options.email,options=objectHelper.blacklist(options,["email"]),body=objectHelper.merge(this.baseOptions,["clientID","redirectUri","tenant","responseType","responseMode","scope","audience"]).with(options),body=this.transactionManager.process(body),body=objectHelper.toSnakeCase(body,["auth0Client"]),this.request.post(url).send(body).end(wrapCallback(cb))},UsernamePassword.prototype.callback=function(formHtml){var div,_document=windowHandler.getDocument();(div=_document.createElement("div")).innerHTML=formHtml,_document.body.appendChild(div).children[0].submit();},HostedPages.prototype.login=function(options,cb){if(windowHandler.getWindow().location.host!==this.baseOptions.domain)throw new Error("This method is meant to be used only inside the Universal Login Page.");var usernamePassword,params=objectHelper.merge(this.baseOptions,["clientID","redirectUri","tenant","responseType","responseMode","scope","audience","_csrf","state","_intstate","nonce"]).with(options);return assert.check(params,{type:"object",message:"options parameter is not valid"},{responseType:{type:"string",message:"responseType option is required"}}),(usernamePassword=new UsernamePassword(this.baseOptions)).login(params,function(err,data){return err?cb(err):usernamePassword.callback(data)})},HostedPages.prototype.signupAndLogin=function(options,cb){var _this=this;return _this.client.client.dbConnection.signup(options,function(err){return err?cb(err):_this.login(options,cb)})},HostedPages.prototype.getSSOData=function(withActiveDirectories,cb){var url,params="";return "function"==typeof withActiveDirectories&&(cb=withActiveDirectories,withActiveDirectories=!1),assert.check(withActiveDirectories,{type:"boolean",message:"withActiveDirectories parameter is not valid"}),assert.check(cb,{type:"function",message:"cb parameter is not valid"}),withActiveDirectories&&(params="?"+lib.stringify({ldaps:1,client_id:this.baseOptions.clientID})),url=urlJoin(this.baseOptions.rootUrl,"user","ssodata",params),this.request.get(url,{noHeaders:!0}).withCredentials().end(wrapCallback(cb))},WebAuth.prototype.parseHash=function(options,cb){var parsedQs,err;cb||"function"!=typeof options?options=options||{}:(cb=options,options={});var _window=windowHandler.getWindow(),hashStr=void 0===options.hash?_window.location.hash:options.hash;if(hashStr=hashStr.replace(/^#?\/?/,""),(parsedQs=lib.parse(hashStr)).hasOwnProperty("error"))return err=error.buildResponse(parsedQs.error,parsedQs.error_description),parsedQs.state&&(err.state=parsedQs.state),cb(err);if(!parsedQs.hasOwnProperty("access_token")&&!parsedQs.hasOwnProperty("id_token")&&!parsedQs.hasOwnProperty("refresh_token"))return cb(null,null);var responseTypes=(this.baseOptions.responseType||options.responseType||"").split(" ");return responseTypes.length>0&&-1!==responseTypes.indexOf("token")&&!parsedQs.hasOwnProperty("access_token")?cb(error.buildResponse("invalid_hash","response_type contains `token`, but the parsed hash does not contain an `access_token` property")):responseTypes.length>0&&-1!==responseTypes.indexOf("id_token")&&!parsedQs.hasOwnProperty("id_token")?cb(error.buildResponse("invalid_hash","response_type contains `id_token`, but the parsed hash does not contain an `id_token` property")):this.validateAuthenticationResponse(options,parsedQs,cb)},WebAuth.prototype.validateAuthenticationResponse=function(options,parsedHash,cb){var _this=this;options.__enableIdPInitiatedLogin=options.__enableIdPInitiatedLogin||options.__enableImpersonation;var state=parsedHash.state,transaction=this.transactionManager.getStoredTransaction(state),transactionState=options.state||transaction&&transaction.state||null,transactionStateMatchesState=transactionState===state;if(!(!state&&!transactionState&&options.__enableIdPInitiatedLogin)&&!transactionStateMatchesState)return cb({error:"invalid_token",errorDescription:"`state` does not match."});var transactionNonce=options.nonce||transaction&&transaction.nonce||null,appState=options.state||transaction&&transaction.appState||null,callback=function(err,payload){if(err)return cb(err);var sub;transaction&&transaction.lastUsedConnection&&(payload&&(sub=payload.sub),_this.ssodataStorage.set(transaction.lastUsedConnection,sub));return cb(null,buildParseHashResponse(parsedHash,appState,payload))};return parsedHash.id_token?this.validateToken(parsedHash.id_token,transactionNonce,function(validationError,payload){if(!validationError)return parsedHash.access_token&&payload.at_hash?(new src).validateAccessToken(parsedHash.access_token,"RS256",payload.at_hash,function(err){return err?callback(error.invalidToken(err.message)):callback(null,payload)}):callback(null,payload);if("invalid_token"!==validationError.error||"Nonce does not match."===validationError.errorDescription)return callback(validationError);if("HS256"!==(new src).decode(parsedHash.id_token).header.alg)return callback(validationError);if(!parsedHash.access_token){return callback({error:"invalid_token",description:"The id_token cannot be validated because it was signed with the HS256 algorithm and public clients (like a browser) can’t store secrets. Please read the associated doc for possible ways to fix this. Read more: https://auth0.com/docs/errors/libraries/auth0-js/invalid-token#parsing-an-hs256-signed-id-token-without-an-access-token"})}return _this.client.userInfo(parsedHash.access_token,function(errUserInfo,profile){return errUserInfo?callback(errUserInfo):callback(null,profile)})}):callback(null,null)},WebAuth.prototype.validateToken=function(token,nonce,cb){new src({issuer:this.baseOptions.token_issuer,jwksURI:this.baseOptions.jwksURI,audience:this.baseOptions.clientID,leeway:this.baseOptions.leeway||0,__disableExpirationCheck:this.baseOptions.__disableExpirationCheck}).verify(token,nonce,function(err,payload){if(err)return cb(error.invalidToken(err.message));cb(null,payload);});},WebAuth.prototype.renewAuth=function(options,cb){var usePostMessage=!!options.usePostMessage,postMessageDataType=options.postMessageDataType||!1,postMessageOrigin=options.postMessageOrigin||windowHandler.getWindow().origin,timeout=options.timeout,_this=this,params=objectHelper.merge(this.baseOptions,["clientID","redirectUri","responseType","scope","audience","_csrf","state","_intstate","nonce"]).with(options);params.responseType=params.responseType||"token",params.responseMode=params.responseMode||"fragment",params=this.transactionManager.process(params),assert.check(params,{type:"object",message:"options parameter is not valid"}),assert.check(cb,{type:"function",message:"cb parameter is not valid"}),params.prompt="none",params=objectHelper.blacklist(params,["usePostMessage","tenant","postMessageDataType","postMessageOrigin"]),SilentAuthenticationHandler.create({authenticationUrl:this.client.buildAuthorizeUrl(params),postMessageDataType:postMessageDataType,postMessageOrigin:postMessageOrigin,timeout:timeout}).login(usePostMessage,function(err,hash){if("object"==typeof hash)return cb(err,hash);_this.parseHash({hash:hash},cb);});},WebAuth.prototype.checkSession=function(options,cb){var params=objectHelper.merge(this.baseOptions,["clientID","responseType","redirectUri","scope","audience","_csrf","state","_intstate","nonce"]).with(options);return "code"===params.responseType?cb({error:"error",error_description:"responseType can't be `code`"}):(options.nonce||(params=this.transactionManager.process(params)),params.redirectUri?(assert.check(params,{type:"object",message:"options parameter is not valid"}),assert.check(cb,{type:"function",message:"cb parameter is not valid"}),params=objectHelper.blacklist(params,["usePostMessage","tenant","postMessageDataType"]),void this.webMessageHandler.run(params,cb)):cb({error:"error",error_description:"redirectUri can't be empty"}))},WebAuth.prototype.changePassword=function(options,cb){return this.client.dbConnection.changePassword(options,cb)},WebAuth.prototype.passwordlessStart=function(options,cb){var authParams=objectHelper.merge(this.baseOptions,["responseType","responseMode","redirectUri","scope","audience","_csrf","state","_intstate","nonce"]).with(options.authParams);return options.authParams=this.transactionManager.process(authParams),this.client.passwordless.start(options,cb)},WebAuth.prototype.signup=function(options,cb){return this.client.dbConnection.signup(options,cb)},WebAuth.prototype.authorize=function(options){var params=objectHelper.merge(this.baseOptions,["clientID","responseType","responseMode","redirectUri","scope","audience","_csrf","state","_intstate","nonce"]).with(options);assert.check(params,{type:"object",message:"options parameter is not valid"},{responseType:{type:"string",message:"responseType option is required"}}),(params=this.transactionManager.process(params)).scope=params.scope||"openid profile email",windowHandler.redirect(this.client.buildAuthorizeUrl(params));},WebAuth.prototype.signupAndAuthorize=function(options,cb){var _this=this;return this.client.dbConnection.signup(objectHelper.blacklist(options,["popupHandler"]),function(err){if(err)return cb(err);options.realm=options.connection,options.username||(options.username=options.email),_this.client.login(options,cb);})},WebAuth.prototype.login=function(options,cb){var params=objectHelper.merge(this.baseOptions,["clientID","responseType","redirectUri","scope","audience","_csrf","state","_intstate","nonce"]).with(options);params=this.transactionManager.process(params),windowHandler.getWindow().location.host===this.baseOptions.domain?(params.connection=params.realm,delete params.realm,this._universalLogin.login(params,cb)):this.crossOriginAuthentication.login(params,cb);},WebAuth.prototype.passwordlessLogin=function(options,cb){var params=objectHelper.merge(this.baseOptions,["clientID","responseType","redirectUri","scope","audience","_csrf","state","_intstate","nonce"]).with(options);if(params=this.transactionManager.process(params),windowHandler.getWindow().location.host===this.baseOptions.domain)this.passwordlessVerify(params,cb);else{var crossOriginOptions=objectHelper.extend({credentialType:"http://auth0.com/oauth/grant-type/passwordless/otp",realm:params.connection,username:params.email||params.phoneNumber,otp:params.verificationCode},objectHelper.blacklist(params,["connection","email","phoneNumber","verificationCode"]));this.crossOriginAuthentication.login(crossOriginOptions,cb);}},WebAuth.prototype.crossOriginAuthenticationCallback=function(){this.crossOriginVerification();},WebAuth.prototype.crossOriginVerification=function(){this.crossOriginAuthentication.callback();},WebAuth.prototype.logout=function(options){windowHandler.redirect(this.client.buildLogoutUrl(options));},WebAuth.prototype.passwordlessVerify=function(options,cb){var _this=this,params=objectHelper.merge(this.baseOptions,["clientID","responseType","responseMode","redirectUri","scope","audience","_csrf","state","_intstate","nonce"]).with(options);return assert.check(params,{type:"object",message:"options parameter is not valid"},{responseType:{type:"string",message:"responseType option is required"}}),params=this.transactionManager.process(params),this.client.passwordless.verify(params,function(err){return err?cb(err):windowHandler.redirect(_this.client.passwordless.buildVerifyUrl(params))})},PasswordlessAuthentication.prototype.buildVerifyUrl=function(options){var params,qString;return assert.check(options,{type:"object",message:"options parameter is not valid"},{connection:{type:"string",message:"connection option is required"},verificationCode:{type:"string",message:"verificationCode option is required"},phoneNumber:{optional:!1,type:"string",message:"phoneNumber option is required",condition:function(o){return !o.email}},email:{optional:!1,type:"string",message:"email option is required",condition:function(o){return !o.phoneNumber}}}),params=objectHelper.merge(this.baseOptions,["clientID","responseType","responseMode","redirectUri","scope","audience","_csrf","state","_intstate","protocol","nonce"]).with(options),this.baseOptions._sendTelemetry&&(params.auth0Client=this.request.getTelemetryData()),params=objectHelper.toSnakeCase(params,["auth0Client"]),qString=lib.stringify(params),urlJoin(this.baseOptions.rootUrl,"passwordless","verify_redirect","?"+qString)},PasswordlessAuthentication.prototype.start=function(options,cb){var url,body;return assert.check(options,{type:"object",message:"options parameter is not valid"},{connection:{type:"string",message:"connection option is required"},send:{type:"string",message:"send option is required",values:["link","code"],value_message:"send is not valid ([link, code])"},phoneNumber:{optional:!0,type:"string",message:"phoneNumber option is required",condition:function(o){return "code"===o.send||!o.email}},email:{optional:!0,type:"string",message:"email option is required",condition:function(o){return "link"===o.send||!o.phoneNumber}},authParams:{optional:!0,type:"object",message:"authParams option is required"}}),assert.check(cb,{type:"function",message:"cb parameter is not valid"}),url=urlJoin(this.baseOptions.rootUrl,"passwordless","start"),(body=objectHelper.merge(this.baseOptions,["clientID","responseType","redirectUri","scope"]).with(options)).scope&&(body.authParams=body.authParams||{},body.authParams.scope=body.scope),body.redirectUri&&(body.authParams=body.authParams||{},body.authParams.redirect_uri=body.redirectUri),body.responseType&&(body.authParams=body.authParams||{},body.authParams.response_type=body.responseType),delete body.redirectUri,delete body.responseType,delete body.scope,body=objectHelper.toSnakeCase(body,["auth0Client","authParams"]),this.request.post(url).send(body).end(wrapCallback(cb))},PasswordlessAuthentication.prototype.verify=function(options,cb){var url,cleanOption;return assert.check(options,{type:"object",message:"options parameter is not valid"},{connection:{type:"string",message:"connection option is required"},verificationCode:{type:"string",message:"verificationCode option is required"},phoneNumber:{optional:!1,type:"string",message:"phoneNumber option is required",condition:function(o){return !o.email}},email:{optional:!1,type:"string",message:"email option is required",condition:function(o){return !o.phoneNumber}}}),assert.check(cb,{type:"function",message:"cb parameter is not valid"}),cleanOption=objectHelper.pick(options,["connection","verificationCode","phoneNumber","email","auth0Client"]),cleanOption=objectHelper.toSnakeCase(cleanOption,["auth0Client"]),url=urlJoin(this.baseOptions.rootUrl,"passwordless","verify"),this.request.post(url).send(cleanOption).end(wrapCallback(cb))},DBConnection.prototype.signup=function(options,cb){var url,body,metadata;return assert.check(options,{type:"object",message:"options parameter is not valid"},{connection:{type:"string",message:"connection option is required"},email:{type:"string",message:"email option is required"},password:{type:"string",message:"password option is required"}}),assert.check(cb,{type:"function",message:"cb parameter is not valid"}),url=urlJoin(this.baseOptions.rootUrl,"dbconnections","signup"),metadata=(body=objectHelper.merge(this.baseOptions,["clientID"]).with(options)).user_metadata||body.userMetadata,body=objectHelper.blacklist(body,["scope","userMetadata","user_metadata"]),body=objectHelper.toSnakeCase(body,["auth0Client"]),metadata&&(body.user_metadata=metadata),this.request.post(url).send(body).end(wrapCallback(cb))},DBConnection.prototype.changePassword=function(options,cb){var url,body;return assert.check(options,{type:"object",message:"options parameter is not valid"},{connection:{type:"string",message:"connection option is required"},email:{type:"string",message:"email option is required"}}),assert.check(cb,{type:"function",message:"cb parameter is not valid"}),url=urlJoin(this.baseOptions.rootUrl,"dbconnections","change_password"),body=objectHelper.merge(this.baseOptions,["clientID"]).with(options,["email","connection"]),body=objectHelper.toSnakeCase(body,["auth0Client"]),this.request.post(url).send(body).end(wrapCallback(cb))},Authentication.prototype.buildAuthorizeUrl=function(options){var params,qString;return assert.check(options,{type:"object",message:"options parameter is not valid"}),params=objectHelper.merge(this.baseOptions,["clientID","responseType","responseMode","redirectUri","scope","audience"]).with(options),assert.check(params,{type:"object",message:"options parameter is not valid"},{clientID:{type:"string",message:"clientID option is required"},redirectUri:{optional:!0,type:"string",message:"redirectUri option is required"},responseType:{type:"string",message:"responseType option is required"},nonce:{type:"string",message:"nonce option is required",condition:function(o){return -1===o.responseType.indexOf("code")&&-1!==o.responseType.indexOf("id_token")}},scope:{optional:!0,type:"string",message:"scope option is required"},audience:{optional:!0,type:"string",message:"audience option is required"}}),this.baseOptions._sendTelemetry&&(params.auth0Client=this.request.getTelemetryData()),params.connection_scope&&assert.isArray(params.connection_scope)&&(params.connection_scope=params.connection_scope.join(",")),params=objectHelper.blacklist(params,["username","popupOptions","domain","tenant","timeout"]),params=objectHelper.toSnakeCase(params,["auth0Client"]),params=parametersWhitelist.oauthAuthorizeParams(this.warn,params),qString=lib.stringify(params),urlJoin(this.baseOptions.rootUrl,"authorize","?"+qString)},Authentication.prototype.buildLogoutUrl=function(options){var params,qString;return assert.check(options,{optional:!0,type:"object",message:"options parameter is not valid"}),params=objectHelper.merge(this.baseOptions,["clientID"]).with(options||{}),this.baseOptions._sendTelemetry&&(params.auth0Client=this.request.getTelemetryData()),params=objectHelper.toSnakeCase(params,["auth0Client","returnTo"]),qString=lib.stringify(objectHelper.blacklist(params,["federated"])),options&&void 0!==options.federated&&!1!==options.federated&&"false"!==options.federated&&(qString+="&federated"),urlJoin(this.baseOptions.rootUrl,"v2","logout","?"+qString)},Authentication.prototype.loginWithDefaultDirectory=function(options,cb){return assert.check(options,{type:"object",message:"options parameter is not valid"},{username:{type:"string",message:"username option is required"},password:{type:"string",message:"password option is required"},scope:{optional:!0,type:"string",message:"scope option is required"},audience:{optional:!0,type:"string",message:"audience option is required"}}),options.grantType="password",this.oauthToken(options,cb)},Authentication.prototype.login=function(options,cb){return assert.check(options,{type:"object",message:"options parameter is not valid"},{username:{type:"string",message:"username option is required"},password:{type:"string",message:"password option is required"},realm:{type:"string",message:"realm option is required"},scope:{optional:!0,type:"string",message:"scope option is required"},audience:{optional:!0,type:"string",message:"audience option is required"}}),options.grantType="http://auth0.com/oauth/grant-type/password-realm",this.oauthToken(options,cb)},Authentication.prototype.oauthToken=function(options,cb){var url,body;return assert.check(options,{type:"object",message:"options parameter is not valid"}),assert.check(cb,{type:"function",message:"cb parameter is not valid"}),url=urlJoin(this.baseOptions.rootUrl,"oauth","token"),body=objectHelper.merge(this.baseOptions,["clientID","scope","audience"]).with(options),assert.check(body,{type:"object",message:"options parameter is not valid"},{clientID:{type:"string",message:"clientID option is required"},grantType:{type:"string",message:"grantType option is required"},scope:{optional:!0,type:"string",message:"scope option is required"},audience:{optional:!0,type:"string",message:"audience option is required"}}),body=objectHelper.toSnakeCase(body,["auth0Client"]),body=parametersWhitelist.oauthTokenParams(this.warn,body),this.request.post(url).send(body).end(wrapCallback(cb))},Authentication.prototype.loginWithResourceOwner=function(options,cb){var url,body;return assert.check(options,{type:"object",message:"options parameter is not valid"},{username:{type:"string",message:"username option is required"},password:{type:"string",message:"password option is required"},connection:{type:"string",message:"connection option is required"},scope:{optional:!0,type:"string",message:"scope option is required"}}),assert.check(cb,{type:"function",message:"cb parameter is not valid"}),url=urlJoin(this.baseOptions.rootUrl,"oauth","ro"),body=objectHelper.merge(this.baseOptions,["clientID","scope"]).with(options,["username","password","scope","connection","device"]),(body=objectHelper.toSnakeCase(body,["auth0Client"])).grant_type=body.grant_type||"password",this.request.post(url).send(body).end(wrapCallback(cb))},Authentication.prototype.getSSOData=function(withActiveDirectories,cb){if(this.auth0||(this.auth0=new WebAuth(this.baseOptions)),windowHandler.getWindow().location.host===this.baseOptions.domain)return this.auth0._universalLogin.getSSOData(withActiveDirectories,cb);"function"==typeof withActiveDirectories&&(cb=withActiveDirectories),assert.check(cb,{type:"function",message:"cb parameter is not valid"});var clientId=this.baseOptions.clientID,ssodataInformation=this.ssodataStorage.get()||{};this.auth0.checkSession({responseType:"token id_token",scope:"openid profile email",connection:ssodataInformation.lastUsedConnection,timeout:5e3},function(err,result){return err?"login_required"===err.error?cb(null,{sso:!1}):("consent_required"===err.error&&(err.error_description="Consent required. When using `getSSOData`, the user has to be authenticated with the following scope: `openid profile email`."),cb(err,{sso:!1})):ssodataInformation.lastUsedSub&&ssodataInformation.lastUsedSub!==result.idTokenPayload.sub?cb(err,{sso:!1}):cb(null,{lastUsedConnection:{name:ssodataInformation.lastUsedConnection},lastUsedUserID:result.idTokenPayload.sub,lastUsedUsername:result.idTokenPayload.email||result.idTokenPayload.name,lastUsedClientID:clientId,sessionClients:[clientId],sso:!0})});},Authentication.prototype.userInfo=function(accessToken,cb){var url;return assert.check(accessToken,{type:"string",message:"accessToken parameter is not valid"}),assert.check(cb,{type:"function",message:"cb parameter is not valid"}),url=urlJoin(this.baseOptions.rootUrl,"userinfo"),this.request.get(url).set("Authorization","Bearer "+accessToken).end(wrapCallback(cb,{ignoreCasing:!0}))},Authentication.prototype.delegation=function(options,cb){var url,body;return assert.check(options,{type:"object",message:"options parameter is not valid"},{grant_type:{type:"string",message:"grant_type option is required"}}),assert.check(cb,{type:"function",message:"cb parameter is not valid"}),url=urlJoin(this.baseOptions.rootUrl,"delegation"),body=objectHelper.merge(this.baseOptions,["clientID"]).with(options),body=objectHelper.toSnakeCase(body,["auth0Client"]),this.request.post(url).send(body).end(wrapCallback(cb))},Authentication.prototype.getUserCountry=function(cb){var url;return assert.check(cb,{type:"function",message:"cb parameter is not valid"}),url=urlJoin(this.baseOptions.rootUrl,"user","geoloc","country"),this.request.get(url).end(wrapCallback(cb))},Management.prototype.getUser=function(userId,cb){var url;return assert.check(userId,{type:"string",message:"userId parameter is not valid"}),assert.check(cb,{type:"function",message:"cb parameter is not valid"}),url=urlJoin(this.baseOptions.rootUrl,"users",userId),this.request.get(url).end(wrapCallback(cb,{ignoreCasing:!0}))},Management.prototype.patchUserMetadata=function(userId,userMetadata,cb){var url;return assert.check(userId,{type:"string",message:"userId parameter is not valid"}),assert.check(userMetadata,{type:"object",message:"userMetadata parameter is not valid"}),assert.check(cb,{type:"function",message:"cb parameter is not valid"}),url=urlJoin(this.baseOptions.rootUrl,"users",userId),this.request.patch(url).send({user_metadata:userMetadata}).end(wrapCallback(cb,{ignoreCasing:!0}))},Management.prototype.linkUser=function(userId,secondaryUserToken,cb){var url;return assert.check(userId,{type:"string",message:"userId parameter is not valid"}),assert.check(secondaryUserToken,{type:"string",message:"secondaryUserToken parameter is not valid"}),assert.check(cb,{type:"function",message:"cb parameter is not valid"}),url=urlJoin(this.baseOptions.rootUrl,"users",userId,"identities"),this.request.post(url).send({link_with:secondaryUserToken}).end(wrapCallback(cb,{ignoreCasing:!0}))};

    var promisify = (function (fn) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new Promise(function (resolve, reject) {
                try {
                    fn.apply(void 0, args.concat([function (err, result) {
                            if (err)
                                return reject(err);
                            return resolve(result);
                        }]));
                }
                catch (err) {
                    reject(err);
                }
            });
        };
    });

    var promisifiyWebAuth = function (webAuth) {
        return {
            parseHash: promisify(webAuth.parseHash.bind(webAuth)),
            checkSession: promisify(webAuth.checkSession.bind(webAuth))
        };
    };
    var createWebAuth = (function (options) {
        return promisifiyWebAuth(new WebAuth(options));
    });

    var commonjsGlobal$1 = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
    }

    function createCommonjsModule$1(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var lodash_defaultsdeep = createCommonjsModule$1(function (module, exports) {
    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */

    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        objectTag = '[object Object]',
        promiseTag = '[object Promise]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        symbolTag = '[object Symbol]',
        weakMapTag = '[object WeakMap]';

    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

    /** Used to match `RegExp` flags from their coerced string values. */
    var reFlags = /\w*$/;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;

    /** Used to identify `toStringTag` values of typed arrays. */
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
    typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
    typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
    typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
    typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
    typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
    typedArrayTags[errorTag] = typedArrayTags[funcTag] =
    typedArrayTags[mapTag] = typedArrayTags[numberTag] =
    typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
    typedArrayTags[setTag] = typedArrayTags[stringTag] =
    typedArrayTags[weakMapTag] = false;

    /** Used to identify `toStringTag` values supported by `_.clone`. */
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] =
    cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
    cloneableTags[boolTag] = cloneableTags[dateTag] =
    cloneableTags[float32Tag] = cloneableTags[float64Tag] =
    cloneableTags[int8Tag] = cloneableTags[int16Tag] =
    cloneableTags[int32Tag] = cloneableTags[mapTag] =
    cloneableTags[numberTag] = cloneableTags[objectTag] =
    cloneableTags[regexpTag] = cloneableTags[setTag] =
    cloneableTags[stringTag] = cloneableTags[symbolTag] =
    cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
    cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] =
    cloneableTags[weakMapTag] = false;

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof commonjsGlobal$1 == 'object' && commonjsGlobal$1 && commonjsGlobal$1.Object === Object && commonjsGlobal$1;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();

    /** Detect free variable `exports`. */
    var freeExports = exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Detect free variable `process` from Node.js. */
    var freeProcess = moduleExports && freeGlobal.process;

    /** Used to access faster Node.js helpers. */
    var nodeUtil = (function() {
      try {
        return freeProcess && freeProcess.binding('util');
      } catch (e) {}
    }());

    /* Node.js helper references. */
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

    /**
     * Adds the key-value `pair` to `map`.
     *
     * @private
     * @param {Object} map The map to modify.
     * @param {Array} pair The key-value pair to add.
     * @returns {Object} Returns `map`.
     */
    function addMapEntry(map, pair) {
      // Don't return `map.set` because it's not chainable in IE 11.
      map.set(pair[0], pair[1]);
      return map;
    }

    /**
     * Adds `value` to `set`.
     *
     * @private
     * @param {Object} set The set to modify.
     * @param {*} value The value to add.
     * @returns {Object} Returns `set`.
     */
    function addSetEntry(set, value) {
      // Don't return `set.add` because it's not chainable in IE 11.
      set.add(value);
      return set;
    }

    /**
     * A faster alternative to `Function#apply`, this function invokes `func`
     * with the `this` binding of `thisArg` and the arguments of `args`.
     *
     * @private
     * @param {Function} func The function to invoke.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} args The arguments to invoke `func` with.
     * @returns {*} Returns the result of `func`.
     */
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0: return func.call(thisArg);
        case 1: return func.call(thisArg, args[0]);
        case 2: return func.call(thisArg, args[0], args[1]);
        case 3: return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }

    /**
     * A specialized version of `_.forEach` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEach(array, iteratee) {
      var index = -1,
          length = array ? array.length : 0;

      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }

    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
    function arrayPush(array, values) {
      var index = -1,
          length = values.length,
          offset = array.length;

      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }

    /**
     * A specialized version of `_.reduce` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initAccum] Specify using the first element of `array` as
     *  the initial value.
     * @returns {*} Returns the accumulated value.
     */
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1,
          length = array ? array.length : 0;

      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }

    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */
    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }

    /**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }

    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }

    /**
     * Checks if `value` is a host object in IE < 9.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
     */
    function isHostObject(value) {
      // Many host objects are `Object` objects that can coerce to strings
      // despite having improperly defined `toString` methods.
      var result = false;
      if (value != null && typeof value.toString != 'function') {
        try {
          result = !!(value + '');
        } catch (e) {}
      }
      return result;
    }

    /**
     * Converts `map` to its key-value pairs.
     *
     * @private
     * @param {Object} map The map to convert.
     * @returns {Array} Returns the key-value pairs.
     */
    function mapToArray(map) {
      var index = -1,
          result = Array(map.size);

      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }

    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }

    /**
     * Converts `set` to an array of its values.
     *
     * @private
     * @param {Object} set The set to convert.
     * @returns {Array} Returns the values.
     */
    function setToArray(set) {
      var index = -1,
          result = Array(set.size);

      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }

    /** Used for built-in method references. */
    var arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;

    /** Used to detect overreaching core-js shims. */
    var coreJsData = root['__core-js_shared__'];

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString.call(Object);

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString = objectProto.toString;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Built-in value references. */
    var Buffer = moduleExports ? root.Buffer : undefined,
        Symbol = root.Symbol,
        Uint8Array = root.Uint8Array,
        getPrototype = overArg(Object.getPrototypeOf, Object),
        objectCreate = Object.create,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeGetSymbols = Object.getOwnPropertySymbols,
        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
        nativeKeys = overArg(Object.keys, Object),
        nativeMax = Math.max;

    /* Built-in method references that are verified to be native. */
    var DataView = getNative(root, 'DataView'),
        Map = getNative(root, 'Map'),
        Promise = getNative(root, 'Promise'),
        Set = getNative(root, 'Set'),
        WeakMap = getNative(root, 'WeakMap'),
        nativeCreate = getNative(Object, 'create');

    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Map),
        promiseCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        weakMapCtorString = toSource(WeakMap);

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol ? Symbol.prototype : undefined,
        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
    }

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
      return this;
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
    }

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = assocIndexOf(data, key);

      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['delete'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries ? entries.length : 0;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.__data__ = {
        'hash': new Hash,
        'map': new (Map || ListCache),
        'string': new Hash
      };
    }

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      return getMapData(this, key)['delete'](key);
    }

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['delete'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new ListCache;
    }

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      return this.__data__['delete'](key);
    }

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var cache = this.__data__;
      if (cache instanceof ListCache) {
        var pairs = cache.__data__;
        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
          pairs.push([key, value]);
          return this;
        }
        cache = this.__data__ = new MapCache(pairs);
      }
      cache.set(key, value);
      return this;
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
      // Safari 9 makes `arguments.length` enumerable in strict mode.
      var result = (isArray(value) || isArguments(value))
        ? baseTimes(value.length, String)
        : [];

      var length = result.length,
          skipIndexes = !!length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) &&
            !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * This function is like `assignValue` except that it doesn't assign
     * `undefined` values.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignMergeValue(object, key, value) {
      if ((value !== undefined && !eq(object[key], value)) ||
          (typeof key == 'number' && value === undefined && !(key in object))) {
        object[key] = value;
      }
    }

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
          (value === undefined && !(key in object))) {
        object[key] = value;
      }
    }

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    /**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return object && copyObject(source, keys(source), object);
    }

    /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @param {boolean} [isFull] Specify a clone including symbols.
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
      var result;
      if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value),
            isFunc = tag == funcTag || tag == genTag;

        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          if (isHostObject(value)) {
            return object ? value : {};
          }
          result = initCloneObject(isFunc ? {} : value);
          if (!isDeep) {
            return copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object ? value : {};
          }
          result = initCloneByTag(value, tag, baseClone, isDeep);
        }
      }
      // Check for circular references and return its corresponding clone.
      stack || (stack = new Stack);
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);

      if (!isArr) {
        var props = isFull ? getAllKeys(value) : keys(value);
      }
      arrayEach(props || value, function(subValue, key) {
        if (props) {
          key = subValue;
          subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
      });
      return result;
    }

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} prototype The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    function baseCreate(proto) {
      return isObject(proto) ? objectCreate(proto) : {};
    }

    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }

    /**
     * The base implementation of `getTag`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      return objectToString.call(value);
    }

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike(value) &&
        isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
    }

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeysIn(object) {
      if (!isObject(object)) {
        return nativeKeysIn(object);
      }
      var isProto = isPrototype(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.merge` without support for multiple sources.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      if (!(isArray(source) || isTypedArray(source))) {
        var props = baseKeysIn(source);
      }
      arrayEach(props || source, function(srcValue, key) {
        if (props) {
          key = srcValue;
          srcValue = source[key];
        }
        if (isObject(srcValue)) {
          stack || (stack = new Stack);
          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        }
        else {
          var newValue = customizer
            ? customizer(object[key], srcValue, (key + ''), object, source, stack)
            : undefined;

          if (newValue === undefined) {
            newValue = srcValue;
          }
          assignMergeValue(object, key, newValue);
        }
      });
    }

    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = object[key],
          srcValue = source[key],
          stacked = stack.get(srcValue);

      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer
        ? customizer(objValue, srcValue, (key + ''), object, source, stack)
        : undefined;

      var isCommon = newValue === undefined;

      if (isCommon) {
        newValue = srcValue;
        if (isArray(srcValue) || isTypedArray(srcValue)) {
          if (isArray(objValue)) {
            newValue = objValue;
          }
          else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          }
          else {
            isCommon = false;
            newValue = baseClone(srcValue, true);
          }
        }
        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          }
          else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
            isCommon = false;
            newValue = baseClone(srcValue, true);
          }
          else {
            newValue = objValue;
          }
        }
        else {
          isCommon = false;
        }
      }
      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
      }
      assignMergeValue(object, key, newValue);
    }

    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */
    function baseRest(func, start) {
      start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = array;
        return apply(func, this, otherArgs);
      };
    }

    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var result = new buffer.constructor(buffer.length);
      buffer.copy(result);
      return result;
    }

    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
      return result;
    }

    /**
     * Creates a clone of `dataView`.
     *
     * @private
     * @param {Object} dataView The data view to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned data view.
     */
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }

    /**
     * Creates a clone of `map`.
     *
     * @private
     * @param {Object} map The map to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned map.
     */
    function cloneMap(map, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
      return arrayReduce(array, addMapEntry, new map.constructor);
    }

    /**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */
    function cloneRegExp(regexp) {
      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
      result.lastIndex = regexp.lastIndex;
      return result;
    }

    /**
     * Creates a clone of `set`.
     *
     * @private
     * @param {Object} set The set to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned set.
     */
    function cloneSet(set, isDeep, cloneFunc) {
      var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
      return arrayReduce(array, addSetEntry, new set.constructor);
    }

    /**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }

    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject(source, props, object, customizer) {
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];

        var newValue = customizer
          ? customizer(object[key], source[key], key, object, source)
          : undefined;

        assignValue(object, key, newValue === undefined ? source[key] : newValue);
      }
      return object;
    }

    /**
     * Copies own symbol properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbols(source, object) {
      return copyObject(source, getSymbols(source), object);
    }

    /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined,
            guard = length > 2 ? sources[2] : undefined;

        customizer = (assigner.length > 3 && typeof customizer == 'function')
          ? (length--, customizer)
          : undefined;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }

    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : undefined;
    }

    /**
     * Creates an array of the own enumerable symbol properties of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    var getTag = baseGetTag;

    // Fallback for data views, maps, sets, and weak maps in IE 11,
    // for data views in Edge < 14, and promises in Node.js.
    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
        (Map && getTag(new Map) != mapTag) ||
        (Promise && getTag(Promise.resolve()) != promiseTag) ||
        (Set && getTag(new Set) != setTag) ||
        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
      getTag = function(value) {
        var result = objectToString.call(value),
            Ctor = result == objectTag ? value.constructor : undefined,
            ctorString = Ctor ? toSource(Ctor) : undefined;

        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString: return dataViewTag;
            case mapCtorString: return mapTag;
            case promiseCtorString: return promiseTag;
            case setCtorString: return setTag;
            case weakMapCtorString: return weakMapTag;
          }
        }
        return result;
      };
    }

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = array.constructor(length);

      // Add properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      return (typeof object.constructor == 'function' && !isPrototype(object))
        ? baseCreate(getPrototype(object))
        : {};
    }

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, cloneFunc, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object);

        case boolTag:
        case dateTag:
          return new Ctor(+object);

        case dataViewTag:
          return cloneDataView(object, isDeep);

        case float32Tag: case float64Tag:
        case int8Tag: case int16Tag: case int32Tag:
        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
          return cloneTypedArray(object, isDeep);

        case mapTag:
          return cloneMap(object, isDeep, cloneFunc);

        case numberTag:
        case stringTag:
          return new Ctor(object);

        case regexpTag:
          return cloneRegExp(object);

        case setTag:
          return cloneSet(object, isDeep, cloneFunc);

        case symbolTag:
          return cloneSymbol(object);
      }
    }

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length &&
        (typeof value == 'number' || reIsUint.test(value)) &&
        (value > -1 && value % 1 == 0 && value < length);
    }

    /**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
            ? (isArrayLike(object) && isIndex(index, object.length))
            : (type == 'string' && index in object)
          ) {
        return eq(object[index], value);
      }
      return false;
    }

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

      return value === proto;
    }

    /**
     * Used by `_.defaultsDeep` to customize its `_.merge` use.
     *
     * @private
     * @param {*} objValue The destination value.
     * @param {*} srcValue The source value.
     * @param {string} key The key of the property to merge.
     * @param {Object} object The parent object of `objValue`.
     * @param {Object} source The parent object of `srcValue`.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     * @returns {*} Returns the value to assign.
     */
    function mergeDefaults(objValue, srcValue, key, object, source, stack) {
      if (isObject(objValue) && isObject(srcValue)) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, objValue);
        baseMerge(objValue, srcValue, undefined, mergeDefaults, stack);
        stack['delete'](srcValue);
      }
      return objValue;
    }

    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to process.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    function isArguments(value) {
      // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
      return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
        (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
    }

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse;

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 8-9 which returns 'object' for typed array and other constructors.
      var tag = isObject(value) ? objectToString.call(value) : '';
      return tag == funcTag || tag == genTag;
    }

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      if (!isObjectLike(value) ||
          objectToString.call(value) != objectTag || isHostObject(value)) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
      return (typeof Ctor == 'function' &&
        Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
    }

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

    /**
     * Converts `value` to a plain object flattening inherited enumerable string
     * keyed properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }

    /**
     * This method is like `_.defaults` except that it recursively assigns
     * default properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 3.10.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @see _.defaults
     * @example
     *
     * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
     * // => { 'a': { 'b': 2, 'c': 3 } }
     */
    var defaultsDeep = baseRest(function(args) {
      args.push(undefined, mergeDefaults);
      return apply(mergeWith, undefined, args);
    });

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
    }

    /**
     * This method is like `_.merge` except that it accepts `customizer` which
     * is invoked to produce the merged values of the destination and source
     * properties. If `customizer` returns `undefined`, merging is handled by the
     * method instead. The `customizer` is invoked with seven arguments:
     * (objValue, srcValue, key, object, source, stack).
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} sources The source objects.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function customizer(objValue, srcValue) {
     *   if (_.isArray(objValue)) {
     *     return objValue.concat(srcValue);
     *   }
     * }
     *
     * var object = { 'a': [1], 'b': [2] };
     * var other = { 'a': [3], 'b': [4] };
     *
     * _.mergeWith(object, other, customizer);
     * // => { 'a': [1, 3], 'b': [2, 4] }
     */
    var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
      baseMerge(object, source, srcIndex, customizer);
    });

    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */
    function stubArray() {
      return [];
    }

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    module.exports = defaultsDeep;
    });

    var defaultConfig = {
        optionsAuth0: {
            clientID: 'INGoYuDZDgaxT8JOL64M7vnJcxEGxCi0',
            domain: 'login.24SevenOffice.com',
            configurationBaseUrl: 'tfso.eu.auth0.com'
        },
        identityApiUrl: 'https://identity.api.24sevenoffice.com',
        authenticateJwtUrl: '/login/data/AuthenticateJwt.aspx',
        loginUrl: function () { return "/modules/auth/login/?returnUrl=" + encodeURIComponent(window.location.origin + window.location.pathname); },
        logoutUrl: function () { return "/modules/auth/logout"; },
        callbackUrl: window.location.origin + "/modules/auth/login-callback?isSilent=true"
    };

    var Authenticator = /** @class */ (function () {
        function Authenticator(config) {
            this._config = lodash_defaultsdeep({}, config, defaultConfig);
            this._webAuth = createWebAuth(this._config.optionsAuth0);
        }
        Authenticator.prototype.getCurrentlyLoggedInIdentityOrNull = function () {
            return __awaiter(this, void 0, void 0, function () {
                var token, identity;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._getIdentityApiTokenOrNulIfAuthRequired()];
                        case 1:
                            token = _a.sent();
                            if (token === null) {
                                return [2 /*return*/, null];
                            }
                            return [4 /*yield*/, this._getIdentityOrNullIfCookieRequired()];
                        case 2:
                            identity = _a.sent();
                            if (!(identity === null)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this._setLegacyCookieIfPossible(token)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this._getIdentityOrNullIfCookieRequired()];
                        case 4:
                            identity = _a.sent();
                            _a.label = 5;
                        case 5:
                            if (identity === null) {
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, identity];
                    }
                });
            });
        };
        Authenticator.prototype.ensureLoggedIn = function () {
            return __awaiter(this, void 0, void 0, function () {
                var identity;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getCurrentlyLoggedInIdentityOrNull()];
                        case 1:
                            identity = _a.sent();
                            if (identity === null) {
                                this.redirectToLogin();
                                return [2 /*return*/];
                            }
                            return [2 /*return*/, identity];
                    }
                });
            });
        };
        Authenticator.prototype.redirectToLogin = function () {
            window.location.href = typeof this._config.loginUrl === 'function'
                ? this._config.loginUrl()
                : this._config.loginUrl;
        };
        Authenticator.prototype.redirectToLogout = function () {
            window.location.href = typeof this._config.logoutUrl === 'function'
                ? this._config.logoutUrl()
                : this._config.logoutUrl;
        };
        Authenticator.prototype._getIdentityOrNullIfCookieRequired = function () {
            return __awaiter(this, void 0, void 0, function () {
                var res, err, body, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, fetch(cacheBustUrl(this._config.identityApiUrl), {
                                method: 'GET',
                                credentials: 'include',
                                headers: {
                                    'Accept': 'application/json'
                                }
                            })];
                        case 1:
                            res = _b.sent();
                            if (res.status === 401) {
                                return [2 /*return*/, null];
                            }
                            if (!(res.status < 200 || res.status >= 300)) return [3 /*break*/, 6];
                            err = new Error(res.statusText);
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, res.json()];
                        case 3:
                            body = _b.sent();
                            err.message = (body.error && body.message) || err.message;
                            err.trackingId = body.trackingId;
                            return [3 /*break*/, 5];
                        case 4:
                            _a = _b.sent();
                            return [3 /*break*/, 5];
                        case 5:
                            err.status = res.status;
                            throw err;
                        case 6: return [2 /*return*/, res.json()];
                    }
                });
            });
        };
        Authenticator.prototype._setLegacyCookieIfPossible = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, fetch(this._config.authenticateJwtUrl, {
                                    method: 'POST',
                                    credentials: 'same-origin',
                                    headers: {
                                        'Authorization': 'Bearer ' + token.accessToken
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _a.sent();
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        Authenticator.prototype._getIdentityApiTokenOrNulIfAuthRequired = function () {
            return __awaiter(this, void 0, void 0, function () {
                var opts, error_1, errorsWhereAuthIsRequired;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            opts = {
                                audience: 'https://app.24sevenoffice.com',
                                responseType: 'token',
                                redirectUri: this._config.callbackUrl
                            };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this._webAuth.checkSession(opts)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_1 = _a.sent();
                            errorsWhereAuthIsRequired = [
                                'login_required',
                                'consent_required',
                                'interaction_required',
                                'unauthorized'
                            ];
                            if (errorsWhereAuthIsRequired.includes(error_1.error)) {
                                return [2 /*return*/, null];
                            }
                            throw error_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return Authenticator;
    }());
    var cacheBustUrl = function (url) {
        url = new URL(url, window.location.origin);
        url.searchParams.set('_dc', Date.now());
        return url.toString();
    };

    var eventemitter3 = createCommonjsModule$1(function (module) {

    var has = Object.prototype.hasOwnProperty
      , prefix = '~';

    /**
     * Constructor to create a storage for our `EE` objects.
     * An `Events` instance is a plain object whose properties are event names.
     *
     * @constructor
     * @private
     */
    function Events() {}

    //
    // We try to not inherit from `Object.prototype`. In some engines creating an
    // instance in this way is faster than calling `Object.create(null)` directly.
    // If `Object.create(null)` is not supported we prefix the event names with a
    // character to make sure that the built-in object properties are not
    // overridden or used as an attack vector.
    //
    if (Object.create) {
      Events.prototype = Object.create(null);

      //
      // This hack is needed because the `__proto__` property is still inherited in
      // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
      //
      if (!new Events().__proto__) prefix = false;
    }

    /**
     * Representation of a single event listener.
     *
     * @param {Function} fn The listener function.
     * @param {*} context The context to invoke the listener with.
     * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
     * @constructor
     * @private
     */
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }

    /**
     * Add a listener for a given event.
     *
     * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn The listener function.
     * @param {*} context The context to invoke the listener with.
     * @param {Boolean} once Specify if the listener is a one-time listener.
     * @returns {EventEmitter}
     * @private
     */
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== 'function') {
        throw new TypeError('The listener must be a function');
      }

      var listener = new EE(fn, context || emitter, once)
        , evt = prefix ? prefix + event : event;

      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];

      return emitter;
    }

    /**
     * Clear event by name.
     *
     * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
     * @param {(String|Symbol)} evt The Event name.
     * @private
     */
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }

    /**
     * Minimal `EventEmitter` interface that is molded against the Node.js
     * `EventEmitter` interface.
     *
     * @constructor
     * @public
     */
    function EventEmitter() {
      this._events = new Events();
      this._eventsCount = 0;
    }

    /**
     * Return an array listing the events for which the emitter has registered
     * listeners.
     *
     * @returns {Array}
     * @public
     */
    EventEmitter.prototype.eventNames = function eventNames() {
      var names = []
        , events
        , name;

      if (this._eventsCount === 0) return names;

      for (name in (events = this._events)) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }

      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }

      return names;
    };

    /**
     * Return the listeners registered for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Array} The registered listeners.
     * @public
     */
    EventEmitter.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event
        , handlers = this._events[evt];

      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];

      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }

      return ee;
    };

    /**
     * Return the number of listeners listening to a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Number} The number of listeners.
     * @public
     */
    EventEmitter.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event
        , listeners = this._events[evt];

      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };

    /**
     * Calls each of the listeners registered for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @returns {Boolean} `true` if the event had listeners, else `false`.
     * @public
     */
    EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;

      if (!this._events[evt]) return false;

      var listeners = this._events[evt]
        , len = arguments.length
        , args
        , i;

      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

        switch (len) {
          case 1: return listeners.fn.call(listeners.context), true;
          case 2: return listeners.fn.call(listeners.context, a1), true;
          case 3: return listeners.fn.call(listeners.context, a1, a2), true;
          case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }

        for (i = 1, args = new Array(len -1); i < len; i++) {
          args[i - 1] = arguments[i];
        }

        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length
          , j;

        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

          switch (len) {
            case 1: listeners[i].fn.call(listeners[i].context); break;
            case 2: listeners[i].fn.call(listeners[i].context, a1); break;
            case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
            case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
            default:
              if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
                args[j - 1] = arguments[j];
              }

              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }

      return true;
    };

    /**
     * Add a listener for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn The listener function.
     * @param {*} [context=this] The context to invoke the listener with.
     * @returns {EventEmitter} `this`.
     * @public
     */
    EventEmitter.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };

    /**
     * Add a one-time listener for a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn The listener function.
     * @param {*} [context=this] The context to invoke the listener with.
     * @returns {EventEmitter} `this`.
     * @public
     */
    EventEmitter.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };

    /**
     * Remove the listeners of a given event.
     *
     * @param {(String|Symbol)} event The event name.
     * @param {Function} fn Only remove the listeners that match this function.
     * @param {*} context Only remove the listeners that have this context.
     * @param {Boolean} once Only remove one-time listeners.
     * @returns {EventEmitter} `this`.
     * @public
     */
    EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;

      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }

      var listeners = this._events[evt];

      if (listeners.fn) {
        if (
          listeners.fn === fn &&
          (!once || listeners.once) &&
          (!context || listeners.context === context)
        ) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (
            listeners[i].fn !== fn ||
            (once && !listeners[i].once) ||
            (context && listeners[i].context !== context)
          ) {
            events.push(listeners[i]);
          }
        }

        //
        // Reset the array, or remove it completely if we have no more listeners.
        //
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }

      return this;
    };

    /**
     * Remove all listeners, or those of the specified event.
     *
     * @param {(String|Symbol)} [event] The event name.
     * @returns {EventEmitter} `this`.
     * @public
     */
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;

      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }

      return this;
    };

    //
    // Alias methods names because people roll like that.
    //
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;

    //
    // Expose the prefix.
    //
    EventEmitter.prefixed = prefix;

    //
    // Allow `EventEmitter` to be imported as module namespace.
    //
    EventEmitter.EventEmitter = EventEmitter;

    //
    // Expose the module.
    //
    {
      module.exports = EventEmitter;
    }
    });

    var Authorizer = /** @class */ (function (_super) {
        __extends(Authorizer, _super);
        function Authorizer(config) {
            var _this = _super.call(this) || this;
            _this._checkSessionCount = 0;
            _this._accesses = {};
            _this._accessesToRefresh = {};
            _this._config = lodash_defaultsdeep({}, config, defaultConfig);
            _this._webAuth = createWebAuth(_this._config.optionsAuth0);
            return _this;
        }
        /**
         * This function returns after the first token has been retrieved (or failed).
         * It will also periodically refresh the token, so you need to listen for
         * 'access-success' and 'access-failure' to be informed when the token changes.
         */
        Authorizer.prototype.authorize = function (tokenConfig, license) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._refreshToken(tokenConfig, license)];
                        case 1:
                            _a.sent();
                            this._keepTokenFresh(tokenConfig, license);
                            return [2 /*return*/, this.getAccess(tokenConfig.key, license)];
                    }
                });
            });
        };
        Authorizer.prototype.authorizeOnce = function (tokenConfig, license) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._refreshToken(tokenConfig, license)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.getAccess(tokenConfig.key, license)];
                    }
                });
            });
        };
        Authorizer.prototype.unauthorize = function (key, license) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    delete this._accesses[this._accessKey(key, license)];
                    delete this._accessesToRefresh[this._accessKey(key, license)];
                    return [2 /*return*/];
                });
            });
        };
        Authorizer.prototype.getAccesses = function () {
            return Object.values(this._accesses);
        };
        Authorizer.prototype.hasAccess = function (key, license) {
            return !!this.getAccess(key, license);
        };
        Authorizer.prototype.getAccess = function (key, license) {
            return this._accesses[this._accessKey(key, license)];
        };
        Authorizer.prototype.isRefreshing = function (key, license) {
            return this._accessesToRefresh[this._accessKey(key, license)];
        };
        Authorizer.prototype._accessKey = function (tokenKey, license) {
            return tokenKey + "-" + license;
        };
        Authorizer.prototype._setAccess = function (access) {
            this._accesses[this._accessKey(access.tokenConfig.key, access.license)] = access;
        };
        Authorizer.prototype._setRefresh = function (key, license) {
            this._accessesToRefresh[this._accessKey(key, license)] = true;
        };
        Authorizer.prototype._keepTokenFresh = function (tokenConfig, license) {
            var _this = this;
            if (this.isRefreshing(tokenConfig.key, license)) {
                return;
            }
            this._setRefresh(tokenConfig.key, license);
            var delay = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
            var waitAndRefreshAgain = function () {
                if (!_this.isRefreshing(tokenConfig.key, license)) {
                    return;
                }
                delay(15 * 60 * 1000)
                    .then(function () { return _this._refreshToken(tokenConfig, license); })
                    .then(waitAndRefreshAgain);
            };
            waitAndRefreshAgain();
        };
        Authorizer.prototype._refreshToken = function (tokenConfig, license) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._checkSession(tokenConfig, license)];
                        case 1:
                            result = _a.sent();
                            if (result.error) {
                                this._onTokenFailure(result);
                            }
                            else {
                                this._onTokenSuccess(result);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        Authorizer.prototype._onTokenSuccess = function (_a) {
            var tokenConfig = _a.tokenConfig, token = _a.token, license = _a.license, expiresAt = _a.expiresAt;
            var access = {
                type: 'success',
                tokenConfig: tokenConfig,
                token: token,
                error: null,
                license: license,
                expiresAt: expiresAt,
                scopesAccepted: token.scope ? token.scope.split(' ') : []
            };
            this._setAccess(access);
            this.emit('access-success', access);
        };
        Authorizer.prototype._onTokenFailure = function (_a) {
            var tokenConfig = _a.tokenConfig, error = _a.error, license = _a.license;
            var errorsWhereAuthIsRequired = [
                'login_required',
                'consent_required',
                'interaction_required',
                'unauthorized'
            ];
            var access = {
                type: 'failure',
                tokenConfig: tokenConfig,
                token: null,
                error: error,
                license: license,
                userInteractionRequired: errorsWhereAuthIsRequired.includes(error.error),
                scopesAccepted: []
            };
            this._setAccess(access);
            this.emit('access-failure', access);
        };
        Authorizer.prototype._checkSession = function (tokenConfig, license) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, identityId, clientId, userId, opts, token, expiresAt, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = license.split(';'), identityId = _a[0], clientId = _a[1], userId = _a[2];
                            opts = {
                                audience: tokenConfig.audience,
                                scope: tokenConfig.scopes.join(' '),
                                state: "identityId:" + identityId + ";clientId:" + clientId + ";userId:" + userId + ";unique:" + ++this._checkSessionCount,
                                responseType: 'token',
                                redirectUri: this._config.callbackUrl
                            };
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this._webAuth.checkSession(opts)];
                        case 2:
                            token = _b.sent();
                            expiresAt = token.expiresIn !== undefined ? token.expiresIn + Date.now() : null;
                            return [2 /*return*/, { type: 'success', tokenConfig: tokenConfig, token: token, error: null, license: license, expiresAt: expiresAt }];
                        case 3:
                            error_1 = _b.sent();
                            return [2 /*return*/, { type: 'error', tokenConfig: tokenConfig, token: null, error: error_1, license: license }];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return Authorizer;
    }(eventemitter3));

    var ablyCommonjs = createCommonjsModule$1(function (module) {
    /**
     * @license Copyright 2019, Ably
     *
     * Ably JavaScript Library v1.1.22
     * https://github.com/ably/ably-js
     *
     * Ably Realtime Messaging
     * https://www.ably.io
     *
     * Released under the Apache Licence v2.0
     */

    var Ably = {};

    var global = (typeof window === 'object' && window) || (typeof self === 'object' && self);

    /**
     * CryptoJS core components.
     */
    var CryptoJS = CryptoJS || (function (Math, undefined) {
        /**
         * CryptoJS namespace.
         */
        var C = {};

        /**
         * Library namespace.
         */
        var C_lib = C.lib = {};

        /**
         * Base object for prototypal inheritance.
         */
        var Base = C_lib.Base = (function () {
            function F() {}

            return {
                /**
                 * Creates a new object that inherits from this object.
                 *
                 * @param {Object} overrides Properties to copy into the new object.
                 *
                 * @return {Object} The new object.
                 *
                 * @static
                 *
                 * @example
                 *
                 *     var MyType = CryptoJS.lib.Base.extend({
                 *         field: 'value',
                 *
                 *         method: function () {
                 *         }
                 *     });
                 */
                extend: function (overrides) {
                    // Spawn
                    F.prototype = this;
                    var subtype = new F();

                    // Augment
                    if (overrides) {
                        subtype.mixIn(overrides);
                    }

                    // Create default initializer
                    if (!subtype.hasOwnProperty('init')) {
                        subtype.init = function () {
                            subtype.$super.init.apply(this, arguments);
                        };
                    }

                    // Initializer's prototype is the subtype object
                    subtype.init.prototype = subtype;

                    // Reference supertype
                    subtype.$super = this;

                    return subtype;
                },

                /**
                 * Extends this object and runs the init method.
                 * Arguments to create() will be passed to init().
                 *
                 * @return {Object} The new object.
                 *
                 * @static
                 *
                 * @example
                 *
                 *     var instance = MyType.create();
                 */
                create: function () {
                    var instance = this.extend();
                    instance.init.apply(instance, arguments);

                    return instance;
                },

                /**
                 * Initializes a newly created object.
                 * Override this method to add some logic when your objects are created.
                 *
                 * @example
                 *
                 *     var MyType = CryptoJS.lib.Base.extend({
                 *         init: function () {
                 *             // ...
                 *         }
                 *     });
                 */
                init: function () {
                },

                /**
                 * Copies properties into this object.
                 *
                 * @param {Object} properties The properties to mix in.
                 *
                 * @example
                 *
                 *     MyType.mixIn({
                 *         field: 'value'
                 *     });
                 */
                mixIn: function (properties) {
                    for (var propertyName in properties) {
                        if (properties.hasOwnProperty(propertyName)) {
                            this[propertyName] = properties[propertyName];
                        }
                    }

                    // IE won't copy toString using the loop above
                    if (properties.hasOwnProperty('toString')) {
                        this.toString = properties.toString;
                    }
                },

                /**
                 * Creates a copy of this object.
                 *
                 * @return {Object} The clone.
                 *
                 * @example
                 *
                 *     var clone = instance.clone();
                 */
                clone: function () {
                    return this.init.prototype.extend(this);
                }
            };
        }());

        /**
         * An array of 32-bit words.
         *
         * @property {Array} words The array of 32-bit words.
         * @property {number} sigBytes The number of significant bytes in this word array.
         */
        var WordArray = C_lib.WordArray = Base.extend({
            /**
             * Initializes a newly created word array.
             *
             * @param {Array} words (Optional) An array of 32-bit words.
             * @param {number} sigBytes (Optional) The number of significant bytes in the words.
             *
             * @example
             *
             *     var wordArray = CryptoJS.lib.WordArray.create();
             *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
             *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
             */
            init: function (words, sigBytes) {
                words = this.words = words || [];

                if (sigBytes != undefined) {
                    this.sigBytes = sigBytes;
                } else {
                    this.sigBytes = words.length * 4;
                }
            },

            /**
             * Converts this word array to a string.
             *
             * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
             *
             * @return {string} The stringified word array.
             *
             * @example
             *
             *     var string = wordArray + '';
             *     var string = wordArray.toString();
             *     var string = wordArray.toString(CryptoJS.enc.Utf8);
             */
            toString: function (encoder) {
                return (encoder || Hex).stringify(this);
            },

            /**
             * Concatenates a word array to this word array.
             *
             * @param {WordArray} wordArray The word array to append.
             *
             * @return {WordArray} This word array.
             *
             * @example
             *
             *     wordArray1.concat(wordArray2);
             */
            concat: function (wordArray) {
                // Shortcuts
                var thisWords = this.words;
                var thatWords = wordArray.words;
                var thisSigBytes = this.sigBytes;
                var thatSigBytes = wordArray.sigBytes;

                // Clamp excess bits
                this.clamp();

                // Concat
                if (thisSigBytes % 4) {
                    // Copy one byte at a time
                    for (var i = 0; i < thatSigBytes; i++) {
                        var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                        thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
                    }
                } else if (thatWords.length > 0xffff) {
                    // Copy one word at a time
                    for (var i = 0; i < thatSigBytes; i += 4) {
                        thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
                    }
                } else {
                    // Copy all words at once
                    thisWords.push.apply(thisWords, thatWords);
                }
                this.sigBytes += thatSigBytes;

                // Chainable
                return this;
            },

            /**
             * Removes insignificant bits.
             *
             * @example
             *
             *     wordArray.clamp();
             */
            clamp: function () {
                // Shortcuts
                var words = this.words;
                var sigBytes = this.sigBytes;

                // Clamp
                words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
                words.length = Math.ceil(sigBytes / 4);
            },

            /**
             * Creates a copy of this word array.
             *
             * @return {WordArray} The clone.
             *
             * @example
             *
             *     var clone = wordArray.clone();
             */
            clone: function () {
                var clone = Base.clone.call(this);
                clone.words = this.words.slice(0);

                return clone;
            },

            /**
             * Creates a word array filled with random bytes.
             *
             * @param {number} nBytes The number of random bytes to generate.
             *
             * @return {WordArray} The random word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.lib.WordArray.random(16);
             */
            random: function (nBytes) {
                var words = [];

                var r = (function (m_w) {
                    var m_w = m_w;
                    var m_z = 0x3ade68b1;
                    var mask = 0xffffffff;

                    return function () {
                        m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
                        m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
                        var result = ((m_z << 0x10) + m_w) & mask;
                        result /= 0x100000000;
                        result += 0.5;
                        return result * (Math.random() > .5 ? 1 : -1);
                    }
                });

                for (var i = 0, rcache; i < nBytes; i += 4) {
                    var _r = r((rcache || Math.random()) * 0x100000000);

                    rcache = _r() * 0x3ade67b7;
                    words.push((_r() * 0x100000000) | 0);
                }

                return new WordArray.init(words, nBytes);
            }
        });

        /**
         * Encoder namespace.
         */
        var C_enc = C.enc = {};

        /**
         * Hex encoding strategy.
         */
        var Hex = C_enc.Hex = {
            /**
             * Converts a word array to a hex string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The hex string.
             *
             * @static
             *
             * @example
             *
             *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
             */
            stringify: function (wordArray) {
                // Shortcuts
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;

                // Convert
                var hexChars = [];
                for (var i = 0; i < sigBytes; i++) {
                    var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                    hexChars.push((bite >>> 4).toString(16));
                    hexChars.push((bite & 0x0f).toString(16));
                }

                return hexChars.join('');
            },

            /**
             * Converts a hex string to a word array.
             *
             * @param {string} hexStr The hex string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
             */
            parse: function (hexStr) {
                // Shortcut
                var hexStrLength = hexStr.length;

                // Convert
                var words = [];
                for (var i = 0; i < hexStrLength; i += 2) {
                    words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
                }

                return new WordArray.init(words, hexStrLength / 2);
            }
        };

        /**
         * Latin1 encoding strategy.
         */
        var Latin1 = C_enc.Latin1 = {
            /**
             * Converts a word array to a Latin1 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The Latin1 string.
             *
             * @static
             *
             * @example
             *
             *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
             */
            stringify: function (wordArray) {
                // Shortcuts
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;

                // Convert
                var latin1Chars = [];
                for (var i = 0; i < sigBytes; i++) {
                    var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
                    latin1Chars.push(String.fromCharCode(bite));
                }

                return latin1Chars.join('');
            },

            /**
             * Converts a Latin1 string to a word array.
             *
             * @param {string} latin1Str The Latin1 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
             */
            parse: function (latin1Str) {
                // Shortcut
                var latin1StrLength = latin1Str.length;

                // Convert
                var words = [];
                for (var i = 0; i < latin1StrLength; i++) {
                    words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
                }

                return new WordArray.init(words, latin1StrLength);
            }
        };

        /**
         * UTF-8 encoding strategy.
         */
        var Utf8 = C_enc.Utf8 = {
            /**
             * Converts a word array to a UTF-8 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The UTF-8 string.
             *
             * @static
             *
             * @example
             *
             *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
             */
            stringify: function (wordArray) {
                try {
                    return decodeURIComponent(escape(Latin1.stringify(wordArray)));
                } catch (e) {
                    throw new Error('Malformed UTF-8 data');
                }
            },

            /**
             * Converts a UTF-8 string to a word array.
             *
             * @param {string} utf8Str The UTF-8 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
             */
            parse: function (utf8Str) {
                return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
        };

        /**
         * Abstract buffered block algorithm template.
         *
         * The property blockSize must be implemented in a concrete subtype.
         *
         * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
         */
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            /**
             * Resets this block algorithm's data buffer to its initial state.
             *
             * @example
             *
             *     bufferedBlockAlgorithm.reset();
             */
            reset: function () {
                // Initial values
                this._data = new WordArray.init();
                this._nDataBytes = 0;
            },

            /**
             * Adds new data to this block algorithm's buffer.
             *
             * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
             *
             * @example
             *
             *     bufferedBlockAlgorithm._append('data');
             *     bufferedBlockAlgorithm._append(wordArray);
             */
            _append: function (data) {
                // Convert string to WordArray, else assume WordArray already
                if (typeof data == 'string') {
                    data = Utf8.parse(data);
                }

                // Append
                this._data.concat(data);
                this._nDataBytes += data.sigBytes;
            },

            /**
             * Processes available data blocks.
             *
             * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
             *
             * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
             *
             * @return {WordArray} The processed data.
             *
             * @example
             *
             *     var processedData = bufferedBlockAlgorithm._process();
             *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
             */
            _process: function (doFlush) {
                // Shortcuts
                var data = this._data;
                var dataWords = data.words;
                var dataSigBytes = data.sigBytes;
                var blockSize = this.blockSize;
                var blockSizeBytes = blockSize * 4;

                // Count blocks ready
                var nBlocksReady = dataSigBytes / blockSizeBytes;
                if (doFlush) {
                    // Round up to include partial blocks
                    nBlocksReady = Math.ceil(nBlocksReady);
                } else {
                    // Round down to include only full blocks,
                    // less the number of blocks that must remain in the buffer
                    nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
                }

                // Count words ready
                var nWordsReady = nBlocksReady * blockSize;

                // Count bytes ready
                var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

                // Process blocks
                if (nWordsReady) {
                    for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                        // Perform concrete-algorithm logic
                        this._doProcessBlock(dataWords, offset);
                    }

                    // Remove processed words
                    var processedWords = dataWords.splice(0, nWordsReady);
                    data.sigBytes -= nBytesReady;
                }

                // Return processed words
                return new WordArray.init(processedWords, nBytesReady);
            },

            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = bufferedBlockAlgorithm.clone();
             */
            clone: function () {
                var clone = Base.clone.call(this);
                clone._data = this._data.clone();

                return clone;
            },

            _minBufferSize: 0
        });

        /**
         * Abstract hasher template.
         *
         * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
         */
        var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
            /**
             * Configuration options.
             */
            cfg: Base.extend(),

            /**
             * Initializes a newly created hasher.
             *
             * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
             *
             * @example
             *
             *     var hasher = CryptoJS.algo.SHA256.create();
             */
            init: function (cfg) {
                // Apply config defaults
                this.cfg = this.cfg.extend(cfg);

                // Set initial values
                this.reset();
            },

            /**
             * Resets this hasher to its initial state.
             *
             * @example
             *
             *     hasher.reset();
             */
            reset: function () {
                // Reset data buffer
                BufferedBlockAlgorithm.reset.call(this);

                // Perform concrete-hasher logic
                this._doReset();
            },

            /**
             * Updates this hasher with a message.
             *
             * @param {WordArray|string} messageUpdate The message to append.
             *
             * @return {Hasher} This hasher.
             *
             * @example
             *
             *     hasher.update('message');
             *     hasher.update(wordArray);
             */
            update: function (messageUpdate) {
                // Append
                this._append(messageUpdate);

                // Update the hash
                this._process();

                // Chainable
                return this;
            },

            /**
             * Finalizes the hash computation.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} messageUpdate (Optional) A final message update.
             *
             * @return {WordArray} The hash.
             *
             * @example
             *
             *     var hash = hasher.finalize();
             *     var hash = hasher.finalize('message');
             *     var hash = hasher.finalize(wordArray);
             */
            finalize: function (messageUpdate) {
                // Final message update
                if (messageUpdate) {
                    this._append(messageUpdate);
                }

                // Perform concrete-hasher logic
                var hash = this._doFinalize();

                return hash;
            },

            blockSize: 512/32,

            /**
             * Creates a shortcut function to a hasher's object interface.
             *
             * @param {Hasher} hasher The hasher to create a helper for.
             *
             * @return {Function} The shortcut function.
             *
             * @static
             *
             * @example
             *
             *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
             */
            _createHelper: function (hasher) {
                return function (message, cfg) {
                    return new hasher.init(cfg).finalize(message);
                };
            },

            /**
             * Creates a shortcut function to the HMAC's object interface.
             *
             * @param {Hasher} hasher The hasher to use in this HMAC helper.
             *
             * @return {Function} The shortcut function.
             *
             * @static
             *
             * @example
             *
             *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
             */
            _createHmacHelper: function (hasher) {
                return function (message, key) {
                    return new C_algo.HMAC.init(hasher, key).finalize(message);
                };
            }
        });

        /**
         * Algorithm namespace.
         */
        var C_algo = C.algo = {};

        return C;
    }(Math));

    (function (Math) {
        // Shortcuts
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;

        // Initialization and round constants tables
        var H = [];
        var K = [];

        // Compute constants
        (function () {
            function isPrime(n) {
                var sqrtN = Math.sqrt(n);
                for (var factor = 2; factor <= sqrtN; factor++) {
                    if (!(n % factor)) {
                        return false;
                    }
                }

                return true;
            }

            function getFractionalBits(n) {
                return ((n - (n | 0)) * 0x100000000) | 0;
            }

            var n = 2;
            var nPrime = 0;
            while (nPrime < 64) {
                if (isPrime(n)) {
                    if (nPrime < 8) {
                        H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
                    }
                    K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

                    nPrime++;
                }

                n++;
            }
        }());

        // Reusable object
        var W = [];

        /**
         * SHA-256 hash algorithm.
         */
        var SHA256 = C_algo.SHA256 = Hasher.extend({
            _doReset: function () {
                this._hash = new WordArray.init(H.slice(0));
            },

            _doProcessBlock: function (M, offset) {
                // Shortcut
                var H = this._hash.words;

                // Working variables
                var a = H[0];
                var b = H[1];
                var c = H[2];
                var d = H[3];
                var e = H[4];
                var f = H[5];
                var g = H[6];
                var h = H[7];

                // Computation
                for (var i = 0; i < 64; i++) {
                    if (i < 16) {
                        W[i] = M[offset + i] | 0;
                    } else {
                        var gamma0x = W[i - 15];
                        var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
                                      ((gamma0x << 14) | (gamma0x >>> 18)) ^
                                       (gamma0x >>> 3);

                        var gamma1x = W[i - 2];
                        var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
                                      ((gamma1x << 13) | (gamma1x >>> 19)) ^
                                       (gamma1x >>> 10);

                        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                    }

                    var ch  = (e & f) ^ (~e & g);
                    var maj = (a & b) ^ (a & c) ^ (b & c);

                    var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
                    var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

                    var t1 = h + sigma1 + ch + K[i] + W[i];
                    var t2 = sigma0 + maj;

                    h = g;
                    g = f;
                    f = e;
                    e = (d + t1) | 0;
                    d = c;
                    c = b;
                    b = a;
                    a = (t1 + t2) | 0;
                }

                // Intermediate hash value
                H[0] = (H[0] + a) | 0;
                H[1] = (H[1] + b) | 0;
                H[2] = (H[2] + c) | 0;
                H[3] = (H[3] + d) | 0;
                H[4] = (H[4] + e) | 0;
                H[5] = (H[5] + f) | 0;
                H[6] = (H[6] + g) | 0;
                H[7] = (H[7] + h) | 0;
            },

            _doFinalize: function () {
                // Shortcuts
                var data = this._data;
                var dataWords = data.words;

                var nBitsTotal = this._nDataBytes * 8;
                var nBitsLeft = data.sigBytes * 8;

                // Add padding
                dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
                dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
                dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
                data.sigBytes = dataWords.length * 4;

                // Hash final blocks
                this._process();

                // Return final computed hash
                return this._hash;
            },

            clone: function () {
                var clone = Hasher.clone.call(this);
                clone._hash = this._hash.clone();

                return clone;
            }
        });

        /**
         * Shortcut function to the hasher's object interface.
         *
         * @param {WordArray|string} message The message to hash.
         *
         * @return {WordArray} The hash.
         *
         * @static
         *
         * @example
         *
         *     var hash = CryptoJS.SHA256('message');
         *     var hash = CryptoJS.SHA256(wordArray);
         */
        C.SHA256 = Hasher._createHelper(SHA256);

        /**
         * Shortcut function to the HMAC's object interface.
         *
         * @param {WordArray|string} message The message to hash.
         * @param {WordArray|string} key The secret key.
         *
         * @return {WordArray} The HMAC.
         *
         * @static
         *
         * @example
         *
         *     var hmac = CryptoJS.HmacSHA256(message, key);
         */
        C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
    }(Math));

    (function () {
        // Shortcuts
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var C_algo = C.algo;

        /**
         * HMAC algorithm.
         */
        var HMAC = C_algo.HMAC = Base.extend({
            /**
             * Initializes a newly created HMAC.
             *
             * @param {Hasher} hasher The hash algorithm to use.
             * @param {WordArray|string} key The secret key.
             *
             * @example
             *
             *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
             */
            init: function (hasher, key) {
                // Init hasher
                hasher = this._hasher = new hasher.init();

                // Convert string to WordArray, else assume WordArray already
                if (typeof key == 'string') {
                    key = Utf8.parse(key);
                }

                // Shortcuts
                var hasherBlockSize = hasher.blockSize;
                var hasherBlockSizeBytes = hasherBlockSize * 4;

                // Allow arbitrary length keys
                if (key.sigBytes > hasherBlockSizeBytes) {
                    key = hasher.finalize(key);
                }

                // Clamp excess bits
                key.clamp();

                // Clone key for inner and outer pads
                var oKey = this._oKey = key.clone();
                var iKey = this._iKey = key.clone();

                // Shortcuts
                var oKeyWords = oKey.words;
                var iKeyWords = iKey.words;

                // XOR keys with pad constants
                for (var i = 0; i < hasherBlockSize; i++) {
                    oKeyWords[i] ^= 0x5c5c5c5c;
                    iKeyWords[i] ^= 0x36363636;
                }
                oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

                // Set initial values
                this.reset();
            },

            /**
             * Resets this HMAC to its initial state.
             *
             * @example
             *
             *     hmacHasher.reset();
             */
            reset: function () {
                // Shortcut
                var hasher = this._hasher;

                // Reset
                hasher.reset();
                hasher.update(this._iKey);
            },

            /**
             * Updates this HMAC with a message.
             *
             * @param {WordArray|string} messageUpdate The message to append.
             *
             * @return {HMAC} This HMAC instance.
             *
             * @example
             *
             *     hmacHasher.update('message');
             *     hmacHasher.update(wordArray);
             */
            update: function (messageUpdate) {
                this._hasher.update(messageUpdate);

                // Chainable
                return this;
            },

            /**
             * Finalizes the HMAC computation.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} messageUpdate (Optional) A final message update.
             *
             * @return {WordArray} The HMAC.
             *
             * @example
             *
             *     var hmac = hmacHasher.finalize();
             *     var hmac = hmacHasher.finalize('message');
             *     var hmac = hmacHasher.finalize(wordArray);
             */
            finalize: function (messageUpdate) {
                // Shortcut
                var hasher = this._hasher;

                // Compute HMAC
                var innerHash = hasher.finalize(messageUpdate);
                hasher.reset();
                var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

                return hmac;
            }
        });
    }());

    (function () {
        // Shortcuts
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;

        /**
         * Base64 encoding strategy.
         */
        var Base64 = C_enc.Base64 = {
            /**
             * Converts a word array to a Base64 string.
             *
             * @param {WordArray} wordArray The word array.
             *
             * @return {string} The Base64 string.
             *
             * @static
             *
             * @example
             *
             *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
             */
            stringify: function (wordArray) {
                // Shortcuts
                var words = wordArray.words;
                var sigBytes = wordArray.sigBytes;
                var map = this._map;

                // Clamp excess bits
                wordArray.clamp();

                // Convert
                var base64Chars = [];
                for (var i = 0; i < sigBytes; i += 3) {
                    var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
                    var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
                    var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

                    var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

                    for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
                        base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
                    }
                }

                // Add padding
                var paddingChar = map.charAt(64);
                if (paddingChar) {
                    while (base64Chars.length % 4) {
                        base64Chars.push(paddingChar);
                    }
                }

                return base64Chars.join('');
            },

            /**
             * Converts a Base64 string to a word array.
             *
             * @param {string} base64Str The Base64 string.
             *
             * @return {WordArray} The word array.
             *
             * @static
             *
             * @example
             *
             *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
             */
            parse: function (base64Str) {
                // Shortcuts
                var base64StrLength = base64Str.length;
                var map = this._map;

                // Ignore padding
                var paddingChar = map.charAt(64);
                if (paddingChar) {
                    var paddingIndex = base64Str.indexOf(paddingChar);
                    if (paddingIndex != -1) {
                        base64StrLength = paddingIndex;
                    }
                }

                // Convert
                var words = [];
                var nBytes = 0;
                for (var i = 0; i < base64StrLength; i++) {
                    if (i % 4) {
                        var bits1 = map.indexOf(base64Str.charAt(i - 1)) << ((i % 4) * 2);
                        var bits2 = map.indexOf(base64Str.charAt(i)) >>> (6 - (i % 4) * 2);
                        words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
                        nBytes++;
                    }
                }

                return WordArray.create(words, nBytes);
            },

            _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        };
    }());

    /**
     * Cipher core components.
     */
    CryptoJS.lib.Cipher || (function (undefined) {
        // Shortcuts
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var Base64 = C_enc.Base64;
        var C_algo = C.algo;
        var EvpKDF = C_algo.EvpKDF;

        /**
         * Abstract base cipher template.
         *
         * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
         * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
         * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
         * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
         */
        var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
            /**
             * Configuration options.
             *
             * @property {WordArray} iv The IV to use for this operation.
             */
            cfg: Base.extend(),

            /**
             * Creates this cipher in encryption mode.
             *
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {Cipher} A cipher instance.
             *
             * @static
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
             */
            createEncryptor: function (key, cfg) {
                return this.create(this._ENC_XFORM_MODE, key, cfg);
            },

            /**
             * Creates this cipher in decryption mode.
             *
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {Cipher} A cipher instance.
             *
             * @static
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
             */
            createDecryptor: function (key, cfg) {
                return this.create(this._DEC_XFORM_MODE, key, cfg);
            },

            /**
             * Initializes a newly created cipher.
             *
             * @param {number} xformMode Either the encryption or decryption transormation mode constant.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @example
             *
             *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
             */
            init: function (xformMode, key, cfg) {
                // Apply config defaults
                this.cfg = this.cfg.extend(cfg);

                // Store transform mode and key
                this._xformMode = xformMode;
                this._key = key;

                // Set initial values
                this.reset();
            },

            /**
             * Resets this cipher to its initial state.
             *
             * @example
             *
             *     cipher.reset();
             */
            reset: function () {
                // Reset data buffer
                BufferedBlockAlgorithm.reset.call(this);

                // Perform concrete-cipher logic
                this._doReset();
            },

            /**
             * Adds data to be encrypted or decrypted.
             *
             * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
             *
             * @return {WordArray} The data after processing.
             *
             * @example
             *
             *     var encrypted = cipher.process('data');
             *     var encrypted = cipher.process(wordArray);
             */
            process: function (dataUpdate) {
                // Append
                this._append(dataUpdate);

                // Process available blocks
                return this._process();
            },

            /**
             * Finalizes the encryption or decryption process.
             * Note that the finalize operation is effectively a destructive, read-once operation.
             *
             * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
             *
             * @return {WordArray} The data after final processing.
             *
             * @example
             *
             *     var encrypted = cipher.finalize();
             *     var encrypted = cipher.finalize('data');
             *     var encrypted = cipher.finalize(wordArray);
             */
            finalize: function (dataUpdate) {
                // Final data update
                if (dataUpdate) {
                    this._append(dataUpdate);
                }

                // Perform concrete-cipher logic
                var finalProcessedData = this._doFinalize();

                return finalProcessedData;
            },

            keySize: 128/32,

            ivSize: 128/32,

            _ENC_XFORM_MODE: 1,

            _DEC_XFORM_MODE: 2,

            /**
             * Creates shortcut functions to a cipher's object interface.
             *
             * @param {Cipher} cipher The cipher to create a helper for.
             *
             * @return {Object} An object with encrypt and decrypt shortcut functions.
             *
             * @static
             *
             * @example
             *
             *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
             */
            _createHelper: (function () {
                function selectCipherStrategy(key) {
                    if (typeof key == 'string') {
                        return PasswordBasedCipher;
                    } else {
                        return SerializableCipher;
                    }
                }

                return function (cipher) {
                    return {
                        encrypt: function (message, key, cfg) {
                            return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                        },

                        decrypt: function (ciphertext, key, cfg) {
                            return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                        }
                    };
                };
            }())
        });

        /**
         * Abstract base stream cipher template.
         *
         * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
         */
        var StreamCipher = C_lib.StreamCipher = Cipher.extend({
            _doFinalize: function () {
                // Process partial blocks
                var finalProcessedBlocks = this._process(!!'flush');

                return finalProcessedBlocks;
            },

            blockSize: 1
        });

        /**
         * Mode namespace.
         */
        var C_mode = C.mode = {};

        /**
         * Abstract base block cipher mode template.
         */
        var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
            /**
             * Creates this mode for encryption.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @static
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
             */
            createEncryptor: function (cipher, iv) {
                return this.Encryptor.create(cipher, iv);
            },

            /**
             * Creates this mode for decryption.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @static
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
             */
            createDecryptor: function (cipher, iv) {
                return this.Decryptor.create(cipher, iv);
            },

            /**
             * Initializes a newly created mode.
             *
             * @param {Cipher} cipher A block cipher instance.
             * @param {Array} iv The IV words.
             *
             * @example
             *
             *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
             */
            init: function (cipher, iv) {
                this._cipher = cipher;
                this._iv = iv;
            }
        });

        /**
         * Cipher Block Chaining mode.
         */
        var CBC = C_mode.CBC = (function () {
            /**
             * Abstract base CBC mode.
             */
            var CBC = BlockCipherMode.extend();

            /**
             * CBC encryptor.
             */
            CBC.Encryptor = CBC.extend({
                /**
                 * Processes the data block at offset.
                 *
                 * @param {Array} words The data words to operate on.
                 * @param {number} offset The offset where the block starts.
                 *
                 * @example
                 *
                 *     mode.processBlock(data.words, offset);
                 */
                processBlock: function (words, offset) {
                    // Shortcuts
                    var cipher = this._cipher;
                    var blockSize = cipher.blockSize;

                    // XOR and encrypt
                    xorBlock.call(this, words, offset, blockSize);
                    cipher.encryptBlock(words, offset);

                    // Remember this block to use with next block
                    this._prevBlock = words.slice(offset, offset + blockSize);
                }
            });

            /**
             * CBC decryptor.
             */
            CBC.Decryptor = CBC.extend({
                /**
                 * Processes the data block at offset.
                 *
                 * @param {Array} words The data words to operate on.
                 * @param {number} offset The offset where the block starts.
                 *
                 * @example
                 *
                 *     mode.processBlock(data.words, offset);
                 */
                processBlock: function (words, offset) {
                    // Shortcuts
                    var cipher = this._cipher;
                    var blockSize = cipher.blockSize;

                    // Remember this block to use with next block
                    var thisBlock = words.slice(offset, offset + blockSize);

                    // Decrypt and XOR
                    cipher.decryptBlock(words, offset);
                    xorBlock.call(this, words, offset, blockSize);

                    // This block becomes the previous block
                    this._prevBlock = thisBlock;
                }
            });

            function xorBlock(words, offset, blockSize) {
                // Shortcut
                var iv = this._iv;

                // Choose mixing block
                if (iv) {
                    var block = iv;

                    // Remove IV for subsequent blocks
                    this._iv = undefined;
                } else {
                    var block = this._prevBlock;
                }

                // XOR blocks
                for (var i = 0; i < blockSize; i++) {
                    words[offset + i] ^= block[i];
                }
            }

            return CBC;
        }());

        /**
         * Padding namespace.
         */
        var C_pad = C.pad = {};

        /**
         * PKCS #5/7 padding strategy.
         */
        var Pkcs7 = C_pad.Pkcs7 = {
            /**
             * Pads data using the algorithm defined in PKCS #5/7.
             *
             * @param {WordArray} data The data to pad.
             * @param {number} blockSize The multiple that the data should be padded to.
             *
             * @static
             *
             * @example
             *
             *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
             */
            pad: function (data, blockSize) {
                // Shortcut
                var blockSizeBytes = blockSize * 4;

                // Count padding bytes
                var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

                // Create padding word
                var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

                // Create padding
                var paddingWords = [];
                for (var i = 0; i < nPaddingBytes; i += 4) {
                    paddingWords.push(paddingWord);
                }
                var padding = WordArray.create(paddingWords, nPaddingBytes);

                // Add padding
                data.concat(padding);
            },

            /**
             * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
             *
             * @param {WordArray} data The data to unpad.
             *
             * @static
             *
             * @example
             *
             *     CryptoJS.pad.Pkcs7.unpad(wordArray);
             */
            unpad: function (data) {
                // Get number of padding bytes from last byte
                var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

                // Remove padding
                data.sigBytes -= nPaddingBytes;
            }
        };

        /**
         * Abstract base block cipher template.
         *
         * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
         */
        var BlockCipher = C_lib.BlockCipher = Cipher.extend({
            /**
             * Configuration options.
             *
             * @property {Mode} mode The block mode to use. Default: CBC
             * @property {Padding} padding The padding strategy to use. Default: Pkcs7
             */
            cfg: Cipher.cfg.extend({
                mode: CBC,
                padding: Pkcs7
            }),

            reset: function () {
                // Reset cipher
                Cipher.reset.call(this);

                // Shortcuts
                var cfg = this.cfg;
                var iv = cfg.iv;
                var mode = cfg.mode;

                // Reset block mode
                if (this._xformMode == this._ENC_XFORM_MODE) {
                    var modeCreator = mode.createEncryptor;
                } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
                    var modeCreator = mode.createDecryptor;

                    // Keep at least one block in the buffer for unpadding
                    this._minBufferSize = 1;
                }
                this._mode = modeCreator.call(mode, this, iv && iv.words);
            },

            _doProcessBlock: function (words, offset) {
                this._mode.processBlock(words, offset);
            },

            _doFinalize: function () {
                // Shortcut
                var padding = this.cfg.padding;

                // Finalize
                if (this._xformMode == this._ENC_XFORM_MODE) {
                    // Pad data
                    padding.pad(this._data, this.blockSize);

                    // Process final blocks
                    var finalProcessedBlocks = this._process(!!'flush');
                } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
                    // Process final blocks
                    var finalProcessedBlocks = this._process(!!'flush');

                    // Unpad data
                    padding.unpad(finalProcessedBlocks);
                }

                return finalProcessedBlocks;
            },

            blockSize: 128/32
        });

        /**
         * A collection of cipher parameters.
         *
         * @property {WordArray} ciphertext The raw ciphertext.
         * @property {WordArray} key The key to this ciphertext.
         * @property {WordArray} iv The IV used in the ciphering operation.
         * @property {WordArray} salt The salt used with a key derivation function.
         * @property {Cipher} algorithm The cipher algorithm.
         * @property {Mode} mode The block mode used in the ciphering operation.
         * @property {Padding} padding The padding scheme used in the ciphering operation.
         * @property {number} blockSize The block size of the cipher.
         * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
         */
        var CipherParams = C_lib.CipherParams = Base.extend({
            /**
             * Initializes a newly created cipher params object.
             *
             * @param {Object} cipherParams An object with any of the possible cipher parameters.
             *
             * @example
             *
             *     var cipherParams = CryptoJS.lib.CipherParams.create({
             *         ciphertext: ciphertextWordArray,
             *         key: keyWordArray,
             *         iv: ivWordArray,
             *         salt: saltWordArray,
             *         algorithm: CryptoJS.algo.AES,
             *         mode: CryptoJS.mode.CBC,
             *         padding: CryptoJS.pad.PKCS7,
             *         blockSize: 4,
             *         formatter: CryptoJS.format.OpenSSL
             *     });
             */
            init: function (cipherParams) {
                this.mixIn(cipherParams);
            },

            /**
             * Converts this cipher params object to a string.
             *
             * @param {Format} formatter (Optional) The formatting strategy to use.
             *
             * @return {string} The stringified cipher params.
             *
             * @throws Error If neither the formatter nor the default formatter is set.
             *
             * @example
             *
             *     var string = cipherParams + '';
             *     var string = cipherParams.toString();
             *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
             */
            toString: function (formatter) {
                return (formatter || this.formatter).stringify(this);
            }
        });

        /**
         * Format namespace.
         */
        var C_format = C.format = {};

        /**
         * OpenSSL formatting strategy.
         */
        var OpenSSLFormatter = C_format.OpenSSL = {
            /**
             * Converts a cipher params object to an OpenSSL-compatible string.
             *
             * @param {CipherParams} cipherParams The cipher params object.
             *
             * @return {string} The OpenSSL-compatible string.
             *
             * @static
             *
             * @example
             *
             *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
             */
            stringify: function (cipherParams) {
                // Shortcuts
                var ciphertext = cipherParams.ciphertext;
                var salt = cipherParams.salt;

                // Format
                if (salt) {
                    var wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
                } else {
                    var wordArray = ciphertext;
                }

                return wordArray.toString(Base64);
            },

            /**
             * Converts an OpenSSL-compatible string to a cipher params object.
             *
             * @param {string} openSSLStr The OpenSSL-compatible string.
             *
             * @return {CipherParams} The cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
             */
            parse: function (openSSLStr) {
                // Parse base64
                var ciphertext = Base64.parse(openSSLStr);

                // Shortcut
                var ciphertextWords = ciphertext.words;

                // Test for salt
                if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
                    // Extract salt
                    var salt = WordArray.create(ciphertextWords.slice(2, 4));

                    // Remove salt from ciphertext
                    ciphertextWords.splice(0, 4);
                    ciphertext.sigBytes -= 16;
                }

                return CipherParams.create({ ciphertext: ciphertext, salt: salt });
            }
        };

        /**
         * A cipher wrapper that returns ciphertext as a serializable cipher params object.
         */
        var SerializableCipher = C_lib.SerializableCipher = Base.extend({
            /**
             * Configuration options.
             *
             * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
             */
            cfg: Base.extend({
                format: OpenSSLFormatter
            }),

            /**
             * Encrypts a message.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {WordArray|string} message The message to encrypt.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {CipherParams} A cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             */
            encrypt: function (cipher, message, key, cfg) {
                // Apply config defaults
                cfg = this.cfg.extend(cfg);

                // Encrypt
                var encryptor = cipher.createEncryptor(key, cfg);
                var ciphertext = encryptor.finalize(message);

                // Shortcut
                var cipherCfg = encryptor.cfg;

                // Create and return serializable cipher params
                return CipherParams.create({
                    ciphertext: ciphertext,
                    key: key,
                    iv: cipherCfg.iv,
                    algorithm: cipher,
                    mode: cipherCfg.mode,
                    padding: cipherCfg.padding,
                    blockSize: cipher.blockSize,
                    formatter: cfg.format
                });
            },

            /**
             * Decrypts serialized ciphertext.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
             * @param {WordArray} key The key.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {WordArray} The plaintext.
             *
             * @static
             *
             * @example
             *
             *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
             */
            decrypt: function (cipher, ciphertext, key, cfg) {
                // Apply config defaults
                cfg = this.cfg.extend(cfg);

                // Convert string to CipherParams
                ciphertext = this._parse(ciphertext, cfg.format);

                // Decrypt
                var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

                return plaintext;
            },

            /**
             * Converts serialized ciphertext to CipherParams,
             * else assumed CipherParams already and returns ciphertext unchanged.
             *
             * @param {CipherParams|string} ciphertext The ciphertext.
             * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
             *
             * @return {CipherParams} The unserialized ciphertext.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
             */
            _parse: function (ciphertext, format) {
                if (typeof ciphertext == 'string') {
                    return format.parse(ciphertext, this);
                } else {
                    return ciphertext;
                }
            }
        });

        /**
         * Key derivation function namespace.
         */
        var C_kdf = C.kdf = {};

        /**
         * OpenSSL key derivation function.
         */
        var OpenSSLKdf = C_kdf.OpenSSL = {
            /**
             * Derives a key and IV from a password.
             *
             * @param {string} password The password to derive from.
             * @param {number} keySize The size in words of the key to generate.
             * @param {number} ivSize The size in words of the IV to generate.
             * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
             *
             * @return {CipherParams} A cipher params object with the key, IV, and salt.
             *
             * @static
             *
             * @example
             *
             *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
             *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
             */
            execute: function (password, keySize, ivSize, salt) {
                // Generate random salt
                if (!salt) {
                    salt = WordArray.random(64/8);
                }

                // Derive key and IV
                var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

                // Separate key and IV
                var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
                key.sigBytes = keySize * 4;

                // Return params
                return CipherParams.create({ key: key, iv: iv, salt: salt });
            }
        };

        /**
         * A serializable cipher wrapper that derives the key from a password,
         * and returns ciphertext as a serializable cipher params object.
         */
        var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
            /**
             * Configuration options.
             *
             * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
             */
            cfg: SerializableCipher.cfg.extend({
                kdf: OpenSSLKdf
            }),

            /**
             * Encrypts a message using a password.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {WordArray|string} message The message to encrypt.
             * @param {string} password The password.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {CipherParams} A cipher params object.
             *
             * @static
             *
             * @example
             *
             *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
             *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
             */
            encrypt: function (cipher, message, password, cfg) {
                // Apply config defaults
                cfg = this.cfg.extend(cfg);

                // Derive key and other params
                var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

                // Add IV to config
                cfg.iv = derivedParams.iv;

                // Encrypt
                var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

                // Mix in derived params
                ciphertext.mixIn(derivedParams);

                return ciphertext;
            },

            /**
             * Decrypts serialized ciphertext using a password.
             *
             * @param {Cipher} cipher The cipher algorithm to use.
             * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
             * @param {string} password The password.
             * @param {Object} cfg (Optional) The configuration options to use for this operation.
             *
             * @return {WordArray} The plaintext.
             *
             * @static
             *
             * @example
             *
             *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
             *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
             */
            decrypt: function (cipher, ciphertext, password, cfg) {
                // Apply config defaults
                cfg = this.cfg.extend(cfg);

                // Convert string to CipherParams
                ciphertext = this._parse(ciphertext, cfg.format);

                // Derive key and other params
                var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

                // Add IV to config
                cfg.iv = derivedParams.iv;

                // Decrypt
                var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

                return plaintext;
            }
        });
    }());

    (function () {
        // Shortcuts
        var C = CryptoJS;
        var C_lib = C.lib;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;

        // Lookup tables
        var SBOX = [];
        var INV_SBOX = [];
        var SUB_MIX_0 = [];
        var SUB_MIX_1 = [];
        var SUB_MIX_2 = [];
        var SUB_MIX_3 = [];
        var INV_SUB_MIX_0 = [];
        var INV_SUB_MIX_1 = [];
        var INV_SUB_MIX_2 = [];
        var INV_SUB_MIX_3 = [];

        // Compute lookup tables
        (function () {
            // Compute double table
            var d = [];
            for (var i = 0; i < 256; i++) {
                if (i < 128) {
                    d[i] = i << 1;
                } else {
                    d[i] = (i << 1) ^ 0x11b;
                }
            }

            // Walk GF(2^8)
            var x = 0;
            var xi = 0;
            for (var i = 0; i < 256; i++) {
                // Compute sbox
                var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
                sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
                SBOX[x] = sx;
                INV_SBOX[sx] = x;

                // Compute multiplication
                var x2 = d[x];
                var x4 = d[x2];
                var x8 = d[x4];

                // Compute sub bytes, mix columns tables
                var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
                SUB_MIX_0[x] = (t << 24) | (t >>> 8);
                SUB_MIX_1[x] = (t << 16) | (t >>> 16);
                SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
                SUB_MIX_3[x] = t;

                // Compute inv sub bytes, inv mix columns tables
                var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
                INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
                INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
                INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
                INV_SUB_MIX_3[sx] = t;

                // Compute next counter
                if (!x) {
                    x = xi = 1;
                } else {
                    x = x2 ^ d[d[d[x8 ^ x2]]];
                    xi ^= d[d[xi]];
                }
            }
        }());

        // Precomputed Rcon lookup
        var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

        /**
         * AES block cipher algorithm.
         */
        var AES = C_algo.AES = BlockCipher.extend({
            _doReset: function () {
                // Shortcuts
                var key = this._key;
                var keyWords = key.words;
                var keySize = key.sigBytes / 4;

                // Compute number of rounds
                var nRounds = this._nRounds = keySize + 6;

                // Compute number of key schedule rows
                var ksRows = (nRounds + 1) * 4;

                // Compute key schedule
                var keySchedule = this._keySchedule = [];
                for (var ksRow = 0; ksRow < ksRows; ksRow++) {
                    if (ksRow < keySize) {
                        keySchedule[ksRow] = keyWords[ksRow];
                    } else {
                        var t = keySchedule[ksRow - 1];

                        if (!(ksRow % keySize)) {
                            // Rot word
                            t = (t << 8) | (t >>> 24);

                            // Sub word
                            t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

                            // Mix Rcon
                            t ^= RCON[(ksRow / keySize) | 0] << 24;
                        } else if (keySize > 6 && ksRow % keySize == 4) {
                            // Sub word
                            t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
                        }

                        keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
                    }
                }

                // Compute inv key schedule
                var invKeySchedule = this._invKeySchedule = [];
                for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
                    var ksRow = ksRows - invKsRow;

                    if (invKsRow % 4) {
                        var t = keySchedule[ksRow];
                    } else {
                        var t = keySchedule[ksRow - 4];
                    }

                    if (invKsRow < 4 || ksRow <= 4) {
                        invKeySchedule[invKsRow] = t;
                    } else {
                        invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
                                                   INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
                    }
                }
            },

            encryptBlock: function (M, offset) {
                this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
            },

            decryptBlock: function (M, offset) {
                // Swap 2nd and 4th rows
                var t = M[offset + 1];
                M[offset + 1] = M[offset + 3];
                M[offset + 3] = t;

                this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

                // Inv swap 2nd and 4th rows
                var t = M[offset + 1];
                M[offset + 1] = M[offset + 3];
                M[offset + 3] = t;
            },

            _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
                // Shortcut
                var nRounds = this._nRounds;

                // Get input, add round key
                var s0 = M[offset]     ^ keySchedule[0];
                var s1 = M[offset + 1] ^ keySchedule[1];
                var s2 = M[offset + 2] ^ keySchedule[2];
                var s3 = M[offset + 3] ^ keySchedule[3];

                // Key schedule row counter
                var ksRow = 4;

                // Rounds
                for (var round = 1; round < nRounds; round++) {
                    // Shift rows, sub bytes, mix columns, add round key
                    var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
                    var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
                    var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
                    var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

                    // Update state
                    s0 = t0;
                    s1 = t1;
                    s2 = t2;
                    s3 = t3;
                }

                // Shift rows, sub bytes, add round key
                var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
                var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
                var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
                var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

                // Set output
                M[offset]     = t0;
                M[offset + 1] = t1;
                M[offset + 2] = t2;
                M[offset + 3] = t3;
            },

            keySize: 256/32
        });

        /**
         * Shortcut functions to the cipher's object interface.
         *
         * @example
         *
         *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
         *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
         */
        C.AES = BlockCipher._createHelper(AES);
    }());

    (function () {
        // Check if typed arrays are supported
        if (typeof ArrayBuffer === 'undefined') {
            return;
        }

        // Shortcuts
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;

        // Reference original init
        var superInit = WordArray.init;

        // Augment WordArray.init to handle typed arrays
        var subInit = WordArray.init = function (typedArray) {
            // Convert buffers to uint8
            if (typedArray instanceof ArrayBuffer) {
                typedArray = new Uint8Array(typedArray);
            }

            // Convert other array views to uint8
            else if (
                typedArray instanceof Int8Array ||
                (typeof Uint8ClampedArray !== 'undefined' && typedArray instanceof Uint8ClampedArray) ||
                typedArray instanceof Int16Array ||
                typedArray instanceof Uint16Array ||
                typedArray instanceof Int32Array ||
                typedArray instanceof Uint32Array ||
                (typeof Float32Array !== 'undefined' && typedArray instanceof Float32Array) ||
                (typeof Float64Array !== 'undefined' && typedArray instanceof Float64Array)
            ) {
                typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
            }

            // Handle Uint8Array
            if (typedArray instanceof Uint8Array) {
                // Shortcut
                var typedArrayByteLength = typedArray.byteLength;

                // Extract bytes
                var words = [];
                for (var i = 0; i < typedArrayByteLength; i++) {
                    words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
                }

                // Initialize this word array
                superInit.call(this, words, typedArrayByteLength);
            } else {
                // Else call normal init
                superInit.apply(this, arguments);
            }
        };

        subInit.prototype = WordArray;
    }());

    var DomEvent = (function() {
    	function DomEvent() {}

    	DomEvent.addListener = function(target, event, listener) {
    		if(target.addEventListener) {
    			target.addEventListener(event, listener, false);
    		} else {
    			target.attachEvent('on'+event, function() { listener.apply(target, arguments); });
    		}
    	};

    	DomEvent.removeListener = function(target, event, listener) {
    		if(target.removeEventListener) {
    			target.removeEventListener(event, listener, false);
    		} else {
    			target.detachEvent('on'+event, function() { listener.apply(target, arguments); });
    		}
    	};

    	DomEvent.addMessageListener = function(target, listener) {
    		DomEvent.addListener(target, 'message', listener);
    	};

    	DomEvent.removeMessageListener = function(target, listener) {
    		DomEvent.removeListener(target, 'message', listener);
    	};

    	DomEvent.addUnloadListener = function(listener) {
    		DomEvent.addListener(global, 'unload', listener);
    	};

    	return DomEvent;
    })();

    var msgpack = (function() {

    	var exports = {};

    	exports.inspect = inspect;
    	function inspect(buffer) {
    		if (buffer === undefined)
    			return "undefined";
    		var view;
    		var type;
    		if ( buffer instanceof ArrayBuffer) {
    			type = "ArrayBuffer";
    			view = new DataView(buffer);
    		} else if ( buffer instanceof DataView) {
    			type = "DataView";
    			view = buffer;
    		}
    		if (!view)
    			return JSON.stringify(buffer);
    		var bytes = [];
    		for (var i = 0; i < buffer.byteLength; i++) {
    			if (i > 20) {
    				bytes.push("...");
    				break;
    			}
    			var byte_ = view.getUint8(i).toString(16);
    			if (byte_.length === 1)
    				byte_ = "0" + byte_;
    			bytes.push(byte_);
    		}
    		return "<" + type + " " + bytes.join(" ") + ">";
    	}

    	// Encode string as utf8 into dataview at offset
    	exports.utf8Write = utf8Write;
    	function utf8Write(view, offset, string) {
    		var byteLength = view.byteLength;
    		for (var i = 0, l = string.length; i < l; i++) {
    			var codePoint = string.charCodeAt(i);

    			// One byte of UTF-8
    			if (codePoint < 0x80) {
    				view.setUint8(offset++, codePoint >>> 0 & 0x7f | 0x00);
    				continue;
    			}

    			// Two bytes of UTF-8
    			if (codePoint < 0x800) {
    				view.setUint8(offset++, codePoint >>> 6 & 0x1f | 0xc0);
    				view.setUint8(offset++, codePoint >>> 0 & 0x3f | 0x80);
    				continue;
    			}

    			// Three bytes of UTF-8.
    			if (codePoint < 0x10000) {
    				view.setUint8(offset++, codePoint >>> 12 & 0x0f | 0xe0);
    				view.setUint8(offset++, codePoint >>> 6 & 0x3f | 0x80);
    				view.setUint8(offset++, codePoint >>> 0 & 0x3f | 0x80);
    				continue;
    			}

    			// Four bytes of UTF-8
    			if (codePoint < 0x110000) {
    				view.setUint8(offset++, codePoint >>> 18 & 0x07 | 0xf0);
    				view.setUint8(offset++, codePoint >>> 12 & 0x3f | 0x80);
    				view.setUint8(offset++, codePoint >>> 6 & 0x3f | 0x80);
    				view.setUint8(offset++, codePoint >>> 0 & 0x3f | 0x80);
    				continue;
    			}
    			throw new Error("bad codepoint " + codePoint);
    		}
    	}


    	exports.utf8Read = utf8Read;
    	function utf8Read(view, offset, length) {
    		var string = "";
    		for (var i = offset, end = offset + length; i < end; i++) {
    			var byte_ = view.getUint8(i);
    			// One byte character
    			if ((byte_ & 0x80) === 0x00) {
    				string += String.fromCharCode(byte_);
    				continue;
    			}
    			// Two byte character
    			if ((byte_ & 0xe0) === 0xc0) {
    				string += String.fromCharCode(((byte_ & 0x0f) << 6) | (view.getUint8(++i) & 0x3f));
    				continue;
    			}
    			// Three byte character
    			if ((byte_ & 0xf0) === 0xe0) {
    				string += String.fromCharCode(((byte_ & 0x0f) << 12) | ((view.getUint8(++i) & 0x3f) << 6) | ((view.getUint8(++i) & 0x3f) << 0));
    				continue;
    			}
    			// Four byte character
    			if ((byte_ & 0xf8) === 0xf0) {
    				string += String.fromCharCode(((byte_ & 0x07) << 18) | ((view.getUint8(++i) & 0x3f) << 12) | ((view.getUint8(++i) & 0x3f) << 6) | ((view.getUint8(++i) & 0x3f) << 0));
    				continue;
    			}
    			throw new Error("Invalid byte " + byte_.toString(16));
    		}
    		return string;
    	}


    	exports.utf8ByteCount = utf8ByteCount;
    	function utf8ByteCount(string) {
    		var count = 0;
    		for (var i = 0, l = string.length; i < l; i++) {
    			var codePoint = string.charCodeAt(i);
    			if (codePoint < 0x80) {
    				count += 1;
    				continue;
    			}
    			if (codePoint < 0x800) {
    				count += 2;
    				continue;
    			}
    			if (codePoint < 0x10000) {
    				count += 3;
    				continue;
    			}
    			if (codePoint < 0x110000) {
    				count += 4;
    				continue;
    			}
    			throw new Error("bad codepoint " + codePoint);
    		}
    		return count;
    	}


    	exports.encode = function(value, sparse) {
    		var size = sizeof(value, sparse);
    		if(size == 0)
    			return undefined;
    		var buffer = new ArrayBuffer(size);
    		var view = new DataView(buffer);
    		encode(value, view, 0, sparse);
    		return buffer;
    	};

    	exports.decode = decode;

    	var SH_L_32 = (1 << 16) * (1 << 16), SH_R_32 = 1 / SH_L_32;
    	function getInt64(view, offset) {
    		offset = offset || 0;
    		return view.getInt32(offset) * SH_L_32 + view.getUint32(offset + 4);
    	}

    	function getUint64(view, offset) {
    		offset = offset || 0;
    		return view.getUint32(offset) * SH_L_32 + view.getUint32(offset + 4);
    	}

    	function setInt64(view, offset, val) {
    		if (val < 0x8000000000000000) {
    			view.setInt32(offset, Math.floor(val * SH_R_32));
    			view.setInt32(offset + 4, val & -1);
    		} else {
    			view.setUint32(offset, 0x7fffffff);
    			view.setUint32(offset + 4, 0x7fffffff);
    		}
    	}

    	function setUint64(view, offset, val) {
    		if (val < 0x10000000000000000) {
    			view.setUint32(offset, Math.floor(val * SH_R_32));
    			view.setInt32(offset + 4, val & -1);
    		} else {
    			view.setUint32(offset, 0xffffffff);
    			view.setUint32(offset + 4, 0xffffffff);
    		}
    	}

    // https://gist.github.com/frsyuki/5432559 - v5 spec
    //
    // I've used one extension point from `fixext 1` to store `undefined`. On the wire this
    // should translate to exactly 0xd40000
    //
    // +--------+--------+--------+
    // |  0xd4  |  0x00  |  0x00  |
    // +--------+--------+--------+
    //    ^ fixext |        ^ value part unused (fixed to be 0)
    //             ^ indicates undefined value
    //

    	function Decoder(view, offset) {
    		this.offset = offset || 0;
    		this.view = view;
    	}


    	Decoder.prototype.map = function(length) {
    		var value = {};
    		for (var i = 0; i < length; i++) {
    			var key = this.parse();
    			value[key] = this.parse();
    		}
    		return value;
    	};

    	Decoder.prototype.bin = Decoder.prototype.buf = function(length) {
    		var value = new ArrayBuffer(length);
    		(new Uint8Array(value)).set(new Uint8Array(this.view.buffer, this.offset, length), 0);
    		this.offset += length;
    		return value;
    	};

    	Decoder.prototype.str = function(length) {
    		var value = utf8Read(this.view, this.offset, length);
    		this.offset += length;
    		return value;
    	};

    	Decoder.prototype.array = function(length) {
    		var value = new Array(length);
    		for (var i = 0; i < length; i++) {
    			value[i] = this.parse();
    		}
    		return value;
    	};

    	Decoder.prototype.ext = function(length) {
    		var value = {};
    		// Get the type byte
    		value['type'] = this.view.getInt8(this.offset);
    		this.offset++;
    		// Get the data array (length)
    		value['data'] = this.buf(length);
    		this.offset += length;
    		return value;
    	};

    	Decoder.prototype.parse = function() {
    		var type = this.view.getUint8(this.offset);
    		var value, length;

    		// Positive FixInt - 0xxxxxxx
    		if ((type & 0x80) === 0x00) {
    			this.offset++;
    			return type;
    		}

    		// FixMap - 1000xxxx
    		if ((type & 0xf0) === 0x80) {
    			length = type & 0x0f;
    			this.offset++;
    			return this.map(length);
    		}

    		// FixArray - 1001xxxx
    		if ((type & 0xf0) === 0x90) {
    			length = type & 0x0f;
    			this.offset++;
    			return this.array(length);
    		}

    		// FixStr - 101xxxxx
    		if ((type & 0xe0) === 0xa0) {
    			length = type & 0x1f;
    			this.offset++;
    			return this.str(length);
    		}

    		// Negative FixInt - 111xxxxx
    		if ((type & 0xe0) === 0xe0) {
    			value = this.view.getInt8(this.offset);
    			this.offset++;
    			return value;
    		}

    		switch (type) {

    			// nil
    			case 0xc0:
    				this.offset++;
    				return null;

    			// 0xc1 never used - use for undefined (NON-STANDARD)
    			case 0xc1:
    				this.offset++;
    				return undefined;

    			// false
    			case 0xc2:
    				this.offset++;
    				return false;

    			// true
    			case 0xc3:
    				this.offset++;
    				return true;

    			// bin 8
    			case 0xc4:
    				length = this.view.getUint8(this.offset + 1);
    				this.offset += 2;
    				return this.bin(length);

    			// bin 16
    			case 0xc5:
    				length = this.view.getUint16(this.offset + 1);
    				this.offset += 3;
    				return this.bin(length);

    			// bin 32
    			case 0xc6:
    				length = this.view.getUint32(this.offset + 1);
    				this.offset += 5;
    				return this.bin(length);

    			// ext 8
    			case 0xc7:
    				length = this.view.getUint8(this.offset + 1);
    				this.offset += 2;
    				return this.ext(length);

    			// ext 16
    			case 0xc8:
    				length = this.view.getUint16(this.offset + 1);
    				this.offset += 3;
    				return this.ext(length);

    			// ext 32
    			case 0xc9:
    				length = this.view.getUint32(this.offset + 1);
    				this.offset += 5;
    				return this.ext(length);

    			// float 32
    			case 0xca:
    				value = this.view.getFloat32(this.offset + 1);
    				this.offset += 5;
    				return value;

    			// float 64
    			case 0xcb:
    				value = this.view.getFloat64(this.offset + 1);
    				this.offset += 9;
    				return value;

    			// uint8
    			case 0xcc:
    				value = this.view.getUint8(this.offset + 1);
    				this.offset += 2;
    				return value;

    			// uint 16
    			case 0xcd:
    				value = this.view.getUint16(this.offset + 1);
    				this.offset += 3;
    				return value;

    			// uint 32
    			case 0xce:
    				value = this.view.getUint32(this.offset + 1);
    				this.offset += 5;
    				return value;

    			// uint 64
    			case 0xcf:
    				value = getUint64(this.view, this.offset + 1);
    				this.offset += 9;
    				return value;

    			// int 8
    			case 0xd0:
    				value = this.view.getInt8(this.offset + 1);
    				this.offset += 2;
    				return value;

    			// int 16
    			case 0xd1:
    				value = this.view.getInt16(this.offset + 1);
    				this.offset += 3;
    				return value;

    			// int 32
    			case 0xd2:
    				value = this.view.getInt32(this.offset + 1);
    				this.offset += 5;
    				return value;

    			// int 64
    			case 0xd3:
    				value = getInt64(this.view, this.offset + 1);
    				this.offset += 9;
    				return value;

    			// fixext 1
    			case 0xd4:
    				length = 1;
    				this.offset++;
    				return this.ext(length);

    			// fixext 2
    			case 0xd5:
    				length = 2;
    				this.offset++;
    				return this.ext(length);

    			// fixext 4
    			case 0xd6:
    				length = 4;
    				this.offset++;
    				return this.ext(length);

    			// fixext 8
    			case 0xd7:
    				length = 8;
    				this.offset++;
    				return this.ext(length);

    			// fixext 16
    			case 0xd8:
    				length = 16;
    				this.offset++;
    				return this.ext(length);

    			// str8
    			case 0xd9:
    				length = this.view.getUint8(this.offset + 1);
    				this.offset += 2;
    				return this.str(length);

    			// str 16
    			case 0xda:
    				length = this.view.getUint16(this.offset + 1);
    				this.offset += 3;
    				return this.str(length);

    			// str 32
    			case 0xdb:
    				length = this.view.getUint32(this.offset + 1);
    				this.offset += 5;
    				return this.str(length);

    			// array 16
    			case 0xdc:
    				length = this.view.getUint16(this.offset + 1);
    				this.offset += 3;
    				return this.array(length);

    			// array 32
    			case 0xdd:
    				length = this.view.getUint32(this.offset + 1);
    				this.offset += 5;
    				return this.array(length);

    			// map 16
    			case 0xde:
    				length = this.view.getUint16(this.offset + 1);
    				this.offset += 3;
    				return this.map(length);

    			// map 32
    			case 0xdf:
    				length = this.view.getUint32(this.offset + 1);
    				this.offset += 5;
    				return this.map(length);
    		}
    		throw new Error("Unknown type 0x" + type.toString(16));
    	};

    	function decode(buffer) {
    		var view = new DataView(buffer);
    		var decoder = new Decoder(view);
    		var value = decoder.parse();
    		if (decoder.offset !== buffer.byteLength)
    			throw new Error((buffer.byteLength - decoder.offset) + " trailing bytes");
    		return value;
    	}

    	function encodeableKeys(value, sparse) {
    		return Utils.keysArray(value, true).filter(function (e) {
    			var val = value[e], type = typeof(val);
    			return (!sparse || (val !== undefined && val !== null)) && ('function' !== type || !!val.toJSON);
    		})
    	}

    	function encode(value, view, offset, sparse) {
    		var type = typeof value;

    		// Strings Bytes
    		// There are four string types: fixstr/str8/str16/str32
    		if (type === "string") {
    			var length = utf8ByteCount(value);

    			// fixstr
    			if (length < 0x20) {
    				view.setUint8(offset, length | 0xa0);
    				utf8Write(view, offset + 1, value);
    				return 1 + length;
    			}

    			// str8
    			if (length < 0x100) {
    				view.setUint8(offset, 0xd9);
    				view.setUint8(offset + 1, length);
    				utf8Write(view, offset + 2, value);
    				return 2 + length;
    			}

    			// str16
    			if (length < 0x10000) {
    				view.setUint8(offset, 0xda);
    				view.setUint16(offset + 1, length);
    				utf8Write(view, offset + 3, value);
    				return 3 + length;
    			}
    			// str32
    			if (length < 0x100000000) {
    				view.setUint8(offset, 0xdb);
    				view.setUint32(offset + 1, length);
    				utf8Write(view, offset + 5, value);
    				return 5 + length;
    			}
    		}

    		if(ArrayBuffer.isView && ArrayBuffer.isView(value)) {
    			// extract the arraybuffer and fallthrough
    			value = value.buffer;
    		}

    		// There are three bin types: bin8/bin16/bin32
    		if (value instanceof ArrayBuffer) {
    			var length = value.byteLength;

    			// bin8
    			if (length < 0x100) {
    				view.setUint8(offset, 0xc4);
    				view.setUint8(offset + 1, length);
    				(new Uint8Array(view.buffer)).set(new Uint8Array(value), offset + 2);
    				return 2 + length;
    			}

    			// bin16
    			if (length < 0x10000) {
    				view.setUint8(offset, 0xc5);
    				view.setUint16(offset + 1, length);
    				(new Uint8Array(view.buffer)).set(new Uint8Array(value), offset + 3);
    				return 3 + length;
    			}

    			// bin 32
    			if (length < 0x100000000) {
    				view.setUint8(offset, 0xc6);
    				view.setUint32(offset + 1, length);
    				(new Uint8Array(view.buffer)).set(new Uint8Array(value), offset + 5);
    				return 5 + length;
    			}
    		}

    		if (type === "number") {

    			// Floating Point
    			// NOTE: We're always using float64
    			if (Math.floor(value) !== value) {
    				view.setUint8(offset, 0xcb);
    				view.setFloat64(offset + 1, value);
    				return 9;
    			}

    			// Integers
    			if (value >= 0) {
    				// positive fixnum
    				if (value < 0x80) {
    					view.setUint8(offset, value);
    					return 1;
    				}
    				// uint 8
    				if (value < 0x100) {
    					view.setUint8(offset, 0xcc);
    					view.setUint8(offset + 1, value);
    					return 2;
    				}
    				// uint 16
    				if (value < 0x10000) {
    					view.setUint8(offset, 0xcd);
    					view.setUint16(offset + 1, value);
    					return 3;
    				}
    				// uint 32
    				if (value < 0x100000000) {
    					view.setUint8(offset, 0xce);
    					view.setUint32(offset + 1, value);
    					return 5;
    				}
    				// uint 64
    				if (value < 0x10000000000000000) {
    					view.setUint8(offset, 0xcf);
    					setUint64(view, offset + 1, value);
    					return 9;
    				}
    				throw new Error("Number too big 0x" + value.toString(16));
    			}

    			// negative fixnum
    			if (value >= -0x20) {
    				view.setInt8(offset, value);
    				return 1;
    			}
    			// int 8
    			if (value >= -0x80) {
    				view.setUint8(offset, 0xd0);
    				view.setInt8(offset + 1, value);
    				return 2;
    			}
    			// int 16
    			if (value >= -0x8000) {
    				view.setUint8(offset, 0xd1);
    				view.setInt16(offset + 1, value);
    				return 3;
    			}
    			// int 32
    			if (value >= -0x80000000) {
    				view.setUint8(offset, 0xd2);
    				view.setInt32(offset + 1, value);
    				return 5;
    			}
    			// int 64
    			if (value >= -0x8000000000000000) {
    				view.setUint8(offset, 0xd3);
    				setInt64(view, offset + 1, value);
    				return 9;
    			}
    			throw new Error("Number too small -0x" + (-value).toString(16).substr(1));
    		}

    		// undefined - use d4 (NON-STANDARD)
    		if (type === "undefined") {
    			if(sparse) return 0;
    			view.setUint8(offset, 0xd4);
    			view.setUint8(offset + 1, 0x00);
    			view.setUint8(offset + 2, 0x00);
    			return 3;
    		}

    		// null
    		if (value === null) {
    			if(sparse) return 0;
    			view.setUint8(offset, 0xc0);
    			return 1;
    		}

    		// Boolean
    		if (type === "boolean") {
    			view.setUint8(offset, value ? 0xc3 : 0xc2);
    			return 1;
    		}

    		if('function' === typeof value.toJSON)
    			return encode(value.toJSON(), view, offset, sparse);

    		// Container Types
    		if (type === "object") {
    			var length, size = 0;
    			var isArray = Array.isArray(value);

    			if (isArray) {
    				length = value.length;
    			} else {
    				var keys = encodeableKeys(value, sparse);
    				length = keys.length;
    			}

    			var size;
    			if (length < 0x10) {
    				view.setUint8(offset, length | ( isArray ? 0x90 : 0x80));
    				size = 1;
    			} else if (length < 0x10000) {
    				view.setUint8(offset, isArray ? 0xdc : 0xde);
    				view.setUint16(offset + 1, length);
    				size = 3;
    			} else if (length < 0x100000000) {
    				view.setUint8(offset, isArray ? 0xdd : 0xdf);
    				view.setUint32(offset + 1, length);
    				size = 5;
    			}

    			if (isArray) {
    				for (var i = 0; i < length; i++) {
    					size += encode(value[i], view, offset + size, sparse);
    				}
    			} else {
    				for (var i = 0; i < length; i++) {
    					var key = keys[i];
    					size += encode(key, view, offset + size);
    					size += encode(value[key], view, offset + size, sparse);
    				}
    			}

    			return size;
    		}
    		if(type === "function")
    			return 0;

    		throw new Error("Unknown type " + type);
    	}

    	function sizeof(value, sparse) {
    		var type = typeof value;

    		// fixstr or str8 or str16 or str32
    		if (type === "string") {
    			var length = utf8ByteCount(value);
    			if (length < 0x20) {
    				return 1 + length;
    			}
    			if (length < 0x100) {
    				return 2 + length;
    			}
    			if (length < 0x10000) {
    				return 3 + length;
    			}
    			if (length < 0x100000000) {
    				return 5 + length;
    			}
    		}

    		if(ArrayBuffer.isView && ArrayBuffer.isView(value)) {
    			// extract the arraybuffer and fallthrough
    			value = value.buffer;
    		}

    		// bin8 or bin16 or bin32
    		if (value instanceof ArrayBuffer) {
    			var length = value.byteLength;
    			if (length < 0x100) {
    				return 2 + length;
    			}
    			if (length < 0x10000) {
    				return 3 + length;
    			}
    			if (length < 0x100000000) {
    				return 5 + length;
    			}
    		}

    		if (type === "number") {
    			// Floating Point (32 bits)
    			// double
    			if (Math.floor(value) !== value)
    				return 9;

    			// Integers
    			if (value >= 0) {
    				// positive fixint
    				if (value < 0x80)
    					return 1;
    				// uint 8
    				if (value < 0x100)
    					return 2;
    				// uint 16
    				if (value < 0x10000)
    					return 3;
    				// uint 32
    				if (value < 0x100000000)
    					return 5;
    				// uint 64
    				if (value < 0x10000000000000000)
    					return 9;
    				// Too big
    				throw new Error("Number too big 0x" + value.toString(16));
    			}
    			// negative fixint
    			if (value >= -0x20)
    				return 1;
    			// int 8
    			if (value >= -0x80)
    				return 2;
    			// int 16
    			if (value >= -0x8000)
    				return 3;
    			// int 32
    			if (value >= -0x80000000)
    				return 5;
    			// int 64
    			if (value >= -0x8000000000000000)
    				return 9;
    			// Too small
    			throw new Error("Number too small -0x" + value.toString(16).substr(1));
    		}

    		// Boolean
    		if (type === "boolean") return 1;

    		// undefined, null
    		if (value === null) return sparse ? 0 : 1;
    		if (value === undefined) return sparse ? 0 : 3;

    		if('function' === typeof value.toJSON)
    			return sizeof(value.toJSON(), sparse);

    		// Container Types
    		if (type === "object") {
    			var length, size = 0;
    			if (Array.isArray(value)) {
    				length = value.length;
    				for (var i = 0; i < length; i++) {
    					size += sizeof(value[i], sparse);
    				}
    			} else {
    				var keys = encodeableKeys(value, sparse);
    				length = keys.length;
    				for (var i = 0; i < length; i++) {
    					var key = keys[i];
    					size += sizeof(key) + sizeof(value[key], sparse);
    				}
    			}
    			if (length < 0x10) {
    				return 1 + size;
    			}
    			if (length < 0x10000) {
    				return 3 + size;
    			}
    			if (length < 0x100000000) {
    				return 5 + size;
    			}
    			throw new Error("Array or object too long 0x" + length.toString(16));
    		}
    		if(type === "function")
    			return 0;

    		throw new Error("Unknown type " + type);
    	}

    	return exports;
    })();

    if(typeof Window === 'undefined' && typeof WorkerGlobalScope === 'undefined') {
    	console.log("Warning: this distribution of Ably is intended for browsers. On nodejs, please use the 'ably' package on npm");
    }

    function allowComet() {
    	/* xhr requests from local files are unreliable in some browsers, such as Chrome 65 and higher -- see eg
    	 * https://stackoverflow.com/questions/49256429/chrome-65-unable-to-make-post-requests-from-local-files-to-flask
    	 * So if websockets are supported, then just forget about comet transports and use that */
    	var loc = global.location;
    	return (!global.WebSocket || !loc || !loc.origin || loc.origin.indexOf("http") > -1);
    }

    var userAgent = global.navigator && global.navigator.userAgent.toString();
    var currentUrl = global.location && global.location.href;

    var Platform = {
    	libver: 'js-web',
    	logTimestamps: true,
    	userAgent: userAgent,
    	currentUrl: currentUrl,
    	noUpgrade: userAgent && userAgent.match(/MSIE\s8\.0/),
    	binaryType: 'arraybuffer',
    	WebSocket: global.WebSocket || global.MozWebSocket,
    	xhrSupported: global.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest(),
    	jsonpSupported: typeof(document) !== 'undefined',
    	allowComet: allowComet(),
    	streamingSupported: true,
    	useProtocolHeartbeats: true,
    	createHmac: null,
    	msgpack: msgpack,
    	supportsBinary: !!global.TextDecoder,
    	preferBinary: false,
    	ArrayBuffer: global.ArrayBuffer,
    	atob: global.atob,
    	nextTick: function(f) { setTimeout(f, 0); },
    	addEventListener: global.addEventListener,
    	inspect: JSON.stringify,
    	stringByteSize: function(str) {
    		/* str.length will be an underestimate for non-ascii strings. But if we're
    		 * in a browser too old to support TextDecoder, not much we can do. Better
    		 * to underestimate, so if we do go over-size, the server will reject the
    		 * message */
    		return global.TextDecoder &&
    			(new global.TextEncoder().encode(str)).length ||
    			str.length;
    	},
    	TextEncoder: global.TextEncoder,
    	TextDecoder: global.TextDecoder,
    	Promise: global.Promise,
    	getRandomValues: (function(crypto) {
    		if (crypto === undefined) {
    			return undefined;
    		}
    		return function(arr, callback) {
    			crypto.getRandomValues(arr);
    			if(callback) {
    				callback(null);
    			}
    		};
    	})(global.crypto || global.msCrypto) // mscrypto for IE11
    };

    var Crypto = (function() {
    	var DEFAULT_ALGORITHM = 'aes';
    	var DEFAULT_KEYLENGTH = 256; // bits
    	var DEFAULT_MODE = 'cbc';
    	var DEFAULT_BLOCKLENGTH = 16; // bytes
    	var DEFAULT_BLOCKLENGTH_WORDS = 4; // 32-bit words
    	var UINT32_SUP = 0x100000000;
    	var INT32_SUP = 0x80000000;
    	var WordArray = CryptoJS.lib.WordArray;

    	/**
    	 * Internal: generate an array of secure random words corresponding to the given length of bytes
    	 * @param bytes
    	 * @param callback
    	 */
    	var generateRandom;
    	if(typeof Uint32Array !== 'undefined' && Platform.getRandomValues) {
    		var blockRandomArray = new Uint32Array(DEFAULT_BLOCKLENGTH_WORDS);
    		generateRandom = function(bytes, callback) {
    			var words = bytes / 4, nativeArray = (words == DEFAULT_BLOCKLENGTH_WORDS) ? blockRandomArray : new Uint32Array(words);
    			Platform.getRandomValues(nativeArray, function(err) {
    				callback(err, BufferUtils.toWordArray(nativeArray));
    			});
    		};
    	} else {
    		generateRandom = function(bytes, callback) {
    			Logger.logAction(Logger.LOG_MAJOR, 'Ably.Crypto.generateRandom()', 'Warning: the browser you are using does not support secure cryptographically secure randomness generation; falling back to insecure Math.random()');
    			var words = bytes / 4, array = new Array(words);
    			for(var i = 0; i < words; i++) {
    				/* cryptojs wordarrays use signed ints. When WordArray.create is fed a
    				* Uint32Array unsigned are converted to signed automatically, but when
    				* fed a normal array they aren't, so need to do so ourselves by
    				* subtracting INT32_SUP */
    				array[i] = Math.floor(Math.random() * UINT32_SUP) - INT32_SUP;
    			}

    			callback(null, WordArray.create(array));
    		};
    	}

    	/**
    	 * Internal: calculate the padded length of a given plaintext
    	 * using PKCS5.
    	 * @param plaintextLength
    	 * @return
    	 */
    	function getPaddedLength(plaintextLength) {
    		return (plaintextLength + DEFAULT_BLOCKLENGTH) & -DEFAULT_BLOCKLENGTH;
    	}

    	/**
    	 * Internal: checks that the cipherParams are a valid combination. Currently
    	 * just checks that the calculated keyLength is a valid one for aes-cbc
    	 */
    	function validateCipherParams(params) {
    		if(params.algorithm === 'aes' && params.mode === 'cbc') {
    			if(params.keyLength === 128 || params.keyLength === 256) {
    				return;
    			}
    			throw new Error('Unsupported key length ' + params.keyLength + ' for aes-cbc encryption. Encryption key must be 128 or 256 bits (16 or 32 ASCII characters)');
    		}
    	}

    	function normaliseBase64(string) {
    		/* url-safe base64 strings use _ and - instread of / and + */
    		return string.replace('_', '/').replace('-', '+');
    	}

    	/**
    	 * Internal: a block containing zeros
    	 */
    	var emptyBlock = WordArray.create([0,0,0,0]);

    	/**
    	 * Internal: obtain the pkcs5 padding string for a given padded length;
    	 */
    	var pkcs5Padding = [
    		WordArray.create([0x10101010,0x10101010,0x10101010,0x10101010], 16),
    		WordArray.create([0x01000000], 1),
    		WordArray.create([0x02020000], 2),
    		WordArray.create([0x03030300], 3),
    		WordArray.create([0x04040404], 4),
    		WordArray.create([0x05050505,0x05000000], 5),
    		WordArray.create([0x06060606,0x06060000], 6),
    		WordArray.create([0x07070707,0x07070700], 7),
    		WordArray.create([0x08080808,0x08080808], 8),
    		WordArray.create([0x09090909,0x09090909,0x09000000], 9),
    		WordArray.create([0x0a0a0a0a,0x0a0a0a0a,0x0a0a0000], 10),
    		WordArray.create([0x0b0b0b0b,0x0b0b0b0b,0x0b0b0b00], 11),
    		WordArray.create([0x0c0c0c0c,0x0c0c0c0c,0x0c0c0c0c], 12),
    		WordArray.create([0x0d0d0d0d,0x0d0d0d0d,0x0d0d0d0d,0x0d000000], 13),
    		WordArray.create([0x0e0e0e0e,0x0e0e0e0e,0x0e0e0e0e,0x0e0e0000], 14),
    		WordArray.create([0x0f0f0f0f,0x0f0f0f0f,0x0f0f0f0f,0x0f0f0f0f], 15),
    		WordArray.create([0x10101010,0x10101010,0x10101010,0x10101010], 16)
    	];

    	/**
    	 * Utility classes and interfaces for message payload encryption.
    	 *
    	 * This class supports AES/CBC/PKCS5 with a default keylength of 128 bits
    	 * but supporting other keylengths. Other algorithms and chaining modes are
    	 * not supported directly, but supportable by extending/implementing the base
    	 * classes and interfaces here.
    	 *
    	 * Secure random data for creation of Initialization Vectors (IVs) and keys
    	 * is obtained from window.crypto.getRandomValues if available, or from
    	 * Math.random() if not. Clients who do not want to depend on Math.random()
    	 * should polyfill window.crypto.getRandomValues with a library that seeds
    	 * a PRNG with real entropy.
    	 *
    	 * Each message payload is encrypted with an IV in CBC mode, and the IV is
    	 * concatenated with the resulting raw ciphertext to construct the "ciphertext"
    	 * data passed to the recipient.
    	 */
    	function Crypto() {}

    	/**
    	 * A class encapsulating the client-specifiable parameters for
    	 * the cipher.
    	 *
    	 * algorithm is the name of the algorithm in the default system provider,
    	 * or the lower-cased version of it; eg "aes" or "AES".
    	 *
    	 * Clients are recommended to not call this directly, but instead to use the
    	 * Crypto.getDefaultParams helper, which will fill in any fields not supplied
    	 * with default values and validation the result.
    	 */
    	function CipherParams() {
    		this.algorithm = null;
    		this.keyLength = null;
    		this.mode = null;
    		this.key = null;
    	}
    	Crypto.CipherParams = CipherParams;

    	/**
    	 * Obtain a complete CipherParams instance from the provided params, filling
    	 * in any not provided with default values, calculating a keyLength from
    	 * the supplied key, and validating the result.
    	 * @param params an object containing at a minimum a `key` key with value the
    	 * key, as either a binary (ArrayBuffer, Array, WordArray) or a
    	 * base64-encoded string. May optionally also contain: algorithm (defaults to
    	 * AES), mode (defaults to 'cbc')
    	 */
    	Crypto.getDefaultParams = function(params) {
    		var key;
    		/* Backward compatibility */
    		if((typeof(params) === 'function') || (typeof(params) === 'string')) {
    			Logger.deprecated('Crypto.getDefaultParams(key, callback)', 'Crypto.getDefaultParams({key: key})');
    			if(typeof(params) === 'function') {
    				Crypto.generateRandomKey(function(key) {
    					params(null, Crypto.getDefaultParams({key: key}));
    				});
    			} else if(typeof arguments[1] === 'function') {
    				arguments[1](null, Crypto.getDefaultParams({key: params}));
    			} else {
    				throw new Error('Invalid arguments for Crypto.getDefaultParams');
    			}
    			return;
    		}

    		if(!params.key) {
    			throw new Error('Crypto.getDefaultParams: a key is required');
    		}

    		if (typeof(params.key) === 'string') {
    			key = CryptoJS.enc.Base64.parse(normaliseBase64(params.key));
    		} else {
    			key = BufferUtils.toWordArray(params.key); // Expect key to be an Array, ArrayBuffer, or WordArray at this point
    		}

    		var cipherParams = new CipherParams();
    		cipherParams.key = key;
    		cipherParams.algorithm = params.algorithm || DEFAULT_ALGORITHM;
    		cipherParams.keyLength = key.words.length * (4 * 8);
    		cipherParams.mode = params.mode || DEFAULT_MODE;

    		if(params.keyLength && params.keyLength !== cipherParams.keyLength) {
    			throw new Error('Crypto.getDefaultParams: a keyLength of ' + params.keyLength + ' was specified, but the key actually has length ' + cipherParams.keyLength);
    		}

    		validateCipherParams(cipherParams);
    		return cipherParams;
    	};

    	/**
    	 * Generate a random encryption key from the supplied keylength (or the
    	 * default keyLength if none supplied) as a CryptoJS WordArray
    	 * @param keyLength (optional) the required keyLength in bits
    	 * @param callback (err, key)
    	 */
    	Crypto.generateRandomKey = function(keyLength, callback) {
    		if(arguments.length == 1 && typeof(keyLength) == 'function') {
    			callback = keyLength;
    			keyLength = undefined;
    		}
    		generateRandom((keyLength || DEFAULT_KEYLENGTH) / 8, callback);
    	};

    	/**
    	 * Internal; get a ChannelCipher instance based on the given cipherParams
    	 * @param params either a CipherParams instance or some subset of its
    	 * fields that includes a key
    	 */
    	Crypto.getCipher = function(params) {
    		var cipherParams = (params instanceof CipherParams) ?
    		                   params :
    		                   Crypto.getDefaultParams(params);

    		return {cipherParams: cipherParams, cipher: new CBCCipher(cipherParams, DEFAULT_BLOCKLENGTH_WORDS, params.iv)};
    	};

    	function CBCCipher(params, blockLengthWords, iv) {
    		this.algorithm = params.algorithm + '-' + String(params.keyLength) + '-' + params.mode;
    		this.cjsAlgorithm = params.algorithm.toUpperCase().replace(/-\d+$/, '');
    		this.key = BufferUtils.toWordArray(params.key);
    		if(iv) {
    			this.iv = BufferUtils.toWordArray(iv).clone();
    		}
    		this.blockLengthWords = blockLengthWords;
    	}

    	CBCCipher.prototype.encrypt = function(plaintext, callback) {
    		Logger.logAction(Logger.LOG_MICRO, 'CBCCipher.encrypt()', '');
    		plaintext = BufferUtils.toWordArray(plaintext);
    		//console.log('encrypt: plaintext:');
    		//console.log(CryptoJS.enc.Hex.stringify(plaintext));
    		var plaintextLength = plaintext.sigBytes,
    			paddedLength = getPaddedLength(plaintextLength),
    			self = this;

    		var then = function() {
    			self.getIv(function(err, iv) {
    				if (err) {
    					callback(err);
    					return;
    				}
    				var cipherOut = self.encryptCipher.process(plaintext.concat(pkcs5Padding[paddedLength - plaintextLength]));
    				var ciphertext = iv.concat(cipherOut);
    				//console.log('encrypt: ciphertext:');
    				//console.log(CryptoJS.enc.Hex.stringify(ciphertext));
    				callback(null, ciphertext);
    			});
    		};

    		if (!this.encryptCipher) {
    			if(this.iv) {
    				this.encryptCipher = CryptoJS.algo[this.cjsAlgorithm].createEncryptor(this.key, { iv: this.iv });
    				then();
    			} else {
    				generateRandom(DEFAULT_BLOCKLENGTH, function(err, iv) {
    					if (err) {
    						callback(err);
    						return;
    					}
    					self.encryptCipher = CryptoJS.algo[self.cjsAlgorithm].createEncryptor(self.key, { iv: iv });
    					self.iv = iv;
    					then();
    				});
    			}
    		} else {
    			then();
    		}
    	};

    	CBCCipher.prototype.decrypt = function(ciphertext) {
    		Logger.logAction(Logger.LOG_MICRO, 'CBCCipher.decrypt()', '');
    		ciphertext = BufferUtils.toWordArray(ciphertext);
    		//console.log('decrypt: ciphertext:');
    		//console.log(CryptoJS.enc.Hex.stringify(ciphertext));
    		var blockLengthWords = this.blockLengthWords,
    			ciphertextWords = ciphertext.words,
    			iv = WordArray.create(ciphertextWords.slice(0, blockLengthWords)),
    			ciphertextBody = WordArray.create(ciphertextWords.slice(blockLengthWords));

    		var decryptCipher = CryptoJS.algo[this.cjsAlgorithm].createDecryptor(this.key, { iv: iv });
    		var plaintext = decryptCipher.process(ciphertextBody);
    		var epilogue = decryptCipher.finalize();
    		decryptCipher.reset();
    		if(epilogue && epilogue.sigBytes) plaintext.concat(epilogue);
    		//console.log('decrypt: plaintext:');
    		//console.log(CryptoJS.enc.Hex.stringify(plaintext));
    		return plaintext;
    	};

    	CBCCipher.prototype.getIv = function(callback) {
    		if(this.iv) {
    			var iv = this.iv;
    			this.iv = null;
    			callback(null, iv);
    			return;
    		}

    		/* Since the iv for a new block is the ciphertext of the last, this
    		* sets a new iv (= aes(randomBlock XOR lastCipherText)) as well as
    		* returning it */
    		var self = this;
    		generateRandom(DEFAULT_BLOCKLENGTH, function(err, randomBlock) {
    			if (err) {
    				callback(err);
    				return;
    			} 
    			callback(null, self.encryptCipher.process(randomBlock));
    		});
    	};

    	return Crypto;
    })();

    var WebStorage = (function() {
    	var sessionSupported,
    		localSupported,
    		test = 'ablyjs-storage-test';

    	/* Even just accessing the session/localStorage object can throw a
    	 * security exception in some circumstances with some browsers. In
    	 * others, calling setItem will throw. So have to check in this
    	 * somewhat roundabout way. (If unsupported or no global object,
    	 * will throw on accessing a property of undefined) */
    	try {
    		global.sessionStorage.setItem(test, test);
    		global.sessionStorage.removeItem(test);
    		sessionSupported = true;
    	} catch(e) {
    		sessionSupported = false;
    	}

    	try {
    		global.localStorage.setItem(test, test);
    		global.localStorage.removeItem(test);
    		localSupported = true;
    	} catch(e) {
    		localSupported = false;
    	}

    	function WebStorage() {}

    	function storageInterface(session) {
    		return session ? global.sessionStorage : global.localStorage;
    	}

    	function set(name, value, ttl, session) {
    		var wrappedValue = {value: value};
    		if(ttl) {
    			wrappedValue.expires = Utils.now() + ttl;
    		}
    		return storageInterface(session).setItem(name, JSON.stringify(wrappedValue));
    	}

    	function get(name, session) {
    		var rawItem = storageInterface(session).getItem(name);
    		if(!rawItem) return null;
    		var wrappedValue = JSON.parse(rawItem);
    		if(wrappedValue.expires && (wrappedValue.expires < Utils.now())) {
    			storageInterface(session).removeItem(name);
    			return null;
    		}
    		return wrappedValue.value;
    	}

    	function remove(name, session) {
    		return storageInterface(session).removeItem(name);
    	}

    	if(localSupported) {
    		WebStorage.set    = function(name, value, ttl) { return set(name, value, ttl, false); };
    		WebStorage.get    = function(name) { return get(name, false); };
    		WebStorage.remove = function(name) { return remove(name, false); };
    	}

    	if(sessionSupported) {
    		WebStorage.setSession    = function(name, value, ttl) { return set(name, value, ttl, true); };
    		WebStorage.getSession    = function(name) { return get(name, true); };
    		WebStorage.removeSession = function(name) { return remove(name, true); };
    	}

    	return WebStorage;
    })();

    var Defaults = {
    	internetUpUrl: 'https://internet-up.ably-realtime.com/is-the-internet-up.txt',
    	jsonpInternetUpUrl: 'https://internet-up.ably-realtime.com/is-the-internet-up-0-9.js',
    	/* Order matters here: the base transport is the leftmost one in the
    	 * intersection of baseTransportOrder and the transports clientOption that's
    	 * supported.  This is not quite the same as the preference order -- e.g.
    	 * xhr_polling is preferred to jsonp, but for browsers that support it we want
    	 * the base transport to be xhr_polling, not jsonp */
    	defaultTransports: ['xhr_polling', 'xhr_streaming', 'jsonp', 'web_socket'],
    	baseTransportOrder: ['xhr_polling', 'xhr_streaming', 'jsonp', 'web_socket'],
    	transportPreferenceOrder: ['jsonp', 'xhr_polling', 'xhr_streaming', 'web_socket'],
    	upgradeTransports: ['xhr_streaming', 'web_socket']
    };

    /* If using IE8, don't attempt to upgrade from xhr_polling to xhr_streaming -
    * while it can do streaming, the low max http-connections-per-host limit means
    * that the polling transport is crippled during the upgrade process. So just
    * leave it at the base transport */
    if(Platform.noUpgrade) {
    	Defaults.upgradeTransports = [];
    }


    var BufferUtils = (function() {
    	var WordArray = CryptoJS.lib.WordArray;
    	var ArrayBuffer = Platform.ArrayBuffer;
    	var atob = Platform.atob;
    	var TextEncoder = Platform.TextEncoder;
    	var TextDecoder = Platform.TextDecoder;
    	var base64CharSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    	var hexCharSet = '0123456789abcdef';

    	function isWordArray(ob) { return ob !== null && ob !== undefined && ob.sigBytes !== undefined; }
    	function isArrayBuffer(ob) { return ob !== null && ob !== undefined && ob.constructor === ArrayBuffer; }
    	function isTypedArray(ob) { return ArrayBuffer && ArrayBuffer.isView && ArrayBuffer.isView(ob); }

    	// https://gist.githubusercontent.com/jonleighton/958841/raw/f200e30dfe95212c0165ccf1ae000ca51e9de803/gistfile1.js
    	function uint8ViewToBase64(bytes) {
    		var base64    = '';
    		var encodings = base64CharSet;

    		var byteLength    = bytes.byteLength;
    		var byteRemainder = byteLength % 3;
    		var mainLength    = byteLength - byteRemainder;

    		var a, b, c, d;
    		var chunk;

    		// Main loop deals with bytes in chunks of 3
    		for (var i = 0; i < mainLength; i = i + 3) {
    			// Combine the three bytes into a single integer
    			chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

    			// Use bitmasks to extract 6-bit segments from the triplet
    			a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
    			b = (chunk & 258048)   >> 12; // 258048   = (2^6 - 1) << 12
    			c = (chunk & 4032)     >>  6; // 4032     = (2^6 - 1) << 6
    			d = chunk & 63;               // 63       = 2^6 - 1

    			// Convert the raw binary segments to the appropriate ASCII encoding
    			base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    		}

    		// Deal with the remaining bytes and padding
    		if (byteRemainder == 1) {
    			chunk = bytes[mainLength];

    			a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

    			// Set the 4 least significant bits to zero
    			b = (chunk & 3)   << 4; // 3   = 2^2 - 1

    			base64 += encodings[a] + encodings[b] + '==';
    		} else if (byteRemainder == 2) {
    			chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

    			a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
    			b = (chunk & 1008)  >>  4; // 1008  = (2^6 - 1) << 4

    			// Set the 2 least significant bits to zero
    			c = (chunk & 15)    <<  2; // 15    = 2^4 - 1

    			base64 += encodings[a] + encodings[b] + encodings[c] + '=';
    		}

    		return base64
    	}

    	function base64ToArrayBuffer(base64) {
    		var binary_string =  atob(base64);
    		var len = binary_string.length;
    		var bytes = new Uint8Array( len );
    		for (var i = 0; i < len; i++)        {
    			var ascii = binary_string.charCodeAt(i);
    			bytes[i] = ascii;
    		}
    		return bytes.buffer;
    	}

    	/* Most BufferUtils methods that return a binary object return an ArrayBuffer
    	 * if supported, else a CryptoJS WordArray. The exception is toBuffer, which
    	 * returns a Uint8Array (and won't work on browsers too old to support it) */
    	function BufferUtils() {}

    	BufferUtils.base64CharSet = base64CharSet;
    	BufferUtils.hexCharSet = hexCharSet;

    	var isBuffer = BufferUtils.isBuffer = function(buf) { return isArrayBuffer(buf) || isWordArray(buf) || isTypedArray(buf); };

    	/* In browsers, returns a Uint8Array */
    	var toBuffer = BufferUtils.toBuffer = function(buf) {
    		if(!ArrayBuffer) {
    			throw new Error("Can't convert to Buffer: browser does not support the necessary types");
    		}

    		if(isArrayBuffer(buf)) {
    			return new Uint8Array(buf);
    		}

    		if(isTypedArray(buf)) {
    			return new Uint8Array(buf.buffer);
    		}

    		if(isWordArray(buf)) {
    			/* Backported from unreleased CryptoJS
    			* https://code.google.com/p/crypto-js/source/browse/branches/3.x/src/lib-typedarrays.js?r=661 */
    			var arrayBuffer = new ArrayBuffer(buf.sigBytes);
    			var uint8View = new Uint8Array(arrayBuffer);

    			for (var i = 0; i < buf.sigBytes; i++) {
    				uint8View[i] = (buf.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    			}

    			return uint8View;
    		}
    		throw new Error("BufferUtils.toBuffer expected an arraybuffer, typed array, or CryptoJS wordarray");
    	};

    	BufferUtils.toArrayBuffer = function(buf) {
    		if(isArrayBuffer(buf)) {
    			return buf;
    		}
    		return toBuffer(buf).buffer;
    	};

    	BufferUtils.toWordArray = function(buf) {
    		if(isTypedArray(buf)) {
    			buf = buf.buffer;
    		}
    		return isWordArray(buf) ? buf : WordArray.create(buf);
    	};

    	BufferUtils.base64Encode = function(buf) {
    		if(isWordArray(buf)) {
    			return CryptoJS.enc.Base64.stringify(buf);
    		}
    		return uint8ViewToBase64(toBuffer(buf));
    	};

    	BufferUtils.base64Decode = function(str) {
    		if(ArrayBuffer && atob) {
    			return base64ToArrayBuffer(str);
    		}
    		return CryptoJS.enc.Base64.parse(str);
    	};

    	BufferUtils.hexEncode = function(buf) {
    		buf = BufferUtils.toWordArray(buf);
    		return CryptoJS.enc.Hex.stringify(buf);
    	};

    	BufferUtils.hexDecode = function(string) {
    		var wordArray = CryptoJS.enc.Hex.parse(string);
    		return ArrayBuffer ? BufferUtils.toArrayBuffer(wordArray) : wordArray;
    	};

    	BufferUtils.utf8Encode = function(string) {
    		if(TextEncoder) {
    			return (new TextEncoder()).encode(string).buffer;
    		}
    		return CryptoJS.enc.Utf8.parse(string);
    	};

    	/* For utf8 decoding we apply slightly stricter input validation than to
    	 * hexEncode/base64Encode/etc: in those we accept anything that Buffer.from
    	 * can take (in particular allowing strings, which are just interpreted as
    	 * binary); here we ensure that the input is actually a buffer since trying
    	 * to utf8-decode a string to another string is almost certainly a mistake */
    	BufferUtils.utf8Decode = function(buf) {
    		if(!isBuffer(buf)) {
    			throw new Error("Expected input of utf8decode to be an arraybuffer, typed array, or CryptoJS wordarray");
    		}
    		if(TextDecoder && !isWordArray(buf)) {
    			return (new TextDecoder()).decode(buf);
    		}
    		buf = BufferUtils.toWordArray(buf);
    		return CryptoJS.enc.Utf8.stringify(buf);
    	};

    	BufferUtils.bufferCompare = function(buf1, buf2) {
    		if(!buf1) return -1;
    		if(!buf2) return 1;
    		buf1 = BufferUtils.toWordArray(buf1);
    		buf2 = BufferUtils.toWordArray(buf2);
    		buf1.clamp(); buf2.clamp();

    		var cmp = buf1.sigBytes - buf2.sigBytes;
    		if(cmp != 0) return cmp;
    		buf1 = buf1.words; buf2 = buf2.words;
    		for(var i = 0; i < buf1.length; i++) {
    			cmp = buf1[i] - buf2[i];
    			if(cmp != 0) return cmp;
    		}
    		return 0;
    	};

    	BufferUtils.byteLength = function(buf) {
    		if(isArrayBuffer(buf) || isTypedArray(buf)) {
    			return buf.byteLength
    		} else if(isWordArray(buf)) {
    			return buf.sigBytes;
    		}
    	};

    	return BufferUtils;
    })();

    var Utils = (function() {
    	var msgpack = Platform.msgpack;

    	function Utils() {}

    	function randomPosn(arrOrStr) {
    		return Math.floor(Math.random() * arrOrStr.length);
    	}

    	/*
    	 * Add a set of properties to a target object
    	 * target: the target object
    	 * props:  an object whose enumerable properties are
    	 *         added, by reference only
    	 */
    	Utils.mixin = function(target) {
    		for(var i = 1; i < arguments.length; i++) {
    			var source = arguments[i];
    			if(!source) { break; }
    			var hasOwnProperty = source.hasOwnProperty;
    			for(var key in source) {
    				if(!hasOwnProperty || hasOwnProperty.call(source, key)) {
    					target[key] = source[key];
    				}
    			}
    		}
    		return target;
    	};

    	/*
    	 * Add a set of properties to a target object
    	 * target: the target object
    	 * props:  an object whose enumerable properties are
    	 *         added, by reference only
    	 */
    	Utils.copy = function(src) {
    		return Utils.mixin({}, src);
    	};

    	/*
    	 * Determine whether or not a given object is
    	 * an array.
    	 */
    	Utils.isArray = Array.isArray || function(ob) {
    		return Object.prototype.toString.call(ob) == '[object Array]';
    	};

    	/*
    	 * Ensures that an Array object is always returned
    	 * returning the original Array of obj is an Array
    	 * else wrapping the obj in a single element Array
    	 */
    	Utils.ensureArray = function(obj) {
    		if(Utils.isEmptyArg(obj)) {
    			return [];
    		}
    		if(Utils.isArray(obj)) {
    			return obj;
    		}
    		return [obj];
    	};

    	/* ...Or an Object (in the narrow sense) */
    	Utils.isObject = function(ob) {
    		return Object.prototype.toString.call(ob) == '[object Object]';
    	};

    	/*
    	 * Determine whether or not an object contains
    	 * any enumerable properties.
    	 * ob: the object
    	 */
    	Utils.isEmpty = function(ob) {
    		for(var prop in ob)
    			return false;
    		return true;
    	};

    	Utils.isOnlyPropIn = function(ob, property) {
    		for(var prop in ob) {
    			if(prop !== property) {
    				return false;
    			}
    		}
    		return true;
    	};

    	/*
    	 * Determine whether or not an argument to an overloaded function is
    	 * undefined (missing) or null.
    	 * This method is useful when constructing functions such as (WebIDL terminology):
    	 *   off([TreatUndefinedAs=Null] DOMString? event)
    	 * as you can then confirm the argument using:
    	 *   Utils.isEmptyArg(event)
    	 */

    	Utils.isEmptyArg = function(arg) {
    		return arg === null || arg === undefined;
    	};

    	/*
    	 * Perform a simple shallow clone of an object.
    	 * Result is an object irrespective of whether
    	 * the input is an object or array. All
    	 * enumerable properties are copied.
    	 * ob: the object
    	 */
    	Utils.shallowClone = function(ob) {
    		var result = new Object();
    		for(var prop in ob)
    			result[prop] = ob[prop];
    		return result;
    	};

    	/*
    	 * Clone an object by creating a new object with the
    	 * given object as its prototype. Optionally
    	 * a set of additional own properties can be
    	 * supplied to be added to the newly created clone.
    	 * ob:            the object to be cloned
    	 * ownProperties: optional object with additional
    	 *                properties to add
    	 */
    	Utils.prototypicalClone = function(ob, ownProperties) {
    		function F() {}
    		F.prototype = ob;
    		var result = new F();
    		if(ownProperties)
    			Utils.mixin(result, ownProperties);
    		return result;
    	};

    	/*
    	 * Declare a constructor to represent a subclass
    	 * of another constructor
    	 * If platform has a built-in version we use that from Platform, else we
    	 * define here (so can make use of other Utils fns)
    	 * See node.js util.inherits
    	 */
    	Utils.inherits = function(ctor, superCtor) {
    		ctor.super_ = superCtor;
    		ctor.prototype = Utils.prototypicalClone(superCtor.prototype, { constructor: ctor });
    	};

    	/*
    	 * Determine whether or not an object has an enumerable
    	 * property whose value equals a given value.
    	 * ob:  the object
    	 * val: the value to find
    	 */
    	Utils.containsValue = function(ob, val) {
    		for(var i in ob) {
    			if(ob[i] == val)
    				return true;
    		}
    		return false;
    	};

    	Utils.intersect = function(arr, ob) { return Utils.isArray(ob) ? Utils.arrIntersect(arr, ob) : Utils.arrIntersectOb(arr, ob); };

    	Utils.arrIntersect = function(arr1, arr2) {
    		var result = [];
    		for(var i = 0; i < arr1.length; i++) {
    			var member = arr1[i];
    			if(Utils.arrIndexOf(arr2, member) != -1)
    				result.push(member);
    		}
    		return result;
    	};

    	Utils.arrIntersectOb = function(arr, ob) {
    		var result = [];
    		for(var i = 0; i < arr.length; i++) {
    			var member = arr[i];
    			if(member in ob)
    				result.push(member);
    		}
    		return result;
    	};

    	Utils.arrSubtract = function(arr1, arr2) {
    		var result = [];
    		for(var i = 0; i < arr1.length; i++) {
    			var element = arr1[i];
    			if(Utils.arrIndexOf(arr2, element) == -1)
    				result.push(element);
    		}
    		return result;
    	};

    	Utils.arrIndexOf = Array.prototype.indexOf
    		? function(arr, elem, fromIndex) {
    			return arr.indexOf(elem,  fromIndex);
    		}
    		: function(arr, elem, fromIndex) {
    			fromIndex = fromIndex || 0;
    			var len = arr.length;
    			for(;fromIndex < len; fromIndex++) {
    				if(arr[fromIndex] === elem) {
    					return fromIndex;
    				}
    			}
    			return -1;
    		};

    	Utils.arrIn = function(arr, val) {
    		return Utils.arrIndexOf(arr, val) !== -1;
    	};

    	Utils.arrDeleteValue = function(arr, val) {
    		var idx = Utils.arrIndexOf(arr, val);
    		var res = (idx != -1);
    		if(res)
    			arr.splice(idx, 1);
    		return res;
    	};

    	Utils.arrWithoutValue = function(arr, val) {
    		var newArr = arr.slice();
    		Utils.arrDeleteValue(newArr, val);
    		return newArr;
    	};

    	/*
    	 * Construct an array of the keys of the enumerable
    	 * properties of a given object, optionally limited
    	 * to only the own properties.
    	 * ob:      the object
    	 * ownOnly: boolean, get own properties only
    	 */
    	Utils.keysArray = function(ob, ownOnly) {
    		var result = [];
    		for(var prop in ob) {
    			if(ownOnly && !ob.hasOwnProperty(prop)) continue;
    			result.push(prop);
    		}
    		return result;
    	};

    	/*
    	 * Construct an array of the values of the enumerable
    	 * properties of a given object, optionally limited
    	 * to only the own properties.
    	 * ob:      the object
    	 * ownOnly: boolean, get own properties only
    	 */
    	Utils.valuesArray = function(ob, ownOnly) {
    		var result = [];
    		for(var prop in ob) {
    			if(ownOnly && !ob.hasOwnProperty(prop)) continue;
    			result.push(ob[prop]);
    		}
    		return result;
    	};

    	Utils.arrForEach = Array.prototype.forEach ?
    		function(arr, fn) {
    			arr.forEach(fn);
    		} :
    		function(arr, fn) {
    			var len = arr.length;
    			for(var i = 0; i < len; i++) {
    				fn(arr[i], i, arr);
    			}
    		};

    	/* Useful when the function may mutate the array */
    	Utils.safeArrForEach = function(arr, fn) {
    		return Utils.arrForEach(arr.slice(), fn);
    	};

    	Utils.arrMap = Array.prototype.map ?
    		function(arr, fn) {
    			return arr.map(fn);
    		} :
    		function(arr, fn)	{
    			var result = [],
    				len = arr.length;
    			for(var i = 0; i < len; i++) {
    				result.push(fn(arr[i], i, arr));
    			}
    			return result;
    		};

    	Utils.arrFilter = Array.prototype.filter ?
    		function(arr, fn) {
    			return arr.filter(fn);
    		} :
    		function(arr, fn)	{
    			var result = [],
    				len = arr.length;
    			for(var i = 0; i < len; i++) {
    				if(fn(arr[i])) {
    					result.push(arr[i]);
    				}
    			}
    			return result;
    		};

    	Utils.arrEvery = Array.prototype.every ?
    		function(arr, fn) {
    			return arr.every(fn);
    		} : function(arr, fn) {
    			var len = arr.length;
    			for(var i = 0; i < len; i++) {
    				if(!fn(arr[i], i, arr)) {
    					return false;
    				}			}
    			return true;
    		};

    	Utils.allSame = function(arr, prop) {
    		if(arr.length === 0) {
    			return true;
    		}
    		var first = arr[0][prop];
    		return Utils.arrEvery(arr, function(item) {
    			return item[prop] === first;
    		});
    	};

    	Utils.nextTick = Platform.nextTick;

    	var contentTypes = {
    		json:   'application/json',
    		jsonp:  'application/javascript',
    		xml:    'application/xml',
    		html:   'text/html',
    		msgpack: 'application/x-msgpack'
    	};

    	Utils.defaultGetHeaders = function(format) {
    		var accept = contentTypes[format || 'json'];
    		return {
    			accept: accept,
    			'X-Ably-Version': Defaults.apiVersion,
    			'X-Ably-Lib': Defaults.libstring
    		};
    	};

    	Utils.defaultPostHeaders = function(format) {
    		var accept, contentType;
    		accept = contentType = contentTypes[format || 'json'];

    		return {
    			accept: accept,
    			'content-type': contentType,
    			'X-Ably-Version': Defaults.apiVersion,
    			'X-Ably-Lib': Defaults.libstring
    		};
    	};

    	Utils.arrPopRandomElement = function(arr) {
    		return arr.splice(randomPosn(arr), 1)[0];
    	};

    	Utils.toQueryString = function(params) {
    		var parts = [];
    		if(params) {
    			for(var key in params)
    				parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
    		}
    		return parts.length ? '?' + parts.join('&') : '';
    	};

    	Utils.parseQueryString = function(query) {
    		var match,
    			search = /([^?&=]+)=?([^&]*)/g,
    			result = {};

    		while (match = search.exec(query))
    			result[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);

     		return result;
    	};

    	Utils.now = Date.now || function() {
    		/* IE 8 */
    		return new Date().getTime();
    	};

    	Utils.inspect = Platform.inspect;

    	Utils.isErrorInfo = function(err) {
    		return err.constructor.name == 'ErrorInfo'
    	};

    	Utils.inspectError = function(x) {
    		/* redundant, but node vmcontext issue makes instanceof unreliable, and
    		 * can't use just constructor test as could be a TypeError constructor etc. */
    		return (x && (Utils.isErrorInfo(x) ||
    			x.constructor.name == 'Error' ||
    			x instanceof Error)) ?
    			x.toString() :
    			Utils.inspect(x);
    	};

    	Utils.inspectBody = function(body) {
    		if(BufferUtils.isBuffer(body)) {
    			return body.toString();
    		} else if(typeof body === 'string') {
    			return body;
    		} else {
    			return Platform.inspect(body);
    		}
    	};

    	/* Data is assumed to be either a string or a buffer. */
    	Utils.dataSizeBytes = function(data) {
    		if(BufferUtils.isBuffer(data)) {
    			return BufferUtils.byteLength(data);
    		}
    		if(typeof data === 'string') {
    			return Platform.stringByteSize(data);
    		}
    		throw new Error("Expected input of Utils.dataSizeBytes to be a buffer or string, but was: " + (typeof data));
    	};

    	Utils.cheapRandStr = function() {
    		return String(Math.random()).substr(2);
    	};

    	/* Takes param the minimum number of bytes of entropy the string must
    	 * include, not the length of the string. String length produced is not
    	 * guaranteed. */
    	Utils.randomString = (Platform.getRandomValues && typeof Uint8Array !== 'undefined') ?
    		function(numBytes) {
    			var uIntArr = new Uint8Array(numBytes);
    			Platform.getRandomValues(uIntArr);
    			return BufferUtils.base64Encode(uIntArr);
    		} : function(numBytes) {
    			/* Old browser; fall back to Math.random. Could just use a
    			 * CryptoJS version of the above, but want this to still work in nocrypto
    			 * versions of the library */
    			var charset = BufferUtils.base64CharSet;
    			/* base64 has 33% overhead; round length up */
    			var length = Math.round(numBytes * 4/3);
    			var result = '';
    			for(var i=0; i<length; i++) {
    				result += charset[randomPosn(charset)];
    			}
    			return result;
    		};

    	Utils.randomHexString = (Platform.getRandomValues && typeof Uint8Array !== 'undefined') ?
    		function(numBytes) {
    			var uIntArr = new Uint8Array(numBytes);
    			Platform.getRandomValues(uIntArr);
    			return BufferUtils.hexEncode(uIntArr);
    		} : function(numBytes) {
    			var charset = BufferUtils.hexCharSet;
    			var length = numBytes * 2;
    			var result = '';
    			for(var i=0; i<length; i++) {
    				result += charset[randomPosn(charset)];
    			}
    			return result;
    		};

    	/* Pick n elements at random without replacement from an array */
    	Utils.arrChooseN = function(arr, n) {
    		var numItems = Math.min(n, arr.length),
    			mutableArr = arr.slice(),
    			result = [];
    		for(var i = 0; i < numItems; i++) {
    			result.push(Utils.arrPopRandomElement(mutableArr));
    		}
    		return result;
    	};

    	Utils.trim = String.prototype.trim ? function(str) {
    		return str.trim();
    	} : function(str) {
    		return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    	};

    	Utils.promisify = function(ob, fnName, args) {
    		return new Promise(function(resolve, reject) {
    			ob[fnName].apply(ob, Array.prototype.slice.call(args).concat(function(err, res) {
    				err ? reject(err) : resolve(res);
    			}));
    		});
    	};

    	Utils.decodeBody = function(body, format) {
    		return (format == 'msgpack') ? msgpack.decode(body) : JSON.parse(String(body));
    	};

    	Utils.encodeBody = function(body, format) {
    		return (format == 'msgpack') ? msgpack.encode(body, true) : JSON.stringify(body);
    	};

    	return Utils;
    })();

    var Http = (function() {
    	var noop = function() {};

    	function Http() {}

    	var now = Date.now || function() {
    		/* IE 8 */
    		return new Date().getTime();
    	};

    	function shouldFallback(err) {
    		var statusCode = err.statusCode;
    		/* 400 + no code = a generic xhr onerror. Browser doesn't give us enough
    		 * detail to know whether it's fallback-fixable, but it may be (eg if a
    		 * network issue), so try just in case */
    		return (statusCode === 408 && !err.code) ||
    			(statusCode === 400 && !err.code)      ||
    			(statusCode >= 500 && statusCode <= 504);
    	}

    	function getHosts(client) {
    		/* If we're a connected realtime client, try the endpoint we're connected
    		 * to first -- but still have fallbacks, being connected is not an absolute
    		 * guarantee that a datacenter has free capacity to service REST requests. */
    		var connection = client.connection,
    			connectionHost = connection && connection.connectionManager.host;

    		if(connectionHost) {
    			return [connectionHost].concat(Defaults.getFallbackHosts(client.options));
    		}

    		return Defaults.getHosts(client.options);
    	}
    	Http._getHosts = getHosts;

    	Http.methods = ['get', 'delete', 'post', 'put', 'patch'];
    	Http.methodsWithoutBody = ['get', 'delete'];
    	Http.methodsWithBody = Utils.arrSubtract(Http.methods, Http.methodsWithoutBody);

    	/* - Http.get, Http.post, Http.put, ...
    	 * Perform an HTTP request for a given path against prime and fallback Ably hosts
    	 * @param rest
    	 * @param path the full path
    	 * @param headers optional hash of headers
    	 * [only for methods with body: @param body object or buffer containing request body]
    	 * @param params optional hash of params
    	 * @param callback (err, response)
    	 *
    	 * - Http.getUri, Http.postUri, Http.putUri, ...
    	 * Perform an HTTP request for a given full URI
    	 * @param rest
    	 * @param uri the full URI
    	 * @param headers optional hash of headers
    	 * [only for methods with body: @param body object or buffer containing request body]
    	 * @param params optional hash of params
    	 * @param callback (err, response)
    	 */
    	Utils.arrForEach(Http.methodsWithoutBody, function(method) {
    		Http[method] = function(rest, path, headers, params, callback) {
    			Http['do'](method, rest, path, headers, null, params, callback);
    		};
    		Http[method + 'Uri'] = function(rest, uri, headers, params, callback) {
    			Http.doUri(method, rest, uri, headers, null, params, callback);
    		};
    	});

    	Utils.arrForEach(Http.methodsWithBody, function(method) {
    		Http[method] = function(rest, path, headers, body, params, callback) {
    			Http['do'](method, rest, path, headers, body, params, callback);
    		};
    		Http[method + 'Uri'] = function(rest, uri, headers, body, params, callback) {
    			Http.doUri(method, rest, uri, headers, body, params, callback);
    		};
    	});

    	/* Unlike for doUri, the 'rest' param here is mandatory, as it's used to generate the hosts */
    	Http['do'] = function(method, rest, path, headers, body, params, callback) {
    		callback = callback || noop;
    		var uriFromHost = (typeof(path) == 'function') ? path : function(host) { return rest.baseUri(host) + path; };
    		var binary = (headers && headers.accept != 'application/json');
    		var doArgs = arguments;

    		var currentFallback = rest._currentFallback;
    		if(currentFallback) {
    			if(currentFallback.validUntil > now()) {
    				/* Use stored fallback */
    				Http.Request(method, rest, uriFromHost(currentFallback.host), headers, params, body, function(err) {
    					if(err && shouldFallback(err)) {
    						/* unstore the fallback and start from the top with the default sequence */
    						rest._currentFallback = null;
    						Http['do'].apply(Http, doArgs);
    						return;
    					}
    					callback.apply(null, arguments);
    				});
    				return;
    			} else {
    				/* Fallback expired; remove it and fallthrough to normal sequence */
    				rest._currentFallback = null;
    			}
    		}

    		var hosts = getHosts(rest);

    		/* if there is only one host do it */
    		if(hosts.length == 1) {
    			Http.doUri(method, rest, uriFromHost(hosts[0]), headers, body, params, callback);
    			return;
    		}

    		/* hosts is an array with preferred host plus at least one fallback */
    		var tryAHost = function(candidateHosts, persistOnSuccess) {
    			var host = candidateHosts.shift();
    			Http.doUri(method, rest, uriFromHost(host), headers, body, params, function(err) {
    				if(err && shouldFallback(err) && candidateHosts.length) {
    					tryAHost(candidateHosts, true);
    					return;
    				}
    				if(persistOnSuccess) {
    					/* RSC15f */
    					rest._currentFallback = {
    						host: host,
    						validUntil: now() + rest.options.timeouts.fallbackRetryTimeout
    					};
    				}
    				callback.apply(null, arguments);
    			});
    		};
    		tryAHost(hosts);
    	};

    	Http.doUri = function(method, rest, uri, headers, body, params, callback) {
    		Http.Request(method, rest, uri, headers, params, body, callback);
    	};

    	Http.supportsAuthHeaders = false;
    	Http.supportsLinkHeaders = false;
    	return Http;
    })();

    /*
     Copyright (c) 2008 Fred Palmer fred.palmer_at_gmail.com

     Permission is hereby granted, free of charge, to any person
     obtaining a copy of this software and associated documentation
     files (the "Software"), to deal in the Software without
     restriction, including without limitation the rights to use,
     copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the
     Software is furnished to do so, subject to the following
     conditions:

     The above copyright notice and this permission notice shall be
     included in all copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
     OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
     OTHER DEALINGS IN THE SOFTWARE.
     */
    var Base64 = (function() {
    	function StringBuffer()
    	{
    		this.buffer = [];
    	}

    	StringBuffer.prototype.append = function append(string)
    	{
    		this.buffer.push(string);
    		return this;
    	};

    	StringBuffer.prototype.toString = function toString()
    	{
    		return this.buffer.join("");
    	};

    	var Base64 =
    	{
    		codex : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    		encode : function (input)
    		{
    			var output = new StringBuffer();
    			var codex = Base64.codex;

    			var enumerator = new Utf8EncodeEnumerator(input);
    			while (enumerator.moveNext())
    			{
    				var chr1 = enumerator.current;

    				enumerator.moveNext();
    				var chr2 = enumerator.current;

    				enumerator.moveNext();
    				var chr3 = enumerator.current;

    				var enc1 = chr1 >> 2;
    				var enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    				var enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    				var enc4 = chr3 & 63;

    				if (isNaN(chr2))
    				{
    					enc3 = enc4 = 64;
    				}
    				else if (isNaN(chr3))
    				{
    					enc4 = 64;
    				}

    				output.append(codex.charAt(enc1) + codex.charAt(enc2) + codex.charAt(enc3) + codex.charAt(enc4));
    			}

    			return output.toString();
    		},

    		decode : function (input)
    		{
    			var output = new StringBuffer();

    			var enumerator = new Base64DecodeEnumerator(input);
    			while (enumerator.moveNext())
    			{
    				var charCode = enumerator.current;

    				if (charCode < 128)
    					output.append(String.fromCharCode(charCode));
    				else if ((charCode > 191) && (charCode < 224))
    				{
    					enumerator.moveNext();
    					var charCode2 = enumerator.current;

    					output.append(String.fromCharCode(((charCode & 31) << 6) | (charCode2 & 63)));
    				}
    				else
    				{
    					enumerator.moveNext();
    					var charCode2 = enumerator.current;

    					enumerator.moveNext();
    					var charCode3 = enumerator.current;

    					output.append(String.fromCharCode(((charCode & 15) << 12) | ((charCode2 & 63) << 6) | (charCode3 & 63)));
    				}
    			}

    			return output.toString();
    		}
    	};

    	function Utf8EncodeEnumerator(input)
    	{
    		this._input = input;
    		this._index = -1;
    		this._buffer = [];
    	}

    	Utf8EncodeEnumerator.prototype =
    	{
    		current: Number.NaN,

    		moveNext: function()
    		{
    			if (this._buffer.length > 0)
    			{
    				this.current = this._buffer.shift();
    				return true;
    			}
    			else if (this._index >= (this._input.length - 1))
    			{
    				this.current = Number.NaN;
    				return false;
    			}
    			else
    			{
    				var charCode = this._input.charCodeAt(++this._index);

    				// "\r\n" -> "\n"
    				//
    				if ((charCode == 13) && (this._input.charCodeAt(this._index + 1) == 10))
    				{
    					charCode = 10;
    					this._index += 2;
    				}

    				if (charCode < 128)
    				{
    					this.current = charCode;
    				}
    				else if ((charCode > 127) && (charCode < 2048))
    				{
    					this.current = (charCode >> 6) | 192;
    					this._buffer.push((charCode & 63) | 128);
    				}
    				else
    				{
    					this.current = (charCode >> 12) | 224;
    					this._buffer.push(((charCode >> 6) & 63) | 128);
    					this._buffer.push((charCode & 63) | 128);
    				}

    				return true;
    			}
    		}
    	};

    	function Base64DecodeEnumerator(input)
    	{
    		this._input = input;
    		this._index = -1;
    		this._buffer = [];
    	}

    	Base64DecodeEnumerator.prototype =
    	{
    		current: 64,

    		moveNext: function()
    		{
    			if (this._buffer.length > 0)
    			{
    				this.current = this._buffer.shift();
    				return true;
    			}
    			else if (this._index >= (this._input.length - 1))
    			{
    				this.current = 64;
    				return false;
    			}
    			else
    			{
    				var enc1 = Base64.codex.indexOf(this._input.charAt(++this._index));
    				var enc2 = Base64.codex.indexOf(this._input.charAt(++this._index));
    				var enc3 = Base64.codex.indexOf(this._input.charAt(++this._index));
    				var enc4 = Base64.codex.indexOf(this._input.charAt(++this._index));

    				var chr1 = (enc1 << 2) | (enc2 >> 4);
    				var chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    				var chr3 = ((enc3 & 3) << 6) | enc4;

    				this.current = chr1;

    				if (enc3 != 64)
    					this._buffer.push(chr2);

    				if (enc4 != 64)
    					this._buffer.push(chr3);

    				return true;
    			}
    		}
    	};

    	return Base64;
    })();

    Defaults.ENVIRONMENT              = '';
    Defaults.REST_HOST                = 'rest.ably.io';
    Defaults.REALTIME_HOST            = 'realtime.ably.io';
    Defaults.FALLBACK_HOSTS           = ['A.ably-realtime.com', 'B.ably-realtime.com', 'C.ably-realtime.com', 'D.ably-realtime.com', 'E.ably-realtime.com'];
    Defaults.PORT                     = 80;
    Defaults.TLS_PORT                 = 443;
    Defaults.TIMEOUTS = {
    	/* Documented as options params: */
    	disconnectedRetryTimeout   : 15000,
    	suspendedRetryTimeout      : 30000,
    	/* Undocumented, but part of the api and can be used by customers: */
    	httpRequestTimeout         : 15000,
    	channelRetryTimeout        : 15000,
    	fallbackRetryTimeout       : 600000,
    	/* For internal / test use only: */
    	connectionStateTtl         : 120000,
    	realtimeRequestTimeout     : 10000,
    	recvTimeout                : 90000,
    	preferenceConnectTimeout   : 6000,
    	parallelUpgradeDelay       : 6000
    };
    Defaults.httpMaxRetryCount = 3;
    Defaults.maxMessageSize    = 65536;

    Defaults.errorReportingUrl = 'https://errors.ably.io/api/15/store/';
    Defaults.errorReportingHeaders = {
    	"X-Sentry-Auth": "Sentry sentry_version=7, sentry_key=a04e33c8674c451f8a310fbec029acf5, sentry_client=ably-js/0.1",
    	"Content-Type": "application/json"
    };

    Defaults.version          = '1.1.22';
    Defaults.libstring        = Platform.libver + '-' + Defaults.version;
    Defaults.apiVersion       = '1.1';

    Defaults.getHost = function(options, host, ws) {
    	if(ws)
    		host = ((host == options.restHost) && options.realtimeHost) || host || options.realtimeHost;
    	else
    		host = host || options.restHost;

    	return host;
    };

    Defaults.getPort = function(options, tls) {
    	return (tls || options.tls) ? options.tlsPort : options.port;
    };

    Defaults.getHttpScheme = function(options) {
    	return options.tls ? 'https://' : 'http://';
    };

    Defaults.getFallbackHosts = function(options) {
    	var fallbackHosts = options.fallbackHosts,
    		httpMaxRetryCount = typeof(options.httpMaxRetryCount) !== 'undefined' ? options.httpMaxRetryCount : Defaults.httpMaxRetryCount;

    	return fallbackHosts ? Utils.arrChooseN(fallbackHosts, httpMaxRetryCount) : [];
    };

    Defaults.getHosts = function(options) {
    	return [options.restHost].concat(Defaults.getFallbackHosts(options));
    };

    function checkHost(host) {
    	if(typeof host !== 'string') {
    		throw new ErrorInfo('host must be a string; was a ' + typeof host, 40000, 400);
    	}	if(!host.length) {
    		throw new ErrorInfo('host must not be zero-length', 40000, 400);
    	}}

    Defaults.objectifyOptions = function(options) {
    	if(typeof options == 'string') {
    		return (options.indexOf(':') == -1) ? {token: options} : {key: options};
    	}
    	return options;
    };

    Defaults.normaliseOptions = function(options) {
    	/* Deprecated options */
    	if(options.host) {
    		Logger.deprecated('host', 'restHost');
    		options.restHost = options.host;
    	}
    	if(options.wsHost) {
    		Logger.deprecated('wsHost', 'realtimeHost');
    		options.realtimeHost = options.wsHost;
    	}
    	if(options.queueEvents) {
    		Logger.deprecated('queueEvents', 'queueMessages');
    		options.queueMessages = options.queueEvents;
    	}

    	if(options.recover === true) {
    		Logger.deprecated('{recover: true}', '{recover: function(lastConnectionDetails, cb) { cb(true); }}');
    		options.recover = function(lastConnectionDetails, cb) { cb(true); };
    	}

    	if(typeof options.recover === 'function' && options.closeOnUnload === true) {
    		Logger.logAction(Logger.LOG_ERROR, 'Defaults.normaliseOptions', 'closeOnUnload was true and a session recovery function was set - these are mutually exclusive, so unsetting the latter');
    		options.recover = null;
    	}

    	if(!('closeOnUnload' in options)) {
    		/* Have closeOnUnload default to true unless we have any indication that
    		 * the user may want to recover the connection */
    		options.closeOnUnload = !options.recover;
    	}

    	if(options.transports && Utils.arrIn(options.transports, 'xhr')) {
    		Logger.deprecated('transports: ["xhr"]', 'transports: ["xhr_streaming"]');
    		Utils.arrDeleteValue(options.transports, 'xhr');
    		options.transports.push('xhr_streaming');
    	}

    	if(!('queueMessages' in options))
    		options.queueMessages = true;

    	var production = false;
    	if(options.restHost) {
    		options.realtimeHost = options.realtimeHost || options.restHost;
    	} else {
    		var environment = (options.environment && String(options.environment).toLowerCase()) || Defaults.ENVIRONMENT;
    		production = !environment || (environment === 'production');
    		options.restHost = production ? Defaults.REST_HOST : environment + '-' + Defaults.REST_HOST;
    		options.realtimeHost = production ? Defaults.REALTIME_HOST : environment + '-' + Defaults.REALTIME_HOST;
    	}
    	options.fallbackHosts = (production || options.fallbackHostsUseDefault) ? Defaults.FALLBACK_HOSTS : options.fallbackHosts;
    	Utils.arrForEach((options.fallbackHosts || []).concat(options.restHost, options.realtimeHost), checkHost);

    	options.port = options.port || Defaults.PORT;
    	options.tlsPort = options.tlsPort || Defaults.TLS_PORT;
    	options.maxMessageSize = options.maxMessageSize || Defaults.maxMessageSize;
    	if(!('tls' in options)) options.tls = true;

    	/* Allow values passed in options to override default timeouts */
    	options.timeouts = {};
    	for(var prop in Defaults.TIMEOUTS) {
    		options.timeouts[prop] = options[prop] || Defaults.TIMEOUTS[prop];
    	}
    	if('useBinaryProtocol' in options) {
    		options.useBinaryProtocol = Platform.supportsBinary && options.useBinaryProtocol;
    	} else {
    		options.useBinaryProtocol = Platform.preferBinary;
    	}

    	if(options.clientId) {
    		var headers = options.headers = options.headers || {};
    		headers['X-Ably-ClientId'] = BufferUtils.base64Encode(BufferUtils.utf8Encode(options.clientId));
    	}

    	if(!('idempotentRestPublishing' in options)) {
    		options.idempotentRestPublishing = false;
    	}

    	if(options.promises && !Platform.Promise) {
    		Logger.logAction(Logger.LOG_ERROR, 'Defaults.normaliseOptions', '{promises: true} was specified, but no Promise constructor found; disabling promises');
    		options.promises = false;
    	}

    	return options;
    };

    var EventEmitter = (function() {

    	/* public constructor */
    	function EventEmitter() {
    		this.any = [];
    		this.events = {};
    		this.anyOnce = [];
    		this.eventsOnce = {};
    	}

    	/* Call the listener, catch any exceptions and log, but continue operation*/
    	function callListener(eventThis, listener, args) {
    		try {
    			listener.apply(eventThis, args);
    		} catch(e) {
    			Logger.logAction(Logger.LOG_ERROR, 'EventEmitter.emit()', 'Unexpected listener exception: ' + e + '; stack = ' + (e && e.stack));
    		}
    	}

    	/**
    	 * Remove listeners that match listener
    	 * @param targetListeners is an array of listener arrays or event objects with arrays of listeners
    	 * @param listener the listener callback to remove
    	 * @param eventFilter (optional) event name instructing the function to only remove listeners for the specified event
    	 */
    	function removeListener(targetListeners, listener, eventFilter) {
    		var listeners, idx, eventName, targetListenersIndex;

    		for (targetListenersIndex = 0; targetListenersIndex < targetListeners.length; targetListenersIndex++) {
    			listeners = targetListeners[targetListenersIndex];
    			if (eventFilter) { listeners = listeners[eventFilter]; }

    			if (Utils.isArray(listeners)) {
    				while ((idx = Utils.arrIndexOf(listeners, listener)) !== -1) {
    					listeners.splice(idx, 1);
    				}
    				/* If events object has an event name key with no listeners then
    				   remove the key to stop the list growing indefinitely */
    				if (eventFilter && (listeners.length === 0)) {
    					delete targetListeners[targetListenersIndex][eventFilter];
    				}
    			} else if (Utils.isObject(listeners)) {
    				/* events */
    				for (eventName in listeners) {
    					if (listeners.hasOwnProperty(eventName) && Utils.isArray(listeners[eventName])) {
    						removeListener([listeners], listener, eventName);
    					}
    				}
    			}
    		}
    	}

    	/**
    	 * Add an event listener
    	 * @param event (optional) the name of the event to listen to
    	 *        if not supplied, all events trigger a call to the listener
    	 * @param listener the listener to be called
    	 */
    	EventEmitter.prototype.on = function(event, listener) {
    		if(arguments.length == 1 && typeof(event) == 'function') {
    			this.any.push(event);
    		} else if(Utils.isEmptyArg(event)) {
    			this.any.push(listener);
    		} else if(Utils.isArray(event)) {
    			var self = this;
    			Utils.arrForEach(event, function(ev) {
    				self.on(ev, listener);
    			});
    		} else {
    			var listeners = (this.events[event] || (this.events[event] = []));
    			listeners.push(listener);
    		}
    	};

    	/**
    	 * Remove one or more event listeners
    	 * @param event (optional) the name of the event whose listener
    	 *        is to be removed. If not supplied, the listener is
    	 *        treated as an 'any' listener
    	 * @param listener (optional) the listener to remove. If not
    	 *        supplied, all listeners are removed.
    	 */
    	EventEmitter.prototype.off = function(event, listener) {
    		if(arguments.length == 0 || (Utils.isEmptyArg(event) && Utils.isEmptyArg(listener))) {
    			this.any = [];
    			this.events = {};
    			this.anyOnce = [];
    			this.eventsOnce = {};
    			return;
    		}
    		if(arguments.length == 1) {
    			if(typeof(event) == 'function') {
    				/* we take this to be the listener and treat the event as "any" .. */
    				listener = event;
    				event = null;
    			}
    			/* ... or we take event to be the actual event name and listener to be all */
    		}

    		if(listener && Utils.isEmptyArg(event)) {
    			removeListener([this.any, this.events, this.anyOnce, this.eventsOnce], listener);
    			return;
    		}

    		if(Utils.isArray(event)) {
    			var self = this;
    			Utils.arrForEach(event, function(ev) {
    				self.off(ev, listener);
    			});
    		}

    		/* "normal" case where event is an actual event */
    		if(listener) {
    			removeListener([this.events, this.eventsOnce], listener, event);
    		} else {
    			delete this.events[event];
    			delete this.eventsOnce[event];
    		}
    	};

    	/**
    	 * Get the array of listeners for a given event; excludes once events
    	 * @param event (optional) the name of the event, or none for 'any'
    	 * @return array of events, or null if none
    	 */
    	EventEmitter.prototype.listeners = function(event) {
    		if(event) {
    			var listeners = (this.events[event] || []);
    			if(this.eventsOnce[event])
    				Array.prototype.push.apply(listeners, this.eventsOnce[event]);
    			return listeners.length ? listeners : null;
    		}
    		return this.any.length ? this.any : null;
    	};

    	/**
    	 * Emit an event
    	 * @param event the event name
    	 * @param args the arguments to pass to the listener
    	 */
    	EventEmitter.prototype.emit = function(event  /* , args... */) {
    		var args = Array.prototype.slice.call(arguments, 1);
    		var eventThis = {event:event};
    		var listeners = [];

    		if(this.anyOnce.length) {
    			Array.prototype.push.apply(listeners, this.anyOnce);
    			this.anyOnce = [];
    		}
    		if(this.any.length) {
    			Array.prototype.push.apply(listeners, this.any);
    		}
    		var eventsOnceListeners = this.eventsOnce[event];
    		if(eventsOnceListeners) {
    			Array.prototype.push.apply(listeners, eventsOnceListeners);
    			delete this.eventsOnce[event];
    		}
    		var eventsListeners = this.events[event];
    		if(eventsListeners) {
    			Array.prototype.push.apply(listeners, eventsListeners);
    		}

    		Utils.arrForEach(listeners, function(listener) {
    			callListener(eventThis, listener, args);
    		});
    	};

    	/**
    	 * Listen for a single occurrence of an event
    	 * @param event the name of the event to listen to
    	 * @param listener the listener to be called
    	 */
    	EventEmitter.prototype.once = function(event, listener) {
    		var argCount = arguments.length, self = this;
    		if((argCount === 0 || (argCount === 1 && typeof event !== 'function')) && Platform.Promise) {
    			return new Platform.Promise(function(resolve) {
    				self.once(event, resolve);
    			});
    		}
    		if(arguments.length == 1 && typeof(event) == 'function') {
    			this.anyOnce.push(event);
    		} else if(Utils.isEmptyArg(event)) {
    			this.anyOnce.push(listener);
    		} else if(Utils.isArray(event)){
    			throw("Arrays of events can only be used with on(), not once()");
    		} else {
    			var listeners = (this.eventsOnce[event] || (this.eventsOnce[event] = []));
    			listeners.push(listener);
    		}
    	};

    	/**
    	 * Private API
    	 *
    	 * Listen for a single occurrence of a state event and fire immediately if currentState matches targetState
    	 * @param targetState the name of the state event to listen to
    	 * @param currentState the name of the current state of this object
    	 * @param listener the listener to be called
    	 */
    	EventEmitter.prototype.whenState = function(targetState, currentState, listener /* ...listenerArgs */) {
    		var eventThis = {event:targetState},
    			self = this,
    			listenerArgs = Array.prototype.slice.call(arguments, 3);

    		if((typeof(targetState) !== 'string') || (typeof(currentState) !== 'string')) {
    			throw("whenState requires a valid event String argument");
    		}
    		if(typeof listener !== 'function' && Platform.Promise) {
    			return new Platform.Promise(function(resolve) {
    				self.whenState.bind(self, targetState, currentState, resolve).apply(self, listenerArgs);
    			});
    		}
    		if(targetState === currentState) {
    			callListener(eventThis, listener, listenerArgs);
    		} else {
    			this.once(targetState, listener);
    		}
    	};

    	return EventEmitter;
    })();

    var Logger = (function() {
    	var consoleLogger, errorLogger;

    	/* Can't just check for console && console.log; fails in IE <=9 */
    	if((typeof Window === 'undefined' && typeof WorkerGlobalScope === 'undefined') /* node */ ||
    		 (global.console && global.console.log && (typeof global.console.log.apply === 'function')) /* sensible browsers */) {
    		consoleLogger = function() { console.log.apply(console, arguments); };
    		errorLogger = console.warn ? function() { console.warn.apply(console, arguments); } : consoleLogger;
    	} else if(global.console && global.console.log) {
    		/* IE <= 9 with the console open -- console.log does not
    		 * inherit from Function, so has no apply method */
    		consoleLogger = errorLogger = function() { Function.prototype.apply.call(console.log, console, arguments); };
    	} else {
    		/* IE <= 9 when dev tools are closed - window.console not even defined */
    		consoleLogger = errorLogger = function() {};
    	}

    	function pad(str, three) {
    		return ('000' + str).slice(-2-(three || 0));
    	}

    	var LOG_NONE  = 0,
    	LOG_ERROR = 1,
    	LOG_MAJOR = 2,
    	LOG_MINOR = 3,
    	LOG_MICRO = 4;

    	var LOG_DEFAULT = LOG_ERROR,
    	LOG_DEBUG   = LOG_MICRO;

    	var logLevel = LOG_DEFAULT;

    	function getHandler(logger) {
    		return function(msg) {
    				var time = new Date();
    				logger(pad(time.getHours()) + ':' + pad(time.getMinutes()) + ':' + pad(time.getSeconds()) + '.' + pad(time.getMilliseconds(), true) + ' ' + msg);
    			};
    	}

    	var logHandler = getHandler(consoleLogger),
    		logErrorHandler = getHandler(errorLogger);

    	/* public constructor */
    	function Logger(args) {}

    	/* public constants */
    	Logger.LOG_NONE    = LOG_NONE,
    	Logger.LOG_ERROR   = LOG_ERROR,
    	Logger.LOG_MAJOR   = LOG_MAJOR,
    	Logger.LOG_MINOR   = LOG_MINOR,
    	Logger.LOG_MICRO   = LOG_MICRO;

    	Logger.LOG_DEFAULT = LOG_DEFAULT,
    	Logger.LOG_DEBUG   = LOG_DEBUG;

    	/* public static functions */
    	Logger.logAction = function(level, action, message) {
    		if (Logger.shouldLog(level)) {
    			(level === LOG_ERROR ? logErrorHandler : logHandler)('Ably: ' + action + ': ' + message);
    		}
    	};

    	Logger.deprecated = function(original, replacement) {
    		if (Logger.shouldLog(LOG_ERROR)) {
    			logErrorHandler("Ably: Deprecation warning - '" + original + "' is deprecated and will be removed from a future version. Please use '" + replacement + "' instead.");
    		}
    	};

    	/* Where a logging operation is expensive, such as serialisation of data, use shouldLog will prevent
    	   the object being serialised if the log level will not output the message */
    	Logger.shouldLog = function(level) {
    		return level <= logLevel;
    	};

    	Logger.setLog = function(level, handler) {
    		if(level !== undefined) logLevel = level;
    		if(handler !== undefined) logHandler = logErrorHandler = handler;
    	};

    	return Logger;
    })();

    var Multicaster = (function() {

    	function Multicaster(members) {
    		members = members || [];

    		var handler = function() {
    			for(var i = 0; i < members.length; i++) {
    				var member = members[i];
    				if(member) {
    					try {
    						member.apply(null, arguments);
    					} catch(e){
    						Logger.logAction(Logger.LOG_ERROR, 'Multicaster multiple callback handler', 'Unexpected exception: ' + e + '; stack = ' + e.stack);
    					}
    				}
    			}
    		};

    		handler.push = function() {
    			Array.prototype.push.apply(members, arguments);
    		};
    		return handler;
    	}

    	return Multicaster;
    })();

    var ErrorReporter = (function() {
    	function ErrorReporter() {}

    	var levels = ErrorReporter.levels = [
    		'fatal',
    		'error',
    		'warning',
    		'info',
    		'debug'
    	];

    	/* (level: typeof ErrorReporter.levels[number], message: string, fingerprint?: string, tags?: {[key: string]: string}): void */
    	ErrorReporter.report = function(level, message, fingerprint, tags) {
    		var eventId = Utils.randomHexString(16);

    		var event = {
    			event_id: eventId,
    			tags: Utils.mixin({
    				lib: Platform.libver
    			}, tags),
    			platform: 'javascript',
    			level: level,
    			release: Defaults.version,
    			fingerprint: fingerprint && [ fingerprint ],
    			message: message,
    			request: {
    				headers: {
    					'User-Agent': Platform.userAgent
    				},
    				url: Platform.currentUrl
    			}
    		};

    		Logger.logAction(Logger.LOG_MICRO, 'ErrorReporter', 'POSTing to error reporter: ' + message);
    		Http.postUri(null, Defaults.errorReportingUrl, Defaults.errorReportingHeaders, JSON.stringify(event), {}, function(err, res) {
    			Logger.logAction(Logger.LOG_MICRO, 'ErrorReporter', 'POSTing to error reporter resulted in: ' +
    				(err ? Utils.inspectError(err) : Utils.inspectBody(res))
    			);
    		});
    	};

    	return ErrorReporter;
    })();

    var ErrorInfo = (function() {

    	function ErrorInfo(message, code, statusCode, cause) {
    		this.message = message;
    		this.code = code;
    		this.statusCode = statusCode;
    		this.cause = cause;
    		this.href = undefined;
    	}

    	ErrorInfo.prototype.toString = function() {
    		var result = '[' + this.constructor.name;
    		if(this.message) result += ': ' + this.message;
    		if(this.statusCode) result += '; statusCode=' + this.statusCode;
    		if(this.code) result += '; code=' + this.code;
    		if(this.cause) result += '; cause=' + Utils.inspectError(this.cause);
    		if(this.href && !(this.message && this.message.indexOf('help.ably.io') > -1)) result += '; see ' + this.href + ' ';
    		result += ']';
    		return result;
    	};

    	ErrorInfo.fromValues = function(values) {
    		var result = Utils.mixin(new ErrorInfo(), values);
    		if (values instanceof Error) {
    			/* Error.message is not enumerable, so mixin loses the message */
    			result.message = values.message;
    		}
    		if(result.code && !result.href) {
    			result.href = 'https://help.ably.io/error/' + result.code;
    		}
    		return result;
    	};

    	return ErrorInfo;
    })();

    var Message = (function() {

    	function Message() {
    		this.name = undefined;
    		this.id = undefined;
    		this.timestamp = undefined;
    		this.clientId = undefined;
    		this.connectionId = undefined;
    		this.connectionKey = undefined;
    		this.data = undefined;
    		this.encoding = undefined;
    		this.extras = undefined;
    		this.size = undefined;
    	}

    	/**
    	 * Overload toJSON() to intercept JSON.stringify()
    	 * @return {*}
    	 */
    	Message.prototype.toJSON = function() {
    		var result = {
    			name: this.name,
    			id: this.id,
    			clientId: this.clientId,
    			connectionId: this.connectionId,
    			connectionKey: this.connectionKey,
    			encoding: this.encoding,
    			extras: this.extras
    		};

    		/* encode data to base64 if present and we're returning real JSON;
    		 * although msgpack calls toJSON(), we know it is a stringify()
    		 * call if it has a non-empty arguments list */
    		var data = this.data;
    		if(data && BufferUtils.isBuffer(data)) {
    			if(arguments.length > 0) {
    				/* stringify call */
    				var encoding = this.encoding;
    				result.encoding = encoding ? (encoding + '/base64') : 'base64';
    				data = BufferUtils.base64Encode(data);
    			} else {
    				/* Called by msgpack. toBuffer returns a datatype understandable by
    				 * that platform's msgpack implementation (Buffer in node, Uint8Array
    				 * in browsers) */
    				data = BufferUtils.toBuffer(data);
    			}
    		}
    		result.data = data;
    		return result;
    	};

    	Message.prototype.toString = function() {
    		var result = '[Message';
    		if(this.name)
    			result += '; name=' + this.name;
    		if(this.id)
    			result += '; id=' + this.id;
    		if(this.timestamp)
    			result += '; timestamp=' + this.timestamp;
    		if(this.clientId)
    			result += '; clientId=' + this.clientId;
    		if(this.connectionId)
    			result += '; connectionId=' + this.connectionId;
    		if(this.encoding)
    			result += '; encoding=' + this.encoding;
    		if(this.extras)
    			result += '; extras =' + JSON.stringify(this.extras);
    		if(this.data) {
    			if (typeof(this.data) == 'string')
    				result += '; data=' + this.data;
    			else if (BufferUtils.isBuffer(this.data))
    				result += '; data (buffer)=' + BufferUtils.base64Encode(this.data);
    			else
    				result += '; data (json)=' + JSON.stringify(this.data);
    		}
    		if(this.extras)
    			result += '; extras=' + JSON.stringify(this.extras);
    		result += ']';
    		return result;
    	};

    	Message.encrypt = function(msg, options, callback) {
    		var data = msg.data,
    			encoding = msg.encoding,
    			cipher = options.channelCipher;

    		encoding = encoding ? (encoding + '/') : '';
    		if(!BufferUtils.isBuffer(data)) {
    			data = BufferUtils.utf8Encode(String(data));
    			encoding = encoding + 'utf-8/';
    		}
    		cipher.encrypt(data, function(err, data) {
    			if (err) {
    				callback(err);
    				return;
    			}
    			msg.data = data;
    			msg.encoding = encoding + 'cipher+' + cipher.algorithm;
    			callback(null, msg);
    		});
    	};

    	Message.encode = function(msg, options, callback) {
    		var data = msg.data, encoding,
    			nativeDataType = typeof(data) == 'string' || BufferUtils.isBuffer(data) || data === null || data === undefined;

    		if (!nativeDataType) {
    			if (Utils.isObject(data) || Utils.isArray(data)) {
    				msg.data = JSON.stringify(data);
    				msg.encoding = (encoding = msg.encoding) ? (encoding + '/json') : 'json';
    			} else {
    				throw new ErrorInfo('Data type is unsupported', 40013, 400);
    			}
    		}

    		if(options != null && options.cipher) {
    			Message.encrypt(msg, options, callback);
    		} else {
    			callback(null, msg);
    		}
    	};

    	Message.encodeArray = function(messages, options, callback) {
    		var processed = 0;
    		for (var i = 0; i < messages.length; i++) {
    			Message.encode(messages[i], options, function(err, msg) {
    				if (err) {
    					callback(err);
    					return;
    				}
    				processed++;
    				if (processed == messages.length) {
    					callback(null, messages);
    				}
    			});
    		}
    	};

    	Message.serialize = Utils.encodeBody;

    	Message.decode = function(message, options) {
    		var encoding = message.encoding;
    		if(encoding) {
    			var xforms = encoding.split('/'),
    				i, j = xforms.length,
    				data = message.data;

    			try {
    				while((i = j) > 0) {
    					var match = xforms[--j].match(/([\-\w]+)(\+([\w\-]+))?/);
    					if(!match) break;
    					var xform = match[1];
    					switch(xform) {
    						case 'base64':
    							data = BufferUtils.base64Decode(String(data));
    							continue;
    						case 'utf-8':
    							data = BufferUtils.utf8Decode(data);
    							continue;
    						case 'json':
    							data = JSON.parse(data);
    							continue;
    						case 'cipher':
    							if(options != null && options.cipher) {
    								var xformAlgorithm = match[3], cipher = options.channelCipher;
    								/* don't attempt to decrypt unless the cipher params are compatible */
    								if(xformAlgorithm != cipher.algorithm) {
    									throw new Error('Unable to decrypt message with given cipher; incompatible cipher params');
    								}
    								data = cipher.decrypt(data);
    								continue;
    							} else {
    								throw new Error('Unable to decrypt message; not an encrypted channel');
    							}
    						default:
    							throw new Error("Unknown encoding");
    					}
    					break;
    				}
    			} catch(e) {
    				throw new ErrorInfo('Error processing the ' + xform + ' encoding, decoder returned ‘' + e.message + '’', 40013, 400);
    			} finally {
    				message.encoding = (i <= 0) ? null : xforms.slice(0, i).join('/');
    				message.data = data;
    			}
    		}
    	};

    	Message.fromResponseBody = function(body, options, format) {
    		if(format) {
    			body = Utils.decodeBody(body, format);
    		}

    		for(var i = 0; i < body.length; i++) {
    			var msg = body[i] = Message.fromValues(body[i]);
    			try {
    				Message.decode(msg, options);
    			} catch (e) {
    				Logger.logAction(Logger.LOG_ERROR, 'Message.fromResponseBody()', e.toString());
    			}
    		}
    		return body;
    	};

    	Message.fromValues = function(values) {
    		return Utils.mixin(new Message(), values);
    	};

    	Message.fromValuesArray = function(values) {
    		var count = values.length, result = new Array(count);
    		for(var i = 0; i < count; i++) result[i] = Message.fromValues(values[i]);
    		return result;
    	};

    	function normalizeCipherOptions(options) {
    		if(options && options.cipher && !options.cipher.channelCipher) {
    			if(!Crypto) throw new Error('Encryption not enabled; use ably.encryption.js instead');
    			var cipher = Crypto.getCipher(options.cipher);
    			options.cipher = cipher.cipherParams;
    			options.channelCipher = cipher.cipher;
    		}
    	}

    	Message.fromEncoded = function(encoded, options) {
    		var msg = Message.fromValues(encoded);
    		normalizeCipherOptions(options);
    		/* if decoding fails at any point, catch and return the message decoded to
    		 * the fullest extent possible */
    		try {
    			Message.decode(msg, options);
    		} catch(e) {
    			Logger.logAction(Logger.LOG_ERROR, 'Message.fromEncoded()', e.toString());
    		}
    		return msg;
    	};

    	Message.fromEncodedArray = function(encodedArray, options) {
    		normalizeCipherOptions(options);
    		return Utils.arrMap(encodedArray, function(encoded) {
    			return Message.fromEncoded(encoded, options);
    		});
    	};

    	function getMessageSize(msg) {
    		var size = 0;
    		if(msg.name) {
    			size += msg.name.length;
    		}
    		if(msg.clientId) {
    			size += msg.clientId.length;
    		}
    		if(msg.extras) {
    			size += JSON.stringify(msg.extras).length;
    		}
    		if(msg.data) {
    			size += Utils.dataSizeBytes(msg.data);
    		}
    		return size;
    	}
    	/* This should be called on encode()d (and encrypt()d) Messages (as it
    	 * assumes the data is a string or buffer) */
    	Message.getMessagesSize = function(messages) {
    		var msg, total = 0;
    		for(var i=0; i<messages.length; i++) {
    			msg = messages[i];
    			total += (msg.size || (msg.size = getMessageSize(msg)));
    		}
    		return total;
    	};

    	return Message;
    })();

    var PresenceMessage = (function() {

    	function toActionValue(actionString) {
    		return Utils.arrIndexOf(PresenceMessage.Actions, actionString)
    	}

    	function PresenceMessage() {
    		this.action = undefined;
    		this.id = undefined;
    		this.timestamp = undefined;
    		this.clientId = undefined;
    		this.connectionId = undefined;
    		this.data = undefined;
    		this.encoding = undefined;
    		this.size = undefined;
    	}

    	PresenceMessage.Actions = [
    		'absent',
    		'present',
    		'enter',
    		'leave',
    		'update'
    	];

    	/* Returns whether this presenceMessage is synthesized, i.e. was not actually
    	 * sent by the connection (usually means a leave event sent 15s after a
    	 * disconnection). This is useful because synthesized messages cannot be
    	 * compared for newness by id lexicographically - RTP2b1
    	 */
    	PresenceMessage.prototype.isSynthesized = function() {
    		return this.id.substring(this.connectionId.length, 0) !== this.connectionId;
    	};

    	/* RTP2b2 */
    	PresenceMessage.prototype.parseId = function() {
    		var parts = this.id.split(':');
    		return {
    			connectionId: parts[0],
    			msgSerial: parseInt(parts[1], 10),
    			index: parseInt(parts[2], 10)
    		};
    	};

    	/**
    	 * Overload toJSON() to intercept JSON.stringify()
    	 * @return {*}
    	 */
    	PresenceMessage.prototype.toJSON = function() {
    		var result = {
    			clientId: this.clientId,
    			/* Convert presence action back to an int for sending to Ably */
    			action: toActionValue(this.action),
    			encoding: this.encoding
    		};

    		/* encode data to base64 if present and we're returning real JSON;
    		 * although msgpack calls toJSON(), we know it is a stringify()
    		 * call if it has a non-empty arguments list */
    		var data = this.data;
    		if(data && BufferUtils.isBuffer(data)) {
    			if(arguments.length > 0) {
    				/* stringify call */
    				var encoding = this.encoding;
    				result.encoding = encoding ? (encoding + '/base64') : 'base64';
    				data = BufferUtils.base64Encode(data);
    			} else {
    				/* Called by msgpack. toBuffer returns a datatype understandable by
    				 * that platform's msgpack implementation (Buffer in node, Uint8Array
    				 * in browsers) */
    				data = BufferUtils.toBuffer(data);
    			}
    		}
    		result.data = data;
    		return result;
    	};

    	PresenceMessage.prototype.toString = function() {
    		var result = '[PresenceMessage';
    		result += '; action=' + this.action;
    		if(this.id)
    			result += '; id=' + this.id;
    		if(this.timestamp)
    			result += '; timestamp=' + this.timestamp;
    		if(this.clientId)
    			result += '; clientId=' + this.clientId;
    		if(this.connectionId)
    			result += '; connectionId=' + this.connectionId;
    		if(this.encoding)
    			result += '; encoding=' + this.encoding;
    		if(this.data) {
    			if (typeof(this.data) == 'string')
    				result += '; data=' + this.data;
    			else if (BufferUtils.isBuffer(this.data))
    				result += '; data (buffer)=' + BufferUtils.base64Encode(this.data);
    			else
    				result += '; data (json)=' + JSON.stringify(this.data);
    		}
    		result += ']';
    		return result;
    	};
    	PresenceMessage.encode = Message.encode;
    	PresenceMessage.decode = Message.decode;

    	PresenceMessage.fromResponseBody = function(body, options, format) {
    		if(format) {
    			body = Utils.decodeBody(body, format);
    		}

    		for(var i = 0; i < body.length; i++) {
    			var msg = body[i] = PresenceMessage.fromValues(body[i], true);
    			try {
    				PresenceMessage.decode(msg, options);
    			} catch (e) {
    				Logger.logAction(Logger.LOG_ERROR, 'PresenceMessage.fromResponseBody()', e.toString());
    			}
    		}
    		return body;
    	};

    	/* Creates a PresenceMessage from specified values, with a string presence action */
    	PresenceMessage.fromValues = function(values, stringifyAction) {
    		if(stringifyAction) {
    			values.action = PresenceMessage.Actions[values.action];
    		}
    		return Utils.mixin(new PresenceMessage(), values);
    	};

    	PresenceMessage.fromValuesArray = function(values) {
    		var count = values.length, result = new Array(count);
    		for(var i = 0; i < count; i++) result[i] = PresenceMessage.fromValues(values[i]);
    		return result;
    	};

    	PresenceMessage.fromEncoded = function(encoded, options) {
    		var msg = PresenceMessage.fromValues(encoded, true);
    		/* if decoding fails at any point, catch and return the message decoded to
    		 * the fullest extent possible */
    		try {
    			PresenceMessage.decode(msg, options);
    		} catch(e) {
    			Logger.logAction(Logger.LOG_ERROR, 'PresenceMessage.fromEncoded()', e.toString());
    		}
    		return msg;
    	};

    	PresenceMessage.fromEncodedArray = function(encodedArray, options) {
    		return Utils.arrMap(encodedArray, function(encoded) {
    			return PresenceMessage.fromEncoded(encoded, options);
    		});
    	};

    	PresenceMessage.getMessagesSize = Message.getMessagesSize;

    	return PresenceMessage;
    })();

    var ProtocolMessage = (function() {

    	function ProtocolMessage() {
    		this.action = undefined;
    		this.flags = undefined;
    		this.id = undefined;
    		this.timestamp = undefined;
    		this.count = undefined;
    		this.error = undefined;
    		this.connectionId = undefined;
    		this.connectionKey = undefined;
    		this.connectionSerial = undefined;
    		this.channel = undefined;
    		this.channelSerial = undefined;
    		this.msgSerial = undefined;
    		this.messages = undefined;
    		this.presence = undefined;
    		this.auth = undefined;
    	}

    	var actions = ProtocolMessage.Action = {
    		'HEARTBEAT' : 0,
    		'ACK' : 1,
    		'NACK' : 2,
    		'CONNECT' : 3,
    		'CONNECTED' : 4,
    		'DISCONNECT' : 5,
    		'DISCONNECTED' : 6,
    		'CLOSE' : 7,
    		'CLOSED' : 8,
    		'ERROR' : 9,
    		'ATTACH' : 10,
    		'ATTACHED' : 11,
    		'DETACH' : 12,
    		'DETACHED' : 13,
    		'PRESENCE' : 14,
    		'MESSAGE' : 15,
    		'SYNC' : 16,
    		'AUTH' : 17
    	};

    	ProtocolMessage.ActionName = [];
    	Utils.arrForEach(Utils.keysArray(ProtocolMessage.Action, true), function(name) {
    		ProtocolMessage.ActionName[actions[name]] = name;
    	});

    	var flags = {
    		/* Channel attach state flags */
    		'HAS_PRESENCE':       1 << 0,
    		'HAS_BACKLOG':        1 << 1,
    		'RESUMED':            1 << 2,
    		'TRANSIENT':          1 << 4,
    		/* Channel mode flags */
    		'PRESENCE':           1 << 16,
    		'PUBLISH':            1 << 17,
    		'SUBSCRIBE':          1 << 18,
    		'PRESENCE_SUBSCRIBE': 1 << 19
    	};
    	var flagNames = Utils.keysArray(flags);
    	flags.MODE_ALL = flags.PRESENCE | flags.PUBLISH | flags.SUBSCRIBE | flags.PRESENCE_SUBSCRIBE;

    	ProtocolMessage.prototype.hasFlag = function(flag) {
    		return ((this.flags & flags[flag]) > 0);
    	};

    	ProtocolMessage.prototype.setFlag = function(flag) {
    		return this.flags = this.flags | flags[flag];
    	};

    	ProtocolMessage.prototype.getMode = function() {
    		return this.flags && (this.flags & flags.MODE_ALL);
    	};

    	ProtocolMessage.serialize = Utils.encodeBody;

    	ProtocolMessage.deserialize = function(serialized, format) {
    		var deserialized = Utils.decodeBody(serialized, format);
    		return ProtocolMessage.fromDeserialized(deserialized);
    	};

    	ProtocolMessage.fromDeserialized = function(deserialized) {
    		var error = deserialized.error;
    		if(error) deserialized.error = ErrorInfo.fromValues(error);
    		var messages = deserialized.messages;
    		if(messages) for(var i = 0; i < messages.length; i++) messages[i] = Message.fromValues(messages[i]);
    		var presence = deserialized.presence;
    		if(presence) for(var i = 0; i < presence.length; i++) presence[i] = PresenceMessage.fromValues(presence[i], true);
    		return Utils.mixin(new ProtocolMessage(), deserialized);
    	};

    	ProtocolMessage.fromValues = function(values) {
    		return Utils.mixin(new ProtocolMessage(), values);
    	};

    	function toStringArray(array) {
    		var result = [];
    		if (array) {
    			for (var i = 0; i < array.length; i++) {
    				result.push(array[i].toString());
    			}
    		}
    		return '[ ' + result.join(', ') + ' ]';
    	}

    	var simpleAttributes = 'id channel channelSerial connectionId connectionKey connectionSerial count msgSerial timestamp'.split(' ');

    	ProtocolMessage.stringify = function(msg) {
    		var result = '[ProtocolMessage';
    		if(msg.action !== undefined)
    			result += '; action=' + ProtocolMessage.ActionName[msg.action] || msg.action;

    		var attribute;
    		for (var attribIndex = 0; attribIndex < simpleAttributes.length; attribIndex++) {
    			attribute = simpleAttributes[attribIndex];
    			if(msg[attribute] !== undefined)
    				result += '; ' + attribute + '=' + msg[attribute];
    		}

    		if(msg.messages)
    			result += '; messages=' + toStringArray(Message.fromValuesArray(msg.messages));
    		if(msg.presence)
    			result += '; presence=' + toStringArray(PresenceMessage.fromValuesArray(msg.presence));
    		if(msg.error)
    			result += '; error=' + ErrorInfo.fromValues(msg.error).toString();
    		if(msg.auth && msg.auth.accessToken)
    			result += '; token=' + msg.auth.accessToken;
    		if(msg.flags)
    			result += '; flags=' + Utils.arrFilter(flagNames, function(flag) {
    				return msg.hasFlag(flag);
    			}).join(',');

    		result += ']';
    		return result;
    	};

    	/* Only valid for channel messages */
    	ProtocolMessage.isDuplicate = function(a, b) {
    		return a && b &&
    			(a.action === actions.MESSAGE || a.action === actions.PRESENCE) &&
    			(a.action === b.action) &&
    			(a.channel === b.channel) &&
    			(a.id === b.id);
    	};

    	return ProtocolMessage;
    })();

    var Stats = (function() {

    	function MessageCount(values) {
    		this.count = (values && values.count) || 0;
    		this.data = (values && values.data) || 0;
    		this.uncompressedData = (values && values.uncompressedData) || 0;
    		this.failed = (values && values.failed) || 0;
    		this.refused = (values && values.refused) || 0;
    	}

    	function MessageCategory(values) {
    		MessageCount.call(this, values);
    		this.category = undefined;
    		if (values && values.category) {
    			this.category = { };
    			for (var key in values.category) {
    				var value = values.category[key];
    				if (Object.prototype.hasOwnProperty.call(values.category, key) && value) {
    					this.category[key] = new MessageCount(value);
    				}
    			}
    		}
    	}

    	function ResourceCount(values) {
    		this.peak = (values && values.peak) || 0;
    		this.min = (values && values.min) || 0;
    		this.mean = (values && values.mean) || 0;
    		this.opened = (values && values.opened) || 0;
    		this.refused = (values && values.refused) || 0;
    	}

    	function RequestCount(values) {
    		this.succeeded = (values && values.succeeded) || 0;
    		this.failed = (values && values.failed) || 0;
    		this.refused = (values && values.refused) || 0;
    	}

    	function ConnectionTypes(values) {
    		this.plain = new ResourceCount(values && values.plain);
    		this.tls = new ResourceCount(values && values.tls);
    		this.all = new ResourceCount(values && values.all);
    	}

    	function MessageTypes(values) {
    		this.messages = new MessageCategory(values && values.messages);
    		this.presence = new MessageCategory(values && values.presence);
    		this.all = new MessageCategory(values && values.all);
    	}

    	function MessageTraffic(values) {
    		this.realtime = new MessageTypes(values && values.realtime);
    		this.rest = new MessageTypes(values && values.rest);
    		this.webhook = new MessageTypes(values && values.webhook);
    		this.sharedQueue = new MessageTypes(values && values.sharedQueue);
    		this.externalQueue = new MessageTypes(values && values.externalQueue);
    		this.httpEvent = new MessageTypes(values && values.httpEvent);
    		this.push = new MessageTypes(values && values.push);
    		this.all = new MessageTypes(values && values.all);
    	}

    	function MessageDirections(values) {
    		this.all           = new MessageTypes(values && values.all);
    		this.inbound       = new MessageTraffic(values && values.inbound);
    		this.outbound      = new MessageTraffic(values && values.outbound);
    	}

    	function XchgMessages(values) {
    		this.all           = new MessageTypes(values && values.all);
    		this.producerPaid  = new MessageDirections(values && values.producerPaid);
    		this.consumerPaid  = new MessageDirections(values && values.consumerPaid);
    	}

    	function PushStats(values) {
    		this.messages = (values && values.messages) || 0;
    		var notifications = values && values.notifications;
    		this.notifications = {
    			invalid: notifications && notifications.invalid || 0,
    			attempted: notifications && notifications.attempted || 0,
    			successful: notifications && notifications.successful || 0,
    			failed: notifications && notifications.failed || 0
    		};
    		this.directPublishes = (values && values.directPublishes) || 0;
    	}

    	function ProcessedCount(values) {
    		this.succeeded = (values && values.succeeded) || 0;
    		this.skipped = (values && values.skipped) || 0;
    		this.failed = (values && values.failed) || 0;
    	}

    	function ProcessedMessages(values) {
    		this.delta = undefined;
    		if (values && values.delta) {
    			this.delta = { };
    			for (var key in values.delta) {
    				var value = values.delta[key];
    				if (Object.prototype.hasOwnProperty.call(values.delta, key) && value) {
    					this.delta[key] = new ProcessedCount(value);
    				}
    			}
    		}
    	}

    	function Stats(values) {
    		MessageDirections.call(this, values);
    		this.persisted     = new MessageTypes(values && values.persisted);
    		this.connections   = new ConnectionTypes(values && values.connections);
    		this.channels      = new ResourceCount(values && values.channels);
    		this.apiRequests   = new RequestCount(values && values.apiRequests);
    		this.tokenRequests = new RequestCount(values && values.tokenRequests);
    		this.xchgProducer  = new XchgMessages(values && values.xchgProducer);
    		this.xchgConsumer  = new XchgMessages(values && values.xchgConsumer);
    		this.push          = new PushStats(values && values.pushStats);
    		this.processed     = new ProcessedMessages(values && values.processed);
    		this.inProgress    = (values && values.inProgress) || undefined;
    		this.unit          = (values && values.unit) || undefined;
    		this.intervalId    = (values && values.intervalId) || undefined;
    	}

    	Stats.fromValues = function(values) {
    		return new Stats(values);
    	};

    	return Stats;
    })();

    var DeviceDetails = (function() {

    	function DeviceDetails() {
    		this.id = undefined;
    		this.deviceSecret = undefined;
    		this.platform = undefined;
    		this.formFactor = undefined;
    		this.clientId = undefined;
    		this.metadata = undefined;
    		this.deviceIdentityToken = undefined;
    		this.push = {
    			recipient: undefined,
    			state: undefined,
    			errorReason: undefined
    		};
    	}

    	/**
    	 * Overload toJSON() to intercept JSON.stringify()
    	 * @return {*}
    	 */
    	DeviceDetails.prototype.toJSON = function() {
    		return {
    			id: this.id,
    			deviceSecret: this.deviceSecret,
    			platform: this.platform,
    			formFactor: this.formFactor,
    			clientId: this.clientId,
    			metadata: this.metadata,
    			deviceIdentityToken: this.deviceIdentityToken,
    			push: {
    				recipient: this.push.recipient,
    				state: this.push.state,
    				errorReason: this.push.errorReason
    			}
    		};
    	};

    	DeviceDetails.prototype.toString = function() {
    		var result = '[DeviceDetails';
    		if(this.id)
    			result += '; id=' + this.id;
    		if(this.platform)
    			result += '; platform=' + this.platform;
    		if(this.formFactor)
    			result += '; formFactor=' + this.formFactor;
    		if(this.clientId)
    			result += '; clientId=' + this.clientId;
    		if(this.metadata)
    			result += '; metadata=' + this.metadata;
    		if(this.deviceIdentityToken)
    			result += '; deviceIdentityToken=' + JSON.stringify(this.deviceIdentityToken);
    		if(this.push.recipient)
    			result += '; push.recipient=' + JSON.stringify(this.push.recipient);
    		if(this.push.state)
    			result += '; push.state=' + this.push.state;
    		if(this.push.errorReason)
    			result += '; push.errorReason=' + this.push.errorReason;
    		if(this.push.metadata)
    			result += '; push.metadata=' + this.push.metadata;
    		result += ']';
    		return result;
    	};

    	DeviceDetails.toRequestBody = Utils.encodeBody;

    	DeviceDetails.fromResponseBody = function(body, format) {
    		if(format) {
    			body = Utils.decodeBody(body, format);
    		}

    		if(Utils.isArray(body)) {
    			return DeviceDetails.fromValuesArray(body);
    		} else {
    			return DeviceDetails.fromValues(body);
    		}
    	};

    	DeviceDetails.fromValues = function(values) {
    		return Utils.mixin(new DeviceDetails(), values);
    	};

    	DeviceDetails.fromValuesArray = function(values) {
    		var count = values.length, result = new Array(count);
    		for(var i = 0; i < count; i++) result[i] = DeviceDetails.fromValues(values[i]);
    		return result;
    	};

    	return DeviceDetails;
    })();

    var PushChannelSubscription = (function() {

    	function PushChannelSubscription() {
    		this.channel = undefined;
    		this.deviceId = undefined;
    		this.clientId = undefined;
    	}

    	/**
    	 * Overload toJSON() to intercept JSON.stringify()
    	 * @return {*}
    	 */
    	PushChannelSubscription.prototype.toJSON = function() {
    		return {
    			channel: this.channel,
    			deviceId: this.deviceId,
    			clientId: this.clientId
    		};
    	};

    	PushChannelSubscription.prototype.toString = function() {
    		var result = '[PushChannelSubscription';
    		if(this.channel)
    			result += '; channel=' + this.channel;
    		if(this.deviceId)
    			result += '; deviceId=' + this.deviceId;
    		if(this.clientId)
    			result += '; clientId=' + this.clientId;
    		result += ']';
    		return result;
    	};

    	PushChannelSubscription.toRequestBody = Utils.encodeBody;

    	PushChannelSubscription.fromResponseBody = function(body, format) {
    		if(format) {
    			body = Utils.decodeBody(body, format);
    		}

    		if(Utils.isArray(body)) {
    			return PushChannelSubscription.fromValuesArray(body);
    		} else {
    			return PushChannelSubscription.fromValues(body);
    		}
    	};

    	PushChannelSubscription.fromValues = function(values) {
    		return Utils.mixin(new PushChannelSubscription(), values);
    	};

    	PushChannelSubscription.fromValuesArray = function(values) {
    		var count = values.length, result = new Array(count);
    		for(var i = 0; i < count; i++) result[i] = PushChannelSubscription.fromValues(values[i]);
    		return result;
    	};

    	return PushChannelSubscription;
    })();

    var ConnectionError = {
    	disconnected: ErrorInfo.fromValues({
    		statusCode: 400,
    		code: 80003,
    		message: 'Connection to server temporarily unavailable'
    	}),
    	suspended: ErrorInfo.fromValues({
    		statusCode: 400,
    		code: 80002,
    		message: 'Connection to server unavailable'
    	}),
    	failed: ErrorInfo.fromValues({
    		statusCode: 400,
    		code: 80000,
    		message: 'Connection failed or disconnected by server'
    	}),
    	closing: ErrorInfo.fromValues({
    		statusCode: 400,
    		code: 80017,
    		message: 'Connection closing'
    	}),
    	closed: ErrorInfo.fromValues({
    		statusCode: 400,
    		code: 80017,
    		message: 'Connection closed'
    	}),
    	unknownConnectionErr: ErrorInfo.fromValues({
    		statusCode: 500,
    		code: 50002,
    		message: 'Internal connection error'
    	}),
    	unknownChannelErr: ErrorInfo.fromValues({
    		statusCode: 500,
    		code: 50001,
    		message: 'Internal channel error'
    	})
    };

    var MessageQueue = (function() {
    	function MessageQueue() {
    		EventEmitter.call(this);
    		this.messages = [];
    	}
    	Utils.inherits(MessageQueue, EventEmitter);

    	MessageQueue.prototype.count = function() {
    		return this.messages.length;
    	};

    	MessageQueue.prototype.push = function(message) {
    		this.messages.push(message);
    	};

    	MessageQueue.prototype.shift = function() {
    		return this.messages.shift();
    	};

    	MessageQueue.prototype.last = function() {
    		return this.messages[this.messages.length - 1];
    	};

    	MessageQueue.prototype.copyAll = function() {
    		return this.messages.slice();
    	};

    	MessageQueue.prototype.append = function(messages) {
    		this.messages.push.apply(this.messages, messages);
    	};

    	MessageQueue.prototype.prepend = function(messages) {
    		this.messages.unshift.apply(this.messages, messages);
    	};

    	MessageQueue.prototype.completeMessages = function(serial, count, err) {
    		Logger.logAction(Logger.LOG_MICRO, 'MessageQueue.completeMessages()', 'serial = ' + serial + '; count = ' + count);
    		err = err || null;
    		var messages = this.messages;
    		var first = messages[0];
    		if(first) {
    			var startSerial = first.message.msgSerial;
    			var endSerial = serial + count; /* the serial of the first message that is *not* the subject of this call */
    			if(endSerial > startSerial) {
    				var completeMessages = messages.splice(0, (endSerial - startSerial));
    				for(var i = 0; i < completeMessages.length; i++) {
    					completeMessages[i].callback(err);
    				}
    			}
    			if(messages.length == 0)
    				this.emit('idle');
    		}
    	};

    	MessageQueue.prototype.completeAllMessages = function(err) {
    		this.completeMessages(0, Number.MAX_SAFE_INTEGER || Number.MAX_VALUE, err);
    	};

    	MessageQueue.prototype.clear = function() {
    		Logger.logAction(Logger.LOG_MICRO, 'MessageQueue.clear()', 'clearing ' + this.messages.length + ' messages');
    		this.messages = [];
    		this.emit('idle');
    	};

    	return MessageQueue;
    })();

    var Protocol = (function() {
    	var actions = ProtocolMessage.Action;

    	function Protocol(transport) {
    		EventEmitter.call(this);
    		this.transport = transport;
    		this.messageQueue = new MessageQueue();
    		var self = this;
    		transport.on('ack', function(serial, count) { self.onAck(serial, count); });
    		transport.on('nack', function(serial, count, err) { self.onNack(serial, count, err); });
    	}
    	Utils.inherits(Protocol, EventEmitter);

    	Protocol.prototype.onAck = function(serial, count) {
    		Logger.logAction(Logger.LOG_MICRO, 'Protocol.onAck()', 'serial = ' + serial + '; count = ' + count);
    		this.messageQueue.completeMessages(serial, count);
    	};

    	Protocol.prototype.onNack = function(serial, count, err) {
    		Logger.logAction(Logger.LOG_ERROR, 'Protocol.onNack()', 'serial = ' + serial + '; count = ' + count + '; err = ' + Utils.inspectError(err));
    		if(!err) {
    			err = new ErrorInfo('Unable to send message; channel not responding', 50001, 500);
    		}
    		this.messageQueue.completeMessages(serial, count, err);
    	};

    	Protocol.prototype.onceIdle = function(listener) {
    		var messageQueue = this.messageQueue;
    		if(messageQueue.count() === 0) {
    			listener();
    			return;
    		}
    		messageQueue.once('idle', listener);
    	};

    	Protocol.prototype.send = function(pendingMessage) {
    		if(pendingMessage.ackRequired) {
    			this.messageQueue.push(pendingMessage);
    		}
    		if (Logger.shouldLog(Logger.LOG_MICRO)) {
    			Logger.logAction(Logger.LOG_MICRO, 'Protocol.send()', 'sending msg; ' + ProtocolMessage.stringify(pendingMessage.message));
    		}
    		pendingMessage.sendAttempted = true;
    		this.transport.send(pendingMessage.message);
    	};

    	Protocol.prototype.getTransport = function() {
    		return this.transport;
    	};

    	Protocol.prototype.getPendingMessages = function() {
    		return this.messageQueue.copyAll();
    	};

    	Protocol.prototype.clearPendingMessages = function() {
    		return this.messageQueue.clear();
    	};

    	Protocol.prototype.finish = function() {
    		var transport = this.transport;
    		this.onceIdle(function() {
    			transport.disconnect();
    		});
    	};

    	function PendingMessage(message, callback) {
    		this.message = message;
    		this.callback = callback;
    		this.merged = false;
    		var action = message.action;
    		this.sendAttempted = false;
    		this.ackRequired = (action == actions.MESSAGE || action == actions.PRESENCE);
    	}
    	Protocol.PendingMessage = PendingMessage;

    	return Protocol;
    })();

    var ConnectionManager = (function() {
    	var haveWebStorage = !!(typeof(WebStorage) !== 'undefined' && WebStorage.get);
    	var haveSessionStorage = !!(typeof(WebStorage) !== 'undefined' && WebStorage.getSession);
    	var actions = ProtocolMessage.Action;
    	var PendingMessage = Protocol.PendingMessage;
    	var noop = function() {};
    	var transportPreferenceOrder = Defaults.transportPreferenceOrder;
    	var optimalTransport = transportPreferenceOrder[transportPreferenceOrder.length - 1];
    	var transportPreferenceName = 'ably-transport-preference';

    	var sessionRecoveryName = 'ably-connection-recovery';
    	function getSessionRecoverData() {
    		return haveSessionStorage && WebStorage.getSession(sessionRecoveryName);
    	}
    	function setSessionRecoverData(value) {
    		return haveSessionStorage && WebStorage.setSession(sessionRecoveryName, value);
    	}
    	function clearSessionRecoverData() {
    		return haveSessionStorage && WebStorage.removeSession(sessionRecoveryName);
    	}

    	function betterTransportThan(a, b) {
    		return Utils.arrIndexOf(transportPreferenceOrder, a.shortName) >
    		   Utils.arrIndexOf(transportPreferenceOrder, b.shortName);
    	}

    	function TransportParams(options, host, mode, connectionKey) {
    		this.options = options;
    		this.host = host;
    		this.mode = mode;
    		this.connectionKey = connectionKey;
    		this.format = options.useBinaryProtocol ? 'msgpack' : 'json';

    		this.connectionSerial = undefined;
    		this.timeSerial = undefined;
    	}

    	TransportParams.prototype.getConnectParams = function(authParams) {
    		var params = authParams ? Utils.copy(authParams) : {};
    		var options = this.options;
    		switch(this.mode) {
    			case 'upgrade':
    				params.upgrade = this.connectionKey;
    				break;
    			case 'resume':
    				params.resume = this.connectionKey;
    				if(this.timeSerial !== undefined) {
    					params.timeSerial = this.timeSerial;
    				} else if(this.connectionSerial !== undefined) {
    					params.connectionSerial = this.connectionSerial;
    				}
    				break;
    			case 'recover':
    				var match = options.recover.split(':');
    				if(match) {
    					params.recover = match[0];
    					var recoverSerial = match[1];
    					if(isNaN(recoverSerial)) {
    						params.timeSerial = recoverSerial;
    					} else {
    						params.connectionSerial = recoverSerial;
    					}
    				}
    				break;
    			default:
    		}
    		if(options.clientId !== undefined) {
    			params.clientId = options.clientId;
    		}
    		if(options.echoMessages === false) {
    			params.echo = 'false';
    		}
    		if(this.format !== undefined) {
    			params.format = this.format;
    		}
    		if(this.stream !== undefined) {
    			params.stream = this.stream;
    		}
    		if(this.heartbeats !== undefined) {
    			params.heartbeats = this.heartbeats;
    		}
    		params.v = Defaults.apiVersion;
    		params.lib = Defaults.libstring;
    		if(options.transportParams !== undefined) {
    			Utils.mixin(params, options.transportParams);
    		}
    		return params;
    	};

    	TransportParams.prototype.toString = function() {
    		var result = '[mode=' + this.mode;
    		if(this.host) { result += (',host=' + this.host); }
    		if(this.connectionKey) { result += (',connectionKey=' + this.connectionKey); }
    		if(this.connectionSerial !== undefined) { result += (',connectionSerial=' + this.connectionSerial); }
    		if(this.timeSerial) { result += (',timeSerial=' + this.timeSerial); }
    		if(this.format) { result += (',format=' + this.format); }
    		result += ']';

    		return result;
    	};

    	/* public constructor */
    	function ConnectionManager(realtime, options) {
    		EventEmitter.call(this);
    		this.realtime = realtime;
    		this.options = options;
    		var timeouts = options.timeouts;
    		var self = this;
    		/* connectingTimeout: leave preferenceConnectTimeout (~6s) to try the
    		 * preference transport, then realtimeRequestTimeout (~10s) to establish
    		 * the base transport in case that fails */
    		var connectingTimeout = timeouts.preferenceConnectTimeout + timeouts.realtimeRequestTimeout;
    		this.states = {
    			initialized:   {state: 'initialized',   terminal: false, queueEvents: true,  sendEvents: false, failState: 'disconnected'},
    			connecting:    {state: 'connecting',    terminal: false, queueEvents: true,  sendEvents: false, retryDelay: connectingTimeout, failState: 'disconnected'},
    			connected:     {state: 'connected',     terminal: false, queueEvents: false, sendEvents: true,  failState: 'disconnected'},
    			synchronizing: {state: 'connected',     terminal: false, queueEvents: true,  sendEvents: false, forceQueueEvents: true, failState: 'disconnected'},
    			disconnected:  {state: 'disconnected',  terminal: false, queueEvents: true,  sendEvents: false, retryDelay: timeouts.disconnectedRetryTimeout, failState: 'disconnected'},
    			suspended:     {state: 'suspended',     terminal: false, queueEvents: false, sendEvents: false, retryDelay: timeouts.suspendedRetryTimeout, failState: 'suspended'},
    			closing:       {state: 'closing',       terminal: false, queueEvents: false, sendEvents: false, retryDelay: timeouts.realtimeRequestTimeout, failState: 'closed'},
    			closed:        {state: 'closed',        terminal: true,  queueEvents: false, sendEvents: false, failState: 'closed'},
    			failed:        {state: 'failed',        terminal: true,  queueEvents: false, sendEvents: false, failState: 'failed'}
    		};
    		this.state = this.states.initialized;
    		this.errorReason = null;

    		this.queuedMessages = new MessageQueue();
    		this.msgSerial = 0;
    		this.connectionDetails = undefined;
    		this.connectionId = undefined;
    		this.connectionKey = undefined;
    		this.timeSerial = undefined;
    		this.connectionSerial = undefined;
    		this.connectionStateTtl = timeouts.connectionStateTtl;
    		this.maxIdleInterval = null;

    		this.transports = Utils.intersect((options.transports || Defaults.defaultTransports), ConnectionManager.supportedTransports);
    		/* baseTransports selects the leftmost transport in the Defaults.baseTransportOrder list
    		* that's both requested and supported. Normally this will be xhr_polling;
    		* if xhr isn't supported it will be jsonp. If the user has forced a
    		* transport, it'll just be that one. */
    		this.baseTransport = Utils.intersect(Defaults.baseTransportOrder, this.transports)[0];
    		this.upgradeTransports = Utils.intersect(this.transports, Defaults.upgradeTransports);
    		this.transportPreference = null;

    		this.httpHosts = Defaults.getHosts(options);
    		this.activeProtocol = null;
    		this.proposedTransports = [];
    		this.pendingTransports = [];
    		this.host = null;
    		this.lastAutoReconnectAttempt = null;
    		this.lastActivity = null;
    		this.mostRecentMsg = null;
    		this.forceFallbackHost = false;
    		this.connectCounter = 0;

    		Logger.logAction(Logger.LOG_MINOR, 'Realtime.ConnectionManager()', 'started');
    		Logger.logAction(Logger.LOG_MICRO, 'Realtime.ConnectionManager()', 'requested transports = [' + (options.transports || Defaults.defaultTransports) + ']');
    		Logger.logAction(Logger.LOG_MICRO, 'Realtime.ConnectionManager()', 'available transports = [' + this.transports + ']');
    		Logger.logAction(Logger.LOG_MICRO, 'Realtime.ConnectionManager()', 'http hosts = [' + this.httpHosts + ']');

    		if(!this.transports.length) {
    			var msg = 'no requested transports available';
    			Logger.logAction(Logger.LOG_ERROR, 'realtime.ConnectionManager()', msg);
    			throw new Error(msg);
    		}

    		var addEventListener = Platform.addEventListener;
    		if(addEventListener) {
    			/* intercept close event in browser to persist connection id if requested */
    			if(haveSessionStorage && typeof options.recover === 'function') {
    				/* Usually can't use bind as not supported in IE8, but IE doesn't support sessionStorage, so... */
    				addEventListener('beforeunload', this.persistConnection.bind(this));
    			}

    			if(options.closeOnUnload === true) {
    				addEventListener('beforeunload', function() {
    					Logger.logAction(Logger.LOG_MAJOR, 'Realtime.ConnectionManager()', 'beforeunload event has triggered the connection to close as closeOnUnload is true');
    					self.requestState({state: 'closing'});
    				});
    			}

    			/* Listen for online and offline events */
    			addEventListener('online', function() {
    				if(self.state == self.states.disconnected || self.state == self.states.suspended) {
    					Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager caught browser ‘online’ event', 'reattempting connection');
    					self.requestState({state: 'connecting'});
    				}
    			});
    			addEventListener('offline', function() {
    				if(self.state == self.states.connected) {
    					Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager caught browser ‘offline’ event', 'disconnecting active transport');
    					// Not sufficient to just go to the 'disconnected' state, want to
    					// force all transports to reattempt the connection. Will immediately
    					// retry.
    					self.disconnectAllTransports();
    				}
    			});
    		}
    	}
    	Utils.inherits(ConnectionManager, EventEmitter);

    	/*********************
    	 * transport management
    	 *********************/

    	ConnectionManager.supportedTransports = {};

    	ConnectionManager.prototype.createTransportParams = function(host, mode) {
    		var params = new TransportParams(this.options, host, mode, this.connectionKey);
    		if(this.timeSerial) {
    			params.timeSerial = this.timeSerial;
    		} else if(this.connectionSerial !== undefined) {
    			params.connectionSerial = this.connectionSerial;
    		}
    		return params;
    	};

    	ConnectionManager.prototype.getTransportParams = function(callback) {
    		var self = this;

    		function decideMode(modeCb) {
    			if(self.connectionKey) {
    				modeCb('resume');
    				return;
    			}

    			if(typeof self.options.recover === 'string') {
    				modeCb('recover');
    				return;
    			}

    			var recoverFn = self.options.recover,
    				lastSessionData = getSessionRecoverData();
    			if(lastSessionData && typeof(recoverFn) === 'function') {
    				Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.getTransportParams()', 'Calling clientOptions-provided recover function with last session data');
    				recoverFn(lastSessionData, function(shouldRecover) {
    					if(shouldRecover) {
    						self.options.recover = lastSessionData.recoveryKey;
    						modeCb('recover');
    					} else {
    						modeCb('clean');
    					}
    				});
    				return;
    			}
    			modeCb('clean');
    		}

    		decideMode(function(mode) {
    			var transportParams = self.createTransportParams(null, mode);
    			if(mode === 'recover') {
    				Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.getTransportParams()', 'Transport recovery mode = recover; recoveryKey = ' + self.options.recover);
    				var match = self.options.recover.split(':');
    				if(match && match[2]) {
    					self.msgSerial = match[2];
    				}
    			} else {
    				Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.getTransportParams()', 'Transport params = ' + transportParams.toString());
    			}
    			callback(transportParams);
    		});
    	};

    	/**
    	 * Attempt to connect using a given transport
    	 * @param transportParams
    	 * @param candidate, the transport to try
    	 * @param callback
    	 */
    	ConnectionManager.prototype.tryATransport = function(transportParams, candidate, callback) {
    		var self = this, host = transportParams.host;
    		Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.tryATransport()', 'trying ' + candidate);
    		(ConnectionManager.supportedTransports[candidate]).tryConnect(this, this.realtime.auth, transportParams, function(wrappedErr, transport) {
    			var state = self.state;
    			if(state == self.states.closing || state == self.states.closed || state == self.states.failed) {
    				if(transport) {
    					Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.tryATransport()', 'connection ' + state.state + ' while we were attempting the transport; closing ' + transport);
    					transport.close();
    				}
    				callback(true);
    				return;
    			}

    			if(wrappedErr) {
    				Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.tryATransport()', 'transport ' + candidate + ' ' + wrappedErr.event + ', err: ' + wrappedErr.error.toString());

    				/* Comet transport onconnect token errors can be dealt with here.
    				* Websocket ones only happen after the transport claims to be viable,
    				* so are dealt with as non-onconnect token errors */
    				if(Auth.isTokenErr(wrappedErr.error)) {
    					/* re-get a token and try again */
    					self.realtime.auth._forceNewToken(null, null, function(err) {
    						if(err) {
    							self.actOnErrorFromAuthorize(err);
    							return;
    						}
    						self.tryATransport(transportParams, candidate, callback);
    					});
    				} else if(wrappedErr.event === 'failed') {
    					/* Error that's fatal to the connection */
    					self.notifyState({state: 'failed', error: wrappedErr.error});
    					callback(true);
    				} else if(wrappedErr.event === 'disconnected') {
    					/* Error with that transport only */
    					callback(false);
    				}
    				return;
    			}

    			Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.tryATransport()', 'viable transport ' + candidate + '; setting pending');
    			self.setTransportPending(transport, transportParams);
    			callback(null, transport);
    		});
    	};


    	/**
    	 * Called when a transport is indicated to be viable, and the connectionmanager
    	 * expects to activate this transport as soon as it is connected.
    	 * @param host
    	 * @param transportParams
    	 */
    	ConnectionManager.prototype.setTransportPending = function(transport, transportParams) {
    		var mode = transportParams.mode;
    		Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.setTransportPending()', 'transport = ' + transport + '; mode = ' + mode);

    		Utils.arrDeleteValue(this.proposedTransports, transport);
    		this.pendingTransports.push(transport);

    		var self = this;
    		transport.once('connected', function(error, connectionId, connectionDetails, connectionPosition) {
    			if(mode == 'upgrade' && self.activeProtocol) {
    				/*  if ws and xhrs are connecting in parallel, delay xhrs activation to let ws go ahead */
    				if(transport.shortName !== optimalTransport && Utils.arrIn(self.getUpgradePossibilities(), optimalTransport)) {
    					setTimeout(function() {
    						self.scheduleTransportActivation(error, transport, connectionId, connectionDetails, connectionPosition);
    					}, self.options.timeouts.parallelUpgradeDelay);
    				} else {
    					self.scheduleTransportActivation(error, transport, connectionId, connectionDetails, connectionPosition);
    				}
    			} else {
    				self.activateTransport(error, transport, connectionId, connectionDetails, connectionPosition);

    				/* allow connectImpl to start the upgrade process if needed, but allow
    				 * other event handlers, including activating the transport, to run first */
    				Utils.nextTick(function() {
    					self.connectImpl(transportParams);
    				});
    			}

    			if(mode === 'recover' && self.options.recover) {
    				/* After a successful recovery, we unpersist, as a recovery key cannot
    				* be used more than once */
    				self.options.recover = null;
    				self.unpersistConnection();
    			}
    		});

    		transport.on(['disconnected', 'closed', 'failed'], function(error) {
    			self.deactivateTransport(transport, this.event, error);
    		});

    		this.emit('transport.pending', transport);
    	};

    	/**
    	 * Called when an upgrade transport is connected,
    	 * to schedule the activation of that transport.
    	 * @param error
    	 * @param transport
    	 * @param connectionId
    	 * @param connectionDetails
    	 * @param connectedMessage
    	 */
    	ConnectionManager.prototype.scheduleTransportActivation = function(error, transport, connectionId, connectionDetails, upgradeConnectionPosition) {
    		var self = this,
    			currentTransport = this.activeProtocol && this.activeProtocol.getTransport(),
    			abandon = function() {
    				transport.disconnect();
    				Utils.arrDeleteValue(self.pendingTransports, transport);
    			};

    		if(this.state !== this.states.connected && this.state !== this.states.connecting) {
    			/* This is most likely to happen for the delayed xhrs, when xhrs and ws are scheduled in parallel*/
    			Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.scheduleTransportActivation()', 'Current connection state (' + this.state.state + (this.state === this.states.synchronizing ? ', but with an upgrade already in progress' : '') + ') is not valid to upgrade in; abandoning upgrade to ' + transport.shortName);
    			abandon();
    			return;
    		}

    		if(currentTransport && !betterTransportThan(transport, currentTransport)) {
    			Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.scheduleTransportActivation()', 'Proposed transport ' + transport.shortName + ' is no better than current active transport ' + currentTransport.shortName + ' - abandoning upgrade');
    			abandon();
    			return;
    		}

    		Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.scheduleTransportActivation()', 'Scheduling transport upgrade; transport = ' + transport);

    		this.realtime.channels.onceNopending(function(err) {
    			var oldProtocol;
    			if(err) {
    				Logger.logAction(Logger.LOG_ERROR, 'ConnectionManager.scheduleTransportActivation()', 'Unable to activate transport; transport = ' + transport + '; err = ' + err);
    				return;
    			}

    			if(!transport.isConnected) {
    				/* This is only possible if the xhr streaming transport was disconnected during the parallelUpgradeDelay */
    				Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.scheduleTransportActivation()', 'Proposed transport ' + transport.shortName + 'is no longer connected; abandoning upgrade');
    				abandon();
    				return;
    			}

    			if(self.state === self.states.connected) {
    				Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.scheduleTransportActivation()', 'Currently connected, so temporarily pausing events until the upgrade is complete');
    				self.state = self.states.synchronizing;
    				oldProtocol = self.activeProtocol;
    			} else if(self.state !== self.states.connecting) {
    				/* Note: upgrading from the connecting state is valid if the old active
    				* transport was deactivated after the upgrade transport first connected;
    				* see logic in deactivateTransport */
    				Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.scheduleTransportActivation()', 'Current connection state (' + self.state.state + (self.state === self.states.synchronizing ? ', but with an upgrade already in progress' : '') + ') is not valid to upgrade in; abandoning upgrade to ' + transport.shortName);
    				abandon();
    				return;
    			}

    			/* If the connectionId has changed, the upgrade hasn't worked. But as
    			* it's still an upgrade, realtime still expects a sync - it just needs to
    			* be a sync with the new connection position. (And it
    			* needs to be set in the library, which is done by activateTransport). */
    			var connectionReset = connectionId !== self.connectionId,
    				syncPosition = connectionReset ? upgradeConnectionPosition : self;

    			if(connectionReset) {
    				Logger.logAction(Logger.LOG_ERROR, 'ConnectionManager.scheduleTransportActivation()', 'Upgrade resulted in new connectionId; resetting library connection position from ' + (self.timeSerial || self.connectionSerial) + ' to ' + (syncPosition.timeSerial || syncPosition.connectionSerial) + '; upgrade error was ' + error);
    			}

    			Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.scheduleTransportActivation()', 'Syncing transport; transport = ' + transport);
    			self.sync(transport, syncPosition, function(syncErr, connectionId, postSyncPosition) {
    				/* If there's been some problem with syncing (and the connection hasn't
    				 * closed or something in the meantime), we have a problem -- we can't
    				 * just fall back on the old transport, as we don't know whether
    				 * realtime got the sync -- if it did, the old transport is no longer
    				 * valid. To be safe, we disconnect both and start again from scratch. */
    				if(syncErr) {
    					if(self.state === self.states.synchronizing) {
    						Logger.logAction(Logger.LOG_ERROR, 'ConnectionManager.scheduleTransportActivation()', 'Unexpected error attempting to sync transport; transport = ' + transport + '; err = ' + syncErr);
    						self.disconnectAllTransports();
    					}
    					return;
    				}
    				var finishUpgrade = function() {
    					Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.scheduleTransportActivation()', 'Activating transport; transport = ' + transport);
    					self.activateTransport(error, transport, connectionId, connectionDetails, postSyncPosition);
    					/* Restore pre-sync state. If state has changed in the meantime,
    					 * don't touch it -- since the websocket transport waits a tick before
    					 * disposing itself, it's possible for it to have happily synced
    					 * without err while, unknown to it, the connection has closed in the
    					 * meantime and the ws transport is scheduled for death */
    					if(self.state === self.states.synchronizing) {
    						Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.scheduleTransportActivation()', 'Pre-upgrade protocol idle, sending queued messages on upgraded transport; transport = ' + transport);
    						self.state = self.states.connected;
    					} else {
    						Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.scheduleTransportActivation()', 'Pre-upgrade protocol idle, but state is now ' + self.state.state + ', so leaving unchanged');
    					}
    					if(self.state.sendEvents) {
    						self.sendQueuedMessages();
    					}
    				};

    				/* Wait until sync is done and old transport is idle before activating new transport. This
    				 * guarantees that messages arrive at realtime in the same order they are sent.
    				 *
    				 * If a message times out on the old transport, since it's still the active transport the
    				 * message will be requeued. deactivateTransport will see the pending transport and notify
    				 * the `connecting` state without starting a new connection, so the new transport can take
    				 * over once deactivateTransport clears the old protocol's queue.
    				 *
    				 * If there is no old protocol, that meant that we weren't in the connected state at the
    				 * beginning of the sync - likely the base transport died just before the sync. So can just
    				 * finish the upgrade. If we're actually in closing/failed rather than connecting, that's
    				 * fine, activatetransport will deal with that. */
    				if(oldProtocol) {
    				 /* Most of the time this will be already true: the new-transport sync will have given
    				 * enough time for in-flight messages on the old transport to complete. */
    					oldProtocol.onceIdle(finishUpgrade);
    				} else {
    					finishUpgrade();
    				}
    			});
    		});
    	};

    	/**
    	 * Called when a transport is connected, and the connectionmanager decides that
    	 * it will now be the active transport. Returns whether or not it activated
    	 * the transport (if the connection is closing/closed it will choose not to).
    	 * @param transport the transport instance
    	 * @param connectionId the id of the new active connection
    	 * @param connectionDetails the details of the new active connection
    	 * @param connectionPosition the position at the point activation; either {connectionSerial: <serial>} or {timeSerial: <serial>}
    	 */
    	ConnectionManager.prototype.activateTransport = function(error, transport, connectionId, connectionDetails, connectionPosition) {
    		Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.activateTransport()', 'transport = ' + transport);
    		if(error) {
    			Logger.logAction(Logger.LOG_ERROR, 'ConnectionManager.activateTransport()', 'error = ' + error);
    		}
    		if(connectionId) {
    			Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.activateTransport()', 'connectionId =  ' + connectionId);
    		}
    		if(connectionDetails) {
    			Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.activateTransport()', 'connectionDetails =  ' + JSON.stringify(connectionDetails));
    		}
    		if(connectionPosition) {
    			Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.activateTransport()', 'serial =  ' + (connectionPosition.timeSerial || connectionPosition.connectionSerial));
    		}

    		this.persistTransportPreference(transport);

    		/* if the connectionmanager moved to the closing/closed state before this
    		 * connection event, then we won't activate this transport */
    		var existingState = this.state,
    			connectedState = this.states.connected.state;
    		Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.activateTransport()', 'current state = ' + existingState.state);
    		if(existingState.state == this.states.closing.state || existingState.state == this.states.closed.state || existingState.state == this.states.failed.state) {
    			Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.activateTransport()', 'Disconnecting transport and abandoning');
    			transport.disconnect();
    			return false;
    		}

    		/* remove this transport from pending transports */
    		Utils.arrDeleteValue(this.pendingTransports, transport);

    		/* if the transport is not connected (eg because it failed during a
    		 * scheduleTransportActivation#onceNoPending wait) then don't activate it */
    		if(!transport.isConnected) {
    			Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.activateTransport()', 'Declining to activate transport ' + transport + ' since it appears to no longer be connected');
    			return false;
    		}

    		/* the given transport is connected; this will immediately
    		 * take over as the active transport */
    		var existingActiveProtocol = this.activeProtocol;
    		this.activeProtocol = new Protocol(transport);
    		this.host = transport.params.host;

    		var connectionKey = connectionDetails.connectionKey;
    		if(connectionKey && this.connectionKey != connectionKey)  {
    			this.setConnection(connectionId, connectionDetails, connectionPosition, !!error);
    		}

    		/* Rebroadcast any new connectionDetails from the active transport, which
    		 * can come at any time (eg following a reauth), and emit an RTN24 UPDATE
    		 * event. (Listener added on nextTick because we're in a transport.on('connected')
    		 * callback at the moment; if we add it now we'll be adding it to the end
    		 * of the listeners array and it'll be called immediately) */
    		this.onConnectionDetailsUpdate(connectionDetails, transport);
    		var self = this;
    		Utils.nextTick(function() {
    			transport.on('connected', function(connectedErr, _connectionId, connectionDetails) {
    				self.onConnectionDetailsUpdate(connectionDetails, transport);
    				self.emit('update', new ConnectionStateChange(connectedState, connectedState, null, connectedErr));
    			});
    		});

    		/* If previously not connected, notify the state change (including any
    		 * error). */
    		if(existingState.state === this.states.connected.state) {
    			if(error) {
    				/* if upgrading without error, leave any existing errorReason alone */
    				this.errorReason = this.realtime.connection.errorReason = error;
    				/* Only bother emitting an upgrade if there's an error; otherwise it's
    				 * just a transport upgrade, so auth details won't have changed */
    				this.emit('update', new ConnectionStateChange(connectedState, connectedState, null, error));
    			}
    		} else {
    			this.notifyState({state: 'connected', error: error});
    			this.errorReason = this.realtime.connection.errorReason = error || null;
    		}

    		/* Send after the connection state update, as Channels hooks into this to
    		 * resend attaches on a new transport if necessary */
    		this.emit('transport.active', transport);

    		/* Gracefully terminate existing protocol */
    		if(existingActiveProtocol) {
    			if(existingActiveProtocol.messageQueue.count() > 0) {
    				/* We could just requeue pending messages on the new transport, but
    				 * actually this should never happen: transports should only take over
    				 * from other active transports when upgrading, and upgrading waits for
    				 * the old transport to be idle. So log an error. */
    				Logger.logAction(Logger.LOG_ERROR, 'ConnectionManager.activateTransport()', 'Previous active protocol (for transport ' + existingActiveProtocol.transport.shortName + ', new one is ' + transport.shortName + ') finishing with ' + existingActiveProtocol.messageQueue.count() + ' messages still pending');
    			}
    			if(existingActiveProtocol.transport === transport) {
    				var msg = 'Assumption violated: activating a transport that was also the transport for the previous active protocol; transport = ' + transport.shortName + '; stack = ' + new Error().stack;
    				Logger.logAction(Logger.LOG_ERROR, 'ConnectionManager.activateTransport()', msg);
    				ErrorReporter.report('error', msg, 'transport-previously-active');
    			} else {
    				existingActiveProtocol.finish();
    			}
    		}

    		/* Terminate any other pending transport(s), and
    		 * abort any not-yet-pending transport attempts */
    		Utils.safeArrForEach(this.pendingTransports, function(pendingTransport) {
    			if(pendingTransport === transport) {
    				var msg = 'Assumption violated: activating a transport that is still marked as a pending transport; transport = ' + transport.shortName + '; stack = ' + new Error().stack;
    				Logger.logAction(Logger.LOG_ERROR, 'ConnectionManager.activateTransport()', msg);
    				ErrorReporter.report('error', msg, 'transport-activating-pending');
    				Utils.arrDeleteValue(self.pendingTransports, transport);
    			} else {
    				pendingTransport.disconnect();
    			}
    		});
    		Utils.safeArrForEach(this.proposedTransports, function(proposedTransport) {
    			if(proposedTransport === transport) {
    				var msg = 'Assumption violated: activating a transport that is still marked as a proposed transport; transport = ' + transport.shortName + '; stack = ' + new Error().stack;
    				Logger.logAction(Logger.LOG_ERROR, 'ConnectionManager.activateTransport()', msg);
    				ErrorReporter.report('error', msg, 'transport-activating-proposed');
    				Utils.arrDeleteValue(self.proposedTransports, transport);
    			} else {
    				proposedTransport.dispose();
    			}
    		});

    		return true;
    	};

    	/**
    	 * Called when a transport is no longer the active transport. This can occur
    	 * in any transport connection state.
    	 * @param transport
    	 */
    	ConnectionManager.prototype.deactivateTransport = function(transport, state, error) {
    		var currentProtocol = this.activeProtocol,
    			wasActive = currentProtocol && currentProtocol.getTransport() === transport,
    			wasPending = Utils.arrDeleteValue(this.pendingTransports, transport),
    			wasProposed = Utils.arrDeleteValue(this.proposedTransports, transport),
    			noTransportsScheduledForActivation = this.noTransportsScheduledForActivation();

    		Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.deactivateTransport()', 'transport = ' + transport);
    		Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.deactivateTransport()', 'state = ' + state + (wasActive ? '; was active' : wasPending ? '; was pending' : wasProposed ? '; was proposed' : '') + (noTransportsScheduledForActivation ? '' : '; another transport is scheduled for activation'));
    		if(error && error.message)
    			Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.deactivateTransport()', 'reason =  ' + error.message);

    		if(wasActive) {
    			Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.deactivateTransport()', 'Getting, clearing, and requeuing ' + this.activeProtocol.messageQueue.count() + ' pending messages');
    			this.queuePendingMessages(currentProtocol.getPendingMessages());
    			/* Clear any messages we requeue to allow the protocol to become idle.
    			 * In case of an upgrade, this will trigger an immediate activation of
    			 * the upgrade transport, so delay a tick so this transport can finish
    			 * deactivating */
    			Utils.nextTick(function() {
    				currentProtocol.clearPendingMessages();
    			});
    			this.activeProtocol = this.host = null;
    			clearTimeout(this.channelResumeCheckTimer);
    		}

    		this.emit('transport.inactive', transport);

    		/* this transport state change is a state change for the connectionmanager if
    		 * - the transport was the active transport and there are no transports
    		 *   which are connected and scheduled for activation, just waiting for the
    		 *   active transport to finish what its doing; or
    		 * - the transport was the active transport and the error was fatal (so
    		 *   unhealable by another transport); or
    		 * - there is no active transport, and this is the last remaining
    		 *   pending transport (so we were in the connecting state)
    		 */
    		if((wasActive && noTransportsScheduledForActivation) ||
    			(wasActive && (state === 'failed') || (state === 'closed')) ||
    			(currentProtocol === null && wasPending && this.pendingTransports.length === 0)) {

    			/* If we're disconnected with a 5xx we need to try fallback hosts
    			 * (RTN14d), but (a) due to how the upgrade sequence works, the
    			 * host/transport selection sequence only cares about getting to
    			 * `preconnect` (eg establishing a websocket) getting a `disconnected`
    			 * protocol message afterwards is too late; and (b) host retry only
    			 * applies to connectBase unless the stored preference transport doesn't
    			 * work. We solve this by unpersisting the transport preference and
    			 * setting an instance variable to force fallback hosts to be used (if
    			 * any) here. Bit of a kludge, but no real better alternatives without
    			 * rewriting the entire thing */
    			if(state === 'disconnected' && error && error.statusCode > 500 && this.httpHosts.length > 1) {
    				this.unpersistTransportPreference();
    				this.forceFallbackHost = true;
    				/* and try to connect again to try a fallback host without waiting for the usual 15s disconnectedRetryTimeout */
    				this.notifyState({state: state, error: error, retryImmediately: true});
    				return;
    			}

    			/* TODO remove below line once realtime sends token errors as DISCONNECTEDs */
    			var newConnectionState = (state === 'failed' && Auth.isTokenErr(error)) ? 'disconnected' : state;
    			this.notifyState({state: newConnectionState, error: error});
    			return;
    		}

    		if(wasActive && (state === 'disconnected') && (this.state !== this.states.synchronizing)) {
    			/* If we were active but there is another transport scheduled for
    			* activation, go into to the connecting state until that transport
    			* activates and sets us back to connected. (manually starting the
    			* transition timers in case that never happens). (If we were in the
    			* synchronizing state, then that's fine, the old transport just got its
    			* disconnected before the new one got the sync -- ignore it and keep
    			* waiting for the sync. If it fails we have a separate sync timer that
    			* will expire). */
    			Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.deactivateTransport()', 'wasActive but another transport is connected and scheduled for activation, so going into the connecting state until it activates');
    			this.startSuspendTimer();
    			this.startTransitionTimer(this.states.connecting);
    			this.notifyState({state: 'connecting', error: error});
    		}
    	};

    	/* Helper that returns true if there are no transports which are pending,
    	* have been connected, and are just waiting for onceNoPending to fire before
    	* being activated */
    	ConnectionManager.prototype.noTransportsScheduledForActivation = function() {
    		return Utils.isEmpty(this.pendingTransports) ||
    			this.pendingTransports.every(function(transport) {
    				return !transport.isConnected;
    			});
    	};

    	/**
    	 * Called when activating a new transport, to ensure message delivery
    	 * on the new transport synchronises with the messages already received
    	 */
    	ConnectionManager.prototype.sync = function(transport, requestedSyncPosition, callback) {
    		var timeout = setTimeout(function () {
    			transport.off('sync');
    			callback(new ErrorInfo('Timeout waiting for sync response', 50000, 500));
    		}, this.options.timeouts.realtimeRequestTimeout);

    		/* send sync request */
    		var syncMessage = ProtocolMessage.fromValues({
    			action: actions.SYNC,
    			connectionKey: this.connectionKey
    		});

    		if(requestedSyncPosition.timeSerial) {
    			syncMessage.timeSerial = requestedSyncPosition.timeSerial;
    		} else if(requestedSyncPosition.connectionSerial !== undefined) {
    			syncMessage.connectionSerial = requestedSyncPosition.connectionSerial;
    		}
    		transport.send(syncMessage);

    		transport.once('sync', function(connectionId, syncPosition) {
    			clearTimeout(timeout);
    			callback(null, connectionId, syncPosition);
    		});
    	};

    	ConnectionManager.prototype.setConnection = function(connectionId, connectionDetails, connectionPosition, hasConnectionError) {
    		/* if connectionKey changes but connectionId stays the same, then just a
    		 * transport change on the same connection. If connectionId changes, we're
    		 * on a new connection, with implications for msgSerial and channel state,
    		 * and resetting the connectionSerial position */
    		var self = this;
    		/* If no previous connectionId, don't reset the msgSerial as it may have
    		 * been set by recover data (unless the recover failed) */
    		var prevConnId = this.connectionid,
    			connIdChanged = prevConnId && (prevConnId !== connectionId),
    			recoverFailure = !prevConnId && hasConnectionError;
    		if(connIdChanged || recoverFailure)  {
    			Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.setConnection()', 'Resetting msgSerial');
    			this.msgSerial = 0;
    		}
    		/* but do need to reattach channels, for channels that were previously in
    		 * the attached state even though the connection mode was 'clean' due to a
    		 * freshness check - see https://github.com/ably/ably-js/issues/394 */
    		if(this.connectionId !== connectionId)  {
    			Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.setConnection()', 'New connectionId; reattaching any attached channels');
    			/* Wait till next tick before reattaching channels, so that connection
    			 * state will be updated and so that it will be applied after
    			 * Channels#onTransportUpdate, else channels will not have an ATTACHED
    			 * sent twice (once from this and once from that). */
    			Utils.nextTick(function() {
    				self.realtime.channels.reattach();
    			});
    		} else if(this.options.checkChannelsOnResume) {
    			/* For attached channels, set the attached msg indicator variable to false,
    			 * wait 30s, and check we got an attached for each one.
    			 * 30s was chosen to be 5s longer than the transport idle timeout expire
    			 * time, in an attempt to avoid false positives due to a transport
    			 * silently failing immediately after a resume */
    			Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.setConnection()', 'Same connectionId; checkChannelsOnResume is enabled');
    			clearTimeout(this.channelResumeCheckTimer);
    			this.realtime.channels.resetAttachedMsgIndicators();
    			this.channelResumeCheckTimer = setTimeout(function() {
    				self.realtime.channels.checkAttachedMsgIndicators(connectionId);
    			}, 30000);
    		}
    		this.realtime.connection.id = this.connectionId = connectionId;
    		this.realtime.connection.key = this.connectionKey = connectionDetails.connectionKey;
    		var forceResetMessageSerial = connIdChanged || !prevConnId;
    		this.setConnectionSerial(connectionPosition, forceResetMessageSerial);
    	};

    	ConnectionManager.prototype.clearConnection = function() {
    		this.realtime.connection.id = this.connectionId = undefined;
    		this.realtime.connection.key = this.connectionKey = undefined;
    		this.clearConnectionSerial();
    		this.msgSerial = 0;
    		this.unpersistConnection();
    	};

    	/* force: set the connectionSerial even if it's less than the current
    	 * connectionSerial. Used for new connections.
    	 * Returns true iff the message was rejected as a duplicate. */
    	ConnectionManager.prototype.setConnectionSerial = function(connectionPosition, force) {
    		var timeSerial = connectionPosition.timeSerial,
    			connectionSerial = connectionPosition.connectionSerial;
    		Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.setConnectionSerial()', 'Updating connection serial; serial = ' + connectionSerial + '; timeSerial = ' + timeSerial + '; force = ' + force + '; previous = ' + this.connectionSerial);
    		if(timeSerial !== undefined) {
    			if(timeSerial <= this.timeSerial && !force) {
    				Logger.logAction(Logger.LOG_ERROR, 'ConnectionManager.setConnectionSerial()', 'received message with timeSerial ' + timeSerial + ', but current timeSerial is ' + this.timeSerial + '; assuming message is a duplicate and discarding it');
    				return true;
    			}
    			this.realtime.connection.timeSerial = this.timeSerial = timeSerial;
    			this.setRecoveryKey();
    			return;
    		}
    		if(connectionSerial !== undefined) {
    			if(connectionSerial <= this.connectionSerial && !force) {
    				Logger.logAction(Logger.LOG_ERROR, 'ConnectionManager.setConnectionSerial()', 'received message with connectionSerial ' + connectionSerial + ', but current connectionSerial is ' + this.connectionSerial + '; assuming message is a duplicate and discarding it');
    				return true;
    			}
    			this.realtime.connection.serial = this.connectionSerial = connectionSerial;
    			this.setRecoveryKey();
    		}
    	};

    	ConnectionManager.prototype.clearConnectionSerial = function() {
    		this.realtime.connection.serial = this.connectionSerial = undefined;
    		this.realtime.connection.timeSerial = this.timeSerial = undefined;
    		this.clearRecoveryKey();
    	};

    	ConnectionManager.prototype.setRecoveryKey = function() {
    		this.realtime.connection.recoveryKey = this.connectionKey + ':' + (this.timeSerial || this.connectionSerial) + ':' + this.msgSerial;
    	};

    	ConnectionManager.prototype.clearRecoveryKey = function() {
    		this.realtime.connection.recoveryKey = null;
    	};

    	ConnectionManager.prototype.checkConnectionStateFreshness = function() {
    		if(!this.lastActivity || !this.connectionId) { return; }

    		var sinceLast = Utils.now() - this.lastActivity;
    		if(sinceLast > this.connectionStateTtl + this.maxIdleInterval) {
    			Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.checkConnectionStateFreshness()', 'Last known activity from realtime was ' + sinceLast + 'ms ago; discarding connection state');
    			this.clearConnection();
    			this.states.connecting.failState = 'suspended';
    			this.states.connecting.queueEvents = false;
    		}
    	};

    	/**
    	 * Called when the connectionmanager wants to persist transport
    	 * state for later recovery. Only applicable in the browser context.
    	 */
    	ConnectionManager.prototype.persistConnection = function() {
    		if(haveSessionStorage) {
    			var recoveryKey = this.realtime.connection.recoveryKey;
    			if(recoveryKey) {
    				setSessionRecoverData({
    					recoveryKey: recoveryKey,
    					disconnectedAt: Utils.now(),
    					location: global.location,
    					clientId: this.realtime.auth.clientId
    				}, this.connectionStateTtl);
    			}
    		}
    	};

    	/**
    	 * Called when the connectionmanager wants to persist transport
    	 * state for later recovery. Only applicable in the browser context.
    	 */
    	ConnectionManager.prototype.unpersistConnection = function() {
    		clearSessionRecoverData();
    	};

    	/*********************
    	 * state management
    	 *********************/

    	ConnectionManager.prototype.getError = function() {
    		return this.errorReason || this.getStateError();
    	};

    	ConnectionManager.prototype.getStateError = function() {
    		return ConnectionError[this.state.state];
    	};

    	ConnectionManager.prototype.activeState = function() {
    		return this.state.queueEvents || this.state.sendEvents;
    	};

    	ConnectionManager.prototype.enactStateChange = function(stateChange) {
    		var logLevel = stateChange.current === 'failed' ? Logger.LOG_ERROR : Logger.LOG_MAJOR;
    		Logger.logAction(logLevel, 'Connection state', stateChange.current + (stateChange.reason ? ('; reason: ' + stateChange.reason) : ''));
    		Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.enactStateChange', 'setting new state: ' + stateChange.current + '; reason = ' + (stateChange.reason && stateChange.reason.message));
    		var newState = this.state = this.states[stateChange.current];
    		if(stateChange.reason) {
    			this.errorReason = stateChange.reason;
    			this.realtime.connection.errorReason = stateChange.reason;
    		}
    		if(newState.terminal || newState.state === 'suspended') {
    			/* suspended is nonterminal, but once in the suspended state, realtime
    			 * will have discarded our connection state, so futher connection
    			 * attempts should start from scratch */
    			this.clearConnection();
    		}
    		this.emit('connectionstate', stateChange);
    	};

    	/****************************************
    	 * ConnectionManager connection lifecycle
    	 ****************************************/

    	ConnectionManager.prototype.startTransitionTimer = function(transitionState) {
    		Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.startTransitionTimer()', 'transitionState: ' + transitionState.state);

    		if(this.transitionTimer) {
    			Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.startTransitionTimer()', 'clearing already-running timer');
    			clearTimeout(this.transitionTimer);
    		}

    		var self = this;
    		this.transitionTimer = setTimeout(function() {
    			if(self.transitionTimer) {
    				self.transitionTimer = null;
    				Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager ' + transitionState.state + ' timer expired', 'requesting new state: ' + transitionState.failState);
    				self.notifyState({state: transitionState.failState});
    			}
    		}, transitionState.retryDelay);
    	};

    	ConnectionManager.prototype.cancelTransitionTimer = function() {
    		Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.cancelTransitionTimer()', '');
    		if(this.transitionTimer) {
    			clearTimeout(this.transitionTimer);
    			this.transitionTimer = null;
    		}
    	};

    	ConnectionManager.prototype.startSuspendTimer = function() {
    		var self = this;
    		if(this.suspendTimer)
    			return;
    		this.suspendTimer = setTimeout(function() {
    			if(self.suspendTimer) {
    				self.suspendTimer = null;
    				Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager suspend timer expired', 'requesting new state: suspended');
    				self.states.connecting.failState = 'suspended';
    				self.states.connecting.queueEvents = false;
    				self.notifyState({state: 'suspended'});
    			}
    		}, this.connectionStateTtl);
    	};

    	ConnectionManager.prototype.checkSuspendTimer = function(state) {
    		if(state !== 'disconnected' && state !== 'suspended' && state !== 'connecting')
    			this.cancelSuspendTimer();
    	};

    	ConnectionManager.prototype.cancelSuspendTimer = function() {
    		this.states.connecting.failState = 'disconnected';
    		this.states.connecting.queueEvents = true;
    		if(this.suspendTimer) {
    			clearTimeout(this.suspendTimer);
    			this.suspendTimer = null;
    		}
    	};

    	ConnectionManager.prototype.startRetryTimer = function(interval) {
    		var self = this;
    		this.retryTimer = setTimeout(function() {
    			Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager retry timer expired', 'retrying');
    			self.retryTimer = null;
    			self.requestState({state: 'connecting'});
    		}, interval);
    	};

    	ConnectionManager.prototype.cancelRetryTimer = function() {
    		if(this.retryTimer) {
    			clearTimeout(this.retryTimer);
    			this.retryTimer = null;
    		}
    	};

    	ConnectionManager.prototype.notifyState = function(indicated) {
    		var state = indicated.state,
    			self = this;

    		/* We retry immediately if:
    		 * - something disconnects us while we're connected, or
    		 * - a viable (but not yet active) transport fails due to a token error (so
    		 *   this.errorReason will be set, and startConnect will do a forced
    		 *   authorize). If this.errorReason is already set (to a token error),
    		 *   then there has been at least one previous attempt to connect that also
    		 *   failed for a token error, so by RTN14b we go to DISCONNECTED and wait
    		 *   before trying again */
    		var retryImmediately = (state === 'disconnected' &&
    			(this.state === this.states.connected     ||
    			 this.state === this.states.synchronizing ||
    			 indicated.retryImmediately               ||
    				(this.state === this.states.connecting &&
    					indicated.error && Auth.isTokenErr(indicated.error) &&
    					!(this.errorReason && Auth.isTokenErr(this.errorReason)))));

    		Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.notifyState()', 'new state: ' + state + (retryImmediately ? '; will retry connection immediately' : ''));
    		/* do nothing if we're already in the indicated state */
    		if(state == this.state.state)
    			return;

    		/* kill timers (possibly excepting suspend timer depending on the notified
    		* state), as these are superseded by this notification */
    		this.cancelTransitionTimer();
    		this.cancelRetryTimer();
    		this.checkSuspendTimer(indicated.state);

    		/* do nothing if we're unable to move from the current state */
    		if(this.state.terminal)
    			return;

    		/* process new state */
    		var newState = this.states[indicated.state],
    			change = new ConnectionStateChange(this.state.state, newState.state, newState.retryDelay, (indicated.error || ConnectionError[newState.state]));

    		if(retryImmediately) {
    			var autoReconnect = function() {
    				if(self.state === self.states.disconnected) {
    					self.lastAutoReconnectAttempt = Utils.now();
    					self.requestState({state: 'connecting'});
    				}
    			};
    			var sinceLast = this.lastAutoReconnectAttempt && (Utils.now() - this.lastAutoReconnectAttempt + 1);
    			if(sinceLast && (sinceLast < 1000)) {
    				Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.notifyState()', 'Last reconnect attempt was only ' + sinceLast + 'ms ago, waiting another ' + (1000 - sinceLast) + 'ms before trying again');
    				setTimeout(autoReconnect, 1000 - sinceLast);
    			} else {
    				Utils.nextTick(autoReconnect);
    			}
    		} else if(state === 'disconnected' || state === 'suspended') {
    			this.startRetryTimer(newState.retryDelay);
    		}

    		 /* If going into disconnect/suspended (and not retrying immediately), or a
    			* terminal state, ensure there are no orphaned transports hanging around. */
    		if((state === 'disconnected' && !retryImmediately) ||
    			 (state === 'suspended') ||
    			 newState.terminal) {
    				 /* Wait till the next tick so the connection state change is enacted,
    				 * so aborting transports doesn't trigger redundant state changes */
    				 Utils.nextTick(function() {
    					 self.disconnectAllTransports();
    				 });
    		 }

    		if(state == 'connected' && !this.activeProtocol) {
    			Logger.logAction(Logger.LOG_ERROR, 'ConnectionManager.notifyState()', 'Broken invariant: attempted to go into connected state, but there is no active protocol');
    		}

    		/* implement the change and notify */
    		this.enactStateChange(change);
    		if(this.state.sendEvents) {
    			this.sendQueuedMessages();
    		} else if(!this.state.queueEvents) {
    			this.realtime.channels.propogateConnectionInterruption(state, change.reason);
    			this.failQueuedMessages(change.reason); // RTN7c
    		}
    	};

    	ConnectionManager.prototype.requestState = function(request) {
    		var state = request.state, self = this;
    		Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.requestState()', 'requested state: ' + state + '; current state: ' + this.state.state);
    		if(state == this.state.state)
    			return; /* silently do nothing */

    		/* kill running timers, as this request supersedes them */
    		this.cancelTransitionTimer();
    		this.cancelRetryTimer();
    		/* for suspend timer check rather than cancel -- eg requesting a connecting
    		* state should not reset the suspend timer */
    		this.checkSuspendTimer(state);

    		if(state == 'connecting' && this.state.state == 'connected') return;
    		if(state == 'closing' && this.state.state == 'closed') return;

    		var newState = this.states[state],
    			change = new ConnectionStateChange(this.state.state, newState.state, null, (request.error || ConnectionError[newState.state]));

    		this.enactStateChange(change);

    		if(state == 'connecting') {
    			Utils.nextTick(function() { self.startConnect(); });
    		}
    		if(state == 'closing') {
    			this.closeImpl();
    		}
    	};


    	ConnectionManager.prototype.startConnect = function() {
    		if(this.state !== this.states.connecting) {
    			Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.startConnect()', 'Must be in connecting state to connect, but was ' + this.state.state);
    			return;
    		}

    		var auth = this.realtime.auth,
    			self = this;

    		/* The point of the connectCounter mechanism is to ensure that the
    		 * connection procedure can be cancelled. We want disconnectAllTransports
    		 * to be able to stop any in-progress connection, even before it gets to
    		 * the stage of having a pending (or even a proposed) transport that it can
    		 * dispose() of. So we check that it's still current after any async stage,
    		 * up until the stage that is synchronous with instantiating a transport */
    		var connectCount = ++this.connectCounter;

    		var connect = function() {
    			self.checkConnectionStateFreshness();
    			self.getTransportParams(function(transportParams) {
    				if(connectCount !== self.connectCounter) {
    					return;
    				}
    				self.connectImpl(transportParams, connectCount);
    			});
    		};

    		Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.startConnect()', 'starting connection');
    		this.startSuspendTimer();
    		this.startTransitionTimer(this.states.connecting);

    		if(auth.method === 'basic') {
    			connect();
    		} else {
    			var authCb = function(err) {
    				if(connectCount !== self.connectCounter) {
    					return;
    				}
    				if(err) {
    					self.actOnErrorFromAuthorize(err);
    				} else {
    					connect();
    				}
    			};
    			if(this.errorReason && Auth.isTokenErr(this.errorReason)) {
    				/* Force a refetch of a new token */
    				auth._forceNewToken(null, null, authCb);
    			} else {
    				auth._ensureValidAuthCredentials(false, authCb);
    			}
    		}
    	};

    	/**
    	 * There are three stages in connecting:
    	 * - preference: if there is a cached transport preference, we try to connect
    	 *   on that. If that fails or times out we abort the attempt, remove the
    	 *   preference and fall back to base. If it succeeds, we try upgrading it if
    	 *   needed (will only be in the case where the preference is xhrs and the
    	 *   browser supports ws).
    	 * - base: we try to connect with the best transport that we think will
    	 *   never fail for this browser (usually this is xhr_polling; for very old
    	 *   browsers will be jsonp, for node will be comet). If it doesn't work, we
    	 *   try fallback hosts.
    	 * - upgrade: given a connected transport, we see if there are any better
    	 *   ones, and if so, try to upgrade to them.
    	 *
    	 * connectImpl works out what stage you're at (which is purely a function of
    	 * the current connection state and whether there are any stored preferences),
    	 * and dispatches accordingly. After a transport has been set pending,
    	 * tryATransport calls connectImpl to see if there's another stage to be done.
    	 * */
    	ConnectionManager.prototype.connectImpl = function(transportParams, connectCount) {
    		var state = this.state.state;

    		if(state !== this.states.connecting.state && state !== this.states.connected.state) {
    			/* Only keep trying as long as in the 'connecting' state (or 'connected'
    			 * for upgrading). Any operation can put us into 'disconnected' to cancel
    			 * connection attempts and wait before retrying, or 'failed' to fail. */
    			Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.connectImpl()', 'Must be in connecting state to connect (or connected to upgrade), but was ' + state);
    		} else if(this.pendingTransports.length) {
    			Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.connectImpl()', 'Transports ' + this.pendingTransports[0].toString() + ' currently pending; taking no action');
    		} else if(state == this.states.connected.state) {
    			this.upgradeIfNeeded(transportParams);
    		} else if(this.transports.length > 1 && this.getTransportPreference()) {
    			this.connectPreference(transportParams);
    		} else {
    			this.connectBase(transportParams, connectCount);
    		}
    	};


    	ConnectionManager.prototype.connectPreference = function(transportParams) {
    		var preference = this.getTransportPreference(),
    			self = this,
    			preferenceTimeoutExpired = false;

    		if(!Utils.arrIn(this.transports, preference)) {
    			this.unpersistTransportPreference();
    			this.connectImpl(transportParams);
    		}

    		Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.connectPreference()', 'Trying to connect with stored transport preference ' + preference);

    		var preferenceTimeout = setTimeout(function() {
    			preferenceTimeoutExpired = true;
    			if(!(self.state.state === self.states.connected.state)) {
    				Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.connectPreference()', 'Shortcircuit connection attempt with ' + preference + ' failed; clearing preference and trying from scratch');
    				/* Abort all connection attempts. (This also disconnects the active
    				 * protocol, but none exists if we're not in the connected state) */
    				self.disconnectAllTransports();
    				/* Be quite agressive about clearing the stored preference if ever it doesn't work */
    				self.unpersistTransportPreference();
    			}
    			self.connectImpl(transportParams);
    		}, this.options.timeouts.preferenceConnectTimeout);

    		/* For connectPreference, just use the main host. If host fallback is needed, do it in connectBase.
    		 * The wstransport it will substitute the httphost for an appropriate wshost */
    		transportParams.host = self.httpHosts[0];
    		self.tryATransport(transportParams, preference, function(fatal, transport) {
    			clearTimeout(preferenceTimeout);
    			if(preferenceTimeoutExpired && transport) {
    				/* Viable, but too late - connectImpl() will already be trying
    				* connectBase, and we weren't in upgrade mode. Just remove the
    				* onconnected listener and get rid of it */
    				transport.off();
    				transport.disconnect();
    				Utils.arrDeleteValue(this.pendingTransports, transport);
    			} else if(!transport && !fatal) {
    				/* Preference failed in a transport-specific way. Try more */
    				self.unpersistTransportPreference();
    				self.connectImpl(transportParams);
    			}
    			/* If suceeded, or failed fatally, nothing to do */
    		});
    	};


    	/**
    	 * Try to establish a transport on the base transport (the best transport
    	 * such that if it doesn't work, nothing will work) as determined through
    	 * static feature detection, checking for network connectivity and trying
    	 * fallback hosts if applicable.
    	 * @param transportParams
    	 */
    	ConnectionManager.prototype.connectBase = function(transportParams, connectCount) {
    		var self = this,
    			giveUp = function(err) {
    				self.notifyState({state: self.states.connecting.failState, error: err});
    			},
    			candidateHosts = this.httpHosts.slice(),
    			hostAttemptCb = function(fatal, transport) {
    				if(connectCount !== self.connectCounter) {
    					return;
    				}
    				if(!transport && !fatal) {
    					tryFallbackHosts();
    				}
    			};

    		Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.connectBase()', 'Trying to connect with base transport ' + this.baseTransport);

    		/* first try to establish a connection with the priority host with http transport */
    		var host = candidateHosts.shift();
    		if(!host) {
    			giveUp(new ErrorInfo('Unable to connect (no available host)', 80003, 404));
    			return;
    		}
    		transportParams.host = host;

    		/* this is what we'll be doing if the attempt for the main host fails */
    		function tryFallbackHosts() {
    			/* if there aren't any fallback hosts, fail */
    			if(!candidateHosts.length) {
    				giveUp(new ErrorInfo('Unable to connect (and no more fallback hosts to try)', 80003, 404));
    				return;
    			}
    			/* before trying any fallback (or any remaining fallback) we decide if
    			 * there is a problem with the ably host, or there is a general connectivity
    			 * problem */
    			Http.checkConnectivity(function(err, connectivity) {
    				if(connectCount !== self.connectCounter) {
    					return;
    				}
    				/* we know err won't happen but handle it here anyway */
    				if(err) {
    					giveUp(err);
    					return;
    				}
    				if(!connectivity) {
    					/* the internet isn't reachable, so don't try the fallback hosts */
    					giveUp(new ErrorInfo('Unable to connect (network unreachable)', 80003, 404));
    					return;
    				}
    				/* the network is there, so there's a problem with the main host, or
    				 * its dns. Try the fallback hosts. We could try them simultaneously but
    				 * that would potentially cause a huge spike in load on the load balancer */
    				transportParams.host = Utils.arrPopRandomElement(candidateHosts);
    				self.tryATransport(transportParams, self.baseTransport, hostAttemptCb);
    			});
    		}

    		if(this.forceFallbackHost && candidateHosts.length) {
    			this.forceFallbackHost = false;
    			tryFallbackHosts();
    			return;
    		}

    		this.tryATransport(transportParams, this.baseTransport, hostAttemptCb);
    	};


    	ConnectionManager.prototype.getUpgradePossibilities = function() {
    		/* returns the subset of upgradeTransports to the right of the current
    		 * transport in upgradeTransports (if it's in there - if not, currentPosition
    		 * will be -1, so return upgradeTransports.slice(0) == upgradeTransports */
    		var current = this.activeProtocol.getTransport().shortName;
    		var currentPosition = Utils.arrIndexOf(this.upgradeTransports, current);
    		return this.upgradeTransports.slice(currentPosition + 1);
    	};


    	ConnectionManager.prototype.upgradeIfNeeded = function(transportParams) {
    		var upgradePossibilities = this.getUpgradePossibilities(),
    			self = this;
    		Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.upgradeIfNeeded()', 'upgrade possibilities: ' + Utils.inspect(upgradePossibilities));

    		if(!upgradePossibilities.length) {
    			return;
    		}

    		Utils.arrForEach(upgradePossibilities, function(upgradeTransport) {
    			/* Note: the transport may mutate the params, so give each transport a fresh one */
    			var upgradeTransportParams = self.createTransportParams(transportParams.host, 'upgrade');
    			self.tryATransport(upgradeTransportParams, upgradeTransport, noop);
    		});
    	};


    	ConnectionManager.prototype.closeImpl = function() {
    		Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.closeImpl()', 'closing connection');
    		this.cancelSuspendTimer();
    		this.startTransitionTimer(this.states.closing);

    		Utils.safeArrForEach(this.pendingTransports, function(transport) {
    			Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.closeImpl()', 'Closing pending transport: ' + transport);
    			if(transport) transport.close();
    		});

    		Utils.safeArrForEach(this.proposedTransports, function(transport) {
    			Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.closeImpl()', 'Disposing of proposed transport: ' + transport);
    			if(transport) transport.dispose();
    		});

    		if(this.activeProtocol) {
    			Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.closeImpl()', 'Closing active transport: ' + this.activeProtocol.getTransport());
    			this.activeProtocol.getTransport().close();
    		}

    		/* If there was an active transport, this will probably be
    		 * preempted by the notifyState call in deactivateTransport */
    		this.notifyState({state: 'closed'});
    	};

    	ConnectionManager.prototype.onAuthUpdated = function(tokenDetails, callback) {
    		var self = this;
    		switch(this.state.state) {
    			case 'connected':
    				Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.onAuthUpdated()', 'Sending AUTH message on active transport');
    				/* If there are any proposed/pending transports (eg an upgrade that
    				 * isn't yet scheduled for activation) that hasn't yet started syncing,
    				 * just to get rid of them & restart the upgrade with the new token, to
    				 * avoid a race condition. (If it has started syncing, the AUTH will be
    				 * queued until the upgrade is complete, so everything's fine) */
    				if((this.pendingTransports.length || this.proposedTransports.length) &&
    					self.state !== self.states.synchronizing) {
    					this.disconnectAllTransports(/* exceptActive: */true);
    					var transportParams = this.activeProtocol.getTransport().params;
    					Utils.nextTick(function() {
    						if(self.state.state === 'connected') {
    							self.upgradeIfNeeded(transportParams);
    						}
    					});
    				}

    				/* Do any transport-specific new-token action */
    				this.activeProtocol.getTransport().onAuthUpdated(tokenDetails);

    				var authMsg = ProtocolMessage.fromValues({
    					action: actions.AUTH,
    					auth: {
    						accessToken: tokenDetails.token
    					}
    				});
    				this.send(authMsg);

    				/* The answer will come back as either a connectiondetails event
    				 * (realtime sends a CONNECTED to asknowledge the reauth) or a
    				 * statechange to failed */
    				var successListener = function() {
    					self.off(failureListener);
    					callback(null, tokenDetails);
    				};
    				var failureListener = function(stateChange) {
    					if(stateChange.current === 'failed') {
    						self.off(successListener);
    						self.off(failureListener);
    						callback(stateChange.reason || self.getStateError());
    					}
    				};
    				this.once('connectiondetails', successListener);
    				this.on('connectionstate', failureListener);
    				break;

    			case 'connecting':
    				Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.onAuthUpdated()',
    					'Aborting current connection attempts in order to start again with the new auth details');
    				this.disconnectAllTransports();
    				/* fallthrough to add statechange listener */

    			default:
    				Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.onAuthUpdated()',
    					'Connection state is ' + this.state.state + '; waiting until either connected or failed');
    				var listener = function(stateChange) {
    					switch(stateChange.current) {
    						case 'connected':
    							self.off(listener);
    							callback(null, tokenDetails);
    							break;
    						case 'failed':
    						case 'closed':
    						case 'suspended':
    							self.off(listener);
    							callback(stateChange.reason || self.getStateError());
    							break;
    						default:
    							/* ignore till we get either connected or failed */
    							break;
    					}
    				};
    				self.on('connectionstate', listener);
    				if(this.state.state === 'connecting') {
    					/* can happen if in the connecting state but no transport was pending
    					 * yet, so disconnectAllTransports did not trigger a disconnected state */
    					self.startConnect();
    				} else {
    					self.requestState({state: 'connecting'});
    				}
    		}
    	};

    	ConnectionManager.prototype.disconnectAllTransports = function(exceptActive) {
    		Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.disconnectAllTransports()', 'Disconnecting all transports' + (exceptActive ? ' except the active transport' : ''));

    		/* This will prevent any connection procedure in an async part of one of its early stages from continuing */
    		this.connectCounter++;

    		Utils.safeArrForEach(this.pendingTransports, function(transport) {
    			Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.disconnectAllTransports()', 'Disconnecting pending transport: ' + transport);
    			if(transport) transport.disconnect();
    		});
    		this.pendingTransports = [];

    		Utils.safeArrForEach(this.proposedTransports, function(transport) {
    			Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.disconnectAllTransports()', 'Disposing of proposed transport: ' + transport);
    			if(transport) transport.dispose();
    		});
    		this.proposedTransports = [];

    		if(this.activeProtocol && !exceptActive) {
    			Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.disconnectAllTransports()', 'Disconnecting active transport: ' + this.activeProtocol.getTransport());
    			this.activeProtocol.getTransport().disconnect();
    		}
    		/* No need to notify state disconnected; disconnecting the active transport
    		 * will have that effect */
    	};

    	/******************
    	 * event queueing
    	 ******************/

    	ConnectionManager.prototype.send = function(msg, queueEvent, callback) {
    		callback = callback || noop;
    		var state = this.state;

    		if(state.sendEvents) {
    			Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.send()', 'sending event');
    			this.sendImpl(new PendingMessage(msg, callback));
    			return;
    		}
    		var shouldQueue = (queueEvent && state.queueEvents) || state.forceQueueEvents;
    		if(!shouldQueue) {
    			var err = 'rejecting event, queueEvent was ' + queueEvent + ', state was ' + state.state;
    			Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.send()', err);
    			callback(this.errorReason || new ErrorInfo(err, 90000, 400));
    			return;
    		}
    		if(Logger.shouldLog(Logger.LOG_MICRO)) {
    			Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.send()', 'queueing msg; ' + ProtocolMessage.stringify(msg));
    		}
    		this.queue(msg, callback);
    	};

    	ConnectionManager.prototype.sendImpl = function(pendingMessage) {
    		var msg = pendingMessage.message;
    		/* If have already attempted to send this, resend with the same msgSerial,
    		 * so Ably can dedup if the previous send succeeded */
    		if(pendingMessage.ackRequired && !pendingMessage.sendAttempted) {
    			msg.msgSerial = this.msgSerial++;
    			this.setRecoveryKey();
    		}
    		try {
    			this.activeProtocol.send(pendingMessage);
    		} catch(e) {
    			Logger.logAction(Logger.LOG_ERROR, 'ConnectionManager.sendImpl()', 'Unexpected exception in transport.send(): ' + e.stack);
    		}
    	};

    	function bundleWith(dest, src, maxSize) {
    		var action;
    		if(dest.channel !== src.channel) {
    			/* RTL6d3 */
    			return false;
    		}
    		if((action = dest.action) !== actions.PRESENCE && action !== actions.MESSAGE) {
    			/* RTL6d - can only bundle messages or presence */
    			return false;
    		}
    		if(action !== src.action) {
    			/* RTL6d4 */
    			return false;
    		}
    		var kind = (action === actions.PRESENCE) ? 'presence' : 'messages',
    			proposed = dest[kind].concat(src[kind]),
    			size = Message.getMessagesSize(proposed);
    		if(size > maxSize) {
    			/* RTL6d1 */
    			return false;
    		}
    		if(!Utils.allSame(proposed, 'clientId')) {
    			/* RTL6d2 */
    			return false;
    		}
    		/* we're good to go! */
    		dest[kind] = proposed;
    		return true;
    	}
    	ConnectionManager.prototype.queue = function(msg, callback) {
    		Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.queue()', 'queueing event');
    		var lastQueued = this.queuedMessages.last();
    		var maxSize = this.options.maxMessageSize;
    		/* If have already attempted to send a message, don't merge more messages
    		 * into it, as if the previous send actually succeeded and realtime ignores
    		 * the dup, they'll be lost */
    		if(lastQueued && !lastQueued.sendAttempted && bundleWith(lastQueued.message, msg, maxSize)) {
    			if(!lastQueued.merged) {
    				lastQueued.callback = Multicaster([lastQueued.callback]);
    				lastQueued.merged = true;
    			}
    			lastQueued.callback.push(callback);
    		} else {
    			this.queuedMessages.push(new PendingMessage(msg, callback));
    		}
    	};

    	ConnectionManager.prototype.sendQueuedMessages = function() {
    		Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.sendQueuedMessages()', 'sending ' + this.queuedMessages.count() + ' queued messages');
    		var pendingMessage;
    		while(pendingMessage = this.queuedMessages.shift())
    			this.sendImpl(pendingMessage);
    	};

    	ConnectionManager.prototype.queuePendingMessages = function(pendingMessages) {
    		if(pendingMessages && pendingMessages.length) {
    			Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.queuePendingMessages()', 'queueing ' + pendingMessages.length + ' pending messages');
    			this.queuedMessages.prepend(pendingMessages);
    		}
    	};

    	ConnectionManager.prototype.failQueuedMessages = function(err) {
    		var numQueued = this.queuedMessages.count();
    		if(numQueued > 0) {
    			Logger.logAction(Logger.LOG_ERROR, 'ConnectionManager.failQueuedMessages()', 'failing ' + numQueued + ' queued messages, err = ' + Utils.inspectError(err));
    			this.queuedMessages.completeAllMessages(err);
    		}
    	};

    	ConnectionManager.prototype.onChannelMessage = function(message, transport) {
    		var onActiveTransport = this.activeProtocol && transport === this.activeProtocol.getTransport(),
    			onUpgradeTransport = Utils.arrIn(this.pendingTransports, transport) && this.state == this.states.synchronizing,
    			notControlMsg = message.action === actions.MESSAGE || message.action === actions.PRESENCE;

    		/* As the lib now has a period where the upgrade transport is synced but
    		 * before it's become active (while waiting for the old one to become
    		 * idle), message can validly arrive on it even though it isn't active */
    		if(onActiveTransport || onUpgradeTransport) {
    			if(notControlMsg) {
    				var suppressed = this.setConnectionSerial(message);
    				if(suppressed) {
    					return;
    				}
    				if(ProtocolMessage.isDuplicate(message, this.mostRecentMsg)) {
    					Logger.logAction(Logger.LOG_ERROR, 'ConnectionManager.onChannelMessage()', 'received message with different connectionSerial, but same message id as a previous; discarding; id = ' + message.id);
    					return;
    				}
    				this.mostRecentMsg = message;
    			}
    			this.realtime.channels.onChannelMessage(message);
    		} else {
    			// Message came in on a defunct transport. Allow only acks, nacks, & errors for outstanding
    			// messages,  no new messages (as sync has been sent on new transport so new messages will
    			// be resent there, or connection has been closed so don't want new messages)
    			if(Utils.arrIndexOf([actions.ACK, actions.NACK, actions.ERROR], message.action) > -1) {
    				this.realtime.channels.onChannelMessage(message);
    			} else {
    				Logger.logAction(Logger.LOG_MICRO, 'ConnectionManager.onChannelMessage()', 'received message ' + JSON.stringify(message) + 'on defunct transport; discarding');
    			}
    		}
    	};

    	ConnectionManager.prototype.ping = function(transport, callback) {
    		/* if transport is specified, try that */
    		if(transport) {
    			Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.ping()', 'transport = ' + transport);

    			var onTimeout = function () {
    				transport.off('heartbeat', onHeartbeat);
    				callback(new ErrorInfo('Timeout waiting for heartbeat response', 50000, 500));
    			};

    			var pingStart = Utils.now(),
    				id = Utils.cheapRandStr();

    			var onHeartbeat = function (responseId) {
    				if(responseId === id) {
    					transport.off('heartbeat', onHeartbeat);
    					clearTimeout(timer);
    					var responseTime = Utils.now() - pingStart;
    					callback(null, responseTime);
    				}
    			};

    			var timer = setTimeout(onTimeout, this.options.timeouts.realtimeRequestTimeout);

    			transport.on('heartbeat', onHeartbeat);
    			transport.ping(id);
    			return;
    		}

    		/* if we're not connected, don't attempt */
    		if(this.state.state !== 'connected') {
    			callback(new ErrorInfo('Unable to ping service; not connected', 40000, 400));
    			return;
    		}

    		/* no transport was specified, so use the current (connected) one
    		 * but ensure that we retry if the transport is superseded before we complete */
    		var completed = false, self = this;

    		var onPingComplete = function(err, responseTime) {
    			self.off('transport.active', onTransportActive);
    			if(!completed) {
    				completed = true;
    				callback(err, responseTime);
    			}
    		};

    		var onTransportActive = function() {
    			if(!completed) {
    				/* ensure that no callback happens for the currently outstanding operation */
    				completed = true;
    				/* repeat but picking up the new transport */
    				Utils.nextTick(function() {
    					self.ping(null, callback);
    				});
    			}
    		};

    		this.on('transport.active', onTransportActive);
    		this.ping(this.activeProtocol.getTransport(), onPingComplete);
    	};

    	ConnectionManager.prototype.abort = function(error) {
    		this.activeProtocol.getTransport().fail(error);
    	};

    	ConnectionManager.prototype.registerProposedTransport = function(transport) {
    		this.proposedTransports.push(transport);
    	};

    	ConnectionManager.prototype.getTransportPreference = function() {
    		return this.transportPreference || (haveWebStorage && WebStorage.get(transportPreferenceName));
    	};

    	ConnectionManager.prototype.persistTransportPreference = function(transport) {
    		if(Utils.arrIn(Defaults.upgradeTransports, transport.shortName)) {
    			this.transportPreference = transport.shortName;
    			if(haveWebStorage) {
    				WebStorage.set(transportPreferenceName, transport.shortName);
    			}
    		}
    	};

    	ConnectionManager.prototype.unpersistTransportPreference = function() {
    		this.transportPreference = null;
    		if(haveWebStorage) {
    			WebStorage.remove(transportPreferenceName);
    		}
    	};

    	/* This method is only used during connection attempts, so implements RSA4c1,
    	 * RSA4c2, and RSA4d. In particular it is not invoked for
    	 * serverside-triggered reauths or manual reauths, so RSA4c3 does not apply */
    	ConnectionManager.prototype.actOnErrorFromAuthorize = function(err) {
    		if(err.code === 40171) {
    			/* No way to reauth */
    			this.notifyState({state: 'failed', error: err});
    		} else if(err.statusCode === 403) {
    			var msg = 'Client configured authentication provider returned 403; failing the connection';
    			Logger.logAction(Logger.LOG_ERROR, 'ConnectionManager.actOnErrorFromAuthorize()', msg);
    			this.notifyState({state: 'failed', error: new ErrorInfo(msg, 80019, 403, err)});
    		} else {
    			var msg = 'Client configured authentication provider request failed';
    			Logger.logAction(Logger.LOG_MINOR, 'ConnectionManager.actOnErrorFromAuthorize', msg);
    			this.notifyState({state: this.state.failState, error: new ErrorInfo(msg, 80019, 401, err)});
    		}
    	};

    	ConnectionManager.prototype.onConnectionDetailsUpdate = function(connectionDetails, transport) {
    		if(!connectionDetails) {
    			return;
    		}
    		this.connectionDetails = connectionDetails;
    		this.options.maxMessageSize = connectionDetails.maxMessageSize;
    		var clientId = connectionDetails.clientId;
    		if(clientId) {
    			var err = this.realtime.auth._uncheckedSetClientId(clientId);
    			if(err) {
    				Logger.logAction(Logger.LOG_ERROR, 'ConnectionManager.onConnectionDetailsUpdate()', err.message);
    				/* Errors setting the clientId are fatal to the connection */
    				transport.fail(err);
    				return;
    			}
    		}
    		var connectionStateTtl = connectionDetails.connectionStateTtl;
    		if(connectionStateTtl) {
    			this.connectionStateTtl = connectionStateTtl;
    		}
    		this.maxIdleInterval = connectionDetails.maxIdleInterval;
    		this.emit('connectiondetails', connectionDetails);
    	};

    	return ConnectionManager;
    })();

    var Transport = (function() {
    	var actions = ProtocolMessage.Action;
    	var closeMessage = ProtocolMessage.fromValues({action: actions.CLOSE});
    	var disconnectMessage = ProtocolMessage.fromValues({action: actions.DISCONNECT});

    	/*
    	 * EventEmitter, generates the following events:
    	 *
    	 * event name       data
    	 * closed           error
    	 * failed           error
    	 * disposed
    	 * connected        null error, connectionSerial, connectionId, connectionDetails
    	 * sync             connectionSerial, connectionId
    	 * event            channel message object
    	 */

    	/* public constructor */
    	function Transport(connectionManager, auth, params) {
    		EventEmitter.call(this);
    		this.connectionManager = connectionManager;
    		connectionManager.registerProposedTransport(this);
    		this.auth = auth;
    		this.params = params;
    		this.timeouts = params.options.timeouts;
    		this.format = params.format;
    		this.isConnected = false;
    		this.isFinished = false;
    		this.isDisposed = false;
    		this.maxIdleInterval = null;
    		this.idleTimer = null;
    		this.lastActivity = null;
    	}
    	Utils.inherits(Transport, EventEmitter);

    	Transport.prototype.connect = function() {};

    	Transport.prototype.close = function() {
    		if(this.isConnected) {
    			this.requestClose();
    		}
    		this.finish('closed', ConnectionError.closed);
    	};

    	Transport.prototype.disconnect = function(err) {
    		/* Used for network/transport issues that need to result in the transport
    		 * being disconnected, but should not affect the connection */
    		if(this.isConnected) {
    			this.requestDisconnect();
    		}
    		this.finish('disconnected', err || ConnectionError.disconnected);
    	};

    	Transport.prototype.fail = function(err) {
    		/* Used for client-side-detected fatal connection issues */
    		if(this.isConnected) {
    			this.requestDisconnect();
    		}
    		this.finish('failed', err || ConnectionError.failed);
    	};

    	Transport.prototype.finish = function(event, err) {
    		if(this.isFinished) {
    			return;
    		}

    		this.isFinished = true;
    		this.isConnected = false;
    		this.maxIdleInterval = null;
    		clearTimeout(this.idleTimer);
    		this.idleTimer = null;
    		this.emit(event, err);
    		this.dispose();
    	};

    	Transport.prototype.onProtocolMessage = function(message) {
    		if (Logger.shouldLog(Logger.LOG_MICRO)) {
    			Logger.logAction(Logger.LOG_MICRO, 'Transport.onProtocolMessage()', 'received on ' + this.shortName + ': ' + ProtocolMessage.stringify(message) + '; connectionId = ' + this.connectionManager.connectionId);
    		}
    		this.onActivity();

    		switch(message.action) {
    		case actions.HEARTBEAT:
    			Logger.logAction(Logger.LOG_MICRO, 'Transport.onProtocolMessage()', this.shortName + ' heartbeat; connectionId = ' + this.connectionManager.connectionId);
    			this.emit('heartbeat', message.id);
    			break;
    		case actions.CONNECTED:
    			this.onConnect(message);
    			this.emit('connected', message.error, message.connectionId, message.connectionDetails, message);
    			break;
    		case actions.CLOSED:
    			this.onClose(message);
    			break;
    		case actions.DISCONNECTED:
    			this.onDisconnect(message);
    			break;
    		case actions.ACK:
    			this.emit('ack', message.msgSerial, message.count);
    			break;
    		case actions.NACK:
    			this.emit('nack', message.msgSerial, message.count, message.error);
    			break;
    		case actions.SYNC:
    			if(message.connectionId !== undefined) {
    				/* a transport SYNC */
    				this.emit('sync', message.connectionId, message);
    				break;
    			}
    			/* otherwise it's a channel SYNC, so handle it in the channel */
    			this.connectionManager.onChannelMessage(message, this);
    			break;
    		case actions.AUTH:
    			this.auth.authorize(function(err) {
    				if(err) {
    					Logger.logAction(Logger.LOG_ERROR, 'Transport.onProtocolMessage()', 'Ably requested re-authentication, but unable to obtain a new token: ' + Utils.inspectError(err));
    				}
    			});
    			break;
    		case actions.ERROR:
    			Logger.logAction(Logger.LOG_MINOR, 'Transport.onProtocolMessage()', 'received error action; connectionId = ' + this.connectionManager.connectionId + '; err = ' + Utils.inspect(message.error) + (message.channel ? (', channel: ' +  message.channel) : ''));
    			if(message.channel === undefined) {
    				this.onFatalError(message);
    				break;
    			}
    			/* otherwise it's a channel-specific error, so handle it in the channel */
    			this.connectionManager.onChannelMessage(message, this);
    			break;
    		default:
    			/* all other actions are channel-specific */
    			this.connectionManager.onChannelMessage(message, this);
    		}
    	};

    	Transport.prototype.onConnect = function(message) {
    		this.isConnected = true;
    		var maxPromisedIdle = message.connectionDetails.maxIdleInterval;
    		if(maxPromisedIdle) {
    			this.maxIdleInterval = maxPromisedIdle + this.timeouts.realtimeRequestTimeout;
    			this.onActivity();
    		}
    		/* else Realtime declines to guarantee any maximum idle interval - CD2h */
    	};

    	Transport.prototype.onDisconnect = function(message) {
    		/* Used for when the server has disconnected the client (usually with a
    		 * DISCONNECTED action) */
    		var err = message && message.error;
    		Logger.logAction(Logger.LOG_MINOR, 'Transport.onDisconnect()', 'err = ' + Utils.inspectError(err));
    		this.finish('disconnected', err);
    	};

    	Transport.prototype.onFatalError = function(message) {
    		/* On receipt of a fatal connection error, we can assume that the server
    		 * will close the connection and the transport, and do not need to request
    		 * a disconnection - RTN15i */
    		var err = message && message.error;
    		Logger.logAction(Logger.LOG_MINOR, 'Transport.onFatalError()', 'err = ' + Utils.inspectError(err));
    		this.finish('failed', err);
    	};

    	Transport.prototype.onClose = function(message) {
    		var err = message && message.error;
    		Logger.logAction(Logger.LOG_MINOR, 'Transport.onClose()', 'err = ' + Utils.inspectError(err));
    		this.finish('closed', err);
    	};

    	Transport.prototype.requestClose = function() {
    		Logger.logAction(Logger.LOG_MINOR, 'Transport.requestClose()', '');
    		this.send(closeMessage);
    	};

    	Transport.prototype.requestDisconnect = function() {
    		Logger.logAction(Logger.LOG_MINOR, 'Transport.requestDisconnect()', '');
    		this.send(disconnectMessage);
    	};

    	Transport.prototype.ping = function(id) {
    		var msg = {action: ProtocolMessage.Action.HEARTBEAT};
    		if(id) msg.id = id;
    		this.send(ProtocolMessage.fromValues(msg));
    	};

    	Transport.prototype.dispose = function() {
    		Logger.logAction(Logger.LOG_MINOR, 'Transport.dispose()', '');
    		this.isDisposed = true;
    		this.off();
    	};

    	Transport.prototype.onActivity = function() {
    		if(!this.maxIdleInterval) { return; }
    		this.lastActivity = this.connectionManager.lastActivity = Utils.now();
    		this.setIdleTimer(this.maxIdleInterval + 100);
    	};

    	Transport.prototype.setIdleTimer = function(timeout) {
    		var self = this;
    		if(!this.idleTimer) {
    			this.idleTimer = setTimeout(function() {
    				self.onIdleTimerExpire();
    			}, timeout);
    		}
    	};

    	Transport.prototype.onIdleTimerExpire = function() {
    		this.idleTimer = null;
    		var sinceLast = Utils.now() - this.lastActivity,
    			timeRemaining = this.maxIdleInterval - sinceLast;
    		if(timeRemaining <= 0) {
    			var msg = 'No activity seen from realtime in ' + sinceLast + 'ms; assuming connection has dropped';
    			Logger.logAction(Logger.LOG_ERROR, 'Transport.onIdleTimerExpire()', msg);
    			this.disconnect(new ErrorInfo(msg, 80003, 408));
    		} else {
    			this.setIdleTimer(timeRemaining + 100);
    		}
    	};

    	Transport.prototype.onAuthUpdated = function() {};

    	return Transport;
    })();

    var WebSocketTransport = (function() {
    	var WebSocket = Platform.WebSocket;
    	var shortName = 'web_socket';

    	/* public constructor */
    	function WebSocketTransport(connectionManager, auth, params) {
    		this.shortName = shortName;
    		/* If is a browser, can't detect pings, so request protocol heartbeats */
    		params.heartbeats = Platform.useProtocolHeartbeats;
    		Transport.call(this, connectionManager, auth, params);
    		this.wsHost = Defaults.getHost(params.options, params.host, true);
    	}
    	Utils.inherits(WebSocketTransport, Transport);

    	WebSocketTransport.isAvailable = function() {
    		return !!WebSocket;
    	};

    	if(WebSocketTransport.isAvailable())
    		ConnectionManager.supportedTransports[shortName] = WebSocketTransport;

    	WebSocketTransport.tryConnect = function(connectionManager, auth, params, callback) {
    		var transport = new WebSocketTransport(connectionManager, auth, params);
    		var errorCb = function(err) { callback({event: this.event, error: err}); };
    		transport.on(['failed', 'disconnected'], errorCb);
    		transport.on('wsopen', function() {
    			Logger.logAction(Logger.LOG_MINOR, 'WebSocketTransport.tryConnect()', 'viable transport ' + transport);
    			transport.off(['failed', 'disconnected'], errorCb);
    			callback(null, transport);
    		});
    		transport.connect();
    	};

    	WebSocketTransport.prototype.createWebSocket = function(uri, connectParams) {
    		var paramCount = 0;
    		if(connectParams) {
    			for(var key in connectParams)
    				uri += (paramCount++ ? '&' : '?') + key + '=' + connectParams[key];
    		}
    		this.uri = uri;
    		return new WebSocket(uri);
    	};

    	WebSocketTransport.prototype.toString = function() {
    		return 'WebSocketTransport; uri=' + this.uri;
    	};

    	WebSocketTransport.prototype.connect = function() {
    		Logger.logAction(Logger.LOG_MINOR, 'WebSocketTransport.connect()', 'starting');
    		Transport.prototype.connect.call(this);
    		var self = this, params = this.params, options = params.options;
    		var wsScheme = options.tls ? 'wss://' : 'ws://';
    		var wsUri = wsScheme + this.wsHost + ':' + Defaults.getPort(options) + '/';
    		Logger.logAction(Logger.LOG_MINOR, 'WebSocketTransport.connect()', 'uri: ' + wsUri);
    		this.auth.getAuthParams(function(err, authParams) {
    			if(self.isDisposed) {
    				return;
    			}
    			var paramStr = ''; for(var param in authParams) paramStr += ' ' + param + ': ' + authParams[param] + ';';
    			Logger.logAction(Logger.LOG_MINOR, 'WebSocketTransport.connect()', 'authParams:' + paramStr + ' err: ' + err);
    			if(err) {
    				self.disconnect(err);
    				return;
    			}
    			var connectParams = params.getConnectParams(authParams);
    			try {
    				var wsConnection = self.wsConnection = self.createWebSocket(wsUri, connectParams);
    				wsConnection.binaryType = Platform.binaryType;
    				wsConnection.onopen = function() { self.onWsOpen(); };
    				wsConnection.onclose = function(ev) { self.onWsClose(ev); };
    				wsConnection.onmessage = function(ev) { self.onWsData(ev.data); };
    				wsConnection.onerror = function(ev) { self.onWsError(ev); };
    				if(wsConnection.on) {
    					/* node; browsers currently don't have a general eventemitter and can't detect
    					 * pings. Also, no need to reply with a pong explicitly, ws lib handles that */
    					wsConnection.on('ping', function() { self.onActivity(); });
    				}
    			} catch(e) {
    				Logger.logAction(Logger.LOG_ERROR, 'WebSocketTransport.connect()', 'Unexpected exception creating websocket: err = ' + (e.stack || e.message));
    				self.disconnect(e);
    			}
    		});
    	};

    	WebSocketTransport.prototype.send = function(message) {
    		var wsConnection = this.wsConnection;
    		if(!wsConnection) {
    			Logger.logAction(Logger.LOG_ERROR, 'WebSocketTransport.send()', 'No socket connection');
    			return;
    		}
    		try {
    			wsConnection.send(ProtocolMessage.serialize(message, this.params.format));
    		} catch (e) {
    			var msg = 'Exception from ws connection when trying to send: ' + Utils.inspectError(e);
    			Logger.logAction(Logger.LOG_ERROR, 'WebSocketTransport.send()', msg);
    			/* Don't try to request a disconnect, that'll just involve sending data
    			 * down the websocket again. Just finish the transport. */
    			this.finish('disconnected', new ErrorInfo(msg, 50000, 500));
    		}
    	};

    	WebSocketTransport.prototype.onWsData = function(data) {
    		Logger.logAction(Logger.LOG_MICRO, 'WebSocketTransport.onWsData()', 'data received; length = ' + data.length + '; type = ' + typeof(data));
    		try {
    			this.onProtocolMessage(ProtocolMessage.deserialize(data, this.format));
    		} catch (e) {
    			Logger.logAction(Logger.LOG_ERROR, 'WebSocketTransport.onWsData()', 'Unexpected exception handing channel message: ' + e.stack);
    		}
    	};

    	WebSocketTransport.prototype.onWsOpen = function() {
    		Logger.logAction(Logger.LOG_MINOR, 'WebSocketTransport.onWsOpen()', 'opened WebSocket');
    		this.emit('wsopen');
    	};

    	WebSocketTransport.prototype.onWsClose = function(ev) {
    		var wasClean, code;
    		if(typeof(ev) == 'object') {
    			/* W3C spec-compatible */
    			wasClean = ev.wasClean;
    			code = ev.code;
    		} else /*if(typeof(ev) == 'number')*/ {
    			/* ws in node */
    			code = ev;
    			wasClean = (code == 1000);
    		}
    		delete this.wsConnection;
    		if(wasClean) {
    			Logger.logAction(Logger.LOG_MINOR, 'WebSocketTransport.onWsClose()', 'Cleanly closed WebSocket');
    			var err = new ErrorInfo('Websocket closed', 80003, 400);
    			this.finish('disconnected', err);
    		} else {
    			var msg = 'Unclean disconnection of WebSocket ; code = ' + code,
    				err = new ErrorInfo(msg, 80003, 400);
    			Logger.logAction(Logger.LOG_MINOR, 'WebSocketTransport.onWsClose()', msg);
    			this.finish('disconnected', err);
    		}
    		this.emit('disposed');
    	};

    	WebSocketTransport.prototype.onWsError = function(err) {
    		Logger.logAction(Logger.LOG_MINOR, 'WebSocketTransport.onError()', 'Error from WebSocket: ' + err.message);
    		/* Wait a tick before aborting: if the websocket was connected, this event
    		 * will be immediately followed by an onclose event with a close code. Allow
    		 * that to close it (so we see the close code) rather than anticipating it */
    		var self = this;
    		Utils.nextTick(function() {
    			self.disconnect(err);
    		});
    	};

    	WebSocketTransport.prototype.dispose = function() {
    		Logger.logAction(Logger.LOG_MINOR, 'WebSocketTransport.dispose()', '');
    		this.isDisposed = true;
    		var wsConnection = this.wsConnection;
    		if(wsConnection) {
    			/* Ignore any messages that come through after dispose() is called but before
    			 * websocket is actually closed. (mostly would be harmless, but if it's a
    			 * CONNECTED, it'll re-tick isConnected and cause all sorts of havoc) */
    			wsConnection.onmessage = function() {};
    			delete this.wsConnection;
    			/* defer until the next event loop cycle before closing the socket,
    			 * giving some implementations the opportunity to send any outstanding close message */
    			Utils.nextTick(function() {
    				Logger.logAction(Logger.LOG_MICRO, 'WebSocketTransport.dispose()', 'closing websocket');
    				wsConnection.close();
    			});
    		}
    	};

    	return WebSocketTransport;
    })();

    var CometTransport = (function() {

    	var REQ_SEND = 0,
    		REQ_RECV = 1,
    		REQ_RECV_POLL = 2,
    		REQ_RECV_STREAM = 3;

    	/* TODO: can remove once realtime sends protocol message responses for comet errors */
    	function shouldBeErrorAction(err) {
    		var UNRESOLVABLE_ERROR_CODES = [80015, 80017, 80030];
    		if(err.code) {
    			if(Auth.isTokenErr(err)) return false;
    			if(Utils.arrIn(UNRESOLVABLE_ERROR_CODES, err.code)) return true;
    			return (err.code >= 40000 && err.code < 50000);
    		} else {
    			/* Likely a network or transport error of some kind. Certainly not fatal to the connection */
    			return false;
    		}
    	}

    	function protocolMessageFromRawError(err) {
    		/* err will be either a legacy (non-protocolmessage) comet error response
    		 * (which will have an err.code), or a xhr/network error (which won't). */
    		if(shouldBeErrorAction(err)) {
    			return [ProtocolMessage.fromValues({action: ProtocolMessage.Action.ERROR, error: err})];
    		} else {
    			return [ProtocolMessage.fromValues({action: ProtocolMessage.Action.DISCONNECTED, error: err})];
    		}
    	}

    	/*
    	 * A base comet transport class
    	 */
    	function CometTransport(connectionManager, auth, params) {
    		/* binary not supported for comet, so just fall back to default */
    		params.format = undefined;
    		params.heartbeats = true;
    		Transport.call(this, connectionManager, auth, params);
    		/* streaming defaults to true */
    		this.stream = ('stream' in params) ? params.stream : true;
    		this.sendRequest = null;
    		this.recvRequest = null;
    		this.pendingCallback = null;
    		this.pendingItems = null;
    	}
    	Utils.inherits(CometTransport, Transport);

    	CometTransport.REQ_SEND = REQ_SEND;
    	CometTransport.REQ_RECV = REQ_RECV;
    	CometTransport.REQ_RECV_POLL = REQ_RECV_POLL;
    	CometTransport.REQ_RECV_STREAM = REQ_RECV_STREAM;

    	/* public instance methods */
    	CometTransport.prototype.connect = function() {
    		Logger.logAction(Logger.LOG_MINOR, 'CometTransport.connect()', 'starting');
    		Transport.prototype.connect.call(this);
    		var self = this, params = this.params, options = params.options;
    		var host = Defaults.getHost(options, params.host);
    		var port = Defaults.getPort(options);
    		var cometScheme = options.tls ? 'https://' : 'http://';

    		this.baseUri = cometScheme + host + ':' + port + '/comet/';
    		var connectUri = this.baseUri + 'connect';
    		Logger.logAction(Logger.LOG_MINOR, 'CometTransport.connect()', 'uri: ' + connectUri);
    		this.auth.getAuthParams(function(err, authParams) {
    			if(err) {
    				self.disconnect(err);
    				return;
    			}
    			if(self.isDisposed) {
    				return;
    			}
    			self.authParams = authParams;
    			var connectParams = self.params.getConnectParams(authParams);
    			if('stream' in connectParams) self.stream = connectParams.stream;
    			Logger.logAction(Logger.LOG_MINOR, 'CometTransport.connect()', 'connectParams:' + Utils.toQueryString(connectParams));

    			/* this will be the 'recvRequest' so this connection can stream messages */
    			var preconnected = false,
    				connectRequest = self.recvRequest = self.createRequest(connectUri, null, connectParams, null, (self.stream ? REQ_RECV_STREAM : REQ_RECV));

    			connectRequest.on('data', function(data) {
    				if(!self.recvRequest) {
    					/* the transport was disposed before we connected */
    					return;
    				}
    				if(!preconnected) {
    					preconnected = true;
    					self.emit('preconnect');
    				}
    				self.onData(data);
    			});
    			connectRequest.on('complete', function(err, _body, headers) {
    				if(!self.recvRequest) {
    					/* the transport was disposed before we connected */
    					err = err || new ErrorInfo('Request cancelled', 80003, 400);
    				}
    				self.recvRequest = null;
    				self.onActivity();
    				if(err) {
    					if(err.code) {
    						/* A protocol error received from realtime. TODO: once realtime
    						 * consistendly sends errors wrapped in protocol messages, should be
    						 * able to remove this */
    						self.onData(protocolMessageFromRawError(err));
    					} else {
    						/* A network/xhr error. Don't bother wrapping in a protocol message,
    						 * just disconnect the transport */
    						self.disconnect(err);
    					}
    					return;
    				}
    				Utils.nextTick(function() {
    					self.recv();
    				});
    			});
    			connectRequest.exec();
    		});
    	};

    	CometTransport.prototype.requestClose = function() {
    		Logger.logAction(Logger.LOG_MINOR, 'CometTransport.requestClose()');
    		this._requestCloseOrDisconnect(true);
    	};

    	CometTransport.prototype.requestDisconnect = function() {
    		Logger.logAction(Logger.LOG_MINOR, 'CometTransport.requestDisconnect()');
    		this._requestCloseOrDisconnect(false);
    	};

    	CometTransport.prototype._requestCloseOrDisconnect = function(closing) {
    		var closeOrDisconnectUri = closing ? this.closeUri : this.disconnectUri;
    		if(closeOrDisconnectUri) {
    			var self = this,
    				request = this.createRequest(closeOrDisconnectUri, null, this.authParams, null, REQ_SEND);

    			request.on('complete', function (err) {
    				if(err) {
    					Logger.logAction(Logger.LOG_ERROR, 'CometTransport.request' + (closing ? 'Close()' : 'Disconnect()'), 'request returned err = ' + Utils.inspectError(err));
    					self.finish('disconnected', err);
    				}
    			});
    			request.exec();
    		}
    	};

    	CometTransport.prototype.dispose = function() {
    		Logger.logAction(Logger.LOG_MINOR, 'CometTransport.dispose()', '');
    		if(!this.isDisposed) {
    			this.isDisposed = true;
    			if(this.recvRequest) {
    				Logger.logAction(Logger.LOG_MINOR, 'CometTransport.dispose()', 'aborting recv request');
    				this.recvRequest.abort();
    				this.recvRequest = null;
    			}
    			/* In almost all cases the transport will be finished before it's
    			 * disposed. Finish here just to make sure. */
    			this.finish('disconnected', ConnectionError.disconnected);
    			var self = this;
    			Utils.nextTick(function() {
    				self.emit('disposed');
    			});
    		}
    	};

    	CometTransport.prototype.onConnect = function(message) {
    		/* if this transport has been disposed whilst awaiting connection, do nothing */
    		if(this.isDisposed) {
    			return;
    		}

    		/* the connectionKey in a comet connected response is really
    		 * <instId>-<connectionKey> */
    		var connectionStr = message.connectionKey;
    		Transport.prototype.onConnect.call(this, message);

    		var baseConnectionUri =  this.baseUri + connectionStr;
    		Logger.logAction(Logger.LOG_MICRO, 'CometTransport.onConnect()', 'baseUri = ' + baseConnectionUri + '; connectionKey = ' + message.connectionKey);
    		this.sendUri = baseConnectionUri + '/send';
    		this.recvUri = baseConnectionUri + '/recv';
    		this.closeUri = baseConnectionUri + '/close';
    		this.disconnectUri = baseConnectionUri + '/disconnect';
    	};

    	CometTransport.prototype.send = function(message) {
    		if(this.sendRequest) {
    			/* there is a pending send, so queue this message */
    			this.pendingItems = this.pendingItems || [];
    			this.pendingItems.push(message);
    			return;
    		}
    		/* send this, plus any pending, now */
    		var pendingItems = this.pendingItems || [];
    		pendingItems.push(message);
    		this.pendingItems = null;

    		this.sendItems(pendingItems);
    	};

    	CometTransport.prototype.sendAnyPending = function() {
    		var pendingItems = this.pendingItems;

    		if(!pendingItems) {
    			return;
    		}

    		this.pendingItems = null;
    		this.sendItems(pendingItems);
    	};

    	CometTransport.prototype.sendItems = function(items) {
    		var self = this,
    			sendRequest = this.sendRequest = self.createRequest(self.sendUri, null, self.authParams, this.encodeRequest(items), REQ_SEND);

    		sendRequest.on('complete', function(err, data) {
    			if(err) Logger.logAction(Logger.LOG_ERROR, 'CometTransport.sendItems()', 'on complete: err = ' + Utils.inspectError(err));
    			self.sendRequest = null;

    			/* the results of the request usually get handled as protocol responses instead of send errors */
    			if(data) {
    				self.onData(data);
    			} else if(err && err.code) {
    				/* A protocol error received from realtime. TODO: once realtime
    				 * consistendly sends errors wrapped in protocol messages, should be
    				 * able to remove this */
    				self.onData(protocolMessageFromRawError(err));
    			} else {
    				/* A network/xhr error. Don't bother wrapping in a protocol message,
    				 * just disconnect the transport */
    				self.disconnect(err);
    			}

    			if(self.pendingItems) {
    				Utils.nextTick(function() {
    					/* If there's a new send request by now, any pending items will have
    					 * been picked up by that; any new ones added since then will be
    					 * picked up after that one completes */
    					if(!self.sendRequest) {
    						self.sendAnyPending();
    					}
    				});
    			}
    		});
    		sendRequest.exec();
    	};

    	CometTransport.prototype.recv = function() {
    		/* do nothing if there is an active request, which might be streaming */
    		if(this.recvRequest)
    			return;

    		/* If we're no longer connected, do nothing */
    		if(!this.isConnected)
    			return;

    		var self = this,
    			recvRequest = this.recvRequest = this.createRequest(this.recvUri, null, this.authParams, null, (self.stream ? REQ_RECV_STREAM : REQ_RECV_POLL));

    		recvRequest.on('data', function(data) {
    			self.onData(data);
    		});
    		recvRequest.on('complete', function(err) {
    			self.recvRequest = null;
    			/* A request completing must be considered activity, as realtime sends
    			 * heartbeats every 15s since a request began, not every 15s absolutely */
    			self.onActivity();
    			if(err) {
    				if(err.code) {
    					/* A protocol error received from realtime. TODO: once realtime
    					 * consistendly sends errors wrapped in protocol messages, should be
    					 * able to remove this */
    					self.onData(protocolMessageFromRawError(err));
    				} else {
    					/* A network/xhr error. Don't bother wrapping in a protocol message,
    					 * just disconnect the transport */
    					self.disconnect(err);
    				}
    				return;
    			}
    			Utils.nextTick(function() {
    				self.recv();
    			});
    		});
    		recvRequest.exec();
    	};

    	CometTransport.prototype.onData = function(responseData) {
    		try {
    			var items = this.decodeResponse(responseData);
    			if(items && items.length)
    				for(var i = 0; i < items.length; i++)
    					this.onProtocolMessage(ProtocolMessage.fromDeserialized(items[i]));
    		} catch (e) {
    			Logger.logAction(Logger.LOG_ERROR, 'CometTransport.onData()', 'Unexpected exception handing channel event: ' + e.stack);
    		}
    	};

    	CometTransport.prototype.encodeRequest = function(requestItems) {
    		return JSON.stringify(requestItems);
    	};

    	CometTransport.prototype.decodeResponse = function(responseData) {
    		if(typeof(responseData) == 'string')
    			responseData = JSON.parse(responseData);
    		return responseData;
    	};

    	/* For comet, we could do the auth update by aborting the current recv and
    	 * starting a new one with the new token, that'd be sufficient for realtime.
    	 * Problem is JSONP - you can't cancel truly abort a recv once started. So
    	 * we need to send an AUTH for jsonp. In which case it's simpler to keep all
    	 * comet transports the same and do it for all of them. So we send the AUTH
    	 * instead, and don't need to abort the recv */
    	CometTransport.prototype.onAuthUpdated = function(tokenDetails) {
    		this.authParams = {access_token: tokenDetails.token};
    	};

    	return CometTransport;
    })();

    var Presence = (function() {
    	function noop() {}
    	function Presence(channel) {
    		this.channel = channel;
    		this.basePath = channel.basePath + '/presence';
    	}
    	Utils.inherits(Presence, EventEmitter);

    	Presence.prototype.get = function(params, callback) {
    		Logger.logAction(Logger.LOG_MICRO, 'Presence.get()', 'channel = ' + this.channel.name);
    		/* params and callback are optional; see if params contains the callback */
    		if(callback === undefined) {
    			if(typeof(params) == 'function') {
    				callback = params;
    				params = null;
    			} else {
    				if(this.channel.rest.options.promises) {
    					return Utils.promisify(this, 'get', arguments);
    				}
    				callback = noop;
    			}
    		}
    		var rest = this.channel.rest,
    			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
    			envelope = Http.supportsLinkHeaders ? undefined : format,
    			headers = Utils.defaultGetHeaders(format);

    		if(rest.options.headers)
    			Utils.mixin(headers, rest.options.headers);

    		var options = this.channel.channelOptions;
    		(new PaginatedResource(rest, this.basePath, headers, envelope, function(body, headers, unpacked) {
    			return PresenceMessage.fromResponseBody(body, options, !unpacked && format);
    		})).get(params, callback);
    	};

    	Presence.prototype.history = function(params, callback) {
    		Logger.logAction(Logger.LOG_MICRO, 'Presence.history()', 'channel = ' + this.channel.name);
    		this._history(params, callback);
    	};

    	Presence.prototype._history = function(params, callback) {
    		/* params and callback are optional; see if params contains the callback */
    		if(callback === undefined) {
    			if(typeof(params) == 'function') {
    				callback = params;
    				params = null;
    			} else {
    				if(this.channel.rest.options.promises) {
    					return Utils.promisify(this, '_history', arguments);
    				}
    				callback = noop;
    			}
    		}
    		var rest = this.channel.rest,
    			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
    			envelope = Http.supportsLinkHeaders ? undefined : format,
    			headers = Utils.defaultGetHeaders(format),
    			channel = this.channel;

    		if(rest.options.headers)
    			Utils.mixin(headers, rest.options.headers);

    		var options = this.channel.channelOptions;
    		(new PaginatedResource(rest, this.basePath + '/history', headers, envelope, function(body, headers, unpacked) {
    			return PresenceMessage.fromResponseBody(body, options, !unpacked && format);
    		})).get(params, callback);
    	};

    	return Presence;
    })();

    var Resource = (function() {
    	var msgpack = Platform.msgpack;

    	function Resource() {}

    	function withAuthDetails(rest, headers, params, errCallback, opCallback) {
    		if (Http.supportsAuthHeaders) {
    			rest.auth.getAuthHeaders(function(err, authHeaders) {
    				if(err)
    					errCallback(err);
    				else
    					opCallback(Utils.mixin(authHeaders, headers), params);
    			});
    		} else {
    			rest.auth.getAuthParams(function(err, authParams) {
    				if(err)
    					errCallback(err);
    				else
    					opCallback(headers, Utils.mixin(authParams, params));
    			});
    		}
    	}

    	function unenvelope(callback, format) {
    		return function(err, body, outerHeaders, unpacked, outerStatusCode) {
    			if(err && !body) {
    				callback(err);
    				return;
    			}

    			if(!unpacked) {
    				try {
    					body = Utils.decodeBody(body, format);
    				} catch(e) {
    					callback(e);
    					return;
    				}
    			}

    			if(body.statusCode === undefined) {
    				/* Envelope already unwrapped by the transport */
    				callback(err, body, outerHeaders, true, outerStatusCode);
    				return;
    			}

    			var wrappedStatusCode = body.statusCode,
    				response = body.response,
    				wrappedHeaders = body.headers;

    			if(wrappedStatusCode < 200 || wrappedStatusCode >= 300) {
    				/* handle wrapped errors */
    				var wrappedErr = (response && response.error) || err;
    				if(!wrappedErr) {
    					wrappedErr = new Error("Error in unenveloping " + body);
    					wrappedErr.statusCode = wrappedStatusCode;
    				}
    				callback(wrappedErr, response, wrappedHeaders, true, wrappedStatusCode);
    				return;
    			}

    			callback(err, response, wrappedHeaders, true, wrappedStatusCode);
    		};
    	}

    	function paramString(params) {
    		var paramPairs = [];
    		if (params) {
    			for (var needle in params) {
    				paramPairs.push(needle + '=' + params[needle]);
    			}
    		}
    		return paramPairs.join('&');
    	}

    	function urlFromPathAndParams(path, params) {
    		return path + (params ? '?' : '') + paramString(params);
    	}

    	function logResponseHandler(callback, method, path, params) {
    		return function(err, body, headers, unpacked, statusCode) {
    			if (err) {
    				Logger.logAction(Logger.LOG_MICRO, 'Resource.' + method + '()', 'Received Error; ' + urlFromPathAndParams(path, params) + '; Error: ' + Utils.inspectError(err));
    			} else {
    				Logger.logAction(Logger.LOG_MICRO, 'Resource.' + method + '()',
    					'Received; ' + urlFromPathAndParams(path, params) + '; Headers: ' + paramString(headers) + '; StatusCode: ' + statusCode + '; Body: ' + (BufferUtils.isBuffer(body) ? body.toString() : body));
    			}
    			if (callback) { callback(err, body, headers, unpacked, statusCode); }
    		}
    	}

    	Utils.arrForEach(Http.methodsWithoutBody, function(method) {
    		Resource[method] = function(rest, path, origheaders, origparams, envelope, callback) {
    			Resource['do'](method, rest, path, null, origheaders, origparams, envelope, callback);
    		};
    	});

    	Utils.arrForEach(Http.methodsWithBody, function(method) {
    		Resource[method] = function(rest, path, body, origheaders, origparams, envelope, callback) {
    			Resource['do'](method, rest, path, body, origheaders, origparams, envelope, callback);
    		};
    	});

    	Resource['do'] = function(method, rest, path, body, origheaders, origparams, envelope, callback) {
    		if (Logger.shouldLog(Logger.LOG_MICRO)) {
    			callback = logResponseHandler(callback, method, path, origparams);
    		}

    		if(envelope) {
    			callback = (callback && unenvelope(callback, envelope));
    			(origparams = (origparams || {}))['envelope'] = envelope;
    		}

    		function doRequest(headers, params) {
    			if (Logger.shouldLog(Logger.LOG_MICRO)) {
    				Logger.logAction(Logger.LOG_MICRO, 'Resource.' + method + '()', 'Sending; ' + urlFromPathAndParams(path, params));
    			}

    			var args = [rest, path, headers, body, params, function(err, res, headers, unpacked, statusCode) {
    				if(err && Auth.isTokenErr(err)) {
    					/* token has expired, so get a new one */
    					rest.auth.authorize(null, null, function(err) {
    						if(err) {
    							callback(err);
    							return;
    						}
    						/* retry ... */
    						withAuthDetails(rest, origheaders, origparams, callback, doRequest);
    					});
    					return;
    				}
    				callback(err, res, headers, unpacked, statusCode);
    			}];
    			if (!body) {
    				args.splice(3, 1);
    			}

    			if (Logger.shouldLog(Logger.LOG_MICRO)) {
    				var decodedBody = body;
    				if ((headers['content-type'] || '').indexOf('msgpack') > 0) {
    					try {
    						decodedBody = msgpack.decode(body);
    					} catch (decodeErr) {
    						Logger.logAction(Logger.LOG_MICRO, 'Resource.' + method + '()', 'Sending MsgPack Decoding Error: ' + Utils.inspectError(decodeErr));
    					}
    				}
    				Logger.logAction(Logger.LOG_MICRO, 'Resource.' + method + '()', 'Sending; ' + urlFromPathAndParams(path, params) + '; Body: ' + decodedBody);
    			}
    			Http[method].apply(this, args);
    		}

    		withAuthDetails(rest, origheaders, origparams, callback, doRequest);
    	};

    	return Resource;
    })();

    var PaginatedResource = (function() {

    	function getRelParams(linkUrl) {
    		var urlMatch = linkUrl.match(/^\.\/(\w+)\?(.*)$/);
    		return urlMatch && Utils.parseQueryString(urlMatch[2]);
    	}

    	function parseRelLinks(linkHeader) {
    		if(typeof(linkHeader) == 'string')
    			linkHeader = linkHeader.split(',');

    		var relParams = {};
    		for(var i = 0; i < linkHeader.length; i++) {
    			var linkMatch = linkHeader[i].match(/^\s*<(.+)>;\s*rel="(\w+)"$/);
    			if(linkMatch) {
    				var params = getRelParams(linkMatch[1]);
    				if(params)
    					relParams[linkMatch[2]] = params;
    			}
    		}
    		return relParams;
    	}

    	function PaginatedResource(rest, path, headers, envelope, bodyHandler, useHttpPaginatedResponse) {
    		this.rest = rest;
    		this.path = path;
    		this.headers = headers;
    		this.envelope = envelope;
    		this.bodyHandler = bodyHandler;
    		this.useHttpPaginatedResponse = useHttpPaginatedResponse || false;
    	}

    	Utils.arrForEach(Http.methodsWithoutBody, function(method) {
    		PaginatedResource.prototype[method] = function(params, callback) {
    			var self = this;
    			Resource[method](self.rest, self.path, self.headers, params, self.envelope, function(err, body, headers, unpacked, statusCode) {
    				self.handlePage(err, body, headers, unpacked, statusCode, callback);
    			});
    		};
    	});

    	Utils.arrForEach(Http.methodsWithBody, function(method) {
    		PaginatedResource.prototype[method] = function(params, body, callback) {
    			var self = this;
    			Resource[method](self.rest, self.path, body, self.headers, params, self.envelope, function(err, resbody, headers, unpacked, statusCode) {
    				if(callback) {
    					self.handlePage(err, resbody, headers, unpacked, statusCode, callback);
    				}
    			});
    		};
    	});

    	function returnErrOnly(err, body, useHPR) {
    		/* If using httpPaginatedResponse, errors from Ably are returned as part of
    		 * the HPR, only do callback(err) for network errors etc. which don't
    		 * return a body and/or have no ably-originated error code (non-numeric
    		 * error codes originate from node) */
    		return !(useHPR && (body || typeof err.code === 'number'));
    	}

    	PaginatedResource.prototype.handlePage = function(err, body, headers, unpacked, statusCode, callback) {
    		if(err && returnErrOnly(err, body, this.useHttpPaginatedResponse)) {
    			Logger.logAction(Logger.LOG_ERROR, 'PaginatedResource.handlePage()', 'Unexpected error getting resource: err = ' + Utils.inspectError(err));
    			callback(err);
    			return;
    		}
    		var items, linkHeader, relParams;
    		try {
    			items = this.bodyHandler(body, headers, unpacked);
    		} catch(e) {
    			/* If we got an error, the failure to parse the body is almost certainly
    			 * due to that, so cb with that in preference to the parse error */
    			callback(err || e);
    			return;
    		}

    		if(headers && (linkHeader = (headers['Link'] || headers['link']))) {
    			relParams = parseRelLinks(linkHeader);
    		}

    		if(this.useHttpPaginatedResponse) {
    			callback(null, new HttpPaginatedResponse(this, items, headers, statusCode, relParams, err));
    		} else {
    			callback(null, new PaginatedResult(this, items, relParams));
    		}
    	};

    	function PaginatedResult(resource, items, relParams) {
    		this.resource = resource;
    		this.items = items;

    		if(relParams) {
    			var self = this;
    			if('first' in relParams)
    				this.first = function(cb) { self.get(relParams.first, cb); };
    			if('current' in relParams)
    				this.current = function(cb) { self.get(relParams.current, cb); };
    			this.next = function(cb) {
    				if('next' in relParams)
    					self.get(relParams.next, cb);
    				else
    					cb(null, null);
    			};

    			this.hasNext = function() { return ('next' in relParams) };
    			this.isLast = function() { return !this.hasNext(); };
    		}
    	}

    	/* We assume that only the initial request can be a POST, and that accessing
    	 * the rest of a multipage set of results can always be done with GET */
    	PaginatedResult.prototype.get = function(params, callback) {
    		var res = this.resource;
    		Resource.get(res.rest, res.path, res.headers, params, res.envelope, function(err, body, headers, unpacked, statusCode) {
    			res.handlePage(err, body, headers, unpacked, statusCode, callback);
    		});
    	};

    	function HttpPaginatedResponse(resource, items, headers, statusCode, relParams, err) {
    		PaginatedResult.call(this, resource, items, relParams);
    		this.statusCode = statusCode;
    		this.success = statusCode < 300 && statusCode >= 200;
    		this.headers = headers;
    		this.errorCode = err && err.code;
    		this.errorMessage = err && err.message;
    	}
    	Utils.inherits(HttpPaginatedResponse, PaginatedResult);

    	return PaginatedResource;
    })();

    var Auth = (function() {
    	var MAX_TOKEN_LENGTH = Math.pow(2, 17);
    	function noop() {}
    	function random() { return ('000000' + Math.floor(Math.random() * 1E16)).slice(-16); }
    	function normaliseAuthcallbackError(err) {
    		/* A client auth callback may give errors in any number of formats; normalise to an errorinfo */
    		if(!Utils.isErrorInfo(err)) {
    			return new ErrorInfo(Utils.inspectError(err), err.code || 40170, err.statusCode || 401);
    		}
    		/* network errors will not have an inherent error code */
    		if(!err.code) {
    			if(err.statusCode === 403) {
    				err.code = 40300;
    			} else {
    				err.code = 40170;
    				/* normalise statusCode to 401 per RSA4e */
    				err.statusCode = 401;
    			}
    		}
    		return err;
    	}

    	var hmac, toBase64;
    	{
    		toBase64 = Base64.encode;
    		hmac = function(text, key) {
    			return CryptoJS.HmacSHA256(text, key).toString(CryptoJS.enc.Base64);
    		};
    	}

    	function c14n(capability) {
    		if(!capability)
    			return '';

    		if(typeof(capability) == 'string')
    			capability = JSON.parse(capability);

    		var c14nCapability = {};
    		var keys = Utils.keysArray(capability, true);
    		if(!keys)
    			return '';
    		keys.sort();
    		for(var i = 0; i < keys.length; i++) {
    			c14nCapability[keys[i]] = capability[keys[i]].sort();
    		}
    		return JSON.stringify(c14nCapability);
    	}

    	function logAndValidateTokenAuthMethod(authOptions) {
    		if(authOptions.authCallback) {
    			Logger.logAction(Logger.LOG_MINOR, 'Auth()', 'using token auth with authCallback');
    		} else if(authOptions.authUrl) {
    			Logger.logAction(Logger.LOG_MINOR, 'Auth()', 'using token auth with authUrl');
    		} else if(authOptions.key) {
    			Logger.logAction(Logger.LOG_MINOR, 'Auth()', 'using token auth with client-side signing');
    		} else if(authOptions.tokenDetails) {
    			Logger.logAction(Logger.LOG_MINOR, 'Auth()', 'using token auth with supplied token only');
    		} else {
    			var msg = 'authOptions must include valid authentication parameters';
    			Logger.logAction(Logger.LOG_ERROR, 'Auth()', msg);
    			throw new Error(msg);
    		}
    	}

    	function basicAuthForced(options) {
    		return 'useTokenAuth' in options && !options.useTokenAuth;
    	}

    	/* RSA4 */
    	function useTokenAuth(options) {
    		return options.useTokenAuth ||
    			(!basicAuthForced(options) &&
    			 (options.authCallback ||
    			  options.authUrl      ||
    			  options.token        ||
    			  options.tokenDetails))
    	}

    	/* RSA4a */
    	function noWayToRenew(options) {
    		return !options.key &&
    			!options.authCallback &&
    			!options.authUrl;
    	}

    	var trId = 0;
    	function getTokenRequestId() {
    		return trId++;
    	}

    	function Auth(client, options) {
    		this.client = client;
    		this.tokenParams = options.defaultTokenParams || {};
    		/* The id of the current token request if one is in progress, else null */
    		this.currentTokenRequestId = null;
    		this.waitingForTokenRequest = null;

    		if(useTokenAuth(options)) {
    			/* Token auth */
    			if(options.key && !hmac) {
    				var msg = 'client-side token request signing not supported';
    				Logger.logAction(Logger.LOG_ERROR, 'Auth()', msg);
    				throw new Error(msg);
    			}
    			if(noWayToRenew(options)) {
    				Logger.logAction(Logger.LOG_ERROR, 'Auth()', 'Warning: library initialized with a token literal without any way to renew the token when it expires (no authUrl, authCallback, or key). See https://help.ably.io/error/40171 for help');
    			}
    			this._saveTokenOptions(options.defaultTokenParams, options);
    			logAndValidateTokenAuthMethod(this.authOptions);
    		} else {
    			/* Basic auth */
    			if(!options.key) {
    				var msg = 'No authentication options provided; need one of: key, authUrl, or authCallback (or for testing only, token or tokenDetails)';
    				Logger.logAction(Logger.LOG_ERROR, 'Auth()', msg);
    				throw new ErrorInfo(msg, 40160, 401);
    			}
    			Logger.logAction(Logger.LOG_MINOR, 'Auth()', 'anonymous, using basic auth');
    			this._saveBasicOptions(options);
    		}
    	}

    	/**
    	 * Instructs the library to get a token immediately and ensures Token Auth
    	 * is used for all future requests, storing the tokenParams and authOptions
    	 * given as the new defaults for subsequent use.
    	 *
    	 * @param tokenParams
    	 * an object containing the parameters for the requested token:
    	 *
    	 * - ttl:        (optional) the requested life of any new token in ms. If none
    	 *               is specified a default of 1 hour is provided. The maximum lifetime
    	 *               is 24hours; any request exceeeding that lifetime will be rejected
    	 *               with an error.
    	 *
    	 * - capability: (optional) the capability to associate with the access token.
    	 *               If none is specified, a token will be requested with all of the
    	 *               capabilities of the specified key.
    	 *
    	 * - clientId:   (optional) a client Id to associate with the token
    	 *
    	 * - timestamp:  (optional) the time in ms since the epoch. If none is specified,
    	 *               the system will be queried for a time value to use.
    	 *
    	 * @param authOptions
    	 * an object containing auth options relevant to token auth:
    	 *
    	 * - queryTime   (optional) boolean indicating that the Ably system should be
    	 *               queried for the current time when none is specified explicitly.
    	 *
    	 * - tokenDetails: (optional) object: An authenticated TokenDetails object.
    	 *
    	 * - token:        (optional) string: the `token` property of a tokenDetails object
    	 *
    	 * - authCallback:  (optional) a javascript callback to be called to get auth information.
    	 *                  authCallback should be a function of (tokenParams, callback) that calls
    	 *                  the callback with (err, result), where result is any of:
    	 *                  - a tokenRequest object (ie the result of a rest.auth.createTokenRequest call),
    	 *                  - a tokenDetails object (ie the result of a rest.auth.requestToken call),
    	 *                  - a token string
    	 *
    	 * - authUrl:       (optional) a URL to be used to GET or POST a set of token request
    	 *                  params, to obtain a signed token request.
    	 *
    	 * - authHeaders:   (optional) a set of application-specific headers to be added to any request
    	 *                  made to the authUrl.
    	 *
    	 * - authParams:    (optional) a set of application-specific query params to be added to any
    	 *                  request made to the authUrl.
    	 *
    	 *
    	 * - requestHeaders (optional, unsupported, for testing only) extra headers to add to the
    	 *                  requestToken request
    	 *
    	 * @param callback (err, tokenDetails)
    	 */
    	Auth.prototype.authorize = function(tokenParams, authOptions, callback) {
    		/* shuffle and normalise arguments as necessary */
    		if(typeof(tokenParams) == 'function' && !callback) {
    			callback = tokenParams;
    			authOptions = tokenParams = null;
    		} else if(typeof(authOptions) == 'function' && !callback) {
    			callback = authOptions;
    			authOptions = null;
    		}
    		if(!callback) {
    			if(this.client.options.promises) {
    				return Utils.promisify(this, 'authorize', arguments);
    			}
    			callback = noop;
    		}
    		var self = this;

    		/* RSA10a: authorize() call implies token auth. If a key is passed it, we
    		 * just check if it doesn't clash and assume we're generating a token from it */
    		if(authOptions && authOptions.key && (this.authOptions.key !== authOptions.key)) {
    			throw new ErrorInfo('Unable to update auth options with incompatible key', 40102, 401);
    		}

    		if(authOptions && ('force' in authOptions)) {
    			Logger.logAction(Logger.LOG_ERROR, 'Auth.authorize', 'Deprecation warning: specifying {force: true} in authOptions is no longer necessary, authorize() now always gets a new token. Please remove this, as in version 1.0 and later, having a non-null authOptions will overwrite stored library authOptions, which may not be what you want');
    			/* Emulate the old behaviour: if 'force' was the only member of authOptions,
    			 * set it to null so it doesn't overwrite stored. TODO: remove in version 1.0 */
    			if(Utils.isOnlyPropIn(authOptions, 'force')) {
    				authOptions = null;
    			}
    		}

    		this._forceNewToken(tokenParams, authOptions, function(err, tokenDetails) {
    			if(err) {
    				callback(err);
    				return;
    			}
    			/* RTC8
    			 * - When authorize called by an end user and have a realtime connection,
    			 * don't call back till new token has taken effect.
    			 * - Use self.client.connection as a proxy for (self.client instanceof Realtime),
    			 * which doesn't work in node as Realtime isn't part of the vm context for Rest clients */
    			if(self.client.connection) {
    				self.client.connection.connectionManager.onAuthUpdated(tokenDetails, callback);
    			} else {
    				callback(null, tokenDetails);
    			}
    		});
    	};

    	Auth.prototype.authorise = function() {
    		Logger.deprecated('Auth.authorise', 'Auth.authorize');
    		this.authorize.apply(this, arguments);
    	};

    	/* For internal use, eg by connectionManager - useful when want to call back
    	 * as soon as we have the new token, rather than waiting for it to take
    	 * effect on the connection as #authorize does */
    	Auth.prototype._forceNewToken = function(tokenParams, authOptions, callback) {
    		var self = this;

    		/* get rid of current token even if still valid */
    		this.tokenDetails = null;

    		/* _save normalises the tokenParams and authOptions and updates the auth
    		 * object. All subsequent operations should use the values on `this`,
    		 * not the passed in ones. */
    		this._saveTokenOptions(tokenParams, authOptions);

    		logAndValidateTokenAuthMethod(this.authOptions);

    		this._ensureValidAuthCredentials(true, function(err, tokenDetails) {
    			/* RSA10g */
    			delete self.tokenParams.timestamp;
    			delete self.authOptions.queryTime;
    			callback(err, tokenDetails);
    		});
    	};

    	/**
    	 * Request an access token
    	 * @param authOptions
    	 * an object containing the request options:
    	 * - key:           the key to use.
    	 *
    	 * - authCallback:  (optional) a javascript callback to be called to get auth information.
    	 *                  authCallback should be a function of (tokenParams, callback) that calls
    	 *                  the callback with (err, result), where result is any of:
    	 *                  - a tokenRequest object (ie the result of a rest.auth.createTokenRequest call),
    	 *                  - a tokenDetails object (ie the result of a rest.auth.requestToken call),
    	 *                  - a token string
    	 *
    	 * - authUrl:       (optional) a URL to be used to GET or POST a set of token request
    	 *                  params, to obtain a signed token request.
    	 *
    	 * - authHeaders:   (optional) a set of application-specific headers to be added to any request
    	 *                  made to the authUrl.
    	 *
    	 * - authParams:    (optional) a set of application-specific query params to be added to any
    	 *                  request made to the authUrl.
    	 *
    	 * - queryTime      (optional) boolean indicating that the ably system should be
    	 *                  queried for the current time when none is specified explicitly
    	 *
    	 * - requestHeaders (optional, unsupported, for testing only) extra headers to add to the
    	 *                  requestToken request
    	 *
    	 * @param tokenParams
    	 * an object containing the parameters for the requested token:
    	 * - ttl:          (optional) the requested life of the token in milliseconds. If none is specified
    	 *                  a default of 1 hour is provided. The maximum lifetime is 24hours; any request
    	 *                  exceeeding that lifetime will be rejected with an error.
    	 *
    	 * - capability:    (optional) the capability to associate with the access token.
    	 *                  If none is specified, a token will be requested with all of the
    	 *                  capabilities of the specified key.
    	 *
    	 * - clientId:      (optional) a client Id to associate with the token; if not
    	 *                  specified, a clientId passed in constructing the Rest interface will be used
    	 *
    	 * - timestamp:     (optional) the time in ms since the epoch. If none is specified,
    	 *                  the system will be queried for a time value to use.
    	 *
    	 * @param callback (err, tokenDetails)
    	 */
    	Auth.prototype.requestToken = function(tokenParams, authOptions, callback) {
    		/* shuffle and normalise arguments as necessary */
    		if(typeof(tokenParams) == 'function' && !callback) {
    			callback = tokenParams;
    			authOptions = tokenParams = null;
    		}
    		else if(typeof(authOptions) == 'function' && !callback) {
    			callback = authOptions;
    			authOptions = null;
    		}
    		if(!callback && this.client.options.promises) {
    			return Utils.promisify(this, 'requestToken', arguments);
    		}

    		/* RSA8e: if authOptions passed in, they're used instead of stored, don't merge them */
    		authOptions = authOptions || this.authOptions;
    		tokenParams = tokenParams || Utils.copy(this.tokenParams);
    		callback = callback || noop;

    		/* first set up whatever callback will be used to get signed
    		 * token requests */
    		var tokenRequestCallback, client = this.client;

    		if(authOptions.authCallback) {
    			Logger.logAction(Logger.LOG_MINOR, 'Auth.requestToken()', 'using token auth with authCallback');
    			tokenRequestCallback = authOptions.authCallback;
    		} else if(authOptions.authUrl) {
    			Logger.logAction(Logger.LOG_MINOR, 'Auth.requestToken()', 'using token auth with authUrl');
    			tokenRequestCallback = function(params, cb) {
    				var authHeaders = Utils.mixin({accept: 'application/json, text/plain'}, authOptions.authHeaders),
    					usePost = authOptions.authMethod && authOptions.authMethod.toLowerCase() === 'post';
    				if(!usePost) {
    					/* Combine authParams with any qs params given in the authUrl */
    					var queryIdx = authOptions.authUrl.indexOf('?');
    					if(queryIdx > -1) {
    						var providedQsParams = Utils.parseQueryString(authOptions.authUrl.slice(queryIdx));
    						authOptions.authUrl = authOptions.authUrl.slice(0, queryIdx);
    						/* In case of conflict, authParams take precedence over qs params in the authUrl */
    						authOptions.authParams = Utils.mixin(providedQsParams, authOptions.authParams);
    					}
    				}
    				/* RSA8c2 */
    				var authParams = Utils.mixin({}, authOptions.authParams || {}, params);
    				var authUrlRequestCallback = function(err, body, headers, unpacked) {
    					var contentType;
    					if (err) {
    						Logger.logAction(Logger.LOG_MICRO, 'Auth.requestToken().tokenRequestCallback', 'Received Error: ' + Utils.inspectError(err));
    					} else {
    						contentType = headers['content-type'];
    						Logger.logAction(Logger.LOG_MICRO, 'Auth.requestToken().tokenRequestCallback', 'Received; content-type: ' + contentType + '; body: ' + Utils.inspectBody(body));
    					}
    					if(err || unpacked) return cb(err, body);
    					if(BufferUtils.isBuffer(body)) body = body.toString();
    					if(!contentType) {
    						cb(new ErrorInfo('authUrl response is missing a content-type header', 40170, 401));
    						return;
    					}
    					var json = contentType.indexOf('application/json') > -1,
    						text = contentType.indexOf('text/plain') > -1 || contentType.indexOf('application/jwt') > -1;
    					if(!json && !text) {
    						cb(new ErrorInfo('authUrl responded with unacceptable content-type ' + contentType + ', should be either text/plain, application/jwt or application/json', 40170, 401));
    						return;
    					}
    					if(json) {
    						if(body.length > MAX_TOKEN_LENGTH) {
    							cb(new ErrorInfo('authUrl response exceeded max permitted length', 40170, 401));
    							return;
    						}
    						try {
    							body = JSON.parse(body);
    						} catch(e) {
    							cb(new ErrorInfo('Unexpected error processing authURL response; err = ' + e.message, 40170, 401));
    							return;
    						}
    					}
    					cb(null, body, contentType);
    				};
    				Logger.logAction(Logger.LOG_MICRO, 'Auth.requestToken().tokenRequestCallback', 'Requesting token from ' + authOptions.authUrl + '; Params: ' + JSON.stringify(authParams) + '; method: ' + (usePost ? 'POST' : 'GET'));
    				if(usePost) {
    					/* send body form-encoded */
    					var headers = authHeaders || {};
    					headers['content-type'] = 'application/x-www-form-urlencoded';
    					var body = Utils.toQueryString(authParams).slice(1); /* slice is to remove the initial '?' */
    					Http.postUri(client, authOptions.authUrl, headers, body, {}, authUrlRequestCallback);
    				} else {
    					Http.getUri(client, authOptions.authUrl, authHeaders || {}, authParams, authUrlRequestCallback);
    				}
    			};
    		} else if(authOptions.key) {
    			var self = this;
    			Logger.logAction(Logger.LOG_MINOR, 'Auth.requestToken()', 'using token auth with client-side signing');
    			tokenRequestCallback = function(params, cb) { self.createTokenRequest(params, authOptions, cb); };
    		} else {
    			var msg = "Need a new token, but authOptions does not include any way to request one (no authUrl, authCallback, or key)";
    			Logger.logAction(Logger.LOG_ERROR, 'Auth()', 'library initialized with a token literal without any way to renew the token when it expires (no authUrl, authCallback, or key). See https://help.ably.io/error/40171 for help');
    			callback(new ErrorInfo(msg, 40171, 403));
    			return;
    		}

    		/* normalise token params */
    		if('capability' in tokenParams)
    			tokenParams.capability = c14n(tokenParams.capability);

    		var tokenRequest = function(signedTokenParams, tokenCb) {
    			var keyName = signedTokenParams.keyName,
    				path = '/keys/' + keyName + '/requestToken',
    				tokenUri = function(host) { return client.baseUri(host) + path; };

    			var requestHeaders = Utils.defaultPostHeaders();
    			if(authOptions.requestHeaders) Utils.mixin(requestHeaders, authOptions.requestHeaders);
    			Logger.logAction(Logger.LOG_MICRO, 'Auth.requestToken().requestToken', 'Sending POST to ' + path + '; Token params: ' + JSON.stringify(signedTokenParams));
    			signedTokenParams = JSON.stringify(signedTokenParams);
    			Http.post(client, tokenUri, requestHeaders, signedTokenParams, null, tokenCb);
    		};

    		var tokenRequestCallbackTimeoutExpired = false,
    			timeoutLength = this.client.options.timeouts.realtimeRequestTimeout,
    			tokenRequestCallbackTimeout = setTimeout(function() {
    				tokenRequestCallbackTimeoutExpired = true;
    				var msg = 'Token request callback timed out after ' + (timeoutLength / 1000) + ' seconds';
    				Logger.logAction(Logger.LOG_ERROR, 'Auth.requestToken()', msg);
    				callback(new ErrorInfo(msg, 40170, 401));
    			}, timeoutLength);

    		tokenRequestCallback(tokenParams, function(err, tokenRequestOrDetails, contentType) {
    			if(tokenRequestCallbackTimeoutExpired) return;
    			clearTimeout(tokenRequestCallbackTimeout);

    			if(err) {
    				Logger.logAction(Logger.LOG_ERROR, 'Auth.requestToken()', 'token request signing call returned error; err = ' + Utils.inspectError(err));
    				callback(normaliseAuthcallbackError(err));
    				return;
    			}
    			/* the response from the callback might be a token string, a signed request or a token details */
    			if(typeof(tokenRequestOrDetails) === 'string') {
    				if(tokenRequestOrDetails.length === 0) {
    					callback(new ErrorInfo('Token string is empty', 40170, 401));
    				} else if(tokenRequestOrDetails.length > MAX_TOKEN_LENGTH) {
    					callback(new ErrorInfo('Token string exceeded max permitted length (was ' + tokenRequestOrDetails.length + ' bytes)', 40170, 401));
    				} else if(tokenRequestOrDetails === 'undefined' || tokenRequestOrDetails === 'null') {
    					/* common failure mode with poorly-implemented authCallbacks */
    					callback(new ErrorInfo('Token string was literal null/undefined', 40170, 401));
    				} else if((tokenRequestOrDetails[0] === '{') && !(contentType && contentType.indexOf('application/jwt') > -1)) {
    					callback(new ErrorInfo('Token was double-encoded; make sure you\'re not JSON-encoding an already encoded token request or details', 40170, 401));
    				} else {
    					callback(null, {token: tokenRequestOrDetails});
    				}
    				return;
    			}
    			if(typeof(tokenRequestOrDetails) !== 'object') {
    				var msg = 'Expected token request callback to call back with a token string or token request/details object, but got a ' + typeof(tokenRequestOrDetails);
    				Logger.logAction(Logger.LOG_ERROR, 'Auth.requestToken()', msg);
    				callback(new ErrorInfo(msg, 40170, 401));
    				return;
    			}
    			var objectSize = JSON.stringify(tokenRequestOrDetails).length;
    			if(objectSize > MAX_TOKEN_LENGTH && !authOptions.suppressMaxLengthCheck) {
    				callback(new ErrorInfo('Token request/details object exceeded max permitted stringified size (was ' + objectSize + ' bytes)', 40170, 401));
    				return;
    			}
    			if('issued' in tokenRequestOrDetails) {
    				/* a tokenDetails object */
    				callback(null, tokenRequestOrDetails);
    				return;
    			}
    			if(!('keyName' in tokenRequestOrDetails)) {
    				var msg = 'Expected token request callback to call back with a token string, token request object, or token details object';
    				Logger.logAction(Logger.LOG_ERROR, 'Auth.requestToken()', msg);
    				callback(new ErrorInfo(msg, 40170, 401));
    				return;
    			}
    			/* it's a token request, so make the request */
    			tokenRequest(tokenRequestOrDetails, function(err, tokenResponse, headers, unpacked) {
    				if(err) {
    					Logger.logAction(Logger.LOG_ERROR, 'Auth.requestToken()', 'token request API call returned error; err = ' + Utils.inspectError(err));
    					callback(normaliseAuthcallbackError(err));
    					return;
    				}
    				if(!unpacked) tokenResponse = JSON.parse(tokenResponse);
    				Logger.logAction(Logger.LOG_MINOR, 'Auth.getToken()', 'token received');
    				callback(null, tokenResponse);
    			});
    		});
    	};

    	/**
    	 * Create and sign a token request based on the given options.
    	 * NOTE this can only be used when the key value is available locally.
    	 * Otherwise, signed token requests must be obtained from the key
    	 * owner (either using the token request callback or url).
    	 *
    	 * @param authOptions
    	 * an object containing the request options:
    	 * - key:           the key to use. If not specified, a key passed in constructing
    	 *                  the Rest interface will be used
    	 *
    	 * - queryTime      (optional) boolean indicating that the ably system should be
    	 *                  queried for the current time when none is specified explicitly
    	 *
    	 * - requestHeaders (optional, unsupported, for testing only) extra headers to add to the
    	 *                  requestToken request
    	 *
    	 * @param tokenParams
    	 * an object containing the parameters for the requested token:
    	 * - ttl:       (optional) the requested life of the token in ms. If none is specified
    	 *                  a default of 1 hour is provided. The maximum lifetime is 24hours; any request
    	 *                  exceeeding that lifetime will be rejected with an error.
    	 *
    	 * - capability:    (optional) the capability to associate with the access token.
    	 *                  If none is specified, a token will be requested with all of the
    	 *                  capabilities of the specified key.
    	 *
    	 * - clientId:      (optional) a client Id to associate with the token; if not
    	 *                  specified, a clientId passed in constructing the Rest interface will be used
    	 *
    	 * - timestamp:     (optional) the time in ms since the epoch. If none is specified,
    	 *                  the system will be queried for a time value to use.
    	 *
    	 */
    	Auth.prototype.createTokenRequest = function(tokenParams, authOptions, callback) {
    		/* shuffle and normalise arguments as necessary */
    		if(typeof(tokenParams) == 'function' && !callback) {
    			callback = tokenParams;
    			authOptions = tokenParams = null;
    		} else if(typeof(authOptions) == 'function' && !callback) {
    			callback = authOptions;
    			authOptions = null;
    		}
    		if(!callback && this.client.options.promises) {
    			return Utils.promisify(this, 'createTokenRequest', arguments);
    		}

    		/* RSA9h: if authOptions passed in, they're used instead of stored, don't merge them */
    		authOptions = authOptions || this.authOptions;
    		tokenParams = tokenParams || Utils.copy(this.tokenParams);

    		var key = authOptions.key;
    		if(!key) {
    			callback(new ErrorInfo('No key specified', 40101, 403));
    			return;
    		}
    		var keyParts = key.split(':'),
    			keyName = keyParts[0],
    			keySecret = keyParts[1];

    		if(!keySecret) {
    			callback(new ErrorInfo('Invalid key specified', 40101, 403));
    			return;
    		}

    		if(tokenParams.clientId === '') {
    			callback(new ErrorInfo('clientId can’t be an empty string', 40012, 400));
    			return;
    		}

    		if('capability' in tokenParams) {
    			tokenParams.capability = c14n(tokenParams.capability);
    		}

    		var request = Utils.mixin({ keyName: keyName }, tokenParams),
    			clientId = tokenParams.clientId || '',
    			ttl = tokenParams.ttl || '',
    			capability = tokenParams.capability || '',
    			self = this;

    		(function(authoriseCb) {
    			if(request.timestamp) {
    				authoriseCb();
    				return;
    			}			self.getTimestamp(authOptions && authOptions.queryTime, function(err, time) {
    				if(err) {callback(err); return;}
    				request.timestamp = time;
    				authoriseCb();
    			});
    		})(function() {
    			/* nonce */
    			/* NOTE: there is no expectation that the client
    			 * specifies the nonce; this is done by the library
    			 * However, this can be overridden by the client
    			 * simply for testing purposes. */
    			var nonce = request.nonce || (request.nonce = random()),
    				timestamp = request.timestamp;

    			var signText
    			=	request.keyName + '\n'
    			+	ttl + '\n'
    			+	capability + '\n'
    			+	clientId + '\n'
    			+	timestamp + '\n'
    			+	nonce + '\n';

    			/* mac */
    			/* NOTE: there is no expectation that the client
    			 * specifies the mac; this is done by the library
    			 * However, this can be overridden by the client
    			 * simply for testing purposes. */
    			request.mac = request.mac || hmac(signText, keySecret);

    			Logger.logAction(Logger.LOG_MINOR, 'Auth.getTokenRequest()', 'generated signed request');
    			callback(null, request);
    		});
    	};

    	/**
    	 * Get the auth query params to use for a websocket connection,
    	 * based on the current auth parameters
    	 */
    	Auth.prototype.getAuthParams = function(callback) {
    		if(this.method == 'basic')
    			callback(null, {key: this.key});
    		else
    			this._ensureValidAuthCredentials(false, function(err, tokenDetails) {
    				if(err) {
    					callback(err);
    					return;
    				}
    				callback(null, {access_token: tokenDetails.token});
    			});
    	};

    	/**
    	 * Get the authorization header to use for a REST or comet request,
    	 * based on the current auth parameters
    	 */
    	Auth.prototype.getAuthHeaders = function(callback) {
    		if(this.method == 'basic') {
    			callback(null, {authorization: 'Basic ' + this.basicKey});
    		} else {
    			this._ensureValidAuthCredentials(false, function(err, tokenDetails) {
    				if(err) {
    					callback(err);
    					return;
    				}
    				callback(null, {authorization: 'Bearer ' + toBase64(tokenDetails.token)});
    			});
    		}
    	};

    	/**
    	 * Get the current time based on the local clock,
    	 * or if the option queryTime is true, return the server time.
    	 * The server time offset from the local time is stored so that
    	 * only one request to the server to get the time is ever needed
    	 */
    	Auth.prototype.getTimestamp = function(queryTime, callback) {
    		if (!this.isTimeOffsetSet() && (queryTime || this.authOptions.queryTime)) {
    			this.client.time(callback);
    		} else {
    			callback(null, this.getTimestampUsingOffset());
    		}
    	};

    	Auth.prototype.getTimestampUsingOffset = function() {
    		return Utils.now() + (this.client.serverTimeOffset || 0);
    	};

    	Auth.prototype.isTimeOffsetSet = function() {
    		return this.client.serverTimeOffset !== null;
    	};

    	Auth.prototype._saveBasicOptions = function(authOptions) {
    		this.method = 'basic';
    		this.key = authOptions.key;
    		this.basicKey = toBase64(authOptions.key);
    		this.authOptions = authOptions || {};
    		if('clientId' in authOptions) {
    			this._userSetClientId(authOptions.clientId);
    		}
    	};

    	Auth.prototype._saveTokenOptions = function(tokenParams, authOptions) {
    		this.method = 'token';

    		if(tokenParams) {
    			/* We temporarily persist tokenParams.timestamp in case a new token needs
    			 * to be requested, then null it out in the callback of
    			 * _ensureValidAuthCredentials for RSA10g compliance */
    			this.tokenParams = tokenParams;
    		}

    		if(authOptions) {
    			/* normalise */
    			if(authOptions.token) {
    				/* options.token may contain a token string or, for convenience, a TokenDetails */
    				authOptions.tokenDetails = (typeof(authOptions.token) === 'string') ? {token: authOptions.token} : authOptions.token;
    			}

    			if(authOptions.tokenDetails) {
    				this.tokenDetails = authOptions.tokenDetails;
    			}

    			if('clientId' in authOptions) {
    				this._userSetClientId(authOptions.clientId);
    			}

    			this.authOptions = authOptions;
    		}
    	};

    	/* @param forceSupersede: force a new token request even if there's one in
    	 * progress, making all pending callbacks wait for the new one */
    	Auth.prototype._ensureValidAuthCredentials = function(forceSupersede, callback) {
    		var self = this,
    			token = this.tokenDetails;

    		if(token) {
    			if(this._tokenClientIdMismatch(token.clientId)) {
    				/* 403 to trigger a permanently failed client - RSA15c */
    				callback(new ErrorInfo('Mismatch between clientId in token (' + token.clientId + ') and current clientId (' + this.clientId + ')', 40102, 403));
    				return;
    			}
    			/* RSA4b1 -- if we have a server time offset set already, we can
    			 * autoremove expired tokens. Else just use the cached token. If it is
    			 * expired Ably will tell us and we'll discard it then. */
    			if(!this.isTimeOffsetSet() || !token.expires || (token.expires >= this.getTimestampUsingOffset())) {
    				Logger.logAction(Logger.LOG_MINOR, 'Auth.getToken()', 'using cached token; expires = ' + token.expires);
    				callback(null, token);
    				return;
    			}
    			/* expired, so remove and fallthrough to getting a new one */
    			Logger.logAction(Logger.LOG_MINOR, 'Auth.getToken()', 'deleting expired token');
    			this.tokenDetails = null;
    		}

    		(this.waitingForTokenRequest || (this.waitingForTokenRequest = Multicaster())).push(callback);
    		if(this.currentTokenRequestId !== null && !forceSupersede) {
    			return;
    		}

    		/* Request a new token */
    		var tokenRequestId = this.currentTokenRequestId = getTokenRequestId();
    		this.requestToken(this.tokenParams, this.authOptions, function(err, tokenResponse) {
    			if(self.currentTokenRequestId > tokenRequestId) {
    				Logger.logAction(Logger.LOG_MINOR, 'Auth._ensureValidAuthCredentials()', 'Discarding token request response; overtaken by newer one');
    				return;
    			}
    			self.currentTokenRequestId = null;
    			var callbacks = self.waitingForTokenRequest || noop;
    			self.waitingForTokenRequest = null;
    			if(err) {
    				callbacks(err);
    				return;
    			}
    			callbacks(null, (self.tokenDetails = tokenResponse));
    		});
    	};


    	/* User-set: check types, '*' is disallowed, throw any errors */
    	Auth.prototype._userSetClientId = function(clientId) {
    		if(!(typeof(clientId) === 'string' || clientId === null)) {
    			throw new ErrorInfo('clientId must be either a string or null', 40012, 400);
    		} else if(clientId === '*') {
    			throw new ErrorInfo('Can’t use "*" as a clientId as that string is reserved. (To change the default token request behaviour to use a wildcard clientId, instantiate the library with {defaultTokenParams: {clientId: "*"}}), or if calling authorize(), pass it in as a tokenParam: authorize({clientId: "*"}, authOptions)', 40012, 400);
    		} else {
    			var err = this._uncheckedSetClientId(clientId);
    			if(err) throw err;
    		}
    	};

    	/* Ably-set: no typechecking, '*' is allowed but not set on this.clientId), return errors to the caller */
    	Auth.prototype._uncheckedSetClientId = function(clientId) {
    		if(this._tokenClientIdMismatch(clientId)) {
    			/* Should never happen in normal circumstances as realtime should
    			 * recognise mismatch and return an error */
    			var msg = 'Unexpected clientId mismatch: client has ' + this.clientId + ', requested ' + clientId;
    			var err = new ErrorInfo(msg, 40102, 401);
    			Logger.logAction(Logger.LOG_ERROR, 'Auth._uncheckedSetClientId()', msg);
    			return err;
    		} else {
    			/* RSA7a4: if options.clientId is provided and is not
    			 * null, it overrides defaultTokenParams.clientId */
    			this.clientId = this.tokenParams.clientId = clientId;
    			return null;
    		}
    	};

    	Auth.prototype._tokenClientIdMismatch = function(tokenClientId) {
    		return this.clientId &&
    			(this.clientId !== '*') &&
    			tokenClientId &&
    			(tokenClientId !== '*') &&
    			(this.clientId !== tokenClientId);
    	};

    	Auth.isTokenErr = function(error) {
    		return error.code && (error.code >= 40140) && (error.code < 40150);
    	};

    	return Auth;
    })();

    var Rest = (function() {
    	var noop = function() {};
    	var msgpack = Platform.msgpack;

    	function Rest(options) {
    		if(!(this instanceof Rest)){
    			return new Rest(options);
    		}

    		/* normalise options */
    		if(!options) {
    			var msg = 'no options provided';
    			Logger.logAction(Logger.LOG_ERROR, 'Rest()', msg);
    			throw new Error(msg);
    		}
    		options = Defaults.objectifyOptions(options);

    		if(options.log) {
    			Logger.setLog(options.log.level, options.log.handler);
    		}
    		Logger.logAction(Logger.LOG_MICRO, 'Rest()', 'initialized with clientOptions ' + Utils.inspect(options));

    		this.options = Defaults.normaliseOptions(options);

    		/* process options */
    		if(options.key) {
    			var keyMatch = options.key.match(/^([^:\s]+):([^:.\s]+)$/);
    			if(!keyMatch) {
    				var msg = 'invalid key parameter';
    				Logger.logAction(Logger.LOG_ERROR, 'Rest()', msg);
    				throw new Error(msg);
    			}
    			options.keyName = keyMatch[1];
    			options.keySecret = keyMatch[2];
    		}

    		if('clientId' in options) {
    			if(!(typeof(options.clientId) === 'string' || options.clientId === null))
    				throw new ErrorInfo('clientId must be either a string or null', 40012, 400);
    			else if(options.clientId === '*')
    				throw new ErrorInfo('Can’t use "*" as a clientId as that string is reserved. (To change the default token request behaviour to use a wildcard clientId, use {defaultTokenParams: {clientId: "*"}})', 40012, 400);
    		}

    		Logger.logAction(Logger.LOG_MINOR, 'Rest()', 'started; version = ' + Defaults.libstring);

    		this.baseUri = this.authority = function(host) { return Defaults.getHttpScheme(options) + host + ':' + Defaults.getPort(options, false); };
    		this._currentFallback = null;

    		this.serverTimeOffset = null;
    		this.auth = new Auth(this, options);
    		this.channels = new Channels(this);
    		this.push = new Push(this);
    	}

    	Rest.prototype.stats = function(params, callback) {
    		/* params and callback are optional; see if params contains the callback */
    		if(callback === undefined) {
    			if(typeof(params) == 'function') {
    				callback = params;
    				params = null;
    			} else {
    				if(this.options.promises) {
    					return Utils.promisify(this, 'stats', arguments);
    				}
    				callback = noop;
    			}
    		}
    		var headers = Utils.defaultGetHeaders(),
    			format = this.options.useBinaryProtocol ? 'msgpack' : 'json',
    			envelope = Http.supportsLinkHeaders ? undefined : format;

    		if(this.options.headers)
    			Utils.mixin(headers, this.options.headers);

    		(new PaginatedResource(this, '/stats', headers, envelope, function(body, headers, unpacked) {
    			var statsValues = (unpacked ? body : JSON.parse(body));
    			for(var i = 0; i < statsValues.length; i++) statsValues[i] = Stats.fromValues(statsValues[i]);
    			return statsValues;
    		})).get(params, callback);
    	};

    	Rest.prototype.time = function(params, callback) {
    		/* params and callback are optional; see if params contains the callback */
    		if(callback === undefined) {
    			if(typeof(params) == 'function') {
    				callback = params;
    				params = null;
    			} else {
    				if(this.options.promises) {
    					return Utils.promisify(this, 'time', arguments);
    				}
    				callback = noop;
    			}
    		}
    		var headers = Utils.defaultGetHeaders();
    		if(this.options.headers)
    			Utils.mixin(headers, this.options.headers);
    		var self = this;
    		var timeUri = function(host) { return self.authority(host) + '/time' };
    		Http.get(this, timeUri, headers, params, function(err, res, headers, unpacked) {
    			if(err) {
    				callback(err);
    				return;
    			}
    			if(!unpacked) res = JSON.parse(res);
    			var time = res[0];
    			if(!time) {
    				err = new Error('Internal error (unexpected result type from GET /time)');
    				err.statusCode = 500;
    				callback(err);
    				return;
    			}
    			/* calculate time offset only once for this device by adding to the prototype */
    			self.serverTimeOffset = (time - Utils.now());
    			callback(null, time);
    		});
    	};

    	Rest.prototype.request = function(method, path, params, body, customHeaders, callback) {
    		var useBinary = this.options.useBinaryProtocol,
    			encoder = useBinary ? msgpack.encode: JSON.stringify,
    			decoder = useBinary ? msgpack.decode : JSON.parse,
    			format = useBinary ? 'msgpack' : 'json',
    			envelope = Http.supportsLinkHeaders ? undefined : format;
    		params = params || {};
    		method = method.toLowerCase();
    		var headers = method == 'get' ? Utils.defaultGetHeaders(format) : Utils.defaultPostHeaders(format);

    		if(callback === undefined) {
    			if(this.options.promises) {
    				return Utils.promisify(this, 'request', [method, path, params, body, customHeaders]);
    			}
    			callback = noop;
    		}

    		if(typeof body !== 'string') {
    			body = encoder(body);
    		}
    		if(this.options.headers) {
    			Utils.mixin(headers, this.options.headers);
    		}
    		if(customHeaders) {
    			Utils.mixin(headers, customHeaders);
    		}
    		var paginatedResource = new PaginatedResource(this, path, headers, envelope, function(resbody, headers, unpacked) {
    			return Utils.ensureArray(unpacked ? resbody : decoder(resbody));
    		}, /* useHttpPaginatedResponse: */ true);

    		if(!Utils.arrIn(Http.methods, method)) {
    			throw new ErrorInfo('Unsupported method ' + method, 40500, 405);
    		}

    		if(Utils.arrIn(Http.methodsWithBody, method)) {
    			paginatedResource[method](params, body, callback);
    		} else {
    			paginatedResource[method](params, callback);
    		}
    	};

    	Rest.prototype.setLog = function(logOptions) {
    		Logger.setLog(logOptions.level, logOptions.handler);
    	};

    	function Channels(rest) {
    		this.rest = rest;
    		this.attached = {};
    	}

    	Channels.prototype.get = function(name, channelOptions) {
    		name = String(name);
    		var channel = this.attached[name];
    		if(!channel) {
    			this.attached[name] = channel = new Channel(this.rest, name, channelOptions);
    		} else if(channelOptions) {
    			channel.setOptions(channelOptions);
    		}

    		return channel;
    	};

    	Channels.prototype.release = function(name) {
    		delete this.attached[String(name)];
    	};

    	return Rest;
    })();

    Rest.Promise = function(options) {
    	options = Defaults.objectifyOptions(options);
    	options.promises = true;
    	return new Rest(options);
    };

    Rest.Callbacks = Rest;

    var Realtime = (function() {

    	function Realtime(options) {
    		if(!(this instanceof Realtime)){
    			return new Realtime(options);
    		}

    		Logger.logAction(Logger.LOG_MINOR, 'Realtime()', '');
    		Rest.call(this, options);
    		this.connection = new Connection(this, this.options);
    		this.channels = new Channels(this);
    		if(options.autoConnect !== false)
    			this.connect();
    	}
    	Utils.inherits(Realtime, Rest);

    	Realtime.prototype.connect = function() {
    		Logger.logAction(Logger.LOG_MINOR, 'Realtime.connect()', '');
    		this.connection.connect();
    	};

    	Realtime.prototype.close = function() {
    		Logger.logAction(Logger.LOG_MINOR, 'Realtime.close()', '');
    		this.connection.close();
    	};

    	function Channels(realtime) {
    		EventEmitter.call(this);
    		this.realtime = realtime;
    		this.all = {};
    		this.inProgress = {};
    		var self = this;
    		realtime.connection.connectionManager.on('transport.active', function() {
    			self.onTransportActive();
    		});
    	}
    	Utils.inherits(Channels, EventEmitter);

    	Channels.prototype.onChannelMessage = function(msg) {
    		var channelName = msg.channel;
    		if(channelName === undefined) {
    			Logger.logAction(Logger.LOG_ERROR, 'Channels.onChannelMessage()', 'received event unspecified channel, action = ' + msg.action);
    			return;
    		}
    		var channel = this.all[channelName];
    		if(!channel) {
    			Logger.logAction(Logger.LOG_ERROR, 'Channels.onChannelMessage()', 'received event for non-existent channel: ' + channelName);
    			return;
    		}
    		channel.onMessage(msg);
    	};

    	/* called when a transport becomes connected; reattempt attach/detach
    	 * for channels that are attaching or detaching.
    	 * Note that this does not use inProgress as inProgress is only channels which have already made
    	* at least one attempt to attach/detach */
    	Channels.prototype.onTransportActive = function() {
    		for(var channelName in this.all) {
    			var channel = this.all[channelName];
    			if(channel.state === 'attaching' || channel.state === 'detaching') {
    				channel.checkPendingState();
    			} else if(channel.state === 'suspended') {
    				channel.attach();
    			}
    		}
    	};

    	Channels.prototype.reattach = function(reason) {
    		for(var channelId in this.all) {
    			var channel = this.all[channelId];
    			/* NB this should not trigger for merely attaching channels, as they will
    			 * be reattached anyway through the onTransportActive checkPendingState */
    			if(channel.state === 'attached') {
    				channel.requestState('attaching', reason);
    			}
    		}
    	};

    	Channels.prototype.resetAttachedMsgIndicators = function() {
    		for(var channelId in this.all) {
    			var channel = this.all[channelId];
    			if(channel.state === 'attached') {
    			channel._attachedMsgIndicator = false;
    			}
    		}
    	};

    	Channels.prototype.checkAttachedMsgIndicators = function(connectionId) {
    		for(var channelId in this.all) {
    			var channel = this.all[channelId];
    			if(channel.state === 'attached' && channel._attachedMsgIndicator === false) {
    				var msg = '30s after a resume, found channel which has not received an attached; channelId = ' + channelId + '; connectionId = ' + connectionId;
    				Logger.logAction(Logger.LOG_ERROR, 'Channels.checkAttachedMsgIndicators()', msg);
    				ErrorReporter.report('error', msg, 'channel-no-attached-after-resume');
    				channel.requestState('attaching');
    			}		}
    	};

    	/* Connection interruptions (ie when the connection will no longer queue
    	 * events) imply connection state changes for any channel which is either
    	 * attached, pending, or will attempt to become attached in the future */
    	Channels.prototype.propogateConnectionInterruption = function(connectionState, reason) {
    		var connectionStateToChannelState = {
    			'closing'  : 'detached',
    			'closed'   : 'detached',
    			'failed'   : 'failed',
    			'suspended': 'suspended'
    		};
    		var fromChannelStates = ['attaching', 'attached', 'detaching', 'suspended'];
    		var toChannelState = connectionStateToChannelState[connectionState];

    		for(var channelId in this.all) {
    			var channel = this.all[channelId];
    			if(Utils.arrIn(fromChannelStates, channel.state)) {
    				 channel.notifyState(toChannelState, reason);
    			}
    		}
    	};

    	Channels.prototype.get = function(name, channelOptions) {
    		name = String(name);
    		var channel = this.all[name];
    		if(!channel) {
    			channel = this.all[name] = new RealtimeChannel(this.realtime, name, channelOptions);
    		} else if(channelOptions) {
    			channel.setOptions(channelOptions);
    		}
    		return channel;
    	};

    	Channels.prototype.release = function(name) {
    		var channel = this.all[name];
    		if(channel) {
    			delete this.all[name];
    		}
    	};

    	/* Records operations currently pending on a transport; used by connectionManager to decide when
    	 * it's safe to upgrade. Note that a channel might be in the attaching state without any pending
    	 * operations (eg if attached while the connection state is connecting) - such a channel must not
    	 * hold up an upgrade, so is not considered inProgress.
    	 * Operation is currently one of either 'statechange' or 'sync' */
    	Channels.prototype.setInProgress = function(channel, operation, inProgress) {
    		this.inProgress[channel.name] = this.inProgress[channel.name] || {};
    		this.inProgress[channel.name][operation] = inProgress;
    		if(!inProgress && this.hasNopending()) {
    			this.emit('nopending');
    		}
    	};

    	Channels.prototype.onceNopending = function(listener) {
    		if(this.hasNopending()) {
    			listener();
    			return;
    		}
    		this.once('nopending', listener);
    	};

    	Channels.prototype.hasNopending = function() {
    		return Utils.arrEvery(Utils.valuesArray(this.inProgress, true), function(operations) {
    			return !Utils.containsValue(operations, true);
    		});
    	};

    	return Realtime;
    })();

    Realtime.Promise = function(options) {
    	options = Defaults.objectifyOptions(options);
    	options.promises = true;
    	return new Realtime(options);
    };

    Realtime.Callbacks = Realtime;

    var ConnectionStateChange = (function() {

    	/* public constructor */
    	function ConnectionStateChange(previous, current, retryIn, reason) {
    		this.previous = previous;
    		this.current = current;
    		if(retryIn) this.retryIn = retryIn;
    		if(reason) this.reason = reason;
    	}

    	return ConnectionStateChange;
    })();

    var ChannelStateChange = (function() {

    	/* public constructor */
    	function ChannelStateChange(previous, current, resumed, reason) {
    		this.previous = previous;
    		this.current = current;
    		if(current === 'attached') this.resumed = resumed;
    		if(reason) this.reason = reason;
    	}

    	return ChannelStateChange;
    })();

    var Connection = (function() {
    	function noop() {}

    	/* public constructor */
    	function Connection(ably, options) {
    		EventEmitter.call(this);
    		this.ably = ably;
    		this.connectionManager = new ConnectionManager(ably, options);
    		this.state = this.connectionManager.state.state;
    		this.key = undefined;
    		this.id = undefined;
    		this.serial = undefined;
    		this.timeSerial = undefined;
    		this.recoveryKey = undefined;
    		this.errorReason = null;

    		var self = this;
    		this.connectionManager.on('connectionstate', function(stateChange) {
    			var state = self.state = stateChange.current;
    			Utils.nextTick(function() {
    				self.emit(state, stateChange);
    			});
    		});
    		this.connectionManager.on('update', function(stateChange) {
    			Utils.nextTick(function() {
    				self.emit('update', stateChange);
    			});
    		});
    	}
    	Utils.inherits(Connection, EventEmitter);

    	Connection.prototype.whenState = function(state, listener) {
    		EventEmitter.prototype.whenState.call(this, state, this.state, listener, new ConnectionStateChange(undefined, state));
    	};

    	Connection.prototype.connect = function() {
    		Logger.logAction(Logger.LOG_MINOR, 'Connection.connect()', '');
    		this.connectionManager.requestState({state: 'connecting'});
    	};

    	Connection.prototype.ping = function(callback) {
    		Logger.logAction(Logger.LOG_MINOR, 'Connection.ping()', '');
    		if(!callback) {
    			if(this.ably.options.promises) {
    				return Utils.promisify(this, 'ping', arguments);
    			}
    			callback = noop;
    		}
    		this.connectionManager.ping(null, callback);
    	};

    	Connection.prototype.close = function() {
    		Logger.logAction(Logger.LOG_MINOR, 'Connection.close()', 'connectionKey = ' + this.key);
    		this.connectionManager.requestState({state: 'closing'});
    	};

    	return Connection;
    })();

    var Push = (function() {
    	var noop = function() {};

    	function Push(rest) {
    		this.rest = rest;
    		this.admin = new Admin(rest);
    	}

    	function Admin(rest) {
    		this.rest = rest;
    		this.deviceRegistrations = new DeviceRegistrations(rest);
    		this.channelSubscriptions = new ChannelSubscriptions(rest);
    	}

    	Admin.prototype.publish = function(recipient, payload, callback) {
    		var rest = this.rest;
    		var format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
    			requestBody = Utils.mixin({recipient: recipient}, payload),
    			headers = Utils.defaultPostHeaders(format),
    			params = {};

    		if(typeof callback !== 'function') {
    			if(this.rest.options.promises) {
    				return Utils.promisify(this, 'publish', arguments);
    			}
    			callback = noop;
    		}

    		if(rest.options.headers)
    			Utils.mixin(headers, rest.options.headers);

    		if(rest.options.pushFullWait)
    			Utils.mixin(params, {fullWait: 'true'});

    		requestBody = Utils.encodeBody(requestBody, format);
    		Resource.post(rest, '/push/publish', requestBody, headers, params, false, function(err) { callback(err); });
    	};

    	function DeviceRegistrations(rest) {
    		this.rest = rest;
    	}

    	DeviceRegistrations.prototype.save = function(device, callback) {
    		var rest = this.rest;
    		var format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
    			requestBody = DeviceDetails.fromValues(device),
    			headers = Utils.defaultPostHeaders(format),
    			params = {};

    		if(typeof callback !== 'function') {
    			if(this.rest.options.promises) {
    				return Utils.promisify(this, 'save', arguments);
    			}
    			callback = noop;
    		}

    		if(rest.options.headers)
    			Utils.mixin(headers, rest.options.headers);

    		if(rest.options.pushFullWait)
    			Utils.mixin(params, {fullWait: 'true'});

    		requestBody = Utils.encodeBody(requestBody, format);
    		Resource.put(rest, '/push/deviceRegistrations/' + encodeURIComponent(device.id), requestBody, headers, params, false, function(err, body, headers, unpacked) {
    			callback(err, !err && DeviceDetails.fromResponseBody(body, !unpacked && format));
    		});
    	};

    	DeviceRegistrations.prototype.get = function(deviceIdOrDetails, callback) {
    		var rest = this.rest,
    			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
    			headers = Utils.defaultGetHeaders(format),
    			deviceId = deviceIdOrDetails.id || deviceIdOrDetails;

    		if(typeof callback !== 'function') {
    			if(this.rest.options.promises) {
    				return Utils.promisify(this, 'get', arguments);
    			}
    			callback = noop;
    		}

    		if(typeof deviceId !== 'string' || !deviceId.length) {
    			callback(new ErrorInfo('First argument to DeviceRegistrations#get must be a deviceId string or DeviceDetails', 40000, 400));
    			return;
    		}

    		if(rest.options.headers)
    			Utils.mixin(headers, rest.options.headers);

    		Resource.get(rest, '/push/deviceRegistrations/' + encodeURIComponent(deviceId), headers, {}, false, function(err, body, headers, unpacked) {
    			callback(err, !err && DeviceDetails.fromResponseBody(body, !unpacked && format));
    		});
    	};

    	DeviceRegistrations.prototype.list = function(params, callback) {
    		var rest = this.rest,
    			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
    			envelope = Http.supportsLinkHeaders ? undefined : format,
    			headers = Utils.defaultGetHeaders(format);

    		if(typeof callback !== 'function') {
    			if(this.rest.options.promises) {
    				return Utils.promisify(this, 'list', arguments);
    			}
    			callback = noop;
    		}

    		if(rest.options.headers)
    			Utils.mixin(headers, rest.options.headers);

    		(new PaginatedResource(rest, '/push/deviceRegistrations', headers, envelope, function(body, headers, unpacked) {
    			return DeviceDetails.fromResponseBody(body, !unpacked && format);
    		})).get(params, callback);
    	};

    	DeviceRegistrations.prototype.remove = function(deviceIdOrDetails, callback) {
    		var rest = this.rest,
    			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
    			headers = Utils.defaultGetHeaders(format),
    			params = {},
    			deviceId = deviceIdOrDetails.id || deviceIdOrDetails;

    		if(typeof callback !== 'function') {
    			if(this.rest.options.promises) {
    				return Utils.promisify(this, 'remove', arguments);
    			}
    			callback = noop;
    		}

    		if(typeof deviceId !== 'string' || !deviceId.length) {
    			callback(new ErrorInfo('First argument to DeviceRegistrations#remove must be a deviceId string or DeviceDetails', 40000, 400));
    			return;
    		}

    		if(rest.options.headers)
    			Utils.mixin(headers, rest.options.headers);

    		if(rest.options.pushFullWait)
    			Utils.mixin(params, {fullWait: 'true'});

    		Resource['delete'](rest, '/push/deviceRegistrations/' + encodeURIComponent(deviceId), headers, params, false, function(err) { callback(err); });
    	};

    	DeviceRegistrations.prototype.removeWhere = function(params, callback) {
    		var rest = this.rest,
    			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
    			headers = Utils.defaultGetHeaders(format);

    		if(typeof callback !== 'function') {
    			if(this.rest.options.promises) {
    				return Utils.promisify(this, 'removeWhere', arguments);
    			}
    			callback = noop;
    		}

    		if(rest.options.headers)
    			Utils.mixin(headers, rest.options.headers);

    		if(rest.options.pushFullWait)
    			Utils.mixin(params, {fullWait: 'true'});

    		Resource['delete'](rest, '/push/deviceRegistrations', headers, params, false, function(err) { callback(err); });
    	};

    	function ChannelSubscriptions(rest) {
    		this.rest = rest;
    	}

    	ChannelSubscriptions.prototype.save = function(subscription, callback) {
    		var rest = this.rest;
    		var format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
    			requestBody = PushChannelSubscription.fromValues(subscription),
    			headers = Utils.defaultPostHeaders(format),
    			params = {};

    		if(typeof callback !== 'function') {
    			if(this.rest.options.promises) {
    				return Utils.promisify(this, 'save', arguments);
    			}
    			callback = noop;
    		}

    		if(rest.options.headers)
    			Utils.mixin(headers, rest.options.headers);

    		if(rest.options.pushFullWait)
    			Utils.mixin(params, {fullWait: 'true'});

    		requestBody = Utils.encodeBody(requestBody, format);
    		Resource.post(rest, '/push/channelSubscriptions', requestBody, headers, params, false, function(err, body, headers, unpacked) {
    			callback(err, !err && PushChannelSubscription.fromResponseBody(body, !unpacked && format));
    		});
    	};

    	ChannelSubscriptions.prototype.list = function(params, callback) {
    		var rest = this.rest,
    			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
    			envelope = Http.supportsLinkHeaders ? undefined : format,
    			headers = Utils.defaultGetHeaders(format);

    		if(typeof callback !== 'function') {
    			if(this.rest.options.promises) {
    				return Utils.promisify(this, 'list', arguments);
    			}
    			callback = noop;
    		}

    		if(rest.options.headers)
    			Utils.mixin(headers, rest.options.headers);

    		(new PaginatedResource(rest, '/push/channelSubscriptions', headers, envelope, function(body, headers, unpacked) {
    			return PushChannelSubscription.fromResponseBody(body, !unpacked && format);
    		})).get(params, callback);
    	};

    	ChannelSubscriptions.prototype.removeWhere = function(params, callback) {
    		var rest = this.rest,
    			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
    			headers = Utils.defaultGetHeaders(format);

    		if(typeof callback !== 'function') {
    			if(this.rest.options.promises) {
    				return Utils.promisify(this, 'removeWhere', arguments);
    			}
    			callback = noop;
    		}

    		if(rest.options.headers)
    			Utils.mixin(headers, rest.options.headers);

    		if(rest.options.pushFullWait)
    			Utils.mixin(params, {fullWait: 'true'});

    		Resource['delete'](rest, '/push/channelSubscriptions', headers, params, false, function(err) { callback(err); });
    	};

    	/* ChannelSubscriptions have no unique id; removing one is equivalent to removeWhere by its properties */
    	ChannelSubscriptions.prototype.remove = ChannelSubscriptions.prototype.removeWhere;

    	ChannelSubscriptions.prototype.listChannels = function(params, callback) {
    		var rest = this.rest,
    			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
    			envelope = Http.supportsLinkHeaders ? undefined : format,
    			headers = Utils.defaultGetHeaders(format);

    		if(typeof callback !== 'function') {
    			if(this.rest.options.promises) {
    				return Utils.promisify(this, 'listChannels', arguments);
    			}
    			callback = noop;
    		}

    		if(rest.options.headers)
    			Utils.mixin(headers, rest.options.headers);

    		if(rest.options.pushFullWait)
    			Utils.mixin(params, {fullWait: 'true'});

    		(new PaginatedResource(rest, '/push/channels', headers, envelope, function(body, headers, unpacked) {
    			var f = !unpacked && format;

    			if(f) {
    				body = Utils.decodeBody(body, format);
    			}

    			for(var i = 0; i < body.length; i++) {
    				body[i] = String(body[i]);
    			}
    			return body;
    		})).get(params, callback);
    	};

    	return Push;
    })();

    var Channel = (function() {
    	function noop() {}
    	var MSG_ID_ENTROPY_BYTES = 9;

    	/* public constructor */
    	function Channel(rest, name, channelOptions) {
    		Logger.logAction(Logger.LOG_MINOR, 'Channel()', 'started; name = ' + name);
    		EventEmitter.call(this);
    		this.rest = rest;
    		this.name = name;
    		this.basePath = '/channels/' + encodeURIComponent(name);
    		this.presence = new Presence(this);
    		this.setOptions(channelOptions);
    	}
    	Utils.inherits(Channel, EventEmitter);

    	Channel.prototype.setOptions = function(options) {
    		this.channelOptions = options = options || {};
    		if(options.cipher) {
    			if(!Crypto) throw new Error('Encryption not enabled; use ably.encryption.js instead');
    			var cipher = Crypto.getCipher(options.cipher);
    			options.cipher = cipher.cipherParams;
    			options.channelCipher = cipher.cipher;
    		} else if('cipher' in options) {
    			/* Don't deactivate an existing cipher unless options
    			 * has a 'cipher' key that's falsey */
    			options.cipher = null;
    			options.channelCipher = null;
    		}
    	};

    	Channel.prototype.history = function(params, callback) {
    		Logger.logAction(Logger.LOG_MICRO, 'Channel.history()', 'channel = ' + this.name);
    		/* params and callback are optional; see if params contains the callback */
    		if(callback === undefined) {
    			if(typeof(params) == 'function') {
    				callback = params;
    				params = null;
    			} else {
    				if(this.rest.options.promises) {
    					return Utils.promisify(this, 'history', arguments);
    				}
    				callback = noop;
    			}
    		}

    		this._history(params, callback);
    	};

    	Channel.prototype._history = function(params, callback) {
    		var rest = this.rest,
    			format = rest.options.useBinaryProtocol ? 'msgpack' : 'json',
    			envelope = Http.supportsLinkHeaders ? undefined : format,
    			headers = Utils.defaultGetHeaders(format);

    		if(rest.options.headers)
    			Utils.mixin(headers, rest.options.headers);

    		var options = this.channelOptions;
    		(new PaginatedResource(rest, this.basePath + '/messages', headers, envelope, function(body, headers, unpacked) {
    			return Message.fromResponseBody(body, options, !unpacked && format);
    		})).get(params, callback);
    	};

    	function allEmptyIds(messages) {
    		return Utils.arrEvery(messages, function(message) {
    			return !message.id;
    		});
    	}

    	Channel.prototype.publish = function() {
    		var argCount = arguments.length,
    			first = arguments[0],
    			second = arguments[1],
    			callback = arguments[argCount - 1],
    			messages,
    			params,
    			self = this;

    		if(typeof(callback) !== 'function') {
    			if(this.rest.options.promises) {
    				return Utils.promisify(this, 'publish', arguments);
    			}
    			callback = noop;
    		}

    		if(typeof first === 'string' || first === null) {
    			/* (name, data, ...) */
    			messages = [Message.fromValues({name: first, data: second})];
    			params = arguments[2];
    		} else if(Utils.isObject(first)) {
    			messages = [Message.fromValues(first)];
    			params = arguments[1];
    		} else if(Utils.isArray(first)) {
    			messages = Message.fromValuesArray(first);
    			params = arguments[1];
    		} else {
    			throw new ErrorInfo('The single-argument form of publish() expects a message object or an array of message objects', 40013, 400);
    		}

    		if(typeof params !== 'object' || !params) {
    			/* No params supplied (so after-message argument is just the callback or undefined) */
    			params = {};
    		}

    		var rest = this.rest,
    			options = rest.options,
    			format = options.useBinaryProtocol ? 'msgpack' : 'json',
    			idempotentRestPublishing = rest.options.idempotentRestPublishing,
    			headers = Utils.defaultPostHeaders(format);

    		if(options.headers)
    			Utils.mixin(headers, options.headers);

    		if(idempotentRestPublishing && allEmptyIds(messages)) {
    			var msgIdBase = Utils.randomString(MSG_ID_ENTROPY_BYTES);
    			Utils.arrForEach(messages, function(message, index) {
    				message.id = msgIdBase + ':' + index.toString();
    			});
    		}

    		Message.encodeArray(messages, this.channelOptions, function(err) {
    			if(err) {
    				callback(err);
    				return;
    			}

    			/* RSL1i */
    			var size = Message.getMessagesSize(messages),
    				maxMessageSize = options.maxMessageSize;
    			if(size > maxMessageSize) {
    				callback(new ErrorInfo('Maximum size of messages that can be published at once exceeded ( was ' + size + ' bytes; limit is ' + maxMessageSize + ' bytes)', 40009, 400));
    				return;
    			}

    			self._publish(Message.serialize(messages, format), headers, params, callback);
    		});
    	};

    	Channel.prototype._publish = function(requestBody, headers, params, callback) {
    		Resource.post(this.rest, this.basePath + '/messages', requestBody, headers, params, false, callback);
    	};

    	return Channel;
    })();

    var RealtimeChannel = (function() {
    	var actions = ProtocolMessage.Action;
    	var noop = function() {};
    	var statechangeOp = 'statechange';
    	var syncOp = 'sync';

    	/* public constructor */
    	function RealtimeChannel(realtime, name, options) {
    		Logger.logAction(Logger.LOG_MINOR, 'RealtimeChannel()', 'started; name = ' + name);
    		Channel.call(this, realtime, name, options);
    		this.realtime = realtime;
    		this.presence = new RealtimePresence(this, realtime.options);
    		this.connectionManager = realtime.connection.connectionManager;
    		this.state = 'initialized';
    		this.subscriptions = new EventEmitter();
    		this.syncChannelSerial = undefined;
    		this.properties = {
    			attachSerial: undefined
    		};
    		this.setOptions(options);
    		this.errorReason = null;
    		this._requestedFlags = null;
    		this._mode = null;
    		/* Temporary; only used for the checkChannelsOnResume option */
    		this._attachedMsgIndicator = false;
    	}
    	Utils.inherits(RealtimeChannel, Channel);

    	RealtimeChannel.invalidStateError = function(state) {
    		return {
    			statusCode: 400,
    			code: 90001,
    			message: 'Channel operation failed as channel state is ' + state
    		};
    	};

    	RealtimeChannel.progressOps = {
    		statechange: statechangeOp,
    		sync: syncOp
    	};

    	RealtimeChannel.processListenerArgs = function(args) {
    		/* [event], listener, [callback] */
    		args = Array.prototype.slice.call(args);
    		if(typeof args[0] === 'function') {
    			args.unshift(null);
    		}
    		if(args[args.length - 1] == undefined) {
    			args.pop();
    		}
    		return args;
    	};

    	RealtimeChannel.prototype.publish = function() {
    		var argCount = arguments.length,
    			messages = arguments[0],
    			callback = arguments[argCount - 1];

    		if(typeof(callback) !== 'function') {
    			if(this.realtime.options.promises) {
    				return Utils.promisify(this, 'publish', arguments);
    			}
    			callback = noop;
    			++argCount;
    		}
    		if(!this.connectionManager.activeState()) {
    			callback(this.connectionManager.getError());
    			return;
    		}
    		if(argCount == 2) {
    			if(Utils.isObject(messages))
    				messages = [Message.fromValues(messages)];
    			else if(Utils.isArray(messages))
    				messages = Message.fromValuesArray(messages);
    			else
    				throw new ErrorInfo('The single-argument form of publish() expects a message object or an array of message objects', 40013, 400);
    		} else {
    			messages = [Message.fromValues({name: arguments[0], data: arguments[1]})];
    		}
    		var self = this,
    			maxMessageSize = this.realtime.options.maxMessageSize;
    		Message.encodeArray(messages, this.channelOptions, function(err) {
    			if (err) {
    				callback(err);
    				return;
    			}
    			/* RSL1i */
    			var size = Message.getMessagesSize(messages);
    			if(size > maxMessageSize) {
    				callback(new ErrorInfo('Maximum size of messages that can be published at once exceeded ( was ' + size + ' bytes; limit is ' + maxMessageSize + ' bytes)', 40009, 400));
    				return;
    			}
    			self._publish(messages, callback);
    		});
    	};

    	RealtimeChannel.prototype._publish = function(messages, callback) {
    		Logger.logAction(Logger.LOG_MICRO, 'RealtimeChannel.publish()', 'message count = ' + messages.length);
    		var state = this.state;
    		switch(state) {
    			case 'failed':
    			case 'suspended':
    				callback(ErrorInfo.fromValues(RealtimeChannel.invalidStateError(state)));
    				break;
    			default:
    				Logger.logAction(Logger.LOG_MICRO, 'RealtimeChannel.publish()', 'sending message; channel state is ' + state);
    				var msg = new ProtocolMessage();
    				msg.action = actions.MESSAGE;
    				msg.channel = this.name;
    				msg.messages = messages;
    				this.sendMessage(msg, callback);
    				break;
    		}
    	};

    	RealtimeChannel.prototype.onEvent = function(messages) {
    		Logger.logAction(Logger.LOG_MICRO, 'RealtimeChannel.onEvent()', 'received message');
    		var subscriptions = this.subscriptions;
    		for(var i = 0; i < messages.length; i++) {
    			var message = messages[i];
    			subscriptions.emit(message.name, message);
    		}
    	};

    	RealtimeChannel.prototype.attach = function(flags, callback) {
    		if(typeof(flags) === 'function') {
    			callback = flags;
    			flags = null;
    		}
    		if(!callback) {
    			if(this.realtime.options.promises) {
    				return Utils.promisify(this, 'attach', arguments);
    			}
    			callback = function(err) {
    				if(err) {
    					Logger.logAction(Logger.LOG_MAJOR, 'RealtimeChannel.attach()', 'Channel attach failed: ' + err.toString());
    				}
    			};
    		}
    		if(flags) {
    			this._requestedFlags = flags;
    		}
    		var connectionManager = this.connectionManager;
    		if(!connectionManager.activeState()) {
    			callback(connectionManager.getError());
    			return;
    		}
    		switch(this.state) {
    			case 'attached':
    				/* If flags requested, always do a re-attach. TODO only do this if if
    				* current mode differs from requested mode */
    				if(!flags) {
    					callback();
    					break;
    				} /* else fallthrough */
    			default:
    				this.requestState('attaching');
    			case 'attaching':
    				this.once(function(stateChange) {
    					switch(this.event) {
    						case 'attached':
    							callback();
    							break;
    						case 'detached':
    						case 'suspended':
    						case 'failed':
    							callback(stateChange.reason || connectionManager.getError());
    							break;
    						case 'detaching':
    							callback(new ErrorInfo('Attach request superseded by a subsequent detach request', 90000, 409));
    							break;
    					}
    				});
    			}
    	};

    	RealtimeChannel.prototype.attachImpl = function() {
    		Logger.logAction(Logger.LOG_MICRO, 'RealtimeChannel.attachImpl()', 'sending ATTACH message');
    		this.setInProgress(statechangeOp, true);
    		var attachMsg = ProtocolMessage.fromValues({action: actions.ATTACH, channel: this.name});
    		if(this._requestedFlags) {
    			Utils.arrForEach(this._requestedFlags, function(flag) {
    				attachMsg.setFlag(flag);
    			});
    		}
    		this.sendMessage(attachMsg, noop);
    	};

    	RealtimeChannel.prototype.detach = function(callback) {
    		if(!callback) {
    			if(this.realtime.options.promises) {
    				return Utils.promisify(this, 'detach', arguments);
    			}
    			callback = noop;
    		}
    		var connectionManager = this.connectionManager;
    		if(!connectionManager.activeState()) {
    			callback(connectionManager.getError());
    			return;
    		}
    		switch(this.state) {
    			case 'detached':
    			case 'failed':
    				callback();
    				break;
    			default:
    				this.requestState('detaching');
    			case 'detaching':
    				this.once(function(stateChange) {
    					switch(this.event) {
    						case 'detached':
    							callback();
    							break;
    						case 'attached':
    						case 'suspended':
    						case 'failed':
    							callback(stateChange.reason || connectionManager.getError());
    							break;
    						case 'attaching':
    							callback(new ErrorInfo('Detach request superseded by a subsequent attach request', 90000, 409));
    							break;
    					}
    				});
    		}
    	};

    	RealtimeChannel.prototype.detachImpl = function(callback) {
    		Logger.logAction(Logger.LOG_MICRO, 'RealtimeChannel.detach()', 'sending DETACH message');
    		this.setInProgress(statechangeOp, true);
    		var msg = ProtocolMessage.fromValues({action: actions.DETACH, channel: this.name});
    		this.sendMessage(msg, (callback || noop));
    	};

    	RealtimeChannel.prototype.subscribe = function(/* [event], listener, [callback] */) {
    		var args = RealtimeChannel.processListenerArgs(arguments);
    		var event = args[0];
    		var listener = args[1];
    		var callback = args[2];

    		if(!callback) {
    			if(this.realtime.options.promises) {
    				return Utils.promisify(this, 'subscribe', [event, listener]);
    			}
    			callback = noop;
    		}

    		if(this.state === 'failed') {
    			callback(ErrorInfo.fromValues(RealtimeChannel.invalidStateError('failed')));
    			return;
    		}

    		this.subscriptions.on(event, listener);

    		return this.attach(callback);
    	};

    	RealtimeChannel.prototype.unsubscribe = function(/* [event], listener */) {
    		var args = RealtimeChannel.processListenerArgs(arguments);
    		var event = args[0];
    		var listener = args[1];
    		this.subscriptions.off(event, listener);
    	};

    	RealtimeChannel.prototype.sync = function() {
    		/* check preconditions */
    		switch(this.state) {
    			case 'initialized':
    			case 'detaching':
    			case 'detached':
    				throw new ErrorInfo("Unable to sync to channel; not attached", 40000);
    			default:
    		}
    		var connectionManager = this.connectionManager;
    		if(!connectionManager.activeState()) {
    			throw connectionManager.getError();
    		}

    		/* send sync request */
    		var syncMessage = ProtocolMessage.fromValues({action: actions.SYNC, channel: this.name});
    		if(this.syncChannelSerial) {
    			syncMessage.channelSerial = this.syncChannelSerial;
    		}
    		connectionManager.send(syncMessage);
    	};

    	RealtimeChannel.prototype.sendMessage = function(msg, callback) {
    		this.connectionManager.send(msg, this.realtime.options.queueMessages, callback);
    	};

    	RealtimeChannel.prototype.sendPresence = function(presence, callback) {
    		var msg = ProtocolMessage.fromValues({
    			action: actions.PRESENCE,
    			channel: this.name,
    			presence: (Utils.isArray(presence) ?
    				PresenceMessage.fromValuesArray(presence) :
    				[PresenceMessage.fromValues(presence)])
    		});
    		this.sendMessage(msg, callback);
    	};

    	RealtimeChannel.prototype.onMessage = function(message) {
    		var syncChannelSerial, isSync = false;
    		switch(message.action) {
    		case actions.ATTACHED:
    			this._attachedMsgIndicator = true;
    			this.properties.attachSerial = message.channelSerial;
    			this._mode = message.getMode();
    			if(this.state === 'attached') {
    				var resumed = message.hasFlag('RESUMED');
    				if(!resumed || this.channelOptions.updateOnAttached) {
    					/* On a loss of continuity, the presence set needs to be re-synced */
    					this.presence.onAttached(message.hasFlag('HAS_PRESENCE'));
    					var change = new ChannelStateChange(this.state, this.state, resumed, message.error);
    					this.emit('update', change);
    				}
    			} else {
    				this.notifyState('attached', message.error, message.hasFlag('RESUMED'), message.hasFlag('HAS_PRESENCE'));
    			}
    			break;

    		case actions.DETACHED:
    			var err = message.error ? ErrorInfo.fromValues(message.error) : new ErrorInfo('Channel detached', 90001, 404);
    			if(this.state === 'detaching') {
    				this.notifyState('detached', err);
    			} else if(this.state === 'attaching') {
    				/* Only retry immediately if we were previously attached. If we were
    				 * attaching, go into suspended, fail messages, and wait a few seconds
    				 * before retrying */
    				this.notifyState('suspended', err);
    			} else {
    				this.requestState('attaching', err);
    			}
    			break;

    		case actions.SYNC:
    			/* syncs can have channelSerials, but might not if the sync is one page long */
    			isSync = true;
    			syncChannelSerial = this.syncChannelSerial = message.channelSerial;
    			/* syncs can happen on channels with no presence data as part of connection
    			 * resuming, in which case protocol message has no presence property */
    			if(!message.presence) break;
    		case actions.PRESENCE:
    			var presence = message.presence,
    				id = message.id,
    				connectionId = message.connectionId,
    				timestamp = message.timestamp;

    			var options = this.channelOptions;
    			for(var i = 0; i < presence.length; i++) {
    				try {
    					var presenceMsg = presence[i];
    					PresenceMessage.decode(presenceMsg, options);
    				} catch (e) {
    					Logger.logAction(Logger.LOG_ERROR, 'RealtimeChannel.onMessage()', e.toString());
    				}
    				if(!presenceMsg.connectionId) presenceMsg.connectionId = connectionId;
    				if(!presenceMsg.timestamp) presenceMsg.timestamp = timestamp;
    				if(!presenceMsg.id) presenceMsg.id = id + ':' + i;
    			}
    			this.presence.setPresence(presence, isSync, syncChannelSerial);
    			break;

    		case actions.MESSAGE:
    			var messages = message.messages,
    				id = message.id,
    				connectionId = message.connectionId,
    				timestamp = message.timestamp;

    			var options = this.channelOptions;
    			for(var i = 0; i < messages.length; i++) {
    				try {
    					var msg = messages[i];
    					Message.decode(msg, options);
    				} catch (e) {
    					/* decrypt failed .. the most likely cause is that we have the wrong key */
    					Logger.logAction(Logger.LOG_MINOR, 'RealtimeChannel.onMessage()', e.toString());
    				}
    				if(!msg.connectionId) msg.connectionId = connectionId;
    				if(!msg.timestamp) msg.timestamp = timestamp;
    				if(!msg.id) msg.id = id + ':' + i;
    			}
    			this.onEvent(messages);
    			break;

    		case actions.ERROR:
    			/* there was a channel-specific error */
    			var err = message.error;
    			if(err && err.code == 80016) {
    				/* attach/detach operation attempted on superseded transport handle */
    				this.checkPendingState();
    			} else {
    				this.notifyState('failed', ErrorInfo.fromValues(err));
    			}
    			break;

    		default:
    			Logger.logAction(Logger.LOG_ERROR, 'RealtimeChannel.onMessage()', 'Fatal protocol error: unrecognised action (' + message.action + ')');
    			this.connectionManager.abort(ConnectionError.unknownChannelErr);
    		}
    	};

    	RealtimeChannel.prototype.onAttached = function() {
    		Logger.logAction(Logger.LOG_MINOR, 'RealtimeChannel.onAttached', 'activating channel; name = ' + this.name);
    	};

    	RealtimeChannel.prototype.notifyState = function(state, reason, resumed, hasPresence) {
    		Logger.logAction(Logger.LOG_MICRO, 'RealtimeChannel.notifyState', 'name = ' + this.name + ', current state = ' + this.state + ', notifying state ' + state);
    		this.clearStateTimer();

    		if(state === this.state) {
    			return;
    		}
    		this.presence.actOnChannelState(state, hasPresence, reason);
    		if(state === 'suspended' && this.connectionManager.state.sendEvents) {
    			this.startRetryTimer();
    		} else {
    			this.cancelRetryTimer();
    		}
    		if(reason) {
    			this.errorReason = reason;
    		}
    		var change = new ChannelStateChange(this.state, state, resumed, reason);
    		var logLevel = state === 'failed' ? Logger.LOG_ERROR : Logger.LOG_MAJOR;
    		Logger.logAction(logLevel, 'Channel state for channel "' + this.name + '"', state + (reason ? ('; reason: ' + reason) : ''));

    		/* Note: we don't set inProgress for pending states until the request is actually in progress */
    		if(state === 'attached') {
    			this.onAttached();
    			this.setInProgress(syncOp, hasPresence);
    			this.setInProgress(statechangeOp, false);
    		} else if(state === 'detached' || state === 'failed' || state === 'suspended') {
    			this.setInProgress(statechangeOp, false);
    			this.setInProgress(syncOp, false);
    		}

    		this.state = state;
    		this.emit(state, change);
    	};

    	RealtimeChannel.prototype.requestState = function(state, reason) {
    		Logger.logAction(Logger.LOG_MINOR, 'RealtimeChannel.requestState', 'name = ' + this.name + ', state = ' + state);
    		this.notifyState(state, reason);
    		/* send the event and await response */
    		this.checkPendingState();
    	};

    	RealtimeChannel.prototype.checkPendingState = function() {
    		/* if can't send events, do nothing */
    		var cmState = this.connectionManager.state;
    		/* Allow attach messages to queue up when synchronizing, since this will be
    		 * the state we'll be in when upgrade transport.active triggers a checkpendingstate */
    		if(!(cmState.sendEvents || cmState.forceQueueEvents)) {
    			Logger.logAction(Logger.LOG_MINOR, 'RealtimeChannel.checkPendingState', 'sendEvents is false; state is ' + this.connectionManager.state.state);
    			return;
    		}

    		Logger.logAction(Logger.LOG_MINOR, 'RealtimeChannel.checkPendingState', 'name = ' + this.name + ', state = ' + this.state);
    		/* Only start the state timer running when actually sending the event */
    		switch(this.state) {
    			case 'attaching':
    				this.startStateTimerIfNotRunning();
    				this.attachImpl();
    				break;
    			case 'detaching':
    				this.startStateTimerIfNotRunning();
    				this.detachImpl();
    				break;
    			case 'attached':
    				/* resume any sync operation that was in progress */
    				this.sync();
    			default:
    				break;
    		}
    	};

    	RealtimeChannel.prototype.timeoutPendingState = function() {
    		switch(this.state) {
    			case 'attaching':
    				var err = new ErrorInfo('Channel attach timed out', 90007, 408);
    				this.notifyState('suspended', err);
    				break;
    			case 'detaching':
    				var err = new ErrorInfo('Channel detach timed out', 90007, 408);
    				this.notifyState('attached', err);
    				break;
    			default:
    				this.checkPendingState();
    				break;
    		}
    	};

    	RealtimeChannel.prototype.startStateTimerIfNotRunning = function() {
    		var self = this;
    		if(!this.stateTimer) {
    			this.stateTimer = setTimeout(function() {
    				Logger.logAction(Logger.LOG_MINOR, 'RealtimeChannel.startStateTimerIfNotRunning', 'timer expired');
    				self.stateTimer = null;
    				self.timeoutPendingState();
    			}, this.realtime.options.timeouts.realtimeRequestTimeout);
    		}
    	};

    	RealtimeChannel.prototype.clearStateTimer = function() {
    		var stateTimer = this.stateTimer;
    		if(stateTimer) {
    			clearTimeout(stateTimer);
    			this.stateTimer = null;
    		}
    	};

    	RealtimeChannel.prototype.startRetryTimer = function() {
    		var self = this;
    		if(this.retryTimer) return;

    		this.retryTimer = setTimeout(function() {
    			/* If connection is not connected, just leave in suspended, a reattach
    			 * will be triggered once it connects again */
    			if(self.state === 'suspended' && self.connectionManager.state.sendEvents) {
    				self.retryTimer = null;
    				Logger.logAction(Logger.LOG_MINOR, 'RealtimeChannel retry timer expired', 'attempting a new attach');
    				self.requestState('attaching');
    			}
    		}, this.realtime.options.timeouts.channelRetryTimeout);
    	};

    	RealtimeChannel.prototype.cancelRetryTimer = function() {
    		if(this.retryTimer) {
    			clearTimeout(this.retryTimer);
    			this.suspendTimer = null;
    		}
    	};

    	RealtimeChannel.prototype.setInProgress = function(operation, value) {
    		this.rest.channels.setInProgress(this, operation, value);
    	};

    	RealtimeChannel.prototype.history = function(params, callback) {
    		Logger.logAction(Logger.LOG_MICRO, 'RealtimeChannel.history()', 'channel = ' + this.name);
    		/* params and callback are optional; see if params contains the callback */
    		if(callback === undefined) {
    			if(typeof(params) == 'function') {
    				callback = params;
    				params = null;
    			} else {
    				if(this.rest.options.promises) {
    					return Utils.promisify(this, 'history', arguments);
    				}
    				callback = noop;
    			}
    		}

    		if(params && params.untilAttach) {
    			if(this.state !== 'attached') {
    				callback(new ErrorInfo("option untilAttach requires the channel to be attached", 40000, 400));
    				return;
    			}
    			if(!this.properties.attachSerial) {
    				callback(new ErrorInfo("untilAttach was specified and channel is attached, but attachSerial is not defined", 40000, 400));
    				return;
    			}
    			delete params.untilAttach;
    			params.from_serial = this.properties.attachSerial;
    		}

    		Channel.prototype._history.call(this, params, callback);
    	};

    	RealtimeChannel.prototype.whenState = function(state, listener) {
    		EventEmitter.prototype.whenState.call(this, state, this.state, listener);
    	};

    	return RealtimeChannel;
    })();

    var RealtimePresence = (function() {
    	var noop = function() {};

    	function memberKey(item) {
    		return item.clientId + ':' + item.connectionId;
    	}

    	function getClientId(realtimePresence) {
    		return realtimePresence.channel.realtime.auth.clientId;
    	}

    	function isAnonymousOrWildcard(realtimePresence) {
    		var realtime = realtimePresence.channel.realtime;
    		/* If not currently connected, we can't assume that we're an anonymous
    		 * client, as realtime may inform us of our clientId in the CONNECTED
    		 * message. So assume we're not anonymous and leave it to realtime to
    		 * return an error if we are */
    		var clientId = realtime.auth.clientId;
    		return (!clientId || (clientId === '*')) && realtime.connection.state === 'connected';
    	}

    	/* Callback is called only in the event of an error */
    	function waitAttached(channel, callback, action) {
    		switch(channel.state) {
    			case 'attached':
    			case 'suspended':
    				action();
    				break;
    			case 'initialized':
    			case 'detached':
    			case 'detaching':
    			case 'attaching':
    				channel.attach(function(err) {
    					if(err) callback(err);
    					else action();
    				});
    				break;
    			default:
    				callback(ErrorInfo.fromValues(RealtimeChannel.invalidStateError(channel.state)));
    		}
    	}

    	function RealtimePresence(channel, options) {
    		Presence.call(this, channel);
    		this.syncComplete = false;
    		this.members = new PresenceMap(this);
    		this._myMembers = new PresenceMap(this);
    		this.subscriptions = new EventEmitter();
    		this.pendingPresence = [];
    	}
    	Utils.inherits(RealtimePresence, Presence);

    	RealtimePresence.prototype.enter = function(data, callback) {
    		if(isAnonymousOrWildcard(this)) {
    			throw new ErrorInfo('clientId must be specified to enter a presence channel', 40012, 400);
    		}
    		return this._enterOrUpdateClient(undefined, data, 'enter', callback);
    	};

    	RealtimePresence.prototype.update = function(data, callback) {
    		if(isAnonymousOrWildcard(this)) {
    			throw new ErrorInfo('clientId must be specified to update presence data', 40012, 400);
    		}
    		return this._enterOrUpdateClient(undefined, data, 'update', callback);
    	};

    	RealtimePresence.prototype.enterClient = function(clientId, data, callback) {
    		return this._enterOrUpdateClient(clientId, data, 'enter', callback);
    	};

    	RealtimePresence.prototype.updateClient = function(clientId, data, callback) {
    		return this._enterOrUpdateClient(clientId, data, 'update', callback);
    	};

    	RealtimePresence.prototype._enterOrUpdateClient = function(clientId, data, action, callback) {
    		if (!callback) {
    			if (typeof(data)==='function') {
    				callback = data;
    				data = null;
    			} else {
    				if(this.channel.realtime.options.promises) {
    					return Utils.promisify(this, '_enterOrUpdateClient', [clientId, data, action]);
    				}
    				callback = noop;
    			}
    		}

    		var channel = this.channel;
    		if(!channel.connectionManager.activeState()) {
    			callback(channel.connectionManager.getError());
    			return;
    		}

    		Logger.logAction(Logger.LOG_MICRO, 'RealtimePresence.' + action + 'Client()',
    		  'channel = ' + channel.name + ', client = ' + (clientId || '(implicit) ' + getClientId(this)));

    		var presence = PresenceMessage.fromValues({
    			action : action,
    			data   : data
    		});
    		if (clientId) {
    			presence.clientId = clientId;
    		}

    		var self = this;
    		PresenceMessage.encode(presence, channel.channelOptions, function(err) {
    			if (err) {
    				callback(err);
    				return;
    			}
    			switch(channel.state) {
    				case 'attached':
    					channel.sendPresence(presence, callback);
    					break;
    				case 'initialized':
    				case 'detached':
    					channel.attach();
    				case 'attaching':
    					self.pendingPresence.push({
    						presence : presence,
    						callback : callback
    					});
    					break;
    				default:
    					err = new ErrorInfo('Unable to ' + action + ' presence channel (incompatible state)', 90001);
    					err.code = 90001;
    					callback(err);
    			}
    		});
    	};

    	RealtimePresence.prototype.leave = function(data, callback) {
    		if(isAnonymousOrWildcard(this)) {
    			throw new ErrorInfo('clientId must have been specified to enter or leave a presence channel', 40012, 400);
    		}
    		return this.leaveClient(undefined, data, callback);
    	};

    	RealtimePresence.prototype.leaveClient = function(clientId, data, callback) {
    		if (!callback) {
    			if (typeof(data)==='function') {
    				callback = data;
    				data = null;
    			} else {
    				if(this.channel.realtime.options.promises) {
    					return Utils.promisify(this, 'leaveClient', [clientId, data]);
    				}
    				callback = noop;
    			}
    		}

    		var channel = this.channel;
    		if(!channel.connectionManager.activeState()) {
    			callback(channel.connectionManager.getError());
    			return;
    		}

    		Logger.logAction(Logger.LOG_MICRO, 'RealtimePresence.leaveClient()', 'leaving; channel = ' + this.channel.name + ', client = ' + clientId);
    		var presence = PresenceMessage.fromValues({
    			action : 'leave',
    			data   : data
    		});
    		if (clientId) { presence.clientId = clientId; }

    		switch(channel.state) {
    			case 'attached':
    				channel.sendPresence(presence, callback);
    				break;
    			case 'attaching':
    				this.pendingPresence.push({
    					presence : presence,
    					callback : callback
    				});
    				break;
    			case 'initialized':
    			case 'failed':
    				/* we're not attached; therefore we let any entered status
    				 * timeout by itself instead of attaching just in order to leave */
    				var err = new ErrorInfo('Unable to leave presence channel (incompatible state)', 90001);
    				callback(err);
    				break;
    			default:
    				/* there is no connection; therefore we let
    				 * any entered status timeout by itself */
    				callback(ConnectionError.failed);
    		}
    	};

    	RealtimePresence.prototype.get = function(/* params, callback */) {
    		var args = Array.prototype.slice.call(arguments);
    		if(args.length == 1 && typeof(args[0]) == 'function')
    			args.unshift(null);

    		var params = args[0],
    			callback = args[1],
    			waitForSync = !params || ('waitForSync' in params ? params.waitForSync : true);

    		if(!callback) {
    			if(this.channel.realtime.options.promises) {
    				return Utils.promisify(this, 'get', args);
    			}
    			callback = noop;
    		}

    		function returnMembers(members) {
    			callback(null, params ? members.list(params) : members.values());
    		}

    		/* Special-case the suspended state: can still get (stale) presence set if waitForSync is false */
    		if(this.channel.state === 'suspended') {
    			if(waitForSync) {
    				callback(ErrorInfo.fromValues({
    					statusCode: 400,
    					code: 91005,
    					message: 'Presence state is out of sync due to channel being in the SUSPENDED state'
    				}));
    			} else {
    				returnMembers(this.members);
    			}
    			return;
    		}

    		var self = this;
    		waitAttached(this.channel, callback, function() {
    			var members = self.members;
    			if(waitForSync) {
    				members.waitSync(function() {
    					returnMembers(members);
    				});
    			} else {
    				returnMembers(members);
    			}
    		});
    	};

    	RealtimePresence.prototype.history = function(params, callback) {
    		Logger.logAction(Logger.LOG_MICRO, 'RealtimePresence.history()', 'channel = ' + this.name);
    		/* params and callback are optional; see if params contains the callback */
    		if(callback === undefined) {
    			if(typeof(params) == 'function') {
    				callback = params;
    				params = null;
    			} else {
    				if(this.channel.realtime.options.promises) {
    					return Utils.promisify(this, 'history', arguments);
    				}
    				callback = noop;
    			}
    		}

    		if(params && params.untilAttach) {
    			if(this.channel.state === 'attached') {
    				delete params.untilAttach;
    				params.from_serial = this.channel.properties.attachSerial;
    			} else {
    				callback(new ErrorInfo("option untilAttach requires the channel to be attached, was: " + this.channel.state, 40000, 400));
    			}
    		}

    		Presence.prototype._history.call(this, params, callback);
    	};

    	RealtimePresence.prototype.setPresence = function(presenceSet, isSync, syncChannelSerial) {
    		Logger.logAction(Logger.LOG_MICRO, 'RealtimePresence.setPresence()', 'received presence for ' + presenceSet.length + ' participants; syncChannelSerial = ' + syncChannelSerial);
    		var syncCursor, match, members = this.members, myMembers = this._myMembers,
    			broadcastMessages = [], connId = this.channel.connectionManager.connectionId;

    		if(isSync) {
    			this.members.startSync();
    			if(syncChannelSerial && (match = syncChannelSerial.match(/^[\w\-]+:(.*)$/))) {
    				syncCursor = match[1];
    			}
    		}

    		for(var i = 0; i < presenceSet.length; i++) {
    			var presence = PresenceMessage.fromValues(presenceSet[i]);
    			switch(presence.action) {
    				case 'leave':
    					if(members.remove(presence)) {
    						broadcastMessages.push(presence);
    					}
    					if(presence.connectionId === connId && !presence.isSynthesized()) {
    						myMembers.remove(presence);
    					}
    					break;
    				case 'enter':
    				case 'present':
    				case 'update':
    					if(members.put(presence)) {
    						broadcastMessages.push(presence);
    					}
    					if(presence.connectionId === connId) {
    						myMembers.put(presence);
    					}
    					break;
    			}
    		}
    		/* if this is the last (or only) message in a sequence of sync updates, end the sync */
    		if(isSync && !syncCursor) {
    			members.endSync();
    			/* RTP5c2: re-enter our own members if they haven't shown up in the sync */
    			this._ensureMyMembersPresent();
    			this.channel.setInProgress(RealtimeChannel.progressOps.sync, false);
    			this.channel.syncChannelSerial = null;
    		}

    		/* broadcast to listeners */
    		for(var i = 0; i < broadcastMessages.length; i++) {
    			var presence = broadcastMessages[i];
    			this.subscriptions.emit(presence.action, presence);
    		}
    	};

    	RealtimePresence.prototype.onAttached = function(hasPresence) {
    		Logger.logAction(Logger.LOG_MINOR, 'RealtimePresence.onAttached()', 'channel = ' + this.channel.name + ', hasPresence = ' + hasPresence);

    		if(hasPresence) {
    			this.members.startSync();
    		} else {
    			this._synthesizeLeaves(this.members.values());
    			this.members.clear();
    			this._ensureMyMembersPresent();
    		}

    		/* NB this must be after the _ensureMyMembersPresent call, which may add items to pendingPresence */
    		var pendingPresence = this.pendingPresence,
    			pendingPresCount = pendingPresence.length;

    		if(pendingPresCount) {
    			this.pendingPresence = [];
    			var presenceArray = [];
    			var multicaster = Multicaster();
    			Logger.logAction(Logger.LOG_MICRO, 'RealtimePresence.onAttached', 'sending ' + pendingPresCount + ' queued presence messages');
    			for(var i = 0; i < pendingPresCount; i++) {
    				var event = pendingPresence[i];
    				presenceArray.push(event.presence);
    				multicaster.push(event.callback);
    			}
    			this.channel.sendPresence(presenceArray, multicaster);
    		}
    	};

    	RealtimePresence.prototype.actOnChannelState = function(state, hasPresence, err) {
    		switch(state) {
    			case 'attached':
    				this.onAttached(hasPresence);
    				break;
    			case 'detached':
    			case 'failed':
    				this._clearMyMembers();
    				this.members.clear();
    				/* falls through */
    			case 'suspended':
    				this.failPendingPresence(err);
    				break;
    		}
    	};

    	RealtimePresence.prototype.failPendingPresence = function(err) {
    		if(this.pendingPresence.length) {
    			Logger.logAction(Logger.LOG_MINOR, 'RealtimeChannel.failPendingPresence', 'channel; name = ' + this.channel.name + ', err = ' + Utils.inspectError(err));
    			for(var i = 0; i < this.pendingPresence.length; i++)
    				try {
    					this.pendingPresence[i].callback(err);
    				} catch(e) {}
    			this.pendingPresence = [];
    		}
    	};

    	RealtimePresence.prototype._clearMyMembers = function() {
    		this._myMembers.clear();
    	};

    	RealtimePresence.prototype._ensureMyMembersPresent = function() {
    		var self = this, members = this.members, myMembers = this._myMembers,
    			reenterCb = function(err) {
    				if(err) {
    					var msg = 'Presence auto-re-enter failed: ' + err.toString();
    					var wrappedErr = new ErrorInfo(msg, 91004, 400);
    					Logger.logAction(Logger.LOG_ERROR, 'RealtimePresence._ensureMyMembersPresent()', msg);
    					var change = new ChannelStateChange(self.channel.state, self.channel.state, true, wrappedErr);
    					self.channel.emit('update', change);
    				}
    			};

    		for(var memberKey in myMembers.map) {
    			if(!(memberKey in members.map)) {
    				var entry = myMembers.map[memberKey];
    				Logger.logAction(Logger.LOG_MICRO, 'RealtimePresence._ensureMyMembersPresent()', 'Auto-reentering clientId "' + entry.clientId + '" into the presence set');
    				this._enterOrUpdateClient(entry.clientId, entry.data, 'enter', reenterCb);
    				delete myMembers.map[memberKey];
    			}
    		}
    	};

    	RealtimePresence.prototype._synthesizeLeaves = function(items) {
    		var subscriptions = this.subscriptions;
    		Utils.arrForEach(items, function(item) {
    			var presence = PresenceMessage.fromValues({
    				action: 'leave',
    				connectionId: item.connectionId,
    				clientId: item.clientId,
    				data: item.data,
    				encoding: item.encoding,
    				timestamp: Utils.now()
    			});
    			subscriptions.emit('leave', presence);
    		});
    	};

    	/* Deprecated */
    	RealtimePresence.prototype.on = function() {
    		Logger.deprecated('presence.on', 'presence.subscribe');
    		this.subscribe.apply(this, arguments);
    	};

    	/* Deprecated */
    	RealtimePresence.prototype.off = function() {
    		Logger.deprecated('presence.off', 'presence.unsubscribe');
    		this.unsubscribe.apply(this, arguments);
    	};

    	RealtimePresence.prototype.subscribe = function(/* [event], listener, [callback] */) {
    		var args = RealtimeChannel.processListenerArgs(arguments);
    		var event = args[0];
    		var listener = args[1];
    		var callback = args[2];
    		var channel = this.channel;

    		if(!callback) {
    			if(this.channel.realtime.options.promises) {
    				return Utils.promisify(this, 'subscribe', [event, listener]);
    			}
    			callback = noop;
    		}

    		if(channel.state === 'failed') {
    			callback(ErrorInfo.fromValues(RealtimeChannel.invalidStateError('failed')));
    			return;
    		}

    		this.subscriptions.on(event, listener);
    		channel.attach(callback);
    	};

    	RealtimePresence.prototype.unsubscribe = function(/* [event], listener */) {
    		var args = RealtimeChannel.processListenerArgs(arguments);
    		var event = args[0];
    		var listener = args[1];
    		this.subscriptions.off(event, listener);
    	};

    	function PresenceMap(presence) {
    		EventEmitter.call(this);
    		this.presence = presence;
    		this.map = {};
    		this.syncInProgress = false;
    		this.residualMembers = null;
    	}
    	Utils.inherits(PresenceMap, EventEmitter);

    	PresenceMap.prototype.get = function(key) {
    		return this.map[key];
    	};

    	PresenceMap.prototype.getClient = function(clientId) {
    		var map = this.map, result = [];
    		for(var key in map) {
    			var item = map[key];
    			if(item.clientId == clientId && item.action != 'absent')
    				result.push(item);
    		}
    		return result;
    	};

    	PresenceMap.prototype.list = function(params) {
    		var map = this.map,
    			clientId = params && params.clientId,
    			connectionId = params && params.connectionId,
    			result = [];

    		for(var key in map) {
    			var item = map[key];
    			if(item.action === 'absent') continue;
    			if(clientId && clientId != item.clientId) continue;
    			if(connectionId && connectionId != item.connectionId) continue;
    			result.push(item);
    		}
    		return result;
    	};

    	function newerThan(item, existing) {
    		/* RTP2b1: if either is synthesised, compare by timestamp */
    		if(item.isSynthesized() || existing.isSynthesized()) {
    			return item.timestamp > existing.timestamp;
    		}

    		/* RTP2b2 */
    		var itemOrderings = item.parseId(),
    			existingOrderings = existing.parseId();
    		if(itemOrderings.msgSerial === existingOrderings.msgSerial) {
    			return itemOrderings.index > existingOrderings.index;
    		} else {
    			return itemOrderings.msgSerial > existingOrderings.msgSerial;
    		}
    	}

    	PresenceMap.prototype.put = function(item) {
    		if(item.action === 'enter' || item.action === 'update') {
    			item = PresenceMessage.fromValues(item);
    			item.action = 'present';
    		}
    		var map = this.map, key = memberKey(item);
    		/* we've seen this member, so do not remove it at the end of sync */
    		if(this.residualMembers)
    			delete this.residualMembers[key];

    		/* compare the timestamp of the new item with any existing member (or ABSENT witness) */
    		var existingItem = map[key];
    		if(existingItem && !newerThan(item, existingItem)) {
    			return false;
    		}
    		map[key] = item;
    		return true;

    	};

    	PresenceMap.prototype.values = function() {
    		var map = this.map, result = [];
    		for(var key in map) {
    			var item = map[key];
    			if(item.action != 'absent')
    				result.push(item);
    		}
    		return result;
    	};

    	PresenceMap.prototype.remove = function(item) {
    		var map = this.map, key = memberKey(item);
    		var existingItem = map[key];

    		if(existingItem && !newerThan(item, existingItem)) {
    			return false;
    		}

    		/* RTP2f */
    		if(this.syncInProgress) {
    			item = PresenceMessage.fromValues(item);
    			item.action = 'absent';
    			map[key] = item;
    		} else {
    			delete map[key];
    		}

    		return true;
    	};

    	PresenceMap.prototype.startSync = function() {
    		var map = this.map, syncInProgress = this.syncInProgress;
    		Logger.logAction(Logger.LOG_MINOR, 'PresenceMap.startSync()', 'channel = ' + this.presence.channel.name + '; syncInProgress = ' + syncInProgress);
    		/* we might be called multiple times while a sync is in progress */
    		if(!this.syncInProgress) {
    			this.residualMembers = Utils.copy(map);
    			this.setInProgress(true);
    		}
    	};

    	PresenceMap.prototype.endSync = function() {
    		var map = this.map, syncInProgress = this.syncInProgress;
    		Logger.logAction(Logger.LOG_MINOR, 'PresenceMap.endSync()', 'channel = ' + this.presence.channel.name + '; syncInProgress = ' + syncInProgress);
    		if(syncInProgress) {
    			/* we can now strip out the ABSENT members, as we have
    			 * received all of the out-of-order sync messages */
    			for(var memberKey in map) {
    				var entry = map[memberKey];
    				if(entry.action === 'absent') {
    					delete map[memberKey];
    				}
    			}
    			/* any members that were present at the start of the sync,
    			 * and have not been seen in sync, can be removed, and leave events emitted */
    			this.presence._synthesizeLeaves(Utils.valuesArray(this.residualMembers));
    			for(var memberKey in this.residualMembers) {
    				delete map[memberKey];
    			}
    			this.residualMembers = null;

    			/* finish, notifying any waiters */
    			this.setInProgress(false);
    		}
    		this.emit('sync');
    	};

    	PresenceMap.prototype.waitSync = function(callback) {
    		var syncInProgress = this.syncInProgress;
    		Logger.logAction(Logger.LOG_MINOR, 'PresenceMap.waitSync()', 'channel = ' + this.presence.channel.name + '; syncInProgress = ' + syncInProgress);
    		if(!syncInProgress) {
    			callback();
    			return;
    		}
    		this.once('sync', callback);
    	};

    	PresenceMap.prototype.clear = function(callback) {
    		this.map = {};
    		this.setInProgress(false);
    		this.residualMembers = null;
    	};

    	PresenceMap.prototype.setInProgress = function(inProgress) {
    		Logger.logAction(Logger.LOG_MICRO, 'PresenceMap.setInProgress()', 'inProgress = ' + inProgress);
    		this.syncInProgress = inProgress;
    		this.presence.syncComplete = !inProgress;
    	};

    	return RealtimePresence;
    })();

    var XHRRequest = (function() {
    	var noop = function() {};
    	var idCounter = 0;
    	var pendingRequests = {};

    	var REQ_SEND = 0,
    		REQ_RECV_STREAM = 3;

    	function clearPendingRequests() {
    		for(var id in pendingRequests)
    			pendingRequests[id].dispose();
    	}

    	var isIE = typeof global !== 'undefined' && global.XDomainRequest;

    	function ieVersion() {
    		var match = navigator.userAgent.toString().match(/MSIE\s([\d.]+)/);
    		return match && Number(match[1]);
    	}

    	function needJsonEnvelope() {
    		/* IE 10 xhr bug: http://stackoverflow.com/a/16320339 */
    		var version;
    		return isIE && (version = ieVersion()) && version === 10;
    	}

    	function getHeader(xhr, header) {
    		return xhr.getResponseHeader && xhr.getResponseHeader(header);
    	}

    	/* Safari mysteriously returns 'Identity' for transfer-encoding when in fact
    	 * it is 'chunked'. So instead, decide that it is chunked when
    	 * transfer-encoding is present or content-length is absent.  ('or' because
    	 * when using http2 streaming, there's no transfer-encoding header, but can
    	 * still deduce streaming from lack of content-length) */
    	function isEncodingChunked(xhr) {
    		return xhr.getResponseHeader
    			&& (xhr.getResponseHeader('transfer-encoding')
    			|| !xhr.getResponseHeader('content-length'));
    	}

    	function getHeadersAsObject(xhr) {
    		var headerPairs = Utils.trim(xhr.getAllResponseHeaders()).split('\r\n'),
    			headers = {};
    		for (var i = 0; i < headerPairs.length; i++) {
    			var parts = Utils.arrMap(headerPairs[i].split(':'), Utils.trim);
    			headers[parts[0].toLowerCase()] = parts[1];
    		}
    		return headers;
    	}

    	function XHRRequest(uri, headers, params, body, requestMode, timeouts, method) {
    		EventEmitter.call(this);
    		params = params || {};
    		params.rnd = Utils.cheapRandStr();
    		if(needJsonEnvelope() && !params.envelope)
    			params.envelope = 'json';
    		this.uri = uri + Utils.toQueryString(params);
    		this.headers = headers || {};
    		this.body = body;
    		this.method = method ? method.toUpperCase() : (Utils.isEmptyArg(body) ? 'GET' : 'POST');
    		this.requestMode = requestMode;
    		this.timeouts = timeouts;
    		this.timedOut = false;
    		this.requestComplete = false;
    		pendingRequests[this.id = String(++idCounter)] = this;
    	}
    	Utils.inherits(XHRRequest, EventEmitter);

    	var createRequest = XHRRequest.createRequest = function(uri, headers, params, body, requestMode, timeouts, method) {
    		/* XHR requests are used either with the context being a realtime
    		 * transport, or with timeouts passed in (for when used by a rest client),
    		 * or completely standalone.  Use the appropriate timeouts in each case */
    		timeouts = timeouts || Defaults.TIMEOUTS;
    		return new XHRRequest(uri, headers, Utils.copy(params), body, requestMode, timeouts, method);
    	};

    	XHRRequest.prototype.complete = function(err, body, headers, unpacked, statusCode) {
    		if(!this.requestComplete) {
    			this.requestComplete = true;
    			if(body)
    				this.emit('data', body);
    			this.emit('complete', err, body, headers, unpacked, statusCode);
    			this.dispose();
    		}
    	};

    	XHRRequest.prototype.abort = function() {
    		this.dispose();
    	};

    	XHRRequest.prototype.exec = function() {
    		var timeout = (this.requestMode == REQ_SEND) ? this.timeouts.httpRequestTimeout : this.timeouts.recvTimeout,
    			self = this,
    			timer = this.timer = setTimeout(function() {
    				self.timedOut = true;
    				xhr.abort();
    			}, timeout),
    			body = this.body,
    			method = this.method,
    			headers = this.headers,
    			xhr = this.xhr = new XMLHttpRequest(),
    			accept = headers['accept'],
    			responseType = 'text';

    		if(!accept) {
    			headers['accept'] = 'application/json';
    		} else if(accept.indexOf('application/x-msgpack') === 0) {
    			responseType = 'arraybuffer';
    		}

    		if(body) {
    			var contentType = headers['content-type'] || (headers['content-type'] = 'application/json');
    			if(contentType.indexOf('application/json') > -1 && typeof(body) != 'string')
    				body = JSON.stringify(body);
    		}

    		xhr.open(method, this.uri, true);
    		xhr.responseType = responseType;

    		if ('authorization' in headers) {
    			xhr.withCredentials = true;
    		}

    		for(var h in headers)
    			xhr.setRequestHeader(h, headers[h]);

    		var errorHandler = function(errorEvent, message, code, statusCode) {
    			var errorMessage = message + ' (event type: ' + errorEvent.type + ')' + (self.xhr.statusText ? ', current statusText is ' + self.xhr.statusText : '');
    			Logger.logAction(Logger.LOG_ERROR, 'Request.on' + errorEvent.type + '()', errorMessage);
    			self.complete(new ErrorInfo(errorMessage, code, statusCode));
    		};
    		xhr.onerror = function(errorEvent) {
    			errorHandler(errorEvent, 'XHR error occurred', null, 400);
    		};
    		xhr.onabort = function(errorEvent) {
    			if(self.timedOut) {
    				errorHandler(errorEvent, 'Request aborted due to request timeout expiring', null, 408);
    			} else {
    				errorHandler(errorEvent, 'Request cancelled', null, 400);
    			}
    		};
    		xhr.ontimeout = function(errorEvent) {
    			errorHandler(errorEvent, 'Request timed out', null, 408);
    		};

    		var streaming,
    			statusCode,
    			responseBody,
    			contentType,
    			successResponse,
    			streamPos = 0,
    			unpacked = false;

    		function onResponse() {
    			clearTimeout(timer);
    			successResponse = (statusCode < 400);
    			if(statusCode == 204) {
    				self.complete(null, null, null, null, statusCode);
    				return;
    			}
    			streaming = (self.requestMode == REQ_RECV_STREAM && successResponse && isEncodingChunked(xhr));
    		}

    		function onEnd() {
    			try {
    				var contentType = getHeader(xhr, 'content-type'),
    					headers,
    					responseBody,
    					/* Be liberal in what we accept; buggy auth servers may respond
    					 * without the correct contenttype, but assume they're still
    					 * responding with json */
    					json = contentType ? (contentType.indexOf('application/json') >= 0) : (xhr.responseType == 'text');

    				if(json) {
    					/* If we requested msgpack but server responded with json, then since
    					 * we set the responseType expecting msgpack, the response will be
    					 * an ArrayBuffer containing json */
    					responseBody = (xhr.responseType === 'arraybuffer') ? BufferUtils.utf8Decode(xhr.response) : String(xhr.responseText);
    					if(responseBody.length) {
    						responseBody = JSON.parse(responseBody);
    					}
    					unpacked = true;
    				} else {
    					responseBody = xhr.response;
    				}

    				if(responseBody.response !== undefined) {
    					/* unwrap JSON envelope */
    					statusCode = responseBody.statusCode;
    					successResponse = (statusCode < 400);
    					headers = responseBody.headers;
    					responseBody = responseBody.response;
    				} else {
    					headers = getHeadersAsObject(xhr);
    				}
    			} catch(e) {
    				self.complete(new ErrorInfo('Malformed response body from server: ' + e.message, null, 400));
    				return;
    			}

    			/* If response is an array, it's an array of protocol messages -- even if
    			 * is contains an error action (hence the nonsuccess statuscode), we can
    			 * consider the request to have succeeded, just pass it on to
    			 * onProtocolMessage to decide what to do */
    			if(successResponse || Utils.isArray(responseBody)) {
    				self.complete(null, responseBody, headers, unpacked, statusCode);
    				return;
    			}

    			var err = responseBody.error;
    			if(!err) {
    				err = new ErrorInfo('Error response received from server: ' + statusCode + ' body was: ' + Utils.inspect(responseBody), null, statusCode);
    			}
    			self.complete(err, responseBody, headers, unpacked, statusCode);
    		}

    		function onProgress() {
    			responseBody = xhr.responseText;
    			var bodyEnd = responseBody.length - 1, idx, chunk;
    			while((streamPos < bodyEnd) && (idx = responseBody.indexOf('\n', streamPos)) > -1) {
    				chunk = responseBody.slice(streamPos, idx);
    				streamPos = idx + 1;
    				onChunk(chunk);
    			}
    		}

    		function onChunk(chunk) {
    			try {
    				chunk = JSON.parse(chunk);
    			} catch(e) {
    				self.complete(new ErrorInfo('Malformed response body from server: ' + e.message, null, 400));
    				return;
    			}
    			self.emit('data', chunk);
    		}

    		function onStreamEnd() {
    			onProgress();
    			self.streamComplete = true;
    			Utils.nextTick(function() {
    				self.complete();
    			});
    		}

    		xhr.onreadystatechange = function() {
    			var readyState = xhr.readyState;
    			if(readyState < 3) return;
    			if(xhr.status !== 0) {
    				if(statusCode === undefined) {
    					statusCode = xhr.status;
    					/* IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450 */
    					if(statusCode === 1223) statusCode = 204;
    					onResponse();
    				}
    				if(readyState == 3 && streaming) {
    					onProgress();
    				} else if(readyState == 4) {
    					if(streaming)
    						onStreamEnd();
    					else
    						onEnd();
    				}
    			}
    		};
    		xhr.send(body);
    	};

    	XHRRequest.prototype.dispose = function() {
    		var xhr = this.xhr;
    		if(xhr) {
    			xhr.onreadystatechange = xhr.onerror = xhr.onabort = xhr.ontimeout = noop;
    			this.xhr = null;
    			var timer = this.timer;
    			if(timer) {
    				clearTimeout(timer);
    				this.timer = null;
    			}
    			if(!this.requestComplete)
    				xhr.abort();
    		}
    		delete pendingRequests[this.id];
    	};

    	if(Platform.xhrSupported) {
    		if(typeof DomEvent === 'object') {
    			DomEvent.addUnloadListener(clearPendingRequests);
    		}
    		if(typeof(Http) !== 'undefined') {
    			Http.supportsAuthHeaders = true;
    			Http.Request = function(method, rest, uri, headers, params, body, callback) {
    				var req = createRequest(uri, headers, params, body, REQ_SEND, rest && rest.options.timeouts, method);
    				req.once('complete', callback);
    				req.exec();
    				return req;
    			};

    			Http.checkConnectivity = function(callback) {
    				var upUrl = Defaults.internetUpUrl;
    				Logger.logAction(Logger.LOG_MICRO, '(XHRRequest)Http.checkConnectivity()', 'Sending; ' + upUrl);
    				Http.getUri(null, upUrl, null, null, function(err, responseText) {
    					var result = (!err && responseText.replace(/\n/, '') == 'yes');
    					Logger.logAction(Logger.LOG_MICRO, '(XHRRequest)Http.checkConnectivity()', 'Result: ' + result);
    					callback(null, result);
    				});
    			};
    		}
    	}

    	return XHRRequest;
    })();

    var XHRStreamingTransport = (function() {
    	var shortName = 'xhr_streaming';

    	/* public constructor */
    	function XHRStreamingTransport(connectionManager, auth, params) {
    		CometTransport.call(this, connectionManager, auth, params);
    		this.shortName = shortName;
    	}
    	Utils.inherits(XHRStreamingTransport, CometTransport);

    	XHRStreamingTransport.isAvailable = function() {
    		return Platform.xhrSupported && Platform.streamingSupported && Platform.allowComet;
    	};

    	XHRStreamingTransport.tryConnect = function(connectionManager, auth, params, callback) {
    		var transport = new XHRStreamingTransport(connectionManager, auth, params);
    		var errorCb = function(err) { callback({event: this.event, error: err}); };
    		transport.on(['failed', 'disconnected'], errorCb);
    		transport.on('preconnect', function() {
    			Logger.logAction(Logger.LOG_MINOR, 'XHRStreamingTransport.tryConnect()', 'viable transport ' + transport);
    			transport.off(['failed', 'disconnected'], errorCb);
    			callback(null, transport);
    		});
    		transport.connect();
    	};

    	XHRStreamingTransport.prototype.toString = function() {
    		return 'XHRStreamingTransport; uri=' + this.baseUri + '; isConnected=' + this.isConnected;
    	};

    	XHRStreamingTransport.prototype.createRequest = function(uri, headers, params, body, requestMode) {
    		return XHRRequest.createRequest(uri, headers, params, body, requestMode, this.timeouts);
    	};

    	if(typeof(ConnectionManager) !== 'undefined' && XHRStreamingTransport.isAvailable()) {
    		ConnectionManager.supportedTransports[shortName] = XHRStreamingTransport;
    	}

    	return XHRStreamingTransport;
    })();

    var XHRPollingTransport = (function() {
    	var shortName = 'xhr_polling';

    	function XHRPollingTransport(connectionManager, auth, params) {
    		params.stream = false;
    		CometTransport.call(this, connectionManager, auth, params);
    		this.shortName = shortName;
    	}
    	Utils.inherits(XHRPollingTransport, CometTransport);

    	XHRPollingTransport.isAvailable = function() {
    		return Platform.xhrSupported && Platform.allowComet;
    	};

    	XHRPollingTransport.tryConnect = function(connectionManager, auth, params, callback) {
    		var transport = new XHRPollingTransport(connectionManager, auth, params);
    		var errorCb = function(err) { callback({event: this.event, error: err}); };
    		transport.on(['failed', 'disconnected'], errorCb);
    		transport.on('preconnect', function() {
    			Logger.logAction(Logger.LOG_MINOR, 'XHRPollingTransport.tryConnect()', 'viable transport ' + transport);
    			transport.off(['failed', 'disconnected'], errorCb);
    			callback(null, transport);
    		});
    		transport.connect();
    	};

    	XHRPollingTransport.prototype.toString = function() {
    		return 'XHRPollingTransport; uri=' + this.baseUri + '; isConnected=' + this.isConnected;
    	};

    	XHRPollingTransport.prototype.createRequest = function(uri, headers, params, body, requestMode) {
    		return XHRRequest.createRequest(uri, headers, params, body, requestMode, this.timeouts);
    	};

    	if(typeof(ConnectionManager) !== 'undefined' && XHRPollingTransport.isAvailable()) {
    		ConnectionManager.supportedTransports[shortName] = XHRPollingTransport;
    	}

    	return XHRPollingTransport;
    })();

    var JSONPTransport = (function() {
    	var noop = function() {};
    	/* Can't just use window.Ably, as that won't exist if using the commonjs version. */
    	var _ = global._ablyjs_jsonp = {};

    	/* express strips out parantheses from the callback!
    	 * Kludge to still alow its responses to work, while not keeping the
    	 * function form for normal use and not cluttering window.Ably
    	 * https://github.com/strongloop/express/blob/master/lib/response.js#L305
    	 */
    	_._ = function(id) { return _['_' + id] || noop; };
    	var idCounter = 1;
    	var head = null;
    	var shortName = 'jsonp';

    	/* public constructor */
    	function JSONPTransport(connectionManager, auth, params) {
    		params.stream = false;
    		CometTransport.call(this, connectionManager, auth, params);
    		this.shortName = shortName;
    	}
    	Utils.inherits(JSONPTransport, CometTransport);

    	JSONPTransport.isAvailable = function() {
    		return Platform.jsonpSupported && Platform.allowComet;
    	};
    	if(JSONPTransport.isAvailable()) {
    		ConnectionManager.supportedTransports[shortName] = JSONPTransport;
    	}
    	if(Platform.jsonpSupported) {
    		head = document.getElementsByTagName('head')[0];
    	}

    	/* connectivity check; since this has a hard-coded callback id,
    	 * we just make sure that we handle concurrent requests (but the
    	 * connectionmanager should ensure this doesn't happen anyway */
    	var checksInProgress = null;
    	global.JSONPTransport = JSONPTransport;

    	JSONPTransport.tryConnect = function(connectionManager, auth, params, callback) {
    		var transport = new JSONPTransport(connectionManager, auth, params);
    		var errorCb = function(err) { callback({event: this.event, error: err}); };
    		transport.on(['failed', 'disconnected'], errorCb);
    		transport.on('preconnect', function() {
    			Logger.logAction(Logger.LOG_MINOR, 'JSONPTransport.tryConnect()', 'viable transport ' + transport);
    			transport.off(['failed', 'disconnected'], errorCb);
    			callback(null, transport);
    		});
    		transport.connect();
    	};

    	JSONPTransport.prototype.toString = function() {
    		return 'JSONPTransport; uri=' + this.baseUri + '; isConnected=' + this.isConnected;
    	};

    	var createRequest = JSONPTransport.prototype.createRequest = function(uri, headers, params, body, requestMode, timeouts, method) {
    		/* JSONP requests are used either with the context being a realtime
    		 * transport, or with timeouts passed in (for when used by a rest client),
    		 * or completely standalone.  Use the appropriate timeouts in each case */
    		timeouts = (this && this.timeouts) || timeouts || Defaults.TIMEOUTS;
    		return new Request(undefined, uri, headers, Utils.copy(params), body, requestMode, timeouts, method);
    	};

    	function Request(id, uri, headers, params, body, requestMode, timeouts, method) {
    		EventEmitter.call(this);
    		if(id === undefined) id = idCounter++;
    		this.id = id;
    		this.uri = uri;
    		this.params = params || {};
    		this.params.rnd = Utils.cheapRandStr();
    		if(headers) {
    			/* JSONP doesn't allow headers. Cherry-pick a couple to turn into qs params */
    			if(headers['X-Ably-Version']) this.params.v = headers['X-Ably-Version'];
    			if(headers['X-Ably-Lib']) this.params.lib = headers['X-Ably-Lib'];
    		}
    		this.body = body;
    		this.method = method;
    		this.requestMode = requestMode;
    		this.timeouts = timeouts;
    		this.requestComplete = false;
    	}
    	Utils.inherits(Request, EventEmitter);

    	Request.prototype.exec = function() {
    		var id = this.id,
    			body = this.body,
    			method = this.method,
    			uri = this.uri,
    			params = this.params,
    			self = this;

    		params.callback = '_ablyjs_jsonp._(' + id + ')';

    		params.envelope = 'jsonp';
    		if(body) {
    			params.body = body;
    		}
    		if(method && method !== 'get') {
    			params.method = method;
    		}

    		var script = this.script = document.createElement('script');
    		var src = uri + Utils.toQueryString(params);
    		script.src = src;
    		if(script.src.split('/').slice(-1)[0] !== src.split('/').slice(-1)[0]) {
    			/* The src has been truncated. Can't abort, but can at least emit an
    			 * error so the user knows what's gone wrong. (Can't compare strings
    			 * directly as src may have a port, script.src won't) */
    			Logger.logAction(Logger.LOG_ERROR, 'JSONP Request.exec()', 'Warning: the browser appears to have truncated the script URI. This will likely result in the request failing due to an unparseable body param');
    		}
    		script.async = true;
    		script.type = 'text/javascript';
    		script.charset = 'UTF-8';
    		script.onerror = function(err) {
    			self.complete(new ErrorInfo('JSONP script error (event: ' + Utils.inspect(err) + ')', null, 400));
    		};

    		_['_' + id] = function(message) {
    			if(message.statusCode) {
    				/* Handle as enveloped jsonp, as all jsonp transport uses should be */
    				var response = message.response;
    				if(message.statusCode == 204) {
    					self.complete(null, null, null, message.statusCode);
    				} else if(!response) {
    					self.complete(new ErrorInfo('Invalid server response: no envelope detected', null, 500));
    				} else if(message.statusCode < 400 || Utils.isArray(response)) {
    					/* If response is an array, it's an array of protocol messages -- even if
    					 * it contains an error action (hence the nonsuccess statuscode), we can
    					 * consider the request to have succeeded, just pass it on to
    					 * onProtocolMessage to decide what to do */
    					self.complete(null, response, message.headers, message.statusCode);
    				} else {
    					var err = response.error || new ErrorInfo('Error response received from server', null, message.statusCode);
    					self.complete(err);
    				}
    			} else {
    				/* Handle as non-enveloped -- as will be eg from a customer's authUrl server */
    				self.complete(null, message);
    			}
    		};

    		var timeout = (this.requestMode == CometTransport.REQ_SEND) ? this.timeouts.httpRequestTimeout : this.timeouts.recvTimeout;
    		this.timer = setTimeout(function() { self.abort(); }, timeout);
    		head.insertBefore(script, head.firstChild);
    	};

    	Request.prototype.complete = function(err, body, headers, statusCode) {
    		headers = headers || {};
    		if(!this.requestComplete) {
    			this.requestComplete = true;
    			var contentType;
    			if(body) {
    				contentType = (typeof(body) == 'string') ? 'text/plain' : 'application/json';
    				headers['content-type'] = contentType;
    				this.emit('data', body);
    			}

    			this.emit('complete', err, body, headers, /* unpacked: */ true, statusCode);
    			this.dispose();
    		}
    	};

    	Request.prototype.abort = function() {
    		this.dispose();
    	};

    	Request.prototype.dispose = function() {
    		var timer = this.timer;
    		if(timer) {
    			clearTimeout(timer);
    			this.timer = null;
    		}
    		var script = this.script;
    		if(script.parentNode) script.parentNode.removeChild(script);
    		delete _[this.id];
    		this.emit('disposed');
    	};

    	if(Platform.jsonpSupported && !Http.Request) {
    		Http.Request = function(method, rest, uri, headers, params, body, callback) {
    			var req = createRequest(uri, headers, params, body, CometTransport.REQ_SEND, rest && rest.options.timeouts, method);
    			req.once('complete', callback);
    			Utils.nextTick(function() {
    				req.exec();
    			});
    			return req;
    		};

    		Http.checkConnectivity = function(callback) {
    			var upUrl = Defaults.jsonpInternetUpUrl;

    			if(checksInProgress) {
    				checksInProgress.push(callback);
    				return;
    			}
    			checksInProgress = [callback];
    			Logger.logAction(Logger.LOG_MICRO, '(JSONP)Http.checkConnectivity()', 'Sending; ' + upUrl);

    			var req = new Request('isTheInternetUp', upUrl, null, null, null, CometTransport.REQ_SEND, Defaults.TIMEOUTS);
    			req.once('complete', function(err, response) {
    				var result = !err && response;
    				Logger.logAction(Logger.LOG_MICRO, '(JSONP)Http.checkConnectivity()', 'Result: ' + result);
    				for(var i = 0; i < checksInProgress.length; i++) checksInProgress[i](null, result);
    				checksInProgress = null;
    			});
    			Utils.nextTick(function() {
    				req.exec();
    			});
    		};
    	}

    	return JSONPTransport;
    })();

    Ably.msgpack = msgpack;
    Ably.Rest = Rest;
    Ably.Realtime = Realtime;
    Realtime.ConnectionManager = ConnectionManager;
    Realtime.BufferUtils = Rest.BufferUtils = BufferUtils;
    if(typeof(Crypto) !== 'undefined') Realtime.Crypto = Rest.Crypto = Crypto;
    Realtime.Defaults = Rest.Defaults = Defaults;
    Realtime.Http = Rest.Http = Http;
    Realtime.Utils = Rest.Utils = Utils;
    Realtime.Http = Rest.Http = Http;
    Realtime.Message = Rest.Message = Message;
    Realtime.PresenceMessage = Rest.PresenceMessage = PresenceMessage;
    Realtime.ProtocolMessage = Rest.ProtocolMessage = ProtocolMessage;

    module.exports = Ably;

    /* SystemJS support for default exports to be added to the root of the module
       https://github.com/frankwallis/plugin-typescript/issues/185 */
    module.exports.__esModule = true;
    });

    unwrapExports(ablyCommonjs);
    var ablyCommonjs_1 = ablyCommonjs.Realtime;

    var AblyConnectionState = {
        initialized: "initialized",
        connecting: "connecting",
        connected: "connected",
        disconnected: "disconnected",
        suspended: "suspended",
        closing: "closing",
        closed: "closed",
        failed: "failed",
    };
    var AuthChangeNotifier = /** @class */ (function (_super) {
        __extends(AuthChangeNotifier, _super);
        function AuthChangeNotifier(authenticator) {
            var _this = _super.call(this) || this;
            _this._authenticator = authenticator;
            _this._lastLoginCheck = Date.now();
            _this._ably = new ablyCommonjs_1({
                authUrl: 'https://ably.api.24sevenoffice.com/auth',
                authHeaders: { authorization: 'IGNORED' },
                autoConnect: false
            });
            _this._ably.connection.on(AblyConnectionState.initialized, function () { });
            _this._ably.connection.on(AblyConnectionState.connecting, function () { });
            _this._ably.connection.on(AblyConnectionState.connected, function () { });
            _this._ably.connection.on(AblyConnectionState.disconnected, function () { });
            _this._ably.connection.on(AblyConnectionState.suspended, function () { });
            _this._ably.connection.on(AblyConnectionState.closing, function () { });
            _this._ably.connection.on(AblyConnectionState.closed, function () { });
            _this._ably.connection.on(AblyConnectionState.failed, function () { return _this.emit('connection-failed'); });
            return _this;
        }
        AuthChangeNotifier.prototype.listen = function (license) {
            var _this = this;
            this._ably.close();
            this._ably.connect();
            var identityId = license.split(';')[0];
            var channel = this._ably.channels.get("identity:" + identityId);
            channel.subscribe('authentication', function (event) {
                var type = event.data.type;
                if (['login', 'logout', 'change'].includes(type)) {
                    _this.emit(type);
                }
            });
            this._addUserActivityListener();
        };
        /**
         * Whenever there is activity on the page (a user clicks somewhere),
         * we check if the user is still logged in.
         * This only triggers once every 15 minutes.
         * When we get rid of the old session cookie, this can probably be removed since the auth0 session lasts much longer.
         */
        AuthChangeNotifier.prototype._addUserActivityListener = function () {
            var _this = this;
            document.body.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                var currentTime, identity;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            currentTime = Date.now();
                            if (!(currentTime - 1000 * 900 > this._lastLoginCheck)) return [3 /*break*/, 2];
                            this._lastLoginCheck = currentTime;
                            return [4 /*yield*/, this._authenticator.getCurrentlyLoggedInIdentityOrNull()];
                        case 1:
                            identity = _a.sent();
                            if (identity === null) {
                                this.emit('logout');
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
        };
        return AuthChangeNotifier;
    }(eventemitter3));

    var AuthManager = /** @class */ (function (_super) {
        __extends(AuthManager, _super);
        function AuthManager(authenticator, authorizer, config) {
            var _this = _super.call(this) || this;
            _this.identity = null;
            _this._authenticator = authenticator;
            _this._authorizer = authorizer;
            _this._authChangeNotifier = new AuthChangeNotifier(authenticator);
            _this._config = lodash_defaultsdeep({}, config, {
                tokens: []
            });
            _this._authorizer.on('access-success', function (access) { return _this._handleAuthorizationSuccess(access); });
            _this._authorizer.on('access-failure', function (access) { return _this._handleAuthorizationFailure(access); });
            _this._authChangeNotifier.on('login', function () { return _this._handleAuthChange(); });
            _this._authChangeNotifier.on('change', function () { return _this._handleAuthChange(); });
            _this._authChangeNotifier.on('logout', function () { return _this._handleAuthChange(); });
            _this._authChangeNotifier.on('connection-failed', function () { return _this.emit('authentication-notifications-unavailable'); });
            return _this;
        }
        AuthManager.prototype.on = function (event, fn, context) {
            return _super.prototype.on.call(this, event, fn, context);
        };
        AuthManager.prototype.login = function () {
            return __awaiter(this, void 0, void 0, function () {
                var identity, err_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.emit('authentication-attempt');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this._authenticator.ensureLoggedIn()];
                        case 2:
                            identity = _a.sent();
                            this.identity = identity; // Set before emitting so it's available when consumer is reacting to the event
                            this.emit('authentication-success', { identity: identity });
                            this._authChangeNotifier.listen(identity.license);
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _a.sent();
                            this.identity = null;
                            this.emit('authentication-failure', { err: err_1 });
                            return [2 /*return*/];
                        case 4:
                            this.emit('authorization-start');
                            return [4 /*yield*/, Promise.all(this._config.tokens.map(function (tokenConfig) { return _this.authorize(tokenConfig, _this.identity.license); }))];
                        case 5:
                            _a.sent();
                            this.emit('authorization-complete');
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthManager.prototype.logout = function () {
            this._authenticator.redirectToLogout();
        };
        AuthManager.prototype.authorize = function (tokenConfig, license) {
            this.emit('authorization-attempt', { tokenConfig: tokenConfig, license: license });
            return this._authorizer.authorize(tokenConfig, license);
        };
        AuthManager.prototype.authorizeOnce = function (tokenConfig, license) {
            this.emit('authorization-attempt', { tokenConfig: tokenConfig, license: license });
            return this._authorizer.authorizeOnce(tokenConfig, license);
        };
        AuthManager.prototype.getAuthorizer = function () {
            return this._authorizer;
        };
        AuthManager.prototype.getAuthenticator = function () {
            return this._authenticator;
        };
        AuthManager.prototype._handleLoggedOut = function () {
            var _this = this;
            this.emit('authentication-logout');
            var defaultHandler = function () { return _this._authenticator.redirectToLogin(); };
            if (this._config.logoutHandler) {
                this._config.logoutHandler(defaultHandler);
            }
            else {
                defaultHandler();
            }
        };
        AuthManager.prototype._handleLicenseChanged = function (newIdentity) {
            var event = { newIdentity: newIdentity, prevIdentity: this.identity };
            this.emit('authentication-licensechange', event);
            var defaultHandler = function () { return window.location.reload(true); };
            if (this._config.licenseChangeHandler) {
                this._config.licenseChangeHandler(event, defaultHandler);
            }
            else {
                defaultHandler();
            }
        };
        AuthManager.prototype._handleAuthorizationSuccess = function (access) {
            this.emit('authorization-success', { access: access });
        };
        AuthManager.prototype._handleAuthorizationFailure = function (access) {
            this.emit('authorization-failure', { access: access });
        };
        AuthManager.prototype._handleAuthChange = function () {
            return __awaiter(this, void 0, void 0, function () {
                var identity;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._authenticator.getCurrentlyLoggedInIdentityOrNull()];
                        case 1:
                            identity = _a.sent();
                            if (identity === null) {
                                return [2 /*return*/, this._handleLoggedOut()];
                            }
                            if (identity.license !== (this.identity !== null ? this.identity.license : '')) {
                                return [2 /*return*/, this._handleLicenseChanged(identity)];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return AuthManager;
    }(eventemitter3));

    var createAuthManager = function (authManagerConfig, authenticatorConfig) {
        var authenticator = new Authenticator(authenticatorConfig);
        var authorizer = new Authorizer(authenticatorConfig);
        var authManager = new AuthManager(authenticator, authorizer, authManagerConfig);
        return authManager;
    };

    exports.createAuthManager = createAuthManager;
    exports.Authenticator = Authenticator;
    exports.Authorizer = Authorizer;
    exports.AuthChangeNotifier = AuthChangeNotifier;
    exports.AuthManager = AuthManager;

    return exports;

}({}));
