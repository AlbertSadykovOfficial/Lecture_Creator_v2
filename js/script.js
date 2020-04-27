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

function change_mode()
{
	settings_mode = !settings_mode;

	if (settings_mode == 0) 
	{
		document.getElementById("simple_settings").style.height = 200+'px';
		document.getElementById("simple_settings_div").style.height = 200+'px'
		document.getElementById("simple_settings_div").style.opacity = 1;
		document.getElementById("view_back_image").style.height = document.getElementById("view_back_image").dataset.height;

		document.getElementById("extend_settings").style.height = 0+'px';
		document.getElementById("extend_settings").style.opacity = 0;

		document.getElementsByClassName("set_button")[0].style.backgroundColor = "rgb(53,116,232)";
		document.getElementsByClassName("set_button")[0].style.boxShadow = "0 -3px rgb(53,86,232) inset";
		
	}else
	{
		document.getElementById("simple_settings").style.height = 0+'px';
		document.getElementById("simple_settings_div").style.height = 0+'px';
		document.getElementById("simple_settings_div").style.opacity = 0;
		document.getElementById("view_back_image").style.height = 0;

		document.getElementById("extend_settings").style.height = document.getElementById("extend_settings").dataset.height;
		document.getElementById("extend_settings").style.opacity = 1;

		document.getElementsByClassName("set_button")[0].style.backgroundColor = "rgb(64,199,129)";
		document.getElementsByClassName("set_button")[0].style.boxShadow = "0 -3px rgb(53,167,110) inset";
	}	
}
function view_settings()
{
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

let list = String(!(page%2)+1);
let angle = document.getElementById("angle_"+list).value;
let width_of_str = Number(document.getElementById("width_of_str_"+list).value);
let height_of_str = Number(document.getElementById("height_of_str_"+list).value);

let font_size = Number(document.getElementById("font_size_"+list).value);

let X = Number(document.getElementById("X_"+list).value);
let Y = Number(document.getElementById("Y_"+list).value);
if (Math.abs(angle)>30)
{
	angle = (angle/Math.abs(angle))*30;
		document.getElementById("angle_"+list).value = angle;
	alert(' Максимальный угол 30 градусов, мы исправли ваш результат');
}

	ctx.rotate(angle * Math.PI / 180);

	ctx.beginPath();	
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'gray';

		for (var j = 1; j<=20;j++)
		{	
			ctx.moveTo(0, c.height*j/20);
			ctx.lineTo(c.width, c.height*j/20);

			ctx.moveTo(c.width*j/20, 0);
			ctx.lineTo(c.width*j/20, c.height);
		}
			ctx.stroke();
				
	ctx.beginPath();	
 ctx.lineWidth = 2;
 ctx.strokeStyle = 'red';

 ctx.moveTo(X,								Y-font_size);
 ctx.lineTo(X+width_of_str,		Y-font_size);
 ctx.moveTo(X,								Y-font_size);
 ctx.lineTo(X,								Y+height_of_str-font_size);

 ctx.moveTo(X,								Y+height_of_str-font_size);
 ctx.lineTo(X+width_of_str,		Y+height_of_str-font_size);
 ctx.moveTo(X+width_of_str,		Y-font_size);
 ctx.lineTo(X+width_of_str,		Y+height_of_str-font_size);

 ctx.stroke();

 ctx.rotate(-angle * Math.PI / 180);
}
/* ------------------------------------------------------------------------------------- */
function load_background() {
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	var imageObj1 = new Image();

	image_num = String(document.getElementById("background_num").value); 
 	document.getElementById("view_back_image").src = "images/"+image_num+"1.jpg";

	if ((page+1)%2 == 0) 	imageObj1.src = "images/"+image_num+"1.jpg"
	else 									imageObj1.src = "images/"+image_num+"2.jpg"
 	

			imageObj1.onload = function() 
			{

				ctx.drawImage(imageObj1, 0, 0, 0.8*0.78*document.body.clientHeight+8, 0.8*document.body.clientHeight+10);
				alert('Сраница:'+String(page));
			}

}

function write_into_position()
{
	if (isPrev == true) 
	{
			while (page < output_info.length-1 && output_info.length>2)
			{
				output_info = output_info.slice(0, -1);
			}
			isPrev = false;
			isNext = true;
	}
		let X = event.pageX-(0.5*document.body.clientWidth)+60;// event.clientX;	 
		let Y = event.pageY - 50-20;	//event.clientY
	textIn(X,Y);
}

