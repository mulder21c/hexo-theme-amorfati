---
title: Post-specific Open Graph & JSONLD
date: 2019-01-22 10:32:08
category: Front matter
seo:
  description: This theme allows you to manually set the items for SEO.
  author: 멀더끙
  image:
    url: https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/SEO-Search_Engine_Optimization.png/748px-SEO-Search_Engine_Optimization.png
    width: 300
    height: 240
  genre: search engine optimization
---

The theme basically uses the hero and part of the content in front of the post as the data that SEO needs.

However, since this is not really appropriate or is not appropriate to be displayed when sharing to SNS, this theme provide that part so that you can set it up.

## Exapmle

```yaml
title: Post-specific Open Graph & JSONLD
date: 2019-01-22 10:32:08
category: Front matter
seo:
  description: This theme allows you to manually set the items for SEO.
  author: 멀더끙
  image:
    url: https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/SEO-Search_Engine_Optimization.png/748px-SEO-Search_Engine_Optimization.png
    width: 300
    height: 240
  genre: search engine optimization

```

An image entry can be represented by an object consisting of url, width, height, or a URL string.
Therefore, you can also:

```yaml
image: https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/SEO-Search_Engine_Optimization.png/748px-SEO-Search_Engine_Optimization.png
```

## Rendering Result

The rendering results before and after setting are as follows.

### Before

```html
<head>
  ...
  <meta name="description" content="The theme basically uses the hero and part of the content in front of the post as the data that SEO needs. However, since this is not really appropriate or is not appropriate to be displayed when shar">
  ...
  <meta property="og:description" content="The theme basically uses the hero and part of the content in front of the post as the data that SEO needs. However, since this is not really appropriate or is not appropriate to be displayed when shar">
  ...
  <meta name="twitter:description" content="The theme basically uses the hero and part of the content in front of the post as the data that SEO needs. However, since this is not really appropriate or is not appropriate to be displayed when shar">
  ...
  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      "headline": "Post-specific Open Graph & JSONLD",
      "alternativeHeadline": null,
      "image": {
        "@type": "imageObject",
        "url": null,
        "width": null,
        "height": null
      },
      "genre": null,
      "keywords": null,
      "editor": {
        "@type": "Person",
        "name": "John Doe"
      },
      "publisher": {
        "@type": "Person",
        "name": "John Doe"
      },
      "author": {
        "@type": "Person",
        "name": "John Doe"
      },
      "url": "https://mulder21c.github.io/hexo-theme-amorfati/2019/01/22/post-specific-open-graph-and-jsonld/",
      "dateCreated": "2019-01-22",
      "datePublished": "2019-01-22",
      "articleBody": "The theme basically uses the hero and part of the content in front of the post as the data that SEO needs. However, since this is not really appropriate or is not appropriate to be displayed when sharing to SNS, this theme provide that part so that you can set it up.   Exapmle      1  2"
    }
  </script>
  ...
</head>
```

### After

```html
<head>
  ...
  <meta name="description" content="This theme allows you to manually set the items for SEO.">
  ...
  <meta property="og:description" content="This theme allows you to manually set the items for SEO.">
  ...
  <meta property="og:image" content="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/SEO-Search_Engine_Optimization.png/748px-SEO-Search_Engine_Optimization.png">
  ...
  <meta name="twitter:description" content="This theme allows you to manually set the items for SEO.">
  <meta name="twitter:image" content="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/SEO-Search_Engine_Optimization.png/748px-SEO-Search_Engine_Optimization.png">
  ...
  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      "headline": "Post-specific Open Graph & JSONLD",
      "alternativeHeadline": null,
      "image": {
        "@type": "imageObject",
        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/SEO-Search_Engine_Optimization.png/748px-SEO-Search_Engine_Optimization.png",
        "width": "300",
        "height": "240"
      },
      "genre": "search engine optimization",
      "keywords": null,
      "editor": {
        "@type": "Person",
        "name": "멀더끙"
      },
      "publisher": {
        "@type": "Person",
        "name": "멀더끙"
      },
      "author": {
        "@type": "Person",
        "name": "멀더끙"
      },
      "url": "https://mulder21c.github.io/hexo-theme-amorfati/2019/01/22/post-specific-open-graph-and-jsonld/",
      "dateCreated": "2019-01-22",
      "datePublished": "2019-01-22",
      "articleBody": "This theme allows you to manually set the items for SEO."
    }
  </script>
</head>

```