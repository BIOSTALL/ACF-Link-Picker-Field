=== Advanced Custom Fields: Link Picker Field ===
Contributors: Steve Marks (BIOSTALL)
Tags: acf, advanced custom fields, link picker, link chooser, acf link picker
Requires at least: 3.5
Tested up to: 3.8.1
Stable tag: trunk
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Adds an Advanced Custom Field field that allows the selection of a link utilising the WordPress link picker modal dialog

== Description ==

This add on for the already established Advanced Custom Fields plugin adds a new field type called 'Link Picker' which allows the user to enter a URL, or select from the existing pages.

Utilising the existing modal dialog popup from the WYSIWYG, users will already be familiar with how it works.

Note: Advanced Custom Fields must be installed for this add-on to work.

= Compatibility =

This ACF field type is compatible with:

*	ACF 5
*	ACF 4

== Installation ==

1. Copy the `acf-link_picker` folder into your `wp-content/plugins` folder
2. Activate the 'Advanced Custom Fields: Link Picker' plugin via the plugins admin page
3. Create a new field via ACF and select the Link Picker type

When outputting the link selection on the front end, you will have three object elements available:

*	url - The URL of the page
*	title - The title of the link, if entered
*	target - Will be either a blank string or '_blank', depending on whether the user has ticked the box for the link to open in a new window/tab.

Code example:

`$mylink = get_field('mylink');
var_dump($mylink);

/*
Outputs:

array(3) {
  ["url"]=>
  string(31) "http://mysite.com/selected/url/"
  ["title"]=>
  string(10) "Link Title"
  ["target"]=>
  string(6) "_blank"
}*/`

== Screenshots ==

1. Selecting the 'Link Picker' field type when setting up the field
2. No link selected. The user can click 'Insert Link'
3. Presented with the standard and familiar popup dialog box
4. Once selected the user can see the current link, edit it and remove it

== Changelog ==

= 1.0.0 =
* Initial Release.