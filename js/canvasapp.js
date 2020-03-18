$().ready(function (){
    
    var $canvas = $('#canvas');
    var ctx = $canvas[0].getContext('2d');
    
    var xr = 55;
    var yr = 60;
    var key = 0;
    var gameOver = false;
    var pontuacao = 0;
    
    var load = 0;
    var total = 10;
    
    var theme = new Audio();
    var bomb = new Audio();
    var happy = new Audio();
    var chao = new Image();
    var harry = new Image();
    var inimigo1 = new Image();
    var inimigo2 = new Image();
    var moeda = new Image();
    var inimigo3 = new Image();
    var inimigo4 = new Image();
    
    
    var p1 = new Player(xr, yr, 32, 45, 4, 4, harry, null, 0);
    var p2 = new Player(xr + 50, yr+20, 32, 45, 1, 4, inimigo1, 0, 1);
    var p3 = new Player(Math.floor(50 + Math.random() * ($canvas[0].width - 2 * 50)), yr+80, 32, 45, 1,4, inimigo2, 1, 1);
    var p4 = new Player(Math.floor(50 + Math.random() * ($canvas[0].width - 2 * 50)), Math.floor(Math.random() * (Math.floor(270) - Math.ceil(30))) + Math.ceil(30), 32, 45, 1, 4, inimigo3, 2,1);
    var p5 = new Player(xr + 50, Math.floor(Math.random() * (Math.floor(270) - Math.ceil(30))) + Math.ceil(30), 32, 45, 1, 4, inimigo4, 3, 1);
    var objeto = new Player(Math.floor(Math.random() * (Math.floor(470) - Math.ceil(30))) + Math.ceil(30),
    Math.floor(Math.random() * (Math.floor(270) - Math.ceil(30))) + Math.ceil(30), 15, 15, 0, 6, moeda, null, null);
    
    var loop = setInterval(isLoaded, 1000);
    
    loadAssets();
    
    function isLoaded(){
        if(load === total){
            clearInterval(loop);
            menu();
        }else{
            ctx.fillStyle = 'black';
            ctx.font = '30px harry';
            var msg = 'Carregando...';
            var w = ctx.measureText(msg).width;
            ctx.fillText(msg, $canvas[0].width/2-w/2, $canvas[0].height/2);
        }
    }
    function erase() {
        ctx.fillStyle = '#A4A5A5';
        ctx.fillRect(0,0,500,300);
    }
    
    function menu() {
        erase();
        ctx.fillStyle = '#000000';
        ctx.font = '36px harry';
        ctx.textAlign = 'center';
        ctx.fillText('Get coins and survive!', $canvas[0].width / 2, $canvas[0].height / 4);
        ctx.font = '24px harry';
        ctx.fillText('Click to Start', $canvas[0].width / 2, $canvas[0].height / 2);
        ctx.font = '18px harry';
        ctx.fillText('Move: A left, W up, D right, S down.', $canvas[0].width / 2, ($canvas[0].height / 4) * 3);
        $canvas[0].addEventListener('click', start);
}
    
   function start(){
        theme.play();
        drawScreen();
        $canvas[0].removeEventListener('click', start);
    }
    
    function drawScreen(){
        erase();
        p1.move(key);
        p2.aleatorio();
        p3.aleatorio();
        p4.aleatorio();
        p5.aleatorio();
        colisao(p1,p2,p3, objeto);
        
        ctx.fillStyle = ctx.createPattern(chao, "repeat");
        ctx.fillRect(0,0,500,300);
        
        ctx.fillStyle = 'white';
        ctx.fillRect(3,3,25,20);
        ctx.fillStyle='black';
            ctx.font = '15px harry';
            ctx.textBaseline = 'top';
            ctx.fillText(pontuacao, 8, 5);
        
        p1.animate(ctx);
        p2.animate(ctx);
        p3.animate(ctx);
        p4.animate(ctx);
        p5.animate(ctx);
        
        var grad = ctx.createRadialGradient(objeto.pos_x()+8, objeto.pos_y()+15,1,objeto.pos_x(), objeto.pos_y(),18);
            grad.addColorStop(0.1, 'white');
            grad.addColorStop(0.4, 'yellow');
            grad.addColorStop(.6, 'rgba(255,255,255,0.1)');
            grad.addColorStop(.7, 'transparent');
        
        objeto.animateObj(ctx, grad);
        
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(2,2,498,298);  
        if(!gameOver){
           window.requestAnimationFrame(drawScreen);
        }else{
            ctx.fillStyle='white';
            ctx.font = '50px harry';
            ctx.textBaseline = 'top';
            ctx.fillText("Game over", $canvas[0].width / 2, $canvas[0].height / 3);
            theme.pause();
        }
    }
    
    $(document).keydown(function(e){
       key = e.which;
       p1.alter_move(1);
    });
    
    $(document).keyup(function(e){
       key = 0;
       p1.alter_move(0);
       
    });
    
    function colisao(p1,p2,p3, objeto){
           if (p1.pos_x() + p1.width() > p2.pos_x() && p1.pos_x() < (p2.pos_x() + p2.width()) &&
               p1.pos_y() + p1.height() >  p2.pos_y() && p1.pos_y() < (p2.pos_y() + p2.height())){
                    gameOver = true;
                    bomb.play();
                    return;
          }
          if(p1.pos_x() + p1.width() > p3.pos_x() && p1.pos_x() < (p3.pos_x() + p3.width()) &&
               p1.pos_y() + p1.height() >  p3.pos_y() && p1.pos_y() < (p3.pos_y() + p3.height())){
                    gameOver = true;
                    bomb.play();
                    return;
          }
          if(p1.pos_x() + p1.width() > p4.pos_x() && p1.pos_x() < (p4.pos_x() + p4.width()) &&
               p1.pos_y() + p1.height() >  p4.pos_y() && p1.pos_y() < (p4.pos_y() + p4.height())){
                    gameOver = true;
                    bomb.play();
                    return;
          }
          if(p1.pos_x() + p1.width() > p5.pos_x() && p1.pos_x() < (p5.pos_x() + p5.width()) &&
               p1.pos_y() + p1.height() >  p5.pos_y() && p1.pos_y() < (p5.pos_y() + p5.height())){
                    gameOver = true;
                    bomb.play();
                    return;
          }
          if(p1.pos_x() + p1.width() > objeto.pos_x() && p1.pos_x() < (objeto.pos_x() + objeto.width()) &&
               p1.pos_y() + p1.height() >  objeto.pos_y() && p1.pos_y() < (objeto.pos_y() + objeto.height())){
                    objeto.newPos_x(Math.floor(Math.random() * (Math.floor(470) - Math.ceil(30))) + Math.ceil(30));
                    objeto.newPos_y(Math.floor(Math.random() * (Math.floor(270) - Math.ceil(30))) + Math.ceil(30));
                    happy.play();
                    pontuacao++;
                    if(pontuacao%10 === 0){
                      p2.change_speed();
                      p3.change_speed();
                      p4.change_speed();
                      p5.change_speed();
                    } 
          }
        };
        
    function loadAssets(){
        theme.src = 'audio/fundo.mp3';
        bomb.src = 'audio/bomb.mp3';
        happy.src = 'audio/alert.mp3';
        chao.src = 'img/chao.jpg';
        harry.src = 'img/player.png';
        inimigo1.src = 'img/inimigo1.png';
        inimigo2.src = 'img/inimigo2.png';
        moeda.src = 'img/moedinha.png';
        inimigo3.src = 'img/inimigo3.png';
        inimigo4.src = 'img/inimigo4.png';
        
        chao.onload = function(){
            load++;  
        };
        moeda.onload = function(){
          load++;  
        };
        harry.onload = function(){
            load++;
        };
        inimigo1.onload = function(){
            load++;
        };
        inimigo2.onload = function(){
            load++;
        };
        inimigo3.onload = function(){
            load++;
        };
        inimigo4.onload = function(){
            load++;
        };
        theme.load();
        theme.oncanplaythrough = function(){
            this.volume = 0.7;
            if(typeof theme.loop === 'boolean'){
                theme.loop = true;
            }else{
                theme.addEventListener('ended', function(){
                this.currentTime = 0;
                }, false);
            }
        };
        load++;
        bomb.load();
        bomb.oncanplaythrough = function(){
            this.volume = 0.8;
            if(typeof bomb.loop === 'boolean'){
                bomb.loop = false;
            }else{
                theme.addEventListener('ended', function(){
                this.currentTime = 0;
                }, false);
            }
        };
        load++;
        happy.load();
        happy.oncanplaythrough = function(){
            this.volume = 0.9;
            if(typeof happy.loop === 'boolean'){
                happy.loop = false;
            }else{
                happy.addEventListener('ended', function(){
                this.currentTime = 0;
                }, false);
            }
        };
        load++;
    };
    
});

