// ⚛️
import { FC, useContext, memo, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
// 🧩
import { DataCTX } from 'App';
import { navs } from 'Type';
import { classList } from 'functions';
import './TopBar.css';
//
export const TopBar: FC<{ navs: navs }> = memo((props) => {
  const GetDataCTX: any = useContext(DataCTX);
  let location = useLocation();

  //スマホでアクセスした時tumblrへのリンクをアプリから開くリンクに書き換え
  {
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (
      userAgent.indexOf('iphone') !== -1 ||
      userAgent.indexOf('ipad') !== -1 ||
      userAgent.indexOf('android') !== -1
    ) {
      document.querySelector('html')?.classList.add('mobile');
    } else {
      document.querySelector('html')?.classList.add('desktop');
    }
    userAgent.indexOf('android') !== -1 &&
      document.querySelector('html')?.classList.add('android');
    // userAgent.indexOf('gecko') !== -1 &&
    //   document.querySelector('html')?.classList.add('gecko');
    document
      .querySelector('.mobile .tumblr')
      ?.setAttribute(
        'href',
        `http://www.tumblr.com/open/app?app_args=blog&blogName=${process.env.REACT_APP_Tumblr_username}&page=blog`
      );
  }
  //スクロール
  const isRunning = useRef(false); // スクロール多発防止用フラグ
  // リスナに登録する関数
  const isScrollToggle = useCallback(() => {
    if (isRunning.current) return;
    isRunning.current = true;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    requestAnimationFrame(() => {
      const body = document.querySelector('body');
      if (scrollTop === 0) {
        classList(body)
          ?.add('scroll-backed')
          .remove('scroll-top-gt-0')
          .remove('scroll-top-gt-23vh')
          .remove('scroll-top-gt-38vh');
      } else if (scrollTop > window.innerHeight * 0.382) {
        classList(body)
          ?.add('scroll-top-gt-38vh')
          .remove('scroll-backed')
          .remove('scroll-top-gt-0')
          .remove('scroll-top-gt-23vh');
        // } else if (scrollTop > window.innerHeight * 0.236) {
        //   classList(body)
        //     ?.add('scroll-top-gt-23vh')
        //     .remove('scroll-backed')
        //     .remove('scroll-top-gt-0')
        //     .remove('scroll-top-gt-38vh');
      } else if (scrollTop > 0) {
        classList(body)
          ?.add('scroll-top-gt-0')
          .remove('scroll-backed')
          .remove('scroll-top-gt-23vh')
          .remove('scroll-top-gt-38vh');
      }

      isRunning.current = false;
    });
  }, []);

  // 登録と後始末
  useEffect(() => {
    document.addEventListener('scroll', isScrollToggle, { passive: true });
    return () => {
      document.removeEventListener('scroll', isScrollToggle, true);
    };
  }, [isScrollToggle]);

  const TitleLink: FC = (props) => {
    return (<Link to="/">
      {GetDataCTX['info']?.['title'] ?? process.env.REACT_APP_title}
    </Link>)
  }
  const navLinks: FC<{ className: string }> = ({ className }) => {
    console.log(className)
    return (
      <>
        {props.navs.map((nav) =>
          <Link
            to={nav.pathname}
            key={nav.name}
            className={`${className} ${location.pathname === nav.pathname ||
              (location.pathname === '/' &&
                nav.pathname === GetDataCTX.routes[0].pathname)
              ? 'underline'
              : ''
              }`}
          >
            {nav.name}
          </Link>
        )}
      </>
    )
  }
  return (
    <TopBarComponent
      TitleLink={TitleLink}
      description={GetDataCTX['description']}
      navLinks={navLinks} />
  );
});



export const TopBarComponent: FC<{
  TitleLink: FC
  description?: string
  navLinks: FC<{ className: string; }>
}> = memo((props) => {
  return (
    <>
      <div id="floater" className="fixed top-0 z-10 w-full bg-surface"></div>
      <header className="fixed top-0 z-10 w-full mb-0 text-sm text-center">
        <div id="sinker">
          <div id="fade-outer">
            <h1 className="mb-1 text-2xl header-title text-primary xs:text-3xl tracking-title">
              <props.TitleLink />
            </h1>

            <p className="text-xs header-desc sm:text-base">
              {props.description ?? process.env.REACT_APP_description
              }
            </p>
          </div>
          <nav className="z-10 text-center">
            <props.navLinks className='inline-block m-2 xs:m-3 mix-blend-multiply xs:tracking-widest' />
          </nav>
        </div>
      </header>
    </>
  );
});
