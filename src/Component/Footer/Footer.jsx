import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
<section className="w-full bg-white border-t border-gray-200 py-12">
  <div className="w-full max-w-7xl mx-auto px-4">
    <div className="flex flex-wrap -mx-6">
      <div className="w-full md:w-1/2 lg:w-3/12 px-6 mb-8 md:mb-0">
        <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4">Company</h3>
        <ul className="space-y-3">
          <li>
            <Link className="text-gray-700 hover:text-blue-600 transition" to="/">Features</Link>
          </li>
          <li>
            <Link className="text-gray-700 hover:text-blue-600 transition" to="/">Pricing</Link>
          </li>
          <li>
            <Link className="text-gray-700 hover:text-blue-600 transition" to="/">Affiliate Program</Link>
          </li>
          <li>
            <Link className="text-gray-700 hover:text-blue-600 transition" to="/">Press Kit</Link>
          </li>
        </ul>
      </div>

      <div className="w-full md:w-1/2 lg:w-3/12 px-6 mb-8 md:mb-0">
        <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4">Support</h3>
        <ul className="space-y-3">
          <li>
            <Link className="text-gray-700 hover:text-blue-600 transition" to="/">Account</Link>
          </li>
          <li>
            <Link className="text-gray-700 hover:text-blue-600 transition" to="/">Help</Link>
          </li>
          <li>
            <Link className="text-gray-700 hover:text-blue-600 transition" to="/">Contact Us</Link>
          </li>
          <li>
            <Link className="text-gray-700 hover:text-blue-600 transition" to="/">Customer Support</Link>
          </li>
        </ul>
      </div>

      <div className="w-full md:w-1/2 lg:w-3/12 px-6 mb-8 md:mb-0">
        <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4">Legals</h3>
        <ul className="space-y-3">
          <li>
            <Link className="text-gray-700 hover:text-blue-600 transition" to="/">Terms &amp; Conditions</Link>
          </li>
          <li>
            <Link className="text-gray-700 hover:text-blue-600 transition" to="/">Privacy Policy</Link>
          </li>
          <li>
            <Link className="text-gray-700 hover:text-blue-600 transition" to="/">Licensing</Link>
          </li>
        </ul>
      </div>

      <div className="w-full md:w-1/2 lg:w-3/12 px-6 flex items-end">
        <p className="text-sm text-gray-500">&copy; 2023 DevUI. All Rights Reserved.</p>
      </div>
    </div>
  </div>
</section>


  )
}

export default Footer