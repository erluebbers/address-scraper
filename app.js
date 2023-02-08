import { createReadStream,appendFileSync,existsSync } from "fs";
import { createInterface } from "readline";


function createHeaders() {
  let zipHeaders = "Zip_Code,Customer_Count\n"
  appendFileSync("./SUMMARYCOUNT.csv", zipHeaders)
}


function compileRawZips(csvPath) {
    let data = []
    const stream = createReadStream(csvPath);
    const reader = createInterface({ input: stream });

    reader.on("line", row => {
      let splitRow = row.split(",")
      data.push(splitRow[7])
    });

    reader.on("close", () => {
      let csvContent = '';
      for (let i = 0; i < data.length; i++) {
        csvContent += data[i] + '\n';
      };

      appendFileSync("./rawZips.csv", csvContent);
    })
}

function sortZipCSV(csvPath) {
    let storage = {}
    const stream = createReadStream(csvPath);
    const reader = createInterface({ input: stream });

    reader.on("line", row => {
      let stringRow = row.toString();
      if (storage[stringRow]) {
        storage[stringRow] += 1;
      }
      else {
        storage[stringRow] = 1;
      }
    });

    reader.on("close", () => {
      let csvContent = '';
      Object.entries(storage).forEach(row => {
        csvContent += row.join(',') + '\n';
      })
      appendFileSync("./SUMMARYCOUNT.csv", csvContent);
    })
}

function createSummaryCount() {
  if (!existsSync("./rawZips.csv") && !existsSync("./SUMMARYCOUNT.csv")) {
    createHeaders();
    for (let i = 0; i < arguments.length; i++) {
      compileRawZips(arguments[i])
    }
    setTimeout(() => {
      sortZipCSV("./rawzips.csv");
    }, '2000')
  }
  else {
    console.log("file already exists! Try deleting contacts.csv and running this file again")
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