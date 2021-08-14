"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const roles_guard_1 = require("./roles/roles.guard");
const stripe_module_1 = require("./stripe/stripe.module");
const users_module_1 = require("./users/users.module");
const autovisual_module_1 = require("./autovisual/autovisual.module");
const advert_module_1 = require("./advert/advert.module");
const mails_module_1 = require("./mails/mails.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://admin:admin@autorate.ql0fd.mongodb.net/Autorate?retryWrites=true&w=majority'),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            stripe_module_1.StripeModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            autovisual_module_1.AutovisualModule,
            advert_module_1.AdvertModule,
            mails_module_1.MailsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map