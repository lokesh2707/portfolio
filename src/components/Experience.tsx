import React from 'react';
import { MapPin, Calendar, Building, Briefcase } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      company: 'SmartBridge Platform Pvt. Ltd',
      position: 'MERN-Stack Developer',
      type: 'Online',
      location: 'Remote',
      period: '15 May,2025 - Present',
      description: 'Leading a team of 5 developers in building scalable web applications. Implemented microservices architecture resulting in 40% performance improvement.',
      achievements: [
        'Reduced page load times by 60% through optimization',
        'Mentored 3 junior developers',
        'Built basic React.js web applications to strengthen frontend development skills',
      ],
      logo: '🚀',
    },
    {
      company: 'Andhra Pradesh State Skill Development Corporation(APSSDC)',
      position: 'Artificial Intelligence & Machine Learning Intern',
      type: 'Online',
      location: 'Remote',
      period: '15 May, 2024 - 25 June, 2024',
      description: 'Explored basic problem-solving, file handling, and scripting in Python.Completed simple Python projects to apply knowledge in real-world scenarios',
      achievements: [
        'Developed an object detection project using Python, applying key concepts in computer vision',
        'Improved code quality by implementing testing standards',
        'Learned and implemented popular Python libraries such as OpenCV and NumPy',
      ],
      logo: '👔',
    },
        {
      company: 'SkillDzire Technologies Pvt. Ltd.',
      position: 'Full-Stack Developer',
      type: 'Online',
      location: 'Remote',
      period: '01 May, 2024 - 01 Jul, 2024',
      description: 'Developed and maintained multiple client projects using React, Node.js, and AWS. Collaborated with design teams to create pixel-perfect user interfaces.',
      achievements: [
        'Enhanced coding skills through hands-on project experience and consistent practice',
        'Improved code quality by implementing testing standards',
        'Gained backend development experience, including working with databases and server-side logic',
      ],
      logo: '💼',
    },
    {
      company: 'Academor',
      position: 'Frontend Developer',
      type: 'Online',
      location: 'Surampalem, India',
      period: '02 Jan, 2024 - 30 Mar, 2024',
      description: 'Built responsive web applications and landing pages for various startups. Focused on user experience and mobile-first design principles.',
      achievements: [
        'Worked on developing and enhancingwebsites using front-end technologies including HTML, CSS, and JavaScript',
        'Built reusable component library',
        'Collaborated with product managers on feature development',
      ],
      logo: '🌟',
    },
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Work Experience
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            My professional journey and the impact I've made at each organization.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-blue-200 transform md:-translate-x-px"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-2 md:-translate-x-2 border-4 border-white shadow-lg z-10"></div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-slate-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-3xl">{exp.logo}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800 mb-1">
                          {exp.position}
                        </h3>
                        <div className="flex items-center gap-2 text-blue-600 font-semibold mb-3">
                          <Building size={16} />
                          {exp.company}
                        </div>
                        <div className="space-y-2 text-slate-500 text-sm mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase size={14} />
                            {exp.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-700 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-2 text-slate-600">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;