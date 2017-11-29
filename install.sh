#!/bin/bash
echo "Installing ArtLock Classic..."

#Check if user is root
#If so;
if [ ${EUID} != 0 ]; then
  echo "This script requires root privileges"
  exit
fi

#Enter the file directory if not already there
file_path=$(readlink -f ${0%/*})
cd ${file_path}

#Check if lightdm is installed
#If so;
if [ -e /etc/lightdm ]; then
  echo "[X] LightDM was found...Proceeding"
else
  echo "[!] LightDM was not found...Aborting"
  exit 1
fi
#Check if lightdm-webkit2-greeter is installed
#If so, proceed:
if [ -e /etc/lightdm/lightdm-webkit2-greeter.conf ]; then
  echo "[X] LightDM Webkit2 was found...Proceeding"
else
  echo "[!] LightDM Webkit2 was not found...Aborting"
  exit 1
fi

#Check and edit /etc/lightdm/lightdm.conf
#::#
# [SeatDefaults]
#  greeter-session=lightdm-webkit2-greeter
#  allow-guest=false
#::#
sed -i 's,^\(greeter-session=\).*,\1'lightdm-webkit2-greeter',' /etc/lightdm/lightdm.conf

#Edit /etc/lightdm/lightdm-webkit2-greeter.conf
#::#
# webkit-theme=artlock-classic
#::#
sed -i 's,^\(webkit-theme=\).*,\1'artlock-classic',' /etc/lightdm/lightdm-webkit2-greeter.conf

final_path=/usr/share/lightdm-webkit/themes

#Make the directory if it doesn't already exist
mkdir -p ${final_path}/artlock-classic

#Port the artifacts
cp -R ${file_path}/* ${final_path}/artlock-classic/
echo "[+] Added files"

#Clean the directory
rm -rf ${final_path}/.git ${final_path}/.gitlab-ci.yml ${final_path}/install.sh
echo "[-] Cleaning useless files"

#Clean up
cd ${OLDPWD}
#rm -rf ${file_path}

#All done
echo "[@] All Done, Theme installed."

#Ask if user wants to test it
#echo "Would you like to test it?"
#Add some more lines
