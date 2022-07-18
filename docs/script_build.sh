make clean
make html
jupyter lite build --output-dir ./jupyterlite/_output --lite-dir ./jupyterlite
jupyter lite serve --lite-dir ./jupyterlite --output-dir ./jupyterlite/_output --config=./jupyterlite/jupyterlite_config.json  


