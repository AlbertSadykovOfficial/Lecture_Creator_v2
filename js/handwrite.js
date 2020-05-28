/*
		ФАЙЛ ОСНОВНОЙ ФУНКЦИИ РАБОТЫ ПРОГРАММЫ
		
		write_into_position() - Вывести текст в определенное место листа
		textIn(X,Y)						- Осуществляет все операции связанные с выводом текста (main)

		Функция textIn(X,Y) 
			Выводит текст в положение X,Y, соблюая все указанные правила в блоке (extend_settings).
		
		Логика работы: 
			1) Считываем содердимое textarea 
			2) Запоминаем все настройки из (extend_settings)
			3) Определяем максимальное количество строк (str_max), помещающихся на страницу
			4) Определяем примерную ширину строки в символах (для оптимизации - сокращения рассчетов)
				 {
					 1.Устанавливаем в div класса (ww) - Наш шрифт и его размер
					 2.Выводим туда средний по длине символ (я взял 'с' для 3 шрифта и 'и' для остальных)
					 3.Узнаем ширину этого символа ($width)
					 4.Путем деления известной ширины контейнера на ширину символа получаем примерное кол-во символов (how_symb)
				 }
			5) Поворачиваем canvas на угол (angle) - так мы реализуем наклон текста, но не допускаем сишком большой наклон (зачем?)
			6) Зная, что в шрифтах есть watermark'и (читай constants.js) и отних нельзя избавиться
				 {
					 Так, символы "^" и "}", и "§" в ОБОИХ шрифтах ver_1_1 и ver_1_2 - watermark!!! - Это плохо - не повезло
					 Приходится помимо Массива ошибок вводить лополнительную оюработку обработку
					 	1) Для символов "^" и "}" были найдены похожие, соответсвенно : "'" и ")" 
					 		(да, в шрифтах нет фигурной скобки - все скобки похожи на - ")", но зато вот как искусно проблему обошли :)  )
					 	2) С символом "§" сложнее - подобных ему нет, поэтому вводим еще одну доп обработку, позволяющую интегрировать 
					 			ТРЕТИЙ шрифт, а именно ver_2_1. Так, натыкаясь на данный символ, мы не выводим его выбранным шрифтом ver_1,
					 			а устанавливаем шрифт ver_2_1 и обходим данную проблему.
						
						1 Пункт ищи цикл в строке 102 или пониже  (до цикла 	while(symb_num<lecture_base.length) )
						2 Пункт ищи в цикле 	while(symb_num<lecture_base.length) --> for --> if (selected_font[2] == 0 && lecture_base[symb_num] == '§') 
				 }
			7) Выводим содержимое на холст --> while(symb_num<lecture_base.length){ here }
				 {
					 Суть: выводим страницу построчно: цикл "for" выводит одну строку, затем еще...,
					 			 до тех пор (while) пока str <= str_max 
						
						1. Сначала идут проверки на спец символы, а именно ENTER, SPACE, "§".
								Если мы наткнулись на ENTER - зацершаем цикл for и даем команду новой строки
								Если SPACE
								{
									Пробел - интересное решение, он задает отсутп между строк. Но отступ этот всегда 
									одинаковый по длине - это минус к качеству БЕСПАЛЕВНОСТИ®, значит нужно делать его
									неодинковым каждый раз. Для этого, когда мы натыкаемся на пробел, мы выводим содержание
									стека output, узнаем его длину, генерируем Ширину пробела, узнаем ширину пробела, прибавляем 
									его к ширине output. Дальше мы можем собирать следующее слово опять до пробела...
								}
								Если "§", то это было рассмотрено ранее в пункте (6)
						2. Следующая проверка условная, она выполнится всегда(для LeCreat v2.0 от 28.05.2020) if(selected_font[2] < 5),
								а там что будет то будет, пока не знаю
							 {
								  В этой проверке мы проваливаемся в новое условие  lecture_base[symb_num] == ' '
								  {
										Зачем - затем Йоупта: Суть всей этой конструкции, чтобы проверить нужно ли переносить слово,
										поэтому когда мы натыкаемся на пробел, мы анализируем следующее за ним слово, записывая каждую букву
										в стек output_1 до ледующего пробела (по сути слово и получаем)
										Если содержимое строки(на данный момент) + это слово не вылезает за границы width_of_str, 
										--> то нам на него пофиг и мы идем выходим из цикла, а если нет, то:
												{
													Определяем крайний символ, который может поместитья на строке, не вылезая за ее пределы (len)
													отправляем все слово из стека output_1 и номер крайнего символа в ф-цию hyphenation() 
													Ф-ция узнает какой последний слог в слове помещается на строку и вернет номер последнего симола этого слога
													(Более пдробно про функцию hyphenation() в hyphenation.js) (Гарант качества БЕСПАЛЕВНОСТИ®)	
													
													После получения последнего доступного для печати символа, мы утсанавливаем значение 
													check = false, чтобы не проверять длину строки по завершении всего цикла 
													(ведь мы и так уже опроеделились сколько символов поместиться в строке)

													Так же мы устанавливаем значение print_hyp_symb, чтобы потом приписать знак переноса
												}

								  } 

								}
						3. Проверка на смену шрифта changeFont
							 {
								Как упомяналось ранее: шрифты соодержат watermark и нам необходимо отлавливать символы, которые не могут
								быть напечатаны используемым в данный момент шрифтом. Для проверки символа на поддержку его 
								данным шрифтом служит функция changeFont, которая проверяет символ на watermark
								Если символ является watermark,то ф-ция вернет значение true и мы напеатем содержание стека output,
								очистим его, сменим этот шрифт на парный ему - который способен напечатать данный символ. и запишим его 
								как первый элемент output.
							 }
						4. Проверка на перезаполнение строки 
							 {
								(Вроде уже не нужна, ведь мы и так знаем символ благодаря ф-ции переноса... хз, пока оставлю)
							 }
						5. Печать знака переноса
							 {
									Приписываем к стеку output знак переноса если требуется
							 }
						6. Выводим содержимое стека output на холст (printValue())
						7. Обновляем значения
						8. Если закончилась посленяя строка добовляем в массив output_info[] номер символа с которого начнется след. странца
						9. Разворачивам холст в положение 0
				 }

		P.S 
		О знании основ и оптимизации: 
		 С самого начала создания программы для определения ширины контейнера я использовал стороннюю библиотеку
		 jQuery, что меня не устраивало, ведь использовал я лишь 1 функцию из всего набора.
		 
		 Делал я это потому что не знал, что у элемента есть св-во offsetWidth, позволяющее узнать ширину.
		 Первые ссылки в интернте тоже не выдавали мне это св-во.

		 Спустя около 3 Недель чистой разработки, когда проект выходит из беты, я решил выдрать, используемую
		 мною функцию jQuery из самого jQuery. Оказалось, что ф-ция использует упомянутое мною ранее свойство
		 элемента. Fuck. Ладно хоть нашел.
		 Библиотека jQuery v1 Весит 94кБ в самом сжатом виде. Все мои файлы js весят 53кБ, т.е я подгружаю
		 практически ненужный мне файл и трачу на это 65% ресурсов данных. - eblan.ya 

		 Понятно, что в рамках сайта этого ничего не весит, одно только фото третей правой страницы весит 5 Мб,
		 но все же. Кстати, поду,наверное, сожму фотки, слишком большие, в canvas все равно около 900х700, а 
		 у меня шаблоны на 4000х3600

*/

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

				if(selected_font[2] == 3) ww2.innerHTML = 'с'; // с
				else 											ww2.innerHTML = 'и'; // ц

				width = ww2.offsetWidth;// $width = $('.ww').width();
				ww2.innerHTML='';
				how_symb = parseInt(width_of_str / (width));//+10; //$width

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
				if(lecture[i] == ' ') 
				{
					lecture_base[i] = ' '; //"`"
				}else if(selected_font[2] == 0 && (lecture[i] == '^' || lecture[i] == '}' ))
				{
					if(lecture[i] == '^') lecture_base[i] = "'";
					else if (lecture[i] == '}') lecture_base[i] = ')';
				}else{
					lecture_base[i] = lecture[i];
				}

		}

	let last_symb = symb_num = 0;
	last_symb = output_info[page];

	let left_num;
	let right_num;
	let output_1;
	let moveTo2;
	let hyphenation_symbol;
	let check = true;
	let upper;
