var url=window.location;
var eleveId=url.hash;
var myWrap=document.getElementById('wrap_profil');
eleveId=eleveId.substring(1);
console.log(eleveId);

function detectClick(event){
	var myTarget = event.target;
	url="/";
	//console.log(url);
	window.location = url;
}

var bouton_retour=document.createElement('i');
bouton_retour.innerHTML='home';
bouton_retour.classList.add('Tiny');
bouton_retour.classList.add('material-icons');
bouton_retour.addEventListener("click",detectClick);
myWrap.appendChild(bouton_retour);

function processRequest(event){
	// console.log(event);
	// console.log(marequete.readyState);
	// console.log(marequete.status);
	// console.log(event);
	
	if(marequete.readyState == 4 && marequete.status == 200){
        // var mareponse = marequete.response;
		var mareponseText = marequete.responseText;
        mareponseText = JSON.parse(mareponseText);
        var image=document.createElement('img');
        image.setAttribute('src','../img/identite.png');
        image.setAttribute('id','identite');
        myWrap.appendChild(image);
        var nom=document.createElement('div');
        nom.setAttribute('id','nom');
        nom.innerHTML=mareponseText.nom + '<br>' + mareponseText.prenom;
        myWrap.appendChild(nom);
        var clear=document.createElement('div');
        clear.classList.add('clear');
        myWrap.appendChild(clear);
        var javascript=document.createElement('div');
        javascript.innerHTML='<span class="label"> Javascript déjà abordé : </span> ' + mareponseText.javascript;
        myWrap.appendChild(javascript);
        var site=document.createElement('div');
        site.classList.add('site');
        site.innerHTML='<span class="label"> Site Favoris : </span> ' + mareponseText.fav_web+'<br/><span class="label">Pourquoi ? : </span><br/>'+ mareponseText.fav_app_why;
        myWrap.appendChild(site);
        var application=document.createElement('div');
        application.classList.add('application');
        application.innerHTML='<span class="label"> Application Favorite : </span>' + mareponseText.fav_app+'<br/> <span class="label"> Pourquoi : </span> <br/>' + mareponseText.fav_app_why;
        myWrap.appendChild(application);
        var ifa=document.createElement('div');
        ifa.classList.add('application');
        ifa.innerHTML='<span class="label"> Avant IFA : </span>' + mareponseText.before_ifa+'<br/> <span class="label"> Pourquoi : </span> <br/>' + mareponseText.why_ifa;
        myWrap.appendChild(ifa);
        var mail=document.createElement('div');
        mail.innerHTML='<span class="label"> Mail : </span>' + mareponseText.contact_mail;
        myWrap.appendChild(mail);
		// console.log(mareponseText);
	}

}

// je crée mon objet requete 
var marequete = new XMLHttpRequest();
// j'ouvre une requete get
marequete.open('GET', "http://localhost:3000/api/liste/"+eleveId, true);
// je lanche ma requete
marequete.send();

// on écoute ce qu'il se passe
marequete.addEventListener("readystatechange", processRequest, false);
