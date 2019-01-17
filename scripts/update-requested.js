function update_requested()
{
    let mergedItemMap = new Map([...read_common(), ...read_copper()]);
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
}