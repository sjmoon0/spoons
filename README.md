# Spoons
### A Dual Interface Implementation

## Background
This project was completed as part of a thesis studying UX of interactive web applications
that require multiple screens with unique interfaces. It was accompanied by a usability
study and was published by Frostburg State University in May 2015.

## Overview
This is a web application which allows people in group sizes of 2-12 play the card game
"Spoons". What makes this different from most web applications is the mobile integration.
This game requires that users connect to a room session via a mobile device in order
to play the game. Game statistics and other information will display on the main
desktop browsing session while each player's personal cards will only be visible
to each respective individual. Gameplay is also achieved through mobile gestures
swiping, tapping, etc).

## Instructions
A single game of spoons is played with 2-12 people each using their own mobile device
as a game controller. At least one desktop/laptop machine must be used to display
the status of the game. *Note* By using the Advanced Settings at the main menu,
it is possible to switch the function from/to Mobile <--> Desktop.
Each group playing a game is organized into rooms.
### Game setup:
1. On a desktop computer, visit [spoons.moonman.website](https://spoons.moonman.website)
2. If you know the room you wish to monitor, click View Rooms and select the room or choose to enter a private room. Otherwise, click Create Room and follow the prompt to  create a room
3. Note that multiple desktop clients can be logged in to so the game can be played by a group of people in different physical locations
4. The monitor will now show the players logging in
5. To log in as a player, each individual must use a mobile device and visit [spoons.moonman.website](https://spoons.moonman.website)
6. Enter the room name and a username to enter a room and play
7. Once the room has been entered, review the instructions and press Ready to Play
8. Once all players have pressed Ready, the game begins
### Gameplay:
The objective of the game is to not be left without a spoon. For every n players,
there are n-1 spoons. A spoon can only be grabbed in two conditions:
- If you have 4 of a kind in your hand
- If you noticed that someone else grabbed a spoon
Cards are passed from one player to the next while each player is attempting to gather four of the same card.
There can only be 4 cards in your hand at a time, this does not include the current card being inspected.
1. When the player sees a pink rectangle on the right side of the screen, then that means there is a card ready for them to draw.
2. To draw the card, swipe left
3. If you want to replace a card from your hand (four cards on top), swipe the card being replaced upwards
4. If you do not want the card in your hand, swipe left to discard
5. To grab a spoon when one of the above conditions is true, press the Grab Spoon button

## Tools/Frameworks used
Node.js
Express
Socket.io
Bootstrap
jQuery
Hammer.js
Piecharts.js

## License
Copyright (C) 2015-2017  Steven Moon
This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
