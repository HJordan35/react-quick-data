export const constructFormManifest = (formFieldList) => {
    let fieldManifest = {};
    formFieldList.forEach(field => {
        if(field.type !== 'submit') {
            fieldManifest[field.id] = {
                value: field.value,
                options: field.options
            }
        }
    });
    return fieldManifest;
}