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
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var users = [
    {
        name: "Sarah Chen",
        email: "sarah@saasmaker.co",
        image: "https://ui-avatars.com/api/?name=Sarah+Chen",
        looking_for: "TECHNICAL_COFOUNDER",
        description: "Ex-Google PM building AI-powered analytics tools. Looking for a technical co-founder with ML expertise.",
        role: "BUSINESS"
    },
    {
        name: "Alex Kumar",
        email: "alex@techlabs.dev",
        image: "https://ui-avatars.com/api/?name=Alex+Kumar",
        looking_for: "BUSINESS_COFOUNDER",
        description: "Full-stack developer with 8 years experience. Built and sold 2 SaaS products. Seeking business co-founder.",
        role: "TECHNICAL"
    },
    {
        name: "Maria Rodriguez",
        email: "maria@growthmetrics.io",
        image: "https://ui-avatars.com/api/?name=Maria+Rodriguez",
        looking_for: "TECHNICAL_COFOUNDER",
        description: "Growth marketing expert specializing in B2B SaaS. Previously led growth at Stripe.",
        role: "BUSINESS"
    },
    {
        name: "James Wilson",
        email: "james@cloudstack.dev",
        image: "https://ui-avatars.com/api/?name=James+Wilson",
        looking_for: "BUSINESS_COFOUNDER",
        description: "Backend engineer specializing in cloud infrastructure. Looking to build developer tools.",
        role: "TECHNICAL"
    },
    {
        name: "Lisa Park",
        email: "lisa@designsystems.co",
        image: "https://ui-avatars.com/api/?name=Lisa+Park",
        looking_for: "TECHNICAL_COFOUNDER",
        description: "Product designer with expertise in B2B SaaS. Worked with 20+ startups.",
        role: "BUSINESS"
    },
    {
        name: "Michael Zhang",
        email: "michael@aiplatform.dev",
        image: "https://ui-avatars.com/api/?name=Michael+Zhang",
        looking_for: "BUSINESS_COFOUNDER",
        description: "ML engineer with PhD in Computer Science. Built multiple AI products.",
        role: "TECHNICAL"
    },
    {
        name: "Emma Brown",
        email: "emma@saasventures.co",
        image: "https://ui-avatars.com/api/?name=Emma+Brown",
        looking_for: "TECHNICAL_COFOUNDER",
        description: "Serial entrepreneur with 2 successful exits. Focus on B2B enterprise software.",
        role: "BUSINESS"
    },
    {
        name: "David Kim",
        email: "david@devtools.io",
        image: "https://ui-avatars.com/api/?name=David+Kim",
        looking_for: "BUSINESS_COFOUNDER",
        description: "Senior engineer from AWS. Expert in cloud infrastructure and DevOps.",
        role: "TECHNICAL"
    }
];
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, users_1, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🌱 Seeding database...');
                    _i = 0, users_1 = users;
                    _a.label = 1;
                case 1:
                    if (!(_i < users_1.length)) return [3 /*break*/, 4];
                    user = users_1[_i];
                    return [4 /*yield*/, prisma.user.upsert({
                            where: { email: user.email },
                            update: user,
                            create: user,
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log('✅ Database seeded successfully!');
                    return [2 /*return*/];
            }
        });
    });
}
seed()
    .catch(function (e) {
    console.error('Error seeding database:', e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
