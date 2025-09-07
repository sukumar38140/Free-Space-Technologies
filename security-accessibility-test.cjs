// Security and Accessibility Testing Suite
// Run with: node security-accessibility-test.cjs

const fs = require('fs');
const path = require('path');

console.log('🔒 SECURITY & ACCESSIBILITY TESTING SUITE\n');

class SecurityAccessibilityTester {
  constructor() {
    this.results = {
      security: { passed: 0, failed: 0, warnings: 0 },
      accessibility: { passed: 0, failed: 0, warnings: 0 },
      issues: [],
      recommendations: []
    };
  }

  log(message, type = 'info') {
    const icons = { pass: '✅', fail: '❌', warn: '⚠️', info: 'ℹ️' };
    console.log(`${icons[type]} ${message}`);
  }

  // Security Tests
  testSecurity() {
    console.log('🔒 SECURITY ANALYSIS:\n');

    // Test 1: Check for hardcoded secrets
    this.testHardcodedSecrets();
    
    // Test 2: Admin authentication security
    this.testAdminSecurity();
    
    // Test 3: File permissions and exposure
    this.testFileExposure();
    
    // Test 4: Dependency vulnerabilities
    this.testDependencySecurity();
  }

  testHardcodedSecrets() {
    console.log('🔍 Checking for hardcoded secrets...');
    
    const sensitivePatterns = [
      /api[_-]?key/i,
      /secret[_-]?key/i,
      /password.*=.*["'][^"']+["']/i,
      /token.*=.*["'][^"']+["']/i
    ];

    const filesToCheck = [
      'src/contexts/AdminAuthContext.tsx',
      'src/components/AdminLogin.tsx',
      '.env',
      '.env.local'
    ];

    let secretsFound = false;

    filesToCheck.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        
        sensitivePatterns.forEach(pattern => {
          if (pattern.test(content)) {
            this.log(`Potential secret found in ${file}`, 'warn');
            this.results.security.warnings++;
            secretsFound = true;
          }
        });
      }
    });

    if (!secretsFound) {
      this.log('No obvious hardcoded secrets detected', 'pass');
      this.results.security.passed++;
    }

    // Check for .env files in production
    if (!fs.existsSync('.env') && !fs.existsSync('.env.local')) {
      this.log('No .env files found (good for security)', 'pass');
      this.results.security.passed++;
    } else {
      this.log('Environment files present - ensure they\'re in .gitignore', 'warn');
      this.results.security.warnings++;
    }
  }

  testAdminSecurity() {
    console.log('\n🔐 Admin security analysis...');
    
    const authFile = 'src/contexts/AdminAuthContext.tsx';
    if (fs.existsSync(authFile)) {
      const content = fs.readFileSync(authFile, 'utf8');
      
      // Check for password complexity
      const passwordRegex = /password:\s*['"]([^'"]+)['"]/g;
      let match;
      let weakPasswords = 0;
      
      while ((match = passwordRegex.exec(content)) !== null) {
        const password = match[1];
        if (password.length < 8) {
          weakPasswords++;
        }
      }
      
      if (weakPasswords === 0) {
        this.log('Admin passwords meet minimum length requirements', 'pass');
        this.results.security.passed++;
      } else {
        this.log(`${weakPasswords} admin password(s) may be too short`, 'warn');
        this.results.security.warnings++;
      }

      // Check for session management
      if (content.includes('localStorage')) {
        this.log('Uses localStorage for session management', 'warn');
        this.results.security.warnings++;
        this.results.recommendations.push('Consider more secure session management for production');
      }

      // Check for authentication bypass
      if (content.includes('BYPASS_ADMIN')) {
        this.log('Admin bypass mechanism detected', 'warn');
        this.results.security.warnings++;
        this.results.recommendations.push('Ensure admin bypass is disabled in production');
      }
    }
  }

  testFileExposure() {
    console.log('\n📁 File exposure analysis...');
    
    const sensitiveFiles = [
      '.env',
      '.env.local',
      'node_modules',
      '.git',
      'package-lock.json'
    ];

    // Check .gitignore
    if (fs.existsSync('.gitignore')) {
      const gitignore = fs.readFileSync('.gitignore', 'utf8');
      
      const protectedFiles = ['node_modules', '.env', 'dist'];
      let protectedCount = 0;
      
      protectedFiles.forEach(file => {
        if (gitignore.includes(file)) {
          protectedCount++;
        }
      });
      
      if (protectedCount === protectedFiles.length) {
        this.log('Critical files properly ignored in git', 'pass');
        this.results.security.passed++;
      } else {
        this.log('Some sensitive files may not be properly ignored', 'warn');
        this.results.security.warnings++;
      }
    } else {
      this.log('.gitignore file missing', 'fail');
      this.results.security.failed++;
    }

    // Check for accidental sensitive file inclusion
    const publicFiles = fs.readdirSync('public');
    const suspiciousFiles = publicFiles.filter(file => 
      file.includes('key') || file.includes('secret') || file.includes('.env')
    );
    
    if (suspiciousFiles.length === 0) {
      this.log('No suspicious files in public directory', 'pass');
      this.results.security.passed++;
    } else {
      this.log(`Potentially sensitive files in public: ${suspiciousFiles.join(', ')}`, 'warn');
      this.results.security.warnings++;
    }
  }

  testDependencySecurity() {
    console.log('\n📦 Dependency security analysis...');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };

      // Check for known vulnerable packages (basic check)
      const riskyPackages = ['lodash', 'moment', 'request'];
      let riskyFound = 0;
      
      riskyPackages.forEach(pkg => {
        if (allDeps[pkg]) {
          riskyFound++;
        }
      });

      if (riskyFound === 0) {
        this.log('No obviously risky packages detected', 'pass');
        this.results.security.passed++;
      } else {
        this.log(`${riskyFound} potentially risky package(s) found`, 'warn');
        this.results.security.warnings++;
        this.results.recommendations.push('Run npm audit for detailed security analysis');
      }

      // Check dependency count for supply chain risk
      const depCount = Object.keys(allDeps).length;
      if (depCount < 30) {
        this.log(`Dependency count (${depCount}) is reasonable`, 'pass');
        this.results.security.passed++;
      } else if (depCount < 60) {
        this.log(`Dependency count (${depCount}) is moderate`, 'warn');
        this.results.security.warnings++;
      } else {
        this.log(`Dependency count (${depCount}) is high - supply chain risk`, 'fail');
        this.results.security.failed++;
      }

    } catch (error) {
      this.log('Could not analyze package.json for security', 'fail');
      this.results.security.failed++;
    }
  }

  // Accessibility Tests
  testAccessibility() {
    console.log('\n♿ ACCESSIBILITY ANALYSIS:\n');

    this.testSemanticHTML();
    this.testImageAccessibility();
    this.testFormAccessibility();
    this.testNavigationAccessibility();
  }

  testSemanticHTML() {
    console.log('🏗️ Semantic HTML analysis...');
    
    const htmlFiles = ['index.html'];
    const componentFiles = fs.readdirSync('src/pages').filter(f => f.endsWith('.tsx'));
    
    componentFiles.forEach(file => {
      const content = fs.readFileSync(`src/pages/${file}`, 'utf8');
      
      // Check for semantic elements
      const semanticElements = ['header', 'nav', 'main', 'section', 'article', 'aside', 'footer'];
      let semanticFound = 0;
      
      semanticElements.forEach(element => {
        if (content.includes(`<${element}`) || content.includes(`${element} `)) {
          semanticFound++;
        }
      });

      if (semanticFound > 0) {
        this.log(`${file} uses ${semanticFound} semantic element(s)`, 'pass');
        this.results.accessibility.passed++;
      } else {
        this.log(`${file} lacks semantic HTML elements`, 'warn');
        this.results.accessibility.warnings++;
      }

      // Check for heading hierarchy
      const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      let headingFound = false;
      
      headings.forEach(heading => {
        if (content.includes(`<${heading}`) || content.includes(`${heading} `)) {
          headingFound = true;
        }
      });

      if (headingFound) {
        this.log(`${file} includes heading elements`, 'pass');
        this.results.accessibility.passed++;
      } else {
        this.log(`${file} may lack proper heading structure`, 'warn');
        this.results.accessibility.warnings++;
      }
    });
  }

  testImageAccessibility() {
    console.log('\n🖼️ Image accessibility analysis...');
    
    const componentFiles = fs.readdirSync('src/pages').filter(f => f.endsWith('.tsx'));
    
    componentFiles.forEach(file => {
      const content = fs.readFileSync(`src/pages/${file}`, 'utf8');
      
      // Check for img tags with alt attributes
      const imgMatches = content.match(/<img[^>]*>/g) || [];
      let imagesWithAlt = 0;
      let totalImages = imgMatches.length;
      
      imgMatches.forEach(img => {
        if (img.includes('alt=')) {
          imagesWithAlt++;
        }
      });

      if (totalImages === 0) {
        // No images to check
        return;
      }

      if (imagesWithAlt === totalImages) {
        this.log(`${file} - All ${totalImages} image(s) have alt attributes`, 'pass');
        this.results.accessibility.passed++;
      } else {
        this.log(`${file} - ${totalImages - imagesWithAlt} image(s) missing alt attributes`, 'warn');
        this.results.accessibility.warnings++;
      }
    });
  }

  testFormAccessibility() {
    console.log('\n📝 Form accessibility analysis...');
    
    const formFiles = ['src/components/AdminLogin.tsx', 'src/components/JobApplicationForm.tsx'];
    
    formFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        
        // Check for form labels
        const inputMatches = content.match(/<input[^>]*>/g) || [];
        const labelMatches = content.match(/<label[^>]*>/g) || [];
        
        if (inputMatches.length > 0 && labelMatches.length > 0) {
          this.log(`${file} includes form labels`, 'pass');
          this.results.accessibility.passed++;
        } else if (inputMatches.length > 0) {
          this.log(`${file} has inputs but may lack proper labels`, 'warn');
          this.results.accessibility.warnings++;
        }

        // Check for required field indicators
        if (content.includes('required')) {
          this.log(`${file} indicates required fields`, 'pass');
          this.results.accessibility.passed++;
        }
      }
    });
  }

  testNavigationAccessibility() {
    console.log('\n🧭 Navigation accessibility analysis...');
    
    const navFile = 'src/components/Navbar.tsx';
    if (fs.existsSync(navFile)) {
      const content = fs.readFileSync(navFile, 'utf8');
      
      // Check for navigation landmarks
      if (content.includes('<nav') || content.includes('navigation')) {
        this.log('Navigation landmark present', 'pass');
        this.results.accessibility.passed++;
      } else {
        this.log('Navigation landmark may be missing', 'warn');
        this.results.accessibility.warnings++;
      }

      // Check for keyboard navigation support
      if (content.includes('onKeyDown') || content.includes('tabIndex')) {
        this.log('Keyboard navigation support detected', 'pass');
        this.results.accessibility.passed++;
      } else {
        this.log('Limited keyboard navigation support', 'warn');
        this.results.accessibility.warnings++;
        this.results.recommendations.push('Add keyboard navigation support');
      }
    }
  }

  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 SECURITY & ACCESSIBILITY REPORT');
    console.log('='.repeat(60));

    const securityTotal = this.results.security.passed + this.results.security.failed + this.results.security.warnings;
    const accessibilityTotal = this.results.accessibility.passed + this.results.accessibility.failed + this.results.accessibility.warnings;

    console.log('\n🔒 SECURITY RESULTS:');
    console.log(`   ✅ Passed: ${this.results.security.passed}`);
    console.log(`   ❌ Failed: ${this.results.security.failed}`);
    console.log(`   ⚠️  Warnings: ${this.results.security.warnings}`);
    console.log(`   📊 Security Score: ${((this.results.security.passed / securityTotal) * 100).toFixed(1)}%`);

    console.log('\n♿ ACCESSIBILITY RESULTS:');
    console.log(`   ✅ Passed: ${this.results.accessibility.passed}`);
    console.log(`   ❌ Failed: ${this.results.accessibility.failed}`);
    console.log(`   ⚠️  Warnings: ${this.results.accessibility.warnings}`);
    console.log(`   📊 Accessibility Score: ${((this.results.accessibility.passed / accessibilityTotal) * 100).toFixed(1)}%`);

    if (this.results.recommendations.length > 0) {
      console.log('\n💡 RECOMMENDATIONS:');
      this.results.recommendations.forEach(rec => {
        console.log(`   • ${rec}`);
      });
    }

    console.log('\n🎯 OVERALL ASSESSMENT:');
    const totalFailed = this.results.security.failed + this.results.accessibility.failed;
    
    if (totalFailed === 0) {
      console.log('   🟢 EXCELLENT - No critical security or accessibility issues');
    } else if (totalFailed < 3) {
      console.log('   🟡 GOOD - Minor issues that should be addressed');
    } else {
      console.log('   🔴 NEEDS IMPROVEMENT - Several critical issues found');
    }

    console.log('='.repeat(60));
  }

  runAllTests() {
    this.testSecurity();
    this.testAccessibility();
    this.generateReport();
  }
}

const tester = new SecurityAccessibilityTester();
tester.runAllTests();
