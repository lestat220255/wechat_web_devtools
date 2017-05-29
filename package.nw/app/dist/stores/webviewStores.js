"use strict";function init(){var e=require("events").EventEmitter,t=require("../common/jssdk/sdk.js"),i=require("../common/getA8key/getA8key.js"),r=require("../config/errcodeConfig.js"),o=(require("../config/config.js"),require("../common/log/log.js")),n=(require("../config/DeviceModules.js"),require("../config/wordingConfig.js")),s={},_={},S=0,u="app/html/about.html",c={},E=localStorage["webview-network-type"]?localStorage["webview-network-type"]:"wifi",a=Object.assign({},e.prototype,{addWebviewPorts:function(e,t){return c[e]=t,c},delWebviewPorts:function(e){return delete c[e],c},getNetworkType:function(){return E},setNetworkType:function(e){E=e,localStorage["webview-network-type"]=E,this.emit("SIMULATOR_NETWORK_CHANGE",E)},getStatusBarHeight:function(){var e=parseInt(localStorage["webview-status-bar-height"]);return(Number.isNaN(e)||e<0)&&(e=25),e},setStatusBarHeight:function(e){localStorage["webview-status-bar-height"]=e,this.emit("SIMULATOR_STATUS_BAR_HEIGHT_CHANGE",e)},getWebviewPorts:function(){return c},deleteWebviewID:function(e){this.emit("DELETE_WEBVIEW_ID",e)},changeWebviewID:function(e){S=e,this.emit("CHANGE_WEBVIEW_ID",e)},getSnapShot:function(e){return _[e]},setSnapShot:function(e,t){_[e]=t,this.emit("SET_WEBVIEW_SNAPSHOT",e,t)},getInitURL:function(){return u},setInitURL:function(e){u=e},getCurrentWebviewID:function(){return S},setCurrentWebviewID:function(e){S=e},showShare:function(e,t){this.emit("SHOW_SHARE_WEBVIEW_"+e,e,t)},stopPullDownRefresh:function(){this.emit("STOP_PULL_DOWN_REFRESH")},upStatus:function(e,t){s[e]||(s[e]={}),this.emit("UP_WEBVIEW_STATUS_"+e,e,t),this.emit("UP_WEBVIEW_STATUS",e,t)},setAction:function(e,t){s[e]||(s[e]={}),this.emit("SET_WEBVIEW_ACTION_"+e,e,t)},execJSSDK:function(e,i){var n=this;s[e]||(s[e]={}),setTimeout(function(){t.exec(i,s[e],function(t,_,S){var u=i.sdkName,c=S.type;if("CARD_SDK"===c&&t){var E=S.error;if(E){if(E.errcode===r.NOT_LIMITS_CARD)return o.info("webviewStores.js getA8key NOT_LIMITS_CARD"),void n.emit("NOT_LIMITS_CARD");if(0!==E.errcode){o.info("webviewStores.js getA8key "+E.errcode);var a=require("../common/jssdk/sdkNameTrans.js");return _={errMsg:a.getSdkDisplayName(u)+":fail"},void n.emit("GET_JSSDK_RES_"+e,e,u,_,i.ext)}}else n.emit("CRAD_SDK_RES",e,u,_,t,i)}else"PREVERIFY_SDK"===c?(s[e].purviewFromPreVerify=S.purviewFromPreVerify||{},i.sdkResExt=S,n.emit("GET_JSSDK_RES_"+e,e,u,_,i)):"SHARE_SDK"===c?n.emit("SHOW_SHARE_WEBVIEW_"+e,e,i,_):"REGISTER_SDK"===c||("INTERFACE_ASYNC_SDK"===c?n.emit("SET_INTERFACE_ASYNC_RES",e,u,t,i):"INTERFACE_SDK"===c?(n.emit("SET_INTERFACE_RES_"+e,e,u,t,i),n.emit("GET_JSSDK_RES_"+e,e,u,_,i.ext)):n.emit("GET_JSSDK_RES_"+e,e,u,_,i.ext))})})},sendJSSDKRes:function(e,t,i,r){this.emit("GET_JSSDK_RES_"+e,e,t,i,r)},getA8key:function(e,t){var _=this;s[e]={};var S=t.isSync;o.info("webviewStores.js getA8key begin: "+e+" "+JSON.stringify(t)),i.get(t,function(i){o.info("webviewStores.js getA8key end: "+JSON.stringify(i));var u=i.baseresponse,c=parseInt(u.errcode);if(c===r.NOT_LOGIN)return o.info("webviewStores.js getA8key NOT_LOGIN"),void _.emit("NOT_LOGIN");if(c===r.NOT_LIMITS)return o.info("webviewStores.js getA8key NOT_LIMITS"),void _.emit("NOT_LIMITS");if(c===r.NOT_LIMITS_QY)return o.info("webviewStores.js getA8key NOT_LIMITS_QY"),void _.emit("NOT_LIMITS_QY");if(c===r.INVALID_LOGIN||c===r.INVALID_TOKEN)return o.info("webviewStores.js getA8key INVALID_LOGIN"),void _.emit("INVALID_LOGIN");s[e].purviewFormGetA8key=i.purviewFormGetA8key;var E=i.resp_url;if(S||c===r.ILLEGAL_URL)return void setTimeout(function(){_.emit("SET_WEBVIEW_ACTION_"+e,e,{act:"load",url:E,from:t.from})});if(0!==c){o.info("webviewStores.js getA8key "+c);var a=require("../actions/windowActions.js");return void a.showTipsMsg({msg:n[0]+" "+c,type:"error"})}var f=/\#wechat_redirect$/.test(t.url);return f&&t.url.replace(/\#wechat_redirect$/,"")===E?(E=E.replace(/\#wechat_redirect/,""),o.info("webviewStores.js getA8key GETA_8KEY_NOT_SUPPORT "+E),void windowActions.showTipsMsg({msg:""+n[1],type:"error"})):void 0})},getWebviewByID:function(e){return s[e]},clearData:function(e){this.emit("CLEAR_WEBVIEW_DATA",e)},setInterfaceFromPageFrame:function(e,t){this.emit("SET_INTERFACT_FROMPAGEFRAME_"+e,t)},cleanWebview:function(e){this.emit("CLEAN_WEBVIEW_"+e),this.emit("CLEAN_WEBVIEW",e)},asTojs:function(e){this.emit("AS_TO_JS",e)},upASData:function(e,t){this.emit("UP_AS_DATA",e,t)},upBLData:function(e,t){this.emit("UP_BL_DATA",e,t)},asPublish:function(e){this.emit("AS_PUBLISH",e)},postMessageToAS:function(e){this.emit("POST_MSG_TOAS",e)},sendASSdk:function(e,t,i){this.emit("SEND_AS_SDK",e,t,i)},touchSetSuc:function(e){this.emit("TOUCH_SET_SUC_"+e)},togglerRecordWording:function(e){this.emit("TOGGLE_RECORD_WORDING",e)},getGeoSetting:function(){var e=JSON.parse(localStorage.getItem("webivew-geolocation"))||{};return e},setGeoSetting:function(e){localStorage.setItem("webivew-geolocation",JSON.stringify(e))},operatePaymentQrcodeWnd:function(e){this.emit("OPERATE_PAYMENT_QRCODE_WND",e)},showAddCardView:function(e){this.emit("SHOW_ADD_CARD_VIEW",e)},showOpenCardView:function(e){this.emit("SHOW_OPEN_CARD_VIEW",e)},showShareGroupList:function(e){this.emit("SHOW_SHARE_GROUP_LIST",e)}}),f=a.on,T={};a.on=function(){var e=arguments,t=e[0];T[t]||(T[t]=0),T[t]++,T[t]>=10&&o.error("webviewStores.js on "+t+" - times: "+T[t]),f.apply(this,arguments)};var A=a.removeListener;a.removeListener=function(){var e=arguments,t=e[0];T[t]&&T[t]--,T[t]>=10&&o.error("webviewStores.js on "+t+" - times: "+T[t]),A.apply(this,arguments)},_exports=a}var _exports;init(),module.exports=_exports;