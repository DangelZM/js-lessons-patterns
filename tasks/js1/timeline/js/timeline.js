var Timeline = (function($){
    var $holder = null,
        _apiUrl = null;
    
    function init(elemSelector, apiUrl){
        $holder = $(elemSelector);
        _apiUrl = apiUrl;
        getData();
        return $holder;
    };
    
    function getData(){
        $.get(_apiUrl, function(data){
            create(data.posts);
        });
    };
    
    function create(dataArray){
        var $slider = $("<div id='slider'></div>"),
            interval = 100/(dataArray.length-1);
        //console.log(dataArray);
        $holder.append($slider);
        $slider.slider({
            min: 0,
            max: dataArray.length-1,
            range: "min",
            value: dataArray.length-1,
            slide: function( event, ui ) {
                $slider.find(".ui-slider-handle").html('<span>' + localDate(dataArray[ui.value].addedAt.date) + '</span>');
            },
            change: function( event, ui ) {
                $slider.find(".ui-slider-handle").html('<span>' + localDate(dataArray[ui.value].addedAt.date) + '</span>');
                //updatePost(dataArray[ui.value]);
            }
        });
        $slider.find(".ui-slider-handle").html('<span>' + localDate(dataArray[$slider.slider( "value" )].addedAt.date) + '</span>');
        setTimePoints(interval);
        initControls($slider);
    };

    function localDate(dateString){
        var date =  new Date(dateString);
        return date.toLocaleDateString();
    };

    function setTimePoints(interval){
        var i = 0,
            k = 1;

        while(i<=101) {
            var descr = (k % 2 == 0)?'even':'odd';
            var $line = $('<div class="time-point '+descr+'" style="left: '+i+'%" />');
            $("#slider").append($line);
            i = i+interval;
            k++;
        }
    };

    function initControls($slider){
        var $navHolder = $('#nav-holder'),
            $leftNav = $('<div class="slider-nav prev"><</div>'),
            $rightNav = $('<div class="slider-nav next">></div>');

        $leftNav.on('click', function(){
            $slider.slider("value", $slider.slider("value")-1);
        });

        $rightNav.on('click', function(){
            $slider.slider("value", $slider.slider("value")+1);
        });

        $navHolder.append($leftNav);
        $navHolder.append($rightNav);

    }

    return {
        init: init
    }
})(jQuery);

$(document).ready(function(){
    Timeline.init('#timeline', 'http://ivan.zmerzlyi.me/api/post');
});
