let log = console.log;
let nr;

function hent_gemte_data(callback) {
	var posting = $.post("assets/includes/hent.php", {
    alle: "alle"
  }).done(function (data) {
    var alle_data = JSON.parse(data);
    callback(alle_data);
  });
}

function bild(e) {
	let fnavn;
	// check for localhost
	var lokal = (document.location.href.indexOf("localhost") > -1);
	var split_nr = (lokal) ? 5 : 6;

	if (confirm('vil du slette billedet ?')) {
		var fnavn1 = e.src.split('/')[split_nr];
		fnavn = fnavn1.split('?')[0];
		i = 0; 
		while (alle_data[i] !== fnavn) {
			i++;
		}
		alle_data[i] = "";
		var txt = alle_data[nr+4];
		var n = txt.indexOf(fnavn);
		
		txt = txt.substr(0, n-24) + txt.substr(n+75);
		//document.getElementById('preview').innerHTML = txt;

		alle_data[nr+4] = txt;
		var posting = $.post("assets/includes/gem.php", {
	    	data: JSON.stringify(alle_data),
	    	filnavn: fnavn
	    }).done(function (data){
	    	location = "upload.php?"+document.getElementById('enhed').value;
		}).fail(function(data) {
    		alert( "error" );
 		});
		
	}
}

function check_knapstatus() {
	var cc = document.getElementsByName('logout-submit');
    if (cc.length > 0) {
    	if (document.getElementById("poss").value == "0" ||
    		document.getElementById("upload_bild").value == "" ||
    		document.getElementById('enhed').value == "") {
    		$("#send").toggleClass("skjul",true);
    	} else {
    		$("#send").toggleClass("skjul",false);
    	}
    }
}

function vis_data(data) {
	// bestem hvilken enhed
	var e = document.getElementById("enhed");
	nr = e.selectedIndex*6-5;
	document.getElementById('nr').value = nr;
	var html_tekst = data[nr+4];
	alle_data = data;
	
	// ryd tekst felt og preview
	document.getElementById("preview").innerHTML = "";
	document.getElementById('tekst').value = "";

	if (html_tekst == "<div class='filler'></div>") {
		html_tekst = "<h3 align='center'></h3>"+html_tekst;

	}
	// vis preview
    document.getElementById("preview").insertAdjacentHTML('beforeend', html_tekst);
    
    // gør billederne unikke
    var tal = Math.floor(Math.random()* 9999 + 11111);
    var x = document.getElementsByTagName("img");
    for (var i = 1; i < x.length; i++) {
    	x[i].src = x[i].src+"?"+tal;
    	if (x[i].id == "uploadet_bild") {
    		var filnavn = x[i].src.split('/')[5];
    		switch (filnavn.substr(3,1)) {
    			case "1":
    				x[i].title = "Venstre";
    				break;
    			case "2":
    				x[i].title = "Midten";
    				break;
    			case "3":
    				x[i].title = "Højre";
    				break;
    		}

    	}
    }
    

    // fyld tekst felt
    var x = document.getElementsByTagName("h3");
    document.getElementById('tekst').value = x[1].innerHTML;
	
	// find filnavnene på billederne
	var filnavn = [];
    var im = document.getElementsByTagName("img");
    for (var i = 0; i < im.length; i++) {
    	filnavn[i] = im[i].src.split('/')[5];
    }

    // check for billede højre-click hvis logget ind
    var cc = document.getElementsByName('logout-submit');
    if (cc.length > 0) {
    	$("img").each(function (index) {
    		var that = this;
    		$(this).contextmenu(function (ev) {
    			ev.preventDefault();
    			bild(that);
    		});
    	});
    } else alert('Du er ikke logget ind');

    check_knapstatus();

    // ændre teksten når den bliver tastet ind
	var txt = document.getElementById("tekst");
    txt.addEventListener("input", ev => x[1].innerHTML = txt.value);

    
}

  function preview_image(ev) 
  {
   var reader = new FileReader();
   reader.onload = function()
   {
    var output = document.getElementById('output_image');
    output.src = reader.result;
    output.style.height = "300px";
   }
   reader.readAsDataURL(ev.target.files[0]);
   check_knapstatus();
  }

var inp;
var xxx = window.location.search;
document.addEventListener("DOMContentLoaded", function() {
	
	
	if (xxx > "") {
		xxx = xxx.substring(1);
		document.getElementById('enhed').value = xxx;
		hent_gemte_data(vis_data);
	}
	inp = document.getElementById("upload_bild");
	inp.addEventListener("change" ,ev => preview_image(ev));
});

