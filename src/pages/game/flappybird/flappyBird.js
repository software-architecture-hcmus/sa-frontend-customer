export function initGame({canvasId, score, setScore, setGameOver}) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");
    canvas.width = 480;
    canvas.height = 640;

    const defaultBird = {
        x: 50,
        y: 150,
        width: 40,
        height: 40,
        gravity: 0.2,
        lift: -5.4,
        velocity: 0,
        update() {
            this.velocity += this.gravity;
            this.y += this.velocity;
        },
        flap() {
            this.velocity = this.lift;
        },
        draw() {
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        },
    };

    let bird = defaultBird;
    let pipes = [];
    const pipeWidth = 60;
    const pipeGap = 200;
    let gameOver = false;
    let gameStarted = false;
    let pipeInterval;

    function generatePipes() {
        const pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
        pipes.push({
            x: canvas.width,
            top: pipeHeight,
            bottom: pipeHeight + pipeGap,
        });
    }

    function drawPipes() {
        for (let i = 0; i < pipes.length; i++) {
            const pipe = pipes[i];
            ctx.fillStyle = "green";
            ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top); // Top pipe
            ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom); // Bottom pipe
            pipe.x -= 2;

            if (pipe.x + pipeWidth < 0) {
                pipes.splice(i, 1);
                score++;
            }

            if (
                bird.x + bird.width > pipe.x &&
                bird.x < pipe.x + pipeWidth &&
                (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)
            ) {
                gameOver = true;
            }
        }
    }

    function drawScore() {
        const text = "Score: " + score;
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        
        const textWidth = ctx.measureText(text).width;
        
        const canvasCenterX = canvas.width / 2;
        const textX = canvasCenterX - textWidth / 2;
        
        ctx.fillText(text, textX, 30); 
    }
    

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        bird.update();
        bird.draw();
        drawPipes();
        drawScore();

        if (!gameOver) {
            requestAnimationFrame(gameLoop);
        } else {
            clearInterval(pipeInterval); // Stop generating pipes
            setGameOver(true);
            setScore(score);
            
        }
    }
    if (!gameStarted) { // Start the game loop
        gameStarted = true; // Game starts when clicked
        pipeInterval = setInterval(generatePipes, 2000); // Start generating pipes
        gameLoop();
    }
    document.addEventListener("click", () => {
            bird.flap(); // Flap the bird if the game is running
    });
}
