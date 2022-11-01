// https://stackabuse.com/executing-shell-commands-with-node-js/
const cp = require('child_process');

class Bash {
    constructor() {

    }

    terminal(command) {
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
}

// DEV TESTING SECTION
const bash = new Bash();
bash.terminal("ls -la");
