var cytoStyles = [
    {
        selector: 'node',
        style: {
            'background-color': '#98C93C',
            'content': 'data(name)',
            'color': '#fff',
            'text-outline-width': 1,
            'text-outline-color': '#599542',
            'text-valign': 'center',
			'height' : '60px',
			'width' : '60px'
        }
    },
    {
        selector: 'edge.segments',
        style: {
            'curve-style': 'segments',
            'line-color': '#98C93C',
            'segment-distances': '10 -10',
            'segment-weights': '0.25 0.75',
            'width': 5
        }
    },
    {
        selector: 'core',
        style: {
            'active-bg-color': '#FF9900',
            'selection-box-color': '#000000'
        }
    },
    {
        selector: '#athena',
        style: {
            'background-color': '#ffffff',
            'background-image': 'athena-logo-nolabel.png',
            'background-height': '180px',
            'background-width': '180px',
            'content': false,
            'height': '180px',
            'label': false,
            'padding-bottom': '5px',
            'shape': 'roundrectangle',
            'text-outline-color': '#ffffff',
            'width': '190px'
        }
    }
];
var cytoElements = [
    // nodes
    { data: { id: 'php', name: 'PHP', href: 'https://github.com/athena-oss/plugin-php' } },
    { data: { id: 'gradle', name: 'Gradle', href: 'https://github.com/athena-oss/plugin-gradle' } },
    { data: { id: 'athena', name: 'Athena', href: 'https://github.com/athena-oss/athena' } },
    { data: { id: 'selenium', name: 'Selenium', href: 'https://github.com/athena-oss/plugin-selenium' } },
    { data: { id: 'appium', name: 'Appium', href: 'https://github.com/athena-oss/plugin-appium' } },
    { data: { id: 'avd', name: 'AVD', href: 'https://github.com/athena-oss/plugin-avd' } },
    { data: { id: 'example', name: 'Example plugin', href: 'https://github.com/athena-oss/example-plugin-simple-php-webserver' } },
    { data: { id: 'proxy', name: 'Proxy', href: 'https://github.com/athena-oss/plugin-proxy' } },
    { data: { id: 'bashunit', name: 'bashUnit', href: 'https://github.com/athena-oss/bashunit' } },
    { data: { id: 'bashog', name: 'basHog', href: 'https://github.com/athena-oss/bashog' } },
    { data: { id: 'bashutils', name: 'bashUtils', href: 'https://github.com/athena-oss/bashutils' } },
    { data: { id: 'php-wd-client', name: 'PHP Fluent WebDriver Client', href: 'https://github.com/athena-oss/php-fluent-webdriver-client' } },
    { data: { id: 'php-http-client', name: 'PHP Fluent Http Client', href: 'https://github.com/athena-oss/php-fluent-http-client' } },

    // edges
    { data: { id: 'edge_php', source: 'php', target: 'athena' }, classes: 'segments' },
    { data: { id: 'edge_gradle', source: 'gradle', target: 'athena' }, classes: 'segments' },
    { data: { id: 'edge_selenium', source: 'selenium', target: 'athena' }, classes: 'segments' },
    { data: { id: 'edge_appium', source: 'appium', target: 'athena' }, classes: 'segments' },
    { data: { id: 'edge_avd', source: 'avd', target: 'athena' }, classes: 'segments' },
    { data: { id: 'edge_proxy', source: 'proxy', target: 'athena' }, classes: 'segments' },
    { data: { id: 'edge_example', source: 'example', target: 'athena' }, classes: 'segments' },
    { data: { id: 'edge_bashunit', source: 'bashunit', target: 'athena' }, classes: 'segments' },
    { data: { id: 'edge_bashog', source: 'bashog', target: 'athena' }, classes: 'segments' },
    { data: { id: 'edge_bashutils', source: 'bashutils', target: 'athena' }, classes: 'segments' },
    { data: { id: 'edge_php_wd_client', source: 'php-wd-client', target: 'athena' }, classes: 'segments' },
    { data: { id: 'edge_php_http_client', source: 'php-http-client', target: 'athena' }, classes: 'segments' }
];
var cytoLayout = {
    name: 'concentric',
    animate: true
};
var cytoOptions = {
    container: $('#plugins-widget'),
    boxSelectionEnabled: false,
    autounselectify: true,
    userZoomingEnabled: false,
    boxSelectionEnabled: false,
    userPanningEnabled: false,
    elements: cytoElements,
    style: cytoStyles,
    layout: cytoLayout
};

(function($){
    $.ajaxSetup({
        cache: true
    });

    $.when(
        $.ready,
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/cytoscape/2.7.10/cytoscape.min.js'),
        $.Deferred(function(deferred){
            $(deferred.resolve);
        })
    ).then(function _init() {
        initSmoothScroll();
        initParallax();

        var graphIsOn = false;
        var $widget = $("#plugins-widget");
        $widget.css("opacity", 0);
        $(document).on("scroll", function() {
            if (isInViewport($widget[0]) && !graphIsOn) {
                setTimeout(function() {
                    initNetGraph();
                    $widget.animate({
                        "opacity": 1
                    });
                }, 500);
                graphIsOn = true;

            }
        })

    });
})(jQuery);

function initSmoothScroll() {
    $(document).on("click", "a[href^='#']", function() {
        var target = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 500);
    });
}

function initParallax() {
    $(document).on("mousemove", ".parallax", function(event) {
        var halfW = (this.clientWidth / 2);
        var halfH = (this.clientHeight / 2);
        var coorX = (halfW - (event.pageX - this.offsetLeft));
        var coorY = (halfH - (event.pageY - this.offsetTop));
        var degX  = ((coorY / halfH) * 10) + 'deg'; // max. degree = 10
        var degY  = ((coorX / halfW) * -10) + 'deg'; // max. degree = 10

        $(".parallax_content", this).css('transform', function() {
            return 'perspective(300px) translate3d(0, -2px, 0) rotateX('+ degX +') rotateY('+ degY +')';
        });
    });
}

function initNetGraph() {
    var cy = cytoscape(cytoOptions);

    cy.on('tap', 'node', function(){
        try { // your browser may block popups
            window.open( this.data('href') );
        } catch(e){ // fall back on url change
            window.location.href = this.data('href');
        }
    });
}

function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || html.clientHeight) &&
        rect.right <= (window.innerWidth || html.clientWidth)
    );
}
