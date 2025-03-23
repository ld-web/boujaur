#! /usr/bin/env nix-shell
#! nix-shell -i bash -p python3Packages.fonttools

han_chars="/tmp/han_chars.txt"
kai_font="./pages/edukai-4.0.ttf"
output_file="./public/fonts/edukai-4.0_subset.ttf"

grep -RohP '[\p{Han}]' ./posts | sort -u | tr -d '\n' > $han_chars
pyftsubset $kai_font --text-file=$han_chars --output-file=$output_file
rm $han_chars
