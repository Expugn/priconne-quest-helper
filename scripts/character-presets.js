let preset_min_rank = 1;
let preset_max_rank;    // INITIATED IN index.html
let preset_items_rank = 1;

function build_character_preset_list()
{
    let character_preset_html;
    let character_preset_grid_html = "";
    if (current_language === language.ENGLISH)
    {
        character_preset_html = "<option value=\"default_character\">[Character...]</option>";
    }
    else
    {
        character_preset_html = "<option value=\"default_character\">" + language_json["presets_tab"]["characters_select_option"] + "</option>";
    }

    // ENGLISH IS ALREADY ALPHABETICALLY SORTED
    if (current_language === language.ENGLISH)
    {
        for (let [character_id, character_data_map] of character_map)
        {
            let character_en = character_data_map.get("name") + ((character_data_map.get("thematic") !== "") ?  (" (" + character_data_map.get("thematic") + ")") : "");
            let character_jp = character_data_map.get("name_jp") + ((character_data_map.get("thematic_jp") !== "") ?  ("（" + character_data_map.get("thematic_jp") + "）") : "");
            character_preset_html += "<option value=\"" + character_id + "\"" + ((character_data_map.get("rank_1")[0] === "") ? " disabled" : "") + ">" + character_en + " | " + character_jp + "</option>";
            character_preset_grid_html += get_character_grid_html(character_id, character_data_map);
        }
    }
    else
    {
        // SORT CHARACTER MAP
        let sorted_character_map = new Map();
        let character_thematics = {};
        for (let [character_id, character_data_map] of character_map)
        {
            let name = character_data_map.get("name").toLowerCase();
            let thematic = character_data_map.get("thematic").replace(" ", "_").toLowerCase();
            let character_translated = language_json["character_names"][name];

            // IF UNIT IS A THEMATIC ; ADD INFO TO BASE VERSION
            if (thematic !== "")
            {
                if (character_thematics[name] === undefined)
                {
                    character_thematics[name] = [];
                }
                character_thematics[name].push(character_id);

                // CHECK IF THERE IS A BASE VERSION OF THE CHARACTER, IF NOT THEN ADD ONE
                // THIS IS TO DEAL WITH CHARACTERS LIKE 'Mio (Deresute)' AND 'Uzuki (Deresute)'
                // CHARACTER NAME IS SAVED IN PLACE OF character_data_map TO PULL UP THEMATICS LATER
                if (!sorted_character_map.has(character_translated))
                {
                    sorted_character_map.set(character_translated, name);
                }
            }
            else
            {
                sorted_character_map.set(character_translated, character_data_map)
            }
        }
        sorted_character_map = new Map([...sorted_character_map.entries()].sort());

        // BUILD LIST
        for (let [character_id, character_data_map] of sorted_character_map)
        {
            // IGNORE IF character_data_map IS A STRING (MEANING NO BASE VERSION EXISTS)
            // THIS IS TO ACCOUNT FOR CHARACTERS THAT DON'T HAVE A BASE VERSION
            // SUCH AS 'Mio (Deresute)' AND 'Uzuki (Deresute)'
            let name;
            if (!((typeof character_data_map) === 'string'))
            {
                name = character_data_map.get("name").toLowerCase();

                // ADD BASE VERSION TO LIST
                character_preset_html += get_character_select_html(character_data_map);
                character_preset_grid_html += get_character_grid_html(name, character_data_map);
            }
            else
            {
                // character_data_map IS A STRING BECAUSE A BASE VERSION DOES NOT EXIST.
                name = character_data_map;
            }

            // CHECK THEMATICS
            if (character_thematics[name] !== undefined)
            {
                let thematics_array = character_thematics[name];
                for (let i = 0 ; i < thematics_array.length ; i++)
                {
                    character_preset_html += get_character_select_html(character_map.get(thematics_array[i]));
                    character_preset_grid_html += get_character_grid_html(thematics_array[i], character_map.get(thematics_array[i]));
                }
            }
        }

        function get_character_select_html(character_data_map)
        {
            let name = character_data_map.get("name").toLowerCase();
            let thematic = character_data_map.get("thematic").replace(" ", "_").toLowerCase();
            let id = (thematic !== "" ? thematic + "_" : "") + name;

            let character_en = character_data_map.get("name") + ((character_data_map.get("thematic") !== "") ?  (" (" + character_data_map.get("thematic") + ")") : "");
            let character_translated = language_json["character_names"][name] + ((character_data_map.get("thematic") !== "") ? " (" + language_json["thematics"][thematic] + ")" : "");

            // USE （）IF JAPANESE
            if (current_language === language.JAPANESE)
            {
                character_translated = character_translated.replace(' (', '（').replace(')', '）');
            }

            return "<option value=\"" + id + "\"" + ((character_data_map.get("rank_1")[0] === "") ? " disabled" : "") + ">" + character_translated + " | " + character_en + "</option>";
        }
    }

    document.getElementById("character-preset-list-select").innerHTML = character_preset_html;
    document.getElementById("preset-grid-display").innerHTML = character_preset_grid_html;

    update_preset_item_rank_select();

    function get_character_grid_html(character_id, character_data_map) {
        if ((character_data_map.get("rank_1")[0] !== "")) {
            // UNIT IS ENABLED IN SELECT LIST ; DISPLAY IN GRID
            let name = character_data_map.get("name");
            let thematic = character_data_map.get("thematic").replace(' ', '_');
            let file_name = (thematic === "") ? name : thematic + "_" + name;
            return "<button class='preset-grid-button' onclick='select_unit_from_preset_grid(\"" + character_id + "\");'>" +
                "<img class='preset-grid-button-img' src=\"" + get_unit_icon_image_path(file_name) + "\" alt=''>" +
                "</button>";
        }
        else {
            // UNIT IS DISABLED IN SELECT LIST ; DO NOT DISPLAY IN GRID
            return "";
        }

    }
}

