/*
    Функции Страниц

      load_background()   - Вывести страницу 
      show_num_of_page()  - Показать/спрятать номер страницы при перелистывании
      hide_num_of_page()  - Спрятать номер страницы (при наведении на canavs, иначе выводит не красиво)
      
      Ф-ция load_background()
      {
        Цель: вывести Картинку выбранного тетрадного листа

        1. Узнаем какой тип листа нужно вывести (background_num)
        2. Выводим в "Настройки" выбранный лист в уменьшенном масштабе 
        3. Выводим в Canvas картинку соответсвующую странице
           {
            0 - Всегда страница tutorial_page (одинаковая)
            1 - 1й лист (Правый или Левый) 
            2 - 2й лист (Правый или Левый) 
           }
           Особенность:
           { 
              Страницы листов должны иметь шаблонные названия:
                type_1.jpg Пример : 11.jpg  
                type_2.jpg Пример : 12.jpg
              ,где type_ - число : 1,2... 
                
                Так, пары Правый + Левый лист:
                  (11.jpg 12.jpg)
                  (21.jpg 22.jpg)
                  (31.jpg 32.jpg)
                  ...и тд.
            }     
      }
*/

function load_background() {
  volk_joke_is_print_now  = false;

  var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	var imageObj1 = new Image();

	image_num = String(document.getElementById("background_num").value); 
 	document.getElementById("view_back_image").src = "images/"+image_num+"1.jpg";

	if (page == 0)             imageObj1.src = "images/tutorial_page.jpg"
  else if((page+1)%2 == 0) 	 imageObj1.src = "images/"+image_num+"1.jpg"
	else 									     imageObj1.src = "images/"+image_num+"2.jpg"
 	

			imageObj1.onload = function() 
			{

				ctx.drawImage(imageObj1, 0, 0, 0.8*0.78*document.body.clientHeight+8, 0.8*document.body.clientHeight+10);
        
        show_num_of_page(page); 
        setTimeout(show_num_of_page,350,page);
      }

}

function show_num_of_page(page)
{
  element = document.getElementsByClassName('num_of_page')[0]
  if (element.style.opacity == 0){
    element.childNodes[0].innerHTML = page;
    element.style.opacity = 1;
    element.style.zIndex = 1;
  }else
  {
    element.childNodes[0].innerHTML = page;
    element.style.opacity = 0;
  }

}

function hide_num_of_page()
{
  document.getElementsByClassName('num_of_page')[0].style.zIndex = -1;
}