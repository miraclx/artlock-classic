/*
       $#__ mockdata.js __#$
  Version 1.0 © 2017 Miraculous Owonubi <omiraculous@gmail.com>
  This file is a part of The ArtanOS WebLock Project
  Do not copy or redistribute code!, except on granted permissions!
  Do not edit if not a certified Artifix Personel!
*/

window.mockData = {
  users : [{
    "display_name"   : "Alexis",
    "real_name"      : "Alexis Vaughn",
    "home_directory" : data.root_fs+"home/alexis",
    "image"          : data.root_fs+"home/alexis/face.png",
    "language"       : "en_UK",
    "layout"         : null,
    "logged_in"      : false,
    "session"        : null,
    "username"       : "alexis",
    "password"       : "alexis",
    "name"           : "Alexis"
  }, {
    "display_name"   : "John",
    "real_name"      : "John Wess",
    "home_directory" : data.root_fs+"home/john",
    "image"          : data.root_fs+"home/john/face.png",
    "language"       : "en_UK",
    "layout"         : null,
    "logged_in"      : false,
    "session"        : null,
    "username"       : "john",
    "password"       : "john",
    "name"           : "John Wess"
  }, {
    "display_name"   : "Alice",
    "real_name"      : "Alice Jameson",
    "home_directory" : data.root_fs+"home/alice",
    "image"          : data.root_fs+"home/alice/face.png",
    "language"       : "en_UK",
    "layout"         : null,
    "logged_in"      : true,
    "session"        : null,
    "username"       : "alice",
    "password"       : "alice",
    "name"           : "Alice Jameson"
  }, {
    "display_name"   : "Miranda",
    "real_name"      : "Miranda Retrand",
    "home_directory" : data.root_fs+"home/miranda",
    "image"          : data.root_fs+"../img/avatars/girl.png",
    "language"       : "en_UK",
    "layout"         : null,
    "logged_in"      : false,
    "session"        : null,
    "username"       : "miranda",
    "password"       : "miranda",
    "name"           : "Miranda Retrand"
  }, {
    "display_name"   : "James",
    "real_name"      : "James Irville",
    "home_directory" : data.root_fs+"home/james",
    "image"          : data.root_fs+"../img/avatars/man.png",
    "language"       : "en_US",
    "layout"         : null,
    "logged_in"      : true,
    "session"        : null,
    "username"       : "james",
    "password"       : "james",
    "name"           : "James Irville"
  }],
  sessions : [{
    "key"     : "frost-shell",
    "name"    : "Frost",
    "comment" : "FROST - ArtanOS Desktop Environment"
  }, {
    "key"     : "gnome-shell",
    "name"    : "Gnome",
    "comment" : "GNOME - GNOME Desktop Environment"
  }, {
    "key"     : "dde",
    "name"    : "Deepin",
    "comment" : "dde - Desktop Enviroment based on Deepin for their OS"
  }, {
    "key"     : "LXDE",
    "name"    : "LXDE",
    "comment" : "LXDE - Lightweight X11 desktop environment"
  }, {
    "key"     : "openbox",
    "name"    : "Openbox",
    "comment" : "Log in using the Openbox window manager (without a session manager)"
  }, {
    "key"     : "twm",
    "name"    : "TWM",
    "comment" : "The Tab Window Manager"
  }, {
    "key"     : "tinywm",
    "name"    : "Tinywm",
    "comment" : "Ridiculously tiny window manager"
  }],
  layouts : [{
    "name"              : "us",
    "short_description" : "en",
    "description"       : "English (US)"
  }, {
    "name"              : "gb",
    "short_description" : "en",
    "description"       : "English (UK)"
  }],
  languages : [{
    "name"      : "English",
    "code"      : "en-US",
    "territory" : null
  }]
};
