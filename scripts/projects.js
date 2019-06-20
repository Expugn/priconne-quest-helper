let projects = new Map();
let priority_projects = [];

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

        // NOTE: "cookie_data" just means stuff from the LocalStorage/Browser.
        //       Was too lazy to change the variable name.

        // LOAD DATA FROM COOKIE
        let project_cookie_data = localStorage.getItem('projects');
        let priority_project_cookie_data = localStorage.getItem('priority_projects');

        if (priority_project_cookie_data !== null)
        {
            // PRIORITY PROJECT COOKIE EXISTS, DECRYPT DATA AND SAVE TO GLOBAL VAR

            priority_projects = JSON.parse(priority_project_cookie_data);
        }


        if (project_cookie_data !== undefined)
        {
            // PROJECT COOKIE EXISTS, DECRYPT DATA AND SAVE TO GLOBAL VAR
            projects = map_string_json_to_map_of_maps(project_cookie_data);

            // UPDATE SELECT DISPLAYING SAVED PROJECTS
            update_saved_projects_select();

            console.log("[Projects] - Projects are initialized!");
        }
    }
}

function save_project_data()
{
    // SAVE CURRENT SESSION DATA
    let tmp = document.createElement("DIV");
    tmp.innerHTML = document.getElementById("project-name-input").value;
    let project_name = tmp.textContent || tmp.innerText || "";

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
    localStorage.setItem('projects', map_of_maps_to_map_string_json(projects));

    // UPDATE SELECT DISPLAYING SAVED PROJECTS
    update_saved_projects_select();

    // SET SELECTED PROJECT TO RECENTLY SAVED PROJECT, ALSO ENABLE ADD/SUB BUTTONS AND SHOW PRIORITIZE BUTTON
    document.getElementById("saved-projects-select").value = project_name;
    disable_add_and_sub_buttons(false);
    show_prioritize_button(true);

    if (current_language === "en")
    {
        toastr.success("Project \"" + project_name + "\" has been " + (project_name_exists ? "overwritten!" : "saved!"));
    }
    else
    {
        let translated_toast = language_json["toasts"]["project_saved"];
        translated_toast = translated_toast.replace("${project_name}", project_name);
        translated_toast = (project_name_exists ?
            translated_toast.replace("${status}", language_json["toasts"]["overwritten_status"]) :
            translated_toast.replace("${status}", language_json["toasts"]["saved_status"]));
        toastr.success(translated_toast);
    }
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
        localStorage.setItem('projects', map_of_maps_to_map_string_json(projects));
    }
    else
    {
        projects = new Map();
        priority_projects = [];

        // DELETE COOKIE SINCE IT'S NOT NEEDED ANYMORE
        //Cookies.remove('projects');
        localStorage.removeItem('projects');
        localStorage.removeItem('priority_projects');
    }

    if (priority_projects.includes(project_name))
    {
        // DELETE FROM PRIORITY PROJECT LIST
        let index = priority_projects.indexOf(project_name);
        if (index > -1)
        {
            priority_projects.splice(index, 1);
        }

        show_prioritize_button(true);
        save_priority_projects();

        console.log("[Priority Projects] - Removing \"" + project_name + "\" from the list due to it being deleted.")
    }

    update_saved_projects_select();
    disable_add_and_sub_buttons(true);

    if (current_language === "en")
    {
        toastr.success("Project \"" + project_name + "\" has been deleted!");
    }
    else
    {
        let translated_toast = language_json["toasts"]["project_deleted"];
        if (project_name === "[All Projects...]")
        {
            translated_toast = translated_toast.replace("${project_name}", language_json["projects_tab"]["all_projects_select_option"]);
        }
        else
        {
            translated_toast = translated_toast.replace("${project_name}", project_name);
        }

        toastr.success(translated_toast);
    }
    console.log("[Projects] - Deleted \"" + project_name + "\"'s data.");
}

