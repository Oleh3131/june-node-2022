const fs = require('node:fs/promises');
const path = require('path');

//1) ПЕРШИЙ СПОСІБ ГРАМОТНОГО РІШЕННЯ ЧЕРЕЗ АСИНХРОННІ ФУНКЦІЇ А НЕ КОЛБЕКИ..................................................

// const sortMenFunction = async () => {
//
//     const folderPathMen = path.join(__dirname, 'men');
//     const files = await fs.readdir(folderPathMen, {withFileTypes: true});
//
//     for (const file of files) {
//
//         if (file.isFile()) {
//
//             const filePath = path.join(folderPathMen, file.name);
//             const data = await fs.readFile(filePath);
//             const user = JSON.parse(data);
//
//             if (user.gender === 'female') {
//                 await fs.rename(filePath, path.join(__dirname, 'women', file.name));
//             }
//         }
//     }
// }
//
// const sortWomenFunction = async () => {
//
//     const folderPathWomen = path.join(__dirname, 'women');
//
//     //КОМАНДА ЯКА ПОКАЗУЄ ПОТОЧНИЙ РОБОЧИЙ КАТАЛОГ(ШЛЯХ) З КОТРОГО ВІДБУВАЄТЬСЯ КОМАНДА ЗАПУСКУ ВІДПРАЦЮВАННЯ СЦЕНАРІЮ
//     console.log(process.cwd());
//     //КОМАНДА ЯКА ПОВЕРТАЄ КАТАЛОГ(ШЛЯХ) В КОТРОМУ ЗНАХОДИТЬСЯ РОБОЧИЙ КОД
//     console.log(__dirname);
//
//     const files = await fs.readdir(folderPathWomen, {withFileTypes: true});
//
//     for (const file of files) {
//
//         if (file.isFile()) {
//
//             const filePath = path.join(folderPathWomen, file.name);
//             const data = await fs.readFile(filePath);
//             const user = JSON.parse(data);
//
//             if (user.gender === 'male') {
//                 await fs.rename(filePath, path.join(__dirname, 'men', file.name));
//             }
//         }
//     }
// }
//
//
// sortMenFunction();
// sortWomenFunction();


//2) ТАК ЯК В ПЕРШОМУ МЕТОДІ ДВІ ФУНКЦІЇ ОБРОБКИ ДУЖЕ ПОХОЖІ ОДНА НА ОДНУ, ТО МИ МОЖЕМО СПРОСТИТИ КОД...................................

const sortFunction = async (readFolder, gender, writeFolder) => {

    try {
        const folderPath = path.join(__dirname, readFolder);
        const files = await fs.readdir(folderPath, {withFileTypes: true});

        for (const file of files) {

            if (file.isFile()) {

                const filePath = path.join(folderPath, file.name);
                const data = await fs.readFile(filePath);
                const user = JSON.parse(data);

                if (user.gender === gender) {
                    await fs.rename(filePath, path.join(__dirname, writeFolder, file.name));
                }
            }
        }

    } catch (e) {

        console.log(e)

    }
}


sortFunction('men', 'female', 'women');
sortFunction('women', 'male', 'men');