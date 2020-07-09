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
var employeeCounter = 0;

// const renderHTML = render(teamArray);
// fs.writeFile(outputPath, renderHTML, (err)=>{
//     console.log('file generated')
// })

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

var prompt = function(question){
    return inquirer
    .prompt(question)
    .then(function(answers){ 
        switch(answers.role){
            case "Intern" :
                inquirer.prompt(questionsIntern).then(answers=>{
                    //var employeename = "employee" + employeeCounter;
                    
                   teamArray[employeeCounter] = new Intern(answers.name, answers.id, answers.email, answers.school);
                   employeeCounter ++ ;
                   if (answers.add == "yes"){
                       return prompt(initialQ)
                   }else{
                       return
                   }
                })

            break;
        

            case "Manager":

            break;


            case "Engineer":

            break;
        }
        // if( employeeCounter  < 3){
        //     employeeCounter++;
        //     console.log(employeeCounter)
        //     return prompt(question1);
            
        // }else{
        //     return prompt(question2)
        // }
    })
}

const initialQ = {
    type: "list",
    name: "role",
    message: "what is your role?",
    choices: [ "Intern",
    "Engineer",
    "Manager"
]
}

prompt(initialQ);

const question1 = 
{
    type: "input",
    name: "name",
    message: "who are you",

}

const question2 = 
{
    type: "input",
    name: "notname",
    message: "who arent you",

}



// ).then(answers => {

//     switch(answers.role){ case "Intern":
        //  inquirer.prompt(questionsIntern).then(answers=>{
        //      //var employeename = "employee" + employeeCounter;
             
        //     teamArray[employeeCounter] = new Intern(answers.name, answers.id, answers.email, answers.school);
        //     employeeCounter ++ ;
        //  })
 
//      break;
//      case "Engineer":
//         inquirer.prompt(questionsEngineer).then(answers=>{
//             //var employeename = "employee" + employeeCounter;
            
//            teamArray[employeeCounter] = new Engineer(answers.name, answers.id, answers.email, answers.github);
//            employeeCounter ++ ;
//         })
 
//      break;
//      case "Manager":
//         inquirer.prompt(questionsManager).then(answers=>{
//             //var employeename = "employee" + employeeCounter;
            
//            teamArray[employeeCounter] = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
//            employeeCounter ++ ;
//         })
//      break;
//  }
// })
// }


    
    //     type: "list",
    //     name: "add",
    //     message: "do you want to add another team member?",
    //     choices: [ "yes",
    //     "no",   
    // ]
    



// if(answers.add==="yes"){
//     questionloop();
// }

const questionsEngineer= [

    {
        type: "input",
        name: "name",
        message: "What is the name?"

    },

    {
        type: "input",
        name: "email",
        message: "what is the email address?"

    },

    {
        type: "input",
        name: "id",
        message: "what is the ID?"

    },
    {
        type: "input",
        name: "github",
        message: "what is the github"
    },
    {
    type: "list",
    name: "add",
    message: "do you want to add another team member?",
    choices: [ "yes",
    "no",   
]
}
]

const questionsIntern = [
{
    type: "input",
    name: "name",
    message: "What is the name?"

},

{
    type: "input",
    name: "email",
    message: "what is the email address?"

},

{
    type: "input",
    name: "id",
    message: "what is the ID?"

},

{
    type: "input",
    name: "school",
    message: "what is the school"   
},
{
    type: "list",
    name: "add",
    message: "do you want to add another team member?",
    choices: [ "yes",
    "no",   
]
}
]

const questionsManager = [
    {
        type: "input",
        name: "name",
        message: "What is the name?"

    },

    {
        type: "input",
        name: "email",
        message: "what is the email address?"

    },

    {
        type: "input",
        name: "id",
        message: "what is the ID?"

    },
{
    type: "input",
    name: "officeNumber",
    message: "what is the office number?"   
},
{
    type: "list",
    name: "add",
    message: "do you want to add another team member?",
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
