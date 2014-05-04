minutedock
==========

Minutedock app

1. Install node
2. Install mongodb
3. Clone repo
4. From '\<path_to_repo\>/src/node', run 'npm install'
5. Create ssl certificates. Create ssl key and ssl cert files. Modify config.json kept at '\<path_to_repo\>/src/node' and set ssl.key.path and ssl.cert.path. 
6. Modify config.json kept at '\<path_to_repo\>/src/node' and set the environment to production.
7. Minify -  from '\<path_to_repo\>/build', execute ./build min.
8. from '\<path_to_repo\>' execute ./restart script.
9. access https://localhost:\<https_port_configured_in_config_file\>.
