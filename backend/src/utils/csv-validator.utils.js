"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRow = validateRow;
function validateRow(row) {
    if (!row.name || !row.email || !row.age) {
        return false;
    }
    return true;
}
