var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//c = context. It's a really important multitool.
var c = canvas.getContext('2d');

window.onload = function() {
    var audio = document.getElementById("audio");
    audio.volume = 0.5;
    audio.play();
  };

// draw a filled rectangle with x=, y=, width, height all = 100px.
// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(300, 300, 100, 100);


//draw a line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3";

//the line doesn't show until calling c.stroke();
//c.stroke();

//draw an arc/circle with arguments: x, y, radius, (all integers); startangle(float), endangle(float).
//important: if I don't use c.beginPath for a new element, the next element I draw will have a line connecting it to the last element that had a beginPath.

//how to draw multiple copies of an element using a for-loop, and place each iteration in a random location on the screen.
// for (var i = 0; i < 50; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     var randomColor = getRandomColor();
    
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     // c.strokeStyle = 'blue';
//     c.strokeStyle = randomColor;
//     c.stroke();
// }


// //in order to randomize color, I have to make a function that does that.
// setInterval(function ()
// {
//     arc(c, Math.random() * 300, Math.random() * 300);
// }, 10);

// //this part defines the getRandomColor function, and then specifies in hex which colors are available to me before randomly showing them on screen.
// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

//making multiple circles that can move in random directions, at random speeds, and bounce off the walls without repeating code. Enter: object-oriented JavaScript!

// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = (Math.random() - 0.5) * 10;
// var dy = (Math.random() - 0.5) * 10;
// var radius = 30;



//mouse position.
var mouse = {
    x: undefined,
    y: undefined
}

//circle radius and color variables.
var maxRadius = 8;
var minRadius = 1;
var colorArray = [
    '#FCCC92',
    '#F2911B',
    '#F2B872',
    '#ED874C',
    '#FFFFFF',
];
// Load different sounds for different colors
var audioArray = {
    '#FCCC92': new Audio('https://github.com/analystrusso/portfoliosite/raw/main/audiofiles/fireflies1.mp3'), // Replace 'sound1.mp3' with the path to your sound file
    '#F2911B': new Audio('https://github.com/analystrusso/portfoliosite/raw/main/audiofiles/fireflies1.mp3'), // Replace 'sound2.mp3' with the path to your sound file
    '#F2B872': new Audio('https://github.com/analystrusso/portfoliosite/raw/main/audiofiles/fireflies1.mp3'), // Replace 'sound3.mp3' with the path to your sound file
    '#ED874C': new Audio('https://github.com/analystrusso/portfoliosite/raw/main/audiofiles/fireflies1.mp3'), // Replace 'sound4.mp3' with the path to your sound file
    '#FFFFFF': new Audio('https://github.com/analystrusso/portfoliosite/raw/main/audiofiles/fireflies1.mp3')  // Replace 'sound5.mp3' with the path to your sound file
};

//adding an event listener that listens for mouse movement.
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
}) 

//makes the canvas size responsive to window resize.
window.onresize = () => location.reload();

//defines circle position, speed, radius, and color for each circle at generation.
class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

        //draws the circles.
        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
            c.shadowColor = this.color;
            c.shadowBlur = 15;
            c.shadowOffsetX = 0;
            c.shadowOffsetY = 0;
            
        };

        //defines circle behavior -- do they bounce off the canvas edges, or do they float off the screen?
        //if x + radius is more than the max width, reverse direction OR if x - radius is < 0 (off the left side of the page), reverse direction again.
        this.update = function () {
            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }

            //this does for y what the previous conditional statement did for x.
            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            //increments the x value of the circle by 1 for each animation frame.
            this.x += this.dx;
            this.y += this.dy;

            //defines what happens when circles are moused-over.
            if (mouse.x - this.x < 50
                && mouse.x - this.x > -50
                && mouse.y - this.y < 50
                && mouse.y - this.y > -50) {
                if (this.radius < maxRadius) {
                    this.radius += 1

                    // Play sound if the circle's color matches any in the audioArray
                    if (this.color in audioArray) {
                        audioArray[this.color].currentTime = 0;
                        audioArray[this.color].play();
                    }
                }
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;
                // audioArray[this.color].pause(); // Pause the audio when mouse is no longer over the circle
            }

            //draws the scene.
            this.draw();
        };
    }
}

//creates an array of circles so we can have them at various sizes.
var circleArray = [];

//defines how many circles, where they spawn from, how fast they move, and how to handle variable numbers of circles.
for (var i = 0; i < 100; i++) {
    var radius = Math.random() * 4 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 1;
    var dy = (Math.random() - 0.5) * 1;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

//animating the circles.
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}

animate();
