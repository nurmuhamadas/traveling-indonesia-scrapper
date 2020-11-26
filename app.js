const { stdin } = require('process');
const readline = require('readline');
const MongodbController = require('./api/mongo.controller.');
const ScrapperController = require('./api/scrapper.controller');
const ExcelModel = require('./models/excel.model');

let data = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const menuMessage = `
Please type one of menu below:
- scr  => to start data scrapping
- exp  => to export scrapping data to excel
- exc  => to import excel data to database
- cls  => to end this session

type here: `;

rl.setPrompt(`Welcome! ${menuMessage}`);
rl.prompt(); 

rl.on('line', async (userInput) => {
  if (userInput === 'scr') {
    rl.setPrompt(`
      Scrapper is ready.
      On scrapping...
    `);
    rl.prompt();

    data = await ScrapperController.getAllDestinationDetail();

    rl.setPrompt(`Scrapping finished, ${data.length} data collected.
      ${menuMessage}`);
    rl.prompt();
  } 
  
  else if (userInput === 'exp') {
    const excelModel = new ExcelModel({ sheetName: 'Tour Destination', path: 'data/destinations.xlsx' });
    await excelModel.generateFile();
    console.log('Inserting data..');
    
    if (!!data) {
      await excelModel.insertRows(data);
      console.log('Data successfully inserted.\n');
      rl.setPrompt(menuMessage);
      rl.prompt();
    }
  }
  
  else if (userInput === 'exc') {
    const excelModel = new ExcelModel({ sheetName: 'Tour Destination', path: 'data/destinations.xlsx' });
    console.log('Reading data..');
    const result = await excelModel.readAllRows();
    
    await MongodbController.insertManyData(result);
    
    rl.setPrompt(menuMessage);
    rl.prompt();
  }
  
  else if (userInput === 'cls') {
    rl.close();
  }

  else {
    console.log('Input wrong! Please try again');
  }
});

rl.on('close', () => {
  console.log('Thank you!');
});