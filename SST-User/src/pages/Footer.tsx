
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  ];

  return (
    <footer className="bg-ahmed-primary text-white py-12">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <a href="#home" className="text-2xl font-bold mb-4 inline-block">
              Ahmed<span className="text-ahmed-accent">Ezz</span>
            </a>
            <p className="text-gray-300 max-w-md mb-6">
              Creative developer and designer crafting beautiful, functional digital experiences that help businesses grow.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-ahmed-secondary flex items-center justify-center hover:bg-ahmed-accent transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-ahmed-accent">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-ahmed-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-ahmed-accent transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-300 hover:text-ahmed-accent transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-ahmed-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-ahmed-accent">Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300">Web Development</span>
              </li>
              <li>
                <span className="text-gray-300">UI/UX Design</span>
              </li>
              <li>
                <span className="text-gray-300">Responsive Design</span>
              </li>
              <li>
                <span className="text-gray-300">App Development</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Ahmed Ezz Aldin. All rights reserved.
          </p>
          <div className="text-gray-400 text-sm">
            Made with <span className="text-ahmed-accent">♥</span> by Ahmed Ezz Aldin
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
