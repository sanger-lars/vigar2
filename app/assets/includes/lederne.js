
var Ledere;
class Person {
	constructor() {
		this.navn = "ny leder", 
		this.img = "mangler.jpg", 
		this.alt = "",
		this.funktioner = ""
	}
}

document.getElementById('plus-icon').addEventListener('click', ny_person, false);
document.getElementById('save-icon').addEventListener('click', gem_ledere_i_fil, false);


hent_ledere(skriv_html);

function hent_ledere(callback) {
	var posting = $.post("assets/includes/hent.php", {
    	Ledere: Led,
    	
    }).done(function (data){
    	Ledere = JSON.parse(data);
    	callback();
	}).fail(function(data) {
		alert( "error" );
	});
	
}


var m2;
var nr; 

function ret_leder(id) {
	m = new Modal();
	nr = find_id(id);
	var L =Ledere[nr];
	m.html = 
	`<img id="ret-billede" src="assets/images/ledere/${L.img}" alt="${L.alt}" >
	 <button onclick="test2()">vælg billede</button><br>
	Billede: <input type="" id="img" name="img" value="${L.img}"> Alt text: <input type="" id="alt" name="alt" value="${L.alt}" style="width: 150px;"><br>
	Navn: <input type="" id="ret_navn" name="navn" value="${L.navn}"><br>
	Funktioner: <input type="" id="func" value="${L.funktioner}"><br>
	<input type="checkbox" class="chk" name="Gruppeleder" style="width: 1.0rem; height: 1.0rem;">Gruppeleder 
	<input type="checkbox" class="chk" name="Gruppeassistent" style="width: 1.0rem; height: 1.0rem;">Gruppeassistent
	<br>
	<input type="checkbox" class="chk" name="Familiespejd'leder" style="width: 1.0rem; height: 1.0rem;">Familiespejd'leder 
	<input type="checkbox" class="chk" name="Familiespejd'assistent" style="width: 1.0rem; height: 1.0rem;">Familiespejd'assistent
	<br>
	<input type="checkbox" class="chk" name="Bæverleder" style="width: 1.0rem; height: 1.0rem;">Bæverleder 
	<input type="checkbox" class="chk" name="Bæverassistent" style="width: 1.0rem; height: 1.0rem;">Bæverassistent
	<br>
	<input type="checkbox" class="chk" name="Ulveleder" style="width: 1.0rem; height: 1.0rem;">Ulveleder 
	<input type="checkbox" class="chk" name="Ulveassistent" style="width: 1.0rem; height: 1.0rem;">Ulveassistent
	<br>
	<input type="checkbox" class="chk" name="Tropleder" style="width: 1.0rem; height: 1.0rem;">Tropleder 
	<input type="checkbox" class="chk" name="Tropassistent" style="width: 1.0rem; height: 1.0rem;">Tropassistent
	<br>
	<input type="checkbox" class="chk" name="Seniorleder" style="width: 1.0rem; height: 1.0rem;">Seniorleder 
	<input type="checkbox" class="chk" name="Seniorassistent" style="width: 1.0rem; height: 1.0rem;">Seniorassistent
	<br>
	<input type="checkbox" class="chk" name="Klanleder" style="width: 1.0rem; height: 1.0rem;">Klanleder 
	<input type="checkbox" class="chk" name="Klanassistent" style="width: 1.0rem; height: 1.0rem;">Klanassistent
	<br>
	<input type="checkbox" class="chk" name="Formand" style="width: 1.0rem; height: 1.0rem;">Formand 
	<input type="checkbox" class="chk" name="Kasserer" style="width: 1.0rem; height: 1.0rem;">Kasserer
	<br>
	<input type="checkbox" class="chk" name="Gruppebestyrelsesmedlem" style="width: 1.0rem; height: 1.0rem;">Gruppebestyrelsesmedlem 
	<br><input type="checkbox" class="chk" name="Webmaster" style="width: 1.0rem; height: 1.0rem;">Webmaster
	<br><input type="checkbox" class="chk" name="Holder pause" style="width: 1.0rem; height: 1.0rem;">Holder pause

	
	</form> <button onclick="gem_rettet_leder()">Gem rettelser</button>`;
	m.open();
	udfyld_functions_felter();
} // ret_leder


function udfyld_functions_felter() {
	var funcFelt = document.getElementById("func").value;
	var i;

	function funcfelt_plus(e) {
		var f = document.getElementById("func");
		if (e.target.checked) {
			f.value += " "+e.path[0].name;
		} else {
			f.value = f.value.replace(e.path[0].name, "");
		}
		 
	}

	var fc =document.getElementsByClassName("chk");
	for (i = 0; i < fc.length; i++) {
		if (funcFelt.includes(fc[i].name)) {
			fc[i].checked = true;
		}
	}

	for (i = 0; i < fc.length; i++) {
		fc[i].onchange = funcfelt_plus;
	}

}


function gem_rettet_leder() {
	Ledere[nr].navn = document.getElementById('ret_navn').value;
	Ledere[nr].img = document.getElementById('img').value;
	Ledere[nr].alt = document.getElementById('alt').value;
	Ledere[nr].funktioner = document.getElementById('func').value;
	m.close();
	skriv_html();
	gem_ledere_i_fil();
}

