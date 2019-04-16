let preset_min_rank = 1;
let preset_max_rank = 12;

function build_character_preset_list()
{
    let character_preset_html = "<option value=\"default_character\">[Character...]</option>";
    for (let [character_id, character_data_map] of character_map)
    {
        let character_en = character_data_map.get("name") + ((character_data_map.get("thematic") !== "") ?  (" (" + character_data_map.get("thematic") + ")") : "");
        let character_jp = ((character_data_map.get("thematic_jp") !== "") ?  character_data_map.get("thematic_jp") : "") + character_data_map.get("name_jp");
        character_preset_html += "<option value=\"" + character_id + "\"" + ((character_data_map.get("rank_1")[0] === "") ? " disabled" : "") + ">" + character_en + " | " + character_jp + "</option>";
    }

    document.getElementById("character-preset-list-select").innerHTML = character_preset_html;
}

function update_selected_character_preset_details()
{
    let selected_character = document.getElementById("character-preset-list-select").value;

    if (selected_character === "default_character")
    {
        document.getElementById("preset-character-image").src = "images/unit_icon/Placeholder.png";
        document.getElementById("preset-character-name-label").innerHTML = "";
        document.getElementById("preset-character-load-button").disabled = true;
        document.getElementById("preset-character-min-rank-input").disabled = true;
        document.getElementById("preset-character-max-rank-input").disabled = true;
    }
    else
    {
        let character_name = get_character_data(selected_character, "name");
        let character_thematic = get_character_data(selected_character, "thematic");
        let character_image_name = (character_thematic === "") ? character_name + ".png" : character_thematic + "_" + character_name + ".png";
        let character_thematic_jp = get_character_data(selected_character, "thematic_jp");
        let character_jp = ((character_thematic_jp === "") ? "" : character_thematic_jp) + get_character_data(selected_character, "name_jp");

        document.getElementById("preset-character-image").src = "images/unit_icon/" + character_image_name.split(' ').join('_');
        document.getElementById("preset-character-name-label").innerHTML = ((character_thematic === "") ? character_name : character_name + " (" + character_thematic + ")") + "<br>" + character_jp;
        document.getElementById("preset-character-load-button").disabled = false;
        document.getElementById("preset-character-min-rank-input").disabled = false;
        document.getElementById("preset-character-max-rank-input").disabled = false;
    }

    console.log("[Presets] - Selected \"" + selected_character + "\"");
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

    console.log("[Presets] - Minimum Rank Updated to: " + preset_min_rank);
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

    console.log("[Settings] - Maximum Quest Shown Updated to: " + preset_max_rank);
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

    console.log("[Presets] - Loaded \"" + selected_character + "\"'s items for rank " + preset_min_rank + " - " + preset_max_rank);
}