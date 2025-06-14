import React from 'react';
import { Code, Palette, Zap, Users } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Code className="text-blue-600" size={32} />,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code with best practices and modern standards.',
    },
    {
      icon: <Palette className="text-purple-600" size={32} />,
      title: 'Design Focus',
      description: 'Creating beautiful, intuitive interfaces that users love to interact with.',
    },
    {
      icon: <Zap className="text-yellow-600" size={32} />,
      title: 'Performance',
      description: 'Optimizing applications for speed, accessibility, and user experience.',
    },
    {
      icon: <Users className="text-green-600" size={32} />,
      title: 'Collaboration',
      description: 'Working effectively with teams to deliver projects on time and budget.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            About Me
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            I’m a Computer Science student passionate about full stack development and problem-solving. I’ve built real-time web projects using JavaScript, Java, and MongoDB, and consistently improve my skills through hands-on practice.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              I am Lokesh Prasanth, a passionate and motivated Computer Science & Engineering student at Aditya Engineering College.
               With a solid academic background and hands-on experience from internships and personal projects, 
               I’ve developed strong skills in web development, full stack Java, and problem-solving.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Over the past year, I’ve completed internships as a Full Stack Developer and Web Developer, 
              where I worked on real-time projects using HTML, CSS, JavaScript, Java, MongoDB, and MySQL.
               I’ve independently built projects like a Language Translation Web App and a Weather Application, 
               both of which reflect my enthusiasm for creating responsive and user-friendly web experiences.
            </p>
            <div className="flex flex-wrap gap-3">
              {['JavaScript','Node.js', 'Postman','MongoDB','Express','Java'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;