const ALL_PROJECTS = "[All Projects...]";

let projects = new Map();
let priority_projects = [];
let priority_items_array = [];
let priority_items_compiled = false;
let completed_projects = [];

function init_project_data()
{
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
            // ALSO COMPILE LIST OF PRIORITY ITEMS FROM PRIORITY PROJECTS

            priority_projects = JSON.parse(priority_project_cookie_data);
        }

        if (project_cookie_data !== null)
        {
            // PROJECT COOKIE EXISTS, DECRYPT DATA AND SAVE TO GLOBAL VAR
            projects = map_string_json_to_map_of_maps(project_cookie_data);

            // UPDATE SELECT DISPLAYING SAVED PROJECTS
            update_saved_projects_select();

            console.log(get_colored_message("Projects", "User projects have been loaded!", message_status.SUCCESS));
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
    if (project_name === "" || project_name === ALL_PROJECTS)
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

    // SORT PROJECTS
    projects = new Map([...projects.entries()].sort());

    // SAVE PROJECT MAP TO COOKIE AS COOKIE-SAFE JSON STRING
    localStorage.setItem('projects', map_of_maps_to_map_string_json(projects));

    // UPDATE SELECT DISPLAYING SAVED PROJECTS
    update_saved_projects_select();

    // SET SELECTED PROJECT TO RECENTLY SAVED PROJECT, ALSO ENABLE ADD/SUB BUTTONS AND SHOW PRIORITIZE BUTTON
    document.getElementById("saved-projects-select").value = project_name;
    disable_add_and_sub_buttons(false);
    disable_complete_project_button(true);
    show_prioritize_button(true);

    // UPDATE PRIORITY ITEMS
    get_priority_items();

    if (current_language === language.ENGLISH)
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
    console.log(get_colored_message("Projects", "Project ", message_status.SUCCESS) + highlight_code(project_name) + message_status.SUCCESS + " has been saved.");
}

