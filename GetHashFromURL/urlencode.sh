#!/bin/sh

if [[ $# != 1 ]]; then
    echo "Usage: $0 string-to-urlencode"
    exit 1
fi
data="$(curl -s -o /dev/null -w %{url_effective} --get --data-urlencode "$1" "")"
if [[ $? != 3 ]]; then
    echo "Unexpected error" 1>&2
    exit 2
fi
echo "${data##/?}"
exit 0
