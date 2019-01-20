function update_requested()
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

    /* IF RECIPE ARRAY IS EMPTY, BRING BACK TIPS */


    /* FIGURE OUT TOTAL INGREDIENTS */
    figure_out_total_ingredients(recipeArray);

    /* FIGURE OUT RECOMMENDED QUEST */
    build_recommended_quest_table(recipeArray);
}