
var THREE = require('three');
var OrbitControls = require('three-orbit-controls')(THREE);

// -Global variables-
var pos = new THREE.Vector3();
var color2 = new THREE.Color("rgb(0, 0, 255)");
var material2 = new THREE.MeshLambertMaterial( { color: color2 } );
var size = 20;
var newCubes = [];
var newerCubes = [];
var count = 0;

// -Setup three.js-
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xB0E0E6 );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Generate initial box:
var geometry = new THREE.BoxGeometry( size, size, size );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material2 );
cube.receiveShadow = true;
cube.castShadow = true;
// scene.add( cube );
cube.height = size;
newCubes.push(cube);

console.log( cube );


function parseCube() {
  count ++;

  newCubes.forEach(function(cube) {
    var h = cube.height;
    var currentPos = cube.position;
    // console.log(pos.x);
    for (i = -1; i < 2; i ++) {
      for (j = -1; j < 2; j ++) {
        for (k = -1; k < 2; k ++) {
          // yes, has to be h/2 here instead of h:
          pos.set(currentPos.x + i * h/2, currentPos.y + j * h/2, currentPos.z + k * h/2);
          var geom = new THREE.BoxGeometry(h / 2.1, h / 2.1, h / 2.1);

          var mat = new THREE.MeshBasicMaterial( { color: color2, transparent: true } );


          // Logic: if two or more of x, y, z are 0, do NOT draw thw box:
          // if (!(i == 0 && j==0) && !(k == 0 && j==0) && !(i == 0 && k==0)) {
          if ((i ==0 && j==0) || (i ==0 && k==0) || (k ==0 && j==0)) {
            var newCube = new THREE.Mesh(geom, mat);
            newCube.position.copy(pos);
            newCube.receiveShadow = true;
            newCube.height = size / (Math.pow(3, count));
            scene.add( newCube );
            newerCubes.push(newCube);
          }

        }
      }
    }



  });

  //Oh, of course, what we really need to do is cut out pieces, not keep redrawing cubes.
  newCubes = newerCubes;

}

parseCube();

camera.position.x = 5 + size;

var controls = new OrbitControls( camera );
controls.target.set( 0, 2, 0 );
controls.update();

var light = new THREE.PointLight(0xffffff);
// Ok guess we just had to bring the light closer:
light.position.set(size * 1.5, size * 1.5, size * 1.5);
scene.add(light);

function animate() {
	// requestAnimationFrame( animate );
	// renderer.render( scene, camera );
  //


  setTimeout( function() {
    requestAnimationFrame( animate );

  }, 1000 );  renderer.render(scene, camera);
}

animate();
