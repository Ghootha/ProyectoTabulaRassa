window.onload=function() {
    var table = document.getElementById("mitabla");
    var i, j, row, cell1;
    for (i = 1; i < 13; i++) {
        row = table.insertRow(i);
        for (j = 0; j < 11; j++) {
            if(j==2){ 
                cell1.setAttribute("colspan",8)
                cell1 = row.insertCell(j);
                cell1.innerHTML = "Equipo "+i.toString()+","+j.toString();;
            }else{
                cell1 = row.insertCell(j);
                cell1.innerHTML = i.toString()+","+j.toString();
            }
            
        }
    }
}


