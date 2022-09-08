
import React, { useContext, memo } from 'react';

import Image from 'next/image';
import { Photo, Post } from 'pages/@type/tumblr';
import tw from 'twin.macro';
const Article = tw.article`flex max-w-full mb-10`
const PhotoWrapper = tw.div`m-auto`
const PostFooter = tw.footer`mt-0 text-xs sm:text-sm`
const Caption = tw.div`mt-0 text-sm sm:text-base`
export const PostComponent: React.FC<{ post: Post }> = ({ post }) => (
  <>

    <div
      key={post.id_string}
      className={`fade-wrapper`}
    >
      <Article>
        <div
          className={`${post.photoset_layout ? 'photoset block' : post.type
            }`}
        >
          <PhotoWrapper>
            {post.photos.map((photo: Photo, photoK: any) => {
              if (
                !post.tags.find(
                  (tag: string, i: any) => tag === 's-o-l-p'
                ) ||
                photoK === post.photos.length - 1
              ) {
                return (
                  <></>
                  // <Image
                  //   className="w-full"
                  //   src={photo.original_size.url}
                  //   alt={photo.original_size.url}
                  //   key={photo.original_size.url}
                  //   height={photo.original_size.height}
                  //   width={photo.original_size.width}
                  // />
                );
              } else {
                return null;
              }
            })}
          </PhotoWrapper>
          <Caption
            dangerouslySetInnerHTML={{
              __html: post['caption']
            }}
          />
          <PostFooter>
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
          </PostFooter>
        </div>
      </Article>

    </div>

  </>
)


