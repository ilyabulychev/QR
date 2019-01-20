var canvas = document.getElementById('rqcode');

var ctx = canvas.getContext("2d");
ctx.font = "18px Arial";
ctx.fillText("[QR CODE WILL BE HERE]", 10, 50);


$(document).ready(function(){ 

    // GET PATIENT
    var id = window.location.search.split('=')[1];

    if(id) {
        $.ajax( { url: "https://api.mlab.com/api/1/databases/ilyabulychev/collections/qrcodes/"+id+"?apiKey=i8dWtPvSsw7NR7H7FSbP3RXCgs1IJfBT",
		  type: "GET",
          contentType: "application/json",

          success: function(data) {

            $("#firstName").val(data.firstName);
            $("#secondName").val(data.secondName);
            $("#lastName").val(data.lastName);
            $("#birthDate").val(data.birthDate);

            $("#gender").val(data.gender);
            $("#age").val(data.age);
            $("#height").val(data.height);
            $("#weight").val(data.weight);

            QRCode.toCanvas(document.getElementById('rqcode'), window.location.href, function (error) {
            if (error) console.error(error)
                console.log('success!');
            })
            
        } });
    }

    $('#medicalcard').on('click', function() {
        window.location = './title.html?id=' + id;
    });

    $('#save').on('click', function() {

        $.ajax( { url: "https://api.mlab.com/api/1/databases/ilyabulychev/collections/qrcodes?apiKey=i8dWtPvSsw7NR7H7FSbP3RXCgs1IJfBT",
		  data: JSON.stringify( { 
              firstName : $("#firstName").val(),
              secondName: $("#secondName").val(),
              lastName: $("#lastName").val(),
              birthDate: $("#birthDate").val(),

              gender: $("#gender").val(),
              age: $("#age").val(),
              height: $("#height").val(),
              weight: $("#weight").val(),
            } ),
		  type: "POST",
          contentType: "application/json",

          success: function(data) {
            alert("Patient is saved! JSON:" + JSON.stringify(data));

            window.location = './patient.html?id=' +  data._id.$oid;;
            
        } });
    });

    
    $('#delete').on('click', function() {

        $.ajax( { url: "https://api.mlab.com/api/1/databases/ilyabulychev/collections/qrcodes/"+id+"/?apiKey=i8dWtPvSsw7NR7H7FSbP3RXCgs1IJfBT",
        type: "DELETE",
        contentType: "application/json",
        
        success: function(data) {
            window.location = './patient.html';
        } 
    });

    });
});



