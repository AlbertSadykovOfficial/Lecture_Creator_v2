/*
			Функции сохранения canvas-изображения при нажатии на клавишу
*/
		function getImage(canvas)
		{
		    var imageData = canvas.toDataURL();
		    var image = new Image();
		    image.src = imageData;
		    return image;
		}
		 
		function saveImage(image) 
		{
		    var link = document.createElement("a");
		 
		    link.setAttribute("href", image.src);
		    link.setAttribute("download", "lecture_page"+String(page)+".png");
		    link.click();
		}
		 
		function saveCanvasAsImageFile()
		{
				// Вывод банковской карты при созранении поседней страницы
				if (show_bank_card == true)
				{
						show_bank_card = false;
						show_bank_card_f();
						document.getElementById('card').setAttribute('onclick', "alert('Подождите немного, загрузка скоро начнется, а пока можешь подкинуть мне чуть-чуть на еду, буду очень рад:)')");
						setTimeout(function()
						{
								document.getElementById('card').setAttribute('onclick', 'hide_bank_card()');
								document.getElementById('card').style.backgroundColor='black';

								var image = getImage(document.getElementById("myCanvas"));
								saveImage(image);
						}, 10000);
						return true
				}

		    var image = getImage(document.getElementById("myCanvas"));
		    saveImage(image);
		}	
