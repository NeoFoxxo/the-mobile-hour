function getProdFeatData(feature) {
    // get references to the h5 elements
    const featOS = document.getElementById('featos');
    const featWeight = document.getElementById('featweight');
    const featDimensions = document.getElementById('featdimensions');
    const featScreenSize = document.getElementById('featscreensize');
    const featResolution = document.getElementById('featresolution');
    const featCPU = document.getElementById('featcpu');
    const featRAM = document.getElementById('featram');
    const featStorage = document.getElementById('featstorage');
    const featBattery = document.getElementById('featbattery');
    const featRearCam = document.getElementById('featrearcam');
    const featFrontCam = document.getElementById('featfrontcam');

    // set the text content of each h5 element to the correct feature
    featOS.textContent = `OS: ${feature.os}`;
    featWeight.textContent = `Weight: ${feature.weight}`;
    featDimensions.textContent = `Dimensions: ${feature.dimensions}`;
    featScreenSize.textContent = `Screen Size: ${feature.screensize}`;
    featResolution.textContent = `Resolution: ${feature.resolution}`;
    featCPU.textContent = `CPU: ${feature.cpu}`;
    featRAM.textContent = `RAM: ${feature.ram}`;
    featStorage.textContent = `Storage: ${feature.storage}`;
    featBattery.textContent = `Battery: ${feature.battery}`;
    featRearCam.textContent = `Rear Camera: ${feature.rear_camera}`;
    featFrontCam.textContent = `Front Camera: ${feature.front_camera}`;
}