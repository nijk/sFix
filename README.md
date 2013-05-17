Make DOM elements sticky as you scroll. ([See Demo](http://nijk.github.com/jQuery-sFix/))

## Usage

###HTML
<pre><div class="container">
  div id="starter">
      <h2>Scroll me down...</h2>
  </div>
  <div class="sticky">
      <p>Sticky item</p>
  </div>
  <div id="ender"></div>
</pre>

###CSS
<pre>
  .sticky-wrapper{width:100%;}
  .sticky-wrapper.stuck{position:fixed; bottom:0;}
</pre>

###JS
**Plugin callback**</br>
<pre>
  $('.sticky').sFix({start:100, end:500});
</pre>

**Custom events listener**</br>
<pre>
  $('body').on('sFix.stuck sFix.unstuck', function(e){
      //console.log('Sticky fix fired event', e.type + '.' + e.namespace);
  });
</pre>

### Defaults
**start: integer [optional]. Default = 0**<br>
Number of pixels from the top of the screen at which the sticky element will get the 'stuck' class

**end: integer [optional]. Default = 0**<br>
Number of pixels from the top of the screen at which the sticky element will lose the 'stuck' class

**resizeEvent: string [optional]. Default = 'resize'**<br>
If you wish to provide a custom (debounced/throttled) event type into the plugin, this will be used instead


### Destroying
To be added