import { motion } from 'framer-motion'
import { SiHtml5, SiCss as SiCss3, SiJavascript, SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiCplusplus, SiFigma, SiCanvas as SiCanva } from 'react-icons/si'
import { FaPaintBrush as SiAdobephotoshop } from 'react-icons/fa'

const skillNodes = [
  {
    id: 'html',
    name: 'HTML',
    icon: SiHtml5,
    x: 10,
    y: 20,
    status: 'completed',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'css',
    name: 'CSS',
    icon: SiCss3,
    x: 25,
    y: 15,
    status: 'completed',
    color: 'from-gray-500 to-gray-600'
  },
  {
    id: 'js',
    name: 'JavaScript',
    icon: SiJavascript,
    x: 40,
    y: 25,
    status: 'completed',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'react',
    name: 'React',
    icon: SiReact,
    x: 55,
    y: 20,
    status: 'completed',
    color: 'from-gray-500 to-gray-600'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: SiNextdotjs,
    x: 70,
    y: 15,
    status: 'completed',
    color: 'from-gray-500 to-gray-700'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: SiNodedotjs,
    x: 20,
    y: 60,
    status: 'completed',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'express',
    name: 'Express',
    icon: SiExpress,
    x: 35,
    y: 55,
    status: 'completed',
    color: 'from-gray-400 to-gray-600'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: SiMongodb,
    x: 50,
    y: 60,
    status: 'completed',
    color: 'from-green-600 to-green-800'
  },
  {
    id: 'mysql',
    name: 'MySQL',
    icon: SiMysql,
    x: 65,
    y: 55,
    status: 'completed',
    color: 'from-gray-600 to-gray-800'
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: SiCplusplus,
    x: 80,
    y: 50,
    status: 'completed',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: SiFigma,
    x: 15,
    y: 85,
    status: 'completed',
    color: 'from-pink-500 to-purple-500'
  },
  {
    id: 'canva',
    name: 'Canva',
    icon: SiCanva,
    x: 30,
    y: 80,
    status: 'completed',
    color: 'from-gray-400 to-gray-500'
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    icon: SiAdobephotoshop,
    x: 45,
    y: 85,
    status: 'completed',
    color: 'from-gray-600 to-gray-700'
  }
]

const routeConnections = [
  { from: 'html', to: 'css' },
  { from: 'css', to: 'js' },
  { from: 'js', to: 'react' },
  { from: 'react', to: 'nextjs' },
  { from: 'html', to: 'nodejs' },
  { from: 'nodejs', to: 'express' },
  { from: 'express', to: 'mongodb' },
  { from: 'mongodb', to: 'mysql' },
  { from: 'mysql', to: 'cpp' },
  { from: 'html', to: 'figma' },
  { from: 'figma', to: 'canva' },
  { from: 'canva', to: 'photoshop' }
]

export default function Skills() {
  return (
    <section id="skills" className="mx-auto w-full px-4 sm:px-6 py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Skills section removed */}
    </section>
  )
}


