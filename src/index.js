const cards = document.querySelectorAll('.flipcard');
// const cardsArray = Array.from(cards);
const scoreHolder = document.querySelector(".score-holder");
const time = document.querySelector('.time-holder');
const startButton = document.getElementById('startbtn');
const move = document.querySelector('.moves');

const totalmoves = document.getElementById('total-moves');
const totalscore = document.getElementById('total-score');

const winPopup = document.getElementById("win-popup-container");
const losePopup = document.getElementById('popup-container');

const winplayAgain = document.getElementById('win-play-again');
const loseplayAgain = document.getElementById('lose-play-again');


let FlippedCards = [];

let finalScore = 120;

let score = 0;
let totalScore;
let totalMoves;
const scoreIncrement = 20;
let countdown = 20;


let movesMade = 0;

let timer;


function shuffle(){
    cards.forEach(card => {
        let randomIndex = Math.floor(Math.random() * cards.length);
        card.style.order = randomIndex;
    });
}

const disableCard = () =>{
    cards.forEach(card => card.setAttribute("disabled", ""));
};

const enableCard = () =>{
    cards.forEach(card => card.removeAttribute("disabled"));
};

const removeFlip = () =>{
    FlippedCards.forEach((card) => card.classList.remove("flip"));
    
};

const removeAllFlip = () =>{
    setTimeout(() =>{
        cards.forEach((card) => card.classList.remove("flip"));
    }, 1500);
    
};

const CardFlip = () =>{
    cards.forEach(card => card.addEventListener('click', () =>{
        if(!card.classList.contains('flip')){
            movesMade++;
            move.textContent = `${movesMade}`;
            card.classList.add('flip');
            FlippedCards.push(card);

            if(FlippedCards.length === 2){
                const [card1, card2] = FlippedCards;
                if(card1.dataset.id === card2.dataset.id){
                    score += scoreIncrement;
                    scoreHolder.textContent = `${score}`;
                    console.log("matched");
                    console.log(FlippedCards);
                    FlippedCards = [];
                    console.log(FlippedCards);
                    won();
                    
                }else{
                    disableCard();
                    console.log(FlippedCards);
                    setTimeout(() => {
                        removeFlip();
                        enableCard();
                        FlippedCards = [];
                        console.log(FlippedCards);
                      }, 600);
                }
            }


        }
    }));
}

const endgame = () =>{
    removeAllFlip();
    disableCard();
    score = 0;
    movesMade = 0;
    countdown = 20;
    setInterval(() =>{       
        scoreHolder.textContent = `${score}`;
        time.textContent = `${countdown}`;
        move.textContent = `${movesMade}`;
    }, 1000);
    

}


let DisplayTime  = () =>{
    time.textContent = `${countdown}`;
}

DisplayTime();

const startgame = () =>{
    enableCard();
    startButton.classList.add('disabled');
    shuffle();
    CardFlip();
}

const won = () =>{
    if(score === finalScore){
        clearInterval(timer);
        setTimeout(() =>{
            winPopup.style.display = "flex";    
        }, 900);
        endgame();
    }
}

const lose = () =>{
    totalScore = score;
    totalMoves = movesMade;
    clearInterval(timer);
    losePopup.style.display = "flex";
    totalmoves.textContent = `${totalMoves}`;
    totalscore.textContent = `${totalScore}`;
    endgame();
}

startButton.onclick = () =>{
    startgame();
    timer = setInterval(() =>{
        countdown--;
        time.textContent = `${countdown}`;
        if(countdown === 0){
            clearInterval(timer);
            lose();
        }
    }, 1000);
}

winplayAgain.onclick = () =>{
    setTimeout(() =>{
        winPopup.style.display = 'none';
        startButton.classList.remove('disabled');
    },500)

}
loseplayAgain.onclick = () =>{
    setTimeout(() =>{
        losePopup.style.display = 'none';
        startButton.classList.remove('disabled');
    },500)
        
    
}

