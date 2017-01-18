import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app modules and oprions/app.module';
import {enableProdMode} from "@angular/core";
enableProdMode();
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);