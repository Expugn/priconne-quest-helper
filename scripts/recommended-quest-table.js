function build_recommended_quest_table(all_recipe_maps_array)
{
    /* DETERMINE WHICH QUESTS ARE BEST, FILTER OUT ONES W/O MATCHING */
    let total_recipe = get_total_recipe(all_recipe_maps_array);

    /* ITERATE THROUGH ALL QUESTS */
    let quest_score_map = new Map();
    for (let [quest_id, quest_data] of quest_map)
    {
        console.log("Reading quest " + quest_id);

        let item_1_name = quest_data.get("item_1").item_name;   // OBJECT
        let item_2_name = quest_data.get("item_2").item_name;   // OBJECT
        let item_3_name = quest_data.get("item_3").item_name;   // OBJECT
        let quest_subdrops = quest_data.get("subdrops");        // ARRAY

        let quest_score = 0;

        // CHECK ITEM 1 - 3
        if (total_recipe.has(item_1_name)) { quest_score++; }
        if (total_recipe.has(item_2_name)) { quest_score++; }
        if (total_recipe.has(item_3_name)) { quest_score++; }

        // CHECK SUBDROPS
        for (let i = 0 ; i < quest_subdrops.length ; i++)
        {
            if (total_recipe.has(quest_subdrops[i])) { quest_score++; }
        }

        console.log("Quest " + quest_id + " Score: " + quest_score);

        if (quest_score !== 0)
        {
            console.log("\t\t\tAdded quest" + quest_id);
            quest_score_map.set(quest_id, quest_score);
        }


        /*
        console.log("quest id = " + quest_id);
        console.log("\tname = " + quest_data.get("name"));
        console.log("\titem 1 name = " + quest_data.get("item_1").item_name);
        console.log("\tdrop percent = " + quest_data.get("item_1").drop_percent);
        for (let i = 0 ; i < quest_data.get("subdrops").length ; i++)
        {
            console.log("\tsubdrop " + (i+1) + " - " + quest_data.get("subdrops")[i]);
        }
        */
    }

    /* SORT */
    quest_score_map[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
    };

    console.log("does this work? " + (true ? "yes" : "no"));

    /* CONSTRUCT LIST */
    let table_html = "";

    table_html += "<tbody>";

    if (quest_score_map.size > 0)
    {
        for (let [quest_id, quest_score] of quest_score_map)
        {
            let quest_name = get_quest_data(quest_id, "name");

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

            table_html += "<tr>";

            // QUEST NAME
            table_html += "<th><h3 class=\"quest-title\">" + quest_name + "</h3></th>";

            // DIVIDER
            table_html += "<th>";
            table_html += "<img class=\"quest-item-image quest-item-divider\" title=\""
                + "\" src=\"images/items/Placeholder.png\" alt=\"\">";
            table_html += "</th>";

            // ITEM 1 IMAGE
            table_html += "<th class=\"quest-item-image\">";
            table_html += "<img class=\"quest-item-image" + (total_recipe.has(item_1_name) ? "" : " grayscale") + "\" title=\"" + item_1_name
                + "\" src=\"images/items/" + item_1_name.split(' ').join('_') + ".png\" alt=\"\">";
            table_html += "<div class=\"quest-percent-text\">" + item_1_drop_percent + "\u0025</div>";
            table_html += "</th>";

            // ITEM 2 IMAGE
            table_html += "<th class=\"quest-item-image\">";
            table_html += "<img class=\"quest-item-image" + (total_recipe.has(item_2_name) ? "" : " grayscale") + "\" title=\"" + item_2_name
                + "\" src=\"images/items/" + item_2_name.split(' ').join('_') + ".png\" alt=\"\">";
            table_html += "<div class=\"quest-percent-text\">" + item_2_drop_percent + "\u0025</div>";
            table_html += "</th>";

            // ITEM 3 IMAGE
            table_html += "<th class=\"quest-item-image\">";
            table_html += "<img class=\"quest-item-image" + (total_recipe.has(item_3_name) ? "" : " grayscale") + "\" title=\"" + item_3_name
                + "\" src=\"images/items/" + item_3_name.split(' ').join('_') + ".png\" alt=\"\">";
            table_html += "<div class=\"quest-percent-text\">" + item_3_drop_percent + "\u0025</div>";
            table_html += "</th>";

            // DIVIDER
            table_html += "<th>";
            table_html += "<img class=\"quest-item-image quest-item-divider\" title=\""
                + "\" src=\"images/items/Placeholder.png\" alt=\"\">";
            table_html += "</th>";

            // SUB-ITEM IMAGES
            for (let i = 0 ; i < subdrops.length ; i++)
            {
                table_html += "<th class=\"quest-item-image\">";
                table_html += "<img class=\"quest-item-image" + (total_recipe.has(subdrops[i]) ? "" : " grayscale") + "\" title=\"" + subdrops[i]
                    + "\" src=\"images/items/" + subdrops[i].split(' ').join('_') + ".png\" alt=\"\">";
                table_html += "<div class=\"quest-percent-text\">20\u0025</div>";
                table_html += "</th>";
            }

            table_html += "</tr>";
        }
    }
    table_html += "</body>";

    document.getElementById("recommended-quest-table").innerHTML = table_html;

}

function build_quest_html(quest_data)
{

}