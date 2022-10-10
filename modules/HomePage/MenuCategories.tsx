import MyLink from '@common/components/MyLink'
interface Props {
  tabs: any[]
  categoryId: any
  hasDivider?: boolean
}
const MenuCategories: React.FC<Props> = (props: Props) => {
  const { tabs, categoryId, hasDivider } = props
  return (
    <div className="sticky top-[95px] z-[41] bg-bg1 ">
      <div className="container flex h-10 items-center gap-3 overflow-x-auto bg-bg1 px-3 scrollbar-none-height">
        {tabs.map((item: any, index) => {
          return (
            <MyLink
              key={index}
              href={
                item.href
                  ? item.href
                  : { query: { categoryId: item?.categoryId } }
              }
              className={
                'flex flex-col ' +
                (categoryId === item?.categoryId
                  ? 'text-inherit'
                  : 'text-neutral-500')
              }
            >
              <div className="flex gap-1 whitespace-nowrap px-2 pt-1 font-semibold">
                {item.icon}
                {item.label}
              </div>
              <div
                className={
                  'mt-0.5 h-1 w-full rounded bg-primary ' +
                  (categoryId === item?.categoryId ? 'opacity-1' : 'opacity-0')
                }
              />
            </MyLink>
          )
        })}
      </div>
      {hasDivider !== false && (
        <div className="h-[1px] w-full bg-white opacity-[0.1]"></div>
      )}
    </div>
  )
}

export default MenuCategories
