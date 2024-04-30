import './App.css';
import SpiderWeb from './assets/web.svg';
import SpiderIcon from './assets/spider.svg';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import WidgetEthToBot from './components/WidgetEthToBot';
import WidgetBotToEth from './components/WidgetBotToEth';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const spiderWebPositionsDesktop = [
    { top: '10%', left: '03%', size: 'w-60 h-60' }, // Large
    { top: '10%', left: '35%', size: 'w-40 h-40' }, // Medium
    { top: '60%', left: '50%', size: 'w-20 h-20' }, // Small
    { top: '30%', left: '70%', size: 'w-60 h-60' }, // Large
    { top: '50%', left: '90%', size: 'w-40 h-40' }, // Medium
    { top: '70%', left: '20%', size: 'w-30 h-30' }, // Small
    { top: '80%', left: '80%', size: 'w-60 h-60' }, // Large
  ];

  const spiderWebPositionsMobile = [
    { top: '8%', left: '03%', size: 'w-30 h-30' }, // Large
    { top: '40%', left: '60%', size: 'w-20 h-20' }, // Medium
    { top: '80%', left: '30%', size: 'w-20 h-20' }, // Small
  ];

  const spiderIconPositionDesktop = { top: '50%', left: '7.7%' };
  const spiderIconPositionMobile = { top: '30%', left: '20%' };

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <div className="bg-[#000000] min-h-screen relative overflow-hidden">
            {/* Header */}


            {/* Render fixed spider webs for desktop */}
            {!isMobile && (
              <div>
                {spiderWebPositionsDesktop.map((position, index) => (
                  <div key={index} className="absolute" style={{ top: position.top, left: position.left }}>
                    <img
                      src={SpiderWeb}
                      alt="Spiderweb"
                      className={`pointer-events-none ${position.size}`}
                    />
                    {/* Render spider string only for the first spider web */}
                    {index === 0 && (
                      <hr className="spider-web-string" />
                    )}
                  </div>
                ))}
                {/* Render spider icon */}
                <img
                  src={SpiderIcon}
                  alt="Spider"
                  className="absolute h-16 md:h-24"
                  style={spiderIconPositionDesktop}
                />
              </div>
            )}

            {/* Render fixed spider webs for mobile */}
            {isMobile && (
              <div>
                {spiderWebPositionsMobile.map((position, index) => (
                  <div key={index} className="absolute" style={{ top: position.top, left: position.left }}>
                    <img
                      src={SpiderWeb}
                      alt="Spiderweb"
                      className={`pointer-events-none ${position.size}`}
                    />
                    {/* Render spider string only for the first spider web */}
                    {index === 0 && (
                      <hr className="spider-web-string-mobile" />
                    )}
                  </div>
                ))}
                {/* Render spider icon for mobile */}
                <img
                  src={SpiderIcon}
                  alt="Spider"
                  className="absolute h-12 md:h-16"
                  style={spiderIconPositionMobile}
                />
              </div>
            )}

            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <div className="text-center text-white">
                <Route exact path='/'>
                  <WidgetEthToBot />
                </Route>
                <Route path='/withdraw'>
                  <WidgetBotToEth />
                </Route>
              </div>
            </div>
          </div>
        </Switch>
      </Router >
    </>
  );
}

export default App;
