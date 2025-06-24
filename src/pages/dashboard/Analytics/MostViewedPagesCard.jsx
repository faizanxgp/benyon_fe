import React, {useState} from 'react'
import { Card, Button, Icon } from '../../../componenets'

import { Menu } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { useTheme } from '../../../layout/context';

const MostViewedPagesCard = ({ className }) => {
    const theme = useTheme();
    let [dropdownToggle, setDropdownToggle] = useState()
    let [dropdownContent, setDropdownContent] = useState()
    let { styles, attributes } = usePopper(dropdownToggle, dropdownContent, {
        placement : theme.direction === "rtl" ? "bottom-start" : "bottom-end",
        modifiers: [
            {name: 'offset', options: { offset:  [0, 4] }},
            {name: 'preventOverflow', options: { padding: 8 }},
        ],
    })
    const data = [
        {url: "/dashboard", amount:"2,879"},
        {url: "/analytics", amount:"2,094"},
        {url: "/chatbot", amount:"1,634"},
        {url: "/settings", amount:"1,497"},
        {url: "/profile", amount:"1,349"},
        {url: "/help", amount:"984"},
        {url: "/reports", amount:"879"},
        {url: "/users", amount:"598"},
        {url: "/integration", amount:"436"},
    ]
  return (
    <Card className={`${className ? className : ''}`}>
        <Card.Header>
            <Card.Title className="text-base font-bold text-slate-800 dark:text-slate-200">Most Viewed Pages</Card.Title>
            <Card.Option>
                <Menu as="div" className="inline-flex relative">
                    {({ open }) => (
                        <>
                            <Menu.Button as='div' className={`inline-flex${open ? ' active' : ''}`} ref={setDropdownToggle}>
                                <Button variant="white-outline" size="sm" icon>
                                <Icon className="text-lg" name="more-vertical" />
                                </Button>
                            </Menu.Button>
                            <Menu.Items modal={false} ref={setDropdownContent} style={styles.popper} {...attributes.popper} className="absolute border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 rounded-md shadow z-[1000] min-w-[180px]">
                                <ul className="py-2">
                                    <li><Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-red-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300"><span>Last 30 Days</span></Menu.Item></li>
                                    <li><Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-red-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300"><span>Last 6 Months</span></Menu.Item></li>
                                    <li><Menu.Item as="button" className="w-full relative px-5 py-2.5 flex items-center rounded-[inherit] text-xs leading-5 font-medium text-slate-600 dark:text-slate-300 hover:text-red-600 hover:bg-slate-50 hover:dark:bg-gray-900 transition-all duration-300"><span>Last 1 Years</span></Menu.Item></li>
                                </ul>
                            </Menu.Items>
                        </>
                    )}
                </Menu>
            </Card.Option>
        </Card.Header>
        <Card.Body className="pt-0">
            <ul className="gap-3 flex flex-col">
                {
                    data.map((item, index) => (
                        <li key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-red-600 me-3 flex-shrink-0"></div>
                                <div className="text-sm">
                                    <div className="font-medium text-slate-700 dark:text-slate-300">{item.url}</div>
                                </div>
                            </div>
                            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.amount}</div>
                        </li>
                    ))
                }
            </ul>
        </Card.Body>
    </Card>
  )
}

export default MostViewedPagesCard
