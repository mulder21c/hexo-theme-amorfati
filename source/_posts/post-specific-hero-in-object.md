---
title: post-specific hero in object
date: 2019-01-21 15:53:01
category: Front matter
hero:
  url: https://farm1.staticflickr.com/817/40620740124_9285c8b565_b.jpg
  width: 1024   # this value is optional
  height: 324
---

You can set the post-specific hero separately from the theme's hero settings.

This setting affects the open graph and JSONLD.
If there is a hero in the theme setting and you set a post-specific hero, the open graph will generate multiple images, and JSONLD will take precedence over post-specific hero.

## Examples

### case 1 &mdash; in Object

```yaml
title: post-specific hero in object
date: 2019-01-21 15:53:01
category: Front matter
hero:
  url: https://farm1.staticflickr.com/817/40620740124_9285c8b565_b.jpg
  width: 1024   # this value is optional
  height: 324   # this value is optional

```

You can config url, width and height for hero.
The width and height are optional, but JSONLD reflects these values when you set.

If you set up hero, you can find the generated code as follows.

```html
<head>
  ...
  <link rel="preload" as="image" href="https://farm1.staticflickr.com/817/40620740124_9285c8b565_b.jpg">
  ...
  <meta property="og:image" content="https://farm1.staticflickr.com/817/40620740124_9285c8b565_b.jpg">
  ...
  <meta name="twitter:image" content="https://farm1.staticflickr.com/817/40620740124_9285c8b565_b.jpg">
  ...
  <script type="application/ld+json">
    ...
    "image": {
      "@type": "imageObject",
      "url": "https://farm1.staticflickr.com/817/40620740124_9285c8b565_b.jpg",
      "width": 1024,
      "height": 324,
    }
    ...
  </script>
</head>
```

### case 2 &mdash; in URL String

```yaml
title: post-specific hero in object
date: 2019-01-21 15:53:01
category: Front matter
hero: https://farm1.staticflickr.com/817/40620740124_9285c8b565_b.jpg

```
Then, you can find the generated code as follows.

```html
<head>
  ...
  <link rel="preload" as="image" href="https://farm1.staticflickr.com/817/40620740124_9285c8b565_b.jpg">
  ...
  <meta property="og:image" content="https://farm1.staticflickr.com/817/40620740124_9285c8b565_b.jpg">
  ...
  <meta name="twitter:image" content="https://farm1.staticflickr.com/817/40620740124_9285c8b565_b.jpg">
  ...
  <script type="application/ld+json">
    ...
    "image": {
      "@type": "imageObject",
      "url": "https://farm1.staticflickr.com/817/40620740124_9285c8b565_b.jpg",
      "width": null,
      "height": null,
    }
    ...
  </script>
</head>
```