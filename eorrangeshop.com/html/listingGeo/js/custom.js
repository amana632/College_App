jQuery(document).ready(function () {

    "use strict";
    /*--------------------------------------------
    		Window Scroll Settings
	---------------------------------------------*/
    $(window).on('scroll', function (event) {
        var scroll = $(window).scrollTop();
        if (scroll >= 80) {
            $(".main-nav-section").addClass("nav-affix");
            $("#cbp-spmenu-s1").addClass("nav-affix");
        } else {
            $(".main-nav-section").removeClass("nav-affix");
            $("#cbp-spmenu-s1").removeClass("nav-affix");
        }
    });

    /*--------------------------------------------
    		Responsive-menu Settings
    ---------------------------------------------*/
    var menuLeft = $("#cbp-spmenu-s1"),
        showLeftPush = $("#showLeftPush"),
        bodyWrap = $("body");
    showLeftPush.on('click', function () {
        $(this).toggleClass('active');
        bodyWrap.toggleClass('menu-collapsed menu-expanded');
        menuLeft.toggleClass('active');
        disableOther('showLeftPush');
        var logoText = $(".logo-text");
        logoText.fadeToggle();
    });

    function disableOther(button) {
        if (button !== 'showLeftPush') {
            showLeftPush.toggleClass('disabled');
        }
    }
    $('.accordion-menu [data-accordion]').accordion();

    $('.nav-item[data-control]').on('mouseover', function () {
        $(this).addClass('hovered');
    });

    $('.nav-item[data-control]').on('mouseleave', function () {
        $(this).removeClass('hovered');
    });

    $(function () {
        // whenever we hover over a menu item that has a submenu
        $('.nav-item.has-sub').on('mouseover', function () {
            var $menuItem = $(this),
                $submenuWrapper = $('+ .menu-content', $menuItem),
                $menuTitle = $('.menu-title', $menuItem);

            // grab the menu item's position relative to its positioned parent
            var menuItemPos = $menuItem.position();

            // place the submenu in the correct position relevant to the menu item
            $submenuWrapper.css({
                top: menuItemPos.top + 40,
                left: 50
            });
            $menuTitle.css({
                top: menuItemPos.top,
                left: 50,
            });
        });
    })

    /*--------------------------------------------
    		SlimScroll Settings
    ---------------------------------------------*/

    $('.accordion-menu.responsive-menu').slimScroll({
        height: "350px"
    });


    /*--------------------------------------------
    		Counter Settings
    ---------------------------------------------*/

    $('.number').counterUp({
        delay: 10,
        time: 1000
    });

    /*--------------------------------------------
    		Lobipanel  Settings
    ---------------------------------------------*/
    $('.panel').lobiPanel({
        tooltips: true,
        draggable: true,
        reload: {
            icon: 'fa fa-refresh',
            tooltip: 'Reload'
        },
        editTitle: {
            icon: 'fa fa-edit',
            icon2: 'fa fa-save',
            tooltip: 'Edit title'
        },
        unpin: {
            icon: 'fa fa-arrows',
            tooltip: 'Unpin'
        },
        minimize: {
            icon: 'fa fa-chevron-up',
            icon2: 'fa fa-chevron-down',
            tooltip: 'Minimize'
        },
        close: {
            icon: 'fa fa-times-circle',
            tooltip: 'Close'
        },
        expand: {
            icon: 'fa fa-expand',
            icon2: 'fa fa-compress',
            tooltip: 'Fullscreen'
        }
    });

    /*-----------------------------------------------------------
    	Testimonial Settings
    --------------------------------------------------------------*/

    $('#testimonial').bxSlider({
        buildPager: function (slideIndex) {
            switch (slideIndex) {
                case 0:
                    return '<img src="images/misc/5.jpg" alt="img" class="img-responsive">';
                case 1:
                    return '<img src="images/misc/6.jpg" alt="img" class="img-responsive">';
                case 2:
                    return '<img src="images/misc/7.jpg" alt="img" class="img-responsive">';
            }
        }
    });

    /*--------------------------------------------
    		Toggle btn Settings
    ---------------------------------------------*/

    $(".bookmark").on('click', function () {
        $(this).toggleClass("active");
    });
    $(".toggole-contnet").on('click', function () {
        $(this).toggleClass("active");
    });

    $('.social-trigger-btn').on('click', function () {
        $(this).parent().toggleClass('active');
    });

    $("#slide-nav-trigger").on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass("active");
        $("#cbp-spmenu-s1").toggleClass("active");
    });

    /*-----------------------------------------------------------
    	Accordian Settings
    --------------------------------------------------------------*/
    var selectIds = $('#panel1,#panel2,#panel3');
    $(function ($) {
        selectIds.on('show.bs.collapse hidden.bs.collapse', function () {
            $(this).prev().find('.fa').toggleClass('fa-plus fa-minus');
        })
    });
    /*-----------------------------------------------------------
    	Magnific-Popup settings
    --------------------------------------------------------------*/
    $('.play-btn').magnificPopup({
        type: 'iframe'
    });
    $.extend(true, $.magnificPopup.defaults, {
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: 'http://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: '/',
                    src: '//player.vimeo.com/video/%id%?autoplay=1'
                },
                gmaps: {
                    index: '//maps.google.',
                    src: '%id%&output=embed'
                }
            }
        }
    });

    $('.review-images-block').magnificPopup({
        delegate: 'a', // child items selector, by clicking on it popup will open
        gallery: {
            enabled: true
        },
        type: 'image'
    });

    /*--------------------------------------------
    		Ratting  Settings
    ---------------------------------------------*/

    $('#stars li').on('mouseover', function () {
        var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

        // Now highlight all the stars that's not after the current hovered star
        $(this).parent().children('li.star').each(function (e) {
            if (e < onStar) {
                $(this).addClass('hover');
            } else {
                $(this).removeClass('hover');
            }
        });

    }).on('mouseout', function () {
        $(this).parent().children('li.star').each(function (e) {
            $(this).removeClass('hover');
        });
    });

    $('#stars li').on('click', function () {
        var onStar = parseInt($(this).data('value'), 10);
        var stars = $(this).parent().children('li.star');
        var i;
        for (i = 0; i < stars.length; i++) {
            $(stars[i]).removeClass('selected');
        }

        for (i = 0; i < onStar; i++) {
            $(stars[i]).addClass('selected');
        }
    });

    /*--------------------------------------------
    		Tinymce Settings
    ---------------------------------------------*/
    tinymce.init({
        selector: '.compose-box',
        height: 200,
        menubar: false,
        plugins: [
		'advlist autolink lists link image charmap print preview anchor',
		'searchreplace visualblocks code fullscreen',
		'insertdatetime media table contextmenu paste code'
	  ],
        toolbar: 'bold italic | alignleft aligncenter alignright alignjustify | link image | undo redo',

    });
    /*--------------------------------------------
    		Input Dropdown select Settings
    ---------------------------------------------*/
    function catagoryBind() {
        var Countries = [
            'Food,Drinks',
            'Convention Center',
            'Night Disco',
            'Party Center',
            'Pool Club'
			];

        $('#listing_catagory_list').autocomplete({
            source: Countries,
            minLength: 0,
            scroll: true
        }).focus(function () {
            $(this).autocomplete("search", "");
        });

        $('.input-dropedown-btn.catagory-btn').autocomplete({
            source: Countries,
            minLength: 0,
            scroll: true
        }).on('click', function () {
            $('#listing_catagory_list').autocomplete("search", "");
        });
    }
    catagoryBind();

    function locationBind() {
        var Countries = [
            'California',
            'New York',
            'Sydney',
            'Ontorio',
            'Brotella'];

        $('#listing_location_list').autocomplete({
            source: Countries,
            minLength: 0,
            scroll: true
        }).focus(function () {
            $(this).autocomplete("search", "");
        });

        $('.input-dropedown-btn.location-btn').autocomplete({
            source: Countries,
            minLength: 0,
            scroll: true
        }).on('click', function () {
            $('#listing_location_list').autocomplete("search", "");
        });
    }
    locationBind();
    /*--------------------------------------------
    		Grid view and List view Settings
    ---------------------------------------------*/
    $('#list_btn').on('click', function (event) {
        event.preventDefault();
        $('#products .item').addClass('list-group-item');
    });
    $('#grid_btn').on('click', function (event) {
        event.preventDefault();
        $('#products .item').removeClass('list-group-item');
        $('#products .item').addClass('grid-group-item');
    });

    /*--------------------------------------------
    	Markup Order Changing Settings
    ---------------------------------------------*/

    if ($(window).width() <= 1024) {
        $("#listing_map_holder").remove().insertBefore($("#listing_filter_holder"));
    } else {
        $("#listing_map_holder").remove().insertAfter($("#listing_filter_holder"));
    }

    /*--------------------------------------------
    	Contact form
    ---------------------------------------------*/
    function isValidEmail(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        return pattern.test(emailAddress);

    }
    $("#contactForm").on('submit', function (e) {
        e.preventDefault();
        var data = {
            name: $("#name").val(),
            email: $("#email").val(),
            subject: $("#phone").val(),
            message: $("#message").val()
        };

        if (isValidEmail(data['email']) && (data['message'].length > 1) && (data['name'].length > 1) && (data['phone'].length > 1)) {
            $.ajax({
                type: "POST",
                url: "sendmail.php",
                data: data,
                success: function () {
                    $('#contactForm .input-success').delay(500).fadeIn(1000);
                    $('#contactForm .input-error').fadeOut(500);
                }
            });
        } else {
            $('#contactForm .input-error').delay(500).fadeIn(1000);
            $('#contactForm .input-success').fadeOut(500);
        }
        return false;
    });
    /*--------------------------------------------
    	Equal Height Settings
    ---------------------------------------------*/
    var divHeight = $('.post-model .popular-listing-post').height();
    $('.post-model .listing-post-map').css('min-height', divHeight + 'px');
});
