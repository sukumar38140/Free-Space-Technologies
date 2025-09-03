
-- TechCorp Solutions Database Schema
-- This file contains the database structure for the company website

-- Create database
CREATE DATABASE IF NOT EXISTS techcorp_solutions;
USE techcorp_solutions;

-- Job posts table
CREATE TABLE job_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    type ENUM('Full-time', 'Part-time', 'Contract', 'Internship') NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Contact form submissions table
CREATE TABLE contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('new', 'in_progress', 'resolved') DEFAULT 'new'
);

-- Newsletter subscribers table
CREATE TABLE newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Admin users table
CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor') DEFAULT 'editor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Services table
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100),
    price_starting VARCHAR(100),
    features JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Blog posts table (for future expansion)
CREATE TABLE blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content LONGTEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(500),
    author_id INT,
    category VARCHAR(100),
    tags JSON,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_published BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (author_id) REFERENCES admin_users(id)
);

-- Portfolio/Projects table (for future expansion)
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    client_name VARCHAR(255),
    project_url VARCHAR(500),
    image_url VARCHAR(500),
    technologies JSON,
    project_type VARCHAR(100),
    completion_date DATE,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Insert sample data

-- Sample job posts
INSERT INTO job_posts (title, department, location, type, description, requirements) VALUES
('Senior Full Stack Developer', 'Engineering', 'Remote', 'Full-time', 
 'We are looking for an experienced Full Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies.',
 'Bachelor\'s degree in Computer Science or related field. 5+ years of experience with React, Node.js, and database technologies. Strong problem-solving skills and ability to work in a fast-paced environment.'),

('UX/UI Designer', 'Design', 'New York, NY', 'Full-time',
 'Join our design team to create beautiful and intuitive user experiences. You will work closely with developers and product managers to bring designs to life.',
 'Bachelor\'s degree in Design or related field. 3+ years of experience in UX/UI design. Proficiency in Figma, Adobe Creative Suite. Strong portfolio demonstrating design thinking and user-centered design principles.'),

('DevOps Engineer', 'Infrastructure', 'San Francisco, CA', 'Full-time',
 'We need a DevOps Engineer to help us scale our infrastructure and improve our deployment processes. You will work with cloud technologies and automation tools.',
 'Bachelor\'s degree in Computer Science or related field. 4+ years of experience with AWS/Azure, Docker, Kubernetes. Experience with CI/CD pipelines and infrastructure as code.');

-- Sample services
INSERT INTO services (title, description, icon, price_starting, features, is_featured, display_order) VALUES
('Web Development', 'Custom web applications built with modern frameworks like React, Angular, and Vue.js.', 'fas fa-code', 'Starting from $2,500', 
 JSON_ARRAY('Responsive Design', 'SEO Optimized', 'Performance Focused', 'Security First'), TRUE, 1),

('Mobile App Development', 'Native and cross-platform mobile applications for iOS and Android platforms.', 'fas fa-mobile-alt', 'Starting from $5,000',
 JSON_ARRAY('Native Performance', 'Cross-Platform', 'App Store Optimization', 'Push Notifications'), TRUE, 2),

('Cloud Solutions', 'Scalable cloud infrastructure, migration services, and cloud-native applications.', 'fas fa-cloud', 'Starting from $1,500/month',
 JSON_ARRAY('AWS/Azure/GCP', 'Auto Scaling', 'Cost Optimization', '24/7 Monitoring'), TRUE, 3),

('Digital Marketing', 'Comprehensive digital marketing strategies to boost your online presence.', 'fas fa-chart-line', 'Starting from $1,200/month',
 JSON_ARRAY('SEO/SEM', 'Social Media', 'Content Marketing', 'Analytics'), FALSE, 4),

('E-commerce Solutions', 'Complete e-commerce platforms with payment integration and inventory management.', 'fas fa-shopping-cart', 'Starting from $3,500',
 JSON_ARRAY('Payment Gateway', 'Inventory Management', 'Order Tracking', 'Multi-vendor Support'), FALSE, 5),

('IT Consulting', 'Strategic IT consulting to align technology with your business objectives.', 'fas fa-users', 'Starting from $150/hour',
 JSON_ARRAY('Technology Assessment', 'Digital Strategy', 'Process Optimization', 'Training'), FALSE, 6);

-- Create default admin user (password should be hashed in production)
INSERT INTO admin_users (username, email, password_hash, role) VALUES
('admin', 'admin@techcorp.com', '$2b$10$example_hashed_password', 'admin');

-- Create indexes for better performance
CREATE INDEX idx_job_posts_active ON job_posts(is_active, created_at);
CREATE INDEX idx_job_posts_type ON job_posts(type);
CREATE INDEX idx_contact_status ON contact_submissions(status, created_at);
CREATE INDEX idx_services_featured ON services(is_featured, display_order);
CREATE INDEX idx_blog_published ON blog_posts(is_published, published_at);
CREATE INDEX idx_projects_featured ON projects(is_featured, display_order);

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON techcorp_solutions.* TO 'webapp_user'@'localhost' IDENTIFIED BY 'secure_password';
-- FLUSH PRIVILEGES;

-- Example queries for common operations:

-- Get all active job posts
-- SELECT * FROM job_posts WHERE is_active = TRUE ORDER BY created_at DESC;

-- Get featured services
-- SELECT * FROM services WHERE is_featured = TRUE AND is_active = TRUE ORDER BY display_order;

-- Get recent contact submissions
-- SELECT * FROM contact_submissions WHERE status = 'new' ORDER BY created_at DESC;

-- Search job posts by keyword
-- SELECT * FROM job_posts 
-- WHERE is_active = TRUE 
-- AND (title LIKE '%keyword%' OR description LIKE '%keyword%' OR requirements LIKE '%keyword%')
-- ORDER BY created_at DESC;
