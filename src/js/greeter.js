/*
       $#__ greeter.js __#$
  Version 1.0 © 2017 Miraculous Owonubi <omiraculous@gmail.com>
  This file is a part of The ArtanOS WebLock Project
  Do not copy or redistribute code!, except on granted permissions!
  Do not edit if not a certified Artifix Personel!
*/

var active_users = 0;
if (!('lightdm' in window)) {
  try {
    var lightdmMock = lightdmMock || {
    };
    window.lightdm = new lightdmMock(true, 0, false);
    if ('lightdm' in window) console.log('LightDM Mock initialised', 'lightdm');
  } catch (err) {
    console.error('LightDM Mock failed to initialise');
  }
} else {
  // DETECTED NATIVE
}

//LightDM callbacks
window.show_prompt = (prompt, type='password') => {
  $('#pass_entry').attr('placeholder', prompt.replace(':', ''));
  $('#pass_entry').val('');
  setTimeout(() => {
    $('#pass_entry').focus();
  }, 250);
  $('#pass_entry').attr('type', type);
}
window.show_message = (msg, type='info') => {
  opt = {};
  switch (type) {
    case 'error':
      typ = 'danger';
      opt = {
        placement: {
          from: "bottom",
          align: "left"
        }
      };
      break;
    default:
      typ = type;
  }
  notify(msg, typ, opt);
}
window.authentication_complete = () => {
  if (lightdm.is_authenticated) {
    $('#submit').attr('go', true);
    show_message('Access Granted', 'success');
    setTimeout(() => {
      try {
        lightdm.start_session(data.session);
      } catch (e) {
        lightdm.login(data.selected_user, data.session);
      }
    }, 1000);
  } else {
    $('#submit').attr('go', false);
    setTimeout(() => {
      $('#submit').attr('go', '');
    }, 2000);
    show_message('Access Denied', 'error');
    authUser(data.selected_user);
  }
}

//Personal Functions
function user_clicked(event) {
  if ( event.target.getAttribute('id') == data.selected_user ) {
    notify("Already authenticating "+ getPack(data.selected_user).display_name, 'warning');
  }
  if (lightdm.in_authentication) {
    lightdm.cancel_authentication();
    data.selected_user = null;
  }
  authUser(event.target.getAttribute('id'));
}
function respond(event) {
  lightdm.respond($('#pass_entry').val());
}
function init() {
  prepShoot();
  //Set the image
  //Init the timer
  //Set Hostname
  //Init the Sessions
  //Init the user list
  initUsers();
}
function initUsers() {
  var $name_template = $('#username_template');
  var $name_parent = $name_template.parent();
  $name_template.remove();
  for (var i = 0; i < lightdm.users.length; i++) {
    selected_user = lightdm.users[i];
    userNode = $name_template.clone();
    dispName = selected_user.display_name;
    $(userNode).html( ((!selected_user.logged_in)
    ? c$().reduce(15, dispName)
    : c$().reduce(14, dispName)+ ' •')
    );
    if (selected_user.logged_in) {
      ++active_users;
    }
    // Implement the trial count
    userNode.attr('id', selected_user.username);
    userNode[0].onclick = user_clicked;
    userNode.attr('session', (selected_user.session) ? selected_user.session : lightdm.default_session);
    $name_parent.append(userNode);
  }
  $('select').niceSelect('update');
  authUser(lightdm.users[0].username);
}
function setUserImage(user, box) {
  if (box.attr('rpath') != user.image) {
    $('#user_image').fadeOut(250, () => {
      if (user.image) {
        box.attr('src', user.image);
        box.attr('rpath', user.image);
        box.on('error', () => {
          box.attr('src', 'src/img/avatar/default.png');
        });
      } else {
        box.attr('src', 'src/img/avatars/default.png');
      }
    }).fadeIn(250);
  }
}
function authUser(user) {
  data.selected_user = user;
  data.session = $("#"+user).attr('session');
  setUserImage(getPack(user), $('#user_image'));
  if (user) {
    lightdm.authenticate(user);
  }
}
function setTheme(theme) {
  box = window.themes[theme];
  if ( box.font ) {
    $("*").css("font-family", box.font);
  }
  if (box.container_radius) {
    $("#login_container").css("border-radius", box.container_radius );
  }
  if (box.user_image_size) {
    $("#user_image").css("width", box.user_image_size);
    $("#user_image").css("height", box.user_image_size);
  }
  if (box.user_image_radius) {
    $("#user_image").css("border-radius", box.user_image_radius);
  }
  if (box.submit_button_text) {
    $("#submit")[0].value = box.submit_button_text;
  }
}
function getPack(username) {
  for (var i = 0; i < lightdm.users.length; i++) {
    if (lightdm.users[i].username == username) {
      return lightdm.users[i];
    }
  }
}
function prepShoot() {
  splash_notify = notify('Hello There, Preparing...', 'warning',{
    showProgressbar: true,
    delay: 4000,
    allow_dismiss: false,
    placement: {
      from: "top",
      align: "center"
    }
  });
  $('select').niceSelect();
  FastClick.attach(document.body);
  setTimeout( () => {
    splash_notify.update({
      message: "Preparing plug-in's",
    });
  }, 1500);
  setTimeout( () => {
    splash_notify.update({
      message: "Gathering Users",
    });
  }, 2200);
  setTimeout( () => {
    splash_notify.update({
      message: "Applying User configurations",
      type: "info"
    });
  }, 3000);
  // ON READY MODULES
  $(document).ready(() => {
    setTimeout( () => {
      splash_notify.update({
        message: "All set",
        type: "success"
      });
      initFPB();
      $("#loading").css('opacity', '0');
      setTimeout(() => {
        $("#loading").hide();
      },1000);
    }, 4000);
  });
}