function prev()
{
	if (page>=1)
	{ 
		page--;
		isPrev = true;
		load_background();

// текст выводит бытсрее, чем прогружается фон, для этого "придерживаем" функцию отрисовки текста
		
		if (page >= 1) 
		{
			if ((page+1) % 2 == 0) 
			{

				X = Number(document.getElementById("X_1").value);
				Y = Number(document.getElementById("Y_1").value);
			}
			else
			{
				X = Number(document.getElementById("X_2").value);
				Y = Number(document.getElementById("Y_2").value)				
			}

			setTimeout(textIn, 300, X, Y); 
		}

		while (page < output_info.length-1 && output_info.length>2)
		{
			output_info = output_info.slice(0, -1);
		}
			isNext = true;
	}
}
function next()
{
	page++;
	isNext = true;
	load_background();
	// текст выводит бытсрее, чем прогружается фон, для этого "придерживаем" функцию отрисовки текста
	if ((page+1) % 2 == 0) 
	{
		X = Number(document.getElementById("X_1").value);
		Y = Number(document.getElementById("Y_1").value);
	}
	else
	{
		X = Number(document.getElementById("X_2").value);
		Y = Number(document.getElementById("Y_2").value)		
	}

	setTimeout(textIn, 300, X, Y); 
}

function textIn(X,Y)
{
		var c=document.getElementById("myCanvas");
		var ctx=c.getContext("2d");
		let list = String(!(page%2)+1);
		let width_of_str = document.getElementById("width_of_str_"+list).value;
		let height_of_str = Number(document.getElementById("height_of_str_"+list).value);
		let font_size = Number(document.getElementById("font_size_"+list).value);
		let angle = document.getElementById("angle_"+list).value;
		let str_height = document.getElementById("str_height_"+list).value;
		let n_str = 0;
		let font_num = document.getElementById("font_num").value;
				selected_font[0] = font_array[font_num-1][0];
				selected_font[1] = font_array[font_num-1][1];
				selected_font[2] = font_num-1;
		let font = selected_font[0];

		document.getElementById("lecture_area").style.fontSize = String(Number(font_size))*440/width_of_str+'px';////2
		//document.getElementById("lecture_area").style.width = String(Number(width_of_str)+20)+'px';///1.8
		//document.getElementById("lecture_area").style.height =440 +'px';
		Y = Y - font_size;

		let str_max = Math.floor(height_of_str / str_height);
		let ww2 = document.getElementsByClassName('ww')[0];
				ww2.style.fontSize = font_size+'px';
				ww2.style.fontFamily= font;
		
				ww2.innerHTML = 'nd'; // ц
				$width = $('.ww').width();
				ww2.innerHTML='';
				how_symb = parseInt(width_of_str / ($width/2));


		let output = '';
		let lecture = document.getElementById("lecture_area").value;
		let lecture_base=[];

		let flag;	
		let i=j=0;

if (Math.abs(angle)>30)
{
	angle = (angle/Math.abs(angle))*30;
	document.getElementById("angle_"+list).value = angle;
	alert('Максимальный угол 30 градусов, мы исправли ваш результат');
}
ctx.rotate(angle * Math.PI / 180);

for (i = 0; i < lecture.length; i++) 
{
	flag = true;
	for(j=0; j<_lower.length; j++) 
	{
		if (lecture[i] == _lower[j][0])
		{
			lecture_base[i] =  _lower[j][1];
			flag = false;
			break;
		}
	}
	if(flag){
	for(j=0; j<_upper.length; j++) 
	{
		if (lecture[i] == _upper[j][0])
		{
			lecture_base[i] = _upper[j][1];
			flag = false;
			break;
		}
	}
	}
	if(flag){
	for(j=0; j<_symbols.length-1; j++) 
	{
		if (lecture[i] == _symbols[j][0])
		{
			lecture_base[i] = _symbols[j][1];
			flag = false;
			break;
		}
	}
	}

	if (flag) lecture_base[i] = '';
}

let last_symb = symb_num = 0;
last_symb = output_info[page];
//---------------------------- Выводим на холст --------------------------// 
while(symb_num<lecture_base.length)
	{		
		output = '';
		moveTo = 0;
		count	 = 0;
		new_line = false;
		for (symb_num=last_symb; count<=how_symb && symb_num<lecture_base.length ; symb_num++)
		{	
				if(lecture.charCodeAt(symb_num) == 10)		// Если это Новая строка (КОД ENTER)
				{
					new_line = true;
					break;
				}
			if(changeLang(font,selected_font,lecture_base[symb_num],lecture[symb_num]))
			{
				if(output != ''){
							ww2.innerHTML = output; // 
							$width = $('.ww').width();
							ww2.innerHTML='';
						len = checklength(output,symb_num,$width,width_of_str,count,moveTo);
						if (len>0) 
						{
							break;
						}

				printValue(ctx,output,n_str,str_height,font_size,font,moveTo,X,Y);

				ww2.innerHTML = output; // 
				$width = $('.ww').width();
				ww2.innerHTML='';
				moveTo = moveTo + $width + 2;
				}

				output = '';
				font = rotate(font,selected_font);
				ww2.style.fontFamily = font ;
			}

			output += lecture_base[symb_num];
			count++;
		}
	//  Проверка на перезаполнение строки	----------------	
		ww2.innerHTML = output;  
		$width = $('.ww').width();

		ww2.innerHTML='';
		len = checklength(output,symb_num,$width,width_of_str,count,moveTo);
			if (len>0) 
			{
				for (i=0; i <= symb_num - len ; i++)
				{
						output = output.slice(0, -1); // Удалить последний элемент массива
				}	
				count = count - (symb_num - len);
				symb_num = len - 2;
				new_line = true;
			}
	// --------------	
		printValue(ctx,output,n_str,str_height,font_size,font,moveTo,X,Y);
 
	
		if (new_line == true)
			last_symb = symb_num + 1;
		else 
			last_symb = last_symb + count;//= how_symb*n_str + 1;

		n_str++;
		if (n_str >= str_max && page != 0) 
		{
			if (isNext)
			{
				output_info.push(last_symb);
			}
			isNext = false;
			break;
		}
	 }
	 	ctx.rotate(-angle * Math.PI / 180);
}

