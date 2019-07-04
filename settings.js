$('head').append("<link rel='stylesheet' href='//dl.dropbox.com/s/oq6ylt0pueg63j8/settings.css' />"); 
$("#chatheader").append("<button id='settings' title='settings' class='btn-default fa fa-cog ch'></button>");
$("#chatheader").append("<button id='hidesettings' title='settings' class='btn-default fa fa-cog ch'></button>");
$("#userlist").after("<div id='chatsettings' class='csettings'></div>");
$("#ytapiplayer_html5_api").attr("airplay","allow");
$("#ytapiplayer_html5_api").attr("x-webkit-airplay","allow");
$("#ytapiplayer_html5_api").attr("poster","https://i.postimg.cc/kgRDV7ck/yncttk3.gif");
$("#ytapiplayer_html5_api").attr("autoplay","true");

$(document).ready(function(){
	$('#settings').on('click', function(){noset();});
	$('#hidesettings').on('click', function(){maxset();});
});

function noset(){
	$('#chatsettings').addClass('show');
	$('#settings').addClass('hidden');
	$('#hidesettings').addClass('show');
    $(this).slideDown("fast");
}

function maxset(){
	$('#chatsettings').removeClass('show');
        $('#hidesettings').removeClass('show');
	$('#settings').removeClass('hidden');
        $(this).slideDown("fast");
}




function updateClock(){
    var currentTime = new Date ();
    var currentHours = currentTime.getHours ( );
    var currentMinutes = currentTime.getMinutes ( );
    var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    	currentTime.setDate(currentTime.getDate());    
    	currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    	currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours; 
    	currentHours = ( currentHours == 0 ) ? 12 : currentHours;
    	var currentTimeString = currentHours + ":" + currentMinutes;
    $(".time-cont").html(currentTimeString); 
    $('.date').html(currentTime.getDate() + ' ' + monthNames[currentTime.getMonth()]);
}
$.fn.togglePlaceholder = function(){
    return this.each(function() {
        $(this)
        .data("holder", $(this).attr("placeholder"))
        .focusin(function(){
            $(this).attr('placeholder','');
        })
        .focusout(function(){
            $(this).attr('placeholder',$(this).data('holder'));
        });
    });
};
$(document).ready(function(){
	setInterval('updateClock()', 200);
    $('.settings').click(function(){            	
        $('.leftside').addClass('flipl');
        $('.rightside').addClass('flipr');                
    });
    $('.return').click(function(){
        $('.leftside').removeClass('flipl');
        $('.rightside').removeClass('flipr');
    });
    $("[placeholder]").togglePlaceholder();           
});
//$('.timestamp').attr('id', 'timestamp');
$('.chat-avatar').attr('id', 'chatavatar');
$('.server-whisper').attr('id', 'servwhisper');
$('.vjs-polyzor-skin .vjs-control-bar').attr('id', 'vidcontrol');

$("#chatsettings").append("<ul id='settingstitle' class='settingstitle'>Channel Settings</ul>");
$("#chatsettings").append("<div class='Toggles'><input type='checkbox' id='tstog' class='Toggle-checkbox'><label for='tstog' class='Toggle-label'>Hide Timestamps</label></div>");
//$("#chatsettings").append("<div class='Toggles'><input type='checkbox' id='whisptog' class='Toggle-checkbox'><label for='whisptog' class='Toggle-label'>Channel messages</label></div>");
$("#chatsettings").append("<div class='Toggles'><input type='checkbox' id='Avatog' class='Toggle-checkbox'><label for='Avatog' class='Toggle-label'>Chat Avatars</label></div>");
$("#chatsettings").append("<div class='Toggles'><input type='checkbox' id='Maintog' class='Toggle-checkbox'><label for='Maintog' class='Toggle-label'>Video</label></div>");
$("#chatsettings").append("<div class='Toggles'><input type='checkbox' id='Motdtog' class='Toggle-checkbox'><label for='Motdtog' class='Toggle-label'>MOTD</label></div>");
//$("#chatsettings").append("<div class='Toggles'><input type='checkbox' id='Contog' class='Toggle-checkbox'><label for='Contog' class='Toggle-label'>Controls</label></div>");
$("#chatsettings").append("<div class='Toggles'><input type='checkbox' id='chanscroll' class='Toggle-checkbox'><label for='chanscroll' class='Toggle-label'>Channel Scroller</label></div>");
$("#chatsettings").append("<div class='Toggles'><input type='checkbox' id='leftchat' class='Toggle-checkbox'><label for='leftchat' class='Toggle-label'>Switch Chat (remembers)</label></div>");
$("#chatsettings").append("<div class='Toggles'><input type='checkbox' id='darkbg' class='Toggle-checkbox'><label for='darkbg' class='Toggle-label'>Darker Background</label></div>");
$("#chatsettings").append("<div class='Toggles'><input type='checkbox' id='moveoverlay' class='Toggle-checkbox'><label for='moveoverlay' class='Toggle-label'>Move Video Overlay</label></div>");


