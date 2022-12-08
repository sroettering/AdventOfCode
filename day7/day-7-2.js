import { fileSystemRoot } from './day-7-1.js';

const targetSize = 70000000 - 30000000;
const totalSize = fileSystemRoot.size;
const sizeToDelete = totalSize - targetSize;
const nodesToTraverse = [fileSystemRoot];
const nodes = [];

while (nodesToTraverse.length) {
    const currentNode = nodesToTraverse.splice(0, 1)[0];

    if (currentNode.isDir && currentNode.size >= sizeToDelete) {
        nodes.push(currentNode.size);
    }
    if (Array.isArray(currentNode.children)) {
        nodesToTraverse.push(...currentNode.children);
    }
}

console.log(Math.min(...nodes));
