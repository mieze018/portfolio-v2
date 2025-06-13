import { cva } from 'class-variance-authority'

const pVariants = cva('')
const h2Variants = cva('my-2 leading-loose tracking-widest')
const sectionWrapperVariants = cva('md:min-h-g-23vh')
const ulNest1Variants = cva('grid gap-4 leading-normal tracking-wide')

export const P = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={pVariants({ className })} {...props} />
)

export const H2 = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={h2Variants({ className })} {...props} />
)

export const SectionWrapper = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <section className={sectionWrapperVariants({ className })} {...props} />
)

export const UlNest1 = ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
  <ul className={ulNest1Variants({ className })} {...props} />
)
