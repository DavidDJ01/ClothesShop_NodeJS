/* tabs */
window.addEventListener('DOMContentLoaded', (event) => {
    $('.tabs.tabs-title .tab-link').click(function(){
        var tab = $(this).attr('data-tab');
        $('.tabs.tabs-title .tab-link').removeClass('current');
        $(this).addClass('current');
        $(this).closest('.container').find(".tab-content").removeClass("current");
        $(this).closest('.container').find(tab).addClass("current");
    });
});
/* end tabs */