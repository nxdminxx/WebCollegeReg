import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' },
    { state: 'category', name: 'Manage category', icon: 'category', role: 'Admin' }
];

@Injectable()

export class MenuItems {
    getmenuitem(): Menu[] {
        return MENUITEMS;
    }

}