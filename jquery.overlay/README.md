Overlay/popup library for jQuery
--------------------------------

Use $.overlay.create(content, overbox\_classes, overlay\_classes) and pass it a string, DOMObject,
or jQueryObject as the content of the popup.
The popup will keep itself in the middle of the page, through scrolls and window resizes.
When done, kill it with $.overlay.destroy()
To check if a popup is displayed, use $.overlay.on

Eventually, I will remove the jQuery dependancy, as this is more CSS dependant than JS.

over*_classes are used to add your own css to style these boxes. If you want your classes to overwrite
the styles in jquery.overlay.css, be sure to import your stylesheet _after_ jquery.overlay.css.

Licence - WTFPL - http://www.wtfpl.net/
