let hyptext=[]

function sendok(id){
  let value=document.getElementById('textbox'+id).value
if(value =='' || value==' '){
alert('Введите url')
} else {
document.getElementById('textout'+id).innerHTML="Статус: началась загрузка"
 
  if (value.match(/(http(s)?:)/g)==null){
  value='http://'+value
  }
let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest; 
let xhr = new XHR();
xhr.open('GET', 'https://cors-anywhere.herokuapp.com/'+value, true); 
xhr.onprogress = function() { document.getElementById('textout'+id).innerHTML="Статус: загрузка..." }
xhr.onload = function() {
hyptext[id]=xhr.response
document.getElementById('textout'+id).innerHTML="Статус: загружено!"
document.getElementById('textout'+id).innerHTML+='<input type="button" value="Перейти!" onclick="opend(hyptext['+id+'])" /><input type="button" value="Код html" onclick="opend(hyptext['+id+'],\'yes\')" />'
}
xhr.onerror = function() { alert( `Ошибка ${xhr.status}: ${xhr.statusText}` ) } 
xhr.send();
}
}
function opend(val, sw=null){
localStorage.setItem('url_sw', sw);
localStorage.setItem('url_str', val);
window.open('pindex.html');
}
let count=1
function add(){
document.getElementById('outing').innerHTML+=`Ваш url:
<input type="text" id="textbox`+count+`" />
<input type="button" value="Загрузить url" onclick="window.sendok(`+count+`);" />
  <div id="textout`+count+`"></div>`
count++
}
function dell_all(){
count=1
let save=hyptext[0]
hyptext=[]
hyptext[0]=save
document.getElementById('outing').innerHTML=''
}
