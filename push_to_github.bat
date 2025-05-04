@echo off
echo ===== MyPlanner GitHub Deployment Script =====
echo.

echo Step 1: Enter your GitHub username:
set /p username=GitHub Username: 

echo.
echo Step 2: Setting up remote repository...
git remote add origin https://github.com/%username%/myplanner.git

echo.
echo Step 3: Pushing code to GitHub...
git push -u origin master

echo.
echo Step 4: Installing gh-pages package...
npm install --save-dev gh-pages

echo.
echo Step 5: Deploying to GitHub Pages...
npm run deploy

echo.
echo ===== Deployment Complete =====
echo.
echo Your application should now be available at:
echo https://%username%.github.io/myplanner
echo.
echo Note: It may take a few minutes for the site to be accessible.
echo.
echo Don't forget to configure GitHub Pages in your repository settings:
echo 1. Go to https://github.com/%username%/myplanner/settings/pages
echo 2. Ensure the source is set to the gh-pages branch
echo.
pause
