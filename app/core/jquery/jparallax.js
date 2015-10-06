/**
 * Created by Julius Hernandez on 9/13/2015.
 */

$(document).ready(function () {
    $(window).bind('scroll', function (e) {
        jparallax();
    })
});

function jparallax() {
    var scrolltop = $(window).scrollTop();
    $('#ninjaBG').css('top', (0 - (scrolltop*.1))+'px');
}