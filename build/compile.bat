@echo off
cd jscompiler

@echo Galline...
del "..\..\lib\galline.min.js"
java -jar compiler.jar --js="..\..\lib\galline.js" --js_output_file="..\..\lib\galline.min.js"

@echo Dependencies...
del "..\..\lib\galline-dep.min.js"
java -jar compiler.jar --js="..\..\lib\galline-dep.js" --js_output_file="..\..\lib\galline-dep.min.js"

@echo Done!

pause