//---------------------------- Выводим содержимое на холст --------------------------// 
	while(symb_num<lecture_base.length)
	{		
		output = '';
		moveTo = Math.ceil(10*Math.random()); // отступ от 1 строки рандомный от 0 до 10 пикселей
		count	 = 0;
		new_line = false;

///-------------------
		print_hyp_symb = false;
		check = true;
		hyphenation_symbol = lecture_base.length; 
///	---------------------  || (count <=  && selected_font[2] < 2) 
		for (symb_num=last_symb; (count <= how_symb) && (symb_num <= hyphenation_symbol && symb_num<lecture_base.length) ; symb_num++)
		{	

/*-------------------- Новая строка -------------------------------------------------------------------
		Если в строке натыкаемся на код ENTER - Производим перенос на новую строку		

*/
					if(lecture.charCodeAt(symb_num) == 10)		// Если это Новая строка (КОД ASCII ENTER)
					{
						new_line = true;
						break;
					}
///------------------- Рандрмайзер пробелов ---------------------------------------------------------------
					/*
								При печати текста не используятся заранее готовые пробелы шрифта.
								Пробелы шрифта имеют фиксированную ширину и текст меньш похож на рукописный.
								Используя данную функцию, мы задаем разный отступ между словами, что делает
							текст более правдоподобным. 
							Получаем значени от (X+1 до X+a)
							, где X - константа длины, задающая минимальную ширину - 1
										a - коэффициент максимального отклонения от мин ширины.

								X + Math.ceil(a*Math.random())	

							Принцип работы:
							1) Встречаем символ пробела
							2) Вводим все, что было до него в стеке output (+ узнаем длину)
							3) Генерируем отступ и имитируем его отступом moveTo 
					*/				
					if(lecture.charCodeAt(symb_num) == 32)		// Если это пробел (КОД ASCII SPACE)
					{
						if (output != '') 
						{
								ww2.style.fontSize = font_size+'px';
								ww2.style.fontFamily = font;
								ww2.innerHTML = output;
								width = ww2.offsetWidth;// $width = $('.ww').width();
								ww2.innerHTML='';

								printValue(ctx,output,n_str,str_height,font_size,font,moveTo,X,Y);
								output = '';
							moveTo = moveTo + width + (3 + Math.ceil(5*Math.random())); // $width
						}else{
							moveTo = moveTo + (3 + Math.ceil(3*Math.random()));
						}
					}
///------------------- Рандрмайзер пробелов end--------------------------------------------//

/* ---------------- Ошибка недостоюющего "§" --------------------------------------------

			Специиальная обработка недостоющего знака "§" в шрифте 1.
			(Применение 2го шрифта) 
	*/				
					if (selected_font[2] == 0 && lecture_base[symb_num] == '§') 
					{
							if(output != ''){
								ww2.style.fontSize = font_size+'px';
								ww2.innerHTML = output;
								width = ww2.offsetWidth;// $width = $('.ww').width();
								ww2.innerHTML='';

							 	printValue(ctx,output,n_str,str_height,font_size,font,moveTo,X,Y);
							 	moveTo = moveTo + width + 10; // $width
							 	output = '';
							 }

						printValue(ctx,'§',n_str,str_height,font_size,'ver_2_1',moveTo,X,Y);

							ww2.style.fontSize = font_size+'px';
							ww2.style.fontFamily= 'ver_2_1';
							ww2.innerHTML = '§';
							width = ww2.offsetWidth;// $width = $('.ww').width();
							ww2.innerHTML='';
							ww2.style.fontFamily= font;

							moveTo = moveTo + width; // $width
							if(symb_num + 1 < lecture_base.length) symb_num++;
					}
///-------------------- Ошибка недостоюющего "§" end	----------------------------------///

///------------------- Перенос слов для шрифтов № (1 и 2) + 3 4 5 -----------------------------//
					if(selected_font[2] < 5)
					{

							if ((lecture_base[symb_num] == ' ') && (symb_num + 1 < lecture_base.length))
							{
								left_num = symb_num + 1;
								
								right_num = left_num;
								while(right_num < lecture_base.length)
								{
									if (lecture_base[right_num] == ' ' || lecture_base[right_num] == ',' || lecture_base[right_num] == '.' || lecture_base[right_num] == '!' || lecture_base[right_num] == '?' || lecture_base[right_num] == ';'||lecture_base[right_num] == ':' ) // Почему-то ругается на запятую в конце 
									{
											right_num--;
											ww2.style.fontSize = font_size+'px';
											ww2.style.fontFamily = font;
													ww2.innerHTML = output; 
													width = ww2.offsetWidth;// $width = $('.ww').width();
													moveTo2 = moveTo + width; // $width  +8 ~компенсирует пропущенный пробел
													
													ww2.innerHTML = output_1; 
													width = ww2.offsetWidth;// $width = $('.ww').width();
													ww2.innerHTML='';

										if (width_of_str - moveTo2 - width < 0) // $width
										{
											len = Math.floor( ((width_of_str - moveTo2)/width)*(right_num-left_num + 1)-1);
											 
											 // Если ASCII код символа совпадает с русской буквой - передаем (0) - rus язык, иначе (1)-eng 1025-Ё 1105-ё
												
												if ((1040 <= lecture.charCodeAt(right_num) && lecture.charCodeAt(right_num) <= 1103) || lecture.charCodeAt(right_num) == 1105 || lecture.charCodeAt(right_num) == 1025) 
													 hyphenation_symbol = left_num + hyphenation(output_1,len,0);
												else 
													 hyphenation_symbol = left_num + hyphenation(output_1,len,1);

												print_hyp_symb = true;

												if (hyphenation_symbol == left_num){
													hyphenation_symbol--;
													print_hyp_symb = false;
												}else if (hyphenation_symbol == right_num){
													hyphenation_symbol++;
													print_hyp_symb = false;
												}
										//console.log(left_num,right_num,hyphenation(output_1,len,0),hyphenation_symbol,output_1,len); // -слово для передачи
											 
										check = false;
										}
											output_1='';
											break;
									}
									output_1 += lecture_base[right_num];
									right_num++;
								}
								// 
								//  Если не будет пробела в конце последнего слова и оно будет длинным, переноса не будет - Доработать
								//
							}	

					}		//  if FONT
	///------------------- Перенос end -------------------------------------------------------------///
	
	
	//-------------------- Проверка на неободимость смены шрифта	----------------------------------///	
					if(changeFont(font,selected_font,lecture_base[symb_num])) /// changeLang
					{
						if(output != '')
						{
									ww2.style.fontSize = font_size+'px';
									ww2.innerHTML = output;
									width = ww2.offsetWidth;// $width = $('.ww').width();
									ww2.innerHTML='';
								len = checklength(output,symb_num,width,width_of_str,count,moveTo); // $width
								if (len>0) 
								{
									break;
								}

							printValue(ctx,output,n_str,str_height,font_size,font,moveTo,X,Y);

							moveTo = moveTo + width + 2; // $width
						}

						output = '';
						font = rotate(font,selected_font);
						ww2.style.fontFamily = font;
					}

				output += lecture_base[symb_num];
				count++;
		} // for (symb_num=last_num...

//-------------------- Проверка на неободимость смены шрифта	end----------------------------------///
//-------------------- Проверка на перезаполнение сроки ------------------------------------------///			
/*	
		if (check == true){
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
		}
*/
//-------------------- Проверка на перезаполнение сроки end ------------------------------------------///		

//-------------------- Печать знака переноса ---------------------------------------------------------///
/*
		Ставим знак переноса (-), для шрифта 2 - это "²" - т.к знак(-) - неработает в ver_2_1
*/		
		if (print_hyp_symb == true)
		{
			if(selected_font[2] == 0 || selected_font[2] > 1)
			output += "-";
			else if(selected_font[2] == 1)
			output += "²"; 
		} 

//-------------------- Печать знака переноса  end -------------------------------------------------///

//-------------------- Вывод содежимого output на холст ------------------------------------------///

		printValue(ctx,output,n_str,str_height,font_size,font,moveTo,X,Y);

 
// ---- Обновляем  добавляем значения для следующих итераций/страниц ---------------------------------///
		if (new_line == true)
			last_symb = symb_num + 1;
		else 
			last_symb = last_symb + count;

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
	} // while end
