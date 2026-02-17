const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const reportFile = path.resolve(__dirname, '../test-report.txt');

console.log('Running tests and generating report...');

const jest = spawn('npx', ['jest', '--coverage', '--colors'], {
    shell: true,
    stdio: ['inherit', 'pipe', 'pipe'],
    env: { ...process.env, FORCE_COLOR: 'true' }
});

let output = '';

jest.stdout.on('data', (data) => {
    const str = data.toString();
    process.stdout.write(str);
    output += str;
});

jest.stderr.on('data', (data) => {
    const str = data.toString();
    process.stderr.write(str);
    output += str;
});

jest.on('close', (code) => {
    // Strip ANSI colors for the text file
    const cleanOutput = output.replace(/\u001b\[[0-9;]*[a-zA-Z]/g, '');
    fs.writeFileSync(reportFile, cleanOutput);
    console.log(`\n✅ Test report updated: ${reportFile}`);
    process.exit(code);
});
