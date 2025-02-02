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

function saturation(i,v) { 
    var min = $.inArray(Math.min.apply(this, i), i),
        max = $.inArray(Math.max.apply(this, i), i),
        mid = parseInt([0, 1, 2].filter(function (j) {return Array(min, max).indexOf(j) < 0;})),
        r = (i[max] - i[mid]) / (i[mid] - i[min]), 
        o = [];
    if (min !== max) {
        o[max] = Math.round(i[max]);
        o[min] = Math.round(i[max] * (1 - v));
        o[mid] = Math.round(o[max] / (r + 1) * v + i[max] * (1 - v));
    }
    return o;
}

function calculate_coalition() {
    if (dendryUI.dendryEngine.state.qualities.others_coalition == 0 && dendryUI.dendryEngine.state.qualities.bvp_coalition == 0 && dendryUI.dendryEngine.state.qualities.dvp_coalition == 0) {
        dendryUI.dendryEngine.state.qualities.conservative_party = 0;
    } else {
        dendryUI.dendryEngine.state.qualities.conservative_party = 1;
    }
    if (dendryUI.dendryEngine.state.qualities.kpd_coalition == 1 && dendryUI.dendryEngine.state.qualities.z_coalition == 0 && dendryUI.dendryEngine.state.qualities.ddp_coalition == 0) {
        // if KPD and not in a coalition with the bourgeoisie parties it's a left front
        dendryUI.dendryEngine.state.qualities.coalition_type = "united front";
    } else if (dendryUI.dendryEngine.state.qualities.kpd_coalition == 1 && dendryUI.dendryEngine.state.qualities.z_coalition == 1) {
        // if KPD and in coalition with Zentrum it's a popular front
        dendryUI.dendryEngine.state.qualities.coalition_type = "popular front";
    } else if (dendryUI.dendryEngine.state.qualities.kpd_coalition == 1 && dendryUI.dendryEngine.state.qualities.ddp_coalition == 1) {
        // if KPD and in coalition with DDP it's a progressive coalition
        // z_coalition = 0 is implied
        dendryUI.dendryEngine.state.qualities.coalition_type = "progressive coalition";
    } else if (dendryUI.dendryEngine.state.qualities.ddp_coalition == 0 && dendryUI.dendryEngine.state.qualities.z_coalition == 0 && dendryUI.dendryEngine.state.qualities.sapd_coalition == 1) {
        dendryUI.dendryEngine.state.qualities.coalition_type = "socialist coalition";
    } else if (dendryUI.dendryEngine.state.qualities.ddp_coalition == 1 && dendryUI.dendryEngine.state.qualities.z_coalition == 0 && dendryUI.dendryEngine.state.qualities.conservative_party == 0) {
        // DDP + SPD + (SAPD possibly) is social liberal
        dendryUI.dendryEngine.state.qualities.coalition_type = "social-liberal coalition";
    } else if (dendryUI.dendryEngine.state.qualities.z_coalition == 1 && dendryUI.dendryEngine.state.qualities.conservative_party == 0) {
        // Any coalition with Z and not KPD and not any of the conservative parties is a Weimar
        // this means I don't have to think of a name for SPD-Z :trolle:
        dendryUI.dendryEngine.state.qualities.coalition_type = "Weimar coalition";
    } else if (dendryUI.dendryEngine.state.qualities.bvp_coalition == 1 || dendryUI.dendryEngine.state.qualities.dvp_coalition == 1) {
        // any coalition with the conservative parties except the minor ones is a grand coalition
        dendryUI.dendryEngine.state.qualities.coalition_type = "grand coalition";
    } else if (dendryUI.dendryEngine.state.qualities.others_coalition == 1) {
        // if you coalition with the minor parties it's a new grand coalition
        dendryUI.dendryEngine.state.qualities.coalition_type = "new grand coalition";
    } 
    // note that KPD/SAPD can never be in a coalition with anything right of Zentrum, and vice versa
    // religious parties: Z, BVP
    // will VONC if you do religious schools
    // conservative parties: BVP, DVP, Others
    // will get mad at any kind of socialism
    // socialist parties: KPD, SAPD
    // will get mad at austerity and anti-worker policies
    // bourgeoisie parties: DDP, Z, BVP, DVP, Others
    // will get mad at some kinds of socialism (nationalization)
    // non-progressive parties Z, BVP, DVP, Others
    // will get mad at social reforms
}