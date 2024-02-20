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
		threshold: 0.5, //common 10%
	};

	let projectObserverOptions = {
		root: null,
		threshold: 0.1, // 70% for project card
	};  


	let sharedObserverCallback = (entries, observer) => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {

		  entry.target.style.opacity = 1;
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

			entry.target.style.opacity = 1;
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
  
  