# Information

  - Client side code is doing the work.
  - There are TODO items listed throughout the code that require inserting functions that are part of the old OceanAdapt website. This can be a dual effort. Many functions may not be as copy and paste as planned for in the new site files. We can collaborate to create a shared understanding of what is needed and implementation. Examples of TODO items:
     - Init of charts
     - Download form population
  - Single Page App (SPA)


# Installation

  - Should work out of the box with some caveats depending on environment:
    - relative URLs expect oceanadapt to be the root folder
    - a SSL cert is purchased and HTTPS URLs used
    - a modern browser is used
    - there is nothing restricting cross origin APIs and CDNs from being accessed
  - Content is loaded in dynamically based on values set in the pins object of map.js
  - Each object in the pins object is for a regional or national location
  - pins object contains URL to use for location content
  -

# Stack

  - HTML5 boilerplate
  - JS
  - jQuery
  - Bootstrap
  - Mapbox
  - modernizr


# Analytics

Google analytics is set up to use the same ID as the previous site
