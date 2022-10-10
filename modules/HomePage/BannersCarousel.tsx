import { some } from '@common/constants'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
interface Props {
  banners: some[]
}

const FAKE_BANNER = [
  {
    coverImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREX69JmTsc2xWGoMJDLz08yIAEXhru4u6jrMcv415YuPVB0nOP0qWaUOAFSdvAPrQtrJA&usqp=CAU',
    tag: 'FAKE SHOWBIZ',
    name: 'Hoài Lâm giờ ăn mặc giản dị, ngoại hình phát tướng hơn trước',
    description:
      'Hoài Lâm giờ ăn mặc giản dị, ngoại hình phát tướng hơn trước Hoài Lâm giờ ăn mặc giản dị, ngoại hình phát tướng hơn trước',
  },
  {
    coverImage: 'https://www.sportpit.net/image/cache/catalog/bsn-860x324.jpg',
    tag: 'FAKE NEWS',
    name: 'ÔNG CHÔN 7 CÂY VÀNG GÓC NHÀ NHỜ CON CHÁU ĐÀO LÊN: SỢ LÚC NẰM XUỐNG GIA ĐÌNH VẤT VẢ VÌ MÌNH',
    description:
      'Cụ thể, người đăng tải đoạn video chia sẻ, chị không nghĩ bản thân sẽ là người trải qua câu chuyện “đào vàng” như phim vậy. Chuyện là ông nội bên chồng của chị từ lúc còn là thanh niên trai tráng đến khi về già đã tích góp được hơn 7 cây vàng, cất ở một góc nhà mà đến con cái hay cả vợ cũng đều không hề hay biết.',
  },
]

const BannersCarousel = (props: Props) => {
  const { banners } = props
  // const banners = FAKE_BANNER

  function onChange() {}

  function onClickItem() {}

  function onClickThumb() {}

  return (
    <div className="h-[406px] w-full">
      <Carousel
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        interval={5000}
        onChange={onChange}
        onClickItem={onClickItem}
        onClickThumb={onClickThumb}
        className="home-carousel-banner"
      >
        {banners.map((banner, i) => {
          return (
            <div className="relative  h-full">
              <div
                className={`relative h-full bg-cover bg-center bg-no-repeat blur-2xl`}
                style={{ backgroundImage: `url('${banner.coverImage}')` }}
              ></div>
              <div className="container absolute top-0 left-1/2 flex h-full w-full -translate-x-1/2 gap-10 py-10">
                <div className="flex flex-1 flex-col gap-4 text-left leading-[57px]">
                  <button className="btn-container caption1 h-7 w-fit rounded-md text-black">
                    {banner.tag}
                  </button>
                  <p className="text-5xl font-bold leading-[57px] line-clamp-2">
                    {banner.name}
                  </p>
                  <p className="title leading-[32px] text-neutral-500 line-clamp-2">
                    {banner?.description}
                  </p>
                </div>
                <div
                  className="h-[324px] w-[860px] rounded-xl drop-shadow-3xl"
                  style={{ backgroundImage: `url('${banner.coverImage}')` }}
                ></div>
              </div>
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export default BannersCarousel
