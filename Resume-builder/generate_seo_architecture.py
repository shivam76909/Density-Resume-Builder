import os
import json
import re

BASE_DIR = r"c:\Users\LOQ\OneDrive\Desktop\Resume-builder"

# Define category lists
PRODUCT_PAGES = [
    ("ats-resume-builder.html", "ATS Resume Builder", "ats-resources"),
    ("cv-builder.html", "CV Builder", "ats-resources"),
    ("cover-letter-builder.html", "Cover Letter Builder", "cover-letter-examples"),
    ("resume-score-checker.html", "AI Resume Score Checker", "ats-resources"),
    ("resume-keyword-checker.html", "Resume Keyword Optimizer", "ats-resources"),
    ("resume-summary-generator.html", "AI Resume Summary Generator", "ats-resources"),
    ("resume-objective-generator.html", "AI Resume Objective Generator", "ats-resources"),
    ("resume-headline-generator.html", "AI Resume Headline Generator", "ats-resources"),
    ("resume-examples.html", "Resume Examples Hub", "resume-examples"),
    ("career-guides.html", "Career Guides Hub", "career-guides"),
    ("interview-questions.html", "Interview Questions Hub", "interview-questions"),
    ("salary-guides.html", "Salary Guides Hub", "salary-guides"),
    ("cover-letter-examples.html", "Cover Letter Examples Hub", "cover-letter-examples"),
    ("cookie-policy.html", "Cookie Policy", "Company"),
    ("disclaimer.html", "General Disclaimer", "Company")
]

RESUME_EXAMPLES = [
    # Technology
    ("software-engineer-resume.html", "Software Engineer Resume", "Technology"),
    ("java-developer-resume.html", "Java Developer Resume", "Technology"),
    ("python-developer-resume.html", "Python Developer Resume", "Technology"),
    ("frontend-developer-resume.html", "Frontend Developer Resume", "Technology"),
    ("backend-developer-resume.html", "Backend Developer Resume", "Technology"),
    ("full-stack-developer-resume.html", "Full Stack Developer Resume", "Technology"),
    ("react-developer-resume.html", "React Developer Resume", "Technology"),
    ("node-js-developer-resume.html", "Node.js Developer Resume", "Technology"),
    ("android-developer-resume.html", "Android Developer Resume", "Technology"),
    ("ios-developer-resume.html", "iOS Developer Resume", "Technology"),
    ("devops-engineer-resume.html", "DevOps Engineer Resume", "Technology"),
    ("cloud-engineer-resume.html", "Cloud Engineer Resume", "Technology"),
    ("qa-engineer-resume.html", "QA Engineer Resume", "Technology"),
    ("data-analyst-resume.html", "Data Analyst Resume", "Technology"),
    ("data-scientist-resume.html", "Data Scientist Resume", "Technology"),
    ("ai-engineer-resume.html", "AI Engineer Resume", "Technology"),
    ("machine-learning-engineer-resume.html", "Machine Learning Engineer Resume", "Technology"),
    ("cyber-security-resume.html", "Cyber Security Resume", "Technology"),
    ("network-engineer-resume.html", "Network Engineer Resume", "Technology"),
    ("it-support-resume.html", "IT Support Resume", "Technology"),
    # Design
    ("ui-ux-designer-resume.html", "UI/UX Designer Resume", "Design"),
    ("graphic-designer-resume.html", "Graphic Designer Resume", "Design"),
    ("product-designer-resume.html", "Product Designer Resume", "Design"),
    ("web-designer-resume.html", "Web Designer Resume", "Design"),
    ("motion-designer-resume.html", "Motion Designer Resume", "Design"),
    # Marketing
    ("digital-marketing-resume.html", "Digital Marketing Resume", "Marketing"),
    ("seo-specialist-resume.html", "SEO Specialist Resume", "Marketing"),
    ("ppc-specialist-resume.html", "PPC Specialist Resume", "Marketing"),
    ("content-writer-resume.html", "Content Writer Resume", "Marketing"),
    ("copywriter-resume.html", "Copywriter Resume", "Marketing"),
    ("social-media-manager-resume.html", "Social Media Manager Resume", "Marketing"),
    ("marketing-manager-resume.html", "Marketing Manager Resume", "Marketing"),
    # Business
    ("business-analyst-resume.html", "Business Analyst Resume", "Business"),
    ("project-manager-resume.html", "Project Manager Resume", "Business"),
    ("product-manager-resume.html", "Product Manager Resume", "Business"),
    ("operations-manager-resume.html", "Operations Manager Resume", "Business"),
    # HR
    ("hr-resume.html", "HR Resume", "HR"),
    ("hr-executive-resume.html", "HR Executive Resume", "HR"),
    ("hr-manager-resume.html", "HR Manager Resume", "HR"),
    ("recruiter-resume.html", "Recruiter Resume", "HR"),
    ("talent-acquisition-resume.html", "Talent Acquisition Resume", "HR"),
    # Finance
    ("accountant-resume.html", "Accountant Resume", "Finance"),
    ("chartered-accountant-resume.html", "Chartered Accountant Resume", "Finance"),
    ("financial-analyst-resume.html", "Financial Analyst Resume", "Finance"),
    ("auditor-resume.html", "Auditor Resume", "Finance"),
    ("banking-resume.html", "Banking Resume", "Finance"),
    # Education
    ("teacher-resume.html", "Teacher Resume", "Education"),
    ("primary-teacher-resume.html", "Primary Teacher Resume", "Education"),
    ("school-teacher-resume.html", "School Teacher Resume", "Education"),
    ("lecturer-resume.html", "Lecturer Resume", "Education"),
    ("professor-resume.html", "Professor Resume", "Education"),
    # Healthcare
    ("nurse-resume.html", "Nurse Resume", "Healthcare"),
    ("pharmacist-resume.html", "Pharmacist Resume", "Healthcare"),
    ("medical-representative-resume.html", "Medical Representative Resume", "Healthcare"),
    ("lab-technician-resume.html", "Lab Technician Resume", "Healthcare"),
    # Engineering
    ("civil-engineer-resume.html", "Civil Engineer Resume", "Engineering"),
    ("mechanical-engineer-resume.html", "Mechanical Engineer Resume", "Engineering"),
    ("electrical-engineer-resume.html", "Electrical Engineer Resume", "Engineering"),
    ("electronics-engineer-resume.html", "Electronics Engineer Resume", "Engineering"),
    ("site-engineer-resume.html", "Site Engineer Resume", "Engineering"),
    # Administration & Others
    ("sales-executive-resume.html", "Sales Executive Resume", "Administration"),
    ("customer-support-resume.html", "Customer Support Resume", "Administration"),
    ("receptionist-resume.html", "Receptionist Resume", "Administration"),
    ("administrative-assistant-resume.html", "Administrative Assistant Resume", "Administration"),
    ("office-assistant-resume.html", "Office Assistant Resume", "Administration"),
    ("hotel-management-resume.html", "Hotel Management Resume", "Administration"),
    ("chef-resume.html", "Chef Resume", "Administration"),
    ("architect-resume.html", "Architect Resume", "Administration"),
    ("interior-designer-resume.html", "Interior Designer Resume", "Administration"),
    ("lawyer-resume.html", "Lawyer Resume", "Administration"),
    ("retail-associate-resume.html", "Retail Associate Resume", "Administration"),
    ("warehouse-associate-resume.html", "Warehouse Associate Resume", "Administration"),
    ("delivery-executive-resume.html", "Delivery Executive Resume", "Administration"),
    # Experience-based
    ("resume-for-1-year-experience.html", "Resume for 1 Year Experience", "Experience"),
    ("resume-for-2-years-experience.html", "Resume for 2 Years Experience", "Experience"),
    ("resume-for-3-years-experience.html", "Resume for 3 Years Experience", "Experience"),
    ("resume-for-5-years-experience.html", "Resume for 5 Years Experience", "Experience"),
    ("resume-for-10-years-experience.html", "Resume for 10 Years Experience", "Experience"),
    ("experienced-professional-resume.html", "Experienced Professional Resume", "Experience"),
    ("senior-software-engineer-resume.html", "Senior Software Engineer Resume", "Experience"),
    ("experienced-teacher-resume.html", "Experienced Teacher Resume", "Experience"),
    ("experienced-accountant-resume.html", "Experienced Accountant Resume", "Experience")
]

