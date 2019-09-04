var inputName=document.getElementById("inputName");
var inputUrl=document.getElementById("inputUrl");
var btn=document.getElementById("btn");
var infoContainer;
if(localStorage.getItem("infosContainer") == null)
{
    infoContainer=[];
}
else{
    infoContainer = JSON.parse(localStorage.getItem("infosContainer"));
    showInfo();
}
btn.onclick=function(){
    if(inputName.value.length==0 && inputUrl.value.length==0)
      {
         document.getElementById("showName").style.display="block";
         document.getElementById("showUrl").style.display="block";

     }
     else if(inputName.value.length==0  || inputUrl.value.length==0)
         {
             if(inputUrl.value.length==0)
             {
             document.getElementById("showUrl").style.display="block";
             document.getElementById("showName").style.display="none";
             
             }
             else if(inputName.value.length==0)
             {
                 document.getElementById("showName").style.display="block";
                 document.getElementById("showUrl").style.display="none";
               
             }
        
        
        }
    
    else{ 
        document.getElementById("showName").style.display="none";
        document.getElementById("showUrl").style.display="none";
        var urlRegex=/^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/;
        if( urlRegex.test(inputUrl.value)==false){
            document.getElementById("invalidUrl").style.display="block";
        }
        else{
        document.getElementById("invalidUrl").style.display="none";
        addInfo();
        showInfo();
        clearInput();
        }}   
}    
function addInfo(){
    var infos={
    name:inputName.value,
    url:inputUrl.value
          };
        
       infoContainer.push(infos); 
       localStorage.setItem("infosContainer",JSON.stringify(infoContainer));
        } 
function showInfo(){
    var rows="";
    for(var i=0; i<infoContainer.length; i++){
        rows+=`<div class="col-lg-12 mb-3">
                <div class="result-container">
                    <span class="text-danger bookname text-capitalize">`+infoContainer[i].name+`</span>
                    <button class="btn btn-primary ml-5 "><a target="_blank" class="text-decoration-none text-white" href=`+infoContainer[i].url+`>Visit</a></button>
                    <button class="btn btn-danger" onclick="delInfo(`+i+`)">Delete</button>
                </div>
              </div>`
    }
    document.getElementById("row").innerHTML=rows;
    
}
function clearInput(){
    inputName.value="";
    inputUrl.value="";
}
function delInfo(infoItem){
    infoContainer.splice(infoItem,1);
    localStorage.setItem("infosContainer",JSON.stringify(infoContainer));
    showInfo();
}
