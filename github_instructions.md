# GitHub Deployment Instructions

Follow these steps to deploy your MyPlanner application to GitHub:

## 1. Create a new repository on GitHub

1. Go to [GitHub](https://github.com/) and sign in to your account
2. Click on the "+" icon in the top right corner and select "New repository"
3. Enter "myplanner" as the Repository name
4. Add the description: "A modern, responsive web application for managing personal activities, daily schedules, and recurring shifts"
5. Choose "Public" visibility
6. Do NOT initialize the repository with a README, .gitignore, or license
7. Click "Create repository"

## 2. Push your local repository to GitHub

After creating the repository, GitHub will show you commands to push an existing repository. Use the following commands in your terminal:

```bash
# Add the remote repository URL
git remote add origin https://github.com/Wijsbe/myplanner.git

# Push your code to GitHub
git push -u origin master
```

Note: Replace "Wijsbe" with your actual GitHub username if different.

## 3. Deploy with GitHub Pages (Optional)

To deploy your application using GitHub Pages:

1. Install the gh-pages package:
```bash
npm install --save-dev gh-pages
```

2. Add the following to your package.json:
```json
"homepage": "https://Wijsbe.github.io/myplanner",
"scripts": {
  // other scripts...
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Update your vite.config.js:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/myplanner/'
})
```

4. Deploy your application:
```bash
npm run deploy
```

5. On GitHub, go to your repository settings, navigate to "Pages", and ensure the source is set to the gh-pages branch.

Your application will be available at: https://Wijsbe.github.io/myplanner
