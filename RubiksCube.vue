<template>
  <div class="container" ref="container"></div>
</template>

<script>
    import * as THREE from 'three';
    window.THREE = THREE;
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
    //import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
    //import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
    //import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
    window.requestAnimFrame = (function() {//如果有变化则可能还需要requestAnimationFrame刷新
        return window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.webkitRequestAnimationFrame;
    })();
    export default {
        name: 'Rubik',
        data() {
            return {
                renderer: null,
                camera: null,
                scene: null,
                axes: null,
                controls: null,
                cubeSize: 16,
                order: 3,
                baseColor: 0x404040,
                colors: ['#00ff00', '#0000ff', '#ffff00', '#ffffff', '#ff0000', '#ff8800'],
                cubes: [],
                isRotating: false,
                raycaster: null,
                mouse: null,
                intersect: null,
                normalize: null,
                directions: {
                    x: new THREE.Vector3(1, 0, 0),//X轴正方向
                    xNg: new THREE.Vector3(-1, 0, 0),//X轴负方向
                    y: new THREE.Vector3(0, 1, 0),//Y轴正方向
                    yNg: new THREE.Vector3(0, -1, 0),//Y轴负方向
                    z: new THREE.Vector3(0, 0, 1),//Z轴正方向
                    zNg: new THREE.Vector3(0, 0, -1),//Z轴负方向
                },
                startPoint: null,
                movePoint: null,
            };
        },
        mounted () {
            this.createRenderer();

            this.createCamera();

            this.createScene();

            // this.createAxes();


            this.createRubik();

            this.createCoverCube();

            this.createLight();

            this.render();
            this.createOrbitController();
            this.createRayCaster();
            this.rigistEvent();
        },
        methods: {
            createRenderer () {
                this.renderer = new THREE.WebGLRenderer({
                    antialias:true,
                });
                this.renderer.setSize( window.innerWidth, window.innerHeight );
                this.$refs.container.appendChild( this.renderer.domElement );
                window.addEventListener( 'resize', this.onWindowResize, false );
            },
            onWindowResize () {
                let aspect = window.innerWidth / window.innerHeight;
                this.camera.aspect = aspect;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize( window.innerWidth, window.innerHeight );
                this.render();
            },
            createCamera () {
                this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
                this.camera.position.set( 100, 100, 100 );
                this.camera.lookAt( 0, 0, 0 );
            },
            createScene () {
                this.scene = new THREE.Scene();
                this.scene.background = new THREE.Color(0xeeeeee);
                window.scene = this.scene;
            },
            createAxes () {
                this.axes = new THREE.AxesHelper(1000);
                this.scene.add(this.axes);
            },
            createLight () {
                let light = new THREE.AmbientLight( 0xdddddd ); // soft white light
                this.scene.add( light );
            },
            render () {
                this.renderer.render(this.scene,this.camera);//执行渲染操作
            },
            createOrbitController () {
                this.controls = new OrbitControls(this.camera,this.renderer.domElement);//创建控件对象
                this.controls.addEventListener('change', this.render);//监听鼠标、键盘事件
                this.controls.enableZoom = false;
                this.controls.enablePan = false;
            },
            createCube (position, materialArr) {
                let geometry = new THREE.BoxGeometry(this.cubeSize, this.cubeSize, this.cubeSize);
                let cube = new THREE.Mesh(geometry, materialArr);
                cube.position.set( ...position );
                return cube;
            },
            createRubik () {
                let temp = (this.order - 1) / 2;
                let materials = [];
                this.colors.forEach((item) => {
                    let texture = new THREE.CanvasTexture(this.faces(item));
                    texture.needsUpdate = true;
                    let material = new THREE.MeshLambertMaterial( { map: texture } );
                    materials.push(material);
                });
                for (let i = 0; i < this.order; i++) {
                    let y = (i - temp) * this.cubeSize;
                    for (let j = 0; j < this.order; j++) {
                        let z = (j - temp) * this.cubeSize;
                        for (let k = 0; k < this.order; k++) {
                            let x = (k - temp) * this.cubeSize;
                            let position = [x, y, z];
                            let materialArr = new Array(6).fill(new THREE.MeshLambertMaterial( { color: this.baseColor } ));
                            if (i === 0) {
                                materialArr[3] = materials[3];
                            } else if (i === (this.order - 1)) {
                                materialArr[2] = materials[2];
                            }
                            if (j === 0) {
                                materialArr[5] = materials[5];
                            } else if (j === (this.order - 1)) {
                                materialArr[4] = materials[4];
                            }
                            if (k === 0) {
                                materialArr[1] = materials[1];
                            } else if (k === (this.order - 1)) {
                                materialArr[0] = materials[0];
                            }
                            let cube = this.createCube(position, materialArr);
                            this.cubes.push(cube);
                            this.scene.add(cube);
                        }
                    }
                }
            },
            createCoverCube () {
                let geometry = new THREE.BoxGeometry(this.cubeSize * 3, this.cubeSize * 3, this.cubeSize * 3);
                let material = new THREE.MeshBasicMaterial({ opacity: 0, transparent: true });
                let cube = new THREE.Mesh(geometry, material);
                cube.cubeType = 'coverCube';
                this.scene.add(cube);
            },
            //生成canvas素材
            faces (rgbaColor) {
                let canvas = document.createElement('canvas');
                canvas.width = 256;
                canvas.height = 256;
                let context = canvas.getContext('2d');
                if (context) {
                    //画一个宽高都是256的黑色正方形
                    context.fillStyle = 'rgba(64,64,64,1)';
                    context.fillRect(0, 0, 256, 256);
                    context.rect(24, 24, 208, 208);
                    context.lineJoin = 'round';
                    context.lineWidth = 24;
                    context.fillStyle = rgbaColor;
                    context.strokeStyle = rgbaColor;
                    context.stroke();
                    context.fill();
                } else {
                    alert('您的浏览器不支持Canvas无法预览.\n');
                }
                return canvas;
            },
            rigistEvent () {
                //监听鼠标事件
                this.renderer.domElement.addEventListener('mousedown', this.startCube, false);
                this.renderer.domElement.addEventListener('mousemove', this.moveCube, false );
                this.renderer.domElement.addEventListener('mouseup', this.stopCube, false);
                //监听触摸事件
                this.renderer.domElement.addEventListener('touchstart', this.startCube, false);
                this.renderer.domElement.addEventListener('touchmove', this.moveCube, false);
                this.renderer.domElement.addEventListener('touchend', this.stopCube, false);
            },
            createRayCaster () {
                this.raycaster = new THREE.Raycaster();
                this.mouse = new THREE.Vector2();
            },
            startCube (event) {
                this.controls.enabled = false;
                this.getIntersects(event);
                if (!this.isRotating && this.intersect) {
                    this.controls.enabled = false;
                    this.startPoint = this.intersect.point;
                } else {
                    this.controls.enabled = true;
                }
            },
            moveCube (event) {
                if (this.startPoint) {
                    this.getIntersects(event, true);
                    if (!this.isRotating && this.intersect) {
                        this.movePoint = this.intersect.point;
                        if(!this.movePoint.equals(this.startPoint)){//和起始点不一样则意味着可以得到转动向量了
                            this.isRotating = true;//转动标识置为true
                            // let sub = this.movePoint.sub(this.startPoint);//计算转动向量
                            let cross = new THREE.Vector3();
                            cross.crossVectors(this.startPoint, this.movePoint);
                            let direction = this.getDirection(cross);//获得方向
                            let elements = this.getBoxes(this.intersect,direction);
                            window.requestAnimFrame((timestamp) => {
                                this.rotateAnimation(elements,direction,timestamp,0);
                            });
                        }
                    }
                }
                event.preventDefault();
            },
            stopCube (event) {
                this.controls.enabled = true;
                this.intersect = null;
                this.startPoint = null;
            },
            getIntersects (event, isMove) {
                //触摸事件和鼠标事件获得坐标的方式有点区别
                if(event.touches){
                    let touch = event.touches[0];
                    this.mouse.x = (touch.clientX / window.innerWidth)*2 - 1;
                    this.mouse.y = -(touch.clientY / window.innerHeight)*2 + 1;
                }else{
                    this.mouse.x = (event.clientX / window.innerWidth)*2 - 1;
                    this.mouse.y = -(event.clientY / window.innerHeight)*2 + 1;
                }
                this.raycaster.setFromCamera(this.mouse, this.camera);
                //Raycaster方式定位选取元素，可能会选取多个，以第一个为准
                let intersects = this.raycaster.intersectObjects(this.scene.children);
                if(intersects.length){
                    try{
                        if(intersects[0].object.cubeType==='coverCube'){
                            this.intersect = intersects[1];
                            if (!isMove) {
                                this.normalize = intersects[0].face.normal;
                            }
                        }else{
                            this.intersect = intersects[0];
                            if (!isMove) {
                                this.normalize = intersects[1].face.normal;
                            }
                        }
                    }catch(err){
                        //nothing
                        console.log(err);
                    }
                }
            },
            getDirection (vector3) {
                let direction;
                let angleObj = {};

                let normalize = this.normalize.clone();
                // 排除绕法向量方向旋转的可能
                for (let key in this.directions) {
                    if ((normalize.angleTo(this.directions[key]) !== 0) && (normalize.negate().angleTo(this.directions[key]) !== 0)) {
                        angleObj[key] = vector3.angleTo(this.directions[key]);
                    }
                }
                let minAngle = this.min(angleObj);//最小夹角
                switch (minAngle) {
                    case 'x': {
                        direction = 'xcw';
                        break;
                    }
                    case 'xNg': {
                        direction = 'xccw';
                        break;
                    }
                    case 'y': {
                        direction = 'ycw';
                        break;
                    }
                    case 'yNg': {
                        direction = 'yccw';
                        break;
                    }
                    case 'z': {
                        direction = 'zcw';
                        break;
                    }
                    case 'zNg': {
                        direction = 'zccw';
                        break;
                    }
                }
                return direction;
            },
            //获取对象中的最小值
            min (obj){
                let min;
                let minKey;
                for(let key in obj){
                    if ((min === undefined) || (obj[key] < min)) {
                        min = obj[key];
                        minKey = key;
                    }
                }
                return minKey;
            },
            getBoxes (target,direction) {
                let targetAxe = direction.slice(0, 1);
                let boxes = [];
                this.cubes.forEach((item) => {
                    if (Math.abs(item.position[targetAxe] - target.object.position[targetAxe]) < 0.00001) {
                        boxes.push(item);
                    }
                });
                return boxes;
            },
            rotateAnimation (elements, direction, currentstamp, startstamp, laststamp) {
                let totalTime = 300;//转动的总运动时间
                if(startstamp===0){
                    startstamp = currentstamp;
                    laststamp = currentstamp;
                }
                if(currentstamp-startstamp>=totalTime){
                    currentstamp = startstamp+totalTime;
                    this.isRotating = false;
                    this.startPoint = null;
                }
                switch (direction) {
                    case 'xcw': {
                        for(let i=0; i < elements.length; i++){
                            this.rotateAroundWorldX(elements[i],90*Math.PI/180*(currentstamp-laststamp)/totalTime);
                        }
                        break;
                    }
                    case 'xccw': {
                        for(let i=0; i < elements.length; i++){
                            this.rotateAroundWorldX(elements[i],-90*Math.PI/180*(currentstamp-laststamp)/totalTime);
                        }
                        break;
                    }
                    case 'ycw': {
                        for(let i=0; i < elements.length; i++){
                            this.rotateAroundWorldY(elements[i],90*Math.PI/180*(currentstamp-laststamp)/totalTime);
                        }
                        break;
                    }
                    case 'yccw': {
                        for(let i=0; i < elements.length; i++){
                            this.rotateAroundWorldY(elements[i],-90*Math.PI/180*(currentstamp-laststamp)/totalTime);
                        }
                        break;
                    }
                    case 'zcw': {
                        for(let i=0; i < elements.length; i++){
                            this.rotateAroundWorldZ(elements[i],90*Math.PI/180*(currentstamp-laststamp)/totalTime);
                        }
                        break;
                    }
                    case 'zccw': {
                        for(let i=0; i < elements.length; i++){
                            this.rotateAroundWorldZ(elements[i],-90*Math.PI/180*(currentstamp-laststamp)/totalTime);
                        }
                        break;
                    }
                }
                this.render();
                if(currentstamp-startstamp < totalTime){
                    window.requestAnimFrame((timestamp) => {
                        this.rotateAnimation(elements,direction,timestamp,startstamp,currentstamp);
                    });
                }
            },
            rotateAroundWorldX (obj,rad) {
                let y0 = obj.position.y;
                let z0 = obj.position.z;
                let q = new THREE.Quaternion();
                q.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), rad );
                obj.quaternion.premultiply( q );

                obj.position.y = Math.cos(rad)*y0-Math.sin(rad)*z0;
                obj.position.z = Math.cos(rad)*z0+Math.sin(rad)*y0;
            },
            rotateAroundWorldY (obj,rad){
                let x0 = obj.position.x;
                let z0 = obj.position.z;
                let q = new THREE.Quaternion();
                q.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), rad );
                obj.quaternion.premultiply( q );
                obj.position.x = Math.cos(rad)*x0+Math.sin(rad)*z0;
                obj.position.z = Math.cos(rad)*z0-Math.sin(rad)*x0;
            },
            rotateAroundWorldZ (obj,rad){
                let x0 = obj.position.x;
                let y0 = obj.position.y;
                let q = new THREE.Quaternion();
                q.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), rad );
                obj.quaternion.premultiply( q );
                obj.position.x = Math.cos(rad)*x0-Math.sin(rad)*y0;
                obj.position.y = Math.cos(rad)*y0+Math.sin(rad)*x0;
            },
        },
    }
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
  }
</style>
