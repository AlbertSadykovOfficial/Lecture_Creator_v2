/*
		Функции изменения и экранизации настроек 
		
		view_settings()         - Вывести сетку настроек 
		change_settings_mode()  - Изменить тип настроек (Легкий, Расширенный) 
*/

function change_settings_mode()
{
	settings_mode = !settings_mode;

	if (settings_mode == 0) 
	{
		document.getElementById("simple_settings_div").style.display = 'block';

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

		document.getElementById("simple_settings_div").style.display = 'none';

		document.getElementById("extend_settings").style.height = document.getElementById("extend_settings").dataset.height;
		document.getElementById("extend_settings").style.opacity = 1;

		document.getElementsByClassName("set_button")[0].style.backgroundColor = "rgb(64,199,129)";
		document.getElementsByClassName("set_button")[0].style.boxShadow = "0 -3px rgb(53,167,110) inset";
	}	
}

function view_settings()
{
		if (volk_joke_is_print_now == true) 
		{
				alert(volk_array[Math.ceil(6*Math.random())-1]);
		}else{
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
}