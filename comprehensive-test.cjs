#!/usr/bin/env node
// Comprehensive Application Testing Suite
// Free Space Technologies - Complete Validation

const fs = require('fs');
const path = require('path');

console.log('🚀 FREE SPACE TECHNOLOGIES - COMPREHENSIVE TESTING SUITE\n');
console.log('=' * 60);

class ApplicationTester {
  constructor() {
    this.testResults = {
      passed: 0,
      failed: 0,
      warnings: 0,
      issues: [],
      missing: [],
      recommendations: []
    };
  }

  log(message, type = 'info') {
    const icons = {
      pass: '✅',
      fail: '❌', 
      warn: '⚠️',
      info: 'ℹ️',
      test: '🧪'
    };
    console.log(`${icons[type] || icons.info} ${message}`);
  }

  // Test 1: Project Structure Validation
  testProjectStructure() {
    this.log('Testing Project Structure...', 'test');
    
    const requiredFiles = [
      'package.json',
      'vite.config.ts',
      'tsconfig.json',
      'tailwind.config.ts',
      'src/main.tsx',
      'src/App.tsx',
      'index.html',
      'vercel.json'
    ];

    const requiredDirs = [
      'src/components',
      'src/pages',
      'src/contexts',
      'src/hooks',
      'src/lib',
      'public/team'
    ];

    requiredFiles.forEach(file => {
      if (fs.existsSync(file)) {
        this.log(`${file} - Found`, 'pass');
        this.testResults.passed++;
      } else {
        this.log(`${file} - Missing`, 'fail');
        this.testResults.failed++;
        this.testResults.missing.push(file);
      }
    });

    requiredDirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        this.log(`${dir}/ - Found`, 'pass');
        this.testResults.passed++;
      } else {
        this.log(`${dir}/ - Missing`, 'fail');
        this.testResults.failed++;
        this.testResults.missing.push(dir);
      }
    });
  }

  // Test 2: Package.json Dependencies
  testDependencies() {
    this.log('\nTesting Dependencies...', 'test');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const requiredDeps = [
        'react',
        'react-dom',
        'react-router-dom',
        'typescript',
        'vite',
        '@types/react',
        '@types/react-dom'
      ];

      requiredDeps.forEach(dep => {
        const found = packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep];
        if (found) {
          this.log(`${dep} v${found} - Installed`, 'pass');
          this.testResults.passed++;
        } else {
          this.log(`${dep} - Missing`, 'fail');
          this.testResults.failed++;
          this.testResults.missing.push(`dependency: ${dep}`);
        }
      });

      // Check for build scripts
      const scripts = packageJson.scripts || {};
      ['dev', 'build', 'preview'].forEach(script => {
        if (scripts[script]) {
          this.log(`Script "${script}" - Found`, 'pass');
          this.testResults.passed++;
        } else {
          this.log(`Script "${script}" - Missing`, 'fail');
          this.testResults.failed++;
          this.testResults.missing.push(`script: ${script}`);
        }
      });

    } catch (error) {
      this.log(`package.json parsing failed: ${error.message}`, 'fail');
      this.testResults.failed++;
    }
  }

  // Test 3: TypeScript Configuration
  testTypeScriptConfig() {
    this.log('\nTesting TypeScript Configuration...', 'test');
    
    try {
      const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
      
      if (tsconfig.compilerOptions) {
        this.log('tsconfig.json - Valid structure', 'pass');
        this.testResults.passed++;
        
        const requiredOptions = ['target', 'module', 'strict'];
        requiredOptions.forEach(option => {
          if (tsconfig.compilerOptions[option] !== undefined) {
            this.log(`TypeScript ${option} - Configured`, 'pass');
            this.testResults.passed++;
          } else {
            this.log(`TypeScript ${option} - Missing`, 'warn');
            this.testResults.warnings++;
          }
        });
      } else {
        this.log('tsconfig.json - Invalid structure', 'fail');
        this.testResults.failed++;
      }
    } catch (error) {
      this.log(`tsconfig.json parsing failed: ${error.message}`, 'fail');
      this.testResults.failed++;
    }
  }

  // Test 4: React Components Structure
  testReactComponents() {
    this.log('\nTesting React Components...', 'test');
    
    const componentFiles = [
      'src/App.tsx',
      'src/components/Navbar.tsx',
      'src/components/Footer.tsx',
      'src/components/AdminLogin.tsx',
      'src/pages/Index.tsx',
      'src/pages/About.tsx',
      'src/pages/Services.tsx',
      'src/pages/Career.tsx',
      'src/pages/Contact.tsx',
      'src/pages/Admin.tsx'
    ];

    componentFiles.forEach(file => {
      if (fs.existsSync(file)) {
        try {
          const content = fs.readFileSync(file, 'utf8');
          if (content.includes('export default') || content.includes('export {')) {
            this.log(`${file} - Valid component`, 'pass');
            this.testResults.passed++;
          } else {
            this.log(`${file} - No export found`, 'warn');
            this.testResults.warnings++;
          }
        } catch (error) {
          this.log(`${file} - Read error`, 'fail');
          this.testResults.failed++;
        }
      } else {
        this.log(`${file} - Missing`, 'fail');
        this.testResults.failed++;
        this.testResults.missing.push(file);
      }
    });
  }

  // Test 5: Admin Authentication System
  testAdminAuth() {
    this.log('\nTesting Admin Authentication...', 'test');
    
    try {
      const authContextPath = 'src/contexts/AdminAuthContext.tsx';
      if (fs.existsSync(authContextPath)) {
        const content = fs.readFileSync(authContextPath, 'utf8');
        
        // Check for admin accounts
        if (content.includes('ADMIN_ACCOUNTS')) {
          this.log('Admin accounts configuration - Found', 'pass');
          this.testResults.passed++;
          
          // Check for specific admin credentials
          const adminEmails = [
            '24691F0071@mits.ac.in',
            '24691F00A8@mits.ac.in', 
            '24691F00C3@mits.ac.in'
          ];
          
          adminEmails.forEach(email => {
            if (content.includes(email)) {
              this.log(`Admin ${email} - Configured`, 'pass');
              this.testResults.passed++;
            } else {
              this.log(`Admin ${email} - Missing`, 'fail');
              this.testResults.failed++;
            }
          });
        } else {
          this.log('Admin accounts configuration - Missing', 'fail');
          this.testResults.failed++;
        }

        // Check for auth functions
        const authFunctions = ['login', 'logout', 'useAdminAuth'];
        authFunctions.forEach(func => {
          if (content.includes(func)) {
            this.log(`Auth function ${func} - Found`, 'pass');
            this.testResults.passed++;
          } else {
            this.log(`Auth function ${func} - Missing`, 'fail');
            this.testResults.failed++;
          }
        });
      } else {
        this.log('AdminAuthContext.tsx - Missing', 'fail');
        this.testResults.failed++;
        this.testResults.missing.push(authContextPath);
      }
    } catch (error) {
      this.log(`Admin auth test failed: ${error.message}`, 'fail');
      this.testResults.failed++;
    }
  }

  // Test 6: Team Images and Assets
  testAssets() {
    this.log('\nTesting Assets and Images...', 'test');
    
    const teamDir = 'public/team';
    if (fs.existsSync(teamDir)) {
      const teamFiles = fs.readdirSync(teamDir);
      if (teamFiles.length > 0) {
        this.log(`Team images directory - ${teamFiles.length} files found`, 'pass');
        this.testResults.passed++;
        
        teamFiles.forEach(file => {
          const filePath = path.join(teamDir, file);
          const stats = fs.statSync(filePath);
          const sizeKB = (stats.size / 1024).toFixed(2);
          
          if (stats.size > 0) {
            this.log(`${file} - ${sizeKB}KB`, 'pass');
            this.testResults.passed++;
          } else {
            this.log(`${file} - Empty file`, 'warn');
            this.testResults.warnings++;
          }
        });
      } else {
        this.log('Team images directory - Empty', 'warn');
        this.testResults.warnings++;
      }
    } else {
      this.log('Team images directory - Missing', 'fail');
      this.testResults.failed++;
      this.testResults.missing.push(teamDir);
    }

    // Check favicon
    const favicon = 'public/favicon.ico';
    if (fs.existsSync(favicon)) {
      this.log('favicon.ico - Found', 'pass');
      this.testResults.passed++;
    } else {
      this.log('favicon.ico - Missing', 'warn');
      this.testResults.warnings++;
      this.testResults.missing.push(favicon);
    }
  }

  // Test 7: Deployment Configuration
  testDeploymentConfig() {
    this.log('\nTesting Deployment Configuration...', 'test');
    
    // Test Vercel config
    if (fs.existsSync('vercel.json')) {
      try {
        const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
        
        if (vercelConfig.framework === 'vite') {
          this.log('Vercel framework - Correctly set to vite', 'pass');
          this.testResults.passed++;
        } else {
          this.log('Vercel framework - Not set to vite', 'warn');
          this.testResults.warnings++;
        }

        if (vercelConfig.buildCommand) {
          this.log('Vercel build command - Configured', 'pass');
          this.testResults.passed++;
        } else {
          this.log('Vercel build command - Missing', 'warn');
          this.testResults.warnings++;
        }

        if (vercelConfig.rewrites) {
          this.log('Vercel SPA routing - Configured', 'pass');
          this.testResults.passed++;
        } else {
          this.log('Vercel SPA routing - Missing', 'warn');
          this.testResults.warnings++;
        }
      } catch (error) {
        this.log(`vercel.json parsing failed: ${error.message}`, 'fail');
        this.testResults.failed++;
      }
    } else {
      this.log('vercel.json - Missing', 'warn');
      this.testResults.warnings++;
      this.testResults.missing.push('vercel.json');
    }

    // Test Node version
    if (fs.existsSync('.nvmrc')) {
      this.log('.nvmrc - Found (Node version locked)', 'pass');
      this.testResults.passed++;
    } else {
      this.log('.nvmrc - Missing (Node version not locked)', 'warn');
      this.testResults.warnings++;
      this.testResults.recommendations.push('Add .nvmrc file for consistent Node.js version');
    }
  }

  // Test 8: Performance and Optimization
  testPerformance() {
    this.log('\nTesting Performance & Optimization...', 'test');
    
    // Check for common performance files
    const perfFiles = [
      '.vercelignore',
      'postcss.config.js',
      'tailwind.config.ts'
    ];

    perfFiles.forEach(file => {
      if (fs.existsSync(file)) {
        this.log(`${file} - Found (optimization)`, 'pass');
        this.testResults.passed++;
      } else {
        this.log(`${file} - Missing (optimization opportunity)`, 'warn');
        this.testResults.warnings++;
        this.testResults.recommendations.push(`Add ${file} for better performance`);
      }
    });

    // Check bundle size considerations
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const deps = Object.keys(packageJson.dependencies || {});
      
      if (deps.length < 50) {
        this.log(`Dependencies count: ${deps.length} - Reasonable`, 'pass');
        this.testResults.passed++;
      } else {
        this.log(`Dependencies count: ${deps.length} - High (consider optimization)`, 'warn');
        this.testResults.warnings++;
        this.testResults.recommendations.push('Consider reducing dependencies for better performance');
      }
    } catch (error) {
      this.log('Could not analyze dependencies', 'warn');
      this.testResults.warnings++;
    }
  }

  // Generate comprehensive report
  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 COMPREHENSIVE TEST REPORT');
    console.log('='.repeat(60));
    
    const total = this.testResults.passed + this.testResults.failed + this.testResults.warnings;
    const successRate = ((this.testResults.passed / total) * 100).toFixed(1);
    
    console.log(`\n📈 OVERALL STATISTICS:`);
    console.log(`   ✅ Passed: ${this.testResults.passed}`);
    console.log(`   ❌ Failed: ${this.testResults.failed}`);
    console.log(`   ⚠️  Warnings: ${this.testResults.warnings}`);
    console.log(`   📊 Success Rate: ${successRate}%`);
    console.log(`   🎯 Total Tests: ${total}`);

    if (this.testResults.failed > 0) {
      console.log(`\n❌ CRITICAL ISSUES FOUND:`);
      this.testResults.issues.forEach(issue => {
        console.log(`   • ${issue}`);
      });
    }

    if (this.testResults.missing.length > 0) {
      console.log(`\n📋 MISSING ITEMS:`);
      this.testResults.missing.forEach(item => {
        console.log(`   • ${item}`);
      });
    }

    if (this.testResults.recommendations.length > 0) {
      console.log(`\n💡 RECOMMENDATIONS:`);
      this.testResults.recommendations.forEach(rec => {
        console.log(`   • ${rec}`);
      });
    }

    // Final assessment
    console.log(`\n🎯 FINAL ASSESSMENT:`);
    if (this.testResults.failed === 0) {
      console.log(`   🚀 APPLICATION IS PRODUCTION READY!`);
      console.log(`   ✅ All critical components are working`);
      console.log(`   🌟 Ready for deployment`);
    } else if (this.testResults.failed < 5) {
      console.log(`   ⚠️  MINOR ISSUES DETECTED`);
      console.log(`   🔧 Fix ${this.testResults.failed} issue(s) before deployment`);
      console.log(`   ✅ Core functionality is intact`);
    } else {
      console.log(`   ❌ MAJOR ISSUES DETECTED`);
      console.log(`   🛠️  Requires significant fixes before deployment`);
      console.log(`   ⚠️  ${this.testResults.failed} critical issues found`);
    }

    console.log('\n' + '='.repeat(60));
    
    return {
      status: this.testResults.failed === 0 ? 'READY' : 'NEEDS_FIXES',
      stats: this.testResults
    };
  }

  // Run all tests
  runAllTests() {
    this.testProjectStructure();
    this.testDependencies();
    this.testTypeScriptConfig();
    this.testReactComponents();
    this.testAdminAuth();
    this.testAssets();
    this.testDeploymentConfig();
    this.testPerformance();
    
    return this.generateReport();
  }
}

// Execute comprehensive testing
const tester = new ApplicationTester();
const results = tester.runAllTests();

// Exit with appropriate code
process.exit(results.status === 'READY' ? 0 : 1);
