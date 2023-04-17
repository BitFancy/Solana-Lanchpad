/* eslint-disable @next/next/no-sync-scripts */
import React from 'react';
import { CodeHighlight } from '../../demo/components/CodeHighlight';
import styles from './index.module.css';

const Documentation = () => {
    return (
        <>
            <div className="grid">
                <div className="col-12">
                    <div className="card docs">
                        <h4>Current Version</h4>
                        <p>Next v13, React v18 with PrimeReact v9</p>

                        <h5>Getting Started</h5>
                        <p>
                        Marketplace is an application template for React based on the popular{' '}
                            <a href="https://nextjs.org/" className="font-medium hover:underline">
                                NextJS
                            </a>{' '}
                            framework. To get started, clone the{' '}
                            <a href="https://github.com/primefaces/Marketplace-react" className="font-medium hover:underline">
                                repository
                            </a>{' '}
                            from GitHub and install the dependencies with npm or yarn.
                        </p>
                        <pre className="app-code">
                            <code>{`"npm install" or "yarn"`}</code>
                        </pre>

                        <p>
                            Next step is running the application using the start script and navigate to <b>http://localhost:3000/</b> to view the application. That is it, you may now start with the development of your application using the Marketplace
                            template.
                        </p>

                        <pre className="app-code">
                            <code>{`"npm run dev" or "yarn dev"`}</code>
                        </pre>

                        <h5>Dependencies</h5>
                        <p>Dependencies of Marketplace are listed below and needs to be defined at package.json.</p>

                        <pre className="app-code">
                            <code>{`
"primereact": "^9.2.2",                    //required: PrimeReact components
"primeicons": "^6.0.1",                    //required: Icons
"primeflex": "^3.3.0",                     //required: Utility CSS classes
"react-transition-group": "^4.4.1",     //required: PrimeReact animations
`}</code>
                        </pre>

                        <h5>Structure</h5>
                        <p>Marketplace consists of a couple folders, demos and core has been separated so that you can easily remove what is not necessary for your application.</p>
                        <ul className="line-height-3">
                            <li>
                                <span className="text-primary font-medium">layout</span>: Main layout files, needs to be present
                            </li>
                            <li>
                                <span className="text-primary font-medium">demo</span>: Contains demo related utilities and helpers
                            </li>
                            <li>
                                <span className="text-primary font-medium">pages</span>: Demo pages
                            </li>
                            <li>
                                <span className="text-primary font-medium">public/demo</span>: Assets used in demos
                            </li>
                            <li>
                                <span className="text-primary font-medium">public/layout</span>: Assets used in layout such as logo
                            </li>
                            <li>
                                <span className="text-primary font-medium">styles/demo</span>: CSS files only used in demos
                            </li>
                            <li>
                                <span className="text-primary font-medium">styles/layout</span>: SCSS files of the core layout
                            </li>
                        </ul>

                        <h5>Menu</h5>
                        <p>
                            Main menu is defined at <span className="text-primary font-medium">AppMenu.js</span> file based on{' '}
                            <a href="https://www.primefaces.org/primereact/menumodel/" className="font-medium hover:underline">
                                MenuModel API
                            </a>
                            .
                        </p>

                        <h5>Integration with Existing NextJS Applications</h5>
                        <p>Only the folders that are related to the layout needs to move in to your project. We've created a short tutorial with details.</p>

                        <div className={styles['video-container']}>
                            <iframe className={styles['video']} width="560" height="315" src="https://www.youtube.com/embed/jnm0_U6zJFY" style={{ border: 'none' }} allowFullScreen></iframe>
                        </div>

                        <h5>PrimeReact Theme</h5>
                        <p>
                        Marketplace theming is based on the PrimeReact theme being used. Default theme is <b>lara-light-indigo</b>.
                        </p>

                        <h5>SASS Variables</h5>
                        <p>
                            In case you&apos;d like to customize the main layout variables, open <b>_variables.scss</b> file under src/layout folder. Saving the changes will be reflected instantly at your browser.
                        </p>

                        <h6>src/layout/_variables.scss</h6>
                        <pre className="app-code" lang="scss">
                            <code>
                                {`
/* General */
$scale:14px;                    /* initial font size */ 
$borderRadius:12px;             /* border radius of layout element e.g. card, sidebar */ 
$transitionDuration:.2s;        /* transition duration of layout elements e.g. sidebar */ 
`}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Documentation;
