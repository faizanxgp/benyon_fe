import React from 'react'
import LanguageDropdown from '../components/LanguageDropdownAlt'

const Footer = () => {

  return (
    <>
        <div className="w-full min-w-[320px] mt-auto border-t bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-900 px-1.5 sm:px-5 py-5">
            <div className="container max-w-none">
                <div className="flex items-center justify-between flex-wrap">                    <div className="text-sm text-slate-500 pb-1 sm:pb-0"> &copy; 2025 Beynon Sports. Built by <a href="https://www.innovativelabs.us" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 transition-all duration-300">Innovative Labs</a>
                    </div>                    <ul className="flex flex-wrap -mx-3.5 -my-2">
                        <li className="inline-flex">
                            <LanguageDropdown />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer