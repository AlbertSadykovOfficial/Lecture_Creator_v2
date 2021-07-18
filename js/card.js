function change_price()
{
	rub = 20 + Math.round(Math.random()*30);
	document.getElementById('rubles').innerHTML = rub;
}

function show_bank_card_f()
{
	// if (document.getElementById('card').style.opacity == 1)
		document.getElementById('card').style.opacity = 1;
		document.getElementById('card').style.zIndex = 1000;

}

function hide_bank_card()
{
		change_price();

		document.getElementById('card').style.backgroundColor='orange';
		document.getElementById("card").removeAttribute('onclick');
		
		document.getElementById('card').style.opacity = 0;
		document.getElementById('card').style.zIndex 	=-10;
}