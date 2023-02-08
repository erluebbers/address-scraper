# Erik Luebbers - Dose Health Coding Take-Home Challenge

## Task

Write a program to access the following [10] CSV files, count how many addresses are in each zip
code, and create a summary file containing this data.

## Technologies Required

- [Node.js](https://nodejs.org/en/) - back-end JavaScript runtime environment
- The task-provided CSVs are in an assets folder in the directory

## Checking the Answer

First, download the files/repo and install the dependencies (ensuring you have node installed)

```bash
npm install
```

check the answer by running the app.js file in node

```bash
node app.js
```

## Output

If run correctly, it will generate a **zipCount.csv** file that has the correct answer and can be downloaded. PLEASE NOTE there is also a rawZip.csv file generated when you run the file. This can be ignored.

The output zipCount CSV will be in the top-level of directory.

If you try to run it more than once, you get an console log message telling you the file already exists.
