#!/bin/bash

set -euo pipefail

ARGS="$*"

pushd "$(dirname "${BASH_SOURCE[0]}")/../sandbox" > /dev/null
export PYTHONPATH="."
export RJ_BASE_PATH="."

source ../env/venv/bin/activate
python ../src/server/manage.py $ARGS

popd > /dev/null
