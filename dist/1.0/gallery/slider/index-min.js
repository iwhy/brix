KISSY.add("brix/gallery/slider/index",function(e,t,i,a,n){function r(){r.superclass.constructor.apply(this,arguments)}r.FIRES={drag:"drag",dragstart:"dragstart",dragend:"dragend",resize:"resize"};var s={horizontal:"horizontal",vertical:"vertical"};return r.ATTRS={range:{value:!1},mode:{value:"horizontal"},startStep:{value:0},endStep:{value:100},integerStep:{value:1},current:{},knobOffset:{value:-7}},r.METHODS={resize:function(){this.fire(r.FIRES.resize)},destructor:function(){this.knob.destroy(),this.knob_start&&this.knob_start.destroy(),this.knobNode=null,this.knobNode_start=null,self.detach()}},e.extend(r,t,{initialize:function(){this._render_range(),this._render_knob()},_render_knob:function(){function t(){var t=u.value,a=k?d.height():d.width();e.isArray(t)?(t[0]=i(t[0],h,f),t[1]=i(t[1],h,f),y=a*(t[1]-h)/(f-h),x=a*(t[0]-h)/(f-h),m.css(T,y),b.css(T,x),v.css(T,x),v.css(_,Math.abs(y-x)),x==a?b.css("zIndex",2):b.css("zIndex","auto")):(t=i(t,h,f),y=a*(t-h)/(f-h),v.css(_,Math.abs(y)),m.css(T,y))}function i(t,i,a){return e.isUndefined(t)&&(t=i),i>t&&a>t&&(t=i),t>a&&t>i&&(t=a),t}function a(){var t=k?d.height():d.width(),i=(f-h)*y/t+h,a=null===x?null:(f-h)*x/t+h;g&&(i=Math.round(i/g)*g,a=null===a?null:Math.round(a/g)*g),e.log("("+f+"-"+h+")*"+y+"/"+t+"+"+h),u.value=b?[a,i]:i,o(u.value),u.fire(r.FIRES.drag,{data:u.value,current:u.get("current")}),e.log("Slider: change="+u.value+","+u.get("current"))}function o(t){var i,a=u.get("range");e.isArray(t)&&(f>h&&t[0]>t[1]&&(t=[t[1],t[0]]),h>f&&t[0]<t[1]&&(t=[t[1],t[0]])),i=t,e.isArray(u.get("range"))&&(i=e.isArray(t)?[a[t[0]],a[t[1]]]:a[t]),u.set("current",i)}function l(){u.fire(r.FIRES.dragstart,{data:u.value,current:u.get("current")})}function c(){t(),u.fire(r.FIRES.dragend,{data:u.value,current:u.get("current")})}var u=this,d=u.get("el"),p=u.get("mode"),h=u.get("startStep"),f=u.get("endStep"),g=u.get("integerStep"),v=d.one(".slider-bar"),m=d.one(".slider-knob-end"),b=this.knobNode_start=d.one(".slider-knob-start"),y=0,x=null,w=u.get("knobOffset"),k=p===s.horizontal?!1:!0,S=k?"top":"left",T=k?"bottom":"left",_=k?"height":"width";m=m||d.one(".slider-knob"),this.knobNode=m;var D=u.knob=new n.Draggable({node:m,cursor:"move"});if(D.on("drag",function(e){var t=d.offset(),n=k?d.height():d.width(),r=y=e[S]-t[S]-w;k&&(y=n-r),y=i(y,x||0,n),v.css(_,Math.abs(y-(x||0))),v.css(T,x||0),m.css(T,y),a({target:m})}),D.on("dragstart",l),D.on("dragend",c),b){var E=u.knob_start=new n.Draggable({node:b,cursor:"move"});E.on("drag",function(e){var t=d.offset(),n=k?d.height():d.width(),r=x=e[S]-t[S]-w;k&&(x=n-r),x=i(x,0,y),v.css(T,x),v.css(_,Math.abs(y-x)),b.css(T,x),a({target:b})}),E.on("dragstart",l),E.on("dragend",c)}e.isUndefined(u.get("current"))||(u.value=u.value||u.get("current"),t()),u.on(r.FIRES.resize,t)},_render_range:function(){e.isArray(this.get("range"))&&(this.set("endStep",this.get("range").length-1),e.log("slider: range "+this.get("range")),e.isString(this.get("current"))&&(this.value=e.indexOf(this.get("current"),this.get("range"))))}}),e.augment(r,r.METHODS),r},{requires:["brix/core/brick","ua","node","dd"]});