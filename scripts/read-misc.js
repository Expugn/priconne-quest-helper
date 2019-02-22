function read_misc()
{
    const totalMiscItems = 24;

    let itemMap = new Map();

    for (let i = 1 ; i < totalMiscItems + 1 ; i++)
    {
        /* ROUND UP VALUE */
        let itemValue = Math.round(document.getElementById("misc-" + i + "-amt").value);
        document.getElementById("misc-" + i + "-amt").value = itemValue;

        if (itemValue >= 1)
        {
            /* CHECK VALUE: IF GREATER THAN 400, THEN CORRECT THE ISSUE */
            if (itemValue > 400)
            {
                document.getElementById("misc-" + i + "-amt").value = 400;
                itemValue = 400;
            }

            let itemName = document.getElementById("misc-" + i).title;
            itemMap.set(itemName, itemValue);
        }
    }

    return itemMap;
}