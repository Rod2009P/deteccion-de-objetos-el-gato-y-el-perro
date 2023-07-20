function setup()
{
    canvas=createCanvas(500,500);
    canvas.center();

    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Estatus: detectando objetos";
}

img="";
status="";
objects=[];

function modelLoaded()
{
    console.log("odelo listo");
    status=true;
    objectDetector.detect(img, gotResults);

}

function preload()
{
    img= loadImage('dog_cat.jpg');
}

function draw() {
    image(img, 0, 0, 500, 500);

    if(status != "")
    {
        for(i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML="Estatus = objeto detectado";
            fill('#ff0000');
            porcent= floor(objects[i].confidence*100);
            text(objects[i].label + "" + porcent + "%", objects[i].x, objects[i].y);

            noFill();
            stroke('#ff0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}

function gotPoses(results)
{

}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    } else
    {
        console.log(results);
        objects=results;
    }
}