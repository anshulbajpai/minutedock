minutedock
==========

Minutedock app

1. Install node
2. Install mongodb
3. Clone repo
4. From '\<path_to_repo\>/src/node', run 'npm install'
5. Create ssl certificates. There is empty sslcert directory inside '\<path_to_repo\>/src/node'. Keep key in 'sslcert/key.pem' and certificate in 'sslcert/key-cert.pem' files
6. Modify config.json kept at '\<path_to_repo\>/src/node'
7. Minify -  from '\<path_to_repo\>/build', execute ./build min
8. from '\<path_to_repo\>/src/node', run 'node minutedock'
9. access https://localhost:\<https_port_configured_in_config_file\>/
