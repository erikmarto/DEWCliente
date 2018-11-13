window.onload = function () {

class Calculadora {
    constructor(x1, x2) {
        this.x1 = x1;
        this.x2 = x2;
        this.resultado = null;
    }
    sumar(){
        this.resultado = this.x1 + this.x2;
        document.write("La suma de "+ this.x1 + " y " + this.x2 + " es: ");
        this.imprimir();
    }

    restar(){
        this.resultado = this.x1 - this.x2;
        document.write("La resta de "+ this.x1 + " y " + this.x2 + " es: ");
        this.imprimir();
    }

    multiplicar(){
        this.resultado = this.x1 * this.x2;
        document.write("La multiplicacion de "+ this.x1 + " y " + this.x2 + " es: ");
        this.imprimir();

    }

    dividir(){
        this.resultado = this.x1 / this.x2;
        document.write("La division de "+ this.x1 + " y " + this.x2 + " es: ");
        this.imprimir();
    }

    imprimir(){
        document.write(this.resultado+'<br>');
    }
}

class CalculadoraCientifica extends Calculadora {
    cuadrado() {
        this.resultado = this.x1 * this.x1;
        document.write(this.x1 + ' elevado al cuadrado es: ');
        this.imprimir();
      }
  
      raizCuadrada() {
        this.resultado = Math.sqrt(this.x1);
        document.write('La raiz cuadrada de ' + this.x1 +' es: ');
        this.imprimir();
      }
}

const calculadora1 = new Calculadora (100,200);
calculadora1.sumar();
calculadora1.restar();
calculadora1.multiplicar();
calculadora1.dividir();

document.write("</br>");

const calculadoraCientifica1 = new CalculadoraCientifica(6, 2);
calculadoraCientifica1.sumar();
calculadoraCientifica1.restar();
calculadoraCientifica1.multiplicar();
calculadoraCientifica1.dividir();
calculadoraCientifica1.cuadrado();
calculadoraCientifica1.raizCuadrada();
}