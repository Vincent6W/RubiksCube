<template>
  <div class="container" ref="container"></div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
//import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
//import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
export default {
    name: 'Three',
    data() {
        return {
            renderer: null,
            camera: null,
            scene: null,
            axes: null,
        };
    },
    mounted () {
        this.createRenderer();

        this.createCamera();

        this.createScene();

        this.createAxes();

        let geometry = new THREE.BoxGeometry(20, 20, 20);
//        let material = new THREE.MeshBasicMaterial( { color: 0xff00ff, opacity: 0.5, transparent: true, } );
        let material = new THREE.MeshLambertMaterial( { color: 0xff00ff } );
        let cube = new THREE.Mesh(geometry, material);
        cube.position.set( 10, 10, 10 );
        cube.castShadow = true;
        this.scene.add(cube);

        let edges = new THREE.EdgesGeometry( geometry );
        let line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x00ffff } ) );
        line.position.set( 10, 10, 10 );

//        this.scene.add(line);

        let planeGeometry = new THREE.PlaneGeometry(300, 200);
        let planeMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff
        });
        let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.rotateX(-Math.PI / 2); //旋转网格模型
        // 设置接收阴影的投影面
        planeMesh.receiveShadow = true;
        this.scene.add(planeMesh); //网格模型添加到场景中

        let directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.set(150, 100, 200);
        directionalLight.castShadow = true;

        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 300;
        directionalLight.shadow.camera.left = -50;
        directionalLight.shadow.camera.right = 50;
        directionalLight.shadow.camera.top = 200;
        directionalLight.shadow.camera.bottom = -100;
        directionalLight.shadow.mapSize.set(2048,2048);
        this.scene.add( directionalLight );

        this.render();
        let controls = new OrbitControls(this.camera,this.renderer.domElement);//创建控件对象
        controls.addEventListener('change', this.render);//监听鼠标、键盘事件
    },
    methods: {
        createRenderer () {
            this.renderer = new THREE.WebGLRenderer({
                antialias:true,
            });
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            // 允许阴影
            this.renderer.shadowMap.enabled = true;
            this.$refs.container.appendChild( this.renderer.domElement );
        },
        createCamera () {
            this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
            this.camera.position.set( 100, 100, 100 );
            this.camera.lookAt( 0, 0, 0 );
        },
        createScene () {
            this.scene = new THREE.Scene();
        },
        createAxes () {
            this.axes = new THREE.AxesHelper(10000);
            this.scene.add(this.axes);
        },
        render () {
            this.renderer.render(this.scene,this.camera);//执行渲染操作
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
