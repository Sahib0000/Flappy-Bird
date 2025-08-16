export const CANVAS_WIDTH = window.innerWidth;
export const CANVAS_HEIGHT = window.innerHeight;
export const AVATAR_WIDTH = Math.floor(window.innerWidth * 0.04);
export const AVATAR_HEIGHT = Math.floor(window.innerWidth * 0.04);
export const OBSTACLE_WIDTH = Math.floor(window.innerWidth * 0.12);
export const OBSTACLE_HEIGHT = Math.floor(window.innerHeight * 0.7);

export const MIN_PASSAGE_SIZE = Math.floor(window.innerHeight * 0.25);
export const PASSAGE_SIZE = MIN_PASSAGE_SIZE;

export const INITIAL_AVATAR_X = Math.floor(window.innerWidth * 0.2);
export const INITIAL_AVATAR_Y = Math.floor(window.innerHeight * 0.5);
export const INITIAL_OBSTACLE_X = window.innerWidth;

export const PIPE_DISTANCE = Math.floor(window.innerWidth * 0.4);

export const GRAVITY = 0.145;
export const JUMP_FORCE = -5.5;
export const OBSTACLE_SPEED = 3;
export const BACKGROUND_SPEED = 0.2;
export const FLOOR_SPEED = 1.5;

export const ASSETS = {
    AVATAR: '/assets/svg/player.svg',
    BACKGROUND: '/assets/svg/background.svg',
    FLOOR: '/assets/svg/ground.svg',
    OBSTACLE_TOP: '/assets/svg/pipe_up.svg',
    OBSTACLE_BOTTOM: '/assets/svg/pipe_down.svg',
    SOUNDS: {
        COLLISION: '/assets/sound/slap.wav',
        JUMP: '/assets/sound/woosh.wav',
        POINT: '/assets/sound/score.wav'
    }
};
