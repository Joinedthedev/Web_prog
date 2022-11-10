var context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");
context.canvas.height = 180;
context.canvas.width= 320;

rectangle = {

    height:32,
    jumping:true,
    width:32,
    x:144, // center of the canvas
    x_velocity:0,
    y:0,
    y_velocity:0

};

controller = {

    left: false,
    right:false,
    up:false,
    keyListener:function(event){

        var key_state = (event.type == 'keydown')?true:false;
        switch(event.keyCode) {

            case 37:// lefty loosey
                controller.left = key_state;
            break;
        
            case 38://up arrow key
                controller.up = key_state;
            break;    
        
            case 39://righty tighty
                controller.right = key_state;
            break;
        
            case 40://down townnn
                controller.down = key_state;
            break;
            
        
        }
    }
};

loop = function() {

    if (controller.up && rectangle.jumping == false) {

        rectangle.y_velocity -= 20;
        rectangle.jumping = true;

    }

    if(controller.left) {

        rectangle.x_velocity -= 0.5;
    }

    if(controller.right){

        rectangle.x_velocity += 0.5;
    }

    rectangle.y_velocity += 1.5; // gravity rush ya digg
    rectangle.x += rectangle.x_velocity; // this just attaches the speed to the current pos of the rectang
    rectangle.y += rectangle.y_velocity; // ^^^^^ what he said
    rectangle.x_velocity *= 0.9; // friction
    rectangle.y_velocity *= 0.9; // friction

    // the code below doesn't allow rectangle to fall through the ground
    if (rectangle.y > 180 - 16 - 32) {

        rectangle.jumping = false;
        rectangle.y = 180 - 16 -32; 
        rectangle.y_velocity = 0;
    }
    
    // teleports rectangle to the otherside of the screen
    if (rectangle.x < -32) {

            rectangle.x = 320 // teleports you to right side
    }      
    else if (rectangle.x > 320) {
    
        rectangle.x = -32 // teleports you to left side
    }    
    
    context.fillStyle = "#203830";
    context.fillRect(0, 0, 320, 180);
    context.fillStyle = "#0000FF";
    context.beginPath();
    context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    context.fill();
    context.strokeStyle = "#202830";
    context.linewidth = 4;
    context.beginPath90;
    context.moveTo(0, 164);
    context.lineTo(320, 164);
    context.stroke();

    window.requestAnimationFrame(loop);

};


window.addEventListener("keydown" , controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);