var data=[];
var monUl = document.createElement("ul");
monUl.classList.add('collection');
var monWrap = document.getElementById("wrap");
var monAdd=document.getElementById('add');
var monClose=document.getElementById('close');
var monCloseEdit=document.getElementById('close_modif');
var monSubmit=document.getElementById('validation');
var monSubmitModify=document.getElementById('modification');


monSubmit.addEventListener("click",detectSubmit);
monSubmitModify.addEventListener("click",detectSubmitModify);
monClose.addEventListener('click',detectClose);
monCloseEdit.addEventListener('click',detectClose);
monAdd.addEventListener("click",detectAjout);

function addBtnProfile(elem) 
{
    var adBbtnProfile = document.createElement("i");
	adBbtnProfile.classList.add('Tiny');
	adBbtnProfile.classList.add('material-icons');
	adBbtnProfile.innerHTML='account_circle';
    adBbtnProfile.addEventListener("click", detectClick);
    elem.appendChild(adBbtnProfile);
}

function addBtnDelete(elt)
{
	var addBtnDelete=document.createElement('i');
	addBtnDelete.classList.add('Tiny');
	addBtnDelete.classList.add('material-icons');
	addBtnDelete.innerHTML='delete';
	addBtnDelete.setAttribute('data-idEleve',elt.getAttribute('data-idEleve'));
	addBtnDelete.addEventListener("click",deleteEleve);
	elt.appendChild(addBtnDelete);
}

function addBtnEdit(elt)
{
	var addBtnEdit=document.createElement('i');
	var addBtnEdit=document.createElement('i');
	addBtnEdit.classList.add('Tiny');
	addBtnEdit.classList.add('material-icons');
	addBtnEdit.innerHTML='edit';
	addBtnEdit.setAttribute('data-idEleve',elt.getAttribute('data-idEleve'));
	addBtnEdit.addEventListener("click",editEleve);
	elt.appendChild(addBtnEdit);
}

function bindList(eleve)
{
	var monLi = document.createElement("li");
    monLi.innerHTML = eleve.nom + ' ' + eleve.prenom ;
    monLi.classList.add("eleve");
	monLi.setAttribute("data-idEleve", eleve._id);
	monLi.classList.add('collection-item');
	addBtnDelete(monLi);
	addBtnEdit(monLi);
	addBtnProfile(monLi);
	monUl.appendChild(monLi);
}

$.getJSON('/api/liste',function(eleve){
		$.each(eleve,function(key,val){
		//console.table(val);
		bindList(val);
	});
});

monWrap.appendChild(monUl);

function detectClick(event){
	var myTarget = event.target;
	var eleveId = myTarget.parentNode.getAttribute("data-ideleve");
	//console.log(eleveId);
	url="/profil#" +  eleveId;
	//console.log(url);
	window.location = url;
}

function detectAjout(event){
	//console.log(event);
	var myResControl=document.getElementById('res_control');
	//console.log(myResControl);
	myResControl.classList.remove('hidden');
	myResControl.classList.add('visible');

	document.forms['formulaire'].reset();
}

function detectClose(event)
{
	var myTarget = event.target;
	var control = myTarget.parentNode.getAttribute("id");
	myResControl=document.getElementById(control);
	//console.log(myResControl);
	myResControl.classList.remove('visible');
	myResControl.classList.add('hidden');
}

function detectSubmit(event)
{	
	
	var monForm=document.getElementById('formulaire').elements;
	var newUsr={};

	//console.log(newUsr);

	_.forIn(monForm, function(item){
		newUsr[item.name]=item.value;
	});
	
	data.push(newUsr);
	//console.table(data);
	detectClose();
	//console.log(monForm.elements[0].value)

	/* partie qui sera surement supprimé par la suite */
	bindList(newUsr);
	/* retour à du utile */
	document.forms['formulaire'].submit();
	document.forms['formulaire'].reset();
}

function detectSubmitModify()
{
	var monForm=document.getElementById('formulaire_modif').elements;
	var newUsr={};

	_.forIn(monForm, function(x,y){
		if(x.value!='')
		{
			newUsr[x.name]=x.value;
		}
		else
		{
			monForm[y].disabled=true;
		}
	});
	document.forms['formulaire_modif'].submit();
	document.forms['formulaire_modif'].reset();
}


function deleteEleve(event)
{
	var myTarget = event.target;
	var eleveId = myTarget.parentNode.getAttribute("data-ideleve");
	//console.log(eleveId);
	url="/del/" +  eleveId;
	// console.log(url);
	window.location = url;
}

function editEleve(event)
{	
	var myTarget=event.target;
	var myModif=document.getElementById('modification_form');
	var myResControl=document.getElementById('res_control_modif');
	myModif.classList.add('visible');
	myModif.classList.remove('hidden');
	myResControl.classList.remove('hidden');
	myResControl.classList.add('visible');
	var eleveId=myTarget.getAttribute("data-idEleve");
	// console.log(eleveId);
	var myEleve=document.getElementById('idEleve');
	myEleve.value=eleveId;
	// je crée mon objet requete 
	var marequete = new XMLHttpRequest();
	// j'ouvre une requete get
	marequete.open('GET', "http://localhost:3000/api/liste/"+eleveId, true);
	// je lanche ma requete
	marequete.send();
	// on écoute ce qu'il se passe
	marequete.addEventListener("readystatechange", processRequest, false);

	function processRequest(event){		
		if(marequete.readyState == 4 && marequete.status == 200){
			var mareponseText = marequete.responseText;
			mareponseText = JSON.parse(mareponseText);
			var myNom=document.getElementById('nom_modif');
			myNom.setAttribute('placeholder',mareponseText.nom);
			var myPrenom=document.getElementById('prenom_modif');
			myPrenom.setAttribute('placeholder',mareponseText.prenom);
			var myJavascript=document.getElementById('javascript_modif');
			myJavascript.setAttribute('placeholder',mareponseText.javascript);
			var myWeb=document.getElementById('fav_web_modif');
			myWeb.setAttribute('placeholder',mareponseText.fav_web);
			var myWebWhy=document.getElementById('fav_web_why_modif');
			myWebWhy.setAttribute('placeholder',mareponseText.fav_web_why);
			var myApp=document.getElementById('fav_app_modif');
			myApp.setAttribute('placeholder',mareponseText.fav_app);
			var myAppWhy=document.getElementById('fav_app_why_modif');
			myAppWhy.setAttribute('placeholder',mareponseText.fav_app_why);
			var myBeforeIFA=document.getElementById('before_ifa_modif');
			myBeforeIFA.setAttribute('placeholder',mareponseText.before_ifa);
			var myWhyIFA=document.getElementById('why_ifa_modif');
			myWhyIFA.setAttribute('placeholder',mareponseText.why_ifa);
			var myMail=document.getElementById('mail_modif');
			myMail.setAttribute('placeholder',mareponseText.contact_mail);
		}
	}

}