$("#tstog").click(function() {
  $(".timestamp").toggleClass("show");
});
$("#whisptog").click(function() {
  $(servwhisper).toggleClass("hide");
});
$("#Avatog").click(function() {
  $(chatavatar).toggleClass("hide");
});
$("#Maintog").click(function() {
  $(main).toggleClass("hide");
});
$("#Motdtog").click(function() {
  $(motdwrap).toggleClass("hide");
});
$("#Contog").click(function() {
  $(vidcontrol).removeClass("hide");
  $(ytapiplayer).removeClass("video-js");
  $("#ytapiplayer_html5_api").attr("controls","true");
});
//$("#leftchat").click(function() {
//  $(chatwrap).toggleClass("leftchat");
//  $(maincontain).toggleClass("leftchatvideo");
//});
$("#chanscroll").click(function() {
  $(".horiz-scroll").toggleClass("hide");
});
$("#darkbg").click(function() {
  $(backg).toggleClass("darkerbg");
});
$("#moveoverlay").click(function() {
  $("#VideoOverlay").toggleClass("overlayfix");
  $("#Videoverlay").before($("#pollwrap"));
});

document.querySelector("#leftchat").onclick = function(e) {
  if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "dark");
	$(chatwrap).addClass("leftchat");
	$(maincontain).addClass("leftchatvideo");
  } else {
    localStorage.removeItem("theme");
	$(chatwrap).removeClass("leftchat");
	$(maincontain).removeClass("leftchatvideo");
  };
  e.preventDefault();
};

if (localStorage.getItem("theme") === "dark") {
  $(chatwrap).addClass("leftchat");
	$(maincontain).addClass("leftchatvideo");
}

$("#chatsettings").append("<div class='colorbg'><input type='color' id='colorID' oninput='changeColor()'>Background Color</div>");

// on input, get value and save it as 'storedValue'
function changeColor() { 
  var userColor = document.getElementById('colorID').value;
  localStorage.setItem('storedValue', document.body.style.backgroundColor = userColor);
}

// if there is a value stored, update color picker and background color
if(localStorage.storedValue) {
  document.getElementById('colorID').value = localStorage.storedValue;
  document.body.style.backgroundColor = localStorage.storedValue;
}



//$.getScript("https://cdnjs.cloudflare.com/ajax/libs/jQuery-slimScroll/1.3.3/jquery.slimscroll.min.js");
/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.3
 *
 */
