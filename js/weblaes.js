var MIKROV_synthWin = null;
var MIKROV_player_searchpane = -1;
var MIKROV_player_foreground = 0;
var MIKROV_player_background = 1;
var MIKROV_player_undefined = -2;
var MIKROV_player = MIKROV_player_foreground;
var MIKROV_mplayer = MIKROV_player_undefined;
var MIKROV_leftpos = 0;
var MIKROV_toppos = 0;

// alert("Danlæs opdateres i øjeblikket. Brug derfor ikke Danlæs knapperne lige nu. Undskyld ulejligheden");

function MIKROV_SetUpMenu(catchup,x,ydisp,layer,color)
{ var expires = new Date();
  expires.setTime(expires.getTime() + 3E11);   // about 10 years = "forever"
  MIKROV_SetCookie("SHOWMENU_X",x,expires);
  MIKROV_SetCookie("SHOWMENU_YDISP",ydisp,expires);
  if (layer != null)
    MIKROV_SetCookie("SHOWMENU_LAYER",layer,expires);
  if (color != null)
    MIKROV_SetCookie("SHOWMENU_COLOR",color,expires);
  MIKROV_SetCookie("MODE",catchup,expires);
}

function MIKROV_error(str)
{ alert(str);
}

function MIKROV_CloseSynt()
{ 
  try
  { // MIKROV_leftpos = MIKROV_synthWin.screenLeft;
    // MIKROV_toppos = MIKROV_synthWin.screenTop;
  }
  catch (e)
  { MIKROV_leftpos = 0;
    MIKROV_toppos = 0;
  }
  finally
  {}
  try
  { if (MIKROV_synthWin != null)
    { 
      MIKROV_synthWin.close();
    }
  }
  catch (e)
  { 
  }
  finally
  {}
  MIKROV_synthWin = null;
}

function MIKROV_Om()
{ alert("DanLæs version 1.4\nCopyright (c) Mikroværkstedet 2005");
}

function MIKROV_Afspil_Tekst(str)
{ MIKROV_PlayText(str);
}


