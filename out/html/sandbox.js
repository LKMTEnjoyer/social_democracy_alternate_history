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

function rgbToHex(rgb) {
    const [r, g, b] = rgb.map(value => Math.max(0, Math.min(255, value)));

    
    const hex = r.toString(16);
    const out_r = (hex.length === 1 ? '0' + hex : hex); 

    const hex = g.toString(16);
    const out_g = (hex.length === 1 ? '0' + hex : hex); 

    const hex = b.toString(16);
    const out_b = (hex.length === 1 ? '0' + hex : hex); 
    
    return `#${out_r}${out_g}${out_b}`;
}
