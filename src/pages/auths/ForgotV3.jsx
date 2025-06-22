import React, {useState} from "react";
import { Head, Button, Form, Icon, Input } from "../../componenets";
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
                    <button className="inline-flex items-center text-xs leading-none whitespace-nowrap transition-all duration-300 font-normal font-body text-primary-600 hover:text-primary-700 p-3">
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

const ForgotV3Page = () => {
  return (
    <>
        <Head title="Reset v3" />
        <div className="relative flex flex-wrap lg:flex-nowrap min-h-screen">
            <div className="relative flex flex-col min-h-full bg-white dark:bg-gray-950 w-full lg:w-[45%] flex-shrink-0">
            <div className="m-auto w-full max-w-[420px] p-5 2xl:me-[90px]">
                <div className="relative flex flex-shrink-0 pb-11">
                    <Link to="/" className="relative inline-block transition-opacity duration-300 h-10">
                        <img className="h-full opacity-0 dark:opacity-100" src="/logo.png" srcSet="/logo2x.png 2x" alt="logo" />
                        <img className="h-full opacity-100 dark:opacity-0 absolute start-0 top-0" src="/logo-dark.png" srcSet="/logo-dark2x.png 2x" alt="logo" />
                    </Link>
                </div>
                <div className="pb-5">
                    <h5 className="text-xl font-heading font-bold -tracking-snug text-slate-700 dark:text-white leading-tighter mb-2">Reset password</h5>
                    <p className="text-sm leading-6 text-slate-400">If you forgot your password, well, then we’ll email you instructions to reset your password.</p>
                </div>
                <form action="#">
                    <Form.Group>
                        <Form.Label className="flex justify-between items-center mb-2" htmlFor="emailAddress">
                            <span>Email </span>
                            <a href="#link" onClick={(e)=> e.preventDefault()} className="inline-flex text-xs leading-none whitespace-nowrap transition-all duration-300 font-medium font-body text-primary-500 hover:text-primary-600">Need Help?</a>
                        </Form.Label>
                        <Input.Wrap>
                            <Input id="emailAddress" placeholder="Enter your email address or username" autoComplete="off" size="lg" />
                        </Input.Wrap>
                    </Form.Group>
                    <Form.Group>
                        <Button as="Link" to="/auths/auth-success-v3" size="lg" variant="primary" block>Send Reset Link</Button>
                    </Form.Group>
                </form>
                <div className="pt-6"> 
                    <Link className="text-primary-500 hover:text-primary-600 font-medium transition-all duration-300" to="/auths/auth-login-v3">Return to login</Link>
                </div>
            </div>
            <div className="mx-auto w-full max-w-[420px] px-5 pt-7 pb-10 2xl:me-[90px]">
                <ul className="flex flex-wrap items-center -m-3 relative">
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
                <div className="mt-4.5">
                    <p>&copy; 2025 DashWind. All Rights Reserved.</p>
                </div>
            </div>
            </div>
            <div className="w-full min-h-full flex-shrink flex-grow bg-[linear-gradient(to_right,_#2c3782_calc(60%-150px),_#39469f_calc(60%-150px),_#39469f_60%,_#4856b5_60%,_#4856b5_calc(60%+150px),_#5b6ac6_calc(60%+150px),_#5b6ac6_100%)]"></div>
        </div>
    </>
  );
};
export default ForgotV3Page;
