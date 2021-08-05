const fs = require("fs");
const argv = require("yargs").argv;
const chalk = require("chalk");

// ADD NOTES
const add = (title, body) => {
    readStream = fs.readFile("./notes.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const obj = JSON.parse(data);
            exists = true;
            if (obj.keys(obj).length !== 0) {
                exists = false;
                for (const obj_title in obj) {
                    if (obj[obj_title].title == title) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    obj.push({ title: title, body: body });
                    let new_data = JSON.stringify(obj);
                    fs.writeFile("./notes.json", new_data, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(chalk.black(chalk.bgGreen("New Note created")));
                        }
                    });
                } else {
                    console.log(chalk.black(chalk.bgRed("Title already taken!")));
                }
            } else {
                obj.push({ title: title, body: body });
                let new_data = JSON.stringify(obj);
                fs.writeFile("./notes.json", new_data, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(chalk.black(chalk.bgGreen("New Note created")));
                    }
                });
            }
        }
    });

};

//REMOVE NOTES
const remove = (title) => {
    readStream = fs.readFile("./notes.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const obj = JSON.parse(data);
            if (obj.length !== 0) {
                filteredObj = false;
                for (const obj_title in obj) {
                    // console.log(obj[obj_title].title, title);
                    if (obj[obj_title].title == title) {
                        var filteredObj = obj.filter((obj) => obj.title != title);
                    }
                }
                // console.log(filteredObj);
                if (filteredObj) {
                    let new_data = JSON.stringify(filteredObj);
                    fs.writeFile("./notes.json", new_data, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(chalk.black(chalk.bgGreen("Note removed")));
                        }
                    });
                } else {
                    console.log(chalk.black(chalk.bgRed("Note not found!")));
                }
            } else {
                console.log(chalk.black(chalk.bgRed("Note not found!")));
            }
        }
    });
};

// LIST THE TITLES
const listthetitles = () => {
    readStream = fs.readFile("./notes.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const obj = JSON.parse(data);
            if (obj.length !== 0) {
                console.log(chalk.black(chalk.bgGreen("YOUR NOTES")));
                for (const obj_title in obj) {
                    console.log(obj[obj_title].title);
                }
            } else {
                console.log(chalk.black(chalk.bgRed("No Note found!")));
            }
        }
    });
};

// READ NOTE
const read = (title) => {
    readStream = fs.readFile("./notes.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const obj = JSON.parse(data);
            if (obj.length !== 0) {
                bodycontent = false;
                for (const obj_title in obj) {
                    // console.log(obj[obj_title].title, title);
                    if (obj[obj_title].title == title) {
                        bodycontent = obj[obj_title].body;
                    }
                }
                if (bodycontent) {
                console.log(chalk.black(chalk.bgGreen("LIST:")));
                    console.log(bodycontent);
                } else {
                console.log(chalk.black(chalk.bgRed("Title not found!")));
                }
            } else {
                console.log(chalk.black(chalk.bgRed("No Note found!")));
            }
        }
    });
};

func = argv._[0];
// console.log(func);
switch (func) {
    case "add":
        title = argv.title;
        body = argv.body;
        add(title, body);
        break;

    case "remove":
        title = argv.title;
        remove(title);
        break;
    case "read":
        title = argv.title;
        read(title);
        break;
    case "list":
        listthetitles();
        break;

    default:
        console.log("call the function");
}
