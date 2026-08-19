import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './SectionCards.css'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
  }),
}

function SectionCards() {
  const cards = [
    {
      title: 'Awareness',
      swahili: 'Uhamasishaji',
      description: 'Learn about the different forms of gender-based violence — physical, sexual, emotional, and economic — and how to recognize warning signs.',
      link: '/awareness',
      linkText: 'Learn more',
      className: 'card-awareness',
      icon: '📚',
    },
    {
      title: 'Report an Incident',
      swahili: 'Ripoti Tukio',
      description: 'Submit a confidential report anonymously or with your details. Our team works with trusted partners to ensure your case is handled safely.',
      link: '/report',
      linkText: 'Make a report',
      className: 'card-report',
      icon: '📋',
    },
    {
      title: 'Find Resources',
      swahili: 'Pata Rasilimali',
      description: 'Search shelters, legal aid, police contacts, mental health services, and government helplines near you across Kenya.',
      link: '/resources',
      linkText: 'Find help nearby',
      className: 'card-resources',
      icon: '🗺️',
    },
    {
      title: 'Volunteer',
      swahili: 'Jitolee',
      description: 'Join our network of dedicated volunteers across Kenya. Help survivors, raise awareness, and make a real difference in your community.',
      link: '/volunteers',
      linkText: 'Get involved',
      className: 'card-volunteers',
      icon: '🤝',
    },
    {
      title: 'Donate',
      swahili: 'Changia',
      description: 'Your contribution funds shelters, legal aid, counselling services, and awareness campaigns that protect survivors across Kenya.',
      link: '/donate',
      linkText: 'Support the cause',
      className: 'card-donate',
      icon: '❤️',
    },
  ]

  return (
    <section className="sections-preview">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        How can we help you today?
      </motion.h2>
      <motion.p
        className="subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: true }}
      >
        Tunawezaje kukusaidia leo?
      </motion.p>
      <div className="cards-grid">
        {cards.map((card, index) => (
          <motion.div
            className={`section-card ${card.className}`}
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
          >
            <div className="card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <div className="sw-label">{card.swahili}</div>
            <p>{card.description}</p>
            <Link to={card.link} className="card-link">{card.linkText} →</Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default SectionCards