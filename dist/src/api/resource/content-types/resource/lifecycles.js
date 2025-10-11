"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AVERAGE_WPM = 225;
function toPlainText(value) {
    if (!value)
        return "";
    // very lightweight HTML strip; Strapi richtext is stored as HTML
    return value.replace(/<[^>]*>/g, " ");
}
function estimateReadTime(data) {
    if (!data)
        return;
    const source = toPlainText(data.content) || toPlainText(data.excerpt);
    const words = source.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
        data.readTime = null;
        return;
    }
    const minutes = Math.max(1, Math.ceil(words.length / AVERAGE_WPM));
    data.readTime = `${minutes} min read`;
}
exports.default = {
    beforeCreate(event) {
        var _a;
        if ((_a = event === null || event === void 0 ? void 0 : event.params) === null || _a === void 0 ? void 0 : _a.data) {
            estimateReadTime(event.params.data);
        }
    },
    beforeUpdate(event) {
        var _a;
        if ((_a = event === null || event === void 0 ? void 0 : event.params) === null || _a === void 0 ? void 0 : _a.data) {
            estimateReadTime(event.params.data);
        }
    },
};
