// OPERATORS FUNCTIONS
function add(a , b)
{
    return a + b;
}

function substract(a , b)
{
    return a - b;
}

function multiply(a , b)
{
    return a * b
}

function divide(a , b)
{
    if(b == 0)
    {
        alert("Can't divide by zero")
        return 0
    }
    return Math.round((a / b) * 10000000) / 10000000
}

function modulos(a , b)
{
    return a % b
}

// Function to call OPERATORS FUNCTIONS
function operating(leftNum , operator , rightNum)
{
    switch(operator)
    {
        case "+":
            return add(leftNum , rightNum)
        case "-":
            return substract(leftNum , rightNum)
        case "*":
            return multiply(leftNum , rightNum)
        case "/":
            return divide(leftNum , rightNum)
        case "%":
            return modulos(leftNum , rightNum)
    }
}


// Get Calculator components
const operatorButtons = document.querySelectorAll(".operator");
const modeButtons = document.querySelectorAll(".mode");
const numberButtons = document.querySelectorAll(".number");
const equalButton = document.querySelector(".equal");
const screen = document.querySelector("#calculator-screen");

let equationArray = [] /* the array that will be the equation*/

let num = "" /* What user clicks (number) */



// When user click equal
equalButton.addEventListener("click" , (event) => {
    // Only when there are already a number and an operator e.g. [8 , " + "]
    if(equationArray.length === 2)
    {

        equationArray.push(Number(num)); /* push number to array e.g. [8 , "+" , 8] */
        let strToCalculate = operating(Number(equationArray[0]) , equationArray[1] , Number(equationArray[2]));
        num = strToCalculate
        // Empty array and push the last calculated value to it
        equationArray.length = 0
        // e.g. [16]
        equationArray.push(strToCalculate);
        screen.textContent = num
        
    }
})

// When mode buttons are clickes
modeButtons.forEach(button => {
    button.addEventListener("click" , (event) => {
        // Get mode clicked
        const mode = event.target.textContent
        if(mode == "AC")
        {
            // Reset
            window.location.reload()
        }
        else if (mode == "+/-")
        {
            // If A change of signs occur
            let currentDisplayedNumber = screen.textContent
            currentDisplayedNumber = Number(-currentDisplayedNumber)
            num = currentDisplayedNumber
            screen.textContent = currentDisplayedNumber
        }
        else if (mode == ".")
        {

            let currentDisplayedNumber = screen.textContent
            if (currentDisplayedNumber.includes("."))
            {
                alert("there is already a point in your number")
            }
            else
            {
                currentDisplayedNumber = num + "."
                num = currentDisplayedNumber
                screen.textContent = currentDisplayedNumber    
            }

        }

    })
})

// When number is clicked
numberButtons.forEach(button => {
    button.addEventListener("click" , (event) => {
        // if screen.textContent = 0 empty num
        if(screen.textContent == "0")
        {
            num = ""
        }

        // Form number as a string then cast it to number
        num += event.target.textContent;
        num = num

        // display it
        screen.textContent = num
    })
})

// When an operator is clicked
operatorButtons.forEach(operator => {
    operator.addEventListener("click" , (event) => {
        // When user try to add operator after another one 
        if(equationArray.length === 2 && num === "")
        {
            console.log("Please enter a number")
        }
        else if(equationArray.length === 2 && num !== "") /* When there are two elements and user wants to add the third number e.g. [8 , "+" , Here] */
        {
            // Push number to array
            equationArray.push(Number(num));
            num = "";

            let strToCalculate = operating(Number(equationArray[0]) , equationArray[1] , Number(equationArray[2]));
            
            // Empty array and then push the calculated number and then push the clicked operator
            equationArray.length = 0
            equationArray.push(strToCalculate);
            equationArray.push(event.target.textContent);
            // e.g. num = 8 , operator is + , [8 , "+"] -> [8 , "+" , 8] -> operating() = 16 -> [16 , "+"] 
            screen.textContent = equationArray[0]
        }
        else if (equationArray.length == 1 && num !== "") /* When user want to add the first operator */
        {
            equationArray.push(event.target.textContent)
            num = ""
        }
        else if (equationArray.length == 0) /* When first number is added*/
        {

            equationArray.push(Number(num));
            num = "";
            equationArray.push(event.target.textContent)
        }
    })
})












