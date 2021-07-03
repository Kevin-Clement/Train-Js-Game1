const canvas = document.getElementById("canvas");
const score = document.getElementById("score");
const days = document.getElementById("days");
const endScreen = document.getElementById("endScreen");
const numberVirus = document.getElementById("numberVirus");

daysLeft = 50;
gameOverNumber = 20;
loopPlay = false;

function start() {
    count = 0;
    getFaster = 5000;
    daysRemaining = daysLeft;

    canvas.innerHTML = "";
    score.innerHTML = count;
    days.innerHTML = daysRemaining;

    // make sure to not play loot several times
    loopPlay ? '' : game();
    loopPlay = true;

    function game() {
        let randomTime = Math.round(Math.random() * getFaster);
        
        getFaster > 700 ? getFaster = (getFaster * 0.90) : '';


        setTimeout(() => {
            if(daysRemaining === 0){
                youWin();
            }else if(canvas.childElementCount < gameOverNumber){
                virusPop();
                game();
            }else{
                gameOver();
            }
        }, randomTime);
        
        numberVirus.innerHTML = `${canvas.childElementCount}`
        console.log(canvas.childElementCount)
    }

    const gameOver = () => {
        endScreen.innerHTML = `<div class = "gameOver">Game over <br/>Score : ${count}</div>`;
        endScreen.style.visibility = "visible";
        endScreen.style.opacity = "1";
        loopPlay = false;
    }
    
    
    const youWin = () => {
        let accuracy = Math.round(count / daysLeft * 100);
        endScreen.innerHTML = `<div class = "youWin">Bravo ! Tu as atomisé cette merde<br/><span>Précision : ${accuracy}%</span></div>`;
        endScreen.style.visibility = "visible";
        endScreen.style.opacity = "1";
        loopPlay = false;

        if(accuracy < 60){
            gameOver();
        }
        
    }
    
}

function virusPop () {
    let virus = new Image();

    virus.src = "media/basic-pics/virus.png"

    virus.classList.add("virus");
    virus.style.top = Math.random() * 350 + "px";
    virus.style.left = Math.random() * 450 + "px";
    
    let x, y;
    x = y = (Math.random() * 70) + 50;
    virus.style.setProperty("--x", `${x}px`);
    virus.style.setProperty("--y", `${y}px`);

    let plusMinus = Math.random() < 0.5 ? -1 : 1;
    let trX = Math.random() * 3000 * plusMinus;
    let trY = Math.random() * 3000 * plusMinus;
    virus.style.setProperty("--trX", `${ trX }%`);
    virus.style.setProperty("--trY", `${ trY }%`);

    
    canvas.appendChild(virus);

}

// remove element clicked
document.addEventListener("click", function(e){
    let targetElement = e.target 
    
    if(targetElement.classList.contains("virus")){
        targetElement.remove();
        count++;
        score.innerHTML = count;
    };
})



// countdown click
canvas.addEventListener("click", () => {
    if(daysRemaining > 0){
        daysRemaining--;
        days.innerHTML = daysRemaining
    }
})

//hide screen on click
endScreen.addEventListener("click", () => {
    setTimeout(() => {
        start();
    endScreen.style.opacity = "0";
    endScreen.style.visibility = "hidden";
    }, 3500)
});