function load_project_data()
{
    let project_name = document.getElementById("saved-projects-select").value;
    let project_data = projects.get(project_name);

    // CLEAR ALL DATA
    clear_item_table();

    if (project_name !== ALL_PROJECTS)
    {
        // SET ITEM VALUES
        for (let [item_name, item_amount] of project_data)
        {
            if (check_if_equipment_exists(item_name))
            {
                document.getElementById(get_equipment_data(item_name, "id") + "-amt").value = item_amount;
            }
        }

        // UPDATE REQUESTED ITEMS
        build_data();

        // CHANGE PROJECT NAME TO SELECTED PROJECT
        document.getElementById("project-name-input").value = project_name;
    }
    else
    {
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

    console.log(get_colored_message("Projects", "Loaded project ", message_status.INFO) + highlight_code(project_name) + color_text(".", message_status.INFO))
}

function add_project_data()
{
    let project_name = document.getElementById("saved-projects-select").value;
    let project_data = projects.get(project_name);

    // SET ITEM VALUES
    for (let [item_name, item_amount] of project_data)
    {
        if (check_if_equipment_exists(item_name))
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

    console.log(get_colored_message("Projects", "Added a set of ", message_status.SUCCESS) + highlight_code(project_name) + color_text("'s items to the required items.", message_status.SUCCESS));
}

function sub_project_data()
{
    let project_name = document.getElementById("saved-projects-select").value;
    let project_data = projects.get(project_name);

    // SET ITEM VALUES
    for (let [item_name, item_amount] of project_data)
    {
        if (check_if_equipment_exists(item_name))
        {
            let current_amount = document.getElementById(get_equipment_data(item_name, "id") + "-amt").value;
            if (current_amount >= 1)
            {
                let new_value = parseInt(current_amount) - parseInt(item_amount);
                document.getElementById(get_equipment_data(item_name, "id") + "-amt").value = ((new_value >= 0) ? new_value : 0);
            }
        }
    }

    // UPDATE REQUESTED ITEMS
    build_data();

    console.log(get_colored_message("Projects", "Subtracted a set of ", message_status.WARNING) + highlight_code(project_name) + color_text("'s items from the required items.", message_status.WARNING));
}

function delete_project_data()
{
    let project_name = document.getElementById("saved-projects-select").value;

    if (project_name !== ALL_PROJECTS)
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
        localStorage.removeItem('projects');
        localStorage.removeItem('priority_projects');
        get_priority_items();
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

        console.log(get_colored_message("Projects", "Removing ", message_status.WARNING) + highlight_code(project_name) + color_text(" from the prioritized projects list due to it being deleted.", message_status.WARNING));
    }

    update_saved_projects_select();
    disable_add_and_sub_buttons(true);
    disable_complete_project_button(false);

    if (current_language === language.ENGLISH)
    {
        toastr.success("Project \"" + project_name + "\" has been deleted!");
    }
    else
    {
        let translated_toast = language_json["toasts"]["project_deleted"];
        if (project_name === ALL_PROJECTS)
        {
            translated_toast = translated_toast.replace("${project_name}", language_json["projects_tab"]["all_projects_select_option"]);
        }
        else
        {
            translated_toast = translated_toast.replace("${project_name}", project_name);
        }

        toastr.success(translated_toast);
    }
    console.log(get_colored_message("Projects", "Deleted project ", message_status.SUCCESS) + highlight_code(project_name) + message_status.SUCCESS + ".");
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

function update_saved_projects_select()
{
    const priority_project_symbol = " [★]";
    const completed_project_symbol = " [✔]";
    let currently_selected_project = document.getElementById("saved-projects-select").value;

    // ADD [All Projects..] SELECT
    // IF LANGUAGE ISN'T ENGLISH, TRANSLATE [All Projects...] TO APPROPRIATE LANGUAGE
    let select_HTML;
    if (current_language === language.ENGLISH)
    {
        select_HTML = "<option value=\"[All Projects...]\">[All Projects...]</option>";
    }
    else
    {
        select_HTML = "<option value=\"[All Projects...]\">" + language_json["projects_tab"]["all_projects_select_option"] + "</option>";
    }

    // ADD PROJECTS TO SELECT
    for (let [project_name, project_data] of projects)
    {
        let project_complete_status = check_project_if_complete(project_data, project_name);
        let project_prioritized_status = priority_projects.includes(project_name);

        select_HTML += "<option value=\"" + project_name + "\" title=\"" + project_items_toString(project_data) + "\">"
            + (project_complete_status ? completed_project_symbol : "")
            + (project_prioritized_status ? priority_project_symbol : "")
            + ((project_complete_status || project_prioritized_status) ? " " : "") + project_name + "</option>";
    }

    // DISPLAY SELECT AND RESTORE CURRENT SELECTION
    document.getElementById("saved-projects-select").innerHTML = select_HTML;
    if (currently_selected_project !== "")
    {
        if ($("#saved-projects-select option[value='" + currently_selected_project + "']").length > 0)
        {
            document.getElementById("saved-projects-select").value = currently_selected_project;
        }
        else
        {
            document.getElementById("saved-projects-select").value = ALL_PROJECTS;
        }
    }
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

function check_project_if_complete(project_data, project_name)
{
    if (typeof disabled_items === 'undefined')
    {
        // BLACKLIST DATA IS NOT DEFINED.
        return false;
    }
    else
    {
        for (let [item_name, item_amount] of project_data)
        {
            for (let [comp_name, comp_amount] of get_recipe(item_name, item_amount))
            {
                // CHECK IF ITEM IS MISSING IN disabled_items (BLACKLIST)
                if (!disabled_items.includes(comp_name))
                {
                    // REMOVE PROJECT FROM COMPLETION
                    if (completed_projects.includes(project_name))
                    {
                        let index = completed_projects.indexOf(project_name);
                        if (index > -1)
                        {
                            completed_projects.splice(index, 1);
                        }
                    }

                    // PROJECT IS NOT COMPLETE
                    return false;
                }
            }

        }
        // ADD PROJECT TO COMPLETED LIST IF DOES NOT EXIST
        if (!completed_projects.includes(project_name))
        {
            completed_projects.push(project_name);
        }

        // PROJECT IS COMPLETE
        return true;
    }
}

function update_project_selection()
{
    let selected_project = document.getElementById("saved-projects-select").value;

    if (selected_project === ALL_PROJECTS)
    {
        disable_add_and_sub_buttons(true);
    }
    else
    {
        disable_add_and_sub_buttons(false);
    }

    let is_project_prioritized = priority_projects.includes(selected_project);
    show_prioritize_button(!is_project_prioritized);

    let is_project_complete = selected_project !== ALL_PROJECTS;
    disable_complete_project_button(is_project_complete);

    console.log(get_colored_message("Projects", "Selected ", message_status.INFO) + highlight_code(selected_project) + message_status.INFO + "." +
        (is_project_complete ? color_text(" (Completed)", console_colors.GREEN) : "") +
        (is_project_prioritized ? color_text(" (Prioritized)", console_colors.MAGENTA) : ""));
}

function disable_add_and_sub_buttons(true_or_false)
{
    document.getElementById("project-add-button").disabled = true_or_false;
    document.getElementById("project-sub-button").disabled = true_or_false;

    document.getElementById("prioritize-project-button").disabled = true_or_false;
    document.getElementById("deprioritize-project-button").disabled = true_or_false;
}

function disable_complete_project_button(project_completion_status)
{
    document.getElementById("project-complete-button").disabled = !project_completion_status;
}

function clear_all_item_tables()
{
    clear_item_table();
    build_data();
}

function init_blacklist()
{
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
                    //console.log(get_colored_message("Blacklist", "Re-enabled ", message_status.SUCCESS) + highlight(disabled_items[i]) + color_text(".", message_status.SUCCESS));
                }
                disabled_items = [];
            }

            for (let i = 0 ; i < saved_blacklist_array.length ; i++)
            {
                init_enabled_items(saved_blacklist_array[i]);
                button_title_string += saved_blacklist_array[i] + "\n";
            }
            refresh_quest_table();
            update_saved_projects_select();

            document.getElementById("blacklist-load-button").title = ((saved_blacklist_array.length > 0) ? button_title_string : "The saved blacklist is empty.");
            console.log(get_colored_message("Blacklist", "User blacklist has been loaded!", message_status.SUCCESS));
        }
    }
}

