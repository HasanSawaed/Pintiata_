


// Keep track of recent events.
var lastGoodEvent;
var lastEvent;

// Are we mirroring our face render?
var mirrored = true;

/** Draw face on canvas */
function drawFace(event, bright, offset) {
    var context = canvas.getContext('2d');

    context.setTransform(1, 0, 0, 1, 0, 0);

    // The coordinates are screenspace, from -0.5 - 0.5,
    // so start drawing from the middle.
    context.translate(300, 338 / 2);

    // We're going to scale the points by the size
    // of my canvas, roughly.  Aspect ratio is usually
    // 16:9
    var faceScaleX = 600;
    var faceScaleY = 338;

    // Flip our axes as needed.
    // All points are in camera-space---they
    // are as you look to others, not
    // how you look to yourself, since your
    // local video feed is mirrored.
    if (mirrored) {
        context.scale(-1, 1);
    }

    if (bright) {
        context.strokeStyle = '#FF0000';
        context.fillStyle = '#FF0000';
    } else {
        context.strokeStyle = '#555555';
        context.fillStyle = '#555555';
    }

    // Draw all the points.
    context.beginPath();
    context.arc(faceScaleX * event.leftEyebrowLeft.x + offset,
        faceScaleY * event.leftEyebrowLeft.y, 5, 0, 2 * Math.PI);
    context.arc(faceScaleX * event.leftEyebrowRight.x + offset,
        faceScaleY * event.leftEyebrowRight.y, 5, 0, 2 * Math.PI);
    context.arc(faceScaleX * event.rightEyebrowLeft.x + offset,
        faceScaleY * event.rightEyebrowLeft.y, 5, 0, 2 * Math.PI);
    context.arc(faceScaleX * event.rightEyebrowRight.x + offset,
        faceScaleY * event.rightEyebrowRight.y, 5, 0, 2 * Math.PI);
    context.arc(faceScaleX * event.leftEye.x + offset,
        faceScaleY * event.leftEye.y, 5, 0, 2 * Math.PI);
    context.arc(faceScaleX * event.rightEye.x + offset,
        faceScaleY * event.rightEye.y, 5, 0, 2 * Math.PI);
    context.arc(faceScaleX * event.noseRoot.x + offset,
        faceScaleY * event.noseRoot.y, 5, 0, 2 * Math.PI);
    context.arc(faceScaleX * event.noseTip.x + offset,
        faceScaleY * event.noseTip.y, 5, 0, 2 * Math.PI);
    context.arc(faceScaleX * event.mouthLeft.x + offset,
        faceScaleY * event.mouthLeft.y, 5, 0, 2 * Math.PI);
    context.arc(faceScaleX * event.mouthCenter.x + offset,
        faceScaleY * event.mouthCenter.y, 5, 0, 2 * Math.PI);
    context.arc(faceScaleX * event.mouthRight.x + offset,
        faceScaleY * event.mouthRight.y, 5, 0, 2 * Math.PI);
    context.arc(faceScaleX * event.upperLip.x + offset,
        faceScaleY * event.upperLip.y, 5, 0, 2 * Math.PI);
    context.fill();

    // Draw all the lines.
    context.beginPath();
    context.moveTo(faceScaleX * event.leftEyebrowLeft.x + offset,
        faceScaleY * event.leftEyebrowLeft.y);
    context.lineTo(faceScaleX * event.leftEyebrowRight.x + offset,
        faceScaleY * event.leftEyebrowRight.y);
    context.moveTo(faceScaleX * event.rightEyebrowLeft.x + offset,
        faceScaleY * event.rightEyebrowLeft.y);
    context.lineTo(faceScaleX * event.rightEyebrowRight.x + offset,
        faceScaleY * event.rightEyebrowRight.y);
    context.moveTo(faceScaleX * event.noseRoot.x + offset, faceScaleY * event.noseRoot.y);
    context.lineTo(faceScaleX * event.noseTip.x + offset, faceScaleY * event.noseTip.y);
    context.moveTo(faceScaleX * event.mouthLeft.x + offset, faceScaleY * event.mouthLeft.y);
    context.lineTo(faceScaleX * event.mouthCenter.x + offset, faceScaleY * event.mouthCenter.y);
    context.lineTo(faceScaleX * event.mouthRight.x + offset, faceScaleY * event.mouthRight.y);
    context.lineTo(faceScaleX * event.upperLip.x + offset, faceScaleY * event.upperLip.y);
    context.lineTo(faceScaleX * event.mouthLeft.x + offset, faceScaleY * event.mouthLeft.y);
    context.stroke();
}

