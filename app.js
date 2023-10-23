const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
 
window.addEventListener('resize', function(){    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
 

var mouse = { x: null, y :null};
var particleArray = [];
let hue = 0;

function drawCircle(){
    ctx.beginPath();
    ctx.fillStyle = 'red'; 
    ctx.arc(mouse.x, mouse.y, 10, 0,Math.PI*2);  
    ctx.fill(); 
}

function drawPolygon(point1, point2){

    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(point1[0], point1[1]);
    ctx.lineTo(point2[0], point2[1]);
    ctx.stroke();
}

canvas.addEventListener('click', function(event){ 
    drawPolygon([mouse.x, mouse.y], [event.x, event.y]);
    mouse.x = event.x;
    mouse.y = event.y; 
    // drawCircle(); 
    // for(let i = 0; i < 10; i++)
    //     particleArray.push(new Particle);
});

class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        //this.x = Math.random() * canvas.width;
        //this.y = Math.random() * canvas.height;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.size = Math.random()*5+1;
        this.color = 'hsl(' + hue + ',100%, 50%)'; 
        }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) this.size -= 0.01;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}

function init(){
    for (let i = 0; i < 100; i++){
        particleArray.push(new Particle());
    }
}
//init();
function handleParticle(){
    for(let i = 0; i < particleArray.length; i++){
        particleArray[i].update();
        particleArray[i].draw();
        for(let j = i; j < particleArray.length; j++){
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = particleArray[i].color;
                ctx.lineWidth = particleArray[i].size/10;
                ctx.moveTo(particleArray[i].x, particleArray[i].y);
                ctx.lineTo(particleArray[j].x, particleArray[j].y);
                ctx.stroke();
            } 
        }

        if(particleArray[i].size <= 3.0){
            particleArray.splice(i,1);
            i--;
        }
    }
}

canvas.addEventListener('mousemove', function(event){
    
    mouse.x = event.x;
    mouse.y = event.y; 
    // drawCircle(); 
    for(let i = 0; i < 5; i++)
        particleArray.push(new Particle);
})

function drawRect(){
    ctx.fillStyle = 'white';
    ctx.fillRect(10, 10, 200, 20);
}

function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
   // ctx.fillStyle = 'rgba(0,0,0,0.02)';
    //ctx.fillRect(0,0, canvas.width, canvas.height);
    handleParticle();
    hue+=5;
    // drawCircle();
    requestAnimationFrame(animate);
}
animate();
 


