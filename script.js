let hyptext=[]
let value=[]
function sendok(id){
  value[id]=document.getElementById('textbox'+id).value
if(value[id] =='' || value[id]==' '){
alert('Введите url')
} else {
document.getElementById('textout'+id).innerHTML="Статус: началась загрузка"
 
  if (value[id].match(/(http(s)?:)/g)==null){
  value[id]='http://'+value[id]
  }
let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest; 
let xhr = new XHR();
xhr.open('GET', 'https://cors-anywhere.herokuapp.com/'+value[id], true); 
xhr.onprogress = function() { document.getElementById('textout'+id).innerHTML="Статус: загрузка..." }
xhr.onload = function() {
hyptext[id]=xhr.response
document.getElementById('textout'+id).innerHTML="Статус: загружено!"
document.getElementById('textout'+id).innerHTML+='<input type="button" value="Перейти!" onclick="opend(hyptext['+id+'])" /><input type="button" value="Код html" onclick="opend(hyptext['+id+'],\'yes\')" /><input type="button" value="Все ссылки" onclick="linkso(hyptext['+id+'],value['+id+'])" />'
}
xhr.onerror = function() { alert( `Ошибка ${xhr.status}: ${xhr.statusText}` ) } 
xhr.send();
}
}
let visio=[]
function linkso(val,valtitl){
let a_src=[]
let video_src=[]
let img_src=[]
let iframe_src=[]

visio=[]
let parser = new DOMParser()
let doc = parser.parseFromString(val, "text/html");

a_src=doc.querySelectorAll('a')
video_src=doc.querySelectorAll('video')
img_src=doc.querySelectorAll('img')
iframe_src=doc.querySelectorAll('iframe')

hreff(a_src,'a',valtitl)
hreff(video_src,'video',valtitl)
hreff(img_src,'img',valtitl)
hreff(iframe_src,'iframe',valtitl)

}
function hreff(src_main,texti,valtitl){
	if (src_main==null){
		alert('Нет ссылок: ',texti)
	}else{
		visio.push('<h2>Ссылки тэга: '+texti+'</h2>')
		for (let i=0; i<src_main.length; i++) {
			let elem
			if (texti == 'a'){
				elem=src_main[i].getAttribute('href')
			}else{
				elem=src_main[i].getAttribute('src')
			}
			if (elem!=null){
				if(elem.match(/(http(s)?:)/g)==null){
					elem='http://'+valtitl+elem
				}
				visio.push('<a href="'+String(elem)+'" target="_blank">'+String(elem)+'</a><br><br>')
			}
		}
		document.getElementById('lin').innerHTML+=visio.join('')
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
document.getElementById('lin').innerHTML=''
}
