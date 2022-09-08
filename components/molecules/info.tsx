import { FC, memo } from 'react';
import { Work } from 'components/atoms/Work'
import { Footer } from 'components/atoms/footer';
import { links, Genres, workExperience, Events } from './infoData';
const Info: FC = memo(() => {
  return (
    <>
      <div
        id="tag_info"
        className="px-5 text-xs leading-7 text-center md:text-sm"
      >
        <div id="workExperience" className="mt-12 text-left Japanese">
          <p>
            mieze <small>【ミーツェ】</small>{' '}
            大阪在住のイラストレーター・アーティスト。
          </p>
          <p>
            {' '}
            お仕事のご依頼は以下のメールアドレスにお願いいたします。
            <br />{' '}
            <a href={`mailto:${process.env.REACT_APP_mail}`}>
              {process.env.REACT_APP_mail}
            </a>
          </p>
          <div className="mt-16">
            <h1 className="">
              <a href={process.env.REACT_APP_linktree}>Linktree</a>
            </h1>
            <hr />
            {links.map((link, linkK) => (
              <p key={linkK}>
                <a
                  href={link.url}
                  className={`${link.class && link.class} ml-3 tracking-wider`}
                >
                  {link.text}
                </a>
              </p>
            ))}
          </div>

          {Events.length > 0 && (
            <p>
              イベントの参加予定
              <hr />
            </p>
          )}

          <div className="mt-16">
            <h1 className="">仕事の経験(敬称略)</h1>
            <hr />
            <ul>
              {Genres.map((genre, genreK) => (
                <li key={genreK} className="">
                  <h2 className="my-2 leading-loose tracking-widest">
                    {genre}
                  </h2>
                  <ul className="leading-normal tracking-wide">
                    {workExperience
                      .filter((work) => work.gジャンル === genre)
                      .map((work, workK) => (
                        <Work key={workK} work={work} />
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          {/* <p className="mt20">
          展示
          <hr />
          <ul>
            <li>
              2016
              <ul>
                <li>
                  <i></i>CANCAN exhibition at LemoArt Gallery (Berlin, Germany)
                </li>
                <li>
                  <i></i>Digital Creator 23人展「恋」 at アートスペースリビーナ
                  (Tokyo, Japan)
                </li>
              </ul>
            </li>
          </ul>
        </p> */}

          <div className="my-12">
            受賞
            <hr />
            <ul>
              <li>
                <h2 className="my-2 leading-loose tracking-widest"> </h2>
                <i className="ml-3">ペーターズギャラリーコンペ 2010</i>
                「山口はるみ賞」及び「鈴木成一賞次点」
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="mt20">
        <a href="https://www.cgtrader.com" target="_blank" rel="noreferrer">
          Participant of the CGTrader Digital Art Competition
        </a>
      </div> */}
      </div>
      <Footer />
    </>
  );
});

export default Info;
