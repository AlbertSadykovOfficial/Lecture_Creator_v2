/*
    Функции измения значений параметров печати и заднего фона
    
    changeBack()    - Измеить фон
    set_arguments() - Установить шаблонные значения соответствующие странице
    uploadValues()  - Переопределение шрифта и отступа при изменение значений в Блоке (simple settings)

*/

function changeBack()
{
  type_of_page =  document.getElementById("background_num").value - 1; 
  set_arguments();
}  

function set_arguments(){
  document.getElementById("X_1").value = template_XY[type_of_page][0];
  document.getElementById("Y_1").value = template_XY[type_of_page][1];
  document.getElementById("X_2").value = template_XY[type_of_page][2];
  document.getElementById("Y_2").value = template_XY[type_of_page][3];

  document.getElementById("angle_1").value = page_set[type_of_page][0];
  document.getElementById("angle_2").value = page_set[type_of_page][1];

  document.getElementById("str_height_1").value = page_set[type_of_page][2];
  document.getElementById("str_height_2").value = page_set[type_of_page][4]; 

  document.getElementById("font_size_1").value = page_set[type_of_page][3];
  document.getElementById("font_size_2").value = page_set[type_of_page][5];   

  document.getElementById("width_of_str_1").value = page_set[type_of_page][6];
  document.getElementById("height_of_str_1").value = page_set[type_of_page][7];
  document.getElementById("width_of_str_2").value = page_set[type_of_page][8];
  document.getElementById("height_of_str_2").value = page_set[type_of_page][9];
  page = 0;
  load_background(); 
}         

function uploadValues()
{
	let list = String(!(page%2)+1);
	document.getElementById("str_height_"+list).value = document.getElementById("str_height_simple").value;
	document.getElementById("font_size_"+list).value = document.getElementById("font_size_simple").value;
}


/* ------------------------------------------------------------------------------------- */
