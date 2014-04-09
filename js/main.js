jQuery(document).ready(function(){
    /* google map*/
    function initialize() {
        var myLatlng = new google.maps.LatLng(-12.109068,-77.031412);
        var mapOptions = {
            zoom: 16,
            panControl: true,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE
            },
            scaleControl: true,
            center: new google.maps.LatLng(-12.109,-77.031)
        }
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'LDS Architecs'
        });
        var infowindow = new google.maps.InfoWindow({
            content: '<h5>LDS Architecs</h5>'+'<p>Arquitectura, construcción &amp; diseño interior</p>'
        });
        //infowindow.open(map, marker);
        makeInfoWindowEvent(map, infowindow, marker);
    }
    function makeInfoWindowEvent(map, infowindow, marker) {
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);


    /* modal */
    var overlay = $('.overlay');
    $('#show').click(function(){
        overlay.show("slow");
        $("body").animate({
            scrollTop : 0
        }, function() {
            var scrollPosition = [self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop];
            var html = jQuery('html');
            // it would make more sense to apply this to body, but IE7 won't have that
            html.data('scroll-position', scrollPosition);
            html.data('previous-overflow', html.css('overflow'));
            html.css('overflow', 'hidden');
            window.scrollTo(scrollPosition[0], scrollPosition[1]);
        });
    });
    overlay.click(function(evt){
        overlay.animate({
            opacity : "hide"
        }, 500, function() {
            var html = jQuery('html');
            var scrollPosition = html.data('scroll-position');
            html.css('overflow', html.data('previous-overflow'));
            window.scrollTo(scrollPosition[0], scrollPosition[1])
        });
    });

    /* form validate*/
    function validateNombres(field){
        if (field == "") return "-Ingresar nombres y apellidos validos.\n"
        return ""
    };

    function validatePhone(field) {
        if(field == ""){
            return "-Ingresar número de teléfono valido.\n"
        }else{
            if (isNaN(field)) return "-Ingresar número de teléfono valido.\n"
        }
        return ""
    }

    function validateEmail(field) {
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if(field == ""){
            return "-Ingresar correo valido.\n"
        } else{
            if (testEmail.test(field)){
                return ""
            } else{
                return "-Ingresar correo valido.\n"
            }
        }
    }

    function validateMessage(field){
        if (field == "") return "-Ingresar un mensaje válido.\n"
        return ""
    };
    function validate()
    {
        fail = validateNombres($('form').find('#nombres').val())
        fail += validateEmail($('form').find('#correo').val())
        fail += validatePhone($('form').find('#telefono').val())
        fail += validateMessage($('form').find('#mensaje').val())
        if (fail == "") return true
        else { return false }
    }

    /*submit form*/
    $("form").submit(function (e) {
        e.preventDefault();
        $("form").append("<input type='hidden' name='browser' value='" + navigator.userAgent + "'/>");
        if(validate()){
            $("input[type='submit']").animate({
                opacity: "hide"
            }, 500, function () {

                $(".loading").animate({
                    opacity: "show"
                }, 500);
            });
            $.post("contacto.php", $("form").serialize(), function (data) {
                $(".loading").animate({
                    opacity: "hide"
                });
                if (data.success) {
                    $("form").html("<div class='gracias'>Su mensaje ha sido enviado. Dentro de poco un representante se pondrá en contacto con usted</div>");
                } else {
                    alert(data.mensaje);
                    console.log(data.mensaje);
                    $("#enviar").animate({
                        opacity: "show"
                    }, 200);
                    $(".loading").animate({
                        opacity: "hide"
                    }, 200);
                }
            }, "json");
        } else{
            fail = validateNombres($('form').find('#nombres').val())
            fail += validateEmail($('form').find('#correo').val())
            fail += validatePhone($('form').find('#telefono').val())
            fail += validateMessage($('form').find('#mensaje').val())
            alert(''+fail);
        }
    });
});

