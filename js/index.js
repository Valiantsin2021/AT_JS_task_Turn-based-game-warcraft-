class Game {
    clickStart() {
        startBtn.addEventListener('click', (event) => {
            event.preventDefault()
            alert('Choose your fighter')
            display.hide(startBtn)
            this.createListCharacters()
            if(list.classList.contains('hidden')) {
                display.unHide(list)
            }
        })
    }
    createListCharacters() {
        if(list.contains(characterBtn)) {
            return
        } else {
            for(let i = 0; i < charactersArr.length; i++) {
                characterBtn = document.createElement('button')
                characterBtn.innerHTML = charactersArr[i].name.toString()
                characterBtn.classList.add('pers')
                list.append(characterBtn)
            }
        }    
    }
    selectPlayer() {
        list.addEventListener('click', (event) => {
            if(event.target.classList.contains('pers')) {
                switch(event.target.innerHTML) {
                    case 'Footer':
                        player = charactersArr[0];
                        break;
                    case 'Mague':
                        player = charactersArr[1];
                        break;
                    case 'Ork':
                        player = charactersArr[2];
                        break;
                    case 'Elf':
                        player = charactersArr[3];
                        break;
                    default:
                        alert('No player chosen');
                    }
            }
            display.hide(list)
            display.unHide(fightBtn)
            if(action.classList.contains('hidden')) {
                display.unHide(action)
            }
            if(playerInfo.classList.contains('hidden') && enemyInfo.classList.contains('hidden')) {
                display.unHide(playerInfo)
                display.unHide(enemyInfo)
            }
            if(battleField.contains(playerInfo && enemyInfo)) {
                this.status()
            } else {
            battleField.append(playerInfo, enemyInfo)
            }
            this.status()
        })
    }
    randomCharacter() {
        return Array.from(characterArrEnemy)[Math.floor(Math.random() * characterArrEnemy.length)]
    }
    clickFight() {
        fightBtn.addEventListener('click', () => {
            this.startGame()
        })
    }
    startGame() {
        player.doFight(player, enemy);
        this.status();
        if(player.hp === 0) {
            alert(`Game over ${enemy.name} win`)
            return this.initGame()
        } else if (enemy.hp === 0) {
            alert(`Game over ${player.name} win`)
            return this.initGame()
        }
    }
    status() {
        playerInfo.value = player.getAllInfo();
        enemyInfo.value = enemy.getAllInfo();
    }
    initGame() {
        display.unHide(startBtn)
        display.hide(action)
        display.hide(fightBtn)
        display.hide(playerInfo)
        display.hide(enemyInfo)
        display.hide(list)
        player.resetUnit();
        enemy.resetUnit();
        action.innerHTML = '';
        enemy = this.randomCharacter()
    }  
}

class Display {

    hide(element) {
        element.classList.add('hidden')
    }
    unHide(element){
        element.classList.remove('hidden')
    }
}

class Unit {
    constructor(object){
        this.name = object.name;
        this.damage = object.damage;
        this.armor = object.armor;
        this.attackRate = object.attackRate;
        this.hp = object.hp;
    }
    getName() { 
        return this.name
    }
    getDamage() {
        return this.damage
    }
    getHealth () {
        return this.hp
    }
    getAllInfo() {
		if (parseInt(this.hp) === 0) {
            alert(`${this.name} died`)
			this.hp = 0;
			return this.hp;
		} else {
			return (
				'Name:' +
				this.name +
				'\n' +
				'Damage:' +
				this.damage +
                '\n' +
                'Armor:' +
				this.armor +
                '\n' +
                'Attack rate:' +
				this.attackRate +
                '\n' +
                'Health:' +
				this.hp +
				'\n'
			);
		}
	}
    set health(value) {
        this.hp = value
    }
    set dealDamage(amount) {
        let currentHp = this.hp - amount;
        currentHp < 0 ? currentHp = 0 : currentHp;
        this.hp = Math.round(currentHp);
    }
    attack(def) {
        def.dealDamage = this.damage - this.damage/def.armor - def.attackRate;
        action.innerHTML = `${this.name} makes 
        ${Math.round(this.damage - this.damage/def.armor - def.attackRate)} damage to ${def.getName()}`;
        }
    doFight(player, enemy) {
		let attacksByPlayer = this.getRandom();
		let attacksByEnemy = this.getRandom();
        battleField.append(action, playerInfo, enemyInfo)
		if (attacksByPlayer > attacksByEnemy) {
			player.attack(enemy)
		} else if (attacksByPlayer < attacksByEnemy) {
			enemy.attack(player)
		}
        playerInfo.value = player.hp;
        enemyInfo.value = enemy.hp;
	}
	getRandom() {
		let r = Math.floor(Math.random() * 10) + 1;
		return r;
	}
    resetUnit() {
		switch(this.name) {
            case 'Footer':
                this.health = 100;
                break;
            case 'Mague':
                this.health = 70;
                break;
            case 'Ork':
                this.health = 120;
                break;
            case 'Elf':
                this.health = 90;
                break;
            default:
                alert('No player chosen');
        }
    }

}
const footer = new Unit({name: 'Footer', damage: 20, armor: 20, attackRate: 4, hp: 100});
const mague = new Unit({name: 'Mague', damage: 15, armor: 10, attackRate: 5, hp: 70});
const ork = new Unit({name: 'Ork', damage: 18, armor: 15, attackRate: 2, hp: 120});
const elf = new Unit({name: 'Elf', damage: 17, armor: 17, attackRate: 3, hp: 90});
const footerEnemy = new Unit({name: 'Footer', damage: 20, armor: 20, attackRate: 4, hp: 100});
const magueEenemy = new Unit({name: 'Mague', damage: 15, armor: 10, attackRate: 5, hp: 70});
const orkEnemy = new Unit({name: 'Ork', damage: 18, armor: 15, attackRate: 2, hp: 120});
const elfEnemy = new Unit({name: 'Elf', damage: 17, armor: 17, attackRate: 3, hp: 90});
let game = new Game()
let display = new Display()

let battleField = document.querySelector('.battle-field')
let action = document.createElement('div');
let playerInfo = document.createElement('textarea');
playerInfo.classList.add('box')
let enemyInfo = document.createElement('textarea');
enemyInfo.classList.add('box')
let startBtn = document.querySelector('.start')
let fightBtn = document.querySelector('.fight')
let list = document.querySelector('.characters-list')
let charactersArr = [footer, mague , ork, elf]
let characterArrEnemy = [footerEnemy, magueEenemy, orkEnemy, elfEnemy]
let characterBtn;
let player;
let enemy = game.randomCharacter();
let playAgain = true
game.clickStart()
game.selectPlayer()
game.clickFight()