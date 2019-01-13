ls ./source/fonts || mkdir ./source/fonts
ls ./source/js || mkdir ./source/js

# copy webfontloader from node_modules
cp ./node_modules/webfontloader/webfontloader.js ./source/js/webfontloader.js

# copy fontawesome fonts from node_modules
cp -r ./node_modules/@fortawesome/fontawesome-free/webfonts/. ./source/fonts/fontawesome/
# copy fontawesome css file and replace webfont font path
sed 's/\.\.\/webfonts/\/fonts\/fontawesome/g' ./node_modules/@fortawesome/fontawesome-free/css/all.min.css > ./source/fonts/fontawesome/fontawesome.css

# copy spoqa-han-sans fonts from node_modules
cp -r ./node_modules/spoqa-han-sans/Subset/SpoqaHanSans/. ./source/fonts/spoqahansans/
sed 's/\.\.\/Subset\/SpoqaHanSans/\/fonts\/spoqahansans/g' ./node_modules/spoqa-han-sans/css/SpoqaHanSans-kr.css > ./source/fonts/spoqahansans/SpoqaHanSans-kr.css

# copy noto-sans-kr fonts from node_modules
cp -r ./node_modules/typeface-noto-sans-kr/files/. ./source/fonts/notosanskr/
sed 's/\.\/files/\/fonts\/notosanskr/g' ./node_modules/typeface-noto-sans-kr/index.css > ./source/fonts/notosanskr/NotoSansKR.css
