$(document).ready(function(){
   load(dog);
   load(squirrel);  
   load(water);
   load(fire);
   load(acorn);
   
   
   $('#submit').click(run);
   $('#code').bind('keydown', function(e){
        if(e.keyCode == 13){
             //enter key
             run();
        }
   });
   $('#clear').click(function(){
        $('#code').val('').focus();
   });
   
   $('#restart').click(function(){
        location.reload();
   });
});

function run(){
     var code = $('#code').val();
     try{
          eval(code);
     }
     catch(e){
          say("Uh oh! There's a problem with your code!", 'error');
     }
     finally{
          //$('#code').val('');
          $('#code').focus();
     }
}


//style: error, success, info (default info)
function say(text, style){
     if(!style) style = 'info';
     $('#alert').html(text);
     $('#alert').removeClass('alert-success').removeClass('alert-info').removeClass('alert-error').addClass('alert-' + style);
}

function load(obj){
     obj.alive = true;
     var img = $('<img></img>');
     img.attr('id',obj.id);
     img.addClass('actor');
     img.attr('src','img/' + obj.image + '.png');
     //parse type/props into title
     var baseText = "<h5>" + obj.type + "</h5>";
     var funcArray = obj.props.split(",");
     var funcText = funcArray.join("<br>");
     var html = baseText + "<br>" + funcText;
     //img.attr('title',baseText + "<br>" + funcText);
     //img.tooltip({ html: true, placement: "bottom" });
     
     img.popover({
          title: obj.type,
          html: true,
          content: funcText,
          trigger: "hover",
          placement: "bottom"
     })
     
     $('#field').append(img);
}

function remove(obj){
     $('#' + obj.id).fadeOut();
     obj.alive = false;
     
     //check winner
     if(!(acorn.alive || squirrel.alive || tree.alive || water.alive || fire.alive)){
          say("WINNER! :)",'success');
     }   
};

var dog = {
     id: "dog",
     image: "dog",
     type: "dog",
     props: "bark, talk, drink, chase",
     
     name: "Fido",
     
     bark: function(){ say("WOOF!") },
     talk: function(){ say("Hi! My name is " + this.name + "!") },
     drink: function(target){
          if(!target || !target.alive){
               say("You're a cruel, mean owner. I'm thirsty!", 'error');
          }
          else if(target != water){
               say("Yeah, right.", 'error');
          }
          else{
              //target == water
              say("Ah, how refreshing!", 'success'); 
              remove(water);
          }
     },
     chase: function(target){
          if(!target || !target.alive){
               say("Wha...? What am I supposed to chase?", 'error');
          }
          else if(target != squirrel){
               say("Oh right, like that'll work.", 'error');
          }
          else{
              //target == squirrel
              say("WOOF! WOOF! Get out of here!", 'success'); 
              remove(squirrel);
          }          
     }
};

var squirrel = {
     id: "squirrel",
     image: "squirrel",
     type: "squirrel",
     props: "bury,drink,talk",     
     
     bury: function(target){
          if(!target || !target.alive){
               say("Bury what, exactly?", 'error');
          }
          else if(target != acorn){
               say("I can't hold that!", 'error');
          }
          else{
              //target == acorn
              say("That's one fast-growing acorn.", 'success'); 
              remove(acorn);
              load(tree);
          }
     },
     drink: function(target){
          if(!target || !target.alive){
               say("Tell me, what am I supposed to drink?", 'error');
          }
          else if(target != water){
               say("Um... no.", 'error');
          }
          else{
              //target == water
              say("That sure hit the spot!", 'success'); 
              remove(water);
          }
     },     
     talk: function(words){
          if(!words){
               say("What am I supposed to say?",'error');
          }
          else{
               say(words,"success");
          }
     }   
};

var acorn = {
     id: "acorn",
     image: "acorn", 
     type: "acorn",
     props: "talk",
     
     talk: function(){
          say("...");
     }
          
};

var tree = {
     id: "tree",
     image: "tree",
     type: "tree",
     props: "grow",     
     
     grow: function(){
          $('#' + this.id).css('transform','scale(1.2,1.2)');
     }
};

var water = {
     id: "water",
     image: "water",
     type: "water",
     props: "pour, wash",     
     
     pour: function(target){
          if(!target || !target.alive){
               say("I know I can't talk, but... what should I be poured on?", 'error');
          }
          else if(target == fire){
              say("That fire's suffering from severe burnout.", 'success'); 
              remove(fire);               
          }
          else if(target == tree){
               say("Consider yourself watered, tree!", 'success');
               remove(this);
          }
          else{
               say("Yeah, not going to work.", 'error');
          }
     },
     wash: function(target){
          if(!target || !target.alive){
               say("Wash what, exactly?", 'error');
          }
          else if(target == squirrel){
              say("That squirrel is squeaky clean!", 'success'); 
              remove(this);               
          }
          else if(target == dog){
               say("That dog is squeaky clean!", 'success');
               remove(this);
          }
          else{
               say("I don't think that'll work.", 'error');
          }          
     }
};

var fire = {
     id: "fire",
     image: "fire",
     type: "fire",
     props: "burn",     
     
     burn: function(target){
          if(!target || !target.alive){
               say("Now why would I want to do that?", 'error');
          }
          else if(target != tree){
               say("Hey man, what has that guy ever done to me?", 'error');
          }
          else{
              //target == tree
              say("Up in flames!", 'success'); 
              remove(tree);
          }          
     }
}
