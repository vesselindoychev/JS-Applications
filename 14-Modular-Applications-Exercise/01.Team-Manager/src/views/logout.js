import { logout } from "../api/data.js";

export async function logoutView(ctx) {
    await logout();
    ctx.page.redirect('/');
    ctx.updateNav();
} 