RESUME_TEMPLATES = [
    ("ats-resume-template.html", "ATS Resume Template"),
    ("professional-resume-template.html", "Professional Resume Template"),
    ("modern-resume-template.html", "Modern Resume Template"),
    ("simple-resume-template.html", "Simple Resume Template"),
    ("creative-resume-template.html", "Creative Resume Template"),
    ("minimal-resume-template.html", "Minimal Resume Template"),
    ("corporate-resume-template.html", "Corporate Resume Template"),
    ("executive-resume-template.html", "Executive Resume Template"),
    ("one-page-resume-template.html", "One Page Resume Template"),
    ("two-page-resume-template.html", "Two Page Resume Template"),
    ("student-resume-template.html", "Student Resume Template"),
    ("fresher-resume-template.html", "Fresher Resume Template"),
    ("internship-resume-template.html", "Internship Resume Template"),
    ("software-engineer-resume-template.html", "Software Engineer Resume Template"),
    ("teacher-resume-template.html", "Teacher Resume Template"),
    ("accountant-resume-template.html", "Accountant Resume Template")
]

COVER_LETTERS = [
    ("cover-letter-templates.html", "Cover Letter Templates"),
    ("internship-cover-letter.html", "Internship Cover Letter"),
    ("fresher-cover-letter.html", "Fresher Cover Letter"),
    ("software-engineer-cover-letter.html", "Software Engineer Cover Letter"),
    ("data-analyst-cover-letter.html", "Data Analyst Cover Letter"),
    ("teacher-cover-letter.html", "Teacher Cover Letter"),
    ("hr-cover-letter.html", "HR Cover Letter"),
    ("accountant-cover-letter.html", "Accountant Cover Letter"),
    ("marketing-cover-letter.html", "Marketing Cover Letter"),
    ("sales-cover-letter.html", "Sales Cover Letter")
]

ATS_RESOURCES = [
    ("ats-friendly-resume.html", "ATS Friendly Resume Guide"),
    ("ats-resume-format.html", "ATS Resume Format"),
    ("ats-resume-templates.html", "ATS Resume Templates List"),
    ("ats-resume-examples.html", "ATS Resume Examples"),
    ("ats-resume-keywords.html", "ATS Resume Keywords Guide"),
    ("ats-resume-optimization.html", "ATS Resume Optimization"),
    ("ats-resume-test.html", "How to Test ATS Compatibility"),
    ("ats-resume-score.html", "ATS Resume Score Explanation")
]

CAREER_GUIDES = [
    # Freshers
    ("resume-for-freshers.html", "Resume for Freshers (2026 Guide)"),
    ("resume-format.html", "Resume Format"),
    ("resume-with-no-experience.html", "How to Write a Resume with No Experience"),
    ("student-resume.html", "Student Resume Guide"),
    ("internship-resume.html", "Internship Resume Guide"),
    ("first-job-resume.html", "Resume for Your First Job"),
    ("college-student-resume.html", "College Student Resume Guide"),
    # Degree Specific
    ("btech-fresher-resume.html", "BTech Fresher Resume"),
    ("mba-fresher-resume.html", "MBA Fresher Resume"),
    ("bca-fresher-resume.html", "BCA Fresher Resume"),
    ("mca-fresher-resume.html", "MCA Fresher Resume"),
    ("bcom-fresher-resume.html", "BCom Fresher Resume"),
    ("ba-fresher-resume.html", "BA Fresher Resume"),
    ("bsc-fresher-resume.html", "BSc Fresher Resume"),
    ("mtech-fresher-resume.html", "MTech Fresher Resume"),
    ("diploma-fresher-resume.html", "Diploma Fresher Resume"),
    ("polytechnic-resume.html", "Polytechnic Resume"),
    # Skills
    ("skills-for-resume.html", "Skills for Resume Guide"),
    ("technical-skills-for-resume.html", "Technical Skills for Resume"),
    ("soft-skills-for-resume.html", "Soft Skills for Resume"),
    ("communication-skills-for-resume.html", "Communication Skills for Resume"),
    ("leadership-skills-for-resume.html", "Leadership Skills for Resume"),
    ("computer-skills-for-resume.html", "Computer Skills for Resume"),
    ("management-skills-for-resume.html", "Management Skills for Resume"),
    ("marketing-skills-for-resume.html", "Marketing Skills for Resume"),
    ("sales-skills-for-resume.html", "Sales Skills for Resume"),
    ("hr-skills-for-resume.html", "HR Skills for Resume"),
    ("programming-skills-for-resume.html", "Programming Skills for Resume"),
    # Summary
    ("resume-summary-examples.html", "Resume Summary Examples Guide"),
    ("software-engineer-resume-summary.html", "Software Engineer Resume Summary"),
    ("data-analyst-resume-summary.html", "Data Analyst Resume Summary"),
    ("teacher-resume-summary.html", "Teacher Resume Summary"),
    ("hr-resume-summary.html", "HR Resume Summary"),
    ("accountant-resume-summary.html", "Accountant Resume Summary"),
    ("fresher-resume-summary.html", "Fresher Resume Summary"),
    # Objective
    ("resume-objective-examples.html", "Resume Objective Examples Guide"),
    ("career-objective-for-freshers.html", "Career Objective for Freshers"),
    ("career-objective-for-students.html", "Career Objective for Students"),
    ("software-engineer-career-objective.html", "Software Engineer Career Objective"),
    ("teacher-career-objective.html", "Teacher Career Objective"),
    ("accountant-career-objective.html", "Accountant Career Objective"),
    ("mba-career-objective.html", "MBA Career Objective"),
    # College Students
    ("resume-for-iit-students.html", "Resume for IIT Students"),
    ("resume-for-nit-students.html", "Resume for NIT Students"),
    ("resume-for-engineering-students.html", "Resume for Engineering Students"),
    ("resume-for-mba-students.html", "Resume for MBA Students"),
    ("resume-for-btech-students.html", "Resume for BTech Students"),
    ("resume-for-delhi-university-students.html", "Resume for Delhi University Students"),
    ("resume-for-jiwaji-university-students.html", "Resume for Jiwaji University Students")
]

INTERVIEW_QUESTIONS = [
    ("hr-interview-questions.html", "HR Interview Questions & Answers"),
    ("software-engineer-interview-questions.html", "Software Engineer Interview Questions"),
    ("java-interview-questions.html", "Java Interview Questions"),
    ("python-interview-questions.html", "Python Interview Questions"),
    ("react-interview-questions.html", "React Interview Questions"),
    ("data-analyst-interview-questions.html", "Data Analyst Interview Questions"),
    ("business-analyst-interview-questions.html", "Business Analyst Interview Questions"),
    ("teacher-interview-questions.html", "Teacher Interview Questions"),
    ("accountant-interview-questions.html", "Accountant Interview Questions"),
    ("digital-marketing-interview-questions.html", "Digital Marketing Interview Questions")
]

SALARY_GUIDES = [
    ("software-engineer-salary-in-india.html", "Software Engineer Salary in India"),
    ("data-analyst-salary-in-india.html", "Data Analyst Salary in India"),
    ("ui-ux-designer-salary-in-india.html", "UI/UX Designer Salary in India"),
    ("digital-marketing-salary-in-india.html", "Digital Marketing Salary in India"),
    ("hr-salary-in-india.html", "HR Salary in India"),
    ("accountant-salary-in-india.html", "Accountant Salary in India"),
    ("civil-engineer-salary-in-india.html", "Civil Engineer Salary in India"),
    ("teacher-salary-in-india.html", "Teacher Salary in India")
]

BLOG_POSTS = [
    ("how-to-write-a-resume.html", "How to Write a Resume in 2026"),
    ("best-resume-format-in-india.html", "Best Resume Format in India"),
    ("ats-friendly-resume-guide.html", "ATS Friendly Resume Guide"),
    ("resume-vs-cv.html", "Difference Between Resume and CV"),
    ("one-page-resume-guide.html", "One Page Resume Writing Guide"),
    ("resume-mistakes-to-avoid.html", "15 Resume Mistakes to Avoid"),
    ("best-fonts-for-resume.html", "Best Fonts for Resumes in 2026"),
    ("how-to-add-projects-to-resume.html", "How to Add Projects to Resume"),
    ("how-to-add-skills-to-resume.html", "How to Add Skills to Resume"),
    ("how-to-write-work-experience.html", "How to Write Work Experience on Resume"),
    ("how-to-write-career-objective.html", "How to Write a Career Objective"),
    ("how-to-write-resume-summary.html", "How to Write a Resume Summary"),
    ("resume-for-government-jobs.html", "Resume Guide for Government Jobs"),
    ("resume-for-private-jobs.html", "Resume Guide for Private Sector Jobs"),
    ("resume-keywords-guide.html", "Resume Keywords and Action Verbs Guide"),
    ("ats-resume-tips.html", "Top 10 ATS Resume Optimization Tips"),
    ("resume-design-tips.html", "Resume Design & Layout Tips"),
    ("interview-preparation-guide.html", "Complete Job Interview Preparation Guide")
]