function update_selected_character_preset_details()
{
    let selected_character = document.getElementById("character-preset-list-select").value;

    if (selected_character === "default_character")
    {
        document.getElementById("preset-character-image").src = get_unit_icon_image_path("Placeholder");
        document.getElementById("preset-character-name-label").innerHTML = "";
        document.getElementById("preset-character-load-button").disabled = true;
        document.getElementById("preset-character-load-and-create-project-button").disabled = true;
        document.getElementById("preset-character-min-rank-input").disabled = true;
        document.getElementById("preset-character-max-rank-input").disabled = true;
        clear_preset_items();
        if (!document.getElementById("preset-items-div").classList.contains("grayscale")) {
            document.getElementById("preset-items-div").classList.toggle("grayscale");
            document.getElementById("preset-items-rank-label").classList.toggle("grayscale");
        }
        document.getElementById("preset-items-previous-rank-button").disabled = true;
        document.getElementById("preset-items-next-rank-button").disabled = true;
    }
    else
    {
        if (check_if_character_exists(selected_character) === true)
        {
            let character_name = get_character_data(selected_character, "name");
            let character_thematic = get_character_data(selected_character, "thematic");
            let character_image_name = (character_thematic === "") ? character_name : character_thematic + "_" + character_name;
            let character_thematic_tl;
            let character_tl;

            if (current_language === language.ENGLISH)
            {
                character_thematic_tl = get_character_data(selected_character, "thematic_jp");
                character_tl = get_character_data(selected_character, "name_jp") + ((character_thematic_tl === "") ? "" : "（" + character_thematic_tl + "）");
            }
            else
            {
                let tl_name = character_name.toLowerCase();
                let tl_thematic = character_thematic.replace(" ", "_").toLowerCase();

                character_thematic_tl = language_json["thematics"][tl_thematic];
                character_tl = language_json["character_names"][tl_name] + ((character_thematic === "") ? "" : " (" + character_thematic_tl + ")");

                // USE （）IF JP
                if (current_language === language.JAPANESE)
                {
                    character_tl = character_tl.replace(' (', '（').replace(')', '）');
                }
            }

            document.getElementById("preset-character-image").src = get_unit_icon_image_path(character_image_name.split(' ').join('_'));
            if (current_language === language.ENGLISH)
            {
                document.getElementById("preset-character-name-label").innerHTML = ((character_thematic === "") ? character_name : character_name + " (" + character_thematic + ")") + "<br>" + character_tl;
            }
            else
            {
                document.getElementById("preset-character-name-label").innerHTML = character_tl + "<br>" + ((character_thematic === "") ? character_name : character_name + " (" + character_thematic + ")");
            }
            document.getElementById("preset-character-load-button").disabled = false;
            document.getElementById("preset-character-load-and-create-project-button").disabled = false;
            document.getElementById("preset-character-min-rank-input").disabled = false;
            document.getElementById("preset-character-max-rank-input").disabled = false;
            if (document.getElementById("preset-items-div").classList.contains("grayscale")) {
                document.getElementById("preset-items-div").classList.toggle("grayscale");
                document.getElementById("preset-items-rank-label").classList.toggle("grayscale");
            }
            document.getElementById("preset-items-previous-rank-button").disabled = false;
            document.getElementById("preset-items-next-rank-button").disabled = false;

            get_preset_items();
        }
    }
}

