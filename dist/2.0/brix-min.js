/*! Brix - v2.0
* https://github.com/etaoux/brix
* Copyright (c) 2013 etaoux; Licensed MIT */
KISSY.add("brix/core/tmpler",function(a,b,c){function e(a,b){this.tmpls=[],a&&b!==!1?this._praseTmpl(a,b):this.tmpl=a}var d=c.all;return a.augment(e,{_praseTmpl:function(a,b){var c=this,e=!1,f,g;if(typeof a=="string"){if(a.charAt(0)==="."||a.charAt(0)==="#"||a==="body")f=d(a)}else f=a;f&&(f.item(0)[0].nodeName.toUpperCase()=="SCRIPT"?a=f.item(0).html():e=!0);if(!e){var h="<([\\w]+)\\s+[^>]*?bx-tmpl=[\"']?([^\"'\\s]+)[\"']?\\s+[^>]*?bx-datakey=[\"']?([^\"'\\s]+)[\"']?[^>]*?>(@brix@)</\\1>";while(b--)h=h.replace("@brix@","(?:<\\1[^>]*>@brix@</\\1>|[\\s\\S])*?");h=h.replace("@brix@","(?:[\\s\\S]*?)"),c.reg=h,c.tmpl=a,c._buildTmpls(c.tmpl)}c.inDom=e},_buildTmpls:function(a){var b=this,c=new RegExp(b.reg,"ig"),d;while((d=c.exec(a))!==null)b.tmpls.push({name:d[2],datakey:d[3],tmpler:new e(d[4],!1)}),b._buildTmpls(d[4])},addTmpl:function(a,b,c){var d=this;d.tmpls.push({name:a,datakey:b,tmpler:new e(c,!1)})},getTmpl:function(){return this.tmpl},render:function(a){return(new b(this.getTmpl())).render(a)}}),e},{requires:["xtemplate","node","sizzle"]}),KISSY.add("brix/core/dataset",function(a,b){function c(){c.superclass.constructor.apply(this,arguments)}return c.ATTRS={data:{}},a.extend(c,b,{setRenderer:function(a,b,c){var d=this,e=d.get("data"),f,g;c=c?c+"_":"";if(a){var h=function(d,f){var g=c+d+"_"+f,h=a[d][f];e[g]=function(){return h.call(this,b,d)}};for(f in a)for(g in a[f])h(f,g)}}}),c},{requires:["base"]}),KISSY.add("brix/core/chunk",function(a,b,c,d,e,f){var g=b.all,h=a.noop,i=d.extend({constructor:function j(){var a=this;j.superclass.constructor.apply(a,arguments);var b=a.get("tmpler");(a.get("autoRender")||!b||b.inDom)&&a.render()},bindInternal:h,syncInternal:h,initializer:function(){var a=this,b=a.get("tmpl");if(b){a._buildTmpler(b,a.get("level"));var c=a.get("tmpler");c&&(a._buildDataset(a.get("data")),c.inDom&&a.set("el",b))}},_buildTmpler:function(a,b){var c=this;if(!c.get("isBuidTmpler")){c.set("isBuidTmpler",!0);var d=new f(a,b);c.set("tmpler",d)}},_buildDataset:function(b){var c=this;if(!c.get("isBuidDataset")){c.set("isBuidDataset",!0),b=b||{},b=a.clone(b);var d=new e({data:b});c.set("dataset",d),d.on("afterDataChange",function(a){c._render(a.subAttrName,a.newVal)})}},destructor:function(){var a=this,b=a.get("tmpler"),c=a.get("dataset");b&&(a.set("tmpler",null),delete b.tmpls),c&&(a.set("dataset",null),c.detach())},renderUI:h,bindUI:h,syncUI:h,addTmpl:function(a,b,c){var d=this;d._buildTmpler("",!1),d._buildDataset();if(a){var e=d.get("tmpler");e.addTmpl(a,b,c)}},setChunkData:function(b,c,d){var e=this,f=e.get("dataset");f&&(c=a.clone(c),f.set("data."+b,c,d))},render:function(){var a=this;if(!a.get("rendered")){a.fire("beforeRenderUI");var b=a.get("dataset");b&&a._render("data",b.get("data")),a.fire("afterRenderUI"),a.setInternal("rendered",!0),a.fire("beforeBindUI"),i.superclass.bindInternal.call(a),a.callMethodByHierarchy("bindUI","__bindUI"),a.callMethodByHierarchy("initialize","constructor"),a.fire("afterBindUI"),a.fire("beforeSyncUI"),i.superclass.syncInternal.call(a),a.callMethodByHierarchy("syncUI","__syncUI"),a.fire("afterSyncUI")}return a},_render:function(d,e){var f=this,h=f.get("tmpler");if(h)if(d.split(".").length>1)f.get("rendered")&&(d=d.replace(/^data\./,""),f._renderTmpl(h.tmpls,d,e));else if(!h.inDom){var i=f.get("container"),j=f.get("el"),k=a.trim(h.render(e)),l;if(!j||j.length===0){var m="brix_"+a.guid();if(c.ie<=8){l=new b("<div />"),i.append(l),l.html(k);var n=l[0].childNodes;if(n.length>1)l.attr("id",m);else{m=n[0].id||m,n[0].id=m;while(n.length>0)i[0].appendChild(n[0]);l.remove(),l=null}}else l=new b(k),l.length>1?l=g('<div id="'+m+'"></div>').append(l):(m=l.attr("id")||m,l.attr("id",m)),i.append(l);f.set("el","#"+m)}else if(c.ie<=8){l=new b("<div />"),i.append(l),l.html(k);while(l[0].childNodes.length>0)i[0].appendChild(l[0].childNodes[0]);l.remove(),l=null}else i.append(k)}},_renderTmpl:function(b,c,d){var e=this,f=e.get("el");a.each(b,function(b){if((","+b.datakey+",").indexOf(","+c+",")>=0){var g=f.all("[bx-tmpl="+b.name+"]");f.attr("bx-tmpl")==b.name&&(g=f.add(g)),g.each(function(c){if(c.attr("bx-datakey")==b.datakey){var f={};a.each(b.datakey.split(","),function(a){var b=d,c=a.split("."),e=c.length,g=0;while(g!==e)b=b[c[g]],g++;f[c[e-1]]=b,b=null}),a.each(d,function(b,c){a.isFunction(b)&&(f[c]=b)}),e.fire("beforeRefreshTmpl",{node:c}),c.html(a.trim(b.tmpler.render(f))),e.fire("afterRefreshTmpl",{node:c}),f=null}}),g=null}})}},{ATTRS:{el:{getter:function(b){return a.isString(b)&&(b=g(b)),b}},isRemoveHTML:{value:!0},isRemoveEL:{value:!0},container:{value:"body",getter:function(b){return a.isString(b)&&(b=g(b)),b}},tmpl:{value:!1},tmpler:{value:!1},rendered:{value:!1},autoRender:{value:!0},data:{value:!1},dataset:{value:!1},level:{value:3}}});return i},{requires:["node","ua","rich-base","./dataset","./tmpler"]}),KISSY.add("brix/core/brick",function(a,b,c){var d=b.extend({initializer:function(){var a=this,b=a.constructor;while(b){var c=b.RENDERERS;c&&(a.addTmpl(),a.get("dataset").setRenderer(c,a)),b=b.superclass&&b.superclass.constructor}},bindUI:function(){var a=this;a._bindEvent()},_detachEvent:function(){var a=this,b=a.constructor;while(b){var c=b.EVENTS;c&&a._removeEvents(c);var d=b.DOCEVENTS;d&&a._removeEvents(d,document),b=b.superclass&&b.superclass.constructor}var e=a.get("events");e&&this._removeEvents(e)},_bindEvent:function(){var a=this,b=a.constructor;while(b){var c=b.EVENTS;c&&this._addEvents(c);var d=b.DOCEVENTS;d&&this._addEvents(d,document),b=b.superclass&&b.superclass.constructor}var e=a.get("events");e&&this._addEvents(e)},_removeEvents:function(a,b){b=b||this.get("el");for(var d in a){var e=a[d];for(var f in e){var g=e[f];d===""?c.detach(b,f,g,this):c.undelegate(b,f,d,g,this)}}},_addEvents:function(a,b){b=b||this.get("el");for(var d in a){var e=a[d];for(var f in e){var g=e[f];d===""?c.on(b,f,g,this):c.delegate(b,f,d,g,this)}}},destructor:function(){var a=this;if(a.get("rendered")){a._detachEvent();if(a.get("isRemoveHTML")){var b=a.get("el");a.get("isRemoveEL")?b.remove():b.empty()}}a.get("pagelet")&&a.set("pagelet",null)}},{ATTRS:{pagelet:{value:null}}});return d},{requires:["./chunk","event"]}),KISSY.add("brix/core/pagelet",function(a,b){function c(b){if(!b.attr("id")){var c;while((c=a.guid("brix_brick_"))&&a.one("#"+c));b.attr("id",c)}return b.attr("id")}var d=b.extend({initializer:function(){var a=this;a.isReady=!1,a.readyList=[],a.bricks=[],a.isAddBehavior=!1},bindUI:function(){var a=this,b=a.get("callback");b&&typeof b=="function"&&a.ready(b),a.get("autoBehavior")&&a.addBehavior()},getBrick:function(b){var c=this,d;return a.each(c.bricks,function(a){if(a.id===b)return d=a.brick,!1}),d||null},destroyBrick:function(a){var b=this;for(var c=0;c<b.bricks.length;c++){var d=b.bricks[c];if(a===d.id)return b._destroyBrick(d),b.bricks.splice(c,1),!1}},_destroyBrick:function(a){a.brick&&(a.brick.destroy&&a.brick.destroy(),a.brick=null)},addBehavior:function(){var a=this;if(a.get("rendered")&&!a.isAddBehavior){a.isAddBehavior=!0;var b=a.get("el"),c=b.all("[bx-name]");b.hasAttr("bx-name")&&(c=b.add(c)),a._addBehavior(c,function(b){a.bricks=b,a._fireReady(),a.on("beforeRefreshTmpl",function(b){b.node.all("[bx-name]").each(function(b){a.destroyBrick(b.attr("id"))})}),a.on("afterRefreshTmpl",function(b){a._addBehavior(b.node.all("[bx-name]"),function(b){b.length>0&&(a.bricks=a.bricks.concat(b))})})})}},_addBehavior:function(b,d){var e=this,f=e.get("config"),g=[];b.each(function(b){var d=c(b),e=b.attr("bx-name"),h=b.attr("bx-path"),i=b.attr("bx-config");i=i?(new Function("return "+i))():{},f&&f[d]&&a.mix(i,f[d]),g.push({id:d,name:e,path:h,config:i})});if(g.length>0){var h=[];a.each(g,function(b){b.path||(b.path="brix/gallery/"+b.name+"/"),a.inArray(h,b.path)||h.push(b.path)}),e.fire("beforeAddBehavior",{useList:h}),a.use(h.join(","),function(a){var b=arguments;a.each(g,function(c){var d=c.id,f=a.merge({container:"#"+d,el:"#"+d,pagelet:e},c.config),g=b[a.indexOf(c.path,h)+1],i=new g(f);c.brick=i}),b=null,d(g)})}else d(g)},ready:function(a){this.isReady?a.call(window,this):this.readyList.push(a)},_fireReady:function(){var a=this;if(a.isReady)return;a.isReady=!0;if(a.readyList){var b,c=0;while(b=a.readyList[c++])b.call(a);a.readyList=null}},destructor:function(){var b=this;a.each(b.bricks,function(a,c){b._destroyBrick(a)}),b.bricks=null;if(b.get("rendered")&&b.get("isRemoveHTML")){var c=b.get("el");b.get("isRemoveEL")?c.remove():c.empty(),c=null}}},{ATTRS:{autoBehavior:{value:!0},callback:{value:null},config:{value:{}}}},"Pagelet");return d},{requires:["./chunk"]}),KISSY.add("brix/core/demolet",function(a,b,c,d){function g(a){if(f[a])return!1;f[a]=!0,c({url:a,dataType:"text",async:!1,complete:function(a,b,c){b=="success"&&e("<style>"+a+"</style>").appendTo("head")}})}function h(b,d,e){e=e||"@",d=d||{};var f=new RegExp("\\{\\{"+e+"(.+)?\\}\\}","ig");return b=b.replace(f,function(b,e){a.log(e);var f="",g=e.replace(/\//ig,"_").replace(/\./ig,"_");return d[g]=d[g]||{},c({url:e+"template.html",dataType:"html",async:!1,success:function(a,b,c){f="{{#"+g+"}}"+a+"{{/"+g+"}}"}}),c({url:e+"data.json",async:!1,dataType:"json",success:function(a,b,c){for(var e in a)d[g][e]=a[e]}}),f}),{tmpl:b,data:d}}var e=d.all,f={},i=b.extend({initializer:function(){var b=this;b.on("beforeAddBehavior",function(c){a.each(b.get("projectCSS"),function(a){g(a)});var d=c.useList;a.each(d,function(b){if(a.startsWith(b,"brix/"))a.use(b+"index.css");else{var c=3;a.startsWith(b,"imports/")&&(c=5);var d=b.split("/");d.length>c&&(d.splice(d.length-2),g(d.join("/")+"/index.css")),g(b.substring(0,b.lastIndexOf("/"))+"/index.css")}})})}},{ATTRS:{projectCSS:{value:[],setter:function(b){return a.isArray(b)?b:[b]}},s:{value:"@"},tmpl:{setter:function(a){var b=this,c=b.get("data")||{},d=h(a,c,b.get("s"));return b.set("data",d.data),d.tmpl}}}},"Demolet");return i},{requires:["./pagelet","ajax","node"]}),function(a,b){function i(b){b=a.trim(b),b&&b.charAt(b.length-1)!="/"&&(b+="/"),!b.match(/^(http(s)?)|(file):/i)&&!g(b,"/")&&(b=h+b);if(g(b,"/")){var c=e.location;b=c.protocol+"//"+c.host+b}var d=b.split("/"),f=[],i;for(var j=0;j<d.length;j++)i=d[j],i!="."&&(i==".."?f.pop():f.push(i));return b=f.join("/"),b.substring(0,b.length-1)}function j(){var b=/^(.*)brix(-min)?\.js[^\/]*/i,c=/brix(-min)?\.js/i,d=e.document.getElementsByTagName("script"),f=d[d.length-1],g=i(f.src),h=f.getAttribute("bx-config");h?h=(new Function("return "+h))():h={},h.comboPrefix=h.comboPrefix||"??",h.comboSep=h.comboSep||",";var j=h.comboPrefix,k=h.comboSep,l=g.split(k),m,n=l[0],o,p=n.indexOf(j);return p==-1?m=g.replace(b,"$1"):(m=n.substring(0,p),o=n.substring(p+2,n.length),o.match(c)?m+=o.replace(b,"$1"):a.each(l,function(a){if(a.match(c))return m+=a.replace(b,"$1"),!1})),m=m.substring(0,m.lastIndexOf("brix")),a.mix({autoConfig:!0,path:m,componentsPath:"./",importsPath:"./"},h)}var c=!1,d=[],e=window,f=e.location,g=a.startsWith,h=f.href.replace(f.hash,"").replace(/[^\/]*$/i,"");b=e[b]=e[b]||{};var k=j(),l="",m="20121226",n="2.0",o=!1;a.mix(b,{config:function(c){if(o)return;o=!0,c=a.merge({debug:l=="@DEBUG@"?!0:!1,tag:m=="@TAG@"?"":m,fixed:n=="@VERSION@"?"":n+"/",gallery:{}},k,c),c.fixed=="@VERSION@"&&(c.fixed=""),b.basePath=c.path,b.fixed=c.fixed,a.config({packages:[{name:"brix",path:c.path,tag:c.tag,charset:"utf-8"},{name:"components",path:c.componentsPath,tag:c.componentsTag||c.tag,charset:"utf-8"},{name:"imports",path:c.importsPath,tag:c.importsTag||c.tag,charset:"utf-8"}]}),a.config({map:[[/(.+brix\/)(gallery\/)(.+?)(\/.+?(?:-min)?\.(?:js|css))(\?[^?]+)?$/,function(a,b,d,e,f,g){var h=b+c.fixed+d+e;return c.gallery[e]&&(h+="/"+c.gallery[e]),c.debug&&(f=f.replace("-min","")),h+=f+(g?g:""),h}],[/(.+brix\/)(core.+?)((?:-min)?\.js)(\?[^?]+)?$/,function(a,b,d,e,f){var g=b+c.fixed;return c.debug&&(e=e.replace("-min","")),g+=d+e+(f?f:""),g}]]})},ready:function(a){c?a.call(b):d.push(a)},_fireReady:function(){if(c)return;c=!0;if(d){var a,e=0;while(a=d[e++])a.call(b);d=null}}});if(k.autoConfig){b.config({});if(k.autoPagelet){a.use("brix/core/pagelet",function(a,c){a.ready(function(){b.pagelet=new c({tmpl:"body"}),b._fireReady()})});return}}a.ready(function(){b._fireReady()})}(KISSY,"Brix");