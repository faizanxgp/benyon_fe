import React, {useState} from "react";
import { Head, Button, Form, Icon, Input } from "../../componenets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginToKeycloak, updateBearerToken } from "../../services/api";

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

const LoginV2Page = () => {
  const [passwordState, setPasswordState] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the intended destination from location state, default to home
  const from = location.state?.from || '/';

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id === 'emailAddress' ? 'username' : id]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Please enter both username and password');
      return;
    }    setIsLoading(true);
    setError('');

    try {
      const response = await loginToKeycloak(formData.username, formData.password);
      
      // Update the bearer token in api.js
      updateBearerToken(response.access_token);
        // Trigger a custom event to notify other components about login
      window.dispatchEvent(new CustomEvent('userLogin', { 
        detail: { token: response.access_token } 
      }));
      
      // Redirect to intended destination or dashboard on successful login
      navigate(from, { replace: true });
      
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 401) {
          setError('Invalid username or password');
        } else {
          setError('Login failed. Please try again.');
        }
      } else if (error.request) {
        // Request was made but no response received
        setError('Network error. Please check your connection.');
      } else {
        // Something else happened
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
        <Head title="Login v2" />
        <div className="relative flex min-h-screen">
            <div className="relative flex flex-col min-h-full bg-white dark:bg-gray-950 w-full flex-shrink-0">
                <div className="m-auto w-full max-w-[420px] xs:max-w-[520px] p-5">                    <div className="relative flex justify-center flex-shrink-0 pb-6">
                    <Link to="/" className="relative inline-block transition-opacity duration-300 h-10">
                        <img className="h-full" src="/beynon.png" alt="Beynon Sports" />
                    </Link>
                    </div>
                    <div className="border border-gray-300 dark:border-gray-900 rounded p-5 sm:p-6 md:p-10">                    <div className="pb-5">
                        <h5 className="text-xl font-heading font-bold -tracking-snug text-slate-700 dark:text-white leading-tighter mb-2">Sign-In</h5>
                        <p className="text-sm leading-6 text-slate-400">Access the Beynon Dashboard panel using your email and password.</p>
                    </div>
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>                        <Form.Group>
                            <Form.Label className="flex justify-between items-center mb-2" htmlFor="emailAddress">
                                <span>Email</span>
                            </Form.Label>
                            <Input.Wrap>
                                <Input 
                                    id="emailAddress" 
                                    placeholder="Enter your email address" 
                                    autoComplete="off" 
                                    size="lg"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                            </Input.Wrap>
                        </Form.Group>                        <Form.Group>
                            <Form.Label className="flex justify-between items-center mb-2" htmlFor="password">
                                <span>Password</span>
                                <Link to="/auths/auth-reset-v2" className="inline-flex text-xs leading-none whitespace-nowrap transition-all duration-300 font-medium font-body text-primary-500 hover:text-primary-600">Forgot Password?</Link>
                            </Form.Label>
                            <Input.Wrap>
                                <a tabIndex="-1" href="#password" onClick={(ev) => {
                                    ev.preventDefault();
                                    setPasswordState(!passwordState);
                                    }} className={`absolute h-11 w-11 top-0 end-0 flex items-center justify-center js-password-toggle group/password ${passwordState ? "" : "is-shown"}`}>
                                    <em className="group-[.is-shown]/password:hidden text-slate-400 text-base leading-none ni ni-eye"></em>
                                    <em className="hidden group-[.is-shown]/password:block text-slate-400 text-base leading-none ni ni-eye-off"></em>
                                </a>                                <Input 
                                    id="password" 
                                    type={passwordState ? "text" : "password"} 
                                    placeholder="Enter your password" 
                                    autoComplete="off" 
                                    size="lg"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                            </Input.Wrap>
                        </Form.Group>
                        <Form.Group>
                            <Button 
                                type="submit" 
                                size="lg" 
                                variant="primary" 
                                block
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </Form.Group>
                    </form>
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
                                <p className="text-slate-400 text-center lg:text-start text-sm/4">&copy; 2025 Beynon Sports. Built by <a href="https://www.innovativelabs.com" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-600 transition-all duration-300">Innovative Labs</a>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};
export default LoginV2Page;
