/*******************************
 * 1. Vue.js Sticky Header
 *******************************/
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
	mounted() {
	  window.addEventListener("scroll", this.handleScroll);
	},
	unmounted() {
	  window.removeEventListener("scroll", this.handleScroll);
	},
	methods: {
	  handleScroll() {
		this.isSticky = window.scrollY > 100;
	  },
	  toggleCollapse(index) {
		this.collapseStates[index] = !this.collapseStates[index];
	  }
	}
  });
  
  
  /*******************************
   * 2. Skills Progress Bars
   *******************************/
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
  
  // 示例：前端 95%，后端 90%，设计 97%，其他 90%
  updateProgressBars([95, 90, 97, 90]);
  
  
  /*******************************
   * 3. Project Filter
   *******************************/
  function initializeProjectFilter() {
	const buttons = document.querySelectorAll('.category-btn');
	const projects = document.querySelectorAll('.project-card');
  
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
		  // 移除所有按钮的 active
		  buttons.forEach(btn => btn.classList.remove('active'));
		  // 给当前点击的按钮加 active
		  button.classList.add('active');
	
		  const category = button.dataset.filter;
		  filterProjects(category);
		});
	  });
  
	// 默认只显示 `fullstack` 分类
	// filterProjects('fullstack');
	 filterProjects('Data Visualization');

	const dvButton = document.querySelector('.category-btn[data-filter="Data Visualization"]');
	if (dvButton) {
		 dvButton.classList.add('active');
	}

  }
  
  
  /*******************************
   * 4. Modal Logic
   *******************************/
  /**
   * - design 类别：全部项目都可以打开模态框
   * - Data Visualization 类别：只有 "Data information visualization" 打开模态框
   * - 其他 Data Visualization 项目不触发模态框
   */
  function initializeDesignAndDataVizModals() {
	// 获取 "项目" 模态框（不再获取 Loading Modal）
	const projectModalEl = document.getElementById('projectModal');
	const projectModal = new bootstrap.Modal(projectModalEl);
  
	// 通用点击处理函数（不显示 Loading Modal）
	async function handleProjectClick(e, card) {
	  e.preventDefault();
  
	  // 如果点击到 <a>，不触发模态框
	  if (e.target.tagName === 'A') return;
  
	  const data = card.dataset;
	  // 若没有 title 或 image，就跳过
	  if (!data.title || !data.image) {
		console.error("Missing data attributes for modal (title / image).");
		return;
	  }
  
	  try {
		// 预加载图片（若失败只会在控制台报错，不弹任何 Loading）
		await new Promise((resolve, reject) => {
		  const img = new Image();
		  img.onload = resolve;
		  img.onerror = reject;
		  img.src = data.image;
		});
  
		// 填充模态框内容
		document.getElementById('modalTitle').textContent = data.title;
		document.getElementById('modalImage').src = data.image;
		document.getElementById('modalDescription').textContent = data.description;
  
		// 技术栈
		const techList = document.querySelector('#modalTech ul');
		techList.innerHTML = '';
		if (data.tech) {
		  data.tech.split(',').forEach(tech => {
			const li = document.createElement('li');
			li.innerHTML = `<i class="fas fa-check-circle text-primary me-2"></i>${tech.trim()}`;
			techList.appendChild(li);
		  });
		}
  
		// 链接
		const linksContainer = document.getElementById('modalLinks');
		linksContainer.innerHTML = '';
		if (data.source) {
		  const sourceLink = document.createElement('a');
		  sourceLink.href = data.source;
		  sourceLink.target = '_blank';
		  sourceLink.className = 'btn btn-outline-primary';
		  sourceLink.innerHTML = '<i class="fab fa-github me-2"></i>Source Code';
		  linksContainer.appendChild(sourceLink);
		}
  
		// 直接显示项目模态框
		projectModal.show();
  
	  } catch (error) {
		console.error('Error loading project details:', error);
	  }
	}
  
	// design 类别 -> 全部能弹窗
	const designProjects = document.querySelectorAll('.project-card[data-category="design"]');
	designProjects.forEach(project => {
	  project.style.cursor = 'pointer';
	  project.addEventListener('click', e => handleProjectClick(e, project));
	});
  
	// Data Visualization 下只让 data-title="Data information visualization" 弹窗
	const specialDataVizProject = document.querySelector(
	  '.project-card[data-category="Data Visualization"][data-title="Data information visualization"]'
	);
	if (specialDataVizProject) {
	  specialDataVizProject.style.cursor = 'pointer';
	  specialDataVizProject.addEventListener('click', e => handleProjectClick(e, specialDataVizProject));
	}
  }
  
  
  /*******************************
   * 5. Intersection Observer (动画)
   *******************************/
  document.addEventListener("DOMContentLoaded", () => {
	// Observer 配置
	let sharedObserverOptions = {
	  root: null,
	  threshold: 0.5
	};
	let projectObserverOptions = {
	  root: null,
	  threshold: 0.1
	};
  
	// Skills/About 动画
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
  
	// Projects 动画
	let projectObserverCallback = (entries, observer) => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  entry.target.style.opacity = 1;
		  entry.target.classList.add('animate__animated', 'animate__fadeInUp');
  
		  if (entry.target.id === 'projects-title') {
			entry.target.classList.add('animate__jackInTheBox');
		  } else if (entry.target.classList.contains('project-card')) {
			entry.target.classList.add('animate__fadeInUp');
		  }
  
		  entry.target.style.animationDelay = entry.target.dataset.animationDelay || '0.9s';
		  observer.unobserve(entry.target);
		}
	  });
	};
  
	// 创建两个 Observer
	let sharedObserver = new IntersectionObserver(sharedObserverCallback, sharedObserverOptions);
	let projectObserver = new IntersectionObserver(projectObserverCallback, projectObserverOptions);
  
	// 观察 About / Skills
	document.querySelectorAll('#skills-title, #skills-left, #skills-right, #about-image')
	  .forEach(element => sharedObserver.observe(element));
  
	// 观察 Project
	document.querySelectorAll('#projects-title, .project-card')
	  .forEach(card => projectObserver.observe(card));
  
	// 初始化分类过滤 & 模态框逻辑
	initializeProjectFilter();
	initializeDesignAndDataVizModals();
  });
  