function Player(x, y, w, h, s, ns, img, dir, mov) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = s;
    this.img = img;
    this.cf = 0;
    this.ns = ns;
    this.dir = dir;
    this.movimenta = mov;
    
    this.alter_move = function(m){
        this.movimenta = m;
        if(m === 0) this.cf = 0;
    };
    
    this.change_speed = function(){
        if(this.speed < 30) this.speed += 1;
    };
    
    this.pos_y = function(){
        return this.y;
    };
    
    this.pos_x = function(){
        return this.x;
    };
    
    this.newPos_x = function(x){
        this.x = x;
    };
    
    this.newPos_y = function(y){
        this.y = y;
    };
    
    this.width = function(){
        return this.w;
    };
    
    this.height = function(){
        return this.h;
    };

    this.move = function (key){
        if(key === 87){
            this.y-=this.speed;
            this.dir = 3;
        }else if(key === 83){
            this.y+=this.speed;
            this.dir = 0;
        }else if(key === 65){
            this.x-=this.speed;
            this.dir = 1;
        }else if(key === 68){
            this.x+=this.speed;
            this.dir = 2;
        }
        this.controla();
    };
    
    this.aleatorio = function (){
        var n = Math.floor(Math.random() * (Math.floor(30) - Math.ceil(1))) + Math.ceil(1);
        if(this.dir === 3){
            if(n%4 === 0) this.x += this.speed;
            else this.y -= this.speed;
        }else if(this.dir === 1){
           if(n%4 !== 0) this.x -= this.speed;
            else this.y -= this.speed; 
        }else if(this.dir === 0){
            if(n%4 === 0) this.x -= this.speed;
            else this.y += this.speed; 
        }else{
            if(n%4 !== 0) this.x += this.speed;
            else this.y += this.speed; 
        }
        this.controla();
    };
    
    this.controla = function(){
      if(this.x>490){
           this.x = 5;
        }else if(this.y < 1){
            this.y = 290;
        }
        if(this.y>290){
            this.y = 10;
        }else if(this.x<1){
            this.x = 490;
        }  
    };
    this.animate = function (ctx) {
        var fd = this.ns;
        if(this.cf === this.ns*fd) this.cf = 0;
        //ctx.clearRect(this.x,this.y, this.w, this.h);
        if(this.dir === 3) var corte_y = 45*this.dir+10;
        else var corte_y = 45*this.dir+5;
        ctx.drawImage(this.img, Math.floor(this.cf/fd)*this.w, corte_y, this.w, this.h, this.x, this.y, this.w, this.h); //contador vezes largura
        if(this.movimenta === 1) this.cf++;
    };
    this.animateObj = function (ctx, grad) {
        var fd = this.ns;
        if(this.cf === this.ns*fd) this.cf = 0;
        //ctx.clearRect(this.x,this.y, this.w, this.h);
        ctx.fillStyle = grad;
        ctx.fillRect(this.x-10,this.y-10, 28, 28);
        ctx.drawImage(this.img, Math.floor(this.cf/fd)*this.w, 0, this.w, this.h, this.x, this.y, this.w, this.h); //contador vezes largura
        this.cf++;
    };
    
}


