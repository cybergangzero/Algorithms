/*Para la solucion de este problema, usare una estrategia voraz. Probare todos los caminos posibles, y aquel que tenga el valor mas bajo,
sera el camino mas corto. Lo que hare es lo siguiente:
-Para cada punto i del plano/conjunto compuesto por n puntos (donde 1<=i<=n) hare un recorrido desde el punto i a cada punto j del plano,
donde j pertenece a n y j es diferente de i. Sabiendo que i es un elemento del conjunto formado por n puntos, entonces, en la primera iteracion,
el punto i podra conectarse a n-1 puntos. Luego de elegir uno de los n-1 puntos, en la segunda iteracion podra ir a uno de los n-2 puntos, y asi 
hasta que solo le quede un punto que elegir.
-Algo a destacar, es que este algoritmo retrocedera una vez haya llegado al ultimo punto. 
-Para una iteracion completa, el algoritmo retrocedera al punto n-2, asi, repetira el proceso, luego al punto n-3, repetira el proceso 
y asi recursivamente...
-Una vez completada la primera iteracion y sus respectivas sub-iteraciones, se procedera con el siguiente elemento i+1, luego el i+2, hasta llegar
al n
-
*/
/*supongamos que hay 4 puntos:
caminos=[]
elijo el punto 1
quedan el punto 2, 3 y 4
elijo el punto 2
quedan el 3 y 4
elijo el punto 3
queda el 4
elijo el punto 4
el primer camino es (1, 2, 3, 4)
calculo la distancia del primer camino
agrego el camino y la distancia respectiva al array de caminos.
retrocedo al punto n-2
el camino queda como 1, 2
quedan el punto 3 y 4
como el punto 3 ya ha sido recorrido desde el punto 2 al 3, elijo el 4
queda el punto 3
elijo el punto 3
el segundo camino es (1, 2, 4, 3)
calculo la distancia del segundo camino
agrego el camino y la distancia respectiva al array de caminos
retrocedo al punto n-3
como el punto n-3 es i, empiezo una nueva iteracion
como el 2 ya fue elegido, elegire el 3
quedan el 2 y el 4
elijo el 2
queda el 4
elijo el 4
el nuevo camino es 1, 3, 2, 4
...*/

/*Dado un array con el elemento i en la posicion j, entonces se le podra combinar con con los n-1 arrays de algun elemento k, a excepcion
del array del elemento k donde k este en la misma posicion que el elemento i.
*/

/*Esta es una idea vaga de lo que deberia hacer la funcion de permutacion:
function permutacion(set){
  //Bucle principal que elecciona el elemento a cambiar de posicion
  for (let i=0; i<set.length; i++){
    //Bucle secundario que va cambiado la posicion del elemento principal a lo largo del nuevo conjunto
    for (let j=0; j<set.length; j++){
      //Tercer bucle que se encarga de seleccionar el elemento secundario (no el principal) a cambiar de posicion
      for (let k=0; k<set.length; j++){
        //Cuarto bucle que va cambiando la posicion del elemento secundario a lo largo del nuevo conjunto
        for (let l=0; l<set.length; l++){

        }
      }
    }
  }
  ...
}*/

function freePosition(set){ //Servira para comprobar la posicion libre del vector que forma la permutacion
  let i=0;
  while (i<set.length){
    if (set[i]===null){
      return i; //retorno la posicion para que el algoritmo conozca en que posicion colocar el numero del conjunto secundario
    }
    i++;
  }
  return -1;
}

function extractElement(set, elementToRemove){ /*Servira para quitar el elemento actual que se extrajo del conjunto a partir del cual se
  forma la permutacion, para que asi no pueda ser usado en la siguiente iteracion, es decir, forma parte de la permutacion de nuevo.*/
  let setWhitoutTheElement=[];
  for (let i=0; i<set.length; i++){
    if (set[i]!==elementToRemove){
      setWhitoutTheElement.push(set[i]);
    }
  }
  return setWhitoutTheElement;
}

function equalOrderSets(setA, setB){ //Esta funcion servira para comprobar si una permutacion es diferente de otra.
  if (setA.length===setB.length){
    let matchCounter=0, setsSize=setA.length;
    for (let i=0; i<setsSize; i++){
      if (setA[i]===setB[i]){
        matchCounter++;
      }
    }
    return matchCounter===setsSize? true: false;
  }
  return true; //Si los conjuntos difieren en tamaño entonces obviamente son diferentes.
}

function compareSetWithOthersSets(set, othersSets){
  let i=0;
  while (i<othersSets.length){
  	if (equalOrderSets(set, othersSets[i])){
  	  return true;
  	}
    i++;
  }
  return false;
}

function elementsOfTheSetDifferFromEachOther(set){ //Condicion para el conjunto de entrada a la funcion de permutacion
  if (set.length===1){
    return true;
  }
  for (let i=0; i<set.length; i++){
    for (let j=i+1; j<set.length; j++){
      if (set[i]===set[j]){
        return false;
      }
    }
  }
  return true;
}

