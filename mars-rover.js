
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
	constructor(location, direction, plateau, ID) {

        this.location = location === undefined ? [0, 0] : location;
        this.direction = direction === undefined ? 'N' : direction;
        this.plateau = plateau === undefined ? [10, 10] : plateau;
        this.ID = ID === undefined ? 0 : ID;

        this.commands = this.commands === undefined ? [] : this.commands; 
        this.position = [...this.location, this.direction];

        // Rovers 
        this.obstacles = [

        	{x: 2, y: 5},
        	{x: 7, y: 5},
        	{x: 9, y: 5},
        ]
    }


    /**
     * Check for any other rovers in the same spot another rover is about to go on.
     * @return {[boolean]} Returns true or false.
     */
    checkObstacles(x, y) {

    	return this.obstacles.some((obstacle) => obstacle.x === x && obstacle.y === y);
    }



    /**
     * The move function moves the rover either forwards or backwards.
     * @param  {[string]} Either 'f' for forward or 'b' for backwards.
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
	 * @param  {[string]} A line of commands i.e. 'lrfrblr'.
	 * @return {[string]} The rover's updated position.
	 */
	navigate(commands) {

	    // this.commands = commands;

	 //    var position = document.createElement('h4');
		// position.innerHTML = `Rover 1 is currently at position: ${rover.position}`;
		// dataPanel.appendChild(position);

	    if (commands === undefined) {
	        return this.commands;
	    } else {
	        // For every character in the line of command
	        for(let i = 0; i < commands.length; i++) {
	            let command = commands[i];
	            // Call the move function if the command is f/b
	            if(command === 'm') {
	                this.move(command);
	            // Call the turn function if the command is l/r
	            } else if (command === 'l' || command === 'r') {
	                this.turn(command);
	            }

	            // Append a new line with the new rover position
            	var position = document.createElement('h4');
				position.innerHTML = `Rover ${rover.ID} is currently at position: ${rover.position}`;
				dataPanel.appendChild(position); 
	        }
	    }
	    
	    

	    // Update rover position
	    this.position = [...this.location, this.direction];

	    // Update the rover's position
	    return this.position;
	}


	readFile(lines) {


		// Split plateau values
        let plateau = lines[0].split(' ');
        this.plateau = [parseInt(plateau[0]), parseInt(plateau[1])];

        let position = lines[1].split(' ');
        rover.position = [parseInt(position[0]), parseInt(position[1]), position[2]];
        

 		// Remove the plateau value
        lines.shift();


        // An array with rover positions only
		let roversArray = lines.filter((element, index) => {
		  	return index % 2 === 0;
		});

		// An array with commands only
		let commandsArray = lines.filter((element, index) => {
			// Remove the risk of empty strings being returned when it reaches the end of the file
		  	return index % 2 !== 0 && index != null;
		});

		this.commands = commandsArray.toString().toLowerCase();
		let location = roversArray.toString().split(' ');

		this.location = [parseInt(location[0]), parseInt(location[1])];
		
		rover.navigate(rover.commands);

		// Create an object 
	  	let combine = roversArray.reduce(function(result, field, index) {
	    	result[commandsArray[index]] = field;
	    	field = rover.commands;
	    	field = rover.position;
	    	return result;
	  	}, {});	  	
	}
}



/**
 * The Grid class.
 */
class Grid {

	/**
	 * The Grid class constructor.
	 * @param  {[array]} A rover's location on the x and y axis.
	 * @param  {[string]} A rover's direction.
	 * @param  {[array]} The size of the plateau (grid).
	 * @return {[void]}
	 */
	constructor(rovers) {

		this.rovers = rovers;
       
    }

}





module.exports = MarsRover;