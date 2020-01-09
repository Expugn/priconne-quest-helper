let collapsible_retry_count = 0;
let collapsible_ready = false;
let collapsible_failed = false;

function enableCollapsible()
{
    const amt_of_collapsible_elements = 6;
    let coll = document.getElementsByClassName("collapsible");

    if (coll.length < amt_of_collapsible_elements)
    {
        if (collapsible_retry_count <= 100)
        {
            console.log(get_colored_message("Collapsible", color_text("Less than ", message_status.WARNING) + highlight_code(amt_of_collapsible_elements) + color_text(" elements detected... Page must not be done loading yet.\n\t", message_status.WARNING) +
                color_text("Will pause for .5s and restart.\n\t", message_status.WARNING) +
                color_text("Current Retry: ", message_status.INFO) + highlight_code(collapsible_retry_count + "/100")));
            setTimeout(function () {
                collapsible_retry_count++;
                enableCollapsible();
            }, 500);
            return;
        }
        else
        {
            console.log(get_colored_message("Collapsible", "100 retries have been performed. Abandoning task!", message_status.WARNING));
            collapsible_failed = true;
            loadingToast();
            return;
        }
    }

    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            let content = this.nextElementSibling;
            this.classList.toggle("collapsible-active");

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
            }
        });
    }

    if (collapsible_ready === false)
    {
        collapsible_ready = true;
        loadingToast();
    }
}