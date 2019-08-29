function read_item(itemType)
{
    let itemMap = new Map();

    for (let i = 1 ; i < totalItemsCount[itemType] + 1 ; i++)
    {
        /* ROUND UP VALUE */
        let itemValue = Math.round(document.getElementById(itemType + "-" + i + "-amt").value);
        document.getElementById(itemType + "-" + i + "-amt").value = itemValue;

        if (itemValue >= 1)
        {
            /* CHECK VALUE: IF GREATER THAN 100, THEN CORRECT THE ISSUE */
            if (itemValue > 99)
            {
                document.getElementById(itemType + "-" + i + "-amt").value = 99;
                itemValue = 99;
            }

            let itemName = document.getElementById(itemType + "-" + i).title;
            itemMap.set(itemName, itemValue);
        }
    }

    return itemMap;
}