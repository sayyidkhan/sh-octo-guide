import { useState } from 'react';

export function Testimonials() {
  const [filter, setFilter] = useState<'all' | 'product' | 'health'>('all');

  // Placeholder testimonials - will be replaced with Google Sheets data
  const testimonials = [
    {
      id: 1,
      author: 'John D.',
      content: 'This product changed my life! I have more energy and feel healthier than ever.',
      product: 'Product 1',
      healthIssue: 'Low Energy',
      tags: ['energy', 'health'],
      status: 'approved',
    },
    {
      id: 2,
      author: 'Sarah M.',
      content: 'Amazing results! Highly recommend to anyone looking to improve their wellness.',
      product: 'Product 2',
      healthIssue: 'General Wellness',
      tags: ['wellness', 'lifestyle'],
      status: 'approved',
    },
  ];

  const filteredTestimonials = testimonials.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'product') return t.product;
    if (filter === 'health') return t.healthIssue;
    return true;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-dark-text mb-4">
          Testimonials
        </h1>
        <p className="text-lg text-dark-text/70">
          Real stories from our community members
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-wellness text-sm font-medium transition-colors cursor-pointer ${
            filter === 'all'
              ? 'bg-primary text-white'
              : 'bg-white text-dark-text hover:bg-neutral-base'
          }`}
        >
          All Testimonials
        </button>
        <button
          onClick={() => setFilter('product')}
          className={`px-4 py-2 rounded-wellness text-sm font-medium transition-colors cursor-pointer ${
            filter === 'product'
              ? 'bg-primary text-white'
              : 'bg-white text-dark-text hover:bg-neutral-base'
          }`}
        >
          By Product
        </button>
        <button
          onClick={() => setFilter('health')}
          className={`px-4 py-2 rounded-wellness text-sm font-medium transition-colors cursor-pointer ${
            filter === 'health'
              ? 'bg-primary text-white'
              : 'bg-white text-dark-text hover:bg-neutral-base'
          }`}
        >
          By Health Issue
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-wellness p-6 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                {testimonial.author[0]}
              </div>
              <div>
                <h3 className="font-semibold text-dark-text">{testimonial.author}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {testimonial.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-dark-text/80 mb-4 italic">"{testimonial.content}"</p>

            <div className="text-sm text-dark-text/60 space-y-1">
              <div><span className="font-medium">Product:</span> {testimonial.product}</div>
              <div><span className="font-medium">Health Focus:</span> {testimonial.healthIssue}</div>
            </div>
          </div>
        ))}
      </div>

      {filteredTestimonials.length === 0 && (
        <div className="text-center py-12 text-dark-text/60">
          No testimonials found for this filter.
        </div>
      )}
    </div>
  );
}

