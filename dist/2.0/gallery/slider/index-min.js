KISSY.add("brix/gallery/slider/index",function(a,b,c,d,e){function f(){f.superclass.constructor.apply(this,arguments)}f.FIRES={drag:"drag",dragstart:"dragstart",dragend:"dragend",resize:"resize"};var g={horizontal:"horizontal",vertical:"vertical"};return f.ATTRS={range:{value:!1},mode:{value:"horizontal"},startStep:{value:0},endStep:{value:100},integerStep:{value:1},current:{},knobOffset:{value:-7}},f.METHODS={resize:function(){this.fire(f.FIRES.resize)},destructor:function(){this.knob.destroy(),this.knob_start&&this.knob_start.destroy(),this.knobNode=null,this.knobNode_start=null,self.detach()}},a.extend(f,b,{initialize:function(){this._render_range(),this._render_knob()},_render_knob:function(){function w(){var d=b.value,e,f,g,j=q?c.height():c.width();a.isArray(d)?(d[0]=x(d[0],h,i),d[1]=x(d[1],h,i),n=j*(d[1]-h)/(i-h),o=j*(d[0]-h)/(i-h),l.css(s,n),m.css(s,o),k.css(s,o),k.css(t,Math.abs(n-o)),o==j?m.css("zIndex",2):m.css("zIndex","auto")):(d=x(d,h,i),n=j*(d-h)/(i-h),k.css(t,Math.abs(n)),l.css(s,n))}function x(b,c,d){return a.isUndefined(b)&&(b=c),b<c&&b<d&&(b=c),b>d&&b>c&&(b=d),b}function y(d){var e=q?c.height():c.width(),g=(i-h)*n/e+h,k=o===null?null:(i-h)*o/e+h;j&&(g=Math.round(g/j)*j,k=k===null?null:Math.round(k/j)*j),a.log("("+i+"-"+h+")*"+n+"/"+e+"+"+h),m?b.value=[k,g]:b.value=g,z(b.value),b.fire(f.FIRES.drag,{data:b.value,current:b.get("current")}),a.log("Slider: change="+b.value+","+b.get("current"))}function z(c){var d=b.get("range"),e;a.isArray(c)&&(h<i&&c[0]>c[1]&&(c=[c[1],c[0]]),h>i&&c[0]<c[1]&&(c=[c[1],c[0]])),e=c,a.isArray(b.get("range"))&&(a.isArray(c)?e=[d[c[0]],d[c[1]]]:e=d[c]),b.set("current",e)}function A(){b.fire(f.FIRES.dragstart,{data:b.value,current:b.get("current")})}function B(){w(),b.fire(f.FIRES.dragend,{data:b.value,current:b.get("current")})}var b=this,c=b.get("el"),d=b.get("mode"),h=b.get("startStep"),i=b.get("endStep"),j=b.get("integerStep"),k=c.one(".slider-bar"),l=c.one(".slider-knob-end"),m=this.knobNode_start=c.one(".slider-knob-start"),n=0,o=null,p=b.get("knobOffset"),q=d===g.horizontal?!1:!0,r=q?"top":"left",s=q?"bottom":"left",t=q?"height":"width";l=l||c.one(".slider-knob"),this.knobNode=l;var u=b.knob=new e.Draggable({node:l,cursor:"move"});u.on("drag",function(a){var b=c.offset(),d=q?c.height():c.width(),e=n=a[r]-b[r]-p;q&&(n=d-e),n=x(n,o||0,d),k.css(t,Math.abs(n-(o||0))),k.css(s,o||0),l.css(s,n),y({target:l})}),u.on("dragstart",A),u.on("dragend",B);if(m){var v=b.knob_start=new e.Draggable({node:m,cursor:"move"});v.on("drag",function(a){var b=c.offset(),d=q?c.height():c.width(),e=o=a[r]-b[r]-p;q&&(o=d-e),o=x(o,0,n),k.css(s,o),k.css(t,Math.abs(n-o)),m.css(s,o),y({target:m})}),v.on("dragstart",A),v.on("dragend",B)}a.isUndefined(b.get("current"))||(b.value=b.value||b.get("current"),w()),b.on(f.FIRES.resize,w)},_render_range:function(){a.isArray(this.get("range"))&&(this.set("endStep",this.get("range").length-1),a.log("slider: range "+this.get("range")),a.isString(this.get("current"))&&(this.value=a.indexOf(this.get("current"),this.get("range"))))}}),a.augment(f,f.METHODS),f},{requires:["brix/core/brick","ua","node","dd"]});