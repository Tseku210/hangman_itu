const startButton = document.querySelector("#startButton");
const words = ["нохой", "муур", "жавхлан", "машин", "цуйван", "хуушуур", "монгол", "орос"];
const hints = ["Хүний үнэнч нөхөр?", "Багалзуурдагч?", "Хөөрхөн багш?", "Түгжрээ үүсгэгч?", "Сэгсэрдэг хоол?", "Хайрдаг хоол?", "Таны улс?", "Архичин улс?"]
const restartButton = document.querySelector("#restart");
const letters = document.querySelector("#letters");
const alphas = document.querySelectorAll(".alpha");
const alphabets = document.querySelector("#alphabets");
const hangman = document.querySelector("#hangman");
const hintTag = document.querySelector("#hintWord");

let img = document.querySelector("#hangmanImg");

let answer = "";
let guessed = [];
let mistakes = 0;
let indexes = [];
let hint = "";

alphas.forEach(alpha => {
    alpha.addEventListener("click", (e) => {
        let guess = e.target.innerHTML;
        handleGuess(guess);

        e.target.setAttribute("disabled", "");
        guessed.push(guess);

        if (check(guess)){
            // for(let i = 0; i < indexes.length; i++){
            //     underscores.forEach(underscore => {
            //         if (underscore.dataset.i == indexes[i]){
            //             underscore.classList.remove(".underscore");
            //             underscore.innerHTML = guess;
            //         }
            //     })
            // }
            resetRender();
            render();
            checkIfGameWon();
        } else if (!check(guess)){
            mistakes++;
            switch(mistakes){
                case 0:
                    img.src = "images/clear.png";
                    break;
                case 1:
                    img.src = "images/hangmanBottom.png";
                    break;
                case 2:
                    img.src = "images/hangmanVertical.png";
                    break;
                case 3:
                    img.src = "images/hangmanHorizontal.png";
                    break;
                case 4:
                    img.src = "images/hangmanHead.png";
                    break;
                case 5:
                    img.src = "images/hangmanBody.png";
                    break;
                case 6:
                    img.src = "images/hangmanArm.png";
                    break;
                case 7:
                    img.src = "images/hangmanrightArm.png";
                    break;
                case 8:
                    img.src = "images/hangmanrightLeg.png";
                    break;
                case 9: 
                    img.src = "images/hangmanFull.png";
                    break;
            }
            if (mistakes == 9){
                endGame();
            }
        }

    });
})
function checkIfGameWon(){
    let count = 0;
    letters.childNodes.forEach(node =>  {
        if (node.classList.contains("underscore")){
            count++;
        }
    })
    if (count === 0){
        alphabets.classList.add("hidden");
        resetRender();
        let win = document.createElement("h1");
        win.id = "win";
        win.innerHTML = "You win!"
        letters.appendChild(win);
        // img.src = "images/hangmanFull.png";
        img.classList.add("hidden");
        letters.classList.add("width");
    }
}
function endGame(){
    alphabets.classList.add("hidden");
    resetRender();
    let lost = document.createElement("h1");
    lost.id = "lose";
    lost.innerHTML = "You lose!"
    letters.appendChild(lost);
    // img.classList.add("hidden");
}
function check(alpha){
    for (let i = 0; i < answer.length; i++){
        if (alpha.toLowerCase() == answer[i].toLowerCase()){
            return true;
        }
    }
    return false;
}

function handleGuess(alpha){
    for (let i = 0; i < answer.length; i++){
        if (alpha.toLowerCase() == answer[i].toLowerCase()){
            indexes.push(i);
        }
    }
}

startButton.addEventListener("click", () => {
    // document.querySelector("#container").classList.add("hidden");
    document.querySelector("#img").classList.add("animation");
    document.querySelector("#container").classList.add("animationBlack")
    setTimeout(function() {
        document.querySelector("#pregame").style.display = "none";
        document.querySelector("#game").style.display = "flex";
    }, 1000)
    alphas.forEach(alpha => {
        alpha.disabled = false;
    })

    img.classList.remove("hidden");
    alphabets.classList.remove("hidden");
    letters.classList.remove("width");

    img.src = "images/clear.png";
    guessed = [];
    indexes = [];
    mistakes = 0;
    generateRandomWord();
    resetRender();
    render();
})
restartButton.addEventListener("click", () => {
    alphas.forEach(alpha => {
        alpha.disabled = false;
    })

    img.classList.remove("hidden");
    alphabets.classList.remove("hidden");
    letters.classList.remove("width");

    img.src = "images/clear.png";
    guessed = [];
    indexes = [];
    mistakes = 0;
    generateRandomWord();
    resetRender();
    render();
})
function resetRender(){
    let letters = document.querySelector("#letters")
    while (letters.firstChild){
        letters.removeChild(letters.firstChild);
    }
}
function generateRandomWord(){
    const random = Math.floor(Math.random() * words.length);
    answer = words[random];
    hint = hints[random];
}
function render(){
    for (let i = 0; i < answer.length; i++){
        let underscore = document.createElement("div");
        underscore.dataset.index = i;
        if (guessed.indexOf(answer[i]) >= 0){
            underscore.innerHTML = answer[i];
        } else {
            underscore.classList.add("underscore");
        }
        letters.appendChild(underscore);
    }
    hintTag.innerHTML = "Асуулт: " + hint;
}