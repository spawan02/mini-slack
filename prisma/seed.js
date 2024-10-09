"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// prisma/seed.ts
var bcrypt_1 = require("bcrypt");
var src_1 = require("./src");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var alice, _a, _b, bob, _c, _d, charlie, _e, _f, generalChannel, randomChannel, techChannel, message1, message2, message3, message4, message5;
        var _g, _h, _j, _k, _l, _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    _b = (_a = src_1.default.user).upsert;
                    _g = {
                        where: { email: 'alice@example.com' },
                        update: {}
                    };
                    _h = {
                        email: 'alice@example.com',
                        name: 'Alice Johnson'
                    };
                    return [4 /*yield*/, (0, bcrypt_1.hash)('password123', 10)];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_g.create = (_h.password = _o.sent(),
                            _h),
                            _g)])];
                case 2:
                    alice = _o.sent();
                    _d = (_c = src_1.default.user).upsert;
                    _j = {
                        where: { email: 'bob@example.com' },
                        update: {}
                    };
                    _k = {
                        email: 'bob@example.com',
                        name: 'Bob Smith'
                    };
                    return [4 /*yield*/, (0, bcrypt_1.hash)('password123', 10)];
                case 3: return [4 /*yield*/, _d.apply(_c, [(_j.create = (_k.password = _o.sent(),
                            _k),
                            _j)])];
                case 4:
                    bob = _o.sent();
                    _f = (_e = src_1.default.user).upsert;
                    _l = {
                        where: { email: 'charlie@example.com' },
                        update: {}
                    };
                    _m = {
                        email: 'charlie@example.com',
                        name: 'Charlie Brown'
                    };
                    return [4 /*yield*/, (0, bcrypt_1.hash)('password123', 10)];
                case 5: return [4 /*yield*/, _f.apply(_e, [(_l.create = (_m.password = _o.sent(),
                            _m),
                            _l)])
                    // Create channels
                ];
                case 6:
                    charlie = _o.sent();
                    return [4 /*yield*/, src_1.default.channel.create({
                            data: {
                                name: 'general',
                                creatorId: 1
                            },
                        })];
                case 7:
                    generalChannel = _o.sent();
                    return [4 /*yield*/, src_1.default.channel.create({
                            data: {
                                name: 'random',
                                creatorId: 2
                            },
                        })];
                case 8:
                    randomChannel = _o.sent();
                    return [4 /*yield*/, src_1.default.channel.create({
                            data: {
                                name: 'tech',
                                creatorId: 3
                            },
                        })
                        // Create messages
                    ];
                case 9:
                    techChannel = _o.sent();
                    return [4 /*yield*/, src_1.default.message.create({
                            data: {
                                content: 'Hello everyone! Welcome to our new Slack clone!',
                                userId: alice.id,
                                channelId: generalChannel.id,
                            },
                        })];
                case 10:
                    message1 = _o.sent();
                    return [4 /*yield*/, src_1.default.message.create({
                            data: {
                                content: 'Thanks Alice! This looks great.',
                                userId: bob.id,
                                channelId: generalChannel.id,
                            },
                        })];
                case 11:
                    message2 = _o.sent();
                    return [4 /*yield*/, src_1.default.message.create({
                            data: {
                                content: 'Has anyone seen any good movies lately?',
                                userId: charlie.id,
                                channelId: randomChannel.id,
                            },
                        })];
                case 12:
                    message3 = _o.sent();
                    return [4 /*yield*/, src_1.default.message.create({
                            data: {
                                content: 'I watched Inception last night. It was mind-bending!',
                                userId: alice.id,
                                channelId: randomChannel.id,
                            },
                        })];
                case 13:
                    message4 = _o.sent();
                    return [4 /*yield*/, src_1.default.message.create({
                            data: {
                                content: 'Hey team, what do you think about the new React 18 features?',
                                userId: bob.id,
                                channelId: techChannel.id,
                            },
                        })
                        // Create reactions
                    ];
                case 14:
                    message5 = _o.sent();
                    // Create reactions
                    return [4 /*yield*/, src_1.default.reaction.create({
                            data: {
                                emoji: '👍',
                                messageId: message1.id,
                                count: 1,
                            },
                        })];
                case 15:
                    // Create reactions
                    _o.sent();
                    return [4 /*yield*/, src_1.default.reaction.create({
                            data: {
                                emoji: '❤️',
                                messageId: message1.id,
                                count: 1,
                            },
                        })];
                case 16:
                    _o.sent();
                    return [4 /*yield*/, src_1.default.reaction.create({
                            data: {
                                emoji: '🚀',
                                messageId: message5.id,
                                count: 1,
                            },
                        })];
                case 17:
                    _o.sent();
                    console.log('Seed data created successfully');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, src_1.default.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
