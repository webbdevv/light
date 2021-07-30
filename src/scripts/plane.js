import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export default class Plane {
  constructor(size = 10){
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, .1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // this.controls.enableZoom = false;
    this.setup = this.setup.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.cleanup = this.cleanup.bind(this);
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

    document.getElementById('play').addEventListener('click', this.cleanup)
  }

  cleanup(){
    while(this.scene.children.length > 0){
        this.scene.remove(this.scene.children[0]);
    }
    //hide message and create board
    document.querySelector('.game-message').classList.toggle('inactive');
  }
  animateScene(){
    const boardElement = document.getElementById('board')
    boardElement.append(this.renderer.domElement);
  }

  createBoard(){
    const planeSize = 20

    const fov = 45;
    const aspect = 1;  // the board size
    const near = 0.1;
    const far = 100;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(0, 15, 30);
    this.camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    const loader = new THREE.TextureLoader();
    const texture = loader.load('../../assets/images/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    this.scene.add(mesh);

    //ambient light
    const aColor = 0xFFFFFF;
    const aIntensity = .4;
    const ambientLight = new THREE.AmbientLight(aColor, aIntensity);
    this.scene.add(ambientLight);

    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = Math.PI * -.5;
    this.scene.add(plane)

    //directional light
    const color = 0xFFFFFF;
    const intensity = .7;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-10, 20, 40)
    this.scene.add(light);

    //creating player cube
    const cubeSize = 2;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({ color: 0xFFFFFF, });
    const cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.position.set(0, 1, 0);
    this.scene.add(cube);
    // const animate = () => {
    //   requestAnimationFrame( animate );

    //   plane.rotation.x += 0.01;
    //   plane.rotation.y += 0.01;
    //   this.renderer.render(this.scene, this.camera);
    // }

    // animate();
  }
}