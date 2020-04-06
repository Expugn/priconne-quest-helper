let last_compiled_all_recipe_maps_array = [];

let focused_item_name = "";
let focused_item_element_id = "";

function build_recommended_quest_table(all_recipe_maps_array)
{
    last_compiled_all_recipe_maps_array = all_recipe_maps_array;
    let total_recipe = get_total_recipe(all_recipe_maps_array);
    let quest_table = document.getElementById("recommended-quest-table");
    let quests = quest_map;

    // REPLACE TOTAL RECIPE WITH TOTAL RECIPE W/O DISABLED COMPONENTS FROM RECIPE READER/REQUIRED INGREDIENTS TABLE
    for (let i = 0 ; i < disabled_items.length ; i++)
    {
        if (total_recipe.has(disabled_items[i]))
        {
            // DISABLED ITEM EXISTS IN TOTAL RECIPE, DELETE IT
            total_recipe.delete(disabled_items[i]);
        }
    }

    // APPLY INVENTORY TO TOTAL RECIPE IF POSSIBLE
    total_recipe = apply_inventory_to_total_recipe(total_recipe, true, true);

    // COMPILE LIST OF PRIORITY ITEMS FROM PRIORITY PROJECTS
    if (!priority_items_compiled)
    {
        get_priority_items();
    }

    /* OPEN OR CLOSE QUEST BOARD */
    if (total_recipe.size > 0)
    {
        document.getElementById("recommended-quest-div").style.overflow = "hidden";

        /* ITERATE THROUGH ALL QUESTS, GENERATE QUEST SCORE */
        let quest_score_map = new Map();

        const QUEST_SCORE_VALUES = Object.freeze({
            TOP_TWO: 1.0,
            THIRD: 0.75,
            SUBDROP: 0.5,
            PRIORITY_MULTIPLIER: 2.0,
        });

        for (let [quest_id, quest_data] of quests)
        {
            let split_quest_id = quest_id.split("-")[0];
            let quest_chapter_num = parseInt(split_quest_id);

            // CHECK IF QUEST CHAPTER IS WITHIN RANGE OF SETTINGS
            if (quest_chapter_num >= min_quest_chapter && quest_chapter_num <= max_quest_chapter)
            {
                let filter_exclude_quest = false;

                let quest_is_normal_difficulty = !quest_id.includes("H");
                let quest_is_hard_difficulty = quest_id.includes("H") && !quest_id.includes("VH");
                let quest_is_very_hard_difficulty = quest_id.includes("H") && quest_id.includes("VH");

                // CHECK IF QUEST IS NORMAL/HARD IF SET TO CHECK
                if (quest_filter === quest_filter_settings.NORMAL || quest_filter === quest_filter_settings.HARD || quest_filter === quest_filter_settings.VERY_HARD)
                {
                    if ((quest_is_hard_difficulty || quest_is_very_hard_difficulty) && quest_filter === quest_filter_settings.NORMAL)
                    {
                        //  QUEST INCLUDES 'H' OR 'VH' AND QUEST FILTER IS SET TO NORMAL, REMOVE QUEST
                        filter_exclude_quest = true;
                    }
                    else if ((quest_is_normal_difficulty || quest_is_very_hard_difficulty) && quest_filter === quest_filter_settings.HARD)
                    {
                        // QUEST DOESN'T INCLUDE 'H' AND QUEST FILTER IS SET TO HARD, REMOVE QUEST
                        filter_exclude_quest = true;
                    }
                    else if ((quest_is_normal_difficulty || quest_is_hard_difficulty) && quest_filter === quest_filter_settings.VERY_HARD)
                    {
                        // QUEST DOESN'T INCLUDE 'VH' AND QUEST FILTER IS SET TO VERY HARD, REMOVE QUEST
                        filter_exclude_quest = true;
                    }
                }

                // IF THERE IS A FOCUSED ITEM, CHECK IF THE QUEST CONTAINS THAT ITEM
                if (focused_item_name !== "")
                {
                    // IF FOCUSED ITEM IS NOT ITEM 1-3 OR IN SUBDROPS... FILTER OUT QUEST
                    // btw this whole " Fragment" fix is really lazy. don't do this at home.
                    if (!(
                            quest_data.get("item_1")["item_name"] === focused_item_name ||
                            quest_data.get("item_2")["item_name"] === focused_item_name ||
                            quest_data.get("item_3")["item_name"] === focused_item_name ||
                            quest_data.get("subdrops").includes(focused_item_name) ||
                            (quest_is_hard_difficulty && quest_data.get("char_shard")["item_name"] === focused_item_name) ||
                            (quest_is_very_hard_difficulty && quest_data.get("char_shard")["item_name"] === focused_item_name) ||
                            quest_data.get("item_1")["item_name"] === focused_item_name + " Fragment" ||
                            quest_data.get("item_2")["item_name"] === focused_item_name + " Fragment" ||
                            quest_data.get("item_3")["item_name"] === focused_item_name + " Fragment" ||
                            quest_data.get("subdrops").includes(focused_item_name + " Fragment")
                        ))
                    {
                        filter_exclude_quest = true;
                    }
                }

                if (!filter_exclude_quest) {
                    let item_1_name = quest_data.get("item_1")["item_name"];       // OBJECT
                    let item_2_name = quest_data.get("item_2")["item_name"];       // OBJECT
                    let item_3_name = quest_data.get("item_3")["item_name"];       // OBJECT
                    let item_1_dp = quest_data.get("item_1")["drop_percent"];      // OBJECT
                    let item_3_dp = quest_data.get("item_3")["drop_percent"];      // OBJECT
                    let quest_subdrops = quest_data.get("subdrops");               // ARRAY
                    let q_subdrops_percent = quest_data.get("subdrops_percent");   // ARRAY

                    let char_shard = "";
                    if (quest_is_hard_difficulty || quest_is_very_hard_difficulty) { char_shard = quest_data.get("char_shard")["item_name"]; } // OBJECT

                    let item_4_name = "";
                    let item_4_dp = "";
                    if (quest_is_very_hard_difficulty) {
                        item_4_name = quest_data.get("item_4")["item_name"];
                        item_4_dp = quest_data.get("item_4")["drop_percent"];
                    }

                    let quest_score = 0;

                    // GO THROUGH ITEMS 1 - 4 TO COLLECT QUEST SCORE
                    if (total_recipe.has(item_1_name)) {
                        quest_score += QUEST_SCORE_VALUES.TOP_TWO * (priority_items_array.includes(item_1_name) ? QUEST_SCORE_VALUES.PRIORITY_MULTIPLIER : 1);
                    }
                    if (total_recipe.has(item_2_name)) {
                        quest_score += QUEST_SCORE_VALUES.TOP_TWO * (priority_items_array.includes(item_2_name) ? QUEST_SCORE_VALUES.PRIORITY_MULTIPLIER : 1);
                    }
                    if (total_recipe.has(item_3_name)) {
                        // IF ITEM_3 DROP PERCENT === ITEM_1 DROP PERCENT, USE `TOP TWO` SCORE VALUE, ELSE USE `THIRD`
                        quest_score += ((item_1_dp === item_3_dp) ? QUEST_SCORE_VALUES.TOP_TWO : QUEST_SCORE_VALUES.THIRD) *
                            (priority_items_array.includes(item_3_name) ? QUEST_SCORE_VALUES.PRIORITY_MULTIPLIER : 1);
                    }
                    if (total_recipe.has(item_4_name)) {
                        // ITEM_4 IS CURRENTLY EXCLUSIVE TO VERY HARD QUESTS ONLY.
                        // IT'S DROP PERCENT WILL ALWAYS EQUAL ITEMS 1 - 3
                        quest_score += QUEST_SCORE_VALUES.TOP_TWO * (priority_items_array.includes(item_4_name) ? QUEST_SCORE_VALUES.PRIORITY_MULTIPLIER : 1);
                    }

                    // GO THROUGH SUBDROPS TO COLLECT QUEST SCORE
                    for (let i = 0 ; i < quest_subdrops.length ; i++) {
                        if (total_recipe.has(quest_subdrops[i]))
                        {
                            if (q_subdrops_percent === undefined) {
                                // QUEST SUBDROPS ARE ALL 20% DROP RATE
                                quest_score += QUEST_SCORE_VALUES.SUBDROP * (priority_items_array.includes(quest_subdrops[i]) ? QUEST_SCORE_VALUES.PRIORITY_MULTIPLIER : 1);
                            }
                            else {
                                // QUEST SUBDROPS HAVE DIFFERENT DROP RATES
                                let score_to_be_added;
                                switch (q_subdrops_percent[i]) {
                                    case 24:
                                        score_to_be_added = QUEST_SCORE_VALUES.THIRD;
                                        break;
                                    case 20:
                                        score_to_be_added = QUEST_SCORE_VALUES.SUBDROP;
                                        break;
                                    case 17:
                                        score_to_be_added = QUEST_SCORE_VALUES.SUBDROP / 2;
                                        break;
                                    case 15:
                                        score_to_be_added = QUEST_SCORE_VALUES.SUBDROP / 3;
                                        break;
                                    default:
                                        score_to_be_added = QUEST_SCORE_VALUES.SUBDROP;
                                        break;
                                }
                                quest_score += score_to_be_added * (priority_items_array.includes(quest_subdrops[i]) ? QUEST_SCORE_VALUES.PRIORITY_MULTIPLIER : 1);
                            }
                        }
                    }

                    // CHECK CHARACTER SHARD AND COLLECT QUEST SCORE
                    if (total_recipe.has(char_shard)) {
                        quest_score += QUEST_SCORE_VALUES.TOP_TWO * (priority_items_array.includes(char_shard) ? QUEST_SCORE_VALUES.PRIORITY_MULTIPLIER : 1);
                    }

                    // IF QUEST SCORE IS NOT ZERO, ADD TO QUEST TABLE
                    if (quest_score !== 0) {
                        quest_score_map.set(quest_id, +quest_score.toFixed(2));
                    }
                }
            }
        }

        /* SORT */
        quest_score_map[Symbol.iterator] = function* ()
        {
            yield* [...this.entries()].sort(function (x, y)
            {
                // PARSE AND INIT DATA
                let x_quest_id = x[0];
                let x_quest_split = x_quest_id.split("-");
                let x_quest_chapter = x_quest_split[0];
                let x_quest_quest = x_quest_split[1];
                let x_quest_very_hard = 0;
                if (x_quest_quest.includes("H") && x_quest_quest.includes("VH"))   // VERY HARD DIFFICULTY
                {
                    x_quest_quest.replace("VH", "");
                    x_quest_very_hard = 2000;
                }
                let x_quest_hard = 0;
                if (x_quest_quest.includes("H") && !x_quest_quest.includes("VH"))   // HARD DIFFICULTY
                {
                    x_quest_quest.replace("H", "");
                    x_quest_hard = 1000;
                }
                let x_quest_value = (parseInt(x_quest_chapter) * 10000) + (parseInt(x_quest_quest) * 10) + x_quest_hard + x_quest_very_hard;

                let y_quest_id = y[0];
                let y_quest_split = y_quest_id.split("-");
                let y_quest_chapter = y_quest_split[0];
                let y_quest_quest = y_quest_split[1];
                let y_quest_very_hard = 0;
                if (y_quest_quest.includes("H") && y_quest_quest.includes("VH"))    // VERY HARD DIFFICULTY
                {
                    y_quest_quest.replace("VH", "");
                    y_quest_very_hard = 2000;
                }
                let y_quest_hard = 0;
                if (y_quest_quest.includes("H") && !y_quest_quest.includes("VH"))   // HARD DIFFICULTY
                {
                    y_quest_quest.replace("H", "");
                    y_quest_hard = 1000;
                }
                let y_quest_value = (parseInt(y_quest_chapter) * 10000) + (parseInt(y_quest_quest) * 10) + y_quest_hard + y_quest_very_hard;

                // SORTING CODE
                let n = (ascending_sort_quest_score ? sort_ascending(x[1], y[1]) : sort_descending(x[1], y[1]));
                if (n !== 0)
                {
                    return n;
                }

                return (ascending_sort_quest_list ? sort_ascending(x_quest_value, y_quest_value) : sort_descending(x_quest_value, y_quest_value));
            });
        };

        // CONSTRUCT QUEST LIST
        let table_html = "";
        let quest_count = 0;
        if (quest_score_map.size > 0)
        {
            for (let [quest_id, quest_score] of quest_score_map)
            {
                // INITIALIZE VARIABLES
                const item_1 = get_quest_data(quest_id, "item_1");
                const item_1_name = item_1["item_name"];
                const item_1_drop_percent = item_1["drop_percent"];
                const item_2 = get_quest_data(quest_id, "item_2");
                const item_2_name = item_2["item_name"];
                const item_2_drop_percent = item_2["drop_percent"];
                const item_3 = get_quest_data(quest_id, "item_3");
                const item_3_name = item_3["item_name"];
                const item_3_drop_percent = item_3["drop_percent"];
                const item_4 = (quest_id.includes("VH") ? get_quest_data(quest_id, "item_4") : null);
                const item_4_name = (quest_id.includes("VH") ? item_4["item_name"] : null);
                const item_4_drop_percent = (quest_id.includes("VH") ? item_4["drop_percent"] : null);
                const character_shard = (quest_id.includes("H") ? get_quest_data(quest_id, "char_shard") : null);
                const char_shard_name = (quest_id.includes("H") ? character_shard["item_name"] : null);
                const char_shard_drop_rate = (quest_id.includes("H") ? character_shard["drop_percent"] : null);
                const subdrops = get_quest_data(quest_id, "subdrops");
                const subdrops_percent = get_quest_data(quest_id, "subdrops_percent");

                // APPLY COLOR ACCORDING TO QUEST SCORE
                let quest_score_color = "";
                if (quest_score >= 2)
                {
                    quest_score_color = "quest-title_bg_green";
                }
                else if (quest_score >= 1)
                {
                    quest_score_color = "quest-title_bg_yellow";
                }
                else
                {
                    quest_score_color = "quest-title_bg_red";
                }

                function write_quest_item(item_name, drop_percent) {
                    const required_amount = (total_recipe.get(item_name) !== undefined ? total_recipe.get(item_name) : 0);
                    item_name = (item_name === null ? "Placeholder" : item_name);
                    return "<div class='quest_item" + (item_name === "Placeholder" ? " remove" : "") + (total_recipe.has(item_name) ? "" : " disabled") + "'>" +
                        "<img class='quest_item-img" +
                            (is_item_a_priority_and_needed(item_name) && total_recipe.has(item_name) ? " quest_priority-item" : "") +
                            "' src=\"" + get_item_image_path(item_name.split(' ').join('_')) + "\" title=\"" + item_name + "\" alt=''>" +
                        "<div class='quest_drop-percent " + (quest_display !== quest_display_settings.AMOUNT ? "quest_display-top" : "quest_display-bottom") + "'>" +
                            drop_percent + "%</div>" +
                        "<div class='quest_required-amount " + (quest_display !== quest_display_settings.AMOUNT ? "quest_display-bottom" : "quest_display-top") + "'>" +
                            "\u00D7" + required_amount + "</div></div>";
                }

                // START QUEST HTML
                table_html += "<div class='quest " + (quest_count % 2 === 0 ? "odd" : "even") + "'>";

                // START QUEST HEADER
                table_html += "<div class='quest_header'>";

                // QUEST TITLE
                let quest_is_hard_difficulty = quest_id.includes("H") && !quest_id.includes("VH");
                let quest_is_very_hard_difficulty = quest_id.includes("H") && quest_id.includes("VH");
                table_html += "<div class='quest_title " + quest_score_color + "'>" +
                    (!quest_id.includes("H") ? quest_id : "") +                                                                 // NORMAL
                    (quest_is_hard_difficulty ? quest_id.replace("H", "<span class='heart-red'> H</span>") : "") +              // HARD
                    (quest_is_very_hard_difficulty ? quest_id.replace("VH", "<span class='heart-red'> VH</span>") : "") +       // VERY HARD
                    "</div>";

                // MEMORY PIECE
                const is_char_shard_exists = character_shard !== null;
                table_html += "<div class='quest_memory-piece" + (is_char_shard_exists ? "" : " remove") + (total_recipe.has(char_shard_name) ? "" : " disabled") + "'>" +
                    "<img class='quest_memory-piece-img' src=\"" + get_item_image_path((is_char_shard_exists ? char_shard_name.split(' ').join('_') : "Placeholder")) + "\" " +
                        "title=\"" + (is_char_shard_exists ? char_shard_name : "") + "\" alt=''>" +
                    "<div class='quest_memory-piece-percent'>" + (is_char_shard_exists ? char_shard_drop_rate : 0) + "%</div>" +
                    "</div>";

                // END QUEST HEADER
                table_html += "</div>";

                // QUEST SCORE
                table_html += "<div class='quest_score" + (hide_quest_score ? " remove" : "") + "'>" + quest_score + " pts</div>";

                // QUEST LINE 1
                table_html += "<br class='quest_line'>";

                // QUEST ITEMS (1 TO 4)
                table_html += "<div class='quest_items'>" +
                    write_quest_item(item_1_name, item_1_drop_percent) +
                    write_quest_item(item_2_name, item_2_drop_percent) +
                    write_quest_item(item_3_name, item_3_drop_percent) +
                    write_quest_item(item_4_name, item_4_drop_percent) +
                    "</div>";

                // QUEST LINE 2
                table_html += "<br class='quest_line-2'>";

                // QUEST SUBDROPS
                table_html += "<div class='quest_subdrops'>";
                for (let i = 0 ; i < subdrops.length ; i++) {
                    const drop_percent = (subdrops_percent !== undefined ? subdrops_percent[i] : 20);
                    table_html += write_quest_item(subdrops[i], drop_percent);
                }
                table_html += "</div>";

                // END QUEST HTML
                table_html += "</div>";

                // INCREMENT AND CHECK QUEST COUNT
                quest_count++;
                if (quest_count >= quest_shown_value) {
                    break;
                }
            }
        }

        quest_table.innerHTML = table_html;

        // SHOW QUESTS
        document.getElementById("recommended-quest-div").style.height = (quest_table.scrollHeight + 10) + "px";

        const waitForFinal = (function () {
            let timers = {};
            return function (callback, ms, uniqueID) {
                if (!uniqueID) {
                    uniqueID = "Don't call this twice without an uniqueID";
                }
                if (timers[uniqueID]) {
                    clearTimeout(timers[uniqueID]);
                }
                timers[uniqueID] = setTimeout(callback, ms);
            }
        })();
        $(window).on("resize", function () {
            // WAIT FOR FINAL RESIZE EVENT BEFORE RESIZING QUEST TABLE
            waitForFinal(function () {
                document.getElementById("recommended-quest-div").style.height = (document.getElementById("recommended-quest-table").scrollHeight + 10) + "px";
            }, 500, "quest-resize");
        });
    }
    else
    {
        // HIDE QUESTS
        document.getElementById("recommended-quest-div").style.height = "10px";
        quest_table.innerHTML = "";
        $(window).off("resize");
    }
}

