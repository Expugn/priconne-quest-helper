function read_item(itemRarity)
{
    let itemMap = new Map();

    for (let i = 1 ; i < totalItemsCount[itemRarity] + 1 ; i++)
    {
        /* ROUND UP VALUE */
        let itemValue = Math.round(document.getElementById(itemRarity + "-" + i + "-amt").value);
        document.getElementById(itemRarity + "-" + i + "-amt").value = itemValue;

        if (itemValue >= 1)
        {
            /* CHECK VALUE: IF GREATER THAN 100, THEN CORRECT THE ISSUE */
            if (itemValue > 99)
            {
                document.getElementById(itemRarity + "-" + i + "-amt").value = 99;
                itemValue = 99;
            }

            let itemName = document.getElementById(itemRarity + "-" + i).title;
            itemMap.set(itemName, itemValue);
        }
    }

    return itemMap;
}