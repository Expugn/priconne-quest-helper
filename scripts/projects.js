let projects = new Map();

function init_project_data()
{
    // PROJECTS BEING STORED ON COOKIES HAVE BEEN DEPRECIATED. DELETE/IMPORT DATA.
    if (Cookies.get('projects'))
    {
        if (typeof(Storage) !== "undefined")
        {
            localStorage.setItem('projects', Cookies.get('projects'));
        }
        Cookies.remove('projects');

        console.log("[Projects] - Removed/imported to LocalStorage found project cookie data.");
    }

    if (typeof(Storage) !== "undefined")
    {
        // LOCAL STORAGE IS SUPPORTED

        // LOAD DATA FROM COOKIE
        //let project_cookie_data = Cookies.get('projects');
        let project_cookie_data = localStorage.getItem('projects');
        if (project_cookie_data !== undefined)
        {
            // PROJECT COOKIE EXISTS, DECRYPT DATA AND SAVE TO GLOBAL VAR
            projects = map_string_json_to_map_of_maps(project_cookie_data);

            // UPDATE SELECT DISPLAYING SAVED PROJECTS
            update_saved_projects_select();

            console.log("[Projects] - Projects are initialized!");
        }
    }
    else
    {
        // LOCAL STORAGE IS NOT SUPPORTED
        // DISABLE PROJECTS/BLACKLIST SAVING
        console.log("[Projects] - LocalStorage is not supported on this browser! Disabling everything!");
        document.getElementById("save-project-div").style.display = "none";
        document.getElementById("project-options-div").style.display = "none";
        document.getElementById("project-blacklist-options-div").style.display = "none";
        document.getElementById("project-info-div").style.display = "none";
        document.getElementById("localstorage-warning").innerHTML = "Your browser does not support LocalStorage.<br>Projects/Blacklist saving have been disabled.<br>";
    }
}

function save_project_data()
{
    // SAVE CURRENT SESSION DATA
    let project_name = document.getElementById("project-name-input").value;

    // IF PROJECT NAME ISN'T GIVEN OR IS "[All Projects...]", USE "Untitled"
    if (project_name === "" || project_name === "[All Projects...]")
    {
        if (projects.has("Untitled"))
        {
            let looking_for_unused_name = true;
            let untitled_counter = 2;
            while (looking_for_unused_name)
            {
                if (projects.has("Untitled (" + untitled_counter + ")"))
                {
                    untitled_counter++;
                }
                else
                {
                    looking_for_unused_name = false;
                }
            }
            project_name = "Untitled (" + untitled_counter + ")";
        }
        else
        {
            project_name = "Untitled";
        }
    }

    // CHECK IF NAME ALREADY EXISTS
    let project_name_exists = projects.has(project_name);

    // CREATE NEW MAP AND SAVE SELECTED ITEM DATA
    let project_item_data = new Map();
    for (let [item_name, item_data_map] of equipment_map)
    {
        // IF ITEM NAME CONTAINS "equipment_", IGNORE
        if (!item_name.includes("equipment_"))
        {
            let item_id = item_data_map.get("id");
            let selected_amt = document.getElementById(item_id + "-amt").value;

            // IF THE ITEM HAS A VALUE GREATER THAN 1 SELECTED, ADD ITEM AND VALUE TO PROJECT ITEM DATA
            if (selected_amt >= 1)
            {
                project_item_data.set(item_name, selected_amt);
            }
        }
    }

    // ADD PROJECT DATA TO PROJECT MAP
    projects.set(project_name, project_item_data);

    // SAVE PROJECT MAP TO COOKIE AS COOKIE-SAFE JSON STRING
    //Cookies.set('projects', map_of_maps_to_map_string_json(projects), { expires:365 });
    localStorage.setItem('projects', map_of_maps_to_map_string_json(projects));

    // UPDATE SELECT DISPLAYING SAVED PROJECTS
    update_saved_projects_select();

    // SET SELECTED PROJECT TO RECENTLY SAVED PROJECT, ALSO ENABLE ADD/SUB BUTTONS
    document.getElementById("saved-projects-select").value = project_name;
    disable_add_and_sub_buttons(false);

    toastr.success("Project \"" + project_name + "\" has been " + (project_name_exists ? "overwritten!" : "saved!"));
    console.log("[Projects] - \"" + project_name + "\"'s data has been saved.");
}