function refresh_quest_table()
{
    if (last_compiled_all_recipe_maps_array.length > 0)
    {
        build_recommended_quest_table(last_compiled_all_recipe_maps_array);
    }
}

function is_item_a_priority_and_needed(item_name)
{
    if (priority_items_array.includes(item_name))
    {
        return !disabled_items.includes(item_name);
    }
}

function get_priority_items()
{
    priority_items_array = [];
    if (priority_projects.length > 0)
    {
        for (let i = 0 ; i < priority_projects.length ; i++)
        {
            let project_data = projects.get(priority_projects[i]);

            for (let [item_name, item_amount] of project_data)
            {
                let item_recipe = get_recipe(item_name, 1);
                for (let [component_name, component_amount] of item_recipe)
                {
                    if (!priority_items_array.includes(component_name))
                    {
                        // INSERT ITEM COMPONENT INTO ARRAY IF IT DOESN'T EXIST ALREADY.
                        priority_items_array.push(component_name);
                    }
                }
            }
        }
    }

    // MARK PRIORITY ITEMS AS COMPILED
    if (!priority_items_compiled)
    {
        priority_items_compiled = true;
    }
    else
    {
        refresh_quest_table();
    }
}

function focus_on_item(item_name, item_id)
{
    // ADD BACK APOSTROPHE
    item_name = item_name.replace("[apostrophe]", "'");

    // CHECK IF USER IS CLICKING ON THE FOCUSED ITEM (DISABLE FOCUSED!)
    if (focused_item_element_id === item_id)
    {
        document.getElementById(item_id).classList.toggle("focused-item");
        focused_item_name = "";
        focused_item_element_id = "";

        // HIDE FOCUSED ITEM POPUP
        document.getElementById("focused-item-popup").hidden = true;

        console.log(get_colored_message("Item Focus", "No longer focusing on an item.", message_status.INFO));
    }
    else
    {
        // IF THERE IS AN EXISTING FOCUSED ITEM, REMOVE FOCUS
        if (focused_item_element_id !== "")
        {
            document.getElementById(focused_item_element_id).classList.toggle("focused-item");
        }

        // SET FOCUS TO NEW ITEM
        document.getElementById(item_id).classList.toggle("focused-item");
        focused_item_name = item_name;
        focused_item_element_id = item_id;

        // SHOW/UPDATE FOCUSED ITEM POPUP
        document.getElementById("focused-item-popup").hidden = false;
        document.getElementById("focused-item-popup").onclick = function ()
        {
            focus_on_item(item_name, item_id);
        };
        document.getElementById("focused-item-image").src = document.getElementById(focused_item_element_id).src;

        console.log(get_colored_message("Item Focus", "Now focusing on: " + highlight_code(focused_item_name), message_status.INFO));
    }

    // REFRESH QUESTS
    refresh_quest_table();
}

