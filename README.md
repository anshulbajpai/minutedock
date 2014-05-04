minutedock
==========

Minutedock app

1. Install node
2. Install mongodb
3. Clone repo
4. From '\<path_to_repo\>/src/node', run 'npm install'
5. Create ssl certificates. Create ssl key and ssl cert files. Modify config.json kept at '\<path_to_repo\>/src/node' and set ssl.key.path and ssl.cert.path
6. Set the environment to production in config.json
7. Regenerate the required salts and secrets mentioned in config.json. Don't use the defaults.
9. Set the host name in config.json
8. Minify -  from '\<path_to_repo\>/build', execute ./build min
9. From '\<path_to_repo\>' execute ./restart script
10. Access https://localhost:\<https_port_configured_in_config_file\>
