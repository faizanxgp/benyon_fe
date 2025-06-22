import React, {useState} from "react";
import { Head, Icon } from "../../componenets";
import { Link } from "react-router-dom";

import { Menu } from "@headlessui/react";
import { usePopper } from 'react-popper';
import { useTheme } from "../../layout/context";

const LanguageDropdown = ({className}) => {
    const theme = useTheme();
    let [dropdownToggle, setDropdownToggle] = useState()
    let [dropdownContent, setDropdownContent] = useState()
    let { styles, attributes } = usePopper(dropdownToggle, dropdownContent, {
        placement : theme.direction === "rtl" ? "bottom-start" : "bottom-end",
        modifiers: [
            {name: 'offset', options: { offset: [0, 0]}},
            {name: 'preventOverflow', options: { padding: 8 }},
        ],
    })
  return (
    <Menu as="div" className={`inline-flex relative ${className ? className : ''}`}>
        {({ open }) => (
            <>
                <Menu.Button as='div' className={`inline-flex${open ? ' active' : ''}`} ref={setDropdownToggle}>
                    <button className="inline-flex items-center text-xs leading-none whitespace-nowrap transition-all duration-300 font-normal font-body text-primary-600 hover:text-primary-700 py-2 px-3">
                        <span>English</span> 
                        <Icon className="text-sm ms-1" name="chevron-up" />
                    </button>
                </Menu.Button>
                <Menu.Items modal={false} ref={setDropdownContent} style={styles.popper} {...attributes.popper} className="absolute border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-md shadow z-[1000] min-w-[140px]">
                    <ul>
                        <li className="first:rounded-t-md last:rounded-b-md first:border-t-0 border-t border-gray-200 dark:border-gray-800">
                            <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300">
                                <img src="/images/flags/english.png" alt="" className="w-6 me-3" />
                                <span>English</span>
                            </Menu.Item>
                        </li>
                        <li className="first:rounded-t-md last:rounded-b-md first:border-t-0 border-t border-gray-200 dark:border-gray-800">
                            <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300">
                                <img src="/images/flags/spanish.png" alt="" className="w-6 me-3" />
                                <span>Español</span>
                            </Menu.Item>
                        </li>
                        <li className="first:rounded-t-md last:rounded-b-md first:border-t-0 border-t border-gray-200 dark:border-gray-800">
                            <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300">
                                <img src="/images/flags/french.png" alt="" className="w-6 me-3" />
                                <span>Français</span>
                            </Menu.Item>
                        </li>
                        <li className="first:rounded-t-md last:rounded-b-md first:border-t-0 border-t border-gray-200 dark:border-gray-800">
                            <Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300">
                                <img src="/images/flags/turkey.png" alt="" className="w-6 me-3" />
                                <span>Türkçe</span>
                            </Menu.Item>
                        </li>
                    </ul>
                </Menu.Items>
            </>
        )}
    </Menu>
  )
}

const SuccessV2Page = () => {
  return (
    <>
        <Head title="Success v2" />
        <div className="relative flex min-h-screen">
            <div className="relative flex flex-col min-h-full bg-white dark:bg-gray-950 w-full flex-shrink-0">
                <div className="m-auto w-full max-w-[420px] xs:max-w-[520px] p-5">
                    <div className="relative flex justify-start flex-shrink-0 pb-11">
                    <Link to="/" className="relative inline-block transition-opacity duration-300 h-10">
                        <img className="h-full opacity-0 dark:opacity-100" src="/logo.png" srcSet="/logo2x.png 2x" alt="logo" />
                        <img className="h-full opacity-100 dark:opacity-0 absolute start-0 top-0" src="/logo-dark.png" srcSet="/logo-dark2x.png 2x" alt="logo" />
                    </Link>
                    </div>
                    <div className="pb-5">
                    <h5 className="text-xl font-heading font-bold -tracking-snug text-slate-700 dark:text-white leading-tighter mb-2">Thank you for submitting form</h5>
                    <p className="text-sm leading-6 text-green-600">You can now sign in with your new password</p>
                </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 py-6 px-5.5">
                    <div className="container max-w-7xl">
                        <div className="flex flex-wrap -m-2">
                            <div className="w-full lg:w-1/2 p-2 lg:order-last">
                            <ul className="flex flex-wrap justify-center lg:justify-end -m-3 relative">
                                <li>
                                    <Link className="inline-flex text-sm leading-none whitespace-nowrap transition-all duration-300 font-normal font-body text-primary-600 hover:text-primary-700 p-3" to="/terms-policy">Terms &amp; Condition</Link>
                                </li>
                                <li>
                                    <Link className="inline-flex text-sm leading-none whitespace-nowrap transition-all duration-300 font-normal font-body text-primary-600 hover:text-primary-700 p-3" to="/terms-policy">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link className="inline-flex text-sm leading-none whitespace-nowrap transition-all duration-300 font-normal font-body text-primary-600 hover:text-primary-700 p-3" to="/faqs">Help</Link>
                                </li>
                                <li>
                                    <LanguageDropdown />
                                </li>
                            </ul>
                            </div>                            <div className="w-full lg:w-1/2 p-2">
                                <p className="text-slate-400 text-center lg:text-start text-sm/4">&copy; 2025 Beynon Sports. Built by <a href="https://www.innovativelabs.us" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 transition-all duration-300">Innovative Labs</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};
export default SuccessV2Page;
