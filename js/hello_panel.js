/*
		Данные функции предназначены для обработки закрытия панели приветствия
		
		check_Y()       - Функция отслеживания собыия при котором нужно закрыть шторку
		close_curtain() - Функция закрывающая шторку
*/

function check_Y()
{
	if(window.pageYOffset>0){
		document.getElementById('curtain').checked = 0;
	 	close_curtain();
	}
}

function close_curtain()
{

	if(document.getElementById('curtain').checked == 0)
	{
		document.getElementById('this_1').style.zIndex = -1;
		document.getElementById('this_1').style.height = 0+'px';
		document.getElementById('curtain').style.height = 0+'px';
		document.getElementsByTagName('body')[0].style.overflowY = 'visible';
	}
}