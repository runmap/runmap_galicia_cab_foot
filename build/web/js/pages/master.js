$(document).ready(function () {

    $.cookieCuttr({
        cookieAnalytics: false,
        cookieCutter: true,
        cookieDisable: '.comments',
        cookieNotificationLocationBottom: true,
        cookieAcceptButtonText: 'ACEPTAR',
        cookieMessage: 'Utilizamos cookies propias e de terceiros para mellorar os nosos servizos. Se continuas navegando, consideramos que aceptas o seu uso. <a href="/politica-cookies">Política de cookies</a> '
    });

    $("#linEntrar").on("click", function (event) {

        var isValid = $("#form1").valid();

        if (!isValid) {
            event.preventDefault();
        }
    });

});