# Учебный проект Место. Бэкенд и Фронтенд приложения.


Приложение для размещения фотографий пользователей с возможностью установки лайков и ведения их статистики.
В приложении реализована возможность регистрации и авторизации пользователей. Во избежание постоянной авторизации с одного и того-же рабочего места приложение хранит токен текущего пользователя в локальном хранилище.

---


**Технологии и используемые приемы и инструменты**


<img src="https://img.shields.io/badge/React-282C34?logo=react&logoColor=61DAFB" alt="React logo" title="React" height="25" />
<img src="https://img.shields.io/badge/CSS3-282C34?logo=css3&logoColor=E34F26" alt="CSS3 logo" title="HTML5" height="25" />
<img src="https://img.shields.io/badge/HTML5-282C34?logo=html5&logoColor=E34F26" alt="HTML5 logo" title="HTML5" height="25" />
<img src="https://img.shields.io/badge/JavaScript-282C34?logo=javascript&logoColor=F7DF1E" alt="JavaScript logo" title="JavaScript" height="25" />
&nbsp;
<img src="https://img.shields.io/badge/Express-282C34?logo=express&logoColor=FFFFFF" alt="Express.js logo" title="Express.js" height="25" />
<img src="https://img.shields.io/badge/MongoDB-282C34?logo=mongodb&logoColor=47A248" alt="MongoDB logo" title="MongoDB" height="25" />
<img src="https://img.shields.io/badge/Node.js-282C34?logo=node.js&logoColor=339933" alt="Node.js logo" title="Node.js" height="25" />

Решаемая задача - совершенствование проекта с подключением к собственному бекенду.
- Верстка по макету в Figma.
- Верстка адаптивная под различные разрешения окна браузера и мобильные устройства.
- В верстке использованы гриды и флекс контейнеры.
- Запросы к api бекенда защищены по количеству обращений с одного ip в единицу времени.
- Использована технология 128 битного шифрования для генерации Токена.
- Срок действия Токена ограничен 7 днями.
- При регистрации нового пользователя проверка на уникальность происходит по e-mail.
- Удаление фотографий разрешено только пользователю, который данное фото разместил.

---

Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`. 
  
Ссылка на сайт https://sergey.nomoredomains.monster/

Внешний ip 178.154.215.125
