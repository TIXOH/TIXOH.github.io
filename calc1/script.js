var Calc = function () {

    this.buttons = [];
    this.firstNumber = null;
    this.secondNumber = null;
    this.operator = null;
    this.resultGetted = false;
    this.result = null;

    this.signBtn = document.createElement('button');
    this.signBtn.innerHTML = '+/-';

    this.resultBtn = document.createElement('button');
    this.resultBtn.innerHTML = '=';

    this.plusBtn = document.createElement('button');
    this.plusBtn.innerHTML = '+';
    this.plusBtn.dataset.operation = '+';

    this.minusBtn = document.createElement('button');
    this.minusBtn.innerHTML = '-';
    this.minusBtn.dataset.operation = '-';

    this.multiBtn = document.createElement('button');
    this.multiBtn.innerHTML = '*';
    this.multiBtn.dataset.operation = '*';

    this.divideBtn = document.createElement('button');
    this.divideBtn.innerHTML = '/';
    this.divideBtn.dataset.operation = '/';

    this.dotBtn = document.createElement('button');
    this.dotBtn.innerHTML = '.';
    this.dotBtn.dataset.operation = '.';

    this.cleanerBtn = document.createElement('button');
    this.cleanerBtn.classList.add('cleaner');
    this.cleanerBtn.innerHTML = "CLEANER";

    //создаем кнопки 0 - 9 и пушим в массив
    for (let i = 0; i < 10; i++) {
        let numberBtn = document.createElement('button');
        numberBtn.innerHTML = i;
        numberBtn.dataset.number = i;
        numberBtn.addEventListener('click', this.addNumberOnScreen.bind(this));
        this.buttons.push(numberBtn);
    }

    this.divideBtn.addEventListener('click', this.getOperation.bind(this));
    this.plusBtn.addEventListener('click', this.getOperation.bind(this));
    this.multiBtn.addEventListener('click', this.getOperation.bind(this));
    this.minusBtn.addEventListener('click', this.getOperation.bind(this));
    this.signBtn.addEventListener('click', this.changeSign.bind(this));
    this.dotBtn.addEventListener('click', this.addDotOnScreen.bind(this));
    this.resultBtn.addEventListener('click', this.getResult.bind(this));
    this.cleanerBtn.addEventListener('click', this.clearAll.bind(this));

    this.init();
};

Calc.prototype.init = function () {

    //оболочка калькулятора
    this.calc = document.createElement('div');
    this.calc.classList.add('calc');
    document.querySelector('body').insertBefore(this.calc, this.lastChild);
    //оболочка калькулятора-экран вывода
    this.screenEl = document.createElement('div');
    this.screenEl.classList.add('screen');
    this.calc.appendChild(this.screenEl);
    //оболочка калькулятора-блок кнопок
    this.btnsBlock = document.createElement('div');
    this.calc.appendChild(this.btnsBlock);
    //оболочка калькулятора-блок кнопок-верхний ряд
    this.firstLine = document.createElement('div');
    this.firstLine.classList.add('first-line');
    this.btnsBlock.appendChild(this.firstLine);
    //оболочка калькулятора-блок кнопок-верхний ряд-кнопки
    this.firstLine.appendChild(this.cleanerBtn);
    this.firstLine.appendChild(this.divideBtn);
    //оболочка калькулятора-блок кнопок-блок остальных кнопок
    this.btns = document.createElement('div');
    this.btns.classList.add('btns');
    this.btnsBlock.appendChild(this.btns);

    //оболочка калькулятора-блок кнопок-блок остальных кнопок-кнопки
    this.createNumberButtonsFromTo(1, 3);
    this.btns.appendChild(this.multiBtn);
    this.createNumberButtonsFromTo(4, 6);
    this.btns.appendChild(this.minusBtn);
    this.createNumberButtonsFromTo(7, 9);
    this.btns.appendChild(this.plusBtn);
    this.btns.appendChild(this.signBtn);
    this.btns.appendChild(this.buttons[0]);
    this.btns.appendChild(this.dotBtn);
    this.btns.appendChild(this.resultBtn);
};

Calc.prototype.getResult = function () {
    this.getSecondOperand();
    this.clearScreen();
    switch (this.operator) {
        case '+':
            this.result = Number((this.firstNumber + this.secondNumber).toFixed(4));
            break;
        case '-':
            this.result = Number((this.firstNumber - this.secondNumber).toFixed(4));
            break;
        case '*':
            this.result = Number((this.firstNumber * this.secondNumber).toFixed(4));;
            break;
        case '/':
            this.result = Number((this.firstNumber / this.secondNumber).toFixed(4));;
            break;
    }
    this.screenEl.innerHTML = this.result;
    this.clearData();
};

Calc.prototype.clearAll = function () {
    this.clearData();
    this.clearScreen();
};

Calc.prototype.clearData = function () {
    this.firstNumber = null;
    this.secondNumber = null;
    this.operator = null;
    this.resultGetted = true;
};

Calc.prototype.clearScreen = function () {
    this.screenEl.innerHTML = '';
};

Calc.prototype.changeSign = function () {
    this.screenEl.innerHTML = -Number(this.screenEl.innerHTML);
};

Calc.prototype.addDotOnScreen = function () {
    this.screenEl.innerHTML += '.';
};

Calc.prototype.getFirstOperand = function () {
    this.firstNumber = Number(this.screenEl.innerHTML);
};

Calc.prototype.getSecondOperand = function () {
    this.secondNumber = Number(this.screenEl.innerHTML);
};

Calc.prototype.addNumberOnScreen = function (e) {
    if (this.resultGetted) {
        this.clearScreen();
        this.resultGetted = false;
    }
    this.screenEl.innerHTML += e.currentTarget.dataset.number;
};

Calc.prototype.getOperation = function (e) {
    this.operator = e.currentTarget.dataset.operation;
    this.getFirstOperand();
    this.clearScreen();
};

Calc.prototype.createNumberButtonsFromTo = function (from, to) {
    for (var i = from; i < to + 1; i++) {
        this.btns.appendChild(this.buttons[i]);
    }
};

let c = new Calc();
let c1 = new Calc();