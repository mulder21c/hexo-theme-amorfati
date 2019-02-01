# hexo-theme-amorfati

## 언어

[English](https://github.com/mulder21c/hexo-theme-amorfati)

## 데모

[제작자 블로그](https://mulder21c.github.io)나 [데모 사이트](http://mulder21c.github.io/hexo-theme-amorfati)를
참고하세요.

![screenshot](../../screenshot.png)

## 지원 브라우저

- modern browsers
- IE 10+

## 기능

- 반응형 디자인
- 웹 접근성
- 부제목
- SEO 친화적
  + JSONLD 지원
  + link rel 타입 지원
    - `<link rel="cannonical" ...>`
    - `<link rel="archives ...>`
    - `<link rel="first ...>`
    - `<link rel="prev ...>`
    - `<link rel="next ...>`
  + 게시글 별 오픈 그래프 및 JSONLD 데이터 지원
  + 웹 사이트 소유권 확인을 위한 설정 지원
    - google
    - bing
    - naver
- 게시글 별 부가 스타일
- 덧글
  - LiveRe (한국형 서비스)
  - Disqus
- 360° 사진/비디오
    via Google VR
- 웹폰트 로더
- 블로그 작성자의 SNS 링크
- 외부 링크
- 애널리틱스


## 설치

먼저, 이 저장소를 복제하세요.

> 이 테마는 범용성을 위해(?) 기본 폰트로 Noto Sans KR을 사용합니다. [제작자 블로그](https://mulder21c.github.io)와
> 같이 세리프 폰트를 기본 폰트로 사용한 테마는 별도 브랜치에 올라가 있습니다. [세리프 테마 안내](#세리프-테마-안내)를
> 참고해주세요.

```bash
$ cd your/hexo/directory
$ git clone -b master --single-branch --depth=1 https://github.com/mulder21c/hexo-theme-amorfati.git themes/amorfati
```

이후, 의존성 패키지들을 설치합니다.

> 이 프로세스는 테마에 요구되는 웹 폰트들을 설치하고 폰트와 CSS 파일을 테마의 디렉토리에 삽입하는 것을 포함합니다.
> `copy-resource.sh` 파일을 참고하세요.

```bash
$ cd themes/amorfati
$ npm install
```

## 설정

[_config.yml.example](../../_config.yml.example)를 참고하세요.

### Hero

Hero에 설정된 이미지는 홈(home), (아카이브 같은) 목록 레이아웃 페이지들의 상단에 노출됩니다. <br>
hero는 객체 또는 URL 문자열로 설정할 수 있습니다.

```yaml
hero:
  url:
  width:
  height:
  size:
  position:

```
- `url`: hero로 사용하려는 이미지 URL
- `width`: 너비
- `height`: 높이
- `size`: background-size의 값에 해당하는 문자열
- `position`: background-position의 값에 해당하는 문자열

이미지의 치수를 설정하면, 이 값들은 JSONLD에 사용될 수 있습니다.

또는

```yaml
hero:

```
`hero`: 이 경우, hero로 사용하기 원하는 이미지의 URL

#### 예제

```yaml
hero:
  url: /upload/hero.jpg
  width: 980
  height: 550

```
```yaml
hero:
  url: /upload/hero.jpg
  width: 980
  height: 550
  position: center top

```

### 프로필

```yaml
profile:
  gravatar:
  social:
    github:
    facebook:
    linkedin:
    instagram:
    twitter:
    flickr:
    rss:

```

- `gravatar`: 이 항목의 값을 설정하면, 게시글 페이지에 작성자로 노출됩니다.
- `social`: 각 항목을 설정하면, 사이드바 내비게이션의 하단에 SNS 링크가 노출됩니다.

#### 예제

```yaml
profile:
  gravatar: /upload/gravatar.png
  social:
    github: https://github.com/mulder21c
    facebook: https://www.facebook.com/mulder21c
    linkedin:
    instagram:
    twitter:
    flickr:
    rss:

```

### 사이트 소유권 확인

```yaml
site_verification:
  enable:
  google:
  naver:
  bing:

```

- `enable`: 사이트 소유권 확인 사용 여부<br> `false`로 설정할 경우에는, 각 항목들이 값이 있더라도 적용되지 않습니다.
- `google`: google 소유권 확인 문자열
- `naver`: naver 소유권 확인 문자열
- `bing`: bing 소유권 확인 문자열


### 애널리틱스

```yaml
analytics:
  google:
  naver:

```

- `google`: GA_TRACKING_ID
- `naver`: na_account_id

### 웹 폰트

```yaml
webfonts:
  uses:
  extraFonts:

```

- `uses`: 사용할 폰트 이름 배열
- `extraFronts`: 기본 폰트 외 다른 폰트들의 이름과 URL로 구성된 객체의 배열

#### 예제

- 기본 폰트 사용

  ```yaml
  webfonts:
    uses: ['Noto Sans Kr', 'Font Awesome']
    extraFonts:

  ```

- 기본 폰트 외 다른 폰트 사용

  ```yaml
  webfonts:
    uses: ['Lato', 'Font Awesome']
    extraFonts:
      - famliy: 'Lato'
        url: 'https://fonts.googleapis.com/css?family=Lato'

  ```

  **Note**: 테마 기본 폰트가 `Noto Sans KR`이기 때문에, 기본 폰트로 다른 폰트를 사용하려면
  `source/css/partials/_typography.scss` 파일의 폰트 이름을 변경해야 합니다.

### 외부 링크

```yaml
  links:

```

- `links`: 노출시키려는 이름과 URL로 구성된 객체의 배열

이 항목을 설정하면, 사이드바 내비게이션의 외부 링크 영역에 노출됩니다.

#### 예

```yaml
  links:
    - name: Ask
      url: https://ask.fm/myask
```

### 덧글

```yaml
liveRe:
  uid:

disqus:
  shortname:

```

사용하기 원하는 덧글 플랫폼을 설정하세요.

## Front matter

[post.md](../../post.md)에서 전체 설정을 볼 수 있습니다.

### 부제목

```yaml
title:
subtitle:

```

- `subtitle`: 부제목

### 덧글 비활성화

```yaml
title:
comment:

```

- `comment`: 특정 게시글에 덧글을 사용을 원하지 않을 경우 이 값을 `false`로 설정하세요.

### 360° 뷰어

```yaml
title:
viewer360:
  use:
  className:

```

- `use`: 360° 뷰어 사용 여부. `true`나 `false`로 설정할 수 있습니다.
- `className': 360° 뷰어 컨테이너의 클래스명

360 뷰어를 사용하려면, 다음과 같이 작성해야 합니다.

```html
<!-- Here is an example -->
<div class="viewer360"
  data-src="/your/360/image.jpg"
  data-width="800"
  data-height="600">
</div>

```

- `class`: 이 값은 front matter에 설정한 클래스명과 동일해야 합니다.
- `data-src`: 360° 이미지 (혹은 비디오)의 URL
- `data-width`: 뷰어 컨테이너의 너비
- `data-height`: 뷰어 컨테이너의 높이

### 게시글 별 hero

```yaml
title:
hero:
  url:
  width:
  height:
  size:
  position:

```
- `hero.url`: hero로 사용하려는 이미지 URL
- `hero.width`: 너비
- `hero.height`: 높이
- `hero.size`: background-size의 값에 해당하는 문자열
- `hero.position`: background-position의 값에 해당하는 문자열

또는,

```yaml
title:
hero:

```

- `hero`: 이 경우, hero로 사용하기 원하는 이미지의 URL


### 게시글 목록에 대한 썸네일

```yaml
title:
thumbnail:

```

`thumbnail`: 게시글 목록에 노출하려는 썸네일 이미지 URL

**Note:** *이 설정은 게시글 목록에만 영향을 줍니다.*

### 게시글 별 오픈 그래프와 JSONLD

```yaml
title:
seo:
  description:
  author:
  image:
  genre:

```

- `description`: 이 값은`<meta name="description" ...>`, 오픈 그래프, JSONLD에 영향을 줍니다.
- `author`: 이 값은 JSONLD에 영향을 줍니다.
- `image`: 이 값은 오픈 그래프와 JSONLD에 영향을 줍니다.
- `genre`: 이 값은 JSONLD에 영향을 줍니다.

### 게시글 별 스타일

CSS 또는 SCSS로 게시글 별 부가 스타일을 생성할 수 있고, 이 스타일은 head 요소에 `<style>...</style>`로
렌더링 됩니다.

```yaml
title:
style:

```

#### 예제

```yaml
title:
style: |
  .article__content {
    small: {
      font-size: $smallest-font-size;
    }
  }
```

## 파일 구조

### Pug 구조

    ./layout
      ├── elements
      │      ├── article
      │      │     ├── meta.pug           # 아티클의 상단에 위치하는 메타 정보
      │      │     └── tags.pug           # 아티클의 하단에 위치하는 태그 목록
      │      │
      │      ├── foot                   # </body> 바로 위에 사용되는 컴포넌트
      │      │     └── js-plugins.pug     # 문서의 끝에 위치하는 자바스크립트 컴포넌트
      │      │
      │      ├── head                   # <head>...</head> 내에 사용되는 컴포넌트들
      │      │     ├── analytics.pug
      │      │     ├── icons.pug
      │      │     ├── jsonld.pug
      │      │     ├── links.pug
      │      │     ├── opengraph.pug
      │      │     ├── preload.pug
      │      │     ├── style.pug
      │      │     ├── title.pug
      │      │     └── verify-website.pug
      │      │
      │      ├── comment.pug              # 덧글 컴포넌트
      │      └── pagination.pug           # 페이징 컴포넌트
      │
      ├── partials
      │      ├── article.pug
      │      ├── container.pug
      │      ├── foot.pug
      │      ├── footer.pug
      │      ├── head.pug
      │      ├── header.pug
      │      ├── layout.pug
      │      ├── post-list.pug
      │      └── sidebar.pug
      ├── archive.pug
      ├── category.pug
      ├── index.pug
      ├── page.pug
      ├── post.pug
      └── tag.pug

### SCSS 구조

    ./source/css
      ├── helpers
      │      ├── _mixins.scss             # Most used mixins
      │      └── _placeholder.scss        # Most used placeholder
      │
      ├── modules
      │      ├── _functions.scss          # Global functions
      │      ├── _reset.scss              # Reset
      │      └── _variables.scss          # Global variables
      │
      ├── partials
      │      ├── _elements.scss           # Set of elements
      │      ├── _layout.scss             # Global parts of the layout
      │      └── _typography.scss         # Typography settings and declarations
      │
      ├── dracula.scss                    # Highlight.js dracular theme
      └── style.scss                      # Primary scss file

## 세리프 테마 안내

이 테마를 제작할 때 본래 의도는 블로그 글을 읽는 행위에 집중 할 수 있도록 최대한 부수적인 것들을 버리고, 폰트 역시
긴 글을 읽을 때에도 피로감을 줄일 수 있도록 세리프 폰트를 기본 폰트로 사용하고 산세리프 폰트는 제목 정도에만
사용하도록 하는 것이었습니다.

때문에 웹 상에서도 잘 표현되는 세리프 폰트를 사용하기 위해 이롭게 바탕체를 기본 폰트로 하고, 헤더 영역 정도에만
Spoqa Han Sans를 사용하도록 하여 현재 개인 블로그에 적용되어 있습니다.

### 설치

`master` 대신 `korean-serif` 브랜치를 체크아웃 받으시면 됩니다. <br>
아직 clone 전인 경우라면 아래 코드를 참고하여 `korean-serif` 브랜치를 바로 클론 받으실 수 있습니다.

```bash
$ cd your/hexo/directory
$ git clone -b korean-serif --single-branch --depth=1 https://github.com/mulder21c/hexo-theme-amorfati.git themes/amorfati
```

### 적용 폰트

이롭게 바탕체와 Spoqa Han Sans를 각각 주/부 폰트로 사용함에 따라 각각의 일반 굵기에 해당하는 폰트를 `preload`로
설정하여 폰트를 가능한 미리 다운로드 받아 둘 수 있도록 합니다. <br>
따라서, 이 브랜치를 적용 후 주/부 폰트를 변경하실 경우에는 반드시 preload 값도 변경하셔야 불필요한 네트워크 사용을
줄일 수 있습니다.
