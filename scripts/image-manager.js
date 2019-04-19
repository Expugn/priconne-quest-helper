let webp_enabled = false;

function init_webp()
{
    // CHECK IF THE <html> ELEMENT HAS CLASS 'webp' (GIVEN BY MODERNIZR'S WEBP CHECK)
    if ($('html').hasClass('webp'))
    {
        webp_enabled = true;
        console.log("[Image Manager] .webp images are supported! Using .webp instead of .png.");
    }
    else
    {
        console.log("[Image Manager] .webp images are NOT supported! Using .png instead of .webp.");
    }
}

function init_images()
{
    let coll = document.getElementsByClassName("use-webp");

    for (let i = 0 ; i < coll.length ; i++)
    {
        // ADD WEBP OF PNG CLASS
        if (webp_enabled)
        {
            coll[i].classList.toggle("webp");
        }
        else
        {
            coll[i].classList.toggle("png");
        }

        // IF CURRENT ELEMENT IS AN <img>...
        // DISPLAY IMAGE USING image_folder AND file_name
        // STANDARD IMAGE FORMAT:    class="use-webp" image_folder="" file_name="" src_prefix="" src=""
        // FILL OUT image_folder, file_name, AND src_prefix, LEAVE src BLANK.
        if (coll[i].tagName.toLowerCase() === "img")
        {
            switch (coll[i].getAttribute("image_folder"))
            {
                case "items":
                    coll[i].src = coll[i].getAttribute("src_prefix") + get_item_image_path(coll[i].getAttribute("file_name"));
                    break;
                case "unit_icon":
                    coll[i].src = coll[i].getAttribute("src_prefix") + get_unit_icon_image_path(coll[i].getAttribute("file_name"));
                    break;
                case "webpage":
                    coll[i].src = coll[i].getAttribute("src_prefix") + get_webpage_image_path(coll[i].getAttribute("file_name"));
                    break;
            }
        }
    }
}

function get_item_image_path(file_name)
{
    if (webp_enabled)
    {
        return "images/items_webp/" + file_name + ".webp";
    }
    return "images/items/" + file_name + ".png";
}

function get_unit_icon_image_path(file_name)
{
    if (webp_enabled)
    {
        return "images/unit_icon_webp/" + file_name + ".webp";
    }
    return "images/unit_icon/" + file_name + ".png";
}

function get_webpage_image_path(file_name)
{
    if (webp_enabled)
    {
        return "images/webpage_webp/" + file_name + ".webp";
    }
    return "images/webpage/" + file_name + ".png";
}