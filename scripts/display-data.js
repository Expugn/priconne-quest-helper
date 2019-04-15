// read-equipment-json.js NEEDS TO BE INCLUDED AND LOADED!

function display_data(div_id, projects_json, blacklist_json, settings_json)
{
    let div_element = document.getElementById(div_id);
    if (div_element)
    {
        // DIV ELEMENT EXISTS, DISPLAY INFORMATION NOW
        let projects_provided = projects_json !== "";
        let blacklist_provided = blacklist_json !== "";
        let settings_provided = settings_json !== "";

        if (!projects_provided && !blacklist_provided && !settings_provided)
        {
            // !!ERROR!! NO DATA IS PROVIDED
            throw "No Data Available to Export!";
        }
        else
        {
            let div_html = "";

            if (projects_provided) { div_html += build_project_display(projects_json); }
            if (blacklist_provided) { div_html += build_blacklist_display(blacklist_json); }
            if (settings_provided) { div_html += build_settings_display(settings_json); }

            div_element.innerHTML = div_html;
        }
    }
}

function build_project_display(project_json)
{
    // SAVE MAP JSON STRING AS MAP OF JSON STRINGS
    let map_of_json_strings = new Map(project_json);

    // SAVE MAP OF JSON STRINGS AS MAP OF MAPS
    let project_map = new Map();
    for (let [project_name, data_string_json] of map_of_json_strings)
    {
        project_map.set(project_name, JSON.parse(data_string_json));
    }

    let project_display_HTML = "<div id=\"project-display\" style=\"overflow-x: auto\"><h1 class=\"align-center\">⸻ Projects ⸻</h1>";
    project_display_HTML += "<h4 class=\"align-center item-count\">" + project_map.size + " project(s) found.</h4>";

    for (let [project_name, project_data] of project_map)
    {
        // PRINT PROJECT NAME
        project_display_HTML += "<h3 class='project-title' style='font-style: oblique'>\"" + project_name + "\"</h3>";

        // PRINT PROJECT ITEMS

        // NEW TABLE + OPEN TBODY
        let count = 0;
        project_display_HTML += "<div style=\"overflow-x: auto; overflow-y: hidden\"><table class=\"centerTable\"><tbody>";

        for (let [item_name, item_amount] of project_data)
        {
            // CHECK IF EQUIPMENT EXISTS, IF NO THEN ERROR
            if (!equipment_map.has(item_name))
            {
                if (!(item_name.includes(" Fragment") && get_equipment_data(item_name.replace(" Fragment", ""), "has_fragments")))
                {
                    throw "Error Found in Projects Data!";
                }
            }

            // ADD TABLE ROW START IF FIRST ITEM
            if (count === 0)
            {
                project_display_HTML += "<tr>";
            }

            if (count % 7 === 0 && count !== 0)
            {
                project_display_HTML += "</tr><tr>";
            }

            // ITEM IMAGE
            /*
            $.ajax({
                url: "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/images/items/" + item_name.split(' ').join('_') + ".png",
                type: 'HEAD',
                error: function ()
                {
                    data_failure();
                }
            });
            */
            project_display_HTML += "<th class=\"requested-item-image\">";
            project_display_HTML += "<img " +
                "class=\"requested-item-image\" " +
                "title=\"" + item_name + "\" " +
                "src=\"../../images/items_webp/" + item_name.split(' ').join('_') + ".webp\" " +
                "alt=\"\">";
            project_display_HTML += "<div class=\"requested-item-text\">\u00D7" + item_amount + "</div>";

            count++;
        }

        // CLOSE TBODY AND TABLE
        project_display_HTML += "</tbody></table></div>";
    }
    project_display_HTML += "<br><hr></div>";

    return project_display_HTML;
}

function build_blacklist_display(blacklist_json)
{
    // SAVE MAP JSON STRING AS ARRAY
    let blacklist_array = blacklist_json;

    let blacklist_display_HTML = "<div id=\"blacklist-display\"><h1 class=\"align-center\">⸻ Blacklist ⸻</h1>";
    blacklist_display_HTML += "<h4 class=\"align-center item-count\">" + blacklist_array.length + " blacklisted item(s) found.</h4><br>";

    // NEW TABLE + OPEN TBODY
    let count = 0;
    blacklist_display_HTML += "<div style=\"overflow-x: auto; overflow-y: hidden\"><table class=\"centerTable\"><tbody>";
    for (let i = 0 ; i < blacklist_array.length ; i++)
    {
        let item_name = blacklist_array[i];

        // CHECK IF EQUIPMENT EXISTS, IF NO THEN ERROR
        if (!equipment_map.has(item_name))
        {
            if (!(item_name.includes(" Fragment") && get_equipment_data(item_name.replace(" Fragment", ""), "has_fragments")))
            {
                throw "Error Found in Blacklist Data!";
            }
        }

        // ADD TABLE ROW START IF FIRST ITEM
        if (count === 0)
        {
            blacklist_display_HTML += "<tr>";
        }

        if (count % 7 === 0 && count !== 0)
        {
            blacklist_display_HTML += "</tr><tr>";
        }

        // ITEM IMAGE
        /*
        $.ajax({
            url: "/" + window.location.pathname.substring(0, window.location.pathname.indexOf('/')) + window.location.pathname.split('/')[1] + "/images/items/" + item_name.split(' ').join('_') + ".png",
            type: 'HEAD',
            error: function ()
            {
                data_failure();
            }
        });
        */

        blacklist_display_HTML += "<th class=\"requested-item-image\">";
        blacklist_display_HTML += "<img " +
            "class=\"requested-item-image low-opacity\" " +
            "title=\"" + item_name + "\" " +
            "src=\"../../images/items_webp/" + item_name.split(' ').join('_') + ".webp\" " +
            "alt=\"\">";

        count++;
    }
    // CLOSE TBODY AND TABLE
    blacklist_display_HTML += "</tbody></table></div><br><hr></div>";

    return blacklist_display_HTML;
}

function build_settings_display(settings_json)
{
    let saved_settings_map = settings_json;

    // CHECK FOR MISSING SETTINGS
    if (!saved_settings_map.hasOwnProperty("quest_shown_value") ||
        !saved_settings_map.hasOwnProperty("ascending_sort_quest_list") ||
        !saved_settings_map.hasOwnProperty("ascending_sort_quest_score") ||
        !saved_settings_map.hasOwnProperty("hide_quest_score") ||
        !saved_settings_map.hasOwnProperty("min_quest_chapter") ||
        !saved_settings_map.hasOwnProperty("max_quest_chapter") ||
        !saved_settings_map.hasOwnProperty("quest_filter") ||
        !saved_settings_map.hasOwnProperty("item_amount_per_row") ||
        !(saved_settings_map.quest_filter === "filter-all" || saved_settings_map.quest_filter === "filter-normal" || saved_settings_map.quest_filter === "filter-hard"))
    {
        throw "Error Found in Settings Data!";
    }
    else
    {
        let settings_display_HTML = "<div id=\"settings-display\"><h1 class=\"align-center\">⸻ Settings ⸻</h1>";
        settings_display_HTML += "<table class='center'><tbody><tr><td>";
        settings_display_HTML += "<textarea rows='10' cols='37' disabled>";

        let dump = JSON.stringify(saved_settings_map, null, 4);
        settings_display_HTML += dump;

        settings_display_HTML += "</textarea></td></tr></tbody></table><br><hr></div>";

        return settings_display_HTML;
    }
}