CITY_PAGES = [
    ("resume-builder-india.html", "Online Resume Builder India"),
    ("resume-builder-delhi.html", "Resume Builder Delhi"),
    ("resume-builder-mumbai.html", "Resume Builder Mumbai"),
    ("resume-builder-bangalore.html", "Resume Builder Bangalore"),
    ("resume-builder-hyderabad.html", "Resume Builder Hyderabad"),
    ("resume-builder-chennai.html", "Resume Builder Chennai"),
    ("resume-builder-pune.html", "Resume Builder Pune"),
    ("resume-builder-kolkata.html", "Resume Builder Kolkata"),
    ("resume-builder-ahmedabad.html", "Resume Builder Ahmedabad"),
    ("resume-builder-jaipur.html", "Resume Builder Jaipur"),
    ("resume-builder-lucknow.html", "Resume Builder Lucknow"),
    ("resume-builder-indore.html", "Resume Builder Indore"),
    ("resume-builder-gwalior.html", "Resume Builder Gwalior")
]

# Mapping directory names
HUBS = {
    "resume-examples": RESUME_EXAMPLES,
    "resume-templates": RESUME_TEMPLATES,
    "cover-letter-examples": COVER_LETTERS,
    "career-guides": CAREER_GUIDES,
    "interview-questions": INTERVIEW_QUESTIONS,
    "salary-guides": SALARY_GUIDES,
    "ats-resources": ATS_RESOURCES,
    "blog": BLOG_POSTS
}

def extract_index_footer():
    """Extracts footer HTML and CSS directly from index.html for maximum consistency."""
    with open(os.path.join(BASE_DIR, "index.html"), "r", encoding="utf-8") as f:
        content = f.read()

    # Find the footer block
    footer_match = re.search(r"<!-- Footer -->[\s\S]*?</footer>", content)
    if not footer_match:
        footer_match = re.search(r"<footer class=\"footer\">[\s\S]*?</footer>", content)
    
    footer_html = footer_match.group(0) if footer_match else ""

    # Find style block contents
    style_match = re.search(r"<style>([\s\S]*?)</style>", content)
    if not style_match:
        return "", footer_html
    style_content = style_match.group(1)

    # Extract all .footer related classes
    classes_to_extract = [
        r"\.footer\s*\{[\s\S]*?\}",
        r"\.footer-grid\s*\{[\s\S]*?\}",
        r"\.footer-brand-col\s*\{[\s\S]*?\}",
        r"\.footer-logo\s*\{[\s\S]*?\}",
        r"\.footer-logo:hover\s*\{[\s\S]*?\}",
        r"\.footer-logo\s+\.brand-title\s*\{[\s\S]*?\}",
        r"\.footer-logo\s+\.brand-title\s+span\s*\{[\s\S]*?\}",
        r"\.footer-logo\s+\.brand-title\s+span:first-child\s*\{[\s\S]*?\}",
        r"\.footer-logo\s+\.brand-title\s+span:last-child\s*\{[\s\S]*?\}",
        r"\.footer-tagline\s*\{[\s\S]*?\}",
        r"\.social-links\s*\{[\s\S]*?\}",
        r"\.social-links\s+a\s*\{[\s\S]*?\}",
        r"\.social-links\s+a:hover\s*\{[\s\S]*?\}",
        r"\.footer-col\s+h4\s*\{[\s\S]*?\}",
        r"\.footer-col\s+h4:hover,\s*\.footer-col\s+h4:active\s*\{[\s\S]*?\}",
        r"\.footer-col\s+ul\s*\{[\s\S]*?\}",
        r"\.footer-col\s+ul\s+li\s+a\s*\{[\s\S]*?\}",
        r"\.footer-col\s+ul\s+li\s+a:hover\s*\{[\s\S]*?\}",
        r"\.footer-bottom\s*\{[\s\S]*?\}",
        r"\.footer-bottom-container\s*\{[\s\S]*?\}",
        r"@media\s*\(max-width:\s*1024px\)\s*\{\s*\.footer-grid\s*\{[\s\S]*?\}\s*\}",
        r"@media\s*\(max-width:\s*768px\)\s*\{\s*\.footer-grid\s*\{[\s\S]*?\}\s*\.footer\s*\{[\s\S]*?\}\s*\.footer-bottom-container\s*\{[\s\S]*?\}\s*\}"
    ]

    extracted_styles = []
    for pattern in classes_to_extract:
        matches = re.findall(pattern, style_content)
        for match in matches:
            extracted_styles.append(match)

    footer_css = "\n\n        ".join(extracted_styles)
    return footer_css, footer_html

def update_path_depth(html_content, depth):
    """Updates paths inside HTML (such as css/js/logo references) to support subfolders depth."""
    prefix = "../" * depth
    if not prefix:
        return html_content

    # Replace relative paths
    html_content = html_content.replace('href="index.html"', f'href="{prefix}index.html"')
    html_content = html_content.replace('href="templates.html"', f'href="{prefix}templates.html"')
    html_content = html_content.replace('href="about.html"', f'href="{prefix}about.html"')
    html_content = html_content.replace('href="contact.html"', f'href="{prefix}contact.html"')
    html_content = html_content.replace('href="blog.html"', f'href="{prefix}blog.html"')
    html_content = html_content.replace('href="sitemap.html"', f'href="{prefix}sitemap.html"')
    html_content = html_content.replace('href="sitemap.xml"', f'href="{prefix}sitemap.xml"')
    html_content = html_content.replace('href="robots.txt"', f'href="{prefix}robots.txt"')
    html_content = html_content.replace('href="privacy-policy.html"', f'href="{prefix}privacy-policy.html"')
    html_content = html_content.replace('href="terms.html"', f'href="{prefix}terms.html"')
    html_content = html_content.replace('href="disclaimer.html"', f'href="{prefix}disclaimer.html"')
    html_content = html_content.replace('href="cookie-policy.html"', f'href="{prefix}cookie-policy.html"')
    
    html_content = html_content.replace('href="builder.html"', f'href="{prefix}builder.html"')
    html_content = html_content.replace('href="ai-resume-builder.html"', f'href="{prefix}ai-resume-builder.html"')
    html_content = html_content.replace('href="ats-resume-builder.html"', f'href="{prefix}ats-resume-builder.html"')
    html_content = html_content.replace('href="cv-builder.html"', f'href="{prefix}cv-builder.html"')
    html_content = html_content.replace('href="cover-letter-builder.html"', f'href="{prefix}cover-letter-builder.html"')
    html_content = html_content.replace('href="ats-resume-checker.html"', f'href="{prefix}ats-resume-checker.html"')
    html_content = html_content.replace('href="resume-examples.html"', f'href="{prefix}resume-examples.html"')
    html_content = html_content.replace('href="career-guides.html"', f'href="{prefix}career-guides.html"')
    html_content = html_content.replace('href="interview-questions.html"', f'href="{prefix}interview-questions.html"')
    html_content = html_content.replace('href="salary-guides.html"', f'href="{prefix}salary-guides.html"')
    html_content = html_content.replace('href="cover-letter-examples.html"', f'href="{prefix}cover-letter-examples.html"')

    # Social and branding references
    html_content = html_content.replace('src="img/', f'src="{prefix}img/')
    html_content = html_content.replace('href="img/', f'href="{prefix}img/')
    html_content = html_content.replace('src="js/', f'src="{prefix}js/')
    
    # Prefix hub directories for internal links in footer/nav
    for hub_name in HUBS.keys():
        html_content = html_content.replace(f'href="{hub_name}/', f'href="{prefix}{hub_name}/')
    
    # Grid layout mapping
    # Let's map link targets to their subfolders inside the generated HTML
    # (e.g. software-engineer-resume.html -> resume-examples/software-engineer-resume.html)
    for hub_name, list_data in HUBS.items():
        for item in list_data:
            filename = item[0]
            html_content = html_content.replace(f'href="{filename}"', f'href="{prefix}{hub_name}/{filename}"')
            # Handle nested links too
            html_content = html_content.replace(f'href="../{hub_name}/{filename}"', f'href="{prefix}{hub_name}/{filename}"')

    return html_content

