$(window).on('load', function(){

    $('#open-switch').click(function(){

        $("#switch").toggleClass("open-switch");
        
    });
    
    stylePath="css/style.css";
    componentsPath="css/components.css";
    
    $("#combo1").click(function(){
        $('head').append('<link rel="stylesheet" type="text/css" href="css/style-beige.css">');
        $('head').append('<link rel="stylesheet" type="text/css" href="css/components-beige.css">');
    });

    $("#combo2").click(function(){
        $('head').append('<link rel="stylesheet" type="text/css" href="css/style-blue.css">');
        $('head').append('<link rel="stylesheet" type="text/css" href="css/components-blue.css">');
    });

    $("#combo3").click(function(){
        $('head').append('<link rel="stylesheet" type="text/css" href="css/style-green.css">');
        $('head').append('<link rel="stylesheet" type="text/css" href="css/components-green.css">');
    });

    $("#combo4").click(function(){
        $('head').append('<link rel="stylesheet" type="text/css" href="css/style-peach.css">');
        $('head').append('<link rel="stylesheet" type="text/css" href="css/components-peach.css">');
    });

    $("#combo5").click(function(){
        $('head').append('<link rel="stylesheet" type="text/css" href="css/style-red.css">');
        $('head').append('<link rel="stylesheet" type="text/css" href="css/components-red.css">');
    });

    $("#combo6").click(function(){
        $('head').append('<link rel="stylesheet" type="text/css" href="css/style-yellow.css">');
        $('head').append('<link rel="stylesheet" type="text/css" href="css/components-yellow.css">');
    });
    
});