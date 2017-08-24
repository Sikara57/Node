var data=[];
var monUl = document.createElement("ul");
monUl.classList.add('collection');
var monWrap = document.getElementById("wrap");
var monAdd=document.getElementById('add');
var monClose=document.getElementById('close');
var monCloseEdit=document.getElementById('close_modif');
var monSubmit=document.getElementById('validation');
var monSubmitModify=document.getElementById('modification');


monSubmit.addEventListener('click',detectSubmit);
monSubmitModify.addEventListener('click',detectSubmitModify);
monClose.addEventListener('click',detectClose);
monCloseEdit.addEventListener('click',detectClose);
monAdd.addEventListener('click',detectAjout);

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
    monLi.innerHTML ='<span id="'+eleve.nom+'">'+ eleve.nom + '</span><span id="'+eleve.prenom+'"> ' + eleve.prenom+'</span>';
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
	var myResControl=document.getElementById('res_control');
	var monForm=document.getElementById('formulaire').elements;
	var newUsr={};


	_.forIn(monForm, function(item){
		newUsr[item.name]=item.value;
	});
	
	bindList(newUsr);
	// console.log(JSON.stringify(newUsr));

	/* retour à du utile : Ma version */
	//document.forms['formulaire'].submit();
	//document.forms['formulaire'].reset();

	var postUser = new XMLHttpRequest();
	postUser.open('POST', "http://localhost:3000/ajout", true);
	postUser.setRequestHeader("Content-type","application/json");
	
	postUser.onreadystatechange== function(){
		if(postUser.readyState== XMLHttpRequest.DONE && postUser.status==200){
			console.log('req ok');
		}
	}

	postUser.send(JSON.stringify(newUsr));
	document.forms['formulaire'].reset();
	myResControl.classList.remove('visible');
	myResControl.classList.add('hidden');
}

function detectSubmitModify()
{
	var myResControl=document.getElementById('res_control_modif');
	var monForm=document.getElementById('formulaire_modif').elements;
	var newUsr={};
	var position=0;
	//var name='';

	_.forIn(monForm, function(x,y){
		//console.log(x.placeholder);
		if(x.name=='idEleve')
		{
			newUsr['_id']=x.value;
		}
		else if(x.value!='')
		{	
			name=x.name;
			pos=name.indexOf('_');
			var key2=name.substr(0,pos);
			switch(key2)
			{
				case 'favweb':
				{
					newUsr['fav_web']=x.value;

					break;
				}
				case 'favwebwhy':
				{
					newUsr['fav_web_why']=x.value;
					break;
				}
				case 'favapp':
				{
					newUsr['fav_app']=x.value;
					break;
				}
				case 'favappwhy':
				{
					newUsr['fav_app_why']=x.value;
					break;
				}
				case 'beforeifa':
				{
					newUsr['before_ifa']=x.value; 
					break;
				}
				case 'whyifa':
				{
					newUsr['why_ifa']=x.value; 
					break; 
				}
				case 'contactmail':
				{
					newUsr['contact_mail']=x.value; 
					break; 
				}
				case 'nom':
				{
					newUsr[key2]=x.value;
					var monSpan=document.getElementById(x.placeholder);
					monSpan.innerHTML=x.value;
					break;
				}
				case 'prenom':
				{
					newUsr[key2]=x.value;
					var monSpan=document.getElementById(x.placeholder);
					monSpan.innerHTML=' ' + x.value;
					break;
				}
				case 'javascript':
				{
					newUsr[key2]=x.value;
					break;
				}
				default:
				{
				
				}
			}
		}
	});

	// console.log(newUsr);
	var postUser = new XMLHttpRequest();
	postUser.open('POST', "http://localhost:3000/modify", true);
	postUser.setRequestHeader("Content-type","application/json");
	
	postUser.onreadystatechange== function(){
		if(postUser.readyState== XMLHttpRequest.DONE && postUser.status==200){
			console.log('req ok');
		}
	}

	postUser.send(JSON.stringify(newUsr));
	document.forms['formulaire_modif'].reset();
	myResControl.classList.remove('visible');
	myResControl.classList.add('hidden');

}


function deleteEleve(event)
{
	var myTarget = event.target;
	var myLi=myTarget.parentNode;
	var eleveId = myLi.getAttribute("data-ideleve");
	var eleveSupr = {"_id":eleveId};
	//console.log(eleveSupr);
	var postUser = new XMLHttpRequest();
	postUser.open('POST', "http://localhost:3000/del", true);
	postUser.setRequestHeader("Content-type","application/json");
	
	postUser.onreadystatechange== function(){
		if(postUser.readyState== XMLHttpRequest.DONE && postUser.status==200){
			console.log('req ok');
		}
	}

	myLi.remove();
	postUser.send(JSON.stringify(eleveSupr));
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
	marequete.open('GET', "http://localhost:3000/api/liste/"+ eleveId, true);
	// je lanche ma requete
	marequete.send();
	// on écoute ce qu'il se passe
	marequete.addEventListener("readystatechange", processRequest, false);

	function processRequest(event){		
		if(marequete.readyState == 4 && marequete.status == 200){
			var mareponseText = marequete.responseText;
			mareponseText = JSON.parse(mareponseText);
			// console.log('prout');
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
			var myMail=document.getElementById('contactmail_modif');
			myMail.setAttribute('placeholder',mareponseText.contact_mail);
		}
	}

}