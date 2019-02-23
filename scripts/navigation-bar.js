function open_items()
{
    // INIT VARIABLES
    let item_container = document.getElementById("items-container");
    let projects_container = document.getElementById("projects-container");
    let settings_container = document.getElementById("settings-container");
    let other_container = document.getElementById("other-container");

    let item_nav = document.getElementById("navigation-items");
    let projects_nav = document.getElementById("navigation-projects");
    let settings_nav = document.getElementById("navigation-settings");
    let other_nav = document.getElementById("navigation-other");

    // SHOW ITEM CONTAINER AND HIDE OTHER ELEMENTS
    item_container.style.display = "block";
    projects_container.style.display = "none";
    settings_container.style.display = "none";
    other_container.style.display = "none";

    // CHANGE BUTTON COLOR
    if (!item_nav.classList.contains("is-open")) { item_nav.classList.add("is-open"); }
    if (projects_nav.classList.contains("is-open")) { projects_nav.classList.remove("is-open"); }
    if (settings_nav.classList.contains("is-open")) { settings_nav.classList.remove("is-open"); }
    if (other_nav.classList.contains("is-open")) { other_nav.classList.remove("is-open"); }
}

function open_projects()
{
    // INIT VARIABLES
    let item_container = document.getElementById("items-container");
    let projects_container = document.getElementById("projects-container");
    let settings_container = document.getElementById("settings-container");
    let other_container = document.getElementById("other-container");

    let item_nav = document.getElementById("navigation-items");
    let projects_nav = document.getElementById("navigation-projects");
    let settings_nav = document.getElementById("navigation-settings");
    let other_nav = document.getElementById("navigation-other");

    // SHOW ITEM CONTAINER AND HIDE OTHER ELEMENTS
    item_container.style.display = "none";
    projects_container.style.display = "block";
    settings_container.style.display = "none";
    other_container.style.display = "none";

    // CHANGE BUTTON COLOR
    if (item_nav.classList.contains("is-open")) { item_nav.classList.remove("is-open"); }
    if (!projects_nav.classList.contains("is-open")) { projects_nav.classList.add("is-open"); }
    if (settings_nav.classList.contains("is-open")) { settings_nav.classList.remove("is-open"); }
    if (other_nav.classList.contains("is-open")) { other_nav.classList.remove("is-open"); }
}

function open_settings()
{
    // INIT VARIABLES
    let item_container = document.getElementById("items-container");
    let projects_container = document.getElementById("projects-container");
    let settings_container = document.getElementById("settings-container");
    let other_container = document.getElementById("other-container");

    let item_nav = document.getElementById("navigation-items");
    let projects_nav = document.getElementById("navigation-projects");
    let settings_nav = document.getElementById("navigation-settings");
    let other_nav = document.getElementById("navigation-other");

    // SHOW ITEM CONTAINER AND HIDE OTHER ELEMENTS
    item_container.style.display = "none";
    projects_container.style.display = "none";
    settings_container.style.display = "block";
    other_container.style.display = "none";

    // CHANGE BUTTON COLOR
    if (item_nav.classList.contains("is-open")) { item_nav.classList.remove("is-open"); }
    if (projects_nav.classList.contains("is-open")) { projects_nav.classList.remove("is-open"); }
    if (!settings_nav.classList.contains("is-open")) { settings_nav.classList.add("is-open"); }
    if (other_nav.classList.contains("is-open")) { other_nav.classList.remove("is-open"); }
}

function open_other()
{
    // INIT VARIABLES
    let item_container = document.getElementById("items-container");
    let projects_container = document.getElementById("projects-container");
    let settings_container = document.getElementById("settings-container");
    let other_container = document.getElementById("other-container");

    let item_nav = document.getElementById("navigation-items");
    let projects_nav = document.getElementById("navigation-projects");
    let settings_nav = document.getElementById("navigation-settings");
    let other_nav = document.getElementById("navigation-other");

    // SHOW ITEM CONTAINER AND HIDE OTHER ELEMENTS
    item_container.style.display = "none";
    projects_container.style.display = "none";
    settings_container.style.display = "none";
    other_container.style.display = "block";

    // CHANGE BUTTON COLOR
    if (item_nav.classList.contains("is-open")) { item_nav.classList.remove("is-open"); }
    if (projects_nav.classList.contains("is-open")) { projects_nav.classList.remove("is-open"); }
    if (settings_nav.classList.contains("is-open")) { settings_nav.classList.remove("is-open"); }
    if (!other_nav.classList.contains("is-open")) { other_nav.classList.add("is-open"); }
}

function toggle_project_help()
{
    let project_info_div = document.getElementById("project-info-div");
    let info_toggle_button = document.getElementById("toggle-project-help");

    if (project_info_div.style.display === "none")
    {
        project_info_div.style.display = "block";
        info_toggle_button.innerHTML = "Hide Project/Blacklist Help";
    }
    else
    {
        project_info_div.style.display = "none";
        info_toggle_button.innerHTML = "Show Project/Blacklist Help";
    }
}

function toggle_data_management_help()
{
    let dm_info_div = document.getElementById("export-import-info");
    let info_toggle_button = document.getElementById("toggle-data-management-help");

    if (dm_info_div.style.display === "none")
    {
        dm_info_div.style.display = "block";
        info_toggle_button.innerHTML = "Show Data Management Help";
    }
    else
    {
        dm_info_div.style.display = "none";
        info_toggle_button.innerHTML = "Hide Data Management Help";
    }
}