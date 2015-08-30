$(document).ready(function () {

    $("#form1").validate(
        {
            errorClass: "has-error"
        }
    );

    if ($(".required").length) {
        $(".required").rules("add", {
            required: true
        });
    }

    if ($(".digits").length) {
        $(".digits").rules("add", {
            digits: true
        });
    }

    if ($(".number").length) {
        $(".number").rules("add", {
            number: true
        });
    }

    if ($(".date").length) {
        $(".date").rules("add", {
            date: true
        });
    }

    if ($(".nif").length) {
        $(".nif").rules("add", {
            nifES: true
        });
    }

    if ($(".equalTo").length) {
        $(".equalTo").rules("add", {
            equalTo: "#" + $(".equal").attr("id")
        });
    }

    if ($("input[type=email]").length) {
        $("input[type=email]").rules("add", {
            email: true
        });
    }

    jQuery.validator.addMethod("nifES", function (value, element) {
        "use strict";

        value = value.toUpperCase();

        // Basic format test
        if (!value.match('((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)')) {
            return false;
        }

        // Test NIF
        if (/^[0-9]{8}[A-Z]{1}$/.test(value)) {
            return ("TRWAGMYFPDXBNJZSQVHLCKE".charAt(value.substring(8, 0) % 23) === value.charAt(8));
        }
        // Test specials NIF (starts with K, L or M)
        if (/^[KLM]{1}/.test(value)) {
            return (value[8] === String.fromCharCode(64));
        }

        return false;

    }, "Por favor, introduce un NIF válido.");

    jQuery.validator.addMethod("nieES", function (value, element) {
        "use strict";

        value = value.toUpperCase();

        // Basic format test
        if (!value.match('((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)')) {
            return false;
        }

        // Test NIE
        //T
        if (/^[T]{1}/.test(value)) {
            return (value[8] === /^[T]{1}[A-Z0-9]{8}$/.test(value));
        }

        //XYZ
        if (/^[XYZ]{1}/.test(value)) {
            return (
             value[8] === "TRWAGMYFPDXBNJZSQVHLCKE".charAt(
              value.replace('X', '0')
               .replace('Y', '1')
               .replace('Z', '2')
               .substring(0, 8) % 23
             )
            );
        }

        return false;

    }, "Por favor, introduce un NIE válido.");

    jQuery.validator.addMethod("cifES", function (value, element) {
        "use strict";

        var sum,
         num = [],
         controlDigit;

        value = value.toUpperCase();

        // Basic format test
        if (!value.match('((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)')) {
            return false;
        }

        for (var i = 0; i < 9; i++) {
            num[i] = parseInt(value.charAt(i), 10);
        }

        // Algorithm for checking CIF codes
        sum = num[2] + num[4] + num[6];
        for (var count = 1; count < 8; count += 2) {
            var tmp = (2 * num[count]).toString(),
             secondDigit = tmp.charAt(1);

            sum += parseInt(tmp.charAt(0), 10) + (secondDigit === '' ? 0 : parseInt(secondDigit, 10));
        }

        // CIF test
        if (/^[ABCDEFGHJNPQRSUVW]{1}/.test(value)) {
            sum += '';
            controlDigit = 10 - parseInt(sum.charAt(sum.length - 1), 10);
            value += controlDigit;
            return (num[8].toString() === String.fromCharCode(64 + controlDigit) || num[8].toString() === value.charAt(value.length - 1));
        }

        return false;

    }, "Por favor, introduce in CIF válido.");

    jQuery.extend(jQuery.validator.messages, {
        required: "Campo obligatorio",
        remote: "Selección incorrecta",
        email: "Introduce una dirección de mail válida",
        url: "Introduce una dirección válida",
        date: "Introduce una fecha válida",
        dateISO: "Introduce una fecha válida (ISO).",
        number: "Introduce un número entero o decimal",
        digits: "Introduce solo dígitos",
        creditcard: "Introduce una tarjeta de crédito válida",
        equalTo: "Introduce el mismo valor",
        accept: "Please enter a value with a valid extension.",
        maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
        minlength: jQuery.validator.format("Please enter at least {0} characters."),
        rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
        range: jQuery.validator.format("Please enter a value between {0} and {1}."),
        max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
        min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
    });

     if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
         var msViewportStyle = document.createElement("style")
 
         msViewportStyle.appendChild(
             document.createTextNode(
                 "@-ms-viewport{width:auto!important}"
             )
         )
 
         document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
     }
});

var baseApiUrl = "";

function DefaultErrorHandler(xhr, status, error) {
    console.log(xhr);
};

function DoAjax(type, handler, data, fnDone, fnFail) {
    if (!data) data = {};

    if (!fnFail) fnFail = DefaultErrorHandler;

    var request = $.ajax({
        type: type,
        url: baseApiUrl + handler,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false
    }).done(fnDone)
      .fail(fnFail);

    return request;
};