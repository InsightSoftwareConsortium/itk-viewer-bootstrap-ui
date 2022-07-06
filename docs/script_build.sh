make clean
make html
#jupyter lite build --lite-dir ../jupyterlite --output-dir ./build/html/
jupyter lite build --output-dir ./build/html/_output --lite-dir ../jupyterlite
