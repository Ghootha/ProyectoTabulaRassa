//
var csh = {
   nombre:"CSH",
   fundacion: 1921
};
var ds = {
   nombre:"Darrissa",
   fundacion: 1935
};
var lda = {
   nombre:"Las gatas",
   fundacion: 1919
};


var campeonato1 = {
   _id:1,
   agno:2014,
   dedicado:"Pilo Obando",
   equipos:[csh,lda,ds],
   jornadas:[],
   periodo:{desde:"enero", hasta:"junio"}
}

var campeonato2 = {
   _id:2,
   agno:2012,
   dedicado:"David Patey",
   equipos:[csh,lda,ds],
   jornadas:[],
   periodo:{desde:"agosto", hasta:"diciembre"}
};

var campeonato3 = {
   _id:3,
   agno:2015,
   dedicado:"Luis Gui",
   equipos:[csh,lda],
   jornadas:[]
};


var camps = [campeonato1,campeonato2,campeonato3];
