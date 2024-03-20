import {
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiX,
  SiYoutube,
} from 'react-icons/si'

const navigation = {
  main: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: () => <SiFacebook className="h-6 w-6" />,
    },
    {
      name: 'Instagram',
      href: '#',
      icon: () => <SiInstagram className="h-6 w-6" />,
    },
    {
      name: 'X',
      href: '#',
      icon: () => <SiX className="h-6 w-6" />,
    },
    {
      name: 'GitHub',
      href: '#',
      icon: () => <SiGithub className="h-6 w-6" />,
    },
    {
      name: 'YouTube',
      href: '#',
      icon: () => <SiYoutube className="h-6 w-6" />,
    },
  ],
}

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          aria-label="Footer"
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <a
                className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                href={item.href}
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              className="text-gray-400 hover:text-gray-500"
              href={item.href}
            >
              <span className="sr-only">{item.name}</span>
              <item.icon />
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2020 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
