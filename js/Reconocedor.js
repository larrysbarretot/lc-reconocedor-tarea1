var Reconocedor = function(cadenaCandidata) {
	this._cadenaActual = cadenaCandidata;
	this._RECONOCE = false;
	this._ERROR = false;
	this._tokenActual = "";
	this._myScanner = new Scanner(cadenaCandidata);
};

Reconocedor.prototype.analizar = function() {
	var resultado = {};
	resultado.mensaje = "";
	resultado.reconoce = false;
	var q = 0;
	while(!this._RECONOCE && !this._ERROR) {
		this._tokenActual = this._myScanner.obtenerToken();
		console.log(this._tokenActual);
		switch(q) {
			case 0:
				if(this.esTipo()) {
					q = 1;
				}else if(this._tokenActual.valor == "/") {
					q = 8;
				}else if(this.esAdicionar()) {
					q = 10;
				}else if(this.esEliminar()) {
					q = 17;
				}else if(this.esImprimir()) {
					q = 38;
				}else if(this.esIdentificador()) {
					q = 27;
				}else {
					this._ERROR = true;
				}
				break;
			case 1:
				if(this.esIdentificador()) {
					q = 2;
				}else {
					this._ERROR = true;
				}
				break;
			case 2:
				if(this._tokenActual.valor == ",") {
					q = 1;
				}else if(this._tokenActual.valor == "{") {
					q = 3;
				}else if(this._tokenActual.valor == "/") {
					q = 6
				}else if(this._tokenActual.valor == "$") {
					this._RECONOCE = true;
				}else {
					this._ERROR = true;
				}
				break;
			case 3:
				if(this.esNumero()) {
					q = 4;
				}else if(this._tokenActual.valor == ",") {
					q = 3;
				}else {
					this._ERROR = true;
				}
				break;
			case 4:
				if(this._tokenActual.valor == ",") {
					q = 3;
				}else if(this._tokenActual.valor == "}") {
					q = 5;
				}else {
					this._ERROR = true;
				}
				break;
			case 5:
				if(this._tokenActual.valor == ",") {
					q = 1;
				}else if(this._tokenActual.valor == "/") {
					q = 6;
				}else if(this._tokenActual.tipo == "$") {
					this._RECONOCE = true;
				}else {
					this._ERROR = true;
				}
				break;
			case 6:
				if(this._tokenActual.valor == "/") {
					q = 7;
				}else {
					this._ERROR = true;
				}
				break;
			case 7:
				this._RECONOCE = true;
				break;
			case 8:
				if(this._tokenActual.valor == "/") {
					q = 9;
				}else {
					this._ERROR = true;
				}
				break;
			case 9:
				this._RECONOCE = true;
				break;
			case 10:
				if(this.esIdentificador()) {
					q = 11;
				}else {
					this._ERROR = true;
				}
				break;
			case 11:
				if(this._tokenActual.valor == "{") {
					q = 12;
				}else {
					this._ERROR = true;
				}
				break;
			case 12:
				if(this.esNumero()) {
					q = 13;
				}else {
					this._ERROR = true;
				}
				break;
			case 13:
				if(this._tokenActual.valor == ",") {
					q = 12;
				}else if(this._tokenActual.valor == "}") {
					q = 14;
				}else {
					this._ERROR = true;
				}
				break;
			case 14:
				if(this._tokenActual.valor == ",") {
					q = 10;
				}else if(this._tokenActual.valor == "/") {
					q = 15;
				}else if(this._tokenActual.tipo == "$") {
					this._RECONOCE = true;
				}else {
					this._ERROR = true;
				}
				break;
			case 15:
				if(this._tokenActual.valor == "/") {
					q = 16;
				}else {
					this._ERROR = true;
				}
				break;
			case 16:
				this._RECONOCE = true;
				break;
			case 17:
				if(this.esIdentificador()) {
					q = 18;
				}else {
					this._ERROR = true;
				}
				break;
			case 18:
				if(this._tokenActual.valor == "{") {
					q = 19;
				}else {
					this._ERROR = true;
				}
				break;
			case 19:
				if(this.esNumero()) {
					q = 20;
				}else if(this._tokenActual.valor == "*") {
					q = 23;
				}else {
					this._ERROR = true;
				}
				break;
			case 20:
				if(this._tokenActual.valor == ",") {
					q = 21;
				}else if(this._tokenActual.valor == "}") {
					q = 22;
				}else {
					this._ERROR = true;
				}
				break;
			case 21:
				if(this.esNumero()) {
					q = 20;
				}else {
					this._ERROR = true;
				}
				break;
			case 22:
				if(this._tokenActual.valor == ",") {
					q = 17;
				}else if(this._tokenActual.valor == "/") {
					q = 25;
				}else if(this._tokenActual.tipo == "$") {
					this._RECONOCE = true;
				}else {
					this._ERROR = true;
				}
				break;
			case 23:
				if(this._tokenActual.valor == "}") {
					q = 24;	
				}else {
					this._ERROR = true;
				}
				break;
			case 24:
				if(this._tokenActual.valor == ",") {
					q = 17;
				}else if(this._tokenActual.valor == "/") {
					q = 25;
				}else if(this._tokenActual.tipo == "$") {
					this._RECONOCE = true;
				}else {
					this._ERROR = true;
				}
				break;
			case 25:
				if(this._tokenActual.valor == "/") {
					q = 26;
				}else {
					this._ERROR = true;
				}
				break;
			case 26:
				this._RECONOCE = true;
				break;
			case 27:
				if(this._tokenActual.valor == "=") {
					q = 28;
				}else {
					this._ERROR = true;
				}
				break;
			case 28:
				if(this.esIdentificador()) {
					q = 29;
				}else {
					this._ERROR = true;
				}
				break;
			case 29:
				if(this.esOperador()) {
					q = 30;
				}else {
					this._ERROR = true;
				}
				break;
			case 30:
				if(this.esIdentificador()) {
					q = 31;
				}else if(this.esNumero()) {
					q = 32;
				}else if(this._tokenActual.valor == "{") {
					q = 33;
				}else {
					this._ERROR = true;
				}
				break;
			case 31:
				if(this.esOperador()) {
					q = 30;
				}else if(this._tokenActual.valor == "/") {
					q = 36;
				}else if(this._tokenActual.tipo == "$") {
					this._RECONOCE = true;
				}else {
					this._ERROR = true;
				}
				break;
			case 32:
				if(this.esOperador()) {
					q = 30;
				}else if(this._tokenActual.valor == "/") {
					q = 36;
				}else if(this._tokenActual.tipo == "$") {
					this._RECONOCE = true;
				}else {
					this._ERROR = true;
				}
				break;
			case 33:
				if(this.esNumero()) {
					q = 34;
				}else {
					this._ERROR = true;
				}
				break;
			case 34:
				if(this._tokenActual.valor == ",") {
					q = 33;
				}else if(this._tokenActual.valor == "}") {
					q = 35;
				}else {
					this._ERROR = true;
				}
				break;
			case 35:
				if(this.esOperador()) {
					q = 30;
				}else if(this._tokenActual.valor == "/") {
					q = 36;
				}else if(this._tokenActual.tipo == "$") {
					this._RECONOCE = true;
				}else {
					this._ERROR = true;
				}
				break;
			case 36:
				if(this._tokenActual.valor == "/") {
					q = 37;
				}else {
					this._ERROR = true;
				}
				break;
			case 37:
				this._RECONOCE = true;
				break;
			case 38:
				if(this.esIdentificador()) {
					q = 39;
				}else if(this._tokenActual.valor == "{") {
					q = 42;
				}else {
					this._ERROR = true;
				}
				break;
			case 39:
				if(this._tokenActual.valor == ",") {
					q = 40;
				}else if(this._tokenActual.valor == "/") {
					q = 45;
				}else if(this._tokenActual.tipo == "$") {
					this._RECONOCE = true;
				}else {
					this._ERROR = true;
				}
				break;
			case 40:
				if(this.esIdentificador()) {
					q = 41;
				}else if(this._tokenActual.valor == "{") {
					q = 42;
				}else {
					this._ERROR = true;
				}
				break;
			case 41:
				if(this._tokenActual.valor == ",") {
					q = 40;
				}else if(this._tokenActual.valor == "/") {
					q = 45;
				}else if(this._tokenActual.tipo == "$") {
					this._RECONOCE = true;
				}else {
					this._ERROR = true;
				}
				break;
			case 42:
				if(this.esNumero()) {
					q = 43;
				}else {
					this._ERROR = true;
				}
				break;
			case 43:
				if(this._tokenActual.valor == ",") {
					q = 42
				}else if(this._tokenActual.valor == "}") {
					q = 44;
				}else {
					this._ERROR = true;
				}
				break;
			case 44:
				if(this._tokenActual.valor == ",") {
					q = 40;
				}else if(this._tokenActual.valor == "/") {
					q = 45;
				}else if(this._tokenActual.tipo == "$") {
					this._RECONOCE = true;
				}else {
					this._ERROR = true;
				}
				break;
			case 45:
				if(this._tokenActual.valor == "/") {
					q = 46;
				}else {
					this._ERROR = true;
				}
				break;
			case 46:
				this._RECONOCE = true;
				break;
		}
	}
	if(this._RECONOCE) {
		resultado.mensaje = "Se reconoce =)";
		resultado.reconoce = true;
	}else {
		resultado.mensaje = "¡Error! =(, no se reconoce";
		resultado.reconoce = false;
	}
	return resultado;
};

Reconocedor.prototype.esTipo = function() {
	if(this._tokenActual.valor == "CONJUNTO") {
		return true;
	}
	return false;
};

Reconocedor.prototype.esIdentificador = function() {
	if(this._tokenActual.tipo == "<ID>") {
		return true;
	}
	return false;
};

Reconocedor.prototype.esNumero = function() {
	if(this._tokenActual.tipo == "<NUM>") {
		return true;
	}
	return false;
};

Reconocedor.prototype.esAdicionar = function() {
	if(this._tokenActual.valor == "adicionar") {
		return true;
	}
	return false;
};

Reconocedor.prototype.esEliminar = function() {
	if(this._tokenActual.valor == "eliminar") {
		return true;
	}
	return false;
};

Reconocedor.prototype.esImprimir = function() {
	if(this._tokenActual.valor == "imprime") {
		return true;
	}
	return false;
};

Reconocedor.prototype.esOperador = function() {
	if(this._tokenActual.valor == "+" || this._tokenActual.valor == "-" || this._tokenActual.valor == "*") {
		return true;
	}
	return false;
}