def get_content_for_page(title, filename, category, hub_dir):
    # Determine the clean role or topic
    role_name = title.replace(" Resume", "").replace(" Template", "").replace(" Guide", "").strip()
    
    # 1. Default fallback content
    h1 = f"How to Write a Professional <span>{title}</span>"
    intro = f"Optimize your profile with our free resources for {title}. Build an ATS-friendly CV and land your dream job in 2026."
    description = f"Build and optimize your resume for {title} with our free templates, guide, and interactive examples."
    keywords = f"{title.lower()}, resume builder, career guide"
    
    sections = [
        {
            "h2": f"How to Structure Your {title} Document",
            "paragraphs": [
                f"Writing a professional document for {title} requires clear visual hierarchy and proper formatting. Start with a clear header, list your contact information, and write a compelling professional summary.",
                f"Ensure the layout is clean, chronological, and optimized for applicant tracking systems. Avoid columns, graphics, or tables unless explicitly recommended."
            ]
        },
        {
            "h2": f"Key Requirements for {title} in 2026",
            "paragraphs": [
                f"To stand out, prioritize your most relevant achievements and skills. Quantify your impact with numbers and use action verbs to describe your responsibilities.",
                f"Tailor the keywords to match the industry expectations and target job description precisely."
            ]
        }
    ]
    
    resume_name = "Rohan Sharma"
    resume_title = role_name
    resume_email = "rohan.sharma@email.com"
    resume_phone = "+91 98765 43210"
    resume_linkedin = "linkedin.com/in/rohan-sharma"
    resume_summary = f"Results-driven professional specializing in {resume_title}. Over 5 years of experience leading teams, optimizing workflows, and delivering high-quality business outcomes."
    
    resume_experience = [
        {
            "role": f"Lead {resume_title} — Tech Enterprise India",
            "date": "2023 - Present",
            "bullets": [
                f"Spearheaded key initiatives in {resume_title} operations, resulting in a 25% efficiency gain.",
                "Collaborated with cross-functional teams to streamline workflows and reduce errors by 15%.",
                "Managed budgets and resource allocation, saving $50k in licensing costs."
            ]
        },
        {
            "role": f"Junior {resume_title} — Solutions Corp",
            "date": "2020 - 2023",
            "bullets": [
                f"Supported senior team members in executing daily {resume_title} tasks with zero downtime.",
                "Optimized database queries and tracking reports, saving 5 hours of manual work weekly."
            ]
        }
    ]
    
    resume_skills = [f"{resume_title} Strategy", "Process Optimization", "Industry Best Practices", "Cross-Functional Collaboration", "Problem Solving"]
    resume_education = "Bachelor of Science in Related Field — ABC University (Graduated 2020)"
    
    template_name = "Professional Teal"
    template_id = "teal"
    
    ats_tips = [
        f"Include role-specific keywords from the {title} description.",
        "Use bullet points for achievements rather than large text blocks.",
        "Avoid icons, charts, and progress bars to display skills.",
        "Format dates consistently as MM/YYYY or Month YYYY.",
        "Save and export your final resume as a text-based PDF file."
    ]
    
    faqs = [
        {
            "q": f"What is the best format for a {title}?",
            "a": f"The reverse-chronological format is highly recommended. It showcases your career progression, listing your most recent experience first with clear headers."
        },
        {
            "q": f"How can I make my {title} document ATS-friendly?",
            "a": "Use a simple single-column layout, standard fonts, and naturally integrate key phrases from your target job description."
        },
        {
            "q": f"Is this {title} guide free to use?",
            "a": "Yes, all our guides, templates, and resume building tools are 100% free to access directly in your browser."
        }
    ]

    # Customize by category
    category_lower = category.lower()
    hub_lower = hub_dir.lower() if hub_dir else ""
    
    # 2. Resume Examples (Hub or title matches)
    if "resume-examples" in hub_lower or "examples" in category_lower or "resume" in title.lower():
        role = role_name
        h1 = f"Best <span>{role} Resume</span> Example & Guide (2026)"
        intro = f"How to write a professional {role} resume. Study our recruiter-approved resume example, customize your layout, and list the exact skills needed to pass Applicant Tracking Systems (ATS)."
        description = f"Download our free {role} resume templates and view professional examples. Learn how to list core technical skills, key projects, and experience to pass ATS scanners."
        keywords = f"{role.lower()} resume, {role.lower()} resume example, best {role.lower()} resume format, {role.lower()} skills resume"
        
        # Skill map for roles
        role_skills_map = {
            "Software Engineer": ["Java & Python", "Data Structures & Algorithms", "System Design & Microservices", "SQL & NoSQL Databases", "Git & CI/CD", "AWS Cloud Services"],
            "Java Developer": ["Java SE/EE", "Spring Boot & Spring Cloud", "Hibernate & JPA ORM", "REST API Development", "PostgreSQL & Redis", "JUnit & Mockito Testing"],
            "Python Developer": ["Python & Django", "FastAPI & Flask", "PostgreSQL & MongoDB", "REST APIs & Web Scraping", "Git & Docker", "Data Analysis (Pandas)"],
            "Frontend Developer": ["HTML5 & CSS3", "JavaScript & TypeScript", "React.js & Next.js", "Redux State Management", "Tailwind CSS & SASS", "RESTful APIs"],
            "Backend Developer": ["Node.js & Express", "Java & Spring Boot", "SQL & NoSQL Databases", "REST APIs & WebSockets", "Docker & Kubernetes", "AWS Cloud Services"],
            "Full Stack Developer": ["React.js & Node.js", "HTML5, CSS3 & JavaScript", "MongoDB, MySQL & Redis", "REST APIs & WebSockets", "Git & GitHub", "Docker & AWS"],
            "React Developer": ["JavaScript (ES6+) & TypeScript", "React.js & Redux", "Next.js & React Router", "HTML5 & Tailwind CSS", "RESTful APIs", "Git & GitHub"],
            "DevOps Engineer": ["Docker & Kubernetes", "AWS & GCP Cloud", "CI/CD (Jenkins, GitHub Actions)", "Terraform (IaC)", "Linux System Administration", "Bash & Python Scripting"],
            "Data Analyst": ["SQL (PostgreSQL, MySQL)", "Python (Pandas, NumPy)", "Tableau & Power BI", "Data Modeling & ETL", "A/B Testing & Statistics", "Excel Analytics"],
            "Data Scientist": ["Python & R Programming", "Machine Learning (Scikit-Learn)", "Deep Learning (TensorFlow)", "SQL & Big Data (Spark)", "Statistical Analysis", "Data Visualization"],
            "UI/UX Designer": ["Figma & Adobe XD", "User Research & Personas", "Wireframing & Prototyping", "UI Design Systems", "Usability Testing", "Information Architecture"],
            "Graphic Designer": ["Adobe Photoshop & Illustrator", "InDesign & Figma", "Brand Identity Design", "Typography & Layouts", "Digital & Print Media", "Creative Concepting"],
            "Digital Marketing": ["SEO & SEM Optimization", "Google Analytics & Ads", "Social Media Marketing", "Content Strategy & Copywriting", "Email Marketing", "A/B Testing & ROI"],
            "SEO Specialist": ["On-Page & Off-Page SEO", "Google Search Console", "Ahrefs & SEMrush", "Keyword Research", "Technical SEO Audits", "Content Optimization"],
            "Business Analyst": ["Business Process Modeling", "Requirement Gathering (BRD/FRD)", "SQL & Data Analysis", "Agile & Scrum Frameworks", "Jira & Confluence", "Stakeholder Management"],
            "Project Manager": ["Project Planning & Scheduling", "Agile & Scrum Methodologies", "Budgeting & Forecasting", "Risk Management", "Jira & MS Project", "Stakeholder Communication"],
            "Product Manager": ["Product Roadmap Strategy", "User Research & Analytics", "Agile Product Lifecycle", "Jira & Confluence", "A/B Testing & Metrics", "Cross-Functional Leadership"],
            "HR Executive": ["Recruitment & Sourcing", "Onboarding & Offboarding", "HR Policies & Compliance", "Employee Engagement", "HRIS (Workday, BambooHR)", "Conflict Resolution"],
            "Accountant": ["Financial Accounting", "Taxation & GST Compliance", "Tally Prime & QuickBooks", "Bank Reconciliation", "Excel (VBA, Macros)", "Financial Reporting"],
            "Teacher": ["Lesson Planning & Delivery", "Classroom Management", "Student Assessment", "Curriculum Development", "Educational Technology", "Parent-Teacher Communication"],
            "Nurse": ["Patient Care & Assessment", "Medication Administration", "Electronic Health Records (EHR)", "Emergency Response", "Infection Control", "Compassionate Communication"],
            "Civil Engineer": ["AutoCAD & Revit", "Structural Design", "Project Estimation & Budgeting", "Site Supervision", "Concrete Technology", "Safety Compliance"],
            "Mechanical Engineer": ["SolidWorks & AutoCAD", "Thermodynamics & CAD", "Finite Element Analysis (FEA)", "Machine Design", "Manufacturing Processes", "Project Management"],
            "Electrical Engineer": ["Power Systems Design", "MATLAB & AutoCAD", "Electrical Safety Codes", "Circuit Analysis", "PLC Programming", "Project Management"],
            "Experienced Professional": ["Team Leadership & Mentoring", "Project Delivery Strategy", "Process Automation", "Budget Management", "Stakeholder Alignment", "Strategic Planning"],
            "Resume for 1 Year Experience": ["Technical Skills Foundations", "Team Collaboration", "Problem Solving", "Process Execution", "Git & Basic Tools", "Task Management"],
            "Resume for 3 Years Experience": ["Independent Task Delivery", "Feature Development", "Database Querying", "Process Documentation", "Git Workflow", "Agile Practices"],
            "Resume for 5 Years Experience": ["System Architecture Design", "Team Mentoring", "Key Deliverable Execution", "Process Optimization", "CI/CD & Cloud Setup", "Stakeholder Alignment"]
        }
        
        matched_skills = None
        for key, skills in role_skills_map.items():
            if key.lower() in role.lower() or role.lower() in key.lower():
                matched_skills = skills
                break
        
        if matched_skills:
            resume_skills = matched_skills
            resume_title = role
            resume_summary = f"Dedicated and result-oriented {role} with over 5 years of experience in the industry. Proven track record of optimizing workflows, executing complex projects, and implementing best practices using {', '.join(matched_skills[:3])}. Eager to add value to target team goals."
            resume_experience[0]["role"] = f"Senior {role} — Enterprise Solutions"
            resume_experience[0]["bullets"] = [
                f"Led a team of developers/specialists in executing high-impact {role} initiatives, saving 15% in operational costs.",
                f"Designed and optimized core workflows using {matched_skills[0]} and {matched_skills[1]}, resulting in a 25% efficiency improvement.",
                "Coordinated with stakeholders to ensure all deliverables complied with standard quality specifications."
            ]
            resume_experience[1]["role"] = f"{role} — TechCorp Services"
            resume_experience[1]["bullets"] = [
                f"Developed and executed critical processes using {matched_skills[2]} and {matched_skills[3]}.",
                "Participated in agile ceremonies and sprint runs to ensure timely releases."
            ]
            
        sections = [
            {
                "h2": f"How to Structure a {role} Resume",
                "paragraphs": [
                    f"Formatting a {role} resume correctly is the first step toward landing interviews. Recruiters typically spend less than 10 seconds scanning a profile, so clear visual hierarchy is vital. A reverse-chronological format is highly recommended because it showcases your most recent achievements and career progression first.",
                    "Stick to standard margins (0.75 to 1 inch) and use simple, clean fonts like Inter or Roboto. Avoid multi-column grids or heavy graphic design if you want to ensure Applicant Tracking Systems (ATS) can parse your work experience without issues."
                ]
            },
            {
                "h2": f"Writing an Action-Driven Experience Section for {role}",
                "paragraphs": [
                    "Your work experience section should focus on impact rather than daily duties. When writing bullet points, use powerful action verbs (e.g., 'coordinated', 'architected', 'optimized') and quantify your results with percentages, timeframes, or currency values.",
                    f"Instead of saying 'responsible for daily operations,' write: 'Optimized operational workflows, resulting in a 20% reduction in processing time and saving 10 hours of manual labor per week.' This proves your effectiveness in the {role} role."
                ]
            },
            {
                "h2": f"Core Competencies to Highlight as a {role}",
                "paragraphs": [
                    "A dedicated skills section helps recruiters quickly identify if your background matches their requirements. Group your skills into categories like technical tools, industry methodologies, and soft skills.",
                    f"For a {role} position, list your primary tools and frameworks. This ensures your resume matches the exact search keywords recruiters query in their candidate databases."
                ]
            }
        ]

    # 3. Resume Templates
    elif "resume-templates" in hub_lower or "templates" in category_lower or "template" in title.lower():
        tpl = role_name
        h1 = f"Free Premium <span>{tpl} Resume Template</span> (2026)"
        intro = f"Download our fully ATS-compliant {tpl} resume layout. Designed to pass applicant tracking systems, balance whitespace, and highlight your professional achievements."
        description = f"Download and customize our free {tpl} resume template. Coded specifically to score 90+ on applicant tracking systems and capture recruiter attention."
        keywords = f"{tpl.lower()} resume template, free {tpl.lower()} resume layout, download {tpl.lower()} CV template, ATS resume layout"
        template_name = f"Premium {tpl}"
        template_id = tpl.lower().replace(" ", "-")
        sections = [
            {
                "h2": f"Why Choose the {tpl} Layout?",
                "paragraphs": [
                    f"The {tpl} resume layout is crafted to represent your professional details cleanly. By using a single-column architecture, it ensures that applicant tracking software parses every section—from your contact details to your work experiences—with 100% accuracy.",
                    "This layout avoids graphic widgets, progress bars, and complex grid structures that commonly trigger parsing failures in ATS database scans."
                ]
            },
            {
                "h2": f"Formatting Rules for Your {tpl} Resume",
                "paragraphs": [
                    "Keep font sizes consistent: 10-12pt for body copy, and 14-16pt for section headers. Ensure margins are set between 0.75 and 1.0 inch.",
                    "Focus your bullet points on actions and results rather than daily tasks, and proofread thoroughly to eliminate spelling errors."
                ]
            }
        ]
        
    # 4. Cover Letters
    elif "cover-letter-examples" in hub_lower or "letter" in category_lower or "cover" in title.lower():
        cl = role_name
        h1 = f"Winning <span>{cl} Cover Letter</span> Example"
        intro = f"Learn how to write an engaging cover letter for {cl} roles. Study our free structure, customized achievements paragraphs, and call-to-action hooks."
        description = f"Get the best cover letter examples and writing tips for {cl}. Learn how to structure your intro, highlight achievements, and land the job."
        keywords = f"{cl.lower()} cover letter, cover letter examples for {cl.lower()}, {cl.lower()} cover letter sample"
        template_name = "Corporate Modern"
        template_id = "corporate-modern"
        sections = [
            {
                "h2": f"Writing Your {cl} Cover Letter Step-by-Step",
                "paragraphs": [
                    f"A cover letter for {cl} positions is your opportunity to outline your motivation and achievements in detail. Start with an engaging introduction that names the position you are targeting and why you are excited about the firm.",
                    "In the body paragraphs, describe one or two key achievements that prove you possess the skills required for the role. Focus on business impacts and metrics."
                ]
            }
        ]

    # 5. Interview Questions
    elif "interview-questions" in hub_lower or "questions" in category_lower or "interview" in title.lower():
        topic = title.replace(" Interview Questions", "").replace(" Questions", "").strip()
        h1 = f"Top <span>{topic} Interview Questions</span> & Answers"
        intro = f"Prepare for your next recruitment round with our compiled list of {topic} interview questions and recruiter-approved sample answers."
        description = f"Prepare for your next interview with our list of {topic} questions and professional answers. Learn how to structure responses using the STAR method."
        keywords = f"{topic.lower()} interview questions, {topic.lower()} Q&A, prepare for {topic.lower()} interview"
        template_name = "Elite Technical"
        template_id = "elite-technical"
        sections = [
            {
                "h2": f"Structuring Your Answers in {topic} Interviews",
                "paragraphs": [
                    "To succeed in modern interviews, formulate your stories around concrete facts and outcomes. Avoid vague generalizations.",
                    "We recommend using the STAR framework: structure your response by detailing the Situation, Task, Action, and the final quantifiable Result."
                ]
            }
        ]

    # 6. Salary Guides
    elif "salary-guides" in hub_lower or "salary" in category_lower or "salary" in title.lower():
        role = title.replace(" Salary in India", "").replace(" Salary", "").strip()
        h1 = f"<span>{role} Salary</span> in India (2026 Guide)"
        intro = f"Explore compensation averages, entry-level payouts, and senior salary scales for {role} roles in India. Learn how location and skills affect pay rates."
        description = f"Check the latest average payouts and salary trends for {role}. Learn how skills, certifications, and location affect income levels."
        keywords = f"{role.lower()} salary, {role.lower()} average payout, career compensation {role.lower()}"
        template_name = "Corporate Modern"
        template_id = "corporate-modern"
        sections = [
            {
                "h2": f"Average {role} Salary Benchmarks",
                "paragraphs": [
                    f"Compensation for a {role} depends on expertise and location. Our salary report indicates steady compensation scales for professionals mastering key certifications.",
                    "Metropolitan hubs like Bangalore, Mumbai, and Delhi typically offer higher compensation averages due to high concentrations of tech/corporate headquarters."
                ]
            }
        ]

    # 7. ATS Resources
    elif "ats-resources" in hub_lower or "ats" in category_lower or "ats" in title.lower():
        h1 = f"Pass the Recruiter Scan: <span>{title}</span>"
        intro = f"Modern companies screen applications using automated software. Learn how to format and optimize your profile for {title} in our comprehensive builder guide."
        description = f"Optimize your resume layout and keywords to pass applicant tracking systems: {title} guide."
        keywords = f"ats friendly resume, {title.lower()}, applicant tracking system"
        template_name = "Minimalist Classic"
        template_id = "minimalist"

    # 8. Blog Posts
    elif "blog" in hub_lower or "blog" in category_lower:
        h1 = f"Expert Insight: <span>{title}</span>"
        intro = f"Stay ahead in your career search with our detailed analysis of {title}. We share actionable tips, formatting standards, and structural guidelines."
        description = f"Read our expert career article on {title}. Get practical tips and advice to build a better resume."
        keywords = f"{title.lower()}, career blog, resume advice"
        template_name = "Professional Teal"
        template_id = "teal"

    return {
        "title": title,
        "description": description,
        "keywords": keywords,
        "h1": h1,
        "intro": intro,
        "sections": sections,
        "resume_example": {
            "name": resume_name,
            "title": resume_title,
            "email": resume_email,
            "phone": resume_phone,
            "linkedin": resume_linkedin,
            "summary": resume_summary,
            "experience": resume_experience,
            "skills": resume_skills,
            "education": resume_education
        },
        "template_name": template_name,
        "template_id": template_id,
        "ats_tips": ats_tips,
        "faqs": faqs
    }

