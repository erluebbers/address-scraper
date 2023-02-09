import { createReadStream,writeFileSync } from "fs";
import { createInterface } from "readline";

let storage = {};


function compileZipStorage(csvPath) {
  return new Promise((resolve, reject) => {
    const stream = createReadStream(csvPath); 
    const reader = createInterface({ input: stream });

    reader.on("line", row => {
      let splitRow = row.split(",") // shovel unique zip codes into storage hash table and count instances
      if (storage[splitRow[7]]) { 
        storage[splitRow[7]] ++;
      }
      else {
        storage[splitRow[7]] = 1;
      }
    });

    reader.on("close", resolve())
  })
}


async function createSummaryCount() {
  for (let i = 0; i < arguments.length; i++) {
    await compileZipStorage(arguments[i]) // loop through arguments (files) to compile the zip code storage hash table
  }

  let csvContent = ''; // create csv string and add each zip code and count to it with a line break between each one 
  Object.entries(storage).forEach(row => {
      csvContent += row.join(',') + '\n';
  })
  writeFileSync("./SUMMARYCOUNT.csv", "Zip_Code,Customer_Count\n" + csvContent); // create csv file with heads and append info
};


createSummaryCount(
  "./assets/Group01.csv",
  "./assets/Group02.csv",
  "./assets/Group03.csv",
  "./assets/Group04.csv",
  "./assets/Group05.csv",
  "./assets/Group06.csv",
  "./assets/Group07.csv",
  "./assets/Group08.csv",
  "./assets/Group09.csv",
  "./assets/Group10.csv",
);