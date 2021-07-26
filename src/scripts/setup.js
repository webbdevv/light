const THREE = require('three')

export default function setup(){
  //Code mirror element
  _codeMirror()
  _createScene()
}


function _codeMirror(){
  let code = document.getElementById('code-block')
  //setup tabulation for textarea
  code.addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
      e.preventDefault();
      var start = this.selectionStart;
      var end = this.selectionEnd;

      // set textarea value to: text before caret + tab + text after caret
      this.value = this.value.substring(0, start) +
        "\t" + this.value.substring(end);

      // put caret at right position again
      this.selectionStart =
        this.selectionEnd = start + 1;
    }
  });

  let codeMirror = CodeMirror.fromTextArea(document.getElementById('code-block'), {})
  codeMirror.setOption('theme', 'material-darker');
}

function _createScene(){
  let game = document.getElementById('game')
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, .1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( 700, 700 );
  game.appendChild( renderer.domElement );

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  //This material is affected by lights
  const material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
  const cube = new THREE.Mesh( geometry, material);
  scene.add( cube );
  camera.position.z = 5;
  
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
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate()

  //add light
  const color = 0xFFFFFF;
  const intensity = .7;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4)
  scene.add(light);

  //ambient
  const aColor = 0xFFFFFF;
  const aIntensity = .3;
  const ambientLight = new THREE.AmbientLight(aColor, aIntensity);
  scene.add(ambientLight);
}

