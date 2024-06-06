/* var canvas = document.querySelector('canvas');

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
canvas.addEventListener('touchmove', function(event) {
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
 */


var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var audio = document.getElementById("audio");
var maxRadius = 8;
var minRadius = 1;
var colorArray = ['#FCCC92', '#F2911B', '#F2B872', '#ED874C', '#FFFFFF'];
var audioArray = {
    '#FCCC92': new Audio('https://raw.githubusercontent.com/analystrusso/portfoliosite/main/canvasproject/audiofiles/fireflies1.mp3'),
    '#F2911B': new Audio('https://raw.githubusercontent.com/analystrusso/portfoliosite/main/canvasproject/audiofiles/fireflies2.mp3'),
    '#F2B872': new Audio('https://raw.githubusercontent.com/analystrusso/portfoliosite/main/canvasproject/audiofiles/fireflies3.mp3'),
    '#ED874C': new Audio('https://raw.githubusercontent.com/analystrusso/portfoliosite/main/canvasproject/audiofiles/fireflies4.mp3'),
    '#FFFFFF': new Audio('https://raw.githubusercontent.com/analystrusso/portfoliosite/main/canvasproject/audiofiles/fireflies5.mp3')
};

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;

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

        var distanceX = mouse.x - this.x;
        var distanceY = mouse.y - this.y;
        var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < 50) {
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
        var color = colorArray[Math.floor(Math.random() * colorArray.length)];
        circleArray.push(new Circle(x, y, dx, dy, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

window.onload = function() {
    audio.volume = 0.5;
    audio.play();
};

var mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

canvas.addEventListener('touchmove', function(event) {
    event.preventDefault();
    var touch = event.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
});

window.addEventListener('resize', function() {
    setCanvasSize();
    init();
});

setCanvasSize();
init();
animate();
