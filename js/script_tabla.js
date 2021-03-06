// Ruta de datos en JSON (relativa al HTML)
	  var JSON_DATA_URL="/teams";
	  var equipos=new Array();
	  var usados= new Array();
	  var contJornada=1;
	   window.onload= function(e){	
	   
	   
		 
	     var doc = document;
		 var verTabla=doc.getElementById("ver");
		 var verClasificados=doc.getElementById("clasificados");
		 var verDescienden=doc.getElementById("descienden");
		 var creaJornada=doc.getElementById("creaJornada");
		 var generaJornada=doc.getElementById("generaJornada");
		 var cancha=doc.getElementById("panelView");
		 var creaCamp=doc.getElementById("creaCampeonato");
		 
		 
		 verTabla.onclick=function(e){
			 reseteaTabla();
			 ocultaTodo();
			 
			 $('#data').css('visibility', 'visible');
		 }
		 
		 
		 //-----------------------------------------------------
		 $("#dialogInfo").dialog({
				autoOpen: false,
				modal: true,
				width: 600,
				height: 300,
				buttons: {
					"Cerrar": function() {
						$(this).dialog("close");
					}
				}
			});
			
		
			$('#logo2').click(function() {
       $("#dialogInfo").dialog("open");
        
        
       
    });
		 
		 //-----------------------------------------------------
   
		 
		 creaCamp.onclick=function(e){
		 ocultaTodo();
		 
		 // Accedemos la tabla
		 var table= doc.getElementById("data");
		 // La hacemos visible
	     
		 // Borramos filas si es que ya se hab�an cargado
		 var tb = table.tBodies[0];
		 for(;tb.childElementCount;)	 
		    tb.removeChild(tb.children[0]);
			
		 // Llamamos servicio que traiga los datos en Json (AJAX)
		 
		 var data = loadJSONData(JSON_DATA_URL,
		   function(e){ // funcion de error
		      // retornamos un objeto vacio
		      console.log("error en load");
		      return {results:{title:"Error Data Not Available"}, 
			                   teams:[]
					 };
		   },
		   function(data){buildTable(data, table,tb);}
		 );
		 
		 
		 }
		 
		 
		  function buildTable(data, table,tb){		
		 // Ver muestra de los resultados
		 var teams = data.results[0].equipos;
		 var jornadas = data.results[0].jornadas; //aqui se guarda el array de jornadas
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
		  /* PJ.innerHTML=teamObj.PJ;
		   PG.innerHTML=teamObj.PG;
		   PE.innerHTML=teamObj.PE;
		   PP.innerHTML=teamObj.PP;
		   GF.innerHTML=teamObj.GF;
		   GC.innerHTML=teamObj.GC;
		   DG .innerHTML=teamObj.DG;
		   Pt.innerHTML=teamObj.Pt;*/
		   
		   PJ.innerHTML=0;
		   PG.innerHTML=0;
		   PE.innerHTML=0;
		   PP.innerHTML=0;
		   GF.innerHTML=0;
		   GC.innerHTML=0;
		   DG .innerHTML=0;
		   Pt.innerHTML=0;
 
                   j++;
		 
		 }
		 /*aqui llamamos a la funcion que calcula los datos segun las jornadas (calculaDatosJornadas() declarada al final)
		 guardadas en las var jornadas*/
		 
		 calculaDatosJornadas(jornadas);
		 ////-------------------------------------------------------------------------------------------------------
		// sortTable(10);
		 }
		 
		 
	
		 
		 
		 
		 var graficaPuntos=doc.getElementById("puntosCampeonato");
		 var graficaGoles=doc.getElementById("golesCampeonato");
		 var graficaDescienden=doc.getElementById("puntosGeneral");
		 var divGraf=doc.getElementById('chart_div');
		 var divGraf2=doc.getElementById('chart_div2');
		 var divGraf3=doc.getElementById('dashboard_div');
		 graficaPuntos.onclick=function(e){
			 ocultaTodo();
			 drawChart();
			 $('#chart_div').css('visibility', 'visible')
		 }
		 
		 graficaGoles.onclick=function(e){
			 ocultaTodo();
			 drawChart2();
			 $('#chart_div2').css('visibility', 'visible'); 
		 }
		
		 graficaDescienden.onclick=function(e){
		 debugger;
			 ocultaTodo();
			 drawChart3();
			 $('#dashboard_div').css('visibility', 'visible'); 
		 }	
		 
		 
		 	verClasificados.onclick = function(){
		 	 ocultaTodo();		
	 		 $('#data').css('visibility', 'visible');
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
	 		 $('#data').css('visibility', 'visible');
			 
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
			if(contJornada<23){
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
			}else{ 
				terminaCampeonato(); //metodo que termina el campeonato
				contJornada=1;
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
				
				var goles1 = marcador_1.value;	// esta variable tiene el dato que se digita en dialogo
				var goles2 = marcador_2.value;   // segunda casilla de dialogo
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
				$("#numeroJornada").html('Jornada '+contJornada);
				contJornada++;				
				document.getElementById('data').style.visibility = 'hidden';
				document.getElementById('dialog').style.visibility = 'visible';
				
				
				
			}
		
		
		} 
		 
	function ocultaTodo(){
		$('#data').css('visibility', 'hidden');		
		$('#chart_div2').css('visibility', 'hidden');
		$('#dashboard_div').css('visibility', 'hidden');
		$('#chart_div').css('visibility', 'hidden'); 		
		$('#dialog').css('visibility', 'hidden');
		$('#panelView').css('background','#B8E65C');		
	}	 
	
 function reseteaTabla(){
	
	var filas = document.getElementById("data").rows;
	if(filas[1].getAttribute('class')=='visible' || filas[10].getAttribute('class')=='visible'){
	 		 var i = 1; 
			for(i in filas){
					filas[i].setAttribute("class"," ");
						
    	} 
	}
 }
	 
	  function drawChart() {
		
		if( document.getElementById("data").rows[2] != null){
			// Create the data table.
			var rows=document.getElementById("data").rows;
			
			var nombre= rows[1].cells[2].innerHTML;
			var nombre2= rows[2].cells[2].innerHTML;
			var nombre3= rows[3].cells[2].innerHTML;
			var nombre4= rows[4].cells[2].innerHTML;
			var nombre5= rows[5].cells[2].innerHTML;
			var pts=  parseInt(rows[1].cells[10].innerHTML);
			var pts2= parseInt(rows[2].cells[10].innerHTML);
			var pts3= parseInt(rows[3].cells[10].innerHTML);
			var pts4= parseInt(rows[4].cells[10].innerHTML);
			var pts5= parseInt(rows[5].cells[10].innerHTML);
			
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Topping');
			data.addColumn('number', 'Puntos');
			data.addRows([
			  [nombre,  pts],
			  [nombre2, pts2],
			  [nombre3, pts3],
			  [nombre4, pts4],
			  [nombre5, pts5]
			]);

			// Set chart options
			var options = {'title':'Equipos con mas puntos en el campeonato',
						   'is3D':true,
						   'width':700,
						   'height':315};

			// Instantiate and draw our chart, passing in some options.
			var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
			chart.draw(data, options);
		}
	  }
	  
	  function drawChart2() {
			if( document.getElementById("data").rows[2] != null){
				var rows=document.getElementById("data").rows;
				
				var nombre= rows[1].cells[2].innerHTML;
				var nombre2= rows[2].cells[2].innerHTML;
				var nombre3= rows[3].cells[2].innerHTML;
				var nombre4= rows[4].cells[2].innerHTML;
				
				var PJ=  parseInt(rows[1].cells[3].innerHTML);
				var PJ2= parseInt(rows[2].cells[3].innerHTML);
				var PJ3= parseInt(rows[3].cells[3].innerHTML);
				var PJ4= parseInt(rows[4].cells[3].innerHTML);
				
				var PG=  parseInt(rows[1].cells[4].innerHTML);
				var PG2= parseInt(rows[2].cells[4].innerHTML);
				var PG3= parseInt(rows[3].cells[4].innerHTML);
				var PG4= parseInt(rows[4].cells[4].innerHTML);
				
				var PE=  parseInt(rows[1].cells[5].innerHTML);
				var PE2= parseInt(rows[2].cells[5].innerHTML);
				var PE3= parseInt(rows[3].cells[5].innerHTML);
				var PE4= parseInt(rows[4].cells[5].innerHTML);
				var data = google.visualization.arrayToDataTable([
				  ['Equipo', 'PJ', 'PG', 'PE'],
				  [nombre, PJ, PG, PE],
				  [nombre2, PJ2, PG2, PE2],
				  [nombre3, PJ3, PG3, PE3],
				  [nombre4, PJ4, PG4, PE4]
				]);

				var options = {
				  title: 'Rendimiento de Equipos', 
				  width:700,
				  height:315,
				  hAxis: {title: 'Equipo', titleTextStyle: {color: 'red'}
				 
				  }
				};

				var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
				chart.draw(data, options);
			}
	  }
	  
	  function drawChart3() {
		
		if( document.getElementById("data").rows[2] != null){
			// Create the data table.
			var rows=document.getElementById("data").rows;
			
			var nombre= rows[1].cells[2].innerHTML;
			var nombre2= rows[2].cells[2].innerHTML;
			var nombre3= rows[3].cells[2].innerHTML;
			var nombre4= rows[4].cells[2].innerHTML;
			var nombre5= rows[5].cells[2].innerHTML;
			var nombre6= rows[6].cells[2].innerHTML;
			var nombre7= rows[7].cells[2].innerHTML;
			var nombre8= rows[8].cells[2].innerHTML;
			var nombre9= rows[9].cells[2].innerHTML;
			var nombre10= rows[10].cells[2].innerHTML;
			var nombre11= rows[11].cells[2].innerHTML;
			var nombre12= rows[12].cells[2].innerHTML;
			var pts=  parseInt(rows[1].cells[10].innerHTML);
			var pts2= parseInt(rows[2].cells[10].innerHTML);
			var pts3= parseInt(rows[3].cells[10].innerHTML);
			var pts4= parseInt(rows[4].cells[10].innerHTML);
			var pts5= parseInt(rows[5].cells[10].innerHTML);
			var pts6= parseInt(rows[6].cells[10].innerHTML);
			var pts7= parseInt(rows[7].cells[10].innerHTML);
			var pts8= parseInt(rows[8].cells[10].innerHTML);
			var pts9= parseInt(rows[9].cells[10].innerHTML);
			var pts10= parseInt(rows[10].cells[10].innerHTML);
			var pts11= parseInt(rows[11].cells[10].innerHTML);
			var pts12= parseInt(rows[12].cells[10].innerHTML);
			
			
			// Prepare the data
			  var data = google.visualization.arrayToDataTable([
				['Name', 'Puntos logrados'],
				[nombre , pts],
				[nombre2, pts2],
				[nombre3, pts3],
				[nombre4, pts4],
				[nombre5, pts5],
				[nombre6, pts6],
				[nombre7, pts7],
				[nombre8, pts8],
				[nombre9, pts9],
				[nombre10, pts10],
				[nombre11, pts11],
				[nombre12, pts12]
			  ]);

			   // Create a dashboard.
        var dashboard = new google.visualization.Dashboard(
            document.getElementById('dashboard_div'));

        // Create a range slider, passing some options
        var donutRangeSlider = new google.visualization.ControlWrapper({
          'controlType': 'NumberRangeFilter',
          'containerId': 'filter_div',
          'options': {
            'filterColumnLabel': 'Puntos logrados'
          }
        });

        // Create a pie chart, passing some options
        var pieChart = new google.visualization.ChartWrapper({
          'chartType': 'PieChart',
          'containerId': 'chart_div3',
          'options': {
            'width': 600,
            'height': 300,
            'pieSliceText': 'value',
            'legend': 'right'
          }
        });

        // Establish dependencies, declaring that 'filter' drives 'pieChart',
        // so that the pie chart will only display entries that are let through
        // given the chosen slider range.
        dashboard.bind(donutRangeSlider, pieChart);

        // Draw the dashboard.
        dashboard.draw(data);

			
			
		}
	  }
	  
	  function terminaCampeonato(){
	   alert('en terminacampeonato');
		document.getElementById('dialog').style.visibility = 'hidden';		
		
		
	  }
	  
	  
	  function calculaDatosJornadas(arrayJornadas){
	  	  debugger;
	  	    var partido,partidos, fila1,fila2, resultados,res,result1,result2;
			var i;
	  	    var filas = document.getElementById("data").rows;
							for(i=0;i<arrayJornadas.length;i++){
											partidos=arrayJornadas[i].partidos;
											for(j in partidos){
												   partido=partidos[j];
												   fila1 = rowReturn(partido.Equipo1,filas);
												   fila2 = rowReturn(partido.Equipo2,filas);
												   resultados = partido.resultado;
												   res = resultados.split('-');
												   result1 = res[0];
												   result2 = res[1];
												   defineGanador(result1, result2, fila1, fila2);
											}
			
			}
			}
			
			function rowReturn(equipo,filas){ //funcion que devuelve la fila en la que se encuentra un equipo en la tabla
				      
									for(i in filas){
										 var fila=filas[i];
										 var teamName = fila.cells[2].innerHTML;
											if(teamName==equipo){
												    return fila;
												}
										}
				}
