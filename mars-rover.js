
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
	constructor(location, direction, plateau, obstacles, commands, ID) {

        this.location = location === undefined ? [0, 0] : location;
        this.direction = direction === undefined ? 'N' : direction;
        this.plateau = plateau === undefined ? [10, 10] : plateau;
        this.obstacles = this.obstacles === undefined ? [] : obstacles;
        this.commands = commands === undefined ? 'lmmrmm' : commands;
        this.ID = ID === undefined ? 0 : ID;

        this.position = [...this.location, this.direction];
    }


    /**
     * Check for any other rovers in the same spot another rover is about to go on.
     * @return {[boolean]} Returns true or false.
     */
    checkObstacles(x, y) {

    	return this.obstacles.some((obstacle) => obstacle.x === x && obstacle.y === y);
    }



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
		switch(this.direction) {
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
		this.location[0] += x;
		this.location[1] += y;

		// Check for obstacles
	    if (this.checkObstacles(this.location[0], this.location[1])) {
	    	// Append a new line with the new rover position
            let position = document.createElement('span');
            position.innerHTML = "This spot is taken!";
            dataPanel.appendChild(position);
	    }

	    // Update the rover's position with its location and direction
	    this.position = [...this.location, this.direction];
	    return this.location;
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

	        switch(this.direction) {
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

	        switch(this.direction) {
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
	    this.position = [...this.location, newDirection];
	    // Update the direction
		return this.direction = newDirection;  
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
	    }
	    
	    

	    // Update rover position
	    this.position = [...this.location, this.direction];

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
	constructor(rovers, obstacles, size) {

		this.rovers = rovers == undefined ? [] : rovers;
		this.obstacles = obstacles == undefined ? [] : obstacles;
		this.size = size == undefined ? [10, 10] : size;
    }
}





module.exports = MarsRover;