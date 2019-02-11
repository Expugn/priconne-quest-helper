function update_requested(modified_item)
{
    remove_item_from_disabled_items(modified_item.id.substring(0, modified_item.id.length - 4));
    build_data();
}

function remove_item_from_disabled_items(item_id)
{
    let item_name = document.getElementById(item_id).title;
    let item_recipe = get_recipe(item_name, 1);

    for (let [item, value] of item_recipe)
    {
        if (disabled_items.includes(item))
        {
            let index = disabled_items.indexOf(item);
            if (index > -1)
            {
                disabled_items.splice(index, 1);
                console.log("[Required Items] - Re-enabled \"" + item + "\" due to an updated \"" + item_name + "\" amount.");
                toastr.info("<b>" + item + "</b> has been re-enabled.", "<i>" + item_name + "</i> Amount Updated");
            }
        }
    }
}

function build_data()
{
    /* COLLECT ALL SELECTED ITEM DATA */
    let mergedItemMap = new Map([...read_common(), ...read_copper(), ...read_silver(), ...read_gold(), ...read_purple()]);
    build_requested_item_table(mergedItemMap);

    /* GET RECIPES */
    let recipeArray = [];

    /* GET ITEM RECIPES */
    for (let [key, value] of mergedItemMap)
    {
        recipeArray.push(get_recipe(key, value));
    }

    /* FIGURE OUT TOTAL INGREDIENTS */
    figure_out_total_ingredients(recipeArray);

    /* FIGURE OUT RECOMMENDED QUEST */
    build_recommended_quest_table(recipeArray);
}