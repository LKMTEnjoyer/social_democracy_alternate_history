function change_var(variable, amount) {
    dendryUI.dendryEngine.state.qualities[variable] += amount;
    dendryUI.dendryEngine.state.qualities.rb_strength_2 = dendryUI.dendryEngine.state.qualities.rb_strength.toFixed(1);
    window.updateSidebar();
}