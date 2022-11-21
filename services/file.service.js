const path = require("path");
const fs = require("fs/promises");


const pathToFile = path.join(process.cwd(), 'dataBase', 'clothes.json');

module.exports = {

    reader: async () => {

        const buffer = await fs.readFile(pathToFile);

        return await JSON.parse(buffer.toString());

    },

    writer: async (clothes) => {

        await fs.writeFile(pathToFile, JSON.stringify(clothes));

    }

}