/*
		Функция Переноса Слов
		Поддерживает 2 языка English + Russian
*/

let sonorant=[	
					// RUS
								["л","м","н","р","й",
								 "Л","М","Н","Р","Й"],
					// ENG					
								["m","n","l","h","j","r","w",
								 "M","N","L","H","J","R","W"]
							];

let sonorant_plus=["ь","ъ",
								"Ь","Ъ"];

let noize=[				
			// RUS
						["б","п", "в","ф", "г","к", "д","т", "з","с", "ж","ш",
						 "Б","П", "В","Ф", "Г","К", "Д","Т", "З","С", "Ж","Ш"],
			// ENG
						["b","p", "d","t", "k","g",
						 "P","B", "D","T", "K","G"]
					];

let vowels=[
			// RUS
						["а", "о", "у", "э", "ы", "я", "е", "ё", "ю", "и",
						 "А", "О", "У", "Э", "Ы", "Я", "Е", "Ё", "Ю", "И"],
			// ENG
						["a", "e", "i", "o", "u",	"y",
						 "A", "E", "I", "O", "U",	"Y"]
						];


/*
Нам известно слово и буква с которой нужно перенести слово.
Будем действовать так: 
1) Найдем в каком слоге находится буква
2) Определим - послендняя ли эта буква в своём слоге 
3) Если это последняя буква слога, то вернем значение этой буквы
4) Если буква не является последней, значит нужно вернуть последнюю букву предидущего слога 
Правила переноса:

Слова переносятся только по слогам, а значит вытекают из
правил деления на слоги за некоторыми исключениями.
1) Сколько в слове согласных - столько и слогов
2) Один гласный звук в окружении согласных создает односложное слово, 
	которое не делится на слоги: (Сом, Крот, вальс)

3) Если СОНАРНЫЙ согл между 2 гласн, то он отходит Последующем слогу (Сонарные - голос преобл над шумом) 
		ко-рысть
4) Шумные согл отходят к след слогу. (noize[])
5) Только НЕПАРНЫЕ ЗВОНКИЕ согл могут закрыть слог (sonar[])
6) Буквы (й,ь,ъ) - принадлежат слогу посл которого пишутся

Искл:
 1) Одна буква не переносится, а присоединяется к слогу
*/

function hyphenation(word,check_symbol,lang)
{
let syllable_count = 0;
let last_symbol_of_syllable = 0; 
let have_vowel = false;
let is_other_syllable = false;

// 1

		for (i = 0; i < word.length; i++)
		{
			for (j = 0; j < vowels[lang].length; j++){
				if (word[i] == vowels[lang][j])
				{
					syllable_count++;

				}
			}
		}
//2
		if (syllable_count == 1 || syllable_count == 0) 
		{
			// Переносим все слово если 1 слог или это вообще не слово

			return last_symbol_of_syllable;	// = 0
		}
		else 
		{
			symbol = 0;
			have_vowel = false;
			last_symbol_of_syllable = 0; 

				while(symbol < word.length)
				{
							for (j = 0; j < vowels[lang].length; j++)
								if (word[symbol] == vowels[lang][j])
								{
									syllable_count++;
									have_vowel = true;
								}

							if (have_vowel == true) 
							{
								for (j = 0; j < sonorant[lang].length; j++ )
										if (word[symbol+1] == sonorant[lang][j])
										{
											for (k = 0; k < vowels[lang].length; k++)
												if (word[symbol+2] == vowels[lang][k])
													is_other_syllable = true;
											
											if (is_other_syllable) 
											{
												have_vowel = false;
												is_other_syllable = false;
											}
											else
											{
												symbol = symbol + 1;
												have_vowel = false;

											// правитло (6)
												for (i = 0; i < sonorant_plus.length; i++)
													if (word[symbol+1] == sonorant_plus[i])
														symbol = symbol + 1;
											}
										}
							
							if (symbol > check_symbol) 
								return last_symbol_of_syllable;		
							
							have_vowel = false;

							last_symbol_of_syllable = symbol;
							}
						symbol = symbol + 1;
					
				}

		}
}