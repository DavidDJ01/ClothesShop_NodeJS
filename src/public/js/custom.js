window.variantsChange = function() {
    var selection = $('.swatch-list');
    var select = selection.find('li');
    // selection.each(function() {
    //     $(this).find('li').first().addClass('selected');
    // })
    select.click(function(event) {
        if (!$(this).hasClass('plus')) {
            event.preventDefault();
            $(this).parent().find('li').removeClass('selected');
            $(this).addClass('selected');
            var img_change = $(this).data('img');
            var img_change_hover = $(this).data('img-hover');
            var color_change_hover = $(this).data('text');
            var url = $(this).data('url');
            $(this).parents(".product-tile").find(".swap-on-hover-front-image img").attr("src", img_change);
            $(this).parents(".product-tile").find(".swap-on-hover-back-image img").attr("src", img_change_hover);
            $(this).parents(".product-tile").find(".color-name").html(color_change_hover);
            $(this).parents(".product-tile").find(".product-image .thumb-link").attr("href", url);
        }
    });
    $('.swatch-list li:first-child').click();
}
window.variantsChange();
$('.collapse_readmore [data-toggle="collapse"]').click(function() {
    $('.box-content a').toggleClass('active')
});
$('.title-menu > [data-toggle="collapse"]').click(function() {
    $(this).toggleClass('active')
});
$('.menu-mobile .nav-menu > li > i').click(function() {
    $(this).parent().toggleClass('active')
});
$('.menu-mobile .nav-menu > li > ul > li > i').click(function() {
    $(this).parent().toggleClass('active')
});
$('.popup-links .dropdown-toggle').click(function() {
    $(this).parent().toggleClass('open')
});
$('#site-overlay').click(function() {
    $("body").removeClass('open');
});
$('#cart > button').click(function() {
    $("body").addClass('open');
});
$('#site-nav--mobile #js-drawer-close').click(function() {
    $('body').removeClass('open');
});
$('.ProductFilter .list-group > [data-toggle="collapse"]').click(function() {
    $(this).toggleClass('active')
});
$('.one-time').slick({
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
});