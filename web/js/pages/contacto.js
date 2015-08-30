$(document).ready(function () {


    $("#nav-contacto").addClass("active");

    $("#linEnviar").on("click", function (event) {

        var isValid = $("#form1").valid();

        if (!isValid) {
            event.preventDefault();
            $(".span-error").html("Revisa los datos. Los campos marcados en rojo son incorrectos.");
        }
    });

});