function save_blacklist()
{
    if (disabled_items.length > 0)
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

        if (current_language === language.ENGLISH)
        {
            toastr.success("The item blacklist has been saved!");
        }
        else
        {
            toastr.success(language_json["toasts"]["blacklist_saved"]);
        }
        console.log(get_colored_message("Blacklist", "The blacklist has been saved.", message_status.SUCCESS));
    }
    else
    {
        if (current_language === language.ENGLISH)
        {
            toastr.error("The item blacklist is empty.");
        }
        else
        {
            toastr.error(language_json["toasts"]["blacklist_empty"]);
        }
        console.log(get_colored_message("Blacklist", "The blacklist is empty. Nothing can be saved.", message_status.WARNING));
    }
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
            //console.log("[Required Items] - Re-enabled " + disabled_items[i]);
        }
        disabled_items = [];

        refresh_quest_table();
        update_saved_projects_select();

        if (current_language === language.ENGLISH)
        {
            toastr.success("The item blacklist has been cleared!");
        }
        else
        {
            toastr.success(language_json["toasts"]["blacklist_cleared"]);
        }
        console.log(get_colored_message("Blacklist", "The blacklist has been cleared.", message_status.SUCCESS));
    }
    else
    {
        if (current_language === language.ENGLISH)
        {
            toastr.error("The item blacklist is empty.");
        }
        else
        {
            toastr.error(language_json["toasts"]["blacklist_empty"]);
        }
        console.log(get_colored_message("Blacklist", "The blacklist is already empty.", message_status.WARNING));
    }
}

