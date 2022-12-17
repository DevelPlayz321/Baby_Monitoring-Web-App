object = [];
function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    document.getElementById('status').innerHTML = "Status = Detecting Objects........";
    model = ml5.objectDetector('cocossd',modelLoaded);
}

var song = "";

function preload(){
    song = loadSound("Alarm.mp3");
}


function draw(){
    image(video, 0, 0, 640, 420);

    if(status != "")
    {
      model.detect(video, gotResult);
      for (i = 0; i < object.length; i++) {
        document.getElementById("status").innerHTML = "Status : Object Detected";
        
        fill("#FF0000");
        percent = floor(object[i].confidence * 100);
        text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
        noFill();
        stroke("#FF0000");
        rect(object[i].x, object[i].y, object[i].width, object[i].height)

        if (object[i].label == "person"){
            document.getElementById("Baby").innerHTML = "Baby Detected!!!";
            song.stop();
        }
        else{
            document.getElementById("Baby").innerHTML = "Where is the baby!?!?!";
            song.play();
        }
      }

      
    }
}


function gotResult(error, result) {
    if(error){
        console.error(error);
    }
    console.log(result);
    object = result;
}

function modelLoaded(){
    console.log('model loaded');
    status = true;
    model.detect(video, gotResult);
}

