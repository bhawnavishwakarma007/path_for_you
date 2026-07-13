-- ======================================================
-- Create Single Database: path_for_you
-- ======================================================
DROP DATABASE IF EXISTS path_for_you;
CREATE DATABASE path_for_you;
USE path_for_you;


-- ======================================================
-- Section 1: Admin Table (mad_admin)
-- ======================================================

-- Table: mad_admin
DROP TABLE IF EXISTS mad_admin;
CREATE TABLE mad_admin (
    mad_admin_id INT AUTO_INCREMENT PRIMARY KEY,
    mad_email VARCHAR(255) NOT NULL UNIQUE,
    mad_password_hash VARCHAR(255) NOT NULL,
    mad_name VARCHAR(100),
    mad_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mad_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample admin into mad_admin
INSERT INTO mad_admin (mad_email, mad_password_hash, mad_name)
VALUES ('admin1@example.com', 'admin1', 'Admin One');



-- ======================================================
-- Section 2: Training Management System Tables
-- ======================================================

-- Table: tp_register (User details)
-- Create the Users Table 
CREATE TABLE tp_users (
  tp_uid INT NOT NULL AUTO_INCREMENT,
  tp_uname VARCHAR(100) NOT NULL,
  tp_uemail VARCHAR(150) NOT NULL,
  tp_upassword VARCHAR(255) NOT NULL,
  tp_ucontact VARCHAR(15), -- New column for contact (adjust length as needed)
  tp_uuser_type ENUM('Technical', 'Non-Technical') NOT NULL,
  tp_ucreated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  tp_uupdated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (tp_uid),
  UNIQUE KEY tp_uemail (tp_uemail)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert Sample Users
INSERT INTO tp_users (tp_uname, tp_uemail, tp_upassword, tp_ucontact, tp_uuser_type) 
VALUES 
('John Doe', 'john.doe@example.com', 'hashed_password_1', '1234567890', 'Technical'),
('Jane Smith', 'jane.smith@example.com', 'hashed_password_2', '9876543210', 'Non-Technical'),
('Alice Johnson', 'alice.johnson@example.com', 'hashed_password_3', '5555555555', 'Technical');

select * from tp_users;
drop table tp_users;

CREATE TABLE job_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL, 
    dob DATE NULL,
    gender ENUM('Male', 'Female', 'Other') NULL,
    qualification VARCHAR(50) NOT NULL,
    specialization VARCHAR(100) NULL,
    passing_year YEAR NULL,
    university VARCHAR(100) NULL,
    work_experience INT DEFAULT 0,
    skills TEXT NULL,
    resume_path VARCHAR(255) NULL,
    aadhar_no CHAR(12) UNIQUE NOT NULL,
    photo_path VARCHAR(255) NULL,
    state VARCHAR(100) NULL,
    district VARCHAR(100) NULL,
    city VARCHAR(100) NULL,
    application_status ENUM('Pending', 'Reviewed', 'Accepted', 'Rejected') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

SELECT * FROM job_applications;
drop table job_applications;

-- Create the Jobs Table
CREATE TABLE Jobs (
    job_id INT PRIMARY KEY AUTO_INCREMENT,
    jobtitle VARCHAR(100) NOT NULL,
    description TEXT,
    jobType ENUM('Technical', 'Non-Technical') NOT NULL,
	job_company VARCHAR(100) NOT NULL,
    jobLocation VARCHAR(100),
    jobSalary DECIMAL(10, 2),
    experience VARCHAR(100),
    responsibility TEXT,
    requirements TEXT,
    job_post VARCHAR(100),
    job_work_profile VARCHAR(100),
    qualification VARCHAR(200),
    salary_LPA DECIMAL(10, 2),
    working_home ENUM('Yes', 'No') DEFAULT 'No',
    ta ENUM('Yes', 'No') DEFAULT 'No',
    da ENUM('Yes', 'No') DEFAULT 'No',
    hra ENUM('Yes', 'No') DEFAULT 'No',
    pf ENUM('Yes', 'No') DEFAULT 'No',
    esic ENUM('Yes', 'No') DEFAULT 'No',
    insurance ENUM('Yes', 'No') DEFAULT 'No',
	hostel ENUM('Yes', 'No') DEFAULT 'No',
	canteen ENUM('Yes', 'No') DEFAULT 'No',
    gratuity ENUM('Yes', 'No') DEFAULT 'No',
    accommodation ENUM('Yes', 'No') DEFAULT 'No',
    other_facility TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	applyStartDate DATE NOT NULL, -- Apply start date
    deadline DATE NOT NULL -- Last date to apply
);
drop table Jobs;


INSERT INTO Jobs (
    jobtitle, description, jobType, job_company, jobLocation, jobSalary, experience, responsibility, 
    requirements, job_post, job_work_profile, qualification, salary_LPA, working_home, applyStartDate, deadline
) VALUES
    ('Front-End Developer','Develop and maintain user-friendly web applications Develop and maintain user-friendly web  Develop and maintain user-friendly web applicationsapplications. Work closely with designers and back-end developers to ensure seamless integration. 
    Optimize applications for maximum speed and scalability. Stay updated with the latest front-end development trends and technologies.',  'Technical', 'Web Solutions Inc.', 'Pune', 65000.00, '1-3 years', 'Create responsive UI, optimize performance, and integrate APIs.', 'Expertise in HTML, CSS, JavaScript, React.js.', 'Software Engineer', 'Web Development', 'Bachelor\'s degree in Computer Science or relevant field', 7.20, 'Yes', '2025-02-18', '2025-04-10'),

    ('Marketing Executive', 'Plan and execute marketing strategies to drive sales and brand awareness. Conduct market research to understand customer needs 
    and trends. Work with digital platforms to manage social media and advertising campaigns.',  'Non-Technical', 'Global Marketing Ltd.', 'Hyderabad', 50000.00, '0-2 years', 'Conduct market research, analyze trends, and run campaigns.', 'Knowledge of digital marketing tools, strong communication skills.', 'Marketing Associate', 'Marketing & Sales', 'Bachelor\'s degree in Marketing or Business Administration', 6.00, 'No', '2025-02-20', '2025-03-27'),

    ('Cyber Security Analyst', 'Monitor and analyze security incidents to detect potential threats. Implement cybersecurity best practices to protect the organization’s digital assets. 
    Conduct regular security audits and risk assessments.', 'Technical', 'CyberSecure Pvt Ltd', 'Noida', 80000.00, '2-5 years', 'Analyze security vulnerabilities, implement firewalls, conduct audits.', 'Knowledge of network security, ethical hacking, and compliance.', 'Security Specialist', 'Cyber Security', 'B.Tech/M.Tech in Cyber Security or Information Security', 10.50, 'No', '2025-02-22', '2025-04-05'),

    ('Project Manager', 'Lead and oversee software development projects from initiation to completion. Ensure that projects meet business requirements and deadlines. 
    Manage resources, risks, and budgets effectively.',  'Technical', 'Innovate Tech', 'Chennai', 90000.00, '5-8 years', 'Coordinate teams, manage timelines, and ensure project delivery.', 'Experience with Agile, Scrum, and project management tools.', 'Senior Project Manager', 'Software Management', 'MBA or relevant management degree', 12.00, 'Yes', '2025-02-25', '2025-04-15'),

    ('Business Analyst', 'Analyze business trends and create data-driven insights to improve operational efficiency. Collaborate with stakeholders to define business goals 
    and develop solutions to achieve them.', 'Non-Technical', 'Biz Solutions', 'Kolkata', 70000.00, '3-6 years', 'Work with stakeholders, define business requirements, and optimize workflows.', 'Knowledge of data analysis, market research, and CRM tools.', 'Business Consultant', 'Business Strategy', 'MBA or Bachelor\'s in Business Analytics', 9.50, 'No', '2025-03-01', '2025-04-20'),

    ('Network Engineer', 'Maintain, troubleshoot, and optimize enterprise network infrastructure. Ensure seamless connectivity and security across the organization’s IT infrastructure.',  'Technical', 'NetSecure Pvt Ltd', 'Gurgaon', 72000.00, '2-4 years', 'Configure routers, troubleshoot connectivity issues, ensure network security.', 'Cisco CCNA certification, experience in LAN/WAN.', 'Network Administrator', 'Networking', 'Bachelor\'s in IT or Networking', 8.20, 'No', '2025-03-05', '2025-04-18');
-- Table: Courses (A simple courses table)
DROP TABLE IF EXISTS Courses;
CREATE TABLE Courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    course_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Training (A simple trainings table)
DROP TABLE IF EXISTS Training;
CREATE TABLE Training (
    training_id INT AUTO_INCREMENT PRIMARY KEY,
    training_name VARCHAR(100) NOT NULL,
    training_description TEXT,
    training_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ======================================================
-- Section 3: Research Publication Hub Tables
-- ======================================================

-- Table: rp_publication_users (Core user table for publication requests)
create table rp_registration (
    rp_uid int auto_increment primary key, -- unique id for each user
    rp_fullname varchar(100) not null, -- user's full name
    rp_email varchar(100) unique not null, -- user's email (unique)
    rp_contact varchar(15) not null, -- user's contact number
    rp_password varchar(255) not null, -- user's password (hashed)
    rp_confirm_password varchar (255) not null,-- user's confirm password (hashed)
    rp_gender enum('male', 'female', 'other') null, -- gender
    rp_category_type enum('technical', 'non-technical') not null,
    rp_qualification varchar(50) null, -- qualification
    rp_branch varchar(50) null, -- branch
    rp_specialization varchar(100) null, -- specialization
    rp_passingyear year null, -- year of passing
    rp_university varchar(100) null, -- university
    rp_lastUniversity varchar(100) null,
    rp_researcharea text null, -- area of research or publication focus
    rp_requirementtype enum('thesis', 'synopsis', 'paper publication', 'presentation') not null, -- type of requirement
    rp_synopsis text null, -- synopsis of research
    rp_researchpapers text null, -- list of research papers published
    rp_researchpresentation text null, -- research presentations given
    rp_profilepic varchar(255) -- path/url for profile picture
    
);
drop table rp_registration;

create table rp_publication_users (
    user_id int auto_increment primary key, -- unique id for each user
    fullname varchar(255) not null, -- user's full name
    email varchar(255) unique not null, -- user's email (unique)
    contact varchar(15) not null, -- user's contact number
    passwordhash varchar(255) not null, -- user's password (hashed)
    gender enum('male', 'female', 'other') not null, -- gender
    qualification varchar(255), -- qualification (e.g., b.tech, m.tech)
    branch varchar(255), -- branch name 
    specialization varchar(255), -- user's specialization field
    passingyear int, -- year of passing
    university varchar(255), -- university name
    state varchar(100), -- user's state
    district varchar(100), -- user's district
    city varchar(100), -- user's city
    category_type enum('technical', 'non-technical'),
    registrationdate datetime default current_timestamp, -- user registration date
    status enum('active', 'inactive', 'deactivated') default 'active', -- user status
    lastlogin datetime, -- last login time
    rolename varchar(50) not null, -- role name (e.g., admin, sub-admin, user)
    title varchar(255) NOT null, -- title name according to the requirement 
    title_need enum('yes', 'no'),
    requirementtype enum('thesis', 'synopsis', 'paper publication', 'presentation') not null, -- type of requirement
    filelabel enum('file 1', 'file 2', 'file 3', 'file 4') not null, -- specific file label
    filetype enum('pdf', 'docx', 'ppt', 'other') not null, -- type of file
    filepath varchar(500) not null, -- path to the uploaded file in storage
    uploaddate datetime default current_timestamp, -- date and time of upload
    comments text, -- admin/sub-admin comments
    -- Patient Work Log Fields
    worklog_date DATE NULL, -- work log date
    work_description TEXT NULL, -- description of the work done
    work_start_time TIME NULL, -- start time of the work
    work_end_time TIME NULL, -- end time of the work
    work_status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending', -- status of the work
	foreign key (user_id) references rp_registration(rp_uid) -- link userid to registration table
);

drop table rp_publication_users;
-- SELECT * FROM files WHERE userid = ?;

CREATE TABLE u_profile (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, 
    confirm_password varchar (255) not null, 
    phone VARCHAR(15) UNIQUE,
    role ENUM('Student', 'Professor', 'Researcher', 'Admin') NOT NULL,
    university VARCHAR(150),
    department VARCHAR(100),
    designation VARCHAR(100), -- For professors/researchers
    profile_picture VARCHAR(255) DEFAULT NULL,
    bio TEXT, -- Short description about user
    research_interests TEXT, -- Areas of interest
    thesis_title VARCHAR(255), -- If applicable
    publications INT DEFAULT 0, -- Number of published papers
    linkedin VARCHAR(255),
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


create table rp_researchrequests (
    request_id int auto_increment primary key, -- unique id for each request
    user_id int not null, -- request made by
    title varchar(255) not null, -- request title
    description text, -- request description
    priority enum('high', 'medium', 'low') default 'medium', -- request priority
    status enum('pending', 'in progress', 'completed', 'overdue') default 'pending', -- request status
    assigned_to int, -- assigned sub-admin id
    deadline datetime, -- request completion deadline
    created_at datetime default current_timestamp, -- request creation time
    updated_at datetime default current_timestamp on update current_timestamp, -- last update time
    foreign key (user_id) references rp_publication_users(user_id), -- link userid to users table
    foreign key (assigned_to) references rp_publication_users(user_id) -- link assigned sub-admin to users table
);


-- Papers Table: Handles user requests for research papers
CREATE TABLE rp_papers (
    paper_id VARCHAR(50) PRIMARY KEY, -- Unique identifier for each paper request
    paper_title VARCHAR(200) NOT NULL, -- Title of the requested paper
    description TEXT, -- Detailed description or abstract of the paper
    category VARCHAR(100), -- Classification of the paper (e.g., research, review, 'technical', 'educational', 'other')
    file_url TEXT, -- URL or path of the uploaded paper file (if any)
    requested_by int , -- ID of the user who requested the paper
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Jab request ki gayi thi, uska timestamp
    status VARCHAR(20) DEFAULT 'pending', -- Request ka status: pending, approved, rejected
    admin_comments TEXT, -- Admin ya sub-admin ka feedback ya comments
    fulfilled_by int , -- Wo admin ya sub-admin jinhone request fulfill kiya
    fulfilled_at TIMESTAMP, -- Jab request fulfill ki gayi thi, uska timestamp
    FOREIGN KEY (requested_by) REFERENCES  rp_publication_users(user_id), -- User ke ID se link karte hain jo request kar raha hai
    FOREIGN KEY (fulfilled_by) REFERENCES  rp_publication_users(user_id), -- Sub-admin ya admin ke ID se link karte hain jo request fulfill kar raha hai
	CHECK (status IN ('pending', 'approved', 'rejected'))
);

drop table rp_papers;
drop table rp_presentations;
drop table rp_synopses;
drop table  rp_theses;

-- Presentations Table: User ki presentation request ka data store karega
CREATE TABLE rp_presentations (
    ppt_id VARCHAR(50) PRIMARY KEY, -- Har presentation request ka unique identifier
    ppt_title VARCHAR(200) NOT NULL, -- Requested presentation ka title
    description TEXT, -- Presentation ki detailed description ya purpose
    slides_count INT NOT NULL, -- Presentation mein slides ki total count
    category ENUM('technical', 'educational', 'research', 'other') NOT NULL, -- Presentation ki classification (jaise technical, educational, etc.)
    request_file_url TEXT, -- Agar user ne koi file upload ki hai to uska URL/path
    requested_by int , -- Wo user jinhone presentation ki request ki hai
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Jab request ki gayi thi, uska timestamp
    status VARCHAR(20) DEFAULT 'pending', -- Request ka status: pending, approved, rejected
    admin_comments TEXT, -- Admin ya sub-admin ka feedback ya comments
    fulfilled_by int, -- Wo admin ya sub-admin jinhone request fulfill kiya
    fulfilled_at TIMESTAMP, -- Jab request fulfill ki gayi thi, uska timestamp
    FOREIGN KEY (requested_by) REFERENCES  rp_publication_users(user_id), -- User ke ID se link karte hain jo request kar raha hai
    FOREIGN KEY (fulfilled_by) REFERENCES  rp_publication_users(user_id), -- Sub-admin ya admin ke ID se link karte hain jo request fulfill kar raha hai
	CHECK (status IN ('pending', 'approved', 'rejected'))
);


-- Synopses Table: User ki requests ko handle karega jo synopsis ke liye hai
CREATE TABLE rp_synopses (
    synopsis_id VARCHAR(50) PRIMARY KEY, -- Har synopsis ka unique identifier
    synopsis_title VARCHAR(200) NOT NULL, -- Synopsis ka title
    description TEXT, -- Synopsis ka detailed description ya summary
    category VARCHAR(100), -- Classification (jaise engineering, arts, etc.)
    file_url TEXT, -- Upload ki gayi synopsis file ka URL ya path (agar koi ho)
    requested_by int , -- Us user ka ID jisne synopsis ki request ki
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Jab request ki gayi thi, uska timestamp
    status VARCHAR(20) DEFAULT 'pending', -- Request ka status: pending, approved, rejected
    admin_comments TEXT, -- Admin ya sub-admin ka feedback ya comments
    fulfilled_by int , -- Wo admin ya sub-admin jinhone request fulfill kiya
    fulfilled_at TIMESTAMP, -- Jab request fulfill ki gayi thi, uska timestamp
    FOREIGN KEY (requested_by) REFERENCES  rp_publication_users(user_id), -- User ke ID se link karte hain jo request kar raha hai
    FOREIGN KEY (fulfilled_by) REFERENCES  rp_publication_users(user_id), -- Sub-admin ya admin ke ID se link karte hain jo request fulfill kar raha hai
	CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Theses Table: User ki thesis ki request ko handle karega
CREATE TABLE rp_theses (
    thesis_id VARCHAR(50) PRIMARY KEY, -- Har thesis ka unique identifier
    thesis_title VARCHAR(200) NOT NULL, -- Thesis ka title
    description TEXT, -- Detailed description ya abstract of the thesis
    research_area VARCHAR(100), -- Research domain (jaise AI, ML, Data Science)
    file_url TEXT, -- URL ya path of uploaded thesis file (agar koi ho)
    requested_by int , -- Us user ka ID jisne thesis ki request ki
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Jab request ki gayi thi, uska timestamp
    status VARCHAR(20) DEFAULT 'pending', -- Request ka status: pending, approved, rejected
    admin_comments TEXT, -- Admin ya sub-admin ka feedback ya comments
    fulfilled_by int , -- Wo admin ya sub-admin jinhone request fulfill kiya
    fulfilled_at TIMESTAMP, -- Jab request fulfill ki gayi thi, uska timestamp
    FOREIGN KEY (requested_by) REFERENCES  rp_publication_users(user_id), -- User ke ID se link karte hain jo request kar raha hai
    FOREIGN KEY (fulfilled_by) REFERENCES  rp_publication_users(user_id), -- Sub-admin ya admin ke ID se link karte hain jo request fulfill kar raha hai
	CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Insert sample users into rp_registration
INSERT INTO rp_registration (
    rp_fullname, rp_email, rp_contact, rp_password, rp_confirm_password, rp_gender, rp_category_type,
    rp_qualification, rp_branch, rp_specialization, rp_passingyear, rp_university,
    rp_lastUniversity, rp_researcharea, rp_requirementtype, rp_synopsis,
    rp_researchpapers, rp_researchpresentation, rp_profilepic
) VALUES
('John Doe', 'john.doe@example.com', '9876543210', 'hashedpassword1', 'hashedpassword1', 'male', 'technical',
 'B.Tech', 'Computer Science', 'Artificial Intelligence', 2023, 'Eklavya University',
 'ABC High School', 'AI and Machine Learning', 'thesis',
 'Exploring the impact of AI on healthcare', 'Paper 1: AI in Diagnosis, Paper 2: Machine Learning in Surgery',
 'Presentation: AI Applications in Healthcare', '/images/profiles/john_doe.jpg'),
('Jane Smith', 'jane.smith@example.com', '8765432109', 'hashedpassword2', 'hashedpassword2', 'female', 'technical',
 'M.Tech', 'Electronics', 'Embedded Systems', 2022, 'Eklavya University',
 'XYZ College', 'IoT and Smart Devices', 'paper publication',
 NULL, 'Paper 1: IoT in Smart Homes',
 'Presentation: IoT Solutions for Urban Areas', '/images/profiles/jane_smith.jpg'),
('Rahul Sharma', 'rahul.sharma@example.com', '7654321098', 'hashedpassword3', 'hashedpassword3', 'male', 'technical',
 'PhD', 'Mechanical Engineering', 'Robotics', 2021, 'Eklavya University',
 'GHI Institute', 'Robotic Process Automation', 'synopsis',
 'Developing robots for industrial automation', 'Paper 1: Robotics in Manufacturing, Paper 2: Automation Techniques',
 'Presentation: Robotics in Industry 4.0', '/images/profiles/rahul_sharma.jpg'),
('Sneha Verma', 'sneha.verma@example.com', '6543210987', 'hashedpassword4', 'hashedpassword4', 'female', 'non-technical',
 'MBA', 'Marketing', 'Digital Marketing', 2024, 'Eklavya University',
 'JKL University', 'Digital Marketing Strategies', 'presentation',
 NULL, NULL,
 'Presentation: Marketing in the Digital Age', '/images/profiles/sneha_verma.jpg'),
('Aman Gupta', 'aman.gupta@example.com', '5432109876', 'hashedpassword5', 'hashedpassword5', 'male', 'technical',
 'B.Tech', 'IT', 'Cloud Computing', 2025, 'Eklavya University',
 'DEF School', 'Cloud Solutions for SMEs', 'thesis',
 'Optimizing cloud architecture for small businesses', 'Paper 1: Cloud Optimization, Paper 2: Serverless Computing',
 'Presentation: Cloud Security Challenges', '/images/profiles/aman_gupta.jpg');

-- Insert sample data into rp_publication_users
-- (Assuming rp_registration generated user IDs 1 to 5)
INSERT INTO rp_publication_users (
    user_id, fullname, email, contact, passwordhash, gender, qualification, branch, specialization, passingyear,
    university, state, district, city, category_type, rolename, title, title_need, requirementtype,
    filelabel, filetype, filepath, comments
) VALUES
(1, 'John Doe', 'john.doe@example.com', '9876543210', 'hashedpassword1', 'male', 'B.Tech', 'Computer Science', 'Artificial Intelligence', 2023,
 'Eklavya University', 'State1', 'District1', 'City1', 'technical', 'User', 'Mr.', 'yes', 'thesis',
 'file 1', 'pdf', '/files/john_doe.pdf', 'No comments'),
(2, 'Jane Smith', 'jane.smith@example.com', '8765432109', 'hashedpassword2', 'female', 'M.Tech', 'Electronics', 'Embedded Systems', 2022,
 'Eklavya University', 'State2', 'District2', 'City2', 'technical', 'User', 'Ms.', 'yes', 'paper publication',
 'file 2', 'docx', '/files/jane_smith.docx', 'No comments'),
(3, 'Rahul Sharma', 'rahul.sharma@example.com', '7654321098', 'hashedpassword3', 'male', 'PhD', 'Mechanical Engineering', 'Robotics', 2021,
 'Eklavya University', 'State3', 'District3', 'City3', 'technical', 'User', 'Mr.', 'yes', 'synopsis',
 'file 3', 'ppt', '/files/rahul_sharma.ppt', 'No comments'),
(4, 'Sneha Verma', 'sneha.verma@example.com', '6543210987', 'hashedpassword4', 'female', 'MBA', 'Marketing', 'Digital Marketing', 2024,
 'Eklavya University', 'State4', 'District4', 'City4', 'non-technical', 'User', 'Ms.', 'yes', 'presentation',
 'file 4', 'other', '/files/sneha_verma.txt', 'No comments'),
(5, 'Aman Gupta', 'aman.gupta@example.com', '5432109876', 'hashedpassword5', 'male', 'B.Tech', 'IT', 'Cloud Computing', 2025,
 'Eklavya University', 'State5', 'District5', 'City5', 'technical', 'User', 'Mr.', 'yes', 'thesis',
 'file 1', 'pdf', '/files/aman_gupta.pdf', 'No comments');

-- Insert sample data into rp_papers
INSERT INTO rp_papers (paper_id, paper_title, description, category, file_url, requested_by, requested_at, status, admin_comments, fulfilled_by, fulfilled_at)
VALUES
('P001', 'AI in Healthcare', 'Exploring AI applications in healthcare.', 'research', '/files/paper1.pdf', 1, '2025-01-25 12:30:00', 'pending', 'Needs review', NULL, NULL),
('P002', 'Machine Learning Basics', 'Introduction to machine learning techniques and algorithms.', 'educational', '/files/paper2.pdf', 2, '2025-01-25 13:00:00', 'approved', 'Approved', 1, '2025-01-26 10:00:00');

-- Insert sample data into rp_presentations
INSERT INTO rp_presentations (ppt_id, ppt_title, description, slides_count, category, request_file_url, requested_by, requested_at, status, admin_comments, fulfilled_by, fulfilled_at)
VALUES
('PPT001', 'AI in Healthcare Presentation', 'Presentation on AI applications in healthcare.', 20, 'research', '/files/ppt1.pptx', 3, '2025-01-25 14:00:00', 'pending', 'Pending review', NULL, NULL),
('PPT002', 'ML Algorithms', 'Presentation on machine learning algorithms with examples.', 25, 'educational', '/files/ppt2.pptx', 4, '2025-01-25 15:00:00', 'approved', 'Approved by admin', 2, '2025-01-26 12:00:00');

-- Insert sample data into rp_synopses
INSERT INTO rp_synopses (synopsis_id, synopsis_title, description, category, file_url, requested_by, requested_at, status, admin_comments, fulfilled_by, fulfilled_at)
VALUES
('SYN001', 'Research on AI', 'Synopsis on AI research advancements and challenges.', 'engineering', '/files/synopsis1.pdf', 5, '2025-01-25 16:00:00', 'pending', 'Needs review', NULL, NULL),
('SYN002', 'ML Model Development', 'Synopsis for developing machine learning models in real-world applications.', 'computer science', '/files/synopsis2.pdf', 4, '2025-01-25 17:00:00', 'approved', 'Approved by admin', 3, '2025-01-26 13:00:00');

-- Insert sample data into rp_theses
INSERT INTO rp_theses (thesis_id, thesis_title, description, research_area, file_url, requested_by, requested_at, status, admin_comments, fulfilled_by, fulfilled_at)
VALUES
('T001', 'Thesis on AI and Healthcare', 'Thesis on the impact of AI in healthcare systems.', 'AI and Healthcare', '/files/thesis1.pdf', 2, '2025-01-25 18:00:00', 'pending', 'Needs review', NULL, NULL),
('T002', 'Data Science in Healthcare', 'Exploring data science techniques used in healthcare.', 'Data Science', '/files/thesis2.pdf', 3, '2025-01-25 19:00:00', 'approved', 'Approved by admin', 4, '2025-01-26 14:00:00');

-- Insert sample data into guidance_options
CREATE TABLE guidance_options (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    option_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

INSERT INTO guidance_options (option_name, description)
VALUES
('Option A', 'Description for option A'),
('Option B', 'Description for option B');

-- Insert sample data into rp_notifications
CREATE TABLE rp_notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY, -- unique id for notifications
    recipient_id INT NOT NULL, -- notification recipient
    message TEXT NOT NULL, -- notification message
    channel ENUM('email', 'sms', 'push') NOT NULL, -- notification channel
    status ENUM('unread', 'read') DEFAULT 'unread', -- read/unread status
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- notification sent time
    FOREIGN KEY (recipient_id) REFERENCES rp_publication_users(user_id)
);

INSERT INTO rp_notifications (recipient_id, message, channel, status)
VALUES
(1, 'Your paper submission is pending review.', 'email', 'unread'),
(2, 'Your presentation has been approved.', 'sms', 'unread');

-- Insert sample data into rp_feedback
CREATE TABLE rp_feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY, -- unique id for each feedback
    user_id INT NOT NULL, -- feedback made by
    score INT CHECK (score BETWEEN 1 AND 5), -- feedback score (1 to 5)
    comments TEXT, -- feedback comments
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- feedback date
    FOREIGN KEY (user_id) REFERENCES rp_publication_users(user_id)
);

INSERT INTO rp_feedback (user_id, score, comments)
VALUES
(1, 5, 'Excellent service'),
(2, 4, 'Good, but can improve.');

-- Insert sample data into rp_subadminperformance
CREATE TABLE rp_subadminperformance (
    subadmin_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, -- sub-admin id
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, 
    confirm_password VARCHAR(255) NOT NULL,
    tasks_handled INT DEFAULT 0, -- number of tasks handled
    average_resolution_time FLOAT, -- average resolution time
    feedback_score FLOAT, -- feedback score
    report_date DATE NOT NULL DEFAULT CURRENT_DATE,  -- report date
    FOREIGN KEY (subadmin_id) REFERENCES rp_publication_users(user_id)
);

INSERT INTO rp_subadminperformance (name, email, username, password, confirm_password, tasks_handled, average_resolution_time, feedback_score, report_date)
VALUES
('Subadmin One', 'subadmin1@example.com', 'subadmin1', 'pass123', 'pass123', 10, 2.5, 4.8, CURRENT_DATE),
('Subadmin Two', 'subadmin2@example.com', 'subadmin2', 'pass456', 'pass456', 8, 3.0, 4.5, CURRENT_DATE);

-- Insert sample data into rp_settings
CREATE TABLE rp_settings (
    setting_id INT AUTO_INCREMENT PRIMARY KEY, -- unique id
    name VARCHAR(255) NOT NULL UNIQUE, -- setting name
    value TEXT NOT NULL -- setting value
);

INSERT INTO rp_settings (name, value)
VALUES
('SiteName', 'Research Publication Hub'),
('MaintenanceMode', 'off');
 select * from rp_registration;

create table guidance_options (
    option_id int auto_increment primary key,
    option_name varchar(50) unique not null,
    description text
);

create table rp_notifications (
    notification_id int auto_increment primary key, -- unique id for notifications
    recipient_id int not null, -- notification recipient
    message text not null, -- notification message
    channel enum('email', 'sms', 'push') not null, -- notification channel
    status enum('unread', 'read') default 'unread', -- read/unread status
    sent_at datetime default current_timestamp, -- notification sent time
    foreign key (recipient_id) references rp_publication_users(user_id) -- link recipient to users table
);

create table rp_feedback (
    feedback_id int auto_increment primary key, -- unique id for each feedback
    user_id int not null, -- feedback made by
    score int check (score between 1 and 5), -- feedback score (1 to 5)
    comments text, -- feedback comments
    created_at datetime default current_timestamp, -- feedback date
    foreign key (user_id) references rp_publication_users(user_id) -- link userid to users table
);

create table rp_subadminperformance (
    subadmin_id int auto_increment primary key not null, -- sub-admin id
    name varchar(100) not null,
    email varchar(100) unique not null,
    username varchar(50) unique not null,
    password varchar(255) not null, 
    confirm_password varchar(255) not null,
    tasks_handled int default 0, -- number of tasks handled
    average_resolution_time float, -- average resolution time
    feedback_score float, -- feedback score
     report_date date not null default (current_date),  -- report date
    foreign key (subadmin_id) references rp_publication_users(user_id) -- link subadminid to users table
);

create table rp_settings (
    setting_id int auto_increment primary key, -- unique id
    name varchar(255) not null unique, -- setting name
    value text not null -- setting value
);

-- Table: Subadmin
DROP TABLE IF EXISTS Subadmin;
CREATE TABLE Subadmin (
    subadmin_id INT AUTO_INCREMENT PRIMARY KEY,
    subadmin_name VARCHAR(255) NOT NULL,
    subadmin_modname VARCHAR(255) NOT NULL,
    subadmin_email VARCHAR(255) UNIQUE NOT NULL,
    subadmin_password VARCHAR(255) NOT NULL,
    subadmin_contact VARCHAR(15),
    role ENUM('subadmin') DEFAULT 'subadmin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);