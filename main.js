function setup() {
  canvas = createCanvas(300, 250);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet",modelLoaded);
 
}
function modelLoaded(){
console.log("model Loaded");
}
 function draw(){
   image(video,0,0,300,250);
   classifier.classify(video,gotResults);
  
 }
 previous_results="";
 function gotResults(error,results){
   if(error){
     console.error(error);
   }
   else{
  if((results[0].confidence>0.5)&&(previous_results!=results[0].label)){
   console.log(results);
   previous_result = results[0].label;
   var synth = window.speechSynthesis;
   speak_data = "object detected is = "+results[0].label;
   var utterthis = new SpeechSynthesisUtterance(speak_data);
   synth.speak(utterthis);

   document.getElementById("object").innerHTML = results[0].label;
   document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(1);
  }
   }
 }
 



