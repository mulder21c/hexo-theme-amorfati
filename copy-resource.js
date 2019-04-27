const fs = require('fs-extra');
const path = require('path');
const {F_OK, COPYFILE_FICLONE} = fs.constants;
const fontAwesome = path.join(path.dirname(require.resolve('@fortawesome/fontawesome-free')), '../');
const spoqaHanSans = path.dirname(require.resolve('spoqa-han-sans/README.md'));
const notoSansKr = path.dirname(require.resolve('typeface-noto-sans-kr'));
const webfontLoader = require.resolve('webfontloader');

async function checkDirectory(name) {
  let sourcePath = path.join('./source', name);

  return new Promise( resolve => {
    fs.access(path.join(__dirname, sourcePath), F_OK, (err) => {
      if(err) {
        fs.mkdirSync(path.join(__dirname, sourcePath));
      }
      resolve(path.join(__dirname, sourcePath))
    });
  })
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
  })
  .catch( err => console.log("An error occurred", err) )

checkDirectory('js')
  .then( base => {
    fs.copyFile(webfontLoader, path.join(base, 'webfontloader.js'), COPYFILE_FICLONE, err => {
      if(err) console.error(err)
      console.log(`Copying WebfontLoader: copied!`)
    })
  })