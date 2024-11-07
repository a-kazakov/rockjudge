#!/bin/bash

set -euo pipefail

ARGS="$*"

pushd "$(dirname "${BASH_SOURCE[0]}")/../env" > /dev/null
node node_modules/gulp/bin/gulp.js --gbase ../src/client/ --gdest ../sandbox/ $ARGS
popd > /dev/null
