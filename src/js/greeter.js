/*
   ArtanOS WebLock
*/

c$().Title("ArtLock Classic");

var active_users = 0;

if (!("lightdm" in window)) {
    try {
        var lightdmMock = lightdmMock || {};
        window.lightdm = new lightdmMock(true, 0, false);
        if ("lightdm" in window) console.log('LightDM Mock initialised','lightdm');
    } catch (err) {
        console.error("LightDM Mock failed to initialise");
    }
} else {
    // DETECTED NATIVE
}

//LightDM callbacks
window.show_prompt = (prompt, type) => {
    c$("#pass_entry").placeholder = prompt.replace(":","");
    c$("#pass_entry").value = "";
    setTimeout( () => {
        c$("#pass_entry").focus();
    }, 250);
    c$("#pass_entry").type = type;
// c$("#msgbox").html("","");
}

window.show_message = (msg, type) => {
    c$("#msgbox").html(msg);
    c$("#msgbox").removeAttribute("class");
    c$("#msgbox").setAttribute("class", type);
}

window.authentication_complete = () => {
    if (lightdm.is_authenticated) {
       c$("#submit").attr("go", true);
       show_message("Access Granted", "success");
       lightdm.start_session(data.selected_user, data.session);
    } else {
       c$("#submit").attr("go", false);
       setTimeout( () => {
           c$("#submit").attr("go", '');
       }, 2000);
       show_message("Access Denied", "error");
       authUser(data.selected_user);
    }
}
//Personal Functions
function user_clicked(event) {
    if (lightdm.in_authentication) {
         lightdm.cancel_authentication();
    }
    authUser(event.target.getAttribute("uid"));
    show_message("",'');
    /*event.stopPropagation();*/
}

function respond(event) {
   lightdm.respond( c$("#pass_entry").value );
}

function init() {
  importMods();
  //Set the image
  //Init the timer
  //Set Hostname
  //Fade the display message
  //Init the Sessions
  //Init the user list
  initUsers();
}

function initUsers() {
    var name_template = c$("#username_template");
    var name_parent = name_template.parentElement;
    name_parent.removeChild(name_template);

    for ( var i = 0; i < lightdm.users.length; i++) {
        selected_user = lightdm.users[i];
        userNode = name_template.cloneNode(true);   
        c$(userNode).html(
                 (  (!selected_user.logged_in)
                       ? selected_user.display_name 
                       : selected_user.display_name+" (Logged in)" ) 
        );
        if (selected_user.logged_in) {
            ++active_users;
        }
        // Implement the trial count
        userNode.id = selected_user.username;
        userNode.onclick = user_clicked;
        name_parent.appendChild(userNode);
    }
    $('select').niceSelect('update');
    authUser( lightdm.users[0].username );
}

function setUserImage(user, box) {
  if (box.getAttribute("rpath") != user.image) {
    $("#user_image").fadeOut(250, () => {
       if (user.image) {
           box.src = user.image;
           box.setAttribute("rpath", user.image);
           box.onerror = () => {
               box.src = "src/img/avatar/default.jpg";
           }
       } else {
           box.src = "src/img/avatars/default.jpg";
       }
    }).fadeIn(250);
  } 
}

function authUser(user) {
    data.selected_user = user;
    setUserImage( getPack(user), c$("#user_image") );
    if ( user ) {
      lightdm.authenticate(user);
    }
}

function getPack(username) {
    for (var i  = 0; i < lightdm.users.length; i++) {
       if ( lightdm.users[i].username == username ) {
            return lightdm.users[i];  
       }
    }
}

function importMods() {

    // ON READY MODULES
    $(document).ready(function() {
         $('select').niceSelect(); 
         FastClick.attach(document.body);
    });

}

/* FOR DEBUG ONLY */
function showP() {
    alert( c$("html").html() );
}