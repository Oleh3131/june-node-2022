const fs = require('node:fs');


// 1)ПЕРШИЙ СПОСІБ----------------------------------------------------------------------------------------


fs.readdir('./men', {withFileTypes: true}, (err, files) => {

    for (let file of files) {

        if (file.isFile()) {

            fs.readFile(`./men/${file.name}`, (err, data) => {

                if (err) {

                    console.log(err);

                } else {

                    const object = JSON.parse(data.toString());

                    if (object.gender === 'female') {

                        fs.rename(`./men/${file.name}`, `./women/${file.name}`, (err) => {

                            console.log(err);

                        })
                    }
                }
            });
        }
    }
});


fs.readdir('./women', {withFileTypes: true}, (err, files) => {

    for (let file of files) {

        if (file.isFile()) {

            fs.readFile(`./women/${file.name}`, (err, data) => {

                if (err) {

                    console.log(err);

                } else {

                    const object = JSON.parse(data.toString());

                    if (object.gender === 'male') {

                        fs.rename(`./women/${file.name}`, `./men/${file.name}`, (err) => {

                            console.log(err);

                        })
                    }
                }
            });
        }
    }
});



// 2)ДРУГИЙ СПОСІБ-------------------------------------------------------------------------------------


// fs.readdir('./men', (err, files) => {
//
//     console.log(files);
//
//     for (let file of files) {
//
//         fs.stat(`./men/${file}`, (err, stats) => {
//
//             if (stats.isFile()) {
//
//                 fs.readFile(`./men/${file}`, (err, data) => {
//
//
//                     if (err) {
//
//                         console.log(err);
//
//                     } else {
//
//                         const object = JSON.parse(data.toString());
//
//                         if (object.gender === 'female') {
//
//                             fs.rename(`./men/${file}`, `./women/${file}`, (err) => {
//
//                                 console.log(err);
//
//                             })
//                         }
//                     }
//                 });
//             }
//         })
//     }
// });
//
//
// fs.readdir('./women', (err, files) => {
//
//     console.log(files);
//
//     for (let file of files) {
//
//         fs.stat(`./women/${file}`, (err, stats) => {
//
//             if (stats.isFile()) {
//
//                 fs.readFile(`./women/${file}`, (err, data) => {
//
//
//                     if (err) {
//
//                         console.log(err);
//
//                     } else {
//
//                         const object = JSON.parse(data.toString());
//
//                         if (object.gender === 'male') {
//
//                             fs.rename(`./women/${file}`, `./men/${file}`, (err) => {
//
//                                 console.log(err);
//
//                             })
//                         }
//                     }
//                 });
//             }
//         })
//     }
// });