function change_min_rank_preset()
{
    const max_value = document.getElementById("preset-character-min-rank-input").max;
    const min_value = document.getElementById("preset-character-min-rank-input").min;

    preset_min_rank = Math.round(document.getElementById("preset-character-min-rank-input").value);

    if (preset_min_rank > max_value)
    {
        document.getElementById("preset-character-min-rank-input").value = max_value;
        preset_min_rank = max_value;
    }
    if (preset_min_rank > preset_max_rank)
    {
        document.getElementById("preset-character-min-rank-input").value = preset_max_rank;
        preset_min_rank = preset_max_rank;
    }
    if (preset_min_rank < min_value)
    {
        document.getElementById("preset-character-min-rank-input").value = min_value;
        preset_min_rank = min_value;
    }

    console.log(get_colored_message("Presets", highlight("Minimum Rank") + color_text(" changed to ", message_status.INFO) + highlight_code(preset_min_rank)));
}

function change_max_rank_preset()
{
    const max_value = document.getElementById("preset-character-max-rank-input").max;
    const min_value = document.getElementById("preset-character-max-rank-input").min;

    preset_max_rank = Math.round(document.getElementById("preset-character-max-rank-input").value);

    if (preset_max_rank > max_value)
    {
        document.getElementById("preset-character-max-rank-input").value = max_value;
        preset_max_rank = max_value;
    }
    if (preset_max_rank < min_value)
    {
        document.getElementById("preset-character-max-rank-input").value = min_value;
        preset_max_rank = min_value;
    }
    if (preset_max_rank < preset_min_rank)
    {
        document.getElementById("preset-character-max-rank-input").value = preset_min_rank;
        preset_max_rank = preset_min_rank;
    }

    console.log(get_colored_message("Presets", highlight("Maximum Rank") + color_text(" changed to ", message_status.INFO) + highlight_code(preset_max_rank)));
}

