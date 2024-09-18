document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let lastOperator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => handleButtonClick(button.dataset.value));
    });

    // Handle keyboard input
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if ('0123456789+-*/%'.includes(key)) {
            handleButtonClick(key);
        } else if (key === 'Enter') {
            handleButtonClick('=');
        } else if (key === 'Backspace') {
            handleButtonClick('DEL');
        } else if (key === 'Escape') {
            handleButtonClick('AC');
        }
    });

    function handleButtonClick(value) {
        if (value === 'AC') {
            currentInput = '';
            lastOperator = '';
        } else if (value === 'DEL') {
            currentInput = currentInput.slice(0, -1);
        } else if (value === '=') {
            if (currentInput) { // Only evaluate if there's input
                try {
                    currentInput = eval(currentInput).toString();
                    lastOperator = '';
                } catch (error) {
                    currentInput = 'Error';
                }
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

        // Display result in a more elegant way
        if (!lastOperator && currentInput !== '' && value !== '=' && value !== 'AC' && value !== 'DEL') {
            try {
                const result = eval(currentInput);
                if (!isNaN(result) && isFinite(result)) {
                    // Only show result if '=' was pressed
                    if (value === '=') {
                        display.value += ' = ' + result;
                    }
                }
            } catch (error) {
                // Do nothing if the expression is invalid
            }
        }
    }
});