var a_last_day_month = [31,28,31,30,31,30,31,31,30,31,30,31];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var holidays = ["0-1", "11-25","6-28"];

function renderCalendar(){
  var v_start_date = document.getElementById("start_date").value;
  var v_n_days = document.getElementById("n_days").value;
  var v_line_start = document.getElementById("line_start");
  var v_items = "";  
  var d = new Date(v_start_date.split("-")[0],v_start_date.split("-")[1]-1,v_start_date.split("-")[2]);
  var r_days = a_last_day_month[d.getMonth()] - d.getDate();
  var i=d.getMonth()+1;
  do{
	 v_items += "<p>";
	 if(v_n_days>r_days){
		v_items += printAMonth(d,r_days + 1 );
		v_n_days -= r_days + 1;
	 } else {
		v_items += printAMonth(d,v_n_days);
		v_n_days -= v_n_days;
	 }
	 var year = d.getFullYear();
	 if(i>11){
	   i = 0;
	   year = d.getFullYear()+1;
	 }
	 d = new Date(year,i,1);
	 var r_days = a_last_day_month[i];
	 i++;
	 v_items += "</p>";
  }
  while(v_n_days>0);

  //console.log("v_items:" + v_items);
  v_line_start.innerHTML = v_items;
}


function printAMonth(startDate,nDays){
  var d = startDate;
  var first_d = new Date(d.getFullYear(), d.getMonth(), 1);
  var start_counting = 0;
  var count = 1;
  var s_table = "";
  
  var i=0;
  var j=0;
  var f_date = d.getDate();
 
  
  s_table = "<table class='table_class'><tr class='header2_class'><td>S</td><td>M</td><td>T</td><td>W</td><td>T</td><td>F</td><td>S</td></tr>";
  s_table += "<tr><td colspan=7 class='header_class'>" + months[d.getMonth()] + " " + d.getFullYear() + "</td></tr>"
  
  for(i=0;i<6;i++){
	s_2table = s_table + "<tr>";
	for(j=0;j<7;j++){
	  var day = first_d.getDay();
	  if( i== 0 && j == day){
		start_counting = 1;
	  }

	  //start_counting
	  if(start_counting === 1){
		//start_printing
		if(d.getDate() <= count ){
			var style_cell = "cell_valid_class";
			if(j==0 || j==6){
				style_cell = "cell_valid2_class";
			}
			if(isHoliday(d.getMonth(),count)){
				style_cell = "cell_valid3_class";
			}
			s_table += "<td class='"+style_cell+"'>" ;
			s_table += count;
			s_table += "</td>";
		} else {
			 s_table += "<td class='cell_invalid_class'></td>" ;
		}
		count++;
	  } else {
		s_table += "<td class='cell_invalid_class'></td>" ;
	  }
	  //stop counting
	  var special_day = d.getFullYear()%4==0?1:0;
	  if((count == a_last_day_month[d.getMonth()] + 1 + special_day) || (count - d.getDate() == nDays)){
		start_counting = 0;
		//break;
	  }
	}
	s_table = s_table + "</tr>"
  }
  s_table = s_table + "</table>"
  //v_p.innerHTML = s_table;
  return s_table;
}

function isHoliday(v_month,v_day){
	var i = 0;
	for(;i<holidays.length;i++){
		var h = holidays[i].split("-");
		if(h[0]==v_month && h[1]==v_day){
			return true;
		}
	}
	return false;
}
