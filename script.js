document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let lastOperator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;

            if (value === 'AC') {
                currentInput = '';
                lastOperator = '';
            } else if (value === 'DEL') {
                currentInput = currentInput.slice(0, -1);
            } else if (value === '=') {
                try {
                    currentInput = eval(currentInput).toString();
                    lastOperator = '';
                } catch (error) {
                    currentInput = 'Error';
                }
            } else if (['+', '-', '*', '/', '%'].includes(value)) {
                if (lastOperator) {
                    currentInput = currentInput.slice(0, -1) + value;
                } else {
                    currentInput += value;
                }
                lastOperator = value;
            } else {
                currentInput += value;
                lastOperator = '';
            }

            display.value = currentInput;

            if (!lastOperator && currentInput !== '' && value !== '=' && value !== 'AC' && value !== 'DEL') {
                try {
                    const result = eval(currentInput);
                    if (!isNaN(result) && isFinite(result)) {
                        display.value += ' = ' + result;
                    }
                } catch (error) {
                    // Do nothing if the expression is invalid
                }
            }
        });
    });
});