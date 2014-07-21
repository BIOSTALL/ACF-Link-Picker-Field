var doingLink = '';

(function($){
	
	function initialize_field( $el ) {
		
		//$el.doStuff();
		
        jQuery('body').on('click', '.link-btn', function(event) 
        {
            var thisID = jQuery(this).attr("id");
            doingLink = thisID;
            
            wpActiveEditor = true; // we need to override this var as the link dialogue is expecting an actual wp_editor instance
            //console.log(wpLink);
            wpLink.open(); // open the link popup
            return false;
        });
        
        jQuery('body').on('click', '#wp-link-submit', function(event) 
        {
            if (doingLink != '')
            {
                var linkAtts = wpLink.getAttrs(); // the links attributes (href, target) are stored in an object, which can be access via  wpLink.getAttrs()
                
                //console.log('#' + doingLink + '-url');
                //console.log(jQuery('#' + doingLink + '-url').length);
                
                jQuery('#' + doingLink + '-url').val(linkAtts.href);
                jQuery('#' + doingLink + '-title').val(linkAtts.title);
                jQuery('#' + doingLink + '-target').val(linkAtts.target);
                
                jQuery('#' + doingLink + '-url-label').html('<a href="' + linkAtts.href + '" target="_blank">' + linkAtts.href + '</a>');
                jQuery('#' + doingLink + '-title-label').html(linkAtts.title);
                jQuery('#' + doingLink + '-target-label').html((linkAtts.target == '_blank') ? acf._e('link_picker', 'yes') : acf._e('link_picker', 'no'));
                
                jQuery('#' + doingLink + '-none').hide();
                jQuery('#' + doingLink + '-exists').show();
                
                jQuery('#' + doingLink).html(acf._e('link_picker', 'edit_link'));
                jQuery('#' + doingLink + '-remove').fadeIn('fast');
                
                wpLink.textarea = jQuery('body'); // to close the link dialogue, it is again expecting an wp_editor instance, so you need to give it something to set focus back to. In this case, I'm using body, but the textfield with the URL would be fine
                wpLink.close();// close the dialogue
                
                //trap any events
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
                event.stopPropagation();
                
                return false;
            }
            doingLink = '';
        });
        
        jQuery('body').on('click', '.link-remove-btn', function(event) 
        {
            var thisID = jQuery(this).attr("id").replace("-remove", "");
            doingLink = thisID;
            
            jQuery('#' + doingLink + '-url').val('');
            jQuery('#' + doingLink + '-title').val('');
            jQuery('#' + doingLink + '-target').val('');
            
            jQuery('#' + doingLink + '-none').show();
            jQuery('#' + doingLink + '-exists').hide();
            
            jQuery('#' + doingLink).html(acf._e('link_picker', 'insert_link'));
            jQuery('#' + doingLink + '-remove').fadeOut('fast');
            
            doingLink = '';
            
            return false;
        });
        
        jQuery('body').on('click', '#wp-link-cancel a', function(event) 
        {
            wpLink.textarea = jQuery('body');
            wpLink.close();
            
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            event.stopPropagation();
            doingLink = '';
            return false;
        });
        
        jQuery('body').on('click', '#wp-link-close', function(event) 
        {
            wpLink.textarea = jQuery('body');
            wpLink.close();
            
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            event.stopPropagation();
            doingLink = '';
            return false;
        });
        
	}
	
	if( typeof acf.add_action !== 'undefined' ) {
	
		/*
		*  ready append (ACF5)
		*
		*  These are 2 events which are fired during the page load
		*  ready = on page load similar to $(document).ready()
		*  append = on new DOM elements appended via repeater field
		*
		*  @type	event
		*  @date	20/07/13
		*
		*  @param	$el (jQuery selection) the jQuery element which contains the ACF fields
		*  @return	n/a
		*/
		
		acf.add_action('ready append', function( $el ){
			
			// search $el for fields of type 'FIELD_NAME'
			acf.get_fields({ type : 'link_picker'}, $el).each(function(){
				
				initialize_field( $(this) );
				
			});
			
		});
		
	} else {
		
		/*
		*  acf/setup_fields (ACF4)
		*
		*  This event is triggered when ACF adds any new elements to the DOM. 
		*
		*  @type	function
		*  @since	1.0.0
		*  @date	01/01/12
		*
		*  @param	event		e: an event object. This can be ignored
		*  @param	Element		postbox: An element which contains the new HTML
		*
		*  @return	n/a
		*/
		
		$(document).live('acf/setup_fields', function(e, postbox){
			
			$(postbox).find('.field[data-field_type="link_picker"]').each(function(){
				
				initialize_field( $(this) );
				
			});
		
		});
	
	}

})(jQuery);
