import {useEffect, useRef, useState} from 'react';
import {detectElementOverlap, renderGameOver, renderGameStart, renderScore} from '../utils/GameUtils';
import {ASSETS, OBSTACLE_HEIGHT, OBSTACLE_WIDTH, PASSAGE_SIZE} from '../constants/GameConstants';

export function useGameEngine({avatar, obstacle, background, audioManager}) {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [score, setScore] = useState(0);
    const [hasMoved, setHasMoved] = useState(false);
    const [gameState, setGameState] = useState('start');
    const [highScore, setHighScore] = useState(0);
    const [isDayTime, setIsDayTime] = useState(true);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth, height: window.innerHeight
    });

    const avatarImageRef = useRef(null);
    const backgroundImageRef = useRef(null);
    const floorImageRef = useRef(null);
    const obstacleTopImageRef = useRef(null);
    const obstacleBottomImageRef = useRef(null);

    const animationFrameRef = useRef(null);

    function handleKeyAction(e) {
        if (e.code === "Space") {
            playerJump();
        }
    }

    function handleTouchAction() {
        playerJump();
    }

    function playerJump() {
        if (gameState === 'start') {
            setGameState('playing');
            setHasMoved(true);
            avatar.jump();
            audioManager.playJumpSound();
        } else if (gameState === 'playing') {
            avatar.jump();
            audioManager.playJumpSound();
        } else if (gameState === 'gameOver') {
            avatar.reset();
            setScore(0);
            obstacle.initialize();
            setGameState('playing');
            setHasMoved(true);
            avatar.jump();
            audioManager.playJumpSound();
        }
    }

    function gameOver() {
        if (score > highScore) {
            setHighScore(score);
        }
        setGameState('gameOver');
        audioManager.playCollisionSound();
    }

    const handleResize = () => {
        setDimensions({
            width: window.innerWidth, height: window.innerHeight
        });
    };

    useEffect(() => {
        const avatarImg = new Image();
        avatarImg.src = ASSETS.AVATAR;
        avatarImg.onload = () => {
            avatarImageRef.current = avatarImg;
        };

        const backgroundImg = new Image();
        backgroundImg.src = ASSETS.BACKGROUND;
        backgroundImg.onload = () => {
            backgroundImageRef.current = backgroundImg;
        };

        const floorImg = new Image();
        floorImg.src = ASSETS.FLOOR;
        floorImg.onload = () => {
            floorImageRef.current = floorImg;
        };

        const obstacleTopImg = new Image();
        obstacleTopImg.src = ASSETS.OBSTACLE_TOP;
        obstacleTopImg.onload = () => {
            obstacleTopImageRef.current = obstacleTopImg;
        };

        const obstacleBottomImg = new Image();
        obstacleBottomImg.src = ASSETS.OBSTACLE_BOTTOM;
        obstacleBottomImg.onload = () => {
            obstacleBottomImageRef.current = obstacleBottomImg;
        };

        const canvas = canvasRef.current;
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        contextRef.current = canvas.getContext('2d');

        window.addEventListener('keydown', handleKeyAction);
        window.addEventListener('touchstart', handleTouchAction);
        window.addEventListener('resize', handleResize);
        canvas.addEventListener('click', handleTouchAction);

        return () => {
            window.removeEventListener('keydown', handleKeyAction);
            window.removeEventListener('touchstart', handleTouchAction);
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('click', handleTouchAction);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [avatar, audioManager, dimensions]);

    useEffect(() => {
        if (!contextRef.current) return;

        const update = () => {
            const context = contextRef.current;

            background.updatePositions();

            if (gameState === 'playing') {
                avatar.updatePosition();
                obstacle.updatePosition();
            }

            if (obstacle.isOffScreen()) {
                obstacle.reset();
            }

            if (gameState === 'playing') {
                const hasCollision = obstacle.obstacles.some(obs => {
                    return detectElementOverlap(avatar.avatar.x + 5, avatar.avatar.y + 5, avatar.avatar.width - 12, avatar.avatar.height - 12, obs.x + 5, obs.y - OBSTACLE_HEIGHT, OBSTACLE_WIDTH - 10, OBSTACLE_HEIGHT) || detectElementOverlap(avatar.avatar.x + 5, avatar.avatar.y + 5, avatar.avatar.width - 12, avatar.avatar.height - 12, obs.x + 5, obs.y + PASSAGE_SIZE, OBSTACLE_WIDTH - 10, OBSTACLE_HEIGHT);
                });

                if (hasCollision) {
                    gameOver();
                }
            }

            if (gameState === 'playing' && avatar.isOutOfBounds()) {
                gameOver();
            }

            if (gameState === 'playing') {
                obstacle.obstacles.forEach((obs, index) => {
                    if (!obs.pointScored && avatar.avatar.x > obs.x) {
                        const newScore = score + 1;
                        setScore(newScore);
                        obstacle.markAsScored(index);
                        obstacle.updateSpeed(newScore);
                        audioManager.playPointSound();

                        if (newScore % 10 === 0) {
                            setIsDayTime(prev => !prev);
                        }
                    }
                });
            }

            context.clearRect(0, 0, dimensions.width, dimensions.height);

            background.renderBackground(context, backgroundImageRef.current);

            if (!isDayTime) {
                context.fillStyle = "rgba(0, 0, 50, 0.3)";
                context.fillRect(0, 0, dimensions.width, dimensions.height);
            }

            background.renderFloor(context, floorImageRef.current);

            avatar.render(context, avatarImageRef.current);

            obstacle.render(context, obstacleTopImageRef.current, obstacleBottomImageRef.current);

            renderScore(context, score, dimensions);

            if (gameState === 'start') {
                renderGameStart(context, dimensions);
            }

            if (gameState === 'gameOver') {
                renderGameOver(context, dimensions, score, highScore);
            }

            animationFrameRef.current = requestAnimationFrame(update);
        };

        animationFrameRef.current = requestAnimationFrame(update);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [hasMoved, avatar, obstacle, background, audioManager, score, dimensions, gameState, highScore, isDayTime]);

    return {
        canvasRef, score
    };
}
