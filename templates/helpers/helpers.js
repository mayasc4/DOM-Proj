/**
 * Created by mayasc on 7/15/15.
 */


Handlebars.registerHelper('ifOutOfStock', function(quantity) {
    if (quantity === 0) {
        return '<div class="cell out-of-stock" name="add">Out Of Stock</div>';
    }
    return '<div class="cell add-item clickable" name="add">Add</div>';
});


Handlebars.registerHelper("log", function(something) {
    console.log(something);
});


Handlebars.registerHelper('ifOnSale', function(onSale, price, priceAfterSale) {
    if (onSale) {
        return '<div class="cell">' +
            '<span class="red crossedoff">' + price + '</span>' +
            '<span class="green">   ' + priceAfterSale + '</span>' +
            '</div>';
    }
    return '<div class="cell">' + price + '</div>';
});