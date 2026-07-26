import "./setup.mjs";

console.log("Application is running");
/*
Application setup completed
Application is running
*/

/*
    Explain why the setup message is printed first
    - `import "./setup.mjs"` loads and evaluates the imported module
    - The imported module is evaluated before the body of `app.mjs` runs
    - Therefore, the setup message is printed before "Application is running"
*/
