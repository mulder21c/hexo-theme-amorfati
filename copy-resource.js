const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const {F_OK, COPYFILE_FICLONE} = fs.constants;
const fontAwesome = path.join(path.dirname(require.resolve('@fortawesome/fontawesome-free')), '../');
const spoqaHanSans = path.dirname(require.resolve('spoqa-han-sans/README.md'));
const notoSansKr = path.dirname(require.resolve('typeface-noto-sans-kr'));
const webfontLoader = require.resolve('webfontloader');
const hackFont = path.dirname(require.resolve('hack-font/README.md'));
const iropke = path.join(__dirname, 'source/tmp');



async function checkDirectory(name) {
  let sourcePath = path.join('./source', name);

  await fs.access(path.join(__dirname, sourcePath), F_OK, (err) => {
    if(err) fs.mkdirSync(path.join(__dirname, sourcePath));
  });

  return path.join(__dirname, sourcePath);
}

checkDirectory('fonts')
.then( base => {
  // copy fontawesome
  fs.copy(path.join(fontAwesome, 'webfonts'), path.join(base, 'fontawesome'), err => {
    if(err) console.error(err)
    console.log(`Copying fontAwesome: font files copied!`)
  })
  fs.readFile(path.join(fontAwesome, 'css/all.min.css'), 'utf8', (err, data) => {
    if(err || !data) {
      console.error(`Can't read ${path.join(fontAwesome, 'css/all.min.css')}`)
      return;
    }
    let css = data.toString().replace(/\.\.\/webfonts\//g, '') ;

    fs.writeFile(path.join(base, 'fontawesome/fontawesome.css'), css, 'utf8', err => {
      if(err) console.error(err);
      console.log(`Copying fontAwesome: css file copied`)
    })
  })

  // copy SpoqaHansSans
  fs.copy(path.join(spoqaHanSans, './Subset/SpoqaHanSans'), path.join(base, 'spoqahansans'), err => {
    if(err) console.error(err)
    console.log(`Copying SpoqaHanSans: font files copied!`)
  })
  fs.readFile(path.join(spoqaHanSans, 'css/SpoqaHanSans-kr.css'), 'utf8', (err, data) => {
    if(err || !data) {
      console.error(`Can't read ${path.join(spoqaHanSans, 'css/SpoqaHanSans-kr.css')}`)
      return;
    }
    let css = data.toString().replace(/\.\.\/Subset\/SpoqaHanSans\//g, '') ;

    fs.writeFile(path.join(base, 'spoqahansans/SpoqaHanSans-kr.css'), css, 'utf8', err => {
      if(err) console.error(err);
      console.log(`Copying SpoqaHanSans: css file copied`)
    })
  })

  // copy NotoSansKR
  fs.copy(path.join(notoSansKr, './files'), path.join(base, 'notosanskr'), err => {
    if(err) console.error(err)
    console.log(`Copying NotoSansKr: font files copied!`)
  })
  fs.readFile(path.join(notoSansKr, 'index.css'), 'utf8', (err, data) => {
    if(err || !data) {
      console.error(`Can't read ${path.join(notoSansKr, 'index.css')}`)
      return;
    }
    let css = data.toString().replace(/\.\/files\//g, '') ;

    fs.writeFile(path.join(base, 'notosanskr/NotoSansKR.css'), css, 'utf8', err => {
      if(err) console.error(err);
      console.log(`Copying NotoSansKr: css file copied`)
    })
  })

  // copy Hack Font
  fs.copy(path.join(hackFont, 'build/web/fonts/'), path.join(base, 'hack'), err => {
    if(err) console.error(err)
    console.log(`Copying Hack Font: font files copied!`)
  })
  fs.readFile(path.join(hackFont, 'build/web/hack.css'), 'utf8', (err, data) => {
    if(err || !data) {
      console.error(`Can't read ${path.join(hackFont, 'build/web/hack.css')}`)
      return;
    }
    let css = data.toString().replace(/fonts\//g, '') ;

    fs.writeFile(path.join(base, 'hack/hack.css'), css, 'utf8', err => {
      if(err) console.error(err);
      console.log(`Copying Hack Font: css file copied`)
    })
  })

  // copy iropke
  const source = glob.sync(path.join(iropke, '*.{eot,woff,ttf,otf}'));
  const iropkeCSS = fs.readFileSync(path.join(iropke, 'font-iropke-batang.css'), 'utf8');
  source.forEach(item => {
    fs.copySync(item, path.join(base, 'iropke', path.basename(item)))
  });
  console.log(`Copying Iropke Batang: font files copied!`)
  if(!iropkeCSS) {
    console.error(`Can't read ${path.join(iropke, 'font-iropke-batang.css')}`);
  } else {
    let css = iropkeCSS.toString().replace(/\/\/cdn\.jsdelivr\.net\/font\-iropke-batang\/1\.2\//g, '') ;

    fs.writeFileSync(path.join(base, 'iropke/iropke.css'), css, 'utf8')
    console.log(`Copying Iropke Batang: css files copied!`)
  }
  fs.removeSync(iropke)
})
.catch( err => console.log("An error occurred", err) )

checkDirectory('js')
.then( base => {
  fs.copyFile(webfontLoader, path.join(base, 'webfontloader.js'), COPYFILE_FICLONE, err => {
    if(err) console.error(err)
    console.log(`Copying WebfontLoader: copied!`)
  })
})
.catch( err => console.log("An error occurred", err) )
