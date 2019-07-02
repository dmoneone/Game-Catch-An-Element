let elem_array = ['life','poison','ball_1','ball_2','ball_3','ball_4','ball_5','ball_6'];
let speed_array_1 = [40,50];
let speed_array_2 = [15,20,30];
let speed_array_3 = [5,10];
let lives = 5;
let attempts = [];
let saved_attempts = localStorage.getItem('attempts');
if(saved_attempts != undefined){
    alert(saved_attempts);
}
$(document).ready(function(){
    $('.start-game').on('click', function(){
       $('.start-game').hide(200);
       let getLevel = prompt('Выберите уровень сложности. Если Вы хотите выбрать легкий введите - 1, средний - 2, сложный - 3');
       if(getLevel == 1 || getLevel == 2 || getLevel == 3 ){
       $('.game-main-wrapper').on('mousemove', function(event){
           $('.basket').css('left', event.clientX + "px");
       });  
       function createFallingElement(){
           let randElem = Math.floor(Math.random() * elem_array.length);
           let randLocation = Math.floor(Math.random() * 1000);
           let falling_elem = {
               class: elem_array[randElem] + " elem",
               id: `f${(+new Date).toString(16)}`,
               marginLeft: randLocation,
               catched: false
           }
           addFallingElemToGameField(falling_elem);
       }
       let create_interval = setInterval(createFallingElement, 1000);
           alert(create_interval)
       let score = 0; 
       
       function addFallingElemToGameField(obj, speed_array){
           if(getLevel == 1){
              speed_array = speed_array_1;
           }
           if(getLevel == 2){
              speed_array = speed_array_2;
           }
           if(getLevel == 3){
              speed_array = speed_array_3;
           }
           obj.marginLeft = obj.marginLeft + "px";
           let rand_speed =  Math.floor(Math.random() * speed_array.length);
           $('<div/>',{class: obj.class, id: obj.id}).css("margin-left", obj.marginLeft).appendTo($('.game-main-wrapper'));
           let top_elem = 0;
           let moveDown = setInterval(function(){
               top_elem = top_elem + 5;
               $("#"+obj.id).css('margin-top', top_elem + "px");
               let elem =  $("#"+obj.id);
               if(top_elem == 550){ 
                  clearInterval(moveDown);
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
                     }
                     
                     if($(elem).attr('class') == 'life elem' || $(elem).attr('class') == 'poison elem'){
                     }
                     else{
                         obj.catched = true;
                         score = score + 1;
                         $('.score').html(score);
                         
                     }
                     $(elem).remove();
                  }
                  else{
                      if($(elem).attr('class') == 'life elem'|| $(elem).attr('class') == 'poison elem'){
                         
                      }
                      else{
                          lives--;
                          $('.lives').html(lives);
                          if(lives == 0){
                              clearInterval(create_interval);
                              alert('чистим');
                              alert('Game Over. ' + "Your Score Is " + score);
                              attempts.push(score);
                              localStorage.setItem('attempts', JSON.stringify(attempts));
                              $('.game-over-wrap').show();
                              $('.replay').on('click', function(){
                                  lives = 5;
                                  score = 0;
                                  $('.lives').html(lives);
                                  $('.score').html(score);
                                  create_interval = setInterval(createFallingElement, 1000);
                                  alert(create_interval)
                                  $('.game-over-wrap').hide();
                              });
                          }
                      }
                      $(elem).hide(2000, function(){
                            $(elem).remove();
                      })
                  }
                  
               }
               
            },speed_array[rand_speed]);
       }
    }
    else{
        alert('Введите 1,2 или 3!');
        location.reload();
    }
    });
});