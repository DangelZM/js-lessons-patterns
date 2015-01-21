
$.get('http://ivan.zmerzlyi.me/api/post', function(data){
    sliderInit(data.posts);
});

var sliderInit = function(responseData){
    var interval = 100/(responseData.length-1);

    $(function() {
        var info = $("#info");
        var slider = $("#slider").slider({
            min: 0,
            max: responseData.length-1,
            range: "min",
            value: responseData.length-1,
            slide: function( event, ui ) {
                $("#slider .ui-slider-handle").html('<span>' + localDate(responseData[ui.value].addedAt.date) + '</span>');
            },
            change: function( event, ui ) {
                $("#slider .ui-slider-handle").html('<span>' + localDate(responseData[ui.value].addedAt.date) + '</span>');
                updatePost(responseData[ui.value]);
            }
        });
        $("#slider .ui-slider-handle").html('<span>' + localDate(responseData[$("#slider" ).slider( "value" )].addedAt.date) + '</span>');
        updatePost(responseData[$("#slider" ).slider( "value" )]);
        initControls();
        setTimePoints();
    });

    function localDate(dateString){
        var date =  new Date(dateString);
        return date.toLocaleDateString();
    }

    function updatePost(postObj){
        $('#post').html(localDate(postObj.addedAt.date) + ': ' + postObj.title + '<br> ' + postObj.content);
    }

    function setTimePoints(){
        var i = 0,
            k = 1;

        while(i<=101) {
            var descr = (k % 2 == 0)?'even':'odd';
            var $line = $('<div class="time-point '+descr+'" style="left: '+i+'%" />');
            $("#slider").append($line);
            i = i+interval;
            k++;
        }
    }

    function initControls(){
        var $navHolder = $('#nav-holder'),
            $leftNav = $('<div class="slider-nav prev"><</div>'),
            $rightNav = $('<div class="slider-nav next">></div>');

        $leftNav.on('click', function(){
            $("#slider" ).slider("value", $("#slider" ).slider("value")-1);
        });

        $rightNav.on('click', function(){
            $("#slider").slider("value", $("#slider" ).slider("value")+1);
        });

        $navHolder.append($leftNav);
        $navHolder.append($rightNav);

    }

};

















