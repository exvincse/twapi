(function(){
const dompage=document.querySelector('.page-color');
dompage.addEventListener('click',dpage);

let testname=null;


(function gamename(){ 
   let client_Id ='2c5yw88re9asj4r5lk2m050emzoa86'; //developer id
   let limit=20;
   $.ajax ({
      url: 'https://api.twitch.tv/kraken/games/top/?client_id='+client_Id+'&limit='+limit,
      success: function (response){
         console.log(response);
         let str='';
         for(let i=0;i<response.top.length;i++)
         {
            
            if(response.top[i].game.name!=="Trash")
            {  
               str+=`<li>
                       <div class=box>
                       <a href="#" title="${response.top[i].game.name}">
                       <div class='box2'style=background-image:url(${response.top[i].game.box.large})></div>
                       <div class='gamename'>${response.top[i].game.name}</div>
                       </a>          
                       </div>
                     </li>`
            }
         }
         $('.game').html(str);
         g();
      },
      error: function (err) {
         console.log(err);   
      }
   })
})();



   function g(){
      const ge=document.querySelectorAll('.box a');
      for(let i=0;i<ge.length;i++)
      {
         ge[i].addEventListener('click',function(){
            event.preventDefault();
            event.stopPropagation();
            let node=event.currentTarget.nodeName;
            if(node!=='A'){return false};
            let name=event.currentTarget.title;
            console.log(name);
            tw(1,name);
         })
      }
   }

 var tw=(page,name)=>{
   let client_Id = '2c5yw88re9asj4r5lk2m050emzoa86'; //developer id
   let limit=12;
   let startdata=(page-1)*limit;//起始值
   testname=name;
   let arryname=[];
   let str='';
   if(testname==undefined || testname=='all')
   {
      testname='';
   }

   arryname=testname.split("");
 
   for(var i=0;i<arryname.length;i++)
   {
      switch(arryname[i])
      {
         case "&":
         arryname[i]="%26";
         break;
         
         case " ":
         arryname[i]="%20";
         break;
      }
      str+=arryname[i];
   }
   testname=str;

   $.ajax ({
       url: 'https://api.twitch.tv/kraken/streams/?client_id='+client_Id+'&game='+testname+'&limit='+limit+
       '&offset='+startdata,
      success: function (response) {
         console.log(response);
         go(response,page);
      },
      error: function (err) {
         console.log(err);   
      }
   })
}
 tw(1,null);

function dpage(){
   event.preventDefault();
   let node=event.target.nodeName;
   if(node!=='A') return;
   let pa=Number(event.target.dataset.page);
   tw(pa,testname);
}



var totalpage=(total,page)=>{
    let totalpage=Math.ceil(total/12);
    let nowpage=page;
    let pagestr='';
    if(nowpage<=3)
    {
       let parse;
       
       totalpage<5? parse=totalpage:parse=5;//判斷
       
       for(let i=1;i<=parse;i++)
       {
          if(nowpage==i)
          {
            pagestr+=`<li><span id="hover-color" data-page="${i}">${i}</span></li>`;
          }
          else
          {
            pagestr+=`<li><a href="#" data-page="${i}">${i}</a></li>`;
          }
          
       }
    }
    else if(nowpage>3 && totalpage>nowpage+2)
    {
      for(let i=nowpage-2;i<=nowpage+2;i++)
      {
         if(nowpage==i)
         {
           pagestr+=`<li><span id="hover-color" data-page="${i}">${i}</span></li>`;
         }
         else
         {
           pagestr+=`<li><a href="#" data-page="${i}">${i}</a></li>`;
         }
      }
    }
    else if(totalpage<=nowpage+2)
    {
       for(let i=totalpage-2;i<=totalpage;i++)
       {
         if(nowpage==i)
          {
            pagestr+=`<li><span id="hover-color" data-page="${i}">${i}</span></li>`;
          }
          else
          {
            pagestr+=`<li><a href="#" data-page="${i}">${i}</a></li>`;
          }
       }
    }
   
    $('.page ul').html(pagestr);
 }




var go=(response,page)=>{
         let str='';
         let maxpagedata=null;
         if(response.streams.length==0)
         {
            console.log(response.streams);
            //location.replace(location.href);
         }
         
            //判斷
            response.streams.length<12? maxpagedata=response.streams.length:maxpagedata=12;
          
            for(let i=0;i<maxpagedata;i++)
            {
               if(response._total!==0)
               {
                     if(response.streams[i].channel.partner===true)
                     {
                        str+=`<div class='live-master'>
                        <a href="${response.streams[i].channel.url}" title="${response.streams[i].channel.status}" target="_blank">
                        <div class="live-preview" style=background-image:url("${response.streams[i].preview.large}")></div>
                        <div class="master-title">${response.streams[i].channel.status}</div>
                        </a>
                        <div>
                        <p class="view">觀看人數:${response.streams[i].viewers}</p>
                        <img class="parner" src=images/parner.jpg>
                        <div class="master-name">${response.streams[i].channel.name}</div>
                       </div>
                       </div>`;
                     }
                     else
                     {
                       str+=`<div class='live-master'>
                       <a href="${response.streams[i].channel.url}" target="_blank">
                       <div class="live-preview" style=background-image:url("${response.streams[i].preview.large}")></div>
                       <div class="master-title">${response.streams[i].channel.status}</div>
                       </a>
                       <div>
                        <p class="view">觀看人數:${response.streams[i].viewers}</p>
                        <div class="master-name">${response.streams[i].channel.name}</div>
                       </div>
                       </div>`;
                     }
                   
               }  
                    
                  
            }
               
            
            $('.gamecontent').html(str);
            totalpage(response._total,page);
}
})();

