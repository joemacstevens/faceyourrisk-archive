var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

(function(factory) {
  /* global define */
  /* istanbul ignore next */
  if ( typeof define === 'function' && define.amd ) {
    define(['jquery'], factory);
  } else if ( typeof module === 'object' && module.exports ) {
    // Node/CommonJS
    module.exports = function( root, jQuery ) {
      if ( jQuery === undefined ) {
        if ( typeof window !== 'undefined' ) {
          jQuery = require('jquery');
        } else {
          jQuery = require('jquery')(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function($) {
  'use strict';

  var $doc = $(document);
  var $win = $(window);

  var pluginName = 'selectric';
  var classList = 'Input Items Open Disabled TempShow HideSelect Wrapper Hover Responsive Above Scroll Group GroupLabel';
  var bindSufix = '.sl';

  var chars = ['a', 'e', 'i', 'o', 'u', 'n', 'c', 'y'];
  var diacritics = [
    /[\xE0-\xE5]/g, // a
    /[\xE8-\xEB]/g, // e
    /[\xEC-\xEF]/g, // i
    /[\xF2-\xF6]/g, // o
    /[\xF9-\xFC]/g, // u
    /[\xF1]/g,      // n
    /[\xE7]/g,      // c
    /[\xFD-\xFF]/g  // y
  ];

  /**
   * Create an instance of Selectric
   *
   * @constructor
   * @param {Node} element - The &lt;select&gt; element
   * @param {object}  opts - Options
   */
  var Selectric = function(element, opts) {
    var _this = this;

    _this.element = element;
    _this.$element = $(element);

    _this.state = {
      enabled     : false,
      opened      : false,
      currValue   : -1,
      selectedIdx : -1
    };

    _this.eventTriggers = {
      open    : _this.open,
      close   : _this.close,
      destroy : _this.destroy,
      refresh : _this.refresh,
      init    : _this.init
    };

    _this.init(opts);
  };

  Selectric.prototype = {
    utils: {
      /**
       * Detect mobile browser
       *
       * @return {boolean}
       */
      isMobile: function() {
        return /android|ip(hone|od|ad)/i.test(navigator.userAgent);
      },

      /**
       * Replace diacritics
       *
       * @param  {string} str - The string to replace the diacritics.
       * @return {string}       The string with diacritics replaced with ascii characters.
       */
      replaceDiacritics: function(str) {
        var k = diacritics.length;

        while (k--) {
          str = str.toLowerCase().replace(diacritics[k], chars[k]);
        }

        return str;
      },

      /**
       * Format string
       * https://gist.github.com/atesgoral/984375
       *
       * @param  {string} f - String to be formated
       * @return {string}     String formated
       */
      format: function (f) {
        var a = arguments; // store outer arguments
        return ('' + f) // force format specifier to String
          .replace( // replace tokens in format specifier
            /\{(?:(\d+)|(\w+))\}/g, // match {token} references
            function (
              s, // the matched string (ignored)
              i, // an argument index
              p // a property name
            ) {
              return p && a[1] // if property name and first argument exist
                ? a[1][p] // return property from first argument
                : a[i]; // assume argument index and return i-th argument
            });
      },

      /**
       * Get the next enabled item in the options list.
       *
       * @param  {object} selectItems - The options object.
       * @param  {number}    selected - Index of the currently selected option.
       * @return {object}               The next enabled item.
       */
      nextEnabledItem: function(selectItems, selected) {
        while ( selectItems[ selected = (selected + 1) % selectItems.length ].disabled ) {
          // empty
        }
        return selected;
      },

      /**
       * Get the previous enabled item in the options list.
       *
       * @param  {object} selectItems - The options object.
       * @param  {number}    selected - Index of the currently selected option.
       * @return {object}               The previous enabled item.
       */
      previousEnabledItem: function(selectItems, selected) {
        while ( selectItems[ selected = (selected > 0 ? selected : selectItems.length) - 1 ].disabled ) {
          // empty
        }
        return selected;
      },

      /**
       * Transform camelCase string to dash-case.
       *
       * @param  {string} str - The camelCased string.
       * @return {string}       The string transformed to dash-case.
       */
      toDash: function(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      },

      /**
       * Calls the events and hooks registered with function name.
       *
       * @param {string}    fn - The name of the function.
       * @param {number} scope - Scope that should be set on the function.
       */
      triggerCallback: function(fn, scope) {
        var elm = scope.element;
        var func = scope.options['on' + fn];

        if ( $.isFunction(func) ) {
          func.call(elm, elm, scope);
        }

        if ( $.fn[pluginName].hooks[fn] ) {
          $.each($.fn[pluginName].hooks[fn], function() {
            this.call(elm, elm, scope);
          });
        }

        $(elm).trigger(pluginName + '-' + this.toDash(fn), scope);
      }
    },

    /** Initializes */
    init: function(opts) {
      var _this = this;

      // Set options
      _this.options = $.extend(true, {}, $.fn[pluginName].defaults, _this.options, opts);

      _this.utils.triggerCallback('BeforeInit', _this);

      // Preserve data
      _this.destroy(true);

      // Disable on mobile browsers
      if ( _this.options.disableOnMobile && _this.utils.isMobile() ) {
        _this.disableOnMobile = true;
        return;
      }

      // Get classes
      _this.classes = _this.getClassNames();

      // Create elements
      var input        = $('<input/>', { 'class': _this.classes.input, 'readonly': _this.utils.isMobile() });
      var items        = $('<div/>',   { 'class': _this.classes.items, 'tabindex': -1 });
      var itemsScroll  = $('<div/>',   { 'class': _this.classes.scroll });
      var wrapper      = $('<div/>',   { 'class': _this.classes.prefix, 'html': _this.options.arrowButtonMarkup });
      var label        = $('<p/>',     { 'class': 'label' });
      var outerWrapper = _this.$element.wrap('<div/>').parent().append(wrapper.prepend(label), items, input);

      _this.elements = {
        input        : input,
        items        : items,
        itemsScroll  : itemsScroll,
        wrapper      : wrapper,
        label        : label,
        outerWrapper : outerWrapper
      };

      _this.$element
        .on(_this.eventTriggers)
        .wrap('<div class="' + _this.classes.hideselect + '"/>');

      _this.originalTabindex = _this.$element.prop('tabindex');
      _this.$element.prop('tabindex', false);

      _this.populate();
      _this.activate();

      _this.utils.triggerCallback('Init', _this);
    },

    /** Activates the plugin */
    activate: function() {
      var _this = this;
      var originalWidth = _this.$element.width();

      _this.utils.triggerCallback('BeforeActivate', _this);

      _this.elements.outerWrapper.prop('class', [
        _this.classes.wrapper,
        _this.$element.prop('class').replace(/\S+/g, _this.classes.prefix + '-$&'),
        _this.options.responsive ? _this.classes.responsive : ''
      ].join(' '));

      if ( _this.options.inheritOriginalWidth && originalWidth > 0 ) {
        _this.elements.outerWrapper.width(originalWidth);
      }

      if ( !_this.$element.prop('disabled') ) {
        _this.state.enabled = true;

        // Not disabled, so... Removing disabled class
        _this.elements.outerWrapper.removeClass(_this.classes.disabled);

        // Remove styles from items box
        // Fix incorrect height when refreshed is triggered with fewer options
        _this.$li = _this.elements.items.removeAttr('style').find('li');

        _this.bindEvents();
      } else {
        _this.elements.outerWrapper.addClass(_this.classes.disabled);
        _this.elements.input.prop('disabled', true);
      }

      _this.utils.triggerCallback('Activate', _this);
    },

    /**
     * Generate classNames for elements
     *
     * @return {object} Classes object
     */
    getClassNames: function() {
      var _this = this;
      var customClass = _this.options.customClass;
      var classesObj  = {};

      $.each(classList.split(' '), function(i, currClass) {
        var c = customClass.prefix + currClass;
        classesObj[currClass.toLowerCase()] = customClass.camelCase ? c : _this.utils.toDash(c);
      });

      classesObj.prefix = customClass.prefix;

      return classesObj;
    },

    /** Set the label text */
    setLabel: function() {
      var _this = this;
      var labelBuilder = _this.options.labelBuilder;
      var currItem = _this.lookupItems[_this.state.currValue];

      _this.elements.label.html(
        $.isFunction(labelBuilder)
          ? labelBuilder(currItem)
          : _this.utils.format(labelBuilder, currItem)
      );
    },

    /** Get and save the available options */
    populate: function() {
      var _this = this;
      var $options = _this.$element.children();
      var $justOptions = _this.$element.find('option');
      var selectedIndex = $justOptions.index($justOptions.filter(':selected'));
      var currIndex = 0;

      _this.state.currValue = (_this.state.selected = ~selectedIndex ? selectedIndex : 0);
      _this.state.selectedIdx = _this.state.currValue;
      _this.items = [];
      _this.lookupItems = [];

      if ( $options.length ) {
        // Build options markup
        $options.each(function(i) {
          var $elm = $(this);

          if ( $elm.is('optgroup') ) {

            var optionsGroup = {
              element       : $elm,
              label         : $elm.prop('label'),
              groupDisabled : $elm.prop('disabled'),
              items         : []
            };

            $elm.children().each(function(i) {
              var $elm = $(this);
              var optionText = $elm.html();

              optionsGroup.items[i] = {
                index    : currIndex,
                element  : $elm,
                value    : $elm.val(),
                text     : optionText,
                slug     : _this.utils.replaceDiacritics(optionText),
                disabled : optionsGroup.groupDisabled
              };

              _this.lookupItems[currIndex] = optionsGroup.items[i];

              currIndex++;
            });

            _this.items[i] = optionsGroup;

          } else {

            var optionText = $elm.html();

            _this.items[i] = {
              index    : currIndex,
              element  : $elm,
              value    : $elm.val(),
              text     : optionText,
              slug     : _this.utils.replaceDiacritics(optionText),
              disabled : $elm.prop('disabled')
            };

            _this.lookupItems[currIndex] = _this.items[i];

            currIndex++;

          }
        });

        _this.setLabel();
        _this.elements.items.append( _this.elements.itemsScroll.html( _this.getItemsMarkup(_this.items) ) );
      }
    },

    /**
     * Generate options markup
     *
     * @param  {object} items - Object containing all available options
     * @return {string}         HTML for the options box
     */
    getItemsMarkup: function(items) {
      var _this = this;
      var markup = '<ul>';

      $.each(items, function(i, elm) {
        if ( elm.label !== undefined ) {

          markup += _this.utils.format('<ul class="{1}"><li class="{2}">{3}</li>',
            $.trim([_this.classes.group, elm.groupDisabled ? 'disabled' : '', elm.element.prop('class')].join(' ')),
            _this.classes.grouplabel,
            elm.element.prop('label')
          );

          $.each(elm.items, function(i, elm) {
            markup += _this.getItemMarkup(elm.index, elm);
          });

          markup += '</ul>';

        } else {

          markup += _this.getItemMarkup(elm.index, elm);

        }
      });

      return markup + '</ul>';
    },

    /**
     * Generate every option markup
     *
     * @param  {number} i   - Index of current item
     * @param  {object} elm - Current item
     * @return {string}       HTML for the option
     */
    getItemMarkup: function(i, elm) {
      var _this = this;
      var itemBuilder = _this.options.optionsItemBuilder;

      return _this.utils.format('<li data-index="{1}" class="{2}">{3}</li>',
        i,
        $.trim([
          i === _this.state.currValue  ? 'selected' : '',
          i === _this.items.length - 1 ? 'last'     : '',
          elm.disabled                 ? 'disabled' : ''
        ].join(' ')),
        $.isFunction(itemBuilder) ? itemBuilder(elm, elm.element, i) : _this.utils.format(itemBuilder, elm)
      );
    },

    /** Bind events on the elements */
    bindEvents: function() {
      var _this = this;

      _this.elements.wrapper
        .add(_this.$element)
        .add(_this.elements.outerWrapper)
        .add(_this.elements.input)
        .off(bindSufix);

      _this.elements.outerWrapper.on('mouseenter' + bindSufix + ' mouseleave' + bindSufix, function(e) {
        $(this).toggleClass(_this.classes.hover, e.type === 'mouseenter');

        // Delay close effect when openOnHover is true
        if ( _this.options.openOnHover ) {
          clearTimeout(_this.closeTimer);

          if ( e.type === 'mouseleave' ) {
            _this.closeTimer = setTimeout($.proxy(_this.close, _this), _this.options.hoverIntentTimeout);
          } else {
            _this.open();
          }
        }
      });

      // Toggle open/close
      _this.elements.wrapper.on('click' + bindSufix, function(e) {
        _this.state.opened ? _this.close() : _this.open(e);
      });

      _this.elements.input
        .prop({ tabindex: _this.originalTabindex, disabled: false })
        .on('keypress' + bindSufix, _this.handleSystemKeys)
        .on('keydown' + bindSufix, function(e) {
          _this.handleSystemKeys(e);

          // Clear search
          clearTimeout(_this.resetStr);
          _this.resetStr = setTimeout(function() {
            _this.elements.input.val('');
          }, _this.options.keySearchTimeout);

          var key = e.keyCode || e.which;

          // If it's a directional key
          // 37 => Left
          // 38 => Up
          // 39 => Right
          // 40 => Down
          if ( key > 36 && key < 41 ) {
            if ( !_this.options.allowWrap ) {
              if ( (key < 39 && _this.state.selectedIdx === 0) || (key > 38 && (_this.state.selectedIdx + 1) === _this.items.length) ) {
                return;
              }
            }

            _this.select(_this.utils[(key < 39 ? 'previous' : 'next') + 'EnabledItem'](_this.items, _this.state.selectedIdx));
          }
        })
        .on('focusin' + bindSufix, function(e) {
          _this.state.opened || _this.open(e);
        })
        .on('oninput' in _this.elements.input[0] ? 'input' : 'keyup', function() {
          if ( _this.elements.input.val().length ) {
            // Search in select options
            $.each(_this.items, function(i, elm) {
              if ( RegExp('^' + _this.elements.input.val(), 'i').test(elm.slug) && !elm.disabled ) {
                _this.select(i);
                return false;
              }
            });
          }
        });

      _this.$li.on({
        // Prevent <input> blur on Chrome
        mousedown: function(e) {
          e.preventDefault();
          e.stopPropagation();
        },
        click: function() {
          // The second parameter is to close the box after click
          _this.select($(this).data('index'), true);

          // Chrome doesn't close options box if select is wrapped with a label
          // We need to 'return false' to avoid that
          return false;
        }
      });
    },

    /**
     * Behavior when system keys is pressed
     *
     * @param {object} e - Event object
     */
    handleSystemKeys: function(e) {
      var _this = this;
      var key = e.keyCode || e.which;

      if ( key == 13 ) {
        e.preventDefault();
      }

      // Tab / Enter / ESC
      if ( /^(9|13|27)$/.test(key) ) {
        e.stopPropagation();
        _this.select(_this.state.selectedIdx, true);
      }
    },

    /** Update the items object */
    refresh: function() {
      var _this = this;

      _this.populate();
      _this.activate();
      _this.utils.triggerCallback('Refresh', _this);
    },

    /** Set options box width/height */
    setOptionsDimensions: function() {
      var _this = this;

      // Calculate options box height
      // Set a temporary class on the hidden parent of the element
      var hiddenChildren = _this.elements.items.closest(':visible').children(':hidden').addClass(_this.classes.tempshow);
      var maxHeight = _this.options.maxHeight;
      var itemsWidth = _this.elements.items.outerWidth();
      var wrapperWidth = _this.elements.wrapper.outerWidth() - (itemsWidth - _this.elements.items.width());

      // Set the dimensions, minimum is wrapper width, expand for long items if option is true
      if ( !_this.options.expandToItemText || wrapperWidth > itemsWidth ) {
        _this.finalWidth = wrapperWidth;
      } else {
        // Make sure the scrollbar width is included
        _this.elements.items.css('overflow', 'scroll');

        // Set a really long width for _this.elements.outerWrapper
        _this.elements.outerWrapper.width(9e4);
        _this.finalWidth = _this.elements.items.width();
        // Set scroll bar to auto
        _this.elements.items.css('overflow', '');
        _this.elements.outerWrapper.width('');
      }

      _this.elements.items.width(_this.finalWidth).height() > maxHeight && _this.elements.items.height(maxHeight);

      // Remove the temporary class
      hiddenChildren.removeClass(_this.classes.tempshow);
    },

    /** Detect if the options box is inside the window */
    isInViewport: function() {
      var _this = this;
      var scrollTop = $win.scrollTop();
      var winHeight = $win.height();
      var uiPosX = _this.elements.outerWrapper.offset().top;
      var uiHeight = _this.elements.outerWrapper.outerHeight();

      var fitsDown = (uiPosX + uiHeight + _this.itemsHeight) <= (scrollTop + winHeight);
      var fitsAbove = (uiPosX - _this.itemsHeight) > scrollTop;

      // If it does not fit below, only render it
      // above it fit's there.
      // It's acceptable that the user needs to
      // scroll the viewport to see the cut off UI
      var renderAbove = !fitsDown && fitsAbove;

      _this.elements.outerWrapper.toggleClass(_this.classes.above, renderAbove);
    },

    /**
     * Detect if currently selected option is visible and scroll the options box to show it
     *
     * @param {number} index - Index of the selected items
     */
    detectItemVisibility: function(index) {
      var _this = this;
      var liHeight = _this.$li.eq(index).outerHeight();
      var liTop = _this.$li[index].offsetTop;
      var itemsScrollTop = _this.elements.itemsScroll.scrollTop();
      var scrollT = liTop + liHeight * 2;

      _this.elements.itemsScroll.scrollTop(
        scrollT > itemsScrollTop + _this.itemsHeight ? scrollT - _this.itemsHeight :
          liTop - liHeight < itemsScrollTop ? liTop - liHeight :
            itemsScrollTop
      );
    },

    /**
     * Open the select options box
     *
     * @param {event} e - Event
     */
    open: function(e) {
      var _this = this;

      _this.utils.triggerCallback('BeforeOpen', _this);

      if ( e ) {
        e.preventDefault();
        e.stopPropagation();
      }

      if ( _this.state.enabled ) {
        _this.setOptionsDimensions();

        // Find any other opened instances of select and close it
        $('.' + _this.classes.hideselect, '.' + _this.classes.open).children()[pluginName]('close');

        _this.state.opened = true;
        _this.itemsHeight = _this.elements.items.outerHeight();
        _this.itemsInnerHeight = _this.elements.items.height();

        // Toggle options box visibility
        _this.elements.outerWrapper.addClass(_this.classes.open);

        // Give dummy input focus
        _this.elements.input.val('');
        if ( e && e.type !== 'focusin' ) {
          _this.elements.input.focus();
        }

        $doc
          .on('click' + bindSufix, $.proxy(_this.close, _this))
          .on('scroll' + bindSufix, $.proxy(_this.isInViewport, _this));
        _this.isInViewport();

        // Prevent window scroll when using mouse wheel inside items box
        if ( _this.options.preventWindowScroll ) {
          /* istanbul ignore next */
          $doc.on('mousewheel' + bindSufix + ' DOMMouseScroll' + bindSufix, '.' + _this.classes.scroll, function(e) {
            var orgEvent = e.originalEvent;
            var scrollTop = $(this).scrollTop();
            var deltaY = 0;

            if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1; }
            if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;  }
            if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY; }
            if ( 'deltaY'      in orgEvent ) { deltaY = orgEvent.deltaY * -1; }

            if ( scrollTop === (this.scrollHeight - _this.itemsInnerHeight) && deltaY < 0 || scrollTop === 0 && deltaY > 0 ) {
              e.preventDefault();
            }
          });
        }

        _this.detectItemVisibility(_this.state.selectedIdx);

        _this.utils.triggerCallback('Open', _this);
      }
    },

    /** Close the select options box */
    close: function() {
      var _this = this;

      _this.utils.triggerCallback('BeforeClose', _this);

      _this.change();

      // Remove custom events on document
      $doc.off(bindSufix);

      // Remove visible class to hide options box
      _this.elements.outerWrapper.removeClass(_this.classes.open);

      _this.state.opened = false;

      _this.utils.triggerCallback('Close', _this);
    },

    /** Select current option and change the label */
    change: function() {
      var _this = this;

      _this.utils.triggerCallback('BeforeChange', _this);

      if ( _this.state.currValue !== _this.state.selectedIdx ) {
        // Apply changed value to original select
        _this.$element
          .prop('selectedIndex', _this.state.currValue = _this.state.selectedIdx)
          .data('value', _this.lookupItems[_this.state.selectedIdx].text);

        // Change label text
        _this.setLabel();
      }

      _this.utils.triggerCallback('Change', _this);
    },

    /**
     * Select option
     *
     * @param {number}  index - Index of the option that will be selected
     * @param {boolean} close - Close the options box after selecting
     */
    select: function(index, close) {
      var _this = this;

      // Parameter index is required
      if ( index === undefined ) {
        return;
      }

      // If element is disabled, can't select it
      if ( !_this.lookupItems[index].disabled ) {
        _this.$li.filter('[data-index]')
          .removeClass('selected')
          .eq(_this.state.selectedIdx = index)
          .addClass('selected');

        _this.detectItemVisibility(index);

        // If 'close' is false (default), the options box won't close after
        // each selected item, this is necessary for keyboard navigation
        if ( close ) {
          _this.close();
        }
      }
    },

    /**
     * Unbind and remove
     *
     * @param {boolean} preserveData - Check if the data on the element should be removed too
     */
    destroy: function(preserveData) {
      var _this = this;

      if ( _this.state && _this.state.enabled ) {
        _this.elements.items.add(_this.elements.wrapper).add(_this.elements.input).remove();

        if ( !preserveData ) {
          _this.$element.removeData(pluginName).removeData('value');
        }

        _this.$element.prop('tabindex', _this.originalTabindex).off(bindSufix).off(_this.eventTriggers).unwrap().unwrap();

        _this.state.enabled = false;
      }
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(args) {
    return this.each(function() {
      var data = $.data(this, pluginName);

      if ( data && !data.disableOnMobile ) {
        (typeof args === 'string' && data[args]) ? data[args]() : data.init(args);
      } else {
        $.data(this, pluginName, new Selectric(this, args));
      }
    });
  };

  /**
   * Hooks for the callbacks
   *
   * @type {object}
   */
  $.fn[pluginName].hooks = {
    /**
     * @param {string} callbackName - The callback name.
     * @param {string}     hookName - The name of the hook to be attached.
     * @param {function}         fn - Callback function.
     */
    add: function(callbackName, hookName, fn) {
      if ( !this[callbackName] ) {
        this[callbackName] = {};
      }

      this[callbackName][hookName] = fn;
    },

    /**
     * @param {string} callbackName - The callback name.
     * @param {string}     hookName - The name of the hook that will be removed.
     */
    remove: function(callbackName, hookName) {
      delete this[callbackName][hookName];
    }
  };

  /**
   * Default plugin options
   *
   * @type {object}
   */
  $.fn[pluginName].defaults = {
    onChange: function(elm) { $(elm).change(); },
    maxHeight: 300,
    keySearchTimeout: 500,
    arrowButtonMarkup: '<b class="button">&#x25be;</b>',
    disableOnMobile: true,
    openOnHover: false,
    hoverIntentTimeout: 500,
    expandToItemText: false,
    responsive: false,
    preventWindowScroll: true,
    inheritOriginalWidth: false,
    allowWrap: true,
    customClass: {
      prefix: pluginName,
      camelCase: false
    },
    optionsItemBuilder: '{text}', // function(itemData, element, index)
    labelBuilder: '{text}' // function(currItem)
  };
}));

}
/*
     FILE ARCHIVED ON 15:52:28 Feb 19, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 02:28:16 Apr 25, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.478
  exclusion.robots: 0.018
  exclusion.robots.policy: 0.008
  esindex: 0.01
  cdx.remote: 26.653
  LoadShardBlock: 541.258 (3)
  PetaboxLoader3.datanode: 413.389 (7)
  PetaboxLoader3.resolve: 331.998 (4)
  load_resource: 236.041 (2)
*/