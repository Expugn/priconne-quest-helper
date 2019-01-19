let disabled_items = [];

function get_recipe(item_name, amount)
{
    // recipe = components
    let recipe = new Map();

    let has_fragments = get_equipment_data(item_name, "has_fragments");     // boolean
    let required_pieces = get_equipment_data(item_name, "req_pieces");      // value
    let required_items = get_equipment_data(item_name, "req_items");        // array

    // ADD FRAGMENT/ITEM COUNT TO RECIPE
    if (required_pieces > 0)
    {
        if (has_fragments)
        {
            recipe = add_items_to_recipe(recipe, item_name + " Fragment", required_pieces * amount);
        }
        else
        {
            recipe = add_items_to_recipe(recipe, item_name, required_pieces * amount);
        }
    }

    if (required_items !== undefined)
    {
        // ADD OTHER ITEM RECIPES FROM required_items TO RECIPE
        for (let i = 0 ; i < required_items.length ; i++)
        {
            recipe = get_recipe_and_add_onto_existing(recipe, required_items[i], amount);
        }
    }

    return recipe;
}

function get_recipe_and_add_onto_existing(recipe, item_name, amount)
{
    // recipe = components
    let recipe_existing = recipe;

    let has_fragments = get_equipment_data(item_name, "has_fragments");     // boolean
    let required_pieces = get_equipment_data(item_name, "req_pieces");      // value
    let required_items = get_equipment_data(item_name, "req_items");        // array

    // ADD FRAGMENT/ITEM COUNT TO RECIPE
    if (required_pieces > 0)
    {
        if (has_fragments)
        {
            recipe_existing = add_items_to_recipe(recipe_existing, item_name + " Fragment", required_pieces * amount);
        }
        else
        {
            recipe_existing = add_items_to_recipe(recipe_existing, item_name, required_pieces * amount);
        }
    }


    // ADD OTHER ITEM RECIPES FROM required_items TO RECIPE
    if (required_items !== undefined)
    {
        // ADD OTHER ITEM RECIPES FROM required_items TO RECIPE
        for (let i = 0 ; i < required_items.length ; i++)
        {
            recipe = get_recipe_and_add_onto_existing(recipe, required_items[i], amount);
        }
    }

    return recipe_existing;
}

function add_items_to_recipe(recipe, recipe_comp, amount)
{
    if (recipe.has(recipe_comp))
    {
        // RECIPE COMPONENT EXISTS, ADD AMOUNT
        recipe.set(recipe_comp, recipe.get(recipe_comp) + amount);
    }
    else
    {
        // RECIPE COMPONENT DOESNT EXIST, CREATE NEW ENTRY
        recipe.set(recipe_comp, amount);
    }

    return recipe;
}

function figure_out_total_ingredients(all_recipe_maps_array)
{
    let total_recipe = get_total_recipe(all_recipe_maps_array);

    /* SORT */
    total_recipe[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
    };


    /* BUILD HTML */
    let table_html = "";
    let item_counter = 0;

    table_html += "<tbody>";

    if (total_recipe.size > 0)
    {
        for (let [item, value] of total_recipe)
        {
            // add table row start if first item
            if (item_counter === 0)
            {
                table_html += "<tr>";
            }

            // close table row and start new if 7 items have been made
            if (item_counter % 7 === 0 && item_counter !== 0)
            {
                table_html += "</tr>";

                table_html += "<tr>";
            }

            // IMAGE
            /*
            table_html += "<th class=\"requested-item-image\">";
            table_html += "<img class=\"requested-item-image\" title=\"" + item
                + "\" src=\"images/items/" + item.split(' ').join('_') + ".png\" alt=\"\">";
            table_html += "<div class=\"requested-item-text\">\u00D7" + value + "</div>";
            table_html += "</th>";
            */

            table_html += "<th class=\"requested-item-image\">";
            table_html += "<button id=\"request-button-" + item.split(' ').join('_') + "\" class=\"ingredient-button all-ingredient-comp" + (disabled_items.includes(item) ? " low-opacity" : "") + "\" onclick=\"toggle_enabled_item(" + "\'" + clean_apostrophes(item) + "\'" + ")\"><img class=\"ingredient-button-image ingredient-button all-ingredient-comp\" src=\"images/items/" + item.split(' ').join('_') + ".png\" alt=\"\"><div class='ingredient-button-text all-ingredient-comp'>\u00D7" + value + "</div></button>";
            table_html += "</th>";


            //table_html += "<div class=\"requested-item-button-text\">\u00D7" + value + "</div>";

            item_counter++;
        }
        // close table row
        table_html += "</tr>";
        table_html += "<tr class=\"spacing\"></tr>";
    }
    table_html += "</body>";

    document.getElementById("required-ingredient-table").innerHTML = table_html;
}

function clean_apostrophes(string)
{
    // REPLACE ALL APOSTROPHES WITH [apostorphe] SO THAT IT CAN BE REVERTED BACK LATER
    return string.replace("'", "[apostrophe]");
}

function get_total_recipe(all_recipe_maps_array)
{
    let total_recipe = new Map();

    // ITERATE THROUGH ALL RECIPES IN ARRAY
    for (let i = 0 ; i < all_recipe_maps_array.length ; i++)
    {
        // ITERATE THROUGH INDIVIDUAL RECIPE COMPONENTS
        for (let [comp_name, comp_amt] of all_recipe_maps_array[i])
        {
            if (total_recipe.has(comp_name))
            {
                total_recipe.set(comp_name, total_recipe.get(comp_name) + comp_amt);
            }
            else
            {
                total_recipe.set(comp_name, comp_amt);
            }
        }
    }

    return total_recipe;
}

function toggle_enabled_item(item_name)
{
    item_name = item_name.replace("[apostrophe]", "\'");

    if (disabled_items.includes(item_name))
    {
        // RE-ENABLE ITEM
        let item_index = disabled_items.indexOf(item_name);
        if (item_index > -1)
        {
            disabled_items.splice(item_index, 1);
        }

        console.log("[Required Items] - Re-enabled " + item_name);
    }
    else
    {
        // DISABLE ITEM
        disabled_items.push(item_name);

        console.log("[Required Items] - Disabled " + item_name);
    }
    refresh_quest_table();
    document.getElementById("request-button-" + item_name.split(' ').join('_')).classList.toggle("low-opacity");
}