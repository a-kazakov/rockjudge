#!/bin/bash

set -euo pipefail

export SQLALCHEMY_WARN_20=1

pushd "$(dirname "${BASH_SOURCE[0]}")/../sandbox" > /dev/null
export PYTHONPATH="."
export RJ_BASE_PATH="."

source ../env/venv/bin/activate
python ../src/server/manage.py start

popd > /dev/null
