import {useState} from 'react';
import {generateRandomValue} from '../utils/GameUtils';
import {
    CANVAS_HEIGHT,
    INITIAL_OBSTACLE_X,
    OBSTACLE_HEIGHT,
    OBSTACLE_SPEED,
    OBSTACLE_WIDTH,
    PASSAGE_SIZE,
    PIPE_DISTANCE,
} from '../constants/GameConstants';

export function useObstacle() {
    const getMinYPosition = () => {
        return Math.max(OBSTACLE_HEIGHT - 100, Math.floor(CANVAS_HEIGHT * 0.2));
    };

    const getMaxYPosition = () => {
        const floorHeight = Math.floor(CANVAS_HEIGHT * 0.1);
        const maxY = CANVAS_HEIGHT - floorHeight - PASSAGE_SIZE - OBSTACLE_HEIGHT;
        return Math.min(Math.floor(CANVAS_HEIGHT * 0.5), maxY);
    };

    const generateValidYPosition = () => {
        const minY = getMinYPosition();
        const maxY = getMaxYPosition();
        return generateRandomValue(minY, maxY);
    };

    const NUM_PIPES = 3;

    const [obstacles, setObstacles] = useState(() => {
        const initialObstacles = [];
        for (let i = 0; i < NUM_PIPES; i++) {
            initialObstacles.push({
                x: INITIAL_OBSTACLE_X + (i * PIPE_DISTANCE),
                y: generateValidYPosition(),
                pointScored: false
            });
        }
        return initialObstacles;
    });

    const [speed, setSpeed] = useState(OBSTACLE_SPEED);

    const updatePosition = () => {
        setObstacles(prevObstacles =>
            prevObstacles.map(obstacle => ({
                ...obstacle,
                x: obstacle.x - speed
            }))
        );
    };

    const updateSpeed = (score) => {
        const newSpeed = OBSTACLE_SPEED + (score * 0.1);
        setSpeed(Math.min(newSpeed, OBSTACLE_SPEED * 3));
    };

    const reset = () => {
        setObstacles(prevObstacles => {
            const updatedObstacles = [...prevObstacles];
            let rightmostX = -Infinity;
            for (const obstacle of updatedObstacles) {
                rightmostX = Math.max(rightmostX, obstacle.x);
            }

            const leftmostIndex = updatedObstacles.findIndex(
                obstacle => obstacle.x < -OBSTACLE_WIDTH
            );

            if (leftmostIndex !== -1) {
                updatedObstacles[leftmostIndex] = {
                    x: rightmostX + PIPE_DISTANCE,
                    y: generateValidYPosition(),
                    pointScored: false
                };
            }

            return updatedObstacles;
        });
    };

    const initialize = () => {
        setObstacles(() => {
            const initialObstacles = [];
            for (let i = 0; i < NUM_PIPES; i++) {
                initialObstacles.push({
                    x: INITIAL_OBSTACLE_X + (i * PIPE_DISTANCE),
                    y: generateValidYPosition(),
                    pointScored: false
                });
            }
            return initialObstacles;
        });
        setSpeed(OBSTACLE_SPEED);
    };

    const isOffScreen = () => {
        return obstacles.some(obstacle => obstacle.x < -OBSTACLE_WIDTH);
    };

    const markAsScored = (index) => {
        setObstacles(prevObstacles => {
            const updatedObstacles = [...prevObstacles];
            if (updatedObstacles[index]) {
                updatedObstacles[index] = {
                    ...updatedObstacles[index],
                    pointScored: true
                };
            }
            return updatedObstacles;
        });
    };

    const render = (context, topImage, bottomImage) => {
        if (topImage && bottomImage) {
            obstacles.forEach(obstacle => {
                const topPipeY = Math.max(0 - OBSTACLE_HEIGHT + obstacle.y, -OBSTACLE_HEIGHT + 100);
                context.drawImage(bottomImage, obstacle.x, topPipeY, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
                const floorHeight = Math.floor(CANVAS_HEIGHT * 0.1);
                const floorY = CANVAS_HEIGHT - floorHeight;
                const bottomPipeY = Math.min(obstacle.y + PASSAGE_SIZE, floorY - 20);
                context.drawImage(topImage, obstacle.x, bottomPipeY, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
            });
        }
    };

    return {
        obstacles,
        updatePosition,
        updateSpeed,
        reset,
        initialize,
        isOffScreen,
        markAsScored,
        render
    };
}
