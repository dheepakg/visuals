---
# title: Visual Sitemap
date: 2023-07-30
sidebar: false
# menu: main
---
# Visual Sitemap

This is a visual arrangement of blog posts over the years.

{{< notice tip >}} Each lines represent an year, with published date as dots.
Number at the end shows number of posts published over an year {{< /notice >}}








  <style>
    .tooltip {
      position: absolute;
      font-family: monospace;
      pointer-events: none;
      background: silver;
      color: black;
      /* width: 400px; */
      text-align: left;
      border-radius: 6px;
      padding: 5px 5px;
      left: 50%;
      margin-left: -60px;
      z-index: 1;
    }

    .tooltip::after {
      content: "";
      position: relative;
      top: 100%;
      /* left: 0; */
      margin-left: -5px;
      border-width: 8px;
      border-style: solid;
      border-color: transparent transparent transparent transparent;
    }
  </style>
  <body>
    <div class="canvas"></div>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"></script>
    <script src="index.js"></script>
  </body>

