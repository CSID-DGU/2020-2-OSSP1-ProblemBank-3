const { spawn } = require('child_process');
const path = require('path');
const rs = require('randomstring');
const fs = require('fs-extra');

const ROOT = process.env.ROOT_PATH;
const PROBLEM_PATH = process.env.PROBLEM_TEMP_PATH;

const getProblemDocker = (source, category) => {
    const hash = rs.generate(10);
    const tempPath = path.resolve(PROBLEM_PATH, hash);
    fs.mkdirSync(tempPath);

    let filename;
    switch(category) {
        case "java":
            filename = "Main.java"; break;
        case "python":
            filename = "main.py"; break;
        case "r":
            filename = "main.R"; break;
        case "cpp": 
            filename = "main.cpp"; break;
        case "c": default:
            filename = "main.c"; break;
    }


    const mainFilePath = path.resolve(tempPath, filename);
    fs.createFileSync(mainFilePath);

    fs.writeFileSync(mainFilePath, Buffer.from(source));

    
    let docker;
    switch(category) {
        case "java":
            docker = spawn("docker", ["run", "--rm", "-i", "-v", `${tempPath}:/src`, "java-problem-run:1.0"]);;
            break;
        case "r":
            docker = spawn("docker", ["run", "--rm", "-i", "-v", `${tempPath}:/src`, "r-problem-run:1.0"]);;
            break;
        case "python":
            docker = spawn("docker", ["run", "--rm", "-i", "-v", `${tempPath}:/src`, "python-problem-run:1.0"]);;
            break;
        case "cpp":
            docker = spawn("docker", ["run", "--rm", "-i", "-v", `${tempPath}:/src`, "cpp-problem-run:1.0"]);;
            break;
        case "c": default:
            docker = spawn("docker", ["run", "--rm", "-i", "-v", `${tempPath}:/src`, "c-problem-run:1.0"]);;
            break;
    }

    return docker; 
}

module.exports = { getProblemDocker };