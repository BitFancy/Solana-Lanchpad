import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { LayoutContext } from './context/layoutcontext';
import Image from 'next/image';
import { ConnectWallet } from '@thirdweb-dev/react';

const AppTopbar = forwardRef((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    return (
        <div className="layout-topbar">
            <Link href="/dashboardl" className="layout-topbar-logo">
                <Image src={`./${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="60" height="60" widt={'true'} alt="logo" />
                <span style={{fontSize:"30px"}}>Marketplace</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>



            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link ">
                   
                    <span className='text-black' style={{fontWeight:"bold",fontSize:"16px"}}>Launch</span>
                </button>
                <button type="button" className="p-link ">
                    <span style={{fontWeight:"bold",fontSize:"16px"}}>Dashboard</span>
                </button>
              
                    <button type="button" className="p-link ">
                        <span style={{fontWeight:"bold",fontSize:"16px"}}>Manage</span>
                    </button>
              
               
                    <button type="button" className="p-link ">
                        <span style={{fontWeight:"bold",fontSize:"16px"}}>Create</span>
                    </button>
            
                <div>
                <ConnectWallet className="bg-gradient-to-r from-indigo-500 via-purple-500 to-gray-500 ..." />

                </div>
            </div>
        </div>
    );
});

export default AppTopbar;
