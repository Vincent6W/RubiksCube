(function(e){function t(t){for(var r,s,a=t[0],c=t[1],h=t[2],d=0,l=[];d<a.length;d++)s=a[d],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&l.push(i[s][0]),i[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);u&&u(t);while(l.length)l.shift()();return o.push.apply(o,h||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var c=n[a];0!==i[c]&&(r=!1)}r&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},i={app:0},o=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=t,a=a.slice();for(var h=0;h<a.length;h++)t(a[h]);var u=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("85ec"),i=n.n(r);i.a},2657:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("cube")],1)},o=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"container",staticClass:"container"})},a=[],c=n("5a89"),h=n("4721"),u={name:"Three",data:function(){return{renderer:null,camera:null,scene:null,axes:null}},mounted:function(){this.createRenderer(),this.createCamera(),this.createScene(),this.createAxes();var e=new c["BoxGeometry"](20,20,20),t=new c["MeshLambertMaterial"]({color:16711935}),n=new c["Mesh"](e,t);n.position.set(10,10,10),n.castShadow=!0,this.scene.add(n);var r=new c["EdgesGeometry"](e),i=new c["LineSegments"](r,new c["LineBasicMaterial"]({color:65535}));i.position.set(10,10,10);var o=new c["PlaneGeometry"](300,200),s=new c["MeshLambertMaterial"]({color:16777215}),a=new c["Mesh"](o,s);a.rotateX(-Math.PI/2),a.receiveShadow=!0,this.scene.add(a);var u=new c["DirectionalLight"](16777215,1);u.position.set(150,100,200),u.castShadow=!0,u.shadow.camera.near=1,u.shadow.camera.far=300,u.shadow.camera.left=-50,u.shadow.camera.right=50,u.shadow.camera.top=200,u.shadow.camera.bottom=-100,u.shadow.mapSize.set(2048,2048),this.scene.add(u),this.render();var d=new h["a"](this.camera,this.renderer.domElement);d.addEventListener("change",this.render)},methods:{createRenderer:function(){this.renderer=new c["WebGLRenderer"]({antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.shadowMap.enabled=!0,this.$refs.container.appendChild(this.renderer.domElement)},createCamera:function(){this.camera=new c["PerspectiveCamera"](45,window.innerWidth/window.innerHeight,1,500),this.camera.position.set(100,100,100),this.camera.lookAt(0,0,0)},createScene:function(){this.scene=new c["Scene"]},createAxes:function(){this.axes=new c["AxesHelper"](1e4),this.scene.add(this.axes)},render:function(){this.renderer.render(this.scene,this.camera)}}},d=u,l=(n("6517"),n("2877")),w=Object(l["a"])(d,s,a,!1,null,"d630bb44",null),f=w.exports,m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"container",staticClass:"container"})},p=[],b=(n("cb29"),n("4160"),n("fb6a"),n("159b"),n("2909"));n("920c");window.THREE=c,window.requestAnimFrame=function(){return window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.webkitRequestAnimationFrame}();var v={name:"Rubik",data:function(){return{renderer:null,camera:null,scene:null,axes:null,controls:null,cubeSize:16,order:3,baseColor:4210752,colors:["#00ff00","#0000ff","#ffff00","#ffffff","#ff0000","#ff8800"],cubes:[],isRotating:!1,raycaster:null,mouse:null,intersect:null,normalize:null,directions:{x:new c["Vector3"](1,0,0),xNg:new c["Vector3"](-1,0,0),y:new c["Vector3"](0,1,0),yNg:new c["Vector3"](0,-1,0),z:new c["Vector3"](0,0,1),zNg:new c["Vector3"](0,0,-1)},startPoint:null,movePoint:null}},mounted:function(){this.createRenderer(),this.createCamera(),this.createScene(),this.createRubik(),this.createCoverCube(),this.createLight(),this.render(),this.createOrbitController(),this.createRayCaster(),this.rigistEvent()},methods:{createRenderer:function(){this.renderer=new c["WebGLRenderer"]({antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.$refs.container.appendChild(this.renderer.domElement),window.addEventListener("resize",this.onWindowResize,!1)},onWindowResize:function(){var e=window.innerWidth/window.innerHeight;this.camera.aspect=e,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight),this.render()},createCamera:function(){this.camera=new c["PerspectiveCamera"](45,window.innerWidth/window.innerHeight,1,500),this.camera.position.set(100,100,100),this.camera.lookAt(0,0,0)},createScene:function(){this.scene=new c["Scene"],this.scene.background=new c["Color"](15658734),window.scene=this.scene},createAxes:function(){this.axes=new c["AxesHelper"](1e3),this.scene.add(this.axes)},createLight:function(){var e=new c["AmbientLight"](14540253);this.scene.add(e)},render:function(){this.renderer.render(this.scene,this.camera)},createOrbitController:function(){this.controls=new h["a"](this.camera,this.renderer.domElement),this.controls.addEventListener("change",this.render),this.controls.enableZoom=!1,this.controls.enablePan=!1},createCube:function(e,t){var n,r=new c["BoxGeometry"](this.cubeSize,this.cubeSize,this.cubeSize),i=new c["Mesh"](r,t);return(n=i.position).set.apply(n,Object(b["a"])(e)),i},createRubik:function(){var e=(this.order-1)/2,t=[];this.colors.forEach((function(e){var n=(new c["TextureLoader"]).load("../images/yellow.png");n.needsUpdate=!0;var r=new c["MeshLambertMaterial"]({map:n});t.push(r)}));for(var n=0;n<this.order;n++)for(var r=(n-e)*this.cubeSize,i=0;i<this.order;i++)for(var o=(i-e)*this.cubeSize,s=0;s<this.order;s++){var a=(s-e)*this.cubeSize,h=[a,r,o],u=new Array(6).fill(new c["MeshLambertMaterial"]({color:this.baseColor}));0===n?u[3]=t[3]:n===this.order-1&&(u[2]=t[2]),0===i?u[5]=t[5]:i===this.order-1&&(u[4]=t[4]),0===s?u[1]=t[1]:s===this.order-1&&(u[0]=t[0]);var d=this.createCube(h,u);this.cubes.push(d),this.scene.add(d)}},createCoverCube:function(){var e=new c["BoxGeometry"](3*this.cubeSize,3*this.cubeSize,3*this.cubeSize),t=new c["MeshBasicMaterial"]({opacity:0,transparent:!0}),n=new c["Mesh"](e,t);n.cubeType="coverCube",this.scene.add(n)},faces:function(e){var t=document.createElement("canvas");t.width=256,t.height=256;var n=t.getContext("2d");return n?(n.fillStyle="rgba(64,64,64,1)",n.fillRect(0,0,256,256),n.rect(24,24,208,208),n.lineJoin="round",n.lineWidth=24,n.fillStyle=e,n.strokeStyle=e,n.stroke(),n.fill()):alert("您的浏览器不支持Canvas无法预览.\n"),t},rigistEvent:function(){this.renderer.domElement.addEventListener("mousedown",this.startCube,!1),this.renderer.domElement.addEventListener("mousemove",this.moveCube,!1),this.renderer.domElement.addEventListener("mouseup",this.stopCube,!1),this.renderer.domElement.addEventListener("touchstart",this.startCube,!1),this.renderer.domElement.addEventListener("touchmove",this.moveCube,!1),this.renderer.domElement.addEventListener("touchend",this.stopCube,!1)},createRayCaster:function(){this.raycaster=new c["Raycaster"],this.mouse=new c["Vector2"]},startCube:function(e){this.controls.enabled=!1,this.getIntersects(e),!this.isRotating&&this.intersect?(this.controls.enabled=!1,this.startPoint=this.intersect.point):this.controls.enabled=!0},moveCube:function(e){var t=this;if(this.startPoint&&(this.getIntersects(e,!0),!this.isRotating&&this.intersect&&(this.movePoint=this.intersect.point,!this.movePoint.equals(this.startPoint)))){this.isRotating=!0;var n=new c["Vector3"];n.crossVectors(this.startPoint,this.movePoint);var r=this.getDirection(n),i=this.getBoxes(this.intersect,r);window.requestAnimFrame((function(e){t.rotateAnimation(i,r,e,0)}))}e.preventDefault()},stopCube:function(e){this.controls.enabled=!0,this.intersect=null,this.startPoint=null},getIntersects:function(e,t){if(e.touches){var n=e.touches[0];this.mouse.x=n.clientX/window.innerWidth*2-1,this.mouse.y=-n.clientY/window.innerHeight*2+1}else this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-e.clientY/window.innerHeight*2+1;this.raycaster.setFromCamera(this.mouse,this.camera);var r=this.raycaster.intersectObjects(this.scene.children);if(r.length)try{"coverCube"===r[0].object.cubeType?(this.intersect=r[1],t||(this.normalize=r[0].face.normal)):(this.intersect=r[0],t||(this.normalize=r[1].face.normal))}catch(i){console.log(i)}},getDirection:function(e){var t,n={},r=this.normalize.clone();for(var i in this.directions)0!==r.angleTo(this.directions[i])&&0!==r.negate().angleTo(this.directions[i])&&(n[i]=e.angleTo(this.directions[i]));var o=this.min(n);switch(o){case"x":t="xcw";break;case"xNg":t="xccw";break;case"y":t="ycw";break;case"yNg":t="yccw";break;case"z":t="zcw";break;case"zNg":t="zccw";break}return t},min:function(e){var t,n;for(var r in e)(void 0===t||e[r]<t)&&(t=e[r],n=r);return n},getBoxes:function(e,t){var n=t.slice(0,1),r=[];return this.cubes.forEach((function(t){Math.abs(t.position[n]-e.object.position[n])<1e-5&&r.push(t)})),r},rotateAnimation:function(e,t,n,r,i){var o=this,s=300;switch(0===r&&(r=n,i=n),n-r>=s&&(n=r+s,this.isRotating=!1,this.startPoint=null),t){case"xcw":for(var a=0;a<e.length;a++)this.rotateAroundWorldX(e[a],90*Math.PI/180*(n-i)/s);break;case"xccw":for(var c=0;c<e.length;c++)this.rotateAroundWorldX(e[c],-90*Math.PI/180*(n-i)/s);break;case"ycw":for(var h=0;h<e.length;h++)this.rotateAroundWorldY(e[h],90*Math.PI/180*(n-i)/s);break;case"yccw":for(var u=0;u<e.length;u++)this.rotateAroundWorldY(e[u],-90*Math.PI/180*(n-i)/s);break;case"zcw":for(var d=0;d<e.length;d++)this.rotateAroundWorldZ(e[d],90*Math.PI/180*(n-i)/s);break;case"zccw":for(var l=0;l<e.length;l++)this.rotateAroundWorldZ(e[l],-90*Math.PI/180*(n-i)/s);break}this.render(),n-r<s&&window.requestAnimFrame((function(i){o.rotateAnimation(e,t,i,r,n)}))},rotateAroundWorldX:function(e,t){var n=e.position.y,r=e.position.z,i=new c["Quaternion"];i.setFromAxisAngle(new c["Vector3"](1,0,0),t),e.quaternion.premultiply(i),e.position.y=Math.cos(t)*n-Math.sin(t)*r,e.position.z=Math.cos(t)*r+Math.sin(t)*n},rotateAroundWorldY:function(e,t){var n=e.position.x,r=e.position.z,i=new c["Quaternion"];i.setFromAxisAngle(new c["Vector3"](0,1,0),t),e.quaternion.premultiply(i),e.position.x=Math.cos(t)*n+Math.sin(t)*r,e.position.z=Math.cos(t)*r-Math.sin(t)*n},rotateAroundWorldZ:function(e,t){var n=e.position.x,r=e.position.y,i=new c["Quaternion"];i.setFromAxisAngle(new c["Vector3"](0,0,1),t),e.quaternion.premultiply(i),e.position.x=Math.cos(t)*n-Math.sin(t)*r,e.position.y=Math.cos(t)*r+Math.sin(t)*n}}},g=v,y=(n("6223"),Object(l["a"])(g,m,p,!1,null,"754d1e7c",null)),x=y.exports,M={name:"App",components:{three:f,cube:x}},C=M,A=(n("034f"),Object(l["a"])(C,i,o,!1,null,null,null)),z=A.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(z)}}).$mount("#app")},6223:function(e,t,n){"use strict";var r=n("2657"),i=n.n(r);i.a},6517:function(e,t,n){"use strict";var r=n("8db1"),i=n.n(r);i.a},"85ec":function(e,t,n){},"8db1":function(e,t,n){}});