(function(e){e.fn.extend({slimScroll:function(g){var a=e.extend({width:"auto",height:"550px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},g);this.each(function(){function u(d){if(r){d=d||window.event;
var c=0;d.wheelDelta&&(c=-d.wheelDelta/120);d.detail&&(c=d.detail/3);e(d.target||d.srcTarget||d.srcElement).closest("."+a.wrapperClass).is(b.parent())&&m(c,!0);d.preventDefault&&!k&&d.preventDefault();k||(d.returnValue=!1)}}function m(d,e,g){k=!1;var f=d,h=b.outerHeight()-c.outerHeight();e&&(f=parseInt(c.css("top"))+d*parseInt(a.wheelStep)/100*c.outerHeight(),f=Math.min(Math.max(f,0),h),f=0<d?Math.ceil(f):Math.floor(f),c.css({top:f+"px"}));l=parseInt(c.css("top"))/(b.outerHeight()-c.outerHeight());
f=l*(b[0].scrollHeight-b.outerHeight());g&&(f=d,d=f/b[0].scrollHeight*b.outerHeight(),d=Math.min(Math.max(d,0),h),c.css({top:d+"px"}));b.scrollTop(f);b.trigger("slimscrolling",~~f);v();p()}function C(){window.addEventListener?(this.addEventListener("DOMMouseScroll",u,!1),this.addEventListener("mousewheel",u,!1)):document.attachEvent("onmousewheel",u)}function w(){s=Math.max(b.outerHeight()/b[0].scrollHeight*b.outerHeight(),30);c.css({height:s+"px"});var a=s==b.outerHeight()?"none":"block";c.css({display:a})}
function v(){w();clearTimeout(A);l==~~l?(k=a.allowPageScroll,B!=l&&b.trigger("slimscroll",0==~~l?"top":"bottom")):k=!1;B=l;s>=b.outerHeight()?k=!0:(c.stop(!0,!0).fadeIn("fast"),a.railVisible&&h.stop(!0,!0).fadeIn("fast"))}function p(){a.alwaysVisible||(A=setTimeout(function(){a.disableFadeOut&&r||x||y||(c.fadeOut("slow"),h.fadeOut("slow"))},1E3))}var r,x,y,A,z,s,l,B,k=!1,b=e(this);if(b.parent().hasClass(a.wrapperClass)){var n=b.scrollTop(),c=b.parent().find("."+a.barClass),h=b.parent().find("."+a.railClass);
w();if(e.isPlainObject(g)){if("height"in g&&"auto"==g.height){b.parent().css("height","auto");b.css("height","auto");var q=b.parent().parent().height();b.parent().css("height",q);b.css("height",q)}if("scrollTo"in g)n=parseInt(a.scrollTo);else if("scrollBy"in g)n+=parseInt(a.scrollBy);else if("destroy"in g){c.remove();h.remove();b.unwrap();return}m(n,!1,!0)}}else if(!(e.isPlainObject(g)&&"destroy"in g)){a.height="auto"==a.height?b.parent().height():a.height;n=e("<div></div>").addClass(a.wrapperClass).css({position:"relative",
overflow:"hidden",width:a.width,height:a.height});b.css({overflow:"hidden",width:a.width,height:a.height});var h=e("<div></div>").addClass(a.railClass).css({width:a.size,height:"100%",position:"absolute",top:0,display:a.alwaysVisible&&a.railVisible?"block":"none","border-radius":a.railBorderRadius,background:a.railColor,opacity:a.railOpacity,zIndex:90}),c=e("<div></div>").addClass(a.barClass).css({background:a.color,width:a.size,position:"absolute",top:0,opacity:a.opacity,display:a.alwaysVisible?
"block":"none","border-radius":a.borderRadius,BorderRadius:a.borderRadius,MozBorderRadius:a.borderRadius,WebkitBorderRadius:a.borderRadius,zIndex:99}),q="right"==a.position?{right:a.distance}:{left:a.distance};h.css(q);c.css(q);b.wrap(n);b.parent().append(c);b.parent().append(h);a.railDraggable&&c.bind("mousedown",function(a){var b=e(document);y=!0;t=parseFloat(c.css("top"));pageY=a.pageY;b.bind("mousemove.slimscroll",function(a){currTop=t+a.pageY-pageY;c.css("top",currTop);m(0,c.position().top,!1)});
b.bind("mouseup.slimscroll",function(a){y=!1;p();b.unbind(".slimscroll")});return!1}).bind("selectstart.slimscroll",function(a){a.stopPropagation();a.preventDefault();return!1});h.hover(function(){v()},function(){p()});c.hover(function(){x=!0},function(){x=!1});b.hover(function(){r=!0;v();p()},function(){r=!1;p()});b.bind("touchstart",function(a,b){a.originalEvent.touches.length&&(z=a.originalEvent.touches[0].pageY)});b.bind("touchmove",function(b){k||b.originalEvent.preventDefault();b.originalEvent.touches.length&&
(m((z-b.originalEvent.touches[0].pageY)/a.touchScrollStep,!0),z=b.originalEvent.touches[0].pageY)});w();"bottom"===a.start?(c.css({top:b.outerHeight()-c.outerHeight()}),m(0,!0)):"top"!==a.start&&(m(e(a.start).position().top,null,!0),a.alwaysVisible||c.hide());C()}});return this}});e.fn.extend({slimscroll:e.fn.slimScroll})})(jQuery);
	$('.videolist').slimScroll({
		color: "#EEE"
	});