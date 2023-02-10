import { BoltIcon, DevicePhoneMobileIcon, GlobeAltIcon, ScaleIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Quality work done quickly',
    description:
      'Find the right freelancer for your problems and solve it within minutes.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Protected payments, every time',
    description:
      "Always know what you will pay upfront. Your payment isn't released until you approve the work.",
    icon: ScaleIcon,
  },
  {
    name: 'No hidden payments',
    description:
      'There are no hidden payments for any of the products or services',
    icon: BoltIcon,
  },
  {
    name: 'The best for every budget',
    description:
      'Find high-quality services at every price point. No hourly rates, just project-based pricing.',
    icon: DevicePhoneMobileIcon,
  },
]

export default function Detail() {
  return (
    <div className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sm:text-center">
          <h2 className="text-lg font-semibold leading-8 text-indigo-600">HERSEY</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better way to find the best freelancers</p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Here you can get services and products from freelancers of your choice. 
          </p>
        </div>

        <div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
          <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative flex flex-col gap-6 sm:flex-row md:flex-col lg:flex-row">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-900 to-indigo-600 text-white sm:shrink-0">
                  <feature.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <div className="sm:min-w-0 sm:flex-1">
                  <p className="text-lg font-semibold leading-8 text-gray-900">{feature.name}</p>
                  <p className="mt-2 text-base leading-7 text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
