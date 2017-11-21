#!/bin/bash
echo "Installing ArtLock Classic..."

#Enter the file directory if not already there
cd ${file_path}

#Check if lightdm is installed
#If so;
#Check if lightdm-webkit2-greeter is installed
#If so, proceed:

#Check and edit /etc/lightdm/lightdm.conf
#::#
# [SeatDefaults]
#  greeter-session=lightdm-webkit2-greeter
#  allow-guest=false
#::#

#Edit /etc/lightdm/lightdm-webkit2-greeter.conf
#::#
# webkit-theme=artlock-classic
#::#

#Make the directory if it doesn't already exist
mkdir -p /usr/share/lightdm-webkit/themes/artlock-classic

#Clean the directory
rm -rf .git .gitlab-ci.yml install.sh

#Port the artifacts
cp -R ${file_path}/* /usr/share/lightdm-webkit/themes/artlock-classic/

#Clean up
cd ${OLDPWD}
rm -rf ${file_path}

#All done
echo "All Done, Theme installed."

#Ask if user wants to test it
echo "Would you like to test it?"
#Add some more lines