function load_project_data()
{
    let project_name = document.getElementById("saved-projects-select").value;
    let project_data = projects.get(project_name);

    if (project_name !== "[All Projects...]")
    {
        // CLEAR ALL DATA
        clear_item_table();

        // SET ITEM VALUES
        for (let [item_name, item_amount] of project_data)
        {
            document.getElementById(get_equipment_data(item_name, "id") + "-amt").value = item_amount;
        }

        // UPDATE REQUESTED ITEMS
        build_data();

        // CHANGE PROJECT NAME TO SELECTED PROJECT
        document.getElementById("project-name-input").value = project_name;
    }
    else
    {
        // CLEAR ALL DATA
        clear_item_table();

        // LOAD ALL DATA
        for (let [project_name, project_data] of projects)
        {
            for (let [item_name, item_amount] of project_data)
            {
                let current_amount = document.getElementById(get_equipment_data(item_name, "id") + "-amt").value;
                if (current_amount >= 1)
                {
                    document.getElementById(get_equipment_data(item_name, "id") + "-amt").value = parseInt(current_amount) + parseInt(item_amount);
                }
                else
                {
                    document.getElementById(get_equipment_data(item_name, "id") + "-amt").value = parseInt(item_amount);
                }
            }
        }

        // UPDATE REQUESTED ITEMS
        build_data();

        // CHANGE PROJECT NAME TO BE EMPTY
        document.getElementById("project-name-input").value = "";
    }

    console.log("[Projects] - Loaded \"" + project_name + "\"'s data.");
}

function add_project_data()
{
    let project_name = document.getElementById("saved-projects-select").value;
    let project_data = projects.get(project_name);

    // SET ITEM VALUES
    for (let [item_name, item_amount] of project_data)
    {
        let current_amount = document.getElementById(get_equipment_data(item_name, "id") + "-amt").value;
        if (current_amount >= 1)
        {
            document.getElementById(get_equipment_data(item_name, "id") + "-amt").value = parseInt(current_amount) + parseInt(item_amount);
        }
        else
        {
            document.getElementById(get_equipment_data(item_name, "id") + "-amt").value = parseInt(item_amount);
        }
    }

    // UPDATE REQUESTED ITEMS
    build_data();

    console.log("[Projects] - Added a set of \"" + project_name + "\"'s items from the selection.");
}

function sub_project_data()
{
    let project_name = document.getElementById("saved-projects-select").value;
    let project_data = projects.get(project_name);

    // SET ITEM VALUES
    for (let [item_name, item_amount] of project_data)
    {
        let current_amount = document.getElementById(get_equipment_data(item_name, "id") + "-amt").value;
        if (current_amount >= 1)
        {
            let new_value = parseInt(current_amount) - parseInt(item_amount);
            document.getElementById(get_equipment_data(item_name, "id") + "-amt").value = ((new_value >= 0) ? new_value : 0);
        }
    }

    // UPDATE REQUESTED ITEMS
    build_data();

    console.log("[Projects] - Subtracted a set of \"" + project_name + "\"'s items from the selection.");
}

function delete_project_data()
{
    let project_name = document.getElementById("saved-projects-select").value;

    if (project_name !== "[All Projects...]")
    {
        projects.delete(project_name);

        // SAVE PROJECT MAP TO COOKIE AS COOKIE-SAFE JSON STRING
        //Cookies.set('projects', map_of_maps_to_map_string_json(projects), { expires:365 });
        localStorage.setItem('projects', map_of_maps_to_map_string_json(projects));
    }
    else
    {
        projects = new Map();

        // DELETE COOKIE SINCE IT'S NOT NEEDED ANYMORE
        //Cookies.remove('projects');
        localStorage.removeItem('projects');
    }

    update_saved_projects_select();

    toastr.success("Project \"" + project_name + "\" has been deleted!");
    console.log("[Projects] - Deleted \"" + project_name + "\"'s data.");
}

function map_of_maps_to_map_string_json(map_of_maps)
{
    // AKA MAKE COOKIE-SAFE

    // SAVE MAP OF MAPS AS MAP OF JSON STRINGS
    let map_of_json_strings = new Map();
    for (let [project_name, project_data] of map_of_maps)
    {
        //map_of_json_strings.set(project_name, JSON.stringify(Array.from( project_data.entries() )));
        map_of_json_strings.set(project_name, JSON.stringify([...project_data]));
    }

    // SAVE MAP OF JSON STRINGS TO MAP JSON STRING
    return JSON.stringify([...map_of_json_strings]);
    //return JSON.stringify(Array.from( map_of_json_strings.entries() ));
}

