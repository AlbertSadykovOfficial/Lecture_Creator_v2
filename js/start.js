/*
		Функции предварительной настройки содержания страницы,а именно:
			1) Осуществляет присвоение параметров canvas (Ширина, Высота)
			2) Подгрузка Шрифтов для их последующего корректного отображения с 1го раза 
			3) Изменяет Режим настроек на упрощенный
			4) Устанавливает значения в поля ввода по-умолчанию для 1 страницы
			5) Загружает мнимый текст простейших подсказок в элемент textarea
			6) Меняет Шрифт в font_num для нагялдного примера 

			pre_load_fonts()   - (2)
			load_description() - (6)
*/

	pre_load_fonts();
	change_settings_mode();
	set_arguments();
	load_description();

			document.getElementById("myCanvas").height = 0.8*document.body.clientHeight+10; 
			document.getElementById("myCanvas").width = 0.8*0.78*document.body.clientHeight+8;

			txt = "\n <<< ВСЕ ПОДСКАЗКИ ТАМ \n\n1) Вставьте сюда текст (Этот текст не считается, вставьте свой) \n2) Нажмите ВПЕРЕД >>, чтобы написать страницу \n3)Сохраниет страницу (красная кнопка) (Далее Повторяйте пункт (2))\n\n На странице (0) - визуализация и кнопок настроек \n\n Если не сохраняется изображение при нажатии на красную кнопку:\n 1)Наведите на лекцию \n 2)Нажмите на правую кнопку мыши \n 3)Выберите \"Сохранить изображение как\" и переименуйте его";			
			document.querySelector("textarea").placeholder = txt;

	
	/* Функция подгрузки шрифтов
		При печати в первый раз шрифт не успевают прогрузиться
		Функция выполняет роль 1 раза и подгружает шрифты
	*/
	function pre_load_fonts()
	{
		let txt = "abcdefghijklmnopqrstuvwxyz";
		for(i=0; i<5; i++)
		{

			document.getElementById("myCanvas").getContext("2d").font = ("bold " + 20 +"px "+ font_array[i][0]);
			document.getElementById("myCanvas").getContext("2d").fillText(txt, 0, 0);

			document.getElementById("myCanvas").getContext("2d").font = ("bold " + 20 +"px "+ font_array[i][1]);
			document.getElementById("myCanvas").getContext("2d").fillText(txt, 0, 0);

		}
	}
	function load_description()
	{
		if (document.getElementById('font_num').value == 2) 
			document.getElementById('font_num').style.fontFamily = 'ver_' + document.getElementById('font_num').value + '_2';
		else if (document.getElementById('font_num').value<4)
			document.getElementById('font_num').style.fontFamily = 'ver_' + document.getElementById('font_num').value + '_1';
		else 
			document.getElementById('font_num').style.fontFamily = 'ver_' + document.getElementById('font_num').value + '_0';
	}

