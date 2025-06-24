import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../layout/main";
import FullScreenLayout from "../layout/full-screen";
import ProtectedRoute from "./ProtectedRoute";
import RootRedirect from "./RootRedirect";
import PublicRoute from "./PublicRoute";

import EcommerceHomepage from "../pages/dashboard/Ecommerce";
import CopywriterHomepage from "../pages/dashboard/Copywriter";
import InvestHomepage from "../pages/dashboard/Invest";
import AnalyticsHomepage from "../pages/dashboard/Analytics";
import CryptoHomepage from "../pages/dashboard/Crypto";
import SalesHomepage from "../pages/dashboard/Sales";

import MessagesPage from "../pages/apps/Messages";
import InboxPage from "../pages/apps/Inbox";
import FileManagerPage from "../pages/apps/FileManager";
import ChatsPage from "../pages/apps/Chats";
import CalendarPage from "../pages/apps/Calendar";

import ProjectsCardPage from "../pages/pre-built/projects/CardView"
import ProjectsListPage from "../pages/pre-built/projects/ListView"

import ProductsListPage from "../pages/pre-built/products/ListView";
import ProductsCardPage from "../pages/pre-built/products/CardView";
import ProductsDetailsPage from "../pages/pre-built/products/Details";

import InvoiceListPage from "../pages/pre-built/invoice/ListView";
import InvoiceDetailsPage from "../pages/pre-built/invoice/Details";
import InvoicePrintPage from "../pages/pre-built/invoice/Print";

import CustomersListPage from "../pages/pre-built/customers/ListView";
import CustomersDetailsPage from "../pages/pre-built/customers/Details";

import KYCListPage from "../pages/pre-built/KYCs/ListView"
import KYCDetailsPage from "../pages/pre-built/KYCs/Details"

import UsersListPage from "../pages/pre-built/users/ListView";
import UsersListCompactPage from "../pages/pre-built/users/ListViewCompact";
import UsersCardPage from "../pages/pre-built/users/CardView";
import UserDetailsPage from "../pages/pre-built/users/Details";
import UserProfilePage from "../pages/pre-built/users/Profile";

import PricingTablePage from "../pages/pre-built/PricingTable";
import ImageGalleryPage from "../pages/pre-built/ImageGallery";

import Error404Page from "../pages/errors/404";
import Error404ModernPage from "../pages/errors/404Modern";
import Error504Page from "../pages/errors/504";
import Error504ModernPage from "../pages/errors/504Modern";

import LoginV2Page from "../pages/auths/LoginV2";
import RegisterV2Page from "../pages/auths/RegisterV2";
import ForgotV2Page from "../pages/auths/ForgotV2";
import SuccessV2Page from "../pages/auths/SuccessV2";

import BlankPage from "../pages/Blank";
import FaqsPage from "../pages/misc/Faqs";
import TermsPolicyPage from "../pages/misc/TermsPolicy";
import RegularV1Page from "../pages/misc/RegularV1";
import RegularV2Page from "../pages/misc/RegularV2";
import TroubleshootLogin from "../pages/misc/TroubleshootLogin";

import ComponentList from "../pages/components";
import NioIconsPage from "../pages/components/NioIcons";
import SvgIconsPage from "../pages/components/SvgIcons";
import ChartJsPage from "../pages/components/ChartJs";
import TailwindConfigPage from "../pages/components/TailwindConfig";

import Alerts from "../pages/components/elements/Alerts";
import Accordions from "../pages/components/elements/Accordions";
import AvatarPage from "../pages/components/elements/Avatars";
import ButtonPage from "../pages/components/elements/Buttons";
import ButtonGroupPage from "../pages/components/elements/ButtonGroup";
import BadgePage from "../pages/components/elements/Badges";
import BreadcrumbPage from "../pages/components/elements/Breadcrumb";
import CardsPage from "../pages/components/elements/Cards";
import DropdownPage from "../pages/components/elements/Dropdowns";
import ModalPage from "../pages/components/elements/Modals";
import PaginationPage from "../pages/components/elements/Paginations";
import PopoverPage from "../pages/components/elements/Popovers";
import ProgressPage from "../pages/components/elements/Progress";
import SpinnerPage from "../pages/components/elements/Spinners";
import TabsPage from "../pages/components/elements/Tabs";
import ToastPage from "../pages/components/elements/Toasts";
import TooltipsPage from "../pages/components/elements/Tooltips";
import TypographyPage from "../pages/components/elements/Typography";