def build_placeholder_page(title, filename, category, hub_dir, depth, footer_css, footer_html):
    prefix = "../" * depth
    
    # Generate dynamic content data
    data = get_content_for_page(title, filename, category, hub_dir)
    
    # Generate dynamic breadcrumb and JSON-LD schema
    breadcrumb_list = [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.densityresumebuilder.in/index.html"}
    ]
    breadcrumb_html = f'<a href="{prefix}index.html">Home</a> <span>›</span> '
    
    if hub_dir:
        hub_title = hub_dir.replace("-", " ").title()
        breadcrumb_list.append({
            "@type": "ListItem",
            "position": 2,
            "name": hub_title,
            "item": f"https://www.densityresumebuilder.in/{prefix}{hub_dir}/index.html"
        })
        breadcrumb_html += f'<a href="{prefix}{hub_dir}/index.html">{hub_title}</a> <span>›</span> '
    
    breadcrumb_list.append({
        "@type": "ListItem",
        "position": len(breadcrumb_list) + 1,
        "name": title,
        "item": f"https://www.densityresumebuilder.in/{prefix}{hub_dir}/{filename}" if hub_dir else f"https://www.densityresumebuilder.in/{filename}"
    })
    breadcrumb_html += f'<span>{title}</span>'
    
    breadcrumb_schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumb_list
    }
    
    # Build sections HTML
    sections_html = ""
    for sec in data["sections"]:
        sections_html += f'<div class="article-section">\n'
        sections_html += f'    <h2>{sec["h2"]}</h2>\n'
        for p in sec["paragraphs"]:
            sections_html += f'    <p>{p}</p>\n'
        sections_html += f'</div>\n'
        
    # Build Resume Experience HTML
    resume_exp_html = ""
    for exp in data["resume_example"]["experience"]:
        resume_exp_html += f'<div class="exp-item">\n'
        resume_exp_html += f'    <div class="exp-header">\n'
        resume_exp_html += f'        <span>{exp["role"]}</span>\n'
        resume_exp_html += f'        <span>{exp["date"]}</span>\n'
        resume_exp_html += f'    </div>\n'
        resume_exp_html += f'    <ul class="exp-bullets">\n'
        for bullet in exp["bullets"]:
            resume_exp_html += f'        <li>{bullet}</li>\n'
        resume_exp_html += f'    </ul>\n'
        resume_exp_html += f'</div>\n'
        
    # Build Resume Skills HTML
    resume_skills_html = ""
    for skill in data["resume_example"]["skills"]:
        resume_skills_html += f'<span class="skill-pill">{skill}</span>\n'
        
    # Build Tips HTML
    tips_html = ""
    for i, tip in enumerate(data["ats_tips"]):
        tips_html += f'<div class="tip-box">\n'
        tips_html += f'    <h4>Tip {i+1}</h4>\n'
        tips_html += f'    <p>{tip}</p>\n'
        tips_html += f'</div>\n'
        
    # Build FAQ HTML
    faq_html = ""
    for item in data["faqs"]:
        faq_html += f'<div class="faq-item">\n'
        faq_html += f'    <div class="faq-question">{item["q"]}</div>\n'
        faq_html += f'    <div class="faq-answer">{item["a"]}</div>\n'
        faq_html += f'</div>\n'
        
    # Build FAQ Schema JSON-LD structure
    schema_entities = []
    for item in data["faqs"]:
        schema_entities.append({
            "@type": "Question",
            "name": item["q"],
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item["a"]
            }
        })
    faq_schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": schema_entities
    }
    
    page_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="icon" type="image/png" href="img/logo.png" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}} | Density Resume Builder</title>
    <meta name="description" content="{{description}}">
    <meta name="keywords" content="{{keywords}}">
    <meta name="author" content="Density Resume Builder">
    <link rel="canonical" href="https://www.densityresumebuilder.in/{{filename}}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
    <script src="js/loader.js"></script>
    <script type="application/ld+json">{{breadcrumb_schema_json}}</script>
    <script type="application/ld+json">{{faq_schema_json}}</script>
    <style>
        :root {
            --primary: #0F172A;
            --primary-hover: #1E293B;
            --accent: #14B8A6;
            --secondary: #3B82F6;
            --bg-main: #FFFFFF;
            --bg-light: #F8FAFC;
            --text-main: #1E2937;
            --text-muted: #64748B;
            --border: #e2e8f0;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-main);
            color: var(--text-main);
            -webkit-font-smoothing: antialiased;
            line-height: 1.6;
            overflow-x: hidden;
        }

        /* Glow Elements */
        .glow-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
            pointer-events: none;
        }

        .bg-glow {
            position: absolute;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            filter: blur(120px);
        }

        .glow-1 { top: -200px; left: -200px; background: rgba(20, 184, 166, 0.08); }
        .glow-2 { top: 20%; right: -250px; background: rgba(59, 130, 246, 0.06); }
        .glow-3 { top: 60%; left: -200px; background: rgba(20, 184, 166, 0.05); }

        /* Navbar */
        .navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 80px;
            padding: 0 48px;
            background: #fff;
            width: 100%;
            border-bottom: 1px solid #f1f5f9;
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .brand-logo {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            color: #000;
        }

        .brand-logo svg {
            width: 40px;
            height: 40px;
        }

        .brand-title {
            display: flex;
            flex-direction: column;
            line-height: 1.1;
        }

        .brand-title span:first-child {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-weight: 800;
            font-size: 20px;
            letter-spacing: -0.02em;
        }

        .brand-title span:last-child {
            font-weight: 400;
            font-size: 15px;
            color: #475569;
        }

        .nav-links {
            display: flex;
            align-items: center;
            gap: 32px;
        }

        .nav-links a {
            font-size: 15px;
            font-weight: 500;
            color: var(--text-main);
            text-decoration: none;
            transition: color 0.2s;
        }

        .nav-links a:hover {
            color: var(--secondary);
        }

        .btn-get-started {
            background: var(--primary);
            color: #fff !important;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s;
        }

        .btn-get-started:hover {
            background: var(--primary-hover);
        }

        /* Breadcrumbs */
        .breadcrumb {
            max-width: 1200px;
            margin: 24px auto 0;
            padding: 0 24px;
            font-size: 14px;
            color: var(--text-muted);
            width: 100%;
        }

        .breadcrumb a {
            color: var(--text-muted);
            text-decoration: none;
            transition: color 0.2s;
        }

        .breadcrumb a:hover {
            color: var(--secondary);
        }

        .breadcrumb span {
            margin: 0 8px;
            color: var(--border);
        }

        /* Hero */
        .hero {
            max-width: 1000px;
            margin: 0 auto;
            padding: 40px 24px 40px;
            text-align: center;
        }

        .hero h1 {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 44px;
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 20px;
            letter-spacing: -0.03em;
        }

        .hero h1 span {
            color: var(--secondary);
        }

        .hero p.intro-text {
            font-size: 18px;
            color: var(--text-muted);
            max-width: 800px;
            margin: 0 auto 32px;
            line-height: 1.6;
        }

        /* Main Content Layout */
        .content-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px 80px;
            display: grid;
            grid-template-columns: 1.5fr 1fr;
            gap: 48px;
        }

        @media (max-width: 992px) {
            .content-container {
                grid-template-columns: 1fr;
            }
        }

        .article-section {
            margin-bottom: 40px;
        }

        .article-section h2 {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 26px;
            font-weight: 800;
            color: var(--primary);
            margin-bottom: 16px;
            letter-spacing: -0.02em;
        }

        .article-section p {
            font-size: 15.5px;
            color: var(--text-main);
            margin-bottom: 16px;
            line-height: 1.7;
        }

        /* Premium Visual Resume Sample */
        .resume-preview-card {
            background: #fff;
            border: 1px solid var(--border);
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            padding: 32px;
            margin-bottom: 40px;
            position: relative;
        }

        .resume-header {
            border-bottom: 2px solid var(--primary);
            padding-bottom: 16px;
            margin-bottom: 20px;
        }

        .resume-name {
            font-size: 24px;
            font-weight: 800;
            color: var(--primary);
        }

        .resume-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--secondary);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 4px;
        }

        .resume-contacts {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            font-size: 12px;
            color: var(--text-muted);
            margin-top: 8px;
        }

        .resume-section-title {
            font-size: 14px;
            font-weight: 700;
            color: var(--primary);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 12px;
            border-bottom: 1px solid var(--border);
            padding-bottom: 4px;
        }

        .resume-body-section {
            margin-bottom: 20px;
        }

        .resume-body-section p.summary-text {
            font-size: 13.5px;
            color: var(--text-main);
            line-height: 1.6;
        }

        .exp-item {
            margin-bottom: 16px;
        }

        .exp-header {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 6px;
        }

        .exp-bullets {
            list-style: none;
            padding-left: 0;
        }

        .exp-bullets li {
            font-size: 13px;
            color: var(--text-main);
            position: relative;
            padding-left: 16px;
            margin-bottom: 6px;
            line-height: 1.5;
        }

        .exp-bullets li::before {
            content: "•";
            position: absolute;
            left: 4px;
            color: var(--secondary);
            font-weight: bold;
        }

        .skills-pills {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .skill-pill {
            background: var(--bg-light);
            border: 1px solid var(--border);
            padding: 6px 12px;
            border-radius: 99px;
            font-size: 12px;
            font-weight: 500;
            color: var(--primary);
        }

        /* Template Download & Builder CTA Panel */
        .cta-panel {
            background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
            border-radius: 20px;
            padding: 36px;
            color: #fff;
            position: sticky;
            top: 100px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .cta-panel h3 {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 22px;
            font-weight: 800;
            margin-bottom: 12px;
        }

        .cta-panel p {
            font-size: 14px;
            color: #94a3b8;
            margin-bottom: 24px;
            line-height: 1.6;
        }

        .panel-btn {
            display: block;
            width: 100%;
            text-align: center;
            padding: 14px 20px;
            border-radius: 10px;
            font-weight: 700;
            font-size: 15px;
            text-decoration: none;
            margin-bottom: 12px;
            transition: all 0.2s;
            cursor: pointer;
        }

        .btn-green {
            background: #10B981;
            color: #fff;
        }

        .btn-green:hover {
            background: #059669;
            transform: translateY(-1px);
        }

        .btn-trans {
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-trans:hover {
            background: rgba(255, 255, 255, 0.15);
        }

        /* Copy Dialog styling */
        .copy-success {
            display: none;
            font-size: 12px;
            color: #10b981;
            margin-top: 8px;
            text-align: center;
            font-weight: 600;
        }

        /* Tips & FAQ blocks */
        .extra-sections-bg {
            background-color: var(--bg-light);
            border-top: 1px solid #f1f5f9;
            padding: 80px 24px;
        }

        .extra-sections-inner {
            max-width: 1000px;
            margin: 0 auto;
        }

        .tips-section h2, .faq-section h2 {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 32px;
            font-weight: 800;
            color: var(--primary);
            text-align: center;
            margin-bottom: 40px;
            letter-spacing: -0.02em;
        }

        .tips-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 24px;
            margin-bottom: 80px;
        }

        .tip-box {
            background: #fff;
            border: 1px solid var(--border);
            padding: 28px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.01);
            transition: all 0.3s;
        }

        .tip-box:hover {
            border-color: var(--secondary);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
            transform: translateY(-2px);
        }

        .tip-box h4 {
            font-size: 16px;
            font-weight: 700;
            color: var(--secondary);
            margin-bottom: 10px;
        }

        .tip-box p {
            font-size: 13.5px;
            color: var(--text-muted);
            line-height: 1.6;
        }

        /* Accordion FAQ */
        .faq-accordion {
            display: flex;
            flex-direction: column;
            gap: 16px;
            max-width: 800px;
            margin: 0 auto;
        }

        .faq-item {
            background: #fff;
            border: 1px solid var(--border);
            border-radius: 10px;
            overflow: hidden;
        }

        .faq-question {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 24px;
            font-weight: 600;
            font-size: 16px;
            color: var(--primary);
            cursor: pointer;
            user-select: none;
            background: #fff;
        }

        .faq-question::after {
            content: "+";
            font-size: 20px;
            font-weight: 400;
            color: var(--text-muted);
            transition: transform 0.2s;
        }

        .faq-item.active .faq-question::after {
            transform: rotate(45deg);
        }

        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.2s ease-out, padding 0.2s ease-out;
            background: #fcfcfd;
            border-top: 0 solid var(--border);
            padding: 0 24px;
            font-size: 14.5px;
            color: var(--text-muted);
            line-height: 1.6;
        }

        .faq-item.active .faq-answer {
            padding: 20px 24px;
            border-top-width: 1px;
        }

        /* Bottom CTA Banner */
        .cta-banner {
            background: linear-gradient(135deg, #7C3DF9 0%, #6366F1 100%);
            padding: 80px 24px;
            text-align: center;
            color: #fff;
        }

        .cta-banner h2 {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 36px;
            font-weight: 800;
            margin-bottom: 12px;
            letter-spacing: -0.02em;
        }

        .cta-banner p {
            font-size: 18px;
            margin-bottom: 32px;
            opacity: 0.9;
        }

        .cta-btn {
            display: inline-block;
            background: #fff;
            color: #7C3DF9;
            padding: 16px 40px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.2s;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .cta-btn:hover {
            background: #f8fafc;
            transform: translateY(-2px);
        }

        @media (max-width: 768px) {
            .navbar {
                padding: 0 24px;
            }
            .nav-links {
                display: none;
            }
            .hero h1 {
                font-size: 32px;
            }
            .hero p.intro-text {
                font-size: 16px;
            }
        }

        /* Premium Footer Injected Styles */
        {{footer_css}}
    </style>
</head>
<body>
    <div class="glow-container">
        <div class="bg-glow glow-1"></div>
        <div class="bg-glow glow-2"></div>
        <div class="bg-glow glow-3"></div>
    </div>

    <!-- NAVBAR -->
    <nav class="navbar">
        <a href="index.html" class="brand-logo">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 40px; height: 40px;">
                <rect x="5" y="5" width="28" height="28" fill="#000" />
                <rect x="37" y="37" width="28" height="28" fill="#000" />
                <rect x="69" y="37" width="28" height="28" fill="#000" />
                <rect x="37" y="69" width="28" height="28" fill="#000" />
                <rect x="0" y="0" width="30" height="30" fill="#7c3aed" />
                <rect x="32" y="32" width="30" height="30" fill="#7c3aed" />
                <rect x="64" y="32" width="30" height="30" fill="#7c3aed" />
                <rect x="32" y="64" width="30" height="30" fill="#7c3aed" />
            </svg>
            <div class="brand-title">
                <span>Density</span>
                <span>Resume Builder</span>
            </div>
        </a>
        <div class="nav-links">
            <a href="index.html">Home</a>
            <a href="templates.html">Templates</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
        </div>
    </nav>

    <!-- BREADCRUMBS -->
    <div class="breadcrumb">
        {{breadcrumb_html}}
    </div>

    <!-- HERO -->
    <header class="hero">
        <h1>{{h1}}</h1>
        <p class="intro-text">{{intro}}</p>
    </header>

    <!-- MAIN CONTENT AND SIDEBAR -->
    <main class="content-container">
        <!-- Content Side -->
        <div class="article-content">
            {{sections_html}}

            <!-- Resume Example Section -->
            <div class="article-section" style="margin-top: 60px;">
                <h2 style="text-align: left; margin-bottom: 24px;">Standard Recruiter-Approved Resume Example</h2>
                <p>Below is a visual implementation of a highly competitive resume based on our guidelines. You can copy the raw structural template data to customize it, or load it straight into our builder.</p>
                
                <div class="resume-preview-card">
                    <div class="resume-header">
                        <div class="resume-name">{{resume_name}}</div>
                        <div class="resume-title">{{resume_title}}</div>
                        <div class="resume-contacts">
                            <span>✉ {{resume_email}}</span>
                            <span>📞 {{resume_phone}}</span>
                            <span>🔗 {{resume_linkedin}}</span>
                        </div>
                    </div>

                    <div class="resume-body-section">
                        <div class="resume-section-title">Professional Summary</div>
                        <p class="summary-text">{{resume_summary}}</p>
                    </div>

                    <div class="resume-body-section">
                        <div class="resume-section-title">Professional Experience</div>
                        {{resume_experience_html}}
                    </div>

                    <div class="resume-body-section">
                        <div class="resume-section-title">Key Core Skills</div>
                        <div class="skills-pills">
                            {{resume_skills_html}}
                        </div>
                    </div>

                    <div class="resume-body-section" style="margin-bottom: 0;">
                        <div class="resume-section-title">Education & Credentials</div>
                        <p class="summary-text" style="font-weight: 500;">{{resume_education}}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sidebar Panel -->
        <aside class="sidebar-side">
            <div class="cta-panel">
                <h3>Use This Template in Density Builder</h3>
                <p>Customize this professional <strong>{{template_name}}</strong> template instantly using our free, AI-driven resume builder. Coded to score 90+ on ATS screening systems.</p>
                <a href="upload-choice.html?template={{template_id}}" class="panel-btn btn-green">Customize This Resume</a>
                <button class="panel-btn btn-trans" id="copy-json-btn">Copy JSON Template Data</button>
                <div class="copy-success" id="copy-status">✓ JSON template copied to clipboard!</div>
            </div>
        </aside>
    </main>

    <!-- TIPS & FAQ SECTIONS -->
    <section class="extra-sections-bg">
        <div class="extra-sections-inner">
            <div class="tips-section">
                <h2>Top Actionable ATS Optimization Tips</h2>
                <div class="tips-grid">
                    {{tips_html}}
                </div>
            </div>

            <div class="faq-section" style="margin-top: 80px;">
                <h2>Frequently Asked Questions</h2>
                <div class="faq-accordion">
                    {{faq_html}}
                </div>
            </div>
        </div>
    </section>

    <!-- BOTTOM CTA BANNER -->
    <section class="cta-banner">
        <h2>Start Building Your Job-Winning Resume Today</h2>
        <p>Create a beautiful, professional, and recruiter-approved CV in minutes. Entirely free to get started.</p>
        <a href="templates.html" class="cta-btn">Build My Resume — Free</a>
    </section>

    <!-- FOOTER -->
    {{footer_html}}

    <!-- FAQ accordion interactivity script -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    faqItems.forEach(i => {
                        i.classList.remove('active');
                        i.querySelector('.faq-answer').style.maxHeight = null;
                    });
                    if (!isActive) {
                        item.classList.add('active');
                        const answer = item.querySelector('.faq-answer');
                        answer.style.maxHeight = answer.scrollHeight + "px";
                    }
                });
            });

            // Copy JSON template code
            const copyBtn = document.getElementById('copy-json-btn');
            const copyStatus = document.getElementById('copy-status');
            const resumeData = {{resume_json}};

            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(JSON.stringify(resumeData, null, 2)).then(() => {
                    copyStatus.style.display = 'block';
                    setTimeout(() => {
                        copyStatus.style.display = 'none';
                    }, 3000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            });
        });
    </script>
