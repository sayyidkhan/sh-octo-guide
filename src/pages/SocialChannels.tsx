export function SocialChannels() {
  const socialLinks = [
    {
      category: 'WhatsApp Groups',
      icon: '💬',
      description: 'Join our WhatsApp community for daily updates and support',
      links: [
        { label: 'Main Community Group', url: '#' },
        { label: 'Training & Tips Group', url: '#' },
      ],
    },
    {
      category: 'Telegram Groups',
      icon: '✈️',
      description: 'Connect with members on Telegram for real-time discussions',
      links: [
        { label: 'Official Telegram Channel', url: '#' },
        { label: 'Member Support Group', url: '#' },
      ],
    },
    {
      category: 'Social Media',
      icon: '📱',
      description: 'Follow us on social media for inspiration and updates',
      links: [
        { label: 'Facebook Page', url: '#' },
        { label: 'Instagram', url: '#' },
        { label: 'YouTube Channel', url: '#' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-dark-text mb-4">
          Social Channels
        </h1>
        <p className="text-lg text-dark-text/70">
          Stay connected with the 13 Gold Diamonds community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialLinks.map((section) => (
          <div key={section.category} className="bg-white rounded-wellness p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{section.icon}</span>
              <h2 className="text-xl font-heading font-semibold text-dark-text">
                {section.category}
              </h2>
            </div>
            <p className="text-sm text-dark-text/70 mb-4">{section.description}</p>
            <div className="space-y-2">
              {section.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 px-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-wellness text-sm font-medium transition-colors"
                >
                  {link.label} →
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-calming-blue/10 rounded-wellness p-6 border border-calming-blue/20">
        <h3 className="text-lg font-heading font-semibold text-dark-text mb-2">
          Community Guidelines
        </h3>
        <ul className="text-sm text-dark-text/70 space-y-1">
          <li>• Be respectful and supportive of fellow members</li>
          <li>• Share your success stories and learnings</li>
          <li>• Ask questions and help others when you can</li>
          <li>• Keep discussions focused on wellness and business growth</li>
        </ul>
      </div>
    </div>
  );
}

