import {useEffect, useRef, useState} from 'react';
import {
    AVATAR_HEIGHT,
    AVATAR_WIDTH,
    CANVAS_HEIGHT,
    GRAVITY,
    INITIAL_AVATAR_X,
    INITIAL_AVATAR_Y,
    JUMP_FORCE
} from '../constants/GameConstants';

export function useAvatar() {
    const [avatar, setAvatar] = useState({
        x: INITIAL_AVATAR_X,
        y: INITIAL_AVATAR_Y,
        width: AVATAR_WIDTH,
        height: AVATAR_HEIGHT
    });

    const [verticalSpeed, setVerticalSpeed] = useState(0);
    const [animationFrame, setAnimationFrame] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [isFalling, setIsFalling] = useState(false);

    const flapUpImageRef = useRef(null);
    const flapDownImageRef = useRef(null);
    const fallingImageRef = useRef(null);

    const animationTimerRef = useRef(null);
    const lastJumpTimeRef = useRef(0);

    useEffect(() => {
        const flapUpImg = new Image();
        flapUpImg.src = '/assets/svg/player_flap_up.svg';
        flapUpImg.onload = () => {
            flapUpImageRef.current = flapUpImg;
        };

        const flapDownImg = new Image();
        flapDownImg.src = '/assets/svg/player_flap_down.svg';
        flapDownImg.onload = () => {
            flapDownImageRef.current = flapDownImg;
        };

        const fallingImg = new Image();
        fallingImg.src = '/assets/svg/player_falling.svg';
        fallingImg.onload = () => {
            fallingImageRef.current = fallingImg;
        };

        animationTimerRef.current = setInterval(() => {
            setAnimationFrame(prev => (prev + 1) % 2);
        }, 150);

        return () => {
            if (animationTimerRef.current) {
                clearInterval(animationTimerRef.current);
            }
        };
    }, []);

    const updatePosition = () => {
        const now = Date.now();
        const timeSinceJump = now - lastJumpTimeRef.current;

        setVerticalSpeed(prev => prev + GRAVITY);

        setAvatar(prev => ({
            ...prev,
            y: prev.y + verticalSpeed
        }));

        if (verticalSpeed < 0) {
            setIsJumping(true);
            setIsFalling(false);
        } else if (verticalSpeed > 1) {
            setIsJumping(false);
            setIsFalling(true);
        } else {
            setIsJumping(false);
            setIsFalling(false);
        }
    };

    const jump = () => {
        setVerticalSpeed(JUMP_FORCE);
        setIsJumping(true);
        setIsFalling(false);
        lastJumpTimeRef.current = Date.now();
    };

    const reset = () => {
        setAvatar({
            ...avatar,
            x: INITIAL_AVATAR_X,
            y: INITIAL_AVATAR_Y
        });
        setVerticalSpeed(0);
        setIsJumping(false);
        setIsFalling(false);
    };

    const isOutOfBounds = () => {
        const floorHeight = Math.floor(CANVAS_HEIGHT * 0.1);
        return avatar.y < 0 || avatar.y > CANVAS_HEIGHT - floorHeight - avatar.height;
    };

    const render = (context, defaultAvatarImage) => {
        let imageToRender = defaultAvatarImage;

        if (isFalling && fallingImageRef.current) {
            imageToRender = fallingImageRef.current;
        } else if (isJumping) {
            if (flapUpImageRef.current) {
                imageToRender = flapUpImageRef.current;
            }
        } else {
            if (animationFrame === 0 && flapUpImageRef.current) {
                imageToRender = flapUpImageRef.current;
            } else if (animationFrame === 1 && flapDownImageRef.current) {
                imageToRender = flapDownImageRef.current;
            }
        }

        if (imageToRender) {
            context.drawImage(imageToRender, avatar.x, avatar.y, avatar.width, avatar.height);
        }
    };

    return {
        avatar,
        verticalSpeed,
        updatePosition,
        jump,
        reset,
        isOutOfBounds,
        render
    };
}
