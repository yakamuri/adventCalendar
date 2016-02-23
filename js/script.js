$(document).ready(function(){

    function addChallenge(grid) {

        var wrap = grid.parent();
        var id = wrap.attr('href').substring(1);
        var index = grid.attr('index');

        grid.removeClass('active' + index).removeClass('active');

        $(".popupContent").load("challenge.html #" + id, function() {

            var error = $(this).siblings('.error');

            var button = $(this).find('.button');
            button.bind('click', function(){
                if($(this).hasClass('green')){
                    $('.popup').hide('slow', function () {
                        $('.overlay').fadeOut('slow').css('z-index', '-1');
                        var index = grid.attr('index');
                        grid.addClass('active' + index).addClass('active');
                    });
                }
                else {
                    error.show();
                }
            });

            var option = $(this).find('#select option');
            option.bind('click', function() {

                if($('#select option:selected').val() == 'green') {
                    $('.popup').hide(function () {
                        $('.overlay').fadeOut('slow').css('z-index', '-1');
                        var index = grid.attr('index');
                        grid.addClass('active' + index).addClass('active');
                    });
                }
                else {
                    error.show();
                }
            });

            var input = $(this).find('#s');
            input.bind('keyup', function() {
                var val = input.val();
                //var wrong = $(this).parents('.popupContent').siblings('.error');
                if((val.length >= 2) && (val =='green')) {
                    $('.popup').hide(function () {
                        $('.overlay').fadeOut('slow').css('z-index', '-1');
                        var index = grid.attr('index');
                        grid.addClass('active' + index).addClass('active');
                    });
                }
                else if((val.length > 4) && (val != "green")) {
                    error.show();
                }
                else if((val.length <= 4)) {
                    error.hide();
                }
            });

            var inc = $(this).find('.btn');
            inc.bind('click', function() {
                fieldName = $(this).attr('data-field');
                type      = $(this).attr('data-type');
                var input = $("input[name='"+fieldName+"']");
                var currentVal = parseInt(input.val());
                //var wrong = $(this).parents('.popupContent').siblings('.error');
                if (!isNaN(currentVal)) {
                    var value = $(this).siblings('.reset').val();

                    if(type == 'minus') {
                        input.val(currentVal - 1);
                        if(value == 6){
                            $('.popup').hide(function () {
                                $('.overlay').fadeOut('slow').css('z-index', '-1');
                                var index = grid.attr('index');
                                grid.addClass('active' + index).addClass('active');
                            });
                        }
                        else if((value > 0) && (value < 7)){
                            error.hide();
                        }
                        else if(value < 1) {
                            error.show();
                        }
                    }
                    else if(type == 'plus') {
                        input.val(currentVal + 1);

                        if(value == 4){
                            $('.popup').hide(function () {
                                $('.overlay').fadeOut('slow').css('z-index', '-1');
                                var index = grid.attr('index');
                                grid.addClass('active' + index).addClass('active');
                            });
                        }
                        else if((value >= 0) && (value < 5)) {
                            error.hide();
                        }
                        else if(value > 4) {
                            error.show();
                        }
                    }

                } else {
                    input.val(0);
                }

            });

            var tab = $(this).find('ul.tabs li');
            tab.bind('click', function(){
                var tab_id = $(this).attr('data-tab');
                console.log(tab_id);

                tab.removeClass('current');
                $('.tab-content').removeClass('current');

                $(this).addClass('current');
                $("#"+tab_id).addClass('current');

            });

            var accordion = $("#accordion div");
            accordion.first().css('display', 'block');

            var link = $("#accordion a");
            link.bind('click', function(e) {
                e.preventDefault();
                var a = $(this).attr("href");
                $(a).slideDown('slow');
                accordion.not(a).slideUp('slow');
            });


            $('.mycheckbox').click(function() {
                $(this).parent().siblings().find('input:checkbox').prop('checked', false);
            });

            $('#submit').on('click', function(){

                var checkbox = $(this).parent().siblings().find('.mycheckbox');
                var green = $(this).parent().siblings().find('.green');

                if((checkbox.is(':checked')) && (green.is(':checked'))){
                    error.hide();
                    $('.popup').hide(function () {
                        $('.overlay').fadeOut('slow').css('z-index', '-1');
                        var index = grid.attr('index');
                        grid.addClass('active' + index).addClass('active');
                    });
                }
                else {
                    error.show();
                }
            });


            $('.submit').on('click', function(){
                var radio = $(this).siblings('.green');
                var inp = radio.find('input:radio');

                if(inp.is(':checked')){
                    error.hide();
                    $('.popup').hide(function () {
                        $('.overlay').fadeOut('slow').css('z-index', '-1');
                        var index = grid.attr('index');
                        grid.addClass('active' + index).addClass('active');
                    });
                }
                else {
                    error.show();
                }
            });

            var check = $(this).find('input:checkbox');
            check.on('click', function(){
                var submit = $(this).siblings('.mysubmit');
                if(($(this).is(':checked')) == true) {
                    //var enable = submit.prop('disabled', false).css('opacity', '1');
                    submit.on('click', function(){
                        $('.popup').hide(function () {
                            $('.overlay').fadeOut('slow').css('z-index', '-1');
                            var index = grid.attr('index');
                            grid.addClass('active' + index).addClass('active');
                        });
                    });
                }
                else {
                    submit.prop('disabled', true).css('opacity', '0.5');
                }
            });

            var challenge = $(this).find('.content');
            if(challenge.hasClass('challenge')) {
                $('.challenge').bind('click', function(){
                    $('.popup').hide('slow', function () {
                        $('.overlay').fadeOut('slow').css('z-index', '-1');
                        var index = grid.attr('index');
                        grid.addClass('active' + index).addClass('active');

                        var splitL = $(this).parent().siblings().find('.grid1');
                        var splitR = $(this).parent().siblings().find('.grid2');
                        splitL.addClass('active26');
                        splitR.addClass('active27');

                    });
                });
            }
            else {
                error.show();
            }
        });
    }


    $('.grid').on('click', function(e) {
        e.preventDefault();
            var scrollTop = '';
            var newHeight = '100';
            $(window).bind('scroll', function() {
                scrollTop = $( window ).scrollTop();
                newHeight = scrollTop + 100;
            });
            $('.popup').css('top', newHeight).toggle( function() {
                $('.overlay').fadeIn('slow').css('z-index', '1000');
            });

            addChallenge($(this));
    });


    var $el;
    $('.image').on('click', function() {
        $el = $(this);
        $('<img />', {
            "src": $el.attr('href'),
            "class": "larger"

        }).load(function() {

            $(this)
                .appendTo('body')
                .width($el.find('img').width())
                .position({
                    "of": $el.find('img'),
                    "my": "center center",
                    "at": "center center"
                })
                .animate({
                        width: 70 + '%'
                    }, {
                        "duration": 1000,
                        "easing": "easeOutQuad",
                        "step": function(i) {
                            $(this).position({
                                "of": $el.find('img'),
                                "my": "center center",
                                "at": "center center",
                                "collision": "fit"
                            })
                        }

                    }
                )
        });

        return false;
    });

    $('.larger').on('click', function() {
        $el = $(this);
        $el.fadeOut(400, function() {
            console.log('here');
            $el.remove();
        })
    });


    $('.popup-btn-close').on('click', function(){
        $('.popup').hide( function(){
            $('.overlay').fadeOut('slow').css('z-index', '-1');

        });
    });

});




