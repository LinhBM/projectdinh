import MyLink from '@common/components/MyLink'
import { AppStore, BoCongThuong, FacebookIcon, GooglePlay } from '@public/icons'
import { FormattedMessage } from 'react-intl'

interface Props {}

const Footer = (props: Props) => {
  return (
    <div className=" w-full bg-[#141414]">
      <div className="container">
        <div className="grid grid-cols-4 gap-5 pt-[57px] pb-[51px]">
          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold">
              <FormattedMessage id="MyClip" />
            </p>
            <div className="flex flex-col gap-2">
              <MyLink href={'/introduce'}>
                <p className="text-sm">
                  <FormattedMessage id="introduce" />
                </p>
              </MyLink>
              <MyLink href={'/termsOfService'}>
                <p className="text-sm">
                  <FormattedMessage id="termsOfService" />
                </p>
              </MyLink>
              <MyLink href={'/operationalRegulations'}>
                <p className="text-sm">
                  <FormattedMessage id="operationalRegulations" />
                </p>
              </MyLink>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold">
              <FormattedMessage id="help" />
            </p>
            <div className="flex flex-col gap-2">
              <MyLink href={'/privacyPolicy'}>
                <p className="text-sm">
                  <FormattedMessage id="privacyPolicy" />
                </p>
              </MyLink>
              <MyLink href={'/contact'}>
                <p className="text-sm">
                  <FormattedMessage id="contact" />
                </p>
              </MyLink>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold">
              <FormattedMessage id="follow" />
            </p>
            <div className="flex flex-col gap-2">
              <MyLink
                target={'_blank'}
                href={'https://www.facebook.com/myclipvn.viettel.fanpage'}
              >
                <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f5f526]">
                  <FacebookIcon />
                </button>
              </MyLink>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold">
              <FormattedMessage id="downloadTheApp" />
            </p>
            <div className="flex flex-row gap-4 ">
              <MyLink
                target={'_blank'}
                href={
                  'https://apps.apple.com/vn/app/myclip-clip-hot/id1186215150?l=vi'
                }
              >
                <img src={AppStore.src} alt="" className="h-12" />
              </MyLink>
              <MyLink
                target={'_blank'}
                href={
                  'https://play.google.com/store/apps/details?id=com.viettel.myclip&hl=vi'
                }
              >
                <img src={GooglePlay.src} alt="" className="h-12" />
              </MyLink>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-4 text-xs text-[#9E9E9E]">
            M???ng x?? h???i Video MyClip.
            <br /> ????n v??? ch??? qu???n: T???ng C??ng ty Vi???n th??ng Viettel.
            <br /> ??KKD s???: 0100109106-011 c???p ng??y 18/07/2005.
            <br /> ?????a ch???: S??? 1 Giang V??n Minh ??? Ba ????nh ??? H?? N???i.
            <br /> Gi???y ph??p s??? 366/GP-BTTTT c???p ng??y 28/07/2017
          </div>
          <div className="mt-12 flex flex-col gap-4">
            <MyLink
              target={'_blank'}
              href={'http://online.gov.vn/Home/WebDetails/68768'}
            >
              <img
                src={BoCongThuong.src}
                alt=""
                className="h-[70px] w-auto object-contain"
              />
            </MyLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
