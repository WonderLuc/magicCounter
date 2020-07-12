class Player{
    constructor(name = 'Player'){
        this._lifeCount = 20;
        this._background = 'src/imgs/standartBackground.jpg';
        this._name = name;
        this._poisonCounter = 0;
        this._userPic = 'src/imgs/defaultUserPic.jpg';
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

export default Player;