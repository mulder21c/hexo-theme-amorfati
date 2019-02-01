---
title: post-specific-style
date: 2019-01-22 13:37:00
category: Front matter
style: |
  .article__content {
    p {
      transform: skew(-10deg, 0);
      @include respond-to('small') {
        color: #00f;
      }
    }
  }
---

You can generate any post-specific additional styles in css or SCSS.

Since it is intended to include `_variables.scss`, `_mixins.scss`, `_placeholder.scss` and `_function.scss`, you can use the variables, mixins, placeholders and functions defined in the SCSS sources.

It also includes autoprefixer and compressor.

## Example

```yaml
title: post-specific-style
date: 2019-01-22 13:37:00
style: |
  .article__content {
    p {
      transform: skew(-10deg, 0);
      @include respond-to('medium') {
        color: #00f;
      }
    }
  }

```

## Rendering Result

```html
<head>
  ...
  <style>
    .article__content p{-webkit-transform:skew(-10deg, 0);transform:skew(-10deg, 0)}@media (min-width: 736px){.article__content p{color:#00f}}
  </style>
  ...

</head>

```