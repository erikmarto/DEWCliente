window.onload = function () {

    class Persona {
        constructor(nom, ed) {
            this._nombre = null;
            this._edad = 0;
        }

        get nombre() {
            return this._nombre;
        }

        set nombre(n) {
            this._nombre = n;
        }

        get edad() {
            return this._edad;
        }

        set edad(e) {
            if (e >= 0) {
                this._edad = e;
            } else {
                throw "La edad no puede ser negativa";
            }
        }

        imprimir() {
            console.log('Nombre:'+ this.nombre + ' y Edad:' + this.edad );
        }
    }
    const persona1 = new Persona();
    persona1.nombre = 'Erik martorell';
    persona1.edad = 43;
    persona1.imprimir();
}