// Ruta de datos en JSON (relativa al HTML)
	  var JSON_DATA_URL="json/teams.json";
	  var equipos=new Array();
	  var usados= new Array();
	   window.onload= function(e){	
		 
	     var doc = document;
		 var iniciaCampeonato=doc.getElementById("ver");
		 var verClasificados=doc.getElementById("clasificados");
		 var verDescienden=doc.getElementById("descienden");
		 var creaJornada=doc.getElementById("creaJornada");
		 var generaJornada=doc.getElementById("generaJornada");
		 var cancha=doc.getElementById("panelView");
		 
   
		 
		 iniciaCampeonato.onclick=function(e){
		 ocultaTodo();
		 
		 // Accedemos la tabla
		 var table= doc.getElementById("data");
		 // La hacemos visible
	     table.style.visibility="visible";
		 // Borramos filas si es que ya se habían cargado
		 var tb = table.tBodies[0];
		 for(;tb.childElementCount;)	 
		    tb.removeChild(tb.children[0]);
			
		 // Llamamos servicio que traiga los datos en Json (AJAX)
		 
		 var data = loadJSONData(JSON_DATA_URL,
		   function(e){ // funcion de error
		      // retornamos un objeto vacio
		      return {results:{title:"Error Data Not Available"}, 
			                   teams:[]
					 };
		   }
		 );
		 
		 // Ver muestra de los resultados
		 var teams = data.results.teams;
		 // Ponemos un caption tomando su valor del JSON
		 if(!table.caption){
		   var cap = doc.createElement("caption");
		   
		   cap.innerHTML=data.results.title; //la propiedad innerHTML permite insertar html en el elemento
		   table.appendChild(cap);
		 }
		 // Llenamos la tabla
		 var i=0;
         var j=1;
		 for(i in teams){
		   var teamObj = teams[i];
		   // Nueva fila (tr) con 11 celdas (td)
		   var tr = tb.insertRow(i);
                   tr.setAttribute("class","row");
                   tr.setAttribute("onclick","clickTeam(this)"); //setea a la fila la funcion clickTeam cuando es clickeada
         

		   var num = tr.insertCell(0);
		   var arrow = tr.insertCell(1);
		   var team = tr.insertCell(2);		   		   
		   var PJ = tr.insertCell(3);
		   var PG = tr.insertCell(4);
		   var PE = tr.insertCell(5);
		   var PP = tr.insertCell(6);
		   var GF = tr.insertCell(7);
		   var GC = tr.insertCell(8);
		   var DG = tr.insertCell(9);
		   var Pt = tr.insertCell(10);   		   
		   

                   //se define el indice segun la posicion del equipo
				   num.innerHTML = j;
                   num.setAttribute("id","num");
				   Pt.setAttribute("class","pts");
				   arrow.setAttribute("class","arrow"+j);
				   team.setAttribute("class","team");
                   if(j<=4) num.setAttribute("class","blue"); //si el equipo es de los 4 primeros el numero es azul
                   else num.setAttribute("class","black"); //sino es negro


		   arrow.innerHTML = " ";
		   team.innerHTML=teamObj.team;
                   team.setAttribute("colspan",5);
		   PJ.innerHTML=teamObj.PJ;
		   PG.innerHTML=teamObj.PG;
		   PE.innerHTML=teamObj.PE;
		   PP.innerHTML=teamObj.PP;
		   GF.innerHTML=teamObj.GF;
		   GC.innerHTML=teamObj.GC;
		   DG .innerHTML=teamObj.DG;
		   Pt.innerHTML=teamObj.Pt;
 
                   j++;
		 
		 }
		 }
		 
		 
	
		 
		 
		 
		 var graficaPuntos=doc.getElementById("puntosCampeonato");
		 var graficaGoles=doc.getElementById("golesCampeonato");
		 var divGraf=doc.getElementById('chart_div');
		 var divGraf2=doc.getElementById('chart_div2');
		 graficaPuntos.onclick=function(e){
			 ocultaTodo();
			 $('#chart_div').css('visibility', 'visible')
		 }
		 
		 graficaGoles.onclick=function(e){
			 ocultaTodo();
			 $('#chart_div2').css('visibility', 'visible'); 
		 }
		 
		 
		 
		 	verClasificados.onclick = function(){
		 	 ocultaTodo();		
	 		 var table= doc.getElementById("data");
	 		 table.setAttribute("class","visible");
	 		 var filas = document.getElementById("data").rows;
	 		 var i = 1; 
			for(i in filas){
					filas[i].setAttribute("class","visible");
						if(i>4){
								    	filas[i].setAttribute("class","hidden");
						}
    	}
	 		 
	
	    }		
	    
	    verDescienden.onclick= function(){
			 ocultaTodo();	
	 		 var table= doc.getElementById("data");
	 		 table.setAttribute("class","visible");
			 
	 		 var filas = document.getElementById("data").rows;
	 		 var i = 1; 
    for(i in filas){
    	  filas[i].setAttribute("class","visible");
    		 if(i<=8 && i!=0){
								    	filas[i].setAttribute("class","hidden");
    		 	}
    	}
	 		 
	
	    }				 
		 
		 creaJornada.onclick=function(e){
		 alert("asdasd");
		 }
		 
		 var row1;
		 
		 
		 generaJornada.onclick=function(e){
		 ocultaTodo();
		 var numAleatorio;var conta=1;
		 equipos=[];
		 usados=[];
				var filastabla=document.getElementById("data").rows;
				for(var i=1; i<13;i++){
					var numAleatorio;
					numAleatorio=aleatorio(1, 12);;
					var row=filastabla[numAleatorio];					
					generaJornadaAleatoria(row, conta, equipos);
					conta++;
				}
				
		 }
		 
		document.getElementById("aceptaJornada").onclick= function(){
		
			var marcador1; var marcador2;
				var aux; var aux2;
				var y=1;var z=0;
				
				for(var i=0;i<11;i++ ){					
					aux=equipos[i];
					aux2=equipos[i+1];
					z=y+1;
					marcador1=document.getElementById("marcador"+y).value;
					marcador2=document.getElementById("marcador"+z).value;
						defineGanador(marcador1,marcador2, aux, aux2);
						i++;
						y+=2;
				}			
				
				document.getElementById('dialog').style.visibility = 'hidden';
				document.getElementById('data').style.visibility = 'visible';
				debugger;
				for(var w=1; w<13;w++){
					document.getElementById("marcador"+w).value= '';			
				}
		 }
		 
		 
	}
	
	

	var ordenColumna=function(col){
	      var index= col.cellIndex;
	       //alert("Cell index is: " + col.cellIndex);
	      sortTable(index);
	}
	
	
	
	
		var cont=0;
		 var row1;
        document.getElementById("num").onclick=clickTeam= function(row){
				dialogo(row);
         }
         
		 
		 

		 
         	function aleatorio(min, max){
				if (usados.length<=(max-min)) {
						while (repe != false) {
							var num = Math.floor(Math.random()*(max-min+1))+min;
							var repe = repetido(num);
						}
					usados.push(num);
					return num;
				}else {
					return null;
				}		
			}

			function repetido(num) {
				var repe = false;
					for (var i=0; i<usados.length; i++) {
						if (num == usados[i]) {
							repe = true;
						}
					}
						return repe;
			}
		 
		 
		 function dialogo(row){
		 
			if( cont == 0){ // Almacena la primera fila seleccionada
				 row1=row;
			  } 
                 row.style.backgroundColor = "#FF6600";				 
				 cont++;
			if(cont==2){
                var team1=row1.cells[2].innerHTML;
                var team2=row.cells[2].innerHTML;
				$("#t_1").html(team1);
                $("#t_2").html(team2);
				document.getElementById('dialog1').style.visibility = 'visible';  
				
				despliegaDialogo();
				
				cont++;	
			}
			if(cont==2){
			 cont=0;
			}
		 
		 function despliegaDialogo(){
			$("#dialog1").dialog({
				autoOpen: true,
				modal: true,
				buttons: {
				"Aceptar": function () {
				
				var goles1 = marcador1.value;	// esta variable tiene el dato que se digita en dialogo
				var goles2 = marcador2.value;   // segunda casilla de dialogo
				defineGanador(goles1, goles2, row1, row);
				reset(row1, row);
				$(this).dialog("close");
				}
				,
				"Cerrar": function () {
				$(this).dialog("close");
				}
				}
				});
				
				el_nombre.value = nombre.value;
				$("#dialog1").dialog("option", "width", 600);
				$("#dialog1").dialog("option", "height", 600);
				$("#dialog1").dialog("option", "resizable", false);
				$("#dialog1").dialog("open");
		 
		 
		 }
		 
		 
		 }
		 
		 function reset(row, row1){ cont=0; row.style.backgroundColor = "white"; row1.style.backgroundColor = "white"; }
		 
		 function ganador(goles1, goles2, row){	
			//Equipo ganador
			var golesA=parseInt(goles1);  //se convierte variable que tre los goles a numeros para poderla sumar
			var golesE=parseInt(goles2);
						
			var pjsx=parseInt(row.cells[3].innerHTML);              //partidos jugados 
			var pjs=pjsx+1;
			row.cells[3].innerHTML=pjs;
			
			var pgsx=parseInt(row.cells[4].innerHTML);              //partidos ganados
			var pgs=pgsx+1;
			row.cells[4].innerHTML=pgs;
			
			
			
			var gfx=parseInt(row.cells[7].innerHTML);              //goles a favor
			var gf=gfx+golesA;
			row.cells[7].innerHTML=gf;
			
			var gcx=parseInt(row.cells[8].innerHTML);              //goles en contra
			var gc=gcx+golesE;
			row.cells[8].innerHTML=gc;


                        var dgx=parseInt(row.cells[9].innerHTML);
                        var dg=golesA; //diferencia de gol
                        dgx+=dg;
                        row.cells[9].innerHTML=dgx;
			
			var ptsx=parseInt(row.cells[10].innerHTML);             // puntos totales
			var pts=ptsx+3; //3pts por gane
			row.cells[10].innerHTML=pts;

			row.cells[1].setAttribute("class","arrow02"); // el 02 es de ganador se le pone flecha arriba
		}
	
		 function perdedor(goles1, goles2, row){

			var golesA=parseInt(goles2);  //se convierte variable que tre los goles a numeros para poderla sumar
			var golesE=parseInt(goles1);
				
			var pjsx=parseInt(row.cells[3].innerHTML);              //partidos jugados 
			var pjs=pjsx+1;
			row.cells[3].innerHTML=pjs;
			
			var ppsx=parseInt(row.cells[6].innerHTML);              //partidos perdidos
			var pps=ppsx+1;
			row.cells[6].innerHTML=pps;
			
			var gfx=parseInt(row.cells[7].innerHTML);              //goles a favor
			var gf=gfx+golesA;
			row.cells[7].innerHTML=gf;
			
			var gcx=parseInt(row.cells[8].innerHTML);              //goles en contra
			var gc=gcx+golesE;
			row.cells[8].innerHTML=gc;	


                           
                        var dgx=parseInt(row.cells[9].innerHTML);
                        var dg=golesE; //diferencia de gol
                        dgx-=dg;
                        row.cells[9].innerHTML=dgx;
						
						row.cells[1].setAttribute("class","arrow01"); // el 01 es de perdedor para flecha abajo
		}
		
		function empate(goles1,row){	    
			
			var goles=parseInt(goles1);  			
			
			var pjsx=parseInt(row.cells[3].innerHTML);              //partidos jugados 
			var pjs=pjsx+1;
			row.cells[3].innerHTML=pjs;
			
			var pesx=parseInt(row.cells[5].innerHTML);              //partidos empatados
			var pes=pesx+1;
			row.cells[5].innerHTML=pes;
						
			var gfx=parseInt(row.cells[7].innerHTML);              //goles a favor
			var gf=gfx+goles;
			row.cells[7].innerHTML=gf;
			
			var gcx=parseInt(row.cells[8].innerHTML);              //goles en contra
			var gc=gcx+goles;
			row.cells[8].innerHTML=gc;

			
			var ptsx=parseInt(row.cells[10].innerHTML);             // puntos totales
			var pts=ptsx+1;  // 1 pt POR EMPATE
			row.cells[10].innerHTML=pts;
			row.cells[1].setAttribute("class","arrow00"); // 00 es atributo de empate

		}
	
	
	
	function defineGanador(goles1, goles2, rowP, rowS){
	//----------------------------------------------------------------PRIMER CASO- GANA CASA -------------------------------------------------------------
		if(goles1>goles2){
		ganador(goles1,goles2,rowP);
		perdedor(goles1,goles2,rowS);
	}
//----------------------------------------------------------------SEGUNDO CASO - GANA VISITA -------------------------------------------------------------
		if(goles1<goles2){
			ganador(goles2,goles1,rowS);
		    perdedor(goles2,goles1,rowP);
		}	
//-----------------------------------------------------TERCER CASO - EMPATE---------------------------------------------------------------------
		if(goles2==goles1){
			empate(goles1,rowP);
			empate(goles1,rowS);
		}

         sortTable(10);
	}

        function sortTable(index){
    		var tbl = document.getElementById("data").tBodies[0];
    		var store = [];
                
    		for(var i=0, len=tbl.rows.length; i<len; i++){
        	var row = tbl.rows[i];
        	var sortnr = parseInt(row.cells[index].textContent || row.cells[index].innerText);
                
       		if(!isNaN(sortnr)) store.push([sortnr, row]);
    		}
    		store.sort(function(x,y){
        		return x[0] - y[0];
    		});
                for(var i=store.length-1; i>=0; i--){
        		tbl.appendChild(store[i][1]);
                        
    		}
                for(var i=0, len=tbl.rows.length; i<len; i++){
		     var row = tbl.rows[i];
                     row.cells[0].innerHTML=i+1;
                     if(i<4) row.cells[0].setAttribute("class","blue"); //si el equipo es de los 4 primeros el numero es azul
                     else row.cells[0].setAttribute("class","black"); //sino es negro  //todo esto se puede hacer en una funcion por aparte
		}
    		store = null;
	}


	
		
    function generaJornadaAleatoria(row, conta, equipos){
			if( conta == 1){ 				
				 var team1=row.cells[2].innerHTML;
				 $("#t1").html(team1);
				 equipos.push(row);
			}             		 
				 
			if(conta==2){
                var team2=row.cells[2].innerHTML;
                $("#t2").html(team2);
				equipos.push(row);				
			}
			if(conta==3){
                var team3=row.cells[2].innerHTML;               
				$("#t3").html(team3);
				equipos.push(row);	
			}
			if(conta==4){
                var team4=row.cells[2].innerHTML;
				$("#t4").html(team4);
				equipos.push(row);	
			}
			if(conta==5){
                var team5=row.cells[2].innerHTML;
                $("#t5").html(team5);
				equipos.push(row);	
			}
			if(conta==6){
                var team6=row.cells[2].innerHTML;
                $("#t6").html(team6);
				equipos.push(row);	
			}	
			if(conta==7){
                var team7=row.cells[2].innerHTML;                
				$("#t7").html(team7);
				equipos.push(row);	
			}
			if(conta==8){
                var team8=row.cells[2].innerHTML;               
                $("#t8").html(team8);						
				equipos.push(row);	
			}
			if(conta==9){
                var team9=row.cells[2].innerHTML;                
				$("#t9").html(team9);
				equipos.push(row);	
			}
			if(conta==10){
                var team10=row.cells[2].innerHTML;
				$("#t10").html(team10);
				equipos.push(row);	
			}
			if(conta==11){
                var team11=row.cells[2].innerHTML;
				$("#t11").html(team11);
				equipos.push(row);	
			}
			
			if(conta==12){
                var team12=row.cells[2].innerHTML;
                $("#t12").html(team12);				
				equipos.push(row);
				document.getElementById('data').style.visibility = 'hidden';
				document.getElementById('dialog').style.visibility = 'visible';
				
				
				
			}
			
		
		} 
		 
	function ocultaTodo(){
		$('#data').css('visibility', 'hidden');		
		$('#chart_div2').css('visibility', 'hidden');
		$('#chart_div').css('visibility', 'hidden'); 		
		$('#dialog').css('visibility', 'hidden');
		$('#panelView').css('background','#B8E65C');		
	}	 
	

	 
