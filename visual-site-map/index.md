This is a visual arrangement of blog posts over the years.

<p>
  Each
  <span style="color: #add8e6; font-weight:bold; ">lines</span>
  represents a year,  <span style="color: #0000EE; font-weight:bold; ">dot</span>
  -  the post published date.  While the <span style="color: #0000EE; font-weight:bold; ">number </span>
  on the right extreme is the number of posts. <tt> Today</tt>  represents current day in the year.
</p>







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

