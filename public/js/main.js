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


  function initializeProjectFilter() {
    const buttons = document.querySelectorAll('.category-btn');
    const projects = document.querySelectorAll('.project-card');
	const designCards = document.querySelectorAll('[data-category="design"] .card');
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));

	// designCards.forEach(card => {
    //     card.style.cursor = 'pointer';
    //     card.addEventListener('click', (e) => {
    //         // 防止点击卡片内的链接时触发模态框
    //         if (e.target.tagName === 'A') {
    //             return;
    //         }
    //         e.preventDefault();

    //         const data = card.dataset;
            
    //         // 填充模态框内容
    //         document.getElementById('modalTitle').textContent = data.title;
    //         document.getElementById('modalImage').src = data.image;
    //         document.getElementById('modalDescription').textContent = data.description;
            
    //         // 处理技术栈
    //         const techList = document.querySelector('#modalTech ul');
    //         techList.innerHTML = '';
    //         data.tech.split(',').forEach(tech => {
    //             const li = document.createElement('li');
    //             li.innerHTML = `<i class="fas fa-check-circle text-primary me-2"></i>${tech.trim()}`;
    //             techList.appendChild(li);
    //         });

    //         // 只添加 Source Code 链接
    //         const linksContainer = document.getElementById('modalLinks');
    //         linksContainer.innerHTML = '';
            
    //         if (data.source) {
    //             const sourceLink = document.createElement('a');
    //             sourceLink.href = data.source;
    //             sourceLink.target = '_blank';
    //             sourceLink.className = 'btn btn-outline-primary';
    //             sourceLink.innerHTML = '<i class="fab fa-github me-2"></i>Source Code';
    //             linksContainer.appendChild(sourceLink);
    //         }

    //         modal.show();
    //     });
    // });
	designCards.forEach(card => {
		card.style.cursor = 'pointer';
		card.addEventListener('click', async (e) => {
			// Prevent modal trigger if clicking on links
			if (e.target.tagName === 'A') {
				return;
			}
			e.preventDefault();
	
			const data = card.dataset;
			const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
			const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
	
			// Show loading modal
			loadingModal.show();
	
			try {
				// 预加载图片
				await new Promise((resolve, reject) => {
					const img = new Image();
					img.onload = resolve;
					img.onerror = reject;
					img.src = data.image;
				});
	
				// 准备模态框内容
				const modalImage = document.getElementById('modalImage');
				const modalTitle = document.getElementById('modalTitle');
				const modalDescription = document.getElementById('modalDescription');
				const techList = document.querySelector('#modalTech ul');
				const linksContainer = document.getElementById('modalLinks');
	
				// 设置内容
				modalImage.src = data.image;
				modalTitle.textContent = data.title;
				modalDescription.textContent = data.description;
	
				// 处理技术栈列表
				techList.innerHTML = '';
				data.tech.split(',').forEach(tech => {
					const li = document.createElement('li');
					li.innerHTML = `<i class="fas fa-check-circle text-primary me-2"></i>${tech.trim()}`;
					techList.appendChild(li);
				});
	
				// 处理链接
				linksContainer.innerHTML = '';
				if (data.source) {
					const sourceLink = document.createElement('a');
					sourceLink.href = data.source;
					sourceLink.target = '_blank';
					sourceLink.className = 'btn btn-outline-primary';
					sourceLink.innerHTML = '<i class="fab fa-github me-2"></i>Source Code';
					linksContainer.appendChild(sourceLink);
				}
	
				// 设置模态框关闭事件处理
				const projectModalElement = document.getElementById('projectModal');
				const loadingModalElement = document.getElementById('loadingModal');
	
				// 清除之前的事件监听器
				projectModalElement.removeEventListener('hidden.bs.modal', handleProjectModalHidden);
				
				// 添加新的事件监听器
				function handleProjectModalHidden() {
					// 确保 loading modal 也被关闭
					const loadingModalInstance = bootstrap.Modal.getInstance(loadingModalElement);
					if (loadingModalInstance) {
						loadingModalInstance.hide();
					}
					// 移除事件监听器
					projectModalElement.removeEventListener('hidden.bs.modal', handleProjectModalHidden);
				}
				
				projectModalElement.addEventListener('hidden.bs.modal', handleProjectModalHidden);
	
				// 隐藏 loading modal 并显示 project modal
				loadingModal.hide();
				projectModal.show();
	
			} catch (error) {
				console.error('Error loading project details:', error);
				loadingModal.hide();
				// 可以在这里添加错误提示
			}
		});
	});


    function filterProjects(category) {
        projects.forEach(project => {
            if (category === project.dataset.category) {
                project.classList.remove('hidden-category');
            } else {
                project.classList.add('hidden-category');
            }
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            const category = button.dataset.filter;
            filterProjects(category);
        });
    });

    // Show fullstack projects by default
    filterProjects('fullstack');
}

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


	  initializeProjectFilter();
	  initializeDesignModals();



  });
  
  