let elem_array = ['life','poison','ball_1','ball_2','ball_3','ball_4','ball_5','ball_6'];
let speed_array_1 = [50,60,70,80];
let speed_array_2 = [20,30,40,50];
let speed_array_3 = [5,10,15];
let lives = 5;
let score = 0;
let attempts = [];
let saved_attempts = localStorage.getItem('attempts');
$(document).ready(function(){
    $('.game-over-wrap').hide();
    if(saved_attempts != undefined){
        attempts = JSON.parse(saved_attempts);
        getRecord(attempts);
    }
    let create_interval;
    let fallignDown_interval;
    $('.game-main-wrapper').on('mousemove', function(event){
           let position = event.clientX;
           if(position + $('.basket').width() > $('.game-main-wrapper').width()){
				position = $('.game-main-wrapper').width - $('.basket').width();
           }
           $('.basket').css('left', position + "px");
    }); 
    
    $('.replay').on('click', function(){
            create_interval = setInterval(createFallingElement, 2000);
            lives = 5;
            score = 0;
            $('.lives').html(lives);
            $('.score').html(score);
            $('.game-over-wrap').hide();
    });
    
    $('.start-game').on('click', function(){
       $('.start-game').hide(200);
       let getLevel = prompt('Выберите уровень сложности. Если Вы хотите выбрать легкий введите - 1, средний - 2, сложный - 3');
       if(getLevel == 1 || getLevel == 2 || getLevel == 3 ){
           create_interval = setInterval(function(){createFallingElement(getLevel)},2000);
       }
       else{
          alert('Введите 1,2 или 3!');
          location.reload();
       }
    });
    
    function createFallingElement(value){
           value = +value;
           switch(value){
               case 1:
                value = speed_array_1;
               case 2:
                value = speed_array_2;
               case 3:
                value = speed_array_3;
           } 
           let rand_speed =  Math.floor(Math.random() * value.length);
           let randElem = Math.floor(Math.random() * elem_array.length);
           let randLocation = Math.floor(Math.random() * 1000);
           let falling_elem = {
               class: elem_array[randElem] + " elem",
               id: `f${(+new Date).toString(16)}`,
               marginLeft: randLocation,
               catched: false,
               top_elem: 0,
               clearFalling: fallignDown_interval = setInterval(function(){setMoveDownToElement(falling_elem)}, value[rand_speed])
           }
           addFallingElemToGameField(falling_elem);
     }

     function addFallingElemToGameField(obj){
           obj.marginLeft = obj.marginLeft + "px";
           $('<div/>',{class: obj.class, id: obj.id}).css("margin-left", obj.marginLeft).appendTo($('.game-main-wrapper'));        
     }
    
     function setMoveDownToElement(obj){
            obj.top_elem = obj.top_elem + 5; 
            $("#" + obj.id).css('margin-top',  obj.top_elem + "px");
            let elem =  $("#" + obj.id);
            if(obj.top_elem == 550){ 
                obj.clearFalling = clearInterval(obj.clearFalling);
                delete obj;
                let basket =  $('.basket');
                let elemOffset = $(elem).offset();
                let basketOffset = $('.basket').offset(); 
                if((elemOffset.left + $(elem).width() >= basketOffset.left) && (elemOffset.left <= basketOffset.left + $(basket).width())){
                    if($(elem).attr('class') == 'life elem'){
                        lives++;
                        $('.lives').html(lives);
                    }
                    if($(elem).attr('class') == 'poison elem'){
                        lives--;
                        $('.lives').html(lives);
                        if(lives == 0){
                            clearInterval(create_interval);
                            attempts.push(score);
                            localStorage.setItem('attempts', JSON.stringify(attempts));
                            $('.game-over-wrap').show();
                        }
                    }
                    if($(elem).attr('class') == 'life elem' || $(elem).attr('class') == 'poison elem'){}
                    else{
                        obj.catched = true;
                        score = score + 1;
                        $('.score').html(score);
                         
                    }
                    $(elem).remove();
                }
                else{
                    if($(elem).attr('class') == 'life elem'|| $(elem).attr('class') == 'poison elem'){}
                    else{
                        lives--;
                        $('.lives').html(lives);
                        if(lives == 0){
                            clearInterval(create_interval);
                            attempts.push(score);
                            localStorage.setItem('attempts', JSON.stringify(attempts));
                            getRecord(attempts);
                            $('.game-over-wrap').show();
                        }
                    }
                    
                    $(elem).hide('explode',2000, function(){
                        (elem).remove();
                    })
                }  
            }  
            
     }
    
    function getRecord(arr){
        let record = Math.max.apply(Math, arr);
        $('.record').html(record);
    }
});