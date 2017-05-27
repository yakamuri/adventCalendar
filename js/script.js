$(document).ready(function(){

    function hideOverlay(grid) {
        $('.popup').hide('slow', function () {
            $('.overlay').fadeOut('slow').css('z-index', '-1');
            var index = grid.attr('index');
            grid.addClass('active' + index).addClass('active');
            setTimeout(function(){
                grid.remove();
            }, 4000);
        });
    }


    function addChallenge(grid) {
        var wrap = grid.parent();
        var id = wrap.attr('href').substring(1);
        var index = grid.attr('index');

        grid.removeClass('active' + index).removeClass('active');

        $(".popupContent").load("challenge.html #" + id, function() {

            $(this).siblings('.error').hide();

            var button = $(this).find('.button');
            button.bind('click', function(){
                if($(this).hasClass('green')){
                    hideOverlay(grid);
                }
                else {
                    $(this).parents('.popupContent').siblings('.error').show();
                }
            });

            var option = $(this).find('#select');
            option.on('change', function() {
                if(option.val() == 'green') {
                    hideOverlay(grid);
                }
                else {
                    $(this).parents('.popupContent').siblings('.error').show();
                }
            });

            var input = $(this).find('#s');
            $(this).parents('.popupContent').siblings('.error').hide();
            input.bind('keyup', function() {
                var val = input.val();
                if((val.length >= 2) && (val =='green')) {
                    hideOverlay(grid);
                }
                else if((val.length > 4) && (val != "green")) {
                    $(this).parents('.popupContent').siblings('.error').show();
                }
                else if((val.length <= 4)) {
                    $(this).parents('.popupContent').siblings('.error').hide();
                }
            });

            var inc = $(this).find('.btn');
            inc.bind('click', function() {
                fieldName = $(this).attr('data-field');
                type      = $(this).attr('data-type');
                var input = $("input[name='"+fieldName+"']");
                var currentVal = parseInt(input.val());
                if (!isNaN(currentVal)) {
                    var value = $(this).siblings('.reset').val();

                    if(type == 'minus') {
                        input.val(currentVal - 1);
                        if(value == 6){
                            hideOverlay(grid);
                        }
                        else if((value > 0) && (value < 7)){
                            $(this).parents('.popupContent').siblings('.error').hide();
                        }
                        else if(value < 1) {
                            $(this).parents('.popupContent').siblings('.error').show();
                        }
                    }
                    else if(type == 'plus') {
                        input.val(currentVal + 1);

                        if(value == 4){
                            hideOverlay(grid);
                        }
                        else if((value >= 0) && (value < 5)) {
                            $(this).parents('.popupContent').siblings('.error').hide();
                        }
                        else if(value > 4) {
                            $(this).parents('.popupContent').siblings('.error').show();
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
                    $(this).parents('.popupContent').siblings('.error').hide();
                    hideOverlay(grid);
                }
                else {
                    $(this).parents('.popupContent').siblings('.error').show();
                }
            });


            $('.submit').on('click', function(){
                var radio = $(this).siblings('.green');
                var inp = radio.find('input:radio');

                if(inp.is(':checked')){
                    $(this).parents('.popupContent').siblings('.error').hide();
                    hideOverlay(grid);
                }
                else {
                    $(this).parents('.popupContent').siblings('.error').show();
                }
            });

            var check = $(this).find('input:checkbox');
            check.on('click', function(){
                var submit = $(this).siblings('.mysubmit');
                if(($(this).is(':checked')) == true) {
                    submit.prop('disabled', false).css('opacity', '1');
                    submit.bind('click', function(){
                        hideOverlay(grid);
                    });
                }

                else {
                    submit.prop('disabled', true).css('opacity', '0.5');
                }
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


    $('.image').on('click', function (e) {
        e.preventDefault();
        var href = $(this).attr('href');

        var initial_position = $(this).find("img")[0].getBoundingClientRect();
        console.log(initial_position);
        var top = $(this).position().top;
        var left = $(this).position().left;

        $('.overlay-zoom').fadeIn(400, function() {

            $(this).css('z-index', '1000');
            var final_position = $(this)[0].getBoundingClientRect();
            var pos_string = 'position: fixed; top:' + initial_position.top + 'px;left:' + initial_position.left + 'px; width:' +initial_position.width + 'px; height:' +initial_position.height + 'px';

            console.log(pos_string);
            var string = '<img class="enlarged" src="' + href + '" style="'+pos_string+'"  alt="" /><div class="popup-btn-close" /></div>';
            $(this).html(string);

            var anim = $(this).find('img');
            var final_position_string = {top:final_position.top ,left: final_position.left,width:final_position.width, height: +final_position.height};

            console.log(final_position_string);
            anim.animate(final_position_string,1000);

            var close = $(this).find('.popup-btn-close');
            close.on('click', function(){
                //$('.popup-zoom').fadeOut('slow', function(){
                //    $('.overlay-zoom').fadeOut('slow').css('z-index', '-1');
                //});
                $('.overlay-zoom').fadeOut('slow');
            });
        });
    });

    $('.popup-btn-close').bind('click', function(){
        $('.popup').hide('slow', function(){
            $('.overlay').fadeOut('slow').css('z-index', '-1');
        });
    });

});




