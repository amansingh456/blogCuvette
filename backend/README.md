
** <h3>backend deployment with pm2 and nginx but .env file make to visible</h3> **

## first update your default packages --> `sudo apt-get update`
## first update your default packages --> `sudo apt-get upgrade`
### check weather git is installed or not --> `type git` or `git --veresion` (if not installed)
## install git --> `sudo apt install git`
## check git version again --> `git --veresion`

<br/>
<h1>now we have to install node</h1>

<li>got to this website and get the which version you want to install just copy and paste to terminal -- "https://github.com/nodesource/distributions#debian-and-ubuntu-based-distributions"</li>
<li>check the latest version and replace yum to apt</li>

## check node installed or not --> `node -v`
## check npm installed or not --> `npm -v`

<br/>
<h1>now clone git repo</h1>
<li>go to folder  `cd folderName`</li>

## install node_modules --> `npm i`

<li>come to root folder `cd ..`</li>

## install pm2 --> `sudo npm i -g pm2`
## start server --> `pm2 start index.js`

## other pm2 command --> 

`pm2 status`
`pm2 restart all`
`pm2 stop all`
`pm2 logs`
`pm2 flush` (clear logs)


## setup nginx
<li>install nginx --> remain in folder and enter this command --> `sudo apt nginx install`</li>
<li>now edit the file sites-available</li>
<li>go to file and open editor</li>
<li>open file etc/nginx/vim sites-available/default</li>
<li>change the value of server name with your server values</li>

`
                proxy_pass http://localhost:4000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
`

<li>save this confuguration in location</li>

## check nginx syntax is ok or not --> `sudo nginx -t` 
## run nginx --> `sudo nginx` 
## reload nginx --> `sudo nginx -s reload`

### backend deployed succesfully
