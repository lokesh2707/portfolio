import React from 'react';
import { ExternalLink, Github, Calendar } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, and payment processing.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: 'https://e-commerce-murex-sigma.vercel.app/',
      githubUrl: 'https://github.com/lokesh2707/E-Commerce',
      date: '2024',
    },
    {
      title: 'Language Translation App',
      description: 'Designed and developed a responsive language translation web application using HTML, CSS, and JavaScript for the front end, withExpress.js and MongoDB powering the backend. The platform allows users to input text and translate it into multiple languages usingintegrated translation APIs.',
      image: 'https://www.shaip.com/wp-content/uploads/2020/12/Blog_Exploring-Natural-Language-Processing-in-Translation.jpg',
      technologies: ['Express', 'Node.js', 'MongoDB', 'JavaScript'],
      githubUrl: 'https://github.com/lokesh2707/language_transalation',
      date: '2024',
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics using modern APIs.',
      image: 'https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['HTML', 'CSS', 'JavaScript', 'OpenWeatherMap API'],
      githubUrl: '#',
      date: '2023',
    },
    {
      title: 'Exam Fee Payment System',
      description: 'Designed and developed a secure web-based application to streamline the exam fee payment process for students. The system includes user authentication, form-based subject selection (including backlog subjects), real-time fee calculation, and PDF receipt generation upon successful payment. Built using technologies like Node.js, Express.js, MongoDB, and integrated with PDFKit for dynamic receipt generation.',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['HTML','CSS','Express', 'Node.js', 'MongoDB', 'JavaScript'],
      githubUrl: '#',
      date: '2025',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A showcase of my recent work, from concept to deployment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  
                  <a
                    href={project.githubUrl}
                    className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all"
                  >
                    <Github size={20} className="text-white" />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-800">{project.title}</h3>
                  <div className="flex items-center text-slate-500 text-sm">
                    <Calendar size={16} className="mr-1" />
                    {project.date}
                  </div>
                </div>
                
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.liveUrl}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-700 font-medium transition-colors"
                  >
                    <Github size={16} />
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
