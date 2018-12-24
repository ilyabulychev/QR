// PATIENTS ===

$(document).ready(function(){ 

    $.ajax( { url: "https://api.mlab.com/api/1/databases/ilyabulychev/collections/qrcodes?apiKey=i8dWtPvSsw7NR7H7FSbP3RXCgs1IJfBT",
        type: "GET",
        contentType: "application/json",
        
        success: function(data) {
            console.log(data);
            data.forEach(function(patient){
                let clone = $("#template").clone().appendTo("#patients");
                $(clone).show();
                $(clone).attr('id', 'patient-' + patient._id.$oid);
                $(clone).find('.firstName').html(patient.firstName);
                $(clone).find('.secondName').html(patient.secondName);
                $(clone).find('.lastName').html(patient.lastName);
                $(clone).find('.birthDate').html(patient.birthDate);
                $(clone).find('a').attr('href', './patient.html?id=' + patient._id.$oid);
              });

        } 
    });

});


// SCANNER LOADER ===

var video = document.createElement("video");
var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d");
var loadingMessage = document.getElementById("loadingMessage");
var outputContainer = document.getElementById("output");
var outputMessage = document.getElementById("outputMessage");
var outputData = document.getElementById("outputData");

function drawLine(begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
}


navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
    video.srcObject = stream;
    video.setAttribute("playsinline", true); 
    video.play();
    requestAnimationFrame(tick);
}).catch((e) => { console.log(e); });

function tick() {
    loadingMessage.innerText = "Loading video..."
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
    loadingMessage.hidden = true;
    canvasElement.hidden = false;
    outputContainer.hidden = false;

    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
    var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
    });
    if (code) {
        drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
        drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
        drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
        drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
        outputMessage.hidden = true;
        outputData.parentElement.hidden = false;
        outputData.innerText = code.data;
        window.location = code.data;
    } else {
        outputMessage.hidden = false;
        outputData.parentElement.hidden = true;
    }
    }
    requestAnimationFrame(tick);
}