function map_of_maps_to_map_string_json(map_of_maps)
{
    // AKA MAKE COOKIE-SAFE

    // SAVE MAP OF MAPS AS MAP OF JSON STRINGS
    let map_of_json_strings = new Map();
    for (let [project_name, project_data] of map_of_maps)
    {
        map_of_json_strings.set(project_name, JSON.stringify([...project_data]));
    }

    // SAVE MAP OF JSON STRINGS TO MAP JSON STRING
    return JSON.stringify([...map_of_json_strings]);
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
    const priority_project_symbol = "[★]";

    let select_HTML;
    if (current_language === "en")
    {
        select_HTML = "<option value=\"[All Projects...]\">[All Projects...]</option>";
    }
    else
    {
        select_HTML = "<option value=\"[All Projects...]\">" + language_json["projects_tab"]["all_projects_select_option"] + "</option>";
    }

    for (let [project_name, project_data] of projects)
    {
        if (priority_projects.includes(project_name))
        {
            select_HTML += "<option value=\"" + project_name + "\" title=\"" + project_items_toString(project_data) + "\">" + priority_project_symbol + " " + project_name + "</option>";
        }
        else
        {
            select_HTML += "<option value=\"" + project_name + "\" title=\"" + project_items_toString(project_data) + "\">" + project_name + "</option>";
        }
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

    let is_project_prioritized = priority_projects.includes(selected_project);
    show_prioritize_button(!is_project_prioritized);

    console.log("[Projects] - Selected \"" + selected_project + "\"" + (is_project_prioritized ? " (Prioritized)" : ""));
}

function disable_add_and_sub_buttons(true_or_false)
{
    document.getElementById("project-add-button").disabled = true_or_false;
    document.getElementById("project-sub-button").disabled = true_or_false;

    document.getElementById("prioritize-project-button").disabled = true_or_false;
    document.getElementById("deprioritize-project-button").disabled = true_or_false;
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
        let blacklist_cookie_data = localStorage.getItem('blacklist');

        let button_title_string = "";
        if (blacklist_cookie_data !== null)
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
    let encrypted_disabled_item_array = JSON.stringify(disabled_items);
    localStorage.setItem('blacklist', encrypted_disabled_item_array);

    let button_title_string = "";
    for (let i = 0 ; i < disabled_items.length ; i++)
    {
        button_title_string += disabled_items[i] + "\n";
    }
    document.getElementById("blacklist-load-button").title = ((disabled_items.length > 0) ? button_title_string : "The saved blacklist is empty.");

    if (current_language === "en")
    {
        toastr.success("The item blacklist has been saved!");
    }
    else
    {
        toastr.success(language_json["toasts"]["blacklist_saved"]);
    }
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

        if (current_language === "en")
        {
            toastr.success("The item blacklist has been cleared!");
        }
        else
        {
            toastr.success(language_json["toasts"]["blacklist_cleared"]);
        }
        console.log("[Blacklist] - The blacklist has been cleared.");
    }
    else
    {
        if (current_language === "en")
        {
            toastr.error("The item blacklist is empty.");
        }
        else
        {
            toastr.error(language_json["toasts"]["blacklist_empty"]);
        }
        console.log("[Blacklist] - The blacklist is already empty.");
    }
}

function delete_blacklist()
{

    if (localStorage.getItem('blacklist') !== null)
    {
        localStorage.removeItem('blacklist');
        document.getElementById("blacklist-load-button").title = "There is no saved blacklist.";

        if (current_language === "en")
        {
            toastr.success("The item blacklist has been deleted!");
        }
        else
        {
            toastr.success(language_json["toasts"]["blacklist_deleted"]);
        }
        console.log("[Blacklist] - The blacklist has been deleted.");
    }
    else
    {
        if (current_language === "en")
        {
            toastr.error("There is no saved item blacklist.");
        }
        else
        {
            toastr.error(language_json["toasts"]["no_saved_blacklist"]);
        }
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

        if (current_language === "en")
        {
            toastr.success(rarity_array.toString(), "The Following Rarities Have Been Blacklisted:");
        }
        else
        {
            let temp_rarity_array = rarity_array.toString();
            temp_rarity_array = temp_rarity_array.replace("Common", language_json["items_tab"]["common_title"]);
            temp_rarity_array = temp_rarity_array.replace("Copper", language_json["items_tab"]["copper_title"]);
            temp_rarity_array = temp_rarity_array.replace("Silver", language_json["items_tab"]["silver_title"]);
            temp_rarity_array = temp_rarity_array.replace("Gold", language_json["items_tab"]["gold_title"]);
            temp_rarity_array = temp_rarity_array.replace("Purple", language_json["items_tab"]["purple_title"]);

            toastr.success(temp_rarity_array, language_json["toasts"]["blacklisted_rarities"]);
        }
        console.log("[Blacklist] - " + rarity_array.toString() + " rarity(s) have been blacklisted");
    }
    else
    {
        if (current_language === "en")
        {
            toastr.error("You did not select any rarities.");
        }
        else
        {
            toastr.error(language_json["toasts"]["no_rarities_selected"]);
        }

    }
}

function show_prioritize_button(true_or_false)
{
    document.getElementById("prioritize-project-button").hidden = !true_or_false;
    document.getElementById("deprioritize-project-button").hidden = true_or_false;
}

function prioritize_selected_project(true_or_false)
{
    let selected_project = document.getElementById("saved-projects-select").value;

    if (true_or_false)
    {
        priority_projects.push(selected_project);
    }
    else
    {
        let index = priority_projects.indexOf(selected_project);
        if (index > -1)
        {
            priority_projects.splice(index, 1);
        }
    }

    show_prioritize_button(!true_or_false);
    update_saved_projects_select();
    document.getElementById("saved-projects-select").value = selected_project;

    save_priority_projects();

    console.log("[Priority Projects] - " + (true_or_false ? "Prioritized" : "Deprioritized") + " \"" + selected_project + "\"")
}

function save_priority_projects()
{
    if (priority_projects.length > 0)
    {
        let encrypted_priority_projects_array = JSON.stringify(priority_projects);
        localStorage.setItem('priority_projects', encrypted_priority_projects_array);
    }
    else
    {
        // IF PRIORITY PROJECT LIST IS EMPTY, JUST DELETE FROM LOCAL STORAGE.
        localStorage.removeItem('priority_projects');
    }
}