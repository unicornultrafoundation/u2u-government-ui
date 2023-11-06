import { useTranslation } from "react-i18next"
import { Images } from "../../images"

export const EmptyComponent = () => {

    const { t } = useTranslation()
    return (
        <div className="w-full py-[54px] px-[10px] flex justify-center">
            <div>
                <div>
                    <img src={Images.EmptyPNG} alt="u2u" />
                </div>
                <div className="text-md text-text-placeholder">{t("No data yet")}</div>
            </div>
        </div>
    )
}