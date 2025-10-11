// Function to populate the portfolio
function populatePortfolio(portfolioData) {
    // Personal Information
    // Set page title using existing data
    document.title = `${portfolioData.personal.name} - ${portfolioData.personal.title} Portfolio`;
    document.getElementById('logoName').textContent = portfolioData.personal.name;
    document.getElementById('heroName').textContent = portfolioData.personal.name;
    document.getElementById('heroTitle').textContent = portfolioData.personal.title;
    //document.getElementById('heroEmail').textContent = portfolioData.personal.email;
    // Contact Information with clickable links
    const heroEmail = document.getElementById('heroEmail');
    heroEmail.innerHTML = `<a href="mailto:${portfolioData.personal.email}" class="email-link">${portfolioData.personal.email}</a>`;
    const phoneNumber = portfolioData.personal.phone.replace(/[\s\-()]/g, '');
    heroPhone.innerHTML = `<a href="tel:${phoneNumber}" class="phone-link">${portfolioData.personal.phone}</a>`;
    document.getElementById('heroLocation').textContent = portfolioData.personal.location;
    document.getElementById('profileImage').src = portfolioData.personal.profileImage;
    document.getElementById('aboutText').innerHTML = portfolioData.personal.about;
    document.getElementById('footerName').textContent = portfolioData.personal.name;

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Social Links
    const socialLinksContainer = document.getElementById('socialLinks');
    const footerSocialLinksContainer = document.getElementById('footerSocialLinks');
    
    portfolioData.social.forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        link.target = "_blank";
        link.innerHTML = `<i class="${social.icon}"></i>`;
        socialLinksContainer.appendChild(link);
        
        const footerLink = document.createElement('a');
        footerLink.href = social.url;
        footerLink.target = "_blank";
        footerLink.innerHTML = `<i class="${social.icon}"></i>`;
        footerSocialLinksContainer.appendChild(footerLink);
    });

    // Stats   
    const statsContainer = document.getElementById('statsContainer');
    portfolioData.stats.forEach(stat => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        
        const statNumber = document.createElement('span');
        statNumber.className = 'stat-number';
        statNumber.textContent = stat.number;
        
        const statText = document.createElement('span');
        statText.className = 'stat-text';
        statText.textContent = stat.text;
        
        statItem.appendChild(statNumber);
        statItem.appendChild(statText);
        
        statsContainer.appendChild(statItem);
    });

    // Skills
    const skillsGrid = document.getElementById('skillsGrid');
    portfolioData.skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.textContent = skill;
        skillsGrid.appendChild(skillItem);
    });

    // Experience
    const experienceTimeline = document.getElementById('experienceTimeline');
    portfolioData.experience.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const duration = document.createElement('div');
        duration.className = 'timeline-date';
        duration.textContent = exp.duration;
        
        const content = document.createElement('div');
        content.className = 'timeline-content';
        
        const position = document.createElement('h3');
        position.textContent = exp.position;
        
        const company = document.createElement('h4');
        company.textContent = exp.company;
        
        const responsibilities = document.createElement('ul');
        responsibilities.className = 'responsibilities';
        
        exp.responsibilities.forEach(resp => {
            const li = document.createElement('li');
            li.innerHTML = resp;
            responsibilities.appendChild(li);
        });
        
        content.appendChild(position);
        content.appendChild(company);
        content.appendChild(responsibilities);
        
        timelineItem.appendChild(duration);
        timelineItem.appendChild(content);
        
        experienceTimeline.appendChild(timelineItem);
    });

    // Certifications
    const certGrid = document.getElementById('certGrid');
    portfolioData.certification.forEach(cert => {
        const certItem = document.createElement('div');
        certItem.className = 'cert-item';
        
        const icon = document.createElement('div');
        icon.className = 'cert-icon';
        icon.innerHTML = '<i class="fas fa-award"></i>';
        
        const name = document.createElement('h3');
        name.textContent = cert.name;
        
        const institution = document.createElement('p');
        institution.textContent = cert.institution;
        
        certItem.appendChild(icon);
        certItem.appendChild(name);
        certItem.appendChild(institution);
        
        certGrid.appendChild(certItem);
    });

    // Education
    const eduGrid = document.getElementById('eduGrid');
    portfolioData.education.forEach(edu => {
        const eduItem = document.createElement('div');
        eduItem.className = 'edu-item';
        
        const icon = document.createElement('div');
        icon.className = 'edu-icon';
        icon.innerHTML = '<i class="fas fa-graduation-cap"></i>';
        
        const degree = document.createElement('h3');
        degree.textContent = edu.degree;
        
        const institution = document.createElement('p');
        institution.textContent = edu.institution;
        
        const duration = document.createElement('p');
        duration.textContent = edu.duration;
        
        eduItem.appendChild(icon);
        eduItem.appendChild(degree);
        eduItem.appendChild(institution);
        eduItem.appendChild(duration);
        
        eduGrid.appendChild(eduItem);
    });
}

// Initialize the portfolio when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Fetch the JSON data
    const json_version = new Date().getTime();
    fetch('data.json?v=' + json_version)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(portfolioData => {
            populatePortfolio(portfolioData);
            
            // Mobile menu toggle
            const mobileMenu = document.querySelector('.mobile-menu');
            const nav = document.querySelector('nav');
            
            mobileMenu.addEventListener('click', function() {
                nav.classList.toggle('active');
            });
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('nav a, .footer-links a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                    }
                });
            });
            
            // Header scroll effect
            window.addEventListener('scroll', function() {
                const header = document.getElementById('header');
                if (window.scrollY > 100) {
                    header.style.padding = '10px 0';
                    header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                } else {
                    header.style.padding = '20px 0';
                    header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
                }
            });
            
            // Form submission
            const scriptURL = 'https://script.google.com/macros/s/AKfycbzHrTE9wS_c1vL299NBXselSN2a0iUaXy0yaHeRNI17Cm7AhjhzSehHo7kpuBe39UU6HQ/exec';
            const form = document.forms['contact-form'];
            
            form.addEventListener('submit', e => {
                e.preventDefault();
                
                fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => alert("Thank you for your message! I will respond shortly." ))
                .then(() => { window.location.reload(); })
                .catch(error => console.error('Error!', error.message));
            });
        })
        .catch(error => {
            console.error('Error loading portfolio data:', error);
            document.body.innerHTML = `<div style="text-align: center; padding: 50px; color: red;">Error loading portfolio data. Please check your internet connection and try again.</div>`;
        });
});