/** Draws the roll, pan, and tilt of your head. */
function drawRollPanTilt(event, bright) {
    var context = canvas.getContext('2d');
    // Draw eyes
    if (bright) {
        context.strokeStyle = '#FF0000';
        context.fillStyle = '#FF0000';
    } else {
        context.strokeStyle = '#555555';
        context.fillStyle = '#555555';
    }

    context.setTransform(1, 0, 0, 1, 0, 0);

    context.translate(300, 345);
    context.beginPath();
    context.arc(0, 0, 10, 0, 2 * Math.PI);
    context.stroke();

    context.font = '24pt Arial';
    context.textAlign = 'center';

    var arrowScale = 100;
    context.translate(-200, 0);
    context.fillText("Roll", 0, -10);
    context.beginPath();
    context.arc(0, 0, arrowScale / 2, 0, 2 * Math.PI);
    context.stroke();
    context.beginPath();
    context.moveTo(-Math.cos(event.roll) * arrowScale / 2,
        -Math.sin(event.roll) * arrowScale / 2);
    context.lineTo(Math.cos(event.roll) * arrowScale / 2,
        Math.sin(event.roll) * arrowScale / 2);
    context.stroke();

    var sign = event.pan > 0 ? -1 : 1;
    context.translate(200, 0);
    context.fillText("Pan", 0, -10);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(event.pan * arrowScale, 0);
    context.lineTo(event.pan * arrowScale + sign * 10, 10);
    context.lineTo(event.pan * arrowScale + sign * 10, -10);
    context.lineTo(event.pan * arrowScale, 0);
    context.stroke();
    if (sign == -1)
    //    alert('bitch');

        sign = event.tilt < 0 ? -1 : 1;
    context.translate(200, 0);
    context.textAlign = 'left';
    context.fillText("Tilt", 10, -10);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, -event.tilt * arrowScale);
    context.lineTo(10, -event.tilt * arrowScale + sign * 10);
    context.lineTo(-10, -event.tilt * arrowScale + sign * 10);
    context.lineTo(0, -event.tilt * arrowScale);
    context.stroke();
}

/** Per-frame render */
function drawFrame() {
    var context = canvas.getContext('2d');

    // Clear the canvas
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.fillStyle = 'rgb(0,0,0)';
    context.fillRect(0, 0, 600, 400);

    //  if (lastGoodEvent) {
    //      drawFace(lastGoodEvent, lastEvent.hasFace);
    //      drawRollPanTilt(lastGoodEvent, lastEvent.hasFace);
    //  }
    var arr = gapi.hangout.getParticipants();
    for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        // Do something with element i.
        // console.log(element.person.displayName);
        //console.log(gapi.hangout.data.getValue(element.id));

        try {
            drawFace(JSON.parse(gapi.hangout.data.getValue(element.id)), lastEvent.hasFace, i * 50);
        }
        catch (e)
      { }
    }

}

/** Animation loop */
function animate() {

    var event = lastGoodEvent;
    person = new Object();

    if (event != null) {
        person.hasFace = event.hasFace;
        person.leftEye = event.leftEye;
        person.leftEyebrowLeft = event.leftEyebrowLeft;
        person.leftEyebrowRight = event.leftEyebrowRight;
        person.lowerLip = event.lowerLip;
        person.mouthCenter = event.mouthCenter;
        person.mouthLeft = event.mouthLeft;
        person.mouthRight = event.mouthRight;
        person.noseRoot = event.noseRoot;
        person.noseTip = event.noseTip;
        person.pan = event.pan;
        person.rightEye = event.rightEye;
        person.rightEyebrowLeft = event.rightEyebrowLeft;
        person.rightEyebrowRight = event.rightEyebrowRight;
        person.roll = event.roll;
        person.tilt = event.tilt;
        person.upperLip = event.upperLip;

        //console.log(JSON.stringify(person));
    }

    gapi.hangout.data.setValue(gapi.hangout.getLocalParticipantId(), JSON.stringify(person));

    drawFrame();

    var arr = gapi.hangout.getParticipants();

    for (var i = 0; i < arr.length; i++) {
        var element = arr[i];
        // Do something with element i.
        // console.log(element.person.displayName);
        // console.log(gapi.hangout.data.getValue(element.id));
    }



    window.setTimeout(animate, 1000);
    // request new frame
    //    requestAnimFrame(function () {
    //     animate();
    // });
}

/** Standard requestAnimFrame from paulirish.com, running 30 fps */
window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 6);
    };
})();

/** Event handler */
function onFaceTrackingChanged(event) {
    try {
        lastEvent = event;




        if (event.hasFace) {
            //console.log(JSON.stringify(gapi.hangout.getParticipants()[0].id));
            //console.log("ffffff");
            //console.log(JSON.stringify(person));
            // gapi.hangout.data.setValue(gapi.hangout.getLocalParticipantId(), JSON.stringify(person));
            lastGoodEvent = event;

        }
    } catch (e) {
        console.log("onFaceTrackingChanged: ERROR");
        console.log(e);
    }
}

/** Sets up event handler and shows a topHat
* from the Media app to indicate who is the current
* face tracked.
*/
function startHeadTracking() {
    // Create hat overlay.
    var topHat = gapi.hangout.av.effects.createImageResource(
        'http://hangoutmediastarter.appspot.com/static/topHat.png');
    var overlay = topHat.createFaceTrackingOverlay(
        { 'trackingFeature':
         gapi.hangout.av.effects.FaceTrackingFeature.NOSE_ROOT,
            'scaleWithFace': true,
            'rotateWithFace': true,
            'scale': 1.0
        });
    overlay.setVisible(true);

    // Add event handler.
    gapi.hangout.av.effects.onFaceTrackingDataChanged.
        add(onFaceTrackingChanged);

    console.log('Started head tracking');
}

function onMirrorClicked() {
    var checkbox = document.getElementById('mirror');
    mirrored = checkbox.checked;
}