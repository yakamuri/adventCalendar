$(document).ready(function(){
    resizeDiv();

//main Slider
    var mySwiper = new Swiper ('.mainSlider', {

        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        onSlideChangeStart: function(){
            var slideQty = mySwiper.slides.length;
            var current = mySwiper.activeIndex + 1;
            $(".currentSlideNumber").text(current);
        }
    });
    var slideQty = mySwiper.slides.length;
    var current = mySwiper.activeIndex + 1;
    $(".currentSlideNumber").text(current);
    $( ".totalSlideNumber" ).text(slideQty);
//

// language scripts
    $('.de>a').on('click', function(){
        $(this).css({'background': '#fff', 'color': '#000'});
        $('.en>a').css({'background': '#d70f14', 'color': '#fff'});
    });
    $('.en>a').on('click', function(){
        $(this).css({'background': '#fff', 'color': '#000'});
        $('.de>a').css({'background': '#d70f14', 'color': '#fff'});
    });
//

//locationButton

    $('.locationButton').on('click', function(){
        if($(this).hasClass('menuClosee')){
            $(this).removeClass('menuClosee').addClass('locationButton');
        }
        else {
            $(this).addClass('menuClosee').removeClass('locationButton');
        }
        var loc = $('.locations');
        loc.toggle('slow', function(){});

        $('.navigation').toggle('slow', function(){
            $('.navigation ul').css('display', 'block');
        });
    });
//

//menuButton script

    $('.menuButton').on('click', function() {
        var windowSize = $(window).width();
        if($(this).hasClass('menuClose')){
            $(this).addClass('menuButton');
            $(this).removeClass('menuClose');
            $('.leftInvisible').removeClass('anim');
            $('.wrapper').removeClass('anim');
            if(windowSize > 992){
                $('.leftInvisible_col1').addClass('col-xs-12').removeClass('col-xs-4');
            }
        }
        else {
            $('.leftInvisible').addClass('anim');
            $('.wrapper').addClass('anim');
            $(this).addClass('menuClose');
            $(this).removeClass('menuButton');
            if(windowSize > 992){
                $('.leftInvisible_col1').addClass('col-xs-4').removeClass('col-xs-12');
            }
            var heightWin = $(window).height();
            if(heightWin < 540) {
                $('.leftInvisible').css('position', 'absolute');
            }
        }
    });


//
//searchButton
    $('.searchButton').on('click', function(){
        var winSize = $(window).width();
        if($(this).hasClass('active')){
            $(this).addClass('searchButton').removeClass('active');
            if(winSize <= 992){
                $('.wrapper').css('margin-left', '0');
            }
        }
        else {
            $(this).addClass('active').removeClass('searchButton');

            if(winSize <= 992){
                $('.wrapper').css('margin-left', '225px');
            }
        }
        $('.searchWrapper').toggle('slide').addClass('animate');
    });


    function search(){
        var title=$(".input").val();
        if(title!=""){
            $.ajax({
                type:"post",
                url:"search.php",
                data: { title: title},
                success:function(data){
                    $(".result").html(data);
                    $(".input").val("");
                }
            });
        }
    }
    $('.input').keypress(function( e ) {
        if(e.which == 13) {
            search();
        }
    });


//submenu show

    $('.mainMenu').on('click', function(){
       $('.leftWrapper').animate({
           left: '-212px'
       }, 500);
        $('.nav-submenu').show('slow', function(){
            $(this).css('left', '225px');
        });
    });
    $('.back').on('click', function(){
        $('.nav-submenu').hide('slow', function(){
            $(this).css('left', '0px');
        });
        $('.leftWrapper').animate({
            left: '0px'
        }, 500);
    });


//resize script
    window.onresize = function(event) {
       resizeDiv();
    };
    function resizeDiv() {
        var vpw = $(window).width();
        var vph = $(window).height();
        $('.mainSlider').css({'height': vph + 'px', 'width': vpw + 'px'});
    }
    $('.swiper-slide').on("click", function(){
            $(this).animate({
                height: ($(this).height() == 100+'%') ? 50 +'%' : 100 +'%'
            }, 200);
    });
//

// onScroll
    var iScrollPos = 0;
    $(window).scroll(function() {
        var iCurScrollPos = $(this).scrollTop();

        if (iCurScrollPos > iScrollPos) {
            $('.logoSmall').show();
            $('.logoBig').hide();

        } else {
            if(iCurScrollPos == 0)
            {
                $('.logoSmall').hide();
                $('.logoBig').show();
            }
        }
        iScrollPos = iCurScrollPos;
    });
//

//news slide
    var newsSwiper = new Swiper ('.newsSlider', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        slidesPerColumn: 2,
        nextButton: '.swiper-button-next-news',
        prevButton: '.swiper-button-prev-news',
        spaceBetween: 30
    });

    var blogSwiper = new Swiper ('.blogSlider', {
        pagination: '.swiper-pagination-blog',
        paginationClickable: true,
        slidesPerColumn: 2,
        nextButton: '.swiper-button-next-blog',
        prevButton: '.swiper-button-prev-blog',
        spaceBetween: 30
    });
//

//moreCases
        $('.last').hide(); //the last image
        //}
    $('.buttonMore').on('click', function(){
        $('.gridHidden').show('slow');
        $('.buttonLess').show('slow');
        $('.buttonMore').hide('slow');

        $('.last').show();
    });
    $('.buttonLess').on('click', function(){
        $('.buttonMore').show('slow');
        $('.buttonLess').hide('slow');
        $('.gridHidden').hide('slow');
        $('.last').hide();
    });
    $(".jumper").on("click", function( e ) {
        e.preventDefault();
        $("body, html").animate({
            scrollTop: $( $(this).attr('href') ).offset().top
        }, 600);
    });
//

//play Video

    var scrollTop = '';
    var newHeight = '100';

    $(window).bind('scroll', function() {
        scrollTop = $( window ).scrollTop();
        newHeight = scrollTop + 100;
    });

    $('.popup-trigger').click(function(e) {
        e.stopPropagation();
        if(jQuery(window).width() < 767) {
            $(this).after($('.popup'));
            $('.popup').fadeIn().addClass('popup-mobile').css('top', -200);
            $('.videoOverlay').fadeIn('slow').css('z-index', '1000');

        } else {
            $('.popup').removeClass('popup-mobile').css('top', newHeight).toggle( function(){
                $('.videoOverlay').fadeIn('slow').css('z-index', '1000');
            });
            $('html, body').animate({
                scrollTop: $('.popup').offset().top
            }, 500);
        }
    });
    $('html').click(function() {
        $('.popup').hide(function(){
            $('.videoOverlay').fadeOut('slow').css('z-index', '-1');
        });
    });

    $('.popup-btn-close').click(function(){
        $('.popup').hide( function(){
            $('.videoOverlay').fadeOut('slow').css('z-index', '-1');
        });
    });


    //open-close

    $('.container_col').on('click', function() {

        var siblingWrap = $(this).siblings('.hiddenWrap');
        var isOpen = siblingWrap.hasClass('open');
        $('.hiddenWrap.open').removeClass('open');

        if(isOpen == false){
            siblingWrap.addClass('open');
        }

        var maxHeight = siblingWrap[0].scrollHeight;
        console.log(maxHeight);
        siblingWrap.css('height', maxHeight);
    });

});

//leftSideInvisible

$('.jumperr').on("click", function( e ) {
    e.preventDefault();
    $('body, html').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 600);
});
