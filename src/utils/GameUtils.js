export function generateRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function detectElementOverlap(elem1X, elem1Y, elem1Width, elem1Height, elem2X, elem2Y, elem2Width, elem2Height) {
    return elem1X < elem2X + elem2Width && elem2X < elem1X + elem1Width && elem1Y < elem2Y + elem2Height && elem2Y < elem1Y + elem1Height;
}

export function renderGameOver(context, dimensions, score, highScore) {
    const W = dimensions.width, H = dimensions.height;
    context.fillStyle = "rgba(0, 0, 0, 0.6)";
    context.fillRect(0, 0, W, H);

    context.shadowColor = "black";
    context.shadowBlur = Math.max(4, Math.min(8, Math.floor(W * 0.006)));
    context.textAlign = "center";

    let gradient = context.createLinearGradient(0, 0, W, 0);
    gradient.addColorStop(0, "#ff4e50");
    gradient.addColorStop(1, "#f9d423");
    context.fillStyle = gradient;
    const gameOverFontSize = Math.max(30, Math.min(60, Math.floor(W * 0.05)));
    context.font = `bold ${gameOverFontSize}px Arial`;
    context.fillText("GAME OVER", W / 2, H / 3);

    const drawScoreBox = (text, y) => {
        const boxWidth = Math.min(280, W * 0.6);
        const boxHeight = Math.min(50, H * 0.08);
        const boxX = W / 2 - boxWidth / 2;
        const boxY = y - boxHeight / 2;

        context.fillStyle = "rgba(255, 255, 255, 0.1)";
        context.strokeStyle = "white";
        context.lineWidth = Math.max(1, Math.min(2, Math.floor(W * 0.002)));
        context.beginPath();
        const radius = Math.max(6, Math.min(12, Math.floor(W * 0.01)));
        context.moveTo(boxX + radius, boxY);
        context.lineTo(boxX + boxWidth - radius, boxY);
        context.quadraticCurveTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + radius);
        context.lineTo(boxX + boxWidth, boxY + boxHeight - radius);
        context.quadraticCurveTo(boxX + boxWidth, boxY + boxHeight, boxX + boxWidth - radius, boxY + boxHeight);
        context.lineTo(boxX + radius, boxY + boxHeight);
        context.quadraticCurveTo(boxX, boxY + boxHeight, boxX, boxY + boxHeight - radius);
        context.lineTo(boxX, boxY + radius);
        context.quadraticCurveTo(boxX, boxY, boxX + radius, boxY);
        context.closePath();
        context.fill();
        context.stroke();

        context.fillStyle = "white";
        const scoreFontSize = Math.max(16, Math.min(28, Math.floor(W * 0.025)));
        context.font = `${scoreFontSize}px Arial`;
        context.fillText(text, W / 2, y + boxHeight * 0.2);
    };


    drawScoreBox(`Score: ${score}`, H / 2 - H * 0.06);
    drawScoreBox(`High Score: ${highScore}`, H / 2 + H * 0.06);

    context.shadowBlur = 0;
    context.fillStyle = "#ddd";
    const playAgainFontSize = Math.max(16, Math.min(28, Math.floor(W * 0.025)));
    context.font = `${playAgainFontSize}px Arial`;
    context.fillText("Press SPACE or TAP to play again", W / 2, H * 0.65);
}

