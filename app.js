import { createReadStream,appendFileSync,existsSync } from "fs";
import { createInterface } from "readline";


function createHeaders() {
  let zipHeaders = "Zip_Code,Customer_Count\n"
  appendFileSync("./zipCount.csv", zipHeaders)
}


function pullZips(csvPath) {
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
        csvContent += data[i] + '\n'
      }

      appendFileSync("./rawZips.csv", csvContent);
    })
}

function sortZipCSV(csvPath) {
    let storage = {}
    const stream = createReadStream(csvPath);
    const reader = createInterface({ input: stream });

    reader.on("line", row => {
      let stringRow = row.toString()
      if (storage[stringRow]) {
        storage[stringRow] += 1;
      }
      else {
        storage[stringRow] = 1
      }
    });

    reader.on("close", () => {
      let csvContent = '';
      Object.entries(storage).forEach(row => {
        csvContent += row.join(',') + '\n'
      })
      appendFileSync("./zipCount.csv", csvContent);
    })
}

function createZipCount() {
  if (!existsSync("./rawZips.csv")) {
    createHeaders()
    pullZips("./assets/Group01.csv");
    pullZips("./assets/Group02.csv");
    pullZips("./assets/Group03.csv");
    pullZips("./assets/Group04.csv");
    pullZips("./assets/Group05.csv");
    pullZips("./assets/Group06.csv");
    pullZips("./assets/Group07.csv");
    pullZips("./assets/Group08.csv"); 
    pullZips("./assets/Group09.csv");
    pullZips("./assets/Group10.csv");
    setTimeout(() => {
      sortZipCSV("./rawzips.csv");
    }, '2000')
  }
  else {
    console.log("file already exists! Try deleting contacts.csv and running this file again")
  }
}

createZipCount()