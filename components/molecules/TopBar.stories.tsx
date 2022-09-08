import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import { TopBarComponent } from './TopBar';
const title: React.FC = () => {
  return <>mieze illustration</>
}
const navLinks: React.FC<{ className: string }> = ({ className }) => {
  return (
    <>
      <a href='/aaa' className={className}>personal work</a>
      <a href='/aaa' className={className}>commissioned work</a>
      <a href='/aaa' className={className}>info</a>
    </>)

}
export default { component: TopBarComponent } as ComponentMeta<typeof TopBarComponent>;
export const Default: ComponentStoryObj<typeof TopBarComponent> = {
  args:
  {
    TitleLink: title,
    description: 'by Ayu Nakata. Osaka, Japan-based illustrator/artist.',
    navLinks: navLinks
  }
}
