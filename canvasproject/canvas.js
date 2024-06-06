// var canvas = document.querySelector('canvas');

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// //c = context. It's a really important multitool.
// var c = canvas.getContext('2d');

// window.onload = function() {
//     var audio = document.getElementById("audio");
//     audio.volume = 0.5;
//     audio.play();
//   };

// //mouse position.
// var mouse = {
//     x: undefined,
//     y: undefined
// }

// //circle radius and color variables.
// var maxRadius = 8;
// var minRadius = 1;
// var colorArray = [
//     '#FCCC92',
//     '#F2911B',
//     '#F2B872',
//     '#ED874C',
//     '#FFFFFF',
// ];
// // Load different sounds for different colors
// var audioArray = {
//     '#FCCC92': new Audio('https://raw.githubusercontent.com/analystrusso/portfoliosite/main/canvasproject/audiofiles/fireflies1.mp3'), 
//     '#F2911B': new Audio('https://raw.githubusercontent.com/analystrusso/portfoliosite/main/canvasproject/audiofiles/fireflies2.mp3'),
//     '#F2B872': new Audio('https://raw.githubusercontent.com/analystrusso/portfoliosite/main/canvasproject/audiofiles/fireflies3.mp3'),
//     '#ED874C': new Audio('https://raw.githubusercontent.com/analystrusso/portfoliosite/main/canvasproject/audiofiles/fireflies4.mp3'),
//     '#FFFFFF': new Audio('https://raw.githubusercontent.com/analystrusso/portfoliosite/main/canvasproject/audiofiles/fireflies5.mp3') 
// };

// //adding an event listener that listens for mouse movement.
// window.addEventListener('mousemove', function(event) {
//     mouse.x = event.x;
//     mouse.y = event.y;
// }) 

// //makes the canvas size responsive to window resize.
// window.onresize = () => location.reload();

// //defines circle position, speed, radius, and color for each circle at generation.
// class Circle {
//     constructor(x, y, dx, dy, radius) {
//         this.x = x;
//         this.y = y;
//         this.dx = dx;
//         this.dy = dy;
//         this.radius = radius;
//         this.minRadius = radius;
//         this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

//         //draws the circles.
//         this.draw = function () {
//             c.beginPath();
//             c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//             c.fillStyle = this.color;
//             c.fill();
//             c.shadowColor = this.color;
//             c.shadowBlur = 15;
//             c.shadowOffsetX = 0;
//             c.shadowOffsetY = 0;
            
//         };

//         //defines circle behavior -- do they bounce off the canvas edges, or do they float off the screen?
//         //if x + radius is more than the max width, reverse direction OR if x - radius is < 0 (off the left side of the page), reverse direction again.
//         this.update = function () {
//             if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
//                 this.dx = -this.dx;
//             }

//             //this does for y what the previous conditional statement did for x.
//             if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
//                 this.dy = -this.dy;
//             }

//             //increments the x value of the circle by 1 for each animation frame.
//             this.x += this.dx;
//             this.y += this.dy;

//             //defines what happens when circles are moused-over.
//             if (mouse.x - this.x < 50
//                 && mouse.x - this.x > -50
//                 && mouse.y - this.y < 50
//                 && mouse.y - this.y > -50) {
//                 if (this.radius < maxRadius) {
//                     this.radius += 1

//                     // Play sound if the circle's color matches any in the audioArray
//                     if (this.color in audioArray) {
//                         audioArray[this.color].currentTime = 0;
//                         audioArray[this.color].play();
//                     }
//                 }
//             } else if (this.radius > this.minRadius) {
//                 this.radius -= 1;
//                 // audioArray[this.color].pause(); // Pause the audio when mouse is no longer over the circle
//             }

//             //draws the scene.
//             this.draw();
//         };
//     }
// }

// //creates an array of circles so we can have them at various sizes.
// var circleArray = [];

// //defines how many circles, where they spawn from, how fast they move, and how to handle variable numbers of circles.
// for (var i = 0; i < 100; i++) {
//     var radius = Math.random() * 4 + 1;
//     var x = Math.random() * (innerWidth - radius * 2) + radius;
//     var y = Math.random() * (innerHeight - radius * 2) + radius;
//     var dx = (Math.random() - 0.5) * 1;
//     var dy = (Math.random() - 0.5) * 1;
//     circleArray.push(new Circle(x, y, dx, dy, radius));
// }

// //animating the circles.
// function animate() {
//     requestAnimationFrame(animate);
//     c.clearRect(0, 0, innerWidth, innerHeight);

//     for (var i = 0; i < circleArray.length; i++) {
//         circleArray[i].update();
//     }

// }

// animate();


var canvas = document.querySelector('canvas');

// Set canvas dimensions based on screen size
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initialize canvas size
setCanvasSize();

var c = canvas.getContext('2d');

window.onload = function() {
    var audio = document.getElementById("audio");
    audio.volume = 0.5;
    audio.play();
};

var mouse = {
    x: undefined,
    y: undefined
};

var maxRadius = 8;
var minRadius = 1;
var colorArray = [
    '#FCCC92',
    '#F2911B',
    '#F2B872',
    '#ED874C',
    '#FFFFFF',
];

var audioArray = {
    '#FCCC92': new Audio('https://raw.githubusercontent.com/analystrusso/portfoliosite/main/canvasproject/audiofiles/fireflies1.mp3'),
    '#F2911B': new Audio('https://raw.githubusercontent.com/analystrusso/portfoliosite/main/canvasproject/audiofiles/fireflies2.mp3'),
    '#F2B872': new Audio('https://raw.githubusercontent.com/analystrusso/portfoliosite/main/canvasproject/audiofiles/fireflies3.mp3'),
    '#ED874C': new Audio('https://raw.githubusercontent.com/analystrusso/portfoliosite/main/canvasproject/audiofiles/fireflies4.mp3'),
    '#FFFFFF': new Audio('https://raw.githubusercontent.com/analystrusso/portfoliosite/main/canvasproject/audiofiles/fireflies5.mp3')
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// Touch event listener
window.addEventListener('touchmove', function(event) {
    event.preventDefault(); // Prevent scrolling
    var touch = event.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
});

window.addEventListener('resize', function() {
    setCanvasSize();
    init();
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.shadowColor = this.color;
        c.shadowBlur = 15;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
    };

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 &&
            mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 &&
            mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
                if (this.color in audioArray) {
                    audioArray[this.color].currentTime = 0;
                    audioArray[this.color].play();
                }
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    };
}

var circleArray = [];

function init() {
    circleArray = [];
    for (var i = 0; i < 100; i++) {
        var radius = Math.random() * 4 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 1;
        var dy = (Math.random() - 0.5) * 1;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();
animate();

