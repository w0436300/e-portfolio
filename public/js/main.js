// /* Sticky Header */
const app = Vue.createApp({
	data() {
		return {
			menus: [
				{ text: 'ABOUT', anchor: './index.html#about' },
                { text: 'SKILLS', anchor: './index.html#skills' },
                { text: 'PROJECT', anchor: './index.html#project' },
                { text: 'RESUME', anchor: '/portfolio/resume.html' },
                { text: 'CONTACT', anchor: './index.html#contact' }
			],
			contents: [
				{ title: 'Full-Stack Development', 
					content: 'Development of custom web pages. \nUsing current technologies and libraries of the labor field. \n\nMaster Modern Web Technologies: \nContinuously improve my proficiency in current frameworks and libraries, like React, Vue, and Angular.' 
				},
        		{ title: 'Graphic Design', 
					content: 'design of web interfaces and mobile applications, \ndesign made in figma, adobe xd and sketch. \n\nI intend to work on at least three significant side projects or contribute to open-source projects relevant to full-stack development.'
				},
        		{ title: 'UI/UX Design', 
					content: "I make designs at the client's request, banner design, posters, digital designs among others." 
				}

			],
			isSticky: false,
			collapseStates: Array(3).fill(false)
		  };
	},
	mounted(){
		window.addEventListener("scroll", this.handleScroll);
	},
	unmounted(){
		window.removeEventListener("scroll", this.handleScroll);
	},
	methods: {
		handleScroll() {
			this.isSticky = window.scrollY >100;
		  },
		  toggleCollapse(index) {
			this.collapseStates[index] = !this.collapseStates[index];
		  }
	}
})



function updateProgressBars(progressValues) {
	progressValues.forEach((progress, index) => {
	  const progressBarId = `progressBar${index + 1}`; 
	  const progressBar = document.getElementById(progressBarId);
	  if (progressBar) {
		progressBar.style.width = progress + '%';
		progressBar.setAttribute('aria-valuenow', progress);
	  }
	});
  }
  
  updateProgressBars([95, 90, 97, 90]);


  document.addEventListener("DOMContentLoaded", () => {
	
	let sharedObserverOptions = {
		root: null,
		threshold: 0.7, //common 10%
	};

	let projectObserverOptions = {
		root: null,
		threshold: 0.7, // 70% for project card
	};  


	let sharedObserverCallback = (entries, observer) => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		 
		  entry.target.classList.add('animate__animated');
		  
		 
		  if (entry.target.id === 'skills-title') {
			entry.target.classList.add('animate__bounce');
		  } else if (entry.target.id === 'skills-left') {
			entry.target.classList.add('animate__fadeInLeft');
		  } else if (entry.target.id === 'skills-right') {
			entry.target.classList.add('animate__fadeInRight');
		  } else if (entry.target.id === 'about-image') {
			entry.target.classList.add('animate__fadeIn');
		  } 
  
				  observer.unobserve(entry.target);
		}
	  });
	};

	let projectObserverCallback = (entries, observer) => {
		entries.forEach(entry => {
		  if (entry.isIntersecting) {
			entry.target.classList.add('animate__animated', 'animate__fadeInUp');

		  if (entry.target.id ==='projects-title') {
			entry.target.classList.add('animate__jackInTheBox');
		  }else if (entry.target.classList.contains('project-card')) {
			entry.target.classList.add('animate__fadeInUp');
		  } 
			
			entry.target.style.animationDelay = entry.target.dataset.animationDelay || '0.9s';
			observer.unobserve(entry.target);
		  }
		});
	  };

	  let sharedObserver = new IntersectionObserver(sharedObserverCallback, sharedObserverOptions);
      let projectObserver = new IntersectionObserver(projectObserverCallback, projectObserverOptions);

	  document.querySelectorAll('#skills-title, #skills-left, #skills-right, #about-image').forEach(element => {
		sharedObserver.observe(element);
	  });
	
	 
	  document.querySelectorAll(' #projects-title, .project-card').forEach(card => {
		projectObserver.observe(card);
	  });

  });
  
  