//----------------------------------------------------------------------------



function printValue(obj,output,n_str,str_height,fontSize,font,moveX,X,Y)
{
	let color;
	if (document.getElementById("font_color").checked) 	color = "rgb(47, 48, 113)";//rgb(29, 32, 185) rgb(23, 26, 155)
	else 							color = "black";
		obj.textBaseline = "top";
		obj.font = ("bold " + fontSize.toString() +"px "+ font);
		obj.fillStyle = color;
		obj.fillText(output, X+moveX, Y+n_str*str_height); 

}

function checklength(output,symb_num,width,width_of_str,count,moveTo)
{
	width = moveTo + width+1;
	x = (symb_num - Math.ceil(count*(width-width_of_str)/width))-1;
	//console.log(symb_num, x,Math.ceil(count*(width-width_of_str)/width)+1,output);
	if (width>width_of_str) 
	{
		return x; // Вернет максимально доступный символ
	}
	else return 0;
}

function rotate(font,selected_font)
{
	if (font == selected_font[0]) return selected_font[1];
	if (font == selected_font[1]) return selected_font[0];
}

function changeLang(font,selected_font,letter,x)
{
	if(font == 'ver_3' || font =='ver_4'){
	// Обработка Больших и малых бю жэ хъ
		if (letter == '[' || letter == ',' || letter == '\'' || letter == ';' || letter == '\"' || letter == '.') 
		{
			if (	 x == 'х' ||  		x == 'б' ||  		x	== 'ю' 		||  		x	== 'ж' 	|| 			x	== 'э' )
			{
				if (font == selected_font[1]) 	return true;
				else 														return false;
			}
			else return true;
		}
	}

	if (font == selected_font[0])
	{
		for (i=0;i<mistakes_ver_1[selected_font[2]].length; i++)
			if (letter == mistakes_ver_1[selected_font[2]][i]) return true;
	}
	if (font == selected_font[1])
	{
		for (i=0;i<mistakes_ver_2[selected_font[2]].length; i++)
			if (letter == mistakes_ver_2[selected_font[2]][i]) return true;
	}
}

		function getImage(canvas){
		    var imageData = canvas.toDataURL();
		    var image = new Image();
		    image.src = imageData;
		    return image;
		}
		 
		function saveImage(image) {
		    var link = document.createElement("a");
		 
		    link.setAttribute("href", image.src);
		    link.setAttribute("download", "lecture_page"+String(page)+".png");
		    link.click();
		}
		 
		function saveCanvasAsImageFile(){
		    var image = getImage(document.getElementById("myCanvas"));
		    saveImage(image);
		}	


