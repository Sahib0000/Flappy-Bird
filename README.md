# Flappy Bird React (`School project`)

A React-based implementation of the classic Flappy Bird game.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0.0 or later recommended)
- npm (comes with Node.js)

## Getting Started

Follow these steps to get the game running on your local machine:

1. Clone the repository
```
git clone <repository-url>
cd flappy-bird-react
```

2. Install dependencies
```
npm install
```
This will install all the required dependencies listed in the package.json file, including:
- React
- React DOM
- React Scripts

3. Start the development server
```
npm start
```
This command runs the app in development mode. Open http://localhost:3000 to view it in your browser.

The page will automatically reload if you make changes to the code. You will also see any lint errors in the console.

## Building for Production

To build the app for production, run:
```
npm run build
```
This builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Features

The game includes the following components:

- Avatar: The bird character that the player controls
- Obstacles: Pipes that the player must navigate through
- Background: Scrolling background for visual effect
- Audio: Sound effects for game events
- Game Engine: Core game logic and physics

## Project Structure

- `src/components`: Game components (Avatar, Obstacle, Background, AudioManager, GameEngine)
- `src/constants`: Game constants and configuration
- `src/utils`: Utility functions for game mechanics
- `public/assets`: Game assets (sounds, images, fonts)

## Acknowledgments

Some parts of this project were adapted from the [Flappy Bird in 3 Languages](https://gitlab.com/Goodgis/flappy-bird-in-3-languages/-/tree/main?ref_type=heads) project.