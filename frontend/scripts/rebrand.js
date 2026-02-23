const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            filelist = walkSync(filePath, filelist);
        } else {
            filelist.push(filePath);
        }
    });
    return filelist;
}

const files = walkSync('src');
files.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.jsx')) {
        let content = fs.readFileSync(file, 'utf8');
        let initialContent = content;

        content = content.replace(/StyleNest/g, 'Trendora');
        content = content.replace(/STYLENEST/g, 'TRENDORA');
        content = content.replace(/stylenest/g, 'trendora');

        if (content !== initialContent) {
            fs.writeFileSync(file, content);
            console.log(`Rebranded ${file}`);
        }
    }
});
