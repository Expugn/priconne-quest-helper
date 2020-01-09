function open_items()
{
    close_everything();

    // INIT VARIABLES
    let item_container = document.getElementById("items-container");
    let item_nav = document.getElementById("navigation-items");

    // SHOW ITEM CONTAINER AND HIDE OTHER ELEMENTS
    item_container.hidden = false;

    // CHANGE BUTTON COLOR
    if (!item_nav.classList.contains("is-open")) { item_nav.classList.add("is-open"); }
}

function open_presets()
{
    close_everything();

    // INIT VARIABLES
    let presets_container = document.getElementById("presets-container");
    let presets_nav = document.getElementById("navigation-presets");

    // SHOW ITEM CONTAINER AND HIDE OTHER ELEMENTS
    presets_container.hidden = false;

    // CHANGE BUTTON COLOR
    if (!presets_nav.classList.contains("is-open")) { presets_nav.classList.add("is-open"); }
}

function open_projects()
{
    close_everything();

    // INIT VARIABLES
    let projects_container = document.getElementById("projects-container");
    let projects_nav = document.getElementById("navigation-projects");

    // SHOW ITEM CONTAINER AND HIDE OTHER ELEMENTS
    projects_container.hidden = false;

    // CHANGE BUTTON COLOR
    if (!projects_nav.classList.contains("is-open")) { projects_nav.classList.add("is-open"); }
}

function open_settings()
{
    close_everything();

    // INIT VARIABLES
    let settings_container = document.getElementById("settings-container");
    let settings_nav = document.getElementById("navigation-settings");

    // SHOW ITEM CONTAINER AND HIDE OTHER ELEMENTS
    settings_container.hidden = false;

    // CHANGE BUTTON COLOR
    if (!settings_nav.classList.contains("is-open")) { settings_nav.classList.add("is-open"); }
}

function open_other()
{
    close_everything();

    // INIT VARIABLES
    let other_container = document.getElementById("other-container");
    let other_nav = document.getElementById("navigation-other");

    // SHOW ITEM CONTAINER AND HIDE OTHER ELEMENTS
    other_container.hidden = false;

    // CHANGE BUTTON COLOR
    if (!other_nav.classList.contains("is-open")) { other_nav.classList.add("is-open"); }
}

function close_everything()
{
    // INIT VARIABLES
    let item_container = document.getElementById("items-container");
    let presets_container = document.getElementById("presets-container");
    let projects_container = document.getElementById("projects-container");
    let settings_container = document.getElementById("settings-container");
    let other_container = document.getElementById("other-container");

    let item_nav = document.getElementById("navigation-items");
    let presets_nav = document.getElementById("navigation-presets");
    let projects_nav = document.getElementById("navigation-projects");
    let settings_nav = document.getElementById("navigation-settings");
    let other_nav = document.getElementById("navigation-other");

    // SHOW ITEM CONTAINER AND HIDE OTHER ELEMENTS
    item_container.hidden = true;
    presets_container.hidden = true;
    projects_container.hidden = true;
    settings_container.hidden = true;
    other_container.hidden = true;

    // CHANGE BUTTON COLOR
    if (item_nav.classList.contains("is-open")) { item_nav.classList.remove("is-open"); }
    if (presets_nav.classList.contains("is-open")) { presets_nav.classList.remove("is-open"); }
    if (projects_nav.classList.contains("is-open")) { projects_nav.classList.remove("is-open"); }
    if (settings_nav.classList.contains("is-open")) { settings_nav.classList.remove("is-open"); }
    if (other_nav.classList.contains("is-open")) { other_nav.classList.remove("is-open"); }
}