const canvas = document.getElementById("canvas");
const brush = canvas.getContext("2d");
const parent = canvas.parentNode;
var image;
var llfSlider = document.getElementById("lineLengthFactor");
var mlfSlider = document.getElementById("minLengthFactor");
var adSlider = document.getElementById("angleDivision");
var abSlider = document.getElementById("angleBoundry");
var lsfSlider = document.getElementById("lengthScaleFactor");
var cSlider = document.getElementById("hueFactor");
var resubmit = document.getElementById("resubmitButton");
var downloadButton = document.getElementById("downloadButton");
var hue;
var canvasWidth;
var canvasHeight;
var lineLengthFactor = llfSlider.value / 10;
var lineLength;
var minLengthFactor = mlfSlider.value;
var minLength;
var angleDivision = adSlider.value;
var angleBoundry = abSlider.value;
var lengthScaleFactor = lsfSlider.value / 10;
var lengthScale;
var angles;

function setVars() {
    hue = cSlider.value;
    lineLength = (canvas.height / 2) * lineLengthFactor;
    minLength = (lineLength / 100) * minLengthFactor;
    lengthScale = 0.2 * lengthScaleFactor;
}

function captureCanvas() {
    image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href = image;
}

function resize() {
    canvasWidth = parent.clientWidth;
    canvasHeight = parent.clientHeight * 0.9;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}

function loadAngles() {
    angles = [];
    for (var i = 0; i <= angleDivision; i++) {
        angles.push((-angleBoundry / 2) + ((angleBoundry * i) / angleDivision));
    }
}

function fractal() {
    loadAngles();
    setVars();
    resize();
    drawFractal(canvasWidth / 2, canvasHeight, lineLength, 0, 4);
}

function drawFractal(x, y, length, angle, branchWidth) {
    brush.beginPath();
    brush.save();
    brush.strokeStyle = "hsl(" + hue + ",100%,50%)";
    brush.lineWidth = branchWidth;
    brush.translate(x, y);
    brush.rotate(angle * Math.PI / 180);
    brush.moveTo(0, 0);
    brush.lineTo(0, -length);
    brush.shadowBlur = 15;
    brush.shadowColor = "rgba(0,0,0,0.8)";
    brush.stroke();
    if (length < minLength) {
        brush.restore();
    } else {
        angles.forEach(function(angle) {
            drawFractal(0, -length, length * lengthScale, angle, branchWidth * 0.7);
        });
        brush.restore();
    }
}
llfSlider.oninput = function() {
    lineLengthFactor = this.value / 10;
};
mlfSlider.oninput = function() {
    minLengthFactor = this.value;
};
adSlider.oninput = function() {
    angleDivision = this.value;
};
abSlider.oninput = function() {
    angleBoundry = this.value;
};
lsfSlider.oninput = function() {
    lengthScaleFactor = this.value / 10;
};
cSlider.oninput = function() {
    hue = this.value;
};
resubmit.onclick = function() {
    fractal();
};
downloadButton.onclick = function() {
    captureCanvas();
};

fractal();