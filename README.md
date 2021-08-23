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

## About
  ### Design
  ![image](https://user-images.githubusercontent.com/67240903/130292560-4a200b7e-7237-4147-bd43-5279606c83f1.png)\
  Dark theme separated by game element and coding portion. Responsive navbar that pulls out of left panel.
  ### Coding
  ![coding_walkthrough](https://user-images.githubusercontent.com/67240903/130292923-ed6dc15c-17ec-4898-bca0-e519e06ed564.gif)\
  Coding with formatting, resetting, copy/paste, and coloring functionality. Lines not meant to be changed by user are set to readonly. Clicking answer shows the answer to the current problem. Submitting erases contents of the code block.
  ### Text/Story
  ![gameplay_walkthrough](https://user-images.githubusercontent.com/67240903/130293404-49412eed-f250-41b9-9156-238b371b095b.gif)\
  Story is integrated with coding. Players complete coding challenges to advance forward and error messages show up inside the text box as well as inside the chrome console.
  FYI: The visible grid is a result of converting qt movie to gif and is not present in the actual game.
  
## Code Snippets
  ### Testing
  ![image](https://user-images.githubusercontent.com/67240903/130485156-3fedb573-0680-4a2f-8b58-e08805614d94.png)\
  Test numbers correspond with ids attached to each puzzle. The tests check for specific results before and after running the user created function.
  ### Text Stream
  ![image](https://user-images.githubusercontent.com/67240903/130485561-026084ef-a8b6-4dad-a491-67a6e1b76a8d.png)\
  Text stream created by recursive function that grabs from a prefilled list of textnodes that move the story forward. This function is also used to generate error messages that appear in the text box.
  
## Libraries
  Three.js
  Chai/Mocha testing
