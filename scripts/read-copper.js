function read_copper()
{
    const totalCopperItems = 38;

    let itemMap = new Map();

    for (let i = 1 ; i < totalCopperItems + 1 ; i++)
    {
        /* ROUND UP VALUE */
        let itemValue = Math.round(document.getElementById("copper-" + i + "-amt").value);
        document.getElementById("copper-" + i + "-amt").value = itemValue;

        if (itemValue >= 1)
        {
            /* CHECK VALUE: IF GREATER THAN 100, THEN CORRECT THE ISSUE */
            if (itemValue > 99)
            {
                document.getElementById("copper-" + i + "-amt").value = 99;
                itemValue = 99;
            }

            let itemName = document.getElementById("copper-" + i).title;
            itemMap.set(itemName, itemValue);
        }
    }

    return itemMap;
}