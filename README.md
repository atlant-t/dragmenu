# Что делает?
Создает выдвижное меню, которое можно вытягивать за вкладку.
# Требование
— jQuery<br>
— Bootstrap

# Использование
## Подключение по средствам классов
Подключаем Drugmenu
```html
<head>
	<!-- Стили Bootstrap -->
	<link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="/bootstrap/css/bootstrap-theme.min.css">
	
	<!-- Стили Drugmenu -->
	<link rel="stylesheet" href="/dragmenu/css/dragmenu.css">
	
	<!-- jQuery -->
	<script src="/jquery-3.1.0.js"></script>
	<!-- Bootstrap -->
	<script src="/bootstrap/js/bootstrap.js"></script>
	
	<!-- Скрипт Drugmenu -->
	<script src="/dragmenu/js/dragmenu.js"></script>
</head>
```
Используем в работе
```html
	<div class="container">
		<div class="row">
			<!-- Можно задать ширину через col- -->
			<div class="col-xs-6 dragmenu-xs dragmenu-close">
				<!-- Боковой язычек для захвата -->
				<div class="dragmenu-btn">
					<p>Категории</p>
				</div>
				<!-- Сама панель -->
				<div class="dragmenu-content bg-gray-light">
					<ul id="dragmenu-content">
						<li><a href="/">Пункт 1</a></li>
						<li><a href="/">Пункт 2</a></li>
						<li><a href="/">Пункт 3</a></li>
						<li><a href="/">Пункт 4</a></li>
						<li><a href="/">Пункт 5</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
```
## Подключение по средствам jQuery
```js
$('#my-drugmenu').drugmenu()
```
# Классы
dragmenu-close — сприятать меню
# События
stay.bs.block.dragmenu — завершение движения меню<br>
drag.bs.block.dragmenu — начало перемещения меню перетягиванием