
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
console.log("Level 0: ", cubelist1);

var newlist = cubelist1.map(cube => spliceCube({x: cube.x, y: cube.y, z: cube.z}, 10/3));

// 20-array of cube-arrays (400):
console.log("Level 1: ", newlist);

newlist.forEach(arr => {
    var newerlist = arr.map(cube => spliceCube({x: cube.x, y: cube.y, z: cube.z}, 10/9));
    allLists.push(newerlist);
})

// 20-array of 20-arrays of cube-arrays (8,000):
console.log("Level 2: ", allLists);

var moreAllLists = [];
allLists.forEach(arr => {
    arr.forEach(array => {
        const list = array.map(cube => spliceCube({x: cube.x, y: cube.y, z: cube.z}, 10/27));
        moreAllLists.push(list);
    });
});

// 400-array of 20-arrays of cube-arrays (160,000):
console.log("Level 3: ", moreAllLists);

var evenMoreAllLists = [];
moreAllLists.forEach(arr => {
    arr.forEach(array => {
        const list = array.map(cube => spliceCube({x: cube.x, y: cube.y, z: cube.z}, 10/81));
        evenMoreAllLists.push(list);
    });
});

// 8,000-array of 20-arrays of cube-arrays (3,200,000):
console.log("Level 4: ", evenMoreAllLists);

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










// chillin