export function renderGameStart(context, dimensions) {
    const W = dimensions.width, H = dimensions.height;
    const ctx = context;

    const vignette = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.2, W / 2, H / 2, Math.max(W, H) * 0.7);
    vignette.addColorStop(0, "rgba(0,0,0,0.45)");
    vignette.addColorStop(1, "rgba(0,0,0,0.85)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, W, H);

    const cardW = Math.min(W * 0.8, Math.min(520, W * 0.8));
    const cardH = Math.min(H * 0.6, Math.min(300, H * 0.6));
    const cardX = (W - cardW) / 2;
    const cardY = (H - cardH) / 2;

    const cornerRadius = Math.max(12, Math.min(24, Math.floor(W * 0.02)));
    ctx.beginPath();
    ctx.moveTo(cardX + cornerRadius, cardY);
    ctx.arcTo(cardX + cardW, cardY, cardX + cardW, cardY + cardH, cornerRadius);
    ctx.arcTo(cardX + cardW, cardY + cardH, cardX, cardY + cardH, cornerRadius);
    ctx.arcTo(cardX, cardY + cardH, cardX, cardY, cornerRadius);
    ctx.arcTo(cardX, cardY, cardX + cardW, cardY, cornerRadius);
    ctx.closePath();

    const glass = ctx.createLinearGradient(0, cardY, 0, cardY + cardH);
    glass.addColorStop(0, "rgba(255,255,255,0.16)");
    glass.addColorStop(1, "rgba(255,255,255,0.08)");
    ctx.fillStyle = glass;
    ctx.fill();

    ctx.lineWidth = Math.max(1, Math.min(2, Math.floor(W * 0.002)));
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.stroke();

    const titleFontSize = Math.max(24, Math.min(44, Math.floor(W * 0.04)));
    ctx.font = `bold ${titleFontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = Math.max(6, Math.min(12, Math.floor(W * 0.01)));
    ctx.fillStyle = "#fff";
    ctx.fillText("🐦 Flappy Bird", W / 2, cardY + cardH * 0.2);
    ctx.shadowBlur = 0;

    const subtitleFontSize = Math.max(14, Math.min(22, Math.floor(W * 0.02)));
    ctx.font = `600 ${subtitleFontSize}px Arial`;
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText("Avoid the pipes and don't hit the ground!", W / 2, cardY + cardH - cardH * 0.15);

    const btnW = Math.min(280, W * 0.6);
    const btnH = Math.min(52, H * 0.08);
    const btnX = W / 2 - btnW / 2;
    const btnY = cardY + cardH / 2 - btnH / 2;
    const btnCornerRadius = Math.max(13, Math.min(26, Math.floor(W * 0.02)));
    ctx.beginPath();
    ctx.moveTo(btnX + btnCornerRadius, btnY);
    ctx.arcTo(btnX + btnW, btnY, btnX + btnW, btnY + btnH, btnCornerRadius);
    ctx.arcTo(btnX + btnW, btnY + btnH, btnX, btnY + btnH, btnCornerRadius);
    ctx.arcTo(btnX, btnY + btnH, btnX, btnY, btnCornerRadius);
    ctx.arcTo(btnX, btnY, btnX + btnW, btnY, btnCornerRadius);
    ctx.closePath();
    const btnGrad = ctx.createLinearGradient(0, btnY, 0, btnY + btnH);
    btnGrad.addColorStop(0, "#4cafef");
    btnGrad.addColorStop(1, "#2a86e3");
    ctx.fillStyle = btnGrad;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.stroke();

    const btnFontSize = Math.max(12, Math.min(18, Math.floor(W * 0.016)));
    ctx.font = `600 ${btnFontSize}px Arial`;
    ctx.fillStyle = "#fff";
    ctx.fillText("Press SPACE or TAP to start", W / 2, btnY + btnH / 2);
}

export function renderScore(context, score, dimensions) {
    const scoreText = `${score}`;
    const scoreFontSize = Math.max(36, Math.min(72, Math.floor(dimensions.width * 0.05)));
    context.font = `bold ${scoreFontSize}px Arial Black`;
    context.textAlign = "center";
    context.textBaseline = "middle";

    const scoreGradient = context.createLinearGradient(0, 0, 0, scoreFontSize * 1.5);
    scoreGradient.addColorStop(0, "#54dfa5");
    scoreGradient.addColorStop(1, "#002e21");

    context.lineWidth = Math.max(3, Math.min(6, Math.floor(dimensions.width * 0.004)));
    context.strokeStyle = "rgba(0,0,0,0.6)";
    context.strokeText(scoreText, dimensions.width / 2, dimensions.height * 0.1);

    context.fillStyle = scoreGradient;
    context.fillText(scoreText, dimensions.width / 2, dimensions.height * 0.1);

    context.shadowColor = "rgba(255,255,255,0.7)";
    context.shadowBlur = Math.max(5, Math.min(10, Math.floor(dimensions.width * 0.007)));
    context.fillText(scoreText, dimensions.width / 2, dimensions.height * 0.1);
    context.shadowBlur = 0;
}
