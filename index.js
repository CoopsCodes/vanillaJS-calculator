const numberButtons = document.querySelectorAll("[data-number]");
const operandButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
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

	delete() {
		this.currOperand = this.currOperand.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === "." && this.currOperand.includes(".")) return;
		this.currOperand = this.currOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currOperand === "") return;
		if (this.prevOperand !== "") {
			this.compute();
		}
		this.operation = operation;
		this.prevOperand = this.currOperand;
		this.currOperand = "";
	}

	compute() {
		let computation;
		const prev = parseFloat(this.prevOperand);
		const curr = parseFloat(this.currOperand);
		if (isNaN(prev) || isNaN(curr)) return;
		switch (this.operation) {
			case "+":
				computation = prev + curr;
				break;
			case "-":
				computation = prev - curr;
				break;
			case "*":
				computation = prev * curr;
				break;
			case "÷":
				computation = prev / curr;
				break;

			default:
				return;
		}
		this.currOperand = computation;
		this.operation = undefined;
		this.prevOperand = "";
	}

	updateDisplay() {
		this.currOpTextEl.innerText = this.currOperand;
		this.prevOpTextEl.innerText = this.prevOperand;
	}
}

// Instantiating a new instance of Calculator
const calculator = new Calculator(prevOpTextEl, currOpTextEl);

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operandButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

equalsButton.addEventListener("click", (button) => {
	calculator.compute();
	calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
	calculator.delete();
	calculator.updateDisplay();
});
