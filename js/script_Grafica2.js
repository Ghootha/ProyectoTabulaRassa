	var JSON_DATA_URL="json/teams.json";
	var table= document.getElementById("data");
		 
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
		 var teamObj = teams[0];
		 var teamObj2 = teams[1];
		 var teamObj3 = teams[2];
		 var teamObj4 = teams[3];
		 var teamObj5 = teams[4];
		 var nombre=teamObj.team;
		 var nombre2=teamObj2.team;
		 var nombre3=teamObj3.team;
		 var nombre4=teamObj4.team;
		 var nombre5=teamObj5.team;
		 var pts=teamObj.Pt;
		 var pts2=teamObj2.Pt;
		 var pts3=teamObj3.Pt;
		 var pts4=teamObj4.Pt;
		 var pts5=teamObj5.Pt;
		 
      // Load the Visualization API and the piechart package.
      google.load('visualization', '1.0', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Equipo', 'PJ', 'PG', 'PE'],
          [nombre,  teamObj.PJ,  teamObj.PG,  teamObj.PE],
          [nombre2, teamObj2.PJ, teamObj2.PG, teamObj2.PE],
          [nombre3, teamObj3.PJ, teamObj3.PG, teamObj3.PE],
          [nombre4, teamObj4.PJ, teamObj4.PG, teamObj3.PE]
        ]);

        var options = {
          title: 'Rendimiento de Equipos', 
		  width:700,
		  height:295,
          hAxis: {title: 'Equipo', titleTextStyle: {color: 'red'}
		 
          }
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div2'));
        chart.draw(data, options);

      }
    