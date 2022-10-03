const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 150

const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( '../sounds/doll.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.setClearColor( 0x7c0200, 1)

const light = new THREE.AmbientLight( 0xffffff, 0.7 ); // soft white light
scene.add( light );

const createCube = (size = {width: 1, height: 1, depth:1}, position = {x: 0, y:1, z:0}, rotation = {x: 0, y:0, z:0}, color = 0x03211c) => {
    const geometry = new THREE.BoxGeometry( size.width, size.height, size.depth );
    const material = new THREE.MeshBasicMaterial( { color: color } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.x = position.x
    cube.position.y = position.y
    cube.position.z = position.z
    cube.rotation.x = rotation.x
    cube.rotation.y = rotation.y
    cube.rotation.z = rotation.z
    scene.add( cube );
}

const createTrack = () => {
    createCube(size = {width: 1, height: 10, depth: 300}, position = {x:15, y:-1, z:0})
    createCube(size = {width: 1, height: 10, depth: 300}, position = {x:-15, y:-1, z:0})

    createCube(size = {width: 1, height: 10, depth: 1}, position = {x:-14.6, y:-1, z:-140}, rotation = {x: 0, y:0, z:0}, color = 0xfffff)
    createCube(size = {width: 1, height: 10, depth: 1}, position = {x:14.6, y:-1, z:-120}, rotation = {x: 0, y:0, z:0}, color = 0xfffff)
    createCube(size = {width: 1, height: 10, depth: 1}, position = {x:-14.6, y:-1, z:-100}, rotation = {x: 0, y:0, z:0}, color = 0xfffff)
    createCube(size = {width: 1, height: 10, depth: 1}, position = {x:14.6, y:-1, z:-80}, rotation = {x: 0, y:0, z:0}, color = 0xfffff)
    createCube(size = {width: 1, height: 10, depth: 1}, position = {x:-14.6, y:-1, z:-60}, rotation = {x: 0, y:0, z:0}, color = 0xfffff)
    createCube(size = {width: 1, height: 10, depth: 1}, position = {x:14.6, y:-1, z:-40}, rotation = {x: 0, y:0, z:0}, color = 0xfffff)
    createCube(size = {width: 1, height: 10, depth: 1}, position = {x:-14.6, y:-1, z:-20}, rotation = {x: 0, y:0, z:0}, color = 0xfffff)
    createCube(size = {width: 1, height: 10, depth: 1}, position = {x:14.6, y:-1, z:0}, rotation = {x: 0, y:0, z:0}, color = 0xfffff)
    createCube(size = {width: 1, height: 10, depth: 1}, position = {x:-14.6, y:-1, z:20}, rotation = {x: 0, y:0, z:0}, color = 0xfffff)
    createCube(size = {width: 1, height: 10, depth: 1}, position = {x:14.6, y:-1, z:40}, rotation = {x: 0, y:0, z:0}, color = 0xfffff)
    createCube(size = {width: 1, height: 10, depth: 1}, position = {x:-14.6, y:-1, z:60}, rotation = {x: 0, y:0, z:0}, color = 0xfffff)
    createCube(size = {width: 1, height: 10, depth: 1}, position = {x:14.6, y:-1, z:80}, rotation = {x: 0, y:0, z:0}, color = 0xfffff)
    createCube(size = {width: 1, height: 10, depth: 1}, position = {x:-14.6, y:-1, z:100}, rotation = {x: 0, y:0, z:0}, color = 0xfffff)
    createCube(size = {width: 1, height: 10, depth: 1}, position = {x:14.6, y:-1, z:120}, rotation = {x: 0, y:0, z:0}, color = 0xfffff)
    createCube(size = {width: 1, height: 10, depth: 1}, position = {x:-14.6, y:-1, z:140}, rotation = {x: 0, y:0, z:0}, color = 0xfffff)
}
createTrack()

// Instantiate a loader
const loader = new THREE.GLTFLoader();

class Doll{
    constructor() {
        this.facingFront = true
        // Load a glTF resource
        loader.load(
            // resource URL
            '../models/doll/scene.gltf',
            // called when the resource is loaded
            ( gltf ) => {

                scene.add( gltf.scene );

                gltf.scene.scale.set(8, 8, 10)
                gltf.scene.position.set(0, 30, -250)

                this.doll = gltf.scene
            },
            // called while loading is progressing
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' );
            }
        );
    }

    lookBackward() {
        gsap.to(this.doll.rotation, {
            y: -3.2,
            duration: 1.5
        })
        this.facingFront = false
    }
    lookForward() {
        gsap.to(this.doll.rotation, {
            y: 0,
            duration: Math.random() * 1.5
        })
        this.facingFront = true
    }
}




class Player {
    constructor() {
        this.playerTimeline = gsap.timeline({
            delay: 0.5,
            paused: true,
            repeat: 0,
            defaults: { 
                duration: 30,
                ease: "power1.inOut" 
            },
        })
        this.playerTimeline.to(camera.position, {
            z: camera.position.z - 300,
        })
    }

    run() {
        this.playerTimeline.play()
    }

    runFaster() {
        this.playerTimeline.timeScale(3)
    }

    runSlower() {
        this.playerTimeline.timeScale(0.5)
    }

    stop() {
        this.playerTimeline.pause()
    }

    restart() {
        this.playerTimeline.restart()
    }

    
}



class Game {
    constructor() {
        this.doll = new Doll()
        this.player = new Player()

        this.gameIsStarted = false
        this.gameWon = false
        this.gameLost = false
        this.playerMoving = false


        this.countdown = 30
        this.countDownInterval
        this.playInterval
    }

    gamePlay() {
        if((this.playerMoving == true 
            && 
            this.doll.facingFront == true)
            ||
            (this.countdown == 0
            &&
            this.gameWon == false)
        ) {
            this.gameLost = true
            alert("Game Lost")
            game.restart()
        }
        if(this.gameWon) {
            alert("Game Won")
            game.restart()
        }
    }

    play() {
        if(this.doll.facingFront) {
            this.doll.lookBackward()
            sound.play()
        } else {
            sound.stop()
            this.doll.lookForward()
        }
        this.gamePlay()
    }

    start() {
        this.gameIsStarted = true
        this.play()
        this.countDownInterval = setInterval(() => {
            this.countdown = this.countdown - 1
            console.log(this.countdown)
        }, 1000)
        this.playInterval = setInterval(() => {
            this.play()
        }, 4000 + (Math.random() * 3000))
    }

    stop() {
        sound.stop()
        this.player.stop()
    }

    restart() {
        if(sound.isPlaying) {sound.stop()}
        this.doll.lookForward()
        this.player.restart()
        this.player.stop()
        clearInterval(this.countDownInterval)
        clearInterval(this.playInterval)
        this.countdown = 35
        renderer.setClearColor( 0x7c0200, 1)
        this.gameIsStarted = false
        this.gameWon = false
        this.gameLost = false
        this.playerMoving = false
    }
}

let game = new Game()


window.onkeydown = (e) => {
    if(e.key == " " && game.gameIsStarted) {
        game.player.run()
        game.playerMoving = true
    } else if(e.key == "ArrowUp") {
        game.player.runFaster()
    } else if(e.key == "ArrowDown") {
        game.player.runSlower()
    } 
}
window.onkeyup = (e) => {
    if(e.key == " " && game.gameIsStarted) {
        game.player.stop()
        game.playerMoving = false
    } else if(e.key == "v") {
        game.start()
    } else if(e.key == "x") {
        game.stop()
    } else if(e.key == "r") {
        game.restart()
    } 
}


setInterval(() => {
    if(camera.position.z < -145) {
        renderer.setClearColor( 0xffff, 0.8)
        game.gameWon = true
    }
},500)







function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();


window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    // camera.updateProjectMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}