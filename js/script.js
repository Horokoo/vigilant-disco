var canvas = document.createElement('canvas'); // создаю холст
canvas.id = 'canvas';// присваиваю id
xPoint =  (Math.floor(document.documentElement.clientWidth / 10)) * 10;// получаю ширину экрана и округляю до делимости на 10
yPoint = (Math.floor(document.documentElement.clientHeight / 10)) * 10;// получаю высоту экрана и округляю до делимости на 10
canvas.width =  xPoint;// присваиваю округленные широту и высоту экрана холсту
canvas.height = yPoint;// присваиваю округленные широту и высоту экрана холсту
document.getElementById('mainBox').appendChild(canvas); //добавляю холст в dom
//стандартная настройка холста
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
drawArea = []
for (let i = 0; i < yPoint/10; i++) {
    drawArea[i] = []
    for (let o = 0; o < xPoint /10; o++) {
        drawArea[i][o] = '*'     
    } 
}
//создание первичной позиции змейки
for (let i = 0; i < 5; i++) {
    drawArea[0][i] = 's'
}
//
stop = ' '
snakeX = 4;
snakeY = 0;
appleX = 7;
appleY = 1;
direction = 'right';
//отслеживание нажатий стрелок с сохранением направления в переменную direction
document.addEventListener('keydown', (event) => {
    if (event.code == 'ArrowDown' && direction != 'up'){
        direction = 'down'
    }else if (event.code == 'ArrowUp' && direction != 'down'){
        direction = 'up'
    }else if (event.code == 'ArrowLeft' && direction != 'right'){
        direction = 'left'
    }else if (event.code == 'ArrowRight' && direction != 'left'){
        direction = 'right'
    }
});
//
clearCanvas  = () => {
    drawArea.forEach((element, i) => {
        element.forEach((subElement, subI) => {
            drawArea[i][subI] = '*';
        });
    });
}
snake = [[0, 0], [0, 1],[0, 2],[0, 3],[0, 4]]//массив с координатами змейки;
appleGenerating = () => {
    appleX = Math.round(Math.random()* (xPoint/10));
    appleY = Math.round(Math.random()* (yPoint/10));
    if (appleX == 's' && appleY == 's'){
        appleGenerating();
    }
}
snakeDraw = () => {
    if (direction == 'right'){
        snakeX++;
        snake.push([snakeY, snakeX]);
        if(drawArea[snakeY][snakeX] != 'a'){snake = snake.splice(1, snake.length - 1);}else{appleGenerating();}
    }else if (direction == 'down'){
        snakeY++;
        snake.push([snakeY, snakeX]);
        try{
            if(drawArea[snakeY][snakeX] != 'a'){snake = snake.splice(1, snake.length - 1);}else{appleGenerating();}
        }catch(error){
            window.location.reload();
        }
    }else if (direction == 'left'){
        snakeX--;
        snake.push([snakeY, snakeX]);
        if(drawArea[snakeY][snakeX] != 'a'){snake = snake.splice(1, snake.length - 1);}else{appleGenerating();}
    }else if (direction == 'up'){
        snakeY--;
        snake.push([snakeY, snakeX]);
        try {
            if(drawArea[snakeY][snakeX] != 'a'){snake = snake.splice(1, snake.length - 1);}else{appleGenerating();}
        } catch (error) {
            window.location.reload();
        }
    }
    if (snakeX >= xPoint/10 || snakeX < 0 || snakeY > yPoint/10 || snakeY < 0){
        clearInterval(timer);
        window.location.reload(); 
    }
    if (drawArea[snakeY][snakeX] == 's'){
        alert('не так быстро');
    }
    clearCanvas();
    snake.forEach((element, i) => {
        drawArea[element[0]][element[1]] = 's'
    });
}
draw = () =>{
    drawArea[appleY][appleX] = 'a';
    drawArea.forEach((element, i) => {
        element.forEach((subElement, subI) => {
            if(subElement == '*'){
                ctx.fillStyle = "rgb(" + (250 - i*(250/drawArea.length)) + "," + 250 + "," + 0 + ")";
                ctx.fillRect(subI * 10, i*10, 10, 10);
            }else if (subElement == 's'){
                ctx.fillStyle = "rgb(0,0,0)";
                ctx.fillRect(subI * 10, i*10, 9, 9);
            }else if (subElement == 'a'){
                ctx.fillStyle = "rgb(259,0,0)";
                ctx.fillRect(subI * 10, i*10, 9, 9);
            }
        });
    });
    snakeDraw();
}
timer = setInterval(draw, 1)

