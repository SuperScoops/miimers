$("#videowrap").append("<div id='VideoOverlay' class='fadein'><button class='btn btn-sm btn-default OLB' id='fs-vid-button'>Fullscreen</button></div>");
/*$('#videowrap').hover(function(){
    $('#VideoOverlay').css({
        'opacity':'1',
        'display':'block',
    });
},function(){
    $('#VideoOverlay').css({
        'opacity':'0',
        'display':'none',
    });
});
*/
$("#VideoOverlay").hide();
var i = null;
$("#videowrap").mousemove(function() {
    clearTimeout(i);
    $("#VideoOverlay").show();
    i = setTimeout('$("#VideoOverlay").hide();', 5000);
}).mouseleave(function() {
    clearTimeout(i);
    $("#VideoOverlay").hide();  
});

$("#VideoOverlay").append($("#voteskip"));
$("#VideoOverlay").append($("#mediarefresh"));
$("#VideoOverlay").append("<button id='hidechat' title='Hide Chat' class='btn btn-sm btn-default OLB'>Theater Mode</button>");
$("#VideoOverlay").append("<button id='showchat' title='show Chat' class='btn btn-sm btn-default OLB'>Regular Mode</button>");
$("#VideoOverlay").append("<button id='pipButton' title='Picture In Picture' class='btn btn-sm btn-default OLB'>PIP</button>");
$('#VideoOverlay').append($('<button/>',{id:'toggleNND','class':'btn btn-sm btn-default OLB',html:'NND',click:()=>$('#nndSettingsModal').modal()}));
$("#VideoOverlay").append("<button id='qualityDropDown' title='Quality' class='btn btn-sm btn-default OLB dropdown-toggle' data-toggle='dropdown'>Quality</button>")

$(document).ready(function(){
	$('#hidechat').on('click', function(){nochat();});
	$('#showchat').on('click', function(){maxchat();});
});

function nochat(){
	$('#chatwrap').addClass('hidden');
	$('#pollwrap').addClass('hidden');
	$('#maincontain').addClass('fullvideo');
	$('#hidechat,#scroll-feature,#motdrow,#videoinfo,#queuecontainer,#footer,.navbar,#bg-wrapper,#rightpane').addClass('hidden');
	$('#showchat').addClass('showchat');
	    $('#mainpage').css({
        'padding-top':'0px',
    });
	    $('#videowrap').css({
        'position':'fixed',
        'height':'100%!important',
    });
	    $('.embed-responsive').css({
        'position':'static',
    });
}

function maxchat(){
	$('#chatwrap').removeClass('hidden');
	$('#pollwrap').removeClass('hidden');
	$('#maincontain').removeClass('fullvideo');
        $('#hidechat,#scroll-feature,#motdrow,#videoinfo,#queuecontainer,#footer,.navbar,#bg-wrapper,#rightpane').removeClass('hidden');
	$('#showchat').removeClass('showchat');
	    $('#mainpage').css({
        'padding-top':'50px',
    });
	    $('#videowrap').css({
        'position':'inherit',
        'height':'inherit',
    });
	    $('.embed-responsive').css({
        'position':'relative',
    });
}
var requestFullscreen = function (ele) {
	if (ele.requestFullscreen) {
		ele.requestFullscreen();
	} else if (ele.webkitRequestFullscreen) {
		ele.webkitRequestFullscreen();
	} else if (ele.mozRequestFullScreen) {
		ele.mozRequestFullScreen();
	} else if (ele.msRequestFullscreen) {
		ele.msRequestFullscreen();
	} else {
		console.log('Fullscreen API is not supported.');
	}
};
var exitFullscreen = function () {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	} else {
		console.log('Fullscreen API is not supported.');
	}
};
var fsVidButton = document.getElementById('fs-vid-button');
var video = document.getElementById('videowrap');

