minutedock
==========

Minutedock app

1. Install node.js
2. Install forever.js
3. Install mongodb
4. Clone repo
5. From '\<path_to_repo\>/src/node', run 'npm install'
6. Create ssl certificates. Create ssl key and ssl cert files. Modify config.json kept at '\<path_to_repo\>/src/node' and set ssl.key.path and ssl.cert.path
7. Set the environment to 'production' in config.json
8. Regenerate the required salts and secrets mentioned in config.json. Don't use the defaults.
9. Set the host name (if a dns name is being used, then mention that) in config.json
10. Minify -  from '\<path_to_repo\>/build', execute ./build min
10. From '\<path_to_repo\>' execute ./restart script
11. Access https://localhost:\<https_port_configured_in_config_file\>
