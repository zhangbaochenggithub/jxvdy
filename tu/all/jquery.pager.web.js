/*
* jQuery pager plugin
* Version 1.1 (12/22/2008)
* @requires jQuery v1.2.6 or later
*
* Example at: http://jonpauldavies.github.com/JQuery/Pager/PagerDemo.html
*
* Copyright (c) 2008-2009 Jon Paul Davies
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
* 
* Read the related blog post and contact the author at http://www.j-dee.com/2008/12/22/jquery-pager-plugin/
*
* This version is far from perfect and doesn't manage it's own state, therefore contributions are more than welcome!
*
* Usage: .pager({ pagenumber: 1, pagecount: 15, buttonClickCallback: PagerClickTest });
*
* Where pagenumber is the visible page number
*       pagecount is the total number of pages to display
*       buttonClickCallback is the method to fire when a pager button is clicked.
*
* buttonClickCallback signiture is PagerClickTest = function(pageclickednumber) 
* Where pageclickednumber is the number of the page clicked in the control.
*
* The included Pager.CSS file is a dependancy but can obviously tweaked to your wishes
* Tested in IE6 IE7 Firefox & Safari. Any browser strangeness, please report.
*/
(function($) {

    $.fn.pager = function(options) {

        var opts = $.extend({}, $.fn.pager.defaults, options);

        return this.each(function() {

        // empty out the destination element and then render out the pager with the supplied options
            $(this).empty().append(renderpager(options.url, parseInt(options.pagenumber), parseInt(options.pagecount), options.gotoBaseUrl));
            
            // specify correct cursor activity
            /*$('.pages li').mouseover(function() { document.body.style.cursor = "pointer"; }).mouseout(function() { document.body.style.cursor = "auto"; });*/
        });
    };

    // render and return the pager with the supplied options
    function renderpager(url, pagenumber, pagecount, gotoBaseUrl) {
		var fullUrl = url.split('.html');
		var baseUrl = fullUrl[0];
		var subUrl = typeof(fullUrl[1]) == 'string' ? fullUrl[1] : '';

        // setup $pager to hold render
        var $pager = $('<p class="pages"></p>');
        // add in the previous and next buttons
        $pager.append(renderButton('首页', pagenumber, pagecount, url)).append(renderButton('上一页', pagenumber, pagecount, url));

        // pager currently only handles 10 viewable pages ( could be easily parameterized, maybe in next version ) so handle edge cases
        var startPoint = 1;
        var endPoint = 9;

        if (pagenumber > 4) {
            startPoint = pagenumber - 4;
            endPoint = pagenumber + 4;
        }

        if (endPoint > pagecount) {
            startPoint = pagecount - 8;
            endPoint = pagecount;
        }

        if (startPoint < 1) {
            startPoint = 1;
        }

        // loop thru visible pages and render buttons
        for (var page = startPoint; page <= endPoint; page++) {
            var currentButton = $('<a class="page-number page-number-width " href="">' + page + '</a>');
            page == pagenumber ? currentButton.addClass('pgCurrent') : currentButton.attr('href', baseUrl+'-'+page + '.html' + subUrl);
            currentButton.appendTo($pager);
        }

        // render in the next and last buttons before returning the whole rendered control back.
        $pager.append(renderButton('下一页', pagenumber, pagecount, url)).append(renderButton('末页', pagenumber, pagecount, url));
        
        return $pager;
    }

    // renders and returns a 'specialized' button, ie 'next', 'previous' etc. rather than a page number button
    function renderButton(buttonLabel, pagenumber, pagecount, url, buttonClickCallback) {

    	var fullUrl = url.split('.html');
		var baseUrl = fullUrl[0];
		var subUrl = typeof(fullUrl[1]) == 'string' ? fullUrl[1] : '';
        var $Button = $('<a href="" class="pgNext">' + buttonLabel + '</a>');

        var destPage = 1;

        // work out destination page for required button type
        switch (buttonLabel) {
            case "首页":
                destPage = 1;
                break;
            case "上一页":
                destPage = pagenumber - 1;
                break;
            case "下一页":
                destPage = pagenumber + 1;
                break;
            case "末页":
                destPage = pagecount;
                break;
        }

        // disable and 'grey' out buttons if not needed.
        if (buttonLabel == "首页" || buttonLabel == "上一页") {
            pagenumber <= 1 ? $Button.addClass('pgEmpty') : $Button.attr('href', baseUrl+'-'+destPage+'.html'+subUrl);
        }
        else {
            pagenumber >= pagecount ? $Button.addClass('pgEmpty') : $Button.attr('href', baseUrl+'-'+destPage+'.html'+ subUrl);
        }

        return $Button;
    }

    // pager defaults. hardly worth bothering with in this case but used as placeholder for expansion in the next version
    $.fn.pager.defaults = {
        pagenumber: 1,
        pagecount: 1
    };

})(jQuery);