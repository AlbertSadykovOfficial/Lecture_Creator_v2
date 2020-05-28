/*
			Функции сохранения canvas-изображения при нажатии на клавишу
*/
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
