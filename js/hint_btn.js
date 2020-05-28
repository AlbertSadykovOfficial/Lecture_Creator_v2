/*
		Функция Подсказки

		Предназначена для разворачивания и сворачивания подсказки при нажатии на нее
		 
*/

let hint_btn_value = 0;
function show_hints()
{
	hint = document.getElementsByClassName("hint_btn")[0];
	if (hint_btn_value == 0) 
	{
		hint.style.backgroundColor = "white";
		hint.style.backgroundImage = "none";
		hint.style.width = 330  + "px";
		hint.style.height = 420 + "px";
		hint.style.border = "solid 5px";
  	hint.style.borderColor = "black";

		hint.innerHTML = "<span style='font-size:12px; width:320px; line-height: 11px;'>Tutorial<br>1) Вставьте текст<br>2) Нажмите ВПЕРЕД >>, чтобы написать страницу <br>3) Сохраниет страницу (красная кнопка) (Далее Повторяйте пункт (2))<br><br> Если не устраивает как написан текст:<br>1)Очистите листок (ОЧИСТИТЬ) <br>2)(По нужде) Поменяйте Шрифт, его Размер , Межстрочный интервал или ФОН<br> 3)Нажмите на то место на листе, откуда следует начать выводить текст<br><br>--Расширенные Настройки:----(Потыкайте - поймете)<br> 1)Нажмите на СИНЮЮ кнопку рядом с надписью  (НАСТРОЙКИ)  <br> 2)Нажмите на #, чтобы посмотреть как настроен контейнер<br>  --Серые линии помогут вам настроить наклон текста(их следует делать параллельными основной разметке тетрадного листа) <br>  --Повернуть текст вы можете, указав значение Угла (от -30 до 30) (Можно и дробные числа) (Дробь пиши через ТОЧКУ : 0.7). <br> --КРАСНЫМ выделено место, КУДА Напечатается текст <br> (X, Y) - Отступ от левого и верхнего краев соответсвенно. <br> (Ширина, Высота) - задают крайние линии печати текста <br> P.S Tutorial подготовлен  АИ 17-02.(РГУ НГ)</span>";
		hint_btn_value = 1;
	} else
	{
	
		hint.style.backgroundImage = "";
		hint.style.backgroundColor = "transparent";
		hint.style.width = 35 +"px";
		hint.style.height = 35 +"px";

		hint.style.border = "none";

		hint.innerHTML = "";
		hint_btn_value = 0;
	}
}