import AdvancedControlPage from "../pages/components/forms/AdvancedControls";
import DateTimePickerPage from "../pages/components/forms/DateTimePicker";
import CheckboxRadioPage from "../pages/components/forms/CheckboxRadio";
import FormElementsPage from "../pages/components/forms/FormElements";
import FormLayoutsPage from "../pages/components/forms/FormLayouts";
import FormUploadPage from "../pages/components/forms/FormUpload";
import FormValidationPage from "../pages/components/forms/FormValidation";
import InputGroupPage from "../pages/components/forms/InputGroup";
import NoUiSliderPage from "../pages/components/forms/NoUiSlider";
import NumberSpinnerPage from "../pages/components/forms/NumberSpinner";

import BasicTablesPage from "../pages/components/tables/BasicTables";
import DataTablesPage from "../pages/components/tables/DataTables";

import CardWidgetsPage from "../pages/components/widgets/CardsWidgets";
import ChartWidgetsPage from "../pages/components/widgets/ChartsWidgets";
import RatingWidgetsPage from "../pages/components/widgets/RatingsWidgets";

import ThemeProvider from "../layout/context/ThemeContext";

import { useLocation } from "react-router";

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>
};

function Router() {
    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <ScrollToTop>
                <Routes>
                    <Route element={<ThemeProvider/>}>
                        <Route element={<FullScreenLayout/>}>
                            <Route path="*" element={<Error404ModernPage />} />
                            <Route path="errors/404-classic" element={<Error404Page />} />
                            <Route path="errors/404-modern" element={<Error404ModernPage />} />
                            <Route path="errors/504-classic" element={<Error504Page />} />
                            <Route path="errors/504-modern" element={<Error504ModernPage />} />                            <Route path="auths/auth-login" element={<PublicRoute><LoginV2Page /></PublicRoute>} />
                            <Route path="auths/auth-login-v2" element={<PublicRoute><LoginV2Page /></PublicRoute>} />
                            <Route path="auths/auth-register" element={<PublicRoute><RegisterV2Page /></PublicRoute>} />
                            <Route path="auths/auth-register-v2" element={<PublicRoute><RegisterV2Page /></PublicRoute>} />
                            <Route path="auths/auth-reset" element={<PublicRoute><ForgotV2Page /></PublicRoute>} />
                            <Route path="auths/auth-reset-v2" element={<PublicRoute><ForgotV2Page /></PublicRoute>} />
                            <Route path="auths/auth-success" element={<PublicRoute><SuccessV2Page /></PublicRoute>} />
                            <Route path="auths/auth-success-v2" element={<PublicRoute><SuccessV2Page /></PublicRoute>} />

                            <Route path="invoice-print/:invoiceId" element={<InvoicePrintPage />}></Route>
                        </Route>                        <Route element={<Layout container/>}>
                            <Route path="product-card" element={<ProtectedRoute><ProductsCardPage /></ProtectedRoute>} />
                            <Route path="product-details/:productId" element={<ProtectedRoute><ProductsDetailsPage /></ProtectedRoute>} />

                            <Route path="customer-details/:customerId" element={<ProtectedRoute><CustomersDetailsPage /></ProtectedRoute>} />
                        </Route>                        <Route element={<Layout/>}>
                            <Route index element={<RootRedirect />} />
                            <Route path="ecommerce" element={<ProtectedRoute><EcommerceHomepage /></ProtectedRoute>} />
                            <Route path="copywriter" element={<ProtectedRoute><CopywriterHomepage /></ProtectedRoute>} />
                            <Route path="sales" element={<ProtectedRoute><SalesHomepage /></ProtectedRoute>} />
                            <Route path="crypto" element={<ProtectedRoute><CryptoHomepage /></ProtectedRoute>} />
                            <Route path="analytics" element={<ProtectedRoute><AnalyticsHomepage /></ProtectedRoute>} />
                            <Route path="invest" element={<ProtectedRoute><InvestHomepage /></ProtectedRoute>} />

                            <Route path="apps-messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
                            <Route path="apps-inbox" element={<ProtectedRoute><InboxPage /></ProtectedRoute>} />
                            <Route path="apps-file-manager" element={<ProtectedRoute><FileManagerPage /></ProtectedRoute>} />
                            <Route path="apps-chats" element={<ProtectedRoute><ChatsPage /></ProtectedRoute>} />
                            <Route path="apps-calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />

                            <Route path="project-card" element={<ProtectedRoute><ProjectsCardPage /></ProtectedRoute>} />
                            <Route path="project-list" element={<ProtectedRoute><ProjectsListPage /></ProtectedRoute>} />

                            <Route path="product-list" element={<ProtectedRoute><ProductsListPage /></ProtectedRoute>} />

                            <Route path="invoice-list" element={<ProtectedRoute><InvoiceListPage /></ProtectedRoute>} />
                            <Route path="invoice-details/:invoiceId" element={<ProtectedRoute><InvoiceDetailsPage /></ProtectedRoute>} />

                            <Route path="user-list-regular" element={<ProtectedRoute><UsersListPage /></ProtectedRoute>} />
                            <Route path="user-list-compact" element={<ProtectedRoute><UsersListCompactPage /></ProtectedRoute>} />
                            <Route path="user-card" element={<ProtectedRoute><UsersCardPage /></ProtectedRoute>} />
                            <Route path="user-details/:userId" element={<ProtectedRoute><UserDetailsPage /></ProtectedRoute>} />
                            <Route path="user-profile-regular" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />

                            <Route path="customer-list" element={<ProtectedRoute><CustomersListPage /></ProtectedRoute>} />

                            <Route path="kyc-list" element={<ProtectedRoute><KYCListPage /></ProtectedRoute>} />
                            <Route path="kyc-details/:userId" element={<ProtectedRoute><KYCDetailsPage /></ProtectedRoute>} />

                            <Route path="pricing-table" element={<ProtectedRoute><PricingTablePage /></ProtectedRoute>} />
                            <Route path="gallery" element={<ProtectedRoute><ImageGalleryPage /></ProtectedRoute>} />

                            <Route path="_blank" element={<ProtectedRoute><BlankPage /></ProtectedRoute>} />
                            <Route path="faqs" element={<ProtectedRoute><FaqsPage /></ProtectedRoute>} />
                            <Route path="terms-policy" element={<ProtectedRoute><TermsPolicyPage /></ProtectedRoute>} />
                            <Route path="regular-v1" element={<ProtectedRoute><RegularV1Page /></ProtectedRoute>} />
                            <Route path="regular-v2" element={<ProtectedRoute><RegularV2Page /></ProtectedRoute>} />
                            <Route path="troubleshoot-login" element={<TroubleshootLogin />} />

                            <Route path="components">
                                <Route index element={<ProtectedRoute><ComponentList /></ProtectedRoute>} />
                                <Route path="elements/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
                                <Route path="elements/accordions" element={<ProtectedRoute><Accordions /></ProtectedRoute>} />
                                <Route path="elements/avatar" element={<ProtectedRoute><AvatarPage /></ProtectedRoute>} />
                                <Route path="elements/badges" element={<ProtectedRoute><BadgePage /></ProtectedRoute>} />
                                <Route path="elements/buttons" element={<ProtectedRoute><ButtonPage /></ProtectedRoute>} />
                                <Route path="elements/buttons-group" element={<ProtectedRoute><ButtonGroupPage /></ProtectedRoute>} />
                                <Route path="elements/breadcrumb" element={<ProtectedRoute><BreadcrumbPage /></ProtectedRoute>} />
                                <Route path="elements/cards" element={<ProtectedRoute><CardsPage /></ProtectedRoute>} />
                                <Route path="elements/list-dropdown" element={<ProtectedRoute><DropdownPage /></ProtectedRoute>} />
                                <Route path="elements/modals" element={<ProtectedRoute><ModalPage /></ProtectedRoute>} />
                                <Route path="elements/pagination" element={<ProtectedRoute><PaginationPage /></ProtectedRoute>} />
                                <Route path="elements/popover" element={<ProtectedRoute><PopoverPage /></ProtectedRoute>} />
                                <Route path="elements/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
                                <Route path="elements/spinner" element={<ProtectedRoute><SpinnerPage /></ProtectedRoute>} />
                                <Route path="elements/tabs" element={<ProtectedRoute><TabsPage /></ProtectedRoute>} />
                                <Route path="elements/toast" element={<ProtectedRoute><ToastPage /></ProtectedRoute>} />
                                <Route path="elements/tooltip" element={<ProtectedRoute><TooltipsPage /></ProtectedRoute>} />
                                <Route path="elements/typography" element={<ProtectedRoute><TypographyPage /></ProtectedRoute>} />
                                
                                <Route path="forms/advanced-controls" element={<ProtectedRoute><AdvancedControlPage /></ProtectedRoute>} />
                                <Route path="forms/datetime-picker" element={<ProtectedRoute><DateTimePickerPage /></ProtectedRoute>} />
                                <Route path="forms/checkbox-radio" element={<ProtectedRoute><CheckboxRadioPage /></ProtectedRoute>} />
                                <Route path="forms/form-elements" element={<ProtectedRoute><FormElementsPage /></ProtectedRoute>} />
                                <Route path="forms/form-layouts" element={<ProtectedRoute><FormLayoutsPage /></ProtectedRoute>} />
                                <Route path="forms/form-validation" element={<ProtectedRoute><FormValidationPage /></ProtectedRoute>} />
                                <Route path="forms/form-upload" element={<ProtectedRoute><FormUploadPage /></ProtectedRoute>} />
                                <Route path="forms/input-group" element={<ProtectedRoute><InputGroupPage /></ProtectedRoute>} />
                                <Route path="forms/nouislider" element={<ProtectedRoute><NoUiSliderPage /></ProtectedRoute>} />
                                <Route path="forms/number-spinner" element={<ProtectedRoute><NumberSpinnerPage /></ProtectedRoute>} />

                                <Route path="tables/basic-table" element={<ProtectedRoute><BasicTablesPage /></ProtectedRoute>} />
                                <Route path="tables/data-table" element={<ProtectedRoute><DataTablesPage /></ProtectedRoute>} />

                                <Route path="widgets/cards" element={<ProtectedRoute><CardWidgetsPage /></ProtectedRoute>} />
                                <Route path="widgets/charts" element={<ProtectedRoute><ChartWidgetsPage /></ProtectedRoute>} />
                                <Route path="widgets/ratings" element={<ProtectedRoute><RatingWidgetsPage /></ProtectedRoute>} />
                             
                                <Route path="chartjs" element={<ProtectedRoute><ChartJsPage /></ProtectedRoute>} />
                                <Route path="nioicon" element={<ProtectedRoute><NioIconsPage /></ProtectedRoute>} />
                                <Route path="svg-icons" element={<ProtectedRoute><SvgIconsPage /></ProtectedRoute>} />
                                <Route path="tailwind-config" element={<ProtectedRoute><TailwindConfigPage /></ProtectedRoute>} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </ScrollToTop>
        </BrowserRouter>
    );
}

export default Router;
