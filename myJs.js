// controllers
const SPAWN_RATE = 3000
// spawn an enemy in a random location
const startButton = document.getElementById("start")

function spawnEnemy(){
    const spawner = document.getElementById("spawner")
    const enemy = document.createElement('div')
    const textNode = document.createTextNode("ENEMY")
    enemy.appendChild(textNode)
    enemy.setAttribute("class", "enemy")
    const style = Math.ceil(Math.random() * 100)
    enemy.style.left = `${style}vw`
    spawner.insertAdjacentElement("afterbegin", enemy)
    console.log("spawned")
}

// spawn enemies 
let enemyIntervalId = 0
let compareObjsIntervalId = 0
function start(){ 
    startButton.setAttribute("disabled", "")
    console.log("triggered")
    enemyIntervalId = setInterval(spawnEnemy, SPAWN_RATE)
    document.addEventListener("keydown", movePlayer)
    compareObjsIntervalId =  setInterval(compareGameObjectLocations, 3000);
}

// // stop spawning enemies
function stop(){ 
    clearInterval(enemyIntervalId)
    clearInterval(compareObjsIntervalId)
    document.removeEventListener("keydown", movePlayer)
    startButton.removeAttribute("disabled")
}

// check for collision 
function compareGameObjectLocations(){
    console.log("checking")
    const enemies = document.querySelectorAll(".enemy")
    const bullets = document.querySelectorAll(".bullets")
    for(let i = 0; i < enemies.length; i++){
        for( let j = 0; j < bullets.length; j++){
        // checkCollision();
    }
   }
}

function checkCollision() {
    console.log(" checking ")
    // const enemy1 = document.getElementsByClassName("enemy")
    // console.log(bullet.offsetTop + " bullet" + enemy1[0].offsetTop + " enemy")
    // if(enemy1[0].offsetTop == bullet.offsetTop ) {
    //     console.log("HIT...")
    //     enemy1[0].remove()
    //     clearInterval(intervalId)
    // }
}

// move player
const player = document.getElementById("player")
let playerPostion = getComputedStyle(player, null).getPropertyValue("left")
let increment = 0;

function moveRight(){
    const regex = /\d+/
    let nums = playerPostion.match(regex)
    console.log(nums[0])
    increment -= 20
    player.style.left = `${nums[0] - increment}px`

}

function moveLeft() {
    const regex = /\d+/
    let nums = playerPostion.match(regex)
    console.log(nums[0])
    increment += 20
    player.style.left = `${nums[0] - increment}px`
}

function movePlayer(event){
    if(event.code == "ArrowRight") moveRight()
    if(event.code == "ArrowLeft") moveLeft() 
    if(event.code == "Space") fire()
}

function fire(){
    const player = document.getElementById("player")
    const bullet = document.createElement('div')
    bullet.setAttribute("class", "bullet")
    player.insertAdjacentElement("afterbegin", bullet)
    console.log("fired")
}



