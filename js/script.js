let elem_array = ['life','circle', 'square'];
let speed_array = [20,30,40,50];
let lives = 5;

$(document).ready(function(){
    $('.start-game').on('click', function(){
       $('.start-game').hide(200); 
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
       setInterval(createFallingElement, 4000);
       let score = 0; 
        
       function addFallingElemToGameField(obj){
           obj.marginLeft = obj.marginLeft + "px";
           let rand_speed =  Math.floor(Math.random() * speed_array.length);
           $('<div/>',{class: obj.class, id: obj.id}).css("margin-left", obj.marginLeft).appendTo($('.game-main-wrapper'));
           let top_elem = 0;
           let moveDown = setInterval(function(){
               top_elem = top_elem + 4;
               $("#"+obj.id).css('margin-top', top_elem + "px");
               let elem =  $("#"+obj.id);
               if(top_elem == 600){ 
                  clearInterval(moveDown);
                  $(elem).css('background','black');
                  let basket =  $('.basket');
                  let elemOffset = $(elem).offset();
                  let basketOffset = $('.basket').offset(); 
                  if((elemOffset.left + $(elem).width() >= basketOffset.left) && (elemOffset.left <= basketOffset.left + $(basket).width())){
                     score = score + 1;
                     $('.score').html(score);
                     $(elem).fadeOut("swing", null, 100, function(){
						$(elem).remove();
					 });
                     if($(elem).attr('class') == 'life elem'){
                         lives++;
                         $('.lives').html(lives);
                     }
                     $(elem).delete();
                  }
                  else{
                      lives--;
                      $(elem).css('background','black')
                      //$(elem).hide("explode", {pieces: 9}, 300, function(){
						//$(elem).remove();
					  //});
                      $('.lives').html(lives);
                      if(lives == 0){
                          alert('Game Over');
                          location.reload();  
                      }
                  }
               }
               
            },speed_array[rand_speed]);
       }
        

    });
});