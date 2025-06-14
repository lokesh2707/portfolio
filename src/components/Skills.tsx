import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'HTML5', level: 95 },
        { name: 'CSS', level: 90 },
        { name: 'Javascript', level: 85 },
        { name: 'React.js', level: 60 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'Express', level: 82 },
        { name: 'MongoDB', level: 80 },
      ],
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git/GitHub', level: 93 },
        { name: 'Postman', level: 80 },
        { name: 'AWS', level: 75 },
        { name: 'Jenkins', level: 60 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Constantly learning and adapting to new technologies to deliver 
            cutting-edge solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-slate-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 font-medium">{skill.name}</span>
                      <span className="text-blue-600 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          animation: `skillBar 2s ease-out ${skillIndex * 0.1}s both`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes skillBar {
          from {
            width: 0%;
          }
          to {
            width: var(--skill-width);
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;