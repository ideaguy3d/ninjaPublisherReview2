/**
 * Created by Julius Hernandez on 9/13/2015.
 */

$(document).ready(function () {
    $(window).on('scroll', function (e) {
        jparallax();
    })
});

function jparallax() {
    var scrolltop = $(window).scrollTop();
    console.log("jparallax scrolltop = "+scrolltop);
    $('#ninjaBG').css('top', (0 - (scrolltop*.1))+'px');
}