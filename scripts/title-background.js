const backgrounds = Object.freeze({
    MIYAKO: 'Miyako',
    SUMMER_GOURMET_FOOD_PALACE: 'Summer_With_Gourmet_Food_Palace',
    SUMMER_CAON: 'Summer_With_Caon',
    SUMMER_MERCURIUS_FOUNDATION: 'Summer_With_Mercurius_Foundation',
    FRIENDSHIP_CLUB: 'Friendship_Club',
    AOI_DIARY: 'Aoi_Diary',
    MANARIA_FRIENDS: 'Manaria_Friends',
    RE_ZERO: 'Re_Zero',
    NIGHTMARE: 'Nightmare',
    HALLOWEEN_LITTLE_LYRICAL: 'Halloween_With_Little_Lyrical',
    HALLOWEEN_MIYAKO_SHINOBU: 'Halloween_With_Miyako_and_Shinobu',
    TWILIGHT_CARAVAN: 'Twilight_Caravan',
    CHRISTMAS_2019: 'Christmas_2019',
    PECORINE_SANDWICH: 'Pecorine_Sandwich',
    NEW_YEAR_2020: 'New_Year_2020',
    CUSTOM: 'CUSTOM',
});

const default_background = backgrounds.NEW_YEAR_2020;

function init_background_select()
{
    let select_html = "";
    Object.keys(backgrounds).forEach(function (key)
    {
        select_html += "<option value=\"" + backgrounds[key] + "\">" + key + ((backgrounds[key] === default_background) ? " (DEFAULT)" : "") + "</option>";
    });

    document.getElementById("title-background-select").innerHTML = select_html;
}

function init_background()
{
    // IF LOCALSTORAGE SUPPORT EXISTS
    if (typeof(Storage) !== "undefined")
    {
        // IF THERE IS A DESIRED BACKGROUND SAVED
        if (localStorage.getItem("background") !== null)
        {
            let saved_background_exists = false;
            let saved_background = localStorage.getItem("background");

            // CHECK IF SAVED BACKGROUND EXISTS
            Object.keys(backgrounds).forEach(function (key)
            {
                if (saved_background === backgrounds[key])
                {
                    saved_background_exists = true;
                }
            });

            // IF SAVED BACKGROUND EXISTS, USE IT ; IF NOT, USE DEFAULT AND DELETE SAVED BACKGROUND
            if (saved_background_exists)
            {
                if (saved_background !== backgrounds.CUSTOM)
                {
                    set_title_background(saved_background);
                }
                else
                {
                    // IF CUSTOM BACKGROUND, SHOW ELEMENT + SET BACKGROUND
                    let custom_background_url = "";
                    if (localStorage.getItem("custom_background_url") !== null)
                    {
                        custom_background_url = localStorage.getItem("custom_background_url");
                    }
                    document.getElementById("custom-title-url-input").value = custom_background_url;
                    document.getElementById("custom-title-input").hidden = false;

                    // SET CUSTOM TITLE BACKGROUND ; USE DEFAULT IF IT DOES NOT EXIST
                    if (custom_background_url !== "")
                    {
                        set_custom_title_background(custom_background_url);
                    }
                    else
                    {
                        set_title_background(default_background);
                    }
                }

                // SET CUSTOM BACKGROUND TO INPUT IF IT EXISTS
                if (localStorage.getItem("custom_background_url") !== null)
                {
                    document.getElementById("custom-title-url-input").value = localStorage.getItem("custom_background_url");
                }

                document.getElementById("title-background-select").value = saved_background;
            }
            else
            {
                // DELETE SAVED BACKGROUND SINCE IT ISN'T VALID ANYWAYS
                localStorage.removeItem("background");

                // USE DEFAULT BACKGROUND
                set_title_background(default_background);
                document.getElementById("title-background-select").value = default_background;
            }
        }
        else
        {
            // USE DEFAULT BACKGROUND
            set_title_background(default_background);
            document.getElementById("title-background-select").value = default_background;
        }
    }
}

function change_background()
{
    let background_image_name = document.getElementById("title-background-select").value;

    if (background_image_name !== backgrounds.CUSTOM)
    {
        // HIDE CUSTOM TITLE BACKGROUND INPUT
        document.getElementById("custom-title-input").hidden = true;

        // SET BACKGROUND
        set_title_background(background_image_name);

        // SAVE PREFERRED BACKGROUND TO LOCALSTORAGE
        if (typeof(Storage) !== "undefined")
        {
            if (background_image_name === default_background)
            {
                // REMOVE LOCALSTORAGE SAVED DATA IF BACKGROUND IS CHANGED TO DEFAULT
                if (localStorage.getItem("background") !== null)
                {
                    localStorage.removeItem("background");
                }
            }
            else
            {
                // SAVE DESIRED BACKGROUND TO LOCALSTORAGE
                localStorage.setItem("background", background_image_name);
            }
        }
    }
    else
    {
        // SHOW CUSTOM TITLE BACKGROUND INPUT
        document.getElementById("custom-title-input").hidden = false;

        let custom_background_url = document.getElementById("custom-title-url-input").value;

        if (typeof(Storage) !== "undefined")
        {
            // SAVE DESIRED BACKGROUND TO LOCALSTORAGE
            localStorage.setItem("background", background_image_name);
            if (custom_background_url !== "")
            {
                localStorage.setItem("custom_background_url", custom_background_url);
            }
            else
            {
                // REMOVE LOCALSTORAGE SAVED DATA IF CUSTOM BACKGROUND URL IS EMPTY
                if (localStorage.getItem("custom_background_url") !== null)
                {
                    localStorage.removeItem("custom_background_url");
                }
            }
        }

        // SET CUSTOM BACKGROUND ; IF IT DOES NOT EXIST THEN USE DEFAULT INSTEAD
        if (custom_background_url !== "")
        {
            set_custom_title_background(custom_background_url);
        }
        else
        {
            set_title_background(default_background);
        }
    }
}

function set_title_background(image_name)
{
    document.getElementById("title-div").style.backgroundImage = "url('" + get_webpage_image_path("backgrounds/" + image_name) + "')";
}

function set_custom_title_background(image_url)
{
    document.getElementById("title-div").style.backgroundImage = "url('" + image_url + "')";
}