function gem_ledere_i_fil() {
	var posting = $.post("assets/includes/gem.php", {
	    	Ledere: Led, 
	    	Lederdata: JSON.stringify(Ledere),
	    	
	    }).done(function (data){
	    	if (Led) alert('lederne er gemt !');
	    	else alert('Bestyrelsen er gemt !');
		}).fail(function(data) {
    		alert( "error" );
 		});
}

var test2 = function(){
	m2 = new Modal();
	m2.html = `<div id="imageDiv" style="padding: 5px;"></div>`;
	m2.open();

    $.ajax({
        url: "assets/includes/getImages.php",
        dataType: "json",
        success: function (data) {
            $.each(data, function(i,filename) {
                $('#imageDiv').prepend('<img src="assets/images/ledere/'+ filename +'">');
            });
            for (const img of document.getElementById('imageDiv').children) {
            	img.addEventListener('click', valgt_billede);
            }
        }
    });
}


function valgt_billede(e) {
	var tekst = e.target.src.split('/images/ledere/')[1];
	
	document.getElementById("img").value = tekst;
	document.getElementById('ret-billede').src = `assets/images/ledere/${tekst}`;
	m2.close();
}


function find_id(navn) {
	navn = navn.path[3].firstChild.innerText;
	navn = navn.split('-')[0].trim();
	var d = document.getElementsByTagName('LI');
	
	for (t=0;t<d.length;t++) {
		if(d[t].innerText.search(navn) == 0) {
			return t;
		} 
	}
} // find_id


function skriv_html() {
	// indsætter ledene i DOM
	var her = document.getElementById("columns");
	var tekst="";
	for (var i = 0; i < Ledere.length; i++) {
		var t = Ledere[i];
		tekst += `<li class="column" draggable="true"><header><span>
        <img src="assets/images/ledere/${t.img}" alt="${t.alt}" >
        <div>${t.navn} - ${t.funktioner}</div>
      <button>RET</button> <button>SLET</button></span></header></li>
      `
	}
	her.innerHTML = "";
    her.insertAdjacentHTML('beforeend', tekst);
    var navne = document.getElementById('columns')
    			.getElementsByTagName('button');
    for (let i = 0 ; i < navne.length; i += 2) {
			navne[i].addEventListener('click', ret_leder, false );
			navne[i+1].addEventListener('click', slet_person, false );
	}
	var cols = document.querySelectorAll('#columns .column');
	[].forEach.call(cols, addDnDHandlers);
    
} // skriv_html


function hent_DOM() {
	var navneTabel = [];
	var d = document.getElementsByTagName('LI');
	for (t=0;t<d.length;t++) {
		navneTabel.push(d[t].innerText.split('-')[0].trim())
	}
	return navneTabel;
} // hent_DOM


function sorter_navnetabel(t,n) {
	// t = ledere  n = navnetabel fra DOM
	var L = [];
	
	for (var i = 0; i < n.length; i++) {
		for (var ii = 0; ii < t.length; ii++) {
			if (n[i] == t[ii].navn) {
				L.push(t[ii]); 
				break;
			}
		}
	}
	return L;
} // sorter_navnetabel	


function ny_person(){
	var L = new Person();
	Ledere.unshift(L);
	skriv_html();
}

function slet_person(e) {
	//find id
	nr = find_id(e);
	if(confirm(`Vil du slette ${Ledere[nr].navn} ? \n Bliver først rigtigt slettet når du trykker gem`)) {
		Ledere.splice(nr,1);
		skriv_html();
	}
}


// Drag og Drop --------------------------------------------------------------------------
function handleDragStart(e) {
  // Target (this) element is the source node.
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.outerHTML);

  this.classList.add('dragElem');
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  this.classList.add('over');

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
}


function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
  [].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });
}


function handleDrop(e) {
  // this/e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != this) {
    // Set the source column's HTML to the HTML of the column we dropped on.
    //alert(this.outerHTML);
    //dragSrcEl.innerHTML = this.innerHTML;
    //this.innerHTML = e.dataTransfer.getData('text/html');
    this.parentNode.removeChild(dragSrcEl);
    var dropHTML = e.dataTransfer.getData('text/html');
    this.insertAdjacentHTML('beforebegin',dropHTML);
    var dropElem = this.previousSibling;
    addDnDHandlers(dropElem);
    var nTabel = hent_DOM();
    Ledere = sorter_navnetabel(Ledere,nTabel);
    
  }
  this.classList.remove('over');
  this.classList.remove('dragElem');
  return false;
}


function handleDragEnd(e) {
  // this/e.target is the source node.
  this.classList.remove('over');

  [].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });
}


function addDnDHandlers(elem) {
  elem.addEventListener('dragstart', handleDragStart, false);
  elem.addEventListener('dragenter', handleDragEnter, false)
  elem.addEventListener('dragover', handleDragOver, false);
  elem.addEventListener('dragleave', handleDragLeave, false);
  elem.addEventListener('drop', handleDrop, false);
  elem.addEventListener('dragend', handleDragEnd, false);
  let knap = elem.getElementsByTagName('button');
  knap[0].addEventListener('click', ret_leder);
  knap[1].addEventListener('click', slet_person);
}





var dragSrcEl = null;
var cols = document.querySelectorAll('#columns .column');
[].forEach.call(cols, addDnDHandlers);

