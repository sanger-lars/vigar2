let log = console.log;
const bannerfelt_html =2,
	baeverstop_link = 3,
	tekstFelt = 4,
	tekstFelt_link = 5,
	tekstFelt_html = 6;

function vis_tekstfelt() {
  alle_data[tekstFelt] = document.getElementById('tekst').value;
 	if (alle_data[tekstFelt] != "") {
		//lav HTML felt
	  	if (alle_data[tekstFelt_link] != "") {
	  		alle_data[tekstFelt_html] = '<A href="assets/dokumenter/' + alle_data[tekstFelt_link] + 
			'">' + alle_data[tekstFelt] + '</A>';

		} else alle_data[tekstFelt_html] = alle_data[tekstFelt];
		
		// lav preview
	  document.getElementById('tekstfeldt').innerHTML = alle_data[tekstFelt_html];
	  $("#tekstfeldt").toggleClass("skjul",false);
	  
	  

	  // vis gem knap
	  
	  $("#send").toggleClass("skjul",false);
	  $("#send")[0].innerHTML = "Gem";
	  lav_html();	
	  
	  
	}
}

function slet_tekst() {
	var slet = "nej";
	if (!confirm('Vil du slette tekst-banneret ?')) {
		// slet ikke
	} else {	
		if (alle_data[tekstFelt_html].indexOf('</A>') > 0) {
			if (confirm('Vil du slette det, som teksten linker til, på serveren ?')) {
				console.log('ja slet det');
				slet = "ja";
			}		
		}
		alle_data[tekstFelt] = "";
		alle_data[tekstFelt_html] = "";
		var fil = alle_data[tekstFelt_link];
		alle_data[tekstFelt_link] = "";
		gem_data(alle_data, slet, fil);		
	}


}

function gem_data(data, sletBool, filnavn) {
	var posting = $.post("assets/includes/gem_banner.php", {
    data: JSON.stringify(data),
    slet: sletBool,
    filnavn: filnavn
  }).done(function (data) {
   	location.reload();
  });
}

function lav_html(slet) {
	event.preventDefault;
	var tekst = document.getElementById('tekst').value;
	var banner = document.getElementById('upload_ban').value
		.substr(12).toLowerCase();
	var dokument = document.getElementById('upload_link').value
		.substr(12).toLowerCase();
	var baeverstop = document.getElementById('baeverstop').value;
	var knaptekst = "Upload & Gem";

	if (slet) {
		alle_data[bannerfelt_html] = "";
// TODO  spørg om du vil slette banner på serveren
	}

	if (dokument != "" && banner != "") { 
		var html_banner =  `<P align=center><A href='assets/dokumenter/${dokument}'><IMG style="width: 95%" src='assets/images/bannere/${banner}'></A></P>`;
	} else if (banner != "") {
		var html_banner =  `<P align=center><IMG style="width: 95%" src='assets/images/bannere/${banner}'></P>`;
	} else {
		html_banner = alle_data[bannerfelt_html];
	}

	if (tekst != "" && alle_data[tekstFelt_link] != "") {
		// 		
	}
	else if (dokument != "" && tekst != "") {
		alle_data[tekstFelt_html] = '<A href="assets/dokumenter/' + dokument + '">' + alle_data[4] + '</A>';
		alle_data[tekstFelt_link] = dokument;
		dokument = ""; 
	} else {
		// kun tekst
		knaptekst = "Gem";
	}

	if (baeverstop == "1") { // ja
		 knaptekst = "Gem";
		 var html_stopbanner = `<P align=center><IMG style='width: 95%' src='assets/images/bannere/for_mange_baevere2.png'></A></P>`;
	} else if (baeverstop == "2") { // nej
		var html_stopbanner = "";

	} else var html_stopbanner = alle_data[baeverstop_link];

	var txt = html_banner;
  var her = document.getElementById("banner");
  her.innerHTML = "";
  her.insertAdjacentHTML('beforeend', txt);

	txt = html_stopbanner;
  her = document.getElementById("b-banner");
  her.innerHTML = "";
  her.insertAdjacentHTML('beforeend', txt);


	var data = [banner, dokument, html_banner, html_stopbanner, alle_data[4], alle_data[5], alle_data[6]];
	var jsondata = JSON.stringify(data);

	document.getElementById('jsondata').value = jsondata;


	$("#send").toggleClass("skjul",false);
	
	if (slet || html_stopbanner === "") knaptekst = "Bekræft sletning af banner";

	$("#send")[0].innerHTML = knaptekst;
} // lav_html(slet);

function hoejreklik(e) {
	var id = e.currentTarget.id;
	switch(id) {
		case "tekstfeldt":
	    // slet tekst-banner
	    slet_tekst()
	    break;
	  case "banner":
	    // slet banner
	    lav_html(true);
	    break;
	  case "b-banner":
	    // slet bæver-banner
	    document.getElementById('baeverstop').value = "2";
	    lav_html(false);
	    break;
	}
} // hoejreklik(e);

var inp;

document.addEventListener("DOMContentLoaded", function() {
	inp = document.getElementById("upload_ban");
	$("#tekstfeldt").toggleClass("skjul",true);
	inp.addEventListener("change" ,ev => preview_image(ev));

});
 
