import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Board from './board'

export default class Plane extends Board {
  constructor(size = 15){
    super(size);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, .1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.canvas = this.renderer.domElement;
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.target.set(0, 5, 0);
    this.controls.update();
    this.controls.enableZoom = false;
    this.setup = this.setup.bind(this);
    this.createBoard = this.createBoard.bind(this);
  }

  reset(){

  }

  setup(){
    let game = document.getElementById('game')
    this.renderer.setSize( 700, 700 );
    game.appendChild( this.renderer.domElement );
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    //This material is affected by lights
    const material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    const cube = new THREE.Mesh( geometry, material);
    this.scene.add( cube );
    this.camera.position.z = 5;
    
    function resizeRendererToDisplaySize(renderer){
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    const animate = () => {
      requestAnimationFrame( animate );

      //update aspect in case of object being outside fustrum
      if (resizeRendererToDisplaySize(this.renderer)) {
        const canvas = this.renderer.domElement;
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera.updateProjectionMatrix();
      }

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);
    }

    animate();

    //add light
    const color = 0xFFFFFF;
    const intensity = .55;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4)
    this.scene.add(light);

    //ambient
    const aColor = 0xFFFFFF;
    const aIntensity = .3;
    const ambientLight = new THREE.AmbientLight(aColor, aIntensity);
    this.scene.add(ambientLight);

    document.getElementById('play').addEventListener('click', () => {
      while(this.scene.children.length > 0){
        this.scene.remove(this.scene.children[0]);
      }
      //hide message and create board
      document.querySelector('.game-message').classList.toggle('inactive');
      this.createBoard()
    })
  }

  animateScene(){
    const boardElement = document.getElementById('board')
    boardElement.append(this.renderer.domElement);
  }

  createBoard(){
    const geometry = new THREE.BoxGeometry(10, .2, 10);
    const material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
    const plane = new THREE.Mesh(geometry, material);
    this.camera = new THREE.PerspectiveCamera(75, 1, .1, 1000);
    this.camera.position.set(0, 5, 15)

    this.scene.add( plane );
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);
    // const animate = () => {
    //   requestAnimationFrame( animate );

    //   plane.rotation.x += 0.01;
    //   plane.rotation.y += 0.01;
    //   this.renderer.render(this.scene, this.camera);
    // }

    // animate();
  }
}