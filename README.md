minutedock
==========

Minutedock app

1. Install node.js
2. Install forever.js
3. Install mongodb
4. Clone repo and checkout the release branch. (If upgrading to new release, update the release branch)
5. From '\<path_to_repo\>/src/node', run 'npm install'
6. Set use.https to true or false in config.json kept at '\<path_to_repo\>/src/node/'. Keep it true if you don't have https web server sitting in front of node server.
7. Create ssl certificates. Create ssl key and ssl cert files. Modify config.json and set ssl.key.path and ssl.cert.path
8. Regenerate the required salts and secrets mentioned in config.json. Don't use the defaults.
9. Create google oauth2 credentials and update google.auth.client.id and google.auth.client.secret properties in config.json
10. Minify -  from '\<path_to_repo\>/build', execute ./build min
11. From '\<path_to_repo\>' execute ./restart script (pass the enviroment as parameter, defaults to development. Check config.json to know all possible values)
12. Access https://localhost:\<https_port_configured_in_config_file\>
