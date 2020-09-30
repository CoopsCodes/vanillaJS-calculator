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
		this.operation = "";
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

	randomNum(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	updateBackground() {
		document.body.style.background =
			"radial-gradient(rgb(" +
			this.randomNum(0, 255) +
			"," +
			this.randomNum(0, 255) +
			"," +
			this.randomNum(0, 255) +
			"), rgb(" +
			this.randomNum(0, 255) +
			"," +
			this.randomNum(0, 255) +
			"," +
			this.randomNum(0, 255) +
			"))";
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split(".")[0]);
		const decimalDigits = stringNumber.split(".")[1];

		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerDigits.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}

		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}

		// const floatNumber = parseFloat(number);
		// if (isNaN(floatNumber)) return "";
		// return floatNumber.toLocaleString("en");
	}

	updateDisplay() {
		this.currOpTextEl.innerText = this.getDisplayNumber(this.currOperand);
		if (this.operation != null) {
			this.prevOpTextEl.innerText = `${this.getDisplayNumber(
				this.prevOperand
			)} ${this.operation}`;
		} else {
			this.prevOpTextEl.innerText = "";
		}
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
		calculator.updateBackground();
	});
});

equalsButton.addEventListener("click", (button) => {
	calculator.compute();
	calculator.updateDisplay();
	calculator.updateBackground();
});

allClearButton.addEventListener("click", () => {
	calculator.clear();
	calculator.updateDisplay();
	calculator.updateBackground();
});

deleteButton.addEventListener("click", () => {
	calculator.delete();
	calculator.updateDisplay();
	calculator.updateBackground();
});
