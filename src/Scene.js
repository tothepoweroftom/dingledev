import * as THREE from 'three'
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  BlurPass,
  RenderPass,
  BlendFunction,
  NoiseEffect
} from "postprocessing";

import OrbitControls from 'orbit-controls-es6'
// Tweenlite for nice tweening of variables
import {
  TweenLite
} from 'gsap'

import {
  Clock
} from 'three'
import ModelLoader from './ModelLoader';
import webgldetect from 'webgl-detect';

export default class DingleScene {

  constructor(canvas) {
    if (!webgldetect) {
      document.body.appendChild(WEBGL.getWebGLErrorMessage());
    } else {
        console.log("WEBGL")
    }
    //Setup canvas and container.
    let container = document.getElementById('container');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    this.width = canvas.width;
    this.height = canvas.height;
    this.size = {
      width: this.width,
      height: this.height
    }


   

    this.time = 0;
    //Setup THREEjs stuff
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x000000 );
    this.scene.fog = new THREE.FogExp2( 0x000000, 0.1 );

    var geometry = new THREE.SphereGeometry(50, 32, 32);
    var material = new THREE.MeshBasicMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide
    });
    var sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0, 0);
    this.scene.add(sphere);


    this.lights = this.buildLights(this.scene);
    this.camera = this.buildCamera(this.width, this.height);
    this.renderer = this.buildRender(this.width, this.height);
    // const controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.enabled = true;
    // controls.maxDistance = 1500;
    // controls.minDistance = 0;
    this.composer = new EffectComposer(this.renderer);
    this.noiseEffect = new NoiseEffect({
      blendFunction: BlendFunction.COLOR_DODGE

    });
    this.noiseEffect.blendMode.opacity.value = 0.3;
    this.effectPass = new EffectPass(this.camera, this.noiseEffect)
    this.effectPass.renderToScreen = true;
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.composer.addPass(this.effectPass);



  }


  // BUILD LIGHTS
  buildLights(scene) {
    var light = new THREE.SpotLight("#aa0000", 1.0);
    light.position.y = 0;
    light.position.x = 0;
    light.position.z = 0;
    scene.add(light);

    var light2 = new THREE.SpotLight("#00aa00", 1.0);
    light2.position.y = 0;
    light2.position.x = 0;
    light2.position.z = 0;
    scene.add(light2);

    var light3 = new THREE.SpotLight("#0000aa", 1.0);
    light3.position.y = 0;
    light3.position.x = 0;
    light3.position.z = 0;
    scene.add(light3);


    // scene.add(hemi);

    return [light, light2, light3];
  }

  // BUILD CAMERA

  buildCamera(width, height) {
    var aspectRatio = width / height;
    var fieldOfView = 75;
    var nearPlane = 1;
    var farPlane = 1200;
    var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

    // var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );


    camera.position.set(-25, 2, -25);
    camera.lookAt(new THREE.Vector3(-3, 0,-2));
    return camera;
  }

  //BUILD RENDER
  buildRender(width, height) {
    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    var DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0.0);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    return renderer;
  }



  loadModel() {
    this.model = ModelLoader.models[0];
    console.log(this.model);
    this.model.obj.children[0].scale.set(1, 1.5, 1);
    this.model.obj.children[0].material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 1.0,
      side: THREE.DoubleSide,
      roughness: 0.0,
      //   flatShading: false,
      //   wireframe: true,

    })
    this.model.obj.position.set(0, 0, 0);
    this.scene.add(this.model.obj);
  }


  update(delta, mouseX, mouseY) {
    this.composer.render(this.scene, this.camera);
    this.time += 0.01;

    this.model.obj.rotation.y += (mouseX - this.camera.position.x) * 0.0000005;
    // this.camera.position.y += (-mouseY - this.camera.position.y) * 0.05;
    for (let i = 0; i < this.lights.length; i++) {
      this.lights[i].position.x = Math.sin(this.time * (i + 1) * 1.57) * 50;
      this.lights[i].position.z = Math.cos(this.time * (i + 1) * 1.57) * 50;

    }

  }


}
