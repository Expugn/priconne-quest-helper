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
    HALLOWEEN_MIYAKO_SHINOBU: 'Halloween_With_Miyako_and_Shinobu'
});

const default_background = backgrounds.HALLOWEEN_MIYAKO_SHINOBU;

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
                set_title_background(saved_background);
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

function set_title_background(image_name)
{
    document.getElementById("title-div").style.backgroundImage = "url('" + get_webpage_image_path("backgrounds/" + image_name) + "')";
}