/*
function changeLang(lang,letter)
{
	if (lang == 'ver_1') { s = 0; f = 8;		}
	if (lang == 'ver_2') { s = _lower.length - 6; f = _lower.length;}

	for ( i = s ; i < f ; i++) 
	{
		if (letter ==_lower[i][1]) return true;
	}

	if (lang == 'ver_1') { s = 0; f = 6;		}
	if (lang == 'ver_2') { s = _upper.length - 6; f = _upper.length;}

	for ( i = s ; i < f ; i++) 
	{
		if (letter ==_upper[i][1]) return true;
	}
}
*/
/*
			letter = whichLetter(lecture[symb_num]);
			if (letter == ' '){ letter = '`';}

			if (letter != '') 	output += letter;
			else 								changeLanguage = true;		

			if (changeLanguage)			
			{
				printValue(ctx,output,n_str,str_height,font_size,'ver_1',moveTo,X,Y);

				// С какого места начинать выводить
				ww2.innerHTML = output; // 
				$width = $('.ww').width();
				ww2.innerHTML='';
				moveTo = moveTo + $width + 2;

				// Ширина заменяемого символа 
				output = whichLetter2(lecture[symb_num]);
				ww2.style.fontFamily= 'ver_2';
				ww2.innerHTML = output; // ц
				$width = $('.ww').width();
				ww2.innerHTML='';
				printValue(ctx,output,n_str,str_height,font_size,"ver_2",moveTo,X,Y);
				
				ww2.style.fontFamily= 'ver_1';
				moveTo = moveTo + $width;
				output='';
				
			}
*/			//changeLanguage = false;

/*
function whichLetter2(letter)
{
	flag = true;
	if (letter == ' ') return ' ';
	for(j=0; j<=35; j++) {
				if (letter == _lower[j][0])
				{ 
					return _lower[j][1];
					flag = false;	/// Если в конструкцию не заходили,то проверка будет идти по Заглавным
					break;
				}
			}
			if(flag)
			{
				for(j=0; j<=32; j++){
					if (letter == _upper[j][0]) 
					{	
						return _upper[j][1];
						flag = false;
						break;
				  }
				}
			}
			if (flag) 
			{	
				if(letter == "+") return letter;
				 //t = t +"<span class='ver2'>+</span>";
			}		
			return '';
}
function whichLetter(letter)
{
	flag = true;
	if (letter == ' ') return ' ';

	for(j=0; j<=35; j++) {
				if (letter == _lower[j][0])
				{ 
					if(j>7) return _lower[j][1];
					else return '';		//////////////
					flag = false;	/// Если в конструкцию не заходили,то проверка будет идти по Заглавным
					break;
				}
			}
			if(flag)
			{
				for(j=0; j<=32; j++){
					if (letter == _upper[j][0]) 
					{	
						if(j>2) return _upper[j][1];
						else 		return ''; ////////////
						flag = false;
						break;
				  }
				}
			}
			if (flag) 
			{	
				if(letter == "+") return letter;
				 //t = t +"<span class='ver2'>+</span>";
			}		
			return '';
}

function whichLetter(letter)
{
	flag = true;
	if (letter == ' ') return ' ';

			for(j=0; j<=35; j++) {
				if (letter == _lower[j][0])
				{ 
					if(j>7) return 'ver_1';
					
					return 'ver_2';
				}
			}
			if(flag)
			{
				for(j=0; j<=32; j++){
					if (letter == _upper[j][0]) 
					{	
						if(j>2) return 'ver_1'
				
						return 'ver_2';
				  }
				}
			}
}

/*			
		let flag = true;
			for(j=0; j<=34; j++) {
				if (lecture[symb_num] == _lower[j][0])
				{ 
					if(j>1) output += _lower[j][1];
					else changeLanguage = true;		//////////////
					flag = false;	/// Если в конструкцию не заходили,то проверка будет идти по Заглавным
					break;
				}
			}
			if(flag)
			{
				for(j=0; j<=32; j++){
					if (lecture[symb_num] == _upper[j][0]) 
					{	
						if(j>3) output += _upper[j][1];
						else changeLanguage = true; ////////////
						flag = false;
						break;
				  }
				}
			}
			if (flag) 
			{	
				if(lecture[symb_num] == "+") 
					changeLanguage = true; //t = t +"<span class='ver2'>+</span>";
			}		
*/


/*	while((lecture[symb_num] != ' ') && (symb_num<=lecture.length))
		{
			symb_num++;
		}


			let flag = true;
			let num = 0;
			while (flag)
			{
				if ($width<500) 
				{
					output += lecture[num];
					ww2.innerHTML = output;
					$width = $('.ww').width();
					num++;
				}else 	
				flag = false;
			}
*/	
 //  imageObj2.onload = function() {
   //   ctx.drawImage(imageObj2, 15, 85, 300, 300);
    //  var img = c.toDataURL("image/png");
   //   document.write('<img src="' + img + '" width="328" height="526"/>');
  // }
