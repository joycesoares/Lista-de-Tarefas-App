function getTarefa(){
	this.items = [];

	var lista = localStorage.getItem('listatarefa');

	if(lista !== null)
		this.items = angular.fromJson(lista);

	this.salvar = function(){
		var lista = angular.toJson(this.items);
		localStorage.setItem('listatarefa', lista);
	};

	this.add = function(item){
		this.items.push(item);
	};

	this.remove = function(item){
		var pos = this.items.indexOf(item);
		this.items.splice(pos,1);
	};

}