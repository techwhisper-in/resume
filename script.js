document.addEventListener('DOMContentLoaded', () => {
    // Load JSON data
    async function loadData() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            populateContent(data);
            setupEventListeners();
            //initAnimations();
        } catch (error) {
            console.error('Failed to load data:', error);
            showError(error);
        }
    }

    function populateContent(data) {
        // Personal Info
        document.getElementById('profile-img').src = data.personal.profileImage;
        document.getElementById('name').textContent = data.personal.name;
        document.getElementById('position').textContent = data.personal.position;
        document.getElementById('about-text').innerHTML = data.personal.about;
        document.getElementById('contact-details').innerHTML = 
            `📧 <a href="mailto:${data.personal.email}">${data.personal.email}</a> | 📱 ${data.personal.phone} | 📍 ${data.personal.location}`;
        const socialSection = document.getElementById('social-details');
        socialSection.innerHTML += (data.social || []).map(link => `
                <a href="${link.url}" target="_blank" class="social-link" aria-label="${link.name}">
                    <i class="${link.icon}"></i>
                </a>
        `).join('');

        //skills
        const skillsContainer = document.getElementById('skills-container');
        skillsContainer.innerHTML = data.skills
            .map(skill => `<div class="skill-item">${skill}</div>`)
            .join('');

        // Experience
        const experienceContainer = document.getElementById('experience-container');
        experienceContainer.innerHTML = data.experience
            .map(exp => `
                <div class="timeline-item">
                    <h3>${exp.position} - ${exp.company}</h3>
                    <p class="date">${exp.duration}</p>
                    <ul>
                        ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                </div>
            `).join('');

        // Education
        const educationContainer = document.getElementById('education-container');
        educationContainer.innerHTML = data.education
            .map(edu => `
                <div class="timeline-item">
                    <h3>${edu.degree} - ${edu.institution}</h3>
                    <p class="date">${edu.duration}</p>
                </div>
            `).join('');
    }

    function setupEventListeners() {
        // Hamburger menu
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Form submission

        const scriptURL = 'https://script.google.com/macros/s/AKfycbzHrTE9wS_c1vL299NBXselSN2a0iUaXy0yaHeRNI17Cm7AhjhzSehHo7kpuBe39UU6HQ/exec'

        const form = document.forms['contact-form']

        form.addEventListener('submit', e => {
        
        e.preventDefault()
        
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => alert("Thank you for your message! I will respond shortly." ))
        .then(() => { window.location.reload(); })
        .catch(error => console.error('Error!', error.message))
        })
        // document.getElementById('contactForm').addEventListener('submit', function(e) {
        //     e.preventDefault();
        //     alert('Thank you for your message! I will respond shortly.');
        //     this.reset();
        // });
    }

    function initAnimations() {
        // Scroll animations
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop < window.innerHeight - 100) {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }
            });
        });

        // Initial animation states
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.6s ease-out';
        });
    }

    function showError(error) {
        const errorDiv = document.createElement('div');
        errorDiv.style.color = 'red';
        errorDiv.style.textAlign = 'center';
        errorDiv.style.padding = '2rem';
        errorDiv.textContent = `Error loading resume data: ${error.message}`;
        document.body.prepend(errorDiv);
    }

    // Start loading data
    loadData();
});