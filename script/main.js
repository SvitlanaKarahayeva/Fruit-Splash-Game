const fruitSplash = {
    //array for random numbers generated for each reel
    reelNum: [],
    beginningPoint: 25,
    points: 0,

    reel1: document.getElementById("reel1"),
    reel2: document.getElementById("reel2"),
    reel3: document.getElementById("reel3"),

    infoBtn: document.querySelector('.info-close-btn'),
    startBtn: document.getElementById('start-btn'),
    resultAnnouncer: document.querySelector('.result-announcer'),
    infoBoxes: document.getElementById('info-boxes'),
    totalPoints: document.getElementById('total-points'),
    playBtn: document.getElementById('play-btn'),
    instructBtn: document.getElementById('instruct-btn'),
    machine: document.getElementById('machine'),

    welcomeSound: new Audio('../styles/sounds/welcome.mp3'),
    jackpotSound: new Audio('https://svitlanakarahayeva.github.io/Fruit-Splash-Game/styles/sounds/jackpotsound.wav'),
    winningPointsSound: new Audio('https://svitlanakarahayeva.github.io/Fruit-Splash-Game/styles/sounds/pluspoints.wav'),
    losingPointsSound: new Audio('https://svitlanakarahayeva.github.io/Fruit-Splash-Game/styles/sounds/minuspoints.wav'),
    spinAudio: new Audio('https://svitlanakarahayeva.github.io/Fruit-Splash-Game/styles/sounds/spin.mp3'),
    gameOverSound: new Audio('.https://svitlanakarahayeva.github.io/Fruit-Splash-Game/styles/sounds/game-over.mp3'),

   /* Numbers that represent each image that playes, these numbers will be used for comparison 
    1 - Treasure Box
    2 - Watermelon
    3 - Avacado
    4 - Strawberry
    5 - Orange
    6 - Pineapple
    7 - Lemon
    8 - Dollar Sign
    */

    /* Combinations:
        1) Jackpot: reel1, reel2, reel3 - #1 Treasure box 
        2) Game Over: reel1, reel2, reel3 - #8 Dollar Sign 
        3) +5 points combo: reel1, reel2 - #1 Treasure Box, reel3 - any fruit (#2-7), but Dollar sign (#8)
        4) +10 points: reel1 - any fruit (#2-7), but Dollar sign (#8); reel2, reel3 - #6
        5) +15 points: reel1, reel2, reel3 - any fruit match (#2-7), excluding #1 Treasure box or Dollar sign (#8)

        6) -2 points: - reel1 - Dollar sign (#8), reel2, reel3 - any fruit (#2-7), excluding #1 Treasure box
                      - reel2 - Dollar sign (#8), reel1, reel3 - any fruit (#2-7), excluding #1 Treasure box
                      - reel3 - Dollar sign (#8), reel1, reel2 - any fruit (#2-7), excluding #1 Treasure box
        7) -5 points: reel1, reel3 - Dollar sign (#8), reel2 - any fruit (#2-7), excluding #1 Treasure box
    */

    //Start of the game: press the button 'start' and then instructions btn
    startTheGame: function () {

        this.startBtn.addEventListener('click', () => this.startChanges());
        this.instructBtn.addEventListener('click', () => this.toggle());
        this.infoBtn.addEventListener('click', () => this.toggle());
    },

    startChanges: function () {
        //sets the reels back to the original gifs when clicked start
        this.reel1.src = 'https://media.giphy.com/media/3ornjJ69t2jJ0AqXRe/giphy.gif';
        this.reel2.src = 'https://media.giphy.com/media/3ornjJ69t2jJ0AqXRe/giphy.gif';
        this.reel3.src = 'https://media.giphy.com/media/3ornjJ69t2jJ0AqXRe/giphy.gif';
        this.welcomeSound.play();
        //updating the points at the start of the game and everytime the player hit start button
        this.points = this.beginningPoint;
        this.totalPoints.textContent = this.points;
        this.resultAnnouncer.textContent = 'Congratulations. You are given 25 points to play. Please read instructions';
    },

    // Pop-up info-box code: blurs the main screan, changes message, activates play button
    toggle: function () {
        let blurBody = document.getElementById('blur');
        blurBody.classList.toggle('active');
        this.infoBoxes.classList.toggle('active');
        //changes result announcer message
        this.resultAnnouncer.textContent = 'You are ready now. Press PLAY';
        //activates play btn
        this.playBtn.removeAttribute('disabled');
    },
    //main function that is called outside the object
    play: function () {
        this.playBtn.addEventListener('click', () => {
            //-1 point each time when the player hit "Play"
            this.updateTheScore(-1);
            this.resultAnnouncer.textContent = 'Keep playing';
          
            //an empty array for our reels on each click
            this.reelNum = [];
            this.spinEffects();
            if(this.points <= 0){
                this.resultAnnouncer.textContent = 'No more points left.'  
            }
        })
    },
    spinEffects: function () {
        console.log('Spin function');
        this.spinAudio.play();
        this.reel1.src = "https://i.imgflip.com/5if6ct.gif";
        this.reel2.src = "https://i.imgflip.com/5ievl2.gif";
        this.reel3.src = "https://i.imgflip.com/5if6ip.gif";
        this.clearSpin()   
    },
   
    clearSpin: function () { setTimeout(function(){
        //name of an object fruitSplash is used instead of 'this' for the callback functions
        fruitSplash.randNum(this.reel1);
        fruitSplash.randNum(this.reel2);
        fruitSplash.randNum(this.reel3);
        fruitSplash.playBtn.removeAttribute('disabled');
        
        fruitSplash.isZeroPoints();
        fruitSplash.isJackpot();
        fruitSplash.isGameOver();
        
        fruitSplash.isIncrementingPoints();
        fruitSplash.isDecrementingPoints();

    }, 1500) },

    //help function: generates random number from 1 to 8 and changes the image on the reel,
    //takes the reel# as an arg, is called for each reel individually
    randNum: function (reel) {
        let num = Math.floor(Math.random() * 8) + 1;
        reel.src = "styles/img/img" + num + ".png";
        this.reelNum.push(num);
    },
    //updates the score depending on the winning and losing combinations. Paramater num can be positive or negative integer
    updateTheScore: function (num) {
        if((this.points + num) < 0){
            this.playBtn.setAttribute('disabled', '');
            this.points = 0;
        } else{
            this.points += num;
        }
        this.totalPoints.textContent = this.points; 
    },
    
    //Functions that finish the game: isZeroPoints, isJackpot, isGameOver
    //if no more more points left 
    isZeroPoints: function () {
        if (this.points <= 0) {
            this.playBtn.setAttribute('disabled', '');
            this.points = 0;
            this.totalPoints.textContent = this.points;  
            this.resultAnnouncer.textContent = 'Start your Game again';
            this.gameOverSound.play();
        } 
    },

    // Jackpot: three Treasure boxes
    isJackpot: function () {
        if (this.reelNum.every(el => el === 1)) {
            this.points = '';
            this.totalPoints.textContent = this.points;
            this.playBtn.setAttribute('disabled', '');
            this.resultAnnouncer.textContent = 'JACKPOT';
            this.jackpotSound.play();
        }
    },

    isGameOver: function () {
        if (this.reelNum.every(el => el === 8)) {
            this.points = 0;
            this.totalPoints.textContent = this.points;
            this.playBtn.setAttribute('disabled', '');
            this.resultAnnouncer.textContent = 'GAME OVER';
        }
    },

    //function that incrementing the points
    isIncrementingPoints: function () {
        
        if (this.isTreasureBox()) { 
            this.updateTheScore(+5);
            this.winningPointsSound.play();
            this.resultAnnouncer.textContent = 'Treasure boxes: +5 points to your score';
        }
        else if (this.isPineapple()) {
            this.updateTheScore(+10);
            this.winningPointsSound.play();
            this.resultAnnouncer.textContent = 'Lucky Pineapple match!!! +10 points to your score';
        }
        else if (this.isTrippleMatch()) {
            this.updateTheScore(+15);
            this.winningPointsSound.play();
            this.resultAnnouncer.textContent = '15 points for your tripple fruit match. Amazing!';
        } 
    },

    //Methods that hold combos for incrementing the points: isTreasureBox, isPineapple, isTrippleMatch
    //Method that holds the condition for 2 treasure boxes match
    isTreasureBox: function () {
        return this.reelNum[0] === 1 && this.reelNum[1] === 1 && this.reelNum[2] !== 8 && 
        this.reelNum[2] !== 1
    },
    //Method for the double pineapple match
    isPineapple: function () {
        return this.reelNum[1] === 6 && this.reelNum[2] === 6 && this.reelNum[0] !== 8 
        && this.reelNum[2] !== 1
    },
    //help function when all 3 numbers are equal, will be used in isTrippleMatch function
    areEqual: function () {
        let length = arguments.length
        for (let i = 1; i < length; i++) {
            if (arguments[i] === null || arguments[i] !== arguments[i - 1])
                return false
        }
        return true
    },
    //Method for a tripple fruit match
    isTrippleMatch: function () {
        return (this.areEqual(this.reelNum[0], this.reelNum[1], this.reelNum[2]) &&
            this.reelNum.every(el => el !== 1 && el !== 8))
    },

    //Dicrementing points functions
    // dollar signs only
    isDecrementingPoints: function () {
        // this.isZeroPoints()
        //combos:1)isOneDollar(0, 1, 2)- reel1 - Dollar sign, reel2, reel3 - any fruit but dollar sign or Treasure box; 
        //2) isOneDollar(1, 0, 2) - reel2 is Dollar sign; 3) isOneDollar(2, 0, 1) - reel3 is dollar sign
        if (this.isOneDollar(0, 1, 2) || this.isOneDollar(1, 0, 2) || this.isOneDollar(2, 0, 1)) {
            this.resultAnnouncer.textContent = 'You lost 2 points';
            this.updateTheScore(-2);
            this.losingPointsSound.play();
        }
        else if(this.isTwoDollars()){
            
            this.resultAnnouncer.textContent = 'You lost 5 points because of the unlucky dollars';
            this.updateTheScore(-5);
            this.losingPointsSound.play();
        }
    },
    //help function that holds conditions for one dollar combinations; takes arguments: idx1, idx2, idx3 indexes of the reels; 
    //#1 - treasure box number; #8 - dollar sign number
    isOneDollar: function (idx1, idx2, idx3) {
        return this.reelNum[idx1] === 8 && this.reelNum[idx2] !== 8 &&
            this.reelNum[idx2] !== 1 && this.reelNum[idx3] !== 8 && this.reelNum[idx3] !== 1
    },
    //help function 
    isTwoDollars: function () {
        return this.reelNum[0] === 8 && this.reelNum[2] === 8 && this.reelNum[1] !== 1 && this.reelNum[1] !== 8; 
    },
}
fruitSplash.startTheGame();
fruitSplash.play();