fsVidButton.addEventListener('click', function(e) {
	e.preventDefault();
	requestFullscreen(videowrap);
});
  // Hide button if Picture-in-Picture is not supported or disabled.
  pipButton.hidden = !document.pictureInPictureEnabled || ytapiplayer_html5_api.disablePictureInPicture;

  pipButton.addEventListener('click', function() {
    // If there is no element in Picture-in-Picture yet, let's request
    // Picture-in-Picture for the video, otherwise leave it.
    if (!document.pictureInPictureElement) {
      ytapiplayer_html5_api.requestPictureInPicture()
      .then(pipWindow => {
        updateVideoSize(pipWindow.width, pipWindow.height);
        pipWindow.addEventListener('resize', function(event) {
          updateVideoSize(pipWindow.width, pipWindow.height);
        });
      })
      .catch(error => {
        console.log(error)
        // Video failed to enter Picture-in-Picture mode.
      });
    } else {
      document.exitPictureInPicture()
      .catch(error => {
        console.error(error)
        // Video failed to leave Picture-in-Picture mode.
      });
    }
  });

  function updateVideoSize(width, height) {
    // TODO: Update video size based on pip window width and height.
  }

  ytapiplayer_html5_api.addEventListener('enterpictureinpicture', function() {
    // Video element entered Picture-In-Picture mode.
  });

  ytapiplayer_html5_api.addEventListener('leavepictureinpicture', function() {
    // Video element left Picture-In-Picture mode.
  });

  if(!CLIENT.googlehax){
    CLIENT.googlehax = true;
    socket.on('changeMedia', (data)=>{ 
        if (data["type"] === 'gd'){
            $('#videowrap').addClass('googlehax');
        }
        else
        {
            $('#videowrap').removeClass('googlehax');
        }
    })
    $('head').append(
        $('<style>')
            .attr('id','googlehax-style')
            .text('.googlehax embed { left: -5em; }')
    )
    $('#mediarefresh').click()
}

setInterval(function(){ document.title = $("#currenttitle").text();}, 5000);


var buttonTimeout = window.setTimeout(function () {
$("#qualityDropDown").after("<ul class='dropdown-menu'><li><button id='qualAuto'>Auto</button><li><button id='qual240'>240p</button></li><li><button id='qual360'>360p</button></li><li><button id='qual480'>480p</button></li><li><button id='qual720'>720p</button></li><li><button id='qual1080'>1080p</button></li><li><button id='qualmax'>Max</button></li></ul>");
$('#qualAuto').click(function(){USEROPTS.default_quality = "auto", PLAYER.mediaType = "",PLAYER.mediaId = "",socket.emit("playerReady"),document.getElementById("qualityDropDown").childNodes[0].nodeValue="Auto";});
$('#qual240').click(function(){USEROPTS.default_quality = "240", PLAYER.mediaType = "",PLAYER.mediaId = "",socket.emit("playerReady"),document.getElementById("qualityDropDown").childNodes[0].nodeValue="240p";});
$('#qual360').click(function(){USEROPTS.default_quality = "360", PLAYER.mediaType = "",PLAYER.mediaId = "",socket.emit("playerReady"),document.getElementById("qualityDropDown").childNodes[0].nodeValue="360p";});
$('#qual480').click(function(){USEROPTS.default_quality = "480", PLAYER.mediaType = "",PLAYER.mediaId = "",socket.emit("playerReady"),document.getElementById("qualityDropDown").childNodes[0].nodeValue="480p";});
$('#qual720').click(function(){USEROPTS.default_quality = "720", PLAYER.mediaType = "",PLAYER.mediaId = "",socket.emit("playerReady"),document.getElementById("qualityDropDown").childNodes[0].nodeValue="720p";});
$('#qual1080').click(function(){USEROPTS.default_quality = "1080", PLAYER.mediaType = "",PLAYER.mediaId = "",socket.emit("playerReady"),document.getElementById("qualityDropDown").childNodes[0].nodeValue="1080p";});
$('#qualmax').click(function(){USEROPTS.default_quality = "best", PLAYER.mediaType = "",PLAYER.mediaId = "",socket.emit("playerReady"),document.getElementById("qualityDropDown").childNodes[0].nodeValue="Max";});
$('div.vjs-volume-menu-button').css("margin-left", "125px");
  window.clearTimeout(buttonTimeout);
}, 5000);