function notify(...args) {
  msg = ''; type = 'info'; options = {};
  if (args[0] && typeof args[0] === 'string') {
    msg = args[0];
  }
  if (args[1] && typeof args[1] === 'string') {
    type = args[1];
  } else if (args[1] && typeof args[1] === 'object') {
    options = args[1];
  }
  if (args[2] && typeof args[2] === 'object') {
    options = args[2];
  }
  return $.notify({
    title: "ArtanOS Lock",
    message: msg
  }, mixIn({
    type: type,
    delay: 2000,
    timer: 500,
    //showProgressbar: true,
    newest_on_top: true,
    animate: {
      enter: 'animated '+((type=='danger')? 'flipInY' : 'bounceInDown'),
      exit:  'animated '+((type=='danger')? 'flipOutX' : 'bounceOutUp')
    }
  }, options));
}

function mixIn( orig, other ) {
  final = {};
  for ( key in orig ) {
    final[key] = orig[key];
  }
  for ( key in other ) {
    final[key] = other[key];
  }
  return final;
}

function initFPB() {
  function toggleMenu() {
    $('.power-btn-sm').toggleClass('scale-out');
    if (!$('.power-card').hasClass('scale-out')) {
      $('.power-card').toggleClass('scale-out');
    }
  }
  function toggleLmtr() {
    if ( $("#powerLmtr").is(":visible") ) {
      $("#powerLmtr").hide();
    } else {
      $("#powerLmtr").show();
    }
  }
  $('#powerBtn, #powerLmtr').click(function() {
    toggleMenu();
    toggleLmtr();
  });
  $('.power-btn-sm').click(function() {
    var btn = $(this);
    var card = $('.power-card');

    if ($('.power-card').hasClass('scale-out')) {
      $('.power-card').toggleClass('scale-out');
    }
    if (btn.hasClass('power-btn-shutdown')) {
      card.css('background-color', '#d32f2f');
    } else if (btn.hasClass('power-btn-hibernate')) {
      card.css('background-color', '#fbc02d');
    } else if (btn.hasClass('power-btn-restart')) {
      card.css('background-color', '#388e3c');
    }
    $('#power-yes')[0].onclick = function () {
      eval(btn.parent().attr('action'));
    };
  });
  $('[tooltip]').hover(function (evt) {
    ordin8 = getCoord( evt.currentTarget, 'top', 'left' );
    $('#tooltip-box')
      .html( $(evt.currentTarget).attr('tooltip') )
      .css('left', (ordin8.left)+'px')
      .css('top', (ordin8.top+$(evt.currentTarget).outerHeight())+'px')
      .show();
    $("*:not('#tooltip-box')").click(function () {
      $('#tooltip-box').hide();
    });
  }, () => {});
}

function getCoord(el, ...direction) {
  function get(el, pos) {
    var scrollTop     = $(window).scrollTop(),
        elementOffset = $(el).offset()[pos];
    return (elementOffset - scrollTop);
  }
  if (direction.length > 1) {
    res = {};
    for (i = 0; i < direction.length; i++ ) {
      res[direction[i]] = get( el, direction[i] );
    }
  } else {
    res = get( el, distance[0] );
  }
  return res;
}

/* FOR DEBUG ONLY */

function showP(tag='html') {
  alert($(tag).html());
}
