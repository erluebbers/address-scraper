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

check the answer by running the app.js file in node from the command line

```bash
node app.js
```

## Output

If run correctly, it will generate a **SUMMARYCOUNT.csv** file that has the target outcome and can be downloaded directly to your computer. The output SUMMARYCOUNT CSV will be in the top-level of directory.

PLEASE NOTE there is also a rawZip.csv file generated when you run the file. This can be ignored.

If you try to run it more than once, you get an console log message telling you the file already exists and you will need to delete both rawZip.csv and SUMMARYCOUNT.csv to run the file again.

## Completion Notes

One quick note for this is that my solution doesn't filter out customers who have 'NULL' in the Address01 field. Looking at the ask, it seemed possible that that was an indicated step. A quick conditional in line 10 of app.js that checks for that 'NULL' before shoveling the zip code into the raw csv would give that functionality but, looking at the goal of the summary doc being a count of customers in each zip code, I made a decision to keep them in.
