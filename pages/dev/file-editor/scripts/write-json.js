const spacing = Object.freeze({
    DOUBLE: '  ',           // 2 SPACES
    TAB: '    ',            // 4 SPACES
    NEW_LINE: '\n'          // NEW LINE
});

function write_character_json()
{
    let character_counter = 1;

    // BEGIN CHARACTER JSON
    let character_json = "{" + spacing.NEW_LINE;

    for (let [character_id, character_data] of character_map)
    {
        // CHARACTER ID
        character_json += spacing.DOUBLE + "\"" + character_id + "\": {" + spacing.NEW_LINE;

        // NAME
        character_json += spacing.TAB + "\"name\": \"" + get_character_data(character_id, "name") + "\"," + spacing.NEW_LINE;
        // THEMATIC
        character_json += spacing.TAB + "\"thematic\": \"" + get_character_data(character_id, "thematic") + "\"," + spacing.NEW_LINE;
        // NAME JP
        character_json += spacing.TAB + "\"name_jp\": \"" + get_character_data(character_id, "name_jp") + "\"," + spacing.NEW_LINE;
        // THEMATIC JP
        character_json += spacing.TAB + "\"thematic_jp\": \"" + get_character_data(character_id, "thematic_jp") + "\"," + spacing.NEW_LINE;
        // RANKS
        for (let i = 1 ; i <= CURRENT_RANK_AMOUNT ; i++)
        {
            character_json += spacing.TAB + "\"rank_" + i + "\": [";
                for (let j = 0 ; j < system.CHARACTER_RANK_EQUIP_COUNT ; j++)
                {
                    character_json += "\"" + get_character_data(character_id, "rank_" + i)[j] + "\"" + (((j + 1) < system.CHARACTER_RANK_EQUIP_COUNT) ? ", " : "");
                }
            character_json += "]" + ((i < CURRENT_RANK_AMOUNT) ? "," : "") + spacing.NEW_LINE;
        }

        // CLOSE CHARACTER DATA ; ADD COMMA AND NEW LINE IF NEEDED
        character_json += spacing.DOUBLE + "}" + ((character_counter < character_map.size) ? "," : "") + spacing.NEW_LINE;
        character_counter++;
    }

    // END CHARACTER JSON
    character_json += "}";

    // DISPLAY CHARACTER JSON
    document.getElementById(text_areas.CHARACTER).innerHTML = character_json;
}

function write_equipment_json()
{
    let rarity_counter = new Map();
    let equipment_counter = 1;

    // BEGIN EQUIPMENT JSON
    let equipment_json = "{" + spacing.NEW_LINE;

    for (let [equipment_id, equipment_data] of equipment_map)
    {
        // EQUIPMENT ID
        equipment_json += spacing.DOUBLE + "\"" + equipment_id + "\": {" + spacing.NEW_LINE;

        // NAME
        equipment_json += spacing.TAB + "\"name\": \"" + get_equipment_data(equipment_id, "name") + "\"," + spacing.NEW_LINE;
        // ID
        let item_rarity = get_equipment_data(equipment_id, "id").split('-')[0];
        equipment_json += spacing.TAB + "\"id\": \"" + item_rarity + "-" + get_rarity_index(item_rarity) + "\"," + spacing.NEW_LINE;
        // HAS FRAGMENTS
        equipment_json += spacing.TAB + "\"has_fragments\": " + get_equipment_data(equipment_id, "has_fragments") + "," + spacing.NEW_LINE;
        // REQUIRED PIECES
        equipment_json += spacing.TAB + "\"req_pieces\": " + get_equipment_data(equipment_id, "req_pieces") + "," + spacing.NEW_LINE;
        // REQUIRED ITEMS
        const req_items_array_length = get_equipment_data(equipment_id, "req_items").length;
        if (req_items_array_length > 0)
        {
            equipment_json += spacing.TAB + "\"req_items\": [ ";
            for (let i = 0 ; i < req_items_array_length ; i++)
            {
                equipment_json += "\"" + get_equipment_data(equipment_id, "req_items")[i] + "\"";
                if ((i + 1) < req_items_array_length)
                {
                    equipment_json += ", ";
                }
            }
            equipment_json += " ]" + spacing.NEW_LINE;
        }
        else
        {
            equipment_json += spacing.TAB + "\"req_items\": []" + spacing.NEW_LINE;
        }

        // CLOSE EQUIPMENT DATA ; ADD COMMA + NEW LINE IF NEEDED
        equipment_json += spacing.DOUBLE + "}" + ((equipment_counter < equipment_map.size) ? "," : "") + spacing.NEW_LINE;
        equipment_counter++;
    }

    // END EQUIPMENT JSON
    equipment_json += "}";

    // DISPLAY EQUIPMENT JSON
    document.getElementById(text_areas.EQUIPMENT).innerHTML = equipment_json;

    function get_rarity_index(rarity)
    {
        if (rarity_counter.has(rarity))
        {
            rarity_counter.set(rarity, rarity_counter.get(rarity) + 1);
        }
        else
        {
            rarity_counter.set(rarity, 1);
        }
        return rarity_counter.get(rarity);
    }
}

function update_character_select()
{
    // SAVE CURRENT SELECTED AND RECREATE SELECT
    let character_selected_value = document.getElementById(select_elements.CHARACTER).value;
    init_character_select();

    // RESTORE SELECTED VALUE
    document.getElementById(select_elements.CHARACTER).value = character_selected_value;
}

function update_equipment_select()
{
    // SAVE CURRENT SELECTED AND RECREATE SELECT
    let equipment_selected_value = document.getElementById(select_elements.EQUIPMENT).value;
    init_equipment_select();

    // RESTORE SELECTED VALUE
    document.getElementById(select_elements.EQUIPMENT).value = equipment_selected_value;
}