function MIKROV_PlayText(str1)
{ if (str1 == null || str1 == "")
    return;
  try
  { 
  var str = new String(str1);
  str= str.replace(/"/g, " "); 
  if (MIKROV_mplayer == MIKROV_player_undefined)
    MIKROV_mplayer = MIKROV_player;
  window.status = "Converting '" + str + "' ...";
//  if (document.all != null) // Not supported for other browsers yet
  { str= str.replace(/"/g, " ");  
    str= str.replace(/\x94/g, " ");  
    str= str.replace(/'/g, "");  
    str= str.replace("?", " ");
    str = str.replace(/\x0D\x0A/g, ". ");
    var oldstring = str;
    str = str.replace(/\x20\x20/g, " ");
    while (oldstring != str)
    { oldstring = str;
      str = str.replace(/\x20\x20/g, " ");
    }
    str = str.replace(/\x20/g, "_");
  }
  str = escape(str);
  var parmsize = 500;
  var parmnum = Math.round(str.length/parmsize) + 1;
  var parm = 'http://danlaes.mikrov.dk/weblaes/weblaes_mini.asp?Domain='+escape(document.location.hostname);//+ parm;
  MIKROV_CloseSynt();
//  alert(MIKROV_leftpos);
  var properties = 'width=315,height=50,top='+MIKROV_toppos+', left='+MIKROV_leftpos+',status=no,resizable=no';
//  alert(properties);
  if (document.all == null)
  { MIKROV_synthWin = window.open('','_blank', properties);
    MIKROV_synthWin.document.open();
  }
  else
  if (MIKROV_mplayer != MIKROV_player_searchpane)
    MIKROV_synthWin = window.open('about:blank','_blank', properties);
  else
    MIKROV_synthWin = window.open('about:blank','_search', properties);
  if (MIKROV_synthWin == null)
    return;
//  MIKROV_synthWin.resizeTo(100,100);
  MIKROV_synthWin.document.writeln("<FORM id=\"Danlaes\" METHOD=\"post\" ACTION=\""+parm+"\">");
  MIKROV_synthWin.document.writeln("<input type=\"hidden\" value=\""+str+"\" name=\"DanlaesText\" id=\"DanlaesText\">");
  MIKROV_synthWin.document.writeln(" </FORM>");
  if (document.all == null)
    MIKROV_synthWin.document.close();
  var parag = MIKROV_synthWin.document.getElementById("Danlaes");
  parag.submit();
  //MIKROV_synthWin.moveTo(MIKROV_leftpos,MIKROV_toppos);
  if (MIKROV_mplayer == MIKROV_player_background)
    window.focus();
  }
  catch (e)
  { 
    MIKROV_error("Fejl 3: Beklager, tekstoplæsning fejlede. Prøv igen");
  }
  finally
  { }
  window.status = "";
  window.onunload = MIKROV_CloseSynt;
}

function MIKROV_Afspil_Markering()
{ 
  return MIKROV_PlaySelection();
}

function MIKROV_PlaySelection()
{ var sel = MIKROV_findSelection(window.top);
  if (sel != "") 
  { 
    MIKROV_PlayText(sel);
    return true;
  }
  else
    MIKROV_PlayText("Markér tekst og klek på højtaleren");
}

function MIKROV_Afspil_Side_Eller_Markering()
{ MIKROV_PlayPageOrSelection();
}

function MIKROV_PlayPageOrSelection()
{ MIKROV_PlayText(MIKROV_gettext());
}

function MIKROV_Afspil_Side()
{ MIKROV_PlayPage();
}

function MIKROV_PlayPage()
{ MIKROV_PlayText(MIKROV_collecttext(window.top));
}


function MIKROV_GetPos(elm,c)
{
  var x=y=0;
  while(elm.offsetParent){ x+=elm.offsetLeft; y+=elm.offsetTop; elm=elm.offsetParent; }
  return((c=="x")?x:y);
}

function MIKROV_gettext()
{ var txt = MIKROV_findSelection(window.top);
  if (txt == "")
    txt = MIKROV_collecttext(window.top);
  return txt;
}

function MIKROV_Find_Og_Afspil_Element(elem)
{ MIKROV_PlayText(MIKROV_FindElementText(elem));
}

function MIKROV_FindElementText(elem)
{ var element = document.getElementById(elem);
  if (element != null)
    return MIKROV_GetElementText(element);
  return "HTML elementet kunne ikke findes på siden";
}

function MIKROV_Afspil_Element(elem)
{ MIKROV_PlayText(MIKROV_GetElementText(elem));
}

function MIKROV_GetElementText(element)
{ 
    var r = null;
    if (document.all != null) // Not supported for other browsers yet
    { r = document.body.createTextRange();
      r.moveToElementText(element);
      r.select();
      return r.text;
    }
  return MIKROV_ElemText(element,false);
}


function MIKROV_ElemText(element,alltext)
{ if (!alltext && document.all != null)
    return ";,;,;," + element.innerHTML;
/* Skaber problemer med at der ikke er blanke mellem menupunkter
  if (alltext && document.all != null)
    return element.innerText;
*/
  var str = MIKROV_ElemText1(element,alltext,"",false);
  return str;
}

function MIKROV_ElemText1(element,alltext,cont,span)
{ var txt = "";
  var parag = element.childNodes;
  for(var i = 0; i < parag.length; i++)
  { var tag = parag[i].tagName;
    if (tag != "SCRIPT" && tag != "!" && (tag != "SPAN" || !span))
    if (alltext || parag[i].nodeType == 3 || ((tag != "A" || i == 0 || parag[i-1].nodeType == 3) && tag != "SELECT" && tag != "INPUT"))
      { 
        if (parag[i].nodeType == 3 && parag[i].nodeValue != "")
        { if (txt != "")
            txt = txt + ". ";
          txt = txt + parag[i].nodeValue;
        }
        else
        if (tag != "A" || alltext || i > 0 || (i+1 < parag.length && parag[i+1].nodeType == 3))
        { var enclosedtext = MIKROV_ElemText1(parag[i],alltext,cont + " " + tag,span || tag == "SPAN");
          if (txt != "" && enclosedtext != "")
            txt = txt + ". ";
          txt = txt + enclosedtext;
        }
      }
  }
  return txt;
}

function MIKROV_collecttext(thisWindow)
{ return MIKROV_ElemText(thisWindow.document.getElementsByTagName("BODY")[0],true);
}

function MIKROV_GetSel(thisWindow)
{
	if (thisWindow.getSelection)
	  return thisWindow.getSelection();
	else if (thisWindow.document.getSelection)
          return thisWindow.document.getSelection();
	else 
        if (thisWindow.document.selection)
        { var oParent = thisWindow.document.getElementsByTagName("BODY")[0];
          var rng = thisWindow.document.selection.createRange();
          var iOffsetTop = rng.offsetTop;
          var iClientHeight = oParent.clientHeight;
          if (iOffsetTop > iClientHeight)
            rng.scrollIntoView(true);
          return rng.text;
        }
}

function MIKROV_findSelection(thisWindow)
{ if (thisWindow == null)
    return "";
  try
  { 
    var sel = MIKROV_GetSel(thisWindow);
    if (sel != "")
      return sel;
    var frm = thisWindow.frames;
    if (frm) 
    {
     for (var i=0; ((i < frm.length)); i++)
     { sel = MIKROV_findSelection(frm[i]);
       if (sel != "")
	return sel;
     }
    }
  }
  catch (e)
  { return "Oplæsning kan ikke bruges til eksterne sider";
  }
  finally
  {}
  return "";
}


function MIKROV_SetCookie(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape (value) +
         ((expires) ? "; expires=" + expires.toGMTString() : "") +
         ((path) ? "; path=" + path : "") +
         ((domain) ? "; domain=" + domain : "") +
         ((secure) ? "; secure" : "");
}

function MIKROV_GetCookieVal(offset) {
     var endstr = document.cookie.indexOf (";", offset);
     if (endstr == -1)
         endstr = document.cookie.length;
     return unescape(document.cookie.substring(offset, endstr));
}

function MIKROV_GetCookie(name) {
   var arg = name + "=";
   var alen = arg.length;
   var clen = document.cookie.length;
   var i = 0;
   while (i < clen) {
     var j = i + alen;
     if (document.cookie.substring(i, j) == arg)
       return MIKROV_GetCookieVal (j);
     i = document.cookie.indexOf(" ", i) + 1;
     if (i == 0) break; 
   }
   return null;
}

var positionselement = null;
var rammeleft = 0;
var rammetop = 0;

function MIKROV_knapposition()
{ var ll = rammeleft;
  var tt = rammetop;
  element = positionselement;
  while (element != null)
  { ll = ll+element.offsetLeft;
    tt = tt+element.offsetTop;
    element = element.offsetParent;
  }
  var left = ll.toString() + "px";
  var top = tt.toString() + "px";
  var floatingm = document.getElementById("floatingm");
  floatingm.style.left = left;
  floatingm.style.top = top;
}


function MIKROV_Rammeknap(element,v,t,sti)
{ rammeleft = v;
  rammetop = t;
  var ll = rammeleft;
  var tt = rammetop;
  positionselement = element;
  while (element != null)
  { ll = ll+element.offsetLeft;
    tt = tt+element.offsetTop;
    element = element.offsetParent;
  }
  var left = ll.toString();
  var top = tt.toString();
  var danlaesfil = sti + "danlaes.htm";
  var txt = '<iframe title="læs op" scrolling="no" frameborder="0" src="'+danlaesfil+'" allowTransparency="true" id="floatingm" name="floatingm" style="position:absolute;border:none;height:100px;width:100px;left:'+left+'px;" align="left"></iframe>';
//  prompt(txt);
  document.write(txt);
  setInterval(MIKROV_knapposition, 10);
}  
