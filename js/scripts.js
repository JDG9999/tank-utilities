// variables for positioning the water image in the tank
var maxSize = 335;
var minTop = 80;
// variables related to the tank size and water level
var maximum = 10;
var minimum = 0;
var highLevel = Infinity;
var lowLevel = -Infinity;
var currentLevel = 10;
var flush = false;
document.getElementById("maximum").defaultValue = maximum;
document.getElementById("minimum").defaultValue = minimum;
document.getElementById("high-level").defaultValue = highLevel;
document.getElementById("low-level").defaultValue = lowLevel;
document.getElementById("current-level").defaultValue = currentLevel;
document.getElementById("set-point").defaultValue = 0;

function drainTank() {
    if (confirm('Do you want to drain the tank?')) {
        changeWaterLevel(0);
    }
}

function setTankLevel() {
    var targetLevel = parseFloat(document.getElementById("set-point").value);
    changeWaterLevel(targetLevel);
}

function setProperties() {
    var inputMax = parseFloat(document.getElementById("maximum").value);
    var inputMin = parseFloat(document.getElementById("minimum").value);
    if ((currentLevel >= inputMin) && (currentLevel <= inputMax)) {
        maximum = inputMax;
        minimum = inputMin;
        highLevel = parseFloat(document.getElementById("high-level").value);
        lowLevel = parseFloat(document.getElementById("low-level").value);
        changeTankSize();
    } else {
        alert("The minimum or maximum values entered are not valid.")
    }
}

function checkAlarms() {
    var water = document.getElementById('water');
    if (currentLevel <= lowLevel) {
        water.style.backgroundColor = "yellow";
    } else if (currentLevel >= highLevel) {
        water.style.backgroundColor = "red";
    } else {
        water.style.backgroundColor = "blue";
    }
}

function changeTankSize() {
    var water = document.getElementById('water');
    var newHeight = (currentLevel / maximum) * maxSize;
    var newTop = minTop + (maxSize - newHeight);
    water.style.height = newHeight + 'px';
    water.style.top = newTop + 'px';
    console.log("Finished changing tank");
    checkAlarms();
}

function changeWaterLevel(targetLevel) {
    if (!flush) {
        console.log("Target is " + targetLevel);
        if ((targetLevel >= minimum) && (targetLevel <= maximum)) {
            flush = true;
            var water = document.getElementById('water');
            var currentLevelLabel = document.getElementById("current-level");
            var direction = 0;
            if (targetLevel <= currentLevel) {
                direction = -1;
            } else {
                direction = 1;
            }
            var levelChange = direction * 0.25;
            var newHeight = 0;
            var newTop = 0;
            var id = setInterval(frame, 10);
            function frame() {
                if (currentLevel == targetLevel) {
                    clearInterval(id);
                    flush = false;
                    console.log("Finished moving the water");
                } else {
                    currentLevel += levelChange;
                    currentLevelLabel.value = currentLevel;
                    newHeight = (currentLevel / maximum) * maxSize;
                    newTop = minTop + (maxSize - newHeight);
                    water.style.height = newHeight + 'px';
                    water.style.top = newTop + 'px';
                    checkAlarms();
                }
            }
        } else {
            alert('The set point is outside the range of the tank.');
        }
    }
}