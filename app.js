var form = document.getElementById('card');
var heightElement = document.getElementById('height-weight-input1');
var weightElement = document.getElementById('height-weight-input2');
var feetElement = document.getElementById('double-input1');
var inchElement = document.getElementById('double-input2');
var stonesElement = document.getElementById('double-input3');
var poundsElement = document.getElementById('double-input4');
var classification = document.getElementById('classification');
var minWeight = document.getElementById('min-weight');
var maxWeight = document.getElementById('max-weight');
var resultElement = document.getElementById('output-number');
var resultContainer = document.getElementById('blue-output');
var bmiResult = document.getElementById('inner-output');
var welcome = document.getElementById('welcome');
var metricBtn = document.getElementById('bmi-input-radio1');
var imperialBtn = document.getElementById('bmi-input-radio2');
var radioBtns = document.querySelectorAll('input[type="radio"]');
function calculateBMI(e) {
    if (metricBtn.classList.contains('active')) {
        var height = parseFloat(heightElement.value);
        var weight = parseFloat(weightElement.value);
        bmiResult.style.display = 'flex';
        welcome.style.display = 'none';
        var bmi = ((weight / (height * height)) * 10000).toFixed(1);
        var heightM = height / 100;
        var min = (18.5 * heightM * heightM).toFixed(1);
        var max = (24.9 * heightM * heightM).toFixed(1);
        resultElement.innerText = bmi;
        minWeight.innerText = "".concat(min, "kgs");
        maxWeight.innerText = "".concat(max, "kgs");
        if (parseFloat(bmi) < 18.5) {
            classification.innerText = 'Underweight';
        }
        else if (parseFloat(bmi) >= 18.5 && parseFloat(bmi) <= 24.9) {
            classification.innerText = 'Healthy weight';
        }
        else if (parseFloat(bmi) > 24.9 && parseFloat(bmi) <= 29.9) {
            classification.innerText = 'Overweight';
        }
        else {
            classification.innerText = 'Obese';
        }
    }
    else {
        var feet = parseInt(feetElement.value);
        var inch = parseInt(inchElement.value);
        var st = parseInt(stonesElement.value);
        var lbs = parseInt(poundsElement.value);
        bmiResult.style.display = 'flex';
        welcome.style.display = 'none';
        var heightInInches = feet * 12 + inch;
        var weightInPounds = st * 14 + lbs;
        var bmi = ((703 * weightInPounds) /
            (heightInInches * heightInInches)).toFixed(1);
        resultElement.innerText = bmi;
        var minOptimalWeightPounds = (18.5 * (heightInInches * heightInInches)) / 703;
        var maxOptimalWeightPounds = (24.9 * (heightInInches * heightInInches)) / 703;
        var minWeightInStone = Math.floor(minOptimalWeightPounds / 14);
        var minWeightInPounds = Math.floor(minOptimalWeightPounds % 14);
        var maxWeightInStone = Math.floor(maxOptimalWeightPounds / 14);
        var maxWeightInPounds = Math.floor(maxOptimalWeightPounds % 14);
        // Convert optimal weight to a single value in stones and pounds
        var optimalWeightValueInStone = Math.floor((minOptimalWeightPounds + maxOptimalWeightPounds) / 2 / 14);
        var optimalWeightValueInPounds = Math.floor(((minOptimalWeightPounds + maxOptimalWeightPounds) / 2) % 14);
        minWeight.innerText = "".concat(minWeightInStone, "st ").concat(minWeightInPounds, "lbs");
        maxWeight.innerText = "".concat(maxWeightInStone, "st ").concat(maxWeightInPounds, "lbs");
        if (parseFloat(bmi) < 18.5) {
            classification.innerText = 'Underweight';
        }
        else if (parseFloat(bmi) >= 18.5 && parseFloat(bmi) <= 24.9) {
            classification.innerText = 'Healthy weight';
        }
        else if (parseFloat(bmi) > 24.9 && parseFloat(bmi) <= 29.9) {
            classification.innerText = 'Overweight';
        }
        else {
            classification.innerText = 'Obese';
        }
    }
}
radioBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        if (e.target.value === 'imperial') {
            document.querySelector('.input-container-1').style.display = 'none';
            document.querySelector('.input-container-2').style.display = 'block';
            e.target.classList.add('active');
            metricBtn.classList.remove('active');
        }
        else {
            document.querySelector('.input-container-1').style.display = window.innerWidth < 480 ? 'block' : 'flex';
            document.querySelector('.input-container-2').style.display = 'none';
            imperialBtn.classList.remove('active');
            e.target.classList.add('active');
        }
    });
});
form.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' && heightElement.value !== '' && weightElement.value !== '') ||
        (e.key === 'Enter' &&
            feetElement.value !== '' &&
            ((inchElement.value !== '') !== stonesElement.value) !== '' &&
            poundsElement.value !== '')) {
        e.preventDefault();
        calculateBMI();
    }
});
