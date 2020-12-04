
//Variables 

var neuronas =[
  [3,1],
  [1,3],
  [1,2],
  [2,2]
]




var p1=[
  [0,0],
  [0,0]
]



var alpha = 0.1
var x=new Array();
var botonactivo=0

//entradas
var n =2;
//salidas
var k=2

//sesgos
var b=[0.2,0.3]


function llenarPesos(a){
  for(let i=0;i<n;i++)
  {
    for(let j=0;j<k;j++)
    {
        a[i][j]=Math.random(0,1)

    }
  }

}

function ponerRuido(a){
  for(let i=0;i<4;i++)
  {
    for(let j=0;j<2;j++)
    {
        let r=Math.floor(Math.random(1,2))
        if(r%2==0)
          a[i][j]+=Math.random(0,1)
          else
          a[i][j]-=Math.random(0,1)

    }
  }

}

function inicio(){


  
  if(botonactivo==0)
  {
    x=new Array();
    x=neuronas[0];
    llenarPesos(p1)
    ponerRuido(neuronas)
    var boton = document.getElementById("btn-ent")
    boton.style.display=""
    botonactivo++
  }


  console.log("Pesos:")
  for(let i=0;i<n;i++)
  {
    for(let j=0;j<k;j++)
    {
        console.log("Peso["+i+"]["+j+"]"+p1[i][j])

    }
  }

 

  for(let i=0; i<neuronas.length;i++)
  {
    let primerC=clasificador(neuronas[i],p1);

    console.log("Primer Clasificacion:")

    console.log("Punto: ("+neuronas[i][0]+","+neuronas[i][1]+")")
    console.log("Pertenencia: \nClase 1:"+primerC[0]+"\nClase 2:"+primerC[1])



  }
  

  

}





	function clasificador(x,p){
    var dy = new Array()

    for(let i=0;i<x.length;i++)
    {
      var s=b[i];

      for(let j=0;j<x.length;j++)
      {
        s+=p[j][i]*x[j];
      }

     
      dy.push(f(s))


    }



  
    console.log(dy)

    return dy




   
  }

  //Funcion De Activacion
// Derivada de la funcion df(x) = f(x)(1-f(x))
  function f(s){
    
   return 1/(1+Math.exp(-s))

  }

  function df(x)
  {
    return f(x)*(1-f(x))
  }


function entrenamiento(p,vuelta){

  
  console.log("==============================================================================================")
  if(vuelta==0)
  {
    console.log("ENTRENAMIENTO: ")
  }
  console.log("Epoca: "+(vuelta+1))

  let numero= Math.floor(Math.random(0, 3))

  let x=neuronas[numero]
  console.log(numero)

  
  
  var y = clasificador(x,p)
  
  var error=0
  var dy=new Array();

  for(var i = 0;i<y.length;i++)
  {
    error=( x[0]<x[1]? 1 : -1 ) - y[i]
    
    dy.push(error*df(y[i]))
    console.log("Error: "+(error*df(y[1])))

    
  }
  


  for(var i = 0; i < x.length; i++)
  {
    for(var j = 0; j < x.length; j++)
    {

      p1[j][i]+= x[j] * dy[i] * alpha;   
    }

    b[i]+=dy[i]*alpha






  }

  if(dy[0]<0 && dy[1]<0)
    vuelta=99

  vuelta++

  
  if(vuelta!=100)
  {
    entrenamiento(p1,vuelta)
  }
  else{

    console.log("============================================================================================================================")
    for(let i=0;i<neuronas.length;i++)
    {
      let yFinal= clasificador(neuronas[i],p1);

        console.log("Para el Punto: ("+neuronas[i][0]+","+neuronas[i][1]+")")
        console.log("Y Clase 1:"+yFinal[0]+"\nY Clase 2:"+yFinal[1])


    }
  }
  




}





  


  



