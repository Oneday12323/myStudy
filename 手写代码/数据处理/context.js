const mobileFile = require.context('./modules',true,/\.js$/);

const modules = mobileFile.keys().reduce((modules,modulePath)=>{
    const moduleName=modulePath.replace(/^\.\/(.*)\.\w+$/,"$1");
    console.log(moduleName);
})