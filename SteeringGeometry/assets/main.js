(function(){
  var root=document.documentElement,btn=document.getElementById('theme');
  btn.addEventListener('click',function(){
    var cur=root.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
    var next=cur==='dark'?'light':'dark';root.dataset.theme=next;
    try{localStorage.setItem('theme',next)}catch(e){}
  });
  var c=document.getElementById('copy');
  c.addEventListener('click',function(){
    var t=document.getElementById('bibtext').innerText;
    var done=function(){c.textContent='Copied!';setTimeout(function(){c.textContent='Copy'},1500)};
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,function(){fallback(t,done)})}else fallback(t,done);
  });
  function fallback(t,done){var a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}a.remove();done()}
})();
