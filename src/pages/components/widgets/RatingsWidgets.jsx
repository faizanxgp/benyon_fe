import React, { useRef, useState } from 'react'
import { Head, Block, Card, Button, Progress, Form, Input, TextArea } from '../../../componenets'
import {Avatar} from "../../../componenets";
import { toInitials } from '../../../utilities';
import slideUp from '../../../utilities/slideUp';
import slideDown from '../../../utilities/slideDown';


const RatingWidgetsPage = () => {
   
    const refs = {
        designer: useRef(null),
        developer: useRef(null),
        institute: useRef(null),
    };
    
    const [visibilityState, setVisibilityState] = useState({
        designer: false,
        developer: false,
        institute: false,
      });


    const handleToggle = (section) => {
        if (refs[section].current) {
          const isVisible = visibilityState[section];
          isVisible ? slideUp(refs[section].current, 500) : slideDown(refs[section].current, 500);
          
          setVisibilityState((prevState) => ({
            ...prevState,
            [section]: !isVisible,
          }));
        }
    };


  return (
    <>
        <Head title="Ratings Widgets" />
        <div className="lg:max-w-[960px] mx-auto">
            <Block.PageHead className="md:max-w-[720px]">
                <Block.Back to="/components">Components</Block.Back>
                <Block.TitleLg>Card Style for Ratings</Block.TitleLg>
                <Block.LeadText>Use ratings card with variant for an invaluable source of feedback.</Block.LeadText>
            </Block.PageHead>

            <Block>
                <Block.Head>
                    <Block.Title>Rating card</Block.Title>
                </Block.Head>
                <Card>
                    <Card.Body>
                        <div className="grid grid-cols-12 gap-7">
                            <div className="col-span-12 md:col-span-5 ">
                                <div className="border rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                                    <div className="p-5 sm:p-6">
                                        <div className="flex flex-col items-center text-center p-2">
                                            <div className="relative flex-shrink-0 flex items-center justify-center text-sm text-white bg-cyan-600  rounded-full font-medium">
                                            <Avatar size="xl" rounded text={toInitials("Joe Larson")} status="active"/>
                                            </div>
                                            <div className="mt-5">
                                                <h6 className="text-base text-slate-700 dark:text-white font-bold font-heading leading-tighter mb-2">Joe Larson</h6>
                                                <span className="text-sm text-slate-400">@Larson</span>
                                            </div>
                                        </div>
                                        <ul className="flex gap-1 mt-1 text-yellow-600 justify-center text-base">
                                            <li><em className="icon ni ni-star-fill"></em></li>
                                            <li><em className="icon ni ni-star-fill"></em></li>
                                            <li><em className="icon ni ni-star-fill"></em></li>
                                            <li><em className="icon ni ni-star-half-fill"></em></li>
                                            <li><em className="icon ni ni-star"></em></li>
                                        </ul>
                                        <div className="pt-2 text-center mx-auto max-w-[200px]">
                                            <p>I am an UI/UX Designer and Love to be creative.</p>
                                        </div>
                                        <ul className="flex justify-around text-center pt-4 pb-6 w-full">
                                            <li className="px-2">
                                                <span className="text-lg text-slate-800 dark:text-white block">213</span>
                                                <span className="text-sm leading-6 text-slate-400 block">Projects</span>
                                            </li>
                                            <li className="px-2">
                                                <span className="text-lg text-slate-800 dark:text-white block">87.5%</span>
                                                <span className="text-sm leading-6 text-slate-400 block">Performed</span>
                                            </li>
                                            <li className="px-2">
                                                <span className="text-lg text-slate-800 dark:text-white block">587</span>
                                                <span className="text-sm leading-6 text-slate-400 block">Tasks</span>
                                            </li>
                                        </ul>
                                        <div className="flex justify-center pb-1">
                                            <Button as="Link" to={`/user-details/id`} size="rg" variant="white-outline" pill className="min-w-[150px] justify-center"><span>View Profile</span></Button>
                                        </div>
                                    </div>
                                </div>
                            </div> {/* Col end */}

                            <div className="col-span-12 md:col-span-5 ">
                                <div className="border rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                                    <div className="p-5 sm:p-6">
                                        <h5 className="text-xl leading-tighter text-center font-bold font-heading text-slate-700 dark:text-white mb-3">Design Quality</h5>
                                        <div className="flex flex-col items-center text-center p-2">
                                            <div className="relative flex-shrink-0 flex items-center justify-center text-sm text-white bg-green-600  rounded-full font-medium">
                                            <Avatar size="xl" rounded text="4.5" status="active"/>
                                            </div>
                                        </div>
                                        <ul className="flex gap-1 mt-1 text-yellow-600 justify-center text-base">
                                            <li><em className="icon ni ni-star-fill"></em></li>
                                            <li><em className="icon ni ni-star-fill"></em></li>
                                            <li><em className="icon ni ni-star-fill"></em></li>
                                            <li><em className="icon ni ni-star-fill"></em></li>
                                            <li><em className="icon ni ni-star-half-fill"></em></li>
                                        </ul>
                                        <div className="pt-2 text-center mx-auto max-w-[200px]">
                                            <p>108 Ratings</p>
                                        </div>
                                        <div className="pt-4 ">
                                            <div className="flex items-center justify-between gap-4 text-slate-400 py-2">
                                                <div className="text-sm w-fit whitespace-nowrap">5 star</div>
                                                <div className="flex h-1.5 w-full rounded-sm bg-slate-50 dark:bg-slate-900 overflow-hidden">
                                                    <Progress className="rounded-sm w-full">
                                                        <Progress.Bar progress="72%" variant="green"/>
                                                    </Progress>
                                                </div>
                                                <div className="text-xs">72%</div>
                                            </div>
                                            <div className="flex items-center justify-between gap-4 text-slate-400 py-2">
                                                <div className="text-sm w-fit whitespace-nowrap">4 star</div>
                                                <div className="flex h-1.5 w-full rounded-sm bg-slate-50 dark:bg-slate-900 overflow-hidden">
                                                    <Progress className="rounded-sm w-full">
                                                        <Progress.Bar progress="58%" variant="indigo" />
                                                    </Progress>
                                                </div>
                                                <div className="text-xs">58%</div>
                                            </div>
                                            <div className="flex items-center justify-between gap-4 text-slate-400 py-2">
                                                <div className="text-sm w-fit whitespace-nowrap">3 star</div>
                                                <div className="flex h-1.5 w-full rounded-sm bg-slate-50 dark:bg-slate-900 overflow-hidden">
                                                    <Progress className="rounded-sm w-full">
                                                        <Progress.Bar progress="34%" variant="cyan" />
                                                    </Progress>
                                                </div>
                                                <div className="text-xs">34%</div>
                                            </div>
                                            <div className="flex items-center justify-between gap-4 text-slate-400 py-2">
                                                <div className="text-sm w-fit whitespace-nowrap">2 star</div>
                                                <div className="flex h-1.5 w-full rounded-sm bg-slate-50 dark:bg-slate-900 overflow-hidden">
                                                    <Progress className="rounded-sm w-full">
                                                        <Progress.Bar progress="18%" variant="yellow" />
                                                    </Progress>
                                                </div>
                                                <div className="text-xs">18%</div>
                                            </div>
                                            <div className="flex items-center justify-between gap-4 text-slate-400 pt-2">
                                                <div className="text-sm w-fit whitespace-nowrap">1 star</div>
                                                <div className="flex h-1.5 w-full rounded-sm bg-slate-50 dark:bg-slate-900 overflow-hidden">
                                                    <Progress className="rounded-sm w-full">
                                                        <Progress.Bar progress="55%" variant="red" />
                                                    </Progress>
                                                </div>
                                                <div className="text-xs">55%</div>
                                            </div>
                                        </div>
                                       
                                       
                                    </div>
                                </div>
                            </div> {/* Col end */}
                        </div>  
                    </Card.Body>
                </Card>
            </Block> {/* Block end */}

            <Block>
                <Block.Head>
                    <Block.Title>Customer Review</Block.Title>
                </Block.Head>
                <Card>
                    <Card.Body>
                        <div className="grid grid-cols-12 gap-7">
                            <div className="col-span-12 md:col-span-6 lg:col-span-4 ">
                                <div className="border rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                                    <div className="p-5 sm:p-6">
                                        <h5 className="text-xl leading-tighter text-center font-bold font-heading text-slate-700 dark:text-white mb-3">Customer Review</h5>
                                        <div className="flex items-center justify-center gap-3 mx-auto w-fit bg-gray-200 dark:bg-gray-1000 rounded-full px-4 py-2 my-2">
                                            <ul className="flex gap-1 text-yellow-600 justify-center text-base">
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-half-fill"></em></li>
                                                <li><em className="icon ni ni-star"></em></li>
                                            </ul>
                                            <div className="text-center mx-auto">
                                                <p>3.5 out of 5</p>
                                            </div>
                                        </div>
                                        <div className="pt-2 text-center mx-auto max-w-[200px]">
                                            <span className="text-sm text-slate-400">40 customers ratings</span>
                                        </div>
                                        <div className="pt-4 ">
                                            <div className="flex items-center justify-between gap-4 text-slate-400 py-2">
                                            <div className="text-sm w-fit whitespace-nowrap">5 star</div>
                                                <div className="flex h-1.5 w-full rounded-sm bg-slate-50 dark:bg-slate-900 overflow-hidden">
                                                    <Progress className="rounded-sm w-full">
                                                        <Progress.Bar progress="62%" />
                                                    </Progress>
                                                </div>
                                                <div className="text-xs">62%</div>
                                            </div>
                                            <div className="flex items-center justify-between gap-4 text-slate-400 py-2">
                                            <div className="text-sm w-fit whitespace-nowrap">4 star</div>
                                                <div className="flex h-1.5 w-full rounded-sm bg-slate-50 dark:bg-slate-900 overflow-hidden">
                                                    <Progress className="rounded-sm w-full">
                                                        <Progress.Bar progress="47%"/>
                                                    </Progress>
                                                </div>
                                                <div className="text-xs">47%</div>
                                            </div>
                                            <div className="flex items-center justify-between gap-4 text-slate-400 py-2">
                                            <div className="text-sm w-fit whitespace-nowrap">3 star</div>
                                                <div className="flex h-1.5 w-full rounded-sm bg-slate-50 dark:bg-slate-900 overflow-hidden">
                                                    <Progress className="rounded-sm w-full">
                                                        <Progress.Bar progress="24%"/>
                                                    </Progress>
                                                </div>
                                                <div className="text-xs">24%</div>
                                            </div>
                                            <div className="flex items-center justify-between gap-4 text-slate-400 py-2">
                                            <div className="text-sm w-fit whitespace-nowrap">2 star</div>
                                                <div className="flex h-1.5 w-full rounded-sm bg-slate-50 dark:bg-slate-900 overflow-hidden">
                                                    <Progress className="rounded-sm w-full">
                                                        <Progress.Bar progress="30%" />
                                                    </Progress>
                                                </div>
                                                <div className="text-xs">30%</div>
                                            </div>
                                            <div className="flex items-center justify-between gap-4 text-slate-400 pt-2">
                                            <div className="text-sm w-fit whitespace-nowrap">1 star</div>
                                                <div className="flex h-1.5 w-full rounded-sm bg-slate-50 dark:bg-slate-900 overflow-hidden">
                                                    <Progress className="rounded-sm w-full">
                                                        <Progress.Bar progress="40%"/>
                                                    </Progress>
                                                </div>
                                                <div className="text-xs">40%</div>
                                            </div>
                                        </div>
                                       
                                       
                                    </div>
                                </div>
                            </div> {/* Col end */}

                            <div className="col-span-12 md:col-span-6 ">
                                <div className="border rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                                    <div className="p-5 sm:p-6 flex items-center gap-6">
                                        <div>
                                            <h1 className="text-6xl leading-tighter text-center font-normal font-heading text-slate-700 dark:text-white mb-2">4.4</h1>
                                            <div className="flex items-center justify-center gap-3 mx-auto ">
                                                <ul className="flex gap-1 text-yellow-600 justify-center text-base">
                                                    <li><em className="icon ni ni-star-fill"></em></li>
                                                    <li><em className="icon ni ni-star-fill"></em></li>
                                                    <li><em className="icon ni ni-star-fill"></em></li>
                                                    <li><em className="icon ni ni-star-half-fill"></em></li>
                                                    <li><em className="icon ni ni-star"></em></li>
                                                </ul>
                                            </div>
                                        
                                            <div className="pt-2 text-center mx-auto max-w-[200px]">
                                                <span className="text-sm text-slate-400"><em className="icon ni ni-users-fill me-1"></em>47,860 Total</span>
                                            </div>
                                        </div>
                                        <div className="pt-4 w-full">
                                            <div className="flex items-center gap-4 text-slate-400 py-2">
                                                <div className="text-sm">5</div>
                                                <Progress className="rounded-sm w-full h-4">
                                                    <Progress.Bar progress="70%" variant="green"/>
                                                </Progress>
                                            </div>
                                            <div className="flex items-center gap-4 text-slate-400 py-2">
                                                <div className="text-sm">4</div>
                                                <Progress className="rounded-sm w-full h-4">
                                                    <Progress.Bar progress="55%" variant="indigo"/>
                                                </Progress>
                                            </div>
                                            <div className="flex items-center gap-4 text-slate-400 py-2">
                                                <div className="text-sm">3</div>
                                                <Progress className="rounded-sm w-full h-4">
                                                    <Progress.Bar progress="38%" variant="cyan"/>
                                                </Progress>
                                            </div>
                                            <div className="flex items-center gap-4 text-slate-400 py-2">
                                                <div className="text-sm">2</div>
                                                <Progress className="rounded-sm w-full h-4">
                                                    <Progress.Bar progress="15%" variant="yellow"/>
                                                </Progress>
                                            </div>
                                            <div className="flex items-center gap-4 text-slate-400 pt-2">
                                                <div className="text-sm">1</div>
                                                <Progress className="rounded-sm w-full h-4">
                                                    <Progress.Bar progress="30%" variant="red"/>
                                                </Progress>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> {/* Col end */}
                        </div>  
                    </Card.Body>
                </Card>
            </Block> {/* Block end */}

            <Block>
                <Block.Head>
                    <Block.Title>User Profile</Block.Title>
                </Block.Head>
                <Card>
                    <Card.Body>
                        <div className="grid grid-cols-12 gap-7">
                            <div className="col-span-12 md:col-span-6">
                                <div className="border rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                                    <div className="p-5 sm:p-6">
                                        <h4 className="text-2xl leading-tighter font-bold font-heading text-slate-700 dark:text-white mb-2">UI/UX Designer at Google</h4>
                                        <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                            <li><em className="icon ni ni-star-fill"></em></li>
                                            <li><em className="icon ni ni-star-fill"></em></li>
                                            <li><em className="icon ni ni-star-fill"></em></li>
                                            <li><em className="icon ni ni-star-half-fill"></em></li>
                                            <li><em className="icon ni ni-star"></em></li>
                                        </ul>
                                        <div className="flex items-end justify-between">
                                            <ul className="pt-2 gy-2">
                                                <li><em className="icon ni ni-map-pin me-1"></em>60311 Frankfurt am Main, Italy</li>
                                                <li><em className="icon ni ni-calender-date me-1"></em>28th Sept, 2021</li>
                                                <li><em className="icon ni ni-briefcase me-1"></em>Fulltime</li>
                                            </ul>
                                            <span className="relative inline-flex rounded-full px-3 py-1 border border-cyan-300 dark:border-cyan-800 bg-cyan-100 dark:bg-cyan-950 text-cyan-600 text-xxs text-center font-medium leading-4.5 tracking-snug whitespace-nowrap align-middle">$1550.00</span>
                                        </div>
                                        
                                        <div ref={refs.designer} className={`pt-7 ${visibilityState.designer ? 'block' : 'hidden'}`}>
                                            <div className="border border-gray-200 dark:border-gray-900 mb-7"></div>
                                            <div className="rating-card-description">
                                                <h5 className="text-xl font-medium -tracking-snug text-slate-700 dark:text-white leading-tighter mb-3">Description</h5>
                                                <p className="text-slate-500 mb-4">Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title bulk.</p>
                                                <ul className="pt-2 gy-1">
                                                    <li className="py-1"><em className="icon ni ni-check-circle text-primary-600 me-1"></em><span className="text-slate-400">30 days off</span></li>
                                                    <li className="py-1"><em className="icon ni ni-check-circle text-primary-600 me-1"></em><span className="text-slate-400">Free drinks</span></li>
                                                    <li className="py-1"><em className="icon ni ni-check-circle text-primary-600 me-1"></em><span className="text-slate-400">Paid leave</span></li>
                                                    <li className="py-1"><em className="icon ni ni-check-circle text-primary-600 me-1"></em><span className="text-slate-400">Healthcare</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-5 py-3 flex items-center justify-between bg-gray-200 dark:bg-gray-1000 border-t rounded-b-md border-gray-300 dark:border-gray-900"> 
                                        <a className="font-medium text-gray-500 cursor-pointer" onClick={() => handleToggle('designer')}>
                                            <span>{visibilityState.designer ? 'Less info' : 'More info'}</span>
                                            <em className={`icon ni ni-${visibilityState.designer ? 'upword' : 'downward'}-ios ms-3 font-bold text-base`}></em>
                                        </a>
                                        <a href="#" className="btn bg-primary-600 text-white px-5 py-2 rounded-md font-medium">Apply</a>
                                    </div>
                                </div>
                            </div> {/* Col end */}

                            <div className="col-span-12 md:col-span-6">
                                <div className="border rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                                    <div className="p-5 sm:p-6">
                                        <h4 className="text-2xl leading-tighter font-bold font-heading text-slate-700 dark:text-white mb-2">Developer at Google</h4>
                                        <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                            <li><em className="icon ni ni-star-fill"></em></li>
                                            <li><em className="icon ni ni-star-fill"></em></li>
                                            <li><em className="icon ni ni-star-fill"></em></li>
                                            <li><em className="icon ni ni-star-half-fill"></em></li>
                                            <li><em className="icon ni ni-star"></em></li>
                                        </ul>
                                        <div className="flex items-end justify-between">
                                            <ul className="pt-2 gy-2">
                                                <li><em className="icon ni ni-map-pin me-1"></em>60311 Frankfurt am Main, Italy</li>
                                                <li><em className="icon ni ni-calender-date me-1"></em>28th Sept, 2021</li>
                                                <li><em className="icon ni ni-briefcase me-1"></em>Fulltime</li>
                                            </ul>
                                            <span className="relative inline-flex rounded-full px-3 py-1 border border-cyan-300 dark:border-cyan-800 bg-cyan-100 dark:bg-cyan-950 text-cyan-600 text-xxs text-center font-medium leading-4.5 tracking-snug whitespace-nowrap align-middle">$1550.00</span>
                                        </div>

                                        <div ref={refs.developer} className={`pt-7 ${visibilityState.developer ? 'block' : 'hidden'}`}>
                                            <div className="border border-gray-200 dark:border-gray-900 mb-7"></div>
                                            <div className="rating-card-description">
                                                <h5 className="text-xl font-medium -tracking-snug text-slate-700 dark:text-white leading-tighter mb-3">Description</h5>
                                                <p className="text-slate-500 mb-4">Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title bulk.</p>
                                                <ul className="pt-2 gy-1">
                                                    <li className="py-1"><em className="icon ni ni-check-circle text-primary-600 me-1"></em><span className="text-slate-400">30 days off</span></li>
                                                    <li className="py-1"><em className="icon ni ni-check-circle text-primary-600 me-1"></em><span className="text-slate-400">Free drinks</span></li>
                                                    <li className="py-1"><em className="icon ni ni-check-circle text-primary-600 me-1"></em><span className="text-slate-400">Paid leave</span></li>
                                                    <li className="py-1"><em className="icon ni ni-check-circle text-primary-600 me-1"></em><span className="text-slate-400">Healthcare</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-5 py-3 flex items-center justify-between bg-gray-200 dark:bg-gray-1000 border-t rounded-b-md border-gray-300 dark:border-gray-900">
                                        <a className="font-medium text-gray-500 cursor-pointer" onClick={() => handleToggle('developer')}>
                                            <span>{visibilityState.developer ? 'Less info' : 'More info'}</span>
                                            <em className={`icon ni ni-${visibilityState.developer ? 'upword' : 'downward'}-ios ms-3 font-bold text-base`}></em>
                                        </a>
                                        <a href="#" className="btn bg-primary-600 text-white px-5 py-2 rounded-md font-medium">Apply</a>
                                    </div>

                                    {/*  */}
                                </div>
                            </div> {/* Col end */}
                        </div>  
                    </Card.Body>
                </Card>
            </Block> {/* Block end */}
        
            <Block>
                <Block.Head>
                    <Block.Title>Institute Profile</Block.Title>
                </Block.Head>
                <Card>
                    <Card.Body>
                        <div className="grid grid-cols-12 gap-7">
                            <div className="col-span-12 md:col-span-6">
                                <div className="border rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                                    {/*  */}
                                    <div className="p-5 sm:p-6">
                                        <h4 className="text-2xl leading-tighter font-bold font-heading text-slate-700 dark:text-white mb-2">Softnio</h4>
                                        <div className="flex items-end justify-between">
                                            <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-half-fill"></em></li>
                                                <li><em className="icon ni ni-star"></em></li>
                                            </ul>
                                            <span className="relative inline-flex rounded-full px-3 py-1 border border-cyan-300 dark:border-cyan-800 bg-cyan-100 dark:bg-cyan-950 text-cyan-600 text-xxs text-center font-medium leading-4.5 tracking-snug whitespace-nowrap align-middle">$1550.00</span>
                                        </div>
                                        <h5 className="text-xl font-medium -tracking-snug text-slate-700 dark:text-white leading-tighter  mt-6 mb-3">Criteria on Softnio</h5>
                                        <div className="flex justify-between py-2">
                                            <span className="text-slate-400">Productivity</span>
                                            <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                            </ul>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span className="text-slate-400">Competitive Position</span>
                                            <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star"></em></li>
                                            </ul>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span className="text-slate-400">Brand Value</span>
                                            <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                            </ul>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <span className="text-slate-400">Environment</span>
                                            <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star"></em></li>
                                            </ul>
                                        </div>
                                        
                                        <div ref={refs.institute} className={`pt-7 ${visibilityState.institute ? 'block' : 'hidden'}`}>
                                            <div className="border-t border-gray-200 dark:border-gray-900 mb-7"></div>
                                            <div className="rating-card-description">
                                                <h5 className="text-xl font-medium -tracking-snug text-slate-700 dark:text-white leading-tighter mb-3">Description</h5>
                                                <p className="text-slate-500 mb-4">Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title bulk.</p>
                                                <ul className="pt-2 py-1">
                                                    <li className="py-1"><em className="icon ni ni-check-circle text-primary-600 me-1"></em><span className="text-slate-400">30 days off</span></li>
                                                    <li className="py-1"><em className="icon ni ni-check-circle text-primary-600 me-1"></em><span className="text-slate-400">Free drinks</span></li>
                                                    <li className="py-1"><em className="icon ni ni-check-circle text-primary-600 me-1"></em><span className="text-slate-400">Paid leave</span></li>
                                                    <li className="py-1"><em className="icon ni ni-check-circle text-primary-600 me-1"></em><span className="text-slate-400">Healthcare</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-5 py-3 flex items-center justify-between bg-gray-200 dark:bg-gray-1000 border-t rounded-b-md border-gray-300 dark:border-gray-900"> 
                                        <a className="font-medium text-gray-500 cursor-pointer" onClick={() => handleToggle('institute')} >
                                            <span>{visibilityState.institute ? 'Less info' : 'More info'}</span>
                                            <em className={`icon ni ni-${visibilityState.institute ? 'upword' : 'downward'}-ios ms-3 font-bold text-base`}></em>
                                        </a>
                                        <a href="#" className="btn bg-primary-600 text-white px-5 py-2 rounded-md font-medium">Apply</a>
                                    </div>
                                </div>
                            </div> 
                        </div>  
                    </Card.Body>
                </Card>
            </Block> {/* Block end */}

            <Block>
                <Block.Head>
                    <Block.Title>Review form</Block.Title>
                </Block.Head>
                <Card>
                    <Card.Body>
                        <div className="grid grid-cols-12 gap-7">
                            <div className="col-span-12 md:col-span-6">
                                <div className="border rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                                    <Form>
                                        <div className="p-5 sm:p-6">
                                            <h4 className="text-2xl leading-tighter font-bold font-heading text-slate-700 dark:text-white mb-2">Softnio</h4>
                                            <div className="flex gap-3 items-center">
                                                <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                                    <li><em className="icon ni ni-star-fill"></em></li>
                                                    <li><em className="icon ni ni-star-fill"></em></li>
                                                    <li><em className="icon ni ni-star-fill"></em></li>
                                                    <li><em className="icon ni ni-star-half-fill"></em></li>
                                                    <li><em className="icon ni ni-star"></em></li>
                                                </ul>
                                                <span>4.4 (78)</span>
                                            </div>
                                            <div className="my-4">
                                                <Form.Group>
                                                    <Form.Label className="mb-2" htmlFor="title">Title</Form.Label>
                                                    <Input.Wrap>
                                                        <Input id="title" defaultValue="You only miss it when it gone!"/>
                                                    </Input.Wrap>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label className="mb-2" htmlFor="job-title">Job Title</Form.Label>
                                                    <Input.Wrap>
                                                        <Input id="job-title" defaultValue="Sr. Frontend Developer"/>
                                                    </Input.Wrap>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label className="mb-2" htmlFor="experience">How was your experience?</Form.Label>
                                                    <Input.Wrap>
                                                        <TextArea id="experience" autoComplete="off" defaultValue="I've been using Dashlite for months now and with every update, it's just becoming better. Thank you for such a great design touch. Really love it"/>
                                                    </Input.Wrap>
                                                </Form.Group>
                                                <h5 className="text-xl font-medium -tracking-snug text-slate-700 dark:text-white leading-tighter  mt-11 mb-3">Criteria on Softnio</h5>
                                                <div className="flex justify-between py-2">
                                                    <span className="text-slate-400">Productivity</span>
                                                    <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                    </ul>
                                                </div>
                                                <div className="flex justify-between py-2">
                                                    <span className="text-slate-400">Competitive Position</span>
                                                    <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                    </ul>
                                                </div>
                                                <div className="flex justify-between py-2">
                                                    <span className="text-slate-400">Brand Value</span>
                                                    <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                    </ul>
                                                </div>
                                                <div className="flex justify-between py-2">
                                                    <span className="text-slate-400">Environment</span>
                                                    <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                        <li><em className="icon ni ni-star-fill"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-5 py-4 flex items-center justify-end bg-gray-200 dark:bg-gray-1000 border-t rounded-b-md border-gray-300 dark:border-gray-900">
                                            <a href="#" className="btn bg-primary-600 text-white px-5 py-2 rounded-md font-medium">Published Review</a>
                                        </div>
                                    </Form>
                                </div>
                            </div> {/* Col end */}

                            <div className="col-span-12 md:col-span-6">
                                <div className="border rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                                    <Form>
                                        <div className="p-5 sm:p-6">
                                            <h4 className="text-2xl leading-tighter font-bold font-heading text-slate-700 dark:text-white mb-2">Softnio</h4>
                                            <div className="flex gap-3 items-center">
                                                <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                                    <li><em className="icon ni ni-star-fill"></em></li>
                                                    <li><em className="icon ni ni-star-fill"></em></li>
                                                    <li><em className="icon ni ni-star-fill"></em></li>
                                                    <li><em className="icon ni ni-star-half-fill"></em></li>
                                                    <li><em className="icon ni ni-star"></em></li>
                                                </ul>
                                                <span>4.4 (78)</span>
                                            </div>
                                            <div className="my-4">
                                                <Form.Group>
                                                    <Form.Label className="mb-2" htmlFor="title">Title</Form.Label>
                                                    <Input.Wrap>
                                                        <Input id="title" placeholder="Title"/>
                                                    </Input.Wrap>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label className="mb-2" htmlFor="job-title">Job Title</Form.Label>
                                                    <Input.Wrap>
                                                        <Input id="job-title" placeholder="Job Title"/>
                                                    </Input.Wrap>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label className="mb-2" htmlFor="experience">How was your experience?</Form.Label>
                                                    <Input.Wrap>
                                                        <TextArea id="experience" autoComplete="off" placeholder="Describe your experience at Softnio"/>
                                                    </Input.Wrap>
                                                </Form.Group>
                                                <h5 className="text-xl font-medium -tracking-snug text-slate-700 dark:text-white leading-tighter  mt-11 mb-3">Criteria on Softnio</h5>
                                                <div className="flex justify-between py-2">
                                                    <span className="text-slate-400">Productivity</span>
                                                    <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                                        <li><em className="icon ni ni-star"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                    </ul>
                                                </div>
                                                <div className="flex justify-between py-2">
                                                    <span className="text-slate-400">Competitive Position</span>
                                                    <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                                        <li><em className="icon ni ni-star"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                    </ul>
                                                </div>
                                                <div className="flex justify-between py-2">
                                                    <span className="text-slate-400">Brand Value</span>
                                                    <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                                        <li><em className="icon ni ni-star"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                    </ul>
                                                </div>
                                                <div className="flex justify-between py-2">
                                                    <span className="text-slate-400">Environment</span>
                                                    <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                                        <li><em className="icon ni ni-star"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                        <li><em className="icon ni ni-star"></em></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-5 py-4 flex items-center justify-end bg-gray-200 dark:bg-gray-1000 border-t rounded-b-md border-gray-300 dark:border-gray-900">
                                            <a href="#" className="btn bg-primary-600 text-white px-5 py-2 rounded-md font-medium">Published Review</a>
                                        </div>
                                    </Form>
                                </div>
                            </div> {/* Col end */}
                        </div>  
                    </Card.Body>
                </Card>
            </Block> {/* Block end */}

            <Block>
                <Block.Head>
                    <Block.Title>Customers Ratings</Block.Title>
                </Block.Head>
                <Card>
                    <Card.Body>
                        <div className="grid grid-cols-12 gap-7">
                            <div className="col-span-12 md:col-span-9">
                                <div className="border rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                                    <div className="p-5 sm:p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-xl leading-tighter font-bold font-heading text-slate-700 dark:text-white mb-2">Design Quality</h4>
                                                <p className="text-slate-600">by <span className="text-primary-600">Softnio</span> 13 days ago</p>
                                            </div>
                                            <div className="flex gap-3 items-center">
                                                <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                                    <li><em className="icon ni ni-star-fill"></em></li>
                                                    <li><em className="icon ni ni-star-fill"></em></li>
                                                    <li><em className="icon ni ni-star-fill"></em></li>
                                                    <li><em className="icon ni ni-star-half-fill"></em></li>
                                                    <li><em className="icon ni ni-star"></em></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div> {/* end */}

                                <div className="border rounded-md bg-white-50 dark:bg-gray-950 border-gray-300 dark:border-gray-900 mt-7 ">
                                    <div className="flex items-center justify-between bg-slate-50 dark:bg-gray-1000 rounded-tl-md rounded-tr-md p-5 sm:p-6 border-b border-gray-300 dark:border-gray-900">
                                        <div className="card-title">
                                            <h4 className="text-xl leading-tighter font-bold font-heading text-slate-700 dark:text-white mb-2">Feature Quality</h4>
                                            <p className="text-slate-600">by <span className="text-primary-600">Softnio</span> 6 days ago</p>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <ul className="flex gap-1 text-yellow-600 justify-start text-base">
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-fill"></em></li>
                                                <li><em className="icon ni ni-star-half-fill"></em></li>
                                                <li><em className="icon ni ni-star"></em></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="p-5 sm:p-6 border-b border-gray-300 dark:border-gray-900">
                                        <p className="text-slate-400">I've been using Dashlite for months now and with every update, update it's just becoming more and more better it's just becoming better. Thank you for such a great design touch. Further I definitely cooperate with your product . Highly appriciate it. Really love it</p>
                                    </div>
                                    <div className="p-5 sm:p-6 border-b border-gray-300 dark:border-gray-900">
                                        <div className="flex items-center">
                                            <div className="relative flex-shrink-0 flex items-center justify-center text-sm text-white bg-primary-600 h-10 w-10 rounded-full font-medium">
                                                <span>AB</span>
                                            </div>
                                            <div className="ms-4">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <h6 className="text-lg leading-tighter font-bold font-heading text-slate-700 dark:text-white">Abu Bin Ishiyak</h6>
                                                    <span className="relative inline-flex rounded-sm px-2 border border-cyan-300 dark:border-cyan-800 bg-cyan-100 dark:bg-cyan-950 text-cyan-600 text-xxs text-center font-medium leading-4.5 tracking-snug whitespace-nowrap align-middle">Author</span>
                                                </div>
                                                <p className=" text-slate-400">Time zone depend on your server time as we use that by default. So you need to change that from your server. For data display issues, you may send your website url so we can check what actually wrong.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5 sm:p-6">
                                        <div className="flex items-center">
                                            <div className="relative flex-shrink-0 flex items-center justify-center text-sm text-white bg-cyan-600 h-10 w-10 rounded-full font-medium">
                                                <span>IB</span>
                                            </div>
                                            <div className="ms-4">
                                                <h6 className="text-lg leading-tighter font-bold font-heading text-slate-700 dark:text-white mb-3">Ifrat Binte</h6>
                                                <p className=" text-slate-400">Thanks for the help. Really great support.</p>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </Card.Body>
                </Card>
            </Block> {/* Block end */}

            <Block>
                <Block.Head>
                    <Block.Title>Customers Ratings</Block.Title>
                </Block.Head>
                <Card>
                    <Card.Body>
                        <div className="grid grid-cols-12 gap-7">
                            <div className="col-span-12 md:col-span-9">
                                <div className="border rounded-md bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-900">
                                    <div className="p-5 sm:p-6">
                                        <div className="flex gap-3 items-center">
                                            <ul className="flex gap-1 text-red-600 justify-start text-base">
                                                <li><em className="icon ni ni-heart-fill"></em></li>
                                                <li><em className="icon ni ni-heart-fill"></em></li>
                                                <li><em className="icon ni ni-heart-fill"></em></li>
                                                <li><em className="icon ni ni-heart-fill"></em></li>
                                                <li><em className="icon ni ni-heart"></em></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> {/* end */}
                            </div>
                        </div>  
                    </Card.Body>
                </Card>
            </Block> {/* Block end */}
        </div>
    </>
  )
}

export default RatingWidgetsPage