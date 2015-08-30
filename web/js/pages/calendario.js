$(document).ready(function () {

    $("#nav-calendario").addClass("active");

    $('.carousel').carousel();

    if ($('.carousel-inner div.item').length == 1) {
        $('.carousel-control').hide();
    }

});
