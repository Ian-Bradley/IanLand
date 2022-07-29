(function() {

    /*======================================
        GLOBALS
    ========================================*/

    const body           = document.querySelector('body');
    const main_container = document.querySelector('main.container');
    const nav            = document.querySelector('.nav-list');
    const nav_items      = document.querySelectorAll('.nav-item');

    const transition_time  = 200;
    const class_active     = 'active';
    const class_external   = 'ext-link';
    const class_fade       = 'fade-out';
    const class_item       = 'nav-item';
    const class_open       = 'open';
    const class_transition = 'transition';
    let nav_open   = false;
    let route      = '/home';
    let route_prev = '/home';

    /*======================================
        AJAX
    ========================================*/

    function makeAjaxRequest( request_action, request_route, response_action ) {
        let httpRequest = new XMLHttpRequest();
        if ( !httpRequest )
        {
            console.log('Error: XMLHTTP instance failure');
            return false;
        }
        httpRequest.onreadystatechange = function() {
            if ( httpRequest.readyState === XMLHttpRequest.DONE )
            {
                if ( httpRequest.status === 200 ) {
                    response_action(httpRequest.responseText);
                }
                else {
                    console.log('Error: Request failure');
                    console.log('Request status: ', httpRequest.status);
                }
            }
        };
        httpRequest.open(request_action, request_route, true);
        httpRequest.send();
    }


    /*======================================
        NAV + PAGE LOADING
    ========================================*/

    for ( let i = 0; i < nav_items.length; i++ )
    {
        nav_items[i].addEventListener("click", function() {
            if( this.classList.contains(class_external) )
            {
                return true;
            }
            else
            {
                if ( this.classList.contains(class_active) )
                {
                    // Open/close nav
                    if ( nav_open ) {
                        nav.classList.remove(class_open);
                        nav_open = !nav_open;
                    }
                    else {
                        nav.classList.add(class_open);
                        nav_open = !nav_open;
                    }
                }
                else
                {
                    // Swap active class
                    document.querySelector('.'+class_item+'.'+class_active).classList.remove(class_active);
                    this.classList.add(class_active);
            
                    // Close nav
                    nav.classList.remove(class_open);
                    nav_open = false;
    
                    // Route determination
                    route_prev = route;
                    route = '/'+this.innerHTML.replace(/-/g, '_').toLowerCase();
    
                    // AJAX request
                    makeAjaxRequest('GET', route, function(respone_data){
                        pageLoadTransition(route, route_prev, respone_data);
                    });
                }
            }
        }, false);
    }

    // Initial home page loading
    makeAjaxRequest('GET', route, function(respone_data) {
        pageLoadTransition(route, route_prev, respone_data);
    });

    /*======================================
        ANIMATIONS
    ========================================*/

    /* PAGE LOADING */
    function pageLoadTransition ( page, page_prev, page_data ) {
        main_container.classList.add(class_transition, class_fade);
        setTimeout(function(){
            body.classList.remove(page_prev.slice(1));
            main_container.innerHTML = "";
            body.classList.add(page.slice(1));
            main_container.innerHTML = page_data;
            setTimeout(function(){
                main_container.classList.remove(class_fade);
                setTimeout(function(){
                    main_container.classList.remove(class_transition);
                }, transition_time);
            }, transition_time);
        }, transition_time);
    }

})();