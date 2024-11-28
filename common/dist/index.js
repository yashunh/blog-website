"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostInput = exports.createPostInput = exports.signupInput = exports.signinInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8)
});
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
    name: zod_1.default.string().optional()
});
exports.createPostInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string().min(6),
    published: zod_1.default.boolean().optional()
});
exports.updatePostInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string().min(6),
    id: zod_1.default.string().uuid()
});
