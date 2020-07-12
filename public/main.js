const players = [];
const controls= ['game-field',
                'player-card', 
                'player-card__sub-button',
                'player-card__add-button'];

class Player{
    constructor(name = 'Player'){
        this._lifeCount = 20;
        this._background = '../src/imgs/standartBackground.jpg';
        this._name = name;
        this._poisonCounter = 0;
        this._userPic = '../src/imgs/Avatar.png';
        this._isDead = false;
    }

    get name(){
        return this._name;
    }

    set name(value){
        this._name = value;
        return;
    }

    get userPic(){
        return this._userPic;
    }
    
    set userPic(value){
        this._userPic = value;
        return;
    }

    get background(){
       return this._background;
    }

    set background(value){
        this._background = value;
        return;
    }

    get life(){
        return this._lifeCount;
    }

    get poison(){
        return this._poisonCounter;
    }

    getDamage(damage=1){
        this._lifeCount -= damage;
        if (this._lifeCount <= 0){
            this._isDead = true;
            return 'dead';
        }
        return this.life;
    }

    addLife(life=1){
        this._lifeCount += life;
        return this.life;
    }

    addPoisonCounter(poison =1){
        this._poisonCounter += poison;
        return this.poison;
    }

    removePoisonConter(antidote=1){
        this._poisonCounter -= antidote;
        return this.poison;
    }

}

function openNewPlayerMenu(e){
    let menu = document.getElementsByClassName('new-player-menu')[0];
    menu.style.display = 'flex';
}

// this close adding player menu and clear input field 
function cancleAddingPlayer(){
    let menu = document.getElementsByClassName('new-player-menu')[0];
    document.getElementById('name').value='';
    menu.style.display ='none';
}

function checkInput(elem){
    if(findPlayer(elem.value) || elem.value.length < 1){
        elem.style.cssText = `
            border: 5px solid red;
            `;
        return false;
    }else{
        elem.style.cssText = `
        border: none;
         `;
        return true;
    }
}

function findPlayer(name){
    let result = false;
    if(players.length == 0){
        return result;
    }
    players.forEach(player=>{
        if(player.name != name ){
            return;
        }else{
            result = player;
        }
        
    });
    return result;
}

function addPlayer(){
    let name = document.getElementById('name');
    if(checkInput(name)){
        // Push player to players Array
        let player = new Player(name.value);
        players.push(player);
        // Create player view (Card)
        let cardElem = document.createElement('div');
        cardElem.classList.add('player-card');
        cardElem.innerHTML = `
            <img class="player-card__avatar" src="${player.userPic}" alt="">
            <div class="player-card__upper-poison"></div>
            <div class="player-card__lower-poison"></div>
            <div class="player-card__life-counter">
                <img  src="../src/imgs/LifeCounter.png" alt="">
                <p>${player.life}</p>
            </div>
            <div class="player-card__add-button" >
                <p>+</p>
            </div>
            <div class="player-card__sub-button">
                <p>-</p>
            </div>
            <div class="player-card__nickname">
                <p>${player.name}</p>
            </div>
        `;
        document.getElementsByClassName('game-field')[0].appendChild(cardElem);
        cancleAddingPlayer();

    }else{
        return;
    }
}


function damagePlayer(e){
    let nickname = e.parentElement.getElementsByClassName('player-card__nickname')[0].children[0];
    let lifeView = e.parentElement.getElementsByClassName('player-card__life-counter')[0].children[1];
    let player = findPlayer(nickname.innerText);
    player.getDamage();
    let life = player.life;
    if(life < 10){
        lifeView.style.left ='70px';
    }
    if(life <= 0){
        e.parentElement.classList.add('dead');
    }
     lifeView.innerText = life;
}

function recoverPlayer(e){
    let nickname = e.parentElement.getElementsByClassName('player-card__nickname')[0].children[0];
    let lifeView = e.parentElement.getElementsByClassName('player-card__life-counter')[0].children[1];
    let player = findPlayer(nickname.innerText);
    player.addLife();
    if(player.life >= 10){
        lifeView.style.left ='12px';
    }
     lifeView.innerText = player.life;
}



//Control's all elements and action with him on game field
function controlAction(e){
    let startElem = e.target || e;
    if(controls.includes(startElem.className)){
        switch(startElem.className){
            case 'game-field':
            case 'player-card':
                break;
            case 'player-card__sub-button':
                damagePlayer(startElem);
                break;
            case 'player-card__add-button':
                recoverPlayer(startElem);
                break;
            default:
                console.log('Sorry, but i don\'t must be here');
        }
    }else{
       controlAction(startElem.parentElement);
    }
}

document.getElementsByClassName('add-player-button')[0].addEventListener('click',openNewPlayerMenu);
document.getElementsByClassName('cancel-adding-player')[0].addEventListener('click',cancleAddingPlayer);
document.getElementsByClassName('add-new-player')[0].addEventListener('click', addPlayer);
document.getElementsByClassName('game-field')[0].addEventListener('click', controlAction);