#!/bin/bash

while IFS= read -r line || [[ -n $line ]]; do
    [[ $line == ID,* ]] && { echo "$line"; continue; }
    Stock=$(shuf -i 1-100 -n 1)
    sed "s/,$/,${Stock},/" <<< "$line"
done < BaseData.csv > KrogerTest.csv

while IFS= read -r line || [[ -n $line ]]; do
    [[ $line == ID,* ]] && { echo "$line"; continue; }
    Price=$(shuf -i 1-67 -n 1)
    sed "s/,$/,${Price},/" <<< "$line"
done < KrogerTest.csv

rm KrogerTest.csv