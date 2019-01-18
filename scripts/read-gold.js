function read_gold()
{
    const totalGoldItems = 73;

    let itemMap = new Map();

    for (let i = 1 ; i < totalGoldItems + 1 ; i++)
    {
        /* ROUND UP VALUE */
        let itemValue = Math.round(document.getElementById("gold-" + i + "-amt").value);
        document.getElementById("gold-" + i + "-amt").value = itemValue;

        if (itemValue >= 1)
        {
            /* CHECK VALUE: IF GREATER THAN 100, THEN CORRECT THE ISSUE */
            if (itemValue > 99)
            {
                document.getElementById("gold-" + i + "-amt").value = 99;
                itemValue = 99;
            }

            let itemName = document.getElementById("gold-" + i).title;
            itemMap.set(itemName, itemValue);
        }
    }

    return itemMap;
}