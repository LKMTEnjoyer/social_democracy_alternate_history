function change_var(variable, amount) {
    dendryUI.dendryEngine.state.qualities[variable] += amount;
    window.updateSidebar();
}