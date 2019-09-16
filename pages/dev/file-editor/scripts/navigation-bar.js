const navigation_buttons = Object.freeze({
    CHARACTER: 'navigation-character',
    EQUIPMENT: 'navigation-equipment',
    QUEST: 'navigation-quest',
});

const navigation_pages = Object.freeze({
    'navigation-character': 'character-page',
    'navigation-equipment': 'equipment-page',
    'navigation-quest': 'quest-page',
});

const button_is_enabled_class = "is-open";

function switch_selected_navigation_button(page_element)
{
    // IF PAGE ELEMENT IS NOT THE ONE THAT'S ACTIVE
    if (!page_element.classList.contains(button_is_enabled_class))
    {
        // MAKE BUTTON ACTIVE AND CHANGE THE PAGE IT'S FOR TO BE VISIBLE
        page_element.classList.toggle(button_is_enabled_class);
        document.getElementById(navigation_pages[page_element.id]).hidden = false;

        // REMOVE THE ACTIVE STATE FROM OTHER BUTTONS THAT HAVE IT ENABLED
        Object.keys(navigation_buttons).forEach(function (key)
        {
            if ((navigation_buttons[key] !== page_element.id) &&
                (document.getElementById(navigation_buttons[key]).classList.contains(button_is_enabled_class)))
            {
                // DISABLE ACTIVE BUTTON AND HIDE THE PAGE IT'S FOR
                document.getElementById(navigation_buttons[key]).classList.toggle(button_is_enabled_class);
                document.getElementById(navigation_pages[navigation_buttons[key]]).hidden = true;
            }
        });
    }
}