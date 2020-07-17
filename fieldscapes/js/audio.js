//disable simultaneous play
$('audio').bind('play', function() {
    activated = this;
    $('audio').each(function() {
        if(this != activated) this.pause();
    });
});

//play tracks one by one
$('audio').bind('ended', function() {
	activated = this;
    index = $('audio').index(activated);
	$('audio').eq(index+1).get(0).play();
})
