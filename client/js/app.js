var monUl = document.createElement("ul");
monUl.classList.add('collection');
var monWrap = document.getElementById("wrap");
var monAdd=document.getElementById('add');
var monClose=document.getElementById('close');
var monSubmit=document.getElementById('validation');


monSubmit.addEventListener("click",detectSubmit);
monClose.addEventListener('click',detectClose);
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
	console.log(eleveId);
	url="/profil#" +  eleveId;
	console.log(url);
	window.location = url;
}


function detectAjout(event){
	console.log(event);
	var myResControl=document.getElementById('res_control');
	//console.log(myResControl);
	myResControl.classList.remove('hidden');
	myResControl.classList.add('visible');
	document.forms['formulaire'].reset();
}


var monClose=document.getElementById('close');

function detectClose(event)
{
	var myResControl=document.getElementById('res_control');
	myResControl.classList.remove('visible');
	myResControl.classList.add('hidden');
}

function detectSubmit(event)
{	
	
	var monForm=document.getElementById('formulaire').elements;
	var newUsr={
		id:data.length
	};

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


	document.forms['formulaire'].reset();
}


function deleteEleve(eleve)
{
	console.log('delete');
	var myTarget=event.target.parentNode;
	console.log(myTarget);
}

function editEleve(eleve)
{
	console.log('delete');
}