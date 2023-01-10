//create variables for form elemetnts
const resultEl = document.getElementById("output")
const lengthEl = document.getElementById('length')
const lowercaseEl = document.getElementById('lowercase')
const uppercaseEl = document.getElementById('uppercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')
const clearEL = document.getElementById('clear')
const characterAmountRange = document.getElementById('characterAmountRange')
const characterAmountNumber = document.getElementById('characterAmountNumber')

lengthEl.addEventListener('input', syncCharacterAmount)
characterAmountRange.addEventListener('input', syncCharacterAmount)

const randomFunc = {
    lower: getRandomLowercase,
    upper: getRandomUppercase,
    number: getRandomNumber,
    symbol: getRandomsymbol
};

clipboardEl.addEventListener("click", () => {
    const textArea = document.createElement("textarea");
    const password = resultEl.value;
        if (!password){
        alert("No Password Generated")
        return;
        }
        if (password == "Ready"){
        alert("No Password Generated")
        return;
        };
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    alert("password has been copied to your clipboard")
});

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.value = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );
});

clearEL.addEventListener('click', () => {
    resultEl.value = "Ready"
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = "";
    const typesCount = lower + upper + number + symbol;
    console.log(typesCount);
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter((item) => Object.values(item)[0]);
    console.log(typesArr);
    if(typesCount === 0) {
        alert("You must select at least one type")
        return "";
    }

    for(let count = 0; count < length; count += typesCount) {
        typesArr.forEach((type) => {
            //console.log(type);
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    } //end for loop

    const finalPassword = generatedPassword.slice(0, length)
    return finalPassword
}


//create function to generate random text
function getRandomLowercase(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUppercase(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomsymbol(){
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function syncCharacterAmount(e) {
    const value = e.target.value
    lengthEl.value = value
    characterAmountRange.value = value
  }

  function functionAlert(msg, myYes) {
    var confirmBox = $("#confirm");
    confirmBox.find(".message").text(msg);
    confirmBox.find(".yes").unbind().click(function() {
       confirmBox.hide();
    });
    confirmBox.find(".yes").click(myYes);
    confirmBox.show();
 }
 function functionabout(msg, myYes) {
    var confirmBox = $("#aboutus");
    confirmBox.find(".message1").text(msg);
    confirmBox.find(".yes1").unbind().click(function() {
       confirmBox.hide();
    });
    confirmBox.find(".yes1").click(myYes);
    confirmBox.show();
 }
