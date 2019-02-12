function setToastrOptions()
{
    toastr.options.preventDuplicates = true;
    toastr.options.positionClass = "toast-top-center";
    //toastr.options.progressBar = true;
}

function loadingToast()
{
    if (collapsible_ready === false || item_table_ready === false)
    {
        toastr.warning("Loading...", "Status", { positionClass: "toast-top-full-width", timeOut:999999, extendedTimeOut:999999, tapToDismiss: false });
    }
    else
    {
        toastr.remove();
        toastr.info("Ready!", "Status", { positionClass: "toast-top-full-width", tapToDismiss: false });
    }

    if (collapsible_failed === true || item_table_failed === true)
    {
        toastr.remove();
        if (collapsible_failed)
        {
            toastr.warning("Failed to enable Collapsible Menus", "Failure", { positionClass: "toast-top-full-width", timeOut:999999, extendedTimeOut:999999, tapToDismiss: false });
        }
        if (item_table_failed)
        {
            toastr.warning("Failed to build Item Tables", "Failure", { positionClass: "toast-top-full-width", timeOut:999999, extendedTimeOut:999999, tapToDismiss: false });
        }
    }
}