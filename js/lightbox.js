lightBox = function(src,caption){
    document.body.style.overflow = "hidden";
    var mask = document.createElement("div");
    mask.style.cssText = "position:fixed;top:0px;left:0;width:100%;height:100%;background:rgba(0,0,0,.85);z-index:401";//NO I18N
    var imgCont = document.createElement("div");
    var closeBtn = document.createElement("div");
    closeBtn.className="slideShowCloseCont"
    closeBtn.innerHTML="<div style='float: left;' class='slideShowCloseImg'></div><span style='float: left; padding-left: 5px;'>Close</span>";
    var pinitBtn = document.createElement("div");
    var imgSrc = src.src;
    var caption = "";
    if(src.nextSibling && src.nextSibling.nextSibling){
        caption =  src.nextSibling.nextSibling.innerHTML;
    }
    var func = function(){window.onresize=null;window.onkeypress=null;document.body.style.overflow = "auto";document.body.removeChild(mask);};
    window.onkeypress = function(e){
        if((e.which?e.which:e.keyCode) == 27){
           func();
        }
    }
    closeBtn.onclick=function(){func()};
    var winHeight = window.innerHeight || document.documentElement.clientHeight;
    var winWidth = window.innerWidth || document.documentElement.clientWidth;
    imgCont.style.cssText = "position:absolute;top:"+((winHeight-40)/2)+"px;left:"+((winWidth-40)/2)+"px;padding:10px;background:#ffffff;width:40px;height:40px;transition:all .5s ease-out;-webkit-transition:all .5s ease-out;-moz-transition:all .5s ease-out;-o-transition:all .5s ease-out";//NO I18N
    mask.appendChild(pinitBtn);
    mask.appendChild(imgCont);
    mask.appendChild(closeBtn);
    document.body.appendChild(mask);
    var transSupport = function(){
        var transitions = {
            'transition':'transitionend',// No I18N
            'OTransition':'oTransitionEnd',// No I18N
            'MSTransition':'msTransitionEnd',// No I18N
            'MozTransition':'transitionend',// No I18N
            'WebkitTransition':'webkitTransitionEnd'// No I18N
        }
        var style = document.body.style || document.documentElement.style;
        for(transition in transitions){
            if(style[transition] != undefined){
                return {transitionEnd:transitions[transition],'transition':transition};
            }
        }
        return false;
    }
    var height,width,actWidth,actHeight;
    var img = new Image();
    img.onload = function(){
        actHeight = height = this.height;
        actWidth = width = this.width;
        img.style.cssText = "width:auto;height:"+height+"px;opacity:0;transition:opacity .2s;-webkit-transition:opacity .2s;-moz-transition:opacity .2s;-o-transition:opacity .2s;";//NO I18N        
        imgCont.appendChild(this);
        if( winHeight < winWidth){
            if(this.height > winHeight-60){
                this.removeAttribute('width');
                this.removeAttribute('height');
                height = winHeight-60;
                this.setAttribute("height", winHeight-60);
                img.style.cssText = "width:auto;height:"+height+"px;opacity:0;transition:opacity .2s;-webkit-transition:opacity .2s;-moz-transition:opacity .2s;-o-transition:opacity .2s;";//NO I18N    
            }
            if(this.clientWidth>winWidth-60){
                this.removeAttribute('height');
                this.setAttribute("width", winWidth-60 ); 
                width = winWidth-60;                   
                img.style.cssText = "height:auto;width:"+width+"px;opacity:0;transition:opacity .2s;-webkit-transition:opacity .2s;-moz-transition:opacity .2s;-o-transition:opacity .2s;";//NO I18N                    
            }
        }else{
            if(this.width >winWidth-60){
                this.removeAttribute('width');
                this.removeAttribute('height');
                width = winWidth-60;
                this.setAttribute("width", winWidth-60 );
                img.style.cssText = "height:auto;width:"+width+"px;opacity:0;transition:opacity .2s;-webkit-transition:opacity .2s;-moz-transition:opacity .2s;-o-transition:opacity .2s;";//NO I18N    
            }
            if(this.clientHeight>winHeight-60){
                this.removeAttribute('width');
                this.setAttribute("height", winHeight-60 );                  
                height = winHeight-60;
                img.style.cssText = "width:auto;height:"+height+"px;opacity:0;transition:opacity .2s;-webkit-transition:opacity .2s;-moz-transition:opacity .2s;-o-transition:opacity .2s;";//NO I18N    
            }
        }
        imgCont.style.height = this.clientHeight+"px";
        imgCont.style.width = this.clientWidth+"px";
        imgCont.style.top = (winHeight-(this.clientHeight+20))/2+"px";
        imgCont.style.left = (winWidth-(this.clientWidth+20))/2+"px";
        var trans = transSupport();
        if(trans){
            imgCont.addEventListener(trans["transitionEnd"],function(){this.style[trans["transition"]]="";img.style.opacity=1},false);
        }else{
            img.style.opacity=1;
        }
    }
    img.src = src.src;
    window.onresize = function(){
        var winHeight =  document.documentElement.clientHeight;
        var winWidth =  document.documentElement.clientWidth;
        if( winHeight < winWidth){
            if(img.clientHeight > (winHeight-60) || img.clientHeight <actHeight){
                img.style.height = (winHeight-60) + "px";
                img.style.width="auto";
            }
            if(img.clientWidth > winWidth-60 ){
                img.style.width = (winWidth-60) +"px";
                img.style.height = "auto";
            }
        }else{
            if( img.clientWidth > (winWidth-60) || img.clientWidth <  actWidth){
                img.style.width = (winWidth-60) + "px";
                img.style.height="auto";
            }
            if(img.clientHeight > winHeight-60){
                img.style.height = (winHeight-60) + "px";
                img.style.width="auto";
            }
        }
        if(img.clientWidth >actWidth || img.clientHeight >actHeight){
            img.style.height=actHeight+"px";
            img.style.width="auto";
        }
        imgCont.style.height = img.clientHeight+"px";
        imgCont.style.width = img.clientWidth+"px";
        imgCont.style.top = (winHeight-(img.clientHeight+20))/2+"px";
        imgCont.style.left = (winWidth-(img.clientWidth+20))/2+"px";
    }
}