function load_preset_character_items()
{
    let character_items_map = new Map();
    let selected_character = document.getElementById("character-preset-list-select").value;

    // LOOP THROUGH RANK ITEMS
    for (let i = (preset_min_rank - 1) ; i < preset_max_rank ; i++)
    {
        // GET SPECIFIC RANK ITEMS
        let rank_items = get_character_data(selected_character, "rank_" + (i + 1));

        // ADD RANK ITEMS TO COMPLETE ARRAY
        for (let a = 0 ; a < 6 ; a++)
        {
            // ITEM ISN'T UNDEFINED
            if (rank_items[a] !== "")
            {
                // ADD ITEM TO MAP, BUT CHECK IF IT ALREADY EXISTS.
                if (character_items_map.has(rank_items[a]))
                {
                    character_items_map.set(rank_items[a], (character_items_map.get(rank_items[a]) + 1));
                }
                else
                {
                    character_items_map.set(rank_items[a], 1);
                }
            }
        }
    }

    // CLEAR ALL DATA
    clear_item_table();

    // SET ITEM VALUES
    for (let [item_name, item_amount] of character_items_map)
    {
        document.getElementById(get_equipment_data(item_name, "id") + "-amt").value = item_amount;
    }

    // UPDATE REQUESTED ITEMS
    build_data();

    console.log(get_colored_message("Presets", "Loaded ", message_status.INFO) + highlight(selected_character) + message_status.INFO + "'s equipment for rank " + highlight_code(preset_min_rank) + message_status.INFO + " - " + highlight_code(preset_max_rank));
}

function load_preset_character_items_and_create_project()
{
    // LOAD CHARACTER ITEMS
    load_preset_character_items();

    // COLLECT DATA
    let selected_min_rank_value = document.getElementById("preset-character-min-rank-input").value;
    let selected_max_rank_value = document.getElementById("preset-character-max-rank-input").value;
    let selected_character = document.getElementById("character-preset-list-select").value;

    // DETERMINE PROJECT NAME
    let project_name_suffix = " [" + ((selected_min_rank_value === selected_max_rank_value) ? selected_min_rank_value : (selected_min_rank_value + " - " + selected_max_rank_value)) + "]";
    let project_name = "";    // SUFFIX

    let character_name = get_character_data(selected_character, "name");
    let character_thematic = get_character_data(selected_character, "thematic");
    if (current_language === language.ENGLISH)
    {
        project_name += character_name + ((character_thematic !== "") ? (" (" + character_thematic + ")") : "");
    }
    else
    {
        character_name = character_name.toLowerCase();
        character_thematic = character_thematic.replace(" ", "_").toLowerCase();

        let translated_name = language_json["character_names"][character_name] + ((character_thematic !== "") ? " (" + language_json["thematics"][character_thematic] + ")" : "");
        // USE （）IF JP
        if (current_language === language.JAPANESE)
        {
            translated_name = translated_name.replace(' (', '（').replace(')', '）');
        }

        project_name += translated_name;
    }

    // CHECK IF PROJECT NAME ALREADY EXISTS
    if (projects.has(project_name))
    {
        let looking_for_unused_name = true;
        let name_counter = 2;

        while (looking_for_unused_name)
        {
            if (projects.has(project_name + " (" + name_counter + ")"))
            {
                name_counter++;
            }
            else
            {
                looking_for_unused_name = false;
            }
        }
        project_name = project_name + " (" + name_counter + ")";
    }

    // ADD SUFFIX
    project_name += project_name_suffix;

    // SAVE PROJECT
    document.getElementById("project-name-input").value = project_name;
    save_project_data();
}

function toggle_preset_grid_display()
{
    document.getElementById("character-preset-settings").hidden = !document.getElementById("character-preset-settings").hidden;
    document.getElementById("character-preset-grid").hidden = !document.getElementById("character-preset-grid").hidden;
}

function select_unit_from_preset_grid(unit_id)
{
    document.getElementById("character-preset-list-select").value = unit_id;
    update_selected_character_preset_details();
    toggle_preset_grid_display();
    document.getElementById("presets-container").scrollIntoView();
}

function add_preset_item(item_name)
{
    if (item_name !== "") {
        const item_id = get_equipment_data(item_name, "id");
        document.getElementById(item_id + "-amt").value++;

        // UPDATE REQUESTED ITEMS
        build_data();
    }
}

