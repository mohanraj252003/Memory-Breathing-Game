let cardList = [
    "akaza",
    "giyu",
    "inosuke",
    "nezuko",
    "rengoku",
    "tanjiro1",
    "tanjiro2",
    "zenitsu"
];

let board = [];
var cardSet;
let rows = 4;
let cols = 4;
var card1Selected, card2Selected;
let total = 0;
let error = 0;

window.onload = function() {
    ShuffleCards()
    gameStart()
}

//Shuffle the cards
let cardIdx = 0;

function ShuffleCards() {
    cardSet = cardList.concat(cardList);
    for(i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length)
        let temp = cardSet[i]
        cardSet[i] = cardSet[j]
        cardSet[j] = temp
    }
}

function gameStart() {
    for(r = 0; r < rows; r++) {
        let row = [];
        for(c = 0; c < cols; c++) {
            let cardImg = cardSet.pop()
            row.push(cardImg)
            let card = document.createElement("img")
            card.id = r.toString() + "-" + c.toString()
            card.src = "asset/" + cardImg + ".jpg"
            card.classList.add("card")
            card.addEventListener("click", flipCard)
            document.getElementById("board").append(card)
        }   
        board.push(row)
    }
    setTimeout(hideCards, 1500);
}

function hideCards() {
    for(r = 0; r<rows; r++){
        for(c = 0; c<cols; c++){
            let card = document.getElementById(r.toString() + "-" + c.toString())
            card.src = "asset/back.jpg"
        }
    }
}

function flipCard() {
    if(this.src.includes("asset/back.jpg")) {
        if(!card1Selected){
            card1Selected = this;
            let coords = card1Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            card1Selected.src = "asset/" + board[r][c] + ".jpg";
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;
            let coords = card2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            card2Selected.src = "asset/" + board[r][c] + ".jpg";
        
            // Check if cards match
            if (card1Selected.src === card2Selected.src) {
                total++;
                card1Selected = null;
                card2Selected = null;
        
                if (total === 8) {
                    showErrorImage(total); // Show win image
            
                    setTimeout(() => {
                        if (confirm("You win! Play again?")) {
                            window.location.reload();
                        } else {
                            window.location.href = "index.html";
                        }
                    }, 3000); // Wait for 3 seconds before showing confirm
                }
            } else {
                // Only increment error if cards don't match
                error++;
                document.getElementById("errors").textContent = error;
        
                if (error === 3 || error === 6 || error === 9) {
                    setTimeout(() => showErrorImage(error), 1000);
                }
        
                setTimeout(update, 1000);
            }
        }
    }
}

function update() {
    if(card1Selected.src != card2Selected.src){
        card1Selected.src = "asset/back.jpg";
        card2Selected.src = "asset/back.jpg";
    }
    card1Selected = null;
    card2Selected = null;
}

function backBtn() {
    window.location.href = "index.html";
}

function showErrorImage(errorCount) {
    let imageSrc = "";
    let confettiSrc = "";
    if (errorCount === 3) imageSrc = "asset/lose1.jpg";
    else if (errorCount === 6) imageSrc = "asset/lose2.jpg";
    else if (errorCount === 9) imageSrc = "asset/lose3.jpg";
    if (total === 8) {
        imageSrc = "asset/win.jpg";
        confettiSrc = "asset/Confetti.gif";
    }

    document.getElementById("board").style.display = "none";
    const imgContainer = document.getElementById("error-image-container");
    const img = document.getElementById("error-image");
    img.src = imageSrc;
    imgContainer.style.display = "block";
    const confetti = document.getElementById("confetti");
    confetti.src = confettiSrc;
    setTimeout(() => {
        imgContainer.style.display = "none";
        document.getElementById("board").style.display = "flex";
    }, 2000);
}