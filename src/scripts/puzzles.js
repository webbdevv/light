export default [
  {
    id: 0,
    header: '"Freedom is the freedom to say that two plus two make four"',
    hint: '1984 by George Orwell',
    answer: ` 5`
  },
  {
    id: 1,
    header: 'Life, The Universe, and Everything',
    hint: `The Hitchhiker's Guide to the Galaxy`,
    answer: `return 42`
  },
  {
    id: 2,
    header: `Death`,
    hint: `__ ____ No Life`,
    answer: 'return this.life === 0'
  },
  {
    id: 3,
    header: `Enti-cide?`,
    hint: `Make sure to call destroyAll recursively`,
    answer: `if(entities.length > 0){
        entities.pop().destroy();
        destroyAll(entities);
    }`
  },
  {
    id: 4,
    header: 'Soles for Souls',
    hint: `Add the move to the current position of an entity`,
    answer: `this.position[0] += move[0];
    this.position[1] += move[1];`
  },
  {
    id: 5,
    header: "The Speed of Light",
    hint: `Quite the long one, make sure to move carefully. Use the difference between the start and end position to move the entity.
    In case of emergency, hit the Answer button`,
    answer: 
  `if(this.position[0] === position[0] && this.position[1] === position[1]) return;

    let movementVector = [this.position[0] - position[0], this.position[1] - position[1]];
    if(movementVector[0] !== 0){
      if(movementVector[0] < 0){
        this.move('down');
        movementVector[0]++;
      } else {
        this.move('up');
        movementVector[0]--;
      }
    }
    if(movementVector[1] !== 0){
      if(movementVector[1] < 0){
        this.move('right');
        movementVector[1]++;
      } else {
        this.move('left');
        movementVector[1]--;
      }
    }
    moveTo(position);`
  },
  {
    id: 6,
    header: "Light's First Steps!!!",
    hint: `Move using the function you wrote`,
    answer: `baby.moveTo([5,5]);`
  },
  {
    id: 7,
    header: "Maria, Rose, and Sheena",
    hint: `Use the grid to move walls around.`,
    answer: `grid[19][13] = grid[0][0];
    grid[19][15] = grid[0][0];
    grid[19][17] = grid[0][0];
    light.moveTo([19, 12]);
    light.moveTo([19, 19]);`
  }
]