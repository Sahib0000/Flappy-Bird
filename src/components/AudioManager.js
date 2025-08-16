import {useEffect, useRef} from 'react';
import {ASSETS} from '../constants/GameConstants';

export function useAudioManager() {
    const collisionSoundRef = useRef(null);
    const jumpSoundRef = useRef(null);
    const pointSoundRef = useRef(null);

    useEffect(() => {
        collisionSoundRef.current = new Audio(ASSETS.SOUNDS.COLLISION);
        jumpSoundRef.current = new Audio(ASSETS.SOUNDS.JUMP);
        pointSoundRef.current = new Audio(ASSETS.SOUNDS.POINT);
        return () => {
        };
    }, []);

    const playCollisionSound = () => {
        if (collisionSoundRef.current) {
            collisionSoundRef.current.play();
        }
    };

    const playJumpSound = () => {
        if (jumpSoundRef.current) {
            jumpSoundRef.current.currentTime = 0;
            jumpSoundRef.current.play();
        }
    };

    const playPointSound = () => {
        if (pointSoundRef.current) {
            pointSoundRef.current.play();
        }
    };

    return {
        playCollisionSound, playJumpSound, playPointSound
    };
}