
// From Menger.js:
function spliceCube(pos, size) {
    let cubes = [];

    for (let z=0; z<3; z++) {
        for (let y=0; y<3; y++) {
            for (let x=0; x<3; x++) {
                const cube = {x: size*x + pos.x, y: size*y + pos.y, z: size*z + pos.z};
                cubes.push(cube);
            }
        }
    }
    // Delete the relevant cubes:
    cubes.splice(22, 1);
    cubes.splice(16, 1);
    cubes.splice(14, 1);
    cubes.splice(13, 1);
    cubes.splice(12, 1);
    cubes.splice(10, 1);
    cubes.splice(4, 1);
    return cubes;
}

var allLists = [];
var cubelist1 = spliceCube({x: 0, y: 1, z: 0}, 10);
var cubelist2 = [];
// 20-array of cubes (20):
// console.log("Level 0: ", cubelist1);

var newlist = cubelist1.map(cube => spliceCube({x: cube.x, y: cube.y, z: cube.z}, 10/3));

// 20-array of cube-arrays (400):
console.log("Level 1: ", newlist);

newlist.forEach(arr => {
    var newerlist = arr.map(cube => spliceCube({x: cube.x, y: cube.y, z: cube.z}, 10/9));
    allLists.push(newerlist);
});

// 20-array of 20-arrays of cube-arrays (8,000):
// console.log("Level 2: ", allLists);

var moreAllLists = [];
allLists.forEach(arr => {
    arr.forEach(array => {
        const list = array.map(cube => spliceCube({x: cube.x, y: cube.y, z: cube.z}, 10/27));
        moreAllLists.push(list);
    });
});

// 400-array of 20-arrays of cube-arrays (160,000):
// console.log("Level 3: ", moreAllLists);

var evenMoreAllLists = [];
moreAllLists.forEach(arr => {
    arr.forEach(array => {
        const list = array.map(cube => spliceCube({x: cube.x, y: cube.y, z: cube.z}, 10/81));
        evenMoreAllLists.push(list);
    });
});

// 8,000-array of 20-arrays of cube-arrays (3,200,000):
// console.log("Level 4: ", evenMoreAllLists);

// var wowEvenMoreAllLists = [];
// evenMoreAllLists.forEach(arr => {
//     arr.forEach(array => {
//         const list = array.map(cube => spliceCube({x: cube.x, y: cube.y, z: cube.z}, 10/243));
//         wowEvenMoreAllLists.push(list);
//     });
// });

// console.log("Level 5: ", wowEvenMoreAllLists);

// Ok Level 5 stalls out the browser.
// Wait -- it would be way more efficient to just delete the 7 elements each time, than to draw 20 elements for each cube. I think this was my idea the first time, I just failed to execute it.


// Our original file:
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

// console.log(evenMoreAllLists);

var flattenedCubes = [];
// flatten array:
allLists.forEach(list => {
  list.forEach(list2 => {
    list2.forEach(el => {
        flattenedCubes.push(el);
      });
  });
});

// Ok this appears to be what we want:
console.log(flattenedCubes);


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
// newCubes.push(cube);

console.log( cube );


flattenedCubes.forEach(cube => {
  // console.log(cube);
  geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
  var make = new THREE.Mesh(geometry, material);

  pos.set(cube.x, cube.y, cube.z);
  make.position.copy(pos);
  make.receiveShadow = true;
  scene.add(make);

});










// var newCube = new THREE.Mesh(geom, material2);
// cube.position.copy(pos);
// newCube.receiveShadow = true;
// newCube.height = size / (Math.pow(3, count));
// scene.add( newCube );



















function parseCube() {
  count ++;

  // while (scene.children.length > 0) {
  //   scene.remove(scene.children[0]);
  // }

  scene.remove.apply(scene, scene.children);


  newCubes.forEach(function(cube) {
    var h = cube.height;
    var currentPos = cube.position;
    // console.log(pos.x);
    for (i = -1; i < 2; i ++) {
      for (j = -1; j < 2; j ++) {
        for (k = -1; k < 2; k ++) {
          // yes, has to be h/2 here instead of h:
          pos.set(currentPos.x + i * h/2, currentPos.y + j * h/2, currentPos.z + k * h/2);
          var geom = new THREE.BoxGeometry(h / 2.04, h / 2.04, h / 2.04);

          // var mat = new THREE.MeshBasicMaterial( { color: color2, transparent: true } );


          // Logic: if two or more of x, y, z are 0, do NOT draw the box:
          if (!(i == 0 && j==0) && !(k == 0 && j==0) && !(i == 0 && k==0)) {
          // if ((i ==0 && j==0) || (i ==0 && k==0) || (k ==0 && j==0)) {
            var newCube = new THREE.Mesh(geom, material2);
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
  // Or, we can redraw cubes as long as we clear each time.
  newCubes = newerCubes;
  newerCubes = [];

}

// Stop calling this ungainly and bloated function:
// parseCube();
// parseCube();
//
// console.log(newCubes);
// parseCube();
// parseCube();

camera.position.x = 5 + size;

var controls = new OrbitControls( camera );
controls.target.set( 0, 2, 0 );
controls.update();

var light = new THREE.PointLight(0xffffff);
// Ok guess we just had to bring the light closer:
light.position.set(size * 1.5, size * 1.5, size * 1.5);
scene.add(light);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );


  //
  // setTimeout( function() {
  //   requestAnimationFrame( animate );
  //
  // }, 1000 );  renderer.render(scene, camera);
}

animate();
