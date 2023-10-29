import { useCallback, useEffect, useState } from "react"
import { ArrowDownIcon, Images } from "../../images"
import { useAppStore } from "../../store"

interface Lang {
  lng: string
  label: string
  img: any
}

const langs: Lang[] = [
  {
    lng: "en",
    label: "EN",
    img: Images.enPNG
  },
  {
    lng: "vi",
    label: "VN",
    img: Images.enPNG
  }
]

export const Languages = () => {

  const [isShowList, setIsShowList] = useState(false)

  const [changeLng, lng] = useAppStore(state => [
    state.changeLng,
    state.lng
  ])

  const [selectedLang, setSelectedLang] = useState(langs[0])

  useEffect(() => {
    const _index = langs.findIndex((l: Lang) =>l.lng === lng)
    if (_index > -1) {
      setSelectedLang(langs[_index])
    }
  }, [lng])


  const onHandleLang = useCallback((lng: Lang) => {
    setSelectedLang(lng)
    setIsShowList(false)
    changeLng(lng.lng)
    // eslint-disable-next-line
  }, [])

  return (
    <div className="relative">
      <div className="flex gap-[10px] border border-border-outline py-1 px-2 rounded-[45px] cursor-pointer" onClick={() => setIsShowList(!isShowList)}>
        <img src={selectedLang.img} alt="u2u" className="w-[26px] h-[26px]" />
        <div className="text-text text-base font-semibold">{selectedLang.label}</div>
        <ArrowDownIcon className="cursor-pointer" />
      </div>
      {
        isShowList &&
        <div className="absolute top-[40px] bg-neutral-surface border border-border-outline shadow-1 rounded-[16px] z-30 px-4 py-2">
          {
            langs.map((item: Lang, index: number) => {
              return (
                <div className="flex gap-1 items-center" key={index} onClick={() => {
                  onHandleLang(item)
                }}>
                  <img src={item.img} alt="u2u" className="w-[20px] h-[20px]" />
                  <div className="text-text-secondary text-md font-semibold py-2 px-2 cursor-pointer">{item.label}</div>
                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
}