/*Explicacion de la funcion permutacion:
Una funcion recursiva para un problema recursivo...
En cuanto a los parametros: 
El primero es el conjunto de entrada, el cual servira de base para ir seleccionando que elemento
de tal conjunto de entrada ira en las sucesivas posiciones correspondientes. Una vez tal elemento este en la posicion correspondiente,
se podra combinar con los elementos restantes de ese conjunto. Cabe destacar que en cada iteracion, al conjunto de entrada
se le quitara el elemento seleccionado para luego volver a ser usado en un nuevo ciclo, por medio de la llamada recursiva de la funcion de
permutacion.
El segundo es el conjunto que contendra la permutacion. Es del mismo tamaño que el conjunto de entrada,
y sus valores iniciales (al inicio de cada iteracion/llamada recursiva derivada del bucle principal) seran todos nulos.
A medida que avanza el algoritmo, se iran sustituyendo los valores nulos de la permutacion por valores del conjunto de entrada.
Una vez que todos los valores de la permutacion sean no nulos, entonces se comprobara su validez con el conjunto resultante de permutaciones
con el fin de validar si la permutacion todavia no ha sido formada (es diferente al resto).
Finalmente el tercero se encargara de contener todas las permutaciones sin repeticion del conjunto de entrada (incluyendo el mismo conjunto de entrada
original/inicial).
En cuanto al proceso:
Hago un primer bucle que seleccione un elemento del conjunto de entrada.
En el segundo bucle, el elemento seleccionado se posiciona en una posicion libre (nula) de la permutacion.
Luego, se crea una nueva variable cuyo valor sera el conjunto de entrada sin/menos el valor seleccionado
Una vez hecho esto, se llama de nuevo a la funcion con la nueva variable como primer parametro, la permutacion y el conjunto resultant.
Asi recursivamente.
La condicion de finalizacion es cuando la permutacion ya no tenga elementos no nulos (que este completa).
Una vez hecho eso, se compara esta permutacion con todas las permutaciones del conjunto resultante. Si es diferente, se 
agrega. Cabe destacar que si el conjunto resultante no tiene ninguna, entonces la permutacion se agregara, ya que sera la primera 
obtenida.
Una vez se complete una permutacion, se retorna y se comienza un nuevo ciclo con un nuevo elemento. Menciono esto por que al iniciar un
ciclo, el valor de la permutacion resultante vuelve a su valor original para poder ser 
usada de nuevo en una nueva llamada recursiva. Se podran notar las instruccions correspondientes (y sus comentarios)
en el codigo.
Fin del proceso.
 */
function permutation(inputSet, resultingPermutation, resultingSetOfPermutations){ 
  //Robustez ante todo: Compruebo que los elementos del conjunto de entrada son diferentes.
  if (!elementsOfTheSetDifferFromEachOther(inputSet)){
  	console.log('Los elementos del conjunto de entrada deben ser diferentes!');
    return;
  }
  if (freePosition(resultingPermutation)===-1){ //Condicion de finalizacion de la recursion:
    /*Verifico si el conjunto secundario resultante es diferente a los conjuntos de que se incluyen en los conjuntos obtenidos. Si es diferente, 
    se agregara*/
    if (!compareSetWithOthersSets(resultingPermutation, resultingSetOfPermutations)){
      resultingSetOfPermutations.push(resultingPermutation);
    }
    return;
  }
  //Hago una copia del conjunto secundario para no perder su valor luega de la primera iteracion
  let originalValueresultingPermutation=resultingPermutation.map(element=>{
    return element;
  });
  for (let i=0; i<inputSet.length; i++){ //Bucle que se encarga de selecionar un elemento del conjunto de entrada
    for (let j=0; j<inputSet.length; j++){ //Bucle que cambia la posicion del elemento seleccionado a lo largo de la permutacion
      let position=freePosition(resultingPermutation);
      if (position>-1){
        resultingPermutation[position]=inputSet[i];
      }
      let newInputSet;
      newInputSet=extractElement(inputSet, inputSet[i]);
      permutation(newInputSet, resultingPermutation, resultingSetOfPermutations);
    }
    resultingPermutation=originalValueresultingPermutation.map(element=>{
      return element;
    });
  }
}

function generateNullSet(size){
  let set=[];
  for (let i=0; i<size; i++){
    set.push(null);
  }
  return set;
}

/*Ejemplo de entrada. Tamaño: 6 elementos. El resultado deberian ser 720 conjuntos diferentes del mismo tamaño
que el conjunto de entrada. 720 es la misma cantidad que el factorial del tamaño del
conjunto de entrada, tal como lo indica la definicion de permutacion sin repeticion.*/
let inputSet=['a', 'b', 'c', 'd', 'e', 'f'], test=[];
permutation(inputSet, generateNullSet(inputSet.length), test);
console.log(test);
console.log(`La cantidad de permutaciones es: ${test.length}`);