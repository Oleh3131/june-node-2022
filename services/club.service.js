const fs = require('fs/promises');
const path = require('path');


const pathToFile = path.join(process.cwd(), 'footballСlubDb', 'clubs.json');

module.exports={
    reader:async ()=>{

        const buffer = await fs.readFile(pathToFile);

        return JSON.parse(buffer.toString());

    },

    writer:async (clubs)=>{

        await fs.writeFile(pathToFile, JSON.stringify(clubs));

    }
}