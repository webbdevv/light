# Outside the Box

## Description
  Outside the Box is a single player 'game' that features coding puzzles inside a 3-dimensional cube. The player will create functions to solve puzzles that will somehow move them closer towards their intended goal. 
  Users will not immediately learn how the game works and will have to play around inside the initial sandbox to learn the game.
  The game will be played inside a completely dark box which will serve as the main 'scene'. The purpose of the game will be to figure out a way outside this box the player lives inside. For the purposes of a recruiter, instructions can be optionally given at the start. Objectives will light up across the scene to guide users and the 'character' will be entirely white to provide contrast and allow players to see themselves clearly.

## Functionality
  * Users will be able to move around the scene.
  * Users will change the scene by moving through various areas.
  * Users will be able to create functions that damage the integrity of the box or otherwise enable them to progress through the challenge.
  * Users will operate inside a black box, that is, they cannot see inputs or outputs to the function, they can only see the inside.
  * Users will be able to reset the game if necessary.
  * Users will have a code block shown to them on the right panel of the screen when they interact with a function box, they will be able to submit and edit this code block.

## Wireframe
  Extremely simple layout
  Game will take up ~60% viewport width on left side of screen.
  Code block / text will be open on the right side of the screen
  ### Layout
  ![Screen Shot 2021-07-26 at 8 24 48 AM](https://user-images.githubusercontent.com/67240903/127015572-f28eedfd-30ef-4d63-bca4-ca5f6e77c44b.png)
  ### Example Puzzle
  https://wireframe.cc/eyOkJ3
  Users will be blocked from reaching the block on the top left quadrant and will need to create a function to rotate the grid that the player stands on to bypass the walls.
  
## Schedule
  * Monday - Setup project including Block, Scene, and Function/Action classes. Create setup screen where user will create their first function. This will be global.
  * Tuesday - Finish splash/initial setup page and create first puzzle. Figure out how to use Function constructor to do this
  * Wednesday - Build out and style gameplay, allow users to move throughout the box and figure out text display functionality
  * Thursday - Add more puzzles and flesh out styling
  * Friday - Polish up design

## Libraries
  Three.js
  Mocha testing framework
