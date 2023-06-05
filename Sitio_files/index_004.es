AUI.add("liferay-hudcrumbs",function(a){var d=a.Lang,b=a.ClassNameManager.getClassName,e="hudcrumbs";var c=a.Component.create({ATTRS:{clone:{value:null},hostMidpoint:{value:0},top:{value:0},width:{value:0}},EXTENDS:a.Plugin.Base,NAME:e,NS:e,prototype:{initializer:function(){var g=this;var h=g.get("host");var i=h.clone();var k=h.get("region");i.resetId();var j=a.getWin();var f=a.getBody();g._win=j;g._body=f;g._dockbar=Liferay.Dockbar&&Liferay.Dockbar.dockBar;i.hide();i.addClass("lfr-hudcrumbs");g.set("clone",i);g._calculateDimensions();j.on("scroll",g._onScroll,g);j.on("resize",g._calculateDimensions,g);f.append(i);Liferay.on("dockbar:pinned",g._calculateDimensions,g)},_calculateDimensions:function(g){var f=this;var h=f.get("host").get("region");f.get("clone").setStyles({left:h.left+"px",width:h.width+"px"});f.set("hostMidpoint",h.top+(h.height/2))},_onScroll:function(h){var f=this;var j=h.currentTarget.get("scrollTop");var g=f.get("clone");var i="hide";if(j>=f.get("hostMidpoint")){i="show"}if(f.lastAction!=i){g[i]()}f.lastAction=i}}});a.Hudcrumbs=c},"",{requires:["aui-base","aui-component","plugin"]});YUI.add("async-queue",function(e,t){e.AsyncQueue=function(){this._init(),this.add.apply(this,arguments)};var n=e.AsyncQueue,r="execute",i="shift",s="promote",o="remove",u=e.Lang.isObject,a=e.Lang.isFunction;n.defaults=e.mix({autoContinue:!0,iterations:1,timeout:10,until:function(){return this.iterations|=0,this.iterations<=0}},e.config.queueDefaults||{}),e.extend(n,e.EventTarget,{_running:!1,_init:function(){e.EventTarget.call(this,{prefix:"queue",emitFacade:!0}),this._q=[],this.defaults={},this._initEvents()},_initEvents:function(){this.publish({execute:{defaultFn:this._defExecFn,emitFacade:!0},shift:{defaultFn:this._defShiftFn,emitFacade:!0},add:{defaultFn:this._defAddFn,emitFacade:!0},promote:{defaultFn:this._defPromoteFn,emitFacade:!0},remove:{defaultFn:this._defRemoveFn,emitFacade:!0}})},next:function(){var e;while(this._q.length){e=this._q[0]=this._prepare(this._q[0]);if(!e||!e.until())break;this.fire(i,{callback:e}),e=null}return e||null},_defShiftFn:function(e){this.indexOf(e.callback)===0&&this._q.shift()},_prepare:function(t){if(a(t)&&t._prepared)return t;var r=e.merge(n.defaults,{context:this,args:[],_prepared:!0},this.defaults,a(t)?{fn:t}:t),i=e.bind(function(){i._running||i.iterations--,a(i.fn)&&i.fn.apply(i.context||e,e.Array(i.args))},this);return e.mix(i,r)},run:function(){var e,t=!0;if(this._executing)return this._running=!0,this;for(e=this.next();e&&!this.isRunning();e=this.next()){t=e.timeout<0?this._execute(e):this._schedule(e);if(!t)break}return e||this.fire("complete"),this},_execute:function(e){this._running=e._running=!0,this._executing=e,e.iterations--,this.fire(r,{callback:e});var t=this._running&&e.autoContinue;return this._running=e._running=!1,this._executing=!1,t},_schedule:function(t){return this._running=e.later(t.timeout,this,function(){this._execute(t)&&this.run()}),!1},isRunning:function(){return!!this._running},_defExecFn:function(e){e.callback()},add:function(){return this.fire("add",{callbacks:e.Array(arguments,0,!0)}),this},_defAddFn:function(t){var n=this._q,r=[];e.Array.each(t.callbacks,function(e){u(e)&&(n.push(e),r.push(e))}),t.added=r},pause:function(){return this._running&&u(this._running)&&this._running.cancel(),this._running=!1,this},stop:function(){return this._q=[],this._running&&u(this._running)&&(this._running.cancel(),this._running=!1),this},indexOf:function(e){var t=0,n=this._q.length,r;for(;t<n;++t){r=this._q[t];if(r===e||r.id===e)return t}return-1},getCallback:function(e){var t=this.indexOf(e);return t>-1?this._q[t]:null},promote:function(e){var t={callback:e},n;return this.isRunning()?n=this.after(i,function(){this.fire(s,t),n.detach()},this):this.fire(s,t),this},_defPromoteFn:function(e){var t=this.indexOf(e.callback),n=t>-1?this._q.splice(t,1)[0]:null;e.promoted=n,n&&this._q.unshift(n)},remove:function(e){var t={callback:e},n;return this.isRunning()?n=this.after(i,function(){this.fire(o,t),n.detach()},this):this.fire(o,t),this},_defRemoveFn:function(e){var t=this.indexOf(e.callback);e.removed=t>-1?this._q.splice(t,1)[0]:null},size:function(){return this.isRunning()||this.next(),this._q.length}})},"patched-v3.11.0",{requires:["event-custom"]});YUI.add("gesture-simulate",function(e,t){function T(n){n||e.error(t+": invalid target node"),this.node=n,this.target=e.Node.getDOMNode(n);var r=this.node.getXY(),i=this._getDims();a=r[0]+i[0]/2,f=r[1]+i[1]/2}var t="gesture-simulate",n=e.config.win&&"ontouchstart"in e.config.win&&!e.UA.phantomjs&&!(e.UA.chrome&&e.UA.chrome<6),r={tap:1,doubletap:1,press:1,move:1,flick:1,pinch:1,rotate:1},i={touchstart:1,touchmove:1,touchend:1,touchcancel:1},s=e.config.doc,o,u=20,a,f,l={HOLD_TAP:10,DELAY_TAP:10,HOLD_PRESS:3e3,MIN_HOLD_PRESS:1e3,MAX_HOLD_PRESS:6e4,DISTANCE_MOVE:200,DURATION_MOVE:1e3,MAX_DURATION_MOVE:5e3,MIN_VELOCITY_FLICK:1.3,DISTANCE_FLICK:200,DURATION_FLICK:1e3,MAX_DURATION_FLICK:5e3,DURATION_PINCH:1e3},c="touchstart",h="touchmove",p="touchend",d="gesturestart",v="gesturechange",m="gestureend",g="mouseup",y="mousemove",b="mousedown",w="click",E="dblclick",S="x",x="y";T.prototype={_toRadian:function(e){return e*(Math.PI/180)},_getDims:function(){var e,t,n;return this.target.getBoundingClientRect?(e=this.target.getBoundingClientRect(),"height"in e?n=e.height:n=Math.abs(e.bottom-e.top),"width"in e?t=e.width:t=Math.abs(e.right-e.left)):(e=this.node.get("region"),t=e.width,n=e.height),[t,n]},_calculateDefaultPoint:function(t){var n;return!e.Lang.isArray(t)||t.length===0?t=[a,f]:(t.length==1&&(n=this._getDims[1],t[1]=n/2),t[0]=this.node.getX()+t[0],t[1]=this.node.getY()+t[1]),t},rotate:function(n,r,i,s,o,u,a){var f,l=i,c=s;if(!e.Lang.isNumber(l)||!e.Lang.isNumber(c)||l<0||c<0)f=this.target.offsetWidth<this.target.offsetHeight?this.target.offsetWidth/4:this.target.offsetHeight/4,l=f,c=f;e.Lang.isNumber(a)||e.error(t+"Invalid rotation detected."),this.pinch(n,r,l,c,o,u,a)},pinch:function(n,r,i,s,o,a,f){var g,y,b=u,w,E=0,S=i,x=s,T,N,C,k,L,A,O,M,_,D={start:[],end:[]},P={start:[],end:[]},H,B;r=this._calculateDefaultPoint(r),(!e.Lang.isNumber(S)||!e.Lang.isNumber(x)||S<0||x<0)&&e.error(t+"Invalid startRadius and endRadius detected.");if(!e.Lang.isNumber(o)||o<=0)o=l.DURATION_PINCH;if(!e.Lang.isNumber(a))a=0;else{a%=360;while(a<0)a+=360}e.Lang.isNumber(f)||(f=0),e.AsyncQueue.defaults.timeout=b,g=new e.AsyncQueue,N=r[0],C=r[1],O=a,M=a+f,D.start=[N+S*Math.sin(this._toRadian(O)),C-S*Math.cos(this._toRadian(O))],D.end=[N+x*Math.sin(this._toRadian(M)),C-x*Math.cos(this._toRadian(M))],P.start=[N-S*Math.sin(this._toRadian(O)),C+S*Math.cos(this._toRadian(O))],P.end=[N-x*Math.sin(this._toRadian(M)),C+x*Math.cos(this._toRadian(M))],k=1,L=s/i,g.add({fn:function(){var t,n,r,i;t={pageX:D.start[0],pageY:D.start[1],clientX:D.start[0],clientY:D.start[1]},n={pageX:P.start[0],pageY:P.start[1],clientX:P.start[0],clientY:P.start[1]},i=this._createTouchList([e.merge({identifier:E++},t),e.merge({identifier:E++},n)]),r={pageX:(D.start[0]+P.start[0])/2,pageY:(D.start[0]+P.start[1])/2,clientX:(D.start[0]+P.start[0])/2,clientY:(D.start[0]+P.start[1])/2},this._simulateEvent(this.target,c,e.merge({touches:i,targetTouches:i,changedTouches:i,scale:k,rotation:O},r)),e.UA.ios>=2&&this._simulateEvent(this.target,d,e.merge({scale:k,rotation:O},r))},timeout:0,context:this}),H=Math.floor(o/b),T=(x-S)/H,A=(L-k)/H,_=(M-O)/H,B=function(t){var n=S+T*t,r=N+n*Math.sin(this._toRadian(O+_*t)),i=C-n*Math.cos(this._toRadian(O+_*t)),s=N-n*Math.sin(this._toRadian(O+_*t)),o=C+n*Math.cos(this._toRadian(O+_*t)),u=(r+s)/2,a=(i+o)/2,f,l,c,p;f={pageX:r,pageY:i,clientX:r,clientY:i},l={pageX:s,pageY:o,clientX:s,clientY:o},p=this._createTouchList([e.merge({identifier:E++},f),e.merge({identifier:E++},l)]),c={pageX:u,pageY:a,clientX:u,clientY:a},this._simulateEvent(this.target,h,e.merge({touches:p,targetTouches:p,changedTouches:p,scale:k+A*t,rotation:O+_*t},c)),e.UA.ios>=2&&this._simulateEvent(this.target,v,e.merge({scale:k+A*t,rotation:O+_*t},c))};for(y=0;y<H;y++)g.add({fn:B,args:[y],context:this});g.add({fn:function(){var t=this._getEmptyTouchList(),n,r,i,s;n={pageX:D.end[0],pageY:D.end[1],clientX:D.end[0],clientY:D.end[1]},r={pageX:P.end[0],pageY:P.end[1],clientX:P.end[0],clientY:P.end[1]},s=this._createTouchList([e.merge({identifier:E++},n),e.merge({identifier:E++},r)]),i={pageX:(D.end[0]+P.end[0])/2,pageY:(D.end[0]+P.end[1])/2,clientX:(D.end[0]+P.end[0])/2,clientY:(D.end[0]+P.end[1])/2},e.UA.ios>=2&&this._simulateEvent(this.target,m,e.merge({scale:L,rotation:M},i)),this._simulateEvent(this.target,p,e.merge({touches:t,targetTouches:t,changedTouches:s,scale:L,rotation:M},i))},context:this}),n&&e.Lang.isFunction(n)&&g.add({fn:n,context:this.node}),g.run()},tap:function(t,r,i,s,o){var u=new e.AsyncQueue,a=this._getEmptyTouchList(),f,h,d,v,m;r=this._calculateDefaultPoint(r);if(!e.Lang.isNumber(i)||i<1)i=1;e.Lang.isNumber(s)||(s=l.HOLD_TAP),e.Lang.isNumber(o)||(o=l.DELAY_TAP),h={pageX:r[0],pageY:r[1],clientX:r[0],clientY:r[1]},f=this._createTouchList([e.merge({identifier:0},h)]),v=function(){this._simulateEvent(this.target,c,e.merge({touches:f,targetTouches:f,changedTouches:f},h))},m=function(){this._simulateEvent(this.target,p,e.merge({touches:a,targetTouches:a,changedTouches:f},h))};for(d=0;d<i;d++)u.add({fn:v,context:this,timeout:d===0?0:o}),u.add({fn:m,context:this,timeout:s});i>1&&!n&&u.add({fn:function(){this._simulateEvent(this.target,E,h)},context:this}),t&&e.Lang.isFunction(t)&&u.add({fn:t,context:this.node}),u.run()},flick:function(n,r,i,s,o){var u;r=this._calculateDefaultPoint(r),e.Lang.isString(i)?(i=i.toLowerCase(),i!==S&&i!==x&&e.error(t+"(flick): Only x or y axis allowed")):i=S,e.Lang.isNumber(s)||(s=l.DISTANCE_FLICK),e.Lang.isNumber(o)?o>l.MAX_DURATION_FLICK&&(o=l.MAX_DURATION_FLICK):o=l.DURATION_FLICK,Math.abs(s)/o<l.MIN_VELOCITY_FLICK&&(o=Math.abs(s)/l.MIN_VELOCITY_FLICK),u={start:e.clone(r),end:[i===S?r[0]+s:r[0],i===x?r[1]+s:r[1]]},this._move(n,u,o)},move:function(t,n,r){var i;e.Lang.isObject(n)?(e.Lang.isArray(n.point)?n.point=this._calculateDefaultPoint(n.point):n.point=this._calculateDefaultPoint([]),e.Lang.isNumber(n.xdist)||(n.xdist=l.DISTANCE_MOVE),e.Lang.isNumber(n.ydist)||(n.ydist=0)):n={point:this._calculateDefaultPoint([]),xdist:l.
DISTANCE_MOVE,ydist:0},e.Lang.isNumber(r)?r>l.MAX_DURATION_MOVE&&(r=l.MAX_DURATION_MOVE):r=l.DURATION_MOVE,i={start:e.clone(n.point),end:[n.point[0]+n.xdist,n.point[1]+n.ydist]},this._move(t,i,r)},_move:function(t,n,r){var i,s,o=u,d,v,m,g=0,y;e.Lang.isNumber(r)?r>l.MAX_DURATION_MOVE&&(r=l.MAX_DURATION_MOVE):r=l.DURATION_MOVE,e.Lang.isObject(n)?(e.Lang.isArray(n.start)||(n.start=[a,f]),e.Lang.isArray(n.end)||(n.end=[a+l.DISTANCE_MOVE,f])):n={start:[a,f],end:[a+l.DISTANCE_MOVE,f]},e.AsyncQueue.defaults.timeout=o,i=new e.AsyncQueue,i.add({fn:function(){var t={pageX:n.start[0],pageY:n.start[1],clientX:n.start[0],clientY:n.start[1]},r=this._createTouchList([e.merge({identifier:g++},t)]);this._simulateEvent(this.target,c,e.merge({touches:r,targetTouches:r,changedTouches:r},t))},timeout:0,context:this}),d=Math.floor(r/o),v=(n.end[0]-n.start[0])/d,m=(n.end[1]-n.start[1])/d,y=function(t){var r=n.start[0]+v*t,i=n.start[1]+m*t,s={pageX:r,pageY:i,clientX:r,clientY:i},o=this._createTouchList([e.merge({identifier:g++},s)]);this._simulateEvent(this.target,h,e.merge({touches:o,targetTouches:o,changedTouches:o},s))};for(s=0;s<d;s++)i.add({fn:y,args:[s],context:this});i.add({fn:function(){var t={pageX:n.end[0],pageY:n.end[1],clientX:n.end[0],clientY:n.end[1]},r=this._createTouchList([e.merge({identifier:g},t)]);this._simulateEvent(this.target,h,e.merge({touches:r,targetTouches:r,changedTouches:r},t))},timeout:0,context:this}),i.add({fn:function(){var t={pageX:n.end[0],pageY:n.end[1],clientX:n.end[0],clientY:n.end[1]},r=this._getEmptyTouchList(),i=this._createTouchList([e.merge({identifier:g},t)]);this._simulateEvent(this.target,p,e.merge({touches:r,targetTouches:r,changedTouches:i},t))},context:this}),t&&e.Lang.isFunction(t)&&i.add({fn:t,context:this.node}),i.run()},_getEmptyTouchList:function(){return o||(o=this._createTouchList([])),o},_createTouchList:function(n){var r=[],i,o=this;return!!n&&e.Lang.isArray(n)?e.UA.android&&e.UA.android>=4||e.UA.ios&&e.UA.ios>=2?(e.each(n,function(t){t.identifier||(t.identifier=0),t.pageX||(t.pageX=0),t.pageY||(t.pageY=0),t.screenX||(t.screenX=0),t.screenY||(t.screenY=0),r.push(s.createTouch(e.config.win,o.target,t.identifier,t.pageX,t.pageY,t.screenX,t.screenY))}),i=s.createTouchList.apply(s,r)):e.UA.ios&&e.UA.ios<2?e.error(t+": No touch event simulation framework present."):(i=[],e.each(n,function(e){e.identifier||(e.identifier=0),e.clientX||(e.clientX=0),e.clientY||(e.clientY=0),e.pageX||(e.pageX=0),e.pageY||(e.pageY=0),e.screenX||(e.screenX=0),e.screenY||(e.screenY=0),i.push({target:o.target,identifier:e.identifier,clientX:e.clientX,clientY:e.clientY,pageX:e.pageX,pageY:e.pageY,screenX:e.screenX,screenY:e.screenY})}),i.item=function(e){return i[e]}):e.error(t+": Invalid touchPoints passed"),i},_simulateEvent:function(t,r,s){var o;i[r]?n?e.Event.simulate(t,r,s):this._isSingleTouch(s.touches,s.targetTouches,s.changedTouches)?(r={touchstart:b,touchmove:y,touchend:g}[r],s.button=0,s.relatedTarget=null,o=r===g?s.changedTouches:s.touches,s=e.mix(s,{screenX:o.item(0).screenX,screenY:o.item(0).screenY,clientX:o.item(0).clientX,clientY:o.item(0).clientY},!0),e.Event.simulate(t,r,s),r==g&&e.Event.simulate(t,w,s)):e.error("_simulateEvent(): Event '"+r+"' has multi touch objects that can't be simulated in your platform."):e.Event.simulate(t,r,s)},_isSingleTouch:function(e,t,n){return e&&e.length<=1&&t&&t.length<=1&&n&&n.length<=1}},e.GestureSimulation=T,e.GestureSimulation.defaults=l,e.GestureSimulation.GESTURES=r,e.Event.simulateGesture=function(n,i,s,o){n=e.one(n);var u=new e.GestureSimulation(n);i=i.toLowerCase(),!o&&e.Lang.isFunction(s)&&(o=s,s={}),s=s||{};if(r[i])switch(i){case"tap":u.tap(o,s.point,s.times,s.hold,s.delay);break;case"doubletap":u.tap(o,s.point,2);break;case"press":e.Lang.isNumber(s.hold)?s.hold<l.MIN_HOLD_PRESS?s.hold=l.MIN_HOLD_PRESS:s.hold>l.MAX_HOLD_PRESS&&(s.hold=l.MAX_HOLD_PRESS):s.hold=l.HOLD_PRESS,u.tap(o,s.point,1,s.hold);break;case"move":u.move(o,s.path,s.duration);break;case"flick":u.flick(o,s.point,s.axis,s.distance,s.duration);break;case"pinch":u.pinch(o,s.center,s.r1,s.r2,s.duration,s.start,s.rotation);break;case"rotate":u.rotate(o,s.center,s.r1,s.r2,s.duration,s.start,s.rotation)}else e.error(t+": Not a supported gesture simulation: "+i)}},"patched-v3.11.0",{requires:["async-queue","event-simulate","node-screen"]});AUI.add("liferay-navigation-interaction",function(a){var b="activeDescendant";var f=0;var e=1;var d="liferaynavigationinteraction";var c=a.Component.create({EXTENDS:a.Plugin.Base,NAME:d,NS:d,prototype:{MAP_HOVER:{},initializer:function(j){var h=this;var k=h.get("host");var g=k.one("ul");var i="#"+g.guid();h._directChildLi=i+"> li";h._hostULId=i;Liferay.on(["hideNavigationMenu","showNavigationMenu"],function(m){var l=(m.type=="showNavigationMenu");var n=m.menu;h._lastShownMenu=null;if(l){h._lastShownMenu=n}m.menu.toggleClass("hover",l);m.menu.toggleClass("open",l)});h._initChildMenuHandlers(g);h._initNodeFocusManager()},_handleExit:function(i){var g=this;var h=g._focusManager;if(h.get(b)){h.set(b,0);h.blur()}g._hideMenu()},_handleKey:function(k,m){var g=this;var j;var l=k.target;var i=l.ancestors(g._directChildLi).item(0);var h=true;if(m==f){j=i.previous();h=false}else{j=i.next()}if(!j){var n=i.siblings();if(h){j=n.first()}else{j=n.last()}}g._focusManager.focus(j.one("a"))},_handleKeyDown:function(i){var g=this;var h;if(i.isKey("LEFT")){h="_handleLeft"}else{if(i.isKey("RIGHT")){h="_handleRight"}else{if(i.isKey("TAB")||i.isKey("ESC")){h="_handleExit"}}}if(h){g[h](i)}},_handleLeft:function(h){var g=this;g._handleKey(h,f)},_handleRight:function(h){var g=this;g._handleKey(h,e)},_handleShowNavigationMenu:function(h,k){var g=this;var i=g.MAP_HOVER;if(!(g._lastShownMenu&&(event.type.indexOf("focusedChange")!==-1))){var j=(k&&(k!=h));if(j){Liferay.fire("hideNavigationMenu",i)}if(!k||j){i.menu=h;Liferay.fire("showNavigationMenu",i)}}},_hideMenu:function(){var g=this;var h=g.MAP_HOVER;if(h.menu){Liferay.fire("hideNavigationMenu",h);g.MAP_HOVER={}}},_initChildMenuHandlers:function(h){var g=this;if(h){h.delegate(["mouseenter","mouseleave"],g._onMouseToggle,"> li",g);h.delegate("keydown",g._handleKeyDown,"a",g)}},_initNodeFocusManager:function(){var g=this;var i=g.get("host");i.plug(a.Plugin.NodeFocusManager,{descendants:"a",focusClass:"active",keys:{next:"down:40",previous:"down:38"}});var h=i.focusManager;h.after(["activeDescendantChange","focusedChange"],g._showMenu,g);g._focusManager=h},_onMouseToggle:function(j){var g=this;var h=g.MAP_HOVER;var i="hideNavigationMenu";if(j.type=="mouseenter"){i="showNavigationMenu"}h.menu=j.currentTarget;Liferay.fire(i,h)},_showMenu:function(g){var o=this;g.halt();var n=o.MAP_HOVER;var j=n.menu;var q=g.newVal;var h=(q||(q===0));if(h){var p=o._focusManager;var m=p.get(b);var i=p.get("descendants");var l=i.item(m);var k=l.ancestor(o._directChildLi);o._handleShowNavigationMenu(k,j)}else{if(j){Liferay.fire("hideNavigationMenu",n);o.MAP_HOVER={}}}}}});Liferay.NavigationInteraction=c},"",{requires:["node-focusmanager","plugin"]});YUI.add("querystring-stringify",function(e,t){var n=e.namespace("QueryString"),r=[],i=e.Lang;n.escape=encodeURIComponent,n.stringify=function(e,t,s){var o,u,a,f,l,c,h=t&&t.sep?t.sep:"&",p=t&&t.eq?t.eq:"=",d=t&&t.arrayKey?t.arrayKey:!1;if(i.isNull(e)||i.isUndefined(e)||i.isFunction(e))return s?n.escape(s)+p:"";if(i.isBoolean(e)||Object.prototype.toString.call(e)==="[object Boolean]")e=+e;if(i.isNumber(e)||i.isString(e))return n.escape(s)+p+n.escape(e);if(i.isArray(e)){c=[],s=d?s+"[]":s,f=e.length;for(a=0;a<f;a++)c.push(n.stringify(e[a],t,s));return c.join(h)}for(a=r.length-1;a>=0;--a)if(r[a]===e)throw new Error("QueryString.stringify. Cyclical reference");r.push(e),c=[],o=s?s+"[":"",u=s?"]":"";for(a in e)e.hasOwnProperty(a)&&(l=o+a+u,c.push(n.stringify(e[a],t,l)));return r.pop(),c=c.join(h),!c&&s?s+"=":c}},"patched-v3.11.0",{requires:["yui-base"]});YUI.add("aui-io-request",function(e,t){var n=e.Lang,r=n.isBoolean,i=n.isFunction,s=n.isString,o=e.namespace("config.io"),u=function(e){return function(){return o[e]}},a="active",f="arguments",l="autoLoad",c="cache",h="cfg",p="complete",d="content-type",v="context",m="data",g="dataType",y="",b="end",w="failure",E="form",S="get",x="headers",T="IORequest",N="json",C="method",k="responseData",L="start",A="success",O="sync",M="timeout",_="transaction",D="uri",P="xdr",H="xml",B="Parser error: IO dataType is not correctly parsing",j={all:"*/*",html:"text/html",json:"application/json, text/javascript",text:"text/plain",xml:"application/xml, text/xml"},F=e.Component.create({NAME:T,ATTRS:{autoLoad:{value:!0,validator:r},cache:{value:!0,validator:r},dataType:{setter:function(e){return(e||y).toLowerCase()},value:null,validator:s},responseData:{setter:function(e){return this._setResponseData(e)},value:null},uri:{setter:function(e){return this._parseURL(e)},value:null,validator:s},active:{value:!1,validator:r},cfg:{getter:function(){var t=this;return{arguments:t.get(f),context:t.get(v),data:t.getFormattedData(),form:t.get(E),headers:t.get(x),method:t.get(C),on:{complete:e.bind(t.fire,t,p),end:e.bind(t._end,t),failure:e.bind(t.fire,t,w),start:e.bind(t.fire,t,L),success:e.bind(t._success,t)},sync:t.get(O),timeout:t.get(M),xdr:t.get(P)}},readOnly:!0},transaction:{value:null},arguments:{valueFn:u(f)},context:{valueFn:u(v)},data:{valueFn:u(m)},form:{valueFn:u(E)},headers:{getter:function(t){var n=[],r=this,i=r.get(g);return i&&n.push(j[i]),n.push(j.all),e.merge(t,{Accept:n.join(", ")})},valueFn:u(x)},method:{valueFn:u(C)},selector:{value:null},sync:{valueFn:u(O)},timeout:{valueFn:u(M)},xdr:{valueFn:u(P)}},EXTENDS:e.Plugin.Base,prototype:{init:function(e){var t=this;F.superclass.init.apply(this,arguments),t._autoStart()},destructor:function(){var e=this;e.stop(),e.set(_,null)},getFormattedData:function(){var e=this,t=e.get(m),n=o.dataFormatter;return i(n)&&(t=n.call(e,t)),t},start:function(){var t=this;t.destructor(),t.set(a,!0);var n=t._yuiIOObj;n||(n=new e.IO,t._yuiIOObj=n);var r=n.send(t.get(D),t.get(h));t.set(_,r)},stop:function(){var e=this,t=e.get(_);t&&t.abort()},_autoStart:function(){var e=this;e.get(l)&&e.start()},_parseURL:function(e){var t=this,n=t.get(c),r=t.get(C);if(n===!1&&r==S){var s=+(new Date),u=e.replace(/(\?|&)_=.*?(&|$)/,"$1_="+s+"$2");e=u+(u==e?(e.match(/\?/)?"&":"?")+"_="+s:"")}var a=o.uriFormatter;return i(a)&&(e=a.apply(t,[e])),e},_end:function(e,t){var n=this;n.set(a,!1),n.set(_,null),n.fire(b,e,t)},_success:function(e,t,n){var r=this;r.set(k,t),r.fire(A,e,t,n)},_setResponseData:function(t){var n=null,r=this;if(t){var i=r.get(g),s=t.getResponseHeader(d)||"";if(i==H||!i&&s.indexOf(H)>=0){n=t.responseXML;if(n.documentElement.tagName=="parsererror")throw B}else n=t.responseText;n===y&&(n=null);if(i==N)try{n=e.JSON.parse(n)}catch(o){}else{var u=r.get("selector");if(n&&u){var a;n.documentElement?a=e.one(n):a=e.Node.create(n),n=a.all(u)}}}return n}}});e.IORequest=F,e.io.request=function(t,n){return new e.IORequest(e.merge(n,{uri:t}))}},"2.0.0",{requires:["io-base","json","plugin","querystring-stringify","aui-component"]});YUI.add("aui-parse-content",function(e,t){var n=e.Lang,r=n.isString,i=e.config.doc,s="append",o="documentElement",u="firstChild",a="head",f="host",l="innerHTML",c="<div>_</div>",h="ParseContent",p="queue",d="script",v=";",m="src",g={"":1,"text/javascript":1},y=e.Component.create({NAME:h,NS:h,ATTRS:{queue:{value:null}},EXTENDS:e.Plugin.Base,prototype:{initializer:function(){var t=this;y.superclass.initializer.apply(this,arguments),t.set(p,new e.AsyncQueue),t._bindAOP()},globalEval:function(t){var r=e.getDoc(),s=r.one(a)||r.get(o),u=i.createElement(d);u.type="text/javascript",t&&(u.text=n.trim(t)),s.appendChild(u).remove()},parseContent:function(e){var t=this,n=t._clean(e);return t._dispatch(n),n},_addInlineScript:function(e){var t=this;t.get(p).add({args:e,context:t,fn:t.globalEval,timeout:0})},_bindAOP:function(){var t=this,n=function(n){var r=Array.prototype.slice.call(arguments),i=t.parseContent(n);return r.splice(0,1,i.fragment),new e.Do.AlterArgs(null,r)};this.doBefore("insert",n),this.doBefore("replaceChild",n);var r=function(n){var r=t.parseContent(n);return new e.Do.AlterArgs(null,[r.fragment])};this.doBefore("replace",r),this.doBefore("setContent",r)},_clean:function(t){var n={},i=e.Node.create("<div></div>");return r(t)?(t=c+t,e.DOM.addHTML(i,t,s)):(i.append(c),i.append(t)),n.js=i.all(d).filter(function(e){return g[e.getAttribute("type").toLowerCase()]}),n.js.each(function(e,t){e.remove()}),i.get(u).remove(),n.fragment=i.get("childNodes").toFrag(),n},_dispatch:function(t){var n=this,r=n.get(p),i=[];t.js.each(function(t,s){var o=t.get(m);if(o)i.length&&(n._addInlineScript(i.join(v)),i.length=0),r.add({autoContinue:!1,fn:function(){e.Get.script(o,{onEnd:function(e){e.purge(),r.run()}})},timeout:0});else{var u=t._node;i.push(u.text||u.textContent||u.innerHTML||"")}}),i.length&&n._addInlineScript(i.join(v)),r.run()}}});e.namespace("Plugin").ParseContent=y},"2.0.0",{requires:["async-queue","plugin","io-base","aui-component","aui-node-base"]});AUI.add("liferay-portlet-url",function(a){var b=a.Lang;var d=Liferay.Util;var c=function(f,h,g){var e=this;e.params={};e.reservedParams={controlPanelCategory:null,doAsGroupId:null,doAsUserId:null,doAsUserLanguageId:null,p_auth:null,p_auth_secret:null,p_f_id:null,p_j_a_id:null,p_l_id:null,p_l_reset:null,p_p_auth:null,p_p_cacheability:null,p_p_col_count:null,p_p_col_id:null,p_p_col_pos:null,p_p_i_id:null,p_p_id:null,p_p_isolated:null,p_p_lifecycle:null,p_p_mode:null,p_p_resource_id:null,p_p_state:null,p_p_state_rcv:null,p_p_static:null,p_p_url_type:null,p_p_width:null,p_t_lifecycle:null,p_v_l_s_g_id:null,refererGroupId:null,refererPlid:null,saveLastPath:null,scroll:null};e.options={basePortletURL:g,escapeXML:null,secure:null};if(!g){e.options.basePortletURL=themeDisplay.getPathContext()+themeDisplay.getPathMain()+"/portal/layout?p_l_id="+themeDisplay.getPlid()}a.each(h,function(j,i,k){if(b.isValue(j)){if(e._isReservedParam(i)){e.reservedParams[i]=j}else{e.params[i]=j}}});if(f){e.setLifecycle(f)}};c.prototype={setCopyCurrentRenderParameters:function(){var e=this;return e},setDoAsGroupId:function(f){var e=this;e.reservedParams.doAsGroupId=f;return e},setDoAsUserId:function(f){var e=this;e.reservedParams.doAsUserId=f;return e},setEncrypt:function(){var e=this;return e},setEscapeXML:function(f){var e=this;e.options.escapeXML=f;return e},setLifecycle:function(f){var e=this;var g=e.reservedParams;if(f===c.ACTION_PHASE){g.p_p_lifecycle=c.ACTION_PHASE}else{if(f===c.RENDER_PHASE){g.p_p_lifecycle=c.RENDER_PHASE}else{if(f===c.RESOURCE_PHASE){g.p_p_lifecycle=c.RESOURCE_PHASE;g.p_p_cacheability="cacheLevelPage"}}}return e},setName:function(f){var e=this;e.setParameter("javax.portlet.action",f);return e},setParameter:function(f,g){var e=this;if(e._isReservedParam(f)){e.reservedParams[f]=g}else{e.params[f]=g}return e},setPlid:function(f){var e=this;e.reservedParams.p_l_id=f;return e},setPortletConfiguration:function(){var e=this;return e},setPortletId:function(f){var e=this;e.reservedParams.p_p_id=f;return e},setPortletMode:function(f){var e=this;e.reservedParams.p_p_mode=f;return e},setResourceId:function(f){var e=this;e.reservedParams.p_p_resource_id=f;return e},setSecure:function(f){var e=this;e.options.secure=f;return e},setWindowState:function(f){var e=this;e.reservedParams.p_p_state=f;return e},toString:function(){var e=this;var f=e.options;var i=e.reservedParams;var k=new a.Url(f.basePortletURL);var h=i.p_p_id;if(!h){h=k.getParameter("p_p_id")}var g=d.getPortletNamespace(h);a.each(i,function(m,l,n){if(b.isValue(m)){k.setParameter(l,m)}});a.each(e.params,function(m,l,n){if(b.isValue(m)){k.setParameter(g+l,m)}});if(f.secure){k.setProtocol("https")}var j=k.toString();if(f.escapeXML){j=d.escapeHTML(j)}return j},_isReservedParam:function(g){var f=this;var e=false;a.each(f.reservedParams,function(i,h,j){if(h===g){e=true}});return e}};a.mix(c,{ACTION_PHASE:"1",RENDER_PHASE:"0",RESOURCE_PHASE:"2",createActionURL:function(){return new c(c.ACTION_PHASE)},createPermissionURL:function(i,e,g,h){var j=location.href;var f=c.createRenderURL();f.setDoAsGroupId(themeDisplay.getScopeGroupId());f.setParameter("struts_action","/portlet_configuration/edit_permissions");f.setParameter("redirect",j);if(!themeDisplay.isStateMaximized()){f.setParameter("returnToFullPageURL",j)}f.setParameter("portletResource",i);f.setParameter("modelResource",e);f.setParameter("modelResourceDescription",g);f.setParameter("resourcePrimKey",h);f.setPortletId(86);f.setWindowState("MAXIMIZED");return f},createRenderURL:function(){return new c(c.RENDER_PHASE)},createResourceURL:function(){return new c(c.RESOURCE_PHASE)},createURL:function(e,f){return new c(null,f,e)}});Liferay.PortletURL=c},"",{requires:["aui-base","aui-io-request","aui-url","querystring-stringify-simple"]});AUI.add("liferay-sign-in-modal",function(a){var c="signinmodal";var b=a.config.win;var d=a.Component.create({ATTRS:{resetFormValidator:{value:true},signInPortlet:{setter:a.one,value:"#p_p_id_58_"}},EXTENDS:a.Plugin.Base,NAME:c,NS:c,prototype:{initializer:function(g){var e=this;var f=e.get("signInPortlet");if(f){e._signInPortletBody=f.one(".portlet-body")}var i=e.get("host");e._host=i;e._signInPortlet=f;e._signInURL=i.attr("href");if(f){var j=f.one("form");if(j){var h=Liferay.Form.get(j.attr("id"));e._formValidator=h.formValidator;e._hasSignInForm=j.hasClass("sign-in-form")}}e._bindUI()},_bindUI:function(){var e=this;e._host.on("click",a.bind("_load",e))},_load:function(f){var e=this;f.preventDefault();if(e._signInPortletBody&&e._hasSignInForm){e._loadDOM()}else{e._loadIO()}},_loadDOM:function(){var e=this;var f=e._signInPortletBody;if(!e._originalParentNode){e._originalParentNode=f.ancestor()}e._setModalContent(f);Liferay.Util.focusFormField("input:text")},_loadIO:function(){var e=this;var f=Liferay.Util.addParams("windowState=exclusive",e._signInURL);a.io.request(f,{on:{failure:a.bind("_redirectPage",e),success:function(h,j,i){var g=this.get("responseData");if(g){e._setModalContent(g)}else{e._redirectPage()}}}})},_redirectPage:function(){var e=this;b.location.href=e._signInURL},_setModalContent:function(g){var e=this;var f=Liferay.Util.getWindow(c);if(!f){Liferay.Util.openWindow({dialog:{after:{visibleChange:function(j){var h=e._signInPortletBody;var k=e._formValidator;if(k&&e.get("resetFormValidator")){k.resetAllFields()}if(!j.newVal&&h){var i=e._originalParentNode;if(i){i.append(h)}}}},height:390,width:560},id:c,title:'\u0041\u0063\u0063\u0065\u0064\u0065\u0072'},function(i){var h=i.bodyNode;h.plug(a.Plugin.ParseContent);h.setContent(g)})}else{f.bodyNode.setContent(g);f.show()}}}});Liferay.SignInModal=d},"",{requires:["aui-base","aui-component","aui-io-request","aui-parse-content","liferay-portlet-url","liferay-util-window","plugin"]});