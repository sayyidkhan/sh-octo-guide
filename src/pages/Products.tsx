export function Products() {
  const products = [
    {
      id: 1,
      name: 'Sample Product 1',
      description: 'Premium wellness product designed for optimal health',
      benefits: ['Boosts energy', 'Improves focus', 'Supports immune system'],
      dosage: 'Take 1-2 servings daily',
      howToTake: 'Mix with water or your favorite beverage',
    },
    {
      id: 2,
      name: 'Sample Product 2',
      description: 'Advanced formula for overall wellness',
      benefits: ['Natural ingredients', 'Supports metabolism', 'Enhances vitality'],
      dosage: 'Take 1 serving in the morning',
      howToTake: 'Best taken on an empty stomach',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-dark-text mb-4">
          Our Products
        </h1>
        <p className="text-lg text-dark-text/70">
          Discover our premium wellness products and how they can transform your health
        </p>
      </div>

      <div className="space-y-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-wellness p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-heading font-bold text-dark-text mb-3">
              {product.name}
            </h2>
            <p className="text-dark-text/80 mb-6">{product.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Benefits */}
              <div>
                <h3 className="text-lg font-heading font-semibold text-dark-text mb-3">
                  Benefits
                </h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-dark-text/70">
                      <span className="text-primary mt-1">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Usage Instructions */}
              <div>
                <h3 className="text-lg font-heading font-semibold text-dark-text mb-3">
                  How to Use
                </h3>
                <div className="space-y-3 text-dark-text/70">
                  <div>
                    <span className="font-medium text-dark-text">Dosage:</span>{' '}
                    {product.dosage}
                  </div>
                  <div>
                    <span className="font-medium text-dark-text">How to Take:</span>{' '}
                    {product.howToTake}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-secondary/10 rounded-wellness p-6 border border-secondary/20">
        <h3 className="text-lg font-heading font-semibold text-dark-text mb-2">
          Need More Information?
        </h3>
        <p className="text-sm text-dark-text/70">
          Have questions about our products? Contact your upline or reach out through our social channels for personalized guidance.
        </p>
      </div>
    </div>
  );
}

