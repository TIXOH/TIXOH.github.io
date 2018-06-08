/*//input'ы для ввода чисел
var firstNumber = document.querySelector('#number1');
var secondNumber = document.querySelector('#number2');
//массив кнопок + - / * 
var btnsEl = document.querySelectorAll('.btn');
//div для вывода результата вычисления
var resultEl = document.querySelector('.result');

for (var i = 0; i < btnsEl.length; i++) {
    btnsEl[i].addEventListener('click', operation);
}
function operation() {
    var x = Number(firstNumber.value);
    var y = Number(secondNumber.value);
    var result = null;
    if (x && y) {
        switch (this.dataset.operation) {
            case '+':
                result = x + y;
                break;
            case '-':
                result = x - y;
                break;
            case '*':
                result = x * y;
                break;
            case '/':
                result = x / y;
                break;
        }
        resultEl.innerHTML = result;
    } else {
        resultEl.innerHTML = 'Need 2 numbers';
    }
}*/
//-------------------------------------------------

/*
var firstNumber = document.querySelector('#number1');
var secondNumber = document.querySelector('#number2');
var selectorEl = document.querySelector('#operations');
var btnEl = document.querySelector('.btn');
var resultEl = document.querySelector('.result');

btnEl.addEventListener('click', operation);

function operation() {
    var x = Number(firstNumber.value);
    var y = Number(secondNumber.value);
    var result = null;
    if (x && y) {
        switch (selectorEl.value) {
            case '+':
                result = x + y;
                break;
            case '-':
                result = x - y;
                break;
            case '*':
                result = x * y;
                break;
            case '/':
                result = x / y;
                break;
        }
        resultEl.innerHTML = result;
    } else {
        resultEl.innerHTML = 'Need 2 numbers';
    }
}
*/
var btnsNumber = document.querySelectorAll('.btn-number');
var btnsOper = document.querySelectorAll('.btn-operation');
var screenEl = document.querySelector('.screen');
var btnCleaner = document.querySelector('#cleaner');
var btnResult = document.querySelector('#result');
var btnFloat = document.querySelector('#floatBtn');
var btnSignChange = document.querySelector('#sign-changer');

var frstNumber = null;
var scndNumber = null;
var operation = null;
var resultGetted = false;


btnCleaner.addEventListener('click', clearScreen);

for (var i = 0; i < btnsNumber.length; i++) {
    btnsNumber[i].addEventListener('click', addNumberOnScreen);
}

btnSignChange.addEventListener('click', changeSign);

btnFloat.addEventListener('click', function () {
    screenEl.innerHTML += '.';
});

for (var i = 0; i < btnsOper.length; i++) {
    btnsOper[i].addEventListener('click', operationButtonClickListener);
}

btnResult.addEventListener('click', resultButtonClickListener);

function getNumber(element) {
    return element.dataset.number;
}

function addNumberOnScreen() {
    if (resultGetted) {
        clearScreen();
        resultGetted = false;
    }
    var newNumber = getNumber(this);
    screenEl.innerHTML += newNumber;
}

function clearScreen() {
    screenEl.innerHTML = '';
}

function getFsrtOperand() {
    frstNumber = Number(screenEl.innerHTML);
}

function getOperation() {
    switch (operation) {
        case '+':
            screenEl.innerHTML = Number((frstNumber + scndNumber).toFixed(4));
            break;
        case '-':
            screenEl.innerHTML = Number((frstNumber - scndNumber).toFixed(4));
            break;
        case '*':
            screenEl.innerHTML = Number((frstNumber * scndNumber).toFixed(4));;
            break;
        case '/':
            screenEl.innerHTML = Number((frstNumber / scndNumber).toFixed(4));;
            break;
    }
}

function clearAllData() {
    frstNumber = null;
    scndNumber = null;
    operation = null;
}

function operationButtonClickListener() {
    getFsrtOperand();
    clearScreen();
    operation = this.dataset.operation;
    console.log(operation);
}

function resultButtonClickListener() {
    scndNumber = Number(screenEl.innerHTML);
    clearScreen();
    getOperation();
    resultGetted = true;
    clearAllData();
    console.log(frstNumber);
    console.log(scndNumber);
}

function changeSign() {
    screenEl.innerHTML = -Number(screenEl.innerHTML);
}