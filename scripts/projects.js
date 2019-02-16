let projects = new Map();

function init_project_data()
{
    // LOAD DATA FROM COOKIE
    let project_cookie_data = Cookies.get('projects');
    if (project_cookie_data !== undefined)
    {
        // PROJECT COOKIE EXISTS, DECRYPT DATA AND SAVE TO GLOBAL VAR
        projects = map_string_json_to_map_of_maps(project_cookie_data);

        // UPDATE SELECT DISPLAYING SAVED PROJECTS
        update_saved_projects_select();
    }

    console.log("[Projects] - Projects are initialized!");
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
    Cookies.set('projects', map_of_maps_to_map_string_json(projects), { expires:365 });

    // UPDATE SELECT DISPLAYING SAVED PROJECTS
    update_saved_projects_select();

    // SET SELECTED PROJECT TO RECENTLY SAVED PROJECT
    document.getElementById("saved-projects-select").value = project_name;

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
    }
    else
    {
        projects = new Map();
    }

    // SAVE PROJECT MAP TO COOKIE AS COOKIE-SAFE JSON STRING
    Cookies.set('projects', map_of_maps_to_map_string_json(projects), { expires:365 });

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