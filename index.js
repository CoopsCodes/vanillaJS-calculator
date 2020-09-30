const numberButtons = document.querySelectorAll("[data-number]");
const operandButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const prevOpTextEl = document.querySelector("[data-prev-operand]");
const currOpTextEl = document.querySelector("[data-curr-operand]");

class Calculator {
	constructor(prevOpTextEl, currOpTextEl) {
		this.prevOpTextEl = prevOpTextEl;
		this.currOpTextEl = currOpTextEl;
		this.clear();
	}

	clear() {
		this.currOperand = "";
		this.prevOperand = "";
		this.operation = undefined;
	}

	delete() {}

	appendNumber(number) {
		if (number === "." && this.currOperand.includes(".")) return;
		this.currOperand = this.currOperand.toString() + number.toString();
	}

	chooseOperation(operation) {}

	compute() {}

	updateDisplay() {
		this.currOpTextEl.innerText = this.currOperand;
	}
}

// Instantiating a new instance of Calculator
const calculator = new Calculator(prevOpTextEl, currOpTextEl);

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		console.log(button);
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

allClearButton.addEventListener("click", () => {
	calculator.clear();
	calculator.updateDisplay();
});
