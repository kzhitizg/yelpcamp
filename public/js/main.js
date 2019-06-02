$("#login-button").click( function (){
    if ($("#login-form").hasClass("hidden")){
        $("#login-form").removeClass("hidden")
        $("#login-form").slideDown(1000, function () {})
    }
    else{
    $("#login-form").slideUp(1000, function () {
        $("#login-form").addClass("hidden")
    })
    }
})

$("#login-form").slideUp(1, function () {
    $("#login-form").addClass("hidden")
})

function chkPassword() {
    if ($("#password2").val()!="" && $("#password1").val() != $("#password2").val()){
        if (!$("#password2").hasClass("wrong-input")){
            $("#password2").addClass("wrong-input")
            $("#pass-msg").css("display", "block")
            $("#reg-submit").addClass("disabled")
        }
    } else{
        $("#password2").removeClass("wrong-input")
        $("#pass-msg").csss("display", "none")
        $("#reg-submit").removeClass("disabled")
    }
}