function toggle_bulk_mode()
{
    document.getElementById("preset-bulk-mode-button").classList.toggle("low-opacity");
    document.getElementById("preset-bulk-settings").hidden = !document.getElementById("preset-bulk-settings").hidden;
    document.getElementById("preset-single-settings").hidden = !document.getElementById("preset-single-settings").hidden;
}

function clear_preset_items()
{
    for (let i = 1 ; i <= 6 ; i++) {
        document.getElementById("preset-item-" + i).src = get_item_image_path("Placeholder");
        document.getElementById("preset-item-" + i).title = "";
        document.getElementById("preset-item-" + i).nextElementSibling.style = "opacity: 0;"
    }
}

function get_preset_items() {
    let selected_character = document.getElementById("character-preset-list-select").value;
    if (selected_character !== "default_character") {
        let counter = 1;
        get_character_data(selected_character, "rank_" + preset_items_rank).forEach( function (item_name) {
            document.getElementById("preset-item-" + counter).src = get_item_image_path(item_name.split(' ').join('_'));
            document.getElementById("preset-item-" + counter).title = item_name;

            let plus_element = document.getElementById("preset-item-" + counter).nextElementSibling;
            if (item_name === "") {
                plus_element.style = "opacity: 0;";
            }
            else {
                plus_element.style = "";
            }

            counter++;
        });
    }
}

function next_preset_rank() {
    if ((preset_items_rank + 1) <= max_character_rank_information.LOADED) {
        preset_items_rank++;
        get_preset_items();
        update_preset_rank_label();
        document.getElementById("preset-items-rank-select").value = preset_items_rank + "";
    }

}

function previous_preset_rank() {
    if ((preset_items_rank - 1) >= 1) {
        preset_items_rank--;
        get_preset_items();
        update_preset_rank_label();
        document.getElementById("preset-items-rank-select").value = preset_items_rank + "";
    }
}

function update_preset_rank_label() {
    const preset_items_rank_label_element = document.getElementById("preset-items-rank-label");
    preset_items_rank_label_element.innerHTML = "Rank " + preset_items_rank;
    preset_items_rank_label_element.className = "";

    // UPDATE TEXT COLOR
    preset_items_rank_label_element.classList.toggle(get_rank_color_class(preset_items_rank));
}

function open_preset_rank_dropdown() {
    document.getElementById("preset-items-rank-select").hidden = false;
    document.getElementById("preset-items-rank-label").hidden = true;
    document.getElementById("preset-items-rank-buttons").hidden = true;
}

function close_preset_rank_dropdown() {
    preset_items_rank = parseInt(document.getElementById("preset-items-rank-select").value);
    get_preset_items();
    update_preset_rank_label();

    document.getElementById("preset-items-rank-select").hidden = true;
    document.getElementById("preset-items-rank-label").hidden = false;
    document.getElementById("preset-items-rank-buttons").hidden = false;

    document.getElementById("presets-container").scrollIntoView();
}

function update_preset_item_rank_select() {
    let html = "";
    for (let i = 1 ; i <= max_character_rank_information.LOADED ; i++) {
        html += "<option class=\"preset-items-rank-option " + get_rank_color_class(i) + "\" value=\"" + i + "\">Rank " + i + "</option>";
    }
    document.getElementById("preset-items-rank-select").innerHTML = html;
    document.getElementById("preset-items-rank-select").size = document.getElementById("preset-items-rank-select").length / 2;
}

function get_rank_color_class(rank) {
    switch (rank) {
        case 1:
            return "text-color_common";
        case 2:
        case 3:
            return "text-color_copper";
        case 4:
        case 5:
        case 6:
            return "text-color_silver";
        case 7:
        case 8:
        case 9:
        case 10:
            return "text-color_gold";
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
            return "text-color_purple";
        default:
            return "text-color_misc";
    }
}