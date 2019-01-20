var canvas = document.getElementById('QRCode');

var ctx = canvas.getContext("2d");

ctx.fillText("[QR CODE]", 10, 50);


$(document).ready(function(){ 

    // GET PATIENT
    var id = window.location.search.split('=')[1];

    if(id) {
        $.ajax( { url: "https://api.mlab.com/api/1/databases/ilyabulychev/collections/qrcodes/"+id+"?apiKey=i8dWtPvSsw7NR7H7FSbP3RXCgs1IJfBT",
		  type: "GET",
          contentType: "application/json",

          success: function(data) {

            $("#fio").html(`${data.firstName} ${data.secondName} ${data.lastName}`);
            $("#patient-gender").html(data.gender);
            $("#patient-birth-date").html(data.birthDate);
            $("#patient-age").html(data.age);
            $("#patient-height").html(data.height);
            $("#patient-weight").html(data.weight);
       

            QRCode.toCanvas(document.getElementById('QRCode'), window.location.href, function (error) {
            if (error) console.error(error)
                console.log('success!');
            })
            
        } });
    }
});



