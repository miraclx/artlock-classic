/*

       ###-- src/js/modify.js --###
  ArtanOS Lockscreen! based on Miraclx's Frost.JS library,
  version 3.5 ©2017 Miraculous Owonubi
  This file is a part of ArtanOS's Lockscreen Project
  Do not copy or redistribute code!, except on granted permissions!
  Do not edit if not a certified Artifix Personel!

*/
window.data = {
  'show_logger'             :  false,
  'logger_color'            :  'blue',
  'show_screensaver'        :  true,
  'show_stats'              :  true,
  'root_fs'                 :  'src/fs/',
  'session'                 :  null,
  'has_set_session'         :  false,
  'power_options_is_shown'  :  false,
  'screensaver_is_shown'    :  true,
  'pass_visibility'         :  'hide',
  'logger_is_shown'         :  false
};


window.themes = {
  default:  {
    "font"                : "Maven",
    "container_radius"    : "8px",
    "user_image_size"     : "100px",
    "user_image_radius"   : "100%",
    "submit_button_text"  : "GO"
  },
  hatrick:  {
    "font"                : "Dosis",
    "container_radius"    : "16px",
    "user_image_size"     : "120px",
    "user_image_radius"   : "30%",
    "submit_button_text"  : "SIGN IN"
  }
}

$(document).ready(function () {
  setTheme("default");
});