/*
- NND-style Chat script for Cytu.be
- written by zeratul (github.com/zeratul0)
- version 1.01
- for v4c
- (still in testing, some things will NOT work as they should)
*/

(function() {
    
    //remove previous NND CSS elements if they exist
    $('.head-NNDCSS').remove();
    
    /*create CSS for messages and modal element, this will probably become an external sheet in the future
    - this is NOT meant to be a one-time thing, as it gets removed each time this script is run,
    - so it can be updated without making users refresh
    */
    $('<style />', {
        'class':'head-NNDCSS',
        text:".videoText {color: white;font-size: 2em;position: absolute;z-index: 1;cursor: default;white-space:nowrap;opacity:0.7;font-family: 'Meiryo', sans-serif;letter-spacing: 4px;user-select: none;text-shadow: 0 -1px #000, 1px 0 #000, 0 1px #000, -1px 0 #000;pointer-events: none}"+
            ".videoText.moving {transition: right 7.5s linear, left 7.5s linear}"+
            ".videoText.greentext {color: #789922}"+
            ".videoText img {max-height: 64px;max-width: 64px}"+
            ".videoText.shout {color: #f00}"+
            ".modal .left-warning {float: left;padding: 10px 12px;font-size: 13px;color: #ff8f8f}"+
            ".modal .modal-caption {font-size: 13px;text-indent: 35px;color: #8f9cad}"+
            "#nndSettingsWrap .radio label {display: block;color: #c4ccd8}"+
            "#nndSettingsWrap #nnd-maxmsgs {margin: 10px 0;width: 25%;min-width: 200px}"+
            ".modal-subheader {font-size: 16px;border-bottom: 1px solid #212123;margin-left: -10px;padding: 10px 0 0 2px}"+
            "#nndSettingsModal .subfooter {text-align: center;color: #757575}"+
            "#nndSettingsModal .subfooter .by {padding-right: 10px;border-right: 1px solid #252525}"+
            "#nndSettingsModal .subfooter .ver {padding-left: 10px;border-left: 1px solid #4e4e4e}"
    }).appendTo('head');
    
    console.debug('NND Chat: CSS added to page header');
    //on the other hand, we don't want this persistent stuff to run more than once..
    if (CLIENT.runNND) {
        console.error('NND Chat script attempted to load, but it looks like it has already been loaded!');
        return;
    }
    CLIENT.runNND = true;
        
    window.nnd = {
        'enabled':false, //enabled? self-explanatory
        'MAX':100, //maximum amount of messages allowed on screen before the oldest messages are removed
        'offsetType':0, //0: position based on fontsize and player height; 1: random %
        'fromRight':true, //move messages from right? if false, moves from left instead
        '_fn': {
            'init':()=>{nnd['enabled'] = false;nnd['MAX'] = 100;nnd['offsetType'] = 0;nnd['fromRight'] = true;nnd._fn.updateModal();nnd._fn.save()},
            'getopts':()=>{var tmp = {};for (var i in window.nnd) if (!(/^\_/).test(i)) tmp[i] = window.nnd[i]; return tmp},
            'save':()=>localStorage.setItem(CHANNEL.name + '_nndOptions', JSON.stringify(window.nnd._fn.getopts())),
            'load':()=>{var tmp = JSON.parse(localStorage.getItem(CHANNEL.name+'_nndOptions'));if (tmp === null || tmp === undefined) {nnd._fn.init();console.debug('NND settings not found, using defaults and saving them');return}else {for (var i in tmp) {if (nnd.hasOwnProperty(i) && !(/^\_/).test(i)) nnd[i] = tmp[i]}nnd._fn.save();nnd._fn.updateModal()}},
            'updateModal':()=>{$('#nnd-enable').prop('checked', nnd.enabled);$('#nnd-offsettype-' + nnd.offsetType).prop('checked', true);$('#nnd-fromright-' + nnd.fromRight).prop('checked', true);$('#nnd-maxmsgs').attr('placeholder', nnd.MAX); $('#nnd-maxmsgs').val(nnd.MAX)},
            'saveFromModal':()=>{nnd['enabled'] = $('#nnd-enable').prop('checked'); if (!nnd['enabled']) $('.videoText').remove(); if ($('#nnd-offsettype-0').prop('checked')) nnd['offsetType'] = 0; else if ($('#nnd-offsettype-1').prop('checked')) nnd['offsetType'] = 1; if ($('#nnd-fromright-true').prop('checked')) nnd['fromRight'] = true; else if ($('#nnd-fromright-false').prop('checked')) nnd['fromRight'] = false; if (!isNaN(parseInt($('#nnd-maxmsgs').val())) && parseInt($('#nnd-maxmsgs').val()) >= 1) {var x = parseInt($('#nnd-maxmsgs').val()); nnd['MAX'] = x; $('#nnd-maxmsgs').attr('placeholder', x);$('#nnd-maxmsgs').val(x)} else {$('#nnd-maxmsgs').val(nnd['MAX']); $('#nnd-maxmsg').attr('placeholder', nnd['MAX'])} nnd._fn.save()}
        },
        '_ver':'1.01'
    };

    //init: sets the window's nnd options to their defaults, then calls _fn.updateModal and _fn.save
    //getopts: returns the window's current nnd object excluding any of its keys beginning with "_"
    //save: stores the return value of getopts as a JSON string in localStorage, in an item named "X_nndOptions" where X is CHANNEL.name
    //load: attempts to grab [CHANNEL.name]_nndOptions from localStorage and replaces the current window's nnd options with them. finally, calls _fn.save then _fn.updateModal. only replaces properties that are found within the current nnd object, excludes keys beginning with "_". calls _fn.init if the localStorage settings are empty or null.
    //updateModal: updates the modal window elements to reflect the current nnd options.
    //saveFromModal: sets the current window's nnd object properties based on the options selected in the modal window, and calls _fn.save

    //create modal element, insert before #pmbar
    $('<div class="fade modal"id=nndSettingsModal aria-hidden=true role=dialog style=display:none tabindex=-1><div class=modal-dialog><div class=modal-content><div class=modal-header><button class=close data-dismiss=modal aria-hidden=true>×</button><h4>NND Chat Settings: <span id=modal-nnd-roomname>'+CHANNEL.name+'</span></h4></div><div class=modal-body id=nndSettingsWrap><div class=modal-option><div class=checkbox><label for=nnd-enable><input id=nnd-enable type=checkbox> Enable NND Chat</label><div class=modal-caption>Enable Nico Nico Douga-style chat messages. Places chat messages on the currently playing video and scrolls them to the opposite side.</div></div></div><div class=modal-option><div class=modal-subheader>Message Offset</div><div class=radio><label for=nnd-offsettype-0><input id=nnd-offsettype-0 type=radio name=offsettype> Random position based on font size of message and video player height</label><br><label for=nnd-offsettype-1><input id=nnd-offsettype-1 type=radio name=offsettype> Random percent from top of video player</label><div class=modal-caption>Determines how the position of the chat message is generated.</div></div></div><div class=modal-option><div class=modal-subheader>Message Direction</div><div class=radio><label for=nnd-fromright-true><input id=nnd-fromright-true type=radio name=fromright> from Right to Left</label><br><label for=nnd-fromright-false><input id=nnd-fromright-false type=radio name=fromright> from Left to Right</label><div class=modal-caption>Determines where new messages will start and end.</div></div></div><div class=modal-option><div class=modal-subheader>Maximum Messages</div><input id=nnd-maxmsgs type=text class=form-control placeholder=100><div class=modal-caption>Maximum amount of messages allowed on screen at once before the oldest messages are removed. A large amount of messages may cause lag. Default 100.</div></div></div><div class=modal-footer><div class=left-warning>Settings are not applied until you click Save.</div><button class="btn btn-primary"data-dismiss=modal type=button onclick=nnd._fn.saveFromModal()>Save</button> <button class="btn btn-primary"data-dismiss=modal type=button onclick=nnd._fn.updateModal()>Close</button><div class="subfooter"><span class="by">NND chat created by zeratul</span><span class="ver">version '+nnd._ver+'</span></div></div></div></div></div>').insertBefore('#pmbar');

    //load the user's options then update the modal element
    nnd._fn.load();
    nnd._fn.updateModal();

    //create .videochatContainer which is basically an invisible container element. this holds the chat messages that will be scrolling by
    //TODO: maybe there's a better way to handle messages if "pointer-events: none" is used and the container is given 100%/100% size?
    $('.embed-responsive').prepend($('<div/>', {
        'class': 'videochatContainer'
    }));

    //once the message reaches the end of its CSS transition, remove it.
    //attached to #main just in case something happens with the container
    $('#main').on('transitionend', '.videochatContainer .videoText', function() {$(this).remove()});

    //attach addScrollingMessage to the chatMsg socket event
    //ignore messages sent by [server] and, because this was initially made for /r/v4c, v4cbot as well
    socket.on('chatMsg', function(data) {
        if (IGNORED.indexOf(data.username) > -1) return;
        if (window.nnd.enabled && data.username.toLowerCase() !== '[server]' && data.username.toLowerCase() !== 'v4cbot') {
            if (!data.meta['addClass'])
                data.meta['addClass'] = '';
            addScrollingMessage(data.msg, data.meta.addClass);
        }
    });

    //save user's settings on page unload so they are persistent
    $(window).unload(function() {window.nnd._fn.save()});
    
    console.debug('LOADED: NND-style Chat script for Cytu.be written by zeratul. Version '+nnd._ver);

})();

