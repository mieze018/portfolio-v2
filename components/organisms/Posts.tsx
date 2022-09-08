// ⚛️
import React, { useContext, memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// 🧩
import { DataCTX } from 'App';
import { routeParam } from 'Type';
import {Footer} from 'components/atoms/footer';

const Posts = memo(
  (props: { tag: routeParam; displayFork: number; className?: string }) => {
    const GetDataCTX: any = useContext(DataCTX);
    return (
      <div
        id={props.tag.pathname}
        className={`fade-wrapper ${props.className && props.className}`}
      >
        {props.tag.isStatic
          ? props.tag.isStatic
          : GetDataCTX.posts
          ? GetDataCTX.posts
              .filter((rawPost: any) =>
                rawPost.tags.find(
                  (tag: string, i: any) => tag === props.tag.name
                )
              )
              .map((post: any, postK: any) => {
                return (
                  <article
                    className="flex max-w-full mb-10 min-h-square"
                    key={postK}
                  >
                    <div
                      className={`${
                        post.photoset_layout ? 'photoset block' : post.type
                      }`}
                    >
                      <div className="m-auto photo-container min-w-golden23vw xl:max-w-golden38vw">
                        {post.photos.map((photo: any, photoK: any) => {
                          if (
                            !post.tags.find(
                              (tag: string, i: any) => tag === 's-o-l-p'
                            ) ||
                            photoK === post.photos.length - 1
                          ) {
                            return (
                              <LazyLoadImage
                                className="w-full"
                                src={photo.alt_sizes[props.displayFork].url}
                                alt={photo.alt_sizes[props.displayFork].url}
                                threshold={1280}
                                // afterLoad={
                                //   () =>
                                //     document
                                //       .querySelector('img.blur-lg')
                                //       ?.classList.remove('blur-lg')
                                // postK === 0 &&
                                // photoK === post.photos.length - 1 &&
                                // props.switchEffect()
                                // }
                                // delayTime={postK === 0 ? 1 : 0}
                                key={photoK}
                                visibleByDefault={postK === 0 ? true : false}
                              />
                            );
                          } else {
                            return null;
                          }
                        })}
                      </div>
                      <div
                        className="mt-0 text-sm sm:text-base"
                        dangerouslySetInnerHTML={{
                          __html: post['caption']
                        }}
                      ></div>
                      <footer className="mt-0 text-xs sm:text-sm">
                        <div>
                          <ul>
                            <li>
                              <span className="time-ago">
                                {new Intl.DateTimeFormat('en-US', {
                                  year: 'numeric',
                                  month: 'long'
                                }).format(
                                  new Date(
                                    post.date
                                      .replace(' GMT', '')
                                      .replace(' ', 'T')
                                  )
                                )}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </footer>
                    </div>
                  </article>
                );
              })
          : ' '}
        <Footer />
      </div>
    );
  }
);

export default Posts;
