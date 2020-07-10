const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
//target location, creates HTML file inside output folder
const outputPath = path.join(OUTPUT_DIR, "team.html");
//render function
//needs to pass array in as render function
const render = require("./lib/htmlRenderer");

//push object in team array
//example
const teamArray = [];
//we use to increment team array index
var employeeCounter = 0;

//what actually writes the file that gives karen her employee info
function callRender(){
const renderHTML = render(teamArray);
fs.writeFile(outputPath, renderHTML, (err)=>{
     console.log('file generated')
 })
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//function that returns inquirer.prompt
var prompt = function(question){
//the return is good because it makes sure i dont run dumb things in the code
    return inquirer.prompt(question)
//after the inquirer is done then do function to determine different question paths for employee types
    .then(function(answers){ 
        switch(answers.role){
//use answers.role and run through intern questions
            case "Intern" :
                inquirer.prompt(questionsIntern).then(answers=>{
//after you answer the intern questions then you create a new intern object with the inputs
                   teamArray[employeeCounter] = new Intern(answers.name, answers.id, answers.email, answers.school);
//increment array position
                   employeeCounter ++ ;
//if you want to add another person...
                   if (answers.add == "yes"){
//stop function and rerun from beginning
                       return prompt(initialQ)
//if karen tells the manager not to add another employee because reasons
                   }else{
 //give karen the HTML file with all the employees she can talk to the manager about
                       return callRender()
                   }
                })
            break;
//here are the questions karen will ask the manager
            case "Manager":
                inquirer.prompt(questionsManager).then(answers=>{
//create a new manager object for karens array
                    teamArray[employeeCounter] = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                    employeeCounter ++ ;
                    if (answers.add == "yes"){
                        return prompt(initialQ)
                    }else{
                        return callRender()
                    }
                 })
            break;
//switch to the engineer case and ask corr. questions
            case "Engineer":
                inquirer.prompt(questionsEngineer).then(answers=>{
                    teamArray[employeeCounter] = new Engineer(answers.name, answers.id, answers.email, answers.github);
                    employeeCounter ++ ;
                    if (answers.add == "yes"){
                        return prompt(initialQ)
                    }else{
                        return callRender()
                    }
                 })

            break;
        }
    })

}

//const for the initial question
const initialQ = {
    type: "list",
    name: "role",
    message: "what is your role?",
    choices: [ "Intern",
    "Engineer",
    "Manager"
]
}

//use inquirer to prompt initial question
prompt(initialQ);

//const for engineer questions
const questionsEngineer= [
    {
        type: "input",
        name: "name",
        message: "What is the engineer's name?"

    },

    {
        type: "input",
        name: "email",
        message: "What is the engineer's email address?"

    },

    {
        type: "input",
        name: "id",
        message: "What is the engineer's ID?"

    },
    {
        type: "input",
        name: "github",
        message: "What is the engineer's github"
    },
    {
    type: "list",
    name: "add",
    message: "Do you want to add another team member?",
    choices: [ "yes",
    "no",   
]
}
]

//const for intern questions
const questionsIntern = [
{
    type: "input",
    name: "name",
    message: "What is the intern's name?"

},

{
    type: "input",
    name: "email",
    message: "What is the intern's email address?"
},

{
    type: "input",
    name: "id",
    message: "What is the intern's ID?"

},

{
    type: "input",
    name: "school",
    message: "What is the intern's school"   
},
{
    type: "list",
    name: "add",
    message: "Do you want to add another team member?",
    choices: [ "yes",
    "no",   
]
}
]

//karens questions
const questionsManager = [
    {
        type: "input",
        name: "name",
        message: "What is the manager's name?"

    },

    {
        type: "input",
        name: "email",
        message: "What is the manager's email address?"

    },

    {
        type: "input",
        name: "id",
        message: "What is the manager's ID?"

    },
    {
    type: "input",
    name: "officeNumber",
    message: "What is the manager's office number?"   
    },

    {
    type: "list",
    name: "add",
    message: "Do you want to add another team member?",
    choices: [ "yes",
    "no",   
]
}
]


//everytime refer to class create object


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
