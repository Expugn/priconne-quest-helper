function read_common()
{
    const totalCommonItems = 15;

    let returned_data = [];
    let entryArray = [];
    let itemMap = new Map();

    for (let i = 1 ; i < totalCommonItems + 1 ; i++)
    {
        // Round up val
        let itemValue = Math.round(document.getElementById("common-" + i + "-amt").value);
        document.getElementById("common-" + i + "-amt").value = itemValue;

        if (itemValue >= 1)
        {
            <!-- CHECK VALUE: IF GREATER THAN 100, THEN CORRECT THE ISSUE -->
            if (itemValue > 99)
            {
                document.getElementById("common-" + i + "-amt").value = 99;
                itemValue = 99;
            }

            let tableEntry = "";
            let itemName = document.getElementById("common-" + i).title;

            tableEntry += "<td>" + itemName + "</td>";
            tableEntry += "<td>" + itemValue + "</td>";

            entryArray.push(tableEntry);
            itemMap.set(itemName, itemValue);
        }
    }
    <!--===========================-->

    returned_data.push(entryArray);
    returned_data.push(itemMap);
    return returned_data;
}