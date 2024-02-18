// /* Sticky Header */
const app = Vue.createApp({
	data() {
		return {
			menus: [
				{ text: 'ABOUT', anchor: './index.html#about' },
                { text: 'SKILLS', anchor: './index.html#skills' },
                { text: 'PLAN', anchor: './index.html#plan' },
                { text: 'PROJECT', anchor: './index.html#project' },
                { text: 'RESUME', anchor: 'resume.html' },
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







	

	