//the magic
//also ignores messages beginning with $
//TODO: allow users to disable emotes in these messages
function addScrollingMessage(message, extraClass) {
    if (typeof window.nnd === "undefined") return;
    var opts = window.nnd;
    if (opts.MAX < 1 || isNaN(parseInt(opts.MAX))) opts.MAX = window.nnd.MAX = 100;
    if (opts.enabled && $('#ytapiplayer')[0]) {
        if (message !== null && typeof message === "string" && message.length > 0 && !(/^\$/.test(message))) {
            var topOffset = "0px";
            var frm = 'right';
            if (message.length > 240) message = message.substring(0,240);
            if (!opts.fromRight) frm = 'left';
            while ($('.videoText').length >= opts.MAX && opts.MAX >= 1) $('.videoText').eq(0).remove();
            var fontSize = Math.random() * (48.0 - 24.0) + 24.0;
            if (opts.offsetType === 1) topOffset = (Math.random() * 89) + '%'
            else {
                topOffset = (fontSize * Math.floor(Math.random() * (Math.floor($('#ytapiplayer').height() / fontSize)))) + 'px';
                if (opts.offsetType < 0 || opts.offsetType > 1) {
                    console.error('NNDchat: Unknown offsetType '+opts.offsetType+', reverting to 0');
                    window.nnd.offsetType = 0;
                }
            }
            var $txt = $('<div/>', {'class': 'videoText '+extraClass,style: 'visibility: hidden; top:'+topOffset+'; font-size:'+fontSize+'px'}).append(message);
            $('.videochatContainer').append($txt);
            $txt.css(frm, (0 - $txt.width())+'px');
            $txt.addClass('moving');
            $txt.css('visibility', 'visible');
            $txt.css(frm, $('#ytapiplayer').width()+'px');
        }
    } else return;
}
