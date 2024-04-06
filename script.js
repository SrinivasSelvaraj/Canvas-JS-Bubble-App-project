var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var circles = [];
var colors = ["yellow", "blue", "red", "green"];
var radius = 30;
var circleY = 50;

for (var i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(50, circleY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = colors[i];
    ctx.fill();
    circles.push({x: 50, y: circleY, r: radius, color: colors[i]});
    circleY += 100;
}

function drawArrow(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 50, y);
    ctx.lineTo(x - 40, y - 10);
    ctx.moveTo(x - 50, y);
    ctx.lineTo(x - 40, y + 10);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
}

var arrowY = 50;
for (var i = 0; i < 4; i++) {
    drawArrow(ctx, 500, arrowY);
    arrowY += 100;
}

function moveArrow(finalX, finalY) {
    var currentX = 500;
    var arrowReachedFinalPosition = false;
    var interval = setInterval(function() {
        ctx.clearRect(currentX - 50, finalY - 15, 50, 30);
        currentX -= 5;
        if (currentX <= 130) {
            clearInterval(interval);
            drawArrow(ctx, 130, finalY);
            arrowReachedFinalPosition = true;
        } else {
            drawArrow(ctx, currentX, finalY);
        }
    }, 30);

    var colorChangeInterval = setInterval(function() {
        if (arrowReachedFinalPosition) {
            circles.forEach(function(circle) {
                if (circle.x === finalX && circle.y === finalY) {
                    circle.color = "gray";
                    clearInterval(colorChangeInterval);
                    redrawCircles();
                }
            });
        }
    }, 100);
}

function redrawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(function(circle) {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
        ctx.fillStyle = circle.color;
        ctx.fill();
    });
    arrowY = 50;
    for (var i = 0; i < 4; i++) {
        drawArrow(ctx, 500, arrowY);
        arrowY += 100;
    }
}

canvas.addEventListener('click', function(event) {
    var x = event.offsetX;
    var y = event.offsetY;

    for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
        var distance = Math.sqrt(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2));
        if (distance < circle.r) {
            moveArrow(circle.x, circle.y);
            break;
        }
    }
});

var resetButton = document.getElementById("resetButton");
resetButton.addEventListener('click', function() {
    location.reload();
});
