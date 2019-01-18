let collapsible_retry_count = 0;
function enableCollapsible()
{
    let coll = document.getElementsByClassName("collapsible");

    if (coll.length < 5)
    {
        if (collapsible_retry_count <= 100)
        {
            console.log("[Collapsible] - Less than 5 elements detected... Page must not be done loading yet.\n\tWill pause for .5s and restart.\n\tCurrent Retry: " + collapsible_retry_count);
            setTimeout(function () {
                collapsible_retry_count++;
                enableCollapsible()
            }, 500);
            return;
        }
        else
        {
            console.log("[Collapsible] - 100 retries have been performed.\n\tAbandoning task!");
            return;
        }

    }

    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            let content = this.nextElementSibling;
            this.classList.toggle("active");

            if (content.style.maxHeight){
                /* HIDE CONTENT */
                content.style.maxHeight = null;
                content.style.overflow = "hidden";

            } else {
                /* SHOW CONTENT */
                content.style.maxHeight = content.scrollHeight + "px";
                setTimeout(function () {
                    content.style.overflow = "auto";
                }, 400);
                //content.style.overflow = "auto";
            }
        });
    }

    console.log("[Collapsible] - Enabled Collapsible Menus!");
}