function map_string_json_to_map_of_maps(map_json_string)
{
    // AKA UNDO COOKIE-SAFE CONVERSION

    // SAVE MAP JSON STRING AS MAP OF JSON STRINGS
    let map_of_json_strings = new Map(JSON.parse(map_json_string));

    // SAVE MAP OF JSON STRINGS AS MAP OF MAPS
    let map_of_maps = new Map();
    for (let [project_name, data_string_json] of map_of_json_strings)
    {
        map_of_maps.set(project_name, JSON.parse(data_string_json));
    }

    return map_of_maps;
}

function print_project_map(project_map)
{
    for (let [project_name, project_data] of project_map)
    {
        console.log(project_name + ":");
        for (let [item_name, item_amount] of project_data)
        {
            console.log("\t" + item_name + " - " + item_amount);
        }
    }
}

function update_saved_projects_select()
{
    let select_HTML = "<option value=\"[All Projects...]\">[All Projects...]</option>";

    for (let [project_name, project_data] of projects)
    {
        select_HTML += "<option value=\"" + project_name + "\" title=\"" + project_items_toString(project_data) + "\">" + project_name + "</option>";
    }

    document.getElementById("saved-projects-select").innerHTML = select_HTML;
}

function project_items_toString(project_data)
{
    let item_string = "";
    for (let [item_name, item_amount] of project_data)
    {
        item_string += item_name + " - " + item_amount + "\n";
    }

    return item_string;
}

function update_project_selection()
{
    let selected_project = document.getElementById("saved-projects-select").value;

    if (selected_project === "[All Projects...]")
    {
        disable_add_and_sub_buttons(true);
    }
    else
    {
        disable_add_and_sub_buttons(false);
    }

    console.log("[Projects] - Selected \"" + selected_project + "\"");
}

function disable_add_and_sub_buttons(true_or_false)
{
    document.getElementById("project-add-button").disabled = true_or_false;
    document.getElementById("project-sub-button").disabled = true_or_false;
}

function clear_all_item_tables()
{
    clear_item_table();
    build_data();
}

function init_blacklist()
{
    // BLACKLISTS BEING STORED ON COOKIES HAVE BEEN DEPRECIATED. DELETE/IMPORT DATA.
    if (Cookies.get('blacklist'))
    {
        if (typeof(Storage) !== "undefined")
        {
            localStorage.setItem('blacklist', Cookies.get('blacklist'));
        }
        Cookies.remove('blacklist');

        console.log("[Blacklist] - Removed/imported to LocalStorage found blacklist cookie data.");
    }

    if (typeof(Storage) !== "undefined")
    {
        // LOCAL STORAGE IS SUPPORTED

        // LOAD DATA FROM COOKIE
        //let blacklist_cookie_data = Cookies.get('blacklist');
        let blacklist_cookie_data = localStorage.getItem('blacklist');
        let button_title_string = "";
        if (blacklist_cookie_data !== undefined)
        {
            // BLACKLIST COOKIE EXISTS, DECRYPT DATA AND SAVE TO GLOBAL VAR
            let saved_blacklist_array = JSON.parse(blacklist_cookie_data);

            // CLEAN BLACKLIST
            if (disabled_items.length > 0)
            {
                for (let i = 0 ; i < disabled_items.length ; i++)
                {
                    if (document.getElementById("request-button-" + disabled_items[i].split(' ').join('_')))
                    {
                        document.getElementById("request-button-" + disabled_items[i].split(' ').join('_')).classList.toggle("low-opacity");
                    }
                    console.log("[Required Items] - Re-enabled " + disabled_items[i]);
                }
                disabled_items = [];
            }

            for (let i = 0 ; i < saved_blacklist_array.length ; i++)
            {
                init_enabled_items(saved_blacklist_array[i]);
                button_title_string += saved_blacklist_array[i] + "\n";
            }
            refresh_quest_table();

            document.getElementById("blacklist-load-button").title = ((saved_blacklist_array.length > 0) ? button_title_string : "The saved blacklist is empty.");
            console.log("[Blacklist] - Blacklist is initialized!");
        }
    }
}

