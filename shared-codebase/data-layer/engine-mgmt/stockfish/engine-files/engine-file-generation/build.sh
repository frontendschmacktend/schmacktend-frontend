#!/bin/sh

set -e

EMSDK="emsdk"
STOCKFISH="stockfish"

echo "Fetching emsdk..."
if [ ! -d "$EMSDK" ] ; then
	git clone https://github.com/emscripten-core/emsdk.git "$EMSDK"
fi
cd "$EMSDK"
./emsdk install 2.0.26
./emsdk activate 2.0.26
source ./emsdk_env.sh
cd ..
emcc --version

echo "Fetching stockfish.js..."
if [ -d "$STOCKFISH" ] ; then
	rm -rf "$STOCKFISH"
fi
git clone https://github.com/nmrugg/stockfish.js "$STOCKFISH"
cd "$STOCKFISH"

echo "Patching Makefile..."
sed 's/= -arch /= -arch=/g;/mdynamic-no-pic/d' "src/Makefile" > _TMP
mv _TMP "src/Makefile"

./build.js --no-minify --single-threaded

echo "Copying binaries..."
cp src/stockfish-nnue-16-single.js ../stockfish.js
cp src/stockfish-nnue-16-single.wasm ../stockfish.wasm
echo "window.stockfishwasm = '$(base64 -i ../stockfish.wasm)';" > ../stockfish.wasm.js
cd ..
open example.html
