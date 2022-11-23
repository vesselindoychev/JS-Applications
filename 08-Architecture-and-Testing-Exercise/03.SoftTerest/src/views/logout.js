import { logout } from "../api/user.js";

export async function onLogout(context) {
    await logout();
    context.goto('/');
    context.showCorrectNav();
}