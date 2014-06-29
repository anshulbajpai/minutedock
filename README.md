minutedock
==========

Minutedock app

1. Install node.js
2. Install forever.js
3. Install mongodb
4. Clone repo and checkout the release branch or download the latest release.
5. From '\<path_to_repo\>/src/node', run 'npm install'
6. There is config file, app.json at '\<path_to_repo\>/src/node/config'. Override the properties from default to other sections according to environment name.
7. Set use.https to true or false in app.json. Keep it true if you don't have https web server sitting in front of node server.
8. If using https, create ssl certificates. Create ssl key and ssl cert files. Modify app.json and set ssl.key.path and ssl.cert.path
9. Regenerate the required salts and secrets mentioned in app.json. Don't use the defaults.
10. Create google oauth2 credentials and update google.auth.client.id and google.auth.client.secret properties in app.json
11. Minify -  from '\<path_to_repo\>/build', execute ./build min
12. From '\<path_to_repo\>' execute ./restart script (pass the enviroment as parameter, defaults to development. Check app.json to know all possible environment values)
13. Access https://localhost:\<https_port_configured_in_config_file\>