//-------------------- Возвращаем повернутый для вывод текста canvas в 0; ------------------------------------------///
	 	ctx.rotate(-angle * Math.PI / 180);  
} // function end

//----------------------------------------------------------------------------



function printValue(obj,output,n_str,str_height,fontSize,font,moveX,X,Y)
{
	if (document.getElementById("font_color").checked) color =  "rgb(16,44,84)"; //"rgb(47, 48, 113)";//rgb(29, 32, 185) rgb(23, 26, 155)
	else 																								color = "rbg(252,18,11)";

		obj.textBaseline = "top";
		obj.font = ("bold " + fontSize.toString() +"px "+ font);
		obj.fillStyle = color;

		if(font=="ver_3_2")	obj.fillText(output, X+moveX, Y+5+n_str*str_height); // шрифт 3_2 уходит вверх на +5 пикселей, мы компенсируем это
		else 								obj.fillText(output, X+moveX, Y+n_str*str_height); 

}

function checklength(output,symb_num,width,width_of_str,count,moveTo)
{
	 width = moveTo + width+1; 
	
	if (width>width_of_str) 
	{
		//x = Math.floor( ((width_of_str - moveTo)/width)*count); // для переносов.
		x = (symb_num - Math.ceil(count*(width-width_of_str)/width))-1;
		return x; // Вернет максимально доступный символ
	}
	else return 0;
}

function rotate(font,selected_font)
{
	if (font == selected_font[0]) return selected_font[1];
	if (font == selected_font[1]) return selected_font[0];
}

function changeFont(font,selected_font,letter)  /// changeLang
{
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


						/*				if ((160 <= lecture.charCodeAt(right_num) && lecture.charCodeAt(right_num) <= 223) || lecture.charCodeAt(right_num) == 168 || lecture.charCodeAt(right_num) == 184) 
													hyphenation_symbol = count + 1 + hyphenation(output_1,len,0);
											else 
													hyphenation_symbol = count + 1 + hyphenation(output_1,len,1);

											if (hyphenation_symbol == (count + 1)) 
											{
												hyphenation_symbol = count;
												upper = left_num + hyphenation(output_1,len,0)+1;
												no_hyp_symb = true;
											}else if (hyphenation_symbol - count - 1 + 1 == output_1.length - 1) 
											{ 
												hyphenation_symbol++; 
												upper = left_num + hyphenation(output_1,len,0) + 2;
												no_hyp_symb = true;
											} 
							*/