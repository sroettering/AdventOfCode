import { readInput } from '../helpers/read-input.js';

class Node {
    filename;
    isDir;
    size;
    parent;
    children;

    constructor({ filename, isDir, size, parent, children }) {
        this.filename = filename;
        this.isDir = isDir;
        this.size = size ?? 0;
        this.parent = parent;
        this.children = children;
    }

    addChild(child) {
        if (!this.children) {
            this.children = [];
            this.isDir = true;
        }
        this.children.push(child);
        this.addSize(child.size);
    }

    addSize(size) {
        this.size += size;
        if (this.parent) {
            this.parent.addSize(size);
        }
    }

    relativePath() {
        let path = this.filename;
        if (this.parent) {
            const parentPath = this.parent.relativePath();
            path = parentPath === '/' ? parentPath + path : parentPath + '/' + path;
        }
        return path;
    }
}

const buildFileSystem = (cmds) => {
    let dir = new Node({ filename: '/', isDir: true, size: 0 });
    for (let c = 1; c < cmds.length; c++) {
        if (cmds[c] === '$ cd ..') {
            dir = dir.parent;
        } else if (cmds[c].startsWith('$ cd ')) {
            dir = dir.children.find(child => cmds[c].substring(5) === child.filename);
        } else if (cmds[c].startsWith('dir ')) {
            dir.addChild(new Node({
                filename: cmds[c].substring(4),
                isDir: true,
                size: 0,
                parent: dir
            }));
        } else if (!cmds[c].startsWith('$')) {
            const parts = cmds[c].split(' ');
            const filename = parts[1];
            const filesize = Number.parseInt(parts[0]);
            dir.addChild(new Node({
                filename,
                isDir: false,
                size: filesize,
                parent: dir
            }));
        }
    }

    while (dir.parent) {
        dir = dir.parent;
    }
    return dir;
}

const inputLines = readInput(new URL('day-7-1.txt', import.meta.url))
    .split('\n')
    .filter(line => line !== '');

const fileSystemRoot = buildFileSystem(inputLines);

const nodesToTraverse = [fileSystemRoot];
let sum = 0;

while (nodesToTraverse.length) {
    const currentNode = nodesToTraverse.splice(0, 1)[0];

    if (currentNode.isDir && currentNode.size <= 100000) {
        sum += currentNode.size;
    }
    if (Array.isArray(currentNode.children)) {
        nodesToTraverse.unshift(...currentNode.children);
    }
}

console.log('Sum:', sum);