function sort_ascending(x, y) {
    return x - y;
}

function sort_descending(x, y) {
    return y - x;
}

$(function() {
    // hide inline inventory editor and stop editing mode
    function editor_hide($inventory_editor) {
        $inventory_editor.hide();
        let $current_item_parent = $inventory_editor.parent();
        if ($current_item_parent.hasClass('quest-item-edit')) {
            $current_item_parent.removeClass('quest-item-edit');
        }

        // RE-ENABLE INVENTORY BUTTON
        document.getElementById("inventory_open-button").disabled = false;
        document.getElementById("inventory_open-button").classList.remove("disabled");
    }
    // update recommended table after editing is complete:
    // - redraw the table if scoring changed
    function update_table_after_inventory_change($inventory_editor) {
        const current_inventory_amount = parseInt($inventory_editor.children('.quest_inline-inventory').children('.quest_inventory-amount').text());
        if (inventory_status.INLINE_EDITOR_START_AMOUNT !== current_inventory_amount) {
            // REFRESH REQUIRED INGREDIENTS AND RECOMMENDED QUESTS IF A CHANGE IS DETECTED
            build_data();
            update_saved_projects_select();
            disable_complete_project_button(completed_projects.includes(document.getElementById("saved-projects-select").value));
            inventory_status.INLINE_EDITOR_START_AMOUNT = 0;
        }
    }
    $('#recommended-quest-table').on('click', '.quest_item-img', function(event) {
        // open the editor if it's not shown
        // close it if it's shown on the current item
        // move it if it's shown on a different item
        event.stopPropagation();
        let $this = $(this);
        let $inventory_editor = $('#inventory-inline-editor');
        if ($inventory_editor.is(':visible')) {
            editor_hide($inventory_editor);
            update_table_after_inventory_change($inventory_editor);
            if ($this.prev().is($inventory_editor)) {
                return;
            }
        }
        if ($inventory_editor.length === 0) {
            $inventory_editor = $('#inventory-inline-editor-prototype').clone()
                .prop('id', 'inventory-inline-editor')
                .prop('hidden', false);
        }
        $this.before($inventory_editor);
        let item_name = $this.attr('title');
        let current_amount = inventory_get_fragment_amount(item_name);
        inventory_status.INLINE_EDITOR_START_AMOUNT = current_amount;
        $inventory_editor.children('.quest_inline-inventory').children('.quest_inventory-amount').text(current_amount);
        let increment = equipment_map.get(item_name.replace(' Fragment', '')).get("req_pieces");
        if (increment < 10) {
            increment = 10;
        }
        let $plus_button = $('button.plus', $inventory_editor);
        $plus_button.text('+' + increment);
        $plus_button[0].value = '+' + increment;
        let $minus_button = $('button.minus', $inventory_editor);
        $minus_button.text('-' + increment);
        $minus_button[0].value = '-' + increment;
        $this.parent().removeClass('quest-hover').addClass('quest-item-edit');
        $inventory_editor.show();

        // DISABLE INVENTORY BUTTON TO AVOID CONFLICTING CHANGES
        document.getElementById("inventory_open-button").disabled = true;
        document.getElementById("inventory_open-button").classList.add("disabled");
    });
    $('#recommended-div').on('click', function(event) {
        // close the editor on clicking away
        let $inventory_editor = $('#inventory-inline-editor');
        if ($inventory_editor.length !== 0 && $inventory_editor.is(':visible') ) {
            editor_hide($inventory_editor);
            update_table_after_inventory_change($inventory_editor);
        }
        event.stopPropagation();
    });
    $('#recommended-quest-table').on('click', '#inventory-inline-editor button', function(event) {
        // add or remove inventory items
        let $this = $(this);
        let item_name = $this.parent().parent().children(".quest_item-img").attr("title");
        let amount = parseInt(this.value);
        let current_amount = inventory_get_fragment_amount(item_name);
        let new_amount = inventory_set_fragment_amount(item_name, current_amount + amount);
        $this.parent().children('.quest_inline-inventory').children('.quest_inventory-amount').text(new_amount);
        event.stopPropagation();
    });
});