$(document).ready(function () {
    const dino = $("#dino");
    const cactus = $("#cactus");
    const scoreElement = $("#scores");
    const playGameButton = $("#playgame");
    const resetButton = $("#resetgame");
    const jumpSound = document.getElementById("jumpSound");
    const bgSound = document.getElementById("bgSound");
    const crashSound = document.getElementById("crashSound");



    let currentScore = -1;
    let hasJumpedOverCactus = false;
    let isAlive;

    resetButton.click(function () {
        location.reload();
    });    
    
    $(document).keydown(function (event) {
        if (event.key === "w") {
            playjumpSound();
            jump();
        }
    });

    function playjumpSound() {
        jumpSound.currentTime = 0; // Rewind the sound to the beginning
        jumpSound.play();
    }

    function playcrashSound() {
        crashSound.currentTime = 0; // Rewind the sound to the beginning
        crashSound.volume = 0.5;
        crashSound.play();
    }


    function playbgSound() {
        bgSound.currentTime = 0; // Rewind the sound to the beginning
        bgSound.volume = 0.4;
        bgSound.play();
    }

    function stopbgSound() {
        bgSound.pause();
        bgSound.currentTime = 0;
    }


    function jump() {
        if (!dino.hasClass("jump")) {
            dino.addClass("jump");

            setTimeout(function () {
                dino.removeClass("jump");
            }, 300);
        }
    }

    $.keyframe.define([{
        name: 'block',
        '0%': {
            left: '980px'
        },
        '100%': {
            left: '-5px'
        }
    }]);

    playGameButton.click(function () {
        playbgSound(); // Goes inside the click handler so it plays when Play Game is clicked.

        isAlive = setInterval(function () {

            cactus.css("animation", "block 0.9s infinite linear");

                // get current dino Y position
                let dinoTop = parseInt(dino.css("top"));
                console.log(dinoTop);

                // get current cactus X position
                let cactusLeft = parseInt(cactus.css("left"));
                console.log(cactus);

                // detect collision
                if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 750) {
                    // collision
                    if (!hasJumpedOverCactus) {
                        //alert("Game over! Your score: " + score);
                        clearInterval(isAlive);
                        cactus.css("animation", "block paused");
                        playcrashSound(); // Goes inside the game over block.
                        stopbgSound(); //stops the background music upon a collision.
                    }


                    hasJumpedOverCactus = false; // Reset the flag
                } else if (cactusLeft >= 630 && dinoTop <= 750) {
                    // dino jumped over the cactus
                    if (!hasJumpedOverCactus) {
                        currentScore++;
                        scoreElement.text("Score: " + currentScore);
                        hasJumpedOverCactus = true;
                    }
                } else {
                    hasJumpedOverCactus = false; // reset the flag when the cactus is off the screen
                }

            }, 5);
    });

});
