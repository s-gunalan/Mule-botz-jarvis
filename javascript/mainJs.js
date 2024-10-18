var local = {};

var remote = {};
var SESSIONID = generateUUID();
var accessToken = "bb75f2f1492349c686196d714d9dce22";
var Mr_Mule = "6ec8e22772604bbcb3d6e420d0e1edfa";
var DevOps = "e9e8ba482ba44deb89fcbbb5dccc6dda";
var Nat = "24d5e9c4be274d5db0377f940adb93b8";
var baseUrl = "https://api.api.ai/v1/";
var apihost = "";
var basepath = "home";
var url = apihost + basepath;

function formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

$(document).ready(function(){
    $("#myHref").click(function(event){
document.getElementById("myData").setAttribute('data',url);
//document.getElementById("myData").setAttribute('data','file:///D:/Guna/POCs/ML/nwave-UI/output.html');
	$("#myData").show();
	$("#myHref").hide();
	$("#closeOp").show();
	return false;
    });
});   
$("#closeOp").click(function(){
	$("#loading").hide();
	document.getElementById("myData").setAttribute('data',"");
	$("#closeOp").hide();	
	$("#myData").hide();
	$("#myHref").show();
});

    var recognition;
    function startRecognition() {
        recognition = new webkitSpeechRecognition();
        recognition.onstart = function(event) {
            updateRec();
        };
        recognition.onresult = function(event) {
            var text = "";
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                text += event.results[i][0].transcript;
            }
            insertChat("local", text);
            queryBot(text);
            stopRecognition();
        };
        recognition.onend = function() {
            stopRecognition();
        };
        recognition.lang = "en-US";
        recognition.start();
    }
    function stopRecognition() {
        if (recognition) {
            recognition.stop();
            recognition = null;
        }
        updateRec();
    }
    function switchRecognition() {
        if (recognition) {
            stopRecognition();
        } else {
            startRecognition();
        }
    }
function updateRec() {
        $("#rec").text(recognition ? "Stop" : "Speak");
    }
function insertChat(who, text) {
    var control = "";
    var date = formatTime(new Date());
	
    if (who == "local") {

        control = '<li style="width:100%;float:right;">' +
            '<div class="msj-rta macro">' +
            '<div class="text text-r">' +  
            '<p>' + text + '</p>' + 
            '<p><small>' + date + 
            '</div>' + '</small></p>' 
            '</li>';
    }
	
    else if (who =="jarvis") {
        control = '<li style="width:100%;align:right;">' +
            '<div class="msj macro">' +
            '<div class="text">' +
            '<p style=>' + text + '</p>' +
            '<p><small>' + date + '</small></p>' +
            '</div>' +
            '</div>' +
            '</li>';
    }
	
	else if (who == "Mr_Mule") {
	
        control = '<li style="width:100%;float:right;">' +
            '<div class="msj-rta-mule macro">' +
            '<div class="text text-r">' +  
            '<p>' + text + '</p>' + 
            '<p><small>' + date + 
            '</div>' + '</small>  </p>' + '<span class="i-circle-mule">MB</span>'  + 
            '</li>';
    }
	
	else if (who == "DevOps") {
	console.log(who);
        control = '<li style="width:100%;float:right;">' +
            '<div class="msj-rta-devops macro">' +
            '<div class="text text-r">' +  
            '<p>' + text + '</p>' + 
            '<p><small>' + date + 
            '</div>' + '</small>  </p>' + '<span class="i-circle-devops">DO</span>'  + 
            '</li>';
    }
    else {
    console.log(who);
    control = '<li style="width:100%;float:right; ">' +
            '<div class="msj-rta-devops macro" >' +
            '<div class="text text-r">' + 
            '<p>' + text + '</p>' +
            '<p><small>' + date 
            '</div>' + '</small></p>' + '<span class="i-circle-others">N</span>' + 
            '</li>';
    }
    $("#messages").append(control);
    var objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
	var msg = new SpeechSynthesisUtterance();
	var voices = window.speechSynthesis.getVoices();
	msg.lang = "en-US";
	msg.voice = voices[1];
	msg.text = text;
	speechSynthesis.speak(msg);
}



$("#chat-panel").on('click', function() {
    var framewidth = $("#frame").width();
    var op = "";
	if (framewidth > 200) {
        framewidth = "100";
        op = "0.1";
	$(".frame").css('border-radius','100px');
	$(".panel-heading").css('height','100px');
	$(".panel-heading").contents().remove();
    
    } else {
        framewidth = "25vw";
        op = "1";
	
	$(".panel-heading").css('height','100px');
	$(".panel-heading").css('padding-top','30px');
	$(".panel-heading").css('padding-left','180px');
	$(".panel-heading").text('Chat here with JARVIS');
	$(".panel-heading").css('text-align','right');
    $(".frame").css('border-radius','5px');
	}
    $(".innerframe").animate({
        height: 'toggle',
        opacity: op,
	
    });
    $('#frame').animate({
        width: framewidth,
        background: "transparent"
    });
});

