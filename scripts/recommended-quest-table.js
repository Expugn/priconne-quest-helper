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

        const item_is_in_top_2_score = 1.0;
        const item_is_in_3rd_slot = 0.75;
        const item_is_in_subitem_score = 0.5;
        const item_is_in_subitem17_score = 0.45;
        const item_is_in_subitem15_score = 0.40;
        const priority_item_multiplier = 2.0;

        for (let [quest_id, quest_data] of quests)
        {
            let split_quest_id = quest_id.split("-")[0];
            let quest_chapter_num = parseInt(split_quest_id);

            // CHECK IF QUEST CHAPTER IS WITHIN RANGE OF SETTINGS
            if (quest_chapter_num >= min_quest_chapter && quest_chapter_num <= max_quest_chapter)
            {
                let filter_exclude_quest = false;

                // CHECK IF QUEST IS NORMAL/HARD IF SET TO CHECK
                if (quest_filter === "filter-normal" || quest_filter === "filter-hard")
                {
                    if (quest_id.includes("H") && quest_filter === "filter-normal")
                    {
                        //  QUEST INCLUDES 'H' AND QUEST FILTER IS SET TO NORMAL, REMOVE QUEST
                        filter_exclude_quest = true;
                    }
                    else if (!quest_id.includes("H") && quest_filter === "filter-hard")
                    {
                        // QUEST DOESN'T INCLUDE 'H' AND QUEST FILTER IS SET TO HARD, REMOVE QUEST
                        filter_exclude_quest = true;
                    }
                }

                // IF THERE IS A FOCUSED ITEM, CHECK IF THE QUEST CONTAINS THAT ITEM
                if (focused_item_name !== "")
                {
                    // IF FOCUSED ITEM IS NOT ITEM 1-3 OR IN SUBDROPS... FILTER OUT QUEST
                    if (!(
                            quest_data.get("item_1").item_name === focused_item_name ||
                            quest_data.get("item_2").item_name === focused_item_name ||
                            quest_data.get("item_3").item_name === focused_item_name ||
                            quest_data.get("subdrops").includes(focused_item_name) ||
                            (quest_id.includes("H") && quest_data.get("char_shard").item_name === focused_item_name)
                        ))
                    {
                        filter_exclude_quest = true;
                    }
                }

                if (!filter_exclude_quest)
                {
                    let item_1_name = quest_data.get("item_1").item_name;       // OBJECT
                    let item_2_name = quest_data.get("item_2").item_name;       // OBJECT
                    let item_3_name = quest_data.get("item_3").item_name;       // OBJECT
                    let item_1_dp = quest_data.get("item_1").drop_percent;      // OBJECT
                    let item_3_dp = quest_data.get("item_3").drop_percent;      // OBJECT
                    let quest_subdrops = quest_data.get("subdrops");            // ARRAY
                    let q_subdrops_percent = quest_data.get("subdrops_percent");// ARRAY
                    let char_shard = "";
                    if (quest_id.includes("H")) { char_shard = quest_data.get("char_shard").item_name; } // OBJECT

                    let quest_score = 0;

                    // CHECK ITEM 1 - 3
                    if (total_recipe.has(item_1_name))
                    {
                        //console.log(item_1_name);
                        if (priority_items_array.includes(item_1_name)) {
                            quest_score += (item_is_in_top_2_score * priority_item_multiplier);
                            //console.log("multiplied.")
                        }
                        else {
                            quest_score += item_is_in_top_2_score;
                            //console.log("not multiplied.");
                        }
                    }
                    if (total_recipe.has(item_2_name))
                    {
                        if (priority_items_array.includes(item_2_name)) { quest_score += item_is_in_top_2_score * priority_item_multiplier; }
                        else { quest_score += item_is_in_top_2_score; }
                    }
                    if (total_recipe.has(item_3_name))
                    {
                        let score_to_be_added;
                        // IF ITEM 3 DROP PERCENT == ITEM 1 DROP PERCENT, GIVE SCORE EQUAL AS IF ITEM WAS IN TOP 2
                        if (item_1_dp === item_3_dp)
                        {
                            score_to_be_added = item_is_in_top_2_score;
                        }
                        else
                        {
                            score_to_be_added = item_is_in_3rd_slot;
                        }

                        if (priority_items_array.includes(item_3_name)) { quest_score += score_to_be_added * priority_item_multiplier; }
                        else { quest_score += score_to_be_added; }
                    }

                    // CHECK SUBDROPS
                    for (let i = 0 ; i < quest_subdrops.length ; i++)
                    {
                        if (total_recipe.has(quest_subdrops[i]))
                        {
                            if (q_subdrops_percent === undefined)
                            {
                                if (priority_items_array.includes(quest_subdrops[i])) { quest_score += item_is_in_subitem_score * priority_item_multiplier; }
                                else { quest_score += item_is_in_subitem_score; }
                            }
                            else
                            {
                                let score_to_be_added;
                                switch (q_subdrops_percent[i])
                                {
                                    case 24:
                                        score_to_be_added = item_is_in_3rd_slot;
                                        break;
                                    case 20:
                                        score_to_be_added = item_is_in_subitem_score;
                                        break;
                                    case 17:
                                        score_to_be_added = item_is_in_subitem17_score;
                                        break;
                                    case 15:
                                        score_to_be_added = item_is_in_subitem15_score;
                                        break;
                                    default:
                                        score_to_be_added = item_is_in_subitem_score;
                                        break;
                                }
                                if (priority_items_array.includes(quest_subdrops[i])) { quest_score += score_to_be_added * priority_item_multiplier; }
                                else { quest_score += score_to_be_added; }
                            }
                        }
                    }

                    // CHECK CHARACTER SHARD
                    if (total_recipe.has(char_shard))
                    {
                        if (priority_items_array.includes(char_shard)) { quest_score += item_is_in_top_2_score * priority_item_multiplier; }
                        else { quest_score += item_is_in_top_2_score; }
                    }

                    // IF QUEST SCORE IS NOT ZERO, ADD TO QUEST TABLE
                    if (quest_score !== 0)
                    {
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
                let x_quest_hard = 0;
                if (x_quest_quest.includes("H"))
                {
                    x_quest_quest.replace("H", "");
                    x_quest_hard = 1000;
                }
                let x_quest_value = (parseInt(x_quest_chapter) * 10000) + (parseInt(x_quest_quest) * 10) + x_quest_hard;

                let y_quest_id = y[0];
                let y_quest_split = y_quest_id.split("-");
                let y_quest_chapter = y_quest_split[0];
                let y_quest_quest = y_quest_split[1];
                let y_quest_hard = 0;
                if (y_quest_quest.includes("H"))
                {
                    y_quest_quest.replace("H", "");
                    y_quest_hard = 1000;
                }
                let y_quest_value = (parseInt(y_quest_chapter) * 10000) + (parseInt(y_quest_quest) * 10) + y_quest_hard;


                // SORTING CODE
                let n = (ascending_sort_quest_score ? sort_ascending(x[1], y[1]) : sort_descending(x[1], y[1]));
                if (n !== 0)
                {
                    return n;
                }

                return (ascending_sort_quest_list ? sort_ascending(x_quest_value, y_quest_value) : sort_descending(x_quest_value, y_quest_value));
            });
        };

        /* CONSTRUCT LIST */
        let table_html = "";

        let quest_count = 0;

        table_html += "<tbody>";

        if (quest_score_map.size > 0)
        {
            for (let [quest_id, quest_score] of quest_score_map)
            {
                let item_1 = get_quest_data(quest_id, "item_1");
                /** @namespace item_1.item_name */
                let item_1_name = item_1.item_name;
                /** @namespace item_1.drop_percent */
                let item_1_drop_percent = item_1.drop_percent;

                let item_2 = get_quest_data(quest_id, "item_2");
                /** @namespace item_2.item_name */
                let item_2_name = item_2.item_name;
                /** @namespace item_2.drop_percent */
                let item_2_drop_percent = item_2.drop_percent;

                let item_3 = get_quest_data(quest_id, "item_3");
                /** @namespace item_3.item_name */
                let item_3_name = item_3.item_name;
                /** @namespace item_3.drop_percent */
                let item_3_drop_percent = item_3.drop_percent;

                let subdrops = get_quest_data(quest_id, "subdrops");
                let subdrops_percent = get_quest_data(quest_id, "subdrops_percent");

                let character_shard = "";
                let char_shard_name = "";
                let char_shard_drop_rate = "";

                if (quest_id.includes("H"))
                {
                    character_shard = get_quest_data(quest_id, "char_shard");
                    char_shard_name = character_shard["item_name"];
                    char_shard_drop_rate = character_shard["drop_percent"];
                }

                // APPLY COLOR ACCORDING TO QUEST SCORE
                let quest_score_color = "";
                if (quest_score >= 2)
                {
                    quest_score_color = "quest-title-bg-green";
                }
                else if (quest_score >= 1)
                {
                    quest_score_color = "quest-title-bg-yellow";
                }
                else
                {
                    quest_score_color = "quest-title-bg-red";
                }

                table_html += "<tr>";

                // QUEST NAME
                table_html += "<th height='64' width='144'>" +
                    "<h3 class=\"quest-title " + quest_score_color + (quest_id.includes("H") ? " quest-title-hard" : "") + "\">" + quest_id.replace("H", " <span style=\"color: #ff4d4d\">H</span>") + "</h3>" +
                    "</th>";

                // DIVIDER
                table_html += "<th>";
                table_html += "<img class=\"quest-item-image quest-item-divider\" title=\""
                    + "\" src=\"\" alt=\"\">";
                // INCLUDE HARD MODE CHARACTER SHARD IMAGE
                if (quest_id.includes("H"))
                {
                    if (total_recipe.has(char_shard_name))
                    {
                        table_html += "<img class=\"quest-item-image quest-character-shard"
                                + (is_item_a_priority_and_needed(char_shard_name) ? " priority-quest-item" : "")
                            + "\" title=\"" + char_shard_name +
                            "\" src=\"" + get_item_image_path((char_shard_name).split(' ').join('_')) + "\" alt\"\">";
                        table_html += "<div class=\"quest-character-shard-drop-rate\">" + char_shard_drop_rate + "\u0025</div>";
                    }
                    else
                    {
                        table_html += "<img class=\"quest-item-image quest-character-shard-grayscale\" title=\"" + char_shard_name +
                            "\" src=\"" + get_item_image_path((char_shard_name).split(' ').join('_')) + "\" alt\"\">";
                    }

                }
                table_html += "</th>";

                // ITEM 1 IMAGE
                let item_amount = total_recipe.get(item_1_name);
                let is_not_included_in_disabled = !disabled_items.includes(item_1_name);
                table_html += "<th class='quest-hover" + ((item_amount > 0 && is_not_included_in_disabled) ? "" : " quest-is-empty-text") + "' height='48'>";
                table_html += "<img class=\"quest-item-image"
                        + (total_recipe.has(item_1_name) ? "" : " grayscale")
                        + (is_item_a_priority_and_needed(item_1_name) && total_recipe.has(item_1_name) ? " priority-quest-item" : "")
                    + "\" title=\"" + item_1_name
                    + "\" src=\"" + get_item_image_path(item_1_name.split(' ').join('_')) + "\" alt=\"\">";
                //table_html += "<div class=\"quest-percent-text\">" + item_1_drop_percent + "\u0025</div>";
                if (item_amount > 0 && is_not_included_in_disabled)
                {
                    if (quest_display === quest_display_settings.AMOUNT)
                    {
                        table_html += "<div class=\"quest-percent-text quest-display-bottom\">" + item_1_drop_percent + "\u0025" + "</div>";
                        table_html += "<div class=\"quest-req-amount-text quest-display-top\">" + "\u00D7" + item_amount + "</div>";
                    }
                    else
                    {
                        table_html += "<div class=\"quest-percent-text quest-display-top\">" + item_1_drop_percent + "\u0025" + "</div>";
                        table_html += "<div class=\"quest-req-amount-text quest-display-bottom\">" + "\u00D7" + item_amount + "</div>";
                    }
                }
                //table_html += "<div class=\"quest-percent-text\">" + ((item_amount > 0 && !disabled_items.includes(item_1_name)) ? item_1_drop_percent + "\u0025" : " ") + "</div>";
                //table_html += "<div class=\"quest-req-amount-text\">" + ((item_amount > 0 && !disabled_items.includes(item_1_name)) ? "\u00D7" + item_amount : " ") + "</div>";
                table_html += "</th>";

                // ITEM 2 IMAGE
                item_amount = total_recipe.get(item_2_name);
                is_not_included_in_disabled = !disabled_items.includes(item_2_name);
                table_html += "<th class='quest-hover" + ((item_amount > 0 && is_not_included_in_disabled) ? "" : " quest-is-empty-text") + "' height='48'>";
                table_html += "<img class=\"quest-item-image"
                        + (total_recipe.has(item_2_name) ? "" : " grayscale")
                        + (is_item_a_priority_and_needed(item_2_name) && total_recipe.has(item_2_name) ? " priority-quest-item" : "")
                    + "\" title=\"" + item_2_name
                    + "\" src=\"" + get_item_image_path(item_2_name.split(' ').join('_')) + "\" alt=\"\">";
                if (item_amount > 0 && is_not_included_in_disabled)
                {
                    if (quest_display === quest_display_settings.AMOUNT)
                    {
                        table_html += "<div class=\"quest-percent-text quest-display-bottom\">" + item_2_drop_percent + "\u0025" + "</div>";
                        table_html += "<div class=\"quest-req-amount-text quest-display-top\">" + "\u00D7" + item_amount + "</div>";
                    }
                    else
                    {
                        table_html += "<div class=\"quest-percent-text quest-display-top\">" + item_2_drop_percent + "\u0025" + "</div>";
                        table_html += "<div class=\"quest-req-amount-text quest-display-bottom\">" + "\u00D7" + item_amount + "</div>";
                    }
                }
                //table_html += "<div class=\"quest-percent-text\">" + item_2_drop_percent + "\u0025</div>";
                //table_html += "<div class=\"quest-req-amount-text\">" + ((item_amount > 0) ? "\u00D7" + item_amount : "") + "</div>";
                table_html += "</th>";

                // ITEM 3 IMAGE
                item_amount = total_recipe.get(item_3_name);
                is_not_included_in_disabled = !disabled_items.includes(item_3_name);
                table_html += "<th class='quest-hover" + ((item_amount > 0 && is_not_included_in_disabled) ? "" : " quest-is-empty-text") + "' height='48'>";
                table_html += "<img class=\"quest-item-image"
                        + (total_recipe.has(item_3_name) ? "" : " grayscale")
                        + (is_item_a_priority_and_needed(item_3_name) && total_recipe.has(item_3_name) ? " priority-quest-item" : "")
                    + "\" title=\"" + item_3_name
                    + "\" src=\"" + get_item_image_path(item_3_name.split(' ').join('_')) + "\" alt=\"\">";
                if (item_amount > 0 && is_not_included_in_disabled)
                {
                    if (quest_display === quest_display_settings.AMOUNT)
                    {
                        table_html += "<div class=\"quest-percent-text quest-display-bottom\">" + item_3_drop_percent + "\u0025" + "</div>";
                        table_html += "<div class=\"quest-req-amount-text quest-display-top\">" + "\u00D7" + item_amount + "</div>";
                    }
                    else
                    {
                        table_html += "<div class=\"quest-percent-text quest-display-top\">" + item_3_drop_percent + "\u0025" + "</div>";
                        table_html += "<div class=\"quest-req-amount-text quest-display-bottom\">" + "\u00D7" + item_amount + "</div>";
                    }
                }
                //table_html += "<div class=\"quest-percent-text\">" + item_3_drop_percent + "\u0025</div>";
                //table_html += "<div class=\"quest-req-amount-text\">" + ((item_amount > 0) ? "\u00D7" + item_amount : "") + "</div>";
                table_html += "</th>";

                // DIVIDER
                table_html += "<th>";
                table_html += "<img class=\"quest-item-image quest-item-divider\" title=\""
                    + "\" src=\"\" alt=\"\">";
                table_html += "</th>";

                // SUB-ITEM IMAGES
                for (let i = 0 ; i < subdrops.length ; i++)
                {
                    item_amount = total_recipe.get(subdrops[i]);
                    is_not_included_in_disabled = !disabled_items.includes(subdrops[i]);
                    table_html += "<th class='quest-hover" + ((item_amount > 0 && is_not_included_in_disabled) ? "" : " quest-is-empty-text") + "' height='48'>";
                    table_html += "<img class=\"quest-item-image"
                            + (total_recipe.has(subdrops[i]) ? "" : " grayscale")
                            + (is_item_a_priority_and_needed(subdrops[i]) && total_recipe.has(subdrops[i]) ? " priority-quest-item" : "")
                        + "\" title=\"" + ((subdrops[i] !== "") ? subdrops[i] : "???")
                        + "\" src=\"" + get_item_image_path(((subdrops[i] !== "") ? subdrops[i].split(' ').join('_') : "Placeholder")) + "\" alt=\"\">";
                    if (item_amount > 0 && is_not_included_in_disabled)
                    {
                        if (quest_display === quest_display_settings.AMOUNT)
                        {
                            if (subdrops_percent === undefined)
                            {
                                table_html += "<div class=\"quest-percent-text quest-display-bottom\">20\u0025</div>";
                            }
                            else
                            {
                                table_html += "<div class=\"quest-percent-text quest-display-bottom\">" + subdrops_percent[i] + "\u0025</div>";
                            }
                            table_html += "<div class=\"quest-req-amount-text quest-display-top\">" + "\u00D7" + item_amount + "</div>";
                        }
                        else
                        {
                            if (subdrops_percent === undefined)
                            {
                                table_html += "<div class=\"quest-percent-text quest-display-top\">20\u0025</div>";
                            }
                            else
                            {
                                table_html += "<div class=\"quest-percent-text quest-display-top\">" + subdrops_percent[i] + "\u0025</div>";
                            }
                            table_html += "<div class=\"quest-req-amount-text quest-display-bottom\">" + "\u00D7" + item_amount + "</div>";
                        }
                    }

                    /*
                    if (subdrops_percent === undefined)
                    {
                        table_html += "<div class=\"quest-percent-text\">20\u0025</div>";
                    }
                    else
                    {
                        table_html += "<div class=\"quest-percent-text\">" + subdrops_percent[i] + "\u0025</div>";
                    }
                    table_html += "<div class=\"quest-req-amount-text\">" + ((item_amount > 0) ? "\u00D7" + item_amount : "") + "</div>";
                    */
                    table_html += "</th>";
                }

                if (!hide_quest_score)
                {
                    // DIVIDER
                    table_html += "<th>";
                    table_html += "<img class=\"quest-item-image quest-item-divider\" title=\""
                        + "\" src=\"\" alt=\"\">";
                    table_html += "</th>";

                    // QUEST POINTS
                    table_html += "<th height='64' width='144'><h3 class=\"quest-title " + quest_score_color + "\">" + quest_score + " pts</h3></th>";
                }

                // END TABLE ROW
                table_html += "</tr>";



                quest_count++;

                if (quest_count >= quest_shown_value)
                {
                    break;
                }
            }
        }
        table_html += "</body>";

        quest_table.innerHTML = table_html;

        document.getElementById("recommended-quest-div").style.height = quest_table.scrollHeight + "px";
        setTimeout(function () {
            document.getElementById("recommended-quest-div").style.overflow = "auto";
        }, 400);
    }
    else
    {
        document.getElementById("recommended-quest-div").style.height = "2px";
        document.getElementById("recommended-quest-div").style.overflow = "hidden";
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

    //console.log(JSON.stringify(priority_items_array));
    //console.log("[Priority Projects] - Priority Item list compiled!");
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

        console.log("[Item Focus] - No longer focusing on an item.");
    }
    else
    {
        // IF THERE IS AN EXISTING FOCUSED ITEM, REMOVE FOCUS
        if (focused_item_element_id !== "")
        {
            document.getElementById(focused_item_element_id).classList.toggle("focused-item");
        }

        // SET FOCUS TO NEW ITEM
        let rarity_class = item_id.substring(0, item_id.indexOf('-'));
        document.getElementById(item_id).classList.toggle("focused-item");
        focused_item_name = item_name + ((rarity_class === "misc") ? "" : " Fragment");
        focused_item_element_id = item_id;

        console.log("[Item Focus] - Now focusing on: \"" + focused_item_name + "\"");
    }

    // REFRESH QUESTS
    refresh_quest_table();
}