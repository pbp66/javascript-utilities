// https://stackabuse.com/executing-shell-commands-with-node-js/
const cp = require('child_process'); // https://nodejs.org/docs/latest-v16.x/api/child_process.html

class Bash {
    constructor() {

    }

    #terminal(command) {
        cp.exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }

    terminal(command, args, options) {
        this.currentCommand = cp.spawn(command, args);
        this.currentCommand.stdout.on("data", data => {
            console.log(`stdout: ${data}`);
        });
        
        this.currentCommand.stderr.on("data", data => {
            console.log(`stderr: ${data}`);
        });
        
        this.currentCommand.on('error', (error) => {
            console.log(`error: ${error.message}`);
        });
        
        this.currentCommand.on("close", code => {
            console.log(`child process exited with code ${code}`);
        });
    }
}

// DEV TESTING SECTION
const bash = new Bash();
bash.terminal("ls", ["-la"]);

// Could use instead: https://www.npmjs.com/package/shelljs
// Another guide: https://opensource.com/article/18/7/node-js-interactive-cli