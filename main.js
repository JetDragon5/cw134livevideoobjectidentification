const elementStatus = document.getElementById("status");
const elementNumberOfObjects = document.getElementById("numberOfObjects");
var img = "";
var statuss = false;
var objects = [];

function preload(){
    
}

function setup() {
    canvas = createCanvas(380,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    

    
}

function start(){
    objectDetectorr = ml5.objectDetector("cocossd", modelLoaded);
    elementStatus.innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    statuss = true;
    objectDetectorr.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    } else
        console.log(results);
        objects = results;
}

function draw(){
    canvas.center();
    image(video, 0, 0, 380, 380);

    if(statuss){
        objectDetectorr.detect(video ,gotResult);
        for(i = 0; i < objects.length; i++){
            r = random(255);
            g = random(255);
            b = random(255);

            elementStatus.innerHTML = "Status : Object(s) Detected"
            elementNumberOfObjects.innerHTML = "Number of Detected Objects: " + objects.length;

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill();
            stroke(r, g, b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }
    //fill("#000000");text("dog", 250, 55);noFill();stroke("#ff0000");rect(250, 60, 235, 380);
}