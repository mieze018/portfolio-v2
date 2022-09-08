import { memo, FC } from 'react';
import tw from 'twin.macro';
export const Footer: FC = memo(() => {
  //現在の年を取得
  const now = new Date();
  const this_year = now.getFullYear();
  const style = {
    footer: [
      tw`absolute bottom-0`, //Layout
      tw`py-0`, //Spacing
      tw`text-xs text-center`, //Typography

    ]
  }
  return (
    <footer css={style.footer}>
      © 2009-{this_year} {process.env.REACT_APP_author}
    </footer>
  );
});
