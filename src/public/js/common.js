function getURLVar(key) {
    var value = [];
    var query = String(document.location).split('?');
    if (query[1]) {
        var part = query[1].split('&');
        for (i = 0; i < part.length; i++) {
            var data = part[i].split('=');
            if (data[0] && data[1]) {
                value[data[0]] = data[1];
            }
        }
        if (value[key]) {
            return value[key];
        } else {
            return '';
        }
    }
}
/* scroll-to-top button show and hide */
jQuery(document).ready(function() {
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > 100) {
            jQuery('.scrollup').fadeIn();
        } else {
            jQuery('.scrollup').fadeOut();
        }
    });
    /* Scroll-to-top animate */
    jQuery('.scrollup').click(function() {
        jQuery("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
});
$(document).ready(function() {
    /*Highlight any found errors*/
    $('.text-danger').each(function() {
        var element = $(this).parent().parent();
        if (element.hasClass('form-group')) {
            element.addClass('has-error');
        }
    });
    /*Currency*/
    $('#form-currency .currency-select').on('click', function(e) {
        e.preventDefault();
        $('#form-currency input[name=\'code\']').attr('value', $(this).attr('name'));
        $('#form-currency').submit();
    });
    /*Language*/
    $('#form-language .language-select').on('click', function(e) {
        e.preventDefault();
        $('#form-language input[name=\'code\']').attr('value', $(this).attr('name'));
        $('#form-language').submit();
    });
    $('.header_search input[name=\'search\']').parent().find('button').on('click', function() {
        var url = $('base').attr('href') + '/product/search';
        var search_form = $(this).closest('.header_search');
        var value = search_form.find('input[name=\'search\']').val(),
            category_id = search_form.find('select[name=\'category_id\']').val(),
            sub_category = search_form.find('input[name=\'sub_category\']').val();
        if (category_id !== undefined) {
            url += '&category_id=' + category_id;
        }
        if (sub_category !== undefined) {
            url += '&sub_category=' + sub_category;
        }
        if (value) {
            url += '?search=' + encodeURIComponent(value);
        }
        location = url;
    });
    $('.header_search input[name=\'search\']').on('keydown', function(e) {
        if (e.keyCode == 13) {
            $(this).closest('.header_search').find('input[name=\'search\']').parent().find('button').trigger('click');
        }
    });
    /*Menu*/
    $('#menu .dropdown-menu').each(function() {
        var menu = $('#menu').offset();
        var dropdown = $(this).parent().offset();
        var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());
        if (i > 0) {
            $(this).css('margin-left', '-' + (i + 5) + 'px');
        }
    });
    /*Product List*/
    $('#list-view').click(function() {
        $('#content .product-grid > .clearfix').remove();
        $('#content .row > .product-grid').attr('class', 'product-layout product-list col-xs-12');
        localStorage.setItem('display', 'list');
    });
    /*Product Grid*/
    $('#grid-view').click(function() {
        /*What a shame bootstrap does not take into account dynamically loaded columns*/
        var cols = $('#column-right, #column-left').length;
        if (cols == 2) {
            $('#content .product-list').attr('class', 'product-layout product-grid col-lg-6 col-md-6 col-sm-12 col-xs-12');
        } else if (cols == 1) {
            $('#content .product-list').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-xs-12');
        } else {
            $('#content .product-list').attr('class', 'product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-xs-12');
        }
        localStorage.setItem('display', 'grid');
    });
    if (localStorage.getItem('display') == 'list') {
        $('#list-view').trigger('click');
    } else {
        $('#grid-view').trigger('click');
    }

    /* Quantity Adder at Product page */
    $(".quantity-adder .add-action").click(function() {
        if ($(this).hasClass('add-up')) {
            $("[name=quantity]", '.quantity-adder').val(parseInt($("[name=quantity]", '.quantity-adder').val()) + 1);
        } else {
            if (parseInt($("[name=quantity]", '.quantity-adder').val()) > 1) {
                $("input", '.quantity-adder').val(parseInt($("[name=quantity]", '.quantity-adder').val()) - 1);
            }
        }
    });
    /*Checkout*/
    $(document).on('keydown', '#collapse-checkout-option input[name=\'email\'], #collapse-checkout-option input[name=\'password\']', function(e) {
        if (e.keyCode == 13) {
            $('#collapse-checkout-option #button-login').trigger('click');
        }
    });
});
/*Cart add remove functions*/
var cart = {
    'add': function(product_id, quantity) {
        $.ajax({
            url: '/checkout/cart/add',
            type: 'post',
            data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
            dataType: 'json',
            beforeSend: function() {
                $('#cart > button').button('loading');
            },
            complete: function() {
                $('#cart > button').button('reset');
            },
            success: function(json) {
                $('.alert, .text-danger').remove();

                if (json['redirect']) {
                    location = json['redirect'];
                }

                if (json['success']) {
                    $('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

                    /* Need to set timeout otherwise it wont update the total */
                    var number = json['total'].split('-');
                    var count = number[0].split(' ', 2);
                    setTimeout(function() {
                        $('#cart > button').html('<svg class="css-cart" viewBox="0 0 24 22"><path d="m8.375 18c1.1390873 0 2.0625.9234127 2.0625 2.0625s-.9234127 2.0625-2.0625 2.0625-2.0625-.9234127-2.0625-2.0625.9234127-2.0625 2.0625-2.0625zm9.75 0c1.1390873 0 2.0625.9234127 2.0625 2.0625s-.9234127 2.0625-2.0625 2.0625-2.0625-.9234127-2.0625-2.0625.9234127-2.0625 2.0625-2.0625zm-9.75 1.125c-.51776695 0-.9375.419733-.9375.9375s.41973305.9375.9375.9375.9375-.419733.9375-.9375-.41973305-.9375-.9375-.9375zm9.75 0c-.517767 0-.9375.419733-.9375.9375s.419733.9375.9375.9375.9375-.419733.9375-.9375-.419733-.9375-.9375-.9375zm-13.43581327-17.625 1.5 6h17.59124037l-3.375 10.125h-12.84461383l-3.75-15h-3.31081327v-1.125zm17.53038617 7.125h-15.74913617l1.96875 7.875h11.15538617z" transform="translate(0 -1)"></path></svg>' + "<span id='cart-total'>" + count[0] + "</span>");
                        $('#cart-total-2').html(json['number']);
                        $('#cart > button').trigger('click');

                    }, 100);
                    $('html, body').animate({ scrollTop: 0 }, 'slow');

                    $('#cart ul.cart-view').load('/common/cart/info ul li');
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    },
    'update': function(key, quantity) {
        $.ajax({
            url: '/checkout/cart/edit',
            type: 'post',
            data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
            dataType: 'json',
            beforeSend: function() {
                $('#cart > button').button('loading');
            },
            complete: function() {
                $('#cart > button').button('reset');
            },
            success: function(json) {
                /* Need to set timeout otherwise it wont update the total */
                var number = json['total'].split('-');
                var count = number[0].split(' ', 2);
                setTimeout(function() {
                    $('#cart > button').html(" <span id='cart-total'>" + count[0] + "</span>");
                    $('#cart-total-2').html(json['number']);
                }, 100);

                if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout' || $('body').hasClass('checkout-cart') || $('body').hasClass('checkout-checkout')) {
                    location = '/checkout/cart';
                } else {
                    $('#cart ul.cart-view').load('/common/cart/info ul li');
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    },
    'remove': function(key) {
        $.ajax({
            url: '/checkout/cart/remove',
            type: 'post',
            data: 'key=' + key,
            dataType: 'json',
            beforeSend: function() {
                $('#cart > button').button('loading');
            },
            complete: function() {
                $('#cart > button').button('reset');
            },
            success: function(json) {
                /* Need to set timeout otherwise it wont update the total */
                var number = json['total'].split('-');
                var count = number[0].split(' ', 2);
                setTimeout(function() {
                    $('#cart > button').html('<svg class="css-cart" viewBox="0 0 24 22"><path d="m8.375 18c1.1390873 0 2.0625.9234127 2.0625 2.0625s-.9234127 2.0625-2.0625 2.0625-2.0625-.9234127-2.0625-2.0625.9234127-2.0625 2.0625-2.0625zm9.75 0c1.1390873 0 2.0625.9234127 2.0625 2.0625s-.9234127 2.0625-2.0625 2.0625-2.0625-.9234127-2.0625-2.0625.9234127-2.0625 2.0625-2.0625zm-9.75 1.125c-.51776695 0-.9375.419733-.9375.9375s.41973305.9375.9375.9375.9375-.419733.9375-.9375-.41973305-.9375-.9375-.9375zm9.75 0c-.517767 0-.9375.419733-.9375.9375s.419733.9375.9375.9375.9375-.419733.9375-.9375-.419733-.9375-.9375-.9375zm-13.43581327-17.625 1.5 6h17.59124037l-3.375 10.125h-12.84461383l-3.75-15h-3.31081327v-1.125zm17.53038617 7.125h-15.74913617l1.96875 7.875h11.15538617z" transform="translate(0 -1)"></path></svg>' + "<span id='cart-total'>" + count[0] + "</span>");
                    $('#cart-total-2').html(json['total']);
                }, 100);

                if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout' || $('body').hasClass('checkout-cart') || $('body').hasClass('checkout-checkout')) {
                    location = '/checkout/cart';
                } else {
                    $('#cart ul.cart-view').load('/common/cart/info ul li');
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    }
}
var voucher = {
    'add': function() {},
    'remove': function(key) {
        $.ajax({
            url: '/checkout/cart/remove',
            type: 'post',
            data: 'key=' + key,
            dataType: 'json',
            beforeSend: function() {
                $('#cart > button').button('loading');
            },
            complete: function() {
                $('#cart > button').button('reset');
            },
            success: function(json) {
                /*Need to set timeout otherwise it wont update the total*/
                var str = json['total'].split('-');
                setTimeout(function() {
                    $('#cart .basket .text .phone-box strong span').html(str[0]);
                    $('#cart .basket .text .email-box strong span').html(str[1]);
                }, 100);

                if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
                    location = '/checkout/cart';
                } else {
                    $('#cart > .top-cart-content').load('/common/cart/info #cart-sidebar, #cart-sidebar + .footer_form');
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    }
};
var wishlist = {
    'add': function(product_id) {
        $.ajax({
            url: '/account/wishlist/add',
            type: 'post',
            data: 'product_id=' + product_id,
            dataType: 'json',
            success: function(json) {
                $('.alert').remove();
                if (json['redirect']) {
                    location = json['redirect'];
                }
                if (json['success']) {
                    $('header').before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                }
                $('#wishlist-total span').html(json['total']);
                $('#wishlist-total').attr('title', json['total']);
                $('html, body').animate({ scrollTop: 0 }, 'slow');
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    },
    'remove': function() {}
};
var compare = {
    'add': function(product_id) {
        $.ajax({
            url: '/product/compare/add',
            type: 'post',
            data: 'product_id=' + product_id,
            dataType: 'json',
            success: function(json) {
                $('.alert').remove();
                if (json['success']) {
                    $('header').before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                    $('#compare-total').html(json['total']);
                    $('html, body').animate({ scrollTop: 0 }, 'slow');
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    },
    'remove': function() {}
};
/* Agree to Terms */
$(document).delegate('.agree', 'click', function(e) {
    e.preventDefault();
    $('#modal-agree').remove();
    var element = this;
    $.ajax({
        url: $(element).attr('href'),
        type: 'get',
        dataType: 'html',
        success: function(data) {
            html = '<div id="modal-agree" class="modal">';
            html += '  <div class="modal-dialog">';
            html += '    <div class="modal-content">';
            html += '      <div class="modal-header">';
            html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
            html += '        <h4 class="modal-title">' + $(element).text() + '</h4>';
            html += '      </div>';
            html += '      <div class="modal-body">' + data + '</div>';
            html += '    </div';
            html += '  </div>';
            html += '</div>';
            $('body').append(html);
            $('#modal-agree').modal('show');
        }
    });
});
/* Autocomplete */
(function($) {
    $.fn.autocomplete = function(option) {
        return this.each(function() {
            this.timer = null;
            this.items = new Array();
            $.extend(this, option);
            $(this).attr('autocomplete', 'off');
            /*Focus*/
            $(this).on('focus', function() {
                this.request();
            });
            /*Blur*/
            $(this).on('blur', function() {
                setTimeout(function(object) {
                    object.hide();
                }, 200, this);
            });
            /*Keydown*/
            $(this).on('keydown', function(event) {
                switch (event.keyCode) {
                    case 27:
                        /*escape*/
                        this.hide();
                        break;
                    default:
                        this.request();
                        break;
                }
            });
            /*Click*/
            this.click = function(event) {
                event.preventDefault();
                value = $(event.target).parent().attr('data-value');
                if (value && this.items[value]) {
                    this.select(this.items[value]);
                }
            };
            /*Show*/
            this.show = function() {
                var pos = $(this).position();
                $(this).siblings('ul.dropdown-menu').css({
                    top: pos.top + $(this).outerHeight(),
                    left: pos.left
                });
                $(this).siblings('ul.dropdown-menu').show();
            };
            /*Hide*/
            this.hide = function() {
                $(this).siblings('ul.dropdown-menu').hide();
            };
            /*Request*/
            this.request = function() {
                clearTimeout(this.timer);
                this.timer = setTimeout(function(object) {
                    object.source($(object).val(), $.proxy(object.response, object));
                }, 200, this);
            };
            /*Response*/
            this.response = function(json) {
                html = '';
                if (json.length) {
                    for (i = 0; i < json.length; i++) {
                        this.items[json[i]['value']] = json[i];
                    }
                    for (i = 0; i < json.length; i++) {
                        if (!json[i]['category']) {
                            html += '<li data-value="' + json[i]['value'] + '"><a href="#">' + json[i]['label'] + '</a></li>';
                        }
                    }
                    /*Get all the ones with a categories*/
                    var category = new Array();
                    for (i = 0; i < json.length; i++) {
                        if (json[i]['category']) {
                            if (!category[json[i]['category']]) {
                                category[json[i]['category']] = new Array();
                                category[json[i]['category']]['name'] = json[i]['category'];
                                category[json[i]['category']]['item'] = new Array();
                            }
                            category[json[i]['category']]['item'].push(json[i]);
                        }
                    }
                    for (i in category) {
                        html += '<li class="dropdown-header">' + category[i]['name'] + '</li>';
                        for (j = 0; j < category[i]['item'].length; j++) {
                            html += '<li data-value="' + category[i]['item'][j]['value'] + '"><a href="#">&nbsp;&nbsp;&nbsp;' + category[i]['item'][j]['label'] + '</a></li>';
                        }
                    }
                }
                if (html) {
                    this.show();
                } else {
                    this.hide();
                }
                $(this).siblings('ul.dropdown-menu').html(html);
            };
            $(this).after('<ul class="dropdown-menu"></ul>');
            $(this).siblings('ul.dropdown-menu').delegate('a', 'click', $.proxy(this.click, this));
        });
    }
})(window.jQuery);