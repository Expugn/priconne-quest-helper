let loadToastDisplayed = false;

function setToastrOptions()
{
    toastr.options.preventDuplicates = true;
    toastr.options.positionClass = "toast-top-center";
    //toastr.options.progressBar = true;
}

function loadingToast()
{
    // ONLY USE LOADING TOAST IN SIMPLE MODE
    if (window.location.hash) {
        if (window.location.hash.toLowerCase().split('#').includes("simple")) {
            if (collapsible_ready === false || item_table_ready === false) {
                if (loadToastDisplayed === false) {
                    toastr.warning("Loading...", "Status", { positionClass: "toast-top-full-width", timeOut:999999, extendedTimeOut:999999, tapToDismiss: false });
                    loadToastDisplayed = true;
                }
            }
            else {
                toastr.remove();
                toastr.info("Ready!", "Status", { positionClass: "toast-top-full-width", tapToDismiss: true });

                // ENABLE LANGUAGE SWITCH TO BE USED
                document.getElementById("language-option").disabled = false;
            }

            if (collapsible_failed) {
                toastr.remove();
                toastr.warning("Failed to enable Collapsible Menus", "Failure", { positionClass: "toast-top-full-width", timeOut:999999, extendedTimeOut:999999, tapToDismiss: false });
            }
        }
    }
}