function resetChat() {
    $("#messages").empty();
}


$(".mytext").on("keyup", function(e) {
    if (e.which == 13) {
        var text = $(this).val();
        if (text !== "") {
            insertChat("local", text);
            $(this).val('');
            queryBot(text)
        }
    }
    $("#rec").click(function(event) {
            switchRecognition();
        });
     
});

function buttonclick(text){
insertChat("local", text);              
queryBot(text);
}
resetChat();

function queryBot(text) {
	if(text.startsWith("create")){
	insertChat("jarvis", "Sure Sir. Let me work with my Agents to create API for you.");
	insertChat("jarvis", "Hey Mr. Mule, Please create the API with the specified operations in Mulesoft Platform and confirm to us");
	insertChat("Mr_Mule", "Hi Jarvis. Sure. I am creating the API in Mulesoft. Meanwhile can you work with DevOps Agent to create the Deployment pipelines and code repository for us?");
	insertChat("jarvis", "Sure. I will work on it.");
	insertChat("jarvis", "Hey DevOps Agent, please create code repo for orders API with mulesoft template and let us know.");
	insertChat("DevOps", "Hi Jarvis. Thank for your request. Getting it done for you shortly while you wait.");
	insertChat("Mr_Mule", "Hi Jarvis. I have created the API Specification, Policies and Contracts in Mulesoft platform. Here is the API ID: 12345");
	insertChat("DevOps", "Hey Mule. Thanks for the API ID. Hi Jarvis. I have created the code repository, boilerplate code for mulesoft application and committed to the code base. Let me know if we're good to deploy with the provided API ID");		
	insertChat("jarvis", "Hi Both. Please go ahead and deploy");
	insertChat("jarvis", "Hi Sir. API has been created and deployed to Mulesoft Anypoint Platform. Pls find the following code repository: github.com/<reponame>");
	} else {
		insertChat("jarvis", "Hello, I am JARVIS. How May i Help you?");
	}
}

function displayPage(action){
	if(action.startsWith("load=")){
	console.log(action);
	var url=action.split("=")[1];
	console.log(url);
	$('#calendar').attr('src', url);
	document.getElementById('black-mirror-frame').src = url;
	document.getElementById('mirror-links').style.display="none";
	}
	else{
		document.getElementById('black-mirror-frame').src = "";
		document.getElementById('mirror-links').style.display="block";
	}
}

$("#closeOp").click(function(){
	document.getElementById('mirror-links').style.display="none";	
	document.getElementById('black-mirror-frame').src = "";
});

function botToBot(action,fulfillmentText) {
    if(action.startsWith("contact."))
    {
	var bot = action.split(".")[1];
	console.log(fulfillmentText);
	var botToken = eval(bot);
        $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {"Authorization": "Bearer " + botToken},
        data: JSON.stringify({
            query: fulfillmentText,
            lang: "en",
            sessionId: SESSIONID
        }),
        success: function(data) {
        queryBot(data.result.fulfillment.speech)
	    setTimeout(insertChat(bot, data.result.fulfillment.speech),25000);
	    var msg = new SpeechSynthesisUtterance();
			var voices = window.speechSynthesis.getVoices();
			msg.lang = "en-US";
			msg.voice = voices[1];
			msg.text = data.result.fulfillment.speech;
			speechSynthesis.speak(msg);
            
			},
        error: function() {
            insertChat(bot, "Sorry Mr Mule Bot has faced some issues! Please try again later");
			var msg = new SpeechSynthesisUtterance();
			var voices = window.speechSynthesis.getVoices();
			msg.lang = "en-US";
			msg.voice = voices[1];
			msg.text = data.result.fulfillment.speech;
			speechSynthesis.speak(msg);
            
			}
		});
}}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
$(function () {
    var body = $('#logos');
    var backgrounds = ['url(css/logos/Mulesoft.png)','url(css/logos/jenkins.png)','url(css/logos/bitbucket.png)'];
    var current = 0;

    function nextBackground() {
        body.css(
            'background',
        backgrounds[current = ++current % backgrounds.length]);

        setTimeout(nextBackground, 1500);
    }
    setTimeout(nextBackground, 1500);
    body.css('background', backgrounds[0]);
});
