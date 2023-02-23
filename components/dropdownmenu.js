
function dropdownmenu(slide)
{
  if(slide)
  {
    slide=0;
    var obj = document.getElementById("container");
    var Features = document.getElementById("Features");
    obj.style.setProperty("display", "none");

    Features.setAttribute("style", "color: rgba(0,0,0,1); text-decoration: underline;");
  }
  else
  {
    slide=1;
    obj.setAttribute("style", "display: block;");
    Features.setAttribute("style", "color: rgba(255,255,255,1);");
  }
}