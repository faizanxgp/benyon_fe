import React from 'react'
import { Icon, Progress } from '../../../componenets'
import SimpleBar from 'simplebar-react'

const Aside = ({show,setShow}) => {    const menu = [
        {
            icon:"home-alt",
            text: "Home",
            active: true,
        },
        {
            icon:"file-docs",
            text: "Newly Added",
        },
        {
            icon:"share-alt",
            text: "Shared",
        },
    ]
    
  return (
    <>
        <div id="pageAside" className={`peer max-w-[calc(100%-2.5rem)] w-[220px] max-lg:min-h-screen lg:rounded-s-md bg-white dark:bg-gray-950 border-e border-gray-300 dark:border-gray-900 flex-shrink-0 fixed lg:static top-0 start-0 z-[999] transition-transform duration-500 lg:transition-none -translate-x-full rtl:translate-x-full [&.active]:transform-none lg:transform-none lg:rtl:transform-none ${show ? 'active' : ''}`}>
            <SimpleBar className="max-lg:mt-16 max-lg:max-h-[calc(100vh-theme(spacing.16))]">
                <ul className="p-4">
                    {menu.map((item,index) => {
                        return(
                            <li key={index} className={`group/fmgmenu py-0.5 ${item.active ? 'active' : ''}`}>
                                <a className="relative flex items-center py-2 px-3 rounded hover:bg-gray-50 hover:dark:bg-gray-900 transition-all duration-300 group-[.active]/fmgmenu:bg-primary-100 group-[.active]/fmgmenu:dark:bg-primary-950" href="#link" onClick={(e)=> e.preventDefault()}>
                                    <Icon className="text-xl/5 -mt-0.5 w-8 text-slate-400 group-[.active]/fmgmenu:text-primary-600" name={item.icon} />
                                    <span className="text-sm/6 font-medium text-slate-600 dark:text-slate-400 ms-1 group-[.active]/fmgmenu:text-primary-600 group-[.active]/fmgmenu:dark:text-primary-600">{item.text}</span>
                                </a>
                                {item.sub && <ul className="ps-12 mb-2 -mt-0.5">
                                    {item.sub.map((item,index)=>{
                                        return(
                                            <li key={index} className="py-0.5">
                                                <a href="#link" onClick={(e)=> e.preventDefault()} className="relative flex items-center py-0.5 rounded text-slate-600 hover:text-primary-600"><span className="text-xs/5 font-medium">{item.text}</span></a>
                                            </li>
                                        )
                                    })}
                                </ul>}
                            </li>
                        )
                    })}
                </ul>

                <div className="mt-24">
                    <div className="p-7">
                        <h6 className="font-heading text-sm/tighter font-bold -tracking-snug text-slate-600 mb-4 flex items-center">
                            <Icon className="text-xl/none me-4" name="hard-drive" /><span>Storage</span>
                        </h6>
                        <Progress>
                            <Progress.Bar variant="primary" progress="5%" />
                        </Progress>                        <div className="text-xs font-medium text-slate-400 mt-4">12.47 GB of 50 GB used</div>
                    </div>
                </div>
            </SimpleBar>
        </div>
        <div onClick={()=> setShow(false)} className="class-toggle fixed inset-0 bg-slate-950 bg-opacity-20 z-[900] opacity-0 invisible peer-[.active]:opacity-100 peer-[.active]:visible lg:!opacity-0 lg:!invisible"></div>
    </>
  )
}

export default Aside