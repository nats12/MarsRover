var MarsRover = require('./mars-rover');

describe('Given the start position (x,y) and directions N,S,E,W, a rover should', function() {
    var rover = new MarsRover();

    it('use 0,0 as start locating unless told otherwise', function() {
        expect(rover.location).toEqual([0, 0]);
    });

    it('use N as the direction its facing unless told otherwise', function() {
        expect(rover.direction).toEqual('N');
    });
});

describe('A rover should receive a set of commands', function() {
    var rover = new MarsRover();
    rover.navigate('lmmrmm');
    it('in the form of characters', function() {
        expect(rover.commands).toEqual('lmmrmm');
    });

});

describe('When moving a rover backwards and forwards, it\'s position should', function() {

    // Forwards
    it('increase by one on the y axis when moving North', function() {
        var rover = new MarsRover([10,10], 'N');
        rover.navigate(['m']);
        expect(rover.location).toEqual([10,11]);
    });

    it('decrease by one on the y axis when moving South', function() {
        var rover = new MarsRover([10,10], 'S');
        rover.navigate(['m']);
        expect(rover.location).toEqual([10,9]);
    });

    it('increase by one on the x axis when moving East', function() {
        var rover = new MarsRover([10,10], 'E');
        rover.navigate(['m']);
        expect(rover.location).toEqual([11,10]);
    });

    it('decrease by one on the x axis when moving West', function() {
        var rover = new MarsRover([10,10], 'W');
        rover.navigate(['m']);
        expect(rover.location).toEqual([9,10]);
    });
});



describe('When turning a rover left or right, its direction should change from', function() {

    // Left
    it('North to West when command is left', function() {
        var rover = new MarsRover([10,10], 'N');
        rover.navigate(['l']);
        expect(rover.direction).toEqual('W');
    });

    it('West to South when command is left', function() {
        var rover = new MarsRover([10,10], 'W');
        rover.navigate(['l']);
        expect(rover.direction).toEqual('S');
    });

    it('South to East when command is left', function() {
        var rover = new MarsRover([10,10], 'S');
        rover.navigate(['l']);
        expect(rover.direction).toEqual('E');
    });

    it('East to North when command is left', function() {
        var rover = new MarsRover([10,10], 'E');
        rover.navigate(['l']);
        expect(rover.direction).toEqual('N');
    });


    // Right
    it('North to East when command is right', function() {
        var rover = new MarsRover([10,10], 'N');
        rover.navigate(['r']);
        expect(rover.direction).toEqual('E');
    });

    it('East to South when command is right', function() {
        var rover = new MarsRover([10,10], 'E');
        rover.navigate(['r']);
        expect(rover.direction).toEqual('S');
    });

    it('South to West when command is right', function() {
        var rover = new MarsRover([10,10], 'S');
        rover.navigate(['r']);
        expect(rover.direction).toEqual('W');
    });

    it('West to North when command is right', function() {
        var rover = new MarsRover([10,10], 'W');
        rover.navigate(['r']);
        expect(rover.direction).toEqual('N');
    });
});