function save_blacklist()
{
    // SAVE PROJECT MAP TO COOKIE AS COOKIE-SAFE JSON STRING
    //Cookies.set('blacklist', JSON.stringify(disabled_items), { expires:365 });
    localStorage.setItem('blacklist', JSON.stringify(disabled_items));

    let button_title_string = "";
    for (let i = 0 ; i < disabled_items.length ; i++)
    {
        button_title_string += disabled_items[i] + "\n";
    }
    document.getElementById("blacklist-load-button").title = ((disabled_items.length > 0) ? button_title_string : "The saved blacklist is empty.");

    toastr.success("The item blacklist has been saved!");
    console.log("[Blacklist] - The blacklist has been saved.");
}

function clear_blacklist()
{
    if (disabled_items.length > 0)
    {
        for (let i = 0 ; i < disabled_items.length ; i++)
        {
            if (document.getElementById("request-button-" + disabled_items[i].split(' ').join('_')))
            {
                document.getElementById("request-button-" + disabled_items[i].split(' ').join('_')).classList.toggle("low-opacity");
            }
            console.log("[Required Items] - Re-enabled " + disabled_items[i]);
        }
        disabled_items = [];

        refresh_quest_table();

        console.log("[Blacklist] - The blacklist has been cleared.");
    }
    else
    {
        toastr.error("The item blacklist is empty.");
        console.log("[Blacklist] - The blacklist is already empty.");
    }
}

function delete_blacklist()
{
    //if (Cookies.get('blacklist') !== undefined)
    if (localStorage.getItem('blacklist') !== null)
    {
        //Cookies.remove('blacklist');
        localStorage.removeItem('blacklist');
        document.getElementById("blacklist-load-button").title = "There is no saved blacklist.";

        toastr.success("The item blacklist has been deleted!");
        console.log("[Blacklist] - The blacklist has been deleted.");
    }
    else
    {
        toastr.error("There is no saved item blacklist.");
        console.log("[Blacklist] - There is no saved item blacklist.");
    }
}

function blacklist_selected_rarities()
{
    let disable_common = document.getElementById("blacklist-common").checked;
    let disable_copper = document.getElementById("blacklist-copper").checked;
    let disable_silver = document.getElementById("blacklist-silver").checked;
    let disable_gold = document.getElementById("blacklist-gold").checked;
    let disable_purple = document.getElementById("blacklist-purple").checked;

    let rarity_array = [];
    if (disable_common) { rarity_array.push("Common"); }
    if (disable_copper) { rarity_array.push("Copper"); }
    if (disable_silver) { rarity_array.push("Silver"); }
    if (disable_gold) { rarity_array.push("Gold"); }
    if (disable_purple) { rarity_array.push("Purple"); }

    if (rarity_array.length > 0)
    {
        for (let [item_name, item_data_map] of equipment_map)
        {
            let item_id = item_data_map.get("id");
            let has_fragments = get_equipment_data(item_name, "has_fragments");
            let rarity_class = item_id.substring(0, item_id.indexOf('-'));

            switch (rarity_class)
            {
                case "common":
                    if (disable_common)
                    {
                        set_enabled_item(item_name + (has_fragments ? " Fragment" : ""), false);
                    }
                    break;
                case "copper":
                    if (disable_copper)
                    {
                        set_enabled_item(item_name + (has_fragments ? " Fragment" : ""), false);
                    }
                    break;
                case "silver":
                    if (disable_silver)
                    {
                        set_enabled_item(item_name + (has_fragments ? " Fragment" : ""), false);
                    }
                    break;
                case "gold":
                    if (disable_gold)
                    {
                        set_enabled_item(item_name + (has_fragments ? " Fragment" : ""), false);
                    }
                    break;
                case "purple":
                    if (disable_purple)
                    {
                        set_enabled_item(item_name + (has_fragments ? " Fragment" : ""), false);
                    }
                    break;
                default:
                    console.log("[Blacklist] - Unknown Item: " + item_name);
                    break;
            }
        }
        refresh_quest_table();

        toastr.success(rarity_array.toString(), "The Following Rarities Have Been Blacklisted:");
        console.log("[Blacklist] - " + rarity_array.toString() + " rarity(s) have been blacklisted");
    }
    else
    {
        toastr.error("You did not select any rarities.");
    }
}