</body>
</html>
"""

    page_content = (
        page_html.replace("{{title}}", data["title"])
        .replace("{{description}}", data["description"])
        .replace("{{keywords}}", data["keywords"])
        .replace("{{filename}}", filename)
        .replace("{{breadcrumb_schema_json}}", json.dumps(breadcrumb_schema, indent=2))
        .replace("{{faq_schema_json}}", json.dumps(faq_schema, indent=2))
        .replace("{{breadcrumb_html}}", breadcrumb_html)
        .replace("{{h1}}", data["h1"])
        .replace("{{intro}}", data["intro"])
        .replace("{{sections_html}}", sections_html)
        .replace("{{resume_name}}", data["resume_example"]["name"])
        .replace("{{resume_title}}", data["resume_example"]["title"])
        .replace("{{resume_email}}", data["resume_example"]["email"])
        .replace("{{resume_phone}}", data["resume_example"]["phone"])
        .replace("{{resume_linkedin}}", data["resume_example"]["linkedin"])
        .replace("{{resume_summary}}", data["resume_example"]["summary"])
        .replace("{{resume_experience_html}}", resume_exp_html)
        .replace("{{resume_skills_html}}", resume_skills_html)
        .replace("{{resume_education}}", data["resume_example"]["education"])
        .replace("{{template_name}}", data["template_name"])
        .replace("{{template_id}}", data["template_id"])
        .replace("{{resume_json}}", json.dumps(data["resume_example"]))
        .replace("{{tips_html}}", tips_html)
        .replace("{{faq_html}}", faq_html)
        .replace("{{footer_css}}", footer_css)
        .replace("{{footer_html}}", footer_html)
    )

    # Normalize depth paths inside HTML
    return update_path_depth(page_content, depth)

def generate_sitemap(all_urls):
    """Generates sitemap.xml dynamically including all 170+ generated URLs."""
    urls_block = ""
    for url in all_urls:
        urls_block += f"""    <url>
        <loc>{url}</loc>
        <lastmod>2026-06-12</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>\n"""

    sitemap_xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.densityresumebuilder.in/index.html</loc>
        <lastmod>2026-06-12</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://www.densityresumebuilder.in/templates.html</loc>
        <lastmod>2026-06-12</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
{urls_block}</urlset>
"""
    with open(os.path.join(BASE_DIR, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(sitemap_xml)
    print("Generated dynamic sitemap.xml containing all SEO URLs.")

def main():
    footer_css, footer_html = extract_index_footer()
    if not footer_css or not footer_html:
        print("Error: Could not extract footer CSS/HTML from index.html.")
        return

    # Master list of all final full absolute URLs on the production site
    production_urls = []

    # 1. Compile Product Pages (Root)
    print("Compiling Product and Money Pages in Root...")
    for filename, title, _ in PRODUCT_PAGES:
        fpath = os.path.join(BASE_DIR, filename)
        # Skip if index/templates/ats-resume-checker which are custom crafted
        if filename in ["index.html", "templates.html", "ats-resume-checker.html", "ai-resume-builder.html"]:
            continue
        
        # Build page HTML
        page_html = build_placeholder_page(title, filename, "Product", "", 0, footer_css, footer_html)
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(page_html)
        production_urls.append(f"https://www.densityresumebuilder.in/{filename}")
    
    # 2. Compile Location SEO Pages (Root)
    print("Compiling City/Location SEO Pages in Root...")
    for filename, title in CITY_PAGES:
        fpath = os.path.join(BASE_DIR, filename)
        page_html = build_placeholder_page(title, filename, "Location", "", 0, footer_css, footer_html)
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(page_html)
        production_urls.append(f"https://www.densityresumebuilder.in/{filename}")

    # 3. Compile hub pages
    for hub_name, list_data in HUBS.items():
        hub_path = os.path.join(BASE_DIR, hub_name)
        if not os.path.exists(hub_path):
            os.makedirs(hub_path)
            print(f"Created directory: {hub_name}/")

        print(f"Compiling pages inside hub '{hub_name}'...")
        for item in list_data:
            filename = item[0]
            title = item[1]
            fpath = os.path.join(hub_path, filename)
            page_html = build_placeholder_page(title, filename, hub_name.replace("-", " ").title(), hub_name, 1, footer_css, footer_html)
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(page_html)
            production_urls.append(f"https://www.densityresumebuilder.in/{hub_name}/{filename}")

    # 4. Generate dynamic sitemap
    generate_sitemap(production_urls)
    
    print("\n--- Programmatic SEO Compilation Complete ---")
    print(f"Compiled pages: {len(production_urls)} total URLs registered.")

if __name__ == "__main__":
    main()
