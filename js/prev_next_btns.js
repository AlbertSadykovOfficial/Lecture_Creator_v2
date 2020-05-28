/*
		Фукции обработки клавиш <<Назад и Вперед>> 
			Включают в себя:
			1) Вызов отрисовки Заднего фона 
			2) Вызов основной функции печати (для автоматического вывода текста)
			3) Изменение массива output_info[] - запись в него актуальных данных 
		
		prev() - Переклюение на предыдущую страницу
		next() - Переклюение на следющую 	 страницу

*/

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
				X = template_XY[type_of_page][0];
				Y = template_XY[type_of_page][1];
				X = Number(document.getElementById("X_1").value);
				Y = Number(document.getElementById("Y_1").value);
			}
			else
			{
				X = template_XY[type_of_page][2];
				Y = template_XY[type_of_page][3];
				X = Number(document.getElementById("X_2").value);
				Y = Number(document.getElementById("Y_2").value);
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
		X = template_XY[type_of_page][0];
		Y = template_XY[type_of_page][1];
		X = Number(document.getElementById("X_1").value);
		Y = Number(document.getElementById("Y_1").value);
	}
	else
	{
		X = template_XY[type_of_page][2];
		Y = template_XY[type_of_page][3];
		X = Number(document.getElementById("X_2").value);
		Y = Number(document.getElementById("Y_2").value);
	}

	setTimeout(textIn, 300, X, Y); 
}