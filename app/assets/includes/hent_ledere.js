
function hent_ledere(callback) {
	var posting = $.post("assets/includes/hent.php", {
    	Ledere: Led,
    	
    }).done(function (data){
    	Ledere = JSON.parse(data);
    	callback(Ledere);
	}).fail(function(data) {
		alert( "error" );
	});
	
}

function vis_ledere(ledere){
	let L = document.getElementsByClassName('Enhedsledere');
	let tekst = "";
	var nr = 0;
	
    var rkk = Math.floor(Ledere.length / 3);
    for (var i = 0; i < rkk+1; i++) {
    	tekst += `<div class="flexx3">
       `;
    	for (var ii = 0; ii < 3; ii++) {
    		console.log(nr);
    		if(nr > Ledere.length-1) break;
    	 	tekst += `<figure>
        <img src="assets/images/ledere/${Ledere[nr].img}" alt="${Ledere[nr].alt}">
        <figcaption>${Ledere[nr].navn} <br> ${Ledere[nr].funktioner}</figcaption>
      </figure>`;
      		nr = nr+1;
    	 }
    	 tekst += `
    </div>`; 
    }
    L[0].insertAdjacentHTML('beforeend', tekst);
};

function vis_bestyr(ledere){
	let L = document.getElementsByClassName('Bestyrelse');
	let tekst = "";
	var nr = 0;
	
    var rkk = Math.floor(Ledere.length / 3);
    for (var i = 0; i < rkk+1; i++) {
    	tekst += `<div class="flexx3">
       `;
    	for (var ii = 0; ii < 3; ii++) {
    		console.log(nr);
    		if(nr > Ledere.length-1) break;
    	 	tekst += `<figure>
        <img src="assets/images/ledere/${Ledere[nr].img}" alt="${Ledere[nr].alt}">
        <figcaption>${Ledere[nr].navn} <br> ${Ledere[nr].funktioner}</figcaption>
      </figure>`;
      		nr = nr+1;
    	 }
    	 tekst += `
    </div>`; 
    }
    tekst += "<br>";
    L[0].insertAdjacentHTML('beforeend', tekst);
};

var Led = true;
hent_ledere(vis_ledere);
Led = false;
hent_ledere(vis_bestyr);