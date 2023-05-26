function getProdEditData(product, feature) {

    // get the edit form
    const form = document.querySelector('#editForm');

    // replace all of the product details
    form.elements['name'].value = (product.product_name);
    form.elements['price'].value = (product.price);
    form.elements['brand'].value = (product.manufacturer);
    form.elements['model'].value = (product.product_model);
    form.elements['stock'].value = (product.stock_on_hand);

    // replace all of the feature details
    form.elements['os'].value = (feature.os);
    form.elements['resolution'].value = (feature.resolution);
    form.elements['ram'].value = (feature.ram);
    form.elements['rearcamera'].value = (feature.rear_camera);
    form.elements['frontcamera'].value = (feature.front_camera);
    form.elements['weight'].value = (feature.weight);
    form.elements['storage'].value = (feature.storage);
    form.elements['dimensions'].value = (feature.dimensions);
    form.elements['cpu'].value = (feature.cpu);
    form.elements['screensize'].value = (feature.screensize);
    form.elements['battery'].value = (feature.battery);

    // add the id to this alt text so i can send it
    form.elements['submit'].alt = (product.product_id);
    form.elements['close'].alt = (product.feature_id);
}
