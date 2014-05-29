minutedock
==========

Minutedock app

1. Install node.js
2. Install forever.js
3. Install mongodb
4. Clone repo and checkout the release branch. (If upgrading to new release, update the release branch)
5. From '\<path_to_repo\>/src/node', run 'npm install'
6. Create ssl certificates. Create ssl key and ssl cert files. Modify app.json kept at '\<path_to_repo\>/src/node/config' and set ssl.key.path and ssl.cert.path
7. Regenerate the required salts and secrets mentioned in app.json. Don't use the defaults.
9. Set the host name (if a dns name is being used, then mention that) in app.json
9. Minify -  from '\<path_to_repo\>/build', execute ./build min
10. From '\<path_to_repo\>' execute ./restart script (pass the enviroment as parameter, defaults to development. Check app.json kept in config folder to know all possible values)
11. Access https://localhost:\<https_port_configured_in_config_file\>
