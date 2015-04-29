(function($){

    var doingLink = '';
    var modal_bound = false;

    function trap_events(event) {
        //trap any events
        if (typeof event.preventDefault != 'undefined') 
        {
            event.preventDefault();
        }
        else 
        {
            event.returnValue = false;
        }
        event.stopPropagation();
    }
  
    function initialize_field( $el ) {

        $el.on('click', '.link-btn', function(event) 
        {
            trap_events(event);

            var thisID = $(this).attr("id");
            doingLink = thisID;
            
            var $lp_input = $(this).closest('.acf-input');

            if (typeof wpLink !== 'undefined') {
                var current_url = $lp_input.find('.link-picker-url-input').val();
                var current_title = $lp_input.find('.link-picker-title-input').val();
                
                wplink_defaults = wpLink.setDefaultValues;
                wpLink.setDefaultValues = function () { 
                    var $inputs = $('#wp-link').find('input[type=text]');
                    $($inputs[1]).val(current_title);
                    $($inputs[0]).val(current_url);
                };
                wpLink.open(thisID); // open the link popup
            }

            return false;
        });

        $el.on('click', '.link-remove-btn', function(event) 
        {
            var thisID = $(this).attr("id").replace("-remove", "");
            doingLink = thisID;
            
            $('#' + doingLink + '-url').val('');
            $('#' + doingLink + '-title').val('');
            $('#' + doingLink + '-target').val('');
            
            $('#' + doingLink + '-none').show();
            $('#' + doingLink + '-exists').hide();
            
            if (typeof acf._e != 'undefined')
            {
                $('#' + doingLink).html(acf._e('link_picker', 'insert_link'));
            }
            else
            {
                $('#' + doingLink).html('Insert Link');
            }
            $('#' + doingLink + '-remove').fadeOut('fast');
    
            trap_events(event);
            
            return false;
        });

        if (!modal_bound) {
            bind_wplink_handlers();
            modal_bound = true;
        }
    }

    function reset_wplink() {
        wpLink.setDefaultValues = wplink_defaults;
        doingLink = '';
    }

    function bind_wplink_handlers() {
        $('body').on('click', '#wp-link-submit', function(event) 
        {
            if (doingLink !== '')
            {
                var linkAtts = wpLink.getAttrs(); // the links attributes (href, target) are stored in an object, which can be access via  wpLink.getAttrs()
                // title is no longer included (as of 4.2)
                if (!('title' in linkAtts) {
                    linkAtts.title = $("#wp-link-text").val();
                }

                //console.log('#' + doingLink + '-url');
                //console.log($('#' + doingLink + '-url').length);
                
                $('#' + doingLink + '-url').val(linkAtts.href);
                $('#' + doingLink + '-title').val(linkAtts.title);
                $('#' + doingLink + '-target').val(linkAtts.target);
                
                $('#' + doingLink + '-url-label').html('<a href="' + linkAtts.href + '" target="_blank">' + linkAtts.href + '</a>');
                $('#' + doingLink + '-title-label').html(linkAtts.title);
                
                if (typeof acf._e != 'undefined')
                {
                  $('#' + doingLink + '-target-label').html((linkAtts.target == '_blank') ? acf._e('link_picker', 'yes') : acf._e('link_picker', 'no'));
                }
                else
                {
                  $('#' + doingLink + '-target-label').html((linkAtts.target == '_blank') ? 'Yes' : 'No');
                }
                
                $('#' + doingLink + '-none').hide();
                $('#' + doingLink + '-exists').show();
                        
                if (typeof acf._e != 'undefined')
                {
                  $('#' + doingLink).html(acf._e('link_picker', 'edit_link'));
                }
                else
                {
                  $('#' + doingLink).html('Edit Link');
                }
                
                $('#' + doingLink + '-remove').fadeIn('fast');
                
                wpLink.textarea = $('body'); // to close the link dialogue, it is again expecting an wp_editor instance, so you need to give it something to set focus back to. In this case, I'm using body, but the textfield with the URL would be fine
                wpLink.close();// close the dialogue
                
                trap_events(event);
                
                reset_wplink();
                return false;
            }
        });


        $('body').on('click', '#wp-link-close, #wp-link-cancel a', function(event) 
        {
            if (doingLink !== '')
            {
                wpLink.textarea = $('body');
                wpLink.close();
                
                trap_events(event);

                // reset
                reset_wplink();

                return false;
            }
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
        *  @type  event
        *  @date  20/07/13
        *
        *  @param $el (jQuery selection) the jQuery element which contains the ACF fields
        *  @return  n/a
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
        *  @type  function
        *  @since 1.0.0
        *  @date  01/01/12
        *
        *  @param event   e: an event object. This can be ignored
        *  @param Element   postbox: An element which contains the new HTML
        *
        *  @return  n/a
        */

        $(document).live('acf/setup_fields', function(e, postbox){
          
            $(postbox).find('.field[data-field_type="link_picker"]').each(function(){
                initialize_field( $(this) );
            });

        });

    }

})(jQuery);