function delete_blacklist()
{

    if (localStorage.getItem('blacklist') !== null)
    {
        localStorage.removeItem('blacklist');
        document.getElementById("blacklist-load-button").title = "There is no saved blacklist.";

        if (current_language === language.ENGLISH)
        {
            toastr.success("The item blacklist has been deleted!");
        }
        else
        {
            toastr.success(language_json["toasts"]["blacklist_deleted"]);
        }
        console.log(get_colored_message("Blacklist", "The blacklist has been deleted.", message_status.SUCCESS));
    }
    else
    {
        if (current_language === language.ENGLISH)
        {
            toastr.error("There is no saved item blacklist.");
        }
        else
        {
            toastr.error(language_json["toasts"]["no_saved_blacklist"]);
        }
        console.log(get_colored_message("Blacklist", "There is no saved blacklist.", message_status.WARNING));
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
                case "misc":
                    // IGNORED
                    break;
                default:
                    console.log(get_colored_message("Blacklist", "Unknown item found in blacklist: ", message_status.WARNING) + highlight_code(item_name));
                    break;
            }
        }
        refresh_quest_table();
        update_saved_projects_select();

        if (current_language === language.ENGLISH)
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
        console.log(get_colored_message("Blacklist") + highlight_code(rarity_array.toString()) + color_text(" rarity(s) have been blacklisted.", message_status.SUCCESS));
    }
    else
    {
        if (current_language === language.ENGLISH)
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
    if (selected_project !== ALL_PROJECTS)
    {
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

        console.log(get_colored_message("Projects") + (true_or_false ? color_text("Prioritized ", message_status.SUCCESS) : color_text("Deprioritized ", message_status.WARNING)) + highlight_code(selected_project) + color_text(".", (true_or_false ? message_status.SUCCESS : message_status.WARNING)));
    }
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
    get_priority_items();
}

/**
 * Combine all recipes needed for a project
 *
 * @param {string} project_name
 * @returns {Map.<string, number>}
 */
function get_combined_project_items(project_name) {
    let project_data = projects.get(project_name);

    let project_recipes = [];
    for (let [item_name, item_amount] of project_data)
    {
        project_recipes.push(get_recipe(item_name, item_amount));
    }

    let total_recipe = get_total_recipe(project_recipes);

    return total_recipe;
}

/**
 * Complete currently selected project, that is:
 * - remove the project from the project list
 * - subtract all project items from the inventory
 * - remove all project items from the blacklist
 */
function complete_project()
{
    let project_name = document.getElementById("saved-projects-select").value;
    let total_recipe = get_combined_project_items(project_name);

    inventory_remove(total_recipe);

    // CLEAN PROJECT ITEMS FROM BLACKLIST
    for (let [comp_name, comp_amount] of total_recipe)
    {
        // COMPONENT EXISTS IN disabled_items (BLACKLIST)...
        if (disabled_items.includes(comp_name))
        {
            // REMOVE ITEM FROM DISABLED LIST
            let index = disabled_items.indexOf(comp_name);
            if (index > -1)
            {
                disabled_items.splice(index, 1);
            }

            // TOGGLE LOW OPACITY ON COMPONENT IN REQUIRED INGREDIENTS IF POSSIBLE
            if (document.getElementById("request-button-" + comp_name.split(' ').join('_')))
            {
                document.getElementById("request-button-" + comp_name.split(' ').join('_')).classList.toggle("low-opacity");
            }
        }
    }

    // DELETE PROJECT
    projects.delete(project_name);

    // SAVE PROJECT MAP TO COOKIE AS COOKIE-SAFE JSON STRING
    localStorage.setItem('projects', map_of_maps_to_map_string_json(projects));

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

        console.log(get_colored_message("Projects", "Removing ", message_status.WARNING) + highlight_code(project_name) + color_text(" from the priority project list due to it being completed and deleted.", message_status.WARNING));
    }

    update_saved_projects_select();
    disable_add_and_sub_buttons(true);
    disable_complete_project_button(false);

    // DISPLAY TOAST
    if (current_language === language.ENGLISH)
    {
        toastr.success("Project \"" + project_name + "\" has been completed!");
    }
    else
    {
        let translated_toast = language_json["toasts"]["project_completed"];
        translated_toast = translated_toast.replace("${project_name}", project_name);

        toastr.success(translated_toast);
    }
    console.log(get_colored_message("Projects", "Completed project ", message_status.SUCCESS) + highlight_code(project_name) + color_text("!", message_status.SUCCESS));
}
