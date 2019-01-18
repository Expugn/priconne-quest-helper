function read_silver()
{
    const totalSilverItems = 45;

    let itemMap = new Map();

    for (let i = 1 ; i < totalSilverItems + 1 ; i++)
    {
        /* ROUND UP VALUE */
        let itemValue = Math.round(document.getElementById("silver-" + i + "-amt").value);
        document.getElementById("silver-" + i + "-amt").value = itemValue;

        if (itemValue >= 1)
        {
            /* CHECK VALUE: IF GREATER THAN 100, THEN CORRECT THE ISSUE */
            if (itemValue > 99)
            {
                document.getElementById("silver-" + i + "-amt").value = 99;
                itemValue = 99;
            }

            let itemName = document.getElementById("silver-" + i).title;
            itemMap.set(itemName, itemValue);
        }
    }

    return itemMap;
}