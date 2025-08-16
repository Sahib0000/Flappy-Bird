import {useState} from 'react';
import {BACKGROUND_SPEED, CANVAS_HEIGHT, CANVAS_WIDTH, FLOOR_SPEED} from '../constants/GameConstants';

export function useBackground() {
    const [backgroundPos, setBackgroundPos] = useState(0);
    const [floorPos, setFloorPos] = useState(0);

    const updatePositions = () => {
        setBackgroundPos(prev => {
            const newPos = prev - BACKGROUND_SPEED;
            return newPos <= -CANVAS_WIDTH ? 0 : newPos;
        });

        setFloorPos(prev => {
            const newPos = prev - FLOOR_SPEED;
            return newPos <= -CANVAS_WIDTH ? 0 : newPos;
        });
    };

    const renderBackground = (context, backgroundImage) => {
        if (backgroundImage) {
            context.drawImage(backgroundImage, backgroundPos, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            context.drawImage(backgroundImage, backgroundPos + CANVAS_WIDTH - 1, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        }
    };

    const renderFloor = (context, floorImage) => {
        if (floorImage) {
            const floorHeight = Math.floor(CANVAS_HEIGHT * 0.1);
            const floorY = CANVAS_HEIGHT - floorHeight;
            context.drawImage(floorImage, floorPos, floorY, CANVAS_WIDTH, floorHeight);
            context.drawImage(floorImage, floorPos + CANVAS_WIDTH - 1, floorY, CANVAS_WIDTH, floorHeight);
        }
    };

    return {
        backgroundPos, floorPos, updatePositions, renderBackground, renderFloor
    };
}
