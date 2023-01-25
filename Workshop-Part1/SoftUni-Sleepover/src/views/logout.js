import { logout } from "../data/user.js";

export function onLogout(ctx) {
    logout();
    ctx.page.redirect('/');
}