/**
 *  An array of routes that are accessible to public
 * These routes doesn't require authentication
 * @type {string[]}
*/

export const publicRoutes = [
    "/",
    "/auth/verification"
];

/**
 *  An array of routes that are used for authentication 
 * These routes will send logged in users to directly settings
 * @type {string[]}
*/
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that starts with this prefix are used for API authentication purpose
 * @type {string[]}
*/
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string[]}
*/
export const DEFAULT_LOGIN_REDIRECT = "/client";