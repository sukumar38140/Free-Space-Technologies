@echo off
echo.
echo ========================================
echo   GitLab Deployment Setup Script
echo   Free Space Technologies
echo ========================================
echo.

echo Step 1: Create GitLab Repository
echo --------------------------------
echo 1. Go to https://gitlab.com
echo 2. Sign up/Login to GitLab
echo 3. Click "New project" - "Create blank project"
echo 4. Project name: Free_Space_Technologies
echo 5. Visibility: Public (for free GitLab Pages)
echo 6. Click "Create project"
echo.

echo Step 2: Get Your GitLab Repository URL
echo -------------------------------------
echo After creating the project, copy the HTTPS clone URL
echo It should look like: https://gitlab.com/YOUR_USERNAME/Free_Space_Technologies.git
echo.

set /p gitlab_url="Enter your GitLab repository URL: "

echo.
echo Step 3: Adding GitLab Remote
echo ----------------------------
git remote add gitlab %gitlab_url%

echo.
echo Step 4: Pushing to GitLab
echo -------------------------
git push -u gitlab master

echo.
echo ========================================
echo   Deployment Complete! 
echo ========================================
echo.
echo Your website will be available at:
echo https://YOUR_USERNAME.gitlab.io/Free_Space_Technologies
echo.
echo GitLab Pages will automatically build and deploy your site!
echo Check the CI/CD pipeline at: %gitlab_url%/-/pipelines
echo.

pause
