import { createReadStream,appendFileSync,existsSync } from "fs";
import { createInterface } from "readline";


function compileRawZips(csvPath) {
    let data = []
    const stream = createReadStream(csvPath);
    const reader = createInterface({ input: stream });

    reader.on("line", row => {
      let splitRow = row.split(",")
      data.push(splitRow[7]) // Push Zip code from each provided csv row into data array
    });

    reader.on("close", () => {
      let csvContent = '';
      for (let i = 0; i < data.length; i++) {
        csvContent += data[i] + '\n';
      };
      appendFileSync("./rawZips.csv", csvContent); // Turn data array into csv of raw zip codes
    })
}


function sortZipCSV(csvPath) {
    let countStorage = {} // Create hash table of zip code values and associated customer counts
    const stream = createReadStream(csvPath);
    const reader = createInterface({ input: stream });

    reader.on("line", row => {
      let stringRow = row.toString();
      if (countStorage[stringRow]) {
        countStorage[stringRow] += 1;
      }
      else {
        countStorage[stringRow] = 1;
      }
    });

    reader.on("close", () => {
      let csvContent = '';
      Object.entries(countStorage).forEach(row => {
        csvContent += row.join(',') + '\n';
      })
      appendFileSync("./SUMMARYCOUNT.csv", "Zip_Code,Customer_Count\n" + csvContent); // Convert Storage table into final csv summary doc
    })
}


function createSummaryCount() {
  if (!existsSync("./rawZips.csv") && !existsSync("./SUMMARYCOUNT.csv")) {
    for (let i = 0; i < arguments.length; i++) {
      compileRawZips(arguments[i])
    }
    setTimeout(() => {
      sortZipCSV("./rawzips.csv");
    }, '2000')
  }
  else {
    console.log("file already exists! Try deleting both generated zip files and running this file again")
  }
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