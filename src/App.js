import React from 'react';
import './App.css';

import {useAvatar} from './components/Avatar';
import {useObstacle} from './components/Obstacle';
import {useBackground} from './components/Background';
import {useAudioManager} from './components/AudioManager';
import {useGameEngine} from './components/GameEngine';

function App() {
    const avatar = useAvatar();
    const obstacle = useObstacle();
    const background = useBackground();
    const audioManager = useAudioManager();

    const {canvasRef} = useGameEngine({
        avatar, obstacle, background, audioManager
    });

    return (<div className="App">
        <canvas ref={canvasRef}/>
    </div>);
}

export default App;
