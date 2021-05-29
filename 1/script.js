// https://twitter.com/incre_ment/status/1398353931869163521
// https://p5js.org/reference/
let isRecording = false; //assign as true when you want to record
let recIx = undefined; // current recording frame index.
const NFRAMES = 100; //choose an ending point to finish recording

var capturer = new CCapture( { format: 'gif', workersPath: './' } );
let CANVAS = undefined;

function updateGIFRecording() {
    console.assert(NFRAMES >= 0);
    
    if (!isRecording) { return; }

    if (recIx == 0) {
        capturer.start()
    }
    if (recIx < NFRAMES) {
        console.log("recording frame: ", frameCount);
        capturer.capture(CANVAS);
    } else if (recIx === NFRAMES) {
        capturer.stop()
        capturer.save()
        document.getElementById('recording-button').disabled = false;
        isRecording = false;
        recIx = undefined;
    }

    recIx += 1;
}


function start_record() {
    if (isRecording) { return; }
    isRecording = true;
    document.getElementById('recording-button').disabled = true;
    recIx = 0;
}

function setup() {
    let c = createCanvas(800, 600, WEBGL);
    c.parent('sketch-holder');
    CANVAS = c.canvas;
    document.getElementById("link").href = 'https://twitter.com/incre_ment/status/1398353931869163521';
    document.getElementById("link").innerHTML = 'Starfield by @increment';
}


function draw() {
    background('#000000');
    // noFill();
    colorMode(RGB);

    rotateX(-1);
    rotateY(1);
    translate(800, 1200, 0);

    const NTHETA = 10;
    const R = 200;
    const RDELTA = 1;
    for(let i = 0; i < NTHETA; ++i) {
        for(let r = 100; r < 1200; r += 15) {

            const ybase = 300 - (r + 20*Math.sin(0.04*r + 0.15*frameCount)); 
            const theta = frameCount * 0.001 + i / NTHETA * 2 * Math.PI;
            // stroke ('#ffffff');
            // strokeWeight(4);
            // stroke(255, 255, 255);
            push();
            const spiral = 10 + Math.log(r)*2;
            translate(r * Math.cos(theta + spiral), ybase, r * Math.sin(theta + spiral));
            // translate(0.01*frameCount, 0, 0);

            fill('#111111'); noStroke(); cone(45, 0);
            const t = (1.0 + Math.sin(0.01*r + 0.03*frameCount)) * 0.5
            const gray = (255 - 30)*t + 30*(1-t);
            fill(color(gray, gray, gray)); noStroke(); translate(0, 2, 0); cone(50, 0);
            pop();
        }
    }
    updateGIFRecording();

}
