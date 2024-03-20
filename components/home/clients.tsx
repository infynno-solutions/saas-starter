import Image from 'next/image'

const Clients = () => {
  return (
    <div className="bg-white py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Trusted by the world’s most innovative teams
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <Image
            alt="Transistor"
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            height={48}
            src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
            width={158}
          />
          <Image
            alt="Reform"
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            height={48}
            src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
            width={158}
          />
          <Image
            alt="Tuple"
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            height={48}
            src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
            width={158}
          />
          <Image
            alt="SavvyCal"
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
            height={48}
            src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
            width={158}
          />
          <Image
            alt="Statamic"
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            height={48}
            src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
            width={158}
          />
        </div>
      </div>
    </div>
  )
}

export default Clients
