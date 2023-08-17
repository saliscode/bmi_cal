const form1 = document.getElementById('card') as HTMLElement;
const heightElement1 = document.getElementById('height-weight-input1') as HTMLInputElement;
const weightElement1 = document.getElementById('height-weight-input2') as HTMLInputElement;
const feetElement1 = document.getElementById('double-input1') as HTMLInputElement;
const inchElement1 = document.getElementById('double-input2') as HTMLInputElement;
const stonesElement1 = document.getElementById('double-input3') as HTMLInputElement;
const poundsElement1 = document.getElementById('double-input4') as HTMLInputElement;
const classification1 = document.getElementById('classification') as HTMLElement;
const minWeight1 = document.getElementById('min-weight') as HTMLElement;
const maxWeight1 = document.getElementById('max-weight') as HTMLElement;
const resultElement1 = document.getElementById('output-number') as HTMLElement;
const resultContainer1 = document.getElementById('blue-output') as HTMLElement;
const bmiResult1 = document.getElementById('inner-output') as HTMLElement;
const welcome1 = document.getElementById('welcome') as HTMLElement;

const metricBtn1 = document.getElementById('bmi-input-radio1') as HTMLInputElement;
const imperialBtn1 = document.getElementById('bmi-input-radio2') as HTMLInputElement;

const radioBtns1 = document.querySelectorAll<HTMLInputElement>('input[type="radio"]');

function calculateBmi(e?: Event) {
    if (metricBtn1.classList.contains('active')) {
        const height = parseFloat(heightElement1.value);
        const weight = parseFloat(weightElement1.value);

        bmiResult1.style.display = 'flex';
        welcome1.style.display = 'none';

        const bmi = ((weight / (height * height)) * 10000).toFixed(1);

        const heightM = height / 100;

        const min = (18.5 * heightM * heightM).toFixed(1);
        const max = (24.9 * heightM * heightM).toFixed(1);

        resultElement1.innerText = bmi;
        minWeight1.innerText = `${min}kgs`;
        maxWeight1.innerText = `${max}kgs`;

        if (parseFloat(bmi) < 18.5) {
            classification1.innerText = 'Underweight';
        } else if (parseFloat(bmi) >= 18.5 && parseFloat(bmi) <= 24.9) {
            classification1.innerText = 'Healthy weight';
        } else if (parseFloat(bmi) > 24.9 && parseFloat(bmi) <= 29.9) {
            classification1.innerText = 'Overweight';
        } else {
            classification1.innerText = 'Obese';
        }
    } else {
        const feet = parseInt(feetElement1.value);
        const inch = parseInt(inchElement1.value);
        const st = parseInt(stonesElement1.value);
        const lbs = parseInt(poundsElement1.value);

        bmiResult1.style.display = 'flex';
        welcome1.style.display = 'none';

        const heightInInches = feet * 12 + inch;
        const weightInPounds = st * 14 + lbs;
        const bmi = (
            (703 * weightInPounds) /
            (heightInInches * heightInInches)
        ).toFixed(1);

        resultElement1.innerText = bmi;

        const minOptimalWeightPounds =
            (18.5 * (heightInInches * heightInInches)) / 703;

        const maxOptimalWeightPounds =
            (24.9 * (heightInInches * heightInInches)) / 703;

        const minWeightInStone = Math.floor(minOptimalWeightPounds / 14);
        const minWeightInPounds = Math.floor(minOptimalWeightPounds % 14);

        const maxWeightInStone = Math.floor(maxOptimalWeightPounds / 14);
        const maxWeightInPounds = Math.floor(maxOptimalWeightPounds % 14);

        // Convert optimal weight to a single value in stones and pounds
        const optimalWeightValueInStone = Math.floor(
            (minOptimalWeightPounds + maxOptimalWeightPounds) / 2 / 14
        );
        const optimalWeightValueInPounds = Math.floor(
            ((minOptimalWeightPounds + maxOptimalWeightPounds) / 2) % 14
        );

        minWeight1.innerText = `${minWeightInStone}st ${minWeightInPounds}lbs`;
        maxWeight1.innerText = `${maxWeightInStone}st ${maxWeightInPounds}lbs`;

        if (parseFloat(bmi) < 18.5) {
            classification1.innerText = 'Underweight';
        } else if (parseFloat(bmi) >= 18.5 && parseFloat(bmi) <= 24.9) {
            classification1.innerText = 'Healthy weight';
        } else if (parseFloat(bmi) > 24.9 && parseFloat(bmi) <= 29.9) {
            classification1.innerText = 'Overweight';
        } else {
            classification1.innerText = 'Obese';
        }
    }
}

radioBtns1.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if ((e.target as HTMLInputElement).value === 'imperial') {
           let inputContainer1 = document.querySelector('.input-container-1') as HTMLElement;
           inputContainer1.style.display = 'none';
           let inputContainer2 = document.querySelector('.input-container-2') as HTMLElement
            inputContainer2.style.display = 'block';

            let targetElement = e.target as HTMLElement;
            targetElement.classList.add('active');
            metricBtn1.classList.remove('active');
        } else {
            let inputContainer1 = document.querySelector('.input-container-1') as HTMLElement 
            inputContainer1.style.display = window.innerWidth < 480 ? 'block' : 'flex';
            let inputContainer2= document.querySelector('.input-container-2') as HTMLElement
            inputContainer2.style.display = 'none';
            imperialBtn1.classList.remove('active');

            let targetElement = e.target as HTMLElement;
            targetElement.classList.add('active');
        }
    });
});

form1.addEventListener('keydown', (e: KeyboardEvent) => {
    if (
        (e.key === 'Enter' && heightElement1.value !== '' && weightElement1.value !== '') ||
        (e.key === 'Enter' &&
            feetElement1.value !== '' &&
            (inchElement1.value !== '' && stonesElement1.value !== '' && poundsElement1.value !== '')
    )
    ){
        e.preventDefault();
        calculateBmi();
    }
});

