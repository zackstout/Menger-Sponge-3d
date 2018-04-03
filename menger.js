


function makeCube(pos, size) {
    var cubes = [];

    for (var z=0; z<3; z++) {
        for (var y=0; y<3; y++) {
            for (var x=0; x<3; x++) {
                var cube = {x: size*x + pos.x, y: size*y + pos.y, z: size*z + pos.z};
                cubes.push(cube);
            }
        }
    }
    
    // console.log(cubes);
    cubes.splice(22, 1);
    cubes.splice(16, 1);
    cubes.splice(14, 1);
    cubes.splice(13, 1);
    cubes.splice(12, 1);
    cubes.splice(10, 1);
    cubes.splice(4, 1);
    // console.log(cubes);
    return cubes;
}


var cubelist1 = makeCube({x: 0, y: 1, z: 0}, 10);
var cubelist2 = [];
console.log(cubelist1);

var newlist = cubelist1.map(cube => makeCube({x: cube.x, y: cube.y, z: cube.z}, 10/3));

console.log(newlist);

