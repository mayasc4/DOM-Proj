/**
 * Created by mayasc on 7/15/15.
 */


Handlebars.registerHelper('ifOutOfStock', function(quantity) {
    if (quantity === 0) {
        return '<div class="cell out-of-stock">Out Of Stock</div>';
    }
    return '<div class="cell add-item clickable">Add</div>';
});
