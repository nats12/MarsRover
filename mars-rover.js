
/**
 * The MarsRover class.
 */
class MarsRover {

	/**
	 * The MarsRover class constructor.
	 * @param  {[array]} A rover's location on the x and y axis.
	 * @param  {[string]} A rover's direction.
	 * @param  {[array]} The size of the plateau (grid).
	 * @return {[void]}
	 */
	constructor(position, plateauSize, obstacles) {

        this.plateauSize = plateauSize === undefined ? [10, 10] : plateauSize;
        this.obstacles = this.obstacles === undefined ? [] : obstacles;
        

        this.position = position === undefined ? [0,0, "N"] : position;
    }


    /**
     * Check for any other rovers in the same spot another rover is about to go on.
     * @return {[boolean]} Returns true or false.
     */
    checkObstacles(x, y) {

    	return this.obstacles.some((obstacle, index) => obstacle[0] === x && obstacle[1] === y);
    }

    /**
     * Reset location if it is outside of the plateau's size
     * @return {[type]} [description]
     */
    // resetPosition() {

    // 	this.position = [
    //         (this.position[0] + this.plateauSize.x) % this.plateauSize.x,
    //         (this.position[1] + this.plateauSize.y) % this.plateauSize.y,
    //         this.position[2]
    //     ];
    // }


    /**
     * The move function moves the rover.
     * @param  {[string]} 'm' for move.
     * @return {[array]}  The rover's location.
     */
    move(command) {

    	// X and y axis on the grid.
		let x = 0; 
		let y = 0;

		// When moving forwards, increase/decrease the x and y axis depending on the direction it is facing.
		switch(this.position[2]) {
			case 'N':
				y++;
			break;
			case 'S':
				y--;
			break;
			case 'E':
				x++;
			break;
			case 'W':
				x--;
			break;
		}	

		// When moving backwards, minus one from x and y's current values multiplied by themselves.
		if (command === 'b') { 
	        x *= -1;
	        y *= -1;
	    }


	    // Update the x and y axis location points.
		this.position[0] += x;
		this.position[1] += y;

		// Check for obstacles
	    if (this.checkObstacles(this.position[0], this.position[1])) {
	    	// Append a new line with the new rover position
            let position = document.createElement('span');
            position.innerHTML = "This spot is taken!";
            dataPanel.appendChild(position);
	    }

	    // Update the rover's position with its location and direction
	    this.position = this.position;
	    return [this.position[0], this.position[1]];
	}


	/**
	 * The turn function turns the rover so it is facing towards a new direction.
	 * @param  {[string]} Either 'l' for left or 'r' for right.
	 * @return {[string]} The new direction.
	 */
	turn(command) {

		let newDirection; 

	    // When turning the rover, update the direction depending on the direction it is currently facing.
	    if(command === 'l') {

	        switch(this.position[2]) {
	            case 'N':
	                newDirection = 'W';
	            break;
	            case 'W':
	                newDirection = 'S';
	            break;
	            case 'S':
	                newDirection = 'E';
	            break;
	            case 'E':
	                newDirection = 'N';
	            break;
	        }
	    } else if(command === 'r') {

	        switch(this.position[2]) {
	            case 'N':
	                newDirection = 'E';
	            break;
	            case 'E':
	                newDirection = 'S';
	            break;
	            case 'S':
	                newDirection = 'W';
	            break;
	            case 'W':
	                newDirection = 'N';
	            break;
	        }
	    }

	    // Update the rover's position with its location and direction
	    this.position = [this.position[0], this.position[1], newDirection];
	    // Update the direction
		return this.position[2] = newDirection;  
	}


	/**
	 * The navigate function decides whether the turn or the move function should be called.
	 * @param  {[string]} A line of commands i.e. 'lrmrmlr'.
	 * @return {[string]} The rover's updated position.
	 */
	navigate(commands) {

	    if (commands === undefined) {
	        return this.commands;
	    } else {
	        // For every character in the line of command
	        for(let i = 0; i < commands.length; i++) {
	            let command = commands[i];
	            // Call the move function if the command is m
	            if(command === 'm') {
	                this.move(command);
	            // Call the turn function if the command is l/r
	            } else if (command === 'l' || command === 'r') {
	                this.turn(command);
	            }
	        }

	        // this.resetPosition();
	        this.commands = commands;
	    }
	    
	    

	    // Update rover position
	    this.position = [this.position[0], this.position[1], this.position[2]];

	    // Update the rover's position
	    return this.position;
	}
}



/**
 * The plateau class.
 * Used to hold an array of rovers.
 */
class Plateau {

	/**
	 * The Plateau class constructor.
	 * @param  {[array]} An array of rover objects.
	 * @param  {[string]} An array of rover location objects.
	 * @param  {[array]} The size of the plateau.
	 * @return {[void]}
	 */
	constructor(x = 0 , y = 0) {

		this.x = x;
		this.y = y;
		// this.rovers = rovers == undefined ? [] : rovers;
		// this.obstacles = obstacles == undefined ? [] : obstacles;
		// this.size = size == undefined ? [10, 10] : size;
    }
}

/**
 * The PlanetObjectFactory class
 * Acting as a Factory class making objects depending on its function parameter
 */
class PlanetObjectFactory {

	/**
	 * The getPlanetObject function accepts a string then makes an object depending on the string
	 * @param  {[type]} objectType [description]
	 * @return {[type]}            [description]
	 */
	getPlanetObject(objectType) {

		if(objectType === "marsrover") {
			return new MarsRover();
		} else if(objectType === "plateau") {
			return new Plateau();
		}
	}
}


module.exports = MarsRover;