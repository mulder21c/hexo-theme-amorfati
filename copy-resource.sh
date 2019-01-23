ls ./source/fonts || mkdir ./source/fonts
ls ./source/js || mkdir ./source/js
ls ./source/tmp || mkdir ./source/tmp

# copy webfontloader from node_modules
cp ./node_modules/webfontloader/webfontloader.js ./source/js/webfontloader.js

# copy fontawesome fonts from node_modules
cp -r ./node_modules/@fortawesome/fontawesome-free/webfonts/. ./source/fonts/fontawesome/
# copy fontawesome css file and replace webfont font path
sed 's/\.\.\/webfonts\///g' ./node_modules/@fortawesome/fontawesome-free/css/all.min.css > ./source/fonts/fontawesome/fontawesome.css

# copy spoqa-han-sans fonts from node_modules
cp -r ./node_modules/spoqa-han-sans/Subset/SpoqaHanSans/. ./source/fonts/spoqahansans/
sed 's/\.\.\/Subset\/SpoqaHanSans\///g' ./node_modules/spoqa-han-sans/css/SpoqaHanSans-kr.css > ./source/fonts/spoqahansans/SpoqaHanSans-kr.css

# copy noto-sans-kr fonts from node_modules
cp -r ./node_modules/typeface-noto-sans-kr/files/. ./source/fonts/notosanskr/
sed 's/\.\/files\///g' ./node_modules/typeface-noto-sans-kr/index.css > ./source/fonts/notosanskr/NotoSansKR.css

# copy hack fonts form node_modules
cp -r ./node_modules/hack-font/build/web/fonts/. ./source/fonts/hack/
sed 's/fonts\///g' ./node_modules/hack-font/build/web/hack.css > ./source/fonts/hack/hack.css

# copy iropke fonts from github
git clone -b master --single-branch --depth=1 https://github.com/iropke/font-iropke-batang.git ./source/tmp/iropke
rm ./source/tmp/iropke/.git -r -f
rm ./source/tmp/iropke/*.zip -f
cp -r ./source/tmp/iropke/. ./source/fonts/iropke/
sed 's/\/\/cdn\.jsdelivr\.net\/font\-iropke-batang\/1\.2\///g' ./source/tmp/iropke/font-iropke-batang.css > ./source/fonts/iropke/iropke.css
rm ./source/tmp/ -r -f