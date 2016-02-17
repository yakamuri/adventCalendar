$(document).ready(function(){

    function addChallenge(grid) {

        var wrap = grid.parent();
        var id = wrap.attr('href').substring(1);
        var index = grid.attr('index');

        grid.removeClass('active' + index).removeClass('active');

        $(".popupContent").load("challenge.html #" + id, function() {

            var error = $(this).siblings('.error').hide();
            var button = $(this).find('.button');

            button.bind('click', function() {
                if($(this).hasClass('green')) {
                    $('.popup').hide(function () {
                        $('.overlay').fadeOut('slow').css('z-index', '-1');
                        var index = grid.attr('index');
                        grid.addClass('active' + index).addClass('active');
                    });
                }
                else {
                    $(this).parents('.popupContent').siblings('.error').show();
                }
            });

            var option = $(this).find('#select option');
            option.bind('click', function() {

                if($('#select option:selected').val() == 'green') {
                    console.log('aici');
                    $('.popup').hide(function () {
                        $('.overlay').fadeOut('slow').css('z-index', '-1');
                        var index = grid.attr('index');
                        grid.addClass('active' + index).addClass('active');
                    });
                }
                else {
                    $(this).parents('.popupContent').siblings('.error').show();
                }
            });

            var input = $(this).find('#s');
            input.bind('keyup', function() {
                var val = input.val();
                var wrong = $(this).parents('.popupContent').siblings('.error');
                if((val.length >= 2) && (val =='green')) {
                    $('.popup').hide(function () {
                        $('.overlay').fadeOut('slow').css('z-index', '-1');
                        var index = grid.attr('index');
                        grid.addClass('active' + index).addClass('active');
                    });
                }
                else if((val.length > 4) && (val != "green")) {
                    wrong.show();
                }
                else if((val.length <= 4)) {
                    wrong.hide();
                }
            });


            var inc = $(this).find('.btn');
            inc.bind('click', function() {
                fieldName = $(this).attr('data-field');
                type      = $(this).attr('data-type');
                var input = $("input[name='"+fieldName+"']");
                var currentVal = parseInt(input.val());
                var wrong = $(this).parents('.popupContent').siblings('.error');
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
                            wrong.hide();
                        }
                        else if(value < 1) {
                            wrong.show();
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
                            wrong.hide();
                        }
                        else if(value > 4) {
                            wrong.show();
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

    $('.image').on('click', function(){

        var number = $(this).parent().attr('index');
        console.log(number);

        var bigPic = $(this).parents('.wrapper').siblings().find('.bigImage' + number);
        console.log(bigPic);

        bigPic.fadeIn('slow').css('z-index', '1111');
    });

    $('.popup-btn-close').click(function(){
        $('.popup').hide( function(){
            $('.overlay').fadeOut('slow').css('z-index', '-1');
        });
    });

});




