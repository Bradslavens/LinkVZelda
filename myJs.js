// controllers
const SPAWN_RATE = 3000
// spawn an target in a random location
const startButton = document.getElementById("start")

const gameManager = function(){
    spawnTarget()
    const targets = document.getElementsByClassName("target")
    const projectiles = document.getElementsByClassName("projectile")
    compareGameObjectLocations(targets, projectiles)
        // if not move objects
    moveTarget(targets)
    moveProjectile(projectiles)
    
}

function spawnTarget(){
    const spawner = document.getElementById("targetSpawner")
    const target = document.createElement('div')
    target.setAttribute("class", "target")
    let style = Math.ceil(Math.random() * 90)
    // console.log(style)
    target.style.left = `${style}%`
    spawner.insertAdjacentElement("afterbegin", target)
}

// start game 
let gameTimer = 0

function start(){ 
    startButton.setAttribute("disabled", "")
    document.addEventListener("keydown", movePlayer)
    gameTimer = setInterval(gameManager, 1000)    
}

function stop(){ 
    clearInterval(gameTimer)
    document.removeEventListener("keydown", movePlayer)
    startButton.removeAttribute("disabled")
}

function moveTarget(targets){
    for(let i = 0; i<targets.length; i++){
        let top = targets[i].style.top
        const regex = /\d+/
        let topNumber = top.match(regex)
        let newTop = topNumber + 10
        targets[i].style.top = newTop + "px"
    }
}

function moveTarget(targets){
    for(let i = 0; i<targets.length; i++){
        let top = getComputedStyle(targets[i], null).getPropertyValue("top")
        const regex = /\d+/
        let topNumber = Number(top.match(regex))
        console.log(`topNumber ${topNumber}`)
        let newTop = topNumber + 10
        targets[i].style.top = newTop + "px"
    }
}

function moveProjectile(projectiles){
    if(projectiles.length > 0){
        for(let i = 0; i<projectiles.length; i++){
            let projectileTop = window.getComputedStyle(projectiles[i]).getPropertyValue("top")
            // console.log(`projectile top ${projectileTop}`)
            const regex = /\d+/
            let nums = projectileTop.match(regex)
            console.log(`nums ${nums}`)
            console.log(projectiles[i])
            projectiles[i].style.top = `${nums[0] - 20}px`
        }
    }
}

// check for collision 
function compareGameObjectLocations(targets, projectiles){
    if(projectiles.length > 0 && targets.length >0){
        for(let i = 0; i < targets.length; i++){
            for( let j = 0; j < projectiles.length; j++){
            checkCollision(targets[i], projectiles[j]);
            }
        }
    }
}

function checkCollision(target = null, projectile = null) {
    console.log(`target: ${target.offsetTop} projectile: ${projectile.offsetTop}`)
    if(projectile.offsetTop > (target.offsetTop - 200) && projectile.offsetLeft > (target.offsetLeft - 200) && projectile.offsetLeft < (target.offsetLeft + 200)) {
        console.log("HIT..." + target.offsetTop + " " + projectile.offsetTop )
        target.remove()
        projectile.remove()
    }
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
    const projectile = document.createElement('div')
    const player = document.getElementById("player")
    projectile.setAttribute("class", "projectile")
    arena.insertAdjacentElement("beforeend", projectile) // afterbegining etc
    projectile.style.top = window.getComputedStyle(player,null).getPropertyValue("top")
    projectile.style.left = window.getComputedStyle(player,null).getPropertyValue("left")
}

spawnTarget()



