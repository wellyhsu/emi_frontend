function change(n){
    $("#dropdown-menu").slideToggle("");
    if (n == 1) {
        slide = 0;
        $(".fa-chevron-up").attr("style", "display:none")
        $(".fa-chevron-down").attr("style", "display:block")
    }
    else {
        slide = 1;
        $(".fa-chevron-up").attr("style", "display:block")
        $(".fa-chevron-down").attr("style", "display:none")
    }
}