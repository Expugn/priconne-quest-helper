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
            character_json += "]" + ((i < system.DEFAULT_RANK_AMOUNT) ? "," : "") + spacing.NEW_LINE;
        }

        // CLOSE CHARACTER DATA ; ADD COMMA AND NEW LINE IF NEEDED
        character_json += spacing.DOUBLE + "}" + ((character_counter < character_map.size) ? "," : "") + spacing.NEW_LINE;
        character_counter++;
    }

    // END CHARACTER JSON
    character_json += "}";

    // DISPLAY CHARACTER JSON
    document.getElementById(text_areas.CHARACTER).innerHTML += character_json;
}

function update_character_select()
{
    // SAVE CURRENT SELECTED AND RECREATE SELECT
    let character_selected_value = document.getElementById(select_elements.CHARACTER).value;
    init_character_select();

    // RESTORE SELECTED VALUE
    document.getElementById(select_elements.CHARACTER).value = character_selected_value;
}