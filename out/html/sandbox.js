function change_var(variable, amount) {
    dendryUI.dendryEngine.state.qualities[variable] += amount;
    window.updateSidebar();
}

function clear_saves() {
    let confirmation = confirm("Do you want to delete all saves?");

    if (confirmation) {
    var save_prefix = "Social Democracy: An Alternate History_Autumn Chen_save_"
    for (let slot = 0; slot <= 7; slot++) {
        localStorage[save_prefix + slot] = '';
        localStorage[save_prefix + '_timestamp_' + slot] = '';
    